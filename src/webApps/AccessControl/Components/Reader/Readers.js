import React, { Component } from "react";
import NavBarAccessControl from "../../utils/NavBarAccessControl";
import TableSkeletonLoader from "../../../Shared/TableSkeletonLoader";
import PropTypes from "prop-types";
import { withStyles } from '@mui/styles';
import MUIDataTable from "mui-datatables";
import CircularProgress from "@mui/material/CircularProgress";
import ReaderForm from "./NewReader";
import LinearProgress from "@mui/material/LinearProgress";
import CustomToolbarSelectReader from "../../../Shared/DataTable/CustomToolBarSelectReader";
import SnackbarHandler from "../../../../utils/SnackbarHandler";
import { isNullOrUndefined } from "util";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import { Icon } from "semantic-ui-react";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { debounce } from "throttle-debounce";
import {
  Slide,
  Dialog,
  DialogActions,
  DialogContentText,
  Button,
} from "@mui/material";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import { Entities, Activity } from "../../../../utils/Enums";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";

import {
  requestGetReaders,
  requestDeleteReaders,
  requestAssignAL,
  requestGetCardFormatIDs,
} from "../../../../actions/AccessControl/reader_actions";
import {
  requestGetCardFormats,
  requestUpdateCardFormatByReader,
} from "../../../../actions/AccessControl/cardFormat_actions";
import DataTableDialogAction from "../../../Shared/DataTable/DataTableDialogAction";
import styles from "../../../../assets/styles/AccessControl_styles/Reader_Styles/readersStyles";

const mapStateToProps = ({ User, Reader, CardFormat }) => {
  return {
    currentUser: User.currentUser,
    readers: Reader.readers,
    cardFormats: Reader.cardFormats,
    readersCount: Reader.readersCount,
    loading: Reader.loading,
    successAssignAL: Reader.successAssignAL,
    successGetReaders: Reader.successGetReaders,
    successDelete: Reader.successDelete,
    successGetCardFormat: Reader.successGetCardFormat,
    info: { data: CardFormat.cardFormats, dataCount: CardFormat.cardCount },
    successCardFormat: CardFormat.successGetCardFormats,
    successUpdateCardFormatByReader: CardFormat.successUpdateCardFormatByReader,
  };
};

const mapDispatchToProps = {
  requestGetReaders,
  requestDeleteReaders,
  requestAssignAL,
  requestGetCardFormats,
  requestGetCardFormatIDs,
  requestUpdateCardFormatByReader,
};

function Transition(props) {
  return <Slide direction="down" {...props} />;
}

let page = 0;
let rowsPerPage = 10;
let activeColumnSort = 0;
let order = "asc";

class Readers extends Component {
  state = { isDesktop: true };
  constructor(props) {
    super(props);
    const { t } = props;
    this.state = {
      loading: true,
      isLoadingNewData: false,
      isSearching: false,
      readerOnDetails: undefined,
      assignedAccessLevels: [],
      assignedCardFormats: [2],
      openDialogAccessLevels: false,
      openDialogConfirmDelete: false,
      columns: this.translateColumns(t, true),
      searchText: "",
      isLoading: true,
    };
    this.changeSearchDebounce = debounce(300, (value) =>
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
    this.updateScreenMode();
    window.addEventListener("resize", this.updateScreenMode);
    NavBarAccessControl.hideLoader();
    const { columns } = this.state;
    this.props.requestGetReaders({
      start: page * rowsPerPage,
      length: rowsPerPage,
      order: columns[activeColumnSort].name + " " + order,
      search: "",
    });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.i18n.language !== prevState.language ||
      nextProps.loading !== prevState.loading ||
      nextProps.successAssignAL !== prevState.successAssignAL ||
      nextProps.successDelete !== prevState.successDelete ||
      nextProps.successGetReaders !== prevState.successGetReaders ||
      nextProps.successGetCardFormat !== prevState.successGetCardFormat ||
      nextProps.successCardFormat !== prevState.successCardFormat ||
      nextProps.successUpdateCardFormatByReader !==
        prevState.successUpdateCardFormatByReader
    ) {
      return {
        language: nextProps.i18n.language,
        loading: nextProps.loading,
        successAssignAL: nextProps.successAssignAL,
        successGetReaders: nextProps.successGetReaders,
        successDelete: nextProps.successDelete,
        successGetCardFormat: nextProps.successGetCardFormat,
        data: nextProps.readers,
        dataCount: nextProps.readersCount,
        info: nextProps.info,
        successCardFormat: nextProps.successCardFormat,
        successUpdateCardFormatByReader:
          nextProps.successUpdateCardFormatByReader,
      };
    } else return null;
  }

  componentDidUpdate(prevProps, prevState) {
    const { t } = this.props;
    const { successGetReaders, data, dataCount } = this.state;
    if (
      successGetReaders &&
      successGetReaders !== prevState.successGetReaders
    ) {
      this.setState({
        data: data,
        dataCount: dataCount,
        isLoading: false,
        isLoadingNewData: false,
        isSearching: this.state.searchText !== prevState.searchText,
        hideSearch: false,
      });
      if (this.state.searchText !== prevState.searchText) this.loadData(false);
    }
    if (
      this.state.successUpdateCardFormatByReader &&
      this.state.successUpdateCardFormatByReader !==
        prevState.successUpdateCardFormatByReader
    ) {
      this.setState({
        openDialogCardFormat: false,
        isSuccess: true,
      });
      this.loadData();
      SnackbarHandler.showMessage(t("successAssignedCardFormat"));
    }

    if (
      this.state.successGetCardFormat &&
      prevState.successGetCardFormat !== this.state.successGetCardFormat
    ) {
      const ids = this.props.cardFormats.map((id) => ({ id: id }));
      this.setState({
        openDialogCardFormat: true,
        assignedCardFormats: ids,
      });
    }

    if (
      this.state.successDelete &&
      prevState.successDelete !== this.state.successDelete
    ) {
      this.loadData();
      this.setState({ openDialogConfirmDelete: false });
      SnackbarHandler.showMessage(t("successDeleteReaders"));
    }
    if (prevState.language !== this.state.language) {
      this.setState({
        ...prevState,
        columns: this.translateColumns(this.props.t, false),
      });
    }
  }

  translateColumns = (t, initial) => {
    let colStorage = JSON.parse(localStorage.getItem("readerColumns"));

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
        label: t("Type"),
        name: "type",
        options: {
          filter: true,
          sort: true,
          sortDirection: activeColumnSort === 1 ? order : "none",
          display: isNullOrUndefined(columDisplay.type)
            ? true
            : columDisplay.type,
        },
      },
      {
        label: t("panel"),
        name: "panel",
        options: {
          filter: true,
          sort: true,
          sortDirection: activeColumnSort === 2 ? order : "none",
          display: isNullOrUndefined(columDisplay.panel)
            ? true
            : columDisplay.panel,
        },
      },
    ];
  };

  loadData = (contentLoader, isSearch) => {
    const { columns, searchText } = this.state;
    if (contentLoader) this.setState({ isLoadingNewData: true });
    this.setState({ openDialogProtectedData: false });
    this.props.requestGetReaders({
      start: isSearch ? 0 : page * rowsPerPage,
      length: rowsPerPage,
      order: columns[activeColumnSort].name + " " + order,
      search: searchText,
    });
  };

  changePage = (newPage) => {
    page = newPage;
    //this.loadData(true);
    this.loadData();
  };

  changeRowsPerPage = (newRowsPerPage) => {
    rowsPerPage = newRowsPerPage;
    //this.loadData(true);
    this.loadData();
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
    this.loadData();
    //   this.loadData(true);
  };

  // changeSearch = searchText => {
  //   const { isSearching } = this.state;
  //   this.setState({
  //     searchText,
  //     isSearching: true
  //   });
  //   if (!isSearching) {
  //     //this.loadData(false);
  //     this.loadData();
  //   }
  // };
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
    localStorage.setItem("readerColumns", JSON.stringify(modifiedColumns));
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
        //  this.changeSearch(tableState.searchText);
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
    let reader = this.state.data[index];
    this.setState({
      readerOnEdit: reader,
    });
  };

  handleOnDetails = (index) => {
    let reader = this.state.data[index];
    this.setState({
      readerOnDetails: reader,
    });
  };

  handleOnDelete = (indexs) => {
    const { data } = this.state;
    let readersToDelete = [];
    indexs.map((i) => {
      return readersToDelete.push(data[i].id);
    });
    this.setState({
      readersToDelete: readersToDelete,
      openDialogConfirmDelete: true,
    });
  };

  handleConfirmDelete() {
    const { readersToDelete } = this.state;
    this.props.requestDeleteReaders(readersToDelete);
  }

  loadCardFormat = (reader) => {
    this.props.requestGetCardFormatIDs(reader.id);
    this.setState({
      readerToAssign: reader,
    });
  };

  handleOnAssignCardFormat = (index) => {
    let reader = this.state.data[index];
    this.loadCardFormat(reader);
  };

  handleAssignSelectedCardFormat = (cardFormat) => {
    const cardFormatids = cardFormat.map((obj) => obj.id);
    const { readerToAssign } = this.state;
    this.setState({ openDialogCardFormat: false });
    this.props.requestUpdateCardFormatByReader({
      id: readerToAssign.id,
      cardFormats: cardFormatids,
    });
  };

  handleAssignSelectedAccessLevels = (accessLevels) => {
    const { readerToAssign } = this.state;
    accessLevels = accessLevels.map((al) => al.id);
    this.props.requestAssignAL({
      Id: readerToAssign.id,
      accessLevels: accessLevels,
      deleteOther: true,
    });
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
      loading,
      isLoading,
      dataCount,
      readerOnDetails,
      readerOnEdit,
      openDialogConfirmDelete,
      //openDialogAccessLevels,
      openDialogCardFormat,
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
      onRowsSelect: (selectedRows, selected) => {
        if (selected.length === 0) this.setState({ hideSearch: false });
        else {
          this.setState({ hideSearch: true });
        }
      },
      customToolbarSelect: (selectedRows) => (
        <CustomToolbarSelectReader
          selectedRows={selectedRows}
          onDetails={this.handleOnDetails}
          // onEdit={
          //   this.handleLicence(
          //     [Entities.READERS.toString()],
          //     Activity.UPDATE
          //   ) && this.handleOnEdit
          // }
          onDelete={
            this.handleLicence(
              [Entities.READERS.toString()],
              Activity.DELETE
            ) && this.handleOnDelete
          }
          // onAssignAccessLevel={
          //   this.handleLicence([Entities.ACCESS_LEVELS.toString()]) &&
          //   this.handleOnAssignCardFormat
          // }
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
          title={t("Readers")}
          data={data}
          columns={columns}
          options={options}
        />
        <div
          className={classes.contentLoader}
          style={{ display: loading ? "inherit" : "none" }}
        >
          <CircularProgress className={classes.circularProgress} size={50} />
        </div>
        <Dialog
          open={!isNullOrUndefined(readerOnDetails)}
          TransitionComponent={Transition}
          onClose={() => this.setState({ readerOnDetails: undefined })}
          maxWidth="md"
          fullWidth
          scroll="paper"
        >
          <ReaderForm
            isDialog
            onCreate={() => this.setState({ readerOnDetails: undefined })}
            initValues={readerOnDetails}
            isDetails
          />
        </Dialog>
        <Dialog
          open={!isNullOrUndefined(readerOnEdit)}
          TransitionComponent={Transition}
          onClose={() => this.setState({ readerOnEdit: undefined })}
          maxWidth="md"
          fullWidth
          scroll="paper"
        >
          <ReaderForm
            isDialog
            updateParent={() => this.loadData(true)}
            onCreate={() => this.setState({ readerOnEdit: undefined })}
            initValues={readerOnEdit}
            isEdit
          />
        </Dialog>
        <Dialog
          open={openDialogConfirmDelete}
          onClose={() => this.setState({ openDialogConfirmDelete: false })}
          className={classes.confirmDialog}
        >
          <DialogTitle>{t("DeleteReader")}</DialogTitle>

          <DialogContentText
            className={classes.confirmDialog}
            style={{ display: "flex", justifyContent: "center" }}
          >
            {t("youSureDeleteReaders")}
          </DialogContentText>
          <DialogActions>
            <Button
              onClick={() =>
                this.setState({
                  openDialogConfirmDelete: false,
                  readersToDelete: [],
                })
              }>
              {t("cancel")}
            </Button>
            <Button onClick={() => this.handleConfirmDelete()}>
              {t("accept")}
            </Button>
          </DialogActions>
        </Dialog>
        <DataTableDialogAction
          open={openDialogCardFormat}
          onConfirm={this.handleAssignSelectedCardFormat}
          onClose={() => this.setState({ openDialogCardFormat: false })}
          title={t("assignCardFormat")}
          subTitle={t("selectCardFormat")}
          loading={this.props.loading}
          loadDataAction={this.props.requestGetCardFormats}
          //extraData={this.state.originCompanies.filter(oc => oc != -1)}
          rowsSelected={this.state.assignedCardFormats} //.map(obj => obj.id)}
          noMatch={t("NoData")}
          // dontLoad={
          //   this.state.originCompanies.filter(oc => oc != -1).length == 0
          // }
          multipleSelect={true}
          //optionalFunctionSearch={this.saveNameForCreate}
          enableCreate={false}
          // createData={{
          //   title: t("NewDocument"),
          //   onCreate: () => {
          //     this.setState({ openDialogNewDocumentType: true });
          //   }
          // }}
          //deleteDocumentType={this.handleDeleteDocumentType}
          success={this.props.successCardFormat}
          info={this.state.info}
          columns={[
            {
              label: t("name"),
              name: "name",
              field: "name",
              options: {
                sort: true,
                filter: true,
                sortDirection: "asc",
                customBodyRender: (data) => {
                  if (data.name)
                    return (
                      <Typography value={data.name}>{data.name}</Typography>
                    );
                },
              },
            },
          ]}
        />
      </div>)
    );
  }
}

Readers.propTypes = {
  classes: PropTypes.object.isRequired,
};

const ReadersConnected = connect(mapStateToProps, mapDispatchToProps)(Readers);

export default withTranslation()(withStyles(styles)(ReadersConnected));
