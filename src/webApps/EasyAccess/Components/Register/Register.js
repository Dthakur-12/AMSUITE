import React, { Component } from "react";
import TableSkeletonLoader from "../../../Shared/TableSkeletonLoader";
import PropTypes from "prop-types";
import { withStyles } from '@mui/styles';
import MUIDataTable from "mui-datatables";
import CircularProgress from "@mui/material/CircularProgress";
import LinearProgress from "@mui/material/LinearProgress";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import CarIcon from "@mui/icons-material/DirectionsCarRounded";
import NavBarEasyAccess from "../../utils/NavBarEasyAccess";
import CustomToolbarSelect from "../../../Shared/DataTable/CustomToolBarSelect";
import moment from "moment";
import Fade from "@mui/material/Fade";
import RegisterForm from "./NewPerson";
import DetailsForm from "./DetailsPerson";
import { Slide, Dialog } from "@mui/material";
import { isNullOrUndefined } from "util";
import SnackbarHandler from "../../../../utils/SnackbarHandler";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Entities, Activity } from "../../../../utils/Enums";
import NavigationIcon from "@mui/icons-material/Navigation";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import UpdateIcon from "@mui/icons-material/Update";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import NewReleases from "@mui/icons-material/NewReleases";
import { Icon } from "semantic-ui-react";
import { debounce } from "throttle-debounce";
import {
  requestRegisters,
  requestDeleteRegisters,
} from "../../../../actions/EasyAccess/Register_actions";
import { socketIO } from "../../../../utils/WebSockets";
import styles from "../../../../assets/styles/EasyAccess_styles/Register_styles/registerStyle";
import { camelize } from "../../../../utils/HelperFunctions";
import Fab from "@mui/material/Fab";
import Tooltip from "@mui/material/Tooltip";
import SyncDisabledTwoToneIcon from "@mui/icons-material/SyncDisabledTwoTone";
import TablePagination from "@mui/material/TablePagination";

const mapStateToProps = ({ User, Registers }) => {
  return {
    currentUser: User.currentUser,
    registers: Registers.registers,
    successRegisters: Registers.successRegisters,
    successDelRegisters: Registers.successDelRegisters,
    loadingRegister: Registers.loading,
    errorRegMsg: Registers.msjError,
    errorReg: Registers.error,
  };
};
const mapDispatchToProps = {
  requestRegisters: requestRegisters,
  requestDeleteRegisters: requestDeleteRegisters,
};

let activeColumnSort = 4;
let order = "desc";

function Transition(props) {
  return <Slide direction="down" {...props} />;
}

class Register extends Component {
  constructor(props) {
    super(props);
    const { t } = props;
    this.state = {
      isLoading: true,
      registerOnEdit: undefined,
      isLoadingNewData: false,
      openDialogDeleteConfirm: false,
      isSearching: false,
      columns: this.translateColumns(t, true),
      thereAreRowSelected: false,
      thereAreChangesToBring: false,
      automaticUpdateStopped: false,
      page: 0,
      rowsPerPage: 10,
    };
    this.changeSearchDebounce = debounce(500, (value) =>
      this.changeSearch(value)
    );
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.i18n.language !== prevState.language ||
      nextProps.registers !== prevState.registers ||
      nextProps.successRegisters !== prevState.successRegisters ||
      nextProps.successDelRegisters !== prevState.successDelRegisters ||
      nextProps.loadingRegister !== prevState.loadingRegister ||
      nextProps.errorRegMsg !== prevState.errorRegMsg ||
      nextProps.errorReg !== prevState.errorReg
    ) {
      return {
        language: nextProps.i18n.language,
        registers: nextProps.registers,
        successRegisters: nextProps.successRegisters,
        successDelRegisters: nextProps.successDelRegisters,
        loadingRegister: nextProps.loadingRegister,
        errorRegMsg: nextProps.errorRegMsg,
        errorReg: nextProps.errorReg,
      };
    } else return null;
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      successRegisters,
      searchText,
      successDelRegisters,
      loadingRegister,
      indexsToDelete,
      errorRegMsg,
      errorRegister,
    } = this.state;
    if (prevState.language !== this.state.language) {
      this.setState({
        ...prevState,
        columns: this.translateColumns(this.props.t, false),
      });
    }

    if (successRegisters && successRegisters !== prevState.successRegisters) {
      this.setState({
        data: this.state.registers.data,
        dataCount: this.state.registers.dataCount,
        isLoading: false,
        hideSearch: false,
        isLoadingNewData: false,
        isSearching: prevState.searchText !== searchText,
      });

      // if (prevState.searchText !== searchText) this.loadData(false);
    }

    if (
      successDelRegisters &&
      prevState.successDelRegisters !== successDelRegisters
    ) {
      SnackbarHandler.showMessage(
        indexsToDelete.length === 1
          ? this.props.t("successDeleteRegister")
          : this.props.t("successDeleteRegisters")
      );

      this.setState({
        openDialogDeleteConfirm: false,
        indexsToDelete: undefined,
      });
      this.loadData(true, this.state.page, this.state.rowsPerPage);
    }
    if (!loadingRegister && prevState.loadingRegister !== loadingRegister) {
      if (errorRegister) {
        this.setState({
          openDialogDeleteConfirm: false,
          indexsToDelete: undefined,
        });
        SnackbarHandler.showMessage(errorRegMsg, "error");
      }
    }
  }

  translateColumns = (t, initial) => {
    const isDesktop = window.innerWidth > 900;

    let colStorage = JSON.parse(localStorage.getItem("registerColumnsEA"));

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
          sortDirection: activeColumnSort === 0 ? order : "none",
          customBodyRender: (value, tableMeta) => {
            return (
              <Typography
                value={value}
                aria-owns={this.state.open ? "mouse-over-popover" : undefined}
                aria-haspopup="true"
              >
                {value}
              </Typography>
            );
          },
        },
      },
      {
        label: t("LastName"),
        name: "lastname",
        options: {
          filter: true,
          sort: true,
          display: isNullOrUndefined(columDisplay.lastname)
            ? true
            : columDisplay.lastname,
          sortDirection: activeColumnSort === 1 ? order : "none",
          customBodyRender: (value, tableMeta) => {
            return (
              <Typography
                value={value}
                aria-owns={this.state.open ? "mouse-over-popover" : undefined}
                aria-haspopup="true"
                // onMouseEnter={this.handlePopoverOpen}
                // onMouseLeave={this.handlePopoverClose}
              >
                {value}
              </Typography>
            );
          },
        },
      },
      {
        label: t("dni"),
        name: "document",
        options: {
          display: !isDesktop
            ? false
            : isNullOrUndefined(columDisplay.document)
            ? true
            : columDisplay.document,
          filter: true,
          sort: true,
          sortDirection: activeColumnSort === 2 ? order : "none",
          customBodyRender: (value, tableMeta) => {
            return (
              <Typography
                value={value}
                aria-owns={this.state.open ? "mouse-over-popover" : undefined}
                aria-haspopup="true"
                // onMouseEnter={this.handlePopoverOpen}
                // onMouseLeave={this.handlePopoverClose}
              >
                {value}
              </Typography>
            );
          },
        },
      },
      {
        label: t("enterprise"),
        name: "originEnterpriseName",
        options: {
          filter: true,
          sort: true,
          sortDirection: activeColumnSort === 3 ? order : "none",
          display: isNullOrUndefined(columDisplay.originEnterpriseName)
            ? true
            : columDisplay.originEnterpriseName,
          customBodyRender: (value, tableMeta) => {
            return (
              <Typography
                value={value}
                aria-owns={this.state.open ? "mouse-over-popover" : undefined}
                aria-haspopup="true"
                // onMouseEnter={this.handlePopoverOpen}
                // onMouseLeave={this.handlePopoverClose}
              >
                {value}
              </Typography>
            );
          },
        },
      },
      {
        label: t("visitEnterprise"),
        name: "visitEnterpriseName",
        options: {
          filter: true,
          sort: true,
          display: isNullOrUndefined(columDisplay.visitEnterpriseName)
            ? true
            : columDisplay.visitEnterpriseName,
          sortDirection: activeColumnSort === 3 ? order : "none",
          customBodyRender: (value, tableMeta) => {
            return (
              <Typography
                value={value}
                aria-owns={this.state.open ? "mouse-over-popover" : undefined}
                aria-haspopup="true"
                // onMouseEnter={this.handlePopoverOpen}
                // onMouseLeave={this.handlePopoverClose}
              >
                {value}
              </Typography>
            );
          },
        },
      },
      {
        label: t("DateAdmission"),
        name: "ingressDate",
        options: {
          filter: true,
          sort: true,
          sortDirection: activeColumnSort === 4 ? order : "none",
          display: !isDesktop
            ? false
            : isNullOrUndefined(columDisplay.ingressDate)
            ? true
            : columDisplay.ingressDate,
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
        label: t("DateExit"),
        name: "egressDate",
        options: {
          display: !isDesktop
            ? false
            : isNullOrUndefined(columDisplay.egressDate)
            ? true
            : columDisplay.egressDate,
          filter: true,
          sort: true,
          sortDirection: activeColumnSort === 5 ? order : "none",
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
        label: t("Type"),
        name: "type",
        options: {
          display: !isDesktop
            ? false
            : isNullOrUndefined(columDisplay.type)
            ? true
            : columDisplay.type,
          filter: true,
          sort: true,
          sortDirection: activeColumnSort === 6 ? order : "none",
          customBodyRender: (value, tableMeta) => {
            return (
              <Typography
                value={value}
                aria-owns={this.state.open ? "mouse-over-popover" : undefined}
                aria-haspopup="true"
                // onMouseEnter={this.handlePopoverOpen}
                // onMouseLeave={this.handlePopoverClose}
              >
                {value === 1 ? "Visitor" : "Employee"}
              </Typography>
            );
          },
        },
      },
      {
        label: t("Badges"),
        name: "badges",
        options: {
          display: !isDesktop
            ? false
            : isNullOrUndefined(columDisplay.badges)
            ? true
            : columDisplay.badges,
          filter: true,
          sort: true,
          sortDirection: activeColumnSort === 7 ? order : "none",
          customBodyRender: (value, tableMeta) => {
            if (value && value.length > 0)
              return (
                <Typography
                  value={value[0].number}
                  aria-owns={this.state.open ? "mouse-over-popover" : undefined}
                  aria-haspopup="true"
                  // onMouseEnter={this.handlePopoverOpen}
                  // onMouseLeave={this.handlePopoverClose}
                >
                  {value[0].number}
                </Typography>
              );
          },
        },
      },
      {
        label: t("status"),
        name: "statusName",
        options: {
          filter: true,
          sort: true,
          sortDirection: activeColumnSort === 8 ? order : "none",
          display: !isDesktop
            ? false
            : isNullOrUndefined(columDisplay.statusName)
            ? true
            : columDisplay.statusName,
          customBodyRender: (value, tableMeta) => {
            return (
              <Typography
                value={value}
                aria-owns={this.state.open ? "mouse-over-popover" : undefined}
                aria-haspopup="true"
                // onMouseEnter={this.handlePopoverOpen}
                // onMouseLeave={this.handlePopoverClose}
              >
                {t(camelize(value))}
              </Typography>
            );
          },
        },
      },
    ];
  };

  handleCloseDeleteConfirm = () => {
    this.setState({
      openDialogDeleteConfirm: false,
    });
  };

  handleOpenDeleteConfirm = (indexs) => {
    this.setState({
      openDialogDeleteConfirm: true,
      indexsToDelete: indexs,
    });
  };

  handleChangesToBring = (value) => {
    this.setState({ thereAreChangesToBring: value });
  };

  componentDidMount() {
    const { columns, searchText, isLoading, rowsPerPage, page } = this.state;
    const { currentUser } = this.props;
    let withoutPendingApproval = false;

    if (
      currentUser.permits &&
      !Object.keys(currentUser.permits).includes("38")
    ) {
      withoutPendingApproval = true;
    }
    this.updateScreenMode();
    NavBarEasyAccess.hideLoader();
    socketIO.emit("changes");
    const loadData = this.loadData;
    socketIO.on("AnyChange", function (data) {
      if (data.message[3] || data.message[4]) {
        loadData(false);
      }
    });
    if (isLoading) {
      if (
        this.handleLicence(
          [Entities.EMPLOYEES.toString(), Entities.VISITORS.toString()],
          Activity.VISUALIZE
        )
      ) {
        this.props.requestRegisters({
          withoutPendingApproval: withoutPendingApproval,
          start: page * rowsPerPage,
          length: rowsPerPage,
          order:
            columns[activeColumnSort].name === "statusName"
              ? "status" + " " + order
              : columns[activeColumnSort].name + " " + order,
          search: searchText ? searchText : "",
        });
      } else if (
        this.handleLicence([Entities.EMPLOYEES.toString()], Activity.VISUALIZE)
      ) {
        this.props.requestRegisters({
          withoutPendingApproval: withoutPendingApproval,
          start: page * rowsPerPage,
          length: rowsPerPage,
          order:
            columns[activeColumnSort].name === "statusName"
              ? "status" + " " + order
              : columns[activeColumnSort].name + " " + order,
          search: searchText ? searchText : "",
          type: 1,
        });
      } else if (
        this.handleLicence([Entities.VISITORS.toString()], Activity.VISUALIZE)
      ) {
        this.props.requestRegisters({
          withoutPendingApproval: withoutPendingApproval,
          start: page * rowsPerPage,
          length: rowsPerPage,
          order:
            columns[activeColumnSort].name === "statusName"
              ? "status" + " " + order
              : columns[activeColumnSort].name + " " + order,
          search: searchText ? searchText : "",
          type: 2,
        });
      } else this.setState({ isLoading: false, noVisualize: true });
    }
  }

  updateScreenMode = () => {
    this.setState({ isDesktop: window.innerWidth > 900 });
  };

  componentWillUnmount = () => {
    window.removeEventListener("resize", this.updateScreenMode);
    socketIO.emit("unsubscribeChanges");
    socketIO.off("AnyChange", this.updateAchievement);
  };

  handlePopoverOpen = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handlePopoverClose = () => {
    this.setState({ anchorEl: null });
  };

  setAutomaticUpdatesStopped = (value) => () => {
    this.setState({ automaticUpdateStopped: value });
  };

  loadData = (contentLoader, page, rowsPerPage) => {
    page = !isNullOrUndefined(page) ? page : this.state.page;
    rowsPerPage = rowsPerPage ? rowsPerPage : this.state.rowsPerPage;
    const { columns, searchText, isSearch } = this.state;
    const { currentUser } = this.props;
    let withoutPendingApproval = false;

    if (
      currentUser.permits &&
      !Object.keys(currentUser.permits).includes("38")
    ) {
      withoutPendingApproval = true;
    }
    const hasEmployeeLicence = this.handleLicence(
      [Entities.EMPLOYEES.toString()],
      Activity.VISUALIZE
    );
    const hasVisitorLicence = this.handleLicence(
      [Entities.VISITORS.toString()],
      Activity.VISUALIZE
    );
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

    if (hasEmployeeLicence || hasVisitorLicence) {
      this.props.requestRegisters({
        withoutPendingApproval: withoutPendingApproval,
        start: isSearch ? 0 : page * rowsPerPage,
        length: rowsPerPage,
        order:
          columns[activeColumnSort].name === "statusName"
            ? "status" + " " + order
            : columns[activeColumnSort].name + " " + order,
        search: searchText ? searchText : "",
        type: hasEmployeeLicence ? (hasVisitorLicence ? undefined : 1) : 2,
      });
    } else this.setState({ isLoading: false, noVisualize: true });
  };

  // changePage = (newPage) => {
  //   page = newPage;
  //   this.loadData(true);
  // };

  // changeRowsPerPage = (newRowsPerPage) => {
  //   rowsPerPage = newRowsPerPage;
  //   this.loadData(true);
  // };

  handleChangeRowsPerPage = (newRowsPerPage) => {
    if (newRowsPerPage !== this.state.rowsPerPage) {
      this.setState({ rowsPerPage: newRowsPerPage, page: 0 });
      this.loadData(true, 0, newRowsPerPage);
    }
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
    this.loadData(true, this.state.page, this.state.rowsPerPage);
  };

  changeSearch = (value) => {
    this.setState({
      isSearching: true,
    });
    this.loadData(true, this.state.page, this.state.rowsPerPage);
  };

  onChangeSearch = (text) => {
    let value = text ? text : "";
    this.setState({
      searchText: value,
    });
    this.changeSearchDebounce(value);
  };

  handleOnDelete = () => {
    let indexs = this.state.indexsToDelete;
    const { data } = this.state;
    let registerToDelete = [];
    indexs.map((i) => registerToDelete.push(data[i].id));
    this.props.requestDeleteRegisters(registerToDelete);
  };

  handleOnEdit = (index) => {
    let register = this.state.data[index];
    this.setState({
      registerOnEdit: register,
    });
  };

  handleOnDetail = (index) => {
    let register = this.state.data[index];
    this.setState({
      registerOnDetails: register,
    });
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
    localStorage.setItem("registerColumnsEA", JSON.stringify(modifiedColumns));
  };

  onTableChange = (action, tableState) => {
    switch (action) {
      case "changePage":
        this.handleChangePage(tableState.page);
        break;
      case "changeRowsPerPage":
        this.handleChangeRowsPerPage(tableState.rowsPerPage);
        break;
      case "sort":
        this.changeSort(
          tableState.activeColumn,
          tableState.announceText.includes("ascending") ? "asc" : "desc"
        );
        break;
      case "search":
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

  renderPopover = () => {
    const { classes, theme } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    return (
      <div style={{ display: "flex", width: 500 }}>
        <Popover
          className={classes.popover}
          classes={{
            paper: classes.paper,
          }}
          open={open}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          onClose={this.handlePopoverClose}
          disableRestoreFocus
        >
          <CarIcon style={{ color: theme.palette.text.main }} />
        </Popover>
      </div>
    );
  };

  handleLicence = (entities, activity) => {
    const { currentUser } = this.props;
    //const currentUser = { permits: { 3: [], 4: [] } };
    let a = [];
    a = Object.keys(currentUser.permits).filter((v) => {
      return (
        entities.includes(v.toString()) &&
        currentUser.permits[v].includes(parseInt(activity))
      );
    });

    return a.length === entities.length;
  };

  handleChangePage = (newPage) => {
    this.setState({ page: newPage });
    this.loadData(true, newPage, this.state.rowsPerPage);
  };

  handleLicenceToDelete = (selectedRows) => {
    let typesToDelete = { 0: false, 1: false };
    selectedRows.data.map(
      (elem) => (typesToDelete[this.state.data[elem.index].type] = true)
    );
    const { currentUser } = this.props;
    const entities =
      typesToDelete[0] && typesToDelete[1]
        ? ["3", "4"]
        : typesToDelete[0]
        ? ["3"]
        : ["4"];
    //const currentUser = { permits: { 3: [4, 2], 4: [4, 3] } };
    let a = [];
    a = Object.keys(currentUser.permits).filter((v) => {
      return (
        entities.includes(v.toString()) &&
        currentUser.permits[v].includes(parseInt(3))
      );
    });

    return a.length === entities.length;
  };

  handleRowSelectedChange = (currentRowsSelected, allRowsSelected) => {
    this.setState({ thereAreRowSelected: allRowsSelected.length > 0 });
  };

  forceUpdate = () => {
    this.loadData(true, this.state.page, this.state.rowsPerPage);
  };

  render() {
    const {
      data,
      columns,
      isLoading,
      isLoadingNewData,
      dataCount,
      registerOnEdit,
      registerOnDetails,
      indexsToDelete,
      isDesktop,
      thereAreChangesToBring,
      thereAreRowSelected,
      page,
      rowsPerPage,
    } = this.state;
    const { classes, t, theme } = this.props;
    const options = {
      filterType: "dropdown",
      responsive: "block",
      selectableRowsOnClick: true,
      serverSide: true,
      rowsPerPage: rowsPerPage,
      count: dataCount,
      searchText: this.state.searchText,
      //onRowClick: this.onRowClicked,
      search: true,
      page: page,
      download: false,
      filter: false,
      print: isDesktop,
      viewColumns: isDesktop,

      // onRowsSelect: (selectedRows, selected) => {
      //   if (selected.length === 0) this.setState({ hideSearch: false });
      //   else {
      //     this.setState({ hideSearch: true });
      //   }
      // },
      onRowsSelect: this.handleRowSelectedChange,
      customToolbarSelect: (selectedRows) => {
        // !this.state.hideSearch && this.setState({ hideSearch: true });
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
              onEdit={selectedRows.data.length === 1 && this.handleOnEdit}
              onDetails={this.handleOnDetail}
              onDelete={this.handleOpenDeleteConfirm}
              permitsToDelete={this.handleLicenceToDelete(selectedRows)}
              permitsToEdit={
                (this.state.data[selectedRows.data[0].index].type === 0 &&
                  this.handleLicence(
                    [Entities.EMPLOYEES.toString()],
                    Activity.UPDATE
                  )) ||
                (this.state.data[selectedRows.data[0].index].type === 1 &&
                  this.handleLicence(
                    [Entities.VISITORS.toString()],
                    Activity.UPDATE
                  ))
              }
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
          noMatch: this.state.noVisualize
            ? t("DontHavePermissions")
            : t("dontSearchRegister"),
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
      <div style={{ width: "100%", paddingTop: isDesktop ? "0%" : "4%" }}>
        {/* <Grid
          item
          // direction="column"
          // justify="flex-start"
          // alignItems="flex-start"
          style={{
            zIndex: 1,
            display: this.state.hideSearch ? "none" : "flex",
            position: "absolute",
            right: "10em"
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
                  >
                    <Icon
                      name="search"
                      //inverted
                      //circular
                      link
                      style={{ margin: 0, color: theme.palette.text.main }}
                    />
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </Grid> */}
        {/* {this.renderPopover()} */}

        <MUIDataTable
          ref={(e) => (this.parent = e)}
          title={t("Registers")}
          data={data}
          columns={columns}
          options={options}
          // className={classes.dataTable}
        />
        {/* {!thereAreRowSelected && (
          <TablePagination
            rowsPerPageOptions={[10, 15, 100]}
            component="div"
            count={dataCount}
            labelRowsPerPage={`${t("show")} : `}
            labelDisplayedRows={() =>
              `${page * rowsPerPage + 1} - ${
                dataCount < (page + 1) * rowsPerPage
                  ? dataCount
                  : (page + 1) * rowsPerPage
              } ${t("of")} ${dataCount}`
            }
            rowsPerPage={rowsPerPage}
            page={page}
            backIconButtonProps={{
              "aria-label": "Previous Page",
              // value: "previous",
            }}
            nextIconButtonProps={{
              "aria-label": "Next Page",
              // value: "next",
            }}
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
            className={classes.customPagination}
          />
        )} */}
        <Fade in={isLoadingNewData} className={classes.contentLoader}>
          <div style={{ pointerEvents: isLoadingNewData ? "inherit" : "none" }}>
            <CircularProgress className={classes.circularProgress} size={50} />
          </div>
        </Fade>
        <Dialog
          open={!isNullOrUndefined(registerOnEdit)}
          TransitionComponent={Transition}
          onClose={() => this.setState({ registerOnEdit: undefined })}
          maxWidth="md"
          fullWidth
          scroll="paper"
        >
          <RegisterForm
            isDialog
            functionLoadRegister={this.loadData}
            isEdit
            onCreate={() => this.setState({ registerOnEdit: undefined })}
            initValues={registerOnEdit}
          />
        </Dialog>
        <Dialog
          open={!isNullOrUndefined(registerOnDetails)}
          TransitionComponent={Transition}
          onClose={() => this.setState({ registerOnDetails: undefined })}
          maxWidth="md"
          fullWidth
          scroll="paper"
        >
          <DetailsForm
            isDialog
            functionLoadRegister={this.loadData}
            isDetail
            onCreate={() => this.setState({ registerOnDetails: undefined })}
            initValues={registerOnDetails}
          />
        </Dialog>
        <Dialog
          open={this.state.openDialogDeleteConfirm}
          onClose={this.handleCloseDeleteConfirm}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {t("DeleteRegister")}
          </DialogTitle>
          <DialogContent>
            {!isNullOrUndefined(indexsToDelete) && (
              <DialogContentText id="alert-dialog-description">
                {`${
                  indexsToDelete.length === 1
                    ? t("youSureDeleteRegister")
                    : t("youSureDeleteRegisters")
                }`}
              </DialogContentText>
            )}
          </DialogContent>
          <DialogActions>
            <Button
              onClick={this.handleCloseDeleteConfirm}
              className={classes.cancelButton}
            >
              {t("cancel")}
            </Button>
            <Button
              onClick={this.handleOnDelete}
              color="primary"
              variant="contained"
              autoFocus
            >
              {t("accept")}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

Register.propTypes = {
  classes: PropTypes.object.isRequired,
};
const RegisterConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);

export default withTranslation()(
  withStyles(styles, { withTheme: true })(RegisterConnected)
);
