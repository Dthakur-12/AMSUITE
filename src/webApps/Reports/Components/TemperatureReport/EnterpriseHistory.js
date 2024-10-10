import MUIDataTable from "mui-datatables";
import { withTranslation } from "react-i18next";
import React from "react";
import { connect } from "react-redux";
import { debounce } from "throttle-debounce";
import LinearProgress from "@mui/material/LinearProgress";
import { Tab } from "semantic-ui-react";
import { endOfDay, startOfDay } from "date-fns";
import { Print } from "@mui/icons-material";
import {
  Fab,
  Typography,
  CircularProgress,
  Fade,
} from "@mui/material";
import {
  withStyles,
} from "@mui/styles";
import {
  getDefaultInputRanges,
  getDefaultStaticRanges,
} from "../Shared/DateRangePickerInputsGenerator";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import {
  requestRegisters,
  requestNumericalRecordsByEnterprises,
  requestNumericalRecordsByEnterprisesXLS,
} from "../../../../actions/EasyAccess/Register_actions";
import { requestEnterprises } from "../../../../actions/EasyAccess/Enterprise_actions";
import { DateRangePicker, DateRange } from "react-date-range";
import { Icon } from "semantic-ui-react";
import IconButton from "@mui/material/IconButton";
import FilterButton from "../Shared/FilterButton";
import TableFiltersView from "./TableFiltersView.js";
import { isNullOrUndefined } from "util";

// import {
//   requestBusTickets,
//   requestDownloadBusTicketsXLS,
// } from "../../../../actions/AccessControl/actions/AccessControl/trip_action";
import TableSkeletonLoader from "../../../Shared/TableSkeletonLoader";
import moment from "moment";
const dateNow = new Date();
let page = 0;
let rowsPerPage = 15;
let activeColumnSort = 2;
let order = "desc";
const drawerWidth = 240;

class EnterpriseHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      dataCount: 0,
      columns: this.translateColumns(props.t, true),
      dateRangePicker: {
        selection: {
          startDate: new Date(
            dateNow.getFullYear(),
            dateNow.getMonth(),
            1,
            0,
            0,
            0
          ),
          endDate: new Date(dateNow.setHours(23, 59, 0)),
          key: "selection",
        },
      },
      filterRange: {
        startDate: new Date(
          dateNow.getFullYear(),
          dateNow.getMonth(),
          1,
          0,
          0,
          0
        ),
        endDate: new Date(dateNow.setHours(23, 59, 0)),
      },
      selectedEnterprises: [],
      selectedEnterprisesObject: [],
      isLoadingNewData: false,
      successDownloadXLS: false,
    };
    this.changeSearchDebounce = debounce(300, (value) =>
      this.changeSearch(value)
    );
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.i18n.language !== prevState.language ||
      nextProps.enterprises !== prevState.enterprises ||
      nextProps.successRecordsByEnterprises !==
        prevState.successRecordsByEnterprises ||
      nextProps.loadingRecordsByEnterprises !==
        prevState.loadingRecordsByEnterprises ||
      nextProps.recordByEnterprises !== prevState.recordByEnterprises ||
      nextProps.successRecordsByEnterprisesXLS !==
        prevState.successRecordsByEnterprisesXLS ||
      nextProps.recordByEnterprisesXLS !== prevState.recordByEnterprisesXLS
    ) {
      return {
        language: nextProps.i18n.language,
        enterprises: nextProps.enterprises,
        successRecordsByEnterprises: nextProps.successRecordsByEnterprises,
        loadingRecordsByEnterprises: nextProps.loadingRecordsByEnterprises,
        recordByEnterprises: nextProps.recordByEnterprises,
        successRecordsByEnterprisesXLS:
          nextProps.successRecordsByEnterprisesXLS,
        recordByEnterprisesXLS: nextProps.recordByEnterprisesXLS,
      };
    } else return null;
  }

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
    // this.loadData(true);

    this.props.requestEnterprises({
      start: 0,
      length: 6,
      order: "name asc",
      search: "",
    });
  }
  componentDidUpdate(prevProps, prevState) {
    const { selectedEnterprises, filterRange } = prevState;
    if (prevState.language !== this.state.language) {
      this.setState({
        ...prevState,
        columns: this.translateColumns(this.props.t, false),
      });
    }
    if (prevState.enterprises !== this.state.enterprises) {
      this.selectAll(this.state.enterprises);
    }
    if (
      this.state.successRecordsByEnterprisesXLS &&
      this.state.successRecordsByEnterprisesXLS !==
        prevState.successRecordsByEnterprisesXLS
    ) {
      let report =
        "data:application/vnd.ms-excel" +
        ";base64," +
        this.state.recordByEnterprisesXLS.data;

      require("downloadjs")(
        report,
        `${this.props.t("RecordsByEnterprisesReport")}.xls`,
        "application/vnd.ms-excel"
      );
    }

    if (
      this.state.successRecordsByEnterprises &&
      this.state.successRecordsByEnterprises !==
        prevState.successRecordsByEnterprises
    ) {
      this.setState({
        data: this.state.recordByEnterprises.data,
        dataCount: this.state.recordByEnterprises.dataCount,
        isLoadingNewData: false,
      });
    }
    if (
      selectedEnterprises.length !== this.state.selectedEnterprises.length ||
      filterRange.startDate !== this.state.filterRange.startDate ||
      filterRange.endDate !== this.state.filterRange.endDate
    ) {
      this.loadData(true);
    }
  }

  loadData = (loadData, isSearch) => {
    if (loadData) {
      this.setState({ isLoadingNewData: true });
    }
    let valueStart = new Date(
      this.state.filterRange.startDate -
        this.state.filterRange.startDate.getTimezoneOffset() * 60000
    ).toJSON();
    let valueEnd = new Date(
      this.state.filterRange.endDate -
        this.state.filterRange.endDate.getTimezoneOffset() * 60000
    ).toJSON();
    this.props.requestNumericalRecordsByEnterprises({
      start: isSearch ? 0 : page * rowsPerPage,
      length: rowsPerPage,
      order: this.state.columns[activeColumnSort].name + " " + order,
      search: this.state.searchText ? this.state.searchText : "",
      startDate: valueStart,
      endDate: valueEnd,
      companyIds: this.state.selectedEnterprises,
    });
  };

  handleDownloadReport = () => {
    let valueStart = new Date(
      this.state.filterRange.startDate -
        this.state.filterRange.startDate.getTimezoneOffset() * 60000
    ).toJSON();
    let valueEnd = new Date(
      this.state.filterRange.endDate -
        this.state.filterRange.endDate.getTimezoneOffset() * 60000
    ).toJSON();
    this.props.requestNumericalRecordsByEnterprisesXLS({
      start: page * rowsPerPage,
      length: rowsPerPage,
      order: this.state.columns[activeColumnSort].name + " " + order,
      search: this.state.searchText ? this.state.searchText : "",
      startDate: valueStart,
      endDate: valueEnd,
      companyIds: this.state.selectedEnterprises,
    });
  };

  selectAll = (enterprises) => {
    let selectEnt = [];
    let selectEntObj = [];
    enterprises.data.map((ent) => {
      selectEnt.push(ent.id);
      selectEntObj.push({ id: ent.id, name: ent.name });
    });
    this.setState({
      selectedEnterprises: selectEnt,
      selectedEnterprisesObject: selectEntObj,
    });
  };

  handleEnterpriseSelect = (enterprise) => {
    const index = this.state.selectedEnterprises.indexOf(enterprise.id);
    const newSelectedEnterprises = this.state.selectedEnterprises.slice();
    const newSelectedEnterprisesObject = this.state.selectedEnterprisesObject.slice();
    if (index === -1) {
      newSelectedEnterprises.splice(0, 0, enterprise.id);
      newSelectedEnterprisesObject.splice(0, 0, enterprise);
    } else {
      newSelectedEnterprises.splice(index, 1);
      newSelectedEnterprisesObject.splice(index, 1);
    }
    this.setState({
      selectedEnterprises: newSelectedEnterprises,
      selectedEnterprisesObject: newSelectedEnterprisesObject,
    });
  };

  handleDeleteEntierprises = (id) => {
    const newSelectedEnterprises = this.state.selectedEnterprises.slice();
    const newSelectedEnterprisesObject = this.state.selectedEnterprisesObject.slice();
    const index = newSelectedEnterprises.indexOf(id);
    if (index !== -1) {
      newSelectedEnterprises.splice(index, 1);
      newSelectedEnterprisesObject.splice(index, 1);
    }
    this.setState({
      selectedEnterprises: newSelectedEnterprises,
      selectedEnterprisesObject: newSelectedEnterprisesObject,
    });
  };

  handleRangeChange = (ranges) => {
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
      {
        menuItem: t("Enterprises"),
        render: () => (
          <Tab.Pane className={classes.pane} attached={false}>
            <TableFiltersView
              selectAll={this.selectAll}
              selectedEnterprises={this.state.selectedEnterprises}
              selectedEnterprisesObject={this.state.selectedEnterprisesObject}
              handleDeleteEnterprise={this.handleDeleteEntierprises}
              handleEnterpriseSelect={this.handleEnterpriseSelect}
              handleTabSelect={this.handleTabSelect}
              tableEnterprise={true}
              selectedTab={this.state.selectedTab}
              key={this.state.selectedTab}
            />
          </Tab.Pane>
        ),
      },
    ];
  };

  translateColumns = (t, initial) => {
    let colStorage = JSON.parse(
      localStorage.getItem("enterpriseHistoryColumns")
    );

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
        label: t("name"),
        name: "name",
        options: {
          filter: true,
          sort: true,
          display: isNullOrUndefined(columDisplay.name)
            ? true
            : columDisplay.name,
        },
      },
      {
        label: t("LastName"),
        name: "lastName",
        options: {
          filter: true,
          sort: true,
          display: isNullOrUndefined(columDisplay.lastName)
            ? true
            : columDisplay.lastName,
        },
      },
      {
        label: t("dni"),
        name: "documentNumber",
        options: {
          filter: true,
          sort: true,
          display: isNullOrUndefined(columDisplay.documentNumber)
            ? true
            : columDisplay.documentNumber,
        },
      },
      {
        label: t("Company"),
        name: "companyName",
        options: {
          filter: true,
          sort: true,
          display: isNullOrUndefined(columDisplay.companyName)
            ? true
            : columDisplay.companyName,
        },
      },
      {
        label: t("Date"),
        name: "date",
        options: {
          filter: true,
          sort: false,
          display: isNullOrUndefined(columDisplay.date)
            ? true
            : columDisplay.date,
          customBodyRender: (data, meta) => {
            return (
              <Typography>
                {new Intl.DateTimeFormat("es-ES", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                }).format(Date.parse(data))}
              </Typography>
            );
          },
        },
      },
      {
        label: t("Value"),
        name: "result",
        options: {
          filter: true,
          sort: true,
          display: isNullOrUndefined(columDisplay.result)
            ? true
            : columDisplay.result,
        },
      },
      {
        label: t("Reader"),
        name: "readerName",
        options: {
          filter: true,
          sort: true,
          display: isNullOrUndefined(columDisplay.readerName)
            ? true
            : columDisplay.readerName,
        },
      },
      {
        label: t("Panel"),
        name: "panelName",
        options: {
          filter: true,
          sort: true,
          display: isNullOrUndefined(columDisplay.panelName)
            ? true
            : columDisplay.panelName,
        },
      },
    ];
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

  changeSearch = (searchText) => {
    const { isSearching } = this.state;
    this.setState({
      searchText,
      isSearching: true,
    });
    if (!isSearching) {
      this.loadData(false, true);
    }
  };

  filterChange = (filterList) => {};

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
    localStorage.setItem(
      "enterpriseHistoryColumns",
      JSON.stringify(modifiedColumns)
    );
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
    const { columns, isLoadingNewData, data, panes = [] } = this.state;
    const { t, classes, theme } = this.props;
    const staticRanges = getDefaultStaticRanges(t);
    // const panes = [
    //   {
    //     menuItem: t("Date"),
    //     render: () => (
    //       <Tab.Pane className={classes.pane} attached={false}>
    //         <div style={{ display: "flex", justifyContent: "center" }}>
    //           <DateRangePicker
    //             onChange={this.handleRangeChange}
    //             showSelectionPreview={true}
    //             moveRangeOnFirstSelection={false}
    //             months={1}
    //             ranges={[this.state.dateRangePicker.selection]}
    //             direction="horizontal"
    //             className={classes.rangePicker}
    //             staticRanges={staticRanges}
    //             inputRanges={getDefaultInputRanges(t)}
    //             dragSelectionEnabled={false}
    //           />
    //         </div>
    //       </Tab.Pane>
    //     ),
    //   },
    //   {
    //     menuItem: t("Enterprises"),
    //     render: () => (
    //       <Tab.Pane className={classes.pane} attached={false}>
    //         <TableFiltersView
    //           selectAll={this.selectAll}
    //           selectedEnterprises={this.state.selectedEnterprises}
    //           selectedEnterprisesObject={this.state.selectedEnterprisesObject}
    //           handleDeleteEnterprise={this.handleDeleteEntierprises}
    //           handleEnterpriseSelect={this.handleEnterpriseSelect}
    //           handleTabSelect={this.handleTabSelect}
    //           tableEnterprise={true}
    //           selectedTab={this.state.selectedTab}
    //           key={this.state.selectedTab}
    //         />
    //       </Tab.Pane>
    //     ),
    //   },
    // ];

    const options = {
      search: false,
      download: false,
      filterType: "dropdown",
      responsive: "scrollFullHeight",
      serverSide: true,
      rowsPerPage: rowsPerPage,
      count: this.state.dataCount, ///userActivities ? userActivities.dataCount : 0,/////////////
      page: page,
      selectableRows: "none",
      download: false,
      filter: false,
      print: false,
      onRowClick: this.onRowClicked,
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

    return (
      <React.Fragment style={{ width: "80%" }}>
        <FilterButton
          body={
            <Tab
              className={classes.tab}
              menu={{ secondary: true, pointing: true }}
              panes={panes}
            />
          }
          title=""
          actions=""
        />
        <div className={classes.tableContainer}>
          <MUIDataTable
            title={t("People")}
            data={data}
            columns={columns}
            options={options}
          />
          <Fade in={isLoadingNewData} className={classes.contentLoader}>
            <div
              style={{ pointerEvents: isLoadingNewData ? "inherit" : "none" }}
            >
              <CircularProgress
                className={classes.circularProgress}
                size={50}
              />
            </div>
          </Fade>
        </div>
        <div className={classes.bottomActions}>
          <Fab
            color="primary"
            aria-label="Report"
            className={classes.fab}
            onClick={this.handleDownloadReport}
          >
            <Print style={{ fontSize: "3em" }} name="filter" />
          </Fab>
        </div>
      </React.Fragment>
    );
  }
}
const styles = (theme) => ({
  root: {
    display: "flex",
  },
  bottomActions: {
    position: "fixed",
    bottom: 10,
    right: 20,
    zIndex: 101,
  },
  chartContainer: {
    marginLeft: -22,
  },
  chip: {
    marginRight: theme.spacing.unit,
  },
  fab: {
    backgroundColor: theme.palette.primary.main,
  },
  fabIcon: {
    color: theme.palette.text.main,
  },
  tableContainer: {
    position: "relative",
  },
  pane: {
    // width: "7500px",
    padding: 0 + " !important",
    border: 0 + " !important",
    color: "#fff",
    backgroundColor: theme.palette.backgroundSecondary.main + " !important",
  },
  tab: {
    width: "850px",
    "& >.menu >.item": {
      color: theme.palette.text.main + " !important",
    },
    "& >.menu >.item.active": {
      borderColor: theme.palette.primary.main + " !important",
    },
  },
  circularProgress: {
    // position: "absolute",
    // top: "50%",
    // left: "50%",
    // marginTop: -25,
    // marginLeft: -50,
  },
  contentLoader: {
    display: "flex",
    justifyContent: "center",
    top: 0,
    width: "100%",
    height: "100%",
    position: "absolute",
    alignItems: "center",
    zIndex: 101,
    backgroundColor: "#d0d0d080",
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

const mapDispatchToProps = {
  requestEnterprises: requestEnterprises,
  requestRegisters: requestRegisters,
  requestNumericalRecordsByEnterprisesXLS: requestNumericalRecordsByEnterprisesXLS,
  requestNumericalRecordsByEnterprises: requestNumericalRecordsByEnterprises,
};

const mapStateToProps = ({ Registers, Enterprise }) => {
  return {
    enterprises: Enterprise.enterprises,
    registers: Registers.registers,
    successRegisters: Registers.successRegisters,
    loadingRegister: Registers.loading,
    successRecordsByEnterprises: Registers.successRecordsByEnterprises,
    loadingRecordsByEnterprises: Registers.loadingRecordsByEnterprises,
    recordByEnterprises: Registers.recordByEnterprises,
    successRecordsByEnterprisesXLS: Registers.successRecordsByEnterprisesXLS,
    recordByEnterprisesXLS: Registers.recordByEnterprisesXLS,
  };
};
const ConnectedEnterpriseHistory = connect(
  mapStateToProps,
  mapDispatchToProps
)(EnterpriseHistory);

export default withTranslation()(
  withStyles(styles, { withTheme: true })(ConnectedEnterpriseHistory)
);
