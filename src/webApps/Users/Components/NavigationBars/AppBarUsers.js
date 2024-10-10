import { withStyles } from '@mui/styles';
import Toolbar from "@mui/material/Toolbar";
import PropTypes from "prop-types";
import React, { Component } from "react";
import NavBarUsers from "../../utils/NavBarUsers";
import { withTranslation } from "react-i18next";
import styles from "../../../../assets/styles/User_styles/NavigationBars_styles/appBarUsersStyle";

class AppBarUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      openMenuAdministration: false
    };
    NavBarUsers.setAppBar(this);
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
    if (NavBarUsers.appNavigation.history.location.pathname !== url) {
      NavBarUsers.showLoader();
      NavBarUsers.appNavigation.history.push(url);
    }
  };

  render() {
    return (
      <div>
        <Toolbar>
          <div>
            {/* <Button
              buttonRef={node => {
                this.anchorEl = node;
              }}
              className={classes.button}
              aria-owns={open ? "menu-list-grow" : undefined}
              aria-haspopup="true"
              onClick={this.handleToggle}
            >
              {t("Users")}
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
                      placement === "bottom" ? "center top" : "center bottom"
                  }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={this.handleClose}>
                      <MenuList>
                        <MenuItem
                          onClick={e => {
                            this.handleGoTo("/home");
                            this.handleClose(e);
                          }}
                        >
                          {t("Users")}
                        </MenuItem>
                        <MenuItem
                          onClick={e => {
                            this.handleGoTo("/groups");
                            this.handleClose(e);
                          }}
                        >
                          {t("UserGroups")}
                        </MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper> */}
          </div>
        </Toolbar>
      </div>
    );
  }
}

AppBarUsers.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withTranslation()(withStyles(styles)(AppBarUsers));
