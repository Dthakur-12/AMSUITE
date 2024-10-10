import React, { Component } from "react";
import { connect } from "react-redux";
import Switch from "@mui/material/Switch";
import PropTypes from "prop-types";
import { withStyles } from '@mui/styles';
import AssignEnterprise from "./AssignEnterprise";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import green from "@mui/material/colors/green";
import Button from "@mui/material/Button";
import NavBarAludoc from "../../utils/NavBarAludoc";
import LinearProgress from "@mui/material/LinearProgress";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import SnackbarHandler from "../../../../utils/SnackbarHandler";
import { withTranslation } from "react-i18next";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import DocumentTypeForm from "../Document/NewDocumentType";
import { isNullOrUndefined } from "util";
import { List, ListItemIcon, Dialog, Slide } from "@mui/material";
import Fab from "@mui/material/Fab";
import PlusIcon from "@mui/icons-material/AddRounded";
import IconButton from "@mui/material/IconButton";
import classnames from "classnames";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import ChevronIcon from "@mui/icons-material/ChevronRightRounded";
import DataTableDialogAction from "../../../Shared/DataTable/DataTableDialogAction";
import { requestPersons } from "../../../../actions/EasyAccess/Person_actions";
import FormControlLabel from "@mui/material/FormControlLabel";
import withNewDocumentType from "../../../../core/Aludoc/withNewDocumentType";
import Select from "react-select";
import components from "../../../Shared/ReactSelect";
import {
  requestDocumentType,
  getDocumentTypesByCompanies,
} from "../../../../actions/Aludoc/documentType_action";
import TablePagination from "@mui/material/TablePagination";
import styles from "../../../../assets/styles/Aludoc_styles/Control_styles/newControlStyles.js";

const NewDocumentTypeWrapper = withNewDocumentType(DocumentTypeForm);
function Transition(props) {
  return <Slide direction="down" {...props} />;
}

const mapDispatchToProps = {
  requestDocumentType: requestDocumentType,
  getDocumentTypesByCompanies: getDocumentTypesByCompanies,
  requestPersons: requestPersons,
};

let page = 0;
let rowsPerPage = 20;
let activeColumnSort = 0;
let order = "asc";

class NewControl extends Component {
  constructor(props) {
    super(props);
    const { initValues, currentUser, t } = props;
    const control = initValues
      ? {
          contractorCompany: initValues.contractorCompany.id,
          creationDate: initValues.creationDate,
          documentTypes: initValues.documentTypes,
          disableBadges: initValues.disableBadges,
          hiredCompany: initValues.hiredCompany
            ? initValues.hiredCompany.id
            : null,
          id: initValues.id,
          internal: initValues.internal,
          name: initValues.name,
          people: [],
        }
      : null;
    this.state = {
      typesSuggestions: [
        { value: 1, label: t("Person") },
        { value: 2, label: t("enterprise") },
      ],
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.success !== prevState.success ||
      nextProps.error !== prevState.error ||
      nextProps.errorText !== prevState.errorText ||
      nextProps.loading !== prevState.loading ||
      nextProps.isEditSuccess !== prevState.isEditSuccess ||
      // nextProps.initValues !== prevState.initValues ||
      nextProps.msjError !== prevState.msjError
    ) {
      return {
        msjError: nextProps.msjError,
        // initValues: nextProps.initValues,
        errorText: nextProps.errorText,
        success: nextProps.success,
        error: nextProps.error,
        loading: nextProps.loading,
        isEditSuccess: nextProps.isEditSuccess,
      };
    } else return null;
  }

  componentDidUpdate(prevProps, prevState) {
    const { success } = this.state;
    if (this.state.msjError && this.state.msjError !== prevState.msjError) {
      SnackbarHandler.showMessage(this.props.t("CompleteFields"), "error");
    }

    if (success && prevState.success !== success) {
      NavBarAludoc.appNavigation.history.replace("/mycontracts");
      SnackbarHandler.showMessage(this.props.t("successCreate"), "success");
    }
    if (
      this.state.isEditSuccess &&
      prevState.isEditSuccess !== this.state.isEditSuccess
    ) {
      NavBarAludoc.appNavigation.history.replace("/mycontracts");
      SnackbarHandler.showMessage(this.props.t("successEdit"), "success");
    }
    if (
      !this.state.loading &&
      this.state.error &&
      prevState.error !== this.state.error
    ) {
      if (this.props.errorText && this.props.errorText != "") {
        SnackbarHandler.showMessage(
          this.props.t(this.props.errorText),
          "error"
        );
      } else SnackbarHandler.showMessage(this.props.t("ServerError"), "error");
    }
    //   if (prevState.initValues !== this.state.initValues) {
    //     const initPeople = this.state.initValues.people.map((obj) => obj.id);
    //     this.setState({
    //       personsCount: this.state.initValues.peopleCount,
    //       persons: this.state.initValues.people,
    //       newControl: {
    //         ...prevState.newControl,
    //         people: initPeople,
    //       },
    //     });
    //   }
    //   if (this.props.closeModal) {
    //     this.props.onCreate();
    //     this.props.closeModalFalse();
    //   }
  }

  ViewNewControl = () => {
    const {
      classes,
      t,
      theme,
      handleChangeType,
      handleChange,
      changedisableBadges,
      newControl,
      formErrors,
      changeInternal,
      handleContractorCompanySelected,
      handleHiredCompanySelected,
      contractorCompany,
      handleChangeNextStep,
      handleChangeStep,
      hiredCompany,
      isCreating,
      isSuccess,
      isDesktop,
      errorNameAlreadyExist,
    } = this.props;
    const { typesSuggestions } = this.state;

    const selectStyles = {
      dropdownIndicator: (base) => ({
        ...base,
        color: theme.palette.text.main,
      }),
      input: (base) => ({
        ...base,
        color: theme.palette.text.main,
        "& input": {
          font: "inherit",
        },
        width: "100%",

        menuList: {
          maxHeight: 100,
        },
      }),
    };
    return (
      <Paper className={classes.paper} style={{ margin: 0, minWidth: "58%" }}>
        {/* <Avatar className={classes.avatar}>
           <BusinessIcon />
           </Avatar> */}
        <Typography component="h1" variant="h5">
          {!this.props.isEdit ? t("NewControl") : t("EditControl")}
        </Typography>
        <div style={{ width: "160px" }}>
          <Select
            classes={classes}
            styles={selectStyles}
            options={typesSuggestions}
            components={components}
            value={
              typesSuggestions &&
              typesSuggestions.map((option) =>
                option.value === newControl.type ? option : ""
              )
            }
            onChange={handleChangeType}
            placeholder={t("Type")}
            maxMenuHeight={200}
            // isLoading={isLoadingTypes}
            // isDisabled={isLoadingTypes}
          />
        </div>
        <Divider style={{ width: "100%", marginTop: 10, marginBottom: 24 }} />

        <TextField
          required
          label={t("name")}
          value={newControl.name}
          fullWidth
          onChange={handleChange}
          helperText={
            errorNameAlreadyExist ? t("NameAlreadyExist") : t("inputEmpty")
          }
          FormHelperTextProps={{
            style: {
              opacity: formErrors.name || errorNameAlreadyExist ? 1 : 0,
            },
          }}
          error={formErrors.name || errorNameAlreadyExist}
        />

        <FormControlLabel
          control={
            <Switch
              checked={newControl.disableBadges}
              onChange={changedisableBadges}
              value="screen"
              className={classes.switch}
              color="primary"
            />
          }
          labelPlacement="end"
          label={t("DisableBadges")}
          style={{
            cursor: "default",
            alignSelf: "flex-start",
            marginTop: -10,
            marginLeft: 0,
          }}
          //disabled={isDetails}
        />
        <Divider style={{ width: "100%", marginTop: 10, marginBottom: 24 }} />

        <AssignEnterprise
          handleContractorCompanySelected={handleContractorCompanySelected}
          handleHiredCompanySelected={handleHiredCompanySelected}
          contractorCompany={contractorCompany}
          hiredCompany={hiredCompany}
          internal={newControl.internal}
          changeInternal={changeInternal}
          isEditOrCreate={true}
          formErrors={formErrors}
        />

        <div className={classes.submit}>
          <Button
            variant="contained"
            color="primary"
            disabled={isCreating}
            onClick={() => handleChangeNextStep(1)}
            style={{
              background: isSuccess ? green[500] : undefined,
              color: theme.palette.text.main,
              marginRight: isDesktop ? 0 : "12%",
            }}
          >
            {`${t("Next")}`}
          </Button>
        </div>
      </Paper>
    );
  };

  viewAssignDocs = () => {
    const {
      classes,
      t,
      theme,
      handleChangeStep,
      handleChangeNextStep,
      newControl,
      handleOpenDocument,
      isEdit,
      documentTypes,
      documentTypesElem,
      handleEdit,
      handleCreate,
      showDocumentType,
      isCreating,
      handleExpandDocumentType,
      isSuccess,
      formErrors,
    } = this.props;

    return (
      (<Paper className={classes.paper} style={{ margin: 0, height: "40%" }}>
        <Typography component="h1" variant="h5">
          {`${t("DocumentsForControl")}: ${newControl.name}`}
        </Typography>
        <Divider style={{ width: "100%", marginTop: 10, marginBottom: 24 }} />
        <Typography
          component="h1"
          variant="subtitle1"
          className={
            formErrors && formErrors.documentTypes ? classes.withError : ""
          }
        >
          {`${t("SelectDocs")}`}
        </Typography>
        <List className={classes.listRoot}>
          <ListItem style={{ padding: 0 }}>
            <Fab
              size="small"
              onClick={handleOpenDocument}
              className={classes.fab}
            >
              <PlusIcon className={classes.fabIcon} />
            </Fab>
            <ListItemText
              inset
              primary={
                t("Documents") +
                (documentTypes.length !== 0 ? ": " + documentTypes.length : "")
              }
            />
            {
              <IconButton
                className={classnames(classes.expand, {
                  [classes.expandOpen]: showDocumentType,
                })}
                onClick={handleExpandDocumentType}
                size="large">
                <ExpandMore />
              </IconButton>
            }
          </ListItem>
          <Collapse in={showDocumentType} timeout="auto" unmountOnExit>
            <List dense component="div" disablePadding>
              {documentTypes.map((document, index) => (
                <ListItem key={index} className={classes.nested}>
                  <ListItemIcon>
                    <ChevronIcon />
                  </ListItemIcon>
                  <ListItemText inset primary={document.value} />
                </ListItem>
              ))}
            </List>
          </Collapse>
        </List>
        <div className={classes.submit}>
          <Button
            variant="contained"
            disabled={isCreating}
            onClick={() => handleChangeStep(0)}
            style={{
              marginRight: "3%",
              backgroundColor: theme.palette.textSecondary.main,
              color: theme.palette.background.main,
            }}
          >
            {`${t("Back")}`}
          </Button>

          {newControl.type === 1 ? (
            <Button
              variant="contained"
              color="primary"
              disabled={isCreating}
              onClick={() => handleChangeNextStep(2)}
              style={{
                background: isSuccess ? green[500] : undefined,
                color: theme.palette.text.main,
              }}
            >
              {`${t("Next")}`}
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={isEdit ? handleEdit : handleCreate}
              style={{
                background: isSuccess ? green[500] : undefined,
                color: theme.palette.text.main,
              }}
            >
              {`${t("confirm")}`}
            </Button>
          )}
        </div>
      </Paper>)
    );
  };

  ViewAssignPerson = () => {
    const {
      classes,
      t,
      isEdit,
      theme,
      handleChangeStep,
      newControl,
      handleOpenPerson,
      handleChangeRowsPerPage,
      handleChangePage,
      handleCreate,
      handleEdit,
      handlePersonSelected,
      persons,
      openDialogPerson,
      personsCount,

      originCompanies,
      isSuccess,
      showPerson,
      expandPersons,
      personsSelected,
      handleCloseDialogPerson,
      formErrors,
      pagePeople,
      rowsPerPagePeople,
      personToShow,
    } = this.props;
    return (
      (<Paper className={classes.paper} style={{ margin: 0 }}>
        <Typography component="h1" variant="h5">
          {`${t("ControlPersons")}: ${newControl.name}`}
        </Typography>
        <Divider style={{ width: "100%", marginTop: 10, marginBottom: 24 }} />
        <Grid
          container
          spacing={24}
          item
          xs={12}
          md={12}
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          <Grid item xs={12} md={12} style={{ paddingTop: 30 }}>
            <Typography
              component="h1"
              variant="subtitle1"
              className={
                formErrors && formErrors.people ? classes.withError : ""
              }
            >
              {`${t("SelectPersons")}`}
            </Typography>
            <Divider style={{ marginBottom: 10 }} />
            <List className={classes.listRoot}>
              <ListItem style={{ padding: 0 }}>
                <Fab
                  size="small"
                  className={classes.fab}
                  onClick={handleOpenPerson}
                >
                  <PlusIcon className={classes.fabIcon} />
                </Fab>
                <ListItemText inset primary={`${t("Persons")}`} />
                {
                  <IconButton
                    className={classnames(classes.expand, {
                      [classes.expandOpen]: showPerson,
                    })}
                    onClick={expandPersons}
                    size="large">
                    <ExpandMore />
                  </IconButton>
                }
              </ListItem>
              <Collapse in={showPerson} timeout="auto" unmountOnExit>
                <List dense component="div" disablePadding>
                  {personToShow.map((person) => (
                    <ListItem key={personToShow.id} className={classes.nested}>
                      <ListItemIcon>
                        <ChevronIcon />
                      </ListItemIcon>
                      <ListItemText inset primary={person.name} />
                      <ListItemText primary={person.lastName} />
                    </ListItem>
                  ))}
                </List>
                {personsCount > 0 && (
                  <TablePagination
                    className={classes.tablePagination}
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={personsCount ? personsCount : 0}
                    labelRowsPerPage={`${t("show")} : `}
                    labelDisplayedRows={() =>
                      `${pagePeople * rowsPerPage + 1} - ${
                        personsCount < (pagePeople + 1) * rowsPerPage
                          ? personsCount
                          : (pagePeople + 1) * rowsPerPage
                      } ${t("of")} ${personsCount}`
                    }
                    rowsPerPage={rowsPerPagePeople}
                    page={pagePeople}
                    backIconButtonProps={{
                      "aria-label": "previous page",
                      value: "previous",
                    }}
                    nextIconButtonProps={{
                      "aria-label": "next page",
                      value: "next",
                    }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                )}
              </Collapse>
            </List>
          </Grid>
          <div
            className={classes.submit}
            style={{
              paddingTop: 30,
              position: "relative",
              display: "flex",
              width: "100%",
              flex: 1,
              flexDirection: "row",
              alignItems: "flex-end",
              justifyContent: "flex-end",
            }}
          >
            <Button
              variant="contained"
              //color="primary"
              onClick={() => handleChangeStep(1)}
              style={{
                // color: "white",
                marginRight: 15,
                backgroundColor: theme.palette.textSecondary.main,
                color: theme.palette.background.main,
              }}
            >
              {`${t("Back")}`}
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={isEdit ? handleEdit : handleCreate}
              style={{
                background: isSuccess ? green[500] : undefined,
                color: theme.palette.text.main,
              }}
            >
              {`${t("confirm")}`}
            </Button>
          </div>
        </Grid>
        <DataTableDialogAction
          open={openDialogPerson}
          onConfirm={handlePersonSelected}
          onClose={handleCloseDialogPerson}
          title={t("Persons")}
          subTitle={t("SelectPersons")}
          extraData={originCompanies.filter((obj) => obj.id !== -1)}
          mdSubtitle={5}
          loadDataAction={this.props.requestPersons}
          rowsSelected={personsSelected}
          multipleSelect={true}
          success={this.props.successPrs}
          info={this.props.persons}
          loading={this.props.loadingPrs}
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
              name: t("LastName"),
              field: "lastname",
              options: {
                filter: true,
                sort: true,
              },
            },
          ]}
        />
      </Paper>)
    );
  };

  render() {
    const {
      classes,
      isDialog,
      isEdit,
      t,
      activeStep,
      originCompanies,
      handleChangeStep,
      handleChangeNextStep,
      originCompaniesObjs,
      onCreateDocument,
      handleDeleteDocumentType,
      handleDocumentTypeSelected,
      handleCloseDocumentType,
      saveNameForCreate,
      openDialogDocument,
      documentTypeOnCreate,
      isDesktop,
      openDialogNewDocumentType,
      isCreating,
      documentTypes,
      steps,
      handleOpenDialogNewDocType,
      handleCloseDialogNewDocType,
      newControl,
    } = this.props;
    const stepsFilter =
      newControl.type === 2 ? steps.filter((step) => step.step !== 2) : steps;
    return (
      <main
        style={{ width: "100%", maxWidth: "960px" }}
        className={!isDialog ? classes.layout : undefined}
      >
        <div
          className={
            !isDialog && isDesktop
              ? classes.fill
              : !isDialog && !isDesktop
              ? classes.fillMobile
              : undefined
          }
        >
          <LinearProgress
            style={{
              opacity: isCreating ? "1" : "0",
              width: "100%",
              background: "none",
              borderBottomLeftRadius: 50,
              borderBottomRightRadius: 50,
            }}
            variant="query"
          />
          {/* {isDesktop && !isEdit && (
            <Stepper
              alternativeLabel
              nonLinear
              activeStep={activeStep}
              style={{ backgroundColor: "transparent" }}
            >
              {stepsFilter.map((label, index) => {
                const stepProps = {};
                const buttonProps = {};
                return (
                  <Step key={label.name} {...stepProps}>
                    <StepButton
                      onClick={() => handleChangeStep(label.step)}
                      {...buttonProps}
                    >
                      {t(label.name)}
                    </StepButton>
                  </Step>
                );
              })}
            </Stepper>
          )} */}
          {activeStep === 0
            ? this.ViewNewControl()
            : activeStep === 2
            ? this.ViewAssignPerson()
            : this.viewAssignDocs()}
        </div>

        {activeStep === 1 && (
          <DataTableDialogAction
            open={openDialogDocument}
            onConfirm={handleDocumentTypeSelected}
            onClose={handleCloseDocumentType}
            title={t("Documents")}
            loading={this.props.loading}
            notViewColumns={true}
            subTitle={t("SelectDocuments")}
            loadDataAction={this.props.getDocumentTypesByCompanies}
            extraData={originCompanies.filter((oc) => oc !== -1)}
            rowsSelected={
              !isNullOrUndefined(documentTypes) ? documentTypes : []
            }
            noMatch={t("NoDocumentTypesFound")}
            dontLoad={originCompanies.filter((oc) => oc !== -1).length === 0}
            multipleSelect={true}
            optionalFunctionSearch={saveNameForCreate}
            enableCreate
            createData={{
              title: t("NewDocument"),
              onCreate: handleOpenDialogNewDocType,
            }}
            deleteDocumentType={handleDeleteDocumentType}
            success={this.props.successDTByCompanies}
            info={this.props.info}
            columns={[
              {
                name: t("name"),
                field: "value",
                options: {
                  filter: true,
                  sort: true,
                  sortDirection: "asc",
                },
              },
            ]}
          />
        )}

        <Dialog
          open={openDialogNewDocumentType}
          TransitionComponent={Transition}
          onClose={handleCloseDialogNewDocType}
          maxWidth="md"
          fullWidth
          scroll="paper"
        >
          <NewDocumentTypeWrapper
            isDialog
            isInModal
            onCreate={onCreateDocument}
            initValues={documentTypeOnCreate}
            inmutableSelectedEnterprises={originCompanies.filter(
              (oc) => oc !== -1
            )}
            inmutableSelectedEnterprisesObj={originCompaniesObjs()}
            isDetails={true}
            isNewCtrlDoc={true}
          />
        </Dialog>
      </main>
    );
  }
}

NewControl.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

const NewControlConnected = connect(null, mapDispatchToProps)(NewControl);

export default withTranslation()(
  withStyles(styles, { withTheme: true })(NewControlConnected)
);
