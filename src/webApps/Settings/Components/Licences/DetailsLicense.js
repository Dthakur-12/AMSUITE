import { Grid } from "@mui/material";
import { withStyles } from '@mui/styles';
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import React from "react";
import { withTranslation } from "react-i18next";
import { isNullOrUndefined } from "util";
import AccessControlIcon from "../../../../assets/webAppIcons/accessControl.png";
import AludocIcon from "../../../../assets/webAppIcons/aludoc.png";
import EasyAccessIcon from "../../../../assets/webAppIcons/easyaccess.png";
import MusteringIcon from "../../../../assets/webAppIcons/mustering.png";
import ReportsIcon from "../../../../assets/webAppIcons/reports.png";
import DetailsProductElement from "./DetailsProductElement";
import EntitiesTable from "./EntitiesTable";
import CustomStyles from "../../../../assets/styles/Settings_styles/License/DetailsLicenseStyles";

const AppIcons = {
  "EASY ACCESS": EasyAccessIcon,
  ALUDOC: AludocIcon,
  TIKAS: ReportsIcon,
  MUSTERING: MusteringIcon,
  "ALUTEL MOBILE": AccessControlIcon
};
const DetailsLicense = props => {
  const { classes, t } = props;
  return (
    <div className={classes.layout}>
      <Grid container spacing={24} style={{ marginTop: "70px" }}>
        <Grid item xs={12}>
          <Grid item xs={12}>
            <Typography variant="h4" className={classes.customTypo}>
              {t("Products")}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            {!isNullOrUndefined(props.license) && (
              <div className={classes.productContainer}>
                {props.license.productNames
                  .filter(product => product !== "SYSTEM")
                  .map(product => {
                    return (
                      <DetailsProductElement
                        name={product}
                        key={product}
                        icon={AppIcons[product]}
                      />
                    );
                  })}
              </div>
            )}
          </Grid>
        </Grid>

        <Grid container spacing={24} style={{ marginTop: "30px" }}>
          <Grid item xs={12}>
            <Typography variant="h4" className={classes.customTypo}>
              {t("details")}
            </Typography>
          </Grid>
          <Grid item xs={12} md={4} className={classes.customGrid}>
            <EntitiesTable
              entities={
                !isNullOrUndefined(props.license) && props.license.entities
              }
              offset={props.limit * 0}
              limit={props.limit}
            />
          </Grid>
          <Grid item xs={12} md={4} className={classes.customGrid}>
            <EntitiesTable
              entities={
                !isNullOrUndefined(props.license) && props.license.entities
              }
              offset={props.limit * 1}
              limit={props.limit}
            />
          </Grid>
          <Grid item xs={12} md={4} className={classes.customGrid}>
            <EntitiesTable
              entities={
                !isNullOrUndefined(props.license) && props.license.entities
              }
              offset={props.limit * 2}
              limit={props.limit}
            />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

DetailsLicense.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withTranslation()(withStyles(CustomStyles)(DetailsLicense));
