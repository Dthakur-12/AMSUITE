import React, { Component } from "react";
import TableSkeletonLoader from "../../../Shared/TableSkeletonLoader";
import PropTypes from "prop-types";
import { withStyles } from '@mui/styles';
import MUIDataTable from "mui-datatables";
import CircularProgress from "@mui/material/CircularProgress";
import LinearProgress from "@mui/material/LinearProgress";

import NavBarEasyAccess from "../../utils/NavBarEasyAccess";
import CustomToolbarSelect from "../../../Shared/DataTable/CustomToolBarSelect";

import Fade from "@mui/material/Fade";
import { Slide, Dialog } from "@mui/material";
import { isNullOrUndefined } from "util";
import EnterpriseForm from "./NewEnterprise";
import EnterpriseDetails from "./DetailsEnterprise";

import Button from "@mui/material/Button";

import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import SnackbarHandler from "../../../../utils/SnackbarHandler";
import { Entities, Activity } from "../../../../utils/Enums";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import {
  requestEnterprises,
  requestEnterprisesById,
  requestDeleteEnterprises,
} from "../../../../actions/EasyAccess/Enterprise_actions";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import { Icon } from "semantic-ui-react";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { debounce } from "throttle-debounce";
import TablePagination from "@mui/material/TablePagination";

import styles from "../../../../assets/styles/EasyAccess_styles/Enterprise_styles/enterpriseStyles";
const mapStateToProps = ({ User, Enterprise }) => {
  return {
    currentUser: User.currentUser,
    enterprises: Enterprise.enterprises,
    successEnterprise: Enterprise.successEnterprise,
    newData: Enterprise.newData,
    enterpriseById: Enterprise.enterpriseById,
    successEnterpriseByID: Enterprise.successEnterpriseByID,
    successDeleteEnterprise: Enterprise.successDeleteEnterprise,
  };
};
const mapDispatchToProps = {
  requestEnterprises: requestEnterprises,
  requestEnterprisesById: requestEnterprisesById,
  requestDeleteEnterprises: requestDeleteEnterprises,
};

function Transition(props) {
  return <Slide direction="down" {...props} />;
}

let activeColumnSort = 0;
let order = "asc";

class Enterprise extends Component {
  constructor(props) {
    super(props);
    const { t } = props;
    this.state = {
      isLoading: true,
      isLoadingNewData: false,
      isSearching: false,
      openDialogEditEnterprise: true,
      indexsToDelete: undefined,
      openDialogDeleteConfirm: false,
      columns: this.translateColumns(t, true),
      thereAreRowSelected: false,
      page: 0,
      rowsPerPage: 10,
    };
    this.changeSearchDebounce = debounce(300, (value) =>
      this.changeSearch(value)
    );
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.i18n.language !== prevState.language ||
      nextProps.enterprises !== prevState.enterprises ||
      nextProps.successEnterprise !== prevState.successEnterprise ||
      nextProps.newData !== prevState.newData ||
      nextProps.successEnterpriseByID !== prevState.successEnterpriseByID ||
      nextProps.successDeleteEnterprise !== prevState.successDeleteEnterprise
    ) {
      return {
        language: nextProps.i18n.language,
        successEnterprise: nextProps.successEnterprise,
        enterprises: nextProps.enterprises,
        newData: nextProps.newData,
        successEnterpriseByID: nextProps.successEnterpriseByID,
        successDeleteEnterprise: nextProps.successDeleteEnterprise,
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
    if (
      this.state.successEnterprise &&
      this.state.successEnterprise !== prevState.successEnterprise
    ) {
      this.setState({
        data: this.state.enterprises.data,
        dataCount: this.state.enterprises.dataCount,
        isLoadingNewData: false,
        isLoading: false,
        isSearching: this.state.searchText !== prevState.searchText,
        hideSearch: false,
      });
      if (this.state.searchText !== prevState.searchText) this.loadData(false);
    }
    if (this.state.newData && this.state.newData !== prevState.newData) {
      this.loadData(true);
    }
    if (
      this.state.successEnterpriseByID &&
      this.state.successEnterpriseByID !== prevState.successEnterpriseByID
    ) {
      if (this.state.isDetails) {
        this.setState({
          enterpriseOnDetails: this.props.enterpriseById,
          isDetails: false,
        });
      } else {
        this.setState({
          enterpriseOnEdit: this.props.enterpriseById,
        });
      }
    }
    if (
      this.state.successDeleteEnterprise &&
      this.state.successDeleteEnterprise !== prevState.successDeleteEnterprise
    ) {
      const { t } = this.props;
      SnackbarHandler.showMessage(
        this.state.ind.length === 1
          ? t("SuccessDeleteEnterprise")
          : t("SuccessDeleteEnterprises")
      );
      this.setState({
        openDialogDeleteConfirm: false,
        indexsToDelete: undefined,
      });
    }
  }

  translateColumns = (t, initial) => {
    const isDesktop = window.innerWidth > 900;
    let colStorage = JSON.parse(localStorage.getItem("enterpriseColumnsEA"));

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
        label: t("RUT"),
        name: "rut",
        options: {
          display: !isDesktop
            ? false
            : isNullOrUndefined(columDisplay.rut)
            ? true
            : columDisplay.rut,
          filter: true,
          sort: true,
          sortDirection: activeColumnSort === 1 ? order : "none",
        },
      },
      {
        label: t("address"),
        name: "address",
        options: {
          display: !isDesktop
            ? false
            : isNullOrUndefined(columDisplay.address)
            ? true
            : columDisplay.address,
          filter: true,
          sort: true,
          sortDirection: activeColumnSort === 2 ? order : "none",
        },
      },
      {
        label: t("Phone"),
        name: "phone",
        options: {
          display: !isDesktop
            ? false
            : isNullOrUndefined(columDisplay.phone)
            ? true
            : columDisplay.phone,
          filter: true,
          sort: true,
          sortDirection: activeColumnSort === 3 ? order : "none",
        },
      },
      {
        label: t("email"),
        name: "email",
        options: {
          filter: true,
          sort: true,
          sortDirection: activeColumnSort === 4 ? order : "none",
          display: isNullOrUndefined(columDisplay.email)
            ? true
            : columDisplay.email,
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
    const { isReport } = this.props;
    !isReport && NavBarEasyAccess.hideLoader();
    this.updateScreenMode();
    this.loadData(true);
  }

  loadData = (contentLoader, isSearch, page = 0, rowsPerPage = 10) => {
    const { columns, searchText = "" } = this.state;
    if (contentLoader) this.setState({ isLoadingNewData: true });
    this.props.requestEnterprises({
      start: isSearch ? 0 : page * rowsPerPage,
      length: rowsPerPage,
      order: columns[activeColumnSort].name + " " + order,
      search: searchText,
    });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
    this.loadData(true, false, page, this.state.rowsPerPage);
  };

  handleChangeRowsPerPage = (e) => {
    const value = Number(e.currentTarget.dataset.value);
    if (value !== this.state.rowsPerPage) {
      this.setState({ rowsPerPage: value, page: 0 });
      this.loadData(true, false, 0, value);
    }
  };
  handleOnEdit = (index) => {
    let enterprise = this.state.data[index];

    this.setState({
      enterpriseOnEdit: enterprise,
    });
  };

  handleOnDetails = (index) => {
    let enterprise = this.state.data[index];
    this.setState({ isDetails: true });
    this.props.requestEnterprisesById(enterprise.id);
  };

  handleOnDelete = () => {
    let indexs = this.state.indexsToDelete;
    const { data } = this.state;

    let enterprisesToDelete = [];
    indexs.map((i) => enterprisesToDelete.push(data[i].id));
    this.setState({ ind: indexs });
    this.props.requestDeleteEnterprises(enterprisesToDelete);
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

  // changePage = (newPage) => {
  //   page = newPage;
  //   this.loadData(true);
  // };

  // changeRowsPerPage = (newRowsPerPage) => {
  //   rowsPerPage = newRowsPerPage;
  //   this.loadData(true);
  // };

  changeSort = (activeColumnIndex, newOrder) => {
    const { columns, page, rowsPerPage } = this.state;
    let columnsSorted = columns.slice();
    columnsSorted.map((column) => (column.options.sortDirection = undefined));
    columnsSorted[activeColumnIndex].options.sortDirection = newOrder;
    this.setState({
      columns: columnsSorted,
    });
    activeColumnSort = activeColumnIndex;
    order = newOrder;
    this.loadData(true, false, page, rowsPerPage);
  };

  // changeSearch = searchText => {
  //   const { isSearching } = this.state;
  //   this.setState({
  //     searchText,
  //     isSearching: true
  //   });
  //   if (!isSearching) {
  //     this.loadData(false);
  //   }
  // };
  changeSearch = (value) => {
    this.setState({
      isSearching: true,
    });

    this.loadData(true, true, this.state.page, this.state.rowsPerPage);
  };
  onChangeSearch = (text) => {
    //  let value = event.currentTarget ? event.currentTarget.value : event.value;
    let value = text ? text : "";
    this.setState({
      searchText: value,
    });
    this.changeSearchDebounce(value);
  };

  filterChange = (filterList) => {};

  columnViewChange = (newColumns) => {
    console.log("newColumns: ", newColumns);
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
      "enterpriseColumnsEA",
      JSON.stringify(modifiedColumns)
    );
  };

  onTableChange = (action, tableState) => {
    switch (action) {
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
      isDesktop,
      isLoading,
      isLoadingNewData,
      dataCount,
      enterpriseOnEdit,
      enterpriseOnDetails,
      indexsToDelete,
      thereAreRowSelected,
      page,
      rowsPerPage,
    } = this.state;
    const { classes, t, theme, isReport } = this.props;
    const options = {
      filterType: "dropdown",
      responsive: "scrollFullHeight",
      selectableRowsOnClick: isReport ? false : true,
      selectableRows: isReport ? "none" : "",
      serverSide: true,
      pagination: false,
      count: dataCount,
      //onRowClick: this.onRowClicked,
      search: isReport ? false : true,
      searchText: this.state.searchText,
      download: false,
      filter: false,
      print: isReport ? false : isDesktop,
      viewColumns: isDesktop,
      onRowsSelect: (selectedRows, selected) => {
        this.setState({
          thereAreRowSelected: selected.length > 0,
        });
      },
      customToolbarSelect: (selectedRows) => (
        <CustomToolbarSelect
          onEdit={
            isReport
              ? undefined
              : this.handleLicence(
                  [Entities.COMPANIES.toString()],
                  Activity.UPDATE
                ) && this.handleOnEdit
          }
          selectedRows={selectedRows}
          onDetails={isReport ? undefined : this.handleOnDetails}
          onDelete={
            isReport
              ? undefined
              : this.handleLicence(
                  [Entities.COMPANIES.toString()],
                  Activity.DELETE
                ) && this.handleOpenDeleteConfirm
          }
          permitsToDelete={
            isReport
              ? undefined
              : this.handleLicence(
                  [Entities.COMPANIES.toString()],
                  Activity.DELETE
                )
          }
          permitsToEdit={
            isReport
              ? undefined
              : this.handleLicence(
                  [Entities.COMPANIES.toString()],
                  Activity.UPDATE
                )
          }
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
        {" "}
        <MUIDataTable
          title={t("enterprises")}
          data={data}
          columns={columns}
          options={options}
          className={classes.dataTable}
        />
        {!thereAreRowSelected && (
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
            onPageChange={this.handleChangePage}
            onRowsPerPageChange={this.handleChangeRowsPerPage}
            className={classes.customPagination}
          />
        )}
        <Fade in={isLoadingNewData} className={classes.contentLoader}>
          <div style={{ pointerEvents: isLoadingNewData ? "inherit" : "none" }}>
            <CircularProgress className={classes.circularProgress} size={50} />
          </div>
        </Fade>
        <Dialog
          open={!isNullOrUndefined(enterpriseOnEdit)}
          TransitionComponent={Transition}
          onClose={() => this.setState({ enterpriseOnEdit: undefined })}
          maxWidth="sm"
          fullWidth
          scroll="paper"
        >
          <EnterpriseForm
            isDialog
            isEdit
            onCreate={() => this.setState({ enterpriseOnEdit: undefined })}
            initValues={enterpriseOnEdit}
          />
        </Dialog>
        <Dialog
          open={!isNullOrUndefined(enterpriseOnDetails)}
          TransitionComponent={Transition}
          onClose={() => this.setState({ enterpriseOnDetails: undefined })}
          maxWidth="sm"
          fullWidth
          scroll="paper"
        >
          <EnterpriseDetails
            isDialog
            isEdit
            onCreate={() => this.setState({ enterpriseOnDetails: undefined })}
            enterprise={enterpriseOnDetails}
          />
        </Dialog>
        <Dialog
          open={this.state.openDialogDeleteConfirm}
          onClose={this.handleCloseDeleteConfirm}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {t("DeleteCompany")}
          </DialogTitle>
          <DialogContent>
            {!isNullOrUndefined(indexsToDelete) && (
              <DialogContentText id="alert-dialog-description">
                {`${
                  indexsToDelete.length === 1
                    ? t("youSureDeleteEnterprise")
                    : t("youSureDeleteEnterprises")
                }`}
              </DialogContentText>
            )}
          </DialogContent>
          <DialogActions>
            <Button
              onClick={this.handleCloseDeleteConfirm}
              style={{ color: theme.palette.text.main }}>
              {t("cancel")}
            </Button>
            <Button
              onClick={this.handleOnDelete}
              className={classes.defaultButton}
              variant="contained"
              color="primary"
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

Enterprise.propTypes = {
  classes: PropTypes.object.isRequired,
};

const EnterpriseConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(Enterprise);

export default withTranslation()(
  withStyles(styles, { withTheme: true })(EnterpriseConnected)
);
