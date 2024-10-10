import React, { Component } from "react";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import {
  getDefaultInputRanges,
  getDefaultStaticRanges,
} from "../Shared/DateRangePickerInputsGenerator";
import { endOfDay, startOfDay } from "date-fns";
import { DateRangePicker, DateRange } from "react-date-range";
import { Tab } from "semantic-ui-react";
import FilterButton from "../Shared/FilterButton";
import MUIDataTable from "mui-datatables";
import {
  requestGetEventsReport,
  requestGetEventsXLS,
} from "../../../../actions/AccessControl/eventMonitoring_actions";
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
import BadgeFilterTableView from "./BadgeFilterTableView";
import PassengersTable from "./PassengersTable";
import { Print, ListAlt, FiberManualRecord as Point } from "@mui/icons-material";
import TableSkeletonLoader from "../../../Shared/TableSkeletonLoader";
import { debounce } from "throttle-debounce";
import {
  isValueEmptyOrNull,
  isArrayEmptyOrNull,
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
let activeColumnSort = 1;
let order = "desc";
const drawerWidth = 240;

export class EventReport extends Component {
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
      selectedBadges: [],
      selectedBadgesObject: [],
    };
    this.loadDataDebounce = debounce(300, (value) => this.loadData(value));
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
      // panes: this.createPanes(window.innerWidth > 1050),
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
    const { selectedBadges, filterRange } = prevState;
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
      require("downloadjs")(report, "Eventos.xls", "application/vnd.ms-excel");
    }
    if (this.props.error && prevProps.error !== this.props.error) {
      SnackbarHandler.showMessage(this.props.t(this.props.error), "error");
    }
  }
  loadData = (loadData, isSearch) => {
    const { selectedBadgesObject = [] } = this.state;
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
    this.props.requestGetEventsReport({
      start: isSearch ? 0 : page * rowsPerPage,
      length: rowsPerPage,
      order: this.state.columns[activeColumnSort].name + " " + order,
      search: this.state.searchText ? this.state.searchText : "",
      minDate: valueStart,
      maxDate: valueEnd,
      badges: selectedBadges,
    });
  };

  handleDownloadReport = (id) => {
    this.props.requestGetEventsXLS({
      start: page * rowsPerPage,
      length: rowsPerPage,
      order: this.state.columns[activeColumnSort].name + " " + order,
      search: this.state.searchText ? this.state.searchText : "",
      minDate: this.state.filterRange.startDate,
      maxDate: this.state.filterRange.endDate,
      badges: this.state.selectedBadges,
      language: this.props.i18n.language,
    });
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
        label: t("description"),
        name: "description",
        options: {
          filter: true,
          sort: true,
          search: false,
          sortDirection: activeColumnSort === 0 ? order : "none",
          display: isNullOrUndefined(columDisplay.description)
            ? true
            : columDisplay.description,
          customBodyRender: (value, tableMeta) => {
            const data = {
              discriminator: tableMeta.rowData[6],
              description: value,
            };
            if (data.discriminator === 0 || data.discriminator === 4)
              if (data.description === "Acceso válido")
                return (
                  <ListItem className={classes.nested2}>
                    <ListItemIcon>
                      <Point style={{ color: "#437043" }} />
                    </ListItemIcon>
                    <ListItemText inset primary={t("ValidAccess")} />
                  </ListItem>
                );
              // return(<Chip style={{backgroundColor: green[500]}} label={data.description} className={classes.chip}  />)
              else
                return (
                  <ListItem className={classes.nested2}>
                    <ListItemIcon>
                      <Point style={{ color: "#743631" }} />
                    </ListItemIcon>
                    <ListItemText inset primary={t("InvalidAccess")} />
                  </ListItem>
                );
            //return(<Chip  style={{backgroundColor: red[500]}} label={data.description} className={classes.chip} />)
            else if (data.discriminator === 3)
              return (
                <ListItem className={classes.nested2}>
                  <ListItemIcon>
                    <Point style={{ color: "#743631" }} />
                  </ListItemIcon>
                  <ListItemText inset primary={t("InvalidAccess")} />
                </ListItem>
              );
            //return(<Chip  style={{backgroundColor: red[500]}} label={data.description} className={classes.chip} />)
            else if (
              data.discriminator === 1 &&
              data.description === "Alarma: Emergency!"
            )
              return (
                <ListItem className={classes.nested2}>
                  <ListItemIcon>
                    <Point style={{ color: "#743631" }} />
                  </ListItemIcon>
                  <ListItemText
                    inset
                    primary={t("Alarm") + data.description.split(":")[1]}
                  />
                </ListItem>
              );
            else if (
              data.discriminator === 1 &&
              data.description.startsWith("Mensaje:")
            )
              return (
                <ListItem className={classes.nested2}>
                  <ListItemIcon>
                    <Point style={{ color: "#9c804d" }} />
                  </ListItemIcon>
                  <ListItemText
                    inset
                    primary={t("Message") + data.description.split(":")[1]}
                  />
                </ListItem>
              );
            else if (data.discriminator === 1)
              return (
                <ListItem className={classes.nested2}>
                  <ListItemIcon>
                    <Point style={{ color: "#9c804d" }} />
                  </ListItemIcon>
                  <ListItemText
                    inset
                    primary={t("Alarm") + data.description.split(":")[1]}
                  />
                </ListItem>
              );
            else
              return (
                <ListItem className={classes.nested2}>
                  <ListItemIcon>
                    <Point style={{ color: "#9c804d" }} />
                  </ListItemIcon>
                  <ListItemText
                    inset
                    primary={t("Message") + data.description.split(":")[1]}
                  />
                </ListItem>
              );
            //return(<Chip  style={{backgroundColor: yellow[500], color:'#514d46'}} label={data.description} className={classes.chip} />)
          },
        },
      },
      {
        label: t("Date"),
        name: "date",
        options: {
          display:
            window.innerWidth < 1050
              ? false
              : isNullOrUndefined(columDisplay.date)
              ? true
              : columDisplay.date,
          filter: true,
          sort: true,
          sortDirection: activeColumnSort === 1 ? order : "none",
          customBodyRender: (data) => {
            const { language } = this.props.i18n;
            const formattedDate =
              language === "es"
                ? moment(data).lang(language).format("DD/MM/YYYY HH:mm")
                : moment(data).lang(language).format("MM/DD/YYYY HH:mm");
            return formattedDate;
          },
        },
      },
      {
        label: t("reader"),
        name: "readerName",
        options: {
          display:
            window.innerWidth < 1050
              ? false
              : isNullOrUndefined(columDisplay.readerName)
              ? true
              : columDisplay.readerName,
          filter: true,
          sort: true,
          sortDirection: activeColumnSort === 2 ? order : "none",
          customBodyRender: (data) => {
            if (!isNullOrUndefined(data) && data !== "") return data;
            else
              return <Chip label={t("notAdmitted")} className={classes.chip} />;
          },
        },
      },
      {
        label: t("panel"),
        name: "panelName",
        options: {
          display:
            window.innerWidth < 1050
              ? false
              : isNullOrUndefined(columDisplay.panelName)
              ? true
              : columDisplay.panelName,
          filter: true,
          sort: true,
          sortDirection: activeColumnSort === 3 ? order : "none",
          customBodyRender: (data) => {
            if (!isNullOrUndefined(data) && data !== "") return data;
            else
              return <Chip label={t("notAdmitted")} className={classes.chip} />;
          },
        },
      },
      {
        label: t("Card"),
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
          customBodyRender: (data) => {
            if (!isNullOrUndefined(data) && data !== "") return data;
            else
              return <Chip label={t("notAdmitted")} className={classes.chip} />;
          },
        },
      },
      {
        label: t("person"),
        name: "personFullName",
        options: {
          filter: true,
          sort: true,
          display: isNullOrUndefined(columDisplay.personFullName)
            ? true
            : columDisplay.personFullName,
          sortDirection: activeColumnSort === 5 ? order : "none",
          customBodyRender: (data) => {
            if (
              !isNullOrUndefined(data) &&
              data !== "INVALIDO INVALIDO" &&
              data !== ""
            )
              return data;
            else
              return <Chip label={t("notAdmitted")} className={classes.chip} />;
          },
        },
      },
      {
        label: t("discriminator"),
        name: "discriminator",
        options: {
          display: isNullOrUndefined(columDisplay.discriminator)
            ? false
            : columDisplay.discriminator,
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
    const { t, classes, eventsCount } = this.props;
    const { columns, isLoadingNewData } = this.state;
    const staticRanges = getDefaultStaticRanges(t);
    const panes = [
      {
        menuItem: t("Date"),
        render: () => (
          <Tab.Pane className={classes.pane} attached={false}>
            {this.state.isDesktop === true ? (
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
        menuItem: t("Badges"),
        render: () => (
          <Tab.Pane className={classes.pane} attached={false}>
            <BadgeFilterTableView
              selectedBadges={this.state.selectedBadges}
              selectedBadgesObject={this.state.selectedBadgesObject}
              handleBadgeTableSelect={this.handleBadgeTableSelect}
              handleDeleteBadge={this.handleDeleteBadge}
              handleSearch={this.handleSearch}
              handleBadgeSelect={this.handleBadgeSelect}
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
          key={"FilterButton" + this.state.isDesktop}
          withOutListener={!this.state.isDesktop}
        />
        <div className={classes.tableContainer}>
          <MUIDataTable
            title={t("Events")}
            data={this.props.events}
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

        <Dialog
          open={this.state.openPassengersModal}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            {t("PassengersList")}{" "}
          </DialogTitle>
          <DialogContent style={{ padding: 0, width: 600 }}>
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
  bottomActions: {
    position: "fixed",
    bottom: 10,
    right: 20,
    zIndex: 101,
  },
  root: {
    display: "flex",
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
  iconButton: {
    padding: 5,
  },
});

const mapStateToProps = ({ EventMonitoring }) => ({
  events: EventMonitoring.events ? EventMonitoring.events.data : [],
  eventsCount: EventMonitoring.events ? EventMonitoring.events.dataCount : 0,
  successDownloadXLS: EventMonitoring.successDownloadXLS,
  successGetEvents: EventMonitoring.successGetEvents,
  isLoadingNewData: EventMonitoring.isLoading,
  report: EventMonitoring.eventReport,
  error: EventMonitoring.error,
});

const mapDispatchToProps = {
  requestGetEventsReport: requestGetEventsReport,
  requestGetEventsXLS: requestGetEventsXLS,
};

const EventReportConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(EventReport);

export default withTranslation()(
  withStyles(styles, { withTheme: true })(EventReportConnected)
);
