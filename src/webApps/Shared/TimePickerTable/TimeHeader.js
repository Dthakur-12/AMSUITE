import React from "react";
import Grid from "@mui/material/Grid";
import { withStyles } from '@mui/styles';
import CustomStyles from "../../../assets/styles/Shared_Styles/TimePickerTable/TimeHeaderStyles";

// const styles = theme => ({
//   timeHeader: {
//     background: "rgb(27, 29, 30)",
//     color: "white",
//     height: "30px"
//   }
// });

class TimeHeader extends React.Component {
  render() {
    const { classes, mode } = this.props;
    let headerTime = [];
    for (let i = 0; i < 12; i++) {
      headerTime.push(
        <React.Fragment key={i}>
          <Grid item xs={1}>
            {i + mode * 12}
          </Grid>
        </React.Fragment>
      );
    }
    return (
      <Grid container item xs={12} className={classes.timeHeader}>
        {headerTime}
      </Grid>
    );
  }
}

export default withStyles(CustomStyles, { withTheme: true })(TimeHeader);
