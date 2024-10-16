import { Button } from "@mui/material";
import { withStyles } from '@mui/styles';
import Typography from "@mui/material/Typography";
import UploadCloudIcon from "@mui/icons-material/CloudUploadRounded";
import React from "react";
import Dropzone from "react-dropzone";
import { Icon, Transition } from "semantic-ui-react";
import { isValueEmptyOrNull } from "../../../../utils/HelperFunctions";
import { withTranslation } from "react-i18next";
import CustomStyles from "../../../../assets/styles/Settings_styles/License/SecondStepStyles";

const SecondStep = props => {
  const { classes, t, theme } = props;
  return (
    <div style={{ padding: 16 }}>
      <div style={{ display: "flex", width: "100%" }}>
        <Dropzone
          className={classes.dropzone}
          accept={".lic"}
          onDrop={props.onDrop}
          files={props.files}
          inputProps={{
            style: { width: "100%" }
          }}
        >
          <Typography style={{ textAlign: "center" }}>
            {t("DragOrClickLicense")}
          </Typography>
          <UploadCloudIcon
            fontSize="large"
            style={{ color: theme.palette.text.main }}
          />
        </Dropzone>
        <div className={classes.divAlignment}>
          <svg
            className={classes.licenseIcon}
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 489.6 489.6"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            enableBackground="new 0 0 489.6 489.6"
          >
            <g>
              <g fill={isValueEmptyOrNull(props.file) ? "#666462" : "#fff"}>
                <path d="m404.35,297.5c27.1-22.3 43.6-55.5 43.6-91.3 0-30.9-11.3-58.9-30.2-79.7v-116.1c0-6.3-4.2-10.4-10.4-10.4h-363.6c-6.3,0-10.4,4.2-10.4,10.4v468.8c0,6.3 4.2,10.4 10.4,10.4h363.5c5.2,0 10.4-4.2 10.4-10.4v-58.6l38.6-13.3-51.9-109.8zm23.8-91.3c-0.1,38.6-21.9,73-56.3,88.6-12.5,5.2-26,8.3-40.6,8.3-53.1,0-96.9-43.8-96.9-96.9s43.8-96.9 96.9-96.9 95.8,42.7 96.9,96.9zm-136.3,110.1l-21.1,93-40.6-14.5 42.2-87.3c6.2,3.5 12.7,6.5 19.5,8.8zm105,152.5h-342.7v-448h342.7v87.6c-18.6-12.6-41.1-19.9-65.6-19.9-27.2,0-52.1,9.1-71.9,24.4v-0.5h-138.6v20.8h118c-15.8,20.1-25.3,45.5-25.3,72.9 0,9.7 1.2,19.1 3.4,28.1h-96.1v20.8h103.4c7.2,15.6 17.7,29.2 30.7,40.2l-28.8,60.9h-105.3v20.8h95.5l-14.3,30.2 84.4,29.2 26.3-115c6,0.9 12.2,1.4 18.5,1.4 4.8,0 9.7-0.3 14.5-0.8l26.2,114.3 25-8.6v41.2zm-9.4-59.4l-20.7-91.4c4.3-1.2 17.6-7 20.2-8.5l41.1,85.3-40.6,14.6z" />
                <path d="m306.15,170.9l-54.2,8.3 39.6,38.5-9.4,54.2 49-24 47.9,25-9.3-54.1 38.5-39.6-54.2-8.3-23.9-49-24,49zm35.4,19.8l22.9,3.1-16.7,16.7 4.3,22.8-20.8-10.4-20.8,11.5 4.2-24-16.8-16.6 22.9-3.1 10.4-20.8 10.4,20.8z" />
              </g>
            </g>
          </svg>
          <Typography className={classes.licenseName}>
            {isValueEmptyOrNull(props.file)
              ? t("WithoutEntering")
              : props.file.name}
          </Typography>
          {
            <Transition
              visible={!isValueEmptyOrNull(props.file)}
              animation="scale"
              duration={500}
            >
              <Icon className={classes.checkIcon} name="checkmark" />
            </Transition>
          }
        </div>
      </div>
      <Button
        disabled={isValueEmptyOrNull(props.file)}
        onClick={props.handleActiveLicense}
        className={classes.button}
      >
        {t("ActivateLicense")}
      </Button>
    </div>
  );
};
export default withTranslation()(
  withStyles(CustomStyles, { withTheme: true })(SecondStep)
);
