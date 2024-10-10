import React, { Component } from "react";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import {
  getDefaultInputRanges,
  getDefaultStaticRanges,
} from "../../Shared/DateRangePickerInputsGenerator";
import { endOfDay, startOfDay } from "date-fns";
import { DateRangePicker } from "react-date-range";
import { Tab } from "semantic-ui-react";
import FilterButton from "../../Shared/FilterButton";
import MUIDataTable from "mui-datatables";
import {
  requestTrips,
  requestDownloadTripsWithSeatsXLS,
} from "../../../../../actions/AccessControl/trip_action";
import {
  Typography,
  IconButton,
  Dialog,
  DialogContent,
  DialogTitle,
  CircularProgress,
  Fade,
  Fab,
} from "@mui/material";
import {
  
  withStyles,
} from "@mui/styles";
import PanelFilterTableView from "../PanelFilterTableView";
import GenericFilterTableView from "../GenericFilterTableView";
import PassengersTable from "./PassengersTable";
import { Print, ListAlt, GetApp } from "@mui/icons-material";
import TableSkeletonLoader from "../../../../Shared/TableSkeletonLoader";
import { debounce } from "throttle-debounce";
import {
  isValueEmptyOrNull,
  isArrayEmptyOrNull,
} from "../../../../../utils/HelperFunctions";
import { requestGetRoutes } from "../../../../../actions/AccessControl/panel_actions";
import moment from "moment";
import { isNullOrUndefined } from "util";

const dateNow = new Date();
let page = 0;
let rowsPerPage = 15;
let activeColumnSort = 0;
let order = "desc";
const drawerWidth = 240;

export class TripReport extends Component {
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
      selectedTab: 0,
      selectedPanels: [],
      selectedPanelsObject: [],
      selectedRoutes: [],
      selectedRoutesObject: [],
      openPassengersModal: false,
    };
    this.loadDataDebounce = debounce(300, (value) => this.loadData(value));
  }

  componentDidMount() {
    this.loadData(true);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.i18n.language !== prevState.language ||
      nextProps.successDownloadXLS !== prevState.successDownloadXLS ||
      nextProps.isLoadingNewData !== prevState.isLoadingNewData
    ) {
      return {
        successDownloadXLS: nextProps.successDownloadXLS,
        isLoadingNewData: nextProps.isLoadingNewData,
        language: nextProps.i18n.language,
      };
    } else return null;
  }

  componentDidUpdate(prevProps, prevState) {
    const { selectedPersons, selectedPanels, filterRange, selectedRoutes } =
      prevState;
    if (prevState.language !== this.state.language) {
      this.setState({
        columns: this.translateColumns(this.props.t, false),
      });
    }
    if (
      selectedRoutes.length !== this.state.selectedRoutes.length ||
      selectedPanels.length !== this.state.selectedPanels.length ||
      filterRange.startDate !== this.state.filterRange.startDate ||
      filterRange.endDate !== this.state.filterRange.endDate
    ) {
      this.loadDataDebounce(false);
    }
    if (
      this.state.successDownloadXLS &&
      this.state.successDownloadXLS !== prevState.successDownloadXLS &&
      this.props.report &&
      this.props.report.data
    ) {
      let report =
        "data:application/vnd.ms-excel" + ";base64," + this.props.report.data;
      require("downloadjs")(
        report,
        "TripReport.xls",
        "application/vnd.ms-excel"
      );
    }
  }
  loadData = (loadData, isSearch) => {
    if (loadData) {
      this.setState({
        isLoadingNewData: true,
      });
    }
    let valueStart = new Date(
      this.state.filterRange.startDate -
        this.state.filterRange.startDate.getTimezoneOffset() * 60000
    ).toJSON();
    let valueEnd = new Date(
      this.state.filterRange.endDate -
        this.state.filterRange.endDate.getTimezoneOffset() * 60000
    ).toJSON();

    this.props.requestTrips({
      start: isSearch ? 0 : page * rowsPerPage,
      length: rowsPerPage,
      order: this.state.columns[activeColumnSort].name + " " + order,
      search: this.state.searchText ? this.state.searchText : "",
      startDate: valueStart,
      endDate: valueEnd,
      panelIds: this.state.selectedPanels,
      routesIds: this.state.selectedRoutes,
      withDetails: true,
    });
  };

  handleDownloadReport = (id) => {
    let valueStart = new Date(
      this.state.filterRange.startDate -
        this.state.filterRange.startDate.getTimezoneOffset() * 60000
    ).toJSON();
    let valueEnd = new Date(
      this.state.filterRange.endDate -
        this.state.filterRange.endDate.getTimezoneOffset() * 60000
    ).toJSON();
    this.props.requestDownloadTripsWithSeatsXLS({
      start: page * rowsPerPage,
      length: rowsPerPage,
      order: this.state.columns[activeColumnSort].name + " " + order,
      search: this.state.searchText ? this.state.searchText : "",
      startDate: valueStart,
      endDate: valueEnd,
      panelsIds: this.state.selectedPanels,
      routesIds: this.state.selectedRoutes,
      justThisTrip: id,
    });
  };

  showTripDetails = (peopleList) => {
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
    let colStorage = JSON.parse(localStorage.getItem("tripRepSuncorColumns"));

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
        label: t("DriverName"),
        name: "driverName",
        options: {
          filter: true,
          sort: true,
          display: isNullOrUndefined(columDisplay.driverName)
            ? true
            : columDisplay.driverName,
        },
      },
      {
        label: t("DriverLastName"),
        name: "driverLastName",
        options: {
          filter: true,
          sort: true,
          display: isNullOrUndefined(columDisplay.driverLastName)
            ? true
            : columDisplay.driverLastName,
        },
      },
      {
        label: t("Route"),
        name: "routeName",
        options: {
          filter: true,
          sort: true,
          display: isNullOrUndefined(columDisplay.routeName)
            ? true
            : columDisplay.routeName,
        },
      },
      {
        label: t("StartDate"),
        name: "startDate",
        options: {
          filter: true,
          sort: true,
          display: isNullOrUndefined(columDisplay.startDate)
            ? true
            : columDisplay.startDate,
          sortDirection: activeColumnSort === 0 ? order : "none",
          customBodyRender: (data, meta) => {
            const formattedDate =
              this.props.i18n.language === "es"
                ? moment(data)
                    .locale(this.props.i18n.language)
                    .format("DD/MM/YYYY HH:mm")
                : moment(data)
                    .locale(this.props.i18n.language)
                    .format("MM/DD/YYYY HH:mm");
            return <Typography>{formattedDate}</Typography>;
          },
        },
      },
      {
        label: t("EndDate"),
        name: "endDate",
        options: {
          filter: true,
          sort: true,
          display: isNullOrUndefined(columDisplay.endDate)
            ? true
            : columDisplay.endDate,
          customBodyRender: (data, meta) => {
            const formattedDate =
              this.props.i18n.language === "es"
                ? moment(data)
                    .locale(this.props.i18n.language)
                    .format("DD/MM/YYYY HH:mm")
                : moment(data)
                    .locale(this.props.i18n.language)
                    .format("MM/DD/YYYY HH:mm");
            return <Typography>{formattedDate}</Typography>;
          },
        },
      },
      {
        label: t("panel"),
        name: "panelName",
        options: {
          filter: true,
          sort: false,
          display: isNullOrUndefined(columDisplay.panelName)
            ? true
            : columDisplay.panelName,
        },
      },
      {
        label: t("NumberOfPassengers"),
        name: "numberOfPassengers",
        options: {
          filter: true,
          sort: true,
          display: isNullOrUndefined(columDisplay.numberOfPassengers)
            ? true
            : columDisplay.numberOfPassengers,
          customBodyRender: (data, meta) => {
            return (
              <Typography style={{ textAlign: "center" }}>{data}</Typography>
            );
          },
        },
      },
      {
        label: t("PeopleList"),
        name: "peopleDetails",
        options: {
          filter: false,
          sort: false,
          display: isNullOrUndefined(columDisplay.peopleDetails)
            ? true
            : columDisplay.peopleDetails,
          customBodyRender: (data, meta) => {
            if (data && data.length > 0)
              return (
                (<div style={{ display: "flex" }}>
                  <IconButton
                    aria-label="peopleList"
                    onClick={() => this.showTripDetails(data)}
                    color="primary"
                    size="large">
                    <ListAlt />
                  </IconButton>
                  <IconButton
                    onClick={() =>
                      this.handleDownloadReport(
                        this.props.trips[meta.rowIndex].id
                      )
                    }
                    aria-label="printTripDetails"
                    color="primary"
                    size="large">
                    <GetApp />
                  </IconButton>
                </div>)
              );
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
    localStorage.setItem(
      "tripRepSuncorColumns",
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

  handlePanelSelect = (panel) => {
    const index = this.state.selectedPanels.indexOf(panel.id);
    const newSelectedPanels = this.state.selectedPanels.slice();
    const newSelectedPanelsObject = this.state.selectedPanelsObject.slice();
    if (index === -1) {
      newSelectedPanels.splice(0, 0, panel.id);
      newSelectedPanelsObject.splice(0, 0, panel);
    } else {
      newSelectedPanels.splice(index, 1);
      newSelectedPanelsObject.splice(index, 1);
    }
    this.setState({
      selectedPanels: newSelectedPanels,
      selectedPanelsObject: newSelectedPanelsObject,
    });
  };

  handleDeletePanel = (id) => {
    const newSelectedPanels = this.state.selectedPanels.slice();
    const newSelectedPanelsObject = this.state.selectedPanelsObject.slice();
    const index = newSelectedPanels.indexOf(id);
    if (index !== -1) {
      newSelectedPanels.splice(index, 1);
      newSelectedPanelsObject.splice(index, 1);
    }
    this.setState({
      selectedPanels: newSelectedPanels,
      selectedPanelsObject: newSelectedPanelsObject,
    });
  };

  handleRouteSelect = (route) => {
    const index = this.state.selectedRoutes.indexOf(route.id);
    const newSelectedRoutes = this.state.selectedRoutes.slice();
    const newSelectedRoutesObject = this.state.selectedRoutesObject.slice();
    if (index === -1) {
      newSelectedRoutes.splice(0, 0, route.id);
      newSelectedRoutesObject.splice(0, 0, route);
    } else {
      newSelectedRoutes.splice(index, 1);
      newSelectedRoutesObject.splice(index, 1);
    }
    this.setState({
      selectedRoutes: newSelectedRoutes,
      selectedRoutesObject: newSelectedRoutesObject,
    });
  };

  handleRouteTableSelect = (selectedRoutes) => {
    let selectedRoutesIds = [];
    selectedRoutes.map((route) => {
      return selectedRoutesIds.push(route.id);
    });
    this.setState((prevState) => ({
      selectedRoutes: selectedRoutesIds,
      selectedRoutesObject: selectedRoutes,
    }));
  };

  handleDeleteRoute = (id) => {
    const newSelectedRoutes = this.state.selectedRoutes.slice();
    const newSelectedRoutesObject = this.state.selectedRoutesObject.slice();
    const index = newSelectedRoutes.indexOf(id);
    if (index !== -1) {
      newSelectedRoutes.splice(index, 1);
      newSelectedRoutesObject.splice(index, 1);
    }
    this.setState({
      selectedRoutes: newSelectedRoutes,
      selectedRoutesObject: newSelectedRoutesObject,
    });
  };

  render() {
    const { t, classes, tripsCount } = this.props;
    const { columns, isLoadingNewData } = this.state;
    const staticRanges = getDefaultStaticRanges(t);
    const panes = [
      {
        menuItem: t("Date"),
        render: () => (
          <Tab.Pane className={classes.pane} attached={false}>
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
          </Tab.Pane>
        ),
      },
      {
        menuItem: t("Panels"),
        render: () => (
          <Tab.Pane className={classes.pane} attached={false}>
            <PanelFilterTableView
              selectedPanels={this.state.selectedPanels}
              selectedPanelsObject={this.state.selectedPanelsObject}
              handleDeletePanel={this.handleDeletePanel}
              handleSearch={this.handleSearch}
              handlePanelSelect={this.handlePanelSelect}
              key={this.state.selectedTab}
            />
          </Tab.Pane>
        ),
      },
      {
        menuItem: t("Routes"),
        render: () => (
          <Tab.Pane className={classes.pane} attached={false}>
            <GenericFilterTableView
              selectedItems={this.state.selectedRoutes}
              selectedItemsObject={this.state.selectedRoutesObject}
              handleItemTableSelect={this.handleRouteTableSelect}
              handleDeleteItem={this.handleDeleteRoute}
              handleSearch={this.handleSearch}
              handleItemSelect={this.handleRouteSelect}
              handleRequestItems={this.props.requestGetRoutes}
              reducer="Panel"
              title="Routes"
              showProp="name"
              property="routes"
              key={this.state.selectedTab}
            />
          </Tab.Pane>
        ),
      },
    ];

    const options = {
      filterType: "dropdown",
      responsive: "scrollFullHeight",
      serverSide: true,
      rowsPerPage: rowsPerPage,
      count: tripsCount,
      page: page,
      selectableRows: "none",
      download: false,
      filter: false,
      search: false,
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
    };
    return (
      <React.Fragment>
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
            title={t("Trips")}
            data={this.props.trips}
            columns={columns}
            options={options}
            key={this.state.language}
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

        <Dialog
          open={this.state.openPassengersModal}
          onClose={this.handleClose}
          maxWidth="md"
          fullWidth={true}
          //aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            {t("PassengersList")}{" "}
          </DialogTitle>
          <DialogContent style={{ padding: "2%", width: "100%" }}>
            <PassengersTable
              data={this.state.peopleList}
              dataCount={
                this.state.peopleList ? this.state.peopleList.length : 0
              }
            />
          </DialogContent>
        </Dialog>
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
    right: 0,
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
    padding: 0 + " !important",
    border: 0 + " !important",
    color: "#fff",
    backgroundColor: theme.palette.backgroundSecondary.main + " !important",
  },
  tab: {
    "& >.menu >.item": {
      color: theme.palette.text.main + " !important",
    },
    "& >.menu >.item.active": {
      borderColor: theme.palette.primary.main + " !important",
    },
  },
  circularProgress: {},
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
});

const mapStateToProps = ({ Trips }) => ({
  trips: Trips.trips,
  tripsCount: Trips.tripsCount,
  successDownloadXLS: Trips.successDownloadXLS,
  report: Trips.report,
  isLoadingNewData: Trips.isLoading,
});

const mapDispatchToProps = {
  requestTrips,
  requestDownloadTripsWithSeatsXLS,
  requestGetRoutes,
};

const TripReportConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(TripReport);

export default withTranslation()(
  withStyles(styles, { withTheme: true })(TripReportConnected)
);
