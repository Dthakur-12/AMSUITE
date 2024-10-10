import React from "react";
import PropTypes from "prop-types";
import { withStyles } from '@mui/styles';
import TimeCellElement from "../TimePickerTable/TimeCellElement";
import CustomStyles from "../../../assets/styles/Shared_Styles/TimePickerTable/TimeCellStyles";

// const styles = theme => ({
//   root: {
//     flexGrow: 1
//   },
//   paper: {
//     textAlign: "center",
//     color: theme.palette.textSecondary.main,
//     backgroundColor: "white",
//     padding: theme.spacing.unit
//   }
// });

const propTypes = {
  // rowPos: PropTypes.number.isRequired,
  onSelectionStart: PropTypes.func.isRequired
};

class TimeCell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleMouseEnter = (col, row) => {
    return () => {
      this.props.onCellMouseEnter(col, row);
    };
  };

  render() {
    const { colPos, rowPos, timeIntervals } = this.props;
    let timeCell = [];
    for (let i = 0; i < 4; i += 1) {
      timeCell.push(
        <React.Fragment key={i}>
          <TimeCellElement
            startSelection={this.props.onSelectionStart}
            onCellMouseEnter={this.props.onCellMouseEnter}
            colPos={colPos + i}
            rowPos={rowPos}
            timeIntervals={timeIntervals}
            key={i}
            // rowStart={rowStart}
            // rowEnd={rowEnd}
          />
        </React.Fragment>
      );
    }
    return <React.Fragment>{timeCell}</React.Fragment>;
  }
}
TimeCell.propTypes = propTypes;
export default withStyles(CustomStyles, { withTheme: true })(TimeCell);
