import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from '@mui/styles';
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import ChevronBottomIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import NavBarSettings from "../../utils/NavBarSettings";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuList from "@mui/material/MenuList";
import { Entities } from "../../../../utils/Enums";
import { connect } from "react-redux";
import IconButton from "@mui/material/IconButton";
import { withTranslation } from "react-i18next";
import CustomStyles from "../../../../assets/styles/Settings_styles/NavigationBars/AppBarSettingsStyles";
import { isNullOrUndefined } from "util";

const mapStateToProps = ({ User }) => {
  return {
    currentUser: User.currentUser,
  };
};

class AppBarSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      openConfigurableFields: false,
      openProducts: false,
      currentTarget: "",
    };
    NavBarSettings.setAppBar(this);
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

  handleToggle = (e) => {
    let name = e.currentTarget.name;
    let openProducts = this.state.openProducts;
    let openConfigurableFields = this.state.openConfigurableFields;
    this.setState({
      openProducts: !openProducts && name === "Products",
      openConfigurableFields:
        !openConfigurableFields && name === "ConfigurableFields",
    });
  };

  handleToggleAdministration = () => {
    this.setState((state) => ({
      openAdministration: !state.openAdministration,
    }));
  };

  handleCloseAdministration = (event) => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }
    this.setState({ openAdministration: false, anchorElContract: null });
  };

  handleCloseConfigurableFields = (event) => {
    if (
      !isNullOrUndefined(this.state.anchorEl) &&
      this.state.anchorEl.contains(event.target)
    ) {
      return;
    }
    if (this.state.openConfigurableFields) {
      this.setState({
        openConfigurableFields: false,
        openAdministration: false,
      });
    }
  };

  handleCloseProducts = (event) => {
    if (
      !isNullOrUndefined(this.state.anchorEl) &&
      this.state.anchorEl.contains(event.target)
    ) {
      return;
    }
    if (this.state.openProducts) {
      this.setState({ openProducts: false, openAdministration: false });
    }
  };

  handleGoTo = (url, state) => {
    if (
      NavBarSettings.appNavigation.history.location.pathname !== url ||
      NavBarSettings.appNavigation.history.location.state !== state
    ) {
      // NavBarSettings.showLoader();
      NavBarSettings.appNavigation.history.push({
        pathname: url,
        state: state,
      });
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
    const { open, isDesktop, openAdministration } = this.state;
    if (isDesktop)
      return (
        <div>
          {this.handleLicence([Entities.SETTINGS.toString()]) && (
            <Toolbar style={{ paddingLeft: 0 }}>
              <Button
                color="inherit"
                className={classes.button}
                onClick={() => this.handleGoTo("/system")}
              >
                {t("System")}
              </Button>
              {this.handleLicence([
                Entities.EMPLOYEES.toString(),
                Entities.VISITORS.toString(),
                Entities.VEHICLES.toString(),
                Entities.COMPANIES.toString(),
              ]) && (
                <ClickAwayListener
                  onClickAway={this.handleCloseConfigurableFields}
                >
                  <div>
                    <Button
                      buttonRef={(node) => () =>
                        this.setState({ anchorEl: node })}
                      className={classes.button}
                      aria-owns={open ? "menu-list-grow" : undefined}
                      aria-haspopup="true"
                      onClick={this.handleToggle}
                      name="ConfigurableFields"
                    >
                      {t("ConfigurableFields")}
                      <ChevronBottomIcon />
                    </Button>
                    <Popper
                      open={this.state.openConfigurableFields}
                      anchorEl={this.state.anchorEl}
                      transition
                      disablePortal
                    >
                      {({ TransitionProps, placement }) => (
                        <Grow
                          {...TransitionProps}
                          id="menu-list-grow"
                          style={{
                            transformOrigin:
                              placement === "bottom"
                                ? "center top"
                                : "center bottom",
                          }}
                        >
                          <Paper>
                            <MenuList>
                              <MenuItem
                                onClick={(e) => {
                                  this.handleGoTo("/CustomFieldsTabs", {
                                    option: "EMPLOYEE",
                                  });
                                  this.handleCloseConfigurableFields(e);
                                }}
                              >
                                {t("Employees")}
                              </MenuItem>
                              <MenuItem
                                onClick={(e) => {
                                  this.handleGoTo("/CustomFieldsTabs", {
                                    option: "VISITOR",
                                  });
                                  this.handleCloseConfigurableFields(e);
                                }}
                              >
                                {t("Visitors")}
                              </MenuItem>

                              <MenuItem
                                onClick={(e) => {
                                  this.handleGoTo("/personGroupSettings");
                                  this.handleCloseConfigurableFields(e);
                                }}
                              >
                                {t("PersonsGroups")}
                              </MenuItem>
                              {/* <MenuItem
                              onClick={e => {
                                this.handleGoTo("/vehicleSettings");
                                this.handleCloseConfigurableFields(e);
                              }}
                            >
                              {t("Vehicle")}
                            </MenuItem> */}
                              <MenuItem
                                onClick={(e) => {
                                  this.handleGoTo("/enterpriseSettings");
                                  this.handleCloseConfigurableFields(e);
                                }}
                              >
                                {t("enterprise")}
                              </MenuItem>
                              <MenuItem
                                onClick={(e) => {
                                  this.handleGoTo("/AdministrationFields", {
                                    option: "BADGE",
                                  });
                                  this.handleCloseConfigurableFields(e);
                                }}
                              >
                                {t("Badges")}
                              </MenuItem>
                            </MenuList>
                          </Paper>
                        </Grow>
                      )}
                    </Popper>
                  </div>
                </ClickAwayListener>
              )}

              {this.handleLicence([
                Entities.DOCUMENTS.toString(),
                Entities.VISITORS.toString(),
                Entities.MUSTER_ZONES.toString(),
                Entities.PRINTERS.toString(),
              ]) && (
                <ClickAwayListener onClickAway={this.handleCloseProducts}>
                  <div>
                    <Button
                      buttonRef={(node) => () =>
                        this.setState({ anchorEl: node })}
                      className={classes.button}
                      aria-owns={open ? "menu-list-grow" : undefined}
                      aria-haspopup="true"
                      onClick={this.handleToggle}
                      name="Products"
                    >
                      {t("Products")}
                      <ChevronBottomIcon />
                    </Button>
                    <Popper
                      open={this.state.openProducts}
                      anchorEl={this.state.anchorEl}
                      transition
                      disablePortal
                    >
                      {({ TransitionProps, placement }) => (
                        <Grow
                          {...TransitionProps}
                          id="menu-list-grow"
                          style={{
                            transformOrigin:
                              placement === "bottom"
                                ? "center top"
                                : "center bottom",
                          }}
                        >
                          <Paper>
                            <MenuList>
                              <MenuItem
                                onClick={(e) => {
                                  this.handleGoTo("/notificationSettings");
                                  this.handleCloseProducts(e);
                                }}
                              >
                                {t("Aludoc")}
                              </MenuItem>
                              <MenuItem
                                onClick={(e) => {
                                  this.handleGoTo("/easyAccessSettings");
                                  this.handleCloseProducts(e);
                                }}
                              >
                                {t("EasyAccess")}
                              </MenuItem>
                              <MenuItem
                                onClick={(e) => {
                                  this.handleGoTo("/musteringSettings");
                                  this.handleCloseProducts(e);
                                }}
                              >
                                {t("Mustering")}
                              </MenuItem>
                              <MenuItem
                                onClick={(e) => {
                                  this.handleGoTo("/tikasSettings");
                                  this.handleCloseProducts(e);
                                }}
                              >
                                {t("Tikas")}
                              </MenuItem>
                              <MenuItem
                                onClick={(e) => {
                                  this.handleGoTo("/accessControlSettings");
                                  this.handleCloseProducts(e);
                                }}
                              >
                                Alutel Mobile
                              </MenuItem>
                            </MenuList>
                          </Paper>
                        </Grow>
                      )}
                    </Popper>
                  </div>
                </ClickAwayListener>
              )}
              <Button
                color="inherit"
                className={classes.button}
                onClick={() => this.handleGoTo("/licenceSetting")}
              >
                {t("License")}
              </Button>
              {/* <Button
              color="inherit"
              className={classes.button}
              onClick={() => this.handleGoTo("/fileUpload")}
            >
              {t("UpdateCardholders")}
            </Button> */}
              {/* <Button
              color="inherit"
              className={classes.button}
              onClick={() => this.handleGoTo("/samlSetting")}
            >
              {t("SAML")}
            </Button> */}
            </Toolbar>
          )}
        </div>
      );
    else
      return (
        (<div>
          {this.handleLicence([Entities.SETTINGS.toString()]) && (
            <Toolbar style={{ paddingLeft: 0 }}>
              <Button
                buttonRef={(node) => {
                  this.anchorEl = node;
                }}
                className={classes.button}
                aria-owns={openAdministration ? "menu-list-grow" : undefined}
                aria-haspopup="true"
                onClick={this.handleToggleAdministration}
              >
                {t("Administration")}
                <ChevronBottomIcon />
              </Button>
              <Popper
                open={openAdministration}
                anchorEl={this.anchorEl}
                transition
                disablePortal
              >
                {({ TransitionProps, placement }) => (
                  <Grow {...TransitionProps} id="menu-list-grow">
                    <Paper>
                      <ClickAwayListener
                        onClickAway={this.handleCloseAdministration}
                      >
                        <MenuList>
                          <MenuItem
                            onClick={(e) => {
                              this.handleGoTo("/system");
                            }}
                          >
                            {t("System")}
                          </MenuItem>
                          <MenuItem
                            onClick={(e) => {
                              this.handleGoTo("/licenceSetting");
                            }}
                          >
                            {t("License")}
                          </MenuItem>
                          {this.handleLicence([
                            Entities.DOCUMENTS.toString(),
                            Entities.VISITORS.toString(),
                            Entities.MUSTER_ZONES.toString(),
                            Entities.PRINTERS.toString(),
                          ]) && (
                            <ClickAwayListener
                              onClickAway={this.handleCloseProducts}
                            >
                              <div>
                                <MenuItem>
                                  <IconButton
                                    buttonRef={(node) => {
                                      this.anchorElProduct = node;
                                    }}
                                    className={classes.iconControlButton}
                                    aria-owns={
                                      open ? "menu-list-grow" : undefined
                                    }
                                    aria-haspopup="true"
                                    onClick={this.handleToggle}
                                    style={{
                                      fontSize: 14,
                                      marginTop: 7,
                                      padding: 0,
                                    }}
                                    name="Products"
                                    size="large">
                                    {t("Products")}
                                    <ChevronBottomIcon />
                                  </IconButton>
                                </MenuItem>
                                <Popper
                                  open={this.state.openProducts}
                                  anchorEl={this.anchorElProduct}
                                  transition
                                  placement="right-start"
                                  disablePortal
                                  style={{ zIndex: 1 }}
                                >
                                  {({ TransitionProps, placement }) => (
                                    <Grow
                                      {...TransitionProps}
                                      id="menu-list-grow"
                                    >
                                      <Paper>
                                        <MenuList>
                                          <MenuItem
                                            onClick={(e) => {
                                              this.handleGoTo(
                                                "/notificationSettings"
                                              );
                                              this.handleCloseProducts(e);
                                            }}
                                          >
                                            {t("Aludoc")}
                                          </MenuItem>
                                          <MenuItem
                                            onClick={(e) => {
                                              this.handleGoTo(
                                                "/easyAccessSettings"
                                              );
                                              this.handleCloseProducts(e);
                                            }}
                                          >
                                            {t("EasyAccess")}
                                          </MenuItem>
                                          <MenuItem
                                            onClick={(e) => {
                                              this.handleGoTo(
                                                "/musteringSettings"
                                              );
                                              this.handleCloseProducts(e);
                                            }}
                                          >
                                            {t("Mustering")}
                                          </MenuItem>
                                          <MenuItem
                                            onClick={(e) => {
                                              this.handleGoTo("/tikasSettings");
                                              this.handleCloseProducts(e);
                                            }}
                                          >
                                            {t("Tikas")}
                                          </MenuItem>
                                        </MenuList>
                                      </Paper>
                                    </Grow>
                                  )}
                                </Popper>
                              </div>
                            </ClickAwayListener>
                          )}
                          {this.handleLicence([
                            Entities.EMPLOYEES.toString(),
                            Entities.VISITORS.toString(),
                            Entities.VEHICLES.toString(),
                            Entities.COMPANIES.toString(),
                          ]) && (
                            <ClickAwayListener
                              onClickAway={this.handleCloseConfigurableFields}
                            >
                              <div>
                                <MenuItem>
                                  <IconButton
                                    buttonRef={(node) => {
                                      this.anchorElConfig = node;
                                    }}
                                    className={classes.iconControlButton}
                                    aria-owns={
                                      open ? "menu-list-grow" : undefined
                                    }
                                    aria-haspopup="true"
                                    onClick={this.handleToggle}
                                    style={{
                                      fontSize: 14,
                                      marginTop: 7,
                                      padding: 0,
                                    }}
                                    name="ConfigurableFields"
                                    size="large">
                                    {t("ConfigurableFields")}
                                    <ChevronBottomIcon />
                                  </IconButton>
                                </MenuItem>
                                <Popper
                                  open={this.state.openConfigurableFields}
                                  anchorEl={this.anchorElConfig}
                                  placement="bottom-end"
                                  transition
                                  disablePortal
                                >
                                  {({ TransitionProps, placement }) => (
                                    <Grow
                                      {...TransitionProps}
                                      id="menu-list-grow"
                                    >
                                      <Paper>
                                        <MenuList>
                                          <MenuItem
                                            onClick={(e) => {
                                              this.handleGoTo(
                                                "/CustomFieldsTabs",
                                                {
                                                  option: "EMPLOYEE",
                                                }
                                              );
                                              this.handleCloseConfigurableFields(
                                                e
                                              );
                                            }}
                                          >
                                            {t("Employees")}
                                          </MenuItem>
                                          <MenuItem
                                            onClick={(e) => {
                                              this.handleGoTo(
                                                "/CustomFieldsTabs",
                                                {
                                                  option: "VISITOR",
                                                }
                                              );
                                              this.handleCloseConfigurableFields(
                                                e
                                              );
                                            }}
                                          >
                                            {t("Visitors")}
                                          </MenuItem>
                                          {/* <MenuItem
                              onClick={e => {
                                this.handleGoTo("/vehicleSettings");
                                this.handleCloseConfigurableFields(e);
                              }}
                            >
                              {t("Vehicle")}
                            </MenuItem> */}
                                          <MenuItem
                                            onClick={(e) => {
                                              this.handleGoTo(
                                                "/enterpriseSettings"
                                              );
                                              this.handleCloseConfigurableFields(
                                                e
                                              );
                                            }}
                                          >
                                            {t("enterprise")}
                                          </MenuItem>
                                          <MenuItem
                                            onClick={(e) => {
                                              this.handleGoTo(
                                                "/AdministrationFields",
                                                {
                                                  option: "BADGE",
                                                }
                                              );
                                              this.handleCloseConfigurableFields(
                                                e
                                              );
                                            }}
                                          >
                                            {t("Badges")}
                                          </MenuItem>
                                        </MenuList>
                                      </Paper>
                                    </Grow>
                                  )}
                                </Popper>
                              </div>
                            </ClickAwayListener>
                          )}
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </Toolbar>
          )}
        </div>)
      );
  }
}

AppBarSettings.propTypes = {
  classes: PropTypes.object.isRequired,
};

const NavigationConnected = connect(mapStateToProps, null)(AppBarSettings);

export default withTranslation()(withStyles(CustomStyles)(NavigationConnected));
