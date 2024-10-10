import React, { Component } from "react";
import NavBarAccessControl from "../../utils/NavBarAccessControl";
import TableSkeletonLoader from "../../../Shared/TableSkeletonLoader";
import PropTypes from "prop-types";
import { withStyles } from '@mui/styles';
import MUIDataTable from "mui-datatables";
import CircularProgress from "@mui/material/CircularProgress";
import BadgeForm from "./NewBadge";
import ApiHandler from "../../../../services/ApiHandler";
import LinearProgress from "@mui/material/LinearProgress";
import Fade from "@mui/material/Fade";
import { Slide, Dialog } from "@mui/material";
import { isNullOrUndefined } from "util";
import CustomToolbarSelect from "../../../Shared/DataTable/CustomToolBarSelect";
import Chip from "@mui/material/Chip";
import moment from "moment";
import { debounce } from "throttle-debounce";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import Grid from "@mui/material/Grid";
import { Icon } from "semantic-ui-react";
import IconButton from "@mui/material/IconButton";

import Button from "@mui/material/Button";

import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import SnackbarHandler from "../../../../utils/SnackbarHandler";
import { Entities, Activity } from "../../../../utils/Enums";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import { requestBadges } from "../../../../actions/EasyAccess/Badges_actions";
import styles from "../../../../assets/styles/AccessControl_styles/Badge_styles/badgesStyles";
import { isValueEmptyOrNull } from "../../../../utils/HelperFunctions";
const mapStateToProps = ({ User, Badges }) => {
  return {
    currentUser: User.currentUser,
    badges: Badges.badges,
    successBadges: Badges.successBadges,
  };
};
const mapDispatchToPrps = { requestBadges: requestBadges };

function Transition(props) {
  return <Slide direction="down" {...props} />;
}

let page = 0;
let rowsPerPage = 10;
let activeColumnSort = 0;
let order = "asc";

class Badges extends Component {
  constructor(props) {
    super(props);
    const { classes, t } = props;
    this.state = {
      isLoading: true,
      isLoadingNewData: false,
      isSearching: false,
      openDialogEditBadge: true,
      indexsToDelete: undefined,
      openDialogDeleteBadge: false,
      columns: this.translateColumns(t, true),
    };

    this.changeSearchDebounce = debounce(300, (value) =>
      this.changeSearch(value)
    );
  }

  translateColumns = (t, initial) => {
    const isDesktop = window.innerWidth > 900;

    const { classes } = this.props;
    const language = this.props.i18n.language;

    let colStorage = JSON.parse(localStorage.getItem("badgesColumns"));

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
        label: t("number"),
        name: "number",
        options: {
          filter: true,
          sort: true,
          sortDirection: "asc",
          display: isNullOrUndefined(columDisplay.number)
            ? true
            : columDisplay.number,
        },
      },
      {
        label: t("activeDate"),
        name: "activationDate",
        options: {
          display: !isDesktop
            ? false
            : isNullOrUndefined(columDisplay.activationDate)
            ? true
            : columDisplay.activationDate,
          filter: true,
          sort: true,
          customBodyRender: (data) => {
            const formattedDate =
              this.props.i18n.language === "en"
                ? moment(data).format("MM/DD/YYYY HH:mm")
                : moment(data).format("DD/MM/YYYY HH:mm");
            return formattedDate;
          },
        },
      },
      {
        label: t("inactiveDate"),
        name: "deactivationDate",
        options: {
          display: !isDesktop
            ? false
            : isNullOrUndefined(columDisplay.deactivationDate)
            ? true
            : columDisplay.deactivationDate,
          filter: true,
          sort: true,
          customBodyRender: (data) => {
            const formattedDate =
              this.props.i18n.language === "en"
                ? moment(data).format("MM/DD/YYYY HH:mm")
                : moment(data).format("DD/MM/YYYY HH:mm");
            return formattedDate;
          },
        },
      },

      {
        label: t("owner"),
        name: "personFullName",
        options: {
          filter: true,
          sort: true,
          display: isNullOrUndefined(columDisplay.personFullName)
            ? true
            : columDisplay.personFullName,
          customBodyRender: (data) => {
            if (data !== null && data !== -1) {
              return data;
            } else {
              return <Chip label={t("notAdmitted")} className={classes.chip} />;
            }
          },
        },
      },
    ];
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.i18n.language !== prevState.language ||
      nextProps.successBadges !== prevState.successBadges ||
      nextProps.badges !== prevState.badges
    ) {
      return {
        badges: nextProps.badges,
        successBadges: nextProps.successBadges,
        language: nextProps.i18n.language,
      };
    } else return null;
  }
  componentDidUpdate(prevProps, prevState) {
    const { successBadges, badges, searchText } = this.state;
    if (successBadges && successBadges !== prevState.successBadges) {
      this.setState({
        data: badges.data,
        dataCount: badges.dataCount,
        isLoadingNewData: false,
        isLoading: false,
        isSearching: prevState.searchText !== searchText,
      });
      if (prevState.searchText !== searchText) this.loadData(false);
    }
    if (prevState.language !== this.state.language) {
      this.setState({
        ...prevState,
        columns: this.translateColumns(this.props.t, false),
      });
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateScreenMode);
  }

  updateScreenMode = () => {
    this.setState({ isDesktop: window.innerWidth > 900 });
  };

  componentDidMount() {
    NavBarAccessControl.hideLoader();
    // connectSocket();
    this.updateScreenMode();
    window.addEventListener("resize", this.updateScreenMode);
    const { columns, searchText = "" } = this.state;
    this.props.requestBadges({
      start: page * rowsPerPage,
      length: rowsPerPage,
      order: columns[activeColumnSort].name + " " + order,
      search: searchText,
      completeData: true,
    });
  }

  loadData = (contentLoader, isSearch) => {
    const { columns, searchText } = this.state;
    if (contentLoader) this.setState({ isLoadingNewData: true });
    this.props.requestBadges({
      start: isSearch ? 0 : page * rowsPerPage,
      length: rowsPerPage,
      order: columns[activeColumnSort].name.toLocaleLowerCase() + " " + order,
      search: searchText,
      completeData: true,
    });
  };

  handleOnEdit = (index) => {
    let badge = this.state.data[index];
    this.setState({
      badgeOnEdit: badge,
    });
  };

  handleCloseEdit = () => {
    this.setState({
      badgeOnEdit: undefined,
    });
    this.loadData(true);
  };

  handleOnDetails = (index) => {
    let badge = this.state.data[index];
    this.setState({
      badgeOnDetails: badge,
    });
  };

  handleOnDelete = () => {
    let indexs = this.state.indexsToDelete;
    const { data } = this.state;
    const { t } = this.props;
    let badgesToDelete = [];
    indexs.map((i) => {
      return badgesToDelete.push(data[i].id);
    });
    ApiHandler.AccessControl.Badges.deleteBadges(badgesToDelete)
      .then(() => {
        if (indexs.length === 1)
          SnackbarHandler.showMessage(t("successDeleteBadge"));
        else SnackbarHandler.showMessage(t("successDeleteBadges"));
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

  handleOpenDeleteConfirm = (indexs) => {
    this.setState({
      openDialogDeleteConfirm: true,
      indexsToDelete: indexs,
    });
  };

  handleCloseDeleteConfirm = () => {
    this.setState({
      openDialogDeleteConfirm: false,
    });
  };

  handleClose = () => {
    this.setState({ openDialogDeleteBadge: false });
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
    localStorage.setItem("badgesColumns", JSON.stringify(modifiedColumns));
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
  handleLicence = (entities, activity) => {
    const { currentUser } = this.props;
    return (
      Object.keys(currentUser.permits).filter((v) => {
        return (
          entities.includes(v.toString()) &&
          currentUser.permits[v].includes(parseInt(activity))
        );
      }).length > 0
    );
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

  render() {
    const {
      data,
      columns,
      isLoading,
      isLoadingNewData,
      dataCount,
      badgeOnEdit,
      badgeOnDetails,
      indexsToDelete,
    } = this.state;
    const { classes, t, theme } = this.props;
    const options = {
      selectableRowsOnClick: true,
      selectableRows: "multiple",
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
      onRowsSelect: (selectedRows, selected) => {
        if (selected.length === 0) this.setState({ hideSearch: false });
        else {
          this.setState({ hideSearch: true });
        }
      },
      customToolbarSelect: (selectedRows) => (
        <CustomToolbarSelect
          onEdit={
            this.handleLicence([Entities.BADGES.toString()], Activity.UPDATE) &&
            this.handleOnEdit
          }
          onDelete={
            this.handleLicence([Entities.BADGES.toString()], Activity.DELETE) &&
            this.handleOpenDeleteConfirm
          }
          permitsToDelete={this.handleLicence(
            [Entities.BADGES.toString()],
            Activity.DELETE
          )}
          permitsToEdit={this.handleLicence(
            [Entities.BADGES.toString()],
            Activity.UPDATE
          )}
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
      (<div style={{ marginTop: this.state.isDesktop ? "0%" : "4%" }}>
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
                    onClick={() => this.setState({ badgeOnDetails: undefined })}
                    size="large">
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
        </Grid>
        <MUIDataTable
          title={t("Badges")}
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
          open={!isNullOrUndefined(badgeOnEdit)}
          TransitionComponent={Transition}
          onClose={this.handleCloseEdit}
          maxWidth="md"
          fullWidth
          scroll="paper"
        >
          <BadgeForm
            isDialog
            updateParent={() => this.loadData(true)}
            isEdit
            onCreate={this.handleCloseEdit}
            initValues={badgeOnEdit}
          />
        </Dialog>
        <Dialog
          open={!isNullOrUndefined(badgeOnDetails)}
          TransitionComponent={Transition}
          onClose={() => this.setState({ badgeOnDetails: undefined })}
          maxWidth="md"
          fullWidth
          scroll="paper"
        >
          <BadgeForm
            isDialog
            updateParent={() => this.loadData(true)}
            isDetails
            onCreate={() => this.setState({ badgeOnDetails: undefined })}
            initValues={badgeOnDetails}
          />
        </Dialog>
        {/* <Dialog
          open={this.state.openDialogDeleteBadge}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{t("deleteBadge")}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {t("youSureDeleteBadge")}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              {t("cancel")}
            </Button>
            <Button
              onClick={this.handleOnDeleteConfirm}
              color="primary"
              autoFocus
            >
              {t("accept")}
            </Button>
          </DialogActions>
        </Dialog> */}
        <Dialog
          open={this.state.openDialogDeleteConfirm}
          onClose={this.handleCloseDeleteConfirm}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{t("deleteBadge")}</DialogTitle>
          <DialogContent>
            {!isNullOrUndefined(indexsToDelete) &&
              indexsToDelete.length === 1 && (
                <DialogContentText id="alert-dialog-description">
                  {t("youSureDeleteBadge")}
                </DialogContentText>
              )}
            {!isNullOrUndefined(indexsToDelete) &&
              indexsToDelete.length > 1 && (
                <DialogContentText id="alert-dialog-description">
                  {t("youSureDeleteBadges")}
                </DialogContentText>
              )}
          </DialogContent>
          <DialogActions>
            <Button
              onClick={this.handleCloseDeleteConfirm}
              color="primary"
              style={{ color: theme.palette.text.main }}
            >
              {t("cancel")}
            </Button>
            <Button onClick={this.handleOnDelete} color="primary" autoFocus>
              {t("accept")}
            </Button>
          </DialogActions>
        </Dialog>
      </div>)
    );
  }
}

Badges.propTypes = {
  classes: PropTypes.object.isRequired,
};

const BadgesConnected = connect(mapStateToProps, mapDispatchToPrps)(Badges);

export default withTranslation()(
  withStyles(styles, { withTheme: true })(BadgesConnected)
);
