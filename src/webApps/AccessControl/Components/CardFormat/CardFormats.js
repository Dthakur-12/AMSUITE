import React, { Component } from "react";
import NavBarAccessControl from "../../utils/NavBarAccessControl";
import TableSkeletonLoader from "../../../Shared/TableSkeletonLoader";
import PropTypes from "prop-types";
import { withStyles } from '@mui/styles';
import MUIDataTable from "mui-datatables";
import CardFormatForm from "./NewCardFormat";
import CircularProgress from "@mui/material/CircularProgress";
import SnackbarHandler from "../../../../utils/SnackbarHandler";
import { LinearProgress } from "@mui/material";
import CustomToolbarSelect from "../../../Shared/DataTable/CustomToolBarSelect";
import Fade from "@mui/material/Fade";
import { isNullOrUndefined } from "util";
import { Slide, Dialog } from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DataTableDialogAction from "../../../Shared/DataTable/DataTableDialogAction";
import Button from "@mui/material/Button";
import { Entities, Activity } from "../../../../utils/Enums";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import { Icon } from "semantic-ui-react";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { debounce } from "throttle-debounce";
import {
  requestGetCardFormats,
  requestDeleteCardFormat,
  requestGetCardFormatReaders,
  requestAssignCardFormatReaders,
} from "../../../../actions/AccessControl/cardFormat_actions";
import {
  requestGetReaders,
  requestGetMobileReaders,
} from "../../../../actions/AccessControl/reader_actions";
import styles from "../../../../assets/styles/AccessControl_styles/CardFormat_styles/cardFormatsStyles";

const mapStateToProps = ({ User, CardFormat, Reader }) => {
  return {
    currentUser: User.currentUser,
    cardFormats: CardFormat.cardFormats,
    cardFormatsCount: CardFormat.cardCount,
    successGetCardFormats: CardFormat.successGetCardFormats,
    successDeleteCardFromat: CardFormat.successDeleteCardFormat,
    successGetCardFormatReaders: CardFormat.successGetCardFormatReaders,
    successAssignCardFormatReaders: CardFormat.successAssignCardFormatReaders,
    // isLoading: CardFormat.loading,
    loading: Reader.loading,
    cardFormatReaders: CardFormat.cardFormatReaders,
    successGetReaders: Reader.successGetReaders,
    successGetMobileReaders: Reader.successGetMobileReaders,
    info: CardFormat.info,
    infoReaders: Reader.infoReaders,
  };
};

const mapDispatchToProps = {
  requestGetCardFormats,
  requestDeleteCardFormat,
  requestGetCardFormatReaders,
  requestAssignCardFormatReaders,
  requestGetMobileReaders,
  requestGetReaders,
};

function Transition(props) {
  return <Slide direction="down" {...props} />;
}

let page = 0;
let rowsPerPage = 10;
let activeColumnSort = 0;
let order = "asc";

class CardFormats extends Component {
  state = { isDesktop: true };
  constructor(props) {
    super(props);
    const { t } = props;
    this.state = {
      isLoading: true,
      isLoadingNewData: false,
      cardFormatOnDetails: undefined,
      cardFormatReaders: [],
      isSearching: false,
      columns: this.translateColumns(t, true),
    };
    this.changeSearchDebounce = debounce(300, (value) =>
      this.changeSearch(value)
    );
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.i18n.language !== prevState.language ||
      nextProps.successGetCardFormats !== prevState.successGetCardFormats ||
      //  nextProps.isLoading !== prevState.isLoading ||
      nextProps.successDeleteCardFromat !== prevState.successDeleteCardFromat ||
      nextProps.successGetCardFormatReaders !==
        prevState.successGetCardFormatReaders ||
      nextProps.successAssignCardFormatReaders !==
        prevState.successAssignCardFormatReaders ||
      nextProps.info !== prevState.info
    ) {
      return {
        info: nextProps.info,
        language: nextProps.i18n.language,
        data: nextProps.cardFormats,
        dataCount: nextProps.cardFormatsCount,
        // isLoading: nextProps.isLoading,
        successDeleteCardFromat: nextProps.successDeleteCardFromat,
        successGetCardFormatReaders: nextProps.successGetCardFormatReaders,
        cardFormatReaders: nextProps.cardFormatReaders,
        successAssignCardFormatReaders:
          nextProps.successAssignCardFormatReaders,
        successGetCardFormats: nextProps.successGetCardFormats,
      };
    } else return null;
  }

  componentDidUpdate(prevProps, prevState) {
    const { t } = this.props;
    const { successGetCardFormats } = this.state;
    if (
      successGetCardFormats &&
      successGetCardFormats !== prevState.successGetCardFormats
    ) {
      this.setState({
        data: this.state.info.data,
        dataCount: this.state.info.dataCount,
        isLoadingNewData: false,
        isLoading: false,
        isSearching: this.state.searchText !== prevState.searchText,
        hideSearch: false,
      });
      if (this.state.searchText !== prevState.searchText) this.loadData(false);
    }
    if (
      this.state.successAssignCardFormatReaders &&
      prevState.successAssignCardFormatReaders !==
        this.state.successAssignCardFormatReaders
    ) {
      this.setState({ openDialogReaders: false });
      this.loadData();
    }
    if (
      this.state.successGetCardFormatReaders &&
      prevState.successGetCardFormatReaders !==
        this.state.successGetCardFormatReaders
    ) {
      this.setState({
        openDialogReaders: true,
      });
    }
    if (
      this.state.successDeleteCardFromat &&
      prevState.successDeleteCardFromat !== this.state.successDeleteCardFromat
    ) {
      if (this.state.indexsToDelete.length === 1)
        SnackbarHandler.showMessage(t("SuccessDeleteCardFromat"));
      else SnackbarHandler.showMessage(t("SuccessDeleteCardFromats"));
      this.setState({
        openDialogDeleteConfirm: false,
        indexsToDelete: [],
      });
      this.loadData();
    }
    if (prevState.language !== this.state.language) {
      this.setState({
        ...prevState,
        columns: this.translateColumns(this.props.t, false),
      });
    }
  }

  translateColumns = (t, initial) => {
    let colStorage = JSON.parse(localStorage.getItem("cardFormatColumns"));

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
    ];
  };

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
    this.loadData(true);
  }

  loadData = (contentLoader, isSearch) => {
    const { columns, searchText = "" } = this.state;
    if (contentLoader) this.setState({ isLoadingNewData: true });
    this.props.requestGetCardFormats({
      start: isSearch ? 0 : page * rowsPerPage,
      length: rowsPerPage,
      order: columns[activeColumnSort].name + " " + order,
      search: searchText,
    });
  };

  handleOnEdit = (index) => {
    let cardFormat = this.state.data[index];
    this.setState({
      cardFormatOnEdit: cardFormat,
    });
  };

  handleOnDelete = () => {
    const indexs = this.state.indexsToDelete;
    const { data } = this.state;
    let cardFormatToDelete = [];
    indexs.map((i) => {
      return cardFormatToDelete.push(data[i].id);
    });
    this.props.requestDeleteCardFormat(cardFormatToDelete);
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

  handleOnDetails = (index) => {
    let cardFormat = this.state.data[index];
    this.setState({
      cardFormatOnDetails: cardFormat,
    });
  };

  handleAssignReaders = (index) => {
    let cardFormat = this.state.data[index];

    this.setState({
      cardFormatToAddReaders: cardFormat,
    });
    this.props.requestGetCardFormatReaders(cardFormat.id);
  };

  handleReadersSelected = (readers) => {
    let readersIds = [];
    const { cardFormatToAddReaders } = this.state;
    readers.forEach((reader) => {
      readersIds.push(reader.id);
    });
    this.props.requestAssignCardFormatReaders({
      readers: readersIds,
      id: cardFormatToAddReaders.id,
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
    localStorage.setItem("cardFormatColumns", JSON.stringify(modifiedColumns));
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
      isLoading,
      isLoadingNewData,
      dataCount,
      cardFormatOnEdit,
      cardFormatOnDetails,
      indexsToDelete,
      openDialogReaders,
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
      customToolbarSelect: (selectedRows) => {
        return (
          <CustomToolbarSelect
            onDelete={
              this.handleLicence(
                [Entities.CARD_FORMATS.toString()],
                Activity.DELETE
              ) && this.handleOpenDeleteConfirm
            }
            onEdit={
              this.handleLicence(
                [Entities.CARD_FORMATS.toString()],
                Activity.UPDATE
              ) && this.handleOnEdit
            }
            permitsToDelete={this.handleLicence(
              [Entities.CARD_FORMATS.toString()],
              Activity.DELETE
            )}
            permitsToEdit={this.handleLicence(
              [Entities.CARD_FORMATS.toString()],
              Activity.UPDATE
            )}
            selectedRows={selectedRows}
            onDetails={this.handleOnDetails}
            permitsToAssingReaders={this.handleLicence(
              [Entities.CARD_FORMATS.toString()],
              Activity.UPDATE
            )}
            assignReaders={
              this.handleLicence(
                [Entities.CARD_FORMATS.toString()],
                Activity.UPDATE
              ) && this.handleAssignReaders
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
                    onClick={() =>
                      this.setState({ registerOnDetails: undefined })
                    }
                    size="large">
                    <Icon name="search" link className={classes.searchIcon} />
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </Grid>
        <MUIDataTable
          title={t("CardFormats")}
          data={data}
          columns={columns}
          options={options}
        />
        <Fade in={isLoadingNewData} className={classes.contentLoader}>
          <div
            className={classes.contentLoader}
            style={{ display: isLoadingNewData ? "inherit" : "none" }}
          >
            <CircularProgress className={classes.circularProgress} size={50} />
          </div>
        </Fade>
        <Dialog
          open={!isNullOrUndefined(cardFormatOnEdit)}
          TransitionComponent={Transition}
          onClose={() => this.setState({ cardFormatOnEdit: undefined })}
          maxWidth="md"
          fullWidth
          scroll="paper"
        >
          <CardFormatForm
            isDialog
            id={cardFormatOnEdit ? cardFormatOnEdit.id : -1}
            updateParent={() => this.loadData(true)}
            isEdit={true}
            onCreate={() => this.setState({ cardFormatOnEdit: undefined })}
            initValues={cardFormatOnEdit}
          />
        </Dialog>
        <Dialog
          open={!isNullOrUndefined(cardFormatOnDetails)}
          TransitionComponent={Transition}
          onClose={() => this.setState({ cardFormatOnDetails: undefined })}
          maxWidth="md"
          fullWidth
          scroll="paper"
        >
          <CardFormatForm
            isDialog
            onCreate={() => this.setState({ cardFormatOnDetails: undefined })}
            initValues={cardFormatOnDetails}
            isDetails={true}
            id={cardFormatOnDetails ? cardFormatOnDetails.id : -1}
          />
        </Dialog>
        <Dialog
          open={
            this.state.openDialogDeleteConfirm
              ? this.state.openDialogDeleteConfirm
              : false
          }
          onClose={this.handleCloseDeleteConfirm}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {t("DeleteCardFormats")}
          </DialogTitle>
          <DialogContent>
            {!isNullOrUndefined(indexsToDelete) &&
              indexsToDelete.length === 1 && (
                <DialogContentText id="alert-dialog-description">
                  {t("youSureWantDeleteCardFormat")}
                </DialogContentText>
              )}
            {!isNullOrUndefined(indexsToDelete) &&
              indexsToDelete.length > 1 && (
                <DialogContentText id="alert-dialog-description">
                  {t("youSureWantDeleteCardFormats")}
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
        {openDialogReaders && (
          <DataTableDialogAction
            open={openDialogReaders}
            onConfirm={this.handleReadersSelected}
            onClose={() => this.setState({ openDialogReaders: false })}
            title={t("AssignReader")}
            subTitle={t("selectTheReadersToAssign")}
            loading={this.props.loading}
            loadDataAction={this.props.requestGetMobileReaders}
            rowsSelected={this.state.cardFormatReaders}
            noMatch={t("NoData")}
            multipleSelect={true}
            enableCreate={false}
            success={this.props.successGetMobileReaders}
            info={this.props.infoReaders}
            columns={[
              {
                name: t("name"),
                field: "name",
                options: {
                  filter: true,
                  sort: true,
                  sortDirection: "asc",
                },
              },
              {
                name: t("Type"),
                field: "type",
                options: {
                  filter: true,
                  sort: true,
                  sortDirection: "asc",
                },
              },
            ]}
          />
        )}
      </div>)
    );
  }
}

CardFormats.propTypes = {
  classes: PropTypes.object.isRequired,
};

const CardFormatsConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(CardFormats);

export default withTranslation()(withStyles(styles)(CardFormatsConnected));
