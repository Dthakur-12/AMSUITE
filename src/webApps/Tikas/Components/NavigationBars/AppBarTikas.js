import Button from "@mui/material/Button";
import { withStyles } from '@mui/styles';
import Toolbar from "@mui/material/Toolbar";
import PropTypes from "prop-types";
import React, { Component } from "react";
import NavBarTikas from "../../utils/NavBarTikas";
import { withTranslation } from "react-i18next";
import CustomStyles from "../../../../assets/styles/Tikas_styles/NavigationBar/AppBarTikasStyles";

class AppBarTikas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      openMenuAdministration: false,
    };
    NavBarTikas.setAppBar(this);
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
    if (NavBarTikas.appNavigation.history.location.pathname !== url) {
      NavBarTikas.showLoader();
      NavBarTikas.appNavigation.history.push(url);
    }
  };

  render() {
    const { classes, t } = this.props;
    // const { open } = this.state;
    return (
      <div>
        <Toolbar style={{ paddingLeft: 0 }}>
          <Button
            color="inherit"
            className={classes.button}
            onClick={() => this.handleGoTo("/home")}
          >
            {t("Products")}
          </Button>
          <Button
            color="inherit"
            className={classes.button}
            onClick={() => this.handleGoTo("/stalls")}
          >
            {t("Stalls")}
          </Button>
        </Toolbar>
      </div>
    );
  }
}

AppBarTikas.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withTranslation()(withStyles(CustomStyles)(AppBarTikas));
