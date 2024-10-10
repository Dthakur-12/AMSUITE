import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withStyles } from '@mui/styles';
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import { withTranslation } from "react-i18next";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { isNullOrUndefined } from "util";
import { List, Dialog, Slide, FormHelperText } from "@mui/material";
import Fab from "@mui/material/Fab";
import PlusIcon from "@mui/icons-material/AddRounded";
import IconButton from "@mui/material/IconButton";
import classnames from "classnames";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import ChevronIcon from "@mui/icons-material/ChevronRightRounded";
import DataTableDialogAction from "../../../Shared/DataTable/DataTableDialogAction";
import DataTableSelectAction from "../../../Shared/DataTable/DataTableSelectAction";
import { requestPersons } from "../../../../actions/EasyAccess/Person_actions";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import ErrorIcon from "@mui/icons-material/Error";
import CloseIcon from "@mui/icons-material/Close";
import { green } from "@mui/material/colors";
import Snackbar from "@mui/material/Snackbar";
import SnackbarContent from "@mui/material/SnackbarContent";
import ApiHandler from "../../../../services/ApiHandler";
import Select from "react-select";
import components from "../../../Shared/ReactSelect";
import PersonIcon from "@mui/icons-material/PersonRounded";
import Avatar from "@mui/material/Avatar";
import DropFile from "../../../Shared/DropFile";
import AccountCircle from "@mui/icons-material/PortraitRounded";
import CircularProgress from "@mui/material/CircularProgress";
import DataTableDialog from "../../../Shared/DataTable/DataTableDialog";
import DeleteIcon from "@mui/icons-material/DeleteRounded";
import { isValueEmptyOrNull } from "../../../../utils/HelperFunctions";
import Webcam from "react-webcam";
import IconCamera from "@mui/icons-material/CameraAlt";
import * as animationData from "../../../../assets/loaderCamera.json";
import * as animationSendData from "../../../../assets/sendFormVisit.json";
import * as animationErrorData from "../../../../assets/errorFormVisit.json";
import Lottie from "react-lottie";
// import { withRouter } from "react-router-dom";
import withRouter from "../../../AccessControl/Components/withRouter";
import styles from "../../../../assets/styles/EasyAccess_styles/Register_styles/autoRegisterStyles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import ReactHtmlParser from "react-html-parser";
import CustomForm from "../../../Shared/Form/CustomForm";

function Transition(props) {
  return <Slide direction="down" {...props} />;
}

const mapStateToProps = ({ User, Settings, Persons }) => {
  return {
    currentUser: User.currentUser,
    settings: Settings.settings,
    isCreating: Persons.successCreate,
    isError: Persons.error,
  };
};

const variantIcon = {
  error: ErrorIcon,
};

function MySnackbarContentWrapper(props) {
  const { className, message, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];
  return (
    (<SnackbarContent
      style={{ backgroundColor: "red" }}
      aria-describedby="client-snackbar"
      message={
        <span
          id="client-snackbar"
          style={{ display: "flex", alignItems: "center" }}
        >
          <Icon style={{ fontSize: 20, opacity: 0.9 }} />
          {message}
        </span>
      }
      action={[
        <IconButton
          key="close"
          aria-label="close"
          color="inherit"
          onClick={onClose}
          size="large">
          <CloseIcon style={{ fontSize: 20 }} />
        </IconButton>,
      ]}
    />)
  );
}

let page = 0;
let rowsPerPage = 20;
let activeColumnSort = 0;
let order = "asc";

class AutoRegister extends Component {
  constructor(props) {
    super(props);
    const { initValues, currentUser, t } = props;
    this.state = {
      url: undefined,
      openDialogCamera: false,
      isSuccess: false,
      isErrorModal: false,
      openTermsAndCondition: false,
      activeStep: 0,
      steps: [
        { name: t("Document"), step: 0 },
        { name: t("PersonInformation"), step: 1 },
      ],
    };
  }

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
    const idCompanies = this.state.originCompanies
      .filter((oc) => oc !== -1)
      .map((oc) => oc.id);
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
  loadFilerPerson = () => {
    const { initValues } = this.props;
    if (initValues) {
      const contractor = [initValues.contractorCompany.id];
      const hired = initValues.hiredCompany ? [initValues.hiredCompany.id] : [];
      const filer = hired.concat(contractor);
      return filer;
    } else {
      return [-1, -1];
    }
  };
  changedisableBadges = () => {
    this.setState((prevState) => ({
      newControl: {
        ...prevState.newControl,
        disableBadges: !prevState.newControl.disableBadges,
      },
    }));
  };

  handleClose = (event, reason) => {
    this.setState({ open: false });
  };

  handleOnFiles = (files) => {
    const { handleChange } = this.props;
    handleChange("photo")({ value: files[0] });
    this.setState({
      file: files[0],
    });
  };

  setImageDefault() {
    const { theme } = this.props;
    return (
      <AccountCircle
        style={{
          fontSize: 150,
          color: theme.palette.text.main,
        }}
      />
    );
  }

  setFile() {
    if (isValueEmptyOrNull(this.state.file)) {
      if (isValueEmptyOrNull(this.state.url)) {
        if (isValueEmptyOrNull(this.props.newPerson.photo)) {
          return undefined;
        } else
          return [
            { preview: "data:image/jpeg;base64," + this.props.newPerson.photo },
          ];
      } else {
        return [{ preview: "data:image/jpeg;base64," + this.state.url }];
      }
    } else {
      return [{ preview: this.state.file.preview }];
    }
  }

  deleteFile = () => {
    this.props.handleChange("photo")({ value: undefined });
    this.setState({
      url: undefined,
      file: undefined,
    });
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.isCreating !== prevState.isCreating ||
      nextProps.isError !== prevState.isError ||
      nextProps.newPerson !== prevState.newPerson ||
      nextProps.personAnonymous !== prevState.personAnonymous ||
      nextProps.successPersonAnonymous !== prevState.successPersonAnonymous
    ) {
      return {
        personAnonymous: nextProps.personAnonymous,
        successPersonAnonymous: nextProps.successPersonAnonymous,
        newPerson: nextProps.newPerson,
        isCreating: nextProps.isCreating,
        isError: nextProps.isError,
      };
    } else return null;
  }

  componentDidUpdate(prevProps, prevState) {
    const { setError } = this.props;
    const { personAnonymous, successPersonAnonymous } = this.state;
    if (
      successPersonAnonymous !== prevState.successPersonAnonymous &&
      successPersonAnonymous === true
    ) {
      if (isValueEmptyOrNull(personAnonymous)) {
        this.setState({
          activeStep: 1,
        });
      } else {
        if (personAnonymous.discriminator === 0) {
          const disablesVisit = this.props.t("DisabledVisit");
          this.setState({
            isErrorModal: true,
            open: true,
            msjError: disablesVisit,
          });
        }
        if (personAnonymous.discriminator === 1) {
          this.setState({
            activeStep: 1,
          });
        }
      }
    }
    if (
      this.state.isCreating &&
      prevState.isCreating !== this.state.isCreating
    ) {
      this.setState({ isSuccess: true, isLoading: false });
      this.deleteFile();
    }
    if (this.state.isError && prevState.isError !== this.state.isError) {
      this.setState({
        isSuccess: false,
        isLoading: false,
        isErrorModal: true,
      });

      setError();
    }
  }

  handleOpenDocument = () => {
    this.setState({
      openDialogDocument: true,
    });
  };

  handleOpenPerson = () => {
    this.setState({
      openDialogPerson: true,
    });
  };

  getHighestID = () => {
    const { isEdit } = this.props;
    if (!isEdit) {
      this.props.requestHighestControlId();
    }
  };

  setRef = (webcam) => {
    this.webcam = webcam;
  };

  dataURItoBlob = (dataURI) => {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(",")[0].indexOf("base64") >= 0)
      byteString = atob(dataURI.split(",")[1]);
    else byteString = unescape(dataURI.split(",")[1]);
    // separate out the mime component
    var mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ia], { type: mimeString });
  };

  capture = () => {
    const imageSrc = this.webcam.getScreenshot();
    const blob = this.dataURItoBlob(imageSrc);
    const url = imageSrc.split(",");
    this.props.handleChange("photo")({ value: blob });
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

  create = () => {
    const { handleCreate } = this.props;
    // const { handleChangeTerms } = this.props;
    // handleChangeTerms(this.state.termsAndCondition);
    this.setState((prevState) => ({
      openTermsAndCondition: false,
    }));
    handleCreate();
  };

  handleAcept = () => {
    const { handleChangeTerms } = this.props;
    handleChangeTerms(this.state.termsAndCondition);
    this.setState((prevState) => ({
      openTermsAndCondition: false,
    }));
  };

  handleChangeStep1 = () => {
    const { handleEntryDocument } = this.props;
    if (
      this.state.newPerson &&
      !isValueEmptyOrNull(this.state.newPerson.document)
    ) {
      handleEntryDocument(this.state.newPerson.document);
    }
  };

  handleChangeStep = (step) => {
    if (step == 1) {
      this.handleChangeStep1();
    } else {
      this.setState({
        activeStep: step,
      });
    }
  };

  back = () => {
    const { isLogoutFunction, history,navigate } = this.props;
    isLogoutFunction();
    navigate("/login");
  };

  handleChangeTermsAndCondition = () => {
    this.setState((prevState) => ({
      termsAndCondition: !prevState.termsAndCondition,
    }));
  };

  handleOpenTermsAndCondition = () => {
    this.setState((prevState) => ({
      openTermsAndCondition: !prevState.openTermsAndCondition,
    }));
  };

  EntryDocument = () => {
    const {
      isDialog,
      personSettings,
      classes,
      t,
      handleChange,
      newPerson,
      formErrors,
      theme,
    } = this.props;

    return (
      <Paper elevation={!isDialog ? 2 : 0} className={classes.paper}>
        <Avatar className={classes.avatar}>
          <PersonIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {t("NewVisitor")}
        </Typography>
        <Divider style={{ width: "100%", marginTop: 10, marginBottom: 24 }} />
        <Grid item xs={12} md={6} className={classes.grid}>
          <TextField
            required={true}
            type="text"
            label={t("dni")}
            fullWidth
            onChange={handleChange("document")}
            value={newPerson.document}
            helperText={t("inputEmpty")}
            FormHelperTextProps={{
              style: { opacity: formErrors.document ? 1 : 0 },
            }}
            error={formErrors.document}
          />
        </Grid>

        <div className={classes.submit}>
          <Button
            variant="contained"
            onClick={this.back}
            color="primary"
            style={{
              //background: this.state.isSuccess ? green[500] : undefined,
              color: theme.palette.primary.main,
              margin: "0px 0px 0px 20px",
              backgroundColor: theme.palette.text.main,
              marginRight: 20,
            }}
          >
            {t("Back")}
          </Button>
          <Button
            variant="contained"
            color="primary"
            disabled={
              this.state.newPerson
                ? isValueEmptyOrNull(this.state.newPerson.document)
                : true
            }
            onClick={() => this.handleChangeStep(1)}
            style={{
              color: theme.palette.text.main,
            }}
          >
            {`${t("Next")}`}
          </Button>
        </div>
      </Paper>
    );
  };

  PersonInformation = () => {
    const {
      isDialog,
      classes,
      t,
      personSettings,

      handleOpenEmployees,
      handleSelectEnterpriseVisit,
      handleUnassignedHost,
      enterpriseVisitUndefined,
      handleChange,
      formErrors,
      theme,
      enterpriseSuggestions,
      isLoadingEnterprises,
      enterpriseHostSuggestions,
      personGroupsSuggestions,
      openDialogEmployees,
      handleEmployeeSelected,
      termsAndConditions,
      cameraLoader,
      customFields,
      customFieldsErrors,
      handlePersonGroupChange,
      personGroupSettings = {},
    } = this.props;
    const {
      isLoading,
      isSuccess,
      termsAndCondition,
      newPerson,
      openTermsAndCondition,
    } = this.state;

    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData.default,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
    };

    const selectStyles = {
      container: (base) => ({
        ...base,
        width: "100%",
        maxWidth: 180,
      }),
      input: (base) => ({
        ...base,
        color: theme.palette.text.main,
        "& input": {
          font: "inherit",
        },
        width: "100%",
        menuList: {
          maxHeight: 100,
        },
      }),
    };
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
    return (
      (<div>
        <main className={!isDialog ? classes.layout : undefined}>
          <div className={!isDialog ? classes.fill : undefined}>
            <LinearProgress
              style={{
                opacity: isLoading ? "1" : "0",
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
                {t("NewVisitorInformation")}
              </Typography>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  width: "400px",
                }}
              >
                <div
                  style={{
                    width: "160px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                  }}
                >
                  <Typography>{t("AssignPersonToGroup")}</Typography>
                  <Select
                    classes={classes}
                    styles={selectStyles}
                    style={{ width: "100%" }}
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
                    onChange={handlePersonGroupChange("personGroups")}
                    placeholder={t("PersonGroups")}
                    maxMenuHeight={210}
                    // isLoading={isLoadingTypes}
                    // isDisabled={isLoadingTypes}
                  />
                </div>
              </div>
              <Divider
                style={{ width: "100%", marginTop: 10, marginBottom: 24 }}
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
                  className={classes.grid}
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
                        this.props.handleEnterpriseSelected(
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
                      info={this.props.enterprisesHost}
                      success={this.props.successEnterprise}
                      loading={this.props.loadingEnterprises}
                      hasError={formErrors.originEnterprise}
                    />
                  </Grid>

                  <Grid
                    item
                    xs={12}
                    md={12}
                    hidden={
                      isNullOrUndefined(personSettings.empVis) &&
                      isNullOrUndefined(personGroupSettings.visitEnterprise)
                    }
                  >
                    <DataTableSelectAction
                      handleConfirm={(enterprise) =>
                        this.props.handleEnterpriseSelected(
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
                      info={this.props.enterprisesHost}
                      success={this.props.successEnterprise}
                      loading={this.props.loadingEnterprises}
                      extraObject={{
                        onlyHosts: true,
                        // withoutNA: true,
                        skipUserVisibilityCheck: true,
                      }}
                    />
                  </Grid>

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
                          style={{ minWidth: 40 }}
                          size="small"
                          className={classes.fab}
                          onClick={() =>
                            newPerson.visitEnterprise
                              ? handleOpenEmployees(true)
                              : handleSelectEnterpriseVisit(true)
                          }
                        >
                          <PlusIcon className={classes.fabIcon} />
                        </Fab>
                        <ListItemText
                          primary={
                            newPerson.employee && newPerson.employee.name
                              ? newPerson.employee.name
                                  .toUpperCase()
                                  .charAt(0) +
                                newPerson.employee.name.substring(
                                  1,
                                  newPerson.employee.name.length
                                ) +
                                " " +
                                newPerson.employee.lastname
                                  .toUpperCase()
                                  .charAt(0) +
                                newPerson.employee.lastname.substring(
                                  1,
                                  newPerson.employee.lastname.length
                                )
                              : newPerson.hostName !== ""
                              ? newPerson.hostName
                              : t("Unspecified")
                          }
                          //secondaryTypographyProps={{
                          //  style: { fontSize: "1rem" }
                          // }}
                          //secondary={
                          // newPerson.employee && newPerson.employee !== -1
                          //   ? newPerson.employee.lastname
                          //    : t("Unspecified")
                          //  }
                        />
                        {newPerson.employee && newPerson.employee !== -1 ? (
                          <IconButton
                            className={classes.iconButton}
                            onClick={handleUnassignedHost}
                            size="large">
                            <DeleteIcon />
                          </IconButton>
                        ) : (
                          ""
                        )}
                      </ListItem>
                    </List>
                    <FormHelperText
                      style={{
                        opacity: enterpriseVisitUndefined ? 1 : 0,
                        paddingLeft: "5%",
                      }}
                      error={enterpriseVisitUndefined}
                    >
                      {"Seleccionar empresa a visitar"}
                    </FormHelperText>
                  </Grid>
                </Grid>

                <Grid container item xs={12} md={8} spacing={24}>
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
                      onChange={handleChange("name")}
                      value={newPerson.name}
                      fullWidth
                      helperText={t("inputEmpty")}
                      FormHelperTextProps={{
                        style: { opacity: formErrors.name ? 1 : 0 },
                      }}
                      error={formErrors.name}
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
                      onChange={handleChange("lastname")}
                      value={newPerson.lastname}
                      helperText={t("inputEmpty")}
                      FormHelperTextProps={{
                        style: { opacity: formErrors.lastname ? 1 : 0 },
                      }}
                      error={formErrors.lastname}
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
                      required={
                        personSettings.email || personGroupSettings.email
                      }
                      type="email"
                      label={t("email")}
                      fullWidth
                      onChange={handleChange("email")}
                      value={newPerson.email}
                      helperText={t("invalidEmail")}
                      FormHelperTextProps={{
                        style: { opacity: formErrors.email ? 1 : 0 },
                      }}
                      error={formErrors.email}
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
                      required={
                        personSettings.phone || personGroupSettings.phone
                      }
                      type="number"
                      label={t("Phone")}
                      fullWidth
                      onChange={handleChange("phone")}
                      value={newPerson.phone}
                      helperText={t("inputEmpty")}
                      FormHelperTextProps={{
                        style: { opacity: formErrors.phone ? 1 : 0 },
                      }}
                      error={formErrors.phone}
                    />
                  </Grid>
                  <CustomForm
                    customFields={customFields ? customFields.cardholders : []}
                    entity={2}
                    personGroups={this.state.newPerson.personGroups}
                    errors={customFieldsErrors}
                  />
                  <Grid
                    item
                    xs={12}
                    md={12}
                    style={{
                      height: 200,
                      width: "100%",
                      paddingBottom: 0,
                      display: "flex",
                      marginTop: 12,
                    }}
                  >
                    <DropFile
                      dropzoneText={t("DragOrClickImage")}
                      multiple={false}
                      accept="image/*"
                      onFiles={this.handleOnFiles}
                      local={false}
                      defaultImage={this.setImageDefault()}
                      files={this.setFile()}
                    />
                  </Grid>
                  <Grid item xs={12} md={12} style={{ paddingTop: 0 }}>
                    <Grid
                      item
                      xs={6}
                      md={6}
                      style={{
                        position: "absolute",
                        paddingTop: "0px",
                        paddingLeft: "0px",
                        paddingRight: "0px",
                        paddingBottom: "0px",
                      }}
                    >
                      <Button
                        onClick={this.openCamera}
                        style={{ color: theme.palette.text.main }}
                      >
                        <IconCamera style={{ marginRight: 5 }} />
                        {t("UseCamera")}
                      </Button>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      md={12}
                      style={{
                        width: "100%",
                        display: "flex",
                        marginRight: "12px",
                        paddingTop: "0px",
                        paddingLeft: "0px",
                        paddingRight: "0px",
                        paddingBottom: "0px",
                        justifyContent: "flex-end",
                      }}
                    >
                      <Button
                        onClick={this.deleteFile}
                        style={{ color: theme.palette.text.main }}
                      >
                        {t("DeletePhoto")}
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
                <Button
                  variant="contained"
                  //color="primary"
                  onClick={() => this.handleChangeStep(0)}
                  style={{
                    // color: "white",
                    marginLeft: 15,
                    backgroundColor: theme.palette.textSecondary.main,
                    color: theme.palette.background.main,
                    marginBottom: 18,
                  }}
                >
                  {`${t("Back")}`}
                </Button>
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
                  color="primary"
                  disabled={isLoading}
                  onClick={
                    termsAndConditions && termsAndConditions.value !== ""
                      ? this.handleOpenTermsAndCondition
                      : this.create
                  }
                  style={{
                    background: isSuccess ? green[500] : undefined,
                    color: theme.palette.text.main,
                  }}
                >
                  {isSuccess
                    ? t("Success")
                    : termsAndConditions && termsAndConditions.value !== ""
                    ? t("Continue")
                    : t("Save")}
                </Button>
                {isLoading && (
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
            {openDialogEmployees && (
              <DataTableDialog
                open={openDialogEmployees}
                onConfirm={handleEmployeeSelected}
                onClose={() => handleOpenEmployees(false)}
                extraData={
                  newPerson.visitEnterprise !== undefined
                    ? [newPerson.visitEnterprise.id]
                    : undefined
                }
                extraData1={true}
                extraData2={true}
                mdSubtitle={4}
                title={t("ResponsibleEmployee")}
                subTitle={t("SelectResponsibleEmployee")}
                loadDataFunction={
                  ApiHandler.EasyAccess.Persons.getRegistersAnonymous
                }
                rowsSelected={
                  !isNullOrUndefined(newPerson.employee)
                    ? [newPerson.employee]
                    : []
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
            )}

            <Dialog
              open={this.state.openDialogCamera}
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
                    {this.state.cameraLoader && (
                      <div style={{ height: 550, width: 550 }}>
                        <div style={{ marginTop: "20%" }}>
                          <Lottie
                            options={defaultOptions}
                            height={250}
                            width={250}
                            ref={(animation) => (this.animation = animation)}
                            isStopped={!this.state.cameraLoader}
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
                      onUserMediaError={() => console.log("userMediaError")}
                      ref={this.setRef}
                      screenshotFormat="image/jpeg"
                      height={this.state.height}
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
                        color: theme.palette.text.main,
                      }}
                    >
                      {t("CaptureImage")}
                    </Button>
                  </Paper>
                </div>
              </main>
            </Dialog>
            {termsAndConditions && termsAndConditions.value !== "" && (
              <Dialog
                fullScreen
                onClose={this.handleOpen}
                TransitionComponent={Transition}
                open={openTermsAndCondition}
                onBackdropClick={this.handleOpen}
                style={{ paddingRight: 0 }}
              >
                <AppBar
                  className={classes.appBar}
                  style={{ position: "inherit" }}
                >
                  <Toolbar>
                    {/* <IconButton
                    color="inherit"
                    onClick={this.handleOpen}
                    aria-label="Close"
                    className={classes.customButton}
                  >
                    <CloseIcon />
                  </IconButton> */}
                    <Typography
                      variant="h6"
                      color="inherit"
                      className={classes.flex}
                    >
                      {t("TermsAndConditions")}
                    </Typography>

                    <Button
                      style={{
                        display: "inherit",
                        position: "absolute",
                        right: "2%",
                      }}
                      disabled={!termsAndCondition}
                      color="primary"
                      variant="contained"
                      onClick={this.create}
                      className={classes.customButton}
                    >
                      {t("confirm")}
                    </Button>
                  </Toolbar>
                </AppBar>
                <Grid
                  item
                  xs={12}
                  md={12}
                  style={{
                    paddingLeft: "5%",
                    paddingRight: "5%",
                    paddingTop: "1%",
                  }}
                >
                  <div
                    style={{
                      height: "80vh",
                      color: theme.palette.text.main,
                      overflowY: "scroll",
                    }}
                  >
                    {termsAndConditions &&
                      ReactHtmlParser(termsAndConditions.value)}
                  </div>
                  <div
                    style={{
                      width: "100%",
                      justifyContent: "flex-end",
                      display: "flex",
                      color: theme.palette.text.main,
                      marginTop: "2%",
                    }}
                  >
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={termsAndCondition}
                          onChange={this.handleChangeTermsAndCondition}
                          value={t("AceptTermsAndConditions")}
                        />
                      }
                      label={t("AceptTermsAndConditions")}
                    />
                  </div>
                </Grid>
              </Dialog>
            )}
          </div>
        </main>
      </div>)
    );
  };

  render() {
    const { classes, theme, isDialog, t } = this.props;
    const { isErrorModal, isSuccess } = this.state;

    const defaultOptionsErrorSendData = {
      loop: false,
      autoplay: true,
      animationData: animationErrorData.default,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
    };
    const defaultOptionsSendData = {
      loop: false,
      autoplay: true,
      animationData: animationSendData.default,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
    };
    return (
      <main
        style={{ width: 600 }}
        className={!isDialog ? classes.layout : undefined}
      >
        <div className={!isDialog ? classes.fill : undefined}>
          <LinearProgress
            style={{
              opacity: this.state.isLoading ? "1" : "0",
              width: "100%",
              background: "none",
              borderBottomLeftRadius: 50,
              borderBottomRightRadius: 50,
            }}
            variant="query"
          />
          <Stepper
            alternativeLabel
            nonLinear
            activeStep={this.state.activeStep}
            style={{ backgroundColor: "transparent" }}
          >
            {this.state.steps.map((label, index) => {
              const stepProps = {};
              const buttonProps = {};
              return (
                <Step key={label.name} {...stepProps}>
                  <StepButton
                    disabled={
                      this.state.newPerson
                        ? isValueEmptyOrNull(this.state.newPerson.document)
                        : true
                    }
                    onClick={() => this.handleChangeStep(label.step)}
                    {...buttonProps}
                  >
                    {t(label.name)}
                  </StepButton>
                </Step>
              );
            })}
          </Stepper>
          {this.state.activeStep === 0
            ? this.EntryDocument()
            : this.PersonInformation()}
        </div>
        <Dialog
          open={isErrorModal}
          TransitionComponent={Transition}
          onClose={() => this.setState({ isErrorModal: false })}
          maxWidth="md"
          scroll="paper"
          style={{ backgroundColor: "transparent" }}
        >
          <Snackbar
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            open={this.state.open}
            autoHideDuration={6000}
            onClose={this.handleClose}
          >
            <MySnackbarContentWrapper
              variant="error"
              className={classes.margin}
              message={this.state.msjError}
            />
          </Snackbar>
          <Lottie
            options={defaultOptionsErrorSendData}
            height={250}
            width={250}
            ref={(animation) => (this.animationErrorSend = animation)}
            eventListeners={[
              {
                eventName: "complete",
                callback: () => this.setState({ isErrorModal: false }),
              },
            ]}
            isStopped={!isErrorModal}
          />{" "}
        </Dialog>
        <Dialog
          open={isSuccess}
          TransitionComponent={Transition}
          onClose={() => this.setState({ isSuccess: false })}
          maxWidth="md"
          scroll="paper"
          style={{ backgroundColor: "transparent" }}
        >
          <Lottie
            options={defaultOptionsSendData}
            height={250}
            width={250}
            ref={(animation) => (this.animationSend = animation)}
            eventListeners={[
              {
                eventName: "complete",
                callback: () =>
                  this.setState({
                    isSuccess: false,
                    activeStep: 0,
                    isLoading: false,
                    isCreating: false,
                  }),
              },
            ]}
            isStopped={!isSuccess}
          />
        </Dialog>
      </main>
    );
  }
}

AutoRegister.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

const AutoRegisterConnected = connect(mapStateToProps, null)(AutoRegister);

export default withTranslation()(
  withStyles(styles, { withTheme: true })(withRouter(AutoRegisterConnected))
);
