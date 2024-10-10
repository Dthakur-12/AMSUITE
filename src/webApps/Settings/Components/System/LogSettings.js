import React from "react";
import { withStyles } from '@mui/styles';
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Select from "react-select";
import components from "../../../Shared/ReactSelect";
import { Divider } from "semantic-ui-react";
import InputLabel from "@mui/material/InputLabel";
import LinearProgress from "@mui/material/LinearProgress";
import { FormHelperText } from "@mui/material";
import { withTranslation } from "react-i18next";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import MenuItem from "@mui/material/MenuItem";
import CustomStyles from "../../../../assets/styles/Settings_styles/System/GeneralStyles";

class LogSettings extends React.Component {
  render() {
    const {
      classes,
      theme,
      t,
      handleChange,
      systemDTO,
      isCreating,
      justNumbers,
      optionLogLevel,
      logLevel,
      formErrors
    } = this.props;

    const selectStyles = {
      dropdownIndicator: base => ({
        ...base,
        color: theme.palette.text.main
      }),
      input: base => ({
        ...base,
        color: theme.palette.text.primary,
        "& input": {
          font: "inherit"
        },
        width: "100%",
        menuList: {
          maxHeight: 100
        }
      })
    };

    return (
      <main style={{ marginTop: "4%", width: "100%" }}>
        <div>
          <LinearProgress
            className={classes.customLinearProgress}
            style={{
              opacity: isCreating ? "1" : "0"
            }}
            variant="query"
          />
          <Paper className={classes.paper}>
            <Grid container spacing={24}>
              <Grid className={classes.majorAlignment}>
                <Divider horizontal>
                  <InputLabel style={{ fontSize: "13px" }}>
                    {t("LogSettings")}
                  </InputLabel>
                </Divider>
                <Grid
                  container
                  spacing={24}
                  style={{ marginBottom: 10, marginTop: 5 }}
                >
                  <Grid item xs={12} md={6}>
                    <TextField
                      className={classes.infoTextField}
                      type="text"
                      label={t("LogFolderPath")}
                      fullWidth
                      value={systemDTO.logFolderPath}
                      onChange={handleChange("logFolderPath")}
                      helperText={t("inputEmpty")}
                      FormHelperTextProps={{
                        style: { opacity: formErrors.logFolderPath ? 1 : 0 }
                      }}
                      error={formErrors.logFolderPath}
                    />

                    <Grid
                      item
                      xs={12}
                      md={12}
                      style={{ marginBottom: 5, zIndex: 100 }}
                    >
                      <InputLabel
                        style={{ fontSize: "13px" }}
                        htmlFor="logLevel"
                      >
                        {t("LogLevel")}
                      </InputLabel>
                      <Select
                        id="logLevel"
                        classes={classes}
                        styles={selectStyles}
                        options={optionLogLevel}
                        components={components}
                        value={logLevel}
                        onChange={handleChange("logLevel")}
                        placeholder={t("LogLevel")}
                        maxMenuHeight={200}
                        isLoading={false}
                      />
                      <FormHelperText
                        style={{
                          opacity: formErrors.logLevel ? 1 : 0
                        }}
                        error={formErrors.logLevel}
                      >
                        {t("inputEmpty")}
                      </FormHelperText>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      className={classes.infoTextField}
                      type="text"
                      label={t("MaxLogSizeInMB")}
                      fullWidth
                      value={systemDTO.maxLogSizeInMB}
                      onChange={handleChange("maxLogSizeInMB")}
                      onKeyPress={event => {
                        if (!justNumbers(event)) event.preventDefault();
                      }}
                      helperText={t("inputEmpty")}
                      FormHelperTextProps={{
                        style: { opacity: formErrors.maxLogSizeInMB ? 1 : 0 }
                      }}
                      error={formErrors.maxLogSizeInMB}
                    />
                    <TextField
                      style={{ paddingTop: 10 }}
                      className={classes.infoTextField}
                      type="text"
                      label={t("MaxNumberOfLogFiles")}
                      fullWidth
                      value={systemDTO.maxNumberOfLogFiles}
                      onChange={handleChange("maxNumberOfLogFiles")}
                      onKeyPress={event => {
                        if (!justNumbers(event)) event.preventDefault();
                      }}
                      helperText={t("inputEmpty")}
                      FormHelperTextProps={{
                        style: {
                          opacity: formErrors.maxNumberOfLogFiles ? 1 : 0
                        }
                      }}
                      error={formErrors.maxNumberOfLogFiles}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </div>
      </main>
    );
  }
}

export default withTranslation()(
  withStyles(CustomStyles, { withTheme: true })(LogSettings)
);
