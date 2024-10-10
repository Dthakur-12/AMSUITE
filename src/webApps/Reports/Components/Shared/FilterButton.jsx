import {
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Popper,
  Zoom,
} from "@mui/material";
import { withTranslation } from "react-i18next";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Fab from "@mui/material/Fab";
import { withStyles } from '@mui/styles';
import FilterIcon from "@mui/icons-material/FilterListRounded";
import "moment/locale/es";
import PropTypes from "prop-types";
import React, { Component } from "react";

class FilterButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      openFilter: false,
      filterData: {
        startDate: new Date().setDate(1),
        endDate: new Date().setDate(31),
      },
      isLoadingTypes: true,
      openDialogEnterprises: false,
      formErrors: {},
    };
  }

  handleFilterClick = (e) => {
    const { currentTarget } = e;
    this.setState((state) => ({
      anchorEl: currentTarget,
      openFilter: !state.openFilter,
    }));
  };

  componentDidMount() {}

  handleArrowRef = (node) => {
    this.setState({
      arrowRef: node,
    });
  };

  handleClickAway = () => {
    if (this.props.withOutListener) return;
    this.setState({
      openFilter: false,
    });
  };

  render() {
    const { classes, t } = this.props;

    const { anchorEl, openFilter, arrowRef } = this.state;
    return (
      <div className={classes.topActions}>
        <Fab
          onClick={this.handleFilterClick}
          variant="extended"
          className={classes.fab}
          style={{ width: "110px", height: 30, fontSize: 12 }}
          color="primary"
        >
          <FilterIcon className={classes.fab} fontSize="small" />
          {t("filter")}
        </Fab>
        <Popper
          open={openFilter}
          anchorEl={anchorEl}
          modifiers={{
            arrow: {
              enabled: true,
              element: arrowRef,
            },
          }}
          transition
          className={classes.popper}
        >
          {({ TransitionProps }) => (
            <ClickAwayListener onClickAway={this.handleClickAway}>
              <Zoom {...TransitionProps} timeout={350}>
                <Paper className={classes.paper}>
                  <span className={classes.arrow} ref={this.handleArrowRef} />
                  {/* <DialogTitle>{this.props.title}</DialogTitle> */}
                  <DialogContent className={classes.dialogContent}>
                    {this.props.body}
                  </DialogContent>
                  {/* <DialogActions>{this.props.actions}</DialogActions> */}
                </Paper>
              </Zoom>
            </ClickAwayListener>
          )}
        </Popper>
      </div>
    );
  }
}

const styles = (theme) => ({
  fab: {
    margin: theme.spacing.unit,
    pointerEvents: "auto",
  },
  root: {
    display: "flex",
  },
  bottomActions: {
    position: "fixed",
    bottom: 10,
    right: 0,
  },
  topActions: {
    position: "fixed",
    top: 72,
    width: "calc(100% - 97px)",
    zIndex: 101,
    justifyContent: "center",
    pointerEvents: "none",
    display: "flex",
    [theme.breakpoints.down('lg')]: {
      top: 60,
      right: 0,
      justifyContent: "flex-end",
    },
  },
  chartContainer: {
    marginLeft: -22,
  },
  tableContainer: {
    height: 320,
  },
  typography: {
    padding: theme.spacing.unit * 2,
  },
  arrow: {
    position: "absolute",
    fontSize: 7,
    width: "3em",
    height: "3em",
    "&::before": {
      content: '""',
      margin: "auto",
      display: "block",
      width: 0,
      height: 0,
      borderStyle: "solid",
    },
  },
  popper: {
    zIndex: 500,
    '&[x-placement*="bottom"] $arrow': {
      top: 0,
      marginTop: "-0.9em",
      width: "3em",
      height: "1em",
      "&::before": {
        borderWidth: "0 1em 1em 1em",
        borderColor: `transparent transparent #424242 transparent`,
      },
    },
    display: "flex",
    justifyContent: "center",
    [theme.breakpoints.down('lg')]: {
      maxHeight: "70%",
      width: "90%",
    },
  },
  paper: { zIndex: 500, width: "100%" },
  dialogContent: {
    maxHeight: "100%",
  },
  grid: {
    flexDirection: "column",
    display: "flex",
    justifyContent: "space-between",
  },
});

FilterButton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withTranslation()(withStyles(styles)(FilterButton));
