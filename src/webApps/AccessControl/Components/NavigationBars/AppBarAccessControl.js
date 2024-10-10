import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from '@mui/styles';
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import NavBarAccessControl from "../../utils/NavBarAccessControl";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuList from "@mui/material/MenuList";
import ChevronBottomIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import { Entities } from "../../../../utils/Enums";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import styles from "../../../../assets/styles/AccessControl_styles/NavigationBars_styles/appBarAccessControlStyles";
const mapStateToProps = ({ User }) => {
  return {
    currentUser: User.currentUser,
  };
};

class AppBarAccessControl extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      openMenuAdministration: false,
    };
    NavBarAccessControl.setAppBar(this);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateScreenMode);
  }

  updateScreenMode = () => {
    this.setState({ isDesktop: window.innerWidth > 900 });
  };

  componentDidMount() {
    this.updateScreenMode();
    window.addEventListener("resize", this.updateScreenMode);
  }

  handleToggle = () => {
    this.setState((state) => ({ open: !state.open }));
  };

  handleClose = (event) => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }
    this.setState({ open: false });
  };
  handleGoTo = (url) => {
    if (NavBarAccessControl.appNavigation.history.location.pathname !== url) {
      NavBarAccessControl.showLoader();
      NavBarAccessControl.appNavigation.history.push(url);
    }
  };

  handleLicence = (entities) => {
    const { currentUser } = this.props;
    if (currentUser)
      return (
        Object.keys(currentUser.permits).filter((v) =>
          entities.includes(v.toString())
        ).length > 0
      );
    else return null;
  };

  render() {
    const { classes, t } = this.props;
    const { open } = this.state;
    return (
      <div>
        <Toolbar style={{ paddingLeft: 0 }}>
          {this.handleLicence([
            Entities.PANELS.toString(),
            Entities.READERS.toString(),
            Entities.TIME_ZONES.toString(),
            Entities.ACCESS_LEVELS.toString(),
            Entities.CARD_FORMATS.toString(),
            Entities.VIRTUAL_ZONES.toString(),
            Entities.EVENTS_MONITOR.toString(),
          ]) && (
            <div>
              <Button
                buttonRef={(node) => {
                  this.anchorEl = node;
                }}
                className={classes.button}
                aria-owns={open ? "menu-list-grow" : undefined}
                aria-haspopup="true"
                onClick={this.handleToggle}
              >
                {t("Administration")}
                <ChevronBottomIcon />
              </Button>
              <Popper
                open={open}
                anchorEl={this.anchorEl}
                transition
                disablePortal
              >
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    id="menu-list-grow"
                    style={{
                      transformOrigin:
                        placement === "bottom" ? "center top" : "center bottom",
                    }}
                  >
                    <Paper>
                      <ClickAwayListener onClickAway={this.handleClose}>
                        <MenuList>
                          {this.handleLicence([Entities.PANELS.toString()]) && (
                            <MenuItem
                              onClick={(e) => {
                                this.handleGoTo("/panels");
                                this.handleClose(e);
                              }}
                            >
                              {t("Panels")}
                            </MenuItem>
                          )}
                          {this.handleLicence([
                            Entities.READERS.toString(),
                          ]) && (
                            <MenuItem
                              onClick={(e) => {
                                this.handleGoTo("/readers");
                                this.handleClose(e);
                              }}
                            >
                              {t("Readers")}
                            </MenuItem>
                          )}
                          {this.handleLicence([
                            Entities.TIME_ZONES.toString(),
                          ]) && (
                            <MenuItem
                              onClick={(e) => {
                                this.handleGoTo("/timezone");
                                this.handleClose(e);
                              }}
                            >
                              {t("TimeZones")}
                            </MenuItem>
                          )}
                          {this.handleLicence([
                            Entities.ACCESS_LEVELS.toString(),
                          ]) && (
                            <MenuItem
                              onClick={(e) => {
                                this.handleGoTo("/accesslevel");
                                this.handleClose(e);
                              }}
                            >
                              {t("AccessLevels")}
                            </MenuItem>
                          )}
                          {this.handleLicence([
                            Entities.CARD_FORMATS.toString(),
                          ]) && (
                            <MenuItem
                              onClick={(e) => {
                                this.handleGoTo("/cardformat");
                                this.handleClose(e);
                              }}
                            >
                              {t("CardFormats")}
                            </MenuItem>
                          )}
                          {this.handleLicence([
                            Entities.VIRTUAL_ZONES.toString(),
                          ]) && (
                            <MenuItem
                              onClick={(e) => {
                                this.handleGoTo("/virtualzone");
                                this.handleClose(e);
                              }}
                            >
                              {t("VirtualZone")}
                            </MenuItem>
                          )}
                          {this.handleLicence([
                            Entities.EVENTS_MONITOR.toString(),
                          ]) && (
                            <MenuItem
                              onClick={(e) => {
                                this.handleGoTo("/eventmonitoring");
                                this.handleClose(e);
                              }}
                            >
                              {t("EventMonitoring")}
                            </MenuItem>
                          )}
                          {this.handleLicence([Entities.BADGES.toString()]) &&
                            !this.state.isDesktop && (
                              <MenuItem
                                onClick={(e) => {
                                  this.handleGoTo("/eventmonitoring");
                                  this.handleClose(e);
                                }}
                                onClick={(e) => {
                                  this.handleGoTo("/badges");
                                  this.handleClose(e);
                                }}
                              >
                                {t("Badges")}
                              </MenuItem>
                            )}
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </div>
          )}
          {this.handleLicence([Entities.BADGES.toString()]) &&
            this.state.isDesktop && (
              <Button
                color="inherit"
                className={classes.button}
                onClick={() => this.handleGoTo("/badges")}
              >
                {t("Badges")}
              </Button>
            )}
        </Toolbar>
      </div>
    );
  }
}

AppBarAccessControl.propTypes = {
  classes: PropTypes.object.isRequired,
};

const NavigationConnected = connect(mapStateToProps, null)(AppBarAccessControl);

export default withTranslation()(withStyles(styles)(NavigationConnected));
