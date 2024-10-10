import { Button } from "@mui/material";
import { withStyles } from '@mui/styles';
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import React from "react";
import { Label } from "semantic-ui-react";
import { isNullOrUndefined } from "util";
import { withTranslation } from "react-i18next";
import CustomStyles from "../../../../assets/styles/Settings_styles/License/ThirdStepStyles";

const dateOptions = { year: "numeric", month: "long", day: "numeric" };

const ThirdStep = props => {
  const { classes, t } = props;
  return (
    <div style={{ padding: 16 }}>
      <div style={{ display: "flex", width: "100%" }}>
        <div style={{ height: 150 }}>
          <svg
            className={classes.licenseIcon}
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 489.6 489.6"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            enableBackground="new 0 0 489.6 489.6"
          >
            <g>
              <g fill={"#47624b"}>
                <path d="m404.35,297.5c27.1-22.3 43.6-55.5 43.6-91.3 0-30.9-11.3-58.9-30.2-79.7v-116.1c0-6.3-4.2-10.4-10.4-10.4h-363.6c-6.3,0-10.4,4.2-10.4,10.4v468.8c0,6.3 4.2,10.4 10.4,10.4h363.5c5.2,0 10.4-4.2 10.4-10.4v-58.6l38.6-13.3-51.9-109.8zm23.8-91.3c-0.1,38.6-21.9,73-56.3,88.6-12.5,5.2-26,8.3-40.6,8.3-53.1,0-96.9-43.8-96.9-96.9s43.8-96.9 96.9-96.9 95.8,42.7 96.9,96.9zm-136.3,110.1l-21.1,93-40.6-14.5 42.2-87.3c6.2,3.5 12.7,6.5 19.5,8.8zm105,152.5h-342.7v-448h342.7v87.6c-18.6-12.6-41.1-19.9-65.6-19.9-27.2,0-52.1,9.1-71.9,24.4v-0.5h-138.6v20.8h118c-15.8,20.1-25.3,45.5-25.3,72.9 0,9.7 1.2,19.1 3.4,28.1h-96.1v20.8h103.4c7.2,15.6 17.7,29.2 30.7,40.2l-28.8,60.9h-105.3v20.8h95.5l-14.3,30.2 84.4,29.2 26.3-115c6,0.9 12.2,1.4 18.5,1.4 4.8,0 9.7-0.3 14.5-0.8l26.2,114.3 25-8.6v41.2zm-9.4-59.4l-20.7-91.4c4.3-1.2 17.6-7 20.2-8.5l41.1,85.3-40.6,14.6z" />
                <path d="m306.15,170.9l-54.2,8.3 39.6,38.5-9.4,54.2 49-24 47.9,25-9.3-54.1 38.5-39.6-54.2-8.3-23.9-49-24,49zm35.4,19.8l22.9,3.1-16.7,16.7 4.3,22.8-20.8-10.4-20.8,11.5 4.2-24-16.8-16.6 22.9-3.1 10.4-20.8 10.4,20.8z" />
              </g>
            </g>
          </svg>
        </div>
        <div>
          <div style={{ display: "flex" }}>
            <Typography variant="h4">{t("ActiveLicense")}</Typography>
          </div>
          <div className={classes.customAlignment}>
            <Typography variant="h6">{t("Client")}</Typography>
            <Typography className={classes.customTypo}>
              {props.license && props.license.clientName}
            </Typography>
            <Typography className={classes.customTypo}>
              {props.license && props.license.email}
            </Typography>
          </div>
          <div className={classes.customAlignment}>
            <Typography variant="h6">{t("ValidUntil")}</Typography>
            <Typography className={classes.customTypo}>

              {props.license && new Date(props.license.expirationDate).toLocaleDateString(
                "en-EN",
                dateOptions
              )}
            </Typography>
          </div>
        </div>
      </div>
      <div>
        <Typography variant="h5">{t("Products")}</Typography>
      </div>
      {!isNullOrUndefined(props.license) && (
        <div style={{ marginTop: 10 }}>
          {props.license.productNames
            .filter(product => product !== "SYSTEM")
            .map(product => (
              <Label key={product} as="a" className={classes.label} image>
                {product}
              </Label>
            ))}
        </div>
      )}
      <Button className={classes.button} onClick={props.onOpen}>
        {t("details")}
      </Button>
    </div>
  );
};

ThirdStep.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withTranslation()(withStyles(CustomStyles)(ThirdStep));
