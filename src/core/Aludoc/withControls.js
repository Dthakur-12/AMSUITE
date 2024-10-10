import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import Typography from "@mui/material/Typography";
import PointIcon from "@mui/icons-material/FiberManualRecord";
import SnackbarHandler from "../../utils/SnackbarHandler";
import NavBarAludoc from "../../webApps/Aludoc/utils/NavBarAludoc";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { ListItemIcon } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import { isNullOrUndefined } from "util";
import { socketIO } from "../../utils/WebSockets";
import { withTranslation } from "react-i18next";
import { debounce } from "throttle-debounce";
import moment from "moment";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import AmSuiteNavBar from "../../utils/AmSuiteNavBar";
import {
  requestControls,
  detailRequestControl,
  deleteRequestControl,
} from "../../actions/Aludoc/controls_actions";

let page = 0;
let rowsPerPage = 10;
let activeColumnSort = 0;
let order = "asc";

const withControls = (Component) =>
  (class extends React.Component {
    constructor(props) {
      super(props);
      const { t } = props;
      this.state = {
        isLoading: true,
        isLoadingNewData: false,
        openDialogDeleteConfirm: false,
        indexsToDelete: undefined,
        controlEdit: undefined,
        isSearching: false,
        isDialog: false,
        isEdit: false,
        openEditControl: false,
        isDetails: false,
        isEditSuccess: false,
        success: false,
        searchText: "",
        dateTime: moment().format("MM/DD/YYYY HH:mm:ss"),
        columns: this.translateColumns(t, true),
      };

      this.changeSearchDebounce = debounce(300, (value) =>
        this.changeSearch(value)
      );
    }
    static getDerivedStateFromProps(nextProps, prevState) {
      if (
        nextProps.i18n.language !== prevState.language ||
        nextProps.controls.loading !== prevState.isLoading ||
        nextProps.controls.controls !== prevState.data ||
        nextProps.controls.isLoadingNewData !== prevState.isLoadingNewData ||
        nextProps.controls.control !== prevState.controlEdit ||
        nextProps.isDeleted !== prevState.isDeleted ||
        nextProps.isEditSuccess !== prevState.isEditSuccess ||
        nextProps.isSearching !== prevState.isSearching ||
        nextProps.error !== prevState.error ||
        nextProps.successGetPerson !== prevState.successGetPerson
      ) {
        return {
          language: nextProps.i18n.language,
          isLoading: nextProps.controls.loading,
          data: nextProps.controls.controls,
          dataCount: nextProps.dataCount,
          controlEdit: nextProps.controls.control,
          isDeleted: nextProps.isDeleted,
          isEditSuccess: nextProps.isEditSuccess,
          isLoadingNewData: nextProps.isLoadingNewData,
          isSearching: nextProps.isSearching,
          successGetPerson: nextProps.successGetPerson,
        };
      } else return null;
    }

    componentDidUpdate(prevProps, prevState) {
      const { currentUser } = this.props;
      const { columns } = this.state;
      if (prevState.language !== this.state.language) {
        this.setState({
          ...prevState,
          columns: this.translateColumns(this.props.t, false),
        });
      }
      if (prevState.successGetPerson !== this.state.successGetPerson) {
        this.setState({
          ...prevState,
          openEditControl: true,
        });
      }

      if (
        this.state.isDeleted &&
        prevState.isDeleted !== this.state.isDeleted
      ) {
        this.setState({ searchText: "", hideSearch: false });
        this.props.requestControls({
          start: page * rowsPerPage,
          length: rowsPerPage,
          sort: columns[activeColumnSort].name + " " + order,
          search: "",
          completeData: true,
          id: currentUser.id,
        });
        this.handleCloseDeleteConfirm();
      }
      if (
        this.state.isEditSuccess &&
        prevState.isEditSuccess !== this.state.isEditSuccess
      ) {
        this.props.requestControls({
          start: page * rowsPerPage,
          length: rowsPerPage,
          sort: columns[activeColumnSort].name + " " + order,
          search: "",
          completeData: true,
          id: currentUser.id,
        });
        this.setState((prevState) => ({
          ...prevState,
          closeModal: true,
          hideSearch: false,
        }));
      }
    }

    translateColumns = (t, initial) => {
      let colStorage = JSON.parse(localStorage.getItem("controlsColumns"));

      let columDisplay = {};

      if (initial && !isNullOrUndefined(colStorage)) {
        colStorage &&
          colStorage.map(
            (elem) =>
              (columDisplay[elem.name] = !isNullOrUndefined(
                elem.options.display
              )
                ? elem.options.display
                : true)
          );
      } else {
        this.state &&
          this.state.columns &&
          this.state.columns.map(
            (elem) =>
              (columDisplay[elem.name] = !isNullOrUndefined(
                elem.options.display
              )
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
          label: t("status"),
          name: "documentationStatus",
          options: {
            filter: false,
            sort: false,
            display: isNullOrUndefined(columDisplay.documentationStatus)
              ? true
              : columDisplay.documentationStatus,
            customBodyRender: (data) => {
              const { classes } = this.props;
              return (
                <ListItem>
                  <ListItemIcon
                  // title={this.state.SelectedStateOption[data.status].label}
                  >
                    <Tooltip
                      title={
                        data === 0
                          ? t("validDocumentation")
                          : data === -1
                          ? t("WithoutDocumentation")
                          : data === 1
                          ? t("ToReview")
                          : t("ExpiredDocumentation")
                      }
                      aria-label="Filter"
                      placement="bottom"
                    >
                      <PointIcon
                        style={
                          data === 0
                            ? { color: "#437043" }
                            : data === -1
                            ? { color: "#e66b00" }
                            : { color: "#743631" }
                        }
                      />
                    </Tooltip>
                  </ListItemIcon>
                </ListItem>
              );
            },
          },
        },
        {
          label: t("Notifications"),
          name: "notificationsActivated",
          options: {
            filter: false,
            sort: false,
            display: isNullOrUndefined(columDisplay.notificationsActivated)
              ? true
              : columDisplay.notificationsActivated,
            customBodyRender: (data, tableMeta) => {
              const { classes } = this.props;
              return (
                <ListItem>
                  <Tooltip
                    title={
                      data
                        ? t("ActivedNotifications")
                        : t("DisabledNotifications")
                    }
                    aria-label="Filter"
                    placement="bottom"
                  >
                    <ListItemIcon
                      onClick={() =>
                        this.redirectToSettings(
                          this.state.data[tableMeta.rowIndex].name,
                          this.state.data[tableMeta.rowIndex].id
                        )
                      }
                    >
                      {data ? <CheckIcon /> : <CloseIcon />}
                    </ListItemIcon>
                  </Tooltip>
                </ListItem>
              );
            },
          },
        },
      ];
    };

    closeModalFalse = () => this.setState({ closeModal: false });

    redirectToSettings = (controlName, controlId) => {
      AmSuiteNavBar.appNavigation.history.push(
        `/settings/controlNotifications/notificationSettings/${controlName}/${controlId}`
      );
    };

    componentWillUnmount() {
      window.removeEventListener("resize", this.updateScreenMode);
    }

    updateScreenMode = () => {
      this.setState({ isDesktop: window.innerWidth > 900 });
    };

    componentDidMount() {
      const { currentUser, match } = this.props;
      const { columns } = this.state;
      this.updateScreenMode();
      NavBarAludoc.hideLoader();
      socketIO.emit("changes");
      const loadData = this.loadData;
      socketIO.on("AnyChange", function (data) {
        if (data.message[29]) {
          loadData(true, false, page, rowsPerPage);
        }
      });
      this.props.requestControls({
        start: page * rowsPerPage,
        length: rowsPerPage,
        sort: columns[activeColumnSort].name + " " + order,
        search: "",
        completeData: true,
        id: currentUser.id,
      });

      if (match) {
        if (match.params.id && currentUser.id) {
          this.props.detailRequestControl({
            controlId: match.params.id,
            userId: currentUser.id,
          });
          this.setState({
            isEdit: false,
          });
        }
      }
    }

    componentWillUnmount = () => {
      socketIO.emit("unsubscribeChanges");
    };

    loadData = (contentLoader, isSearch, page = 0, rowsPerPage = 10) => {
      const { currentUser } = this.props;
      const { columns, searchText } = this.state;
      if (contentLoader) this.setState({ isLoadingNewData: true });
      this.props.requestControls({
        start: isSearch ? 0 : page * rowsPerPage,
        length: rowsPerPage,
        sort: columns[activeColumnSort].name + " " + order,
        search: searchText,
        completeData: true,
        id: currentUser.id,
      });
    };
    changePage = (newPage) => {
      page = newPage;
      this.loadData(true, false, newPage, rowsPerPage);
    };

    changeRowsPerPage = (newRowsPerPage) => {
      if (newRowsPerPage !== rowsPerPage) {
        rowsPerPage = newRowsPerPage;
        this.loadData(true, false, page, newRowsPerPage);
      }
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
      this.loadData(false, false, page, rowsPerPage);
    };

    changeSearch = (value) => {
      this.setState({
        isSearching: true,
      });
      this.loadData(true, true, page, rowsPerPage);
    };

    onChangeSearch = (text) => {
      let value = text ? text : "";
      this.setState({
        searchText: value,
      });
      this.changeSearchDebounce(value);
    };

    handleOnEdit = (index) => {
      const { detailRequestControl, currentUser } = this.props;
      let control = this.state.data[index];
      detailRequestControl({
        controlId: control.id,
        userId: currentUser.id,
      });
      this.setState({
        isEdit: true,
      });
    };

    handleOnDelete = () => {
      const { data, indexsToDelete } = this.state;
      const { deleteRequestControl } = this.props;
      let ids = [];
      indexsToDelete.map((i) => {
        return ids.push(data[i].id);
      });
      deleteRequestControl(ids);
    };

    handleOnDetails = (index) => {
      const { detailRequestControl, currentUser } = this.props;
      let control = this.state.data[index];
      detailRequestControl({
        controlId: control.id,
        userId: currentUser.id,
      });
      this.setState({
        isEdit: false,
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

    handleCloseEditModal = () => {
      this.setState((prevState) => ({ ...prevState, openEditControl: false }));
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
      localStorage.setItem("controlsColumns", JSON.stringify(modifiedColumns));
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

    render() {
      const {
        data,
        isDesktop,
        columns,
        isLoadingNewData,
        dataCount,
        indexsToDelete,
        controlEdit,
        openEditControl,
        isEdit,
        searchText,
        isSearching,
        openDialogDeleteConfirm,
        closeModal,
      } = this.state;
      return (
        <Component
          page={page}
          data={data}
          isDesktop={isDesktop}
          columns={columns}
          isLoadingNewData={isLoadingNewData}
          dataCount={dataCount}
          indexsToDelete={indexsToDelete}
          controlEdit={controlEdit}
          openEditControl={openEditControl}
          isEdit={isEdit}
          isSearching={isSearching}
          searchText={searchText}
          rowsPerPage={rowsPerPage}
          closeModal={closeModal}
          openDialogDeleteConfirm={openDialogDeleteConfirm}
          onTableChange={this.onTableChange}
          handleOnEdit={this.handleOnEdit}
          loadData={this.loadData}
          handleCloseEditModal={this.handleCloseEditModal}
          handleCloseDeleteConfirm={this.handleCloseDeleteConfirm}
          handleOpenDeleteConfirm={this.handleOpenDeleteConfirm}
          handleOnDetails={this.handleOnDetails}
          closeModalFalse={this.closeModalFalse}
          handleOnDelete={this.handleOnDelete}
        />
      );
    }
  });

const mapStateToProps = ({ Control, User }) => {
  return {
    controls: Control,
    dataCount: Control.dataCount,
    isSearching: Control.isSearching,
    isLoading: Control.loading,
    isLoadingNewData: Control.isLoadingNewData,
    isDeleted: Control.isDeleted,
    currentUser: User.currentUser,
    error: Control.error,
    isEditSuccess: Control.isEditSuccess,
    successGetPerson: Control.successGetPerson,
  };
};

const mapDispatchToProps = {
  requestControls: requestControls,
  detailRequestControl: detailRequestControl,
  deleteRequestControl: deleteRequestControl,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withTranslation(),
  withControls
);
