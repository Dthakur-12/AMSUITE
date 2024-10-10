import React from "react";
import PropTypes from "prop-types";
import { withStyles } from '@mui/styles';
import Grid from "@mui/material/Grid";
import TimeCell from "../TimePickerTable/TimeCell";
import CustomStyles from "../../../assets/styles/Shared_Styles/TimePickerTable/TableRowStyles";

const propTypes = {
  rowPos: PropTypes.number.isRequired,
  onSelectionStart: PropTypes.func.isRequired,
  onCellMouseEnter: PropTypes.func.isRequired
};

// const styles = theme => ({
//   root: {
//     MozUserSelect: "none",
//     WebkitUserSelect: "none"
//   },
//   paper: {
//     padding: theme.spacing.unit,
//     textAlign: "center",
//     color: theme.palette.textSecondary.main
//   },
//   timeCell: {
//     padding: "0 !important",
//     height: "30px",
//     margin: "0 !important",
//     borderLeft: "1px solid black",
//     borderRight: "1px solid black",
//     pointerEvent: "none"
//   }
// });

class TableRow extends React.Component {
  render() {
    const { rowPos, classes, timeIntervals } = this.props;
    const timeCells = [];
    for (let i = 0; i < 12; i += 1) {
      timeCells.push(
        <React.Fragment key={i}>
          <Grid container key={i} item xs={1} className={classes.timeCell}>
            <TimeCell
              onSelectionStart={this.props.onSelectionStart}
              onCellMouseEnter={this.props.onCellMouseEnter}
              colPos={i * 4}
              rowPos={rowPos}
              timeIntervals={timeIntervals}
              // rowStart = {rowStart}
              // rowEnd = {rowEnd}
            />
          </Grid>
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        <Grid container item xs={12} className={classes.timeCell}>
          {timeCells}
        </Grid>
      </React.Fragment>
    );
  }
}

TableRow.propTypes = propTypes;
export default withStyles(CustomStyles, { withTheme: true })(TableRow);
