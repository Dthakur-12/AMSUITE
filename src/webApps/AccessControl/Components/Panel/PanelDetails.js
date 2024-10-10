import React, { Component } from "react";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import { withStyles } from '@mui/styles';
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import { emphasize } from "@mui/system";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { isNullOrUndefined } from "util";
import PlusIcon from "@mui/icons-material/AddRounded";
import PanelIcon from "@mui/icons-material/ControlPointDuplicate";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import LinearProgress from "@mui/material/LinearProgress";
import { List } from "@mui/material";
import { isValueEmptyOrNull } from "../../../../utils/HelperFunctions";
import SnackbarHandler from "../../../../utils/SnackbarHandler";
import NavBarAccesControl from "../../utils/NavBarAccessControl";
import Fab from "@mui/material/Fab";
import { withTranslation } from "react-i18next";

import {
  requestEditPanel,
  requestCreatePanel,
  requestGetById,
} from "../../../../actions/AccessControl/panel_actions";
import moment from "moment";
import { requestBadges } from "../../../../actions/EasyAccess/Badges_actions";
import { connect } from "react-redux";
import {
  TileLayer,
  LayersControl,
  FeatureGroup,
  Marker,
  MapContainer,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import L from "leaflet";
import { socketIO } from "../../../../utils/WebSockets";
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});
//import { purple } from "@mui/material/colors";
const formValues = {
  panelID: "",
  name: "",
  active: false,
  deferred: false,
  entry: "",
  exit: "",
  id: "",
  badge: undefined,
};

const CustomSwitch = withStyles({
  switchBase: {
    color: "#bdbdbd !important",
    "&$checked": {
      color: "#296084 !important",
    },
  },
  checked: {},
  bar: {
    "&$checked": {
      backgroundColor: "#296084 !important",
      opacity: "1 !important",
    },
  },
})(Switch);

class NewPanel extends Component {
  constructor(props) {
    super(props);
    const { initValues } = props;

    this.state = {
      openDialogBadges: false,
      newPanel: initValues ? initValues : formValues,
      entranceReader: false,
      exitReader: false,
      active: false,
      deferred: false,
      formErrors: {},
      isLoadingTracking: true,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.i18n.language !== prevState.language ||
      nextProps.successGetById !== prevState.successGetById ||
      nextProps.successCreatePanel !== prevState.successCreatePanel ||
      nextProps.successEditPanel !== prevState.successEditPanel
    ) {
      return {
        language: nextProps.i18n.language,
        successGetById: nextProps.successGetById,
        successCreatePanel: nextProps.successCreatePanel,
        successEditPanel: nextProps.successEditPanel,
      };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    const { t } = this.props;
    if (
      this.state.successEditPanel &&
      prevState.successEditPanel !== this.state.successEditPanel
    ) {
      this.setState({
        isCreating: false,
        isSuccess: true,
      });
      SnackbarHandler.showMessage(t("SuccessEditPanel"));
      setTimeout(() => {
        this.setState({
          isSuccess: false,
          isCreating: false,
          newPanel: formValues,
          entranceReader: false,
          exitReader: false,
          active: false,
          deferred: false,
        });
        this.props.updateParent();
        this.props.onEdit();
      }, 500);
    }
    if (
      this.state.successCreatePanel &&
      prevState.successCreatePanel !== this.state.successCreatePanel
    ) {
      this.setState({
        isCreating: false,
        isSuccess: true,
      });
      SnackbarHandler.showMessage(t("SuccessCreatePanel"));
      setTimeout(() => {
        this.setState({
          isSuccess: false,
          isCreating: false,
          newPanel: formValues,
          entranceReader: false,
          exitReader: false,
          active: false,
          deferred: false,
        });
        this.actualizeReadersName("");
      }, 1000);
    }
    if (
      this.state.successGetById &&
      prevState.successGetById !== this.state.successGetById
    ) {
      const { panelById } = this.props;
      this.setState(
        (prevState) => ({
          newPanel: {
            ...prevState.newPanel,
            entranceReader: panelById.entranceName,
            exitReader: panelById.exitName,
            active: panelById.active,
            badge: { id: panelById.badgeId, number: panelById.badgeNumber },
          },
          entranceReader: !isValueEmptyOrNull(panelById.entranceName),
          exitReader: !isValueEmptyOrNull(panelById.exitName),
          active: panelById.active,
          deferred: panelById.mode === 1,
        }),
        () => this.initReadersName(this.state.newPanel.name)
      );
    }
  }

  actualizeReadersName = (value) => {
    const { t } = this.props;
    this.setState((prevState) => ({
      newPanel: {
        ...prevState.newPanel,
        entranceReader: `${value} ${t("EntranceReaderNameEnd")}`,
        exitReader: `${value} ${t("ExitReaderNameEnd")}`,
      },
    }));
  };

  initReadersName = (value) => {
    const { t } = this.props;
    this.setState((prevState) => ({
      newPanel: {
        ...prevState.newPanel,
        entranceReader: isNullOrUndefined(prevState.newPanel.entranceReader)
          ? `${value} ${t("EntranceReaderNameEnd")}`
          : prevState.newPanel.entranceReader,
        exitReader: isNullOrUndefined(prevState.newPanel.exitReader)
          ? `${value} ${t("ExitReaderNameEnd")}`
          : prevState.newPanel.exitReader,
      },
    }));
  };

  componentWillUnmount() {
    socketIO.emit("unsubscribeLiveTracking");
    window.removeEventListener("resize", this.updateScreenMode);
  }

  updateScreenMode = () => {
    this.setState({ isDesktop: window.innerWidth > 900 });
  };

  componentDidMount() {
    this.updateScreenMode();
    const { currentUser } = this.props;
    const { newPanel } = this.state;
    NavBarAccesControl.hideLoader();
    if (this.props.isEdit || this.props.isDetails) {
      this.props.requestGetById(newPanel.id);
    }
    socketIO.emit("subscribeLiveTracking", newPanel.id, currentUser.token);
    const loadLiveTracking = this.loadLiveTracking;
    socketIO.on("trackingPanel", function (data) {
      loadLiveTracking(data);
    });
  }

  loadLiveTracking = (data) => {
    if (data.message !== "") {
      this.setState({
        isLoadingTracking: false,
        position: [
          parseFloat(data.message.latitude.replace(",", ".")),
          parseFloat(data.message.longitude.replace(",", ".")),
        ],
        speed: data.message.speed,
        lastUpdate: moment(data.message.date).format("HH:mm DD/MM/YYYY"),
      });
    } else {
      this.setState({ isLoadingTracking: false });
    }
  };

  renderBadge = () => {
    const { classes, isDetails, t } = this.props;
    const { newPanel } = this.state;

    return (
      <List className={classes.listRoot}>
        <ListItem style={{ padding: 0 }}>
          {!isDetails && (
            <Fab
              size="small"
              className={classes.customFab}
              onClick={this.handleOpenBadges}
            >
              <PlusIcon />
            </Fab>
          )}
          <ListItemText
            primary={newPanel.badge ? newPanel.badge.number : t("Unspecified")}
          />
        </ListItem>
      </List>
    );
  };

  render() {
    const { newPanel, isLoadingTracking, position, lastUpdate, speed } =
      this.state;
    const { classes, isDialog, t } = this.props;

    if (this.state.isDesktop) {
      return (
        (<main className={!isDialog ? classes.layout : undefined}>
          <div className={!isDialog ? classes.fill : undefined}>
            <LinearProgress
              style={{
                opacity: this.state.isCreatinh ? "1" : "0",
                width: "100%",
                background: "none",
                borderBottomLeftRadius: 50,
                borderBottomRightRadius: 50,
              }}
              variant="query"
            />
            <Paper elevation={!isDialog ? 2 : 0} className={classes.paper}>
              <Avatar className={classes.customFab}>
                <PanelIcon />
              </Avatar>

              <Typography component="h1" variant="h5">
                {t("details")}
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
                    <div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          paddingRight: 15,
                        }}
                      >
                        <Typography component="h1" variant="subtitle1">
                          {t("AssociatedCard")}
                        </Typography>
                      </div>
                      <Divider style={{ marginBottom: 10 }} />
                      {this.renderBadge()}
                    </div>
                  </Grid>
                </Grid>
                <Grid container item xs={12} md={8} spacing={24}>
                  <Grid item xs={12} md={6} style={{ marginBottom: 5 }}>
                    <TextField
                      label={t("name")}
                      required
                      fullWidth
                      value={newPanel.name}
                      helperText={t("inputEmpty")}
                      FormHelperTextProps={{
                        style: { opacity: this.state.formErrors.name ? 1 : 0 },
                      }}
                      error={this.state.formErrors.name}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={3} style={{ marginBottom: 5 }}>
                    <FormControlLabel
                      control={
                        <CustomSwitch
                          checked={this.state.active}
                          value={newPanel.active}
                          color="primary"
                        />
                      }
                      labelPlacement="end"
                      label={t("Active")}
                      style={{ marginTop: "6%", cursor: "default" }}
                      disabled={true}
                    />
                  </Grid>
                  <Grid item xs={12} md={3} style={{ marginBottom: 5 }}>
                    <FormControlLabel
                      control={
                        <CustomSwitch
                          checked={this.state.deferred}
                          value={this.state.deferred}
                          color="primary"
                        />
                      }
                      labelPlacement="end"
                      label={t("Deferred")}
                      style={{ marginTop: "6%", cursor: "default" }}
                      disabled={true}
                    />
                  </Grid>

                  <Grid container style={{ marginBottom: 5, marginLeft: 12 }}>
                    <Typography variant="h6" style={{ width: "100%" }}>
                      {t("ReaderConfiguration")}
                    </Typography>
                    <Grid item xs={12} md={12}>
                      <Grid
                        style={{
                          width: "100%",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Grid item xs={12} md={4}>
                          <FormControlLabel
                            control={
                              <CustomSwitch
                                checked={this.state.entranceReader}
                                value={this.state.entranceReader}
                                color="primary"
                              />
                            }
                            labelPlacement="end"
                            label={t("EntranceReader")}
                            style={{
                              cursor: "default",
                              margin: 0,
                              marginLeft: "-15px",
                            }}
                            disabled={true}
                          />
                        </Grid>
                        <Grid item xs={12} md={8}>
                          {this.state.entranceReader && (
                            <TextField
                              id="outlined-dense"
                              label={t("name")}
                              className={classes.readersName}
                              margin="dense"
                              variant="outlined"
                              value={
                                !isNullOrUndefined(
                                  this.state.newPanel.entranceReader
                                )
                                  ? this.state.newPanel.entranceReader
                                  : ""
                              }
                              name={"entranceReader"}
                              error={this.state.formErrors.entranceReader}
                              InputProps={{
                                readOnly: true,
                              }}
                            />
                          )}
                        </Grid>
                      </Grid>
                      <Grid
                        style={{
                          width: "100%",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Grid item xs={12} md={4}>
                          <FormControlLabel
                            control={
                              <CustomSwitch
                                checked={this.state.exitReader}
                                value={this.state.exitReader}
                                color="primary"
                              />
                            }
                            labelPlacement="end"
                            label={t("ExitReader")}
                            style={{
                              cursor: "default",
                              margin: 0,
                              marginLeft: "-15px",
                            }}
                            disabled={true}
                          />
                        </Grid>
                        <Grid item xs={12} md={8}>
                          {this.state.exitReader && (
                            <TextField
                              id="outlined-dense"
                              label={t("name")}
                              className={classes.readersName}
                              margin="dense"
                              variant="outlined"
                              value={
                                !isNullOrUndefined(
                                  this.state.newPanel.exitReader
                                )
                                  ? this.state.newPanel.exitReader
                                  : ""
                              }
                              name={"exitReader"}
                              error={this.state.formErrors.exitReader}
                              InputProps={{
                                readOnly: true,
                              }}
                            />
                          )}
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                {isLoadingTracking ? (
                  <Grid item xs={12} md={12}>
                    <Typography
                      variant="h6"
                      style={{ display: "flex", justifyContent: "center" }}
                    >
                      {`${t("Loading")} GPS...`}
                    </Typography>
                  </Grid>
                ) : position && !isNaN(position[0]) && !isNaN(position[1]) ? (
                  <Grid item xs={12} md={12}>
                    <Typography
                      variant="h6"
                      style={{ display: "flex", justifyContent: "center" }}
                    >
                      {`${t("LastUpdate")} ${lastUpdate}`}
                    </Typography>
                    <div
                      style={{
                        width: "100%",
                        height: 400,
                        justifyContent: "center",
                        display: "flex",
                        marginBottom: 20,
                      }}
                    >
                      <MapContainer
                        center={position}
                        zoom={15}
                        style={{
                          marginBottom: 64,
                          // padding: "15px 35px 0px 20px",
                          position: "absolute",
                          height: "50%",
                          width: "90%",
                          bounds: 12,
                          maxBounds: 12,
                        }}
                      >
                        <LayersControl position="topright">
                          <LayersControl.BaseLayer name="OpenStreetMap.BlackAndWhite">
                            <TileLayer
                              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                              url="https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png"
                            />
                          </LayersControl.BaseLayer>
                          <LayersControl.BaseLayer name="OpenStreetMap.Color">
                            <TileLayer
                              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                          </LayersControl.BaseLayer>
                          <TileLayer
                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                          />
                        </LayersControl>
                        <FeatureGroup></FeatureGroup>
                        {position && <Marker position={position}></Marker>}
                      </MapContainer>
                    </div>
                  </Grid>
                ) : (
                  <Grid item xs={12} md={12}>
                    <Typography
                      variant="h6"
                      style={{ display: "flex", justifyContent: "center" }}
                    >
                      {`${t("NoInformation")} gps`}
                    </Typography>
                  </Grid>
                )}
              </Grid>
            </Paper>
          </div>
        </main>)
      );
    } else {
      return (
        (<main className={!isDialog ? classes.layout : undefined}>
          <div className={!isDialog ? classes.fill : undefined}>
            <LinearProgress
              style={{
                opacity: this.state.isCreatinh ? "1" : "0",
                width: "100%",
                background: "none",
                borderBottomLeftRadius: 50,
                borderBottomRightRadius: 50,
              }}
              variant="query"
            />
            <Paper elevation={!isDialog ? 2 : 0} className={classes.paper}>
              <Avatar className={classes.customFab}>
                <PanelIcon />
              </Avatar>

              <Typography component="h1" variant="h5">
                {t("details")}
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
                    <div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          paddingRight: 15,
                        }}
                      >
                        <Typography component="h1" variant="subtitle1">
                          {t("AssociatedCard")}
                        </Typography>
                      </div>
                      <Divider style={{ marginBottom: 10 }} />
                      {this.renderBadge()}
                    </div>
                  </Grid>
                </Grid>
                <Grid item xs={12} md={8} spacing={24}>
                  <TextField
                    label={t("name")}
                    required
                    fullWidth
                    value={newPanel.name}
                    helperText={t("inputEmpty")}
                    FormHelperTextProps={{
                      style: { opacity: this.state.formErrors.name ? 1 : 0 },
                    }}
                    error={this.state.formErrors.name}
                    InputProps={{
                      readOnly: true,
                    }}
                  />

                  <Grid style={{ marginBottom: 5 }}>
                    <FormControlLabel
                      control={
                        <CustomSwitch
                          checked={this.state.active}
                          value={newPanel.active}
                          color="primary"
                        />
                      }
                      labelPlacement="end"
                      label={t("Active")}
                      style={{ marginTop: "6%", cursor: "default" }}
                      disabled={true}
                    />
                  </Grid>
                  <Grid style={{ marginBottom: 5 }}>
                    <FormControlLabel
                      control={
                        <CustomSwitch
                          checked={this.state.deferred}
                          value={this.state.deferred}
                          color="primary"
                        />
                      }
                      labelPlacement="end"
                      label={t("Deferred")}
                      style={{ marginTop: "6%", cursor: "default" }}
                      disabled={true}
                    />
                  </Grid>

                  <Grid container>
                    <Typography variant="h6" style={{ width: "100%" }}>
                      {t("ReaderConfiguration")}
                    </Typography>
                    <Grid item xs={12} md={12}>
                      <Grid
                        style={{
                          width: "100%",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Grid item xs={12} md={4}>
                          <FormControlLabel
                            control={
                              <CustomSwitch
                                checked={this.state.entranceReader}
                                value={this.state.entranceReader}
                                color="primary"
                              />
                            }
                            labelPlacement="end"
                            label={t("EntranceReader")}
                            style={{
                              cursor: "default",
                              margin: 0,
                              marginLeft: "-15px",
                            }}
                            disabled={true}
                          />
                        </Grid>
                        <Grid item xs={12} md={8}>
                          {this.state.entranceReader && (
                            <TextField
                              id="outlined-dense"
                              label={t("name")}
                              className={classes.readersName}
                              margin="dense"
                              variant="outlined"
                              value={
                                !isNullOrUndefined(
                                  this.state.newPanel.entranceReader
                                )
                                  ? this.state.newPanel.entranceReader
                                  : ""
                              }
                              name={"entranceReader"}
                              error={this.state.formErrors.entranceReader}
                              InputProps={{
                                readOnly: true,
                              }}
                            />
                          )}
                        </Grid>
                      </Grid>
                      <Grid
                        style={{
                          width: "100%",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Grid item xs={12} md={4}>
                          <FormControlLabel
                            control={
                              <CustomSwitch
                                checked={this.state.exitReader}
                                value={this.state.exitReader}
                                color="primary"
                              />
                            }
                            labelPlacement="end"
                            label={t("ExitReader")}
                            style={{
                              cursor: "default",
                              margin: 0,
                              marginLeft: "-15px",
                            }}
                            disabled={true}
                          />
                        </Grid>
                        <Grid item xs={12} md={8}>
                          {this.state.exitReader && (
                            <TextField
                              id="outlined-dense"
                              label={t("name")}
                              className={classes.readersName}
                              margin="dense"
                              variant="outlined"
                              value={
                                !isNullOrUndefined(
                                  this.state.newPanel.exitReader
                                )
                                  ? this.state.newPanel.exitReader
                                  : ""
                              }
                              name={"exitReader"}
                              error={this.state.formErrors.exitReader}
                              InputProps={{
                                readOnly: true,
                              }}
                            />
                          )}
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                {isLoadingTracking ? (
                  <Grid item xs={12} md={12}>
                    <Typography
                      variant="h6"
                      style={{ display: "flex", justifyContent: "center" }}
                    >
                      {`${t("Loading")} GPS...`}
                    </Typography>
                  </Grid>
                ) : position && !isNaN(position[0]) && !isNaN(position[1]) ? (
                  <Grid item xs={12} md={12}>
                    <Typography
                      variant="h6"
                      style={{ display: "flex", justifyContent: "center" }}
                    >
                      {`${t("LastUpdate")} ${lastUpdate}`}
                    </Typography>
                    <div
                      style={{
                        width: "100%",
                        height: 400,
                        justifyContent: "center",
                        display: "flex",
                        marginBottom: 20,
                      }}
                    >
                      <MapContainer
                        center={position}
                        zoom={15}
                        style={{
                          // padding: "15px 35px 0px 20px",
                          //position: "absolute",
                          height: "100%",
                          width: "100%",
                          bounds: 12,
                          maxBounds: 12,
                        }}
                      >
                        <LayersControl position="topright">
                          <LayersControl.BaseLayer name="OpenStreetMap.BlackAndWhite">
                            <TileLayer
                              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                              url="https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png"
                            />
                          </LayersControl.BaseLayer>
                          <LayersControl.BaseLayer name="OpenStreetMap.Color">
                            <TileLayer
                              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                          </LayersControl.BaseLayer>
                          <TileLayer
                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                          />
                        </LayersControl>
                        <FeatureGroup></FeatureGroup>
                        {position && <Marker position={position}></Marker>}
                      </MapContainer>
                    </div>
                  </Grid>
                ) : (
                  <Grid item xs={12} md={12}>
                    <Typography
                      variant="h6"
                      style={{ display: "flex", justifyContent: "center" }}
                    >
                      {`${t("NoInformation")} gps`}
                    </Typography>
                  </Grid>
                )}
              </Grid>
            </Paper>
          </div>
        </main>)
      );
    }
  }
}

NewPanel.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};
// const InitalConnected = connect(null, mapDispatchToProps)(Init)

const styles = (theme) => ({
  layout: {
    width: "auto",
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(900 + theme.spacing.unit * 2 * 2)]: {
      width: 800,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  fill: {
    marginTop: theme.spacing.unit * 6,
  },
  paper: {
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${
      theme.spacing.unit * 3
    }px`,
    [theme.breakpoints.up(900 + theme.spacing.unit * 3 * 2)]: {
      marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3,
    },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit,
  },
  input: {
    display: "flex",
    padding: 0,
  },
  //Select css
  valueContainer: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    overflow: "hidden",
  },
  chip: {
    margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
  },
  chipFocused: {
    backgroundColor: emphasize(
      theme.palette.mode === "light"
        ? theme.palette.grey[300]
        : theme.palette.grey[700],
      0.08
    ),
  },
  noOptionsMessage: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
  singleValue: {
    fontSize: 16,
    width: "100%",
  },
  placeholder: {
    position: "absolute",
    left: 2,
    fontSize: 16,
  },
  paperSelect: {
    position: "absolute",
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.grey[300],
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  listRoot: {
    width: "100%",
    //backgroundColor: theme.palette.background.paper,
    padding: 0,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
  grid: {
    paddingBottom: "0px !important",
    paddingTop: "0px !important",
  },
  expand: {
    transform: "rotate(0deg)",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  readersName: {
    "& input": {
      padding: 10,
    },
    marginLeft: 20,
    width: "90%",
  },
  customFab: {
    color: theme.palette.text.main,
    background: theme.palette.primary.main,
  },
});

const mapStateToProps = ({ Panel, Badges, User }) => {
  return {
    currentUser: User.currentUser,
    successEditPanel: Panel.successEditPanel,
    successCreatePanel: Panel.successCreatePanel,
    successGetById: Panel.successGetById,
    loading: Panel.loading,
    panelById: Panel.panelById,
    badges: Badges.badges,
    successBadges: Badges.successBadges,
    loadingBadges: Badges.loading,
  };
};

const mapDispatchToPrps = {
  requestEditPanel,
  requestBadges,
  requestCreatePanel,
  requestGetById,
};

const newPanelConnected = connect(mapStateToProps, mapDispatchToPrps)(NewPanel);

export default withTranslation()(
  withStyles(styles, { withTheme: true })(newPanelConnected)
);
