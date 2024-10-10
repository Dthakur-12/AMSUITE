import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withStyles } from '@mui/styles';
import AssignEnterprise from "./AssignEnterprise";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import green from "@mui/material/colors/green";
import Button from "@mui/material/Button";
import NavBarAludoc from "../../utils/NavBarAludoc";
import LinearProgress from "@mui/material/LinearProgress";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import { withTranslation } from "react-i18next";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import DocumentTypeForm from "../Document/NewDocumentType";

import { List, ListItemIcon, Dialog, Slide } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import classnames from "classnames";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import ChevronIcon from "@mui/icons-material/ChevronRightRounded";
import DataTableDialogAction from "../../../Shared/DataTable/DataTableDialogAction";
import TablePagination from "@mui/material/TablePagination";
import styles from "../../../../assets/styles/Aludoc_styles/Control_styles/detailsControlStyles.js";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import withDetailsControl from "../../../../core/Aludoc/withDetailsControl";
import { compose } from "redux";

function Transition(props) {
  return <Slide direction="down" {...props} />;
}

const DetailsControl = (props) => {
  const {
    classes,
    isDialog,
    isEdit,
    t,
    isDesktop,
    openDialogDocument,
    documentTypeOnCreate,
    openDialogNewDocumentType,
    openDialogPerson,
    theme,
    newControl,
    showDocumentType,
    documentTypes,
    contractorCompany,
    hiredCompany,
    isCreating,
    isSuccess,
    steps,
    personsCount,
    persons,
    successPrs,
    loadingPrs,
    isNewControl,
    handleChangeStep,
    showPerson,
    handleChangePage,
    handleChangeRowsPerPage,
    expandDocType,
    expandPersons,
    pagePeople,
    rowsPerPagePeople,
  } = props;
  const ViewNewControl = () => {
    return (
      (<Paper className={classes.paper} style={{ margin: 0 }}>
        <Typography component="h1" variant="h5">
          {newControl.name}
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
          <Grid item xs={12} md={12}>
            <Grid container spacing={24} item xs={12} md={12}>
              <Grid item xs={12} md={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={newControl.disableBadges}
                      value="screen"
                      className={classes.switch}
                      color="primary"
                    />
                  }
                  labelPlacement="end"
                  label={t("DisableBadges")}
                  style={{
                    cursor: "default",
                    marginTop: -10,
                    //  paddingTop: 20,
                  }}
                  //disabled={isDetails}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <Typography
                  style={{ alignSelf: "baseline" }}
                  component="h3"
                  variant="h5"
                >
                  {t("ControlledDocuments")}
                </Typography>
                <Divider
                  style={{ width: "100%", marginTop: 10, marginBottom: 14 }}
                />
                <List className={classes.listRoot}>
                  <ListItem style={{ padding: 0 }}>
                    <ListItemText inset primary={t("Documents")} />
                    {
                      <IconButton
                        className={classnames(classes.expand, {
                          [classes.expandOpen]: showDocumentType,
                        })}
                        //   disabled={newPerson.vehicles.length === 0}
                        onClick={expandDocType}
                        size="large">
                        <ExpandMore />
                      </IconButton>
                    }
                  </ListItem>
                  <Collapse in={showDocumentType} timeout="auto" unmountOnExit>
                    <List dense component="div" disablePadding>
                      {documentTypes.map((document) => (
                        <ListItem key={document.id} className={classes.nested}>
                          <ListItemIcon>
                            <ChevronIcon />
                          </ListItemIcon>
                          <ListItemText inset primary={document.value} />
                        </ListItem>
                      ))}
                    </List>
                  </Collapse>
                </List>
              </Grid>
            </Grid>
            <Grid style={{ minWidth: "58%" }}>
              <AssignEnterprise
                isDetails={true}
                //  handleContractorCompanySelected={
                //    this.handleContractorCompanySelected
                //   }
                //   handleHiredCompanySelected={handleHiredCompanySelected}
                contractorCompany={contractorCompany}
                hiredCompany={hiredCompany}
                internal={newControl.internal}
                // changeInternal={changeInternal}
              />
            </Grid>
          </Grid>
        </Grid>
        <div
          className={classes.submit}
          style={{
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
            color="primary"
            disabled={isCreating}
            onClick={() => handleChangeStep(false)}
            style={{
              background: isSuccess ? green[500] : undefined,
              color: theme.palette.text.main,
              marginRight: 25,
            }}
          >
            {t("Next")}
          </Button>
        </div>
      </Paper>)
    );
  };

  const ViewAssignPerson = () => {
    return (
      (<Paper className={classes.paper} style={{ margin: 0 }}>
        {/* <Avatar className={classes.avatar}>
          <BusinessIcon />
        </Avatar> */}
        <Typography component="h1" variant="h5">
          {`${newControl.name}`}
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
          <Grid item xs={12} md={12} style={{ paddingTop: 20 }}>
            <Typography component="h1" variant="subtitle1">
              {t("AssignedPersons")}
            </Typography>
            <Divider style={{ marginBottom: 10 }} />
            <List className={classes.listRoot}>
              <ListItem style={{ padding: 0 }}>
                <ListItemText
                  inset
                  primary={persons.length > 0 ? t("Persons") : t("NotPersons")}
                />
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
                  {persons.map((person) => (
                    <ListItem key={person.id} className={classes.nested}>
                      <ListItemIcon>
                        <ChevronIcon />
                      </ListItemIcon>
                      <ListItemText inset primary={person.name} />
                      <ListItemText primary={person.lastName} />
                    </ListItem>
                  ))}
                </List>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={personsCount ? personsCount : 0}
                  labelRowsPerPage={`${t("show")} : `}
                  labelDisplayedRows={() =>
                    `${pagePeople * rowsPerPagePeople + 1} - ${
                      (pagePeople + 1) * rowsPerPagePeople
                    } ${t("of")} ${personsCount ? personsCount : 0}`
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
                  className={classes.customPagination}
                />
              </Collapse>
            </List>
          </Grid>
          <div
            className={classes.submit}
            style={{
              position: "relative",
              display: "flex",
              width: "100%",
              flex: 1,
              paddingBottom: "3%",
              flexDirection: "row",
              alignItems: "flex-end",
              justifyContent: "flex-end",
            }}
          >
            <Button variant="contained" onClick={() => handleChangeStep(true)}>
              {t("Back")}
            </Button>
          </div>
        </Grid>
      </Paper>)
    );
  };

  return (
    <main
      style={{
        width: isEdit ? undefined : isEdit && isDesktop ? 1000 : "100%",
      }}
      className={!isDialog ? classes.layout : undefined}
    >
      <div className={!isDialog ? classes.fill : undefined}>
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
        <Stepper
          alternativeLabel
          nonLinear
          activeStep={isNewControl ? 0 : 1}
          style={{
            backgroundColor: "transparent",
            paddingTop: "12px",
            paddingBottom: "12px",
          }}
        >
          {steps.map((label, index) => {
            const stepProps = {};
            const buttonProps = {};
            return (
              <Step key={label.name} {...stepProps}>
                <StepButton
                  onClick={() => handleChangeStep(label.bool)}
                  {...buttonProps}
                >
                  {t(label.name)}
                </StepButton>
              </Step>
            );
          })}
        </Stepper>
        <Divider style={{ marginBottom: 10 }} />
        {isNewControl ? ViewNewControl() : ViewAssignPerson()}
      </div>

      <Dialog
        open={openDialogNewDocumentType}
        TransitionComponent={Transition}
        //onClose={() => this.setState({ openDialogNewDocumentType: false })}
        maxWidth="md"
        fullWidth
        scroll="paper"
      >
        <DocumentTypeForm
          isDialog
          isInModal
          // onCreate={() => this.setState({ openDialogNewDocumentType: false })}
          initValues={documentTypeOnCreate}
        />
      </Dialog>
    </main>
  );
};

DetailsControl.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

const enhance = compose(
  withTranslation(),
  withStyles(styles, { withTheme: true })
);
export default withDetailsControl(enhance(DetailsControl));
