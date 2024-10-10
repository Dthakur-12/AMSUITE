import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import SnackbarHandler from "../../utils/SnackbarHandler";
import { isValueEmptyOrNull, isEmailValid } from "../../utils/HelperFunctions";
import { requestEnterprises } from "../../actions/EasyAccess/Enterprise_actions";
import styles from "../../assets/styles/Aludoc_styles/Control_styles/assignEnterpriseStyles.js";
import { withStyles } from '@mui/styles';
import { withTranslation } from "react-i18next";

const initData = {
  name: "",
  lastname: "",
  document: "",
  phone: "",
  email: "",
  photo: undefined,
  badges: [],
  vehicles: [],
};

const withAssignEnterprise = (Component) =>
  (class extends React.Component {
    constructor(props) {
      super(props);
      const { defaultValues, t } = this.props;
      this.state = {
        showInfo: true,
        openDialogCards: false,
        openDialogNewVehicle: false,
        showCards: true,
        contractorCompany: [],
        openDialogContractorCompany: false,
        openDialogHiredCompany: false,
        showVehicles: true,
        errorMessage: "",
        newPerson: defaultValues ? defaultValues : initData,
        openDropFilesDialog: false,
        isEdition: defaultValues !== undefined,
        internal: false,
      };
    }
    handleOpenContractorCompany = (enterprise) => {
      this.setState({ openDialogContractorCompany: false });
      this.props.handleContractorCompanySelected(enterprise);
    };

    handleCloseContractorCompany = () => {
      this.setState({ openDialogContractorCompany: false });
    };

    handleOpenHiredCompany = (enterprise) => {
      this.setState({ openDialogHiredCompany: false });
      this.props.handleHiredCompanySelected(enterprise);
    };
    handleCloseHiredCompany = () => {
      this.setState({ openDialogHiredCompany: false });
    };

    static getDerivedStateFromProps(nextProps, prevState) {
      if (nextProps.internal !== prevState.internal) {
        return {
          internal: nextProps.internal,
        };
      } else return null;
    }

    handleCreate = () => {
      const { t } = this.props;
      const errors = this.validateCreate();
      this.setState({
        formErrors: errors,
      });
      if (!Object.keys(errors).some((x) => errors[x])) {
        this.setState({
          newPerson: initData,
        });
        this.props.onConfirm(this.state.newPerson);
      } else {
        SnackbarHandler.showMessage(t("inputIncomplete"), "error");
      }
    };

    validateCreate = () => {
      const { newPerson } = this.state;
      return {
        name: isValueEmptyOrNull(newPerson.name),
        lastname: isValueEmptyOrNull(newPerson.lastname),
        document: isValueEmptyOrNull(newPerson.document),
        phone: isValueEmptyOrNull(newPerson.phone),
        email: !isEmailValid(newPerson.email),
      };
    };

    openContractorCompanyDialog = () => {
      this.setState((prevState) => ({
        openDialogContractorCompany: true,
      }));
    };
    closeContractorCompanyDialog = () => {
      this.setState((prevState) => ({
        openDialogContractorCompany: false,
      }));
    };
    openHiredCompanyDialog = () => {
      this.setState((prevState) => ({
        openDialogHiredCompany: true,
      }));
    };
    closeHiredCompanyDialog = () => {
      this.setState((prevState) => ({
        openDialogHiredCompany: false,
      }));
    };

    expandInfo = () => {
      this.setState((prevState) => ({
        showInfo: !prevState.showInfo,
      }));
    };

    render() {
      const {
        hiredCompany,
        contractorCompany,
        isDetails,
        changeInternal,
        enterprises,
        successEnterprise,
        requestEnterprises,
        isEditOrCreate,
        formErrors,
      } = this.props;
      const {
        showInfo,
        openDialogContractorCompany,
        openDialogHiredCompany,
        showVehicles,
        internal,
      } = this.state;
      return (
        <Component
          formErrors={formErrors}
          isEditOrCreate={isEditOrCreate}
          showInfo={showInfo}
          internal={internal}
          openDialogContractorCompany={openDialogContractorCompany}
          openDialogHiredCompany={openDialogHiredCompany}
          showVehicles={showVehicles}
          hiredCompany={hiredCompany}
          isDetails={isDetails}
          contractorCompany={contractorCompany}
          changeInternal={changeInternal}
          enterprises={enterprises}
          successEnterprise={successEnterprise}
          requestEnterprises={requestEnterprises}
          openHiredCompanyDialog={this.openHiredCompanyDialog}
          openContractorCompanyDialog={this.openContractorCompanyDialog}
          handleOpenContractorCompany={this.handleOpenContractorCompany}
          handleCloseContractorCompany={this.handleCloseContractorCompany}
          handleCloseHiredCompany={this.handleCloseHiredCompany}
          handleOpenHiredCompany={this.handleOpenHiredCompany}
          expandInfo={this.expandInfo}
        />
      );
    }
  });

const mapStateToProps = ({ Enterprise }) => {
  return {
    enterprises: Enterprise.enterprises,
    successEnterprise: Enterprise.successEnterprise,
  };
};

const mapDispatchToProps = { requestEnterprises: requestEnterprises };

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withTranslation(),
  withStyles(styles, { withTheme: true }),
  withAssignEnterprise
);
