import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { isValueEmptyOrNull } from "../../utils/HelperFunctions";
import { isNullOrUndefined, isEmailValid } from "util";
import {
  requestEnterprisesAnonymouse,
  requestEnterprisesHostAnonymouse,
} from "../../actions/EasyAccess/Enterprise_actions";
import {
  requestCreatePersonAnonymouse,
  requestGetPersonByDocumentAnonymous,
  requestGetPersonGroups,
} from "../../actions/EasyAccess/Person_actions";
import { requestTermsAndConditions } from "../../actions/EasyAccess/TermsAndCondition_actions";
import {
  requestCustomFieldsTypeListValues,
  requestCustomFields,
  updateCustomFieldStore,
  requestGroupPersonSettings,
} from "../../actions/Settings/settings_actions";
import {
  clearFormStore,
  setInitValues,
  setInitDateValues,
} from "../../actions/Shared/custom_form_actions";
import { withTranslation } from "react-i18next";

import { socketIO, disconnectSocket } from "../../utils/WebSockets";
import { FieldTypes } from "../../utils/Enums";

const formValues = {
  name: "",
  lastname: "",
  document: "",
  hostName: "",
  originEnterprise: undefined,
  visitEnterprise: undefined,
  phone: "",
  email: "",
  type: 1,
  file: undefined,
  photo: undefined,
  employee: undefined,
  personGroups: [],
};

const withAutoRegister = (Component) =>
  (class extends React.Component {
    constructor(props) {
      super(props);
      const { currentUser, settings } = this.props;

      this.state = {
        isLoadingEnterprises: true,
        isLoadingStatus: true,
        isLoadingTypes: true,
        openDialogEmployees: false,
        openDialogCards: false,
        typesSuggestions: [],
        isLoadingImg: true,
        enterpriseSuggestions: undefined,
        visitEnterprise: undefined,
        openDialogNewVehicle: false,
        showCards: true,
        openDialogCamera: false,
        showVehicles: true,
        cameraLoader: true,
        errorMessage: "",
        width: 0,
        height: 0,
        currentUser: currentUser,
        personSettings: settings ? settings.visitorSettings : {},
        newPerson: formValues,
        formErrors: {},
      };
    }

    loadSelectsOptions = () => {
      const { customFields, requestCustomFieldsTypeListValues } = this.props;
      if (customFields && customFields.cardholders)
        customFields.cardholders.map((field) => {
          if (field.fieldType === FieldTypes.LIST) {
            requestCustomFieldsTypeListValues(field.id);
          }
        });
    };

    setInitialValues = () => {
      const { initValues = {} } = this.props;
      if (initValues.customFields1)
        this.props.setInitValues(initValues.customFields1);
      if (initValues.customFields2)
        this.props.setInitDateValues(initValues.customFields2);
    };

    generatePersonGroupsSuggestions = (personGroups) => {
      const personGroupsSuggestions = personGroups
        ? personGroups.map((personGroup) => ({
            value: personGroup.id,
            label: personGroup.name,
          }))
        : [];
      personGroupsSuggestions.unshift({
        value: 0,
        label: this.props.t(""),
      });
      this.setState({ personGroupsSuggestions });
    };

    inputIsHidden = (key) => {
      const { personGroupSettings } = this.state;
      const isVisitor = this.state.newPerson.type === 1;
      let personSettings = this.state.personSettings;
      return (
        personSettings[key] == null &&
        isNullOrUndefined(personGroupSettings[key])
      );
    };

    getPersonGroupsJoinVisibility = (
      visibility,
      personGroups = [],
      visibilityType
    ) => {
      if (personGroups === null || personGroups.length === 0) return null;
      switch (visibilityType) {
        case "required":
          return personGroups.some((personGroup) => visibility[personGroup]);
        case "hidden":
          return !personGroups.some(
            (personGroup) => visibility[personGroup] !== null
          );
        default:
          return true;
      }
    };

    loadGroups = () => {
      this.props.requestGetPersonGroups({
        start: 0,
        length: -1,
        order: "name asc",
      });
    };

    handleEnterpriseSelected = (name, enterprise) => {
      this.setState((prevState) => ({
        newPerson: {
          ...prevState.newPerson,
          employee: -1,
          hostName: "",
          [name]: enterprise,
        },
      }));
    };
    componentDidMount() {
      const { isLoginFunction, requestTermsAndConditions } = this.props;
      this.props.requestCustomFields();
      this.props.requestGroupPersonSettings([0]);
      this.loadGroups();
      //this.loadSelectsOptions();
      isLoginFunction();
      requestTermsAndConditions();
      // this.loadEnterprises();
      // this.loadEnterprisesHost();
      socketIO.on("newsCustomFields", function (data) {
        if (data.customFields) {
          updateCustomFieldStore(data.customFields);
        }
      });
    }

    componentWillUnmount() {
      socketIO.off("newsCustomFields", this.updateAchievement);
      this.props.clearFormStore();
      disconnectSocket();
    }

    handleEntryDocument = (document) => {
      const { requestPersonByDoc } = this.props;
      requestPersonByDoc({ document: document });
    };

    // loadEnterprises = () => {
    //   const { getEnterprises } = this.props;
    //   getEnterprises({
    //     start: 0,
    //     length: -1,
    //     order: "name asc",
    //     search: ""
    //   });
    // };

    // loadEnterprisesHost = () => {
    //   const { getEnterprisesHost } = this.props;
    //   getEnterprisesHost({
    //     start: 0,
    //     length: -1,
    //     order: "name asc",
    //     search: "",
    //     onlyHosts: true
    //     //  withoutNA:true
    //   });
    // };

    static getDerivedStateFromProps(nextProps, prevState) {
      if (
        nextProps.isCreating !== prevState.isCreating ||
        nextProps.currentUser !== prevState.currentUser ||
        nextProps.enterprises !== prevState.enterprises ||
        nextProps.enterprisesHost !== prevState.enterprisesHost ||
        nextProps.settings !== prevState.settings ||
        nextProps.msjError !== prevState.msjError ||
        nextProps.personAnonymous !== prevState.personAnonymous ||
        nextProps.successPersonAnonymous !== prevState.successPersonAnonymous ||
        nextProps.successCustomFields !== prevState.successCustomFields
      ) {
        return {
          successCustomFields: nextProps.successCustomFields,
          successPersonAnonymous: nextProps.successPersonAnonymous,
          personAnonymous: nextProps.personAnonymous,
          msjError: nextProps.msjError,
          isCreating: nextProps.isCreating,
          currentUser: nextProps.currentUser,
          errorMessage: nextProps.error,
          enterprises: nextProps.enterprises,
          enterprisesHost: nextProps.enterprisesHost,
          personSettings: nextProps.settings
            ? nextProps.settings.visitorSettings
            : {},
        };
      } else return null;
    }

    componentDidUpdate(prevProps, prevState) {
      const {
        t,
        isAludoc,
        functionLoadRegister,
        onCreate,
        isEdit,
        successPersonGroupData,
        personGroups = {},
        personGroupSettings = {},
        successGetPersonGrSettings,
      } = this.props;
      const { personAnonymous } = this.state;
      if (
        this.state.isCreating &&
        prevState.isCreating !== this.state.isCreating
      ) {
        this.setState({ newPerson: formValues });
      }
      if (
        successGetPersonGrSettings &&
        successGetPersonGrSettings !== prevProps.successGetPersonGrSettings
      ) {
        console.log("successGetPersonGrSettings: ", personGroupSettings);
        this.setState({ personGroupSettings });
      }
      if (
        successPersonGroupData &&
        successPersonGroupData !== prevProps.successPersonGroupData
      )
        this.generatePersonGroupsSuggestions(personGroups.data);
      if (
        this.state.successCustomFields &&
        this.state.successCustomFields !== prevState.successCustomFields
      ) {
        this.loadSelectsOptions();
      }
      if (personAnonymous !== prevState.personAnonymous) {
        this.setState((prevState) => ({
          newPerson: isValueEmptyOrNull(personAnonymous)
            ? formValues
            : {
                ...personAnonymous,
                employee: { id: personAnonymous.employee },
                visitEnterprise: {
                  id: personAnonymous.visitEnterprise,
                  name: personAnonymous.visitEnterpriseName,
                },
                originEnterprise: {
                  id: personAnonymous.originEnterprise,
                  name: personAnonymous.originEnterpriseName,
                },
              },
        }));
        if (!isValueEmptyOrNull(personAnonymous)) {
          this.setInitialValues();
        }
      }
      // if (prevState.enterprises !== this.state.enterprises) {
      //   var enterpriseSuggestions = [];
      //   this.state.enterprises.data.map(enterprise => {
      //     enterpriseSuggestions.push({
      //       value: enterprise.id,
      //       label: enterprise.name
      //     });
      //     return 0;
      //   });
      //   this.setState({
      //     enterpriseSuggestions,
      //     isLoadingEnterprises: false
      //   });
      // }
      // if (
      //   this.state.enterprisesHost &&
      //   prevState.enterprisesHost !== this.state.enterprisesHost
      // ) {
      //   var enterpriseHostSuggestions = [];
      //   this.state.enterprisesHost.data.map(enterprise => {
      //     enterpriseHostSuggestions.push({
      //       value: enterprise.id,
      //       label: enterprise.name
      //     });
      //     return 0;
      //   });
      //   this.setState({
      //     enterpriseHostSuggestions,
      //     isLoadingEnterprises: false
      //   });
      // },
      if (
        this.state.successEnterprise &&
        this.state.successEnterprise !== prevState.successEnterprise
      ) {
        this.setState({
          // enterpriseSuggestions,
          isLoadingEnterprises: false,
          allEnterprise: false,
        });
      }
      if (
        this.state.successEnterpriseHost &&
        this.state.successEnterpriseHost !== prevState.successEnterpriseHost
      ) {
        this.setState({
          isLoadingEnterprises: false,
          onlyHostEnterprises: false,
        });
      }
    }

    clearHiddenInputs = (person) => {
      const { initValues } = this.props;
      const isVisitor = this.state.newPerson.type === 1;
      let personSettings = this.state.personSettings;

      if (!isVisitor) person.employee = undefined;
      Object.keys(personSettings).map((key) => {
        switch (key) {
          case "name":
            this.inputIsHidden(key) &&
              (person.name = initValues ? initValues.name : formValues.name);
            break;
          case "lastName":
            this.inputIsHidden(key) &&
              (person.lastname = initValues
                ? initValues.lastname
                : formValues.lastname);
            break;
          case "dni":
            this.inputIsHidden(key) &&
              (person.document = initValues
                ? initValues.document
                : formValues.document);
            break;
          case "phone":
            this.inputIsHidden(key) &&
              (person.phone = initValues ? initValues.phone : formValues.phone);
            break;
          case "email":
            this.inputIsHidden(key) &&
              (person.email = initValues ? initValues.email : formValues.email);
            break;
          case "card":
            this.inputIsHidden(key) &&
              (person.badges = initValues
                ? initValues.badges
                : formValues.badges);
            break;
          case "enterprise":
            this.inputIsHidden(key) &&
              (person.originEnterprise = initValues
                ? initValues.originEnterprise
                : formValues.originEnterprise);
            break;
          case "empVis":
            this.inputIsHidden(key) &&
              (person.visitEnterprise = initValues
                ? initValues.visitEnterprise
                : formValues.visitEnterprise);
            break;
          default:
            break;
        }
        return 0;
      });
      return person;
    };

    redirect = () => {
      this.props.history.push("/autoregister");
    };
    handleNavigation = () => {
      this.props.history.push("/noPermission");
    };

    removeAccents(str) {
      str = str.replace(/\s/g, "");
      str = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      return str.replace(/[.,\/#!$%\^&\*;:{}=\-+@'_`~()]/g, "");
    }
    validateCustomFields = () => {
      const { type = 0, personGroups = [] } = this.state.newPerson;
      let newType = type;
      newType++;
      const {
        customFieldsDateValues = {},
        customFieldsValues = {},
        customFields,
      } = this.props;
      const customFieldsErrors = {};
      if (customFields && customFields.cardholders)
        customFields.cardholders.map((field) => {
          const fieldName = this.removeAccents(field.fieldName.toUpperCase());
          const groupsVisibility = this.getPersonGroupsJoinVisibility(
            field.visibility,
            personGroups,
            "required"
          );
          if (field.fieldType != 3)
            customFieldsErrors[fieldName] =
              (field.visibility[newType] || groupsVisibility) &&
              isValueEmptyOrNull(customFieldsValues[fieldName]);
          else
            customFieldsErrors[fieldName] =
              (field.visibility[newType] || groupsVisibility) &&
              isValueEmptyOrNull(customFieldsDateValues[fieldName]);
        });
      return customFieldsErrors;
    };

    handlePersonGroupChange = (name) => (event) => {
      let value = event.currentTarget ? event.currentTarget.value : event.value;
      this.props.requestGroupPersonSettings([value]);
      this.setState((prevState) => ({
        newPerson: {
          ...prevState.newPerson,
          [name]: value ? [value] : [],
        },
      }));
    };

    fieldHasError = (settingName, groupSettingName) => {
      const { newPerson, personSettings, personGroupSettings } = this.state;
      let personAttr =
        settingName == "lastname" ? settingName : groupSettingName;

      switch (settingName) {
        case "lastname":
          personAttr = settingName;
          break;
        case "enterprise":
          personAttr = "originEnterprise";
          break;
        default:
          personAttr = groupSettingName;
      }

      return personSettings[settingName] ||
        personGroupSettings[groupSettingName]
        ? isValueEmptyOrNull(newPerson[personAttr])
        : false;
    };

    validateCreate = () => {
      const { newPerson, personSettings, personGroupSettings } = this.state;
      console.log("newPerson: ", newPerson);
      console.log("personSettings: ", personSettings);
      console.log("personGroupSettings: ", personGroupSettings);
      let name = this.fieldHasError("name", "name");
      let lastname = this.fieldHasError("lastname", "lastName");
      let document = this.fieldHasError("dni", "document");
      let originEnterprise = this.fieldHasError("enterprise", "enterprise");
      let visitEnterprise = this.fieldHasError("empVis", "visitEnterprise");
      let phone = this.fieldHasError("phone", "phone");
      let email = this.fieldHasError("email", "email");
      return {
        name: name,
        lastname: lastname,
        document: document,
        visitEnterprise: visitEnterprise,
        phone: phone,
        email: email,
        originEnterprise: originEnterprise,
      };
    };

    handleCreate = () => {
      const { createPerson } = this.props;
      const { newPerson } = this.state;
      const newData = { ...newPerson };
      const customFieldsErrors = this.validateCustomFields();
      console.log("customFieldsErrors: ", customFieldsErrors);
      newData.employee = newPerson.employee ? newPerson.employee.id : 0;

      if (newData.originEnterprise)
        newData.originEnterprise = newData.originEnterprise.id;
      if (newData.visitEnterprise)
        newData.visitEnterprise = newData.visitEnterprise.id;
      let date = new Date();
      date.setDate(date.getDate() + 1);
      newData.egressDate = new Date(date.setHours(23, 59, 0));
      newData.ingressDate = new Date();
      newData.AceptTermsAndConditions = true;
      newData.customFields1 = { ...this.props.customFieldsValues };
      newData.customFields2 = { ...this.props.customFieldsDateValues };
      const errors = this.validateCreate();
      console.log("errors: ", errors);
      this.setState({
        formErrors: errors,
        customFieldsErrors,
      });
      if (
        !Object.keys(errors).some((x) => errors[x]) &&
        !Object.keys(customFieldsErrors).some((x) => customFieldsErrors[x])
      ) {
        createPerson(newData);
      } else {
        this.setState({
          error: true,
        });
      }
    };

    handleChange = (name) => (event) => {
      let value = event.currentTarget ? event.currentTarget.value : event.value;
      if (name === "type" && !this.props.isEdit) {
        let egressDate = new Date(new Date().setHours(23, 59, 0));
        if (value === 0) {
          egressDate = new Date(
            egressDate.setFullYear(egressDate.getFullYear() + 5)
          );
        }
        this.setState((prevState) => ({
          newPerson: {
            ...prevState.newPerson,
            [name]: value,
            egressDate: egressDate,
          },
        }));
      } else if (name === "visitEnterprise") {
        this.handleSelectEnterpriseVisit(false);
        this.setState((prevState) => ({
          newPerson: {
            ...prevState.newPerson,
            employee: -1,
            hostName: "",
          },
        }));
      }
      this.setState((prevState) => ({
        newPerson: {
          ...prevState.newPerson,
          [name]: value,
        },
      }));
    };
    // handleChangeTerms = value => {
    //   this.setState(prevState => ({
    //     newPerson: {
    //       ...prevState.newPerson,
    //       AceptTermsAndConditions: value
    //     }
    //   }));
    // };
    handleUnassignedHost = () => {
      this.setState((prevState) => ({
        ...prevState,
        newPerson: {
          ...prevState.newPerson,
          employee: -1,
          hostName: "",
        },
      }));
    };
    handleEmployeeSelected = (employee) => {
      this.setState((prevState) => ({
        openDialogEmployees: false,
        newPerson: {
          ...prevState.newPerson,
          employee: employee,
        },
      }));
    };

    handleOpenEmployees = (value) => {
      this.setState({
        openDialogEmployees: value,
      });
    };

    handleSelectEnterpriseVisit = (value) => {
      const { newPerson } = this.state;
      if (!newPerson.visitEnterprise) {
        this.setState((prevState) => ({ enterpriseVisitUndefined: value }));
      } else {
        this.setState({
          openDialogEmployees: true,
        });
      }
    };

    render() {
      const {
        passwordHidden,
        formErrors,
        errorMessage,
        isSuccess,
        newPerson,
        openDialogEmployees,
        enterpriseSuggestions,
        enterpriseHostSuggestions,
        personSettings,
        error,
        enterpriseVisitUndefined,
        personAnonymous,
        successPersonAnonymous,
        customFieldsErrors,
      } = this.state;
      return (
        <Component
          successPersonAnonymous={successPersonAnonymous}
          handleEntryDocument={this.handleEntryDocument}
          handleChangeTerms={this.handleChangeTerms}
          enterpriseVisitUndefined={enterpriseVisitUndefined}
          handleSelectEnterpriseVisit={this.handleSelectEnterpriseVisit}
          error={error}
          setError={() => this.setState((state) => ({ error: !state.error }))}
          personSettings={personSettings}
          enterpriseSuggestions={enterpriseSuggestions}
          enterpriseHostSuggestions={enterpriseHostSuggestions}
          isSuccess={isSuccess}
          newPerson={newPerson}
          errorMessage={errorMessage}
          handleCreate={this.handleCreate}
          redirect={this.redirect}
          handleChange={this.handleChange}
          keyPress={this.keyPress}
          customFieldsErrors={customFieldsErrors}
          formErrors={formErrors}
          personAnonymous={personAnonymous}
          handleUnassignedHost={this.handleUnassignedHost}
          passwordHidden={passwordHidden}
          handleOpenEmployees={this.handleOpenEmployees}
          openDialogEmployees={openDialogEmployees}
          handleEmployeeSelected={this.handleEmployeeSelected}
          handlePasswordHidden={() =>
            this.setState((state) => ({
              passwordHidden: !state.passwordHidden,
            }))
          }
          handleEnterpriseSelected={this.handleEnterpriseSelected}
          requestEnterprises={this.props.getEnterprises}
          requestEnterprisesHost={this.props.getEnterprisesHost}
          personGroupsSuggestions={this.state.personGroupsSuggestions}
          personGroupSettings={this.state.personGroupSettings}
          handlePersonGroupChange={this.handlePersonGroupChange}
          {...this.props}
        />
      );
    }
  });

const mapDispatchToProps = {
  getEnterprises: requestEnterprisesAnonymouse,
  getEnterprisesHost: requestEnterprisesHostAnonymouse,
  createPerson: requestCreatePersonAnonymouse,
  requestTermsAndConditions: requestTermsAndConditions,
  requestPersonByDoc: requestGetPersonByDocumentAnonymous,
  requestCustomFieldsTypeListValues: requestCustomFieldsTypeListValues,
  requestCustomFields: requestCustomFields,
  updateCustomFieldStore: updateCustomFieldStore,
  clearFormStore: clearFormStore,
  setInitValues: setInitValues,
  setInitDateValues: setInitDateValues,
  requestGetPersonGroups,
  requestGroupPersonSettings,
};

const mapStateToProps = ({
  Settings,
  User,
  Enterprise,
  Persons,
  TermsAndCondition,
  CustomForm,
}) => {
  return {
    currentUser: User.currentUser,
    settings: Settings.settings,
    customFields: Settings.customFields,
    successCustomFields: Settings.successCustomFields,
    enterprises: Enterprise.enterpriseAnonymouse,
    enterprisesHost: Enterprise.enterprisesHostAnonymouse,
    isCreating: Persons.successCreate,
    msjError: Persons.msjError,
    termsAndConditions: TermsAndCondition.termsAndConditions,
    personAnonymous: Persons.personAnonymous,
    successPersonAnonymous: Persons.succesGetPrsByDocAnonymous,
    customFieldsValues: CustomForm.formValues,
    customFieldsDateValues: CustomForm.formDateValues,
    personGroups: Persons.personGroups,
    successPersonGroupData: Persons.successPersonGroupData,
    personGroupSettings: Settings.personGroupSettings,
    successGetPersonGrSettings: Settings.successGetPersonGrSettings,
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withTranslation(),
  withAutoRegister
);
