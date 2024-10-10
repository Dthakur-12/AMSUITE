import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import SnackbarHandler from "../../../utils/SnackbarHandler";
import { requestCredential } from "../../../actions/Settings/saml_actions";
const withIndex = (Component) =>
  (class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};
    }

    static getDerivedStateFromProps(nextProps, prevState) {
      if (
        nextProps.currentUser !== prevState.currentUser ||
        nextProps.error !== prevState.error ||
        nextProps.isLoading !== prevState.isLoading ||
        nextProps.isLoginButtonActiveDirectory !==
          prevState.isLoginButtonActiveDirectory ||
        nextProps.isLoginButton !== prevState.isLoginButton
      ) {
        return {
          currentUser: nextProps.currentUser,
          errorMessage: nextProps.error,
          isLoginButtonActiveDirectory: nextProps.isLoginButtonActiveDirectory,
          isLoginButton: nextProps.isLoginButton,
        };
      } else return null;
    }

    componentDidUpdate(prevProps, prevState) {
      if (prevState.currentUser !== this.state.currentUser) {
        this.correctLogin();
      }
      if (prevState.errorMessage !== this.state.errorMessage) {
        this.setState({
          isLoginButton: false,
          isLogin: false,
          isSuccess: false,
        });
      }
    }
    onDrop = (files, rejectedFiles) => {
      const { t } = this.props;
      if (rejectedFiles.length !== 0) {
        SnackbarHandler.showMessage(t("InvalidFormatArchive"), "error");
      } else {
        this.setState({
          files: files.map((file) =>
            Object.assign(file, {
              preview:
                typeof file === "string" ? file : URL.createObjectURL(file),
            })
          ),
        });
        this.handleOnFiles(files);
        SnackbarHandler.showMessage(t("SuccessUpdateArchive"));
      }
    };

    handleOnFiles = (files) => {
      this.setState({
        file: files[0],
      });
    };

    create = () => {
      const { requestCredential } = this.props;
      const { file } = this.state;
      requestCredential(file);
    };
    handleChange = (name) => (value) => {
      this.setState((prevState) => ({
        saml: {
          ...prevState.saml,
          [name]: value,
        },
      }));
    };
    saveAttach = () => {
      const { requestCredential } = this.props;
      const { file } = this.state;
      requestCredential(file);
    };
    save = () => {};
    render() {
      const { file, files } = this.state;
      return (
        <Component
          save={this.save}
          saveAttach={this.saveAttach}
          create={this.create}
          onDrop={this.onDrop}
          file={file}
          files={files}
          {...this.props}
        />
      );
    }
  });

const mapDispatchToProps = {
  requestCredential,
};
const mapStateToProps = ({ Settings, User }) => {
  return {};
};
export default compose(connect(mapStateToProps, mapDispatchToProps), withIndex);
