import React from "react";
import Grid from "@mui/material/Grid";
import { withStyles } from '@mui/styles';
import PropTypes from "prop-types";
import { withTranslation } from "react-i18next";
import CustomStyles from "../../../assets/styles/Shared_Styles/TimePickerTable/DayHeaderStyles";
// const styles = theme => ({
//   dayHeader: {
//     background: "rgb(27, 29, 30)",
//     color: "white"
//   },
//   headerElement: {
//     height: "30px",
//     marginLeft: "20px"
//   },
//   headerDays: {
//     height: "30px",
//     position: "relative"
//   },
//   headerDayButtonRight: {
//     cursor: "pointer",
//     textAlign: "center",
//     margin: 0,
//     fontSize: "1.5vw",
//     fontWeight: "bold",
//     borderLeft: "solid 2px #817b7b",
//     borderBottom: "solid 2px #817b7b",
//     "&:hover": {
//       backgroundColor: "#353535",
//       color: "#21719c",
//       borderBottom: "solid 2px #21719c"
//     }
//   },
//   headerDayButtonLeft: {
//     cursor: "pointer",
//     textAlign: "center",
//     margin: 0,
//     fontSize: "1.5vw",
//     fontWeight: "bold",
//     borderRight: "solid 2px #817b7b",
//     borderBottom: "solid 2px #817b7b",
//     "&:hover": {
//       backgroundColor: "#353535",
//       color: "#21719c",
//       borderBottom: "solid 2px #21719c"
//     }
//   },

//   selectedHeaderOption: {
//     background: "#36485d",
//     color: "#d5d6d7",
//     cursor: "pointer",
//     textAlign: "center",
//     margin: 0,
//     fontSize: "1.5vw",
//     fontWeight: "bold",
//     borderBottom: "solid 2px #817b7b"
//   }
// });

const propTypes = {
  startSelection: PropTypes.func.isRequired
};
class DayHeader extends React.Component {
  handleModeChange = mode => {
    return () => {
      this.props.changeMode(mode);
    };
  };

  render() {
    const { classes, mode, t } = this.props;
    let daysArray = [
      t("Monday"),
      t("Tuesday"),
      t("Wednesday"),
      t("Thursday"),
      t("Friday"),
      t("Saturday"),
      t("Sunday")
    ];
    let headerDays = [];
    headerDays.push(
      <React.Fragment key={8}>
        <Grid item xs={12} container className={classes.headerDays}>
          <Grid
            item
            xs={6}
            className={
              mode === 0
                ? classes.selectedHeaderOption
                : classes.headerDayButtonLeft
            }
            onClick={this.handleModeChange(0)}
          >
            {t("AM")}
          </Grid>
          <Grid
            item
            xs={6}
            className={
              mode === 1
                ? classes.selectedHeaderOption
                : classes.headerDayButtonRight
            }
            onClick={this.handleModeChange(1)}
          >
            {t("PM")}
          </Grid>
        </Grid>
      </React.Fragment>
    );
    for (let i = 0; i < 7; i++) {
      headerDays.push(
        <React.Fragment key={i}>
          <Grid item key={i} xs={12} className={classes.headerElement}>
            {daysArray[i]}
          </Grid>
        </React.Fragment>
      );
    }
    return (
      <Grid container item xs={2} className={classes.dayHeader}>
        {headerDays}
      </Grid>
    );
  }
}

DayHeader.propTypes = propTypes;
export default withTranslation()(
  withStyles(CustomStyles, { withTheme: true })(DayHeader)
);
