import { Dialog, ListItem, ListItemIcon, Slide } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import CircularProgress from "@mui/material/CircularProgress";
import Fade from "@mui/material/Fade";
import IconButton from "@mui/material/IconButton";
import LinearProgress from "@mui/material/LinearProgress";
import { withStyles } from '@mui/styles';
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { compose } from "redux";

import CloseIcon from "@mui/icons-material/Close";
import MUIDataTable from "mui-datatables";
import PropTypes from "prop-types";
import withEnterprises from "../../../core/Aludoc/withEnterprises";

import React, { Component } from "react";
import { debounce } from "throttle-debounce";
import { isNullOrUndefined } from "util";
import CustomToolbarSelect from "../../Shared/DataTable/CustomToolBarSelect";
import TableSkeletonLoader from "../../Shared/TableSkeletonLoader";
import NavBarAludoc from "../utils/NavBarAludoc";
import FormDetailsEnterprise from "./Document/DetailsEnterprise";
import FormAddDocument from "./Document/NewDocument";
import withNewDocument from "../../../core/Aludoc/withNewDocument";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import styles from "../../../assets/styles/Aludoc_styles/enterpriseStyles.js";

let activeColumnSort = 0;
let order = "asc";

const NewDocumentWrapper = withNewDocument(FormAddDocument);

function Transition(props) {
  return <Slide direction="down" {...props} />;
}

const Enterprise = (props) => {
  const {
    classes,
    t,
    theme,
    data,
    columns,
    isLoading,
    isLoadingNewData,
    dataCount,
    isDesktop,
    enterpriseAddDocument,
    enterpriseOnEdit,
    handleOnDetails,
    handleaddDocument,
    onTableChange,
    isSearching,
    handleCloseEnterpriseAddDoc,
    searchText,
    handleCloseEnterpriseOnEdit,
    loadData,
    page,
    rowsPerPage,
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
    customToolbarSelect: (selectedRows) => (
      <CustomToolbarSelect
        selectedRows={selectedRows}
        onDetails={handleOnDetails}
        addDocument={handleaddDocument}
      />
    ),
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
    (<div style={{ width: "100%", paddingTop: isDesktop ? "0%" : "4%" }}>
      <MUIDataTable
        title={t("enterprises")}
        data={data}
        columns={columns}
        options={options}
      />
      <Fade in={isLoadingNewData} className={classes.contentLoader}>
        <div style={{ pointerEvents: isLoadingNewData ? "inherit" : "none" }}>
          <CircularProgress className={classes.circularProgress} size={50} />
        </div>
      </Fade>
      <Dialog
        open={!isNullOrUndefined(enterpriseAddDocument)}
        TransitionComponent={Transition}
        onClose={() => handleCloseEnterpriseAddDoc()}
        maxWidth="md"
        fullWidth
        scroll="paper"
      >
        <NewDocumentWrapper
          isDialog
          updateParent={() => loadData(true)}
          onCreate={() => handleCloseEnterpriseAddDoc()}
          enterprise={enterpriseAddDocument}
        />
      </Dialog>
      <Dialog
        open={!isNullOrUndefined(enterpriseOnEdit)}
        TransitionComponent={Transition}
        onClose={() => handleCloseEnterpriseOnEdit()}
        maxWidth="md"
        fullScreen
        scroll="paper"
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              onClick={() => handleCloseEnterpriseOnEdit()}
              aria-label="Close"
              size="large">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.flex}>
              {!isNullOrUndefined(enterpriseOnEdit) && enterpriseOnEdit.name}
            </Typography>
          </Toolbar>
        </AppBar>
        <FormDetailsEnterprise
          isDialog
          updateParent={() => loadData(true)}
          onCreate={() => handleCloseEnterpriseOnEdit()}
          initValues={enterpriseOnEdit}
          enterprise={enterpriseOnEdit}
        />
      </Dialog>
    </div>)
  );
};

Enterprise.propTypes = {
  classes: PropTypes.object.isRequired,
};

const enhance = compose(
  withTranslation(),
  withStyles(styles, { withTheme: true })
);
export default withEnterprises(enhance(Enterprise));
