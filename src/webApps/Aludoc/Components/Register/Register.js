import { Dialog, Slide } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import CircularProgress from "@mui/material/CircularProgress";
import Fade from "@mui/material/Fade";
import IconButton from "@mui/material/IconButton";
import LinearProgress from "@mui/material/LinearProgress";
import { withStyles } from '@mui/styles';
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import MUIDataTable from "mui-datatables";
import PropTypes from "prop-types";
import { Component, default as React } from "react";
import { isNullOrUndefined } from "util";
import CustomToolbarSelect from "../../../Shared/DataTable/CustomToolBarSelect";
import TableSkeletonLoader from "../../../Shared/TableSkeletonLoader";
import FormDetailsRegister from "./DetailsRegister";
import FormAddDocument from "../Document/NewDocument";
import withNewDocument from "../../../../core/Aludoc/withNewDocument";
import { compose } from "redux";
import withRegisters from "../../../../core/Aludoc/withRegisters";

import { Entities, Activity } from "../../../../utils/Enums";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";

import styles from "../../../../assets/styles/Aludoc_styles/Register_styles/registerStyles.js";

let page = 0;
let rowsPerPage = 10;
let activeColumnSort = 0;
let order = "asc";

const NewDocumentWrapper = withNewDocument(FormAddDocument);

function Transition(props) {
  return <Slide direction="down" {...props} />;
}

const Register = (props) => {
  const {
    classes,
    t,
    theme,
    data,

    columns,
    isLoading,
    isDesktop,
    isLoadingNewData,
    dataCount,
    registerOnDetails,
    registerAddDocument,
    documentId,
    searchText,
    handleaddDocument,
    handleOnDetail,
    onTableChange,
    closeRegisterOnDetails,
    loadData,
    handleLicence,
    closeRegisterAddDoc,
    noVisualize,
  } = props;
  const options = {
    searchText: searchText ? searchText : "",
    filterType: "dropdown",
    responsive: "block",
    selectableRowsOnClick: true,
    serverSide: true,
    rowsPerPage: rowsPerPage,
    count: dataCount,
    //onRowClick: this.onRowClicked,
    search: true,
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
      //!this.state.hideSearch && this.setState({ hideSearch: true });
      return (
        <CustomToolbarSelect
          selectedRows={selectedRows}
          addDocument={
            handleLicence([Entities.DOCUMENTS.toString()], Activity.CREATE) &&
            handleaddDocument
          }
          onDetails={handleOnDetail}
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
    onTableChange: onTableChange,
    textLabels: {
      body: {
        noMatch: noVisualize
          ? t("DontHavePermissions")
          : t("dontSearchRegister"),
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
      {/* <Grid
          container
          hidden={true}
          style={{
            width: "70%",
            paddingLeft: 20,
            zIndex: 1,
            display: this.state.hideSearch ? "none" : "flex",
            position: "absolute"
          }}
        >
          <Grid
            item
            //xs={6}
            //md={1}
            // direction="column"
            // justify="flex-start"
            // alignItems="flex-start"
            style={{ width: "20 em" }}
          >
            <Typography
              style={{ fontSize: 24, paddingLeft: 10, paddingTop: 15 }}
            >
              {t("Registers")}
            </Typography>
          </Grid>

          <Grid
            item
            // direction="column"
            // justify="flex-start"
            // alignItems="flex-start"
            style={{
              paddingLeft: 15,
              width: "40 em"
            }}
          >
            <FormControl className={classes.textField}>
              <InputLabel htmlFor="adornment-password">Buscar...</InputLabel>
              <Input
                id="adornment-password"
                type={"text"}
                value={this.state.searchText}
                onChange={this.onChangeSearch}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      //style={{ padding: 0 }}
                      onClick={() =>
                        this.setState({ registerOnDetails: undefined })
                      }
                    >
                      <Icon
                        name="search"
                        //inverted
                        //circular
                        link
                        style={{ margin: 0 }}
                      />
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>
        </Grid> */}
      {/* 
        <Grid
          item
          // direction="column"
          // justify="flex-start"
          // alignItems="flex-start"
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
                    //style={{ padding: 0 }}
                    onClick={() =>
                      this.setState({ registerOnDetails: undefined })
                    }
                  >
                    <Icon
                      name="search"
                      //inverted
                      //circular
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
        // ref={e => (this.parent = e)}
        title={t("Registers")}
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
        open={!isNullOrUndefined(registerAddDocument)}
        TransitionComponent={Transition}
        onClose={() => closeRegisterAddDoc()}
        maxWidth="md"
        fullWidth
        scroll="paper"
      >
        <NewDocumentWrapper
          isDialog
          updateParent={() => loadData(true)}
          onCreate={() => closeRegisterAddDoc()}
          person={registerAddDocument}
        />
      </Dialog>
      <Dialog
        open={!isNullOrUndefined(registerOnDetails)}
        TransitionComponent={Transition}
        onClose={() => closeRegisterOnDetails()}
        maxWidth="md"
        fullScreen
        scroll="paper"
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              onClick={() => closeRegisterOnDetails()}
              aria-label="Close"
              size="large">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.flex}>
              {!isNullOrUndefined(registerOnDetails) && registerOnDetails.name}
            </Typography>
          </Toolbar>
        </AppBar>
        <FormDetailsRegister
          isDialog
          updateParent={() => loadData(true)}
          onCreate={() => closeRegisterOnDetails()}
          initValues={registerOnDetails}
          register={registerOnDetails}
          documentId={documentId}
        />
      </Dialog>
    </div>)
  );
};

Register.propTypes = {
  classes: PropTypes.object.isRequired,
};

const enhance = compose(
  withTranslation(),
  withStyles(styles, { withTheme: true })
);
export default withRegisters(enhance(Register));
