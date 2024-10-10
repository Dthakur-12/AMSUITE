import { Grid, Paper } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import LinearProgress from "@mui/material/LinearProgress";
import { withStyles } from '@mui/styles';
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import MUIDataTable from "mui-datatables";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { DateRangePicker, DateRange } from "react-date-range";
import { Tab } from "semantic-ui-react";
import "react-date-range/dist/styles.css";
import { Header } from "semantic-ui-react";
import ApiHandler from "../../../../services/ApiHandler";
import NavBarReports from "../../utils/NavBarReports";
import DownloadButton from "../Shared/DownloadButton";
import FilterButton from "../Shared/FilterButton";
import PrintButton from "../Shared/PrintButton";
import AnnualOrdersChart from "./AnnualOrdersChart";
import {
  getDefaultInputRanges,
  getDefaultStaticRanges,
} from "../Shared/DateRangePickerInputsGenerator";
import MonthlyOrdersChart from "./MonthlyOrdersChart";
import MostOrderedProducts from "./MostOrderedProducts";
import PeopleWithMoreOrders from "./PeopleWithMoreOrders";
import "../Shared/style.css";
import { withTranslation } from "react-i18next";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import moment from "moment";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { Icon } from "semantic-ui-react";
import { debounce } from "throttle-debounce";
import { isNullOrUndefined } from "util";
import { endOfDay, startOfDay } from "date-fns";
import { Transition } from "semantic-ui-react";
import Collapse from "@mui/material/Collapse";
const dateNow = new Date();

let page = 0;
let rowsPerPage = 10;
let activeColumnSort = 2;
let order = "asc";

//Si no funciona usar el de abajo, esto no lo pude probar
function parseDate(date) {
  let mm = date.getMonth() + 1; // getMonth() is zero-based
  let dd = date.getDate();
  return [
    (dd > 9 ? "" : "0") + dd,
    (mm > 9 ? "" : "0") + mm,
    date.getFullYear(),
  ].join("/");
}

// Date.prototype.ddmmyyyy = function() {
//   let mm = this.getMonth() + 1; // getMonth() is zero-based
//   let dd = this.getDate();

//   return [
//     (dd > 9 ? "" : "0") + dd,
//     (mm > 9 ? "" : "0") + mm,
//     this.getFullYear()
//   ].join("/");
// };

const dateOptions = { year: "numeric", month: "long", day: "numeric" };

class AccessReport extends Component {
  constructor(props) {
    super(props);
    const { t } = this.props;
    this.state = {
      isLoadingNewData: false,
      dateRangePicker: {
        selection: {
          startDate: new Date(
            dateNow.getFullYear(),
            dateNow.getMonth() - 1,
            dateNow.getDay(),
            0,
            0,
            0
          ),
          endDate: new Date(dateNow.setHours(23, 59, 0)),
          key: "selection",
        },
      },
      focusedRange: [0, 0],
      filterRange: {
        startDate: new Date(
          dateNow.getFullYear(),
          dateNow.getMonth() - 1,
          dateNow.getDay(),
          0,
          0,
          0
        ),
        endDate: new Date(dateNow.setHours(23, 59, 0)),
      },
      isFocused: false,

      columns: this.translateColumns(
        t,
        isNullOrUndefined(this.props.language) ? "es-Es" : this.props.language,
        true
      ),
    };

    this.changeSearchDebounce = debounce(500, (value) =>
      this.changeSearch(value)
    );
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.i18n.language !== prevState.language) {
      return {
        language: nextProps.i18n.language,
      };
    } else return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.language !== this.state.language) {
      this.setState({
        ...prevState,
        columns: this.translateColumns(
          this.props.t,
          this.state.language,
          false
        ),
      });
    }
  }
  translateColumns = (t, lenguage, initial) => {
    let colStorage = JSON.parse(localStorage.getItem("tikasReportColumns"));

    let columDisplay = {};
    if (initial && !isNullOrUndefined(colStorage)) {
      colStorage &&
        colStorage.map(
          (elem) =>
            (columDisplay[elem.field] = !isNullOrUndefined(elem.options.display)
              ? elem.options.display
              : true)
        );
    } else {
      this.state &&
        this.state.columns &&
        this.state.columns.map(
          (elem) =>
            (columDisplay[elem.field] = !isNullOrUndefined(elem.options.display)
              ? elem.options.display
              : true)
        );
    }
    return [
      {
        name: "personName",
        label: t("name"),
        field: "name",
        options: {
          filter: true,
          sort: true,
          sortDirection: activeColumnSort === 0 ? order : "none",
          display: isNullOrUndefined(columDisplay.name)
            ? true
            : columDisplay.name,
        },
      },
      {
        name: "badgeNumber",
        field: "badge",
        label: t("Card"),
        options: {
          filter: true,
          sortDirection: activeColumnSort === 1 ? order : "none",
          display: isNullOrUndefined(columDisplay.badge)
            ? true
            : columDisplay.badge,
        },
      },
      {
        name: "date",
        field: "date",
        label: t("Date"),
        options: {
          filter: true,
          sortDirection: activeColumnSort === 2 ? order : "none",
          display: isNullOrUndefined(columDisplay.date)
            ? true
            : columDisplay.date,
          // customBodyRender: (date) => {
          //   return new Date(date).toLocaleDateString(lenguage, dateOptions);
          // },
          customBodyRender: (value, tableMeta) => {
            if (value)
              return (
                <Typography
                  value={value}
                  aria-owns={this.state.open ? "mouse-over-popover" : undefined}
                  aria-haspopup="true"
                  // onMouseEnter={this.handlePopoverOpen}
                  // onMouseLeave={this.handlePopoverClose}
                >
                  {moment(value).format("DD/MM/YYYY HH:mm")}
                </Typography>
              );
          },
        },
      },
      {
        name: "details",
        field: "Detalles",
        label: t("details"),
        options: {
          filter: false,
          sort: false,
          display: false,
          sortDirection: activeColumnSort === 3 ? order : "none",
          display: isNullOrUndefined(columDisplay.Detalles)
            ? true
            : columDisplay.Detalles,
          customBodyRender: (value, tableMeta) => {
            let details =
              this.state && this.state.data2[tableMeta.rowIndex].items
                ? this.state.data2[tableMeta.rowIndex].items
                : [];
            return (
              <Typography
                value={value}
                aria-owns={this.state.open ? "mouse-over-popover" : undefined}
                aria-haspopup="true"
                // onMouseEnter={this.handlePopoverOpen}
                // onMouseLeave={this.handlePopoverClose}
              >
                {details.length > 1
                  ? details.length + "  " + t("Products")
                  : details.length + "  " + t("Product")}
              </Typography>
            );
          },
        },
      },
    ];
  };

  createPanes = (isDesktop) => {
    const { t, classes } = this.props;
    const staticRanges = getDefaultStaticRanges(t);
    return [
      {
        menuItem: t("Date"),
        render: () => (
          <Tab.Pane className={classes.pane} attached={false}>
            {isDesktop === true ? (
              <DateRangePicker
                onChange={this.handleRangeChange}
                showSelectionPreview={true}
                moveRangeOnFirstSelection={false}
                months={1}
                ranges={[this.state.dateRangePicker.selection]}
                direction="horizontal"
                className={classes.rangePicker}
                onRangeFocusChange={this.handleRangeFocusChange}
                focusedRange={this.state.focusedRange}
                staticRanges={staticRanges}
                inputRanges={getDefaultInputRanges(t)}
                dragSelectionEnabled={false}
              />
            ) : (
              <DateRange
                onChange={this.handleRangeChange}
                moveRangeOnFirstSelection={false}
                ranges={[this.state.dateRangePicker.selection]}
                className={classes.rangePicker}
                dragSelectionEnabled={false}
              />
            )}
          </Tab.Pane>
        ),
      },
    ];
  };

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateScreenMode);
  }

  updateScreenMode = () => {
    this.setState({
      isDesktop: window.innerWidth > 900,
      panes: this.createPanes(window.innerWidth > 900),
    });
  };

  componentDidMount() {
    // connectSocket();
    this.updateScreenMode();
    window.addEventListener("resize", this.updateScreenMode);
    NavBarReports.hideLoader();
    this.loadReports(
      this.state.dateRangePicker.selection.startDate.toJSON(),
      this.state.dateRangePicker.selection.endDate.toJSON()
    );
  }

  loadData = (contentLoader) => {
    if (contentLoader) this.setState({ isLoadingNewData: true });
    this.loadReports(
      this.state.dateRangePicker.selection.startDate.toJSON(),
      this.state.dateRangePicker.selection.endDate.toJSON()
    );
  };

  loadReports = (startDate, endDate) => {
    const { columns, searchText } = this.state;
    ApiHandler.Reports.Tikas.getOrders(
      page * rowsPerPage,
      rowsPerPage,
      columns[activeColumnSort].field + " " + order,
      searchText,
      startDate,
      endDate
    )
      .then((response) => {
        const lastSearchText = this.state.searchText;
        this.setState({
          data2: response.data.data,
          dataCount: response.data.dataCount,
          isLoadingNewData: false,
          isSearching: lastSearchText !== searchText,
        });
        if (lastSearchText !== searchText) this.loadData(false);
      })
      .catch((error) => {});
  };

  handleSelect(ranges) {}

  handleRangeFocusChange = (focusedRange, range) => {
    this.setState({
      focusedRange,
    });
  };

  handleDateRangeClose = () => {
    this.setState({
      focusedRange: [0, 0],
    });
  };

  handleRangeChange = (ranges) => {
    this.loadReports(
      ranges.selection.startDate.toJSON(),
      ranges.selection.endDate.toJSON()
    );
    this.setState({
      filterRange: {
        startDate: startOfDay(ranges.selection.startDate),
        endDate: endOfDay(ranges.selection.endDate),
      },
    });
    this.setState({
      dateRangePicker: {
        selection: {
          ...this.state.dateRangePicker.selection,
          startDate: startOfDay(ranges.selection.startDate),
          endDate: endOfDay(ranges.selection.endDate),
        },
      },
    });
  };

  changePage = (newPage) => {
    page = newPage;
    this.loadData(true);
  };

  changeRowsPerPage = (newRowsPerPage) => {
    rowsPerPage = newRowsPerPage;
    this.loadData(true);
  };

  changeSort = (activeColumnIndex, newOrder) => {
    const { columns } = this.state;
    let columnsSorted = columns.slice();
    columnsSorted.map((column) => (column.options.sortDirection = undefined));
    columnsSorted[activeColumnIndex].options.sortDirection = newOrder;
    this.setState({
      columns: columnsSorted,
    });
    activeColumnSort = activeColumnIndex;
    order = newOrder;
    this.loadData(true);
  };

  changeSearch = (value) => {
    this.setState({
      isSearching: true,
    });
    this.loadData(false);
  };
  onChangeSearch = (event) => {
    let value = event.currentTarget ? event.currentTarget.value : event.value;
    this.setState({
      searchText: value,
    });
    this.changeSearchDebounce(value);
  };

  columnViewChange = (newColumns) => {
    const { columns } = this.state;
    let modifiedColumns = columns.slice();
    modifiedColumns.map(
      (column) =>
        (column.options.display = newColumns.some(
          (newColumn) =>
            newColumn.field === column.field && newColumn.display === "true"
        ))
    );
    this.setState({
      columns: modifiedColumns,
    });
    localStorage.setItem("tikasReportColumns", JSON.stringify(modifiedColumns));
  };

  onTableChange = (action, tableState) => {
    switch (action) {
      case "changePage":
        this.changePage(tableState.page);
        break;
      case "changeRowsPerPage":
        this.changeRowsPerPage(tableState.rowsPerPage);
        break;
      case "sort":
        this.changeSort(
          tableState.activeColumn,
          tableState.announceText.includes("ascending") ? "asc" : "desc"
        );
        break;
      case "search":
        this.changeSearch(tableState.searchText);
        break;
      case "filterChange":
        this.filterChange(tableState.filterList);
        break;
      case "columnViewChange":
        this.columnViewChange(tableState.columns);
        break;
      default:
    }
  };

  render() {
    const { classes, t, theme } = this.props;
    const { data2, columns, isLoadingNewData, dataCount, filterRange } =
      this.state;

    const options = {
      filter: false,
      responsive: "stacked",
      expandableRows: true,
      selectableRows: false,
      download: false,
      search: false,
      viewColumns: false,
      serverSide: true,
      rowsPerPage: rowsPerPage,
      count: dataCount,
      expandableRowsOnClick: true,
      page: page,
      print: false,
      renderExpandableRow: (rowData, rowMeta) => {
        rowData =
          this.state && this.state.data2[rowMeta.rowIndex].items
            ? this.state.data2[rowMeta.rowIndex].items
            : [];
        let rowSpan = rowData.length + 1;
        return (
          <React.Fragment>
            <TableRow className={"showRow"}>
              <TableCell colSpan={1} />
              <TableCell colSpan={2} style={{ position: "relative" }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell className={"detailsHead "} align="right">
                        {"Cantidad"}
                      </TableCell>
                      <TableCell className={"detailsHead "} align="right">
                        {"Producto"}
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rowData.map((data) => (
                      <React.Fragment key={data.productId}>
                        <TableRow>
                          <TableCell className="reportDetail" align="right">
                            {data.quantity}
                          </TableCell>
                          <TableCell className="reportDetail" align="right">
                            {data.productName}
                          </TableCell>
                        </TableRow>
                      </React.Fragment>
                    ))}
                  </TableBody>
                </Table>
              </TableCell>
              <TableCell colSpan={1} />
            </TableRow>
          </React.Fragment>
        );
      },
      onRowsExpand: (curExpanded, allExpanded) => {
        setTimeout(this.setState({ curExpanded: curExpanded[0].index }), 800);
      },

      customToolbar: () => {
        return (
          <LinearProgress
            style={{
              opacity: this.state.isSearching ? "1" : "0",
              width: "100%",
              background: "none",
              padding: 0,
              position: "absolute",
              zIndex: 1,
              marginLeft: "-26%",
            }}
            variant="query"
          />
        );
      },
      onTableChange: this.onTableChange,
      textLabels: {
        body: {
          noMatch: t("dontSearchRegister"),
          toolTip: "Ordenar",
        },
        pagination: {
          next: "Siguiente página",
          previous: "Pagina anterior",
          rowsPerPage: t("show"),
          displayRows: "de",
        },
        toolbar: {
          search: "Buscar",
          downloadCsv: "Descargar CSV",
          print: "Imprimir",
          viewColumns: t("seeColumn"),
          filterTable: "Filtros",
        },
        filter: {
          all: "Todos",
          title: "Filtros",
          reset: "Limpiar filtros",
        },
        viewColumns: {
          title: "Mostrar columnas",
          titleAria: "Mostrar/Esconder Columnas",
        },
        selectedRows: {
          text: "fila(s) seleccionadas",
        },
      },
    };

    const staticRanges = getDefaultStaticRanges(t);
    if (!this.state.isDesktop) {
      return (
        (<React.Fragment>
          <FilterButton
            body={
              <Tab
                className={classes.tab}
                menu={{ secondary: true, pointing: true }}
                panes={this.state.panes}
              />
            }
            withOutListener={!this.state.isDesktop}
            title=""
            actions=""
            key={"FilterButton" + this.state.isDesktop}
          />
          <Grid container xs={12} style={{ marginTop: 30 }}>
            <Grid item xs={12} style={{ marginTop: 10 }}>
              <Paper className={classes.paper}>
                <MostOrderedProducts
                  count={6}
                  startDate={filterRange.startDate}
                  endDate={filterRange.endDate}
                />
              </Paper>
            </Grid>
            <Grid item xs={12} style={{ marginTop: 10 }}>
              <Paper className={classes.paper}>
                <PeopleWithMoreOrders
                  count={6}
                  startDate={filterRange.startDate}
                  endDate={filterRange.endDate}
                />
              </Paper>
            </Grid>
            <Grid item xs={12} style={{ marginTop: 10 }}>
              <Paper className={classes.paper}>
                <AnnualOrdersChart />
              </Paper>
            </Grid>
            <Grid
              item
              xs={12} /*style={{ marginLeft: "0.5%" }}*/
              style={{ marginTop: 10 }}
            >
              <Paper className={classes.paper}>
                <MonthlyOrdersChart />
              </Paper>
            </Grid>
          </Grid>
          <div style={{ padding: "4px", position: "relative" }}>
            {/* <Header as="h2" className={classes.filterTitle}>
              <Header.Content />
            </Header> */}
            <React.Fragment>
              <Grid
                item
                // direction="column"
                // justify="flex-start"
                // alignItems="flex-start"
                style={
                  this.state.isDesktop
                    ? {
                        zIndex: 1,
                        display: this.state.hideSearch ? "none" : "flex",
                        position: "absolute",
                        right: "10em",
                      }
                    : {
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 20px 20px 20px",
                      }
                }
              >
                <FormControl xs={12} md={12} className={classes.textField}>
                  <InputLabel htmlFor="adornment-password">
                    {t("search") + "..."}
                  </InputLabel>
                  <Input
                    id="adornment-password"
                    type={"text"}
                    value={this.state.searchText ? this.state.searchText : ""}
                    onChange={this.onChangeSearch}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          //style={{ padding: 0 }}
                          onClick={() =>
                            this.setState({ registerOnDetails: undefined })
                          }
                          size="large">
                          <Icon
                            name="search"
                            //inverted
                            //circular
                            link
                            style={{
                              margin: 0,
                              color: theme.palette.text.main,
                            }}
                          />
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>
              <Transition.Group animation={"slide down"} duration={500}>
                <MUIDataTable
                  title={
                    t("ConsumptionsGeneratedFrom") +
                    " " +
                    parseDate(filterRange.startDate) +
                    " " +
                    t("To") +
                    " " +
                    parseDate(filterRange.endDate)
                  }
                  data={data2}
                  columns={columns}
                  options={options}
                />
              </Transition.Group>
            </React.Fragment>
            {/* <div style={{ width: "100%", height: 300, position: "relative" }}>
                <CircularProgress
                  className={classes.circularProgress}
                  size={50}
                />
              </div> */}
          </div>
          {/* <div className={classes.bottomActions}>
            <PrintButton title="Access" />
            <DownloadButton title="Access" />
          </div> */}
        </React.Fragment>)
      );
    }
    return (
      (<React.Fragment>
        <FilterButton
          body={
            <DateRangePicker
              onChange={this.handleRangeChange}
              showSelectionPreview={true}
              moveRangeOnFirstSelection={false}
              months={1}
              ranges={[this.state.dateRangePicker.selection]}
              direction="horizontal"
              className={classes.rangePicker}
              onRangeFocusChange={this.handleRangeFocusChange}
              focusedRange={this.state.focusedRange}
              staticRanges={staticRanges}
              inputRanges={getDefaultInputRanges(t)}
              dragSelectionEnabled={false}
            />
          }
          title=""
          actions=""
        />
        <Grid container spacing={16} style={{ marginTop: 30 }}>
          <Grid
            container
            spacing={16}
            style={{ maxWidth: "99%", marginLeft: "0.5%" }}
          >
            <Grid item xs={4}>
              <Paper className={classes.paper}>
                <MostOrderedProducts
                  count={6}
                  startDate={filterRange.startDate}
                  endDate={filterRange.endDate}
                />
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper className={classes.paper}>
                <PeopleWithMoreOrders
                  count={6}
                  startDate={filterRange.startDate}
                  endDate={filterRange.endDate}
                />
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper className={classes.paper}>
                <AnnualOrdersChart />
              </Paper>
            </Grid>
          </Grid>
          <Grid item xs={12} style={{ maxWidth: "99%", marginLeft: "0.5%" }}>
            <Paper className={classes.paper}>
              <MonthlyOrdersChart />
            </Paper>
          </Grid>
        </Grid>
        <div style={{ padding: "4px", position: "relative" }}>
          <Header as="h2" className={classes.filterTitle}>
            <Header.Content />
          </Header>
          <React.Fragment>
            <Grid
              item
              // direction="column"
              // justify="flex-start"
              // alignItems="flex-start"
              style={{
                zIndex: 1,
                display: this.state.hideSearch ? "none" : "flex",
                position: "absolute",
                right: "10em",
              }}
            >
              <FormControl xs={12} md={12} className={classes.textField}>
                <InputLabel htmlFor="adornment-password">
                  {t("search") + "..."}
                </InputLabel>
                <Input
                  id="adornment-password"
                  type={"text"}
                  value={this.state.searchText ? this.state.searchText : ""}
                  onChange={this.onChangeSearch}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        //style={{ padding: 0 }}
                        onClick={() =>
                          this.setState({ registerOnDetails: undefined })
                        }
                        size="large">
                        <Icon
                          name="search"
                          //inverted
                          //circular
                          link
                          style={{
                            margin: 0,
                            color: theme.palette.text.main,
                          }}
                        />
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Grid>
            <Transition.Group animation={"slide down"} duration={500}>
              <MUIDataTable
                title={
                  t("ConsumptionsGeneratedFrom") +
                  " " +
                  parseDate(filterRange.startDate) +
                  " " +
                  t("To") +
                  " " +
                  parseDate(filterRange.endDate)
                }
                data={data2}
                columns={columns}
                options={options}
              />
            </Transition.Group>
          </React.Fragment>
          {/* <div style={{ width: "100%", height: 300, position: "relative" }}>
              <CircularProgress
                className={classes.circularProgress}
                size={50}
              />
            </div> */}
        </div>
        {/* <div className={classes.bottomActions}>
          <PrintButton title="Access" />
          <DownloadButton title="Access" />
        </div> */}
      </React.Fragment>)
    );
  }
}

const styles = (theme) => ({
  fab: {
    margin: theme.spacing.unit,
    pointerEvents: "auto",
  },
  root: {
    display: "flex",
  },
  bottomActions: {
    position: "fixed",
    bottom: 10,
    right: 0,
    zIndex: 101,
  },
  topActions: {
    position: "fixed",
    top: 72,
    right: "40%",
    width: "100%",
    zIndex: 151,
    justifyContent: "flex-end",
    pointerEvents: "none",
    display: "flex",
  },
  chartContainer: {
    marginLeft: -22,
  },
  tableContainer: {
    minHeight: 320,
  },
  typography: {
    padding: theme.spacing.unit * 2,
  },
  arrow: {
    position: "absolute",
    fontSize: 7,
    width: "3em",
    height: "3em",
    "&::before": {
      content: '""',
      margin: "auto",
      display: "block",
      width: 0,
      height: 0,
      borderStyle: "solid",
    },
  },
  paper: {
    zIndex: 151,
  },
  popper: {
    zIndex: 151,
    '&[x-placement*="bottom"] $arrow': {
      top: 0,
      marginTop: "-0.9em",
      width: "3em",
      height: "1em",
      "&::before": {
        borderWidth: "0 1em 1em 1em",
        borderColor: `transparent transparent #424242 transparent`,
      },
    },
    display: "flex",
    justifyContent: "center",
  },
  circularProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -25,
    marginLeft: -50,
  },
  contentLoader: {
    display: "flex",
    position: "fixed",
    top: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "#d0d0d080",
  },
  label: {
    padding: "0px !important",
    width: "200px !important",
    height: "35px",
    lineHeight: "35px",
  },

  popup: {
    backgroundColor: "#424242 !important",
    border: "solid 2px #4b4f53 !important",
    "&::before": {
      backgroundColor: "#424242 !important",
    },
    zIndex: "1400 !important",
  },

  MuiLinearProgress: {
    root: {
      width: " 100%",
      background: "none",
      padding: 0,
      position: "absolute",
      zIndex: 1,
      bottom: 0,
    },
  },
  filterTitle: {
    marginTop: "2px !important",
    marginLeft: "10px !important",
    "& *": {
      color: "#9b9b9b",
    },
  },
  expand: {
    transform: "rotate(0deg)",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  pane: {
    padding: 0 + " !important",
    border: 0 + " !important",
    color: "#fff",
    backgroundColor: theme.palette.backgroundSecondary.main + " !important",
    display: "flex !important",
    justifyContent: "center",
  },
  tab: {
    "& >.menu >.item": {
      color: theme.palette.text.main + " !important",
    },
    "& >.menu >.item.active": {
      borderColor: theme.palette.primary.main + " !important",
    },
  },

  //Mobile styles
  activityReportContainer: {
    [theme.breakpoints.down('md')]: {
      marginTop: 0,
    },
  },
});

AccessReport.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withTranslation()(
  withStyles(styles, { withTheme: true })(AccessReport)
);
