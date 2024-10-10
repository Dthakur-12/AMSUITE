import React, { createRef, Component } from "react";
import Paper from "@mui/material/Paper";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import DatePicker from "react-datepicker";
import { withStyles } from '@mui/styles';
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import RoomIcon from "@mui/icons-material/Room";
import Avatar from "@mui/material/Avatar";
import moment from "moment";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import green from "@mui/material/colors/green";
import { isNullOrUndefined } from "util";
import Slider from "@mui/material/Slider";
import PropTypes from "prop-types";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import LocationIcon from "@mui/icons-material/LocationOn";
import {
  TileLayer,
  LayersControl,
  FeatureGroup,
  Circle,
  Marker,
  Polyline,
  Popup,
  MapControl,
  withLeaflet,
  MapContainer,
} from "react-leaflet";
import ListItem from "@mui/material/ListItem";
import { requestHistoricalTracking } from "../../../../actions/AccessControl/panel_actions";
import styles from "../../../../assets/styles/AccessControl_styles/Panel_styles/panelGPSHistoryStyles";
import ListItemText from "@mui/material/ListItemText";
// import {GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';

// const AnyReactComponent = ({ text, lng, msgText }) => (
//   <div>
//     {text}
//     {!(lat && lng) ? msgText : ""}
//   </div>
// );

let i = 0;
let interval = null;
let arrayInterval = [];
class PanelGPSHistory extends Component {
  constructor(props) {
    super(props);
    const { initValues, gpsContinue } = props;
    this.state = {
      delay: 700,
      activeStep: 0,
      points: [],
      center: [null, null],
      positions: [],
      zoom: 15,
      currentList: [],
      panelGps: {
        PanelId: initValues ? initValues.id : undefined,
        StartDate: new Date(new Date().setHours(0, 0, 0)),
        EndDate: new Date(new Date().setHours(23, 59, 0)),
      },
    };
  }
  componentDidMount() {
    let i = 0;
    this.setState({
      panelGps: {
        PanelId: this.props.initValues ? this.props.initValues.id : undefined,
        StartDate: new Date(new Date().setHours(0, 0, 0)),
        EndDate: new Date(new Date().setHours(23, 59, 0)),
      },
    });
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.successHistoricalTracking !==
        prevState.successHistoricalTracking ||
      prevState.pointsGPS !== nextProps.pointsGPS ||
      prevState.possiblyMoreItems !== nextProps.possiblyMoreItems ||
      prevState.maxDateReached !== nextProps.maxDateReached
    ) {
      return {
        successHistoricalTracking: nextProps.successHistoricalTracking,
        pointsGPS: nextProps.pointsGPS,
        possiblyMoreItems: nextProps.possiblyMoreItems,
        maxDateReached: nextProps.maxDateReached,
      };
    } else return null;
  }
  componentDidUpdate(prevProps, prevState) {
    const {
      successHistoricalTracking,
      pointsGPS,
      processingFirstList,
      center,
      currentList,
      maxDateReached,
      positions,
      possiblyMoreItems,
      panelGps,
    } = this.state;
    const { gpsContinue } = this.props;

    if (
      successHistoricalTracking &&
      successHistoricalTracking !== prevState.successHistoricalTracking
    ) {
      this.setState(
        (prevState) => ({
          currentList: [...prevState.currentList, ...pointsGPS],
          processingFirstList: isNullOrUndefined(processingFirstList)
            ? true
            : false,
        }),
        () => {
          if (this.state.processingFirstList) {
            this.handleProcessPoint(0);
          }
          if (possiblyMoreItems && gpsContinue) {
            this.props.requestHistoricalTracking({
              PanelId: panelGps.PanelId,
              StartDate: maxDateReached,
              EndDate: panelGps.EndDate,
            });
          }
        }
      );
    }
  }

  componentWillUnmount() {
    if (arrayInterval.length > 0) {
      arrayInterval.map((interval) => {
        clearTimeout(interval);
      });
      arrayInterval = [];
      i = 0;
    }
    this.props.onClose();
  }
  handleChangeDelay = (event, value) => {
    this.setState({ delay: value });
  };

  handleChangeStep = (step) => {
    this.setState({
      activeStep: step,
    });
  };

  handleProcessPoint = (i) => {
    if (i < this.state.currentList.length && this.props.gpsContinue) {
      const elem = this.state.currentList[i];
      this.setState(
        (prevState) => ({
          ...prevState,
          date: moment(elem.date).format("HH:mm:ss DD/MM/YYYY"),
          speed: elem.speed,
          center: [Number(elem.latitude), Number(elem.longitude)],
          points: [
            ...prevState.points,
            [
              Number(elem.latitude),
              Number(elem.longitude),
              this.props.i18n.language === "es"
                ? moment(elem.date).format("HH:mm:ss DD/MM/YYYY")
                : moment(elem.date).format("HH:mm:ss MM/DD/YYYY"),
            ],
          ],
          positions:
            !isNullOrUndefined(prevState.positions) &&
            this.state.positions.length > 0
              ? [
                  ...prevState.positions,
                  [
                    prevState.positions[this.state.positions.length - 1][1],
                    [Number(elem.latitude), Number(elem.longitude)],
                  ],
                ]
              : [
                  [
                    [Number(elem.latitude), Number(elem.longitude)],
                    [Number(elem.latitude), Number(elem.longitude)],
                  ],
                ],
        }),
        () => {
          const interval = setTimeout(() => {
            i++;
            this.handleProcessPoint(i);
          }, this.state.delay);
          arrayInterval.push(interval);
        }
      );
    }
  };

  // handleProcessLists = () => {

  // const handleChangeCenter = elem => {
  //   this.setState(prevState => ({
  //     ...prevState,
  //     date: moment(elem.date).format("HH:mm:ss DD/MM/YYYY"),
  //     center: [Number(elem.latitude), Number(elem.longitude)],
  //     points: [
  //       ...prevState.points,
  //       [
  //         Number(elem.latitude),
  //         Number(elem.longitude),
  //         moment(elem.date).format("HH:mm:ss DD/MM/YYYY")
  //       ]
  //     ],
  //     positions:
  //       !isNullOrUndefined(prevState.positions) &&
  //       this.state.positions.length > 0
  //         ? [
  //             ...prevState.positions,
  //             [
  //               prevState.positions[this.state.positions.length - 1][1],
  //               [Number(elem.latitude), Number(elem.longitude)]
  //             ]
  //           ]
  //         : [
  //             [
  //               [Number(elem.latitude), Number(elem.longitude)],
  //               [Number(elem.latitude), Number(elem.longitude)]
  //             ]
  //           ]
  //   }));
  // };

  // while (i < this.state.currentList.length && this.props.gpsContinue) {
  //   let elem = this.state.currentList[i];
  //   (function(i) {
  //     const interval = setTimeout(function() {
  //       handleChangeCenter(elem);
  //     }, 1000 * i);

  //     arrayInterval.push(interval);
  //   })(i++);
  // }
  // };

  handleZoomEnd = () => {
    this.setState({
      zoom:
        this.mapRef &&
        this.mapRef.leafletElement &&
        this.mapRef.leafletElement.getZoom(),
    });
  };

  handleChangeDate = (name) => (event) => {
    let value = new Date(event);
    this.setState((prevState) => ({
      panelGps: {
        ...prevState.panelGps,
        [name]: value,
      },
    }));
  };
  handleClose = () => {
    this.props.onClose();
  };

  handlehistoricalTracking = () => {
    if (arrayInterval.length > 0) {
      arrayInterval.map((interval) => {
        clearTimeout(interval);
      });
      arrayInterval = [];
      let i = 0;
    }

    this.setState(
      (prevState) => ({
        activeStep: prevState.activeStep === 0 ? 1 : 0,
        points: [],
        currentList: [],
        positions: [],
        center: [],
        processingFirstList: undefined,
      }),
      () => this.props.requestHistoricalTracking(this.state.panelGps)
    );
  };

  mapRef = createRef();
  handleClick = () => {
    const map = this.mapRef.current;

    if (map != null) {
      map.leafletElement.locate();
    }
  };

  selectInterval = () => {
    const { panelGps, center, zoom, date, speed } = this.state;
    const { classes, t, theme } = this.props;
    const StartDateText = ({ value, onClick }) => (
      <TextField
        style={{ width: "100%" }}
        onClick={onClick}
        label={t("DateStart")}
        value={value}
      />
    );
    const EndDateText = ({ value, onClick }) => (
      <TextField
        style={{ width: "100%" }}
        onClick={onClick}
        label={t("DateEnd")}
        value={value}
      />
    );

    return (
      <Paper className={classes.paperNotShadow} style={{ height: "400px" }}>
        <Divider
          style={{ width: "100%", marginTop: 10, marginBottom: "40px" }}
        />
        <Grid
          container
          item
          xs={12}
          md={8}
          spacing={24}
          style={{ marginTop: "40px" }}
        >
          <Grid item xs={12} md={6}>
            <div style={{ width: "100%" }}>
              <DatePicker
                selected={new Date(panelGps.StartDate)}
                onChange={this.handleChangeDate("StartDate")}
                showTimeSelect
                showYearDropdown
                scrollableYearDropdown
                timeIntervals={15}
                customInput={<StartDateText />}
                timeCaption="time"
                dateFormat={"yyyy/MM/dd hh:mm a"}
                //{/* minDate={} */}
                calendarClassName={classes.reactDatePicker}
                fullwidth
                required
              />
            </div>
          </Grid>

          <Grid item xs={12} md={6}>
            <div style={{ width: "100%" }}>
              <DatePicker
                selected={new Date(panelGps.EndDate)}
                onChange={this.handleChangeDate("EndDate")}
                showTimeSelect
                showYearDropdown
                scrollableYearDropdown
                timeIntervals={15}
                minDate={panelGps.StartDate}
                customInput={<EndDateText />}
                timeCaption="time"
                dateFormat={"yyyy/MM/dd hh:mm a"}
                calendarClassName={classes.reactDatePicker}
                required
              />
            </div>
          </Grid>
          <div className={classes.submit}>
            <Button
              variant="contained"
              color="primary"
              // disabled={
              // !this.state.isStartSelect || !this.state.isEndSelect
              //}
              onClick={this.handlehistoricalTracking}
              style={{
                background: this.state.isSuccess ? green[500] : undefined,
                color: theme.palette.text.main,
                marginBottom: "30px",
              }}
            >
              {`${t("GetHistory")}`}
            </Button>
          </div>
        </Grid>
      </Paper>
    );
  };

  showMap = () => {
    const { panelGps, center, zoom, date, speed } = this.state;
    const { classes, t, theme } = this.props;
    return (
      <Paper className={classes.paperNotShadow}>
        {!isNullOrUndefined(this.state.center[0]) &&
          !isNullOrUndefined(this.state.center[1]) && (
            <div
              style={{
                height: "100%",
                width: "100%",

                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h6"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: "5px",
                }}
              >
                {`${t("LastUpdate")} ${date} - ${t("Speed")} ${speed} km/h`}
              </Typography>
              {/* <GoogleMapReact
            bootstrapURLKeys={{ key: GOOGLE_MAP_APIKEY }}
            center={{
              lat: Number(this.state.center.lat),
              lng: Number(this.state.center.lng)
            }}
            defaultCenter={{
              lat: Number(this.state.center.lat),
              lng: Number(this.state.center.lng)
            }}
            defaultZoom={this.state.zoom}
            streetViewControl={true}
            onGoogleApiLoaded={({ map, maps }) => {
              this.setState({ map: map, maps: maps, mapLoaded: true });
            }}
            yesIWantToUseGoogleMapApiInternals
          >
          
            <AnyReactComponent
              msgText={
                <Typography component="h1" variant="h4">
                  {t("NoGPS")}
                </Typography>
              }
              lat={Number(this.state.center.lat)}
              lng={Number(this.state.center.lng)}
              text={<LocationIcon style={{ color: "#d4040e" }} />}
            />
          </GoogleMapReact> */}

              <MapContainer
                center={this.state.center}
                zoom={zoom}
                viewport={{}}
                onZoomEnd={this.handleZoomEnd}
                style={{
                  // padding: "15px 35px 0px 20px",

                  height: 400,
                  width: "100%",
                  bounds: 12,
                  maxBounds: 12,
                  alignItems: "center",
                }}
                onClick={this.handleClick}
                ref={(ref) => {
                  this.mapRef = ref;
                }}
              >
                <TileLayer
                  attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                ></TileLayer>
                {this.state.points.length > 0 &&
                  this.state.points.map((point) => {
                    return (
                      <FeatureGroup color="red">
                        <Popup>
                          <p>
                            {" "}
                            <b> {t("Date")} </b>: {point[2]}
                          </p>
                          <p>
                            <b>Coords</b> : {point[0]},{point[1]}
                          </p>
                        </Popup>
                        <Circle center={[point[0], point[1]]} radius={0.5} />
                      </FeatureGroup>
                    );
                  })}

                {center && <Marker position={center}></Marker>}
                {!isNullOrUndefined(this.state.positions) && (
                  <Polyline
                    positions={this.state.positions}
                    color={"red"}
                    weight={"1.80"}
                    onMouseOver={() => this.setState({ onpopUp: true })}
                  />
                )}
              </MapContainer>
              <div style={{ width: "80%", marginBottom: 30, marginTop: 20 }}>
                <Typography
                  variant="h6"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: 8,
                  }}
                >
                  {t("Speed")}
                </Typography>
                <Slider
                  //classes={{ container: { padding: "22px 0px" } }}
                  value={this.state.delay}
                  min={1000}
                  max={100}
                  step={50}
                  onChange={this.handleChangeDelay}
                />
              </div>
            </div>
          )}
        {isNullOrUndefined(this.state.center) ||
          (this.state.center.length === 0 && (
            <ListItem className={classes.nested} style={{ marginBottom: 50 }}>
              <ListItemText
                style={{ textAlign: "center" }}
                primary={t("NoLocationForTheEvent")}
              />
            </ListItem>
          ))}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "90%",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            // disabled={
            // !this.state.isStartSelect || !this.state.isEndSelect
            //}
            onClick={this.handlehistoricalTracking}
            style={{ color: theme.palette.text.main }}
          >
            {`${t("Back")}`}
          </Button>
          <Button
            variant="contained"
            color="primary"
            // disabled={
            // !this.state.isStartSelect || !this.state.isEndSelect
            //}
            onClick={this.handleClose}
            style={{
              color: theme.palette.text.main,
            }}
          >
            {`${t("Close")}`}
          </Button>
        </div>
      </Paper>
    );
  };

  render() {
    const { panelGps, center, zoom, date } = this.state;
    const { classes, t, theme } = this.props;

    return (
      <paper className={classes.paper}>
        <Avatar className={classes.customFab}>
          <RoomIcon />
        </Avatar>

        <Typography component="h1" variant="h5" style={{ marginBottom: "5px" }}>
          {t("HistoryGPS")}
        </Typography>
        {this.state.activeStep === 0 ? this.selectInterval() : this.showMap()}
      </paper>
    );
  }
}
const mapStateToProps = ({ Panel }) => {
  return {
    loadingHistoricalTracking: Panel.loadingHistoricalTracking,
    successHistoricalTracking: Panel.successHistoricalTracking,
    pointsGPS: Panel.pointsGPS,
    possiblyMoreItems: Panel.possiblyMoreItems,
    maxDateReached: Panel.maxDateReached,
  };
};

const mapDispatchToProps = { requestHistoricalTracking };

PanelGPSHistory.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

const panelGPSHistoryConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(PanelGPSHistory);

export default withTranslation()(
  withStyles(styles, { withTheme: true })(panelGPSHistoryConnected)
);
