import React, { Component } from "react";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import {
  getDefaultInputRanges,
  getDefaultStaticRanges,
} from "../Shared/DateRangePickerInputsGenerator";
import { endOfDay, startOfDay } from "date-fns";
import { DateRangePicker, DateRange } from "react-date-range";
import Select from "react-select";
import { Tab } from "semantic-ui-react";
import FilterButton from "../Shared/FilterButton";
import components from "../../../Shared/ReactSelect";
import PlusIcon from "@mui/icons-material/AddRounded";
import MUIDataTable from "mui-datatables";
import DataTableDialogAction from "../../../Shared/DataTable/DataTableDialogAction";
import {
  requestGetEventsReport,
  requestGetPersonEnterpriseXLS,
  requestGetEnterpriseXLS,
} from "../../../../actions/AccessControl/eventMonitoring_actions";
import Grid from "@mui/material/Grid";
import EnterpriseReport from "../../../EasyAccess/Components/Enterprise/Enterprise";
import { requestRegisters } from "../../../../actions/EasyAccess/Register_actions";
import { requestEnterprises } from "../../../../actions/EasyAccess/Enterprise_actions";
import {
  Typography,
  IconButton,
  Dialog,
  List,
  DialogContent,
  DialogTitle,
  CircularProgress,
  Fade,
  Fab,
} from "@mui/material";
import {

  withStyles,

} from "@mui/styles";
import styles from "../../../../assets/styles/Report_styles/Enterprise_style";
import BadgeFilterTableView from "../AccessReport/BadgeFilterTableView";
import PassengersTable from "../AccessReport/PassengersTable";
import { Print, ListAlt, FiberManualRecord as Point } from "@mui/icons-material";
import TableSkeletonLoader from "../../../Shared/TableSkeletonLoader";
import { debounce } from "throttle-debounce";
import {
  isValueEmptyOrNull,
  isArrayEmptyOrNull,
  camelize,
} from "../../../../utils/HelperFunctions";
import moment from "moment";
import Chip from "@mui/material/Chip";
import {
  ListItem,
  ListItemText,
  ListItemIcon,
  Tooltip,
} from "@mui/material";
import { isNullOrUndefined } from "util";
import SnackbarHandler from "../../../../utils/SnackbarHandler";

const dateNow = new Date();
let page = 0;
let rowsPerPage = 15;
let activeColumnSort = 0;
let order = "desc";
const drawerWidth = 240;

export class Enterprise extends Component {
  constructor(props) {
    super(props);
    const { t } = this.props;
    this.state = {
      columns: this.translateColumns(t, true),
      data: [],
      open: false,
      empList: [],
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
      selectedTab: 0,
      selectedBadges: [],
      selectedBadgesObject: [],
      SelectedReportOption: this.reportOptions(t),
      report: 0,
      selectedReport: { value: 0, label: t("RecordsPerCompanies") },
    };
    this.loadDataDebounce = debounce(300, (value) => this.loadData(value));
    this.loadData(true);
  }
  reportOptions = (t) => ({
    0: { value: 0, label: t("RecordsPerCompanies") },
    1: { value: 1, label: t("enterprises") },
    // 2: { value: 2, label: t("GeneralTripsReport") },
    // 3: { value: 3, label: t("Trips") },
  });

  handleSelectReportChange = (name) => (event) => {
    const { t } = this.props;
    let value = event.currentTarget ? event.currentTarget.value : event.value;
    this.setState((prevState) => ({
      selectedReport: this.state.SelectedReportOption[event.value],
      report: value,
    }));
  };

  componentDidMount() {
    this.updateScreenMode();
    window.addEventListener("resize", this.updateScreenMode);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateScreenMode);
  }

  updateScreenMode = () => {
    this.setState({
      isDesktop: window.innerWidth > 1050,
      // panes: this.createPanes(window.innerWidth > 1050),
    });
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.successDownloadXLS !== prevState.successDownloadXLS ||
      nextProps.loading !== prevState.loading ||
      nextProps.successDownloadPersonEnterpriseXLS !==
        prevState.successDownloadPersonEnterpriseXLS
    ) {
      return {
        successDownloadXLS: nextProps.successDownloadXLS,
        isLoadingNewData: nextProps.loading,
        successDownloadPersonEnterpriseXLS:
          nextProps.successDownloadPersonEnterpriseXLS,
      };
    } else return null;
  }

  componentDidUpdate(prevProps, prevState) {
    const { t } = this.props;
    const { selectedBadges, filterRange, successDownloadPersonEnterpriseXLS } =
      prevState;
    if (
      selectedBadges.length !== this.state.selectedBadges.length ||
      filterRange.startDate !== this.state.filterRange.startDate ||
      filterRange.endDate !== this.state.filterRange.endDate
    ) {
      this.loadDataDebounce(false);
    }
    if (
      this.state.successDownloadXLS &&
      this.state.successDownloadXLS !== prevState.successDownloadXLS
    ) {
      let report =
        "data:application/vnd.ms-excel" + ";base64," + this.props.report.data;
      require("downloadjs")(
        report,
        t("enterprises") + ".xls",
        "application/vnd.ms-excel"
      );
    }
    if (
      this.state.successDownloadPersonEnterpriseXLS &&
      this.state.successDownloadPersonEnterpriseXLS !==
        successDownloadPersonEnterpriseXLS
    ) {
      let report =
        "data:application/vnd.ms-excel" + ";base64," + this.props.report.data;
      require("downloadjs")(
        report,
        t("RecordsByEnterprisesReport") + ".xls",
        "application/vnd.ms-excel"
      );
    }
    if (this.props.error && prevProps.error !== this.props.error) {
      SnackbarHandler.showMessage(this.props.t(this.props.error), "error");
    }
    if (this.state.empList !== prevState.empList) this.loadData(false, false);
  }
  loadData = (loadData, isSearch) => {
    const {
      selectedBadgesObject = [],
      columns,
      searchText,
      empList,
    } = this.state;
    const selectedBadges = selectedBadgesObject.map((badge) => badge.number);
    let valueStart = new Date(
      this.state.filterRange.startDate -
        this.state.filterRange.startDate.getTimezoneOffset() * 60000
    ).toJSON();
    let valueEnd = new Date(
      this.state.filterRange.endDate -
        this.state.filterRange.endDate.getTimezoneOffset() * 60000
    ).toJSON();

    if (loadData) {
      this.setState({
        isLoadingNewData: true,
      });
    }
    console.log("empList: ", empList);
    this.props.requestRegisters({
      start: isSearch ? 0 : page * rowsPerPage,
      length: rowsPerPage,
      order:
        columns[activeColumnSort].name === "statusName"
          ? "status" + " " + order
          : columns[activeColumnSort].name + " " + order,
      search: searchText ? searchText : "",
      originCompanies:
        empList.length > 0 ? empList.map((emp) => emp.id) : undefined,
    });
    // this.props.requestGetEventsReport({
    //   start: isSearch ? 0 : page * rowsPerPage,
    //   length: rowsPerPage,
    //   order: this.state.columns[activeColumnSort].name + " " + order,
    //   search: this.state.searchText ? this.state.searchText : "",
    //   minDate: valueStart,
    //   maxDate: valueEnd,
    //   badges: selectedBadges,
    // });
  };

  handleDownloadReport = () => {
    const { empList } = this.state;
    console.log("empList: ", empList);
    const enterprisesIds = empList.map((emp) => emp.id);
    this.props.requestGetPersonEnterpriseXLS(enterprisesIds);
  };

  handleDownloadReportEnterprise = () => {
    const { empList } = this.state;
    console.log("empList: ", empList);
    const enterprisesIds = empList.map((emp) => emp.id);
    this.props.requestGetEnterpriseXLS();
  };

  showEventDetails = (peopleList) => {
    this.setState({
      peopleList: !isArrayEmptyOrNull(peopleList) ? peopleList : [],
      openPassengersModal: true,
    });
  };

  handleClose = () => {
    this.setState({
      peopleList: [],
      openPassengersModal: false,
    });
  };

  translateColumns = (t, initial) => {
    const { classes } = this.props;
    let colStorage = JSON.parse(localStorage.getItem("eventReportColumns"));

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
          display:
            window.innerWidth < 1050
              ? false
              : isNullOrUndefined(columDisplay.name)
              ? true
              : columDisplay.name,
          filter: true,
          sort: true,
          sortDirection: activeColumnSort === 0 ? order : "none",
          customBodyRender: (data) => {
            if (!isNullOrUndefined(data) && data !== "") return data;
          },
        },
      },
      {
        label: t("LastName"),
        name: "lastname",
        options: {
          display:
            window.innerWidth < 1050
              ? false
              : isNullOrUndefined(columDisplay.lastname)
              ? true
              : columDisplay.lastname,
          filter: true,
          sort: true,
          sortDirection: activeColumnSort === 1 ? order : "none",
          customBodyRender: (data) => {
            if (!isNullOrUndefined(data) && data !== "") return data;
          },
        },
      },
      {
        label: t("dni"),
        name: "document",
        options: {
          display:
            window.innerWidth < 1050
              ? false
              : isNullOrUndefined(columDisplay.document)
              ? true
              : columDisplay.document,
          filter: true,
          sort: true,
          sortDirection: activeColumnSort === 2 ? order : "none",
          customBodyRender: (data) => {
            if (!isNullOrUndefined(data) && data !== "") return data;
          },
        },
      },
      {
        label: t("email"),
        name: "email",
        options: {
          display:
            window.innerWidth < 1050
              ? false
              : isNullOrUndefined(columDisplay.email)
              ? true
              : columDisplay.email,
          filter: true,
          sort: true,
          sortDirection: activeColumnSort === 3 ? order : "none",
          customBodyRender: (data) => {
            if (!isNullOrUndefined(data) && data !== "") return data;
          },
        },
      },
      {
        label: t("enterprise"),
        name: "originEnterpriseName",
        options: {
          display:
            window.innerWidth < 1050
              ? false
              : isNullOrUndefined(columDisplay.originEnterpriseName)
              ? true
              : columDisplay.originEnterpriseName,
          filter: true,
          sort: true,
          sortDirection: activeColumnSort === 3 ? order : "none",
          customBodyRender: (data) => {
            if (!isNullOrUndefined(data) && data !== "") return data;
          },
        },
      },
      {
        label: t("status"),
        name: "statusName",
        options: {
          display:
            window.innerWidth < 1050
              ? false
              : isNullOrUndefined(columDisplay.statusName)
              ? true
              : columDisplay.statusName,
          filter: true,
          sort: true,
          sortDirection: activeColumnSort === 3 ? order : "none",
          customBodyRender: (data) => {
            if (!isNullOrUndefined(data) && data !== "")
              return t(camelize(data));
          },
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
    localStorage.setItem("eventReportColumns", JSON.stringify(modifiedColumns));
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

  handleTabSelect = (tabValue) => {
    this.setState({ selectedTab: tabValue });
  };

  handleBadgeSelect = (badge) => {
    const index = this.state.selectedBadges.indexOf(badge.id);
    const newSelectedBadges = this.state.selectedBadges.slice();
    const newSelectedBadgesObject = this.state.selectedBadgesObject.slice();
    if (index === -1) {
      newSelectedBadges.splice(0, 0, badge.id);
      newSelectedBadgesObject.splice(0, 0, badge);
    } else {
      newSelectedBadges.splice(index, 1);
      newSelectedBadgesObject.splice(index, 1);
    }
    this.setState({
      selectedBadges: newSelectedBadges,
      selectedBadgesObject: newSelectedBadgesObject,
    });
  };

  handleOpenEnterprise = (value) => {
    this.setState({ open: value });
  };
  handleEmpSelected = (empList) => {
    this.setState((prevState) => ({ empList, open: false }));
  };
  handleDelete = (id) => {
    const newEmpList = this.state.empList.slice();
    const index = newEmpList.findIndex((user) => user.id === id);
    if (index !== -1) newEmpList.splice(index, 1);
    this.setState({ empList: newEmpList });
  };

  handleBadgeTableSelect = (selectedBadges) => {
    let selectedBadgesIds = [];
    selectedBadges.map((badge) => {
      return selectedBadgesIds.push(badge.id);
    });
    this.setState((prevState) => ({
      selectedBadges: selectedBadgesIds,
      selectedBadgesObject: selectedBadges,
    }));
  };

  handleBadgeTableSelect = (selectedBadges) => {
    let selectedBadgesIds = [];
    selectedBadges.map((badge) => {
      return selectedBadgesIds.push(badge.id);
    });
    this.setState((prevState) => ({
      selectedBadges: selectedBadgesIds,
      selectedBadgesObject: selectedBadges,
    }));
  };

  handleDeleteBadge = (id) => {
    const newSelectedBadges = this.state.selectedBadges.slice();
    const newSelectedBadgesObject = this.state.selectedBadgesObject.slice();
    const index = newSelectedBadges.indexOf(id);
    if (index !== -1) {
      newSelectedBadges.splice(index, 1);
      newSelectedBadgesObject.splice(index, 1);
    }
    this.setState({
      selectedBadges: newSelectedBadges,
      selectedBadgesObject: newSelectedBadgesObject,
    });
  };

  render() {
    const { t, classes, eventsCount, currentUser, theme } = this.props;
    const {
      columns,
      isLoadingNewData,
      open,
      empList,
      SelectedReportOption,
      selectedReport,
    } = this.state;
    console.log("empList: ", empList);
    const selectStyles = {
      input: (base) => ({
        ...base,
        color: theme.palette.text.primary,
        "& input": {
          font: "inherit",
        },
        width: "100%",
        menuList: {
          maxHeight: 100,
        },
      }),
    };
    const options = {
      filterType: "dropdown",
      responsive: "scrollFullHeight",
      serverSide: true,
      rowsPerPage: rowsPerPage,
      count: eventsCount,
      page: page,
      selectableRows: "none",
      download: false,
      filter: false,
      search: false,
      print: false,
      onRowClick: this.onRowClicked,
      viewColumns: this.state.isDesktop,
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
    console.log("this.props.events: ", this.props.events);
    return (
      <React.Fragment>
        <Grid container className={classes.container}>
          <Grid item xs={10} md={3}>
            <div className={classes.formControl}>
              <label className={classes.formControlLabel}>
                {t("SelectReport")}
              </label>
              <Select
                classes={classes}
                className={classes.select}
                components={components}
                styles={selectStyles}
                options={Object.values(SelectedReportOption)}
                onChange={this.handleSelectReportChange("report")}
                placeholder={t("Reports")}
                maxMenuHeight={200}
                isLoading={false}
                value={selectedReport}
              />
            </div>
          </Grid>
        </Grid>
        {this.state.report === 0 && (
          <div style={{ width: "100%" }}>
            <div style={{ width: "100%", marginTop: 20 }}>
              <List>
                <ListItem style={{ padding: 0 }}>
                  <Fab
                    size="small"
                    className={classes.fab}
                    onClick={() => this.handleOpenEnterprise(true)}
                  >
                    <PlusIcon className={classes.fabIcon} />
                  </Fab>
                  <ListItemText
                    primary={t("enterprises")}
                    secondaryTypographyProps={{
                      style: { fontSize: "1rem" },
                    }}
                    // secondary={newPerson.employee ? newPerson.employee.lastname : ""}
                  />
                </ListItem>
              </List>
            </div>
            <div style={{ marginBottom: 10 }}>
              {this.state.empList.map((data) => {
                return (
                  <Chip
                    key={data.id}
                    label={data.name}
                    onDelete={() => this.handleDelete(data.id)}
                    className={classes.chip}
                  />
                );
              })}
            </div>
            <div className={classes.tableContainer}>
              <MUIDataTable
                title={t("Registers")}
                data={this.props.events}
                columns={columns}
                options={options}
              />
              <Fade in={isLoadingNewData} className={classes.contentLoader}>
                <div
                  style={{
                    pointerEvents: isLoadingNewData ? "inherit" : "none",
                  }}
                >
                  <CircularProgress
                    className={classes.circularProgress}
                    size={50}
                  />
                </div>
              </Fade>
            </div>
            <div className={classes.bottomActions}>
              <Tooltip
                title={
                  this.props.eventsCount && this.props.eventsCount > 0
                    ? t("Download")
                    : t("NoRegisters")
                }
                aria-label="add"
              >
                <span>
                  <Fab
                    color="primary"
                    aria-label="Report"
                    className={classes.fab}
                    onClick={this.handleDownloadReport}
                    disabled={
                      isNullOrUndefined(this.props.eventsCount) ||
                      this.props.eventsCount === 0
                    }
                  >
                    <Print style={{ fontSize: "3em" }} name="filter" />
                  </Fab>
                </span>
              </Tooltip>
            </div>
            {open && (
              <DataTableDialogAction
                open={open}
                onConfirm={this.handleEmpSelected}
                onClose={() => this.handleOpenEnterprise(false)}
                mdSubtitle={4}
                info={this.props.enterprises}
                success={this.props.successEmployees}
                loading={this.props.loadingEmp}
                title={t("enterprises")}
                subTitle={t("SelectedEnterprises")}
                loadDataAction={this.props.requestEnterprises}
                // extraData={this.state.dateRangePicker.selection.startDate.toJSON(),
                //   this.state.dateRangePicker.selection.endDate.toJSON()}
                rowsSelected={empList !== undefined ? empList : []}
                multipleSelect={true}
                columns={[
                  {
                    name: "Nombre",
                    field: "name",
                    options: {
                      filter: true,
                      sort: true,
                      // customBodyRender: (date) => {
                      //   return `${date.name} ${date.lastname}`;
                      // },
                    },
                  },
                ]}
              />
            )}
          </div>
        )}
        {this.state.report === 1 && (
          <div style={{ width: "100%" }}>
            <EnterpriseReport isReport={true} />
            <div className={classes.bottomActions}>
              <Tooltip
                title={
                  this.props.eventsCount && this.props.eventsCount > 0
                    ? t("Download")
                    : t("NoRegisters")
                }
                aria-label="add"
              >
                <span>
                  <Fab
                    color="primary"
                    aria-label="Report"
                    className={classes.fab}
                    onClick={this.handleDownloadReportEnterprise}
                    disabled={
                      isNullOrUndefined(this.props.eventsCount) ||
                      this.props.eventsCount === 0
                    }
                  >
                    <Print style={{ fontSize: "3em" }} name="filter" />
                  </Fab>
                </span>
              </Tooltip>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ EventMonitoring, Enterprise, User, Registers }) => {
  return {
    events: Registers.registers ? Registers.registers.data : [],
    loading: Registers.loading || false,
    eventsCount: Registers.registers ? Registers.registers.dataCount : 0,
    // registers: Registers.registers,
    successDownloadXLS: EventMonitoring.successDownloadXLS,
    successDownloadPersonEnterpriseXLS:
      EventMonitoring.successDownloadPersonEnterpriseXLS,
    successGetEvents: EventMonitoring.successGetEvents,
    isLoadingNewData: EventMonitoring.isLoading,
    report: EventMonitoring.eventReport,
    error: EventMonitoring.error,
    enterprises: Enterprise.enterprises,
    currentUser: User.currentUser,
  };
};

const mapDispatchToProps = {
  requestGetEventsReport: requestGetEventsReport,
  requestGetPersonEnterpriseXLS,
  requestGetEnterpriseXLS,
  requestEnterprises,
  requestRegisters,
};

const EnterpriseConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(Enterprise);

export default withTranslation()(
  withStyles(styles, { withTheme: true })(EnterpriseConnected)
);
