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
import { requestDocumentTypeById } from "../../actions/Aludoc/documentType_action";
import {
  requestDocumentFiles,
  requestDocuments,
  requestDocumentById,
  requestDeleteDocuments,
} from "../../actions/Aludoc/documents_action";
import { isNullOrUndefined } from "util";
import { withTranslation } from "react-i18next";
import { debounce } from "throttle-debounce";

let page = 0;
let rowsPerPage = 10;
let activeColumnSort = 0;
let order = "asc";

const withDocuments = (Component) =>
  (class extends React.Component {
    constructor(props) {
      super(props);
      const { t } = props;
      this.state = {
        isLoading: true,
        isLoadingNewData: false,
        receiveFile: false,
        isSearching: false,
        columns: this.translateColumns(t),
      };

      this.changeSearchDebounce = debounce(300, (value) =>
        this.changeSearch(value)
      );
    }
    componentDidUpdate(prevProps, prevState) {
      // const { documentId } = this.props;
      if (prevState.document !== this.state.document) {
        if (this.state.reqEdit && this.state.document.documentTypeObject) {
          this.setState({
            documentOnEdit: this.state.document,
            isEdit: true,
          });
        }
      }

      if (prevState.language !== this.state.language) {
        this.setState({
          ...prevState,
          columns: this.translateColumns(this.props.t),
        });
      }
      if (
        this.state.successDocByID &&
        this.state.successDocByID !== prevState.successDocByID
      ) {
        this.setState({
          documentOnDetails: this.state.docById,
        });
      }
      if (
        this.state.successDocs &&
        this.state.successDocs !== prevState.successDocs
      ) {
        this.setState({
          data: this.state.info.data,
          dataCount: this.state.info.dataCount,
          isLoading: false,
          isLoadingNewData: false,
          isSearching: this.state.searchText !== prevState.searchText,
        });
        //if (this.state.searchText !== prevState.searchText) this.loadData(false);
      }
      if (
        this.state.successRequestDTById &&
        this.state.successRequestDTById !== prevState.successRequestDTById
      ) {
        this.setState((prevState) => ({
          document: {
            ...prevState.document,
            documentTypeObject: this.state.doc.data,
          },
        }));

        this.props.requestDocumentFiles(this.state.document.id);
      }
      if (
        this.state.successDelete &&
        this.state.successDelete !== prevState.successDelete
      ) {
        this.setState({
          openDialogConfirmDelete: undefined,
          isSuccess: true,
        });
        this.loadData(true);
        SnackbarHandler.showMessage(this.props.t("successDeleteDocuments"));
      }
    }
    static getDerivedStateFromProps(nextProps, prevState) {
      let newValues = {};
      const {
        successDocs,
        info,
        successRequestDTById,
        successDocByID,
        docById,
        doc,
        successDelete,
      } = nextProps;
      if (
        nextProps.isLoading !== prevState.isLoading ||
        nextProps.successCreate !== prevState.successCreate ||
        nextProps.documentFiles !== prevState.document.documentFiles ||
        nextProps.i18n.language !== prevState.language ||
        nextProps.successDocs !== prevState.successDocs ||
        nextProps.info !== prevState.info ||
        successRequestDTById !== prevState.successRequestDTById ||
        doc !== prevState.doc ||
        successDocByID !== prevState.successDocByID ||
        docById !== prevState.docById ||
        successDelete !== prevState.successDelete
      ) {
        newValues.elements = nextProps.elements;
        newValues.successCreate = nextProps.successCreate;
        newValues.document = {
          ...prevState.document,
          documentFiles: nextProps.documentFiles,
        };
        newValues.language = nextProps.i18n.language;
        return {
          newValues,
          successDocs,
          info,
          successRequestDTById,
          doc,
          successDocByID,
          docById,
          successDelete,
        };
      }
      return null;
    }
    handleCloseEdit = () => {
      this.setState({
        documentOnEdit: undefined,
        isEdit: false,
        reqEdit: false,
      });
    };

    handleCloseDetails = () => {
      this.setState({
        documentOnDetails: undefined,
      });
    };

    translateColumns = (t) => {
      const isDesktop = window.innerWidth > 900;
      return [
        {
          label: t("name"),
          name: "name",
          options: {
            display: isDesktop,
            filter: true,
            sort: true,
            searchable: false,
            sortDirection: activeColumnSort === 0 ? order : "none",
          },
        },
        {
          label: t("Type"),
          name: "documentTypeName",
          options: {
            filter: true,
            sort: true,
            sortDirection: activeColumnSort === 1 ? order : "none",
          },
        },
        {
          label: t("expeditionDate"),
          name: "issuedDate",
          options: {
            filter: true,
            sort: true,
            display: isDesktop,
            sortDirection: activeColumnSort === 2 ? order : "none",
            customBodyRender: (data) => {
              return (
                <Typography>
                  {new Intl.DateTimeFormat("es-ES", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    //hour: "2-digit",
                    // minute: "2-digit",
                    // hour12: false
                  }).format(Date.parse(data))}
                </Typography>
              );
            },
          },
        },
        {
          label: t("expirationDate"),
          name: "expirationDate",
          options: {
            filter: true,
            sort: true,
            sortDirection: activeColumnSort === 3 ? order : "none",
            customBodyRender: (data) => {
              return (
                <Typography>
                  {new Intl.DateTimeFormat("es-ES", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    // hour: "2-digit"
                    //minute: "2-digit",
                    //hour12: false
                  }).format(Date.parse(data))}
                </Typography>
              );
            },
          },
        },
        {
          label: t("status"),
          name: "status",
          options: {
            filter: true,
            sort: false,
            sortDirection: activeColumnSort === 4 ? order : "none",
            customBodyRender: (data) => {
              const { classes } = this.props;
              return (
                <ListItem>
                  <ListItemIcon
                  // title={this.state.SelectedStateOption[data.status].label}
                  >
                    <PointIcon
                      style={
                        data === 0
                          ? { color: "#437043" }
                          : data === 1
                          ? { color: "#e66b00" }
                          : { color: "#743631" }
                      }
                    />
                  </ListItemIcon>
                  {isDesktop && (
                    <ListItemText
                      inset
                      primary={
                        data === 0
                          ? t("correct")
                          : data === 1
                          ? t("toReview")
                          : data === 2
                          ? t("Rejected")
                          : t("Expired")
                      }
                    />
                  )}
                </ListItem>
              );
            },
          },
        },
      ];
    };

    componentDidMount() {
      NavBarAludoc.hideLoader();
      this.updateScreenMode();
      const { columns } = this.state;
      const { enterprise, register, documentId } = this.props;

      if (documentId) {
        this.props.requestDocumentById(documentId);
      }
      NavBarAludoc.hideLoader();
      let reference = !isNullOrUndefined(enterprise) ? "enterprise" : "person";
      let id = !isNullOrUndefined(enterprise) ? enterprise.id : register.id;

      this.props.requestDocuments({
        start: page * rowsPerPage,
        length: rowsPerPage,
        order: columns[activeColumnSort].name + " " + order,
        search: "",
        id: id,
        reference: reference,
      });
    }

    updateScreenMode = () => {
      this.setState({ isDesktop: window.innerWidth > 900 });
    };

    componentWillUnmount = () => {
      window.removeEventListener("resize", this.updateScreenMode);
    };

    loadData = (contentLoader, isSearch) => {
      const { columns, searchText } = this.state;
      const { enterprise, register } = this.props;

      let reference = !isNullOrUndefined(enterprise) ? "enterprise" : "person";
      let id = !isNullOrUndefined(enterprise) ? enterprise.id : register.id;

      if (contentLoader) this.setState({ isLoadingNewData: true });
      this.props.requestDocuments({
        start: isSearch ? 0 : page * rowsPerPage,
        length: rowsPerPage,
        order: columns[activeColumnSort].name + " " + order,
        search: searchText ? searchText : "",
        id: id,
        reference: reference,
      });

      this.props.updateParent();
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

      this.loadData(true, true);
    };

    onChangeSearch = (text) => {
      let value = text ? text : "";
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

    handleOnEdit = (index) => {
      this.setState({
        document: this.state.data[index],
        reqEdit: true,
      });

      this.props.requestDocumentTypeById(this.state.data[index].documentType);
    };

    handleOnDetails = (index) => {
      let document = this.state.data[index];
      this.setState({
        documentOnDetails: document,
      });
    };

    handleOnDelete = (indexs) => {
      const { data } = this.state;
      let documentToDelete = [];
      indexs.map((i) => {
        return documentToDelete.push(data[i].id);
      });
      this.setState({
        documentToDelete: documentToDelete,
        openDialogConfirmDelete: true,
      });
    };
    closeDeleteDialog = () => {
      this.setState({ openDialogConfirmDelete: false });
    };

    cancelDeleteDialog = () => {
      this.setState({
        openDialogConfirmDelete: undefined,
        documentsToDelete: {},
      });
    };

    handleConfirmDelete = () => {
      const { documentToDelete } = this.state;
      this.props.requestDeleteDocuments(documentToDelete);
    };

    render() {
      const {
        dataCount,
        columns,
        isLoading,
        data,
        isLoadingNewData,
        documentOnEdit,
        documentOnDetails,
        openDialogConfirmDelete,
        isDesktop,
        searchText,
        isSearching,
      } = this.state;
      return (
        <Component
          columns={columns}
          isLoading={isLoading}
          searchText={searchText}
          isSearching={isSearching}
          data={data}
          isLoadingNewData={isLoadingNewData}
          dataCount={dataCount}
          documentOnEdit={documentOnEdit}
          documentOnDetails={documentOnDetails}
          isDesktop={isDesktop}
          openDialogConfirmDelete={openDialogConfirmDelete}
          cancelDeleteDialog={this.cancelDeleteDialog}
          handleConfirmDelete={this.handleConfirmDelete}
          closeDeleteDialog={this.closeDeleteDialog}
          handleOnDetails={this.handleOnDetails}
          handleOnEdit={this.handleOnEdit}
          handleOnDelete={this.handleOnDelete}
          onTableChange={this.onTableChange}
          handleCloseEdit={this.handleCloseEdit}
          handleCloseDetails={this.handleCloseDetails}
          loadData={this.loadData}
        />
      );
    }
  });

const mapStateToProps = ({ Document, DocumentType }) => {
  return {
    isLoading: Document.isLoading,
    createSuccess: Document.createSuccess,
    documentFiles: Document.documentFiles,
    successDocs: Document.successDocs,
    loadingDoc: Document.loadingDoc,
    info: Document.info,
    successRequestDTById: DocumentType.successRequestDTById,
    doc: DocumentType.doc,
    successDocByID: Document.successDocByID,
    docById: Document.docById,
    successDelete: Document.successDelete,
  };
};

const mapDispatchToProps = {
  requestDocumentFiles: requestDocumentFiles,
  requestDocuments: requestDocuments,
  requestDocumentTypeById: requestDocumentTypeById,
  requestDocumentById: requestDocumentById,
  requestDeleteDocuments: requestDeleteDocuments,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withTranslation(),
  withDocuments
);
