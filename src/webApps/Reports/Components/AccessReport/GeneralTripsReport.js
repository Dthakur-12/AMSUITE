import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { endOfDay, startOfDay } from "date-fns";
import { DateRange } from "react-date-range";
import { requestDownloadExcelTemplate } from "../../../../actions/EasyAccess/Person_actions";
import { withStyles } from "@mui/styles";
import Grid from "@mui/material/Grid";
import { connect } from "react-redux";
import moment from "moment";
import green from "@mui/material/colors/green";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import { Icon } from "semantic-ui-react";
import SnackbarHandler from "../../../../utils/SnackbarHandler";
import { requestGeneralTripsReportXLSX } from "../../../../actions/AccessControl/trip_action";

const dateNow = new Date();

class GeneralTripsReport extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      t,
      classes,
      theme,
      handleRangeChange,
      dateRangePicker,
      minDate,
      maxDate,
      generateReport,
      isCreating,
      downloadReport,
      successFile,
      loadingGeneralXLSX,
    } = this.props;
    const { isLoading, isSuccess, successXlsTemplate } = this.state;
    return (
      <div>
        <Grid
          container
          spacing={24}
          style={{
            display: "flex",

            justifyContent: "center",
          }}
        >
          <Grid
            item
            xs={12}
            md={7}
            style={{
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Typography
              type="title"
              style={{
                marginBottom: "1%",
                fontSize: "15px",
              }}
            >
              {t("SelectDateRange") + ":"}
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            md={7}
            style={{
              display: "flex",

              justifyContent: "center",
            }}
          >
            <Grid
              item
              xs={12}
              md={6}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <DateRange
                onChange={handleRangeChange}
                moveRangeOnFirstSelection={false}
                ranges={[dateRangePicker.selection]}
                className={classes.rangePicker}
                months={1}
                dragSelectionEnabled={false}
                minDate={minDate}
                maxDate={maxDate}
              />
            </Grid>
          </Grid>

          <Grid
            item
            xs={12}
            md={6}
            style={{
              display: "flex",

              justifyContent: "center",
            }}
          >
            <Grid
              container
              xs={12}
              md={7}
              style={{
                display: "flex",

                justifyContent: "center",
              }}
            >
              <div
                className={classes.submit}
                style={{
                  position: "relative",
                  width: "335px",
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={generateReport}
                  style={{
                    width: "100%",
                    background: isSuccess ? green[500] : undefined,
                  }}
                  disabled={isCreating}
                  className={classes.customButton}
                >
                  {isCreating
                    ? t("GeneratingReport") + " "
                    : t("GenerateReport")}
                  {loadingGeneralXLSX && (
                    <CircularProgress
                      size={24}
                      className={classes.customCircularProgress}
                    />
                  )}{" "}
                </Button>
              </div>
              {successFile && (
                <div
                  className={classes.submit}
                  style={{
                    position: "relative",
                    width: "335px",
                    marginTop: "2%",
                  }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={downloadReport}
                    style={{
                      width: "100%",
                      background: isSuccess ? green[500] : undefined,
                    }}
                    className={classes.customButton}
                  >
                    {t("Download") + " "}
                    <Icon
                      name="download"
                      size="large"
                      style={{ marginLeft: "2%" }}
                    />
                  </Button>
                </div>
              )}
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}
const styles = (theme) => ({
  customCircularProgress: {
    position: "inherit",
    //bottom: "5%",
    rigth: 0,
    //left: "50%",
    //marginTop: -12,
    marginLeft: 4,
    color: theme.palette.text.main + " !important",
  },
  rangePicker: {
    color: theme.palette.text.main + " !important",
    "& .rdrDayDisabled": {
      backgroundColor: theme.palette.backgroundSecondary.main,
    },
    "& .rdrDayPassive .rdrDayNumber span": {
      color: "#6e6e6e !important",
    },
    "& .rdrDay .rdrDayPassive .rdrDayToday": { color: "red !important" },
  },
  customButton: {
    color: theme.palette.text.main + " !important",
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
  confirmDialog: {
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${
      theme.spacing.unit * 3
    }px`,
    [theme.breakpoints.up(900 + theme.spacing.unit * 3 * 2)]: {
      marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3,
    },
  },
});

const mapDispatchToProps = {
  requestDownloadExcelTemplate,
  requestGeneralTripsReportXLSX,
};

const GeneralTripsReportConnected = connect(
  null,
  mapDispatchToProps
)(GeneralTripsReport);

export default withTranslation()(
  withStyles(styles, { withTheme: true })(GeneralTripsReportConnected)
);
