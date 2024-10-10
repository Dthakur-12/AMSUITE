import React from "react";
import PropTypes from "prop-types";
import TableSkeletonLoader from "../../Shared/TableSkeletonLoader";
import { withStyles } from '@mui/styles';
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import CloseIcon from "@mui/icons-material/Close";
import MoreVerIcon from "@mui/icons-material/MoreVertRounded";
import FormControl from "@mui/material/FormControl";
import Slide from "@mui/material/Slide";
import CheckedIcon from "@mui/icons-material/CheckRounded";
import { Icon } from "semantic-ui-react";
import Chip from "@mui/material/Chip";
import { connect } from "react-redux";
import MUIDataTable from "mui-datatables";
import CircularProgress from "@mui/material/CircularProgress";
import LinearProgress from "@mui/material/LinearProgress";
import Fade from "@mui/material/Fade";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import { withTranslation } from "react-i18next";
import { debounce } from "throttle-debounce";
import { isNullOrUndefined } from "util";
import CustomStyles from "../../../assets/styles/Shared_Styles/DataTable/DataTableDialogActionStyles";

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

let page;
let rowsPerPage;
let activeColumnSort = 0;
let order = "asc";

class DataTableDialogActions extends React.Component {
  constructor(props) {
    super(props);
    const {
      open,
      title,
      subTitle,
      columns,
      multipleSelect,
      rowsSelected,
      enableCreate,
      createData,
      info, //info:  datos que se traen del reducer (data, datacount)
      extraData1,
      extraData2,
      //loading : del reducer de los datos que se quieren
      // success: el succes de los datos que se quieran traer
      // dontLoad: si se quiere hacer un control de no llamar a la api por ej si todavia no se selecciono algun dato...
      onlyOneRowSelected,
    } = props;
    this.state = {
      title,
      subTitle,
      data: info ? info.data : "",
      dataCount: info ? info.dataCout : "",
      searchText: "",
      // open: open,
      isLoadingNewData: false,
      isSearching: false,
      columns,
      multipleSelect: multipleSelect,
      onlyOneRowSelected: onlyOneRowSelected,
      rowsSelected,
      enableCreate,
      createData,
      extraData1,
      extraData2,
    };
    this.changeSearchDebounce = debounce(500, (value) =>
      this.changeSearch(value)
    );
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateScreenMode);
  }
  updateScreenMode = () => {
    this.setState({ isDesktop: window.innerWidth > 900 });
  };

  componentDidMount() {
    page = 0;
    rowsPerPage = 20;
    this.updateScreenMode();
    this.renderSelectedColumns(this.props.rowsSelected);
    window.addEventListener("resize", this.updateScreenMode);
    //this.renderSelectedColumns(this.props.rowsSelected);
    const { columns, extraData, extraData1, extraData2 } = this.state;
    console.log("columns: ", columns);
    console.log("columns[activeColumnSort]: ", columns[activeColumnSort]);
    const { extraObject } = this.props;
    if (!this.props.dontLoad) {
      this.props.loadDataAction({
        url: this.props.url,
        method: this.props.method,
        start: page * rowsPerPage,
        length: rowsPerPage,
        order: columns[activeColumnSort].field + " " + order,
        search: "",
        extraData: extraData,
        extraData1: extraData1,
        extraData2: extraData2,
        ...extraObject,
      });
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.loading !== prevState.loading ||
      nextProps.open !== prevState.open ||
      nextProps.documentTypeId !== prevState.documentTypeId ||
      nextProps.success !== prevState.success ||
      nextProps.info !== prevState.info ||
      nextProps.extraData !== prevState.extraData
    ) {
      return {
        extraData: nextProps.extraData,
        success: nextProps.success,
        loading: nextProps.loading,
        open: nextProps.open,
        documentTypeId: nextProps.documentTypeId,
        info: nextProps.info,
      };
    } else return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.info !== prevState.info) {
      this.setState({
        data: !isNullOrUndefined(this.state.info) ? this.state.info.data : [],
        dataCount: !isNullOrUndefined(this.state.info)
          ? this.state.info.dataCount
          : null,
        isLoadingNewData: false,
        isSearching: this.state.searchText !== prevState.searchText,
        // isLoading: false
      });
      if (this.state.searchText !== prevState.searchText) this.loadData(false);
    }
    if (Array.isArray(this.state.extraData)) {
      if (
        JSON.stringify(this.state.extraData) !==
        JSON.stringify(prevState.extraData)
      ) {
        this.loadData(false);
      }
    } else {
      if (this.state.extraData !== prevState.extraData) {
        this.loadData(false);
      }
    }
  }

  handleUnselect = (id) => {
    const { rowsSelected } = this.state;
    //const { deleteDocumentType } = this.props;
    let newRowsSelected = rowsSelected.slice();
    //deleteDocumentType(id);
    newRowsSelected.splice(
      newRowsSelected.findIndex((e) => e.id === id),
      1
    );
    this.renderSelectedColumns(newRowsSelected);
  };

  renderSelectedColumnsUniqueSelect = (rowsSelected = []) => {
    const { classes, columns, t } = this.props;
    let newColumns = columns.slice();
    const rowSelectAux = [rowsSelected[rowsSelected.length - 1]];

    newColumns.unshift({
      name: "",
      field: "",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (data) => {
          if (rowSelectAux && rowSelectAux.some((item) => item.id === data.id))
            return (
              <Chip
                label={t("Selected")}
                className={classes.chip}
                color="primary"
                onDelete={() => this.handleUnselect(data.id)}
                avatar={
                  <Avatar>
                    <CheckedIcon />
                  </Avatar>
                }
              />
            );
          else return <div />;
        },
        width: 1,
      },
    });

    this.setState({
      rowsSelected: rowSelectAux,
      columns: newColumns,
    });
  };

  renderSelectedColumns = (rowsSelected = []) => {
    const { classes, columns, t } = this.props;
    let newColumns = columns.slice();

    newColumns.unshift({
      name: "",
      field: "",
      options: {
        filter: false,
        sort: false,
        customBodyRender: (data) => {
          if (rowsSelected && rowsSelected.some((item) => item.id === data.id))
            return (
              <Chip
                label={t("Selected")}
                className={classes.chip}
                color="primary"
                onDelete={() => this.handleUnselect(data.id)}
                avatar={
                  <Avatar>
                    <CheckedIcon />
                  </Avatar>
                }
              />
            );
          else return <div />;
        },
        width: 1,
      },
    });

    this.setState({
      rowsSelected,
      columns: newColumns,
    });
  };

  loadData = (contentLoader, isSearch) => {
    const { columns, searchText, extraData, extraData1, extraData2 } =
      this.state;
    const { extraObject = {} } = this.props;
    if (contentLoader) this.setState({ isLoadingNewData: true });
    let orderByColumn =
      columns[activeColumnSort].field !== ""
        ? columns[activeColumnSort].field
        : columns[activeColumnSort + 1].field;

    if (!this.props.dontLoad) {
      this.props.loadDataAction({
        url: this.props.url,
        method: this.props.method,
        start: isSearch ? 0 : page * rowsPerPage,
        length: rowsPerPage,
        order: orderByColumn + " " + order,
        search: searchText ? searchText.toString() : "",
        extraData: extraData,
        extraData1: extraData1,
        extraData2: extraData2,
        ...extraObject,
      });
    }

    //   .then(response => {
    //     const lastSearchText = this.state.searchText;
    //     this.setState({
    //       data: response.data.data,
    //       dataCount: response.data.dataCount,
    //       isLoadingNewData: false,
    //       isSearching: lastSearchText !== searchText
    //     });
    //     if (lastSearchText !== searchText) this.loadData(false);
    //   });
  };

  handleConfirm = () => {
    this.props.onConfirm(this.state.rowsSelected);
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

  handleRowClicked = (rowData, rowMeta) => {
    const { multipleSelect, rowsSelected, onlyOneRowSelected } = this.state;
    let data = this.table.props.data[rowMeta.rowIndex];
    if (rowsSelected && rowsSelected.findIndex((e) => e.id === data.id) !== -1)
      return;
    let newDataSelected = rowsSelected ? rowsSelected.slice() : [];
    newDataSelected.push(data);
    if (onlyOneRowSelected && newDataSelected.length > onlyOneRowSelected)
      newDataSelected.shift();
    if (!multipleSelect) {
      this.renderSelectedColumnsUniqueSelect(newDataSelected);
      this.props.onConfirm(newDataSelected[newDataSelected.length - 1]);
    } else {
      this.renderSelectedColumns(newDataSelected);
    }
  };

  updateRow = () => {
    const { handleUpdate } = this.props;
    let dataSelected = this.state.rowsSelected.slice();
    dataSelected = dataSelected[0];
    handleUpdate(dataSelected);
  };
  deleteRow = () => {
    const { handleDelete } = this.props;
    let dataSelectedIds = this.state.rowsSelected.slice();
    dataSelectedIds = dataSelectedIds.map((r) => r.id);
    handleDelete(dataSelectedIds);
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
        //this.changeSearch(tableState.searchText);
        //optionalFunctionSearch && optionalFunctionSearch(tableState.searchText);
        break;
      default:
    }
  };

  renderDataTable = () => {
    const {
      data,
      columns,
      loading,
      isLoadingNewData,
      subTitle,
      dataCount,
      isDesktop,
      enableCreate,
      createData,
    } = this.state;

    const { classes, t, noMatch, mdSearch, notViewColumns } = this.props;

    const options = {
      filterType: "dropdown",
      //responsive: "scroll",
      search: false,
      filter: false,
      print: false,
      download: false,
      serverSide: true,
      rowsPerPage: rowsPerPage,
      rowsPerPageOptions: [5, 10, 20],
      count: dataCount,
      page: page,
      rowHover: true,
      selectableRows: false,
      viewColumns: this.state.isDesktop && !notViewColumns,
      onRowClick: (rowData, rowMeta) => {
        this.handleRowClicked(rowData, rowMeta);
      },
      customToolbar: () => (
        <LinearProgress
          style={{
            opacity: this.state.isSearching ? "1" : "0",
          }}
          className={classes.customLinearProgress}
          variant="query"
        />
      ),
      onTableChange: this.onTableChange,
      textLabels: {
        body: {
          noMatch: noMatch ? noMatch : t("dontSearchRegister"),
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
      (<div>
        {enableCreate && !isDesktop && (
          <span style={{ display: "flex", alignItems: "center" }}>
            <Button onClick={createData.onCreate} className={classes.mobilefab}>
              {createData.title ? createData.title : t("Unspecified")}
            </Button>
          </span>
        )}
        <Grid
          item
          xs={this.state.isDesktop ? 6 : 12}
          md={mdSearch ? mdSearch : 4}
          style={
            this.state.isDesktop
              ? {
                  display: this.state.hideSearch ? "none" : "flex",
                }
              : {
                  display: this.state.hideSearch ? "none" : "flex",
                  margin: "0 20px 20px 20px",
                  justifyContent: "center",
                  alignContent: "center",
                  maxWidth: "100% !important",
                }
          }
          className={this.state.isDesktop ? classes.searchGrid : {}}
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
                  <//style={{ padding: 0 }}
                  IconButton size="large">
                    <Icon
                      name="search"
                      //inverted
                      //circular
                      link
                      className={classes.customSearch}
                    />
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </Grid>
        <div style={{ paddingLeft: 20, paddingRight: 20 }}>
          <MUIDataTable
            ref={(e) => (this.table = e)}
            title={subTitle}
            data={data}
            columns={columns}
            options={options}
          />
        </div>
        <Fade in={isLoadingNewData} className={classes.contentLoader}>
          <div style={{ pointerEvents: isLoadingNewData ? "inherit" : "none" }}>
            <CircularProgress className={classes.circularProgress} size={50} />
          </div>
        </Fade>
      </div>)
    );
  };

  render() {
    const {
      title,
      open,
      multipleSelect,
      enableCreate,
      createData,
      isDesktop,
      rowsSelected,
    } = this.state;
    const { classes, t, handleUpdate, handleDelete } = this.props;
    return (
      (<Dialog
        fullScreen
        onClose={this.props.onClose}
        TransitionComponent={Transition}
        open={open ? open : false}
        onBackdropClick={this.props.onClose}
        style={{ paddingRight: 0 }}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              onClick={this.props.onClose}
              aria-label="Close"
              className={classes.customButton}
              size="large">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.flex}>
              {title}
            </Typography>
            {(enableCreate || handleUpdate || handleDelete) && (
              <span style={{ display: "flex", alignItems: "center" }}>
                {enableCreate && isDesktop && (
                  <Button onClick={createData.onCreate} className={classes.fab}>
                    {createData.title ? createData.title : t("Unspecified")}
                  </Button>
                )}
                {handleUpdate && rowsSelected.length > 0 && (
                  <Button onClick={this.updateRow} className={classes.fab}>
                    {t("Edit")}
                  </Button>
                )}
                {handleDelete && rowsSelected.length > 0 && (
                  <Button onClick={this.deleteRow} className={classes.fab}>
                    {t("Delete")}
                  </Button>
                )}
                <MoreVerIcon />
              </span>
            )}

            <Button
              color="inherit"
              onClick={this.props.onClose}
              className={classes.customButton}
            >
              {t("cancel")}
            </Button>
            <Button
              style={{ display: multipleSelect ? "inherit" : "none" }}
              color="inherit"
              onClick={this.handleConfirm}
              className={classes.customButton}
            >
              {t("confirm")}
            </Button>
          </Toolbar>
        </AppBar>
        {this.renderDataTable()}
      </Dialog>)
    );
  }
}

DataTableDialogActions.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = ({ DocumentType }) => {
  return {
    documentTypeId: DocumentType.id,
  };
};

const DataTableDialogActionsConnected = connect(
  mapStateToProps,
  null
)(DataTableDialogActions);

export default withTranslation()(
  withStyles(CustomStyles, { withTheme: true })(DataTableDialogActionsConnected)
);
