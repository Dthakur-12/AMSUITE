import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from '@mui/styles';
import {
  IconButton,
  Typography,
  Paper,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  CircularProgress,
  Chip,
  Dialog,
  Slide
} from "@mui/material";
import LabelIcon from "@mui/icons-material/BookmarkRounded";
import AgendaIcon from "@mui/icons-material/CalendarTodayRounded";
import PencilIcon from "@mui/icons-material/EditRounded";
import DeleteIcon from "@mui/icons-material/DeleteRounded";
import ApiHandler from "../../../../services/ApiHandler";
import classnames from "classnames";
import Collapse from "@mui/material/Collapse";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ChevronIcon from "@mui/icons-material/ChevronRightRounded";
import { parseDate } from "../../../../utils/HelperFunctions";
import ConfirmationDialog from "../../../Shared/ConfirmationDialog";
import NewAgendaEvent from "./NewAgendaEvent";
import { withTranslation } from "react-i18next";
import styles from "../../../assets/styles/EasyAccess_styles/Agenda_styles/detailsAgendaEventStyles.js";
function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class DetailsAgendaEvent extends Component {
  constructor(props) {
    super(props);
    const { initValues, updateParent } = props;
    this.state = {
      showPersons: true,
      showVehicles: true,
      agendaEvent: initValues,
      formErrors: {},
      isLoading: true,
      updateParent: updateParent,
      openDeleteDialog: false,
      openEditEventDialog: false
    };
  }

  componentDidMount() {
    const { agendaEvent } = this.state;
    ApiHandler.EasyAccess.Calendar.getAgendaEventById(agendaEvent.id)
      .then(({ data }) => {
        this.setState(prevState => ({
          agendaEvent: {
            ...prevState.agendaEvent,
            enterprise: data.enterprise,
            persons: data.persons,
            drivers: data.drivers,
            host: data.host,
            status: data.status.name
          },
          isLoading: false
        }));
      })
      .catch(err => {
        console.log(err);
      });
  }

  renderItem = (label, value) => {
    return (
      <span
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          width: "100%"
        }}
      >
        <Typography
          variant="subtitle2"
          style={{ marginRight: 5, fontWeight: "bold" }}
        >
          {label}
        </Typography>
        <Typography variant="body2">{value}</Typography>
      </span>
    );
  };

  handleDelete = () => {
    this.setState({
      openDeleteDialog: true
    });
  };

  handleEdit = () => {
    this.setState({
      openEditEventDialog: true
    });
  };

  render() {
    const {
      agendaEvent,
      isLoading,
      openDeleteDialog,
      openEditEventDialog
    } = this.state;
    const { classes, t } = this.props;

    return (
      (<Paper className={classes.paper} elevation={0}>
        <span
          style={{
            display: "flex",
            minHeight: "fit-content",
            width: "100%",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Chip
            icon={<LabelIcon />}
            label={isLoading ? `${t("Loading")}...` : agendaEvent.status}
            className={classes.chip}
            color="primary"
            title={t("status")}
            style={{ position: "absolute", left: 0, marginLeft: "5%" }}
          />
          <Avatar className={classes.avatar}>
            <AgendaIcon />
          </Avatar>
          <span style={{ position: "absolute", right: 0 }}>
            <IconButton onClick={this.handleEdit} size="large">
              <PencilIcon color="action" />
            </IconButton>
            <IconButton onClick={this.handleDelete} size="large">
              <DeleteIcon color="action" />
            </IconButton>
          </span>
        </span>
        <Typography component="h1" variant="h5">
          {agendaEvent.title}
        </Typography>
        <List className={classes.listRoot}>
          <ListItem>
            {this.renderItem(`${t("Place")}:`, agendaEvent.place)}
          </ListItem>
          <ListItem>
            {this.renderItem(`${t("Since")}:`, parseDate(agendaEvent.start))}
          </ListItem>
          <ListItem>
            {this.renderItem(`${t("To")}:`, parseDate(agendaEvent.end))}
          </ListItem>
          <ListItem
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              width: "50%"
            }}
          >
            {this.renderItem(`${t("description")}:`, "")}
            <Typography
              style={{ paddingLeft: "10%" }}
              component="h1"
              variant="subtitle2"
            >
              {agendaEvent.description}
            </Typography>
          </ListItem>
        </List>
        <List
          className={classes.listRoot}
          style={{ marginBottom: 50, alignItems: "flex-start" }}
        >
          <ListItem>
            {this.renderItem(
              t("visitEnterprise"),
              isLoading
                ? `${t("Loading")}...`
                : agendaEvent.enterprise
                ? agendaEvent.enterprise.name
                : t("Unspecified")
            )}
            {this.renderItem(
              t("Host"),
              isLoading
                ? `${t("Loading")}...`
                : agendaEvent.host
                ? agendaEvent.host.name + " " + agendaEvent.host.lastname
                : t("Unspecified")
            )}
          </ListItem>
          <ListItem style={{ alignItems: "flex-start" }}>
            <span
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                alignItems: isLoading ? "center" : "flex-start"
              }}
            >
              <span
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  width: "100%",
                  justifyContent: "space-between"
                }}
              >
                <span style={{ display: "flex" }}>
                  <Typography
                    variant="subtitle2"
                    style={{ marginRight: 5, fontWeight: "bold" }}
                  >
                    {`${t("PersonInEvent")}: `}
                  </Typography>
                  <Typography variant="body2">
                    {agendaEvent.persons.length}
                  </Typography>
                </span>
                {isLoading && (
                  <CircularProgress
                    thickness={4}
                    size={18}
                    disableShrink
                    variant="indeterminate"
                    style={{
                      animationDuration: "550ms",
                      color: "white",
                      marginRight: 15
                    }}
                  />
                )}
              </span>
              {agendaEvent.persons.length !== 0 && (
                <List className={classes.listRoot}>
                  <ListItem style={{ padding: 0 }}>
                    <ListItemText
                      primaryTypographyProps={{ variant: "body2" }}
                      primary={t("Persons")}
                    />
                    <IconButton
                      className={classnames(classes.expand, {
                        [classes.expandOpen]: this.state.showPersons
                      })}
                      disabled={agendaEvent.persons.length === 0}
                      onClick={() =>
                        this.setState({ showPersons: !this.state.showPersons })
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
                      {agendaEvent.persons.map((person, index) => (
                        <ListItem key={person.id} style={{ padding: 0 }}>
                          <ListItemIcon>
                            <ChevronIcon />
                          </ListItemIcon>
                          <ListItemText
                            inset
                            primary={person.name + " " + person.lastname}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Collapse>
                </List>
              )}
            </span>
            <span
              style={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                alignItems: isLoading ? "center" : "flex-start"
              }}
            >
              <span
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  width: "100%",
                  justifyContent: "space-between"
                }}
              >
                <span style={{ display: "flex" }}>
                  <Typography
                    variant="subtitle2"
                    style={{ marginRight: 5, fontWeight: "bold" }}
                  >
                    {`${t("VehicleAssignedInEvent")}: `}
                  </Typography>
                  <Typography variant="body2">
                    {agendaEvent.drivers.length}
                  </Typography>
                </span>
                {isLoading && (
                  <CircularProgress
                    thickness={4}
                    size={18}
                    disableShrink
                    variant="indeterminate"
                    style={{ animationDuration: "550ms", color: "white" }}
                  />
                )}
              </span>

              {agendaEvent.drivers.length !== 0 && (
                <List className={classes.listRoot}>
                  <ListItem style={{ padding: 0 }}>
                    <ListItemText primary={t("vehicles")} />
                    {
                      <IconButton
                        className={classnames(classes.expand, {
                          [classes.expandOpen]: this.state.showVehicles
                        })}
                        disabled={agendaEvent.drivers.length === 0}
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
                      {agendaEvent.drivers.map((driver, index) => (
                        <ListItem key={index} style={{ padding: 0 }}>
                          <ListItemIcon>
                            <ChevronIcon />
                          </ListItemIcon>
                          <ListItemText inset primary={driver.vehicle.plate} />
                          <ListItemText
                            inset
                            primary={
                              driver.person
                                ? driver.person.name +
                                  " " +
                                  driver.person.lastname
                                : t("withoutAssignedDriver")
                            }
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Collapse>
                </List>
              )}
            </span>
          </ListItem>
        </List>
        <ConfirmationDialog
          title={t("DeleteEvent")}
          body={`${t("TheEventWillBeDeleted")} ${agendaEvent.title}, ${t(
            "continue"
          )}`}
          deleteFunction={ApiHandler.EasyAccess.Calendar.deleteEvent}
          elementId={agendaEvent.id}
          updateParentFunction={() => {
            this.props.updateParent();
            this.props.onClose();
          }}
          open={openDeleteDialog}
          onClose={() => this.setState({ openDeleteDialog: false })}
        />
        <Dialog
          fullScreen
          onClose={() => this.setState({ openEditEventDialog: false })}
          TransitionComponent={Transition}
          open={openEditEventDialog}
        >
          <NewAgendaEvent
            onConfirm={() => this.setState({ openEditEventDialog: false })}
            onClose={() => this.setState({ openEditEventDialog: false })}
            dates={this.state.newAgendaEventDates}
            updateParent={() => this.props.updateParent()}
            initValues={agendaEvent}
            isEdit
          />
        </Dialog>
      </Paper>)
    );
  }
}

// const NavigationConnected = connect(mapStateToProps, mapDispatchToProps)(Navigation)

DetailsAgendaEvent.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withTranslation()(
  withStyles(styles, { withTheme: true })(DetailsAgendaEvent)
);
