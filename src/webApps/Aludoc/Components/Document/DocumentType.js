import React, { Component } from "react";
import Grid from "@mui/material/Grid";
import TableSkeletonLoader from "../../../Shared/TableSkeletonLoader";
import PropTypes from "prop-types";
import { withStyles } from '@mui/styles';
import FilterListIcon from "@mui/icons-material/FilterList";
import MUIDataTable from "mui-datatables";
import CircularProgress from "@mui/material/CircularProgress";
import LinearProgress from "@mui/material/LinearProgress";
import { Slide, Dialog } from "@mui/material";
import { isNullOrUndefined } from "util";
import DocumentTypeForm from "./NewDocumentType";
import DocumentTypeDetails from "./DetailsDocumentType";
import CustomToolbarSelect from "../../../Shared/DataTable/CustomToolBarSelect";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { withTranslation } from "react-i18next";
import { compose } from "redux";
import { connect } from "react-redux";
import styles from "../../../../assets/styles/Aludoc_styles/Document_styles/documentTypeStyles.js";
import FilterTable from "../../../Shared/Filters/FilterTable";
import Hidden from "@mui/material/Hidden";
import { default as classNames } from "classnames";
import Tooltip from "@mui/material/Tooltip";

import withDocumentTypes from "../../../../core/Aludoc/withDocumentTypes";
import withNewDocumentType from "../../../../core/Aludoc/withNewDocumentType";

const NewDocumentTypeWrapper = withNewDocumentType(DocumentTypeForm);
function Transition(props) {
  return <Slide direction="down" {...props} />;
}

let categoryPage = 0;

const DocumentType = (props) => {
  const {
    handleCloseDeleteConfirm,
    handleOnDelete,
    columns,
    isLoading,
    isLoadingNewData,
    documentTypeOnEdit,
    isDesktop,
    documentTypeDetails,
    indexsToDelete,
    filters,
    selectedFilters,
    handleCloseDetails,
    classes,
    t,
    dataCount,
    data,
    categories,
    theme,
    searchText,
    rowsPerPage,
    handleOnEdit,
    handleOpenDeleteConfirm,
    handleOnDetails,
    loadData,
    page,
    handleCloseDocTypeOnEdit,
    isSearching,
    onTableChange,
  } = props;

  const options = {
    filterType: "dropdown",
    responsive: "scrollFullHeight",
    selectableRowsOnClick: true,
    serverSide: true,
    search: true,
    searchText: searchText,
    rowsPerPage: rowsPerPage,
    count: dataCount,
    page: page,
    download: false,
    filter: false,
    print: isDesktop,
    viewColumns: isDesktop,

    // onRowsSelect: (selectedRows, selected) => {
    //   if (selected.length === 0) hideSerchFalse();
    //   else {
    //     hideSerchTrue();
    //   }
    // },
    customToolbarSelect: (selectedRows) => (
      //!this.state.hideSearch && this.setState({ hideSearch: true });

      (<CustomToolbarSelect
        onEdit={handleOnEdit}
        onDelete={handleOpenDeleteConfirm}
        selectedRows={selectedRows}
        onDetails={handleOnDetails}
      />)
    ),
    // customToolbar: () => {

    //     return (
    //       <LinearProgress
    //         style={{
    //           opacity: isSearching ? "1" : "0",
    //           width: "90%",
    //           background: "none",
    //           marginLeft: "-50%",
    //           padding: 0,
    //           position: "absolute",
    //           zIndex: 1,
    //         }}
    //         variant="query"
    //       />
    //     );
    // },
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
    <div style={{ width: "100%", paddingTop: isDesktop ? "0%" : "4%" }}>
      {/* <FilterTable
          items={
            categories
              ? categories.data.slice(categoryPage, categoryPage + 10)
              : []
          }
          itemCount={categories ? categories.dataCount : 0}
          selectedItems={this.state.selectedCategories}
          showProp="value"
          isLoadingData={this.state.isLoadingControls}
          onSelect={this.handleSelect}
          title={t("Categories")}
          open={this.state.openFilters}
          onButtonClick={this.handleButtonClick}
          onSearchChange={this.handleChangeCategorySearch}
          pageChange={this.handlePageChange}
        /> */}

      {/* <div
        className={classNames(
          classes.content,
          props.openFilters && classes.contentShift
        )}
      > */}
      {/* <div
            style={{ display: this.state.hideSearch ? "none" : "flex" }}
            className={classes.fab}
            style={{ marginTop: "2%" }}
          >
            <Tooltip title={t("Filter")} aria-label="Filter" placement="bottom">
              <IconButton circular onClick={this.handleButtonClick}>
                <FilterListIcon />
              </IconButton>
            </Tooltip>
          </div> */}

      <MUIDataTable
        title={t("DocumentTypes")}
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
      {/* </div> */}

      <Dialog
        open={!isNullOrUndefined(documentTypeOnEdit)}
        TransitionComponent={Transition}
        onClose={() => handleCloseDocTypeOnEdit()}
        maxWidth="md"
        fullWidth
        scroll="paper"
      >
        <NewDocumentTypeWrapper
          isDialog
          isEdit
          loadData={() => loadData()}
          onCreate={() => handleCloseDocTypeOnEdit()}
          initValues={documentTypeOnEdit}
        />
      </Dialog>
      <Dialog
        open={!isNullOrUndefined(documentTypeDetails)}
        TransitionComponent={Transition}
        onClose={() => handleCloseDetails()}
        maxWidth="md"
        fullWidth
        scroll="paper"
      >
        <DocumentTypeDetails
          isDialog
          isDetails
          onCreate={() => documentTypeDetails()}
          initValues={documentTypeDetails}
        />
      </Dialog>
      <Dialog
        open={props.openDialogDeleteConfirm}
        onClose={handleCloseDeleteConfirm}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" style={{ fontWeight: "bold" }}>
          {t("deleteDocumentType")}
        </DialogTitle>
        <DialogContent>
          {!isNullOrUndefined(indexsToDelete) &&
            indexsToDelete.length === 1 && (
              <DialogContentText id="alert-dialog-description">
                {t("youSureDeleteDocumentType")}
              </DialogContentText>
            )}
          {!isNullOrUndefined(indexsToDelete) && indexsToDelete.length > 1 && (
            <DialogContentText id="alert-dialog-description">
              {t("youSureDeleteDocumentTypes")}
            </DialogContentText>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseDeleteConfirm}
            style={{ fontWeight: "bold" }}
          >
            {t("cancel")}
          </Button>
          <Button
            onClick={handleOnDelete}
            style={{ fontWeight: "bold" }}
            autoFocus
          >
            {t("accept")}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

DocumentType.propTypes = {
  classes: PropTypes.object.isRequired,
};

const enhance = compose(
  withTranslation(),
  withStyles(styles, { withTheme: true })
);
export default withDocumentTypes(enhance(DocumentType));
