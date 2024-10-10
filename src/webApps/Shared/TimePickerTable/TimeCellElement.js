import React from "react";
import { withStyles } from '@mui/styles';
import Grid from "@mui/material/Grid";
import CustomStyles from "../../../assets/styles/Shared_Styles/TimePickerTable/TimeCellElementStyles";

// const styles = theme => ({
//   root: {
//     flexGrow: 1
//   },
//   paper: {
//     textAlign: "center",
//     color: theme.palette.textSecondary.main,
//     backgroundColor: "rgb(242, 242, 242 , 0.1)",
//     padding: theme.spacing.unit
//   },
//   cell: {
//     border: "1px solid #c2c3c4",
//     backgroundColor: "white",
//     padding: "5px",
//     height: "100%",
//     pointerEvent: "none"
//   }
// });

class TimeCellElement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSelected: false
    };
  }

  handleMouseDown = e => {
    e.preventDefault();
    if (e !== undefined) {
      let row = this.props.rowPos;
      let col = this.props.colPos;
      if (e.button === 0) {
        this.props.startSelection(col, row, 0);
      } else if (e.button === 2) {
        this.props.startSelection(col, row, 2);
      }
    }
  };

  handleMouseEnter = (col, row) => {
    return () => {
      this.props.onCellMouseEnter(col, row);
    };
  };

  componentDidUpdate(newProps) {
    if (
      this.props.timeIntervals[newProps.rowPos].indexOf(newProps.colPos) !== -1
    ) {
      if (this.state.isSelected === false)
        this.setState({
          isSelected: true
        });
    } else {
      if (this.state.isSelected === true)
        this.setState({
          isSelected: false
        });
    }
  }

  desableContextMenu() {
    return false;
  }

  render() {
    const { classes, colPos, rowPos } = this.props;
    return (
      <React.Fragment>
        <Grid item xs={3} data-colpos={colPos} style={{ pointerEvent: "none" }}>
          <div
            style={{
              backgroundColor: this.state.isSelected
                ? "rgb(57, 73, 98)"
                : "white"
            }}
            className={classes.cell}
            onMouseEnter={this.handleMouseEnter(colPos, rowPos)}
            onMouseDown={this.handleMouseDown}
            onContextMenu={this.desableContextMenu}
          />
        </Grid>
      </React.Fragment>
    );
  }
}

export default withStyles(CustomStyles, { withTheme: true })(TimeCellElement);
