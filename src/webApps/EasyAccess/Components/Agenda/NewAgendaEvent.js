import {
  AppBar,
  Avatar,
  Button,
  CircularProgress,
  Dialog,
  Divider,
  Fab,
  FormHelperText,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Slide,
  TextField,
  Toolbar,
  Typography
} from "@mui/material";
import Collapse from "@mui/material/Collapse";
import { emphasize } from "@mui/system";
import { withStyles } from '@mui/styles';
import PlusIcon from "@mui/icons-material/AddRounded";
import AgendaIcon from "@mui/icons-material/CalendarTodayRounded";
import ChevronIcon from "@mui/icons-material/ChevronRightRounded";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMore from "@mui/icons-material/ExpandMore";
import classnames from "classnames";
import { InlineDateTimePicker } from "@mui/x-date-pickers";
import moment from "moment";
import "moment/locale/es";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import Select from "react-select";
import { isNullOrUndefined } from "util";
import ApiHandler from "../../../../services/ApiHandler";
import { isValueEmptyOrNull } from "../../../../utils/HelperFunctions";
import SnackbarHandler from "../../../../utils/SnackbarHandler";
import DataTableDialog from "../../../Shared/DataTable/DataTableDialog";
import FullScreenLoader from "../../../Shared/FullScreenLoader";
import components from "../../../Shared/ReactSelect";
// import VehicleForm from "../Register/NewVehicle";
import { withTranslation } from "react-i18next";
import { requestEnterprises } from "../../../../actions/EasyAccess/Enterprise_actions";
import styles from "../../../assets/styles/EasyAccess_styles/Agenda_styles/newAgendaEventStyles.js";

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

const formValues = {
  title: "",
  description: "",
  place: "",
  allDay: false,
  persons: [],
  drivers: [],
  vehicles: []
};

let newForm = true;

class NewAgendaEvent extends Component {
  constructor(props) {
    super(props);
    const { initValues } = props;
    this.state = {
      openDialogEnterprises: false,
      openDialogHost: false,
      openDialogNewVehicle: false,
      openDialogVehicles: false,
      showPersons: true,
      showVehicles: true,
      newAgendaEvent: initValues ? initValues : formValues,
      formErrors: {},
      isLoadingStatus: true
    };
  }

  componentDidMount() {
    this.loadStatus();
    if (this.props.isEdit) {
      const { newAgendaEvent } = this.state;
      ApiHandler.EasyAccess.Calendar.getAgendaEventById(newAgendaEvent.id)
        .then(({ data }) => {
          this.setState(prevState => ({
            newAgendaEvent: {
              ...prevState.newAgendaEvent,
              enterprise: data.enterprise,
              persons: data.persons,
              drivers: data.drivers,
              host: data.host,
              status: data.status,
              statusId: data.statusId
            }
          }));
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  loadStatus = () => {
    ApiHandler.EasyAccess.Status.getStatus(0, -1, "name asc", "")
      .then(({ data }) => {
        let statusSuggestions = [];
        data.data.map(status =>
          statusSuggestions.push({
            value: status.id,
            label: status.name
          })
        );
        this.setState({
          statusSuggestions,
          isLoadingStatus: false
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  componentDidUpdate(props) {
    const { dates, open, isEdit } = props;
    if (!isNullOrUndefined(dates) && newForm && open && !isEdit) {
      newForm = false;
      this.setState(prevState => ({
        newAgendaEvent: {
          ...prevState.newAgendaEvent,
          startDate: dates.start,
          endDate: new Date(dates.end).setHours(23, 59, 59)
        }
      }));
    }
  }

  handleChange = name => event => {
    let value = event.currentTarget ? event.currentTarget.value : event.value;
    this.setState(prevState => ({
      newAgendaEvent: {
        ...prevState.newAgendaEvent,
        [name]: value
      }
    }));
  };

  handleChangeDate = name => event => {
    let value = event.toDate();
    this.setState(prevState => ({
      newAgendaEvent: {
        ...prevState.newAgendaEvent,
        [name]: value
      }
    }));
  };

  handleOpenEnterprises = () => {
    this.setState({
      openDialogEnterprises: true
    });
  };

  handleEnterpriseSelected = enterprise => {
    this.setState(prevState => ({
      openDialogEnterprises: false,
      newAgendaEvent: {
        ...prevState.newAgendaEvent,
        enterprise: enterprise
      }
    }));
  };

  handleOpenHost = () => {
    this.setState({
      openDialogHost: true
    });
  };

  handleHostSelected = host => {
    this.setState(prevState => ({
      openDialogHost: false,
      newAgendaEvent: {
        ...prevState.newAgendaEvent,
        host: host
      }
    }));
  };

  handleOpenPersons = () => {
    this.setState({
      openDialogPersons: true
    });
  };

  handlePersonsSelected = persons => {
    this.setState(prevState => ({
      openDialogPersons: false,
      newAgendaEvent: {
        ...prevState.newAgendaEvent,
        persons: persons
      }
    }));
  };

  handleOpenVehicles = () => {
    this.setState({
      openDialogVehicles: true
    });
  };

  handleVehiclesSelected = vehicles => {
    this.setState(prevState => ({
      openDialogVehicles: false,
      newAgendaEvent: {
        ...prevState.newAgendaEvent,
        drivers: vehicles.map(v => {
          return { vehicleId: v.id, vehicle: v };
        })
      }
    }));
  };

  handleCreate = () => {
    const { t } = this.props;
    const errors = this.validateCreate();
    this.setState({
      formErrors: errors
    });
    if (!Object.keys(errors).some(x => errors[x])) {
      this.setState({
        isCreating: true
      });
      newForm = true;
      let newAgendaEvent = JSON.parse(
        JSON.stringify(this.state.newAgendaEvent)
      );
      newAgendaEvent.personsIds = newAgendaEvent.persons.map(p => p.id);
      newAgendaEvent.enterpriseId = newAgendaEvent.enterprise
        ? newAgendaEvent.enterprise.id
        : 0;
      newAgendaEvent.hostId = newAgendaEvent.host ? newAgendaEvent.host.id : 0;
      newAgendaEvent.startDate = moment(newAgendaEvent.startDate).format(
        "MM/DD/YYYY HH:mm:ss"
      );
      newAgendaEvent.endDate = moment(newAgendaEvent.endDate).format(
        "MM/DD/YYYY HH:mm:ss"
      );
      ApiHandler.EasyAccess.Calendar.createEvent(newAgendaEvent)
        .then(() => {
          SnackbarHandler.showMessage(t("successCreateEvent"));
          this.setState({
            isCreating: false,
            isSuccess: true
          });
          this.props.updateParent();
          setTimeout(() => {
            this.setState({
              isSuccess: false,
              newAgendaEvent: formValues
            });
            this.props.onClose();
          }, 1000);
        })
        .catch(error => {
          console.log(error);
          this.setState({
            isCreating: false
          });
          SnackbarHandler.showMessage(error.error, "error");
        });
      setTimeout(() => {
        this.setState({
          isSuccess: false
        });
      }, 1000);
    } else {
      SnackbarHandler.showMessage(t("inputIncomplete"), "error");
    }
  };

  handleEdit = () => {
    const errors = this.validateCreate();
    const { t } = this.props;
    this.setState({
      formErrors: errors
    });
    if (!Object.keys(errors).some(x => errors[x])) {
      this.setState({
        isCreating: true
      });
      newForm = true;
      let newAgendaEvent = JSON.parse(
        JSON.stringify(this.state.newAgendaEvent)
      );
      newAgendaEvent.personsIds = newAgendaEvent.persons.map(p => p.id);
      newAgendaEvent.enterpriseId = newAgendaEvent.enterprise
        ? newAgendaEvent.enterprise.id
        : 0;
      newAgendaEvent.hostId = newAgendaEvent.host ? newAgendaEvent.host.id : 0;
      newAgendaEvent.startDate = moment(newAgendaEvent.startDate).format(
        "MM/DD/YYYY HH:mm:ss"
      );
      newAgendaEvent.endDate = moment(newAgendaEvent.endDate).format(
        "MM/DD/YYYY HH:mm:ss"
      );
      ApiHandler.EasyAccess.Calendar.editEvent(newAgendaEvent)
        .then(() => {
          SnackbarHandler.showMessage(t("successEditEvent"));
          this.setState({
            isCreating: false,
            isSuccess: true
          });
          this.props.updateParent();
          setTimeout(() => {
            this.setState({
              isSuccess: false
            });
            this.props.onClose();
          }, 1000);
        })
        .catch(error => {
          console.log(error);
          this.setState({
            isCreating: false
          });
          SnackbarHandler.showMessage(error.error, "error");
        });
      setTimeout(() => {
        this.setState({
          isSuccess: false
        });
      }, 1000);
    } else {
      SnackbarHandler.showMessage(t("inputIncomplete"), "error");
    }
  };

  validateCreate = () => {
    const { newAgendaEvent } = this.state;
    return {
      title: isValueEmptyOrNull(newAgendaEvent.title),
      place: isValueEmptyOrNull(newAgendaEvent.place),
      description: isValueEmptyOrNull(newAgendaEvent.description),
      enterprise: isValueEmptyOrNull(newAgendaEvent.enterprise),
      host: isValueEmptyOrNull(newAgendaEvent.host),
      statusId: isValueEmptyOrNull(newAgendaEvent.statusId),
      persons: newAgendaEvent.persons.length === 0,
      vehicles: newAgendaEvent.drivers.length === 0,
      endDate: moment(newAgendaEvent.startDate).isAfter(newAgendaEvent.endDate),
      startDate: false
    };
  };

  onDragEnd = e => {
    if (isNullOrUndefined(e.destination)) return;
    const { newAgendaEvent } = this.state;

    let person = newAgendaEvent.persons[e.source.index];
    let vehicles = newAgendaEvent.drivers.slice();

    if (isNullOrUndefined(vehicles[e.destination.droppableId])) return;

    vehicles.forEach(v => {
      if (!isNullOrUndefined(v.driver) && v.driver.id === person.id)
        v.driver = undefined;
    });

    vehicles[e.destination.droppableId].driver = person;

    this.setState(prevState => ({
      newAgendaEvent: {
        ...prevState.newAgendaEvent,
        vehicles: vehicles
      }
    }));
  };

  handleClose = () => {
    if (this.state.isCreating) return;
    newForm = true;
    this.setState({
      newAgendaEvent: formValues
    });
    this.props.onClose();
  };

  render() {
    const {
      isLoadingStatus,
      statusSuggestions,
      newAgendaEvent,
      openDialogEnterprises,
      openDialogHost,
      openDialogPersons,
      openDialogVehicles,
      openDialogNewVehicle
    } = this.state;
    const { classes, theme, isEdit, t } = this.props;
    const selectStyles = {
      input: base => ({
        ...base,
        color: theme.palette.text.primary,
        "& input": {
          font: "inherit"
        },
        width: "100%",
        menuList: {
          maxHeight: 100
        }
      })
    };

    return (
      (<div>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              disabled={this.state.isCreating}
              color="inherit"
              onClick={this.handleClose}
              size="large">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.flex}>
              {isEdit ? t("EditEvent") : t("NewEvent")}
            </Typography>
            <Button
              color="inherit"
              disabled={this.state.isCreating}
              onClick={this.handleClose}
            >
              {t("cancel")}
            </Button>
            <div
              style={{
                position: "relative"
              }}
            >
              <Button
                color="inherit"
                disabled={this.state.isCreating}
                onClick={
                  this.state.isCreating
                    ? undefined
                    : isEdit
                    ? this.handleEdit
                    : this.handleCreate
                }
              >
                {t("confirm")}
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
                    color: "white"
                  }}
                />
              )}
            </div>
          </Toolbar>
        </AppBar>
        <div className={classes.fill}>
          <FullScreenLoader isLoading={this.state.isCreating} />
          <DragDropContext onDragEnd={this.onDragEnd}>
            <Paper className={classes.paper} elevation={0}>
              <Avatar className={classes.avatar}>
                <AgendaIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                {isEdit ? t("EditEvent") : t("NewEvent")}
              </Typography>
              <Grid container spacing={24}>
                <Grid item xs={12} md={4} className={classes.grid}>
                  <TextField
                    required
                    label={t("Reason")}
                    onChange={this.handleChange("title")}
                    value={newAgendaEvent.title}
                    fullWidth
                    helperText={t("inputEmpty")}
                    FormHelperTextProps={{
                      style: { opacity: this.state.formErrors.title ? 1 : 0 }
                    }}
                    error={this.state.formErrors.title}
                  />
                </Grid>
                <Grid item xs={12} md={4} className={classes.grid}>
                  <TextField
                    required
                    label={t("Place")}
                    onChange={this.handleChange("place")}
                    value={newAgendaEvent.place}
                    fullWidth
                    helperText={t("inputEmpty")}
                    FormHelperTextProps={{
                      style: { opacity: this.state.formErrors.place ? 1 : 0 }
                    }}
                    error={this.state.formErrors.place}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={4}
                  style={{ paddingTop: 0, marginTop: 12 }}
                >
                  <Select
                    classes={classes}
                    styles={selectStyles}
                    options={statusSuggestions}
                    components={components}
                    value={this.state.statusId}
                    onChange={this.handleChange("statusId")}
                    placeholder={
                      newAgendaEvent.status
                        ? newAgendaEvent.status.name
                        : t("status")
                    }
                    maxMenuHeight={200}
                    isLoading={isLoadingStatus}
                    isDisabled={isLoadingStatus}
                  />
                  <FormHelperText
                    style={{ opacity: this.state.formErrors.statusId ? 1 : 0 }}
                    error={this.state.formErrors.statusId}
                  >
                    {t("inputEmpty")}
                  </FormHelperText>
                </Grid>
                <Grid item xs={12} md={4} className={classes.grid}>
                  <TextField
                    required
                    label={t("description")}
                    onChange={this.handleChange("description")}
                    value={newAgendaEvent.description}
                    fullWidth
                    helperText={t("inputEmpty")}
                    FormHelperTextProps={{
                      style: {
                        opacity: this.state.formErrors.description ? 1 : 0
                      }
                    }}
                    error={this.state.formErrors.description}
                    multiline
                  />
                </Grid>
                <Grid item xs={12} md={4} className={classes.grid}>
                  <InlineDateTimePicker
                    label={t("Since")}
                    value={newAgendaEvent.startDate}
                    onChange={this.handleChangeDate("startDate")}
                    minDate={new Date()}
                    required
                    fullWidth
                    minDateMessage={t(
                      "TheExpirationDateCanNotBeLessThanTheCurrentOne"
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={4} className={classes.grid}>
                  <InlineDateTimePicker
                    label={t("To")}
                    value={newAgendaEvent.endDate}
                    onChange={this.handleChangeDate("endDate")}
                    minDate={newAgendaEvent.startDate}
                    required
                    fullWidth
                    minDateMessage={t(
                      "TheExpirationDateCanNotBeLessThanTheCurrentOne"
                    )}
                    error={this.state.formErrors.endDate}
                  />
                </Grid>
                <Grid item xs={12} md={6} className={classes.grid}>
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <Typography component="h1" variant="subtitle1">
                      {t("visitEnterprise")}
                    </Typography>
                    <FormHelperText
                      style={{
                        opacity: this.state.formErrors.enterprise ? 1 : 0,
                        marginLeft: 5
                      }}
                      error={this.state.formErrors.enterprise}
                    >
                      {t("OneMustBeSelectedAtLeast")}
                    </FormHelperText>
                  </div>
                  <Divider style={{ marginBottom: 10 }} />
                  <List className={classes.listRoot}>
                    <ListItem style={{ padding: 0 }}>
                      <Fab
                        size="small"
                        color="default"
                        onClick={this.handleOpenEnterprises}
                      >
                        <PlusIcon />
                      </Fab>
                      <ListItemText
                        primary={
                          newAgendaEvent.enterprise
                            ? newAgendaEvent.enterprise.name
                            : t("Unspecified")
                        }
                      />
                    </ListItem>
                  </List>
                </Grid>
                <Grid item xs={12} md={6} className={classes.grid}>
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <Typography component="h1" variant="subtitle1">
                      {t("Host")}
                    </Typography>
                    <FormHelperText
                      style={{
                        opacity: this.state.formErrors.host ? 1 : 0,
                        marginLeft: 5
                      }}
                      error={this.state.formErrors.host}
                    >
                      {t("OneMustBeSelectedAtLeast")}
                    </FormHelperText>
                  </div>
                  <Divider style={{ marginBottom: 10 }} />
                  <List className={classes.listRoot}>
                    <ListItem style={{ padding: 0 }}>
                      <Fab
                        size="small"
                        color="default"
                        onClick={this.handleOpenHost}
                      >
                        <PlusIcon />
                      </Fab>
                      <ListItemText
                        primary={
                          newAgendaEvent.host
                            ? newAgendaEvent.host.name
                            : t("Unspecified")
                        }
                        secondaryTypographyProps={{
                          style: { fontSize: "1rem" }
                        }}
                        secondary={
                          newAgendaEvent.host
                            ? newAgendaEvent.host.lastname
                            : ""
                        }
                      />
                    </ListItem>
                  </List>
                </Grid>
                <Grid item xs={12} md={6}>
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <Typography component="h1" variant="subtitle1">
                      {t("Persons")}
                    </Typography>
                    <FormHelperText
                      style={{
                        opacity: this.state.formErrors.persons ? 1 : 0,
                        marginLeft: 5
                      }}
                      error={this.state.formErrors.persons}
                    >
                      {t("OneMustBeSelectedAtLeast")}
                    </FormHelperText>
                  </div>
                  <Divider style={{ marginBottom: 10 }} />
                  <List className={classes.listRoot}>
                    <ListItem style={{ padding: 0 }}>
                      <Fab
                        size="small"
                        color="default"
                        onClick={this.handleOpenPersons}
                      >
                        <PlusIcon />
                      </Fab>
                      <ListItemText
                        inset
                        primary={
                          t("Persons") +
                          (newAgendaEvent.persons.length !== 0
                            ? ": " + newAgendaEvent.persons.length
                            : "")
                        }
                      />
                      <IconButton
                        className={classnames(classes.expand, {
                          [classes.expandOpen]: this.state.showPersons
                        })}
                        disabled={newAgendaEvent.persons.length === 0}
                        onClick={() =>
                          this.setState({
                            showPersons: !this.state.showPersons
                          })
                        }
                        size="large">
                        <ExpandMore />
                      </IconButton>
                    </ListItem>
                    <Collapse
                      in={this.state.showPersons}
                      timeout="auto"
                      unmountOnExit
                    >
                      <List dense component="div" disablePadding>
                        <Droppable
                          key={0}
                          droppableId={"droppable-Persons"}
                          type="PERSON"
                          isDropDisabled
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.droppableProps}
                            >
                              {newAgendaEvent.persons.map((person, index) => (
                                <Draggable
                                  type="PERSON"
                                  key={index}
                                  draggableId={"draggable-" + index}
                                  index={index}
                                >
                                  {(provided, snapshot) => (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                    >
                                      <ListItem
                                        style={{
                                          backgroundColor: snapshot.isDragging
                                            ? theme.palette.primary.main
                                            : "inherit",
                                          borderRadius: 15,
                                          opacity: snapshot.isDragging ? 0.7 : 1
                                        }}
                                        key={person.id}
                                        className={classes.nested}
                                      >
                                        <ListItemIcon>
                                          <ChevronIcon />
                                        </ListItemIcon>
                                        <ListItemText
                                          inset
                                          primary={
                                            person.name + " " + person.lastname
                                          }
                                        />
                                      </ListItem>
                                    </div>
                                  )}
                                </Draggable>
                              ))}
                            </div>
                          )}
                        </Droppable>
                      </List>
                    </Collapse>
                  </List>
                </Grid>
                <Grid item xs={12} md={6}>
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <Typography component="h1" variant="subtitle1">
                      {t("VehicleToAssign")}
                    </Typography>
                    <FormHelperText
                      style={{
                        opacity: this.state.formErrors.vehicles ? 1 : 0,
                        marginLeft: 5
                      }}
                      error={this.state.formErrors.vehicles}
                    >
                      {t("OneMustBeSelectedAtLeast")}
                    </FormHelperText>
                  </div>
                  <Divider style={{ marginBottom: 10 }} />
                  <List className={classes.listRoot}>
                    <ListItem style={{ padding: 0 }}>
                      <Fab
                        size="small"
                        color="default"
                        onClick={this.handleOpenVehicles}
                      >
                        <PlusIcon />
                      </Fab>
                      <ListItemText
                        inset
                        primary={
                          t("vehicles") +
                          (newAgendaEvent.drivers.length !== 0
                            ? ": " + newAgendaEvent.drivers.length
                            : "")
                        }
                        secondary={t("DragThePersonToAssignDriver")}
                      />
                      {
                        <IconButton
                          className={classnames(classes.expand, {
                            [classes.expandOpen]: this.state.showVehicles
                          })}
                          disabled={newAgendaEvent.drivers.length === 0}
                          onClick={() =>
                            this.setState({
                              showVehicles: !this.state.showVehicles
                            })
                          }
                          size="large">
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
                        {newAgendaEvent.drivers.map((vehicle, index) => (
                          <Droppable
                            ignoreContainerClipping
                            key={index}
                            droppableId={index.toString()}
                            type="PERSON"
                          >
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                style={{
                                  backgroundColor: snapshot.isDraggingOver
                                    ? theme.palette.primary.main
                                    : "inherit",
                                  borderRadius: 15,
                                  transition: "background-color 250ms linear"
                                }}
                                {...provided.droppableProps}
                              >
                                <ListItem
                                  key={vehicle.id}
                                  className={classes.nested}
                                >
                                  <ListItemIcon>
                                    <ChevronIcon />
                                  </ListItemIcon>
                                  <ListItemText inset primary={vehicle.plate} />
                                  <ListItemText
                                    inset
                                    primary={
                                      vehicle.driver
                                        ? vehicle.driver.name
                                        : t("withoutAssignedDriver")
                                    }
                                  />
                                </ListItem>
                                <span hidden>{provided.placeholder}</span>
                              </div>
                            )}
                          </Droppable>
                        ))}
                      </List>
                    </Collapse>
                  </List>
                </Grid>
              </Grid>
            </Paper>
          </DragDropContext>
          <DataTableDialog
            open={openDialogEnterprises}
            onConfirm={this.handleEnterpriseSelected}
            onClose={() => this.setState({ openDialogEnterprises: false })}
            title={t("visitEnterprise")}
            subTitle={t("SelectVisitEnterprise")}
            loadDataFunction={ApiHandler.EasyAccess.Enterprise.getEnterprises}
            rowsSelected={
              !isNullOrUndefined(newAgendaEvent.enterprise)
                ? [newAgendaEvent.enterprise]
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
                  sortDirection: "asc"
                }
              }
            ]}
          />
          <DataTableDialog
            open={openDialogHost}
            onConfirm={this.handleHostSelected}
            onClose={() => this.setState({ openDialogHost: false })}
            title={t("Host")}
            subTitle={t("SelectHost")}
            loadDataFunction={ApiHandler.EasyAccess.Persons.getPersons}
            rowsSelected={
              !isNullOrUndefined(newAgendaEvent.host)
                ? [newAgendaEvent.host]
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
                  sortDirection: "asc"
                }
              },
              {
                name: t("LastName"),
                field: "lastname",
                options: {
                  filter: true,
                  sort: true
                }
              }
            ]}
          />
          <DataTableDialog
            open={openDialogPersons}
            onConfirm={this.handlePersonsSelected}
            onClose={() => this.setState({ openDialogPersons: false })}
            title={t("ManagePersons")}
            subTitle={t("SelectManagePersons")}
            loadDataFunction={ApiHandler.EasyAccess.Persons.getPersons}
            rowsSelected={newAgendaEvent.persons}
            multipleSelect={true}
            columns={[
              {
                name: t("name"),
                field: "name",
                options: {
                  filter: true,
                  sort: true,
                  sortDirection: "asc"
                }
              },
              {
                name: t("LastName"),
                field: "lastname",
                options: {
                  filter: true,
                  sort: true
                }
              },
              {
                name: t("dni"),
                field: "document",
                options: {
                  filter: true,
                  sort: true
                }
              }
            ]}
          />
          <DataTableDialog
            open={openDialogVehicles}
            onConfirm={this.handleVehiclesSelected}
            onClose={() => this.setState({ openDialogVehicles: false })}
            title={t("vehicles")}
            subTitle={t("SelectVehicleToAssign")}
            loadDataFunction={ApiHandler.EasyAccess.Vehicles.getVehicles}
            rowsSelected={newAgendaEvent.drivers.map(d => {
              return { id: d.vehicleId };
            })}
            multipleSelect={true}
            enableCreate
            createData={{
              title: t("NewVehicle"),
              onCreate: () => this.setState({ openDialogNewVehicle: true })
            }}
            columns={[
              {
                name: t("Plate"),
                field: "plate",
                options: {
                  filter: true,
                  sort: true,
                  sortDirection: "asc"
                }
              },
              {
                name: t("enterprise"),
                field: "enterprise",
                options: {
                  sort: true,
                  filter: true
                }
              }
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
              onCreate={() => this.setState({ openDialogNewVehicle: false })}
            /> */}
          </Dialog>
        </div>
      </div>)
    );
  }
}

// const NavigationConnected = connect(mapStateToProps, mapDispatchToProps)(Navigation)

NewAgendaEvent.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withTranslation()(
  withStyles(styles, { withTheme: true })(NewAgendaEvent)
);
