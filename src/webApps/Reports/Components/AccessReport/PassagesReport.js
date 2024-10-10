import React, { Component } from "react";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
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
import { endOfDay, startOfDay } from "date-fns";
import { DateRangePicker, DateRange } from "react-date-range";
import { Tab } from "semantic-ui-react";
import FilterButton from "../Shared/FilterButton";
import TableFiltersView from "./TableFiltersView";
import TableFiltersMobileView from "./TableFiltersMobileView";
import MUIDataTable from "mui-datatables";
import {
  requestBusTickets,
  requestDownloadBusTicketsXLS,
} from "../../../../actions/AccessControl/trip_action";
import { Print, FullscreenExit } from "@mui/icons-material";
import TableSkeletonLoader from "../../../Shared/TableSkeletonLoader";
import { isNullOrUndefined } from "util";

import moment from "moment";
const dateNow = new Date();
let page = 0;
let rowsPerPage = 15;
let activeColumnSort = 2;
let order = "desc";
const drawerWidth = 240;

export class PassagesReport extends Component {
  constructor(props) {
    super(props);
    const { t } = this.props;
    this.state = {
      columns: this.translateColumns(t, true),
      data: [],
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
      selectedPersons: [],
      selectedPersonsObject: [],
      selectedEnterprises: [],
      selectedEnterprisesObject: [],
      selectedTab: 0,
      successDownloadXLS: false,
      isLoadingNewData: false,
    };
  }

  componentDidMount() {
    this.loadData(true);
    this.updateScreenMode();
    window.addEventListener("resize", this.updateScreenMode);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateScreenMode);
  }

  updateScreenMode = () => {
    this.setState({
      isDesktop: window.innerWidth > 1050,
      //panes: this.createPanes(window.innerWidth > 1050),
    });
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.successDownloadXLS !== prevState.successDownloadXLS ||
      nextProps.isLoadingNewData !== prevState.isLoadingNewData
    ) {
      return {
        successDownloadXLS: nextProps.successDownloadXLS,
        isLoadingNewData: nextProps.isLoadingNewData,
      };
    } else return null;
  }

  componentDidUpdate(prevProps, prevState) {
    const { selectedPersons, selectedEnterprises, filterRange, selectedTab } =
      prevState;
    if (
      selectedPersons.length !== this.state.selectedPersons.length ||
      selectedEnterprises.length !== this.state.selectedEnterprises.length ||
      filterRange.startDate !== this.state.filterRange.startDate ||
      filterRange.endDate !== this.state.filterRange.endDate ||
      selectedTab !== this.state.selectedTab
    ) {
      this.loadData(false);
    }
    if (
      this.state.successDownloadXLS &&
      this.state.successDownloadXLS !== prevState.successDownloadXLS
    ) {
      let report =
        "data:application/vnd.ms-excel" + ";base64," + this.props.report.data;
      require("downloadjs")(
        report,
        "ListadoDePasajes.xls",
        "application/vnd.ms-excel"
      );
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
    const extraData =
      this.state.selectedTab === 0
        ? { PersonIds: this.state.selectedPersons }
        : { companyIds: this.state.selectedEnterprises };
    this.props.requestBusTickets({
      start: isSearch ? 0 : page * rowsPerPage,
      length: rowsPerPage,
      order: this.state.columns[activeColumnSort].name + " " + order,
      search: this.state.searchText ? this.state.searchText : "",
      startDate: valueStart,
      endDate: valueEnd,
      ...extraData,
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
    const extraData =
      this.state.selectedTab === 0
        ? { PersonIds: this.state.selectedPersons }
        : { companyIds: this.state.selectedEnterprises };
    this.props.requestDownloadBusTicketsXLS({
      start: page * rowsPerPage,
      length: rowsPerPage,
      order: this.state.columns[activeColumnSort].name + " " + order,
      search: this.state.searchText ? this.state.searchText : "",
      startDate: valueStart,
      endDate: valueEnd,
      ...extraData,
    });
  };

  translateColumns = (t, initial) => {
    let colStorage = JSON.parse(localStorage.getItem("passagesRepColumns"));

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
          sortDirection: activeColumnSort === 0 ? order : "none",
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
          sortDirection: activeColumnSort === 1 ? order : "none",
          display: isNullOrUndefined(columDisplay.lastName)
            ? true
            : columDisplay.lastName,
        },
      },
      {
        label: t("Date"),
        name: "date",
        options: {
          filter: true,
          sort: true,
          sortDirection: activeColumnSort === 2 ? order : "none",
          display: isNullOrUndefined(columDisplay.date)
            ? true
            : columDisplay.date,
          customBodyRender: (data, meta) => {
            const formattedDate =
              this.props.i18n.language === "es"
                ? moment(data)
                    .lang(this.props.i18n.language)
                    .format("DD/MM/YYYY HH:mm")
                : moment(data)
                    .lang(this.props.i18n.language)
                    .format("MM/DD/YYYY HH:mm");
            return <Typography>{formattedDate}</Typography>;
          },
        },
      },
      {
        label: t("enterprise"),
        name: "companyName",
        options: {
          display:
            window.innerWidth < 1050
              ? false
              : isNullOrUndefined(columDisplay.companyName)
              ? true
              : columDisplay.companyName,
          filter: true,
          sort: true,
          sortDirection: activeColumnSort === 3 ? order : "none",
        },
      },
      {
        label: t("Badge"),
        name: "badgeNumber",
        options: {
          display:
            window.innerWidth < 1050
              ? false
              : isNullOrUndefined(columDisplay.badgeNumber)
              ? true
              : columDisplay.badgeNumber,
          filter: true,
          sort: true,
          sortDirection: activeColumnSort === 4 ? order : "none",
        },
      },
      {
        label: t("Route"),
        name: "routeName",
        options: {
          filter: true,
          sort: true,
          sortDirection: activeColumnSort === 4 ? order : "none",
          display: isNullOrUndefined(columDisplay.routeName)
            ? true
            : columDisplay.routeName,
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
    localStorage.setItem("passagesRepColumns", JSON.stringify(modifiedColumns));
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

  handlePersonSelect = (person) => {
    const index = this.state.selectedPersons.indexOf(person.id);
    const newSelectedPersons = this.state.selectedPersons.slice();
    const newSelectedPersonsObject = this.state.selectedPersonsObject.slice();
    if (index === -1) {
      newSelectedPersons.splice(0, 0, person.id);
      newSelectedPersonsObject.splice(0, 0, person);
    } else {
      newSelectedPersons.splice(index, 1);
      newSelectedPersonsObject.splice(index, 1);
    }
    this.setState({
      selectedPersons: newSelectedPersons,
      selectedPersonsObject: newSelectedPersonsObject,
    });
  };

  handlePersonSelectDataTable = (selectedPersons) => {
    let selectedPersonsIds = [];
    selectedPersons.map((person) => {
      return selectedPersonsIds.push(person.id);
    });
    this.setState((prevState) => ({
      selectedPersons: selectedPersonsIds,
      selectedPersonsObject: selectedPersons,
    }));
  };

  handleEnterpriseSelectDataTable = (selectedEnterprises) => {
    let selectedEnterprisesIds = [];
    selectedEnterprises.map((enterprise) => {
      return selectedEnterprisesIds.push(enterprise.id);
    });
    this.setState((prevState) => ({
      selectedEnterprises: selectedEnterprisesIds,
      selectedEnterprisesObject: selectedEnterprises,
    }));
  };

  handleEnterpriseSelect = (enterprise) => {
    const index = this.state.selectedEnterprises.indexOf(enterprise.id);
    const newSelectedEnterprises = this.state.selectedEnterprises.slice();
    const newSelectedEnterprisesObject =
      this.state.selectedEnterprisesObject.slice();
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

  handleDeletePersons = (id) => {
    const newSelectedPersons = this.state.selectedPersons.slice();
    const newSelectedPersonsObject = this.state.selectedPersonsObject.slice();
    const index = newSelectedPersons.indexOf(id);
    if (index !== -1) {
      newSelectedPersons.splice(index, 1);
      newSelectedPersonsObject.splice(index, 1);
    }
    this.setState({
      selectedPersons: newSelectedPersons,
      selectedPersonsObject: newSelectedPersonsObject,
    });
  };

  handleDeleteEntierprises = (id) => {
    const newSelectedEnterprises = this.state.selectedEnterprises.slice();
    const newSelectedEnterprisesObject =
      this.state.selectedEnterprisesObject.slice();
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

  handleTabSelect = (tabValue) => {
    this.setState({ selectedTab: tabValue });
  };

  render() {
    const { t, classes, busTicketsCount } = this.props;
    const { data, dataCount, columns, isLoadingNewData, isDesktop } =
      this.state;
    const staticRanges = getDefaultStaticRanges(t);
    const panes = [
      {
        menuItem: t("Date"),
        render: () => (
          <Tab.Pane className={classes.pane} attached={false}>
            {isDesktop ? (
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
        menuItem: t("PersonsOrCompanies"),
        render: () => (
          <Tab.Pane className={classes.pane} attached={false}>
            {isDesktop ? (
              <TableFiltersView
                selectedEnterprises={this.state.selectedEnterprises}
                selectedEnterprisesObject={this.state.selectedEnterprisesObject}
                selectedPersons={this.state.selectedPersons}
                selectedPersonsObject={this.state.selectedPersonsObject}
                handleDeletePerson={this.handleDeletePersons}
                handleDeleteEnterprise={this.handleDeleteEntierprises}
                handlePersonSelect={this.handlePersonSelect}
                handleEnterpriseSelect={this.handleEnterpriseSelect}
                handleTabSelect={this.handleTabSelect}
                selectedTab={this.state.selectedTab}
                key={this.state.selectedTab}
              />
            ) : (
              <TableFiltersMobileView
                selectedEnterprises={this.state.selectedEnterprisesObject}
                selectedPersons={this.state.selectedPersonsObject}
                handleDeletePerson={this.handleDeletePersons}
                handleDeleteEnterprise={this.handleDeleteEntierprises}
                handlePersonSelect={this.handlePersonSelectDataTable}
                handleEnterpriseSelect={this.handleEnterpriseSelectDataTable}
                handleTabSelect={this.handleTabSelect}
                selectedTab={this.state.selectedTab}
                key={this.state.selectedTab}
              />
            )}
          </Tab.Pane>
        ),
      },
    ];

    const options = {
      filterType: "dropdown",
      responsive: "scrollFullHeight",
      serverSide: true,
      rowsPerPage: rowsPerPage,
      count: busTicketsCount,
      page: page,
      selectableRows: false,
      download: false,
      filter: false,
      search: false,
      print: false,
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
          key={"FilterButton" + this.state.isDesktop}
          withOutListener={!this.state.isDesktop}
        />
        <div className={classes.tableContainer}>
          <MUIDataTable
            title={t("Tickets")}
            data={this.props.busTickets}
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
    display: "flex !important",
    justifyContent: "center",
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

const mapStateToProps = ({ Trips }) => ({
  busTickets: Trips.busTickets,
  busTicketsCount: Trips.busTicketsCount,
  successDownloadXLS: Trips.successDownloadXLS,
  report: Trips.report,
  isLoadingNewData: Trips.isLoading,
});

const mapDispatchToProps = { requestBusTickets, requestDownloadBusTicketsXLS };

const PassagesReportConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(PassagesReport);

export default withTranslation()(
  withStyles(styles, { withTheme: true })(PassagesReportConnected)
);
