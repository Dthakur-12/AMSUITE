import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import SnackbarHandler from "../../../utils/SnackbarHandler";
import {
  requestUpdateMobileSettings,
  requestMobileSettings,
} from "../../../actions/Settings/accessControl_actions";
import { withTranslation } from "react-i18next";
const withAccessControl = (Component) =>
  (class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        systemDTO: { loginSAML: false },
      };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
      if (
        nextProps.configSAML !== prevState.configSAML ||
        nextProps.isCreating !== prevState.isCreating ||
        nextProps.error !== prevState.error
      ) {
        return {
          configSAML: nextProps.configSAML,
          isCreating: nextProps.isCreating,
          error: nextProps.error,
        };
      } else return null;
    }

    componentDidUpdate(prevProps, prevState) {
      const { t } = this.props;
      const { configSAML, isCreating, error } = this.state;
      if (prevState.configSAML !== configSAML) {
        this.setState({
          systemDTO: configSAML,
        });
      }
      if (isCreating && prevState.isCreating !== isCreating) {
        SnackbarHandler.showMessage(t("successSaveSAML"));
      }
      // if (error && prevState.error !== error) {
      //   SnackbarHandler.showMessage(t("errorSaveSAML"), "error");
      // }
    }
    componentDidMount() {
      this.props.requestMobileSettings();
    }

    handleChangeBoolean = (name) => {
      const value = name == "loginSAML" && !this.state.systemDTO[name] ? 1 : 0;
      this.setState((prevState) => ({
        systemDTO: {
          ...prevState.systemDTO,
          [name]: !prevState.systemDTO[name],
          loginProtocol: value,
        },
      }));
    };
    handleChange = (name) => (event) => {
      let value = event.currentTarget ? event.currentTarget.value : event.value;
      this.setState((prevState) => ({
        systemDTO: {
          ...prevState.systemDTO,
          [name]: value,
        },
      }));
    };
    handleCreate = () => {
      const { systemDTO } = this.state;
      this.props.requestUpdateMobileSettings(systemDTO);
    };

    render() {
      const { systemDTO, files } = this.state;
      return (
        <Component
          handleChangeBoolean={this.handleChangeBoolean}
          systemDTO={systemDTO}
          handleChange={this.handleChange}
          handleCreate={this.handleCreate}
          {...this.props}
        />
      );
    }
  });

const mapDispatchToProps = {
  requestUpdateMobileSettings,
  requestMobileSettings,
};
const mapStateToProps = ({ AccessControlSettings }) => {
  return {
    configSAML: AccessControlSettings.configSAML,
    isLoading: AccessControlSettings.isLoading,
    isCreating: AccessControlSettings.isCreating,
    error: AccessControlSettings.error,
  };
};
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withTranslation(),
  withAccessControl
);
