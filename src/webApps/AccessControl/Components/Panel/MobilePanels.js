import React, { Component } from "react";
import MUIDataTable from "mui-datatables";
import { connect } from "react-redux";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { withTranslation } from "react-i18next";
import { withStyles } from '@mui/styles';
import { debounce } from "throttle-debounce";
import PointIcon from "@mui/icons-material/FiberManualRecord";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { ListItemIcon } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import { Icon } from "semantic-ui-react";
import InputAdornment from "@mui/material/InputAdornment";
import { requestGetMobilePanels } from "../../../../actions/AccessControl/panel_actions";
import HelperFunctions from "../../../../utils/HelperFunctions";
import styles from "../../../../assets/styles/AccessControl_styles/Panel_styles/mobilePanelStyles";
import moment from "moment";
import { isNullOrUndefined } from "util";

let page = 0;
let rowsPerPage = 10;
let activeColumnSort = 0;
let order = "asc";

// let aux = [
//   {
//     lastConnection: "11:52 2/10/2019",
//     name: "TEST - 1",
//     status: false,
//     lastEvent: "11:00 2/10/2019"
//   },
//   {
//     lastConnection: "10:30 2/10/2019",
//     name: "TEST - 2",
//     status: true,
//     lastEvent: "9:00 2/10/2019"
//   }
// ];

class MobilePanels extends Component {
  state = { isDesktop: true };
  constructor(props) {
    super(props);
    const { t } = props;
    this.state = {
      columns: this.translateColumns(t, true),
      data: [],
      dataCount: 0,
      searchText: "",
    };
    this.changeSearchDebounce = debounce(300, (value) => {
      this.changeSearch(value);
    });
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateScreenMode);
  }

  updateScreenMode = () => {
    this.setState({ isDesktop: window.innerWidth > 900 });
  };

  componentDidMount() {
    this.updateScreenMode();
    window.addEventListener("resize", this.updateScreenMode);
    this.loadData();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.i18n.language !== prevState.language ||
      nextProps.successGetMobilePanels !== prevState.successGetMobilePanels ||
      nextProps.loadingMobilePanels !== prevState.loadingMobilePanels
    ) {
      return {
        language: nextProps.i18n.language,
        loadingMobilePanels: nextProps.loadingMobilePanels,
        successGetMobilePanels: nextProps.successGetMobilePanels,
        data: nextProps.mobilePanels ? nextProps.mobilePanels.data : [],
        dataCount: nextProps.mobilePanels
          ? nextProps.mobilePanels.dataCount
          : 0,
      };
    } else return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.language !== this.state.language) {
      this.setState({
        ...prevState,
        columns: this.translateColumns(this.props.t, false),
      });
    }
  }

  loadData = (isSearch) => {
    const { columns, searchText = "" } = this.state;
    this.props.requestGetMobilePanels({
      start: isSearch ? 0 : page * rowsPerPage,
      length: rowsPerPage,
      order: columns[activeColumnSort].name + " " + order,
      search: searchText,
    });
  };

  changePage = (newPage) => {
    page = newPage;
    this.loadData();
  };

  changeRowsPerPage = (newRowsPerPage) => {
    rowsPerPage = newRowsPerPage;
    this.loadData();
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
    this.loadData();
  };

  changeSearch = (value) => {
    this.setState({
      isSearching: true,
    });

    this.loadData(true);
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
            newColumn.name === column.name && newColumn.display === "true"
        ))
    );
    this.setState({
      columns: modifiedColumns,
    });
    localStorage.setItem("mobilPanelColumns", JSON.stringify(modifiedColumns));
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
        //   this.changeSearch(tableState.searchText);
        break;
      case "columnViewChange":
        this.columnViewChange(tableState.columns);
        break;
      default:
    }
  };

  translateColumns = (t, initial) => {
    const { classes } = this.props;
    const isDesktop = window.innerWidth > 900;

    let colStorage = JSON.parse(localStorage.getItem("mobilPanelColumns"));

    let columDisplay = {};
    if (initial && !isNullOrUndefined(colStorage)) {
      colStorage &&
        colStorage.map(
          (elem) =>
            (columDisplay[elem.name] = !isNullOrUndefined(elem.options.display)
              ? elem.options.display
              : true)
        );
    } else {
      this.state &&
        this.state.columns &&
        this.state.columns.map(
          (elem) =>
            (columDisplay[elem.name] = !isNullOrUndefined(elem.options.display)
              ? elem.options.display
              : true)
        );
    }
    return [
      {
        label: t("Panel"),
        name: "name",
        options: {
          filter: true,
          sort: true,
          sortDirection: activeColumnSort === 0 ? order : "none",
          display: isNullOrUndefined(columDisplay.name)
            ? true
            : columDisplay.name,
          customBodyRender: (data, metadata) => {
            const { rowData } = metadata;
            if (moment().diff(moment(rowData[1]), "minutes") <= 2) {
              return (
                <ListItem className={classes.nested}>
                  <ListItemIcon>
                    <PointIcon style={{ color: "#437043" }} />
                  </ListItemIcon>
                  <ListItemText inset primary={data} />
                </ListItem>
              );
            } else {
              return (
                <ListItem className={classes.nested}>
                  <ListItemIcon>
                    <PointIcon style={{ color: "#743632" }} />
                  </ListItemIcon>
                  <ListItemText inset primary={data} />
                </ListItem>
              );
            }
          },
        },
      },
      {
        label: t("LastConnection"),
        name: "lastActivity",
        options: {
          filter: true,
          sort: true,
          sortDirection: activeColumnSort === 1 ? order : "none",
          display: isNullOrUndefined(columDisplay.lastActivity)
            ? true
            : columDisplay.lastActivity,
          customBodyRender: (data) => {
            return <Typography>{HelperFunctions.parseDate2(data)}</Typography>;
          },
        },
      },
      {
        label: t("LastEvent"),
        name: "lastAccessEvent",
        options: {
          display: !isDesktop
            ? false
            : isNullOrUndefined(columDisplay.lastAccessEvent)
            ? true
            : columDisplay.lastAccessEvent,
          filter: true,
          sort: true,
          sortDirection: activeColumnSort === 1 ? order : "none",
          customBodyRender: (data) => {
            return <Typography>{HelperFunctions.parseDate2(data)}</Typography>;
          },
        },
      },
    ];
  };

  render() {
    const { columns, dataCount, data } = this.state;
    const { classes, t } = this.props;
    const options = {
      selectableRowsOnClick: true,
      selectableRows: "single",
      filter: false,
      viewColumns: this.state.isDesktop,
      print: this.state.isDesktop,
      download: false,
      //filterType: this.state.isDesktop ? "dropdown" : "none",
      responsive: "scrollFullHeight",
      search: false,
      serverSide: true,
      rowsPerPage: rowsPerPage,
      count: dataCount,
      page: page,
      rowsPerPageOptions: [10, 25, 50],
      customToolbar: () => {
        return (
          <LinearProgress
            style={{
              opacity: this.state.loadingMobilePanels ? "1" : "0",
              width: "100%",
              background: "none",
              marginLeft: "-55%",
              padding: 0,
              position: "absolute",
              zIndex: 1,
            }}
            variant="query"
          />
        );
      },
      onTableChange: this.onTableChange,
      textLabels: {
        body: {
          noMatch: t("dontSearchRegister"),
          toolTip: t("order"),
        },
        pagination: {
          next: t("nextPage"),
          previous: t("beforePage"),
          rowsPerPage: `${t("show")} : `,
          displayRows: t("of"),
        },
        toolbar: {
          search: t("search"),
          downloadCsv: t("downloadCSV"),
          print: t("print"),
          viewColumns: t("seeColumn"),
          filterTable: t("filter"),
        },
        filter: {
          all: t("all"),
          title: t("filter"),
          reset: t("cleanFilter"),
        },
        viewColumns: {
          title: t("showColumns"),
          titleAria: t("showHideColumns"),
        },
        selectedRows: {
          text: t("rowsSelected"),
        },
      },
    };
    return (
      (<div>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              className={classes.customButton}
              onClick={this.props.onClose}
              size="large">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" color="inherit">
              {t("MobilePanels")}
            </Typography>
          </Toolbar>
        </AppBar>
        <div style={{ marginTop: "10vh" }}>
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
                        className={classes.searchIcon}
                      />
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>
          <MUIDataTable
            title={t("MobilePanels")}
            data={data}
            columns={columns}
            options={options}
          />
        </div>
      </div>)
    );
  }
}

const mapStateToProps = ({ Panel }) => {
  return {
    loadingMobilePanels: Panel.loadingMobilePanels,
    mobilePanels: Panel.mobilePanels,
    successGetMobilePanels: Panel.successGetMobilePanels,
  };
};

const mapDispatchToProps = { requestGetMobilePanels };

const MobilePanelsConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(MobilePanels);

export default withTranslation()(
  withStyles(styles, { withTheme: true })(MobilePanelsConnected)
);
