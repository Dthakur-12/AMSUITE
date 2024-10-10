import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from '@mui/styles';
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import ChevronBottomIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import NavBarSettings from "../../utils/NavBarMustering";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuList from "@mui/material/MenuList";
import { Entities } from "../../../../utils/Enums";
import { connect } from "react-redux";
import IconButton from "@mui/material/IconButton";
import { withTranslation } from "react-i18next";
import styles from "../../../../assets/styles/Mustering_styles/NavigationBars_styles/appBarMusteringStyles";
import { isNullOrUndefined } from "util";

const mapStateToProps = ({ User }) => {
  return {
    currentUser: User.currentUser,
  };
};

class AppBarMustering extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      openConfigurableFields: false,
      currentTarget: "",
      selected: props.t("Mustering")
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
    let openConfigurableFields = this.state.openConfigurableFields;
    this.setState({
      openConfigurableFields:
        !openConfigurableFields && name === "ConfigurableFields",
    });
  };

  handleToggleMustering = () => {
    this.setState((state) => ({
      openMustering: !state.openMustering,
    }));
  };

  handleClose = (event) => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }
    this.setState({ openMustering: false, anchorElContract: null });
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
        openMustering: false,
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
  

  
  render() {
    const { classes, t } = this.props;
    const { openMustering } = this.state;

    return (
      <div>
        
          <Toolbar style={{ paddingLeft: 0 }}>
            <Button
              buttonRef={(node) => {
                this.anchorEl = node;
              }}
              className={classes.button}
              aria-owns={openMustering ? "menu-list-grow" : undefined}
              aria-haspopup="true"
              onClick={this.handleToggleMustering}
            >
                {this.state.selected}
              <ChevronBottomIcon />
            </Button>
            <Popper
              open={openMustering}
              anchorEl={this.anchorEl}
              transition
              disablePortal
            >
              {({ TransitionProps, placement }) => (
                <Grow {...TransitionProps} id="menu-list-grow">
                  <Paper>
                    <ClickAwayListener
                      onClickAway={this.handleClose}
                    >
                      <MenuList>
                        <MenuItem
                          onClick={(e) => {
                            this.setState({selected:t("Zones")})
                            this.handleGoTo("/zones");
                            this.handleClose(e);
                          }}
                        >
                          {t("Zones")}
                        </MenuItem>
                        <MenuItem
                          onClick={(e) => {
                            this.setState({selected:t("Area")})
                            this.handleGoTo("/area");
                            this.handleClose(e);
                          }}
                        >
                          {t("Area")}
                        </MenuItem>
                        <MenuItem
                          onClick={(e) => {
                            this.setState({selected:t("AreaGroup")})
                            this.handleGoTo("/areagroup");
                            this.handleClose(e);
                          }}
                        >
                          {t("AreaGroup")}
                        </MenuItem>
                        <MenuItem
                          onClick={(e) => {
                            this.setState({selected:t("Activity")})
                            this.handleGoTo("/activity");
                            this.handleClose(e);
                          }}
                        >
                          {t("Activity")}
                        </MenuItem>
                        <MenuItem
                          onClick={(e) => {
                            this.setState({selected:t("ActiveMusteringEvent")})
                            this.handleGoTo("/activemusterevent");
                            this.handleClose(e);
                          }}
                        >
                          {t("ActiveMusteringEvents")}
                        </MenuItem>
                        <MenuItem
                          onClick={(e) => {
                            this.setState({selected:t("NewMusterEvent")})
                            this.handleGoTo("/newmusterevent");
                            this.handleClose(e);
                          }}
                        >
                          <Button
                            variant="contained"
                          >
                            {t("NewMusterEvent")}
                          </Button>
                        </MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </Toolbar>
        
      </div>
    );
  }
}

AppBarMustering.propTypes = {
  classes: PropTypes.object.isRequired,
};

const NavigationConnected = connect(mapStateToProps, null)(AppBarMustering);

export default withTranslation()(withStyles(styles)(NavigationConnected));
