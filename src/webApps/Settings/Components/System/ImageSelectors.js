import React from "react";
import DropFile from "../../../Shared/DropFile";
import Grid from "@mui/material/Grid";
import { Divider } from "semantic-ui-react";
import { withTranslation } from "react-i18next";
import { withStyles } from '@mui/styles';
import CustomStyles from "../../../../assets/styles/Settings_styles/System/PersonalizationStyles";

const ImageSelector = props => {
  const {
    t,
    classes,
    InputLabel,
    isLoadingImg,
    setImageDefault,
    setFile,
    handleOnFiles,
    setDefaultLogo,
    setLogo,
    handleOnLogoFiles
  } = props;
  return (
    <React.Fragment>
      <Grid style={{ marginTop: "10px", width: "100%" }}>
        <Divider horizontal>
          <InputLabel className={classes.customInpuntLabel}>
            {t("LogInImage")}
          </InputLabel>
        </Divider>

        <Grid item xs={12} md={12} className={classes.dropZoneGrid}>
          {!isLoadingImg && (
            <DropFile
              dropzoneText={t("DragOrClickLogInBackGround")}
              multiple={false}
              accept="image/*"
              defaultImage={setImageDefault()}
              files={setFile()}
              key={t("DragOrClickLogInBackGround")}
              noRevokeURL
              onFiles={handleOnFiles}
            />
          )}
        </Grid>
      </Grid>

      <Grid style={{ margin: "10px", width: "100%" }}>
        <Divider horizontal>
          <InputLabel className={classes.customInpuntLabel}>
            {t("AppLogo")}
          </InputLabel>
        </Divider>

        <Grid item xs={12} md={12} className={classes.dropZoneGrid}>
          {!isLoadingImg && (
            <DropFile
              dropzoneText={t("DragOrClickLogInBackGround")}
              multiple={false}
              accept="image/*"
              defaultImage={setDefaultLogo()}
              files={setLogo()}
              key={t("DragOrClickAppLogoBackGround")}
              noRevokeURL
              onFiles={handleOnLogoFiles}
            />
          )}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default withTranslation()(
  withStyles(CustomStyles, { withTheme: true })(ImageSelector)
);
