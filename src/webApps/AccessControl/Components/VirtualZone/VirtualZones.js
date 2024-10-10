import React, { Component } from "react";
import NavBarAccessControl from "../../utils/NavBarAccessControl";
import TableSkeletonLoader from "../../../Shared/TableSkeletonLoader";
import PropTypes from "prop-types";
import { withStyles } from '@mui/styles';
import MUIDataTable from "mui-datatables";
import CircularProgress from "@mui/material/CircularProgress";
import LinearProgress from "@mui/material/LinearProgress";
import VirtualZoneForm from "./NewVirtualZone2";
//import VirtualZoneForm from "./NewVirtualZone";
import SnackbarHandler from "../../../../utils/SnackbarHandler";
import CustomToolbarSelect from "../../../Shared/DataTable/CustomToolBarSelect";
import Fade from "@mui/material/Fade";
import { isNullOrUndefined } from "util";
import { Slide, Dialog } from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import Grid from "@mui/material/Grid";
import { Icon } from "semantic-ui-react";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import { Entities, Activity } from "../../../../utils/Enums";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import {
  requestVirtualZone,
  deleteVirtualZone,
} from "../../../../actions/AccessControl/virtualZone_actions";
import styles from "../../../../assets/styles/AccessControl_styles/VirtualZone_Styles/virtualZonesStyles";
import { debounce } from "throttle-debounce";

function Transition(props) {
  return <Slide direction="down" {...props} />;
}

let page = 0;
let rowsPerPage = 10;
let activeColumnSort = 0;
let order = "asc";

class VirtualZones extends Component {
  constructor(props) {
    super(props);
    const { t } = props;
    this.state = {
      isLoading: true,
      isLoadingNewData: false,
      isSearching: false,
      openDialogDeleteConfirm: false,
      indexsToDelete: undefined,
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
    const {
      editSuccess,
      deleteSuccess,
      loading,
      successVirtualzone,
      virtualZones,
    } = nextProps;
    if (
      nextProps.i18n.language !== prevState.language ||
      editSuccess !== prevState.editSuccess ||
      loading !== prevState.loading ||
      deleteSuccess !== prevState.deleteSuccess ||
      successVirtualzone !== prevState.successVirtualzone ||
      virtualZones !== prevState.virtualZones
    ) {
      return {
        language: nextProps.i18n.language,
        editSuccess,
        loading,
        deleteSuccess,
        successVirtualzone,
        virtualZones,
      };
    } else return null;
  }

  componentDidUpdate(prevProps, prevState) {
    const { t, requestVirtualZone } = this.props;
    if (
      this.state.successVirtualzone &&
      prevState.successVirtualzone !== this.state.successVirtualzone
    ) {
      this.setState({
        isLoadingNewData: false,
        isLoading: false,
        isSearching: prevState.searchText !== this.state.searchText,
        data: this.state.virtualZones,
      });
      if (this.state.searchText !== prevState.searchText) this.loadData(true);
    }
    if (prevState.language !== this.state.language) {
      this.setState({
        ...prevState,
        columns: this.translateColumns(this.props.t, false),
      });
    }
    if (
      this.state.editSuccess &&
      prevState.editSuccess !== this.state.editSuccess
    ) {
      this.setState({ virtualZoneOnEdit: undefined });
      SnackbarHandler.showMessage(t("successEditVirtualZone"));

      this.loadData(true);
    }
    if (
      this.state.deleteSuccess &&
      prevState.deleteSuccess !== this.state.deleteSuccess
    ) {
      if (this.state.indexsToDelete.length === 1)
        SnackbarHandler.showMessage(t("successDeleteVirtualZone"));
      else SnackbarHandler.showMessage(t("successDeleteVirtualZones"));
      this.loadData(true);
      this.setState({
        openDialogDeleteConfirm: false,
        indexsToDelete: undefined,
      });
    }
  }

  translateColumns = (t, initial) => {
    let colStorage = JSON.parse(localStorage.getItem("virtualZoneColumns"));

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
        label: t("mode"),
        name: "modeName",
        options: {
          filter: true,
          sort: true,
          sortDirection: activeColumnSort === 1 ? order : "none",
          display: isNullOrUndefined(columDisplay.modeName)
            ? true
            : columDisplay.modeName,
        },
      },
      {
        label: t("countDoor"),
        name: "gatesNumber",
        options: {
          filter: true,
          sort: true,
          sortDirection: activeColumnSort === 2 ? order : "none",
          display: isNullOrUndefined(columDisplay.gatesNumber)
            ? true
            : columDisplay.gatesNumber,
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
    const { columns, isNotNecessaryReload } = this.state;
    const { requestVirtualZone } = this.props;
    if (!isNotNecessaryReload) {
      this.setState({ isNotNecessaryReload: true });
      requestVirtualZone({
        start: page * rowsPerPage,
        length: rowsPerPage,
        order: columns[activeColumnSort].name + " " + order,
        search: "",
      });
    }
  }

  loadData = (contentLoader, isSearch) => {
    const { columns, searchText = "" } = this.state;
    if (contentLoader) this.setState({ isLoadingNewData: true });

    this.props.requestVirtualZone({
      start: isSearch ? 0 : page * rowsPerPage,
      length: rowsPerPage,
      order: columns[activeColumnSort].name + " " + order,
      search: searchText,
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

    this.loadData(false);
  };

  filterChange = (filterList) => {};

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
    localStorage.setItem("virtualZoneColumns", JSON.stringify(modifiedColumns));
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
        //    this.changeSearch(tableState.searchText);
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

  handleOnEdit = (index) => {
    const virtualZone = this.state.virtualZones[index];
    this.setState({
      virtualZoneOnEdit: virtualZone,
      isEdit: true,
    });
  };

  handleOnDelete = () => {
    var indexs = this.state.indexsToDelete;
    const { deleteVirtualZone } = this.props;
    const data = this.state.virtualZones;
    var virtualZonesToDelete = [];
    indexs.map((i) => virtualZonesToDelete.push(data[i].id));
    deleteVirtualZone(virtualZonesToDelete);
  };

  handleOnDetails = (index) => {
    const virtualZone = this.state.virtualZones[index];
    this.setState({
      virtualZoneOnDetails: virtualZone,
      isDetails: true,
    });
  };

  handleCloseEdit = () => {
    this.setState({
      virtualZoneOnEdit: undefined,
    });
    // this.loadData(true);
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
      columns,
      isLoadingNewData,
      virtualZoneOnEdit,
      virtualZoneOnDetails,
      indexsToDelete,
      isLoading,
      data,
    } = this.state;
    const { classes, t, dataCount } = this.props;
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
          onDelete={
            this.handleLicence(
              [Entities.VIRTUAL_ZONES.toString()],
              Activity.DELETE
            ) && this.handleOpenDeleteConfirm
          }
          onEdit={
            this.handleLicence(
              [Entities.VIRTUAL_ZONES.toString()],
              Activity.UPDATE
            ) && this.handleOnEdit
          }
          permitsToDelete={this.handleLicence(
            [Entities.VIRTUAL_ZONES.toString()],
            Activity.DELETE
          )}
          permitsToEdit={this.handleLicence(
            [Entities.VIRTUAL_ZONES.toString()],
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
          title={t("VirtualZone")}
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
          open={!isNullOrUndefined(virtualZoneOnEdit)}
          TransitionComponent={Transition}
          //onClose={this.handleCloseEdit}
          maxWidth="md"
          fullWidth
          scroll="paper"
        >
          <VirtualZoneForm
            isDialog
            isEdit
            updateParent={() => this.loadData(true)}
            onCreate={this.handleCloseEdit}
            onClose={this.handleCloseEdit}
            initValues={virtualZoneOnEdit}
          />
        </Dialog>
        <Dialog
          open={!isNullOrUndefined(virtualZoneOnDetails)}
          TransitionComponent={Transition}
          onClose={() => this.setState({ virtualZoneOnDetails: undefined })}
          maxWidth="md"
          fullWidth
          scroll="paper"
        >
          <VirtualZoneForm
            isDialog
            onCreate={() => this.setState({ virtualZoneOnDetails: undefined })}
            initValues={virtualZoneOnDetails}
            isDetails
          />
        </Dialog>
        <Dialog
          open={this.state.openDialogDeleteConfirm}
          onClose={this.handleCloseDeleteConfirm}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {t("deleteVirtualZone")}
          </DialogTitle>
          <DialogContent>
            {!isNullOrUndefined(indexsToDelete) &&
              indexsToDelete.length === 1 && (
                <DialogContentText id="alert-dialog-description">
                  {t("youSuredeleteVirtualZone")}
                </DialogContentText>
              )}
            {!isNullOrUndefined(indexsToDelete) &&
              indexsToDelete.length > 1 && (
                <DialogContentText id="alert-dialog-description">
                  {t("youSuredeleteVirtualZones")}
                </DialogContentText>
              )}
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseDeleteConfirm} color="primary">
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

VirtualZones.propTypes = {
  classes: PropTypes.object.isRequired,
};
const mapStateToProps = ({ User, VirtualZone }) => {
  return {
    currentUser: User.currentUser,
    virtualZones: VirtualZone.virtualZones,
    dataCount: VirtualZone.virtualZoneCount,
    loading: VirtualZone.loading,
    editSuccess: VirtualZone.editSuccess,
    deleteSuccess: VirtualZone.deleteSuccess,
    successVirtualzone: VirtualZone.successVirtualzone,
  };
};
const mapDispatchToProps = {
  requestVirtualZone: requestVirtualZone,
  deleteVirtualZone: deleteVirtualZone,
};
const VirtualZonesConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(VirtualZones);

export default withTranslation()(withStyles(styles)(VirtualZonesConnected));
