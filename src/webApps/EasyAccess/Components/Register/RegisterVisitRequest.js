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
import ApiHandler from "../../../../services/ApiHandler";
import CustomToolbarSelect from "../../../Shared/DataTable/CustomToolBarSelect";
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
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { Icon } from "semantic-ui-react";
import { debounce } from "throttle-debounce";
import styles from "../../../../assets/styles/EasyAccess_styles/Register_styles/registerVisitRequestStyles";

import { socketIO } from "../../../../utils/WebSockets";
const mapStateToProps = ({ User, Persons }) => {
  return {
    isCreating: Persons.isCreating,
    currentUser: User.currentUser,
  };
};

let page = 0;
let rowsPerPage = 10;
let activeColumnSort = 5;
let order = "asc";

function Transition(props) {
  return <Slide direction="down" {...props} />;
}

class RegisterVisitRequest extends Component {
  constructor(props) {
    super(props);
    const { t } = this.props;
    this.state = {
      isLoading: true,
      registerOnEdit: undefined,
      isLoadingNewData: false,
      openDialogDeleteConfirm: false,
      isSearching: false,
      columns: this.translateColumns(t),
    };
    this.changeSearchDebounce = debounce(500, (value) =>
      this.changeSearch(value)
    );
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.i18n.language !== prevState.language ||
      nextProps.isCreating !== prevState.isCreating
    ) {
      return {
        isCreating: nextProps.isCreating,
        language: nextProps.i18n.language,
      };
    } else return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.language !== this.state.language) {
      this.setState({
        ...prevState,
        columns: this.translateColumns(this.props.t),
      });
    }
  }

  translateColumns = (t) => {
    return [
      {
        name: t("name"),
        field: "name",
        options: {
          filter: true,
          sort: true,
          sortDirection: activeColumnSort === 0 ? order : "none",
          customBodyRender: (data) => {
            return (
              <Typography
                value={data.name}
                aria-owns={this.state.open ? "mouse-over-popover" : undefined}
                aria-haspopup="true"
              >
                {`${data.name} ${data.lastname}`}
              </Typography>
            );
          },
        },
      },
      {
        name: t("dni"),
        field: "document",
        options: {
          filter: true,
          sort: true,
          sortDirection: activeColumnSort === 1 ? order : "none",
          customBodyRender: (data) => {
            return (
              <Typography
                value={data.document}
                aria-owns={this.state.open ? "mouse-over-popover" : undefined}
                aria-haspopup="true"
                // onMouseEnter={this.handlePopoverOpen}
                // onMouseLeave={this.handlePopoverClose}
              >
                {data.document}
              </Typography>
            );
          },
        },
      },
      {
        name: t("email"),
        field: "email",
        options: {
          filter: true,
          sort: true,
          sortDirection: activeColumnSort === 2 ? order : "none",
          customBodyRender: (data) => {
            return (
              <Typography
                value={data.email}
                aria-owns={this.state.open ? "mouse-over-popover" : undefined}
                aria-haspopup="true"
                // onMouseEnter={this.handlePopoverOpen}
                // onMouseLeave={this.handlePopoverClose}
              >
                {data.document}
              </Typography>
            );
          },
        },
      },
      {
        name: t("enterprise"),
        field: "originEnterpriseName",
        options: {
          filter: true,
          sort: true,
          sortDirection: activeColumnSort === 3 ? order : "none",
          customBodyRender: (data) => {
            return (
              <Typography
                value={data.originEnterpriseName}
                aria-owns={this.state.open ? "mouse-over-popover" : undefined}
                aria-haspopup="true"
                // onMouseEnter={this.handlePopoverOpen}
                // onMouseLeave={this.handlePopoverClose}
              >
                {data.originEnterpriseName}
              </Typography>
            );
          },
        },
      },
      {
        name: t("host"),
        field: "hostName",
        options: {
          filter: true,
          sort: true,
          sortDirection: activeColumnSort === 4 ? order : "none",
          customBodyRender: (data) => {
            return (
              <Typography
                value={data.hostName}
                aria-owns={this.state.open ? "mouse-over-popover" : undefined}
                aria-haspopup="true"
                // onMouseEnter={this.handlePopoverOpen}
                // onMouseLeave={this.handlePopoverClose}
              >
                {data.hostName}
              </Typography>
            );
          },
        },
      },
      {
        name: t("status"),
        field: "status",
        options: {
          filter: true,
          sort: true,
          sortDirection: activeColumnSort === 5 ? order : "none",
          customBodyRender: (data) => {
            return (
              <Typography
                value={data.status}
                aria-owns={this.state.open ? "mouse-over-popover" : undefined}
                aria-haspopup="true"
                // onMouseEnter={this.handlePopoverOpen}
                // onMouseLeave={this.handlePopoverClose}
              >
                {t(data.statusName)}
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
  componentWillUnmount = () => {
    socketIO.emit("unsubscribeChanges");
  };

  componentDidMount() {
    const { columns, searchText, isLoading } = this.state;
    NavBarEasyAccess.hideLoader();
    socketIO.emit("changes");
    const loadData = this.loadData;
    socketIO.on("AnyChange", function (data) {
      if (data.message[3] || data.message[4]) {
        loadData(true);
      }
    });

    const { currentUser } = this.props;

    if (isLoading)
      ApiHandler.EasyAccess.Register.getUserVisits({
        onlyPendingApproval: true,
        start: page * rowsPerPage,
        length: rowsPerPage,
        order: columns[activeColumnSort].field + " " + order,
        search: searchText,
        skipPendingApprovalVisibility:
          !isNullOrUndefined(currentUser.permits[38]) &&
          currentUser.permits[38].includes(4),
      })
        .then(({ data }) => {
          this.setState({
            data: data.data,
            dataCount: data.dataCount,
            isLoading: false,
          });
        })
        .catch((error) => {
          console.log(error);
        });
  }

  handlePopoverOpen = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handlePopoverClose = () => {
    this.setState({ anchorEl: null });
  };

  loadData = (contentLoader, isSearch) => {
    const { columns, searchText } = this.state;

    const { currentUser } = this.props;

    if (contentLoader) this.setState({ isLoadingNewData: true });
    ApiHandler.EasyAccess.Register.getUserVisits({
      onlyPendingApproval: true,
      start: isSearch ? 0 : page * rowsPerPage,
      length: rowsPerPage,
      order: columns[activeColumnSort].field + " " + order,
      search: searchText,
      skipPendingApprovalVisibility:
        !isNullOrUndefined(currentUser.permits[38]) &&
        currentUser.permits[38].includes(4),
    }).then(({ data }) => {
      const lastSearchText = this.state.searchText;
      this.setState({
        data: data.data,
        hideSearch: false,
        dataCount: data.dataCount,
        isLoadingNewData: false,
        isSearching: lastSearchText !== searchText,
      });
      if (lastSearchText !== searchText) this.loadData(false);
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
    this.loadData(false, true);
  };
  onChangeSearch = (event) => {
    let value = event.currentTarget ? event.currentTarget.value : event.value;
    this.setState({
      searchText: value,
    });
    this.changeSearchDebounce(value);
  };

  handleOnDelete = () => {
    var indexs = this.state.indexsToDelete;
    const { data } = this.state;
    const { t } = this.props;
    var registerToDelete = [];
    indexs.map((i) => registerToDelete.push(data[i].id));
    ApiHandler.EasyAccess.Register.deleteRegister(registerToDelete)
      .then(() => {
        SnackbarHandler.showMessage(
          indexs.length === 1
            ? t("successDeleteRegister")
            : t("successDeleteRegisters")
        );
        this.setState({
          openDialogDeleteConfirm: false,
          indexsToDelete: undefined,
        });
        this.loadData(true);
      })
      .catch(({ error }) => {
        console.log(error);
        this.setState({
          openDialogDeleteConfirm: false,
          indexsToDelete: undefined,
        });
        SnackbarHandler.showMessage(error.message, "error");
      });
  };

  handleOnEdit = (index) => {
    var register = this.state.data[index];
    this.setState({
      registerOnEdit: register,
    });
  };

  handleOnDetail = (index) => {
    var register = this.state.data[index];
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
    return (
      Object.keys(currentUser.permits).filter((v) => {
        return entities.includes(v.toString()) && activity != null
          ? currentUser.permits[v].includes(parseInt(activity))
          : true;
      }).length > 0
    );
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
    } = this.state;
    const { classes, t, currentUser } = this.props;
    const options = {
      filterType: "dropdown",
      //responsive: "scroll",
      fixedHeader: false,
      serverSide: true,
      search: false,
      download: false,
      filter: false,
      rowsPerPage: rowsPerPage,
      count: dataCount,
      page: page,
      onRowsSelect: (selectedRows, selected) => {
        if (selected.length === 0) this.setState({ hideSearch: false });
        else {
          this.setState({ hideSearch: true });
        }
      },
      customToolbarSelect: (selectedRows) => {
        // !this.state.hideSearch && this.setState({ hideSearch: true });
        return (
          <CustomToolbarSelect
            selectedRows={selectedRows}
            onEdit={
              !isNullOrUndefined(currentUser.permits[38]) &&
              currentUser.permits[38].includes(4)
                ? this.handleLicence(
                    [Entities.VISITORS.toString()],
                    Activity.UPDATE
                  ) && this.handleOnEdit
                : this.handleOnEdit
            }
            onDetails={this.handleOnDetail}
            onDelete={
              !isNullOrUndefined(currentUser.permits[38]) &&
              currentUser.permits[38].includes(4)
                ? this.handleLicence(
                    [Entities.VISITORS.toString()],
                    Activity.DELETE
                  ) && this.handleOpenDeleteConfirm
                : this.handleOpenDeleteConfirm
            }
          />
        );
      },
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
      (<div>
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
                      style={{ margin: 0 }}
                    />
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </Grid>
        {/* {this.renderPopover()} */}
        <MUIDataTable
          ref={(e) => (this.parent = e)}
          title={t("VisitsToApprove")}
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
            isVisitRequest
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
            <Button onClick={this.handleCloseDeleteConfirm}>
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
      </div>)
    );
  }
}

RegisterVisitRequest.propTypes = {
  classes: PropTypes.object.isRequired,
};
const RegisterVisitRequestConnected = connect(
  mapStateToProps,
  null
)(RegisterVisitRequest);

export default withTranslation()(
  withStyles(styles)(RegisterVisitRequestConnected)
);
