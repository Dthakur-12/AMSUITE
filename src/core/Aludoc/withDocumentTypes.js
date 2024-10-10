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
import moment from "moment";
import { isNullOrUndefined } from "util";
import {
  requestDocumentType,
  requestDeleteDocTypes,
  requestDocumentTypeById,
  requestCategories,
} from "../../actions/Aludoc/documentType_action";
import { withTranslation } from "react-i18next";
import { debounce } from "throttle-debounce";

let page = 0;
let rowsPerPage = 10;
let activeColumnSort = 0;
let order = "asc";

let categoryPage = 0;
let filterRowsPerPage = 10;

const withDocumentTypes = (Component) =>
  (class extends React.Component {
    constructor(props) {
      super(props);
      const { t } = props;

      this.state = {
        isLoading: true,
        isLoadingNewData: false,
        openDialogDeleteConfirm: false,
        indexsToDelete: undefined,
        isSearching: false,
        isDialog: false,
        isDetails: false,
        isEdit: false,
        searchText: "",
        selectedCategories: [],
        categories: [],
        dateTime: moment().format("MM/DD/YYYY HH:mm:ss"),
        columns: this.translateColumns(t, true),
        openFilters: false,
        categorySearchText: "",
        categoriesOffset: 0,
      };

      this.changeSearchDebounce = debounce(300, (value) =>
        this.changeSearch(value)
      );
      this.changeCategorySearchDebounce = debounce(300, (value) =>
        this.changeCategorySearch(value)
      );
      this.categoriesSelectedChangeDebounce = debounce(300, (value) =>
        this.loadData(false, false, page, rowsPerPage)
      );
    }
    static getDerivedStateFromProps(nextProps, prevState) {
      if (
        nextProps.i18n.language !== prevState.language ||
        //nextProps.isLoading != prevState.isLoading ||
        nextProps.data !== prevState.data ||
        nextProps.dataCount !== prevState.dataCount ||
        nextProps.successDeleteDT !== prevState.successDeleteDT ||
        nextProps.successRequestDTById !== prevState.successRequestDTById ||
        nextProps.doc !== prevState.doc ||
        nextProps.successDocType !== prevState.successDocType
      ) {
        return {
          language: nextProps.i18n.language,
          //  isLoading: nextProps.isLoading,
          successDeleteDT: nextProps.successDeleteDT,
          successRequestDTById: nextProps.successRequestDTById,
          doc: nextProps.doc,
          successDocType: nextProps.successDocType,
          data: nextProps.data,
          dataCount: nextProps.dataCount,
        };
      } else return null;
    }

    componentDidUpdate(prevProps, prevState) {
      const { t } = this.props;
      const { successDocType } = this.state;
      if (successDocType && successDocType !== prevState.successDocType) {
        this.setState({
          isLoadingNewData: false,
          isLoading: false,
          hideSearch: false,
          isSearching: this.state.searchText !== prevState.searchText,
        });
      }
      if (prevState.language !== this.state.language) {
        this.setState({
          ...prevState,
          columns: this.translateColumns(this.props.t, false),
        });
      }
      if (
        this.state.successDeleteDT &&
        this.state.successDeleteDT !== prevState.successDeleteDT
      ) {
        if (this.state.ids.length === 1)
          SnackbarHandler.showMessage(t("successDeleteDocumentType"));
        else SnackbarHandler.showMessage(t("successDeleteDocumentTypes"));
        this.setState({
          openDialogDeleteConfirm: false,
          indexsToDelete: undefined,
        });
        this.setState({ searchText: "", hideSearch: false });
        this.loadData(true, false, page, rowsPerPage);
      }
      if (this.state.isEdit !== prevState.isEdit) {
      }
      if (
        this.state.successRequestDTById &&
        this.state.successRequestDTById !== prevState.successRequestDTById
      ) {
        if (this.state.isEdit) {
          this.setState({
            documentTypeOnEdit: this.state.doc.data,
            isDialog: true,
          });
        }
        if (this.state.isDetails) {
          this.setState({
            documentTypeDetails: this.state.doc.data,
            isDialog: true,
          });
        }
      }
      if (
        this.state.selectedCategories.length !==
        prevState.selectedCategories.length
      ) {
        this.categoriesSelectedChangeDebounce();
      }
    }
    translateColumns = (t, initial) => {
      let colStorage = JSON.parse(localStorage.getItem("docTypeColumns"));
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
          name: "value",
          options: {
            filter: true,
            sort: true,
            search: false,
            sortDirection: activeColumnSort === 0 ? order : "none",
            display: isNullOrUndefined(columDisplay.value)
              ? true
              : columDisplay.value,
          },
        },
      ];
    };

    // translateColumns = (t) => {
    //   return [
    //     {
    //       label: t("name"),
    //       name: "value",
    //       options: {
    //         filter: true,
    //         sort: true,
    //         search: false,
    //         sortDirection: activeColumnSort === 0 ? order : "none",
    //       },
    //     },
    //   ];
    // };

    componentWillUnmount() {
      window.removeEventListener("resize", this.updateScreenMode);
    }

    updateScreenMode = () => {
      this.setState({ isDesktop: window.innerWidth > 900 });
    };

    componentDidMount() {
      const { columns, searchText } = this.state;
      this.updateScreenMode();
      const datatable = {
        start: page * rowsPerPage,
        length: rowsPerPage,
        order: columns[activeColumnSort].name + " " + order,
        search: searchText,
      };
      NavBarAludoc.hideLoader();
      this.loadCategories();
      this.props.requestDocumentType(datatable);
    }

    loadCategories = () => {
      this.props.requestCategories({
        url: "/Aludoc/Categories/GetCategories",
        method: "GET",
        start: this.state.categoriesOffset,
        length: 10,
        order: "",
        search: this.state.categorySearchText,
      });
    };

    loadData = (contentLoader, isSearch, page = 0, rowsPerPage = 10) => {
      const { columns, searchText } = this.state;
      if (contentLoader) this.setState({ isLoadingNewData: true });
      const datatable = {
        start: isSearch ? 0 : page * rowsPerPage,
        length: rowsPerPage,
        order: columns[activeColumnSort].name + " " + order,
        search: searchText ? searchText : "",
        auxiliarList: this.state.selectedCategories,
      };
      this.props.requestDocumentType(datatable);
    };

    changePage = (newPage) => {
      page = newPage;
      this.loadData(true, false, newPage, rowsPerPage);
    };

    changeRowsPerPage = (newRowsPerPage) => {
      if (newRowsPerPage !== rowsPerPage) {
        rowsPerPage = newRowsPerPage;
        this.loadData(true, false, 0, newRowsPerPage);
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
      let documentType = this.props.data[index];

      this.props.requestDocumentTypeById(documentType.id);
      this.setState({ isEdit: true });
    };

    handleOnDelete = () => {
      const { indexsToDelete } = this.state;
      const { data } = this.props;

      let ids = [];
      indexsToDelete.map((i) => {
        return ids.push(data[i].id);
      });
      this.setState({
        ids: ids,
      });
      this.props.requestDeleteDocTypes(ids);
    };

    handleOnDetails = (index) => {
      let documentType = this.props.data[index];
      this.props.requestDocumentTypeById(documentType.id);
      this.setState({ isDetails: true });
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

    handleCloseDocTypeOnEdit = () => {
      this.setState({
        documentTypeOnEdit: undefined,
        isEdit: false,
        isDialog: false,
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

      localStorage.setItem("docTypeColumns", JSON.stringify(modifiedColumns));
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

    changeCategorySearch = (value) => {
      this.setState({
        isCategorySearching: true,
      });
      this.loadCategories();
    };
    handleChangeCategorySearch = (event) => {
      let value = event.currentTarget ? event.currentTarget.value : event.value;
      this.setState({
        categorySearchText: value,
        categoriesOffset: 0,
      });
      this.changeCategorySearchDebounce(value);
    };

    hideSerchTrue = () => {
      this.setState({ hideSearch: true });
    };
    hideSerchFalse = () => {
      this.setState({ hideSearch: false });
    };
    handleCloseDetails = () => {
      this.setState({
        documentTypeDetails: undefined,
        isDialog: false,
        isDetails: false,
      });
    };

    handleSelect = (id) => {
      const index = this.state.selectedCategories.indexOf(id);
      const newSelectedCategories = this.state.selectedCategories.slice();
      if (index === -1) newSelectedCategories.splice(0, 0, id);
      else newSelectedCategories.splice(index, 1);
      this.setState({
        selectedCategories: newSelectedCategories,
      });
    };

    handleButtonClick = () => {
      this.setState((prevState) => ({
        openFilters: !prevState.openFilters,
      }));
    };

    handlePageChange = (categoriesOffset, e) => {
      this.setState(
        {
          categoriesOffset,
        },
        () => {
          this.loadCategories();
        }
      );
    };

    render() {
      const {
        openDialogDeleteConfirm,
        searchText,
        isSearching,
        hideSearch,
        isDesktop,
        documentTypeOnEdit,
        documentTypeDetails,
        openFilters,
        columns,
        data,
        dataCount,
        isLoading,
        isLoadingNewData,
      } = this.state;

      return (
        <Component
          openDialogDeleteConfirm={openDialogDeleteConfirm}
          searchText={searchText}
          openFilters={openFilters}
          data={data}
          dataCount={dataCount}
          columns={columns}
          isDesktop={isDesktop}
          documentTypeDetails={documentTypeDetails}
          isSearching={isSearching}
          rowsPerPage={rowsPerPage}
          page={page}
          documentTypeOnEdit={documentTypeOnEdit}
          handleCloseDocTypeOnEdit={this.handleCloseDocTypeOnEdit}
          loadData={this.loadData}
          handleCloseDetails={this.handleCloseDetails}
          handleOnEdit={this.handleOnEdit}
          handleOnDetails={this.handleOnDetails}
          handleOnDelete={this.handleOnDelete}
          handleCloseDeleteConfirm={this.handleCloseDeleteConfirm}
          handleOpenDeleteConfirm={this.handleOpenDeleteConfirm}
          handleCloseDeleteConfirm={this.handleCloseDeleteConfirm}
          onTableChange={this.onTableChange}
          isLoading={isLoading}
          isLoadingNewData={isLoadingNewData}
        />
      );
    }
  });

const mapStateToProps = ({ DocumentType }) => {
  return {
    createSuccess: DocumentType.createSuccess,
    data: DocumentType.documentType,
    dataCount: DocumentType.documentTypeAllCount,
    successDeleteDT: DocumentType.successDeleteDT,
    loading: DocumentType.loading,
    successRequestDTById: DocumentType.successRequestDTById,
    doc: DocumentType.doc,
    successDocType: DocumentType.successDocType,
    categories: DocumentType.categories,
  };
};

const mapDispatchToProps = {
  requestDocumentType: requestDocumentType,
  requestDeleteDocTypes: requestDeleteDocTypes,
  requestDocumentTypeById: requestDocumentTypeById,
  requestCategories: requestCategories,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withTranslation(),
  withDocumentTypes
);
