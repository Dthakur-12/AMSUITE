import { withStyles } from "@mui/styles";
import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import FieldSettings from "./FieldsSettings";
import CustomFieldsSettings from "./CustomFieldsSettings";
import {
  requestGroupPersonSettings,
  requestSetGroupPersonSetting,
} from "../../../../actions/Settings/settings_actions";
import SnackbarHandler from "../../../../utils/SnackbarHandler";

class PersonGroupAdministrationField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabValue: 0,
    };
  }

  handleChangeTab = (event, value) => {
    this.setState({ tabValue: value });
  };

  loadFieldsSettings = () => {
    const { selectedPersonGroup } = this.props;
    if (selectedPersonGroup) {
      this.props.requestGroupPersonSettings([selectedPersonGroup.id]);
    }
  };

  saveSettings = (newSettings) => {
    const { selectedPersonGroup } = this.props;
    this.props.requestSetGroupPersonSetting({
      id: selectedPersonGroup.id,
      ...newSettings,
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.props.isSuccess && this.props.isSuccess !== prevProps.isSuccess) {
      this.props.isEdit
        ? SnackbarHandler.showMessage(this.props.t("successEditPerson"))
        : SnackbarHandler.showMessage(this.props.t("successCreatePerson"));
      this.setState({
        isSuccess: true,
      });
      setTimeout(() => {
        this.setState({
          isSuccess: false,
        });
      }, 1000);
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.isLoading !== prevState.isLoading) {
      return {
        isLoading: nextProps.isLoading,
      };
    } else return null;
  }

  render() {
    const { t, classes, selectedPersonGroup, personGroupSettings } = this.props;
    const { isSuccess, isLoading } = this.state;
    return selectedPersonGroup ? (
      <div>
        <AppBar style={{ zIndex: 1 }} position="static" color="inherit">
          <Tabs
            value={this.state.tabValue}
            onChange={this.handleChangeTab}
            indicatorColor="primary"
            textColor="inherit"
            variant="fullWidth"
            centered
          >
            <Tab className={classes.textTab} label={t("CustomizeFields")} />
            <Tab className={classes.textTab} label={t("AdministrateFields")} />
          </Tabs>
        </AppBar>
        {this.state.tabValue === 0 && (
          <FieldSettings
            fields={
              personGroupSettings || {
                name: 0,
                lastName: 0,
                email: 0,
                phone: 0,
                badge: 0,
              }
            }
            requestSettings={this.loadFieldsSettings}
            title={selectedPersonGroup.name}
            key={selectedPersonGroup.id}
            saveSettings={this.saveSettings}
            isLoading={isLoading}
            isSuccess={isSuccess}
          />
        )}
        {this.state.tabValue === 1 && (
          <CustomFieldsSettings entity={"CARDHOLDERS"} />
        )}
      </div>
    ) : (
      <div />
    );
  }
}

const mapStateToProps = ({ Settings }) => {
  return {
    selectedPersonGroup: Settings.selectedPersonGroup,
    personGroupSettings: Settings.personGroupSettings,
    isSuccess: Settings.isSuccess,
    isLoading: Settings.isLoading,
  };
};

const mapDispatchToProps = {
  requestGroupPersonSettings,
  requestSetGroupPersonSetting,
};

const ConnectedPersonGroupAdministrationField = connect(
  mapStateToProps,
  mapDispatchToProps
)(PersonGroupAdministrationField);

export default withTranslation()(
  withStyles({}, { withTheme: true })(ConnectedPersonGroupAdministrationField)
);
