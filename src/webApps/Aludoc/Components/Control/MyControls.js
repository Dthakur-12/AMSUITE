import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from '@mui/styles';
import MUIDataTable from "mui-datatables";
import CircularProgress from "@mui/material/CircularProgress";
import LinearProgress from "@mui/material/LinearProgress";
import { Slide, Dialog, ListItemIcon } from "@mui/material";
import { isNullOrUndefined } from "util";
import {
  requestControls,
  detailRequestControl,
  deleteRequestControl,
} from "../../../../actions/Aludoc/controls_actions";
import CustomToolbarSelect from "../../../Shared/DataTable/CustomToolBarSelect";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import NewControl from "./NewControls";
import DetailsControl from "./DetailsControl";

import Fade from "@mui/material/Fade";
import styles from "../../../../assets/styles/Aludoc_styles/Control_styles/myControlStyles.js";
import { Link, Redirect, } from "react-router-dom";
import withRouter from "../../../AccessControl/Components/withRouter.js";
import AmSuiteNavBar from "../../../../utils/AmSuiteNavBar";
import withNewControl from "../../../../core/Aludoc/withNewControl";

const NewControlWrapper = withNewControl(NewControl);

function Transition(props) {
  return <Slide direction="down" {...props} />;
}

const MyControls = (props) => {
  const {
    classes,
    t,
    theme,
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
    handleOnEdit,
    handleOnDetails,
    handleOpenDeleteConfirm,
    rowsPerPage,
    loadData,
    handleCloseEditModal,
    handleCloseDeleteConfirm,
    page,
    closeModalFalse,
    handleOnDelete,
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
            opacity: props.isSearching ? "1" : "0",
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
    onTableChange: props.onTableChange,
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

  return (
    <div style={{ width: "100%", paddingTop: isDesktop ? "0%" : "4%" }}>
      {/* <Grid
          item
          style={{
            zIndex: 1,
            display: this.state.hideSearch ? "none" : "flex",
            position: "absolute",
            right: "10em"
          }}
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
                  >
                    <Icon
                      name="search"
                      link
                      style={{ margin: 0, color: theme.palette.text.main }}
                    />
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </Grid> */}
      <MUIDataTable
        title={t("myContracts")}
        data={data}
        columns={columns}
        options={options}
      />
      <Fade in={isLoadingNewData} className={classes.contentLoader}>
        <div style={{ pointerEvents: isLoadingNewData ? "inherit" : "none" }}>
          <CircularProgress className={classes.circularProgress} size={50} />
        </div>
      </Fade>
      {controlEdit &&
        (isEdit ? (
          <Dialog
            open={openEditControl}
            TransitionComponent={Transition}
            onClose={handleCloseEditModal}
            maxWidth="md"
            fullWidth
            scroll="paper"
          >
            <NewControlWrapper
              isDialog
              isEdit
              loadData={loadData}
              onCreate={handleCloseEditModal}
              closeModal={props.closeModal}
              closeModalFalse={closeModalFalse}
              initValues={controlEdit}
            />
          </Dialog>
        ) : (
          <Dialog
            open={openEditControl}
            TransitionComponent={Transition}
            onClose={handleCloseEditModal}
            maxWidth="md"
            fullScreen={!isDesktop}
            style={
              isDesktop ? { margin: 0 } : { margin: "22px", height: "85%" }
            }
            scroll="paper"
          >
            <DetailsControl
              isDialog
              isDesktop={isDesktop}
              isEdit={true}
              loadData={loadData}
              onCreate={handleCloseEditModal}
              closeModal={props.closeModal}
              closeModalFalse={closeModalFalse}
              initValues={controlEdit}
            />
          </Dialog>
        ))}

      <Dialog
        open={props.openDialogDeleteConfirm}
        onClose={handleCloseDeleteConfirm}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" style={{ fontWeight: "bold" }}>
          {t("DeleteControl")}
        </DialogTitle>
        <DialogContent>
          {!isNullOrUndefined(indexsToDelete) &&
            indexsToDelete.length === 1 && (
              <DialogContentText id="alert-dialog-description">
                {t("DeleteControlText1")}
              </DialogContentText>
            )}
          {!isNullOrUndefined(indexsToDelete) && indexsToDelete.length > 1 && (
            <DialogContentText id="alert-dialog-description">
              {t("DeleteControlText2")}
            </DialogContentText>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseDeleteConfirm}
            style={{ fontWeight: "bold", color: theme.palette.text.main }}
            // style={{ }}
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
  );
};

DocumentType.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = ({ Control, User }) => {
  return {
    controls: Control,
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

const connectMyControls = connect(
  mapStateToProps,
  mapDispatchToProps
)(MyControls);

export default withTranslation()(
  withStyles(styles, { withTheme: true })(withRouter(connectMyControls))
);
