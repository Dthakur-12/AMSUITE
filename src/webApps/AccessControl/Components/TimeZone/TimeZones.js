import React, { Component } from "react";
import TableSkeletonLoader from "../../../Shared/TableSkeletonLoader";
import PropTypes from "prop-types";
import { withStyles } from '@mui/styles';
import MUIDataTable from "mui-datatables";
import CircularProgress from "@mui/material/CircularProgress";
import LinearProgress from "@mui/material/LinearProgress";
import ApiHandler from "../../../../services/ApiHandler";
import CustomToolbarSelect from "../../../Shared/DataTable/CustomToolBarSelect";
import {
  Slide,
  Dialog,
  DialogActions,
  DialogContentText,
  Button,
} from "@mui/material";
import { isNullOrUndefined } from "util";

import SnackbarHandler from "../../../../utils/SnackbarHandler";
import TimeZoneForm from "./NewTimeZone";
import DialogTitle from "@mui/material/DialogTitle";
import NavBarAccessControl from "../../utils/NavBarAccessControl";
import { Entities, Activity } from "../../../../utils/Enums";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import styles from "../../../../assets/styles/AccessControl_styles/TimeZone_styles/timeZoneStyles";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import Grid from "@mui/material/Grid";
import { Icon } from "semantic-ui-react";
import IconButton from "@mui/material/IconButton";
import { formValueSelector } from "redux-form";
import { debounce } from "throttle-debounce";

const mapStateToProps = ({ User }) => {
  return {
    currentUser: User.currentUser,
  };
};

function Transition(props) {
  return <Slide direction="down" {...props} />;
}

let page = 0;
let rowsPerPage = 10;
let activeColumnSort = 0;
let order = "asc";

class TimeZones extends Component {
  constructor(props) {
    super(props);
    const { t } = props;
    this.state = {
      isLoading: true,
      isLoadingNewData: false,
      isSearching: false,
      openDialogConfirmDelete: false,
      columns: this.translateColumns(t, true),
    };

    this.changeSearchDebounce = debounce(300, (value) =>
      this.changeSearch(value)
    );
  }

  changeSearch = (value) => {
    this.setState({
      isSearching: true,
    });

    this.loadData(false, true);
  };
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.i18n.language !== prevState.language) {
      return {
        language: nextProps.i18n.language,
      };
    } else return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.language !== this.state.language) {
      this.setState({
        ...prevState,
        columns: this.translateColumns(this.props.t, false),
      });
    }
  }

  translateColumns = (t, initial) => {
    let colStorage = JSON.parse(localStorage.getItem("timeZoneColumns"));

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
        label: t("Days"),
        name: "days",
        options: {
          filter: false,
          sort: false,
          sortDirection: activeColumnSort === 1 ? order : "none",
          display: isNullOrUndefined(columDisplay.days)
            ? true
            : columDisplay.days,
        },
      },
    ];
  };

  onChangeSearch = (event) => {
    let value = event.currentTarget ? event.currentTarget.value : event.value;
    this.setState({
      searchText: value,
    });
    this.changeSearchDebounce(value);
  };

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateScreenMode);
  }

  updateScreenMode = () => {
    this.setState(
      { isDesktop: window.innerWidth > 900 },
      this.setState({
        columns: this.translateColumns(this.props.t, window.innerWidth > 900),
      })
    );
  };

  componentDidMount() {
    NavBarAccessControl.hideLoader();
    // connectSocket();
    this.updateScreenMode();
    window.addEventListener("resize", this.updateScreenMode);
    const { columns } = this.state;
    ApiHandler.AccessControl.TimeZones.getTimeZones({
      start: page * rowsPerPage,
      length: rowsPerPage,
      order: columns[activeColumnSort].name + " " + order,
      search: "",
    })
      .then((response) => {
        this.setState({
          data: response.data.data,
          dataCount: response.data.dataCount,
          isLoading: false,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  loadData = (contentLoader, isSearch) => {
    const { columns, searchText } = this.state;
    if (contentLoader) this.setState({ isLoadingNewData: true });
    ApiHandler.AccessControl.TimeZones.getTimeZones({
      start: isSearch ? 0 : page * rowsPerPage,
      length: rowsPerPage,
      order: columns[activeColumnSort].name + " " + order,
      search: searchText,
    }).then((response) => {
      const lastSearchText = this.state.searchText;
      this.setState({
        data: response.data.data,
        dataCount: response.data.dataCount,
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

  changeSearch = (searchText) => {
    const { isSearching } = this.state;
    this.setState({
      searchText,
      isSearching: true,
    });
    if (!isSearching) {
      this.loadData(false);
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

    localStorage.setItem("timeZoneColumns", JSON.stringify(modifiedColumns));
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

  handleOnDelete = (indexs) => {
    const { data } = this.state;
    let timeZonesToDelete = [];
    indexs.map((i) => {
      return timeZonesToDelete.push(data[i].id);
    });
    this.setState({
      timeZonesToDelete: timeZonesToDelete,
      openDialogConfirmDelete: true,
    });
  };

  handleConfirmDelete() {
    const { timeZonesToDelete } = this.state;
    const { t } = this.props;
    ApiHandler.AccessControl.TimeZones.deleteTimeZone(timeZonesToDelete)
      .then((response) => {
        this.setState({
          openDialogConfirmDelete: false,
          isSuccess: true,
        });
        this.loadData(true);
        SnackbarHandler.showMessage(t("successDeleteTimeZones"));
        setTimeout(() => {
          this.setState({
            isSuccess: false,
          });
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleOnEdit = (index) => {
    let timeZone = this.state.data[index];
    this.setState({
      timeZoneOnEdit: timeZone,
    });
  };

  handleOnDetails = (index) => {
    let timeZone = this.state.data[index];
    this.setState({
      timeZoneOnDetails: timeZone,
    });
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
  render() {
    const {
      data,
      columns,
      isLoading,
      isLoadingNewData,
      dataCount,
      timeZoneOnDetails,
      timeZoneOnEdit,
      openDialogConfirmDelete,
    } = this.state;
    const { classes, t } = this.props;
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
      customToolbarSelect: (selectedRows) => (
        <CustomToolbarSelect
          selectedRows={selectedRows}
          onDetails={this.handleOnDetails}
          onEdit={
            this.handleLicence(
              [Entities.TIME_ZONES.toString()],
              Activity.UPDATE
            ) && this.handleOnEdit
          }
          onDelete={
            this.handleLicence(
              [Entities.TIME_ZONES.toString()],
              Activity.DELETE
            ) && this.handleOnDelete
          }
          permitsToDelete={this.handleLicence(
            [Entities.TIME_ZONES.toString()],
            Activity.DELETE
          )}
          permitsToEdit={this.handleLicence(
            [Entities.TIME_ZONES.toString()],
            Activity.UPDATE
          )}
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
                    onClick={() =>
                      this.setState({ registerOnDetails: undefined })
                    }
                    size="large">
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
        </Grid>
        <MUIDataTable
          title={t("TimeZones")}
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
          open={!isNullOrUndefined(timeZoneOnDetails)}
          TransitionComponent={Transition}
          onClose={() => this.setState({ timeZoneOnDetails: undefined })}
          maxWidth="md"
          fullWidth
          scroll="paper"
        >
          <TimeZoneForm
            isDialog
            onCreate={() => this.setState({ timeZoneOnDetails: undefined })}
            initValues={timeZoneOnDetails}
            isDetails
          />
        </Dialog>
        <Dialog
          open={!isNullOrUndefined(timeZoneOnEdit)}
          TransitionComponent={Transition}
          onClose={() => this.setState({ timeZoneOnEdit: undefined })}
          maxWidth="md"
          fullWidth
          scroll="paper"
        >
          <TimeZoneForm
            isDialog
            updateParent={() => this.loadData(true)}
            onCreate={() => this.setState({ timeZoneOnEdit: undefined })}
            initValues={timeZoneOnEdit}
            isEdit
          />
        </Dialog>
        <Dialog
          open={openDialogConfirmDelete}
          onClose={() => this.setState({ openDialogProtectedData: false })}
          className={classes.confirmDialog}
        >
          <DialogTitle>{t("DeleteTimeZones")}</DialogTitle>

          <DialogContentText
            className={classes.confirmDialog}
            style={{ display: "flex", justifyContent: "center" }}
          >
            {t("youSureDeleteTimeZones")}
          </DialogContentText>
          <DialogActions>
            <Button
              onClick={() =>
                this.setState({
                  openDialogConfirmDelete: false,
                  timeZonesToDelete: {},
                })
              }>
              {t("cancel")}
            </Button>
            <Button onClick={() => this.handleConfirmDelete()}>
              {t("accept")}
            </Button>
          </DialogActions>
        </Dialog>
      </div>)
    );
  }
}

TimeZones.propTypes = {
  classes: PropTypes.object.isRequired,
};

const TimeZonesConnected = connect(mapStateToProps, null)(TimeZones);

export default withTranslation()(withStyles(styles)(TimeZonesConnected));
