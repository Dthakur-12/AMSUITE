import React, { Component } from "react";
import NavBarAccessControl from "../../utils/NavBarAccessControl";
import TableSkeletonLoader from "../../../Shared/TableSkeletonLoader";
import PropTypes from "prop-types";
import { withStyles } from '@mui/styles';
import MUIDataTable from "mui-datatables";
//------------------------------------------------
import { requestBadges } from "../../../../actions/EasyAccess/Badges_actions";
//-------------------------------------------------
import CircularProgress from "@mui/material/CircularProgress";
import EventDetails from "../EventMonitoring/EventDetails";
import LinearProgress from "@mui/material/LinearProgress";
import { Slide, Dialog, ListItemIcon } from "@mui/material";
import { isNullOrUndefined } from "util";
import CustomToolbarSelect from "../../../Shared/DataTable/CustomToolBarSelect";
import Chip from "@mui/material/Chip";
import moment from "moment";
import PointIcon from "@mui/icons-material/FiberManualRecord";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { withTranslation } from "react-i18next";
import IconButton from "@mui/material/IconButton";
import { Icon } from "semantic-ui-react";
import { debounce } from "throttle-debounce";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import Grid from "@mui/material/Grid";
import { socketIO } from "../../../../utils/WebSockets";
import {
  requestGetEvents,
  requestGetEventById,
} from "../../../../actions/AccessControl/eventMonitoring_actions";
import { connect } from "react-redux";
import styles from "../../../../assets/styles/AccessControl_styles/EventMonitoring_styles/eventMonitoringStyles";
import UpdateIcon from "@mui/icons-material/Update";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import NewReleases from "@mui/icons-material/NewReleases";
import Fab from "@mui/material/Fab";
import Tooltip from "@mui/material/Tooltip";
import SyncDisabledTwoToneIcon from "@mui/icons-material/SyncDisabledTwoTone";

const mapDispatchToProps = {
  requestGetEvents,
  requestGetEventById,
  requestBadges,
};

function mapStateToProps({ EventMonitoring }) {
  return {
    // isLoading: EventMonitoring.loading,
    successGetEvents: EventMonitoring.successGetEvents,
    //data: EventMonitoring.events ? EventMonitoring.events.data : [],
    //dataCount: EventMonitoring.events.dataCount,
    error: EventMonitoring.error,
    events: EventMonitoring.events,
    loadingGetById: EventMonitoring.loadingGetById,
    successGetEventById: EventMonitoring.successGetEventById,
    eventDetails: EventMonitoring.eventById,
  };
}

function Transition(props) {
  return <Slide direction="down" {...props} />;
}

let page = 0;
let rowsPerPage = 10;
let activeColumnSort = 1;
let order = "desc";

class EventMonitoring extends Component {
  state = {
    isDesktop: true,
  };
  constructor(props) {
    super(props);
    const { t } = props;
    this.state = {
      isDesktop: true,
      isLoading: true,
      isLoadingNewData: false,
      isSearching: false,
      columns: this.translateColumns(t, true),
      thereAreRowSelected: false,
      thereAreChangesToBring: false,
      automaticUpdateStopped: false,
    };
    this.changeSearchDebounce = debounce(300, (value) =>
      this.changeSearch(value)
    );
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.i18n.language !== prevState.language ||
      //nextProps.isLoading != prevState.isLoading ||
      nextProps.successGetEvents !== prevState.successGetEvents ||
      nextProps.successGetEventById !== prevState.successGetEventById ||
      nextProps.eventDetails !== prevState.EventDetails ||
      nextProps.events !== prevState.events ||
      nextProps.error !== prevState.error
    ) {
      return {
        language: nextProps.i18n.language,
        // isLoading: nextProps.isLoading,
        successGetEvents: nextProps.successGetEvents,
        //  data: nextProps.data,
        events: nextProps.events,
        successGetEventById: nextProps.successGetEventById,
        eventDetails: nextProps.eventDetails,
        error: nextProps.error,
      };
    } else return null;
  }

  componentDidUpdate(prevProps, prevState) {
    const { successGetEvents, events, searchText, successGetEventById, error } =
      this.state;
    if (events !== prevState.events) {
    }

    if (successGetEvents && successGetEvents !== prevState.successGetEvents) {
      this.setState({
        isSearching: searchText !== prevState.searchText,
        isLoading: false,
        isLoadingNewData: false,
        hideSearch: false,
        data: events.data,
        dataCount: events.dataCount,
      });
      if (prevState.searchText !== searchText) this.loadData(false);
    }
    if (error && error !== prevState.error) {
      console.log("error: ", error);
      this.setState({
        isLoading: false,
        isLoadingNewData: false,
      });
    }
    if (
      successGetEventById &&
      successGetEventById !== prevState.successGetEventById
    ) {
      this.setState({ eventOnDetails: this.state.eventDetails });
    }
    if (prevState.language !== this.state.language) {
      this.setState({
        ...prevState,
        columns: this.translateColumns(this.props.t, false),
      });
    }
  }

  translateColumns = (t, initial) => {
    const isDesktop = window.innerWidth > 900;
    const { classes } = this.props;
    const language = this.props.i18n.language;
    let colStorage = JSON.parse(localStorage.getItem("eventMonitoringColumns"));

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
                      <PointIcon style={{ color: "#437043" }} />
                    </ListItemIcon>
                    <ListItemText inset primary={t("ValidAccess")} />
                  </ListItem>
                );
              // return(<Chip style={{backgroundColor: green[500]}} label={data.description} className={classes.chip}  />)
              else
                return (
                  <ListItem className={classes.nested2}>
                    <ListItemIcon>
                      <PointIcon style={{ color: "#743631" }} />
                    </ListItemIcon>
                    <ListItemText inset primary={t("InvalidAccess")} />
                  </ListItem>
                );
            //return(<Chip  style={{backgroundColor: red[500]}} label={data.description} className={classes.chip} />)
            else if (data.discriminator === 3)
              return (
                <ListItem className={classes.nested2}>
                  <ListItemIcon>
                    <PointIcon style={{ color: "#743631" }} />
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
                    <PointIcon style={{ color: "#743631" }} />
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
                    <PointIcon style={{ color: "#9c804d" }} />
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
                    <PointIcon style={{ color: "#9c804d" }} />
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
                    <PointIcon style={{ color: "#9c804d" }} />
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
          display: !isDesktop
            ? false
            : isNullOrUndefined(columDisplay.date)
            ? true
            : columDisplay.date,
          filter: true,
          sort: true,
          sortDirection: activeColumnSort === 1 ? order : "none",
          customBodyRender: (data) => {
            const formattedDate =
              this.props.i18n.language === "es"
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
          display: !isDesktop
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
          display: !isDesktop
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
          display: !isDesktop
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
          sortDirection: activeColumnSort === 5 ? order : "none",
          display: isNullOrUndefined(columDisplay.personFullName)
            ? true
            : columDisplay.personFullName,
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
        options: { display: false },
      },
    ];
  };

  componentWillUnmount() {
    socketIO.emit("unsubscribeChanges");
    socketIO.off("AnyChange", this.updateAchievement);
    window.removeEventListener("resize", this.updateScreenMode);
  }

  updateScreenMode = () => {
    this.setState({ isDesktop: window.innerWidth > 900 });
  };

  handleChangesToBring = (value) => {
    this.setState({ thereAreChangesToBring: value });
  };

  componentDidMount() {
    NavBarAccessControl.hideLoader();
    // connectSocket();
    this.updateScreenMode();
    window.addEventListener("resize", this.updateScreenMode);
    socketIO.emit("changes");
    const loadData = this.loadData;
    socketIO.on("AnyChange", function (data) {
      if (data.message[24]) {
        loadData(false);
      }
    });
    this.loadData(true);
  }

  setAutomaticUpdatesStopped = (value) => () => {
    console.log("value: ", value);
    this.setState({ automaticUpdateStopped: value });
  };

  loadData = (contentLoader, isSearch) => {
    const { columns, searchText = "" } = this.state;
    if (
      (this.state.thereAreRowSelected || this.state.automaticUpdateStopped) &&
      !contentLoader
    ) {
      this.handleChangesToBring(true);
      return;
    }
    if (contentLoader)
      this.setState({
        isLoadingNewData: true,
        thereAreRowSelected: false,
        thereAreChangesToBring: false,
        automaticUpdateStopped: false,
      });
    this.props.requestGetEvents({
      start: isSearch ? 0 : page * rowsPerPage,
      length: rowsPerPage,
      order: columns[activeColumnSort].name + " " + order,
      search: searchText ? searchText : "",
    });
  };

  handleOnDetails = (index) => {
    let event = this.state.data[index];
    this.setState({ isMessage: event.description.startsWith("Mensaje:") });
    this.props.requestGetEventById({
      id: event.id,
      discriminator: event.discriminator,
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
    this.loadData(false);
  };

  changeSearch = (value) => {
    this.setState({
      isSearching: true,
    });
    this.loadData(false, true);
  };
  onChangeSearch = (text) => {
    // let value = event.currentTarget ? event.currentTarget.value : event.value;
    let value = text ? text : "";
    this.setState({
      searchText: value,
    });
    this.changeSearchDebounce(value);
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
      "eventMonitoringColumns",
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
        // this.changeSearch(tableState.searchText);
        this.onChangeSearch(tableState.searchText);
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

  handleRowSelectedChange = (currentRowsSelected, allRowsSelected) => {
    this.setState({
      thereAreRowSelected: allRowsSelected.length > 0,
      hideSearch: allRowsSelected.length !== 0,
    });
  };

  forceUpdate = () => {
    this.loadData(true);
  };

  render() {
    const {
      data,
      columns,
      isLoading,
      isLoadingNewData,
      dataCount,
      eventOnDetails,
      thereAreChangesToBring,
    } = this.state;
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
      // search: false,
      search: true,
      searchText: this.state.searchText,
      serverSide: true,
      rowsPerPage: rowsPerPage,
      count: dataCount,
      page: page,
      onRowsSelect: this.handleRowSelectedChange,
      customToolbarSelect: (selectedRows) => {
        //!this.state.hideSearch && this.setState({ hideSearch: true });
        return (
          <React.Fragment>
            {this.state.thereAreChangesToBring === true && (
              <Fab
                onClick={this.forceUpdate}
                variant="extended"
                style={{ height: 35 }}
              >
                <NewReleases
                  className={classes.extendedIcon}
                  style={{ color: "darkred" }}
                />
                {t("ThereAreNewData")}
              </Fab>
            )}
            <CustomToolbarSelect
              selectedRows={selectedRows}
              onDetails={this.handleOnDetails}
            />
          </React.Fragment>
        );
      },
      customToolbar: () => {
        return (
          (<React.Fragment>
            <LinearProgress
              style={{
                opacity: this.state.isSearching ? "1" : "0",
                width: "90%",
                background: "none",
                marginLeft: "-50%",
                padding: 0,
                position: "absolute",
                zIndex: 1,
              }}
              variant="query"
            />
            <Tooltip
              title={
                this.state.automaticUpdateStopped
                  ? t("TurnOnAutomaticUpdate")
                  : t("ShutDownAutomaticUpdate")
              }
            >
              <IconButton
                className={classes.iconButton}
                onClick={
                  this.state.automaticUpdateStopped
                    ? this.setAutomaticUpdatesStopped(false)
                    : this.setAutomaticUpdatesStopped(true)
                }
                size="large">
                {this.state.automaticUpdateStopped ? (
                  <SyncDisabledTwoToneIcon
                    className={classes.autoUpdateOffIcon}
                  />
                ) : (
                  <AutorenewIcon className={classes.autoUpdateIcon} />
                )}
              </IconButton>
            </Tooltip>
            <Slide
              direction="down"
              in={this.state.thereAreChangesToBring}
              mountOnEnter
              unmountOnExit
            >
              <div className={classes.newDataButtonContainer}>
                <Tooltip title={t("ThereAreNewDataAction")}>
                  <Fab
                    onClick={this.forceUpdate}
                    variant="extended"
                    style={{ height: 35 }}
                  >
                    <NewReleases
                      className={classes.extendedIcon}
                      style={{ color: "darkred", marginRight: 5 }}
                    />
                    {t("ThereAreNewData")}
                  </Fab>
                </Tooltip>
              </div>
            </Slide>
          </React.Fragment>)
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

    if (isLoading)
      return (
        <div className={classes.skeletonLoader}>
          <TableSkeletonLoader />
        </div>
      );
    return (
      <div style={{ marginTop: this.state.isDesktop ? "0%" : "4%" }}>
        {/* <Grid
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
                  >
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
        </Grid> */}

        <MUIDataTable
          title={t("EventMonitoring")}
          data={data}
          columns={columns}
          options={options}
        />

        <div
          className={classes.contentLoader}
          style={{ display: isLoadingNewData ? "inherit" : "none" }}
        >
          <CircularProgress className={classes.circularProgress} size={50} />
        </div>

        <Dialog
          open={!isNullOrUndefined(eventOnDetails)}
          TransitionComponent={Transition}
          onClose={() => this.setState({ eventOnDetails: undefined })}
          maxWidth="md"
          fullWidth
          scroll="paper"
        >
          <EventDetails
            isDialog
            updateParent={() => this.loadData(true)}
            isDetails
            onCreate={() => this.setState({ eventOnDetails: undefined })}
            event={eventOnDetails}
            isMessage={this.state.isMessage}
          />
        </Dialog>
      </div>
    );
  }
}

EventMonitoring.propTypes = {
  classes: PropTypes.object.isRequired,
};

const EventMonitoringConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(EventMonitoring);

export default withTranslation()(withStyles(styles)(EventMonitoringConnected));
