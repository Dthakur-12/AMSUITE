import React from "react";
import TikasHome from "./TikasHome";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { withTranslation } from "react-i18next";
import { withStyles } from '@mui/styles';
import CustomStyles from "../../../../assets/styles/Settings_styles/Tikas/TikasStyles";
import { isNullOrUndefined } from "util";
import Avatar from "@mui/material/Avatar";
import PersonIcon from "@mui/icons-material/PersonRounded";
import Typography from "@mui/material/Typography";
import NavBarSettings from "../../utils/NavBarSettings";

const mapStateToProps = ({ Tikas }) => {
  return {};
};
const mapDispatchToPrps = {};

class TikasSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateScreenMode);
  }
  updateScreenMode = () => {
    this.setState({ isDesktop: window.innerWidth > 900 });
  };

  componentDidMount() {
    this.updateScreenMode();
    NavBarSettings.hideLoader();
  }

  render() {
    const { t, classes } = this.props;
    const { printers, isDesktop } = this.state;
    return (
      <main
        className={classes.layout}
        style={isDesktop ? null : { width: "96%", marginLeft: "2%" }}
      >
        <div className={classes.fill}>
          <TikasHome />
        </div>
      </main>
    );
  }
}

const TikasSettingsConnected = connect(
  mapStateToProps,
  mapDispatchToPrps
)(TikasSettings);

export default withTranslation()(
  withStyles(CustomStyles)(TikasSettingsConnected)
);
