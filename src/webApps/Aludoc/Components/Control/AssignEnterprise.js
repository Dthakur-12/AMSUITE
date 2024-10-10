import React from "react";
import PropTypes from "prop-types";
import { withStyles } from '@mui/styles';
import {
  Typography,
  IconButton,
  Collapse,
  Grid,
  Divider,
  List,
  ListItem,
  Fab,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import ExpandMore from "@mui/icons-material/ExpandMore";
import classnames from "classnames";
import PlusIcon from "@mui/icons-material/AddRounded";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import ChevronIcon from "@mui/icons-material/ChevronRightRounded";
import { isNullOrUndefined } from "util";
import { compose } from "redux";
import DataTableDialogAction from "../../../Shared/DataTable/DataTableDialogAction";
import withAssignEnterprise from "../../../../core/Aludoc/withAssignEnterprise";
import { withTranslation } from "react-i18next";
import styles from "../../../../assets/styles/Aludoc_styles/Control_styles/assignEnterpriseStyles.js";

const NewPersonGroupCard = (props) => {
  const {
    classes,
    t,
    isEditOrCreate,
    showVehicles,
    openHiredCompanyDialog,
    contractorCompany,
    hiredCompany,
    openContractorCompanyDialog,
    isDetails,
    internal,
    changeInternal,
    showInfo,
    openDialogContractorCompany,
    openDialogHiredCompany,
    expandInfo,
    handleOpenContractorCompany,
    enterprises,
    successEnterprise,
    requestEnterprises,
    handleCloseContractorCompany,
    handleCloseHiredCompany,
    handleOpenHiredCompany,
    formErrors,
  } = props;

  const externalControl = () => {
    return (
      <Grid container spacing={24}>
        <Grid item xs={12} md={6}>
          <Typography
            component="h1"
            variant="subtitle1"
            className={
              formErrors && formErrors.hiredCompany ? classes.withError : ""
            }
          >
            {`${t("ContractedCompany")}`}
          </Typography>
          <Divider style={{ marginBottom: 10 }} />
          <List className={classes.listRoot}>
            <ListItem style={{ padding: 0 }}>
              {isEditOrCreate && (
                <Fab
                  size="small"
                  className={classes.fab}
                  onClick={openHiredCompanyDialog}
                >
                  <PlusIcon className={classes.fabIcon} />
                </Fab>
              )}
              <ListItemText
                inset
                primary={isEditOrCreate ? t("SelectCompany") : ""}
              />
            </ListItem>
            {!isNullOrUndefined(hiredCompany) && (
              <Collapse in={true} timeout="auto" unmountOnExit>
                <List dense component="div" disablePadding>
                  <ListItem key={hiredCompany.id} className={classes.nested}>
                    <ListItemIcon>
                      <ChevronIcon />
                    </ListItemIcon>
                    <ListItemText inset primary={hiredCompany.name} />
                  </ListItem>
                </List>
              </Collapse>
            )}
          </List>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography
            component="h1"
            variant="subtitle1"
            className={
              formErrors && formErrors.contractorCompany
                ? classes.withError
                : ""
            }
          >
            {`${t("ContractingCompany")}`}
          </Typography>
          <Divider style={{ marginBottom: 10 }} />
          <List className={classes.listRoot}>
            <ListItem style={{ padding: 0 }}>
              {isEditOrCreate && (
                <Fab
                  size="small"
                  className={classes.fab}
                  onClick={openContractorCompanyDialog}
                >
                  <PlusIcon className={classes.fabIcon} />
                </Fab>
              )}
              <ListItemText
                inset
                primary={isEditOrCreate ? t("SelectCompany") : ""}
              />
            </ListItem>
            {!isNullOrUndefined(contractorCompany) && (
              <Collapse in={showVehicles} timeout="auto" unmountOnExit>
                <List dense component="div" disablePadding>
                  <ListItem
                    key={contractorCompany.id}
                    className={classes.nested}
                  >
                    <ListItemIcon>
                      <ChevronIcon />
                    </ListItemIcon>
                    <ListItemText inset primary={contractorCompany.name} />
                  </ListItem>
                </List>
              </Collapse>
            )}
          </List>
        </Grid>
      </Grid>
    );
  };
  const internalControl = () => {
    const { classes, t, isEditOrCreate } = props;
    return (
      <Grid container spacing={24}>
        <Grid item xs={12} md={12}>
          <Typography
            component="h1"
            variant="subtitle1"
            className={
              formErrors && formErrors.contractorCompany
                ? classes.withError
                : ""
            }
          >
            {t("ContractingCompany")}
          </Typography>
          <Divider style={{ marginBottom: 10 }} />
          <List className={classes.listRoot}>
            <ListItem style={{ padding: 0 }}>
              {isEditOrCreate && (
                <Fab
                  size="small"
                  className={classes.fab}
                  onClick={openContractorCompanyDialog}
                >
                  <PlusIcon className={classes.fabIcon} />
                </Fab>
              )}
              <ListItemText
                inset
                primary={isEditOrCreate ? t("SelectCompany") : ""}
              />
            </ListItem>
            {!isNullOrUndefined(contractorCompany) && (
              <Collapse in={showVehicles} timeout="auto" unmountOnExit>
                <List dense component="div" disablePadding>
                  <ListItem
                    key={contractorCompany.id}
                    className={classes.nested}
                  >
                    <ListItemIcon>
                      <ChevronIcon />
                    </ListItemIcon>
                    <ListItemText inset primary={contractorCompany.name} />
                  </ListItem>
                </List>
              </Collapse>
            )}
          </List>
        </Grid>
      </Grid>
    );
  };

  return (
    (<div style={{ width: "100%" }}>
      <div
        className={classes.paper}
        style={{
          margin: 0,
          paddingTop: isDetails ? null : 0,
          paddingBottom: 0,
        }}
      >
        <Grid container spacing={24}>
          <Grid item xs={6} md={6}>
            <Typography
              style={{ alignSelf: "baseline" }}
              component="h4"
              variant="h6"
            >
              {isDetails
                ? t("VinculatedCompanies")
                : t("SelectVinculatedCompanies")}
            </Typography>
          </Grid>

          {false && (
            <IconButton
              style={{
                position: "absolute",
                marginRight: 5,
                marginTop: -15,
                alignSelf: "end",
              }}
              onClick={expandInfo}
              className={classnames(classes.expand, {
                [classes.expandOpen]: showInfo,
              })}
              size="large">
              <ExpandMore />
            </IconButton>
          )}
          <Grid item xs={6} md={5}>
            <FormControlLabel
              control={
                <Switch
                  checked={internal}
                  onChange={changeInternal}
                  value="screen"
                  className={classes.switch}
                  color="primary"
                />
              }
              labelPlacement="end"
              label={t("InternalControl")}
              style={{
                cursor: "default",
                position: "absolute",
                alignSelf: "flex-end",
                marginTop: -10,
              }}
              //disabled={isDetails}
            />
          </Grid>
          <Divider
            style={{
              width: "100%",
              marginTop: isDetails ? 0 : "10%",
              marginBottom: "10%",
            }}
          />
        </Grid>

        {internal ? internalControl() : externalControl()}
      </div>
      <DataTableDialogAction
        open={openDialogContractorCompany}
        onConfirm={handleOpenContractorCompany}
        onClose={handleCloseContractorCompany}
        title={t("Company")}
        subTitle={t("ContractingCompany")}
        loadDataAction={requestEnterprises}
        info={enterprises}
        success={successEnterprise}
        rowsSelected={
          !isNullOrUndefined(contractorCompany) ? [contractorCompany] : []
        }
        multipleSelect={false}
        notViewColumns={true}
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
            name: t("email"),
            field: "email",
            options: {
              filter: false,
              sort: true,
              sortDirection: "asc",
            },
          },
          {
            name: t("Phone"),
            field: "phone",
            options: {
              filter: false,
              sort: true,
              sortDirection: "asc",
            },
          },
        ]}
      />
      <DataTableDialogAction
        open={openDialogHiredCompany}
        onConfirm={handleOpenHiredCompany}
        onClose={handleCloseHiredCompany}
        title={t("Company")}
        subTitle={t("ContractedCompany")}
        loadDataAction={requestEnterprises}
        info={enterprises}
        success={successEnterprise}
        rowsSelected={!isNullOrUndefined(hiredCompany) ? [hiredCompany] : []}
        multipleSelect={false}
        notViewColumns={true}
        columns={[
          {
            name: t("name"),
            field: "name",
            options: {
              filter: false,
              sort: true,
              sortDirection: "asc",
            },
          },
          {
            name: t("email"),
            field: "email",
            options: {
              filter: false,
              sort: true,
              sortDirection: "asc",
            },
          },
          {
            name: t("Phone"),
            field: "phone",
            options: {
              filter: false,
              sort: true,
              sortDirection: "asc",
            },
          },
        ]}
      />
    </div>)
  );
};

NewPersonGroupCard.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

const enhance = compose(
  withTranslation(),
  withStyles(styles, { withTheme: true })
);
export default withAssignEnterprise(enhance(NewPersonGroupCard));
