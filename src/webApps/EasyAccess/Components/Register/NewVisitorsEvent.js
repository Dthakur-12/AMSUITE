import {
  Avatar,
  CircularProgress,
  Dialog,
  Divider,
  Fab,
  Grid,
  IconButton,
  Paper,
  Slide,
  TextField,
  Typography,
  FormLabel,
  InputLabel,
  Tooltip,
} from "@mui/material";
import Button from "@mui/material/Button";
import green from "@mui/material/colors/green";
import { withStyles } from '@mui/styles';
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import DownloadIcon from "@mui/icons-material/GetApp";
import PlusIcon from "@mui/icons-material/AddRounded";
import IconCamera from "@mui/icons-material/CameraAlt";
import DeleteIcon from "@mui/icons-material/DeleteRounded";
import AccountCircle from "@mui/icons-material/PortraitRounded";
import SupervisedUserCircleRoundedIcon from "@mui/icons-material/SupervisedUserCircleRounded";
import moment from "moment";
import PropTypes from "prop-types";
import React, { Component } from "react";
import DatePicker from "react-datepicker";
import { withTranslation } from "react-i18next";
import Lottie from "react-lottie";
import { connect } from "react-redux";
import Select from "react-select";
import Webcam from "react-webcam";
import { isNullOrUndefined } from "util";
import { requestEnterprises } from "../../../../actions/EasyAccess/Enterprise_actions";
import {
  requestCheckDocumentNumbers,
  requestClearSuccessCreate,
  requestCreateVisitorGroup,
  requestDownloadExcelTemplate,
  requestEmployees,
  requestGetXLSWithVisitorGroup,
} from "../../../../actions/EasyAccess/Person_actions";
import { requestGetStatuses } from "../../../../actions/EasyAccess/status_actions";
import * as animationData from "../../../../assets/loaderCamera.json";
import styles from "../../../../assets/styles/EasyAccess_styles/Register_styles/newPersonStyle";
import {
  camelize,
  isEmailValid,
  isValueEmptyOrNull,
} from "../../../../utils/HelperFunctions";
import SnackbarHandler from "../../../../utils/SnackbarHandler";
import DataTableDialogAction from "../../../Shared/DataTable/DataTableDialogAction";
import DataTableSelectAction from "../../../Shared/DataTable/DataTableSelectAction";
import DropFile from "../../../Shared/DropFile";
import components from "../../../Shared/ReactSelect";
import NavBarEasyAccess from "../../utils/NavBarEasyAccess";
import EventPersonList from "./EventPersonList";
import ExcelUploadComponent from "./ExcelUploadComponent";
import { Form } from "semantic-ui-react";

const formValues = {
  hostId: -1,
  startDate: new Date(new Date().setHours(0, 0, 0)),
  duration: undefined,
  host: undefined,
  statusId: undefined,
  people: [],
};
const formPersonValues = {
  name: "",
  lastname: "",
  document: "",
  originCompanyId: undefined,
  originCompany: undefined,
  visitEnterprise: undefined,
  phone: "",
  email: "",
  type: 1,
  file: undefined,
  employee: undefined,
  ingressDate: new Date(new Date().setHours(0, 0, 0)),
  egressDate: new Date(new Date().setHours(23, 59, 0)),
  isHost: false,
  eventDescription: "",
  status: 0,
  statusId: 1,
};

function Transition(props) {
  return <Slide direction="down" {...props} />;
}

class NewVisitorsEvent extends Component {
  constructor(props) {
    super(props);
    const { initValues, settings } = this.props;
    this.state = {
      newEvent: initValues ? initValues : formValues,
      newPerson: formPersonValues,
      documentList: [],
      openDialogEmployees: false,
      openDialogCamera: false,
      openImageModal: false,
      isLoadingStatus: true,
      personSettings: settings ? settings.visitorSettings : {},
      formErrors: {},
      formErrorsPerson: {},
      formErrorsEvent: {},
      durationSuggestions: this.generateDurationSuggestions(),
    };
  }

  generateDurationSuggestions = () => {
    const durations = [];
    const date = moment().startOf("day");
    for (var i = 0; i < 24; i++) {
      date.add(30, "minutes");
      var minutes = date.hour() * 60 + date.minute();
      durations.push({ value: minutes, label: date.format("LT") });
    }
    return durations;
  };

  componentDidMount() {
    this.loadStatus();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.settings !== prevState.settings ||
      nextProps.i18n.language !== prevState.language ||
      nextProps.successGetStatuses !== prevState.successGetStatuses ||
      nextProps.statuses !== prevState.statuses ||
      nextProps.isSuccess !== prevState.isSuccess ||
      nextProps.isCreating !== prevState.isCreating
    ) {
      return {
        successCreateEvent: nextProps.successCreateEvent,
        successGetStatuses: nextProps.successGetStatuses,
        statuses: nextProps.statuses,
        language: nextProps.i18n.language,
        isSuccess: nextProps.isSuccess,
        personSettings: nextProps.settings
          ? nextProps.settings.visitorSettings
          : {},
      };
    } else return null;
  }

  componentDidUpdate(prevProps, prevState) {
    const { language, statuses, successGetStatuses } = this.state;
    const { t } = this.props;
    if (
      successGetStatuses &&
      prevState.successGetStatuses !== successGetStatuses
    ) {
      let statusSuggestions = [];
      statuses &&
        statuses.data.map((status) =>
          statusSuggestions.push({
            value: status.id,
            label: t(camelize(status.name)),
          })
        );
      this.setState((prevState) => ({
        statusSuggestions,
        isLoadingStatus: false,
      }));
    }
    if (language !== prevState.language) {
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
    if (
      this.props.successCreateEvent &&
      prevProps.successCreateEvent !== this.props.successCreateEvent
    ) {
      SnackbarHandler.showMessage(t("successCreatePerson"));
      this.setState({
        isCreating: false,
        newEvent: formValues,
      });
      this.props.requestClearSuccessCreate();
      NavBarEasyAccess.appNavigation.history.replace("/register");
    }
  }

  loadStatus = () => {
    this.props.requestGetStatuses({
      start: 0,
      length: -1,
      order: "name asc",
      search: "",
    });
  };

  handleHostSelected = (employee) => {
    this.setState((prevState) => ({
      openDialogEmployees: false,
      newEvent: {
        ...prevState.newEvent,
        hostId: employee.id,
        host: employee,
      },
      formErrorsEvent: {
        ...prevState.formErrorsEvent,
        host: false,
      },
    }));
  };

  handleUnassignedHost = () => {
    this.setState((prevState) => ({
      ...prevState,
      newEvent: {
        ...prevState.newEvent,
        hostId: -1,
        host: undefined,
      },
    }));
  };

  deleteFile = () => {
    this.setState((prevState) => ({
      ...prevState,
      newPerson: {
        ...prevState.newPerson,
        file: undefined,
      },
    }));
  };

  handleOpenHost = () => {
    this.setState({
      openDialogEmployees: true,
    });
  };

  handleOpenImageModal = () => {
    this.setState({
      openImageModal: true,
    });
  };

  handleCloseImageModal = () => {
    if (!this.state.saveImage) {
      this.deleteFile();
    }
    this.setState({
      openImageModal: false,
    });
  };

  handleChangeDate = (name) => (event) => {
    let value = new Date(event);
    this.setState((prevState) => ({
      newEvent: {
        ...prevState.newEvent,
        [name]: value,
      },
    }));
  };

  handleOnFiles = (files) => {
    this.setState((prevState) => ({
      ...prevState,
      newPerson: {
        ...prevState.newPerson,

        file: files[0],
      },
    }));
  };

  handleChange = (name) => (event) => {
    let value = event.currentTarget ? event.currentTarget.value : event.value;

    this.setState((prevState) => ({
      newEvent: {
        ...prevState.newEvent,
        [name]: value,
      },
      formErrors: {
        ...prevState.formErrors,
        [name]: false,
      },
    }));
  };

  // handleChangeDuration = event  => {
  //   let value = event.currentTarget ? event.currentTarget.value : event.value;
  //   const hours = value.split(":")[0]
  //   const monutes = value.split(":")[1]
  // }

  openCamera = () => {
    this.setState((prevState) => ({
      ...prevState,
      openDialogCamera: true,
      cameraLoader: true,
      height: 0,
      width: 0,
    }));
  };

  handleChangePerson = (name) => (event) => {
    let value = event.currentTarget ? event.currentTarget.value : event.value;
    this.setState((prevState) => ({
      newPerson: {
        ...prevState.newPerson,
        [name]: value,
      },
      formErrors: {
        ...prevState.formErrors,
        [name]: false,
      },
    }));
  };

  handleEnterpriseSelected = (enterprise) => {
    const { id, name } = enterprise;
    this.setState((prevState) => ({
      newPerson: {
        ...prevState.newPerson,
        originCompanyId: id,
        originCompanyName: name,
        originCompany: { id, name },
      },
    }));
  };

  validateCreateEvent = () => {
    const { newEvent } = this.state;
    let people = !newEvent.people || newEvent.people.length === 0;
    let host = isNullOrUndefined(newEvent.host);
    let startDate = isNullOrUndefined(newEvent.startDate);
    let duration = isNullOrUndefined(newEvent.duration);
    return {
      people,
      host,
      startDate,
      duration,
    };
  };

  validateCreatePerson = () => {
    const { newPerson } = this.state;
    let personSettings = this.state.personSettings;

    let name = personSettings.name ? isValueEmptyOrNull(newPerson.name) : false;
    let lastname = personSettings.lastName
      ? isValueEmptyOrNull(newPerson.lastname)
      : false;
    let document = personSettings.dni
      ? isValueEmptyOrNull(newPerson.document)
      : false;
    let originEnterprise = personSettings.enterprise
      ? isValueEmptyOrNull(newPerson.originCompanyId)
      : false;
    let phone = personSettings.phone
      ? isValueEmptyOrNull(newPerson.phone)
      : false;
    let email =
      personSettings.email !== null && personSettings.email
        ? !isEmailValid(newPerson.email)
        : false;
    return {
      name: name,
      lastname: lastname,
      document: document,
      originEnterprise: originEnterprise,
      type: isValueEmptyOrNull(newPerson.type),
      status:
        newPerson.status === -1 ? true : isValueEmptyOrNull(newPerson.status),
      phone: phone,
      email: email,
    };
  };

  addPerson = () => {
    const { t } = this.props;
    const errors = this.validateCreatePerson();
    this.setState({
      formErrorsPerson: errors,
    });

    if (!Object.keys(errors).some((x) => errors[x])) {
      let people = this.state.newEvent.people.slice();
      let documents = this.state.documentList.slice();

      if (!isValueEmptyOrNull(this.state.newPerson.document)) {
        if (
          documents.indexOf(this.state.newPerson.document.toString()) === -1
        ) {
          people.push(this.state.newPerson);
          documents.push(this.state.newPerson.document.toString());
        } else {
          SnackbarHandler.showMessage(
            this.props.t("DocumentAlreadyExists"),
            "error"
          );
          return;
        }
      } else {
        people.push(this.state.newPerson);
      }
      this.setState((prevState) => ({
        newEvent: {
          ...prevState.newEvent,
          people: people,
        },
        newPerson: formPersonValues,
        documentList: documents,
      }));
    } else {
      SnackbarHandler.showMessage(t("inputIncomplete"), "error");
    }
  };

  addPersonList = (personList) => {
    const { t } = this.props;
    let people = this.state.newEvent.people.slice();
    let documents = this.state.documentList.slice();
    personList.map((person) => {
      if (!isNullOrUndefined(person.document)) {
        if (documents.indexOf(person.document.toString()) === -1) {
          people.push(person);
          documents.push(person.document.toString());
        }
      } else {
        people.push(person);
      }
    });
    this.setState((prevState) => ({
      newEvent: {
        ...prevState.newEvent,
        people: people,
      },
      documentList: documents,
    }));
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
            fontSize: 150,
            color: theme.palette.text.main,
          }}
        />
      );
    }
  }

  setRef = (webcam) => {
    this.webcam = webcam;
  };

  capture = () => {
    const imageSrc = this.webcam.getScreenshot();
    fetch(imageSrc)
      .then((res) => res.blob())
      .then((blob) => {
        const file = new File([blob], "screenshot", { type: "image/png" });
        Object.assign(file, {
          preview: typeof file === "string" ? file : URL.createObjectURL(file),
        });
        this.setState((prevState) => ({
          ...prevState,
          newPerson: {
            ...prevState.newPerson,
            file: file,
          },
          openDialogCamera: false,
        }));
      });
  };

  saveImage = () => {
    this.setState({
      saveImage: true,
      openImageModal: false,
    });
  };

  setFile() {
    if (isValueEmptyOrNull(this.state.newPerson.file)) {
      return undefined;
    } else {
      let fileToSend = [];
      fileToSend.push(this.state.newPerson.file);
      return fileToSend;
    }
  }

  calculateEndDate() {
    let time = this.state.newEvent.startDate;
    if (this.state.newEvent.durationHours) {
      time.setHours(time.getHours() + this.state.newEvent.durationHours);
    }
    if (this.state.newEvent.durationMinutes) {
      time.setMinutes(time.getMinutes() + this.state.newEvent.durationMinutes);
    }
    let endDate = time;
    return endDate;
  }

  confirm = () => {
    let newEvent = { ...this.state.newEvent };
    const { t } = this.props;
    const errors = this.validateCreateEvent();
    this.setState({
      formErrorsEvent: errors,
    });

    if (!Object.keys(errors).some((x) => errors[x])) {
      newEvent.CompanyToVisit = newEvent.host.originEnterprise;
      let newDate = moment(newEvent.startDate);
      newDate.add(newEvent.duration, "minutes");
      newEvent.endDate = newDate;
      newEvent.host = newEvent.host.id;
      this.setState({
        isCreating: true,
      });
      this.props.requestCreateVisitorGroup(newEvent);
      setTimeout(() => {
        this.setState({
          isSuccess: false,
        });
      }, 1000);
    } else {
      SnackbarHandler.showMessage(t("inputIncomplete"), "error");
    }
  };

  render() {
    const { classes, isDialog, t, theme } = this.props;
    const {
      openDialogEmployees,
      newEvent,
      openDialogCamera,
      durationSuggestions,
      durationSuggestionsMinutes,
      cameraLoader,
      statusSuggestions,
      isLoadingStatus,
      personSettings,
      newPerson,
    } = this.state;

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

    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData.default,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
    };
    const selectStyles = {
      control: (base) => ({
        ...base,
        height: 32,
        marginTop: 150,
      }),
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
        height: 30,
        marginTop: 2,
        width: "100%",
        menuList: {
          maxHeight: 100,
        },
      }),
    };
    const EntranceDateText = ({ value, onClick }) => (
      <TextField
        style={{ width: "100%" }}
        onClick={onClick}
        label={t("EventDate")}
        value={value}
        //required={!isNullOrUndefined(this.state.newPerson.ingressDate)}
      />
    );

    //Excel upload functions

    //End excel upload functions

    return (
      (<main className={!isDialog ? classes.layout : undefined}>
        <div className={!isDialog ? classes.fill : undefined}>
          {/* <LinearProgress
            style={{
              opacity: this.state.isCreating ? "1" : "0",
              width: "100%",
              background: "none",
              borderBottomLeftRadius: 50,
              borderBottomRightRadius: 50
            }}
            variant="query"
          /> */}
          <Paper elevation={!isDialog ? 2 : 0} className={classes.paper}>
            <Avatar className={classes.avatar}>
              <SupervisedUserCircleRoundedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              {t("NewEvent")}
            </Typography>
            <Divider
              style={{ width: "100%", marginTop: 10, marginBottom: 24 }}
            />
            <div
              style={{ alignSelf: "start", marginLeft: "40px", width: "90%" }}
            >
              <Typography
                component="h2"
                variant="h4"
                style={{ paddingBottom: "20px", fontSize: "20pt" }}
              >
                {t("GeneralInformation")}
              </Typography>
              <Grid container spacing={24}>
                <Grid
                  item
                  xs={12}
                  md={12}
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Typography component="h1" variant="subtitle1">
                    {t("Host") + ": "}
                  </Typography>
                  <Typography
                    className={
                      this.state.formErrorsEvent.host ? classes.withError : ""
                    }
                    style={{ padding: "0 10px 0 10px" }}
                  >
                    {newEvent.host && newEvent.hostIdS !== -1
                      ? newEvent.host.name
                      : t("SelectHost")}
                  </Typography>
                  {newEvent.host && newEvent.hostId !== -1 ? (
                    <IconButton
                      className={classes.smallIconButton}
                      onClick={() => this.handleUnassignedHost()}
                      size="large">
                      <DeleteIcon />
                    </IconButton>
                  ) : (
                    ""
                  )}
                  <Fab
                    size="small"
                    className={classes.smallButton}
                    onClick={this.handleOpenHost}
                    style={{ minWidth: 40 }}
                  >
                    <PlusIcon />
                  </Fab>
                </Grid>
                <Grid container item xs={12} md={6} style={{ paddingTop: 0 }}>
                  <Grid item xs={12} md={6}>
                    <DatePicker
                      selected={new Date(newEvent.startDate)}
                      onChange={this.handleChangeDate("startDate")}
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
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={6}
                    style={{ display: "flex", flexDirection: "column" }}
                    className={classes.customSelectStyles}
                  >
                    <InputLabel
                      filled={true}
                      shrink={true}
                      animated={true}
                      className={
                        this.state.formErrorsEvent.duration
                          ? classes.withError
                          : ""
                      }
                      htmlFor="standard-adornment-password"
                    >
                      {`${t("Duration")} ( ${t("hs")} )`}
                    </InputLabel>
                    <Select
                      classes={classes}
                      styles={selectStyles}
                      options={durationSuggestions}
                      components={components}
                      value={
                        durationSuggestions &&
                        durationSuggestions.map((option) =>
                          option.value === newEvent.duration ? option : ""
                        )
                      }
                      onChange={this.handleChange("duration")}
                      placeholder={t("Duration")}
                      maxMenuHeight={200}
                      height={32}
                      // isLoading={isLoadingTypes}
                      // isDisabled={isLoadingTypes}
                    />
                  </Grid>
                </Grid>
              </Grid>

              <DataTableDialogAction
                open={openDialogEmployees}
                onConfirm={this.handleHostSelected}
                onClose={() => this.setState({ openDialogEmployees: false })}
                // extraData={
                // newPerson.visitEnterprise !== undefined
                // ? [newPerson.visitEnterprise.id]
                //: undefined
                // }
                extraData1={true}
                extraData2={true}
                extraObject={{ completeData: true }}
                mdSubtitle={4}
                info={this.props.employees}
                success={this.props.successEmployees}
                loading={this.props.loadingEmp}
                title={t("Host")}
                //subTitle={t("SelectHost")}
                loadDataAction={this.props.requestEmployees}
                rowsSelected={
                  !isNullOrUndefined(newEvent.host) ? [newEvent.host] : []
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
                  {
                    name: t("Email"),
                    field: "email",
                    options: {
                      sort: true,
                    },
                  },
                  {
                    name: t("enterprise"),
                    field: "originEnterpriseName",
                    options: {
                      sort: true,
                    },
                  },
                ]}
              />
            </div>

            <div
              style={{
                alignSelf: "start",
                marginLeft: "40px",
                width: "90%",
                marginTop: "60px",
              }}
            >
              <Typography
                component="h2"
                variant="h4"
                style={{ paddingBottom: "20px", fontSize: "20pt" }}
              >
                {t("AddGuest")}
              </Typography>
              <Grid container spacing={24}>
                <ExcelUploadComponent
                  addPersonsList={this.addPersonList}
                  personList={this.state.newEvent.people}
                  downloadPeopleWithErrors={
                    this.props.requestGetXLSWithVisitorGroup
                  }
                  downloadExcelTemplate={
                    this.props.requestDownloadExcelTemplate
                  }
                />
                <Grid item xs={12} md={6} className={classes.grid}>
                  <TextField
                    required={personSettings.name}
                    label={t("name")}
                    onChange={this.handleChangePerson("name")}
                    value={newPerson.name}
                    fullWidth
                    helperText={t("inputEmpty")}
                    FormHelperTextProps={{
                      style: {
                        opacity: this.state.formErrorsPerson.name ? 1 : 0,
                      },
                    }}
                    error={this.state.formErrorsPerson.name}
                  />
                </Grid>
                <Grid item xs={12} md={6} className={classes.grid}>
                  <TextField
                    required={personSettings.lastName}
                    label={t("LastName")}
                    fullWidth
                    onChange={this.handleChangePerson("lastname")}
                    value={newPerson.lastname}
                    helperText={t("inputEmpty")}
                    FormHelperTextProps={{
                      style: {
                        opacity: this.state.formErrorsPerson.lastname ? 1 : 0,
                      },
                    }}
                    error={this.state.formErrorsPerson.lastname}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={24}>
                <Grid item xs={12} md={6} className={classes.grid}>
                  <TextField
                    required={personSettings.dni}
                    type="text"
                    label={t("dni")}
                    fullWidth
                    onChange={this.handleChangePerson("document")}
                    value={newPerson.document}
                    helperText={t("inputEmpty")}
                    FormHelperTextProps={{
                      style: {
                        opacity: this.state.formErrorsPerson.document ? 1 : 0,
                      },
                    }}
                    error={this.state.formErrorsPerson.document}
                  />
                </Grid>
                <Grid item xs={12} md={6} className={classes.grid}>
                  <TextField
                    required={personSettings.email}
                    type="email"
                    label={t("email")}
                    fullWidth
                    onChange={this.handleChangePerson("email")}
                    value={newPerson.email}
                    helperText={t("invalidEmail")}
                    FormHelperTextProps={{
                      style: { opacity: this.state.formErrors.email ? 1 : 0 },
                    }}
                    error={this.state.formErrorsPerson.email}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={24}>
                <Grid item xs={12} md={6} className={classes.grid}>
                  <div
                    className={classes.formControl}
                    style={{ marginTop: "15px" }}
                  >
                    <label className={classes.formControlLabel}>
                      {t("PersonStatus")}
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
                          isNullOrUndefined(newPerson.statusId)
                            ? statusSuggestions[0]
                            : option.value === newPerson.statusId
                            ? option
                            : ""
                        )
                      }
                      onChange={this.handleChangePerson("statusId")}
                      placeholder={t("status")}
                      maxMenuHeight={200}
                      isLoading={isLoadingStatus}
                      isDisabled={isLoadingStatus}
                      noOptionsMessage={() => t("NoInformation")}
                    />
                  </div>
                </Grid>
                <Grid item xs={12} md={6} className={classes.grid}>
                  <TextField
                    required={personSettings.phone}
                    style={{ marginTop: 15 }}
                    type="number"
                    label={t("Phone")}
                    fullWidth
                    onChange={this.handleChangePerson("phone")}
                    value={newPerson.phone}
                    helperText={t("inputEmpty")}
                    FormHelperTextProps={{
                      style: {
                        opacity: this.state.formErrorsPerson.phone ? 1 : 0,
                      },
                    }}
                    error={this.state.formErrorsPerson.phone}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <DataTableSelectAction
                    handleConfirm={(enterprise) =>
                      this.handleEnterpriseSelected(enterprise)
                    }
                    loadDataAction={this.props.requestEnterprises}
                    element={this.state.newPerson.originCompany}
                    primaryTitle={t("originEnterprise")}
                    title={t("originEnterprise")}
                    DataTableColumns={enterpriseColumns}
                    multipleSelect={false}
                    attribute={"name"}
                    isDetails={this.props.isDetails}
                    info={this.props.enterprises}
                    success={this.props.successEnterprise}
                    loading={this.props.loadingEnterprises}
                    hasError={this.state.formErrorsPerson.originEnterprise}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <Typography type="body2" style={{ marginBottom: 10 }}>
                      {t("AddImage")}
                    </Typography>
                    {/* 
                    <Fab
                      size="small"
                      className={classes.customFab}
                      onClick={this.handleOpenImageModal}
                      style={{ minWidth: 40, marginLeft: "10px" }}
                    >
                      <AddPhotoAlternateIcon />
                    </Fab> */}
                    {!this.state.isLoadingImg && (
                      <div style={{ height: 100 }}>
                        <DropFile
                          dropzoneText={t("DragOrClickImage")}
                          multiple={false}
                          accept="image/*"
                          onFiles={this.handleOnFiles}
                          local={false}
                          defaultImage={this.setImageDefault()}
                          files={this.setFile()}
                          noRevokeURL={true}
                        />
                      </div>
                    )}
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        flexWrap: "nowrap",
                      }}
                    >
                      <Button
                        onClick={this.openCamera}
                        style={{
                          color: theme.palette.text.main,
                          margin: "5px 12px 0 0",
                          width: "50%",
                        }}
                      >
                        <IconCamera
                          style={{
                            marginRight: 5,
                            color: theme.palette.text.main,
                          }}
                        />
                        {t("UseCamera")}
                      </Button>
                      <Button
                        onClick={this.deleteFile}
                        style={{
                          color: theme.palette.text.main,
                          marginTop: 5,
                          width: "50%",
                        }}
                      >
                        {t("DeletePhoto")}
                      </Button>
                    </div>
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    className={classes.buttonAdd}
                    // fullWidth
                    variant="contained"
                    color="primary"
                    // disabled={isNullOrUndefined(this.state.newPerson.file)}
                    onClick={() => this.addPerson()}
                    // style={{
                    //   background: this.state.isSuccess ? green[500] : undefined,
                    //   color: "white"
                    // }}
                  >
                    {t("AddPerson")}
                  </Button>
                </Grid>
                <Typography
                  component="h1"
                  variant="h4"
                  style={{
                    paddingLeft: "12px",
                    marginTop: 60,
                    paddingBottom: 5,
                    fontSize: "20pt",
                  }}
                >
                  {t("GuestList").toUpperCase()}
                </Typography>
                <Grid item xs={12}>
                  <EventPersonList
                    data={this.state.newEvent.people}
                    dataCount={this.state.newEvent.people.length}
                  />
                </Grid>
                <Grid item xs={12} style={{ paddingTop: 0 }}>
                  <div
                    className={classes.submit}
                    style={{
                      position: "relative",
                      width: "100%",
                      margin: 0,
                    }}
                  >
                    <Button
                      fullWidth
                      variant="contained"
                      disabled={this.state.isCreating}
                      onClick={this.confirm}
                      style={{
                        background: this.state.isSuccess
                          ? green[500]
                          : theme.palette.primary.main,
                        color: theme.palette.text.main,
                      }}
                    >
                      {this.state.isSuccess
                        ? t("successCreate")
                        : t("CreateEvent")}
                    </Button>
                    {this.state.isCreating && (
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
                </Grid>
              </Grid>
            </div>
          </Paper>
          <Dialog
            open={openDialogCamera}
            TransitionComponent={Transition}
            onClose={() => this.setState({ openDialogCamera: false })}
            maxWidth="md"
            scroll="paper"
          >
            <main>
              <div>
                <Paper
                  elevation={0}
                  className={classes.paper}
                  style={{ marginBottom: 0, padding: "35px" }}
                >
                  <Avatar className={classes.avatar}>
                    <IconCamera />
                  </Avatar>
                  <Typography component="h1" variant="h5">
                    {t("TakePhoto")}
                  </Typography>
                  {cameraLoader && (
                    <div
                      style={{
                        height: 550,
                        width: 550,
                        marginTop: "20%",
                      }}
                    >
                      <Lottie
                        options={defaultOptions}
                        height={250}
                        width={250}
                        ref={(animation) => (this.animation = animation)}
                        isStopped={!cameraLoader}
                      />
                      <Typography
                        style={{
                          marginTop: "8px",
                          fontSize: 19,
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        {`${t("Conecting")}...`}
                      </Typography>
                      <Typography
                        style={{
                          fontSize: 19,
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        {t("VerifyThatTheCameraIsConnectedToTheComputer")}
                      </Typography>
                    </div>
                  )}

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
                    onUserMediaError={() => console.log("not found")}
                    height={this.state.height}
                    ref={this.setRef}
                    screenshotFormat="image/jpeg"
                    width={this.state.width}
                    //videoConstraints={videoConstraints}
                  />

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

const mapStateToProps = ({ Persons, Enterprise, Status, Settings }) => {
  return {
    successCreateEvent: Persons.successCreateEvent,
    employees: Persons.employees,
    successEmployees: Persons.successEmployees,
    loadingEmp: Persons.loadingEmp,
    enterprises: Enterprise.enterprises,
    successEnterprise: Enterprise.successEnterprise,
    loadingEnterprises: Enterprise.loading,
    successGetStatuses: Status.successGetStatuses,
    statuses: Status.statuses,
    settings: Settings.settings,
    isCreating: Persons.isCreating,
  };
};

const mapDispatchToProps = {
  requestEmployees: requestEmployees,
  requestEnterprises: requestEnterprises,
  requestGetStatuses: requestGetStatuses,
  requestCreateVisitorGroup,
  requestCheckDocumentNumbers,
  requestGetXLSWithVisitorGroup,
  requestDownloadExcelTemplate,
  requestClearSuccessCreate,
};

NewVisitorsEvent.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

const NewVisitorsEventConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(NewVisitorsEvent);

export default withTranslation()(
  withStyles(styles, { withTheme: true })(NewVisitorsEventConnected)
);
