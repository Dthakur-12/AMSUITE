import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withTranslation } from "react-i18next";
import NavBarAludoc from "../../webApps/Aludoc/utils/NavBarAludoc";
import {
  createRequestDocument,
  requestEditDocument,
} from "../../actions/Aludoc/documents_action";
import { isValueEmptyOrNull } from "../../utils/HelperFunctions";
import SnackbarHandler from "../../utils/SnackbarHandler";
import { isNullOrUndefined } from "util";

let page = 0;
let rowsPerPage = 15;
let activeColumnSort = 0;
let order = "asc";

const formValues = {
  name: "",
  expirationDate: new Date(
    new Date().setFullYear(new Date().getFullYear() + 1)
  ),
  dischargeDate: new Date(),
  documentType: undefined,
  notes: "",
  status: undefined,
  enterprise: undefined,
  person: undefined,
  vehicle: undefined,
  documentTypeObject: undefined,
  documentFiles: {},
};

const statusOptions = (t) => ({
  0: { value: 0, label: t("correct") },
  1: { value: 1, label: t("toReview") },
  2: { value: 2, label: t("Rejected") },
  3: { value: 3, label: t("Expired"), color: "#0052CC", isDisabled: true },
});

const withNewDocument = (Component) =>
  (class extends React.Component {
    constructor(props) {
      super(props);
      const { initValues, enterprise, person, vehicle, t } = props;
      this.state = {
        showEnterprises: true,
        newDocument: initValues ? initValues : formValues,
        adjuncts: [],
        enterprise: enterprise,
        person: person,
        vehicle: vehicle,
        openDropFilesDialog: false,
        SelectedStateOption: statusOptions(t),
        selectedState: initValues
          ? new Date(initValues.expirationDate) > Date.now()
            ? statusOptions(t)[initValues.status]
            : statusOptions(t)[2]
          : undefined,
        formErrors: {},
        columns: this.translateColumns(t),
      };
    }

    componentWillUnmount = () => {
      window.removeEventListener("resize", this.updateScreenMode);
    };

    updateScreenMode = () => {
      this.setState({ isDesktop: window.innerWidth > 900 });
    };

    loadDatadocTypes = () => {
      const columns = [
        {
          name: this.props.t("name"),
          field: "value",
          options: {
            filter: true,
            sort: true,
            sortDirection: "asc",
          },
        },
      ];
      this.props.requestDocumentType({
        start: page * rowsPerPage,
        length: rowsPerPage,
        order: columns[activeColumnSort].field + " " + order,
        search: "",
      });
    };

    componentDidMount() {
      const { enterprise, person, vehicle } = this.props;
      this.updateScreenMode();
      //this.loadDatadocTypes();
      this.setState((prevState) => ({
        newDocument: {
          ...prevState.newDocument,
          enterprise: enterprise,
          person: person,
          vehicle: vehicle,
        },
      }));
      NavBarAludoc.hideLoader();
      this.loadEntities();
    }
    loadEntities = () => {
      let entities = [];
      let states = [];
      for (let i = 0; i < 4; i++) {
        if (this.state.SelectedStateOption[i].value !== 3) {
          states.push(this.state.SelectedStateOption[i]);
        }
      }

      this.setState({
        entities,
        states,
        isLoadingTypes: false,
      });
    };
    handleDocumentTypeSelected = (documentType) => {
      this.setState((prevState) => ({
        newDocument: {
          ...prevState.newDocument,
          documentTypeObject: documentType,
          documentType: documentType,
        },
      }));
    };

    handleChange = (name) => (event) => {
      let value = event.currentTarget ? event.currentTarget.value : event.value;
      this.setState((prevState) => ({
        newDocument: {
          ...prevState.newDocument,
          [name]: value,
        },
        discriminator: undefined,
      }));
    };

    handleChangeDate = (name) => (event) => {
      let currentDate = new Date(event);
      let value = new Date(
        currentDate.getTime() - currentDate.getTimezoneOffset() * 60000
      ).toJSON();

      this.setState((prevState) => ({
        newDocument: {
          ...prevState.newDocument,
          [name]: value,
        },
      }));
    };

    validateCreate = () => {
      const { newDocument } = this.state;
      return {
        name: isValueEmptyOrNull(newDocument.name),
        status: isValueEmptyOrNull(newDocument.status)
          ? true
          : newDocument.status === 3,
        expirationDate: isValueEmptyOrNull(newDocument.expirationDate)
          ? true
          : new Date(newDocument.expirationDate) < Date.now(),
        documentType: isValueEmptyOrNull(newDocument.documentType),
      };
    };
    static getDerivedStateFromProps(nextProps, prevState) {
      if (
        nextProps.loadingDoc !== prevState.loadingDoc ||
        nextProps.successCreate !== prevState.successCreate ||
        nextProps.i18n.language !== prevState.language ||
        nextProps.createSuccess !== prevState.createSuccess ||
        nextProps.editSuccess !== prevState.editSuccess ||
        nextProps.errorDoc !== prevState.errorDoc ||
        nextProps.successFiles !== prevState.successFiles ||
        nextProps.loadingCreate !== prevState.isCreating
      ) {
        return {
          successFiles: nextProps.successFiles,
          elements: nextProps.elements,
          loadingDoc: nextProps.loadingDoc,
          successCreate: nextProps.successCreate,
          language: nextProps.i18n.language,
          createSuccess: nextProps.createSuccess,
          editSuccess: nextProps.editSuccess,
          errorDoc: nextProps.errorDoc,
          isCreating: nextProps.loadingCreate,
        };
      }
      return null;
    }
    componentDidUpdate(prevProps, prevState) {
      let newDocument = JSON.parse(JSON.stringify(this.state.newDocument));

      if (
        this.state.successFiles &&
        prevState.successFiles !== this.state.successFiles
      ) {
        this.setState((prevState) => ({
          newDocument: {
            ...prevState.newDocument,
            documentFiles: this.props.documentFiles,
          },
        }));
      }
      if (prevState.language !== this.state.language) {
        this.setState({
          ...prevState,
          columns: this.translateColumns(this.props.t),
        });
      }
      if (
        this.state.createSuccess &&
        prevState.createSuccess !== this.state.createSuccess
      ) {
        this.props.updateParent();
        this.props.onCreate();
        SnackbarHandler.showMessage(this.props.t("successCreateDocument"));
      }

      if (this.state.editSuccess !== prevState.editSuccess) {
        if (this.state.editSuccess) {
          this.setState({
            isCreating: false,
            isSuccess: true,
          });
          this.props.onClose();
          if (!isNullOrUndefined(this.props.updateParent))
            this.props.updateParent();
          SnackbarHandler.showMessage(this.props.t("successEditDocument"));
          //NavBarAludoc.showLoader();

          if (newDocument.enterprise > 0)
            NavBarAludoc.appNavigation.history.replace("/enterprise");
          if (newDocument.person > 0)
            NavBarAludoc.appNavigation.history.replace("/register");
        }
        // else if (!this.state.loadingDoc && !this.state.editSuccess) {
        //   //SnackbarHandler.showMessage(this.state.errorDoc, "error");
        //   this.setState({
        //     isCreating: false,
        //     isSuccess: false
        //   });
        // }
      }
    }

    handleCreate = () => {
      const { t } = this.props;
      const errors = this.validateCreate();
      this.setState({
        formErrors: errors,
      });
      if (!Object.keys(errors).some((x) => errors[x])) {
        let newDocument = JSON.parse(JSON.stringify(this.state.newDocument));
        newDocument.documentType = newDocument.documentType
          ? newDocument.documentType.id
          : undefined;
        newDocument.enterprise = newDocument.enterprise
          ? newDocument.enterprise.id
          : undefined;
        newDocument.person = newDocument.person
          ? newDocument.person.id
          : undefined;
        newDocument.vehicle = newDocument.vehicle
          ? newDocument.vehicle.id
          : undefined;
        this.props.createRequestDocument(newDocument, this.state.adjuncts);
      } else {
        SnackbarHandler.showMessage(t("inputIncomplete"), "error");
      }
    };

    handleOnEdit = () => {
      const { t } = this.props;
      const errors = this.validateCreate();
      this.setState({
        formErrors: errors,
      });

      if (!Object.keys(errors).some((x) => errors[x])) {
        let newDocument = this.state.newDocument;

        newDocument.documentType = newDocument.documentTypeObject
          ? newDocument.documentTypeObject.id
          : undefined;
        newDocument.enterprise = newDocument.enterprise
          ? newDocument.enterprise.id
          : undefined;
        newDocument.person = newDocument.person
          ? newDocument.person.id
          : undefined;
        newDocument.vehicle = newDocument.vehicle
          ? newDocument.vehicle.id
          : undefined;
        newDocument.expirationDate = newDocument.expirationDate
          ? new Date(newDocument.expirationDate)
          : newDocument.expirationDate;
        this.props.requestEditDocument(newDocument, this.state.adjuncts);
      } else {
        SnackbarHandler.showMessage(t("inputIncomplete"), "error");
      }
    };

    handleSelectStateChange = (name) => (event) => {
      let value = event.currentTarget ? event.currentTarget.value : event.value;
      this.setState((prevState) => ({
        selectedState: this.state.SelectedStateOption[event.value],
        newDocument: {
          ...prevState.newDocument,
          [name]: value,
        },
      }));
    };

    handleOpenFilesDialog = () => {
      this.setState({
        openDropFilesDialog: true,
      });
    };

    handleOnFiles = (files) => {
      this.setState((prevState) => ({
        openDropFilesDialog: false,
        adjuncts: [...prevState.adjuncts, files],
      }));
    };

    handleRemoveFiles = (index) => {
      let files = [...this.state.adjuncts];
      files.splice(index, 1);
      this.setState((prevState) => ({
        adjuncts: files,
      }));
    };

    handleRemoveOldFiles = (key) => {
      let files = JSON.parse(
        JSON.stringify(this.state.newDocument.documentFiles)
      );
      delete files[key];
      this.setState((prevState) => ({
        newDocument: {
          ...prevState.newDocument,
          documentFiles: files,
        },
      }));
    };

    translateColumns = (t) => {
      return [
        {
          name: t("name"),
          field: "value",
          options: {
            filter: true,
            sort: true,
            sortDirection: "asc",
          },
        },
      ];
    };

    render() {
      const { isDialog, successDocType, loading, info, isEdit } = this.props;
      const {
        isDesktop,
        isCreating,
        newDocument,
        formErrors,
        columns,
        states,
        selectedState,
        isSuccess,
        adjuncts,
      } = this.state;

      return (
        <Component
          handleChange={this.handleChange}
          handleDocumentTypeSelected={this.handleDocumentTypeSelected}
          handleChangeDate={this.handleChangeDate}
          handleSelectStateChange={this.handleSelectStateChange}
          handleCreate={this.handleCreate}
          handleOnEdit={this.handleOnEdit}
          handleRemoveOldFiles={this.handleRemoveOldFiles}
          handleOnFiles={this.handleOnFiles}
          handleRemoveFiles={this.handleRemoveFiles}
          columns={columns}
          formErrors={formErrors}
          isDesktop={isDesktop}
          isCreating={isCreating}
          newDocument={newDocument}
          states={states}
          selectedState={selectedState}
          isSuccess={isSuccess}
          adjuncts={adjuncts}
          isDialog={isDialog}
          successDocType={successDocType}
          loading={loading}
          info={info}
          isEdit={isEdit}
        />
      );
    }
  });

const mapDispatchToProps = { createRequestDocument, requestEditDocument };

const mapStateToProps = ({ Document, DocumentType }) => {
  return {
    successDocType: DocumentType.successDocType,
    successFiles: Document.successFiles,
    info: DocumentType.info,
    loading: DocumentType.loading,
    loadingCreate: Document.loadingCreate,
    editSuccess: Document.editSuccess,
    createSuccess: Document.createSuccess,
    loadingDoc: Document.loading,
    documentFiles: Document.documentFiles,
    errorDoc: Document.error,
  };
};
// export default compose(
//   connect(mapStateToProps, mapDispatchToProps),
//   withNewDocument
// );

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withTranslation(),
  withNewDocument
);
