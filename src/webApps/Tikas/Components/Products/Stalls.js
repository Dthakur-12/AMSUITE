import React from "react";
import TableSkeletonLoader from "../../../Shared/TableSkeletonLoader";
import PropTypes from "prop-types";
import { withStyles } from '@mui/styles';
import LinearProgress from "@mui/material/LinearProgress";
import MUIDataTable from "mui-datatables";
import CircularProgress from "@mui/material/CircularProgress";
import NewStall from "./NewStall";
import { Slide, Dialog, ListItemIcon } from "@mui/material";
import Plus from "@mui/icons-material/Add";
import Fade from "@mui/material/Fade";
import { Link, Redirect} from "react-router-dom";
import { Activity, Entities } from "../../../../utils/Enums";
import Fab from "@mui/material/Fab";
import { isNullOrUndefined } from "util";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { withTranslation } from "react-i18next";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import styles from "../../../../assets/styles/Mustering_styles/Activity_styles/activityStyles";
import withStalls from "../../../../core/Tikas/withStalls";
import { compose } from "redux";
import CustomToolbarSelect from "../../../Shared/DataTable/CustomToolBarSelect";
import ProductForm from "./newProduct";
import Tooltip from "@mui/material/Tooltip";

function Transition(props) {
  return <Slide direction="down" {...props} />;
}
const Stalls = (props) => {
  const {
    classes,
    t,
    data,
    columns,
    isLoading,
    isLoadingNewData,
    dataCount,
    isDesktop,
    isSearching,
    onTableChange,
    page,
    rowsPerPage,
    handleOnEdit,
    handleOpenDeleteConfirm,
    handleOnDetails,
    stallId,
    isDetails,
    isEdit,
    openDialogDeleteConfirm,
    indexsToDelete,
    intervalList,
    newStall,
    handleCloseEditModal,
    openEdit,
    handleCloseDeleteConfirm,
    handleOnDelete,
    theme,
    searchText,
    openDetails,
    loadData,
    openNewStall,
    openCreateStall,
    handleAdd,
    handleCloseProductOnCreate,
    productOnCreate,
    handleCloseNewStall,
    handleLicence,
  } = props;
  const options = {
    filterType: "dropdown",
    responsive: "scrollFullHeight",
    selectableRowsOnClick: true,
    serverSide: true,
    rowsPerPage: rowsPerPage,
    count: dataCount,
    //onRowClick: this.onRowClicked,
    search: true,
    searchText: searchText,
    page: page,
    download: false,
    filter: false,
    print: isDesktop,
    viewColumns: isDesktop,
    // onRowsSelect: (selectedRows, selected) => {
    //   if (selected.length === 0) this.setState({ hideSearch: false });
    //   else {
    //     this.setState({ hideSearch: true });
    //   }
    // },
    customToolbarSelect: (selectedRows) => {
      return (
        <CustomToolbarSelect
          onEdit={handleOnEdit}
          onDelete={handleOpenDeleteConfirm}
          selectedRows={selectedRows}
          onDetails={handleOnDetails}
          isDesktop={isDesktop}
        />
      );
    },
    customToolbar: () => {
      return (
        <LinearProgress
          style={{
            opacity: isSearching ? "1" : "0",
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
    <div>
      {isLoadingNewData ? (
        <div className={classes.skeletonLoader}>
          <TableSkeletonLoader />
        </div>
      ) : (
        <div style={{ margin: 20 }}>
          <MUIDataTable
            title={t("Stalls")}
            data={data}
            columns={columns}
            options={options}
          />
          <Fade in={isLoadingNewData} className={classes.contentLoader}>
            <div
              style={{ pointerEvents: isLoadingNewData ? "inherit" : "none" }}
            >
              <CircularProgress
                className={classes.circularProgress}
                size={50}
              />
            </div>
          </Fade>

          <div className={classes.bottomActions}>
            {handleLicence([Entities.PRODUCTS.toString()], Activity.CREATE) && (
              <Tooltip title={t("NewProduct")} placement="top-start">
                <Fab
                  color="primary"
                  aria-label="Report"
                  className={classes.fab}
                  onClick={handleAdd}
                >
                  <Plus style={{ fontSize: "3em" }} name="filter" />
                </Fab>
              </Tooltip>
            )}

            {handleLicence([Entities.REPORTS_TIKAS.toString()]) && (
              <Tooltip title={t("NewStall")} placement="top-start">
                <Fab
                  color="primary"
                  aria-label="Report"
                  className={classes.fab}
                  onClick={openNewStall}
                >
                  <span style={{ fontSize: "3em" }} class="material-icons">
                    add_business
                  </span>
                </Fab>
              </Tooltip>
            )}
          </div>

          <Dialog
            open={!isNullOrUndefined(productOnCreate)}
            onClose={handleCloseProductOnCreate}
            maxWidth="md"
            fullWidth
            scroll="paper"
          >
            <ProductForm
              isDialog
              updateParent={loadData}
              onCreate={handleCloseProductOnCreate}
            />
          </Dialog>
          <Dialog
            open={openCreateStall}
            onClose={handleCloseNewStall}
            maxWidth="md"
            fullWidth
            scroll="paper"
          >
            <NewStall
              isDialog
              updateParent={loadData}
              onCreate={handleCloseNewStall}
            />
          </Dialog>

          <Dialog
            open={openEdit || openDetails}
            TransitionComponent={Transition}
            onClose={handleCloseEditModal}
            maxWidth="md"
            fullWidth
            scroll="paper"
          >
            <NewStall
              isDialog
              isEdit={isEdit}
              intervalList={intervalList}
              initValues={newStall}
              isDetails={isDetails}
              onCreate={handleCloseEditModal}
              updateParent={loadData}
            />
          </Dialog>
          <Dialog
            open={openDialogDeleteConfirm}
            onClose={handleCloseDeleteConfirm}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title" style={{ fontWeight: "bold" }}>
              {t("DeleteStall")}
            </DialogTitle>
            <DialogContent>
              {!isNullOrUndefined(indexsToDelete) &&
                indexsToDelete.length === 1 && (
                  <DialogContentText id="alert-dialog-description">
                    {t("DeleteStallText")}
                  </DialogContentText>
                )}
              {!isNullOrUndefined(indexsToDelete) &&
                indexsToDelete.length > 1 && (
                  <DialogContentText id="alert-dialog-description">
                    {t("DeleteStallsText")}
                  </DialogContentText>
                )}
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handleCloseDeleteConfirm}
                style={{ fontWeight: "bold" }}
                style={{ color: theme.palette.text.main }}
              >
                {t("cancel")}
              </Button>
              <Button
                onClick={handleOnDelete}
                style={{ fontWeight: "bold" }}
                autoFocus
                color="primary"
                variant="contained"
              >
                {t("accept")}
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      )}
    </div>
  );
};

// Stalls.propTypes = {
//   classes: PropTypes.object.isRequired,
//   theme: PropTypes.object.isRequired,
// };

const enhance = compose(
  withTranslation(),
  withStyles(styles, { withTheme: true })
);

export default withStalls(enhance(Stalls));
