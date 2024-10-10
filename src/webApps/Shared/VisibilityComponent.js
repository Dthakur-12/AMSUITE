import React from "react";
import { default as classNames } from "classnames";
import {
  Grid,
  Typography,
  Step,
  Stepper,
  StepButton,
  Button,
} from "@mui/material";
import {

  withStyles,
  
} from "@mui/styles";
import Circle from "@mui/icons-material/FiberManualRecord";
import CustomStyles from "../../assets/styles/Settings_styles/NewCustomAttributeStyles";
import { withTranslation } from "react-i18next";

const renderVisibilityElement = (item, classes, fieldVisibility) => {
  return (
    <Circle
      className={classNames({
        [classes.circle]: fieldVisibility === item.value,
        [classes.circleDos]: fieldVisibility !== item.value,
      })}
    />
  );
};

const VisibilityComponent = (props) => {
  const { t, classes, field = {}, fieldVisibility = {} } = props;
  console.log('fieldVisibility: ', fieldVisibility);
  console.log('field: ', field);
  const optionsFields = [
    { value: null, label: t("Hidden") },
    { value: 0, label: t("Visible") },
    { value: 1, label: t("Required") },
  ];

  return (
    <React.Fragment>
      <Grid item xs={12} md={12} className={classes.alignmentGridTypography}>
        <Typography component="h2" variant="h4" className={classes.customTypo}>
          {t("Visibility") + " (editable)"}
        </Typography>
      </Grid>

      <Grid item xs={12} md={12} className={classes.alignmentGrid}>
        <Stepper
          alternativeLabel
          nonLinear
          activeStep={field.visibility}
          className={classes.customStepper}
        >
          {optionsFields.map((item, index) => {
            const buttonProps = {};
            buttonProps.icon = renderVisibilityElement(
              item,
              classes,
              fieldVisibility
            );
            return (
              <Step key={item.label}>
                <StepButton
                  onClick={() => props.handleChangeVisibility(item.value)}
                  className={classes.customStepButton}
                  {...buttonProps}
                >
                  {item.label}
                </StepButton>
              </Step>
            );
          })}
        </Stepper>
      </Grid>
    </React.Fragment>
  );
};

export default withTranslation()(
  withStyles(CustomStyles, { withTheme: true })(VisibilityComponent)
);
