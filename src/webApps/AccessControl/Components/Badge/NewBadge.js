import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from '@mui/styles';
import NavBarAccessControl from "../../utils/NavBarAccessControl";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import { InlineDateTimePicker } from "@mui/x-date-pickers";
import Fade from "@mui/material/Fade";
import ApiHandler from "../../../../services/ApiHandler";
import Select from "react-select";
import components from "../../../Shared/ReactSelect";
import CardIcon from "@mui/icons-material/CreditCard";
import PlusIcon from "@mui/icons-material/AddRounded";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import green from "@mui/material/colors/green";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ChevronIcon from "@mui/icons-material/ChevronRightRounded";
import DataTableDialog from "../../../Shared/DataTable/DataTableDialog";
import LinearProgress from "@mui/material/LinearProgress";
import { List, ListItemIcon, FormHelperText } from "@mui/material";
import { isNullOrUndefined } from "util";
import { isValueEmptyOrNull } from "../../../../utils/HelperFunctions";
import SnackbarHandler from "../../../../utils/SnackbarHandler";
import Fab from "@mui/material/Fab";
import classnames from "classnames";
import { withTranslation } from "react-i18next";
import {
  createBadge,
  editBadge,
  getBadgeById,
  getBadgeStatus,
} from "../../../../actions/AccessControl/badge_actions";
import { reduxForm, Field } from "redux-form";
import styles from "../../../../assets/styles/AccessControl_styles/Badge_styles/newBadgeStyles";
import { connect } from "react-redux";
import DatePicker from "react-datepicker";
import DeleteIcon from "@mui/icons-material/DeleteRounded";
import CustomForm from "../../../Shared/Form/CustomForm";
import {
  clearFormStore,
  setInitValues,
  setInitDateValues,
} from "../../../../actions/Shared/custom_form_actions";
import { requestCustomFieldsTypeListValues } from "../../../../actions/Settings/settings_actions";
import { FieldTypes } from "../../../../utils/Enums";

const today = new Date();
const formBadge = {
  number: "",
  pin: "",
  badgeType: undefined,
  person: undefined,
  status: undefined,
  accessLevels: [],
  activationDate: new Date(),
  deactivationDate: new Date(today.setFullYear(today.getFullYear() + 5)),
};

class NewBadge extends Component {
  constructor(props) {
    super(props);
    const { initValues, isEdit, isDetails } = props;
    this.state = {
      isLoadingStatus: true,
      isLoadingTypes: true,
      openDialogPersons: false,
      openDialogAccessLevels: false,
      showAccessLevels: true,
      errorMessage: "",
      newBadge: initValues ? initValues : formBadge,
      formErrors: {},
      isLoadingNewData: isEdit || isDetails ? true : false,
    };
  }

  loadSelectsOptions = () => {
    const { customFields, requestCustomFieldsTypeListValues } = this.props;
    if (customFields && customFields.badges)
      customFields.badges.map((field) => {
        if (field.fieldType === FieldTypes.LIST) {
          requestCustomFieldsTypeListValues(field.id);
        }
      });
  };

  componentDidMount() {
    this.setState({
      isLoadingTypes: true,
      isLoadingStatus: true,
    });

    NavBarAccessControl.hideLoader();
    this.loadBadgeStatus();
    this.loadTypes();
    this.loadSelectsOptions();
    if (this.props.isEdit || this.props.isDetails) {
      this.setState({
        isLoadingNewData: true,
      });
      const { newBadge } = this.state;
      // this.props.getBadgeById(newBadge.id);
      this.props.setInitValues(this.props.initValues.customFields1);
      this.props.setInitDateValues(this.props.initValues.customFields2);
      ApiHandler.AccessControl.Badges.getBadgeById(newBadge.id)
        .then(({ data }) => {
          this.setState({
            newBadge: data,
            isLoadingNewData: false,
          });
        })
        .catch((err) => {
          this.setState({ isLoadingNewData: false });
          console.log(err);
        });
    }
  }
  componentWillUnmount() {
    this.props.clearFormStore();
  }

  // static getDerivedStateFromProps(props, state) {
  //   if (
  //     props.i18n.language !== state.language ||
  //     props.successGetById !== state.successGetById ||
  //     props.successCreatePanel !== state.successCreatePanel ||
  //     props.successEditPanel !== state.successEditPanel ||
  //     props.loadingBadgeTypes != state.loadingBadgeTypes ||
  //     props.loadingBadge != state.loadingBadge ||
  //     props.loadingBadgeStatus != state.loadingBadgeStatus ||
  //     props.isCreating != state.isCreating ||
  //     props.allBadgeStatus != state.allBadgeStatus ||
  //     props.badge != state.newBadge ||
  //     props.badgeStatus != state.badgeStatus
  //   ) {
  //     return {
  //       language: props.i18n.language,
  //       successGetById: props.successGetById,
  //       successCreatePanel: props.successCreatePanel,
  //       successEditPanel: props.successEditPanel,
  //       loadingBadgeTypes: props.loadingBadgeTypes,
  //       loadingBadge: props.loadingBadge,
  //       loadingBadgeStatus: props.loadingBadgeStatus,
  //       isCreating: props.isCreating,
  //       allBadgeStatus: props.allBadgeStatus,
  //       badgeStatus: props.badgeStatus,
  //       newBadge: props.badge
  //     };
  //   }
  // }

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevProps.badgeStatus != prevState.badgeStatus) {
  //     let typeSuggestions = [];
  //     prevState.badgeStatus.data.map(type =>
  //       typeSuggestions.push({
  //         value: type.id,
  //         label: type.name
  //       })
  //     );
  //     this.setState({
  //       typeSuggestions,
  //       isLoadingTypes: false
  //     });
  //   }
  // }

  loadTypes = () => {
    // this.props.getBadgeStatus({
    //   start: 0,
    //   length: -1,
    //   order: "name asc",
    //   search: ""
    // });
    ApiHandler.AccessControl.Badges.getBadgeTypes(0, -1, "name asc", "")
      .then(({ data }) => {
        let typeSuggestions = [];
        data.data.map((type) =>
          typeSuggestions.push({
            value: type.id,
            label: type.name,
          })
        );
        this.setState({
          typeSuggestions,
          isLoadingTypes: false,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  loadBadgeStatus = () => {
    ApiHandler.AccessControl.Badges.getBadgeStatus(0, -1, "name asc", "")
      .then(({ data }) => {
        let statusSuggestions = [];
        data.data.map((status) =>
          statusSuggestions.push({
            value: status.id,
            label: status.name,
          })
        );
        this.setState({
          statusSuggestions,
          isLoadingStatus: false,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  handleOnFiles = (files) => {
    URL.createObjectURL(files[0]);
  };

  handlePersonSelected = (person) => {
    let personToAdd = {
      id: person.id,
      name: person.name + " " + person.lastname,
    };
    this.setState((prevState) => ({
      openDialogPersons: false,
      newBadge: {
        ...prevState.newBadge,
        person: personToAdd,
      },
    }));
  };

  handleUnassignedPerson = () => {
    this.setState((prevState) => ({
      newBadge: {
        ...prevState.newBadge,
        person: {
          id: -1,
        },
      },
    }));
  };

  handleAccessLevelsSelected = (accessLevels) => {
    this.setState((prevState) => ({
      openDialogAccessLevels: false,
      newBadge: {
        ...prevState.newBadge,
        accessLevels: accessLevels,
      },
    }));
  };

  handleChange = (number) => (event) => {
    let value = event.currentTarget ? event.currentTarget.value : event.value;
    let label = event.currentTarget ? event.currentTarget.label : event.label;
    if (number === "badgeType" || number === "status") {
      value = {
        id: value,
        name: label,
      };
    }
    this.setState((prevState) => ({
      newBadge: {
        ...prevState.newBadge,
        [number]: value,
      },
    }));
  };

  handleChangeDate = (number) => (event) => {
    let value = new Date(event);

    if (number == "activationDate") {
      let fecha = new Date(event);

      this.setState((prevState) => ({
        newBadge: {
          ...prevState.newBadge,
          activationDate: value,
          deactivationDate: new Date(
            fecha.setFullYear(fecha.getFullYear() + 5)
          ),
        },
      }));
    } else
      this.setState((prevState) => ({
        newBadge: {
          ...prevState.newBadge,
          deactivationDate: value,
        },
      }));
  };

  handleCreate = () => {
    const { t } = this.props;
    const errors = this.validateCreate();
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
        isCreating: true,
      });
      // this.props.createBadge(this.state.newBadge);
      ApiHandler.AccessControl.Badges.createBadge({
        ...this.state.newBadge,
        pin: this.state.newBadge.pin == "" ? null : this.state.newBadge.pin, // API dont receive empty string
        customFields1: this.props.customFieldsValues,
        customFields2: this.props.customFieldsDateValues,
      })
        .then(() => {
          SnackbarHandler.showMessage(t("CreateSuccessBadge"));
          this.props.clearFormStore();
          this.setState({
            isCreating: false,
            isSuccess: true,
          });
          setTimeout(() => {
            this.setState({
              isSuccess: false,
              newBadge: formBadge,
            });
          }, 1000);
        })
        .catch((error) => {
          this.setState({
            isCreating: false,
            isSuccess: false,
          });
          SnackbarHandler.showMessage(t(error.error.errorData), "error");
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

  handleEdit = () => {
    const { t } = this.props;
    const errors = this.validateCreate();
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
        isCreating: true,
      });
      // this.props.editBadge(this.state.newBadge);
      ApiHandler.AccessControl.Badges.editBadge({
        ...this.state.newBadge,
        customFields1: this.props.customFieldsValues,
        customFields2: this.props.customFieldsDateValues,
      })
        .then(() => {
          this.setState({
            isCreating: false,
            isSuccess: true,
          });
          SnackbarHandler.showMessage(t("EditSuccessBadge"));
          this.props.clearFormStore();
          setTimeout(() => {
            this.setState({
              isSuccess: false,
            });
            this.props.onCreate();
          }, 1000);
        })
        .catch(({ error }) => {
          console.log("error", error);
          SnackbarHandler.showMessage(error.message, "error");
          this.setState({
            isCreating: false,
            isSuccess: false,
          });
        });
    } else {
      SnackbarHandler.showMessage(t("inputIncomplete"), "error");
    }
  };

  removeAccents(str) {
    str = str.replace(/\s/g, "");
    str = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    return str.replace(/[.,\/#!$%\^&\*;:{}=\-+_`~()]/g, "");
  }

  validateCustomFields = () => {
    const type = "BADGE";
    const {
      customFieldsDateValues = {},
      customFieldsValues = {},
      customFields,
    } = this.props;
    const customFieldsErrors = {};
    if (customFields && customFields.badges)
      customFields.badges.map((field) => {
        const fieldName = this.removeAccents(field.fieldName.toUpperCase());
        if (field.fieldType != 3)
          customFieldsErrors[fieldName] =
            field.visibility[type] &&
            isValueEmptyOrNull(customFieldsValues[fieldName]);
        else
          customFieldsErrors[fieldName] =
            field.visibility[type] &&
            isValueEmptyOrNull(customFieldsDateValues[fieldName]);
      });
    return customFieldsErrors;
  };

  validateCreate = () => {
    const { newBadge } = this.state;
    return {
      number:
        isValueEmptyOrNull(newBadge.number) ||
        newBadge.number > 9223372036854775806,
      //pin: isValueEmptyOrNull(newBadge.pin),
      badgeType: isValueEmptyOrNull(newBadge.badgeType),
      status: isValueEmptyOrNull(newBadge.status),
    };
  };

  handleOpenPersons = () => {
    this.setState({
      openDialogPersons: true,
    });
  };

  handleOpenAccessLevels = () => {
    this.setState({
      openDialogAccessLevels: true,
    });
  };

  loadPersons = () => {};

  justNumbers = (e) => {
    let keynum = window.event ? window.event.keyCode : e.which;
    if (keynum === 8 || keynum === 46) return true;
    return /\d/.test(String.fromCharCode(keynum));
  };

  render() {
    const {
      newBadge,
      typeSuggestions,
      statusSuggestions,
      isLoadingStatus,
      openDialogPersons,
      openDialogAccessLevels,
      isLoadingTypes,
      isLoadingNewData,
    } = this.state;
    const { classes, theme, isDialog, isEdit, isDetails, t } = this.props;

    const ActivationDateText = ({ value, onClick }) => (
      <TextField
        style={{ width: "100%" }}
        onClick={onClick}
        label={t("activeDate")}
        value={value}
        required={!isNullOrUndefined(this.state.newBadge.activationDate)}
      />
    );
    const DesactivationDateText = ({ value, onClick }) => (
      <TextField
        style={{ width: "100%" }}
        onClick={onClick}
        label={t("inactiveDate")}
        value={value}
        required={this.state.newBadge.activationDate}
      />
    );

    const selectStyles = {
      input: (base) => ({
        ...base,
        color: theme.palette.text.primary,
        "& input": {
          font: "inherit",
        },
        width: "100%",
        menuList: {
          maxHeight: 100,
        },
      }),
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
            {/* <Fade
              in={isLoadingNewData || isLoadingStatus || isLoadingTypes}
              className={classes.contentLoader}
            >
              <div
                style={{
                  pointerEvents:
                    isLoadingNewData || isLoadingStatus || isLoadingTypes
                      ? "inherit"
                      : "none"
                }}
              >
                <CircularProgress
                  className={classes.circularProgress}
                  size={50}
                />
              </div>
            </Fade> */}
            <LinearProgress
              style={{
                opacity:
                  isLoadingNewData || isLoadingStatus || isLoadingTypes
                    ? "1"
                    : "0",
                width: "100%",
                background: "none",
                borderBottomLeftRadius: 50,
                borderBottomRightRadius: 50,
              }}
              variant="query"
            />
            <Avatar className={classes.avatar}>
              <CardIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              {isEdit
                ? t("EditBadge")
                : isDetails
                ? t("DetailsBadge")
                : t("NewBadge")}
            </Typography>

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
              >
                <Grid item xs={12} md={12}>
                  <Typography component="h1" variant="subtitle1">
                    {t("person")}
                  </Typography>
                  <Divider style={{ marginBottom: 10 }} />
                  <List className={classes.listRoot}>
                    <ListItem style={{ padding: 0 }}>
                      {!isDetails && (
                        <Fab
                          size="small"
                          color="default"
                          onClick={this.handleOpenPersons}
                          disabled={
                            isLoadingNewData ||
                            isLoadingStatus ||
                            isLoadingTypes
                          }
                        >
                          <PlusIcon />
                        </Fab>
                      )}
                      <ListItemText
                        primary={
                          !isNullOrUndefined(newBadge.person) &&
                          !isNullOrUndefined(newBadge.person.name)
                            ? newBadge.person.name
                            : t("Unspecified")
                        }
                        secondaryTypographyProps={{
                          style: { fontSize: "1rem" },
                        }}
                      />

                      {!isDetails &&
                      !isNullOrUndefined(newBadge.person) &&
                      !isNullOrUndefined(newBadge.person.name) ? (
                        <IconButton
                          className={classes.iconButton}
                          onClick={() => this.handleUnassignedPerson()}
                          size="large">
                          <DeleteIcon />
                        </IconButton>
                      ) : (
                        ""
                      )}
                    </ListItem>
                  </List>
                </Grid>
                <Grid item xs={12} md={12}>
                  <Typography component="h1" variant="subtitle1">
                    {t("AccessLevels")}
                  </Typography>
                  <Divider style={{ marginBottom: 10 }} />
                  <List className={classes.listRoot}>
                    <ListItem style={{ padding: 0 }}>
                      {!isDetails && (
                        <Fab
                          size="small"
                          color="default"
                          onClick={this.handleOpenAccessLevels}
                          style={{ minWidth: 40 }}
                          disabled={
                            isLoadingNewData ||
                            isLoadingStatus ||
                            isLoadingTypes
                          }
                        >
                          <PlusIcon />
                        </Fab>
                      )}

                      <ListItemText
                        primary={
                          !isNullOrUndefined(newBadge.accessLevels) &&
                          newBadge.accessLevels.length !== 0
                            ? `${t("AccessLevels")} : ${
                                newBadge.accessLevels.length
                              }`
                            : t("NoLevels")
                        }
                      />
                      {
                        <IconButton
                          className={classnames(classes.expand, {
                            [classes.expandOpen]: this.state.showAccessLevels,
                          })}
                          disabled={
                            isNullOrUndefined(newBadge.accessLevels) ||
                            newBadge.accessLevels.length === 0
                          }
                          onClick={() =>
                            this.setState({
                              showAccessLevels: !this.state.showAccessLevels,
                            })
                          }
                          size="large">
                          <ExpandMore />
                        </IconButton>
                      }
                    </ListItem>

                    <Collapse
                      in={this.state.showAccessLevels}
                      timeout="auto"
                      unmountOnExit
                    >
                      <List dense component="div" disablePadding>
                        {!isNullOrUndefined(newBadge.accessLevels) &&
                          newBadge.accessLevels.map((accessLevel) => (
                            <ListItem
                              key={accessLevel.id}
                              className={classes.nested}
                            >
                              <ListItemIcon>
                                <ChevronIcon />
                              </ListItemIcon>
                              <ListItemText inset primary={accessLevel.name} />
                            </ListItem>
                          ))}
                      </List>
                    </Collapse>
                  </List>
                </Grid>
              </Grid>
              <Grid container item xs={12} md={8} spacing={24}>
                <Grid item xs={12} md={6} style={{ marginBottom: 5 }}>
                  <DatePicker
                    selected={new Date(newBadge.activationDate)}
                    onChange={this.handleChangeDate("activationDate")}
                    showTimeSelect
                    showYearDropdown
                    scrollableYearDropdown
                    timeIntervals={15}
                    customInput={<ActivationDateText />}
                    timeCaption="time"
                    dateFormat={"yyyy/MM/dd hh:mm a"}
                    minDate={new Date()}
                    calendarClassName={classes.reactDatePicker}
                    readOnly={isDetails}
                    required
                    disabled={
                      isLoadingNewData || isLoadingStatus || isLoadingTypes
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <DatePicker
                    calendarClassName={classes.reactDatePicker}
                    selected={new Date(newBadge.deactivationDate)}
                    onChange={this.handleChangeDate("deactivationDate")}
                    showTimeSelect
                    peekNextMonth
                    showYearDropdown
                    scrollableYearDropdown
                    timeIntervals={15}
                    minDate={newBadge.deactivationDate}
                    customInput={<DesactivationDateText />}
                    timeCaption="time"
                    dateFormat={"yyyy/MM/dd hh:mm a"}
                    readOnly={isDetails}
                    required
                    fullWidth
                    disabled={
                      isLoadingNewData || isLoadingStatus || isLoadingTypes
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6} className={classes.grid}>
                  <TextField
                    required
                    label={t("number")}
                    value={newBadge.number}
                    onChange={this.handleChange("number")}
                    fullWidth
                    helperText={
                      isValueEmptyOrNull(newBadge.number)
                        ? t("inputEmpty")
                        : t("ExceedsMaximumCharacters")
                    }
                    FormHelperTextProps={{
                      style: { opacity: this.state.formErrors.number ? 1 : 0 },
                    }}
                    error={this.state.formErrors.number}
                    disabled={
                      isDetails ||
                      isLoadingNewData ||
                      isLoadingStatus ||
                      isLoadingTypes
                    }
                    onKeyPress={(event) => {
                      if (!this.justNumbers(event)) event.preventDefault();
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6} className={classes.grid}>
                  <Select
                    classes={classes}
                    styles={selectStyles}
                    options={statusSuggestions}
                    components={components}
                    noOptionsMessage={() => {
                      return t("NoInformation");
                    }}
                    value={newBadge.status ? newBadge.status.id : null}
                    onChange={this.handleChange("status")}
                    placeholder={
                      newBadge.status ? newBadge.status.name : t("status")
                    }
                    maxMenuHeight={200}
                    isLoading={isLoadingStatus}
                    isDisabled={
                      isLoadingStatus ||
                      isDetails ||
                      isLoadingNewData ||
                      isLoadingTypes
                    }
                  />
                  <FormHelperText
                    style={{ opacity: this.state.formErrors.status ? 1 : 0 }}
                    error={this.state.formErrors.status}
                  >
                    {t("inputEmpty")}
                  </FormHelperText>
                </Grid>
                <Grid item xs={12} md={6} className={classes.grid}>
                  <Select
                    classes={classes}
                    styles={selectStyles}
                    options={typeSuggestions}
                    components={components}
                    noOptionsMessage={() => {
                      return t("NoInformation");
                    }}
                    value={newBadge.badgeType ? newBadge.badgeType.id : null}
                    onChange={this.handleChange("badgeType")}
                    placeholder={
                      newBadge.badgeType
                        ? newBadge.badgeType.name
                        : t("BadgeType")
                    }
                    maxMenuHeight={200}
                    isLoading={isLoadingTypes}
                    isDisabled={
                      isLoadingTypes ||
                      isDetails ||
                      isLoadingNewData ||
                      isLoadingStatus ||
                      isLoadingTypes
                    }
                  />
                  <FormHelperText
                    style={{ opacity: this.state.formErrors.badgeType ? 1 : 0 }}
                    error={this.state.formErrors.badgeType}
                  >
                    {t("inputEmpty")}
                  </FormHelperText>
                </Grid>
                <CustomForm
                  customFields={this.props.customFields.badges}
                  entity={"BADGE"}
                  errors={this.state.customFieldsErrors}
                  isDetails={isDetails}
                />
              </Grid>
            </Grid>
            {!isDetails && (
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
                  disabled={
                    this.state.isCreating ||
                    isLoadingNewData ||
                    isLoadingStatus ||
                    isLoadingTypes
                  }
                  onClick={
                    this.state.isCreating
                      ? undefined
                      : isEdit
                      ? this.handleEdit
                      : this.handleCreate
                  }
                  style={{
                    background: this.state.isSuccess ? green[500] : undefined,
                    color: "white",
                  }}
                >
                  {this.state.isSuccess
                    ? isEdit
                      ? t("successEdit")
                      : t("successCreate")
                    : this.state.isCreating
                    ? ""
                    : isEdit
                    ? t("EditBadge")
                    : t("CreateBadge")}
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
                      color: "white",
                    }}
                  />
                )}
              </div>
            )}
          </Paper>
          {!isDetails && (
            <DataTableDialog
              open={openDialogPersons}
              onConfirm={this.handlePersonSelected}
              onClose={() => this.setState({ openDialogPersons: false })}
              title={t("person")}
              subTitle={t("SelectPerson")}
              loadDataFunction={ApiHandler.EasyAccess.Persons.getPersons}
              isEdit={isEdit}
              rowsSelected={
                !isNullOrUndefined(newBadge.person) ? [newBadge.person] : []
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
                  name: t("dni"),
                  field: "document",
                  options: {
                    filter: true,
                    sort: true,
                  },
                },
              ]}
            />
          )}
          {!isDetails && (
            <DataTableDialog
              open={openDialogAccessLevels}
              onConfirm={this.handleAccessLevelsSelected}
              onClose={() => this.setState({ openDialogAccessLevels: false })}
              title={t("managerAccessLevel")}
              subTitle={t("selectAccessLevels")}
              loadDataFunction={
                ApiHandler.AccessControl.AccessLevels.getAccessLevels
              }
              rowsSelected={newBadge.accessLevels}
              multipleSelect={true}
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
                  name: t("TimeZones"),
                  field: "timeZones",
                  options: {
                    filter: true,
                    sort: true,
                    sortDirection: "asc",
                  },
                },
                {
                  name: t("ReadersNumber"),
                  field: "readersNumber",
                  options: {
                    filter: true,
                    sort: true,
                    sortDirection: "asc",
                  },
                },
              ]}
            />
          )}
        </div>
      </main>)
    );
  }
}

// const mapStateToProps = ({ AccessControlBadge }) => ({
//   badge: AccessControlBadge.badgezz
// });

// const mapDispatchToProps = {
//   createBadge,
//   editBadge,
//   getBadgeById,
//   getBadgeStatus
// };

// NewBadge.propTypes = {
//   classes: PropTypes.object.isRequired,
//   theme: PropTypes.object.isRequired
// };

// const NewBadgeConnected = connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(NewBadge);

const mapStateToProps = ({ CustomForm, Settings }) => ({
  customFieldsValues: CustomForm.formValues,
  customFieldsDateValues: CustomForm.formDateValues,
  customFields: Settings.customFields,
});

const mapDispatchToProps = {
  setInitDateValues,
  setInitValues,
  clearFormStore,
  requestCustomFieldsTypeListValues,
};

const connectedNewBadge = connect(
  mapStateToProps,
  mapDispatchToProps
)(NewBadge);
export default withTranslation()(
  withStyles(styles, { withTheme: true })(connectedNewBadge)
);
