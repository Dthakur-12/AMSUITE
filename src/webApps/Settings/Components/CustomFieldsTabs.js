import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withStyles } from '@mui/styles';
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import CustomStyles from "../../../assets/styles/Settings_styles/CustomFieldsTabsStyles";
import EmployeeSettings from "./EmployeeSettings";
import VisitorSettings from "./VisitorSettings";
import EnterpriseSettings from "./EnterpriseSettings";
import AdministrationFields from "./AdministrationFields";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { withTranslation } from "react-i18next";
import NavBarSettings from "../utils/NavBarSettings";
class CustomFieldsTabs extends Component {
  constructor(props) {
    super(props);
    const { t } = this.props;
    this.state = {
      valueTab: 0,
    };
  }

  componentDidMount() {
    const { location, history } = this.props;
    if (!location.state) {
      history.push({
        pathname: "/",
      });
    }
  }
  handleChangeTab = (event, value) => {
    this.setState({ valueTab: value });
  };

  render() {
    const { classes, theme, t, location } = this.props;
    return (
      <main className={classes.layout}>
        <div className={classes.fill}>
          <AppBar
            style={{ marginTop: "5%", zIndex: 1 }}
            position="static"
            color="inherit"
          >
            <Tabs
              value={this.state.valueTab}
              onChange={this.handleChangeTab}
              indicatorColor="primary"
              textColor="inherit"
              variant="fullWidth"
              centered
            >
              <Tab className={classes.textTab} label={t("CustomizeFields")} />
              <Tab
                className={classes.textTab}
                label={t("AdministrateFields")}
              />
            </Tabs>
          </AppBar>
          { this.state.valueTab === 0 &&
            location.state &&
            location.state.option === "EMPLOYEE" && <EmployeeSettings /> }
          {this.state.valueTab === 1 &&
            location.state &&
            location.state.option === "EMPLOYEE" && (
              <AdministrationFields entity={location.state.option} subEntity={1}/>
            )
          }
          {this.state.valueTab === 0 &&
            location.state &&
            location.state.option === "VISITOR" && <VisitorSettings />}
          {this.state.valueTab === 1 &&
            location.state &&
            location.state.option === "VISITOR" && (
              <AdministrationFields entity={location.state.option} subEntity={2} />
            )}
        </div>
      </main>
    );
  }
}

CustomFieldsTabs.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

const CustomFieldsTabsConnected = connect()(CustomFieldsTabs);

export default withTranslation()(
  withStyles(CustomStyles, { withTheme: true })(CustomFieldsTabsConnected)
);
