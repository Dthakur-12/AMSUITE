import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import LinearProgress from "@mui/material/LinearProgress";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import { withStyles } from '@mui/styles';
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import MessageIcon from "@mui/icons-material/MailOutline";
import AlarmIcon from "@mui/icons-material/NotificationImportant";
import PersonIcon from "@mui/icons-material/Person";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { isNullOrUndefined } from "util";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import Moment from "moment/min/moment-with-locales";
import {
  parseDate2,
  isValueEmptyOrNull,
} from "../../../../utils/HelperFunctions";
import {
  requestGetAccessImage,
  requestGetPersonImage,
} from "../../../../actions/AccessControl/eventMonitoring_actions";
import styles from "../../../../assets/styles/AccessControl_styles/EventMonitoring_styles/eventDetailsStyles";
import { autofill } from "redux-form";
import Message from "../../../Shared/WebChat/Message";
//
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

const mapStateToProps = ({ EventMonitoring }) => ({
  successAccessImage: EventMonitoring.successAccessImage,
  successPersonImage: EventMonitoring.successPersonImage,
  personImage: EventMonitoring.personImage,
  accessImage: EventMonitoring.accessImage,
});

const mapDispatchToProps = { requestGetAccessImage, requestGetPersonImage };

const AnyReactComponent = ({ text, lat, lng, msgText }) => (
  <div>
    {text}
    {!(lat && lng) ? msgText : ""}
  </div>
);

class EventDetails extends Component {
  constructor(props) {
    super(props);
    const { event } = props;
    this.state = {
      eventDetails: event,
      position: {
        lat: event.latitude
          ? parseFloat(event.latitude.replace(",", "."))
          : undefined,
        lng: event.longitude
          ? parseFloat(event.longitude.replace(",", "."))
          : undefined,
      },
      zoom: 15,
      isVerticalPersonImage: undefined,
      isVerticalAccessImage: undefined,
    };
  }

  componentWillUnmount() {
    socketIO.emit("unsubscribeChanges");
    window.removeEventListener("resize", this.updateScreenMode);
  }

  updateScreenMode = () => {
    this.setState({ isDesktop: window.innerWidth > 900 });
  };

  componentDidMount() {
    this.updateScreenMode();
    const { eventDetails } = this.state;
    const { event } = this.props;
    this.props.requestGetAccessImage(eventDetails.id);
    this.props.requestGetPersonImage(eventDetails.personId);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.successAccessImage !== prevState.successAccessImage ||
      nextProps.successPersonImage !== prevState.successPersonImage
    ) {
      return {
        successAccessImage: nextProps.successAccessImage,
        successPersonImage: nextProps.successPersonImage,
        personImage: nextProps.personImage,
        accessImage: nextProps.accessImage,
      };
    } else return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.personImage !== this.state.personImage)
      this.isVertical(
        `data:image/jpeg;base64,${this.state.personImage}`,
        "isVerticalPersonImage"
      );
    if (prevState.accessImage !== this.state.accessImage)
      this.isVertical(
        `data:image/jpeg;base64,${this.state.accessImage}`,
        "isVerticalAccessImage"
      );
  }

  getImageSize = (image) => {
    return new Promise((resolve, reject) => {
      let img = new Image();
      img.onload = () => resolve({ height: img.height, width: img.width });
      img.onerror = reject;
      img.src = image;
    });
  };

  isVertical = async (src, name) => {
    let size = await this.getImageSize(src);
    let vertical = size.height > size.width;
    this.setState((prevState) => ({ ...prevState, [name]: vertical }));
    return vertical;
  };

  render() {
    const { classes, isDialog, t } = this.props;
    const {
      eventDetails,
      personImage,
      accessImage,
      isVerticalPersonImage,
      isVerticalAccessImage,
      position,
    } = this.state;
    const language = this.props.i18n.language;

    if (this.state.isDesktop) {
      return (
        <main className={!isDialog ? classes.layout : undefined}>
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
              <Typography
                component="h1"
                variant="h5"
                style={{ marginTop: 30, marginBottom: 24 }}
              >
                {t("DetailsEvent")}
              </Typography>
              <Divider className={classes.customDivider} />

              {[0, 3, 4].includes(eventDetails.discriminator) && (
                <Grid container spacing={24}>
                  <Grid
                    container
                    spacing={24}
                    item
                    xs={12}
                    md={[0, 4].includes(eventDetails.discriminator) ? 6 : 4}
                    style={{ marginLeft: 24, maxHeight: 350 }}
                  >
                    <Grid
                      item
                      xs={12}
                      md={[0, 4].includes(eventDetails.discriminator) ? 6 : 12}
                      className={classes.grid}
                      style={{ height: "100%" }}
                    >
                      <Grid md={12} style={{ height: "80%" }}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            background: !isNullOrUndefined(personImage)
                              ? "black"
                              : "none",
                            width: "100%",
                            height: "100%",
                          }}
                        >
                          {!isNullOrUndefined(personImage) && (
                            <img
                              style={
                                isVerticalPersonImage === true
                                  ? {
                                      maxWidth: "100%",
                                      height: "100%",
                                    }
                                  : { width: "100%", maxHeight: "100%" }
                              }
                              alt="PersonImg"
                              src={`data:image/jpeg;base64,${personImage}`}
                            />
                          )}
                          {isNullOrUndefined(personImage) && (
                            <PersonIcon
                              style={{
                                height: "100%",
                                width: "100%",
                                color: "#F8FCFA",
                              }}
                            />
                          )}
                        </div>
                      </Grid>
                      <Grid md={12}>
                        <ListItem>
                          <ListItemText
                            style={{ textAlign: "center", padding: 0 }}
                            defaultCenter
                            primary={t("person")}
                          />
                        </ListItem>
                      </Grid>
                    </Grid>
                    {[0, 4].includes(eventDetails.discriminator) && (
                      <Grid
                        item
                        xs={12}
                        md={6}
                        className={classes.grid}
                        style={{ height: "100%" }}
                      >
                        <Grid md={12} style={{ height: "80%" }}>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              background: !isNullOrUndefined(personImage)
                                ? "black"
                                : "none",
                              width: "100%",
                              height: "100%",
                            }}
                          >
                            {!isNullOrUndefined(accessImage) && (
                              <img
                                style={
                                  isVerticalAccessImage === true
                                    ? {
                                        maxWidth: "100%",
                                        height: "100%",
                                      }
                                    : { width: "100%", maxHeight: "100%" }
                                }
                                alt="AccessImg"
                                src={`data:image/jpeg;base64,${accessImage}`}
                              />
                            )}
                            {isNullOrUndefined(accessImage) && (
                              <PersonIcon
                                style={{
                                  height: "100%",
                                  width: "100%",
                                  color: "#F8FCFA",
                                }}
                              />
                            )}
                          </div>
                        </Grid>
                        <Grid md={12}>
                          <ListItem>
                            <ListItemText
                              style={{ textAlign: "center", padding: 0 }}
                              defaultCenter
                              primary={t("Access")}
                            />
                          </ListItem>
                        </Grid>
                      </Grid>
                    )}
                  </Grid>
                  <Grid
                    container
                    spacing={24}
                    item
                    xs={12}
                    md={[0, 4].includes(eventDetails.discriminator) ? 6 : 8}
                  >
                    <Grid item xs={12} md={6} className={classes.grid}>
                      <TextField
                        label={t("reader")}
                        defaultValue={eventDetails.readerName}
                        fullWidth
                        disabled
                        InputLabelProps={{
                          className: classes.disabledColor,
                        }}
                        InputProps={{
                          className: classes.disabledColor,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} md={6} className={classes.grid}>
                      <TextField
                        label={t("Card")}
                        defaultValue={eventDetails.badgeNumber}
                        fullWidth
                        disabled
                        InputLabelProps={{
                          className: classes.disabledColor,
                        }}
                        InputProps={{
                          className: classes.disabledColor,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} md={6} className={classes.grid}>
                      <TextField
                        label={t("panel")}
                        defaultValue={eventDetails.panelName}
                        fullWidth
                        disabled
                        InputLabelProps={{
                          className: classes.disabledColor,
                        }}
                        InputProps={{
                          className: classes.disabledColor,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} md={6} className={classes.grid}>
                      <TextField
                        label={t("Date")}
                        value={
                          this.props.i18n.language === "es"
                            ? Moment(eventDetails.date)
                                .lang(language)
                                .format("DD/MM/YYYY HH:mm")
                            : Moment(eventDetails.date)
                                .lang(language)
                                .format("MM/DD/YYYY HH:mm")
                        }
                        fullWidth
                        disabled
                        onChange={() => undefined}
                        InputLabelProps={{
                          className: classes.disabledColor,
                        }}
                        InputProps={{
                          className: classes.disabledColor,
                        }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              )}

              {eventDetails.discriminator === 2 && (
                <Grid
                  container
                  spacing={24}
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <Grid item xs={12} md={2} className={classes.grid}>
                    <Avatar
                      className={classes.avatar}
                      style={{
                        marginRight: 20,
                        marginLeft: 30,
                        height: "65px",
                        width: "65px",
                      }}
                    >
                      <MessageIcon style={{ height: "70%", width: "70%" }} />
                    </Avatar>
                  </Grid>

                  <Grid
                    container
                    spacing={24}
                    item
                    xs={12}
                    md={6}
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <Grid item md={12} className={classes.grid}>
                      <TextField
                        label={t("Text")}
                        defaultValue={eventDetails.description}
                        fullWidth
                        disabled
                        InputLabelProps={{
                          className: classes.disabledColor,
                        }}
                        InputProps={{
                          className: classes.disabledColor,
                        }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              )}

              {eventDetails.discriminator === 1 && (
                <Grid container spacing={24}>
                  <Grid item xs={12} md={2} className={classes.grid}>
                    <Avatar
                      className={classes.avatar}
                      style={{
                        marginRight: 20,
                        marginLeft: 30,
                        height: "65px",
                        width: "65px",
                      }}
                    >
                      {this.props.isMessage ? (
                        <MessageIcon style={{ height: "70%", width: "70%" }} />
                      ) : (
                        <AlarmIcon style={{ height: "70%", width: "70%" }} />
                      )}
                    </Avatar>
                  </Grid>

                  <Grid container spacing={24} item xs={12} md={10}>
                    <Typography
                      component="h1"
                      variant="h5"
                      style={{ alignSelf: "center" }}
                    >
                      {eventDetails.description}
                    </Typography>
                    {/* <Grid item md={6} className={classes.grid}>
                    <TextField
                      label={t("Type")}
                      defaultValue={eventDetails.alarmType}
                      fullWidth
                      disabled
                      InputLabelProps={{
                        className: classes.disabledColor
                      }}
                      InputProps={{
                        className: classes.disabledColor
                      }}
                    />
                  </Grid>

                  <Grid item md={6} className={classes.grid}>
                    <TextField
                      label={t("Text")}
                      defaultValue={eventDetails.description}
                      fullWidth
                      disabled
                      InputLabelProps={{
                        className: classes.disabledColor
                      }}
                      InputProps={{
                        className: classes.disabledColor
                      }}
                    />
                  </Grid>

                  {/* <Grid item md={6} className={classes.grid}>
                    <InlineDateTimePicker
                      label={t("Date")}
                      value={eventDetails.date}
                      fullWidth
                      disabled
                      onChange={() => undefined}
                      InputLabelProps={{
                        className: classes.disabledColor
                      }}
                      InputProps={{
                        className: classes.disabledColor
                      }}
                    />
                  </Grid> */}
                  </Grid>
                </Grid>
              )}
              <Divider
                style={{ width: "100%", marginTop: 30, marginBottom: 24 }}
              />

              {!isNullOrUndefined(eventDetails.latitude) &&
                !isNullOrUndefined(eventDetails.longitude) && (
                  <div style={{ width: "100%" }}>
                    <MapContainer
                      center={position}
                      zoom={15}
                      style={{
                        // padding: "15px 35px 0px 20px",
                        //position: "absolute",
                        height: 400,
                        width: "100%",
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
                )}
              {(isNullOrUndefined(eventDetails.latitude) ||
                isNullOrUndefined(eventDetails.longitude)) && (
                <ListItem className={classes.nested}>
                  <ListItemText inset primary={t("NoLocationForTheEvent")} />
                </ListItem>
              )}
            </Paper>
          </div>
        </main>
      );
    } else {
      return (
        <main className={!isDialog ? classes.layout : undefined}>
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
              <Typography
                component="h1"
                variant="h5"
                style={{ marginTop: 30, marginBottom: 24 }}
              >
                {t("DetailsEvent")}
              </Typography>
              <Divider className={classes.customDivider} />

              {[0, 3, 4].includes(eventDetails.discriminator) && (
                <Grid container spacing={24}>
                  <Grid md={12} style={{}}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: !isNullOrUndefined(personImage)
                          ? "black"
                          : "none",
                        width: "100%",
                        height: "100%",
                      }}
                    >
                      {!isNullOrUndefined(personImage) && (
                        <img
                          style={
                            isVerticalPersonImage === true
                              ? {
                                  maxWidth: "100%",
                                  height: "100%",
                                }
                              : { width: "100%", maxHeight: "100%" }
                          }
                          alt="PersonImg"
                          src={`data:image/jpeg;base64,${personImage}`}
                        />
                      )}
                      {isNullOrUndefined(personImage) && (
                        <PersonIcon
                          style={{
                            height: "100%",
                            width: "100%",
                            color: "#F8FCFA",
                          }}
                        />
                      )}
                    </div>
                  </Grid>
                  <Grid
                    md={12}
                    style={{
                      width: "100%",
                      textAlign: "center",
                      padding: 0,
                      marginTop: 10,
                    }}
                  >
                    <Typography>{t("person")}</Typography>
                  </Grid>

                  {[0, 4].includes(eventDetails.discriminator) && (
                    <Grid md={12} style={{ marginTop: 10 }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          background: !isNullOrUndefined(personImage)
                            ? "black"
                            : "none",
                          width: "100%",
                          height: "100%",
                        }}
                      >
                        {!isNullOrUndefined(accessImage) && (
                          <img
                            style={
                              isVerticalAccessImage === true
                                ? {
                                    maxWidth: "100%",
                                    height: "100%",
                                  }
                                : { width: "100%", maxHeight: "100%" }
                            }
                            alt="AccessImg"
                            src={`data:image/jpeg;base64,${accessImage}`}
                          />
                        )}
                        {isNullOrUndefined(accessImage) && (
                          <PersonIcon
                            style={{
                              height: "100%",
                              width: "100%",
                              color: "#F8FCFA",
                            }}
                          />
                        )}
                      </div>

                      <Grid
                        md={12}
                        style={{
                          width: "100%",
                          textAlign: "center",
                          padding: 0,
                          marginTop: 10,
                        }}
                      >
                        <Typography>{t("Access")}</Typography>
                      </Grid>
                    </Grid>
                  )}

                  <Grid
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: 40,
                    }}
                  >
                    <TextField
                      label={t("reader")}
                      defaultValue={eventDetails.readerName}
                      fullWidth
                      disabled
                      InputLabelProps={{
                        className: classes.disabledColor,
                      }}
                      InputProps={{
                        className: classes.disabledColor,
                      }}
                      style={{ margin: 5 }}
                    />

                    <TextField
                      label={t("Card")}
                      defaultValue={eventDetails.badgeNumber}
                      fullWidth
                      disabled
                      InputLabelProps={{
                        className: classes.disabledColor,
                      }}
                      InputProps={{
                        className: classes.disabledColor,
                      }}
                      style={{ margin: 5 }}
                    />

                    <TextField
                      label={t("panel")}
                      defaultValue={eventDetails.panelName}
                      fullWidth
                      disabled
                      InputLabelProps={{
                        className: classes.disabledColor,
                      }}
                      InputProps={{
                        className: classes.disabledColor,
                      }}
                      style={{ margin: 5 }}
                    />

                    <TextField
                      label={t("Date")}
                      value={
                        this.props.i18n.language === "es"
                          ? Moment(eventDetails.date)
                              .lang(language)
                              .format("DD/MM/YYYY HH:mm")
                          : Moment(eventDetails.date)
                              .lang(language)
                              .format("MM/DD/YYYY HH:mm")
                      }
                      fullWidth
                      disabled
                      onChange={() => undefined}
                      InputLabelProps={{
                        className: classes.disabledColor,
                      }}
                      InputProps={{
                        className: classes.disabledColor,
                      }}
                      style={{ margin: 5 }}
                    />
                  </Grid>
                </Grid>
              )}

              {eventDetails.discriminator === 2 && (
                <Grid
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Avatar
                    className={classes.avatar}
                    style={{
                      marginRight: 20,
                      marginLeft: 30,
                    }}
                  >
                    <MessageIcon style={{ height: "65px", width: "65px" }} />
                  </Avatar>

                  <Grid item md={12} className={classes.grid}>
                    <TextField
                      label={t("Text")}
                      defaultValue={eventDetails.description}
                      fullWidth
                      disabled
                      InputLabelProps={{
                        className: classes.disabledColor,
                      }}
                      InputProps={{
                        className: classes.disabledColor,
                      }}
                    />
                  </Grid>
                </Grid>
              )}

              {eventDetails.discriminator === 1 && (
                <Grid
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Avatar className={classes.avatar}>
                    {this.props.isMessage ? <MessageIcon /> : <AlarmIcon />}
                  </Avatar>

                  <Typography
                    component="h1"
                    variant="h5"
                    style={{ marginTop: 10 }}
                  >
                    {eventDetails.description}
                  </Typography>
                </Grid>
              )}
              <Divider
                style={{ width: "100%", marginTop: 30, marginBottom: 24 }}
              />

              {!isNullOrUndefined(eventDetails.latitude) &&
                !isNullOrUndefined(eventDetails.longitude) && (
                  <div style={{ width: "100%" }}>
                    <MapContainer
                      center={position}
                      zoom={15}
                      style={{
                        // padding: "15px 35px 0px 20px",
                        //position: "absolute",
                        height: 400,
                        width: "100%",
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
                )}
              {(isNullOrUndefined(eventDetails.latitude) ||
                isNullOrUndefined(eventDetails.longitude)) && (
                <ListItem className={classes.nested}>
                  <ListItemText inset primary={t("NoLocationForTheEvent")} />
                </ListItem>
              )}
            </Paper>
          </div>
        </main>
      );
    }
  }
}
EventDetails.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

const EventDetailsConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(EventDetails);

export default withTranslation()(
  withStyles(styles, { withTheme: true })(EventDetailsConnected)
);
