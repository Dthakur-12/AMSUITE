import { Dialog, List, ListItemIcon, Slide } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Collapse from "@mui/material/Collapse";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import LinearProgress from "@mui/material/LinearProgress";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import { withStyles } from '@mui/styles';
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import ChevronIcon from "@mui/icons-material/ChevronRightRounded";
import ExpandMore from "@mui/icons-material/ExpandMore";
import PersonIcon from "@mui/icons-material/PersonRounded";
import AccountCircle from "@mui/icons-material/PortraitRounded";
import classnames from "classnames";
import moment from "moment";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import { isNullOrUndefined } from "util";
import ApiHandler from "../../../../services/ApiHandler";
import { isValueEmptyOrNull } from "../../../../utils/HelperFunctions";
import DataTableDialog from "../../../Shared/DataTable/DataTableDialog";
import DataTableDialogAction from "../../../Shared/DataTable/DataTableDialogAction";
import DropFile from "../../../Shared/DropFile";
import NavBarEasyAccess from "../../utils/NavBarEasyAccess";
// import VehicleForm from "./NewVehicle";
import { withTranslation } from "react-i18next";
import { requestEnterprises } from "../../../../actions/EasyAccess/Enterprise_actions";
import {
  requestBadges,
  printBadgeData,
  requestBadgeByQR,
  clearImageStore,
} from "../../../../actions/EasyAccess/Badges_actions";
import {
  requestPersonById,
  requestPersons,
  requestGetImage,
} from "../../../../actions/EasyAccess/Person_actions";
import {
  setInitValues,
  clearFormStore,
  setInitDateValues,
} from "../../../../actions/Shared/custom_form_actions";

import { requestCustomFieldsTypeListValues } from "../../../../actions/Settings/settings_actions";
import { FieldTypes } from "../../../../utils/Enums";
import styles from "../../../../assets/styles/EasyAccess_styles/Register_styles/detailsPersonStyle";

import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import PrintIcon from "@mui/icons-material/Print";
import CardIcon from "@mui/icons-material/CreditCard";
import "./PrinterIcon.css";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import QRBadge from "./QRBadge";
import ReactToPrint from "react-to-print";
import CustomForm from "../../../Shared/Form/CustomForm";

const mapStateToProps = ({
  User,
  Settings,
  Enterprise,
  Persons,
  Badges,
  CustomForm,
}) => {
  return {
    currentUser: User.currentUser,
    settings: Settings.settings,
    enterprises: Enterprise.enterprises,
    successEnterprise: Enterprise.successEnterprise,
    isLoadingEnterprises: Enterprise.loading,
    successPerson: Persons.successPerson,
    person: Persons.person,
    loadingPrs: Persons.loading,
    successPrs: Persons.successPrs,
    persons: Persons.persons,
    img: Persons.img,
    successGetImage: Persons.successGetImage,
    badges: Badges.badges,
    successBadges: Badges.successBadges,
    loadingBadges: Badges.loading,
    successQR: Badges.successQR,
    qrImage: Badges.qrImage,
    customFieldsValues: CustomForm.formValues,
    customFields: Settings.customFields,
    customFieldsDateValues: CustomForm.formDateValues,
  };
};

const mapDispatchToProps = {
  requestEnterprises: requestEnterprises,
  requestPersonById: requestPersonById,
  requestPersons: requestPersons,
  requestGetImage: requestGetImage,
  requestBadges: requestBadges,
  printBadgeData: printBadgeData,
  requestBadgeByQR,
  clearImageStore,
  setInitValues,
  clearFormStore,
  setInitDateValues,
  requestCustomFieldsTypeListValues,
};

function Transition(props) {
  return <Slide direction="down" {...props} />;
}

class DetailsPerson extends Component {
  constructor(props) {
    super(props);
    const { currentUser, settings, initValues } = this.props;

    this.state = {
      isLoadingStatus: true,
      isLoadingTypes: true,
      openDialogEmployees: false,
      openDialogCards: false,
      typesSuggestions: [],
      enterpriseSuggestions: undefined,
      visitEnterprise: undefined,
      url: undefined,
      openDialogNewVehicle: false,
      showCards: true,
      showVehicles: true,
      errorMessage: "",
      currentUser: currentUser,
      personSettings: {
        employeeSettings: settings.employeeSettings,
        visitorSettings: settings.visitorSettings,
      },
      Person: initValues,
      ocultar: false,
      badgeToPrint: "",
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

  componentDidMount() {
    const { setInitValues, initValues, setInitDateValues } = this.props;

    this.loadPersonData();
    this.loadEnterprises();
    //this.loadStatus();
    //this.loadTypes();
    // this.loadHost();
    this.loadImage();
    this.loadSelectsOptions();
    setInitValues(initValues.customFields1);
    setInitDateValues(initValues.customFields2);
  }

  componentWillUnmount() {
    this.props.clearFormStore();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.enterprises !== prevState.enterprises ||
      nextProps.successEnterprise !== prevState.successEnterprise ||
      nextProps.isLoadingEnterprises !== prevState.isLoadingEnterprises ||
      nextProps.successPerson !== prevState.successPerson ||
      nextProps.successGetImage !== prevState.successGetImage ||
      nextProps.img !== prevState.img
    ) {
      return {
        enterprises: nextProps.enterprises,
        successEnterprise: nextProps.successEnterprise,
        isLoadingEnterprises: nextProps.isLoadingEnterprises,
        successPerson: nextProps.successPerson,
        successGetImage: nextProps.successGetImage,
        img: nextProps.img,
      };
    } else return null;
  }

  componentDidUpdate(prevProps, prevState) {
    const { successGetImage, img } = this.state;
    if (
      !prevProps.initValues &&
      prevProps.initValues !== this.props.initValues
    ) {
      this.setState({
        customFormKey: Math.floor(Math.random() * 100) + 1,
      });
    }
    if (successGetImage && successGetImage !== prevState.successGetImage) {
      this.setState((prevState) => ({
        url: img,
        isLoadingImg: false,
      }));
    }
    if (
      this.state.successEnterprise &&
      this.state.successEnterprise !== prevState.successEnterprise
    ) {
      var enterpriseSuggestions = [];
      this.state.enterprises.data.map((enterprise) =>
        enterpriseSuggestions.push({
          value: enterprise.id,
          label: enterprise.name,
        })
      );
      this.setState({
        enterpriseSuggestions,
      });
    }
    if (
      this.state.successPerson &&
      this.state.successPerson !== prevState.successPerson
    ) {
      this.setState((prevState) => ({
        ...prevState,
        Person: {
          ...prevState.Person,
          employee: {
            name: this.props.person.hostName,
          },
          personGroups: this.props.person.personGroups,
        },
      }));
    }
    if (this.props.successQR && this.props.successQR !== prevProps.successQR) {
      this.setState({ openPrintDialog: true });
    }
  }

  loadEnterprises = () => {
    this.props.requestEnterprises({
      start: 0,
      length: 10,
      order: "name asc",
      search: "",
    });
  };

  // loadHost = () => {
  //   const { Person } = this.state;
  //   if (Person.employee !== 0) this.props.requestPersonById(Person.employee);
  // };

  loadPersonData = () => {
    const { initValues } = this.props;
    if (initValues.id !== 0) this.props.requestPersonById(initValues.id);
  };

  loadTypes = () => {
    const { Person } = this.state;
    ApiHandler.EasyAccess.Persons.getTypes()
      .then(({ data }) => {
        let typesSuggestions = [];
        data.map((type) =>
          typesSuggestions.push({
            value: type.id,
            label: type.name,
          })
        );
        NavBarEasyAccess.hideLoader();
        if (Person.type > -1) {
          this.setState({
            typesSuggestions,
            isLoadingTypes: false,
          });
        } else {
          this.setState((prevState) => ({
            typesSuggestions,
            isLoadingTypes: false,
            Person: {
              ...prevState.Person,
              type: typesSuggestions[0].value,
            },
            type: typesSuggestions[0],
          }));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  loadStatus = () => {
    ApiHandler.EasyAccess.Status.getStatus(0, -1, "name asc", "")
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
  loadImage = () => {
    const { Person } = this.state;
    if (Person.id > 0) {
      this.props.requestGetImage(Person.id);
    } else {
      this.setState({
        isLoadingImg: false,
      });
    }
  };

  setFile = () => {
    if (isValueEmptyOrNull(this.state.url)) {
      return undefined;
    } else {
      return [{ preview: "data:image/jpeg;base64," + this.state.url }];
    }
  };

  handlePrintBadgeDATA = (badgeNumber) => (event) => {
    this.props.requestBadgeByQR(badgeNumber);
    // this.setState({
    //   badgeToPrint: badgeNumber,
    // });
  };

  confirmPrint = () => {
    const { Person } = this.state;
    this.setState({ openPrintDialog: false });
  };

  render() {
    const {
      Person,
      openDialogEmployees,
      openDialogCards,
      openDialogVehicles,
      openDialogNewVehicle,
    } = this.state;
    const { classes, isDialog, t, theme, customFields } = this.props;

    const isVisitor = Person.type === 1;
    let personSettings = isVisitor
      ? this.state.personSettings.visitorSettings
      : this.state.personSettings.employeeSettings;
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
              {t("DetailsRegister")}
            </Typography>
            <div style={{ width: "160px" }}>
              {/* <Select
                                classes={classes}
                                styles={selectStyles}
                                options={typesSuggestions}
                                components={components}
                                value={typesSuggestions.map((type)=>{if(type.value===Person.type)return(type)})}
                                placeholder="Tipo"
                                maxMenuHeight={200}
                                isLoading={isLoadingTypes}
                                isDisabled={isLoadingTypes}
                            /> */}
              <TextField
                value={Person.type === 0 ? t("employee") : t("visitor")}
                fullWidth
              />
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
                style={{
                  display: "inline-block",
                }}
              >
                <Grid
                  item
                  xs={12}
                  md={12}
                  hidden={personSettings.empRes === null}
                >
                  <Typography component="h1" variant="subtitle1">
                    {t("ResponsibleEmployee")}
                  </Typography>
                  <Divider style={{ marginBottom: 10 }} />
                  <List className={classes.listRoot}>
                    <ListItem
                      style={{
                        padding: 0,
                        backgroundColor: theme.palette.backgroundSecondary.main,
                      }}
                    >
                      <ListItemText
                        primary={
                          Person.employee && Person.employee.name
                            ? Person.employee.name
                            : t("Unspecified")
                        }
                        secondaryTypographyProps={{
                          style: { fontSize: "1rem" },
                        }}
                        secondary={
                          Person.employee ? Person.employee.lastname : ""
                        }
                      />
                    </ListItem>
                  </List>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={12}
                  hidden={
                    personSettings.card === null &&
                    personSettings.startBadgeRange === null
                  }
                >
                  <List className={classes.listRoot}>
                    <ListItem
                      style={{
                        padding: 0,
                        backgroundColor: theme.palette.backgroundSecondary.main,
                      }}
                    >
                      <ListItemText
                        primary={
                          t("Badges") +
                          (Person.badges.length !== 0
                            ? ": " + Person.badges.length
                            : "")
                        }
                      />
                      <IconButton
                        className={classnames(classes.expand, {
                          [classes.expandOpen]: this.state.showCards,
                        })}
                        onClick={() =>
                          this.setState({ showCards: !this.state.showCards })
                        }
                        size="large">
                        <ExpandMore />
                      </IconButton>
                    </ListItem>
                    <Divider style={{ marginBottom: 10 }} />

                    <Collapse
                      in={this.state.showCards}
                      timeout="auto"
                      unmountOnExit
                    >
                      <div className={classes.demo}>
                        <List dense disablePadding>
                          {Person.badges.map((badge) => (
                            <ListItem key={badge.id} className={classes.nested}>
                              <ListItemAvatar>
                                <Avatar>
                                  <CardIcon />
                                </Avatar>
                              </ListItemAvatar>
                              <ListItemText primary={badge.number} />
                              <ListItemSecondaryAction
                                style={{ paddingLeft: 0 }}
                              >
                                <IconButton
                                  aria-label="Print"
                                  // className={"print-button"}
                                  onClick={this.handlePrintBadgeDATA(
                                    badge.number
                                  )}
                                  size="large">
                                  <PrintIcon />
                                  {/* <span className={"print-icon"}></span> */}
                                </IconButton>
                              </ListItemSecondaryAction>
                            </ListItem>
                          ))}
                        </List>
                      </div>
                    </Collapse>
                  </List>
                </Grid>

                {/* {this.state.ocultar && (
                  <Grid item xs={12} md={12}>
                    <Typography component="h1" variant="subtitle1">
                      {t("VehicleToAssign")}
                    </Typography>
                    <Divider style={{ marginBottom: 10 }} />
                    <List className={classes.listRoot}>
                      <ListItem style={{ padding: 0 }}>
                        <ListItemText
                          inset
                          primary={
                            t("vehicles") +
                            (Person.vehicles.length !== 0
                              ? ": " + Person.vehicles.length
                              : "")
                          }
                        />
                        {
                          <IconButton
                            className={classnames(classes.expand, {
                              [classes.expandOpen]: this.state.showVehicles
                            })}
                            onClick={() =>
                              this.setState({
                                showVehicles: !this.state.showVehicles
                              })
                            }
                          >
                            <ExpandMore />
                          </IconButton>
                        }
                      </ListItem>
                      <Collapse
                        in={this.state.showVehicles}
                        timeout="auto"
                        unmountOnExit
                      >
                        <List dense component="div" disablePadding>
                          {Person.vehicles.map(vehicle => (
                            <ListItem
                              key={vehicle.id}
                              className={classes.nested}
                            >
                              <ListItemIcon>
                                <ChevronIcon />
                              </ListItemIcon>
                              <ListItemText inset primary={vehicle.plate} />
                            </ListItem>
                          ))}
                        </List>
                      </Collapse>
                    </List>
                  </Grid>
                )} */}
              </Grid>
              <Grid container item xs={12} md={8} spacing={24}>
                <Grid item xs={12} md={6} style={{ marginBottom: 5 }}>
                  {/* <InlineDateTimePicker
                                        label="Ingreso"
                                        value={Person.ingressDate}
                                        minDate={new Date()}
                                        disable={true}
                                        fullWidth
                                        minDateMessage='La fecha no puede ser menor que la actual'
                                    /> */}
                  <TextField
                    label={t("DateAdmission")}
                    value={
                      isValueEmptyOrNull(Person.ingressDate)
                        ? ""
                        : moment(Person.ingressDate).format(
                            "MM/DD/YYYY HH:mm:ss"
                          )
                    }
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  {/* <InlineDateTimePicker
                                        label="Egreso"
                                        value={Person.egressDate}
                                        minDate={new Date()}
                                        disable={true}
                                        fullWidth
                                        minDateMessage='La fecha no puede ser menor que la actual'
                                    /> */}
                  <TextField
                    label={t("DateExit")}
                    value={
                      isValueEmptyOrNull(Person.egressDate)
                        ? ""
                        : moment(Person.egressDate).format(
                            "MM/DD/YYYY HH:mm:ss"
                          )
                    }
                    fullWidth
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={6}
                  className={classes.grid}
                  hidden={personSettings.name === null}
                >
                  <TextField label={t("name")} value={Person.name} fullWidth />
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={6}
                  className={classes.grid}
                  hidden={personSettings.lastName === null}
                >
                  <TextField
                    label={t("LastName")}
                    fullWidth
                    value={Person.lastname}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={6}
                  style={{ paddingTop: 0, marginTop: 12, paddingBottom: 0 }}
                  className={classes.grid}
                  hidden={personSettings.dni === null}
                >
                  <TextField
                    type="text"
                    label={t("dni")}
                    fullWidth
                    value={Person.document}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={6}
                  style={{ paddingTop: 0, marginTop: 12, paddingBottom: 0 }}
                  hidden={personSettings.enterprise === null}
                >
                  <TextField
                    type="originEnterprise"
                    label={t("originEnterprise")}
                    fullWidth
                    value={Person.originEnterpriseName}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={6}
                  style={{ paddingTop: 0, marginTop: 12, paddingBottom: 0 }}
                  hidden={personSettings.empVis === null}
                >
                  <TextField
                    type="visitEnterprise"
                    label={t("visitEnterprise")}
                    fullWidth
                    value={Person.visitEnterpriseName}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={6}
                  className={classes.grid}
                  style={{
                    paddingTop: 0,
                    marginTop: 12,
                    paddingBottom: 0,
                    marginBottom: "2%",
                  }}
                  hidden={personSettings.email === null}
                >
                  <TextField
                    type="email"
                    label={t("email")}
                    fullWidth
                    value={Person.email}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={6}
                  className={classes.grid}
                  style={{
                    paddingTop: 0,
                    marginTop: 12,
                    paddingBottom: 0,
                  }}
                  hidden={personSettings.phone === null}
                >
                  <TextField
                    type="number"
                    label={t("Phone")}
                    fullWidth
                    value={Person.phone}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={6}
                  style={{ paddingTop: 0, marginTop: 12, paddingBottom: 0 }}
                >
                  {/* <Select
                                        classes={classes}
                                        styles={selectStyles}
                                        options={statusSuggestions}
                                        components={components}
                                        value={Person.statusName}
                                        placeholder="Estado"
                                        maxMenuHeight={200}
                                        noOptionsMessage={() => 'Sin resultados.'}
                                    /> */}
                  <TextField
                    label={t("status")}
                    value={t(Person.statusName)}
                    fullWidth
                  />
                </Grid>
                <CustomForm
                  isDetails={true}
                  customFields={customFields ? customFields.cardholders : []}
                  entity={Person.type + 1}
                  personGroups={Person.personGroups}
                />
                {this.state.Person.type === 1 && (
                  <Grid item xs={12} md={12}>
                    <TextField
                      id="observaciones"
                      label={t("Observations")}
                      multiline
                      maxRows="7"
                      rows="6"
                      value={this.state.Person.eventDescription}
                      className={classes.eventDescription}
                      margin="normal"
                      variant="outlined"
                      fullWidth
                      isDisable={true}
                    />
                  </Grid>
                )}
                <Grid item xs={12} md={12}>
                  <DropFile
                    local={false}
                    multiple={false}
                    accept="image/*"
                    isDisable={true}
                    defaultImage={
                      <AccountCircle
                        style={{
                          fontSize: 150,
                          color: theme.palette.text.main,
                        }}
                      />
                    }
                    files={this.setFile()}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Paper>
          <DataTableDialogAction
            open={openDialogEmployees}
            onConfirm={this.handleEmployeeSelected}
            onClose={() => this.setState({ openDialogEmployees: false })}
            title={t("ResponsibleEmployee")}
            subTitle={t("SelectResponsibleEmployee")}
            loadDataAction={this.props.requestPersons}
            success={this.props.successPrs}
            info={this.props.persons}
            loading={this.props.loadingPrs}
            rowsSelected={
              !isNullOrUndefined(Person.employee) ? [Person.employee] : []
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
          <DataTableDialogAction
            open={openDialogCards}
            onConfirm={this.handleCardsSelected}
            onClose={() => this.setState({ openDialogCards: false })}
            title={t("ManagerCards")}
            subTitle={t("selectAssignCard")}
            loadDataAction={this.props.requestBadges}
            rowsSelected={Person.badges}
            info={this.props.badges}
            loading={this.props.loadingBadges}
            success={this.props.successBadges}
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
                },
              },
              {
                name: t("expirationDate"),
                field: "deactivationDate",
                options: {
                  filter: true,
                  sort: true,
                },
              },
            ]}
          />

          <div>
            <Dialog
              open={this.state.openPrintDialog}
              onClose={() => this.setState({ openPrintDialog: false })}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              fullWidth={true}
              maxWidth={"sm"}
            >
              <DialogTitle
                className={classes.dialogTitle}
                id="alert-dialog-title"
              >
                {t("ConfirmPrintBadge")}
              </DialogTitle>
              <DialogContent className={classes.dialogContent}>
                <QRBadge
                  url={this.props.qrImage}
                  personName={`${this.state.Person.name} ${this.state.Person.lastname}`}
                  ref={(el) => (this.componentRef = el)}
                />
              </DialogContent>
              <DialogActions>
                <ReactToPrint
                  trigger={() => (
                    <Button variant="contained" color="primary">
                      {t("Confirm")}
                    </Button>
                  )}
                  content={() => this.componentRef}
                  onAfterPrint={() => {
                    this.props.clearImageStore();
                    this.setState({ openPrintDialog: false });
                  }}
                />
              </DialogActions>
            </Dialog>
          </div>

          {this.state.ocultar && (
            <div>
              <DataTableDialog
                open={openDialogVehicles}
                onConfirm={this.handleVehiclesSelected}
                onClose={() => this.setState({ openDialogVehicles: false })}
                title={t("vehicles")}
                subTitle={t("SelectVehicleToAssign")}
                loadDataFunction={ApiHandler.EasyAccess.Vehicles.getVehicles}
                rowsSelected={Person.vehicles}
                multipleSelect={true}
                enableCreate
                createData={{
                  title: t("NewVehicle"),
                  onCreate: () => this.setState({ openDialogNewVehicle: true }),
                }}
                columns={[
                  {
                    name: t("PlateNumber"),
                    field: "plate",
                    options: {
                      filter: true,
                      sort: true,
                      sortDirection: "asc",
                    },
                  },
                  {
                    name: t("enterprise"),
                    field: "enterprise",
                    options: {
                      sort: true,
                      filter: true,
                    },
                  },
                ]}
              />
              <Dialog
                open={openDialogNewVehicle}
                TransitionComponent={Transition}
                onClose={() => this.setState({ openDialogNewVehicle: false })}
                maxWidth="md"
                fullWidth
                scroll="paper"
              >
                {/* <VehicleForm
                  isDialog
                  onCreate={() =>
                    this.setState({ openDialogNewVehicle: false })
                  }
                /> */}
              </Dialog>
            </div>
          )}
        </div>
      </main>)
    );
  }
}

DetailsPerson.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

// export default withStyles(styles, { withTheme: true })(NewPerson);

const DetailsPersonConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailsPerson);

export default withTranslation()(
  withStyles(styles, { withTheme: true })(DetailsPersonConnected)
);
