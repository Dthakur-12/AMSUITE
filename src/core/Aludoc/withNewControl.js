import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import {
  createRequestControl,
  requestHighestControlId,
  editRequestControl,
  requestIsControlNameAvailable,
} from "../../actions/Aludoc/controls_actions";
import {
  requestDocumentType,
  getDocumentTypesByCompanies,
  requestDocumentTypeById,
} from "../../actions/Aludoc/documentType_action";
import { requestPersons } from "../../actions/EasyAccess/Person_actions";
import { isValueEmptyOrNull } from "../../utils/HelperFunctions";
import { withTranslation } from "react-i18next";
import { requestPersonByControl } from "../../actions/Aludoc/controls_actions";
import NavBarAludoc from "../../webApps/Aludoc/utils/NavBarAludoc";
import SnackbarHandler from "../../utils/SnackbarHandler";

let pagePeople = 0;
let rowsPerPagePeople = 10;

let page = 0;
let rowsPerPage = 20;
let activeColumnSort = 0;
let order = "asc";

const withNewControl = (Component) =>
  (class extends React.Component {
    constructor(props) {
      super(props);
      const { initValues, currentUser } = props;
      const control = initValues
        ? {
            contractorCompany: initValues.contractorCompany.id,
            creationDate: initValues.creationDate,
            documentTypes: initValues.documentTypes,
            disableBadges: initValues.disableBadges,
            hiredCompany: initValues.hiredCompany
              ? initValues.hiredCompany.id
              : null,
            id: initValues.id,
            internal: initValues.internal,
            name: initValues.name,
            type: initValues.type,
            people:
              initValues && initValues.people
                ? initValues.people.map((obj) => obj.id)
                : [],
          }
        : null;
      this.state = {
        errorNameAlreadyExist: false,
        formErrors: {},
        initValues,
        documents: [],
        originCompanies: this.loadFilerPerson(),
        isLoadingEnterprises: true,
        isLoadingStatus: true,
        success: false,
        error: false,
        openDialogPerson: false,
        openDialogNewDocumentType: false,
        showPerson: true,
        contractorCompany: initValues
          ? initValues.contractorCompany
          : undefined,
        hiredCompany: initValues ? initValues.hiredCompany : undefined,
        personsSelected: initValues ? initValues.people : [],
        personsCount: initValues ? initValues.peopleCount : 0,
        documentTypes: initValues ? initValues.documentTypes : [],
        newControl: control
          ? control
          : {
              name: "",
              documentTypes: [],
              people: [],
              type: 1,
              internal: false,
              disableBadges: false,
            },
        currentUser: currentUser,
        showDocumentType: true,
        activeStep: 0,
        steps: [
          { name: "NewControl", step: 0 },
          { name: "AssignDocs", step: 1 },
          { name: "AssignPersons", step: 2 },
        ],
        openDialogDocument: false,
        openDialogContractingEnterprise: false,
      };
      this.getHighestID();
    }

    static getDerivedStateFromProps(nextProps, prevState) {
      if (
        nextProps.createDocumentType !== prevState.createDocumentType ||
        nextProps.closeModal !== prevState.closeModal ||
        nextProps.loadingHighestId !== prevState.loadingHighestId ||
        nextProps.highestControlId !== prevState.highestControlId ||
        nextProps.initValues !== prevState.initValues ||
        nextProps.initValues !== prevState.initValues ||
        nextProps.isNameAvailable !== prevState.isNameAvailable ||
        nextProps.loadingNameAvailable !== prevState.loadingNameAvailable
      ) {
        return {
          loadingNameAvailable: nextProps.loadingNameAvailable,
          isNameAvailable: nextProps.isNameAvailable,
          initValues: nextProps.initValues,
          createDocumentType: nextProps.createDocumentType,
          closeModal: nextProps.closeModal,
          loadingHighestId: nextProps.loadingHighestId,
          highestControlId: nextProps.highestControlId,
        };
      } else return null;
    }

    componentDidUpdate(prevProps, prevState) {
      const { formErrors } = this.state;
      if (
        !this.state.loadingNameAvailable &&
        this.state.loadingNameAvailable !== prevState.loadingNameAvailable
      ) {
        if (!this.state.isNameAvailable) {
          this.setState({
            errorNameAlreadyExist: true,
          });
          SnackbarHandler.showMessage(this.props.t("CompleteFields"), "error");
        } else {
          if (!Object.keys(formErrors).some((x) => formErrors[x]))
            this.setState({
              activeStep: 1,
            });
          else {
            SnackbarHandler.showMessage(
              this.props.t("CompleteFields"),
              "error"
            );
          }
          this.setState({
            errorNameAlreadyExist: false,
          });
        }
      }

      if (this.state.newControl !== prevState.newControl) {
      }

      if (
        this.state.createDocumentType &&
        prevState.createDocumentType !== this.state.createDocumentType
      ) {
        this.loadDatadocTypes();

        this.setState((prevState) => ({
          ...prevState,
          openDialogNewDocumentType: false,
        }));
      }
      if (
        !this.state.loadingHighestId &&
        this.state.loadingHighestId !== prevState.loadingHighestId
      ) {
        this.setState((prevState) => ({
          newControl: {
            ...prevState.newControl,
            name: `Control ${this.state.highestControlId + 1}`,
          },
        }));
      }

      if (prevState.initValues !== this.state.initValues) {
        const initPeople = this.state.initValues.people.map((obj) => obj.id);

        this.setState({
          personsCount: this.state.initValues.peopleCount,
          personsSelected: this.state.initValues.people,
          personToShow: this.state.initValues.people.slice(
            0,
            rowsPerPagePeople
          ),
          newControl: {
            ...prevState.newControl,
            people: initPeople,
          },
        });
      }
      if (this.props.closeModal) {
        this.props.onCreate();
        this.props.closeModalFalse();
      }
    }

    componentWillUnmount() {
      window.removeEventListener("resize", this.updateScreenMode);
    }

    updateScreenMode = () => {
      this.setState({ isDesktop: window.innerWidth > 900 });
    };

    componentDidMount() {
      this.updateScreenMode();
      NavBarAludoc.hideLoader();
    }

    loadFilerPerson = () => {
      const { initValues } = this.props;
      if (initValues) {
        const filer = initValues.hiredCompany
          ? [initValues.hiredCompany.id, initValues.contractorCompany.id]
          : [-1, initValues.contractorCompany.id];

        return filer;
      } else {
        return [-1, -1];
      }
    };

    loadDatadocTypes = () => {
      const columns = [
        {
          name: "name",
          field: "value",
          options: {
            filter: true,
            sort: true,
            sortDirection: "asc",
          },
        },
      ];

      const idCompanies = this.state.originCompanies.filter((oc) => oc !== -1);
      if (idCompanies.length > 0) {
        this.props.getDocumentTypesByCompanies({
          start: page * rowsPerPage,
          length: rowsPerPage,
          order: columns[activeColumnSort].field + " " + order,
          search: "",
          extraData: idCompanies,
        });
      }
    };
    getHighestID = () => {
      const { isEdit } = this.props;
      if (!isEdit) {
        this.props.requestHighestControlId();
      }
    };

    expandPersons = () => {
      this.setState((prevState) => ({
        showPerson: !prevState.showPerson,
      }));
    };

    handleCloseDialogPerson = () => {
      this.setState({ openDialogPerson: false });
    };

    changedisableBadges = () => {
      this.setState((prevState) => ({
        newControl: {
          ...prevState.newControl,
          disableBadges: !prevState.newControl.disableBadges,
        },
      }));
    };

    handleCreate = () => {
      const { createRequestControl } = this.props;
      const { newControl } = this.state;
      console.log('newControl: ', newControl);
      //this.setState({ msjError: false });
      const errors = this.validateCreate(3);
      console.log('errors: ', errors);
      this.setState({
        formErrors: errors,
      });
      if (!Object.keys(errors).some((x) => errors[x])) {
        createRequestControl(newControl);
      } else {
        SnackbarHandler.showMessage(this.props.t("CompleteFields"), "error");
        // this.setState({ msjError: true });
      }

      // if (this.validate(newControl)) {
      //   createRequestControl(newControl);
      // } else {
      //   this.setState({ msjError: true });
      // }
    };

    handleEdit = () => {
      //this.setState({ msjError: false });
      const { editRequestControl } = this.props;
      const { newControl } = this.state;
      const aux = this.state.documentTypes
        .map((obj) => obj.id)
        .filter((id) => id > -1);
      let newControlAux = {
        ...newControl,
        documentTypes: aux,
      };
      const errors = this.validateCreate(3);
      this.setState({
        formErrors: errors,
      });

      if (!Object.keys(errors).some((x) => errors[x])) {
        editRequestControl(newControlAux);
      } else {
        SnackbarHandler.showMessage(this.props.t("CompleteFields"), "error");
      }
      // if (this.validate(newControlAux)) {
      //   editRequestControl(newControlAux);
      // } else {
      //   this.setState({ msjError: true });
      // }
    };

    validate = (newControl) => {
      return (
        newControl.documentTypes.length > 0 &&
        newControl.name.length > 0 &&
        newControl.contractorCompany != null &&
        (newControl.internal ||
          (!newControl.internal && newControl.hiredCompany))
      );
    };

    validateCreate = (activeStep) => {
      console.log('activeStep: ', activeStep);
      const { newControl } = this.state;
      switch (activeStep) {
        case 1:
          return {
            name: isValueEmptyOrNull(newControl.name),
            contractorCompany: isValueEmptyOrNull(newControl.contractorCompany),
            hiredCompany:
              !newControl.internal &&
              isValueEmptyOrNull(newControl.hiredCompany),
            documentTypes: false,
            people: false,
          };

        case 2:
          return {
            documentTypes: newControl.documentTypes.length <= 0,
            name: false,
            contractorCompany: false,
            hiredCompany: false,
            people: false,
          };

        case 3: {
          return {
            people: newControl.people.length <= 0,
            name: false,
            contractorCompany: false,
            hiredCompany: false,
            documentTypes: false,
          };
        }
      }
    };

    originCompaniesObjs = () => {
      const { hiredCompany, contractorCompany } = this.state;
      let aux = [-1, -1];
      aux[0] = hiredCompany;
      aux[1] = contractorCompany;
      return aux;
    };

    handleOpenDocument = () => {
      this.setState({
        openDialogDocument: true,
      });
    };

    handleChange = (event) => {
      let value = event.currentTarget.value;
      this.setState((prevState) => ({
        newControl: {
          ...prevState.newControl,
          name: value,
        },
      }));
    };
    handleChangeType = (event) => {
      // let value = event.currentTarget.value;
      this.setState((prevState) => ({
        newControl: {
          ...prevState.newControl,
          type: event.value,
        },
      }));
    };

    handleOpenPerson = () => {
      this.setState({
        openDialogPerson: true,
      });
    };

    onCreateDocument = () => {
      this.setState({ openDialogNewDocumentType: false });
      //this.props.requestDocumentType();
    };

    handleOpenDialogNewDocType = () => {
      this.setState({ openDialogNewDocumentType: true });
    };

    handleCloseDialogNewDocType = () => {
      this.setState({ openDialogNewDocumentType: false });
    };

    changeInternal = () => {
      if (!this.state.newControl.internal) {
        let aux = this.state.originCompanies.slice();
        if (this.state.hiredCompany) {
          aux[0] = -1;
        }
        //this.filter3(enterpriseFilter);
        this.setState((prevState) => ({
          originCompanies: aux,
          hiredCompany: undefined,
          documentTypes: [],
          persons: [],
          newControl: {
            ...prevState.newControl,
            internal: !prevState.newControl.internal,
            //people: [],
            documentTypes: [],
            hiredCompany: null,
          },
        }));
      } else {
        // if (this.state.hiredCompany) {
        //   const enterpriseFilter = this.state.originCompanies.concat(
        //     this.state.hiredCompany.id
        //   );
        //   //this.filter3(enterpriseFilter);
        // this.setState(prevState => ({
        //   originCompanies: enterpriseFilter
        // }));
        //}
        this.setState((prevState) => ({
          newControl: {
            ...prevState.newControl,
            internal: !prevState.newControl.internal,
          },
        }));
      }
    };

    handleDeleteDocumentType = (id) => {
      this.setState((prevState) => ({
        ...prevState,
        documentTypes: prevState.documentTypes.filter((i) => i.id !== id),
      }));
    };

    handleCloseDocumentType = () => {
      this.setState({ openDialogDocument: false });
    };

    handleExpandDocumentType = () => {
      this.setState((prevState) => ({
        showDocumentType: !prevState.showDocumentType,
      }));
    };

    handleDocumentTypeSelected = (documentTypes) => {
      const documentTypesIds = documentTypes.map((obj) => obj.id);

      this.setState((prevState) => ({
        openDialogDocument: false,
        documentTypes: documentTypes,
        personsCount: 0,
        personsSelected: [],
        personToShow: [],
        //documentTypes: documentTypesIds,
        newControl: {
          ...prevState.newControl,
          documentTypes: documentTypesIds,
          people: [],
        },
      }));
    };

    handlePersonSelected = (persons) => {
      this.setState((prevState) => ({
        openDialogPerson: false,
        personsCount: persons.length,
        personsSelected: persons ? persons : [],
        personToShow: persons ? persons.slice(0, rowsPerPagePeople) : [],
        newControl: {
          ...prevState.newControl,
          people: persons ? persons.map((p) => p.id) : [],
        },
      }));
    };

    saveNameForCreate = (name) => {
      this.setState((prevState) => ({
        documentTypeOnCreate: { ...prevState, name: name },
      }));
    };

    handleContractorCompanySelected = (contractorCompany) => {
      this.setState((prevState) => {
        let aux = prevState.originCompanies.slice();
        aux[1] = contractorCompany.id;

        return {
          openDialogContractorCompany: false,
          contractorCompany: contractorCompany,
          originCompanies: aux,
          documentTypes:
            contractorCompany.id === prevState.contractorCompany
              ? prevState.documentTypes
              : [],
          personsSelected:
            contractorCompany.id === prevState.contractorCompany
              ? prevState.personsSelected
              : [],
          personToShow:
            contractorCompany.id === prevState.contractorCompany
              ? prevState.personToShow
              : [],
          newControl: {
            ...prevState.newControl,
            contractorCompany: contractorCompany.id,
            people:
              contractorCompany.id === prevState.contractorCompany
                ? prevState.newControl.people
                : [],
            documentTypes:
              contractorCompany.id === prevState.contractorCompany
                ? prevState.documentTypes
                : [],
          },
        };
      });
    };

    handleHiredCompanySelected = (hiredCompany) => {
      this.setState((prevState) => {
        let aux = prevState.originCompanies.slice();
        aux[0] = hiredCompany.id;
        //this.filter3(aux);
        return {
          documentTypes:
            hiredCompany.id === prevState.hiredCompany
              ? prevState.documentTypes
              : [],
          openDialogHiredCompany: false,
          hiredCompany: hiredCompany,
          originCompanies: aux,
          persons:
            hiredCompany.id === prevState.hiredCompany
              ? prevState.personsSelected
              : [],
          personToShow:
            hiredCompany.id === prevState.hiredCompany
              ? prevState.personToShow
              : [],
          newControl: {
            ...prevState.newControl,
            hiredCompany: hiredCompany.id,
            people:
              hiredCompany.id === prevState.hiredCompany
                ? prevState.newControl.people
                : [],
            documentTypes:
              hiredCompany.id === prevState.hiredCompany
                ? prevState.documentTypes
                : [],
          },
        };
      });
    };

    handleChangeNextStep = (step) => {
      const errors = this.validateCreate(step);
      this.setState({
        formErrors: errors,
      });
      if (step === 1) {
        this.props.requestIsControlNameAvailable({
          controlName: this.state.newControl.name,
        });
      } else if (step !== 1 && !Object.keys(errors).some((x) => errors[x])) {
        this.setState({
          activeStep: step,
        });
      } else if (step !== 1) {
        SnackbarHandler.showMessage(this.props.t("CompleteFields"), "error");
        // this.setState({ msjError: true });
      }
    };

    handleChangeStep = (step) => {
      this.setState({
        activeStep: step,
      });
    };

    handleChangeRowsPerPage = (e) => {
      const value = e.currentTarget.dataset.value;
      rowsPerPagePeople = value;
      if (pagePeople > 0) {
        pagePeople = 0;
        this.setState({
          personToShow: this.state.personsSelected.slice(0, rowsPerPagePeople),
        });
      } else
        this.setState({
          personToShow: this.state.personsSelected.slice(
            pagePeople * rowsPerPagePeople,
            pagePeople * rowsPerPagePeople + rowsPerPagePeople
          ),
        });
    };

    handleChangePage = (e) => {
      const value = e.currentTarget.value;
      if (value === "next") pagePeople = pagePeople + 1;
      else if (value === "previous" && pagePeople > 0)
        pagePeople = pagePeople - 1;
      this.setState({
        personToShow: this.state.personsSelected.slice(
          pagePeople * rowsPerPagePeople,
          pagePeople * rowsPerPagePeople + rowsPerPagePeople
        ),
      });
    };

    render() {
      const {
        activeStep,
        originCompanies,
        newControl,
        formErrors,
        contractorCompany,
        isSuccess,
        hiredCompany,
        isCreating,
        documentTypes,
        showDocumentType,
        openDialogPerson,
        personsCount,
        personsSelected,
        documentTypeOnCreate,
        openDialogNewDocumentType,
        isDesktop,
        showPerson,
        openDialogDocument,
        steps,
        msjError,
        personToShow,
        errorNameAlreadyExist,
      } = this.state;
      const {
        error,
        loading,
        info,
        successPrs,
        loadingPrs,
        persons,
        success,
        isEditSuccess,
        isEdit,
        successDTByCompanies,
        errorText,
      } = this.props;
      return (
        <Component
          pagePeople={pagePeople}
          rowsPerPagePeople={rowsPerPagePeople}
          personToShow={personToShow}
          errorText={errorText}
          errorNameAlreadyExist={errorNameAlreadyExist}
          handleChangeType={this.handleChangeType}
          handleChangeNextStep={this.handleChangeNextStep}
          handleChange={this.handleChange}
          handleChangeStep={this.handleChangeStep}
          handleOpenPerson={this.handleOpenPerson}
          handleOpenDocument={this.handleOpenDocument}
          changedisableBadges={this.changedisableBadges}
          handleChangeRowsPerPage={this.handleChangeRowsPerPage}
          handleChangePage={this.handleChangePage}
          handleCreate={this.handleCreate}
          handleEdit={this.handleEdit}
          onCreateDocument={this.onCreateDocument}
          changeInternal={this.changeInternal}
          handleDeleteDocumentType={this.handleDeleteDocumentType}
          handleDocumentTypeSelected={this.handleDocumentTypeSelected}
          handlePersonSelected={this.handlePersonSelected}
          saveNameForCreate={this.saveNameForCreate}
          handleContractorCompanySelected={this.handleContractorCompanySelected}
          handleHiredCompanySelected={this.handleHiredCompanySelected}
          handleCloseDocumentType={this.handleCloseDocumentType}
          expandPersons={this.expandPersons}
          handleCloseDialogPerson={this.handleCloseDialogPerson}
          handleOpenDialogNewDocType={this.handleOpenDialogNewDocType}
          handleCloseDialogNewDocType={this.handleCloseDialogNewDocType}
          originCompaniesObjs={this.originCompaniesObjs}
          handleExpandDocumentType={this.handleExpandDocumentType}
          successDTByCompanies={successDTByCompanies}
          contractorCompany={contractorCompany}
          newControl={newControl}
          activeStep={activeStep}
          originCompanies={originCompanies}
          formErrors={formErrors}
          isCreating={isCreating}
          isSuccess={isSuccess}
          success={success}
          isEdit={isEdit}
          isEditSuccess={isEditSuccess}
          hiredCompany={hiredCompany}
          documentTypes={documentTypes}
          showDocumentType={showDocumentType}
          personsSelected={personsSelected}
          persons={persons}
          openDialogPerson={openDialogPerson}
          openDialogDocument={openDialogDocument}
          openDialogNewDocumentType={openDialogNewDocumentType}
          personsCount={personsCount}
          documentTypeOnCreate={documentTypeOnCreate}
          isDesktop={isDesktop}
          steps={steps}
          showPerson={showPerson}
          msjError={msjError}
          error={error}
          loading={loading}
          info={info}
          loadingPrs={loadingPrs}
          successPrs={successPrs}
        />
      );
    }
  });

const mapDispatchToProps = {
  requestHighestControlId: requestHighestControlId,
  createRequestControl: createRequestControl,
  editRequestControl: editRequestControl,
  requestDocumentType: requestDocumentType,
  getDocumentTypesByCompanies: getDocumentTypesByCompanies,
  requestDocumentTypeById: requestDocumentTypeById,
  requestPersons: requestPersons,
  requestPersonByControl: requestPersonByControl,
  requestIsControlNameAvailable: requestIsControlNameAvailable,
};

const mapStateToProps = ({
  User,
  Settings,
  Control,
  DocumentType,
  Persons,
}) => {
  return {
    documentTypes: DocumentType.documentType,
    documentTypesCount: DocumentType.documentTypeAllCount,
    documentTypeId: DocumentType.id,
    error: Control.error || DocumentType.error,
    errorText: Control.errorText,
    success: Control.successCr,
    createDocumentType: DocumentType.create,
    loadingDocumentType: DocumentType.loading,
    currentUser: User.currentUser,
    settings: Settings.settings,
    loadingHighestId: Control.loadingHighestId,
    highestControlId: Control.highestControlId,
    loading: Control.loading || DocumentType.loading,
    successDTByCompanies: DocumentType.successDTByCompanies,
    info: DocumentType.infoDTByCompanies,
    successRequestDTById: DocumentType.successRequestDTById,
    doc: DocumentType.doc,
    isEditSuccess: Control.isEditSuccess,
    loadingPrs: Persons.loading,
    successPrs: Persons.successPrs,
    persons: Persons.persons,
    control: Control.control,
    isNameAvailable: Control.isNameAvailable,
    loadingNameAvailable: Control.loadingNameAvailable,
  };
};
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withTranslation(),
  withNewControl
);
