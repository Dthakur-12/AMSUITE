import {
  Button,
  Dialog,
  DialogActions,
  DialogContentText,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import DialogTitle from "@mui/material/DialogTitle";
import LinearProgress from "@mui/material/LinearProgress";

import { withStyles } from '@mui/styles';
import MUIDataTable from "mui-datatables";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { isNullOrUndefined } from "util";
import CustomToolbarSelect from "../../../Shared/DataTable/CustomToolBarSelect";
import TableSkeletonLoader from "../../../Shared/TableSkeletonLoader";

import DocumentDetails from "./DetailsDocument";
import DocumentForm from "./NewDocument";
import { withTranslation } from "react-i18next";
import {
  requestDocumentFiles,
  requestDocuments,
  requestDocumentById,
  requestDeleteDocuments,
} from "../../../../actions/Aludoc/documents_action";
import { requestDocumentTypeById } from "../../../../actions/Aludoc/documentType_action";
import { connect } from "react-redux";
import styles from "../../../../assets/styles/Aludoc_styles/Document_styles/documentsStyles.js";

import withNewDocument from "../../../../core/Aludoc/withNewDocument";

let page = 0;
let rowsPerPage = 10;
let activeColumnSort = 0;
let order = "asc";

const NewDocumentWrapper = withNewDocument(DocumentForm);

class Documents extends Component {
  constructor(props) {
    super(props);
    const { t } = props;
    this.state = {};
  }

  render() {
    const {
      classes,
      t,
      theme,
      columns,
      isLoading,
      data,
      isLoadingNewData,
      dataCount,
      documentOnEdit,
      documentOnDetails,
      isDesktop,
      openDialogConfirmDelete,
      handleOnDetails,
      handleOnEdit,
      handleOnDelete,
      onTableChange,
      closeDeleteDialog,
      handleCloseEdit,
      loadData,
      handleCloseDetails,
      handleConfirmDelete,
      cancelDeleteDialog,
    } = this.props;
    const options = {
      searchText: this.props.searchText ? this.props.searchText : "",
      filterType: "dropdown",
      // responsive: "block",
      responsive: "scrollFullHeight",
      showResponsive: true,
      selectableRowsOnClick: true,
      serverSide: true,
      rowsPerPage: rowsPerPage,
      print: isDesktop,
      count: dataCount,
      //onRowClick: this.onRowClicked,
      search: true,
      viewColumns: isDesktop,
      page: page,
      download: false,
      filter: false,
      customToolbarSelect: (selectedRows) => (
        <CustomToolbarSelect
          selectedRows={selectedRows}
          onDetails={handleOnDetails}
          onEdit={handleOnEdit}
          onDelete={handleOnDelete}
        />
      ),
      customToolbar: () => {
        return (
          <LinearProgress
            style={{
              opacity: this.props.isSearching ? "1" : "0",
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
      onTableChange: onTableChange,
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
      (<div style={{ width: "100%", padding: "12px" }}>
        <MUIDataTable
          title={t("AssociatedDocuments")}
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
          open={!isNullOrUndefined(documentOnEdit)}
          onClose={handleCloseEdit}
          maxWidth="md"
          scroll="body"
          style={{ width: "105%" }}
        >
          <NewDocumentWrapper
            isDialog
            updateParent={() => loadData(true)}
            onClose={handleCloseEdit}
            onCreate={() => handleCloseEdit}
            initValues={documentOnEdit}
            // enterprise={enterprise}
            // person={person}
            // vehicle={vehicle}
            isEdit
          />
        </Dialog>
        <Dialog
          open={!isNullOrUndefined(documentOnDetails)}
          onClose={handleCloseDetails}
          maxWidth="md"
          scroll="body"
          style={{ width: "100%" }}
        >
          <DocumentDetails
            isDialog
            updateParent={() => loadData(true)}
            onCreate={handleCloseDetails}
            initValues={documentOnDetails}
          />
        </Dialog>
        <Dialog
          open={openDialogConfirmDelete}
          onClose={closeDeleteDialog}
          className={classes.confirmDialog}
        >
          <DialogTitle>{t("deleteDocument")}</DialogTitle>

          <DialogContentText
            className={classes.confirmDialog}
            style={{ display: "flex", justifyContent: "center" }}
          >
            {t("youSureDeleteDocuments")}
          </DialogContentText>
          <DialogActions>
            <Button
              onClick={() => cancelDeleteDialog()}
              style={{ color: theme.palette.text.main }}>
              {t("cancel")}
            </Button>
            <Button
              onClick={handleConfirmDelete}
              color="primary"
              variant="contained"
            >
              {t("accept")}
            </Button>
          </DialogActions>
        </Dialog>
      </div>)
    );
  }
}

Documents.propTypes = {
  classes: PropTypes.object.isRequired,
};

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

const DocumentsConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(Documents);

export default withTranslation()(
  withStyles(styles, { withTheme: true })(DocumentsConnected)
);
