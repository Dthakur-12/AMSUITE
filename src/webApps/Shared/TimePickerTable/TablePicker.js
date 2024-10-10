import React from "react";
import { withStyles } from '@mui/styles';
import Grid from "@mui/material/Grid";
import TableRow from "../TimePickerTable/TableRow";
import DayHeader from "./DayHeader";
import TimeHeader from "./TimeHeader";
import CustomStyles from "../../../assets/styles/Shared_Styles/TimePickerTable/TablePickerStyles";
import { withTranslation } from "react-i18next";
import Typography from "@mui/material/Typography";
import Fab from "@mui/material/Fab";
import Radio from "@mui/material/Radio";

// const styles = theme => ({
//   root: {
//     position: "relative",
//     backgroundColor: "white",
//     MozUserSelect: "none",
//     WebkitUserSelect: "none"
//   },
//   paper: {
//     padding: theme.spacing.unit,
//     textAlign: "center",
//     color: theme.palette.textSecondary.main
//   },
//   tableRow: {
//     margin: "0 !important"
//   },
//   overlay: {
//     position: "absolute",
//     backgroundColor: "rgb(186, 211, 252, 0.5)",
//     pointerEvents: "none"
//   },
//   headerTime: {
//     background: "rgb(27, 29, 30)",
//     heigth: "60px",
//     height: "30px",
//     color: "white"
//   }
// });

let array = [];
for (let i = 0; i < 7; i++) {
  array.push([]);
}

class TablePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startSelectionPosition: null,
      columnDimensions: [],
      mode: 0,
      rowStart: 0,
      rowEnd: 0
    };
  }

  handleSelectionStart = (col, row, button) => {
    const startSelectionPosition = {
      x: col,
      y: row,
      button: button
    };
    this.setState({
      startSelectionPosition,
      mousePosition: startSelectionPosition
    });
  };

  handleCellMouseEnter = (col, row) => {
    if (this.state.startSelectionPosition != null) {
      this.setState({
        mousePosition: {
          x: col,
          y: row
        }
      });
    }
  };

  handleSelectionStop = e => {
    if (e.button !== 0 && e.button !== 2) {
      return;
    }
    const { startSelectionPosition, mousePosition, mode } = this.state;

    const { AMIntervals, PMIntervals } = this.props;

    if (startSelectionPosition == null) {
      return;
    }
    const endRow = mousePosition.y;
    const endCol = mousePosition.x;

    const minTimeIndex = Math.min(startSelectionPosition.x, endCol);
    const maxTimeIndex = Math.max(startSelectionPosition.x, endCol);

    const minCellIndex = Math.min(startSelectionPosition.y, endRow);
    const maxCellIndex = Math.max(startSelectionPosition.y, endRow);

    const action = startSelectionPosition.button;

    let timeIntervals = [];
    if (mode === 0) {
      timeIntervals = AMIntervals;
    } else timeIntervals = PMIntervals;
    let j = 0;
    let i = 0;
    if (action === 0) {
      for (i = minCellIndex; i <= maxCellIndex; i++)
        for (j = minTimeIndex; j <= maxTimeIndex; j++)
          if (timeIntervals[i].indexOf(j) === -1) timeIntervals[i].push(j);
    } else if (action === 2) {
      for (i = minCellIndex; i <= maxCellIndex; i++)
        for (j = minTimeIndex; j <= maxTimeIndex; j++)
          if (timeIntervals[i].indexOf(j) !== -1)
            timeIntervals[i].splice(timeIntervals[i].indexOf(j), 1);
    }

    if (mode === 0) {
      this.setState({
        startSelectionPosition: null,
        AMtimeIntervals: timeIntervals,
        mousePosition: null
      });
    } else {
      this.setState({
        startSelectionPosition: null,
        PMtimeIntervals: timeIntervals,
        mousePosition: null
      });
    }
  };
  renderOverlay() {
    if (this.state.startSelectionPosition != null) {
      const startPosition = this.state.startSelectionPosition;
      const { mousePosition } = this.state;
      const { classes } = this.props;

      const top = Math.min(startPosition.y, mousePosition.y) * 30;
      const { left } = this.state.columnDimensions[
        Math.min(startPosition.x, mousePosition.x)
      ];
      const lastSelectedColumn = this.state.columnDimensions[
        Math.max(startPosition.x, mousePosition.x)
      ];
      const width = lastSelectedColumn.left - left + lastSelectedColumn.width;
      const height =
        (Math.max(startPosition.y, mousePosition.y) + 1) *
          lastSelectedColumn.height -
        top;
      const overlayStyle = {
        top,
        left,
        width,
        height
      };
      return <div className={classes.overlay} style={overlayStyle} />;
    }
    return null;
  }

  disableContextMenu(e) {
    e.preventDefault();
  }

  componentDidMount() {
    this.calculateColumnDimension();
    window.addEventListener("resize", this.calculateColumnDimension);
    window.addEventListener("mouseup", this.handleSelectionStop);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.calculateColumnDimension);
    window.removeEventListener("mouseup", this.handleSelectionStop);
  }

  calculateColumnDimension = () => {
    const columnDimensions = [];
    for (let i = 0; i < 48; i += 1) {
      const left =
        i === 0
          ? 0
          : i % 4 === 0
          ? columnDimensions[i - 1].left + columnDimensions[i - 1].width + 2
          : columnDimensions[i - 1].left + columnDimensions[i - 1].width;
      let columnWidth = 0;
      let columnHeigth = 0;

      const columnElement = document.querySelectorAll(
        `[data-colpos='${i}']`
      )[0];
      if (columnElement) {
        columnWidth = columnElement.getBoundingClientRect().width;
        columnHeigth = columnElement.getBoundingClientRect().height;
      }
      columnDimensions.push({
        left,
        width: columnWidth,
        height: columnHeigth
      });
    }
    this.setState({
      columnDimensions
    });
  };

  changeMode = mode => {
    this.setState({
      mode: mode
    });
  };

  render() {
    const { classes, AMIntervals, PMIntervals, t, theme } = this.props;
    let rows = [];
    for (let i = 0; i < 7; i += 1) {
      rows.push(
        <React.Fragment key={i}>
          <Grid
            key={i}
            className={classes.tableRow}
            onContextMenu={this.disableContextMenu}
          >
            <TableRow
              rowPos={i}
              onSelectionStart={this.handleSelectionStart}
              onCellMouseEnter={this.handleCellMouseEnter}
              timeIntervals={this.state.mode === 0 ? AMIntervals : PMIntervals}
            />
          </Grid>
        </React.Fragment>
      );
    }
    return (
      <div>
        <Grid container>
          <DayHeader changeMode={this.changeMode} mode={this.state.mode} />
          <Grid container item xs={10}>
            <TimeHeader mode={this.state.mode} />
            <Grid item xs={12}>
              <div className={classes.root}>
                {rows}
                {this.renderOverlay()}
              </div>
            </Grid>
          </Grid>
          <Grid xs={12} style={{ marginTop: 10 }}>
            <Typography
              style={{
                color: theme.palette.textSecondary.main,
                fontSize: "1em"
              }}
            >
              {t("Indications")}
            </Typography>
            <div style={{ padding: "20px" }}>
              <div
                style={{
                  float: "left",
                  marginLeft: "10px",
                  paddingRight: "20px"
                }}
              >
                <Fab
                  size="small"
                  variant="extended"
                  style={{ backgroundColor: "#394962" }}
                  disabled
                ></Fab>
                <Typography
                  style={{
                    color: theme.palette.textSecondary.main,
                    fontSize: "1em"
                  }}
                >
                  {t("Selected")}
                </Typography>
              </div>
              <div>
                <Fab
                  size="small"
                  variant="extended"
                  style={{ backgroundColor: "white" }}
                  disabled
                ></Fab>
                <Typography
                  style={{
                    color: theme.palette.textSecondary.main,
                    fontSize: "1em"
                  }}
                >
                  {t("Deselected")}
                </Typography>{" "}
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withTranslation()(
  withStyles(CustomStyles, { withTheme: true })(TablePicker)
);
