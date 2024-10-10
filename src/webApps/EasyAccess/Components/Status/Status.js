import React, { Component } from "react";
import NavBarEasyAccess from "../../utils/NavBarEasyAccess";
import TableSkeletonLoader from "../../../Shared/TableSkeletonLoader";
import PropTypes from "prop-types";
import { withStyles } from '@mui/styles';
import MUIDataTable from "mui-datatables";
import CircularProgress from "@mui/material/CircularProgress";
import LinearProgress from "@mui/material/LinearProgress";
import CustomToolbarSelect from "../../../Shared/DataTable/CustomToolBarSelect";
import Fade from "@mui/material/Fade";
import {
  Slide,
  Dialog,
  Avatar,
  DialogActions,
  DialogContentText,
  Button,
} from "@mui/material";
import StatusForm from "./NewStatus";
import CheckedIcon from "@mui/icons-material/CheckRounded";
import CancelIcon from "@mui/icons-material/Close";
import { isNullOrUndefined } from "util";
import SnackbarHandler from "../../../../utils/SnackbarHandler";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import InfoIcon from "@mui/icons-material/ChevronRightRounded";
import { withTranslation } from "react-i18next";
import {
  requestGetStatuses,
  requestDeleteStatuses,
} from "../../../../actions/EasyAccess/status_actions";
import { connect } from "react-redux";
import { debounce } from "throttle-debounce";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import { Icon } from "semantic-ui-react";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import styles from "../../../../assets/styles/EasyAccess_styles/Status_styles/statusStyles";

const mapDispatchToProps = { requestGetStatuses, requestDeleteStatuses };

const mapStateToProps = ({ Status }) => {
  return {
    loading: Status.loading,
    successDeleteStatus: Status.successDeleteStatus,
    data: Status.statuses ? Status.statuses.data : [],
    dataCount: Status.statuses ? Status.statuses.dataCount : 0,
    successGetStatuses: Status.successGetStatuses,
    deleteResponse: Status.deleteResponse,
  };
};

function Transition(props) {
  return <Slide direction="down" {...props} />;
}

let page = 0;
let rowsPerPage = 10;
let activeColumnSort = 0;
let order = "asc";

class Status extends Component {
  constructor(props) {
    super(props);
    const { t } = props;
    this.state = {
      isLoading: true,
      isLoadingNewData: false,
      statusOnDetails: undefined,
      isSearching: false,
      protectedData: [],
      openDialogProtectedData: false,
      columns: this.translateColumns(t, true),
      deleteResponse: [],
    };
    this.changeSearchDebounce = debounce(300, (value) =>
      this.changeSearch(value)
    );
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.i18n.language !== prevState.language ||
      nextProps.loading !== prevState.isLoadingNewData ||
      nextProps.successDeleteStatus !== prevState.successDeleteStatus ||
      nextProps.successGetStatuses !== prevState.successGetStatuses
    ) {
      return {
        language: nextProps.i18n.language,
        isLoadingNewData: nextProps.loading,
        successDeleteStatus: nextProps.successDeleteStatus,
        successGetStatuses: nextProps.successGetStatuses,
        data: nextProps.data,
        dataCount: nextProps.dataCount,
        deleteResponse: nextProps.deleteResponse,
      };
    } else return null;
  }

  componentDidUpdate(prevProps, prevState) {
    const { t } = this.props;
    if (prevState.language !== this.state.language) {
      this.setState({
        ...prevState,
        columns: this.translateColumns(this.props.t, false),
      });
    }
    if (
      this.state.successGetStatuses &&
      this.state.successGetStatuses !== prevState.successGetStatuses
    ) {
      this.setState({
        isLoading: false,
        isLoadingNewData: false,
        isSearching: prevState.searchText !== this.state.searchText,
        hideSearch: false,
      });
      if (prevState.searchText !== this.state.searchText) this.loadData(false);
    }
    if (
      this.state.successDeleteStatus &&
      prevState.successDeleteStatus !== this.state.successDeleteStatus
    ) {
      if (this.state.deleteResponse && this.state.deleteResponse.length > 0) {
        let protectedData = this.state.data.filter((s) =>
          this.state.deleteResponse.includes(s.id)
        );
        if (protectedData.length === this.state.statusToDelete.length) {
          SnackbarHandler.showMessage(t("StatusSelectedTheyAreInUse"), "error");
        }
        if (protectedData.length !== this.state.statusToDelete.length) {
          this.setState({
            protectedData: protectedData,
            openDialogProtectedData: true,
          });
        }
      } else {
        this.loadData();
        this.setState({
          openDialogProtectedData: false,
        });
        SnackbarHandler.showMessage(t("SuccessDeleteStatus"));
      }
    }
  }

  translateColumns = (t, initial) => {
    const { classes } = this.props;

    let colStorage = JSON.parse(localStorage.getItem("statusColumnsEA"));

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
        label: t("cardStatus"),
        name: "changeBadgeStatus",
        options: {
          filter: true,
          sort: true,
          sortDirection: activeColumnSort === 1 ? order : "none",
          display: isNullOrUndefined(columDisplay.changeBadgeStatus)
            ? true
            : columDisplay.changeBadgeStatus,
          customBodyRender: (data) => {
            if (data.changeBadgeStatus)
              return <CheckedIcon className={classes.check} />;
            else return <CancelIcon className={classes.cancel} />;
          },
        },
      },
      {
        label: t("FreeBadges"),
        name: "unassignBadge",
        options: {
          filter: true,
          sort: true,
          sortDirection: activeColumnSort === 2 ? order : "none",
          display: isNullOrUndefined(columDisplay.unassignBadge)
            ? true
            : columDisplay.unassignBadge,
          customBodyRender: (data) => {
            if (data.unassignBadge)
              return <CheckedIcon className={classes.check} />;
            else return <CancelIcon className={classes.cancel} />;
          },
        },
      },
      {
        label: t("Trigger"),
        name: "changeStatusOnReader",
        options: {
          filter: true,
          sort: true,
          sortDirection: activeColumnSort === 3 ? order : "none",
          display: isNullOrUndefined(columDisplay.changeStatusOnReader)
            ? true
            : columDisplay.changeStatusOnReader,
          customBodyRender: (data) => {
            if (data.changeStatusOnReader)
              return <CheckedIcon className={classes.check} />;
            else return <CancelIcon className={classes.cancel} />;
          },
        },
      },
    ];
  };

  componentWillUnmount = () => {
    window.removeEventListener("resize", this.updateScreenMode);
  };

  updateScreenMode = () => {
    this.setState({ isDesktop: window.innerWidth > 900 });
  };

  componentDidMount() {
    NavBarEasyAccess.hideLoader();
    this.updateScreenMode();

    this.loadData();
  }

  loadData = (contentLoader = false, isSearch) => {
    const { columns, searchText } = this.state;
    if (contentLoader) this.setState({ isLoadingNewData: true });
    this.props.requestGetStatuses({
      start: isSearch ? 0 : page * rowsPerPage,
      length: rowsPerPage,
      order: columns[activeColumnSort].field + " " + order,
      search: searchText,
    });
  };

  handleOnEdit = (index) => {
    let status = this.state.data[index];
    this.setState({
      statusOnEdit: status,
    });
  };

  handleOnDelete = (indexs) => {
    const { data } = this.state;

    let statusToDelete = [];
    indexs.map((i) => {
      return statusToDelete.push(data[i].id);
    });
    this.setState({ statusToDelete });
    this.props.requestDeleteStatuses(statusToDelete);
  };

  handleOnDeleteWithProtectedData = () => {
    const { statusToDelete, protectedData } = this.state;
    ///const { t } = this.props;
    let statusToDeleteWithoutProtectedData = statusToDelete.filter(
      (s) => !protectedData.map((p) => p.id).includes(s)
    );
    this.props.requestDeleteStatuses(statusToDeleteWithoutProtectedData);
  };

  handleOnDetails = (index) => {
    let status = this.state.data[index];
    this.setState({
      statusOnDetails: status,
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

  changeSearch = (searchText) => {
    const { isSearching } = this.state;
    this.setState({
      searchText,
      isSearching: true,
    });
    if (!isSearching) {
      this.loadData(true);
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

    localStorage.setItem("statusColumnsEA", JSON.stringify(modifiedColumns));
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

  changeSearch = (value) => {
    this.setState({
      isSearching: true,
    });

    this.loadData(true, true);
  };
  onChangeSearch = (event) => {
    let value = event.currentTarget ? event.currentTarget.value : event.value;
    this.setState({
      searchText: value,
    });
    this.changeSearchDebounce(value);
  };

  render() {
    const {
      data,
      columns,
      isLoading,
      isLoadingNewData,
      dataCount,
      statusOnEdit,
      isDesktop,
      protectedData,
      openDialogProtectedData,
      statusOnDetails,
    } = this.state;
    const { classes, t, theme } = this.props;
    const options = {
      searchText: this.state.searchText ? this.state.searchText : "",
      filterType: "dropdown",
      responsive: "block",
      selectableRowsOnClick: true,
      serverSide: true,
      rowsPerPage: rowsPerPage,
      count: dataCount,
      //onRowClick: this.onRowClicked,
      search: true,
      page: page,
      download: false,
      onRowsSelect: (selectedRows, selected) => {
        if (selected.length === 0) this.setState({ hideSearch: false });
        else {
          this.setState({ hideSearch: true });
        }
      },
      customToolbarSelect: (selectedRows) => (
        <CustomToolbarSelect
          onDelete={this.handleOnDelete}
          onEdit={this.handleOnEdit}
          selectedRows={selectedRows}
          onDetails={this.handleOnDetails}
        />
      ),
      customToolbar: () => {
        return (
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
      (<div style={{ width: "100%", paddingTop: isDesktop ? "0%" : "4%" }}>
        {/* <Grid
          item
          // direction="column"
          // justify="flex-start"
          // alignItems="flex-start"
          style={{
            zIndex: 1,
            display: this.state.hideSearch ? "none" : "flex",
            position: "absolute",
            right: "12em",
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
        <MUIDataTable
          title={t("status")}
          data={data}
          columns={columns}
          options={options}
        />
        <Fade in={isLoadingNewData} className={classes.contentLoader}>
          <div style={{ pointerEvents: isLoadingNewData ? "inherit" : "none" }}>
            <CircularProgress className={classes.circularProgress} size={50} />
          </div>
        </Fade>
        <Dialog
          open={!isNullOrUndefined(statusOnEdit)}
          TransitionComponent={Transition}
          onClose={() => this.setState({ statusOnEdit: undefined })}
          maxWidth="md"
          fullWidth
          scroll="paper"
        >
          <StatusForm
            isDialog
            updateParent={() => this.loadData(true)}
            isEdit
            onCreate={() => this.setState({ statusOnEdit: undefined })}
            //initValues={statusOnEdit}
            id={statusOnEdit ? statusOnEdit.id : -1}
          />
        </Dialog>
        <Dialog
          open={openDialogProtectedData}
          onClose={() => this.setState({ openDialogProtectedData: false })}
        >
          <DialogTitle>{t("TheNextStatusDontDelete")}</DialogTitle>
          <div>
            {
              <List>
                {protectedData.map((d) => (
                  <ListItem key={d.id}>
                    <ListItemAvatar>
                      <Avatar>
                        <InfoIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={d.name} />
                  </ListItem>
                ))}
              </List>
            }
          </div>
          <DialogContentText
            style={{ display: "flex", justifyContent: "center" }}
          >
            {t("DeleteOtherStatus")}
          </DialogContentText>
          <DialogActions>
            <Button
              onClick={() => this.setState({ openDialogProtectedData: false })}
              style={{ color: theme.palette.text.main }}>
              {t("cancel")}
            </Button>
            <Button
              onClick={() =>
                this.handleOnDeleteWithProtectedData(protectedData)
              }>
              {t("accept")}
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={!isNullOrUndefined(statusOnDetails)}
          TransitionComponent={Transition}
          onClose={() => this.setState({ statusOnDetails: undefined })}
          maxWidth="md"
          fullWidth
          scroll="paper"
        >
          <StatusForm
            isDialog
            onCreate={() => this.setState({ statusOnDetails: undefined })}
            //initValues={statusOnDetails}
            isDetails
            id={statusOnDetails ? statusOnDetails.id : -1}
          />
        </Dialog>
      </div>)
    );
  }
}

const StatusConnected = connect(mapStateToProps, mapDispatchToProps)(Status);

Status.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withTranslation()(
  withStyles(styles, { withTheme: true })(StatusConnected)
);
