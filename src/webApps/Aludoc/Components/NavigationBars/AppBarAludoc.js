import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from '@mui/styles';
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import Toolbar from "@mui/material/Toolbar";
import ChevronBottomIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import NavBarAludoc from "../../utils/NavBarAludoc";
import AmSuiteNavBar from "../../../../utils/AmSuiteNavBar";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuList from "@mui/material/MenuList";
import { Entities } from "../../../../utils/Enums";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import IconButton from "@mui/material/IconButton";
import styles from "../../../../assets/styles/Aludoc_styles/NavigationBars_styles/appBarAludocStyles.js";

const mapStateToProps = ({ User }) => {
  return {
    currentUser: User.currentUser,
  };
};

class AludocAppBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      openContracts: false,
      anchorElContract: null,
    };
    NavBarAludoc.setAppBar(this);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateScreenMode);
  }

  updateScreenMode = () => {
    this.setState({ isDesktop: window.innerWidth > 900 });
  };

  componentDidMount() {
    this.updateScreenMode();
  }

  handleToggle = () => {
    this.setState((state) => ({ open: !state.open }));
  };
  handleToggleContract = () => {
    this.setState((state) => ({ openContracts: !state.openContracts }));
  };

  handleClose = (event) => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }
    this.setState({ open: false, anchorElContract: null });
  };
  handleCloseContracts = (event) => {
    this.setState({ openContracts: false, anchorElContract: false });
    if (!this.state.isDesktop) {
      this.handleClose(event);
    }
  };
  handleGoTo = (url) => {
    console.log("url: ", url);
    if (
      NavBarAludoc.appNavigation &&
      NavBarAludoc.appNavigation.history.location.pathname !== url
    ) {
      console.log(
        "NavBarAludoc.appNavigation.history.location.pathname: ",
        NavBarAludoc.appNavigation.history.location.pathname
      );
      NavBarAludoc.showLoader();
      NavBarAludoc.appNavigation.history.push(url);
    } else if (!NavBarAludoc.appNavigation) {
      AmSuiteNavBar.appNavigation.history.push("/Aludoc" + `${url}`);
      //StartAmSuiteNavBar.appNavigation.history.push("/")
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
    const { open, isDesktop } = this.state;
    const { openContracts, anchorElContract } = this.state;
    return (
      (<div>
        <Toolbar style={{ paddingLeft: 0 }}>
          {this.handleLicence([
            Entities.EMPLOYEES.toString(),
            Entities.VISITORS.toString(),
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
                          {!isDesktop &&
                            this.handleLicence([
                              Entities.CONTROLS.toString(),
                              Entities.REQUIREMENTS.toString(),
                              Entities.DOCUMENT_TYPES.toString(),
                            ]) && (
                              <MenuItem>
                                <IconButton
                                  //  className={classes.button}
                                  aria-owns={
                                    openContracts ? "menu-appbar" : undefined
                                  }
                                  aria-haspopup="true"
                                  onClick={this.handleToggleContract}
                                  className={classes.iconControlButton}
                                  style={{
                                    fontSize: 14,
                                    marginTop: 7,
                                    padding: 0,
                                  }}
                                  size="large">
                                  {t("Controls")}
                                  <ChevronBottomIcon />
                                </IconButton>
                              </MenuItem>
                            )}
                          <div>
                            <Popper
                              open={openContracts}
                              anchorEl={anchorElContract}
                              transition
                              disablePortal
                            >
                              {({ TransitionProps, placement }) => (
                                <Grow
                                  {...TransitionProps}
                                  id="menu-list-contract"
                                  style={{
                                    transformOrigin:
                                      placement === "bottom"
                                        ? "center top"
                                        : "center bottom",
                                  }}
                                >
                                  <Paper>
                                    <ClickAwayListener
                                      onClickAway={this.handleCloseContracts}
                                    >
                                      <MenuList>
                                        {this.handleLicence([
                                          Entities.CONTROLS.toString(),
                                        ]) && (
                                          <MenuItem
                                            onClick={(e) => {
                                              this.handleGoTo("/mycontracts");
                                              this.handleCloseContracts(e);
                                            }}
                                          >
                                            {t("myContracts")}
                                          </MenuItem>
                                        )}
                                        {this.handleLicence([
                                          Entities.DOCUMENT_TYPES.toString(),
                                        ]) && (
                                          <MenuItem
                                            onClick={(e) => {
                                              this.handleGoTo("/documentType");
                                              this.handleCloseContracts(e);
                                            }}
                                          >
                                            {t("DocumentTypes")}
                                          </MenuItem>
                                        )}
                                      </MenuList>
                                    </ClickAwayListener>
                                  </Paper>
                                </Grow>
                              )}
                            </Popper>
                          </div>

                          {/* <Divider /> */}
                          {/* {this.handleLicence([
                            Entities.PERSON_STATUS.toString()
                          ]) && (
                            <MenuItem
                              onClick={e => {
                                this.handleGoTo("/status");
                                this.handleClose(e);
                              }}
                            >
                              {t("status")}
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
          {this.handleLicence([
            Entities.CONTROLS.toString(),
            Entities.REQUIREMENTS.toString(),
            Entities.DOCUMENT_TYPES.toString(),
          ]) &&
            isDesktop && (
              <div>
                <Button
                  className={classes.button}
                  aria-owns={openContracts ? "menu-list-contract" : undefined}
                  aria-haspopup="true"
                  onClick={this.handleToggleContract}
                >
                  {t("Controls")}
                  <ChevronBottomIcon />
                </Button>
                <Popper
                  open={openContracts}
                  anchorEl={anchorElContract}
                  transition
                  disablePortal
                >
                  {({ TransitionProps, placement }) => (
                    <Grow
                      {...TransitionProps}
                      id="menu-list-contract"
                      style={{
                        transformOrigin:
                          placement === "bottom"
                            ? "center top"
                            : "center bottom",
                      }}
                    >
                      <Paper>
                        <ClickAwayListener
                          onClickAway={this.handleCloseContracts}
                        >
                          <MenuList>
                            {this.handleLicence([
                              Entities.CONTROLS.toString(),
                            ]) && (
                              <MenuItem
                                onClick={(e) => {
                                  this.handleGoTo("/mycontracts");
                                  this.handleCloseContracts(e);
                                }}
                              >
                                {t("myContracts")}
                              </MenuItem>
                            )}
                            {this.handleLicence([
                              Entities.DOCUMENT_TYPES.toString(),
                            ]) && (
                              <MenuItem
                                onClick={(e) => {
                                  this.handleGoTo("/documentType");
                                  this.handleCloseContracts(e);
                                }}
                              >
                                {t("DocumentTypes")}
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
        </Toolbar>
      </div>)
    );
  }
}

AludocAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

const AludocAppBarConnected = connect(mapStateToProps, null)(AludocAppBar);

export default withTranslation()(withStyles(styles)(AludocAppBarConnected));
