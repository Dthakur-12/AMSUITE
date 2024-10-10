import React, { Component } from "react";
import NavBarEasyAccess from "../../utils/NavBarEasyAccess";
import TableSkeletonLoader from "../../../Shared/TableSkeletonLoader";
import PropTypes from "prop-types";
import { withStyles } from '@mui/styles';
import MUIDataTable from "mui-datatables";
import CircularProgress from "@mui/material/CircularProgress";
import ApiHandler from "../../../../services/ApiHandler";
import LinearProgress from "@mui/material/LinearProgress";
import VehicleForm from "../Register/NewVehicle";
import Fade from "@mui/material/Fade";
import { Slide, Dialog } from "@mui/material";
import { isNullOrUndefined } from "util";
import CustomToolbarSelect from "../../../Shared/DataTable/CustomToolBarSelect";
import Chip from "@mui/material/Chip";

import Button from "@mui/material/Button";

import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import SnackbarHandler from "../../../../utils/SnackbarHandler";
import { withTranslation } from "react-i18next";
import styles from "../../../../assets/styles/EasyAccess_styles/Vehicle_style";

function Transition(props) {
  return <Slide direction="down" {...props} />;
}

let page = 0;
let rowsPerPage = 10;
let activeColumnSort = 0;
let order = "asc";

class Vehicles extends Component {
  constructor(props) {
    super(props);
    const { classes, t } = props;
    this.state = {
      isLoading: true,
      isLoadingNewData: false,
      isSearching: false,
      vehicleOnEdit: undefined,
      vehicleOnDetails: undefined,
      openDialogDeleteConfirm: false,
      openDialogEditVehicle: true,
      indexsToDelete: undefined,
      openDialogDeleteVehicle: false,
      columns: this.translateColumns(t),
    };
  }

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
        columns: this.translateColumns(this.props.t),
      });
    }
  }

  translateColumns = (t) => {
    const { classes } = this.props;
    return [
      {
        name: t("Plate"),
        field: "plate",
        options: {
          filter: true,
          sort: true,
          sortDirection: activeColumnSort === 0 ? order : "none",
          customBodyRender: (data) => {
            if (!isNullOrUndefined(data.plate)) {
              return data.plate;
            } else {
              return <Chip label={t("notAdmitted")} className={classes.chip} />;
            }
          },
        },
      },
      {
        name: t("enterprise"),
        field: "enterprise",
        options: {
          filter: true,
          sort: true,
          sortDirection: activeColumnSort === 0 ? order : "none",
          customBodyRender: (data) => {
            if (!isNullOrUndefined(data.enterprise)) {
              return data.enterprise;
            } else {
              return <Chip label={t("notAdmitted")} className={classes.chip} />;
            }
          },
        },
      },
      {
        name: t("status"),
        field: "status",
        options: {
          filter: true,
          sort: true,
          sortDirection: activeColumnSort === 0 ? order : "none",
        },
      },
    ];
  };

  componentDidMount() {
    NavBarEasyAccess.hideLoader();
    const { columns } = this.state;
    ApiHandler.EasyAccess.Vehicles.getVehicles(
      page * rowsPerPage,
      rowsPerPage,
      columns[activeColumnSort].field + " " + order,
      ""
    )
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
    ApiHandler.EasyAccess.Vehicles.getVehicles(
      isSearch ? 0 : page * rowsPerPage,
      rowsPerPage,
      columns[activeColumnSort].field + " " + order,
      searchText
    ).then((response) => {
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

  handleOnEdit = (index) => {
    let vehicle = this.state.data[index];
    this.setState({
      vehicleOnEdit: vehicle,
    });
  };

  handleCloseEdit = () => {
    this.setState({
      vehicleOnEdit: undefined,
    });
    this.loadData(true);
  };

  handleOnDetails = (index) => {
    let vehicle = this.state.data[index];
    this.setState({
      vehicleOnDetails: vehicle,
    });
  };

  handleOnDelete = () => {
    let indexs = this.state.indexsToDelete;
    const { data } = this.state;
    const { t } = this.props;
    let vehiclesToDelete = [];
    indexs.map((i) => vehiclesToDelete.push(data[i].id));
    ApiHandler.AccessControl.Vehicles.deleteVehicles(vehiclesToDelete)
      .then((response) => {
        if (indexs.length === 1)
          SnackbarHandler.showMessage(t("SuccessDeleteVehicle"));
        else SnackbarHandler.showMessage(t("SuccessDeleteVehicles"));
        this.setState({
          openDialogDeleteConfirm: false,
          indexsToDelete: undefined,
        });
        this.loadData(true);
      })
      .catch((err) => {
        console.log(err);
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
    this.setState({ openDialogDeleteVehicle: false });
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
            newColumn.field === column.field && newColumn.display === "true"
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

  render() {
    const {
      data,
      columns,
      isLoading,
      isLoadingNewData,
      dataCount,
      vehicleOnEdit,
      vehicleOnDetails,
      indexsToDelete,
    } = this.state;
    const { classes, t } = this.props;
    const options = {
      filter: true,
      filterType: "dropdown",
      responsive: "scroll",
      serverSide: true,
      rowsPerPage: rowsPerPage,
      count: dataCount,
      page: page,
      customToolbarSelect: (selectedRows) => (
        <CustomToolbarSelect
          onEdit={this.handleOnEdit}
          onDelete={this.handleOpenDeleteConfirm}
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
      <div>
        <MUIDataTable
          title={t("vehicles")}
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
          open={!isNullOrUndefined(vehicleOnEdit)}
          TransitionComponent={Transition}
          onClose={this.handleCloseEdit}
          maxWidth="md"
          fullWidth
          scroll="paper"
        >
          <VehicleForm
            isDialog
            updateParent={() => this.loadData(true)}
            isEdit
            onCreate={this.handleCloseEdit}
            initValues={vehicleOnEdit}
          />
        </Dialog>
        <Dialog
          open={!isNullOrUndefined(vehicleOnDetails)}
          TransitionComponent={Transition}
          onClose={() => this.setState({ vehicleOnDetails: undefined })}
          maxWidth="md"
          fullWidth
          scroll="paper"
        >
          <VehicleForm
            isDialog
            updateParent={() => this.loadData(true)}
            isDetails
            onCreate={() => this.setState({ vehicleOnDetails: undefined })}
            initValues={vehicleOnDetails}
          />
        </Dialog>
        <Dialog
          open={this.state.openDialogDeleteConfirm}
          onClose={this.handleCloseDeleteConfirm}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {t("DeleteVehicle")}
          </DialogTitle>
          <DialogContent>
            {!isNullOrUndefined(indexsToDelete) &&
              indexsToDelete.length === 1 && (
                <DialogContentText id="alert-dialog-description">
                  {t("youSureDeleteVehicle")}
                </DialogContentText>
              )}
            {!isNullOrUndefined(indexsToDelete) &&
              indexsToDelete.length > 1 && (
                <DialogContentText id="alert-dialog-description">
                  {t("youSureDeleteVehicles")}
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
      </div>
    );
  }
}

Vehicles.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withTranslation()(withStyles(styles)(Vehicles));
