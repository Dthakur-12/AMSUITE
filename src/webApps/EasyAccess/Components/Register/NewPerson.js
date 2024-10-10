import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from '@mui/styles';
import NavBarEasyAccess from "../../utils/NavBarEasyAccess";
import NavBarAludoc from "../../../Aludoc/utils/NavBarAludoc";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
//import { InlineDateTimePicker } from "@mui/x-date-pickers";
import ApiHandler from "../../../../services/ApiHandler";
import Select from "react-select";
import components from "../../../Shared/ReactSelect";
import PersonIcon from "@mui/icons-material/PersonRounded";
import PlusIcon from "@mui/icons-material/AddRounded";
import IconButton from "@mui/material/IconButton";
// Icon, TextArea } from "semantic-ui-react";
import Avatar from "@mui/material/Avatar";
import DropFile from "../../../Shared/DropFile";
import AccountCircle from "@mui/icons-material/PortraitRounded";
import Divider from "@mui/material/Divider";
import green from "@mui/material/colors/green";
import amber from "@mui/material/colors/amber";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Warning from "@mui/icons-material/Warning";
import ChevronIcon from "@mui/icons-material/ChevronRightRounded";
import DataTableDialog from "../../../Shared/DataTable/DataTableDialog";
import DataTableDialogAction from "../../../Shared/DataTable/DataTableDialogAction";
import LinearProgress from "@mui/material/LinearProgress";
import DeleteIcon from "@mui/icons-material/DeleteRounded";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import styles from "../../../../assets/styles/EasyAccess_styles/Register_styles/newPersonStyle";
import DatePicker from "react-datepicker";
import CloseIcon from "@mui/icons-material/Close";
import {
  List,
  ListItemIcon,
  FormHelperText,
  Dialog,
  Slide,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Tooltip,
} from "@mui/material";
import { isNullOrUndefined } from "util";
import {
  isValueEmptyOrNull,
  isEmailValid,
  camelize,
} from "../../../../utils/HelperFunctions";
import DataTableSelect from "../../../Shared/DataTable/DataTableSelect";
import DataTableSelectAction from "../../../Shared/DataTable/DataTableSelectAction";
import SnackbarHandler from "../../../../utils/SnackbarHandler";
import Fab from "@mui/material/Fab";
import classnames from "classnames";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import {
  requestUnassignedBadges,
  requestCountBadgesForAutoAssign,
} from "../../../../actions/EasyAccess/Badges_actions";
import Webcam from "react-webcam";
import IconCamera from "@mui/icons-material/CameraAlt";
import * as animationData from "../../../../assets/loaderCamera.json";
import Lottie from "react-lottie";
import {
  requestEnterprises,
  requestEnterprisesHost,
} from "../../../../actions/EasyAccess/Enterprise_actions";
import {
  requestPersonById,
  requestEmployees,
  requestCreatePerson,
  // requestEditPerson,
  requestPersonsTypes,
  requesSetImage,
  requesSetImageURL,
  requestGetImage,
  requestDeleteImage,
  requestUpdateImage,
  requestGetPersonGroups,
} from "../../../../actions/EasyAccess/Person_actions";

import {
  clearFormStore,
  setInitValues,
  setInitDateValues,
} from "../../../../actions/Shared/custom_form_actions";
import { FieldTypes } from "../../../../utils/Enums";
import {
  requestCustomFieldsTypeListValues,
  requestGroupPersonSettings,
} from "../../../../actions/Settings/settings_actions";
import { requestGetStatuses } from "../../../../actions/EasyAccess/status_actions";
import moment from "moment";
import CustomForm from "../../../Shared/Form/CustomForm";
import { Popup } from "semantic-ui-react";

const classNames = require("classnames");
const mapStateToProps = (Store) => {
  const { User, Settings, Enterprise, Persons, Status, Badges, CustomForm } =
    Store;
  return {
    personGroups: Persons.personGroups,
    successPersonGroupData: Persons.successPersonGroupData,
    groupSettings: Settings.groupSettings,
    currentUser: User.currentUser,
    customFields: Settings.customFields,
    settings: Settings.settings,
    enterprises: Enterprise.enterprises,
    entHost: Enterprise.enterprisesHost,
    successEnterprise: Enterprise.successEnterprise,
    isCreating: Persons.isCreating,
    //isLoadingEnterprises:Enterprise.loading,
    successEnterpriseHost: Enterprise.successEnterpriseHost,
    successPerson: Persons.successPerson,
    person: Persons.person,
    successEmployees: Persons.successEmployees,
    employees: Persons.employees,
    loadingEmp: Persons.loadingEmp,
    loadingPersons: Persons.loading,
    successCreatePrs: Persons.successCreatePrs,
    personData: Persons.personData,
    //successEditPrs: Persons.successEditPrs,
    errorPrs: Persons.error,
    msjErrPers: Persons.msjError,
    isSuccess: Persons.success,
    successPrsTypes: Persons.successPrsTypes,
    personDataTypes: Persons.personDataTypes,
    successSetImage: Persons.successSetImage,
    img: Persons.img,
    successGetImage: Persons.successGetImage,
    successDeleteImage: Persons.successDeleteImage,
    successUpdateImage: Persons.successUpdateImage,
    successGetStatuses: Status.successGetStatuses,
    statuses: Status.statuses,
    successUnassignedBadges: Badges.successUnassignedBadges,
    loadingBadges: Badges.loading,
    unassignedBadges: Badges.unassignedBadges,
    successCountBadges: Badges.successCountBadges,
    countbadges: Badges.countbadges,
    errorBdgMSG: Badges.msgError,
    errorBdg: Badges.error,
    customFieldsValues: CustomForm.formValues,
    customFieldsDateValues: CustomForm.formDateValues,
    personGroupSettings: Settings.personGroupSettings,
    successGetPersonGrSettings: Settings.successGetPersonGrSettings,
  };
};
const mapDispatchToProps = {
  requestEnterprises,
  requestEnterprisesHost,
  requestPersonById,
  requestEmployees,
  requestCreatePerson,
  // requestEditPerson: requestEditPerson,
  requestPersonsTypes,
  requesSetImage,
  requesSetImageURL,
  requestGetImage,
  requestDeleteImage,
  requestUpdateImage,
  requestUnassignedBadges,
  requestCountBadgesForAutoAssign,
  requestGetStatuses,
  clearFormStore,
  setInitValues,
  setInitDateValues,
  requestCustomFieldsTypeListValues,
  requestGetPersonGroups,
  requestGroupPersonSettings,
};
function Transition(props) {
  return <Slide direction="down" {...props} />;
}

const formValues = {
  name: "",
  lastname: "",
  document: "",
  originEnterprise: undefined,
  visitEnterprise: undefined,
  phone: "",
  email: "",
  type: 1,
  personGroups: [],
  file: undefined,
  photo: undefined,
  employee: undefined,
  status: 0,
  badges: [],
  ingressDate: new Date(new Date().setHours(0, 0, 0)),
  egressDate: new Date(new Date().setHours(23, 59, 0)),
  isHost: false,
  eventDescription: "",
};

class NewPerson extends Component {
  constructor(props) {
    super(props);
    const { currentUser, settings, initValues, t } = this.props;
    console.log("currentUser: ", currentUser);

    const permitToCreateEmployee =
      currentUser.permits["3"] && currentUser.permits["3"].includes(1);
    const permitToCreateVisitor =
      currentUser.permits["4"] && currentUser.permits["4"].includes(1);
    const permitToAprove =
      currentUser.permits["38"] && currentUser.permits["38"].includes(4);
    console.log("permitToAprove: ", permitToAprove);

    this.state = {
      succImg: false,
      isLoadingEnterprises: true,
      isLoadingStatus: true,
      isLoadingTypes: true,
      openDialogEmployees: false,
      openDialogCards: false,
      permitToCreateEmployee: permitToCreateEmployee,
      permitToCreateVisitor: permitToCreateVisitor,
      permitToAprove: permitToAprove,
      typesSuggestions:
        permitToCreateEmployee && permitToCreateVisitor
          ? [
              { value: 0, label: t("employee") },
              { value: 1, label: t("visitor") },
            ]
          : permitToCreateEmployee
          ? [{ value: 0, label: t("employee") }]
          : [{ value: 1, label: t("visitor") }],
      personGroupsSuggestions: [],
      url: undefined,
      isLoadingImg: true,
      enterpriseSuggestions: undefined,
      visitEnterprise: undefined,
      showCards: true,
      openDialogCamera: false,
      cameraLoader: true,
      errorMessage: "",
      width: 0,
      height: 0,
      currentUser: currentUser,
      personSettings: {
        employeeSettings: settings ? settings.employeeSettings : {},
        visitorSettings: settings ? settings.visitorSettings : {},
      },
      personGroupSettings: {},
      newPerson: initValues
        ? { ...initValues, status: permitToCreateEmployee ? 0 : 1 }
        : formValues,
      // {
      //     ...formValues,
      //     isHost:
      //       settings && settings.employeeSettings.employeeIsHost === 0
      //         ? true
      //         : false
      //   },
      formErrors: {},
      ocultar: false,
      showConfirmCreate: false,
    };
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateScreenMode);
  }

  updateScreenMode = () => {
    this.setState({ isDesktop: window.innerWidth > 900 });
  };

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
    console.log("initValues: ", initValues);
    if (initValues.customFields1)
      this.props.setInitValues(initValues.customFields1);
    if (initValues.customFields2)
      this.props.setInitDateValues(initValues.customFields2);
  };

  componentDidMount() {
    this.updateScreenMode();
    this.setState({ msjSucc: false });
    // this.loadEnterprises();
    // this.loadEnterprisesHost();
    this.loadStatus();
    this.loadImage();
    this.loadTypes();
    this.loadSelectsOptions();
    if (this.props.isEdit) {
      this.loadPersonData();
      this.setInitialValues();
    }
  }
  componentWillUnmount() {
    this.props.clearFormStore();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.settings !== prevState.settings ||
      nextProps.i18n.language !== prevState.language ||
      nextProps.enterprises !== prevState.enterprises ||
      nextProps.successEnterprise !== prevState.successEnterprise ||
      nextProps.entHost !== prevState.entHost ||
      nextProps.successEnterpriseHost !== prevState.successEnterpriseHost ||
      nextProps.successPerson !== prevState.successPerson ||
      nextProps.successCreatePrs !== prevState.successCreatePrs ||
      // nextProps.successEditPrs !== prevState.successEditPrs ||
      nextProps.personData !== prevState.personData ||
      nextProps.loadingPersons !== prevState.loadingPersons ||
      nextProps.errorPrs !== prevState.errorPrs ||
      nextProps.msjErrPers !== prevState.msjErrPers ||
      nextProps.isSuccess !== prevState.isSuccess ||
      nextProps.successPrsTypes !== prevState.successPrsTypes ||
      nextProps.personDataTypes !== prevState.personDataTypes ||
      nextProps.successSetImage !== prevState.successSetImage ||
      nextProps.successGetImage !== prevState.successGetImage ||
      nextProps.img !== prevState.img ||
      nextProps.successDeleteImage !== prevState.successDeleteImage ||
      nextProps.successUpdateImage !== prevState.successUpdateImage ||
      nextProps.successGetStatuses !== prevState.successGetStatuses ||
      nextProps.successCountBadges !== prevState.successCountBadges ||
      nextProps.countbadges !== prevState.countbadges ||
      nextProps.errorBdgMSG !== prevState.errorBdgMSG ||
      nextProps.errorBdg !== prevState.errorBdg ||
      nextProps.isCreating !== prevState.isCreating
    ) {
      return {
        isCreating: nextProps.isCreating,
        language: nextProps.i18n.language,
        successCountBadges: nextProps.successCountBadges,
        countbadges: nextProps.countbadges,
        errorBdgMSG: nextProps.errorBdgMSG,
        errorBdg: nextProps.errorBdg,
        successEnterprise: nextProps.successEnterprise,
        loadingPersons: nextProps.loadingPersons,
        enterprises: nextProps.enterprises,
        entHost: nextProps.entHost,
        successEnterpriseHost: nextProps.successEnterpriseHost,
        successPerson: nextProps.successPerson,
        successCreatePrs: nextProps.successCreatePrs,
        personData: nextProps.personData,
        // successEditPrs: nextProps.successEditPrs,
        errorPrs: nextProps.errorPrs,
        msjErrPers: nextProps.msjErrPers,
        isSuccess: nextProps.isSuccess,
        successPrsTypes: nextProps.successPrsTypes,
        personDataTypes: nextProps.personDataTypes,
        successSetImage: nextProps.successSetImage,
        successGetImage: nextProps.successGetImage,
        img: nextProps.img,
        successDeleteImage: nextProps.successDeleteImage,
        successUpdateImage: nextProps.successUpdateImage,
        successGetStatuses: nextProps.successGetStatuses,
        statuses: nextProps.statuses,
        personGroupSettings: nextProps.personGroupSettings || {},
        personSettings: {
          employeeSettings: nextProps.settings
            ? nextProps.settings.employeeSettings
            : {},
          visitorSettings: nextProps.settings
            ? nextProps.settings.visitorSettings
            : {},
        },
      };
    } else return null;
  }

  generatePersonGroupsSuggestions = (personGroups) => {
    const personGroupsSuggestions = personGroups.map((personGroup) => ({
      value: personGroup.id,
      label: personGroup.name,
    }));
    personGroupsSuggestions.unshift({
      value: 0,
      label: this.props.t(""),
    });
    this.setState({ personGroupsSuggestions });
  };

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
    const {
      newPerson,
      successPrsTypes,
      personDataTypes,
      typesSuggestions,
      statusSuggestions,
      language,
      successSetImage,
      successGetImage,
      img,
      statuses,
      successGetStatuses,
      successCountBadges,
      countbadges,
      errorBdgMSG,
      errorBdg,
    } = this.state;
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
    ) {
      if (personGroups) this.generatePersonGroupsSuggestions(personGroups.data);
    }

    if (errorBdg && successCountBadges !== prevState.successCountBadges) {
      this.setState({
        isCheckingBadges: false,
      });
      SnackbarHandler.showMessage(errorBdgMSG, "error");
    }
    if (
      successCountBadges &&
      successCountBadges !== prevState.successCountBadges
    ) {
      this.setState({
        isCheckingBadges: false,
      });

      if (!isNullOrUndefined(countbadges) && countbadges > 0) {
        this.createPerson();
      } else {
        this.setState({
          showConfirmCreate: true,
        });
      }
    }

    if (
      successGetStatuses &&
      prevState.successGetStatuses !== successGetStatuses
    ) {
      let statusSuggestions = [];
      console.log("statuses: ", statuses);
      statuses &&
        statuses.data.map((status) =>
          statusSuggestions.push({
            value: status.id,
            label: t(camelize(status.name)),
          })
        );
      this.setState((prevState) => ({
        statusSuggestions,
        newPerson: {
          ...prevState.newPerson,
          status: this.state.newPerson.status || 1,
        },
        isLoadingStatus: false,
      }));
    }

    if (successGetImage && successGetImage !== prevState.successGetImage) {
      this.setState((prevState) => ({
        url: img,
        isLoadingImg: false,
      }));
    }
    if (language !== prevState.language) {
      if (typesSuggestions) {
        let typesAux = this.state.typesSuggestions.slice();
        typesAux.map(
          (obj) => (obj.label = obj.value === 0 ? t("employee") : t("visitor"))
        );
        this.setState({ typesSuggestions: typesAux });
      }
      console.log("statuses: ", statuses);
      if (statuses) {
        let statusSuggestions = [];
        statuses.data.map((status) =>
          statusSuggestions.push({
            value: status.id,
            label: t(camelize(status.name)),
          })
        );
        this.setState({
          statusSuggestions,
        });
      }
    }
    if (successSetImage && successSetImage !== prevState.successSetImage) {
      this.setState({
        msjSucc: true,
        file: undefined,
        succImg: true,
        url: undefined,
        img: undefined,
        newPerson: formValues,
      });
      this.props.onCreate();
    }
    if (successPrsTypes && successPrsTypes !== prevState.successPrsTypes) {
      let typesSuggestions = [];
      const { permitToCreateEmployee, permitToCreateVisitor } = this.state;
      if (permitToCreateEmployee && permitToCreateVisitor) {
        personDataTypes.map((type) =>
          typesSuggestions.push({
            value: type.id,
            label: type.name === "Empleado" ? t("employee") : t("visitor"), //si se crea un tipo de persona nuevo hay que modificar esto.
          })
        );
      } else if (permitToCreateEmployee) {
        typesSuggestions.push({
          value: personDataTypes[0].id,
          label: t("employee"),
        });
      } else {
        typesSuggestions.push({
          value: personDataTypes[1].id,
          label: t("visitor"),
        });
      }

      if (newPerson.type > -1) {
        this.setState({
          typesSuggestions,
          isLoadingTypes: false,
        });
      } else {
        this.setState((prevState) => ({
          typesSuggestions,
          isLoadingTypes: false,
          newPerson: {
            ...prevState.newPerson,
            type: typesSuggestions[0].key,
          },
          type: typesSuggestions[0],
        }));
      }
      if (isAludoc) {
        NavBarAludoc.hideLoader();
      } else {
        NavBarEasyAccess.hideLoader();
      }
    }
    if (
      !this.state.loadingPersons &&
      this.state.loadingPersons !== prevState.loadingPersons
    ) {
      if (this.state.msjErrPers) {
        SnackbarHandler.showMessage(t(this.state.msjErrPers), "error");
        this.setState({ isCreating: false });
      }
    }
    // if (
    //   this.state.successEditPrs &&
    //   this.state.successEditPrs !== prevState.successEditPrs
    // ) {
    //   this.setState({ msjSucc: true });
    //   if (!isNullOrUndefined(this.state.file)) {
    //     this.props.requestUpdateImage({
    //       id: newPerson.id,
    //       file: this.state.file
    //     });
    //   } else {
    //     if (
    //       isNullOrUndefined(this.state.file) &&
    //       isNullOrUndefined(this.state.url)
    //     ) {
    //       this.props.requestDeleteImage(newPerson.id);
    //     }
    //   }

    //   SnackbarHandler.showMessage(t("successEditPerson"));
    //   this.setState({
    //     isCreating: false,
    //     newPerson: formValues
    //   });

    //   functionLoadRegister();
    //   onCreate();
    // }

    if (
      this.state.successCreatePrs &&
      this.state.successCreatePrs !== prevState.successCreatePrs
    ) {
      const { personData } = this.state;
      if (
        !isNullOrUndefined(personData) &&
        !isNullOrUndefined(this.state.file) &&
        this.state.file !== this.state.img
      ) {
        this.props.requesSetImage({
          id: personData.data,
          file: this.state.file,
        });
      } else if (
        !isNullOrUndefined(personData) &&
        !isNullOrUndefined(this.state.url) &&
        this.state.url !== this.state.img
      ) {
        // const newFile = await b64toBlob(file, "data:image/jpeg;base64");
        this.props.requesSetImageURL({
          id: personData.data,
          file: "data:image/jpeg;base64," + this.state.url,
        });
      } else {
        this.setState({
          msjSucc: true,
          succImg: true,
          newPerson: formValues,
        });
        if (this.props.isEdit) {
          if (
            isNullOrUndefined(this.state.file) &&
            isNullOrUndefined(this.state.url) &&
            !isNullOrUndefined(this.state.img)
          ) {
            this.props.requestDeleteImage(newPerson.id);
          }
          functionLoadRegister(true);
          this.props.onCreate();
        }
        this.props.clearFormStore();
      }
      this.props.isEdit
        ? SnackbarHandler.showMessage(t("successEditPerson"))
        : SnackbarHandler.showMessage(t("successCreatePerson"));

      this.setState({
        isCreating: false,
      });
      if (isAludoc) {
        NavBarAludoc.appNavigation.history.replace("/register");
      } else {
        NavBarEasyAccess.appNavigation.history.replace("/register");
      }
    }
    if (
      this.state.successEnterprise &&
      this.state.successEnterprise !== prevState.successEnterprise
    ) {
      // let enterpriseSuggestions = [];
      // this.state.enterprises.data.map(enterprise =>
      //   enterpriseSuggestions.push({
      //     value: enterprise.id,
      //     label: enterprise.name
      //   })
      // );
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
      // let enterpriseHostSuggestions = [];
      // this.state.entHost.data.map(enterprise =>
      //   enterpriseHostSuggestions.push({
      //     value: enterprise.id,
      //     label: enterprise.name
      //   })
      // );
      this.setState({
        // enterpriseHostSuggestions,
        isLoadingEnterprises: false,
        onlyHostEnterprises: false,
      });
    }
    if (
      this.state.successPerson &&
      this.state.successPerson !== prevState.successPerson
    ) {
      // this.setState(prevState => ({
      //   ...prevState,
      //   newPerson: {
      //     ...prevState.newPerson,
      //     employee: this.props.person
      //   }
      // }));
      this.props.requestGroupPersonSettings(
        this.props.person.personGroups || []
      );
      this.setState((prevState) => ({
        ...prevState,
        newPerson: {
          ...prevState.newPerson,
          employee: {
            id: this.props.person.employee,
            name: this.props.person.hostName,
          },
        },
      }));
    }
    if (
      this.state.successPerson &&
      this.state.successPerson !== prevState.successPerson &&
      isEdit
    ) {
      this.setState((prevState) => ({
        ...prevState,
        newPerson: {
          ...prevState.newPerson,
          linkedUserId: this.props.person.linkedUserUserDetails,
          originEnterprise: {
            name: this.props.person.originEnterpriseName,
            id: this.props.person.originEnterprise,
          },
          visitEnterprise: {
            name: this.props.person.visitEnterpriseName,
            id: this.props.person.visitEnterprise,
          },
          isHost: this.props.person.isHost,
          personGroups: this.props.person.personGroups,
          personGroupsDetails: this.props.person.personGroupsDetails,
        },
      }));
    }
  }

  loadEnterprises = () => {
    this.props.requestEnterprises({
      start: 0,
      length: -1,
      order: "name asc",
      searchText: "",
    });
  };

  loadEnterprisesHost = () => {
    // onlyHosts,
    //withoutNA,
    //skipUserVisibilityCheck

    this.props.requestEnterprisesHost({
      start: 0,
      length: -1,
      order: "name asc",
      search: "",
      onlyHosts: true,
      withoutNA: true,
      skipUserVisibilityCheck: true,
    });
  };

  // loadHost = () => {
  //   const { newPerson } = this.state;
  //   if (
  //     newPerson.employee !== -1 &&
  //     newPerson.employee !== 0 &&
  //     newPerson.employee !== undefined
  //   ) {
  //     this.props.requestPersonById(newPerson.employee);
  //   }
  // };

  loadPersonData = () => {
    const { initValues } = this.props;
    if (initValues.id !== 0) this.props.requestPersonById(initValues.id);
  };

  loadTypes = () => {
    this.props.requestPersonsTypes();
    this.props.requestGetPersonGroups({
      start: 0,
      length: -1,
      order: "name asc",
    });
  };

  translateStatus = (status) => {
    const { t } = this.props;
    return status.map((s) => (s = { ...s, label: t(camelize(s.label)) }));
  };

  loadStatus = () => {
    this.props.requestGetStatuses({
      start: 0,
      length: -1,
      order: "name asc",
      search: "",
    });
  };

  loadImage = () => {
    const { newPerson } = this.state;
    if (newPerson.id > 0) {
      this.props.requestGetImage(newPerson.id);
    } else {
      this.setState({
        isLoadingImg: false,
      });
    }
  };

  handleOnFiles = (files) => {
    this.setState({
      file: files[0],
    });
  };

  handleUnassignedBadge = (id) => {
    this.setState((prevState) => ({
      ...prevState,
      newPerson: {
        ...prevState.newPerson,
        badges: prevState.newPerson.badges.filter((badge) => badge.id !== id),
      },
    }));
  };

  handleUnassignedHost = () => {
    this.setState((prevState) => ({
      ...prevState,
      newPerson: {
        ...prevState.newPerson,
        employee: {
          id: -1,
        },
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

  handleCardsSelected = (badges) => {
    this.setState((prevState) => ({
      openDialogCards: false,
      newPerson: {
        ...prevState.newPerson,
        badges: badges,
      },
    }));
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
      this.setState((prevState) => ({
        newPerson: {
          ...prevState.newPerson,
          [name]: value,
          employee: { id: -1 },
        },
      }));
    } else {
      this.setState((prevState) => ({
        newPerson: {
          ...prevState.newPerson,
          [name]: value,
        },
      }));
    }
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

  handleChangeDate = (name) => (event) => {
    let value = new Date(event);
    this.setState((prevState) => ({
      newPerson: {
        ...prevState.newPerson,
        [name]: value,
      },
    }));
  };

  handleChangeBoolean = (event) => {
    let name = event.target.name;
    let value = event.currentTarget.checked;
    this.setState((prevState) => ({
      ...prevState,
      newPerson: {
        ...prevState.newPerson,
        [name]: value,
      },
    }));
  };

  setFile() {
    if (isValueEmptyOrNull(this.state.file)) {
      if (isValueEmptyOrNull(this.state.url)) {
        return undefined;
      } else {
        return [{ preview: "data:image/jpeg;base64," + this.state.url }];
      }
    } else {
      return [{ preview: this.state.file.preview }];
    }
  }

  deleteFile = () => {
    this.setState({
      url: undefined,
      file: undefined,
    });
  };

  handleClose = () => {
    this.setState({
      showConfirmCreate: false,
    });
  };

  handleConfirmCreate = () => {
    this.createPerson();
    this.setState({
      showConfirmCreate: false,
    });
  };

  createPerson = () => {
    let newPerson = JSON.parse(JSON.stringify(this.state.newPerson));
    newPerson = this.clearHidenInputs(newPerson);

    newPerson.badges = newPerson.badges.map((b) => b.id);
    newPerson.employee =
      newPerson.employee && newPerson.employee !== -1
        ? newPerson.employee.id
        : -1;
    newPerson.originEnterprise = newPerson.originEnterprise
      ? newPerson.originEnterprise.id
      : -1;
    newPerson.visitEnterprise = newPerson.visitEnterprise
      ? newPerson.visitEnterprise.id
      : -1;
    newPerson.discriminator = newPerson.type;
    newPerson.linkedUserId = newPerson.linkedUserId
      ? newPerson.linkedUserId.id
      : undefined;
    this.setState({
      isCreating: true,
    });
    this.props.requestCreatePerson({
      ...newPerson,
      customFields1: { ...this.props.customFieldsValues },
      customFields2: { ...this.props.customFieldsDateValues },
    });
  };

  setImageDefault() {
    const { theme } = this.props;
    if (this.state.isLoadingImg) {
      return (
        <CircularProgress
          size={50}
          style={{
            top: "50%",
            left: "50%",
            color: theme.palette.text.main,
          }}
        />
      );
    } else {
      return (
        <AccountCircle
          style={{
            fontSize: "900%",
            color: theme.palette.text.main,
          }}
        />
      );
    }
  }

  handleUserSelected = (user) => {
    this.setState((prevState) => ({
      newPerson: {
        ...prevState.newPerson,
        linkedUserId: user,
      },
    }));
  };

  handleCreate = () => {
    const { t } = this.props;
    const errors = this.validateCreate();
    console.log("errors: ", errors);
    const customFieldsErrors = this.validateCustomFields();
    this.setState({
      formErrors: errors,
      customFieldsErrors,
    });
    if (
      !Object.keys(errors).some((x) => errors[x]) &&
      !Object.keys(customFieldsErrors).some((x) => customFieldsErrors[x])
    ) {
      this.setState({
        isCheckingBadges: true,
      });

      if (
        this.state.personSettings.startBadgeRange !== null &&
        this.state.newPerson.type !== 0
      ) {
        this.props.requestCountBadgesForAutoAssign(
          this.state.newPerson.type + 1
        );
      } else {
        this.createPerson();
      }
    } else {
      SnackbarHandler.showMessage(t("inputIncomplete"), "error");
    }
  };

  handleEdit = () => {
    const { t } = this.props;
    const customFieldsErrors = this.validateCustomFields();
    const errors = this.validateCreate();
    this.setState({
      formErrors: errors,
      customFieldsErrors,
    });
    if (
      !Object.keys(errors).some((x) => errors[x]) &&
      !Object.keys(customFieldsErrors).some((x) => customFieldsErrors[x])
    ) {
      this.setState({
        isCreating: true,
      });
      let newPerson = JSON.parse(JSON.stringify(this.state.newPerson));
      newPerson.badges = newPerson.badges.map((b) => b.id);
      newPerson.discriminator = newPerson.type;
      newPerson.originEnterprise = newPerson.originEnterprise
        ? newPerson.originEnterprise.id
        : -1;
      newPerson.visitEnterprise = newPerson.visitEnterprise
        ? newPerson.visitEnterprise.id
        : -1;
      newPerson.employee =
        newPerson.employee && newPerson.employee !== -1
          ? newPerson.employee.id
          : -1;
      newPerson.linkedUserId = newPerson.linkedUserId
        ? newPerson.linkedUserId.id
        : undefined;
      console.log("se va a crear request create person");
      this.props.requestCreatePerson({
        ...newPerson,
        customFields1: { ...this.props.customFieldsValues },
        customFields2: { ...this.props.customFieldsDateValues },
      });

      setTimeout(() => {
        this.setState({
          isSuccess: false,
        });
      }, 1000);
    } else {
      SnackbarHandler.showMessage(t("inputIncomplete"), "error");
    }
  };

  inputIsHidden = (key) => {
    const { personGroupSettings } = this.state;
    const isVisitor = this.state.newPerson.type === 1;
    let personSettings = isVisitor
      ? this.state.personSettings.visitorSettings
      : this.state.personSettings.employeeSettings;
    return (
      personSettings[key] == null && isNullOrUndefined(personGroupSettings[key])
    );
  };

  clearHidenInputs = (person) => {
    const { initValues } = this.props;
    const { personGroupSettings } = this.state;
    const isVisitor = this.state.newPerson.type === 1;
    let personSettings = isVisitor
      ? this.state.personSettings.visitorSettings
      : this.state.personSettings.employeeSettings;

    if (!isVisitor) person.employee = -1;
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

  removeAccents(str) {
    str = str.replace(/\s/g, "");
    str = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    return str.replace(/[.,\/#!$%\^&\*;:{}=\-+@'_`~()]/g, "");
  }

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

  fieldHasError = (settingName, groupSettingName) => {
    const { newPerson, personSettings, personGroupSettings } = this.state;
    let personAttr = settingName == "lastName" ? "lastname" : groupSettingName;
    const isVisitor = newPerson.type === 1;
    let settings = isVisitor
      ? personSettings.visitorSettings
      : personSettings.employeeSettings;

    return settings[
      settingName === "originEnterprise"
        ? "enterprise"
        : settingName === "lastname"
        ? "lastName"
        : settingName
    ] || personGroupSettings[groupSettingName]
      ? isValueEmptyOrNull(
          newPerson[
            personAttr === "enterprise" ? "originEnterprise" : personAttr
          ]
        )
      : false;
  };

  validateCreate = () => {
    const { newPerson } = this.state;
    let name = this.fieldHasError("name", "name");
    let lastname = this.fieldHasError("lastName", "lastName");
    let document = this.fieldHasError("dni", "document");
    let originEnterprise = this.fieldHasError("enterprise", "enterprise");
    let visitEnterprise = this.fieldHasError("empVis", "visitEnterprise");
    let phone = this.fieldHasError("phone", "phone");
    let email = this.fieldHasError("email", "email");
    let date = newPerson.ingressDate > newPerson.egressDate;
    console.log("date: ", date);

    return {
      name: name,
      lastname: lastname,
      document: document,
      originEnterprise: originEnterprise,
      visitEnterprise: visitEnterprise,
      type: isValueEmptyOrNull(newPerson.type),
      status:
        newPerson.status === -1 ? true : isValueEmptyOrNull(newPerson.status),
      phone: phone,
      email: email,
      date: date,
    };
  };

  handleOpenEmployees = () => {
    this.setState({
      openDialogEmployees: true,
    });
  };

  handleEnterpriseSelected = (name, enterprise) => {
    this.setState((prevState) => ({
      newPerson: {
        ...prevState.newPerson,
        [name]: enterprise,
        employee:
          name === "visitEnterprise"
            ? {
                id: -1,
              }
            : prevState.newPerson.employee,
      },
    }));
  };

  handleOpenCards = () => {
    this.setState({
      openDialogCards: true,
    });
  };

  setRef = (webcam) => {
    this.webcam = webcam;
  };

  capture = () => {
    const imageSrc = this.webcam.getScreenshot();
    const url = imageSrc.split(",");
    this.setState((prevState) => ({
      ...prevState,
      url: url[1],
      openDialogCamera: false,
    }));
  };
  openCamera = () => {
    this.setState((prevState) => ({
      ...prevState,
      openDialogCamera: true,
      cameraLoader: true,
      height: 0,
      width: 0,
    }));
  };

  render() {
    const {
      newPerson,
      enterpriseSuggestions,
      enterpriseHostSuggestions,
      typesSuggestions,
      personGroupsSuggestions,
      statusSuggestions,
      isLoadingEnterprises,
      isLoadingStatus,
      openDialogEmployees,
      openDialogCards,
      openDialogCamera,
      cameraLoader,
      personGroupSettings,
      isDesktop,
    } = this.state;
    console.log("statusSuggestions: ", statusSuggestions);
    const {
      classes,
      theme,
      isDialog,
      isEdit,
      t,
      isVisitRequest,
      customFields,
    } = this.props;
    const isVisitor = newPerson.type === 1;
    let personSettings = isVisitor
      ? this.state.personSettings.visitorSettings
      : this.state.personSettings.employeeSettings;

    const enterpriseColumns = [
      {
        name: t("name"),
        field: "name",
        options: {
          sort: true,
          filter: true,
          sortDirection: "asc",
          customBodyRender: (data) => {
            if (data.name)
              return <Typography value={data.name}>{data.name}</Typography>;
          },
        },
      },
    ];
    const EntranceDateText = ({ value, onClick }) => (
      <TextField
        style={{ width: "100%" }}
        onClick={onClick}
        label={t("DateAdmission")}
        value={value}
        required={!isNullOrUndefined(this.state.newPerson.ingressDate)}
      />
    );
    const ExitDateText = ({ value, onClick }) => (
      <TextField
        style={{ width: "100%" }}
        onClick={onClick}
        label={t("DateExit")}
        value={value}
        required={this.state.newPerson.egressDate}
      />
    );
    const selectStyles = {
      root: {
        width: "100%",
      },
      dropdownIndicator: (base) => ({
        ...base,
        color: theme.palette.text.main,
      }),
      input: (base) => ({
        ...base,
        color: theme.palette.text.main,
        "& input": {
          font: "inherit",
        },
        width: "100%",
        position: "absolute",
        menuList: {
          maxHeight: 100,
        },
      }),
    };

    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData.default,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
    };
    return (
      (<main className={!isDialog ? classes.layout : undefined}>
        <div className={!isDialog ? classes.fill : undefined}>
          <LinearProgress
            style={{
              opacity: this.state.isCreating ? "1" : "0",
              width: "100%",
              background: "none",
              borderBottomLeftRadius: 50,
              borderBottomRightRadius: 50,
            }}
            variant="query"
          />
          <Paper elevation={!isDialog ? 2 : 0} className={classes.paper}>
            <Avatar className={classes.avatar}>
              <PersonIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              {isEdit ? t("EditPerson") : t("NewPerson")}
            </Typography>
            <div
              style={{
                display: "flex",
                justifyContent: " space-between",
                width: "400px",
              }}
            >
              <div
                style={{
                  width: "160px",
                  display: "flex",
                  flexDirection: "column",
                  marginRight: "10%",
                  //alignItems: "flex-start",
                }}
              >
                <React.Fragment className={classes.formControl}>
                  <Typography>{t("PersonType")}</Typography>
                  {!isEdit ? (
                    <Select
                      classes={classes}
                      styles={selectStyles}
                      options={typesSuggestions}
                      components={components}
                      value={
                        typesSuggestions &&
                        typesSuggestions.map((option) =>
                          option.value === newPerson.type ? option : ""
                        )
                      }
                      onChange={this.handleChange("type")}
                      placeholder={t("Type")}
                      maxMenuHeight={200}
                      // isLoading={isLoadingTypes}
                      // isDisabled={isLoadingTypes}
                    />
                  ) : (
                    <Typography variant="h6" style={{ textAlign: "center" }}>
                      {typesSuggestions &&
                        typesSuggestions.map((option) =>
                          option.value === newPerson.type ? option.label : ""
                        )}
                    </Typography>
                  )}
                </React.Fragment>
              </div>

              <div
                style={{
                  width: "230px",
                }}
              >
                {!isEdit ? (
                  <React.Fragment>
                    <Typography>{t("AssignPersonToGroup")}</Typography>
                    <Select
                      classes={classes}
                      styles={selectStyles}
                      options={personGroupsSuggestions}
                      components={components}
                      value={
                        personGroupsSuggestions &&
                        personGroupsSuggestions.map((option) =>
                          newPerson.personGroups &&
                          option.value === newPerson.personGroups[0]
                            ? option
                            : ""
                        )
                      }
                      onChange={this.handlePersonGroupChange("personGroups")}
                      placeholder={t("PersonGroups")}
                      maxMenuHeight={210}
                      // isLoading={isLoadingTypes}
                      // isDisabled={isLoadingTypes}
                    />
                  </React.Fragment>
                ) : (
                  <div>
                    {newPerson.personGroups && (
                      <Popup
                        content={newPerson.personGroupsDetails}
                        position="bottom center"
                        inverted
                        className={classes.popup}
                        trigger={
                          <span style={{ position: "relative" }}>
                            <Typography
                              variant="h6"
                              style={{ textAlign: "center" }}
                            >{`${t("PersonGroups")} :  ${
                              newPerson.personGroups.length
                            }`}</Typography>
                          </span>
                        }
                      >
                        <div
                          style={{ display: "flex", flexDirection: "column" }}
                        >
                          {newPerson.personGroupsDetails &&
                            newPerson.personGroupsDetails.map((pg) => {
                              console.log("pg: ", pg);
                              return <Typography>{pg.name}</Typography>;
                            })}
                        </div>
                      </Popup>
                    )}
                  </div>
                )}
              </div>
            </div>

            <Divider
              style={{
                width: "100%",
                marginTop: 10,
                marginBottom: 24,
                color: theme.palette.text.main,
              }}
            />
            <Grid container spacing={24}>
              <Grid
                container
                item
                xs={12}
                md={4}
                spacing={24}
                direction="column"
                justifyContent="flex-start"
                alignItems="flex-start"
                style={{ display: "inline-block" }}
              >
                <Grid
                  item
                  xs={12}
                  md={12}
                  hidden={
                    personSettings.enterprise === null &&
                    isNullOrUndefined(personGroupSettings.enterprise)
                  }
                >
                  <DataTableSelectAction
                    handleConfirm={(enterprise) =>
                      this.handleEnterpriseSelected(
                        "originEnterprise",
                        enterprise
                      )
                    }
                    loadDataAction={this.props.requestEnterprises}
                    element={this.state.newPerson.originEnterprise}
                    primaryTitle={
                      personSettings.enterprise === true
                        ? `${t("originEnterprise")} *`
                        : t("originEnterprise")
                    }
                    title={
                      personSettings.enterprise === true
                        ? `${t("originEnterprise")} *`
                        : t("originEnterprise")
                    } //aca
                    DataTableColumns={enterpriseColumns}
                    multipleSelect={false}
                    attribute={"name"}
                    isDetails={this.props.isDetails}
                    info={this.props.enterprises}
                    success={this.props.successEnterprise}
                    loading={this.props.loadingEnterprises}
                    hasError={this.state.formErrors.originEnterprise}
                  />
                </Grid>

                <Grid
                  item
                  xs={12}
                  md={12}
                  hidden={
                    (isNullOrUndefined(personSettings.empVis) &&
                      isNullOrUndefined(personGroupSettings.visitEnterprise)) ||
                    isVisitRequest
                  }
                >
                  <DataTableSelectAction
                    handleConfirm={(enterprise) =>
                      this.handleEnterpriseSelected(
                        "visitEnterprise",
                        enterprise
                      )
                    }
                    loadDataAction={this.props.requestEnterprisesHost}
                    element={this.state.newPerson.visitEnterprise}
                    primaryTitle={t("visitEnterprise")}
                    title={t("visitEnterprise")}
                    DataTableColumns={enterpriseColumns}
                    multipleSelect={false}
                    attribute={"name"}
                    isDetails={this.props.isDetails}
                    info={this.props.entHost}
                    success={this.props.successEnterprise}
                    loading={this.props.loadingEnterprises}
                    hasError={this.state.formErrors.visitEnterprise}
                    extraObject={{
                      onlyHosts: true,
                      withoutNA: true,
                      skipUserVisibilityCheck: true,
                    }}
                  />
                </Grid>
                {this.state.newPerson.type === 1 && (
                  <Grid
                    item
                    xs={12}
                    md={12}
                    hidden={
                      personSettings.empRes === null &&
                      isNullOrUndefined(personGroupSettings.host)
                    }
                  >
                    <Typography component="h1" variant="subtitle1">
                      {t("ResponsibleEmployee")}
                    </Typography>
                    <Divider style={{ marginBottom: 10 }} />
                    <List className={classes.listRoot}>
                      <ListItem style={{ padding: 0 }}>
                        <Fab
                          size="small"
                          className={classes.customFab}
                          onClick={this.handleOpenEmployees}
                          style={{ minWidth: 40 }}
                        >
                          <PlusIcon />
                        </Fab>
                        <ListItemText
                          primary={
                            <Typography type="body2">
                              {newPerson.employee &&
                              newPerson.employee.id !== -1
                                ? newPerson.employee.name
                                : t("Unspecified")}
                            </Typography>
                          }
                        />
                        {newPerson.employee && newPerson.employee.id !== -1 ? (
                          <IconButton
                            className={classes.iconButton}
                            onClick={() => this.handleUnassignedHost()}
                            size="large">
                            <DeleteIcon />
                          </IconButton>
                        ) : (
                          ""
                        )}
                      </ListItem>
                    </List>
                    {/* <FormHelperText
                      style={{
                        opacity: enterpriseVithissitUndefined ? 1 : 0,
                        paddingLeft: "5%"
                      }}
                      error={enterpriseVisitUndefined}
                    >
                      {"Seleccionar empresa a visitar"}
                    </FormHelperText> */}
                  </Grid>
                )}

                <Grid
                  item
                  xs={12}
                  md={12}
                  hidden={
                    personSettings.card === null &&
                    isNullOrUndefined(personGroupSettings.badge) &&
                    !isVisitRequest
                  }
                >
                  <Typography component="h1" variant="subtitle1">
                    {t("CardToAssign")}
                  </Typography>
                  <Divider style={{ marginBottom: 10 }} />
                  <List className={classes.listRoot}>
                    <ListItem style={{ padding: 0 }}>
                      <Fab
                        size="small"
                        color="default"
                        onClick={this.handleOpenCards}
                        className={classes.customFab}
                      >
                        <PlusIcon className={classes.fabIcon} />
                      </Fab>
                      <ListItemText
                        inset
                        primary={
                          t("Badges") +
                          (newPerson.badges.length !== 0
                            ? ": " + newPerson.badges.length
                            : "")
                        }
                      />
                      <IconButton
                        className={classnames(classes.expand, {
                          [classes.expandOpen]: this.state.showCards,
                        })}
                        disabled={newPerson.badges.length === 0}
                        onClick={() =>
                          this.setState({ showCards: !this.state.showCards })
                        }
                        size="large">
                        <ExpandMore />
                      </IconButton>
                    </ListItem>
                    <Collapse
                      in={this.state.showCards}
                      timeout="auto"
                      unmountOnExit
                    >
                      {newPerson.badges && (
                        <List dense component="div" disablePadding>
                          {newPerson.badges.map((badge) => (
                            <ListItem key={badge.id} className={classes.nested}>
                              <ListItemIcon>
                                <ChevronIcon />
                              </ListItemIcon>
                              <ListItemText inset primary={badge.number} />
                              <ListItem>
                                <IconButton
                                  className={classes.iconButton}
                                  onClick={() =>
                                    this.handleUnassignedBadge(badge.id)
                                  }
                                  size="large">
                                  <DeleteIcon />
                                </IconButton>
                              </ListItem>
                            </ListItem>
                          ))}
                        </List>
                      )}
                    </Collapse>
                  </List>
                </Grid>

                {this.state.newPerson.type === 0 && (
                  <Grid
                    item
                    xs={12}
                    md={12}
                    className={classes.grid}
                    hidden={
                      personSettings.employeeIsHost === 2 &&
                      isNullOrUndefined(personGroupSettings.isHost)
                    }
                  >
                    <FormControlLabel
                      control={
                        <Switch
                          checked={newPerson.isHost}
                          value={newPerson.isHost}
                          color="primary"
                          name="isHost"
                          onChange={this.handleChangeBoolean}
                          key={newPerson.isHost}
                        />
                      }
                      label={t("IsHost")}
                    />
                    {newPerson.isHost && (
                      <DataTableSelect
                        handleConfirm={this.handleUserSelected}
                        loadDataFunction={ApiHandler.AMSuite.User.GetUsersAux}
                        element={this.state.newPerson.linkedUserId}
                        primaryTitle={t("AssignUser")}
                        title={t("Users")}
                        dataTableSubTitle={t("AssignUser")}
                        mdSubtitle={3}
                        DataTableColumns={[
                          {
                            name: t("Name"),
                            field: "name",
                            options: {
                              filter: true,
                              sort: true,
                              searchable: false,
                              // sortDirection: activeColumnSort === 0 ? order : "none"
                            },
                          },
                          {
                            name: t("LastName"),
                            field: "lastname",
                            options: {
                              filter: true,
                              sort: true,
                              // sortDirection: activeColumnSort === 1 ? order : "none"
                            },
                          },
                          {
                            name: t("UserName"),
                            field: "userName",
                            options: {
                              filter: true,
                              sort: true,
                              // sortDirection: activeColumnSort === 1 ? order : "none"
                            },
                          },
                        ]}
                        multipleSelect={false}
                        attribute={"userName"}
                        hasError={this.state.formErrors.user}
                      />
                    )}
                  </Grid>
                )}
              </Grid>

              <Grid container item xs={12} md={8} spacing={24}>
                <Grid item xs={12} md={6}>
                  <div style={{ width: "100%" }}>
                    <DatePicker
                      selected={new Date(newPerson.ingressDate)}
                      onChange={this.handleChangeDate("ingressDate")}
                      showTimeSelect
                      showYearDropdown
                      scrollableYearDropdown
                      timeIntervals={15}
                      customInput={<EntranceDateText />}
                      timeCaption="time"
                      dateFormat={"yyyy/MM/dd hh:mm a"}
                      minDate={new Date()}
                      calendarClassName={classes.reactDatePicker}
                      required
                      error={this.state.formErrors.date}
                    />
                    <FormHelperText
                      style={{ opacity: this.state.formErrors.date ? 1 : 0 }}
                      error={this.state.formErrors.date}
                    >
                      {t("DateError")}
                    </FormHelperText>
                  </div>
                </Grid>

                <Grid item xs={12} md={6}>
                  <div style={{ width: "100%" }}>
                    <DatePicker
                      calendarClassName={classes.reactDatePicker}
                      selected={new Date(newPerson.egressDate)}
                      onChange={this.handleChangeDate("egressDate")}
                      showTimeSelect
                      showYearDropdown
                      scrollableYearDropdown
                      timeIntervals={15}
                      minDate={new Date(newPerson.ingressDate)}
                      customInput={<ExitDateText />}
                      timeCaption="time"
                      dateFormat={"yyyy/MM/dd hh:mm a"}
                      required
                      fullWidth
                    />
                  </div>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={6}
                  className={classes.grid}
                  hidden={
                    personSettings.name === null &&
                    isNullOrUndefined(personGroupSettings.name)
                  }
                >
                  <TextField
                    required={personSettings.name || personGroupSettings.name}
                    label={t("name")}
                    onChange={this.handleChange("name")}
                    value={newPerson.name}
                    fullWidth
                    helperText={t("inputEmpty")}
                    FormHelperTextProps={{
                      style: { opacity: this.state.formErrors.name ? 1 : 0 },
                    }}
                    error={this.state.formErrors.name}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={6}
                  className={classes.grid}
                  hidden={
                    personSettings.lastName === null &&
                    isNullOrUndefined(personGroupSettings.lastName)
                  }
                >
                  <TextField
                    required={
                      personSettings.lastName || personGroupSettings.lastName
                    }
                    label={t("LastName")}
                    fullWidth
                    onChange={this.handleChange("lastname")}
                    value={newPerson.lastname}
                    helperText={t("inputEmpty")}
                    FormHelperTextProps={{
                      style: {
                        opacity: this.state.formErrors.lastname ? 1 : 0,
                      },
                    }}
                    error={this.state.formErrors.lastname}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={6}
                  className={classes.grid}
                  hidden={
                    personSettings.dni === null &&
                    isNullOrUndefined(personGroupSettings.document)
                  }
                >
                  <TextField
                    required={
                      personSettings.dni || personGroupSettings.document
                    }
                    type="text"
                    label={t("dni")}
                    fullWidth
                    onChange={this.handleChange("document")}
                    value={newPerson.document}
                    helperText={t("inputEmpty")}
                    FormHelperTextProps={{
                      style: {
                        opacity: this.state.formErrors.document ? 1 : 0,
                      },
                    }}
                    error={this.state.formErrors.document}
                  />
                </Grid>

                <Grid
                  item
                  xs={12}
                  md={6}
                  className={classes.grid}
                  hidden={
                    personSettings.email === null &&
                    isNullOrUndefined(personGroupSettings.email)
                  }
                >
                  <TextField
                    required={personSettings.email || personGroupSettings.email}
                    type="email"
                    label={t("email")}
                    fullWidth
                    onChange={this.handleChange("email")}
                    value={newPerson.email}
                    helperText={t("invalidEmail")}
                    FormHelperTextProps={{
                      style: { opacity: this.state.formErrors.email ? 1 : 0 },
                    }}
                    error={this.state.formErrors.email}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={6}
                  className={classes.grid}
                  hidden={
                    personSettings.phone === null &&
                    isNullOrUndefined(personGroupSettings.phone)
                  }
                >
                  <TextField
                    required={personSettings.phone || personGroupSettings.phone}
                    type="number"
                    label={t("Phone")}
                    fullWidth
                    onChange={this.handleChange("phone")}
                    value={newPerson.phone}
                    helperText={t("inputEmpty")}
                    FormHelperTextProps={{
                      style: { opacity: this.state.formErrors.phone ? 1 : 0 },
                    }}
                    error={this.state.formErrors.phone}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={6}
                  className={classes.grid}
                  hidden={!this.state.permitToAprove}
                >
                  <div className={classes.formControl}>
                    <label className={classes.formControlLabel}>
                      {t("status")}
                    </label>
                    <Select
                      className={classes.select}
                      classes={classes}
                      styles={selectStyles}
                      options={statusSuggestions}
                      components={components}
                      value={
                        statusSuggestions &&
                        statusSuggestions.map((option) =>
                          newPerson.status == null
                            ? statusSuggestions[0]
                            : option.value === newPerson.status
                            ? option
                            : ""
                        )
                      }
                      onChange={this.handleChange("status")}
                      placeholder={t("status")}
                      maxMenuHeight={200}
                      isLoading={isLoadingStatus}
                      isDisabled={isLoadingStatus}
                      noOptionsMessage={() => t("NoInformation")}
                    />
                  </div>
                  {/* <FormHelperText
                    style={{ opacity: this.state.formErrors.status ? 1 : 0 }}
                    error={this.state.formErrors.status}
                  >
                    {t("inputEmpty")}
                  </FormHelperText> */}
                </Grid>
                <CustomForm
                  customFields={customFields ? customFields.cardholders : []}
                  entity={this.state.newPerson.type + 1}
                  personGroups={this.state.newPerson.personGroups}
                  errors={this.state.customFieldsErrors}
                />
                {this.state.newPerson.status === 4 && (
                  <Grid item xs={12} md={12}>
                    <TextField
                      id="observaciones"
                      label={t("Observations")}
                      multiline
                      maxRows="7"
                      rows="6"
                      value={this.state.newPerson.eventDescription}
                      onChange={this.handleChange("eventDescription")}
                      className={classes.eventDescription}
                      margin="normal"
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                )}

                <Grid
                  item
                  xs={12}
                  md={12}
                  style={{
                    // height: "21%",
                    width: "100%",
                    paddingBottom: 0,
                    display: "flex",
                    marginTop: 12,
                    marginBottom: "5%",
                  }}
                >
                  {!this.state.isLoadingImg && (
                    <DropFile
                      dropzoneText={t("DragOrClickImage")}
                      multiple={false}
                      accept="image/*"
                      onFiles={this.handleOnFiles}
                      local={false}
                      defaultImage={this.setImageDefault()}
                      files={this.setFile()}
                    />
                  )}
                </Grid>
                <Grid
                  container
                  xs={12}
                  spacing={24}
                  style={{ marginBottom: "5%" }}
                >
                  <Grid
                    item
                    xs={12}
                    md={12}
                    style={{
                      paddingTop: "0px",
                      paddingRight: "0px",
                      //paddingLeft: "16px",
                    }}
                  >
                    <Grid
                      item
                      xs={12}
                      md={6}
                      style={{
                        position: "absolute",
                        paddingTop: "0px",
                        paddingLeft: "0px",
                        paddingRight: "0px",
                        paddingBottom: "0px",
                      }}
                      hidden={isVisitRequest}
                    >
                      {/* <IconButton
                      className={classes.iconButton}
                      onClick={() =>
                        this.setState(prevState => ({
                          ...prevState,
                          openDialogCamera: true
                        }))
                      }
                    >
                      <Icon name="camera" link />
                    </IconButton> */}
                      <Button
                        onClick={this.openCamera}
                        style={{ color: theme.palette.text.main }}
                        size="small"
                      >
                        <IconCamera
                          style={{
                            // marginRight: 5,
                            color: theme.palette.text.main,
                          }}
                        />
                        {t("UseCamera")}
                      </Button>
                    </Grid>
                    <Grid
                      item
                      md={6}
                      style={{
                        width: "100%",
                        display: "flex",
                        paddingTop: "0px",
                        paddingLeft: "0px",
                        paddingRight: "0px",
                        paddingBottom: "0px",
                        justifyContent: "flex-end",
                        marginLeft: "6%",
                      }}
                    >
                      <Button
                        onClick={this.deleteFile}
                        size="small"
                        style={{
                          color: theme.palette.text.main,
                          marginTop: "1%",
                        }}
                      >
                        {t("DeletePhoto")}
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <div
              className={classes.submit}
              style={{
                position: "relative",
                width: "100%",
              }}
            >
              <Button
                fullWidth
                variant="contained"
                disabled={this.state.isCreating}
                onClick={
                  this.state.isCreating
                    ? undefined
                    : isEdit
                    ? this.handleEdit
                    : // personSettings.startBadgeRange !== null
                      // ? this.handleValidateCards
                      this.handleCreate
                }
                style={{
                  background:
                    this.state.isSuccess &&
                    this.state.msjSucc &&
                    this.state.succImg
                      ? green[500]
                      : this.state.isCheckingBadges
                      ? amber[500]
                      : theme.palette.primary.main,
                  color: theme.palette.text.main,
                }}
              >
                {this.state.isSuccess &&
                this.state.msjSucc &&
                this.state.succImg
                  ? isEdit
                    ? t("successEdit")
                    : t("successCreate")
                  : this.state.isCreating
                  ? ""
                  : this.state.isCheckingBadges &&
                    this.state.personSettings.startBadgeRange !== null
                  ? t("GettingBadges")
                  : isEdit
                  ? t("EditPerson")
                  : t("CreatePerson")}
              </Button>
              {(this.state.isCreating || this.state.isCheckingBadges) && (
                <CircularProgress
                  size={24}
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    marginTop: -12,
                    marginLeft: -12,
                    color: theme.palette.text.main,
                  }}
                />
              )}
            </div>
          </Paper>
          <DataTableDialogAction
            open={openDialogEmployees}
            onConfirm={this.handleEmployeeSelected}
            onClose={() => this.setState({ openDialogEmployees: false })}
            extraData={
              newPerson.visitEnterprise !== undefined
                ? [newPerson.visitEnterprise.id]
                : undefined
            }
            extraData1={true}
            extraData2={true}
            mdSubtitle={4}
            info={this.props.employees}
            success={this.props.successEmployees}
            loading={this.props.loadingEmp}
            title={t("ResponsibleEmployee")}
            subTitle={t("SelectResponsibleEmployee")}
            loadDataAction={this.props.requestEmployees}
            rowsSelected={
              !isNullOrUndefined(newPerson.employee) ? [newPerson.employee] : []
            }
            multipleSelect={false}
            columns={[
              {
                name: t("name"),
                field: "name",
                options: {
                  filter: true,
                  sort: true,
                  sortDirection: "asc",
                },
              },
              {
                name: t("LastName"),
                field: "lastname",
                options: {
                  filter: true,
                  sort: true,
                },
              },
            ]}
          />
          {openDialogCards && (
            <DataTableDialogAction
              open={openDialogCards}
              onConfirm={this.handleCardsSelected}
              onClose={() => this.setState({ openDialogCards: false })}
              title={t("ManagerCards")}
              subTitle={t("selectAssignCard")}
              loadDataAction={this.props.requestUnassignedBadges}
              info={this.props.unassignedBadges}
              success={this.props.successUnassignedBadges}
              loading={this.props.loadingBadges}
              rowsSelected={newPerson.badges}
              extraData={newPerson.id}
              extraData1={newPerson.type === 0 ? 0 : 2}
              multipleSelect={true}
              columns={[
                {
                  name: t("number"),
                  field: "number",
                  options: {
                    filter: true,
                    sort: true,
                    sortDirection: "asc",
                  },
                },
                {
                  name: t("PIN"),
                  field: "pin",
                  options: {
                    filter: true,
                    sort: true,
                  },
                },
                {
                  name: t("activeDate"),
                  field: "activationDate",
                  options: {
                    filter: true,
                    sort: true,
                    customBodyRender: (data) => {
                      const formattedDate =
                        this.props.i18n.language === "es"
                          ? moment(data.activationDate)
                              .lang(this.props.i18n.language)
                              .format("DD/MM/YYYY HH:mm")
                          : moment(data.activationDate)
                              .lang(this.props.i18n.language)
                              .format("MM/DD/YYYY HH:mm");
                      return <Typography>{formattedDate}</Typography>;
                    },
                  },
                },
                {
                  name: t("expeditionDate"),
                  field: "deactivationDate",
                  options: {
                    filter: true,
                    sort: true,
                    customBodyRender: (data) => {
                      const formattedDate =
                        this.props.i18n.language === "es"
                          ? moment(data.deactivationDate)
                              .lang(this.props.i18n.language)
                              .format("DD/MM/YYYY HH:mm")
                          : moment(data.deactivationDate)
                              .lang(this.props.i18n.language)
                              .format("MM/DD/YYYY HH:mm");
                      return <Typography>{formattedDate}</Typography>;
                    },
                  },
                },
              ]}
            />
          )}

          {personSettings.startBadgeRange !== null && (
            <Dialog
              open={this.state.showConfirmCreate}
              onClose={this.handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle
                id="alert-dialog-title"
                className={classes.confirmTitle}
              >
                <Warning style={{ color: "#863", marginRight: 10 }} />
                {t("withoutBadgesAvailabe")}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  {t("withoutBadgesAvailabeContent")}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleConfirmCreate} color="primary">
                  {t("Create")}
                </Button>
                <Button
                  onClick={this.handleClose}
                  style={{ color: theme.palette.text.main }}
                  autoFocus
                >
                  {t("cancel")}
                </Button>
              </DialogActions>
            </Dialog>
          )}

          <Dialog
            open={openDialogCamera}
            TransitionComponent={Transition}
            onClose={() => this.setState({ openDialogCamera: false })}
            maxWidth="md"
            fullScreen={isDesktop}
            style={isDesktop ? { margin: 0 } : { margin: "32px" }}
            scroll="paper"
          >
            <main>
              <div>
                <Paper
                  elevation={0}
                  className={classes.paper}
                  style={{ marginBottom: 0, padding: "35px" }}
                >
                  <IconButton
                    aria-label="close"
                    className={classes.closeButton}
                    onClick={() => this.setState({ openDialogCamera: false })}
                    size="large">
                    <CloseIcon />
                  </IconButton>
                  <Avatar className={classes.avatar}>
                    <IconCamera />
                  </Avatar>
                  <Typography component="h1" variant="h5">
                    {t("TakePhoto")}
                  </Typography>
                  {cameraLoader && (
                    <div style={{ height: 500, width: 500 }}>
                      <div style={{ marginTop: "12%" }}>
                        <Lottie
                          options={defaultOptions}
                          height={250}
                          width={250}
                          ref={(animation) => (this.animation = animation)}
                          isStopped={!cameraLoader}
                        />
                        <Typography
                          style={{
                            marginTop: "5%",
                            fontSize: 19,
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          {`${t("Conecting")}...`}
                        </Typography>
                        <Typography
                          style={{
                            padding: "4% 20% 0% 22%",
                            fontSize: 19,
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          {t("VerifyThatTheCameraIsConnectedToTheComputer")}
                        </Typography>
                      </div>
                    </div>
                  )}

                  {!isVisitRequest && (
                    <Webcam
                      audio={false}
                      onUserMedia={() =>
                        this.setState((prevState) => ({
                          ...prevState,
                          cameraLoader: false,
                          height: 550,
                          width: 550,
                        }))
                      }
                      mirrored={true}
                      onUserMediaError={() => console.log("not found")}
                      height={this.state.height}
                      ref={this.setRef}
                      screenshotFormat="image/jpeg"
                      width={this.state.width}
                      //videoConstraints={videoConstraints}
                    />
                  )}

                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    disabled={cameraLoader}
                    onClick={this.capture}
                    style={{
                      //background: this.state.isSuccess ? green[500] : undefined,
                      color: "white",
                    }}
                  >
                    {t("CaptureImage")}
                  </Button>
                </Paper>
              </div>
            </main>
          </Dialog>
        </div>
      </main>)
    );
  }
}

NewPerson.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

const NewPersonConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(NewPerson);

export default withTranslation()(
  withStyles(styles, { withTheme: true })(NewPersonConnected)
);
