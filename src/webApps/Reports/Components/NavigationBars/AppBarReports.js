import { withStyles } from '@mui/styles';
import Toolbar from "@mui/material/Toolbar";
import PropTypes from "prop-types";
import React, { Component } from "react";
import NavBarReports from "../../utils/NavBarReports";

class AppBarReports extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      openMenuAdministration: false
    };
    NavBarReports.setAppBar(this);
  }
  handleToggle = () => {
    this.setState(state => ({ open: !state.open }));
  };

  handleClose = event => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }
    this.setState({ open: false });
  };
  handleGoTo = url => {
    if (NavBarReports.appNavigation.history.location.pathname !== url) {
      NavBarReports.showLoader();
      NavBarReports.appNavigation.history.push(url);
    }
  };

  render() {
    // const { classes } = this.props;
    // const { open } = this.state;
    return (
      <div>
        <Toolbar>
          {/* <Button
                        buttonRef={node => {
                            this.anchorEl = node;
                        }}
                        className={classes.button}
                        aria-owns={open ? 'menu-list-grow' : undefined}
                        aria-haspopup="true"
                        onClick={this.handleToggle}
                    >
                        Administración
                            <ChevronBottomIcon />
                    </Button> */}
          {/* <Popper open={open} anchorEl={this.anchorEl} transition disablePortal>
                        {({ TransitionProps, placement }) => (
                            <Grow
                                {...TransitionProps}
                                id="menu-list-grow"
                                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                            >
                                <Paper>
                                    <ClickAwayListener onClickAway={this.handleClose}>
                                        <MenuList>
                                            <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                                            <MenuItem onClick={this.handleClose}>My account</MenuItem>
                                            <MenuItem onClick={this.handleClose}>Logout</MenuItem>
                                        </MenuList>
                                    </ClickAwayListener>
                                </Paper>
                            </Grow>
                        )}
                    </Popper>

                    <Button color='inherit' className={classes.button} onClick={() => this.handleGoTo('/calendar')} >
                        Calendario
                    </Button> */}
        </Toolbar>
      </div>
    );
  }
}

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit
  },
  withoutLabel: {
    marginTop: theme.spacing.unit * 3
  },
  textField: {
    flexBasis: 200
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  },
  button: {
    margin: theme.spacing.unit,
    textTransform: "none",
    borderRadius: 0,
    paddingBottom: 0,
    color: theme.palette.text.main,
    borderBottom: "1px solid " + theme.palette.text.main,
    "&:hover": {
      background: "transparent",
      borderBottom: "1px solid " + theme.palette.primary.main
    }
  },
  extendedIcon: {
    marginRight: theme.spacing.unit
  }
});

AppBarReports.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AppBarReports);
