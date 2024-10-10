import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from '@mui/styles';
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import ChevronBottomIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import NavBarEasyAccess from "../../utils/NavBarEasyAccess";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuList from "@mui/material/MenuList";
import Divider from "@mui/material/Divider";
import { Entities } from "../../../../utils/Enums";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import styles from "../../../../assets/styles/EasyAccess_styles/NavigationBars_styles/appBarEasyAccessStyles";
const mapStateToProps = ({ User }) => {
  return {
    currentUser: User.currentUser,
  };
};

class AppBarEasyAccess extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      openMenuAdministration: false,
    };
    NavBarEasyAccess.setAppBar(this);
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
    if (NavBarEasyAccess.appNavigation.history.location.pathname !== url) {
      NavBarEasyAccess.showLoader();
      NavBarEasyAccess.appNavigation.history.push(url);
    }
  };

  handleLicence = (entities) => {
    const { currentUser } = this.props;
    return (
      Object.keys(currentUser.permits).filter((v) =>
        entities.includes(v.toString())
      ).length > 0
    );
  };

  render() {
    const { classes, t } = this.props;
    const { open } = this.state;
    return (
      <div>
        <Toolbar style={{ paddingLeft: 0, paddingRight: 0 }}>
          {this.handleLicence([
            Entities.EMPLOYEES.toString(),
            Entities.VISITORS.toString(),
            Entities.VEHICLES.toString(),
            Entities.COMPANIES.toString(),
            Entities.PERSON_STATUS.toString(),
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
                          {this.handleLicence([
                            Entities.EMPLOYEES.toString(),
                            Entities.VISITORS.toString(),
                          ]) && (
                            <MenuItem
                              onClick={(e) => {
                                this.handleGoTo("/register");
                                this.handleClose(e);
                              }}
                            >
                              {t("Registers")}
                            </MenuItem>
                          )}
                          <Divider />
                          {this.handleLicence([
                            Entities.EMPLOYEES.toString(),
                            Entities.VISITORS.toString(),
                          ]) && (
                            <MenuItem
                              onClick={(e) => {
                                this.handleGoTo("/persongroups");
                                this.handleClose(e);
                              }}
                            >
                              {t("PersonsGroups")}
                            </MenuItem>
                          )}
                          <Divider />
                          {this.handleLicence([
                            Entities.COMPANIES.toString(),
                          ]) && (
                            <MenuItem
                              onClick={(e) => {
                                this.handleGoTo("/enterprise");
                                this.handleClose(e);
                              }}
                            >
                              {t("enterprises")}
                            </MenuItem>
                          )}
                          <Divider />
                          {this.handleLicence([
                            Entities.PERSON_STATUS.toString(),
                          ]) && (
                            <MenuItem
                              onClick={(e) => {
                                this.handleGoTo("/status");
                                this.handleClose(e);
                              }}
                            >
                              {t("status")}
                            </MenuItem>
                          )}
                          {/* <Divider />
                          {this.handleLicence([
                            Entities.VEHICLES.toString()
                          ]) && (
                            <MenuItem
                              onClick={e => {
                                this.handleGoTo("/vehicles");
                                this.handleClose(e);
                              }}
                            >
                              {t("vehicles")}
                            </MenuItem>
                          )} */}
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </div>
          )}
          {/* {this.handleLicence([Entities.EVENTS.toString()]) && (
            <Button
              color="inherit"
              className={classes.button}
              onClick={() => this.handleGoTo("/calendar")}
            >
              {t("Calendar")}
            </Button>
          )} */}
        </Toolbar>
      </div>
    );
  }
}

AppBarEasyAccess.propTypes = {
  classes: PropTypes.object.isRequired,
};

const NavigationConnected = connect(mapStateToProps, null)(AppBarEasyAccess);

export default withTranslation()(withStyles(styles)(NavigationConnected));
