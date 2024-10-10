import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import {
  requestDocumentType,
  requestCreateDocumentType,
  requestEditDocumentType,
  requestCategories,
} from "../../actions/Aludoc/documentType_action";

import { requestEnterprises } from "../../actions/EasyAccess/Enterprise_actions";
import NavBarAludoc from "../../webApps/Aludoc/utils/NavBarAludoc";

import SnackbarHandler from "../../utils/SnackbarHandler";
import {
  isValueEmptyOrNull,
  isArrayEmptyOrNull,
} from "../../utils/HelperFunctions";

const formValues = {
  value: "",
  enterpriseIds: [],
  enterprises: [],
  categories: [],
  categoriesIds: [],
};
const withNewDocumentType = (Component) =>
  (class extends React.Component {
    constructor(props) {
      super(props);
      const { initValues } = props;
      this.state = {
        showEnterprises: true,
        newDocumentType: initValues ? initValues : formValues,
        formErrors: {},
        incomplete: false,
        incompleteChange: false,
      };
    }

    // static getDerivedStateFromProps(nextProps, prevState) {
    //   if (
    //     nextProps.create !== prevState.create ||
    //     nextProps.successEditDT !== prevState.successEditDT ||
    //     nextProps.error !== prevState.error ||
    //     nextProps.errorType !== prevState.errorType ||
    //     nextProps.loading !== prevState.loading
    //   ) {
    //     return {
    //       create: nextProps.create,
    //       successEditDT: nextProps.successEditDT,
    //       error: nextProps.error,
    //       errorType: nextProps.errorType,
    //       loading: nextProps.loading,
    //     };
    //   } else return null;
    // }

    componentDidUpdate(prevProps, prevState) {
      // const { t, isInModal, onCreate } = this.props;
      // if (this.state.create && prevState.create !== this.state.create) {
      //   this.props.requestDocumentType({
      //     start: 0,
      //     length: 10,
      //     order: "value asc",
      //     search: "",
      //   });
      //   SnackbarHandler.showMessage(t("successCreateDocumentType"));
      //   !isInModal
      //     ? NavBarAludoc.appNavigation.history.replace("/documentType")
      //     : onCreate();
      // }
      // if (
      //   this.state.successEditDT &&
      //   this.state.successEditDT !== prevState.successEditDT
      // ) {
      //   this.setState({
      //     isCreating: false,
      //     isSuccess: true,
      //   });
      //   this.props.loadData(true);
      //   SnackbarHandler.showMessage("Se edito con exito el tipo de documento");
      //   onCreate();
      //   setTimeout(() => {
      //     this.setState({
      //       isSuccess: false,
      //     });
      //   }, 1000);
      // }
      // if (
      //   !this.state.loading &&
      //   this.state.error &&
      //   prevState.error !== this.state.error
      // ) {
      //   SnackbarHandler.showMessage(this.state.errorType, "error");
      //   this.setState({
      //     isCreating: false,
      //     isSuccess: false,
      //   });
      // }
    }

    componentWillUnmount() {
      window.removeEventListener("resize", this.updateScreenMode);
    }

    updateScreenMode = () => {
      this.setState({ isDesktop: window.innerWidth > 900 });
    };

    componentDidMount() {
      this.updateScreenMode();
      const { newDocumentType } = this.state;
      NavBarAludoc.hideLoader();

      if (this.props.isNewCtrlDoc) {
        let enterp = this.props.inmutableSelectedEnterprisesObj.filter(
          (obj) => obj !== -1 && obj !== undefined && obj !== null
        );
        this.setState((prevstate) => ({
          ...prevstate,
          newDocumentType: {
            ...prevstate.newDocumentType,
            enterpriseIds: this.props.inmutableSelectedEnterprises,
            enterprises: enterp,
          },
        }));
      } else {
        this.setState((prevstate) => ({
          ...prevstate,
          newDocumentType: {
            ...prevstate.newDocumentType,
            enterpriseIds: newDocumentType.enterprises.map((t) => t.id),
            categoriesIds: newDocumentType.categories
              ? newDocumentType.categories.map((c) => c.id)
              : [],
          },
        }));
      }
    }

    handleEnterpriseSelected = (enterprises) => {
      let enterpriseIds = [];
      enterprises.map((enterprise) => {
        return enterpriseIds.push(enterprise.id);
      });
      this.setState((prevState) => ({
        newDocumentType: {
          ...prevState.newDocumentType,
          enterpriseIds: enterpriseIds,
          enterprises: enterprises,
        },
      }));
    };

    handleCategorySelected = (categories) => {
      let categoriesIds = [];
      categories.map((categorie) => {
        return categoriesIds.push(categorie.id);
      });
      this.setState((prevState) => ({
        newDocumentType: {
          ...prevState.newDocumentType,
          categoriesIds: categoriesIds,
          categories: categories,
        },
      }));
    };

    handleChange = (name) => (event) => {
      let value = event.currentTarget ? event.currentTarget.value : event.value;

      this.setState((prevState) => ({
        newDocumentType: {
          ...prevState.newDocumentType,
          [name]: value,
        },
        discriminator: undefined,
      }));
    };

    handleOpenEnterpsises() {
      this.setState({
        openDialogTimeZones: true,
      });
    }

    validateCreate = () => {
      const { newDocumentType } = this.state;
      return {
        name: isValueEmptyOrNull(newDocumentType.value),
        enterprises: newDocumentType.enterpriseIds.length === 0,
      };
    };

    handleCreate = () => {
      const { newDocumentType } = this.state;
      const { isInModal, onCreate } = this.props;
      const errors = this.validateCreate();

      this.setState({
        formErrors: errors,
      });

      if (!Object.keys(errors).some((x) => errors[x])) {
        this.props.requestCreateDocumentType(newDocumentType);
        // isInModal && onCreate(newDocumentType);
        this.setState((prevState) => ({
          incomplete: false,
          incompleteChange: !prevState.incompleteChange,
        }));
      } else {
        this.setState((prevState) => ({
          incomplete: true,
          incompleteChange: !prevState.incompleteChange,
        }));
        // SnackbarHandler.showMessage(t("inputIncomplete"), "error");
      }
    };
    handleEdit = () => {
      const { newDocumentType } = this.state;

      const errors = this.validateCreate();
      this.setState({
        formErrors: errors,
      });
      if (!Object.keys(errors).some((x) => errors[x])) {
        this.props.requestEditDocumentType(newDocumentType);
        this.setState((prevState) => ({
          incomplete: false,
          incompleteChange: !prevState.incompleteChange,
        }));
      } else {
        this.setState((prevState) => ({
          incomplete: true,
          incompleteChange: !prevState.incompleteChange,
        }));
        // SnackbarHandler.showMessage(t("inputIncomplete"), "error");
      }
    };

    render() {
      const {
        isEdit,
        create,
        successEditDT,
        error,
        errorType,
        loading,
        onCreate,
        isInModal,
        isDetails,
        enterprises,
        successEnterprise,
        loadingEnterprises,
        loadData,
        isDialog,
      } = this.props;
      const { formErrors, newDocumentType, incomplete, incompleteChange } =
        this.state;
      return (
        <Component
          handleCreate={this.handleCreate}
          handleEdit={this.handleEdit}
          handleChange={this.handleChange}
          handleEnterpriseSelected={this.handleEnterpriseSelected}
          loadData={loadData}
          newDocumentType={newDocumentType}
          successEnterprise={successEnterprise}
          isEdit={isEdit}
          create={create}
          successEditDT={successEditDT}
          error={error}
          errorType={errorType}
          loading={loading}
          formErrors={formErrors}
          onCreate={onCreate}
          isInModal={isInModal}
          incomplete={incomplete}
          incompleteChange={incompleteChange}
          isDetails={false}
          enterprises={enterprises}
          loadingEnterprises={loadingEnterprises}
          isDialog={isDialog}
        />
      );
    }
  });

const mapDispatchToProps = {
  requestCreateDocumentType: requestCreateDocumentType,
  requestDocumentType: requestDocumentType,
  requestEditDocumentType: requestEditDocumentType,
  requestEnterprises: requestEnterprises,
  requestCategories: requestCategories,
};

const mapStateToProps = ({ DocumentType, Enterprise }) => {
  return {
    documentTypes: DocumentType.documentType,
    loadingDocumentType: DocumentType.loading,
    create: DocumentType.create,
    successEditDT: DocumentType.successEditDT,
    loading: DocumentType.loading,
    error: DocumentType.error,
    errorType: DocumentType.errorType,
    successEnterprise: Enterprise.successEnterprise,
    enterprises: Enterprise.enterprises,
    categories: DocumentType.categories,
    loadingEnterprises: Enterprise.loading,
  };
};
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withNewDocumentType
);
