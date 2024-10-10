import React, { createRef } from "react";
import {
  TileLayer,
  LayersControl,
  FeatureGroup,
  Circle,
  Marker,
  Polyline,
  Polygon,
  Popup,
  MapControl,
  withLeaflet,
  GeoJSON,
  MapContainer,
} from "react-leaflet";
import { Grid, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
// import { Sidebar, Tab } from "react-leaflet-sidetabs";
import Sidebar from "../../Shared/SideBar/Sidebar";
import Tab from "../../Shared/SideBar/Tab";
import FilterTableActions from "../../Shared/Filters/FilterTableActions";
import {
  ChevronRight,
  Devices,
  GpsFixed,
  PhonelinkSetup,
} from "@mui/icons-material";
import { requestGetPanels } from "../../../actions/AccessControl/panel_actions";
import { requestPanelsPositions } from "../../../actions/DeviceMap/deviceMap_actions";
import { withStyles } from '@mui/styles';
import { withTranslation } from "react-i18next";
import ReactDOMServer from "react-dom/server";
import Icon from "./Icon";
import { DriftMarker } from "leaflet-drift-marker";
import { iconPerson } from "./CustomIcons";
import { socketIO } from "../../../utils/WebSockets";
import PanelsList from "./ControlPanel/PanelsList";
import ContextMenu from "./ContextMenu";
import MarkerClusterGroup from "react-leaflet-cluster";
import RedMarker from "../../../assets/Icons/marker-icon-2x-red.png";
import BlueMarker from "../../../assets/Icons/marker-icon-2x-blue.png";
import MarkerShadow from "../../../assets/Icons/marker-shadow.png";
import { isNullOrUndefined } from "util";

import moment from "moment";

const blueIcon = new L.Icon({
  iconUrl: BlueMarker,
  shadowUrl: MarkerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
const redIcon = new L.Icon({
  iconUrl: RedMarker,
  shadowUrl: MarkerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

class CustomMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      position: [-34.9032784, -56.1881599],
      centerTo: [-34.9032784, -56.1881599],
      zoom: 14,
      collapsed: true,
      selected: "home",
      key: undefined,
      x: 0,
      y: 0,
      showContextMenu: false,
      // devicesToShow: undefined,
      showTracing: {
        show: false,
        panelId: undefined,
        coordinates: [],
      },
      panelMenu: [
        {
          label: props.t("ShowOnlyThisDevice"),
          callback: this.showOnlyThisPanel,
        },
        { label: props.t("DrawTrace"), callback: this.showTracing },
      ],
      zoneMenu: [
        {
          label: props.t("AssociatedDevices"),
          callback: this.showOnlyAssociatedDevices,
        },
      ],
      contextMenuTarget: undefined,
      markers: [],
    };
    this.mapRef = createRef();
    this.timer = "";
  }

  showTracing = () => {
    const { contextMenuTarget } = this.state;
    this.props.handleShowTracingContextMenu(contextMenuTarget);
    this.setState((prevState) => ({
      showPanelContextMenu: false,
    }));
  };

  showOnlyThisPanel = () => {
    const { contextMenuTarget } = this.state;
    this.props.handleShowOnlyThisPanelContextMenu(contextMenuTarget);
    this.setState((prevState) => ({
      showPanelContextMenu: false,
    }));
  };

  showOnlyAssociatedDevices = () => {
    const { contextMenuTarget } = this.state;
    this.props.handleShowOnlyAssociatedDevicesContextMenu(contextMenuTarget);
    this.setState((prevState) => ({
      showZoneContextMenu: false,
    }));
  };

  componentDidMount() {
    const { currentUser } = this.props;
    var self = this;
    socketIO.emit("subscribePanelsPositions", currentUser.token);
    const loadLiveTracking = this.loadLiveTracking;
    socketIO.on("panelsPositions", function (data) {
      loadLiveTracking(data);
    });
    this.props.requestPanelsPositions({ showZones: true });
  }

  componentWillUnmount = () => {
    socketIO.off("panelsPositions", this.updateAchievement);
    socketIO.emit("unsubscribePanelsPositions");
  };

  loadLiveTracking = (data) => {
    this.setState((prevState) => ({
      // panelsGpsPoint: data.message.mobiles,
      key: Math.floor(Math.random() * 100) + 1,
      // featuresCount: data.message.mobiles.features.length,
      markers: this.updateDictionary(data.message.mobiles.features),
    }));
  };

  panelClick = (target) => {
    this.setState((prevState) => ({
      popupPosition: target.latlng,
      popupContent: { ...target.properties },
      openPopup: true,
    }));
    this.props.handlePanelClick({
      panelName: target.properties.PanelName,
      panelId: target.properties.PanelId,
      latlng: target.latlng,
    });
  };

  zoneClick = (e) => {
    var layer = e.target;
    this.setState((prevState) => ({
      selectedZone:
        prevState.selectedZone === layer.feature.properties.ZoneId
          ? undefined
          : layer.feature.properties.ZoneId,
    }));
    this.props.handleZoneClick({
      zoneName: layer.feature.properties.ZoneName,
      zoneId: layer.feature.properties.ZoneId,
      listPanelIds: layer.feature.properties.ListPanelIds,
    });
  };

  componentDidUpdate(prevProps, prevState) {
    const {
      showTracing: oldShowTracing,
      selectedPanel: oldSelectedPanel,
    } = prevProps;
    const {
      showTracing: newShowTracing,
      selectedPanel: newSelectedPanel,
    } = this.props;
    if (
      oldShowTracing &&
      (oldShowTracing.show !== newShowTracing.show ||
        oldShowTracing.panelId !== newShowTracing.panelId)
    ) {
      this.setState({
        showTracing: newShowTracing,
      });
    }
    if (
      this.props.successGetZones &&
      prevProps.successGetZones !== this.props.successGetZones
    ) {
      this.setState({
        markers: this.updateDictionary(this.props.mapData.mobiles.features),
      });
    }
    if (
      (!oldSelectedPanel && newSelectedPanel) ||
      (oldSelectedPanel &&
        newSelectedPanel &&
        oldSelectedPanel.panelId !== newSelectedPanel.panelId &&
        this.state.markers[newSelectedPanel.panelId])
    ) {
      const panel = this.state.markers[newSelectedPanel.panelId];
      if (isNullOrUndefined(panel)) return;
      const { PanelId, PanelName } = panel.properties;
      this.setState({
        popupPosition: panel.latlng,
        openPopup: true,
        popupContent: { ...panel.properties },
      });
      this.props.handlePanelClick({
        panelName: PanelName,
        panelId: PanelId,
        latlng: panel.latlng,
      });
      this.mapRef.current.leafletElement.setView(panel.latlng);
    }
  }

  checkCoordinates = (array, newCoordinate) => {
    const lastCoordinate = array.slice(-1)[0];
    return (
      !lastCoordinate ||
      lastCoordinate[0] != newCoordinate[0] ||
      lastCoordinate[1] != newCoordinate[1]
    );
  };

  // Usar con marcadores geoJSON

  // onEachFeature(feature, layer) {
  //   layer.on({
  //     contextmenu: (e) => this.showContextMenu(e, "showPanelContextMenu"),
  //     click: (e) => this.panelClick(e.target.feature),
  //   });
  //   const newShowTracing = { ...this.state.showTracing };
  //   if (
  //     newShowTracing.hasOwnProperty(feature.properties.PanelId) &&
  //     this.checkCoordinates(
  //       newShowTracing[feature.properties.PanelId],
  //       feature.geometry.coordinates
  //     )
  //   ) {
  //     newShowTracing[feature.properties.PanelId].push(
  //       feature.geometry.coordinates
  //     );
  //   }
  //   if (feature.properties.PanelId == this.state.selectedPanel) {
  //     this.setState((prevState) => ({
  //       popupPosition: feature.geometry.coordinates,
  //       showTracing: newShowTracing,
  //     }));
  //   } else
  //     this.setState((prevState) => ({
  //       showTracing: newShowTracing,
  //     }));
  // }

  onEachFeatureZone(feature, layer) {
    layer.on({
      contextmenu: (e) =>
        this.showContextMenu(e, "showZoneContextMenu", e.target.feature),
      click: this.zoneClick,
    });
    layer.bindPopup(feature.properties.ZoneName);
  }

  showContextMenu = (e, contextMenu, target) => {
    this.setState({
      [contextMenu]: true,
      x: e.containerPoint.x,
      y: e.containerPoint.y,
      contextMenuTarget: target,
    });
  };

  // pointToLayer = (feature, latlng) => {
  //   const icon = L.divIcon({
  //     className: "location-pin",
  //     html: ReactDOMServer.renderToString(
  //       <React.Fragment>
  //         <Icon id={feature.properties.panelId} perc={this.state.key} />
  //         {/* <div class="pin"></div> */}
  //         <div class="pulse"></div>
  //       </React.Fragment>
  //     ),
  //     iconSize: [30, 30],
  //     opacity: 0.6,
  //     iconAnchor: [18, 30],
  //   });

  //   return L.marker(latlng, { icon: icon });
  // };

  // filterPoints = (feature, latlng) => {
  //   const { devicesToShow } = this.props;
  //   return devicesToShow
  //     ? devicesToShow.indexOf(feature.properties.PanelId) !== -1
  //     : true;
  // };

  filterZone = (feature, latlng) => {
    const { devicesToShow, selectedZone, lastZoneSelected } = this.props;

    return devicesToShow
      ? lastZoneSelected && lastZoneSelected === feature.properties.ZoneId
      : true;
  };

  mouseDown = (e) => {
    const menuElements = ["span", "li", "ul"];
    if (menuElements.indexOf(e.originalEvent.originalTarget.localName) === -1)
      this.setState({
        showPanelContextMenu: false,
        showZoneContextMenu: false,
      });
  };

  handlePopupClose = (e) => {
    this.setState({ openPopup: false });
  };

  handlePopupOpen = (e) => {
    this.setState({ openPopup: true });
  };

  updateDictionary = (dictionary) => {
    let newPoints = { ...this.state.markers };
    let keyList = [];
    const newCoordinates = [...this.state.showTracing.coordinates];
    //se actualizan coordenadas o se agrega panel si no existe
    dictionary.map((feature) => {
      let key = feature.properties.PanelId;
      let latlng = [
        feature.geometry.coordinates[1],
        feature.geometry.coordinates[0],
      ];
      keyList.push(key.toString());

      newPoints[key] = {
        properties: { ...feature.properties },
        latlng,
      };
    });
    //se quitan elementos fuera de la respuesta del servidor
    const filtered = Object.keys(newPoints)
      .filter((key) => {
        return keyList.includes(key);
      })
      .reduce((obj, key) => {
        let latlng = newPoints[key].latlng;
        let properties = newPoints[key].properties;
        if (isNullOrUndefined(latlng)) return;
        let panelId = newPoints[key].properties.PanelId;
        // se agrega punto al trazado si corresponde
        // chequea que el panel tenga verTrazado habilitado y que este se haya movido
        if (
          this.state.showTracing &&
          this.state.showTracing.show &&
          this.state.showTracing.panelId == panelId &&
          this.checkCoordinates(newCoordinates, latlng) //se checkea que el nuevo punto sea distinto al anterior para el caso en que este parado
        ) {
          this.setState((prevState) => ({
            showTracing: {
              ...prevState.showTracing,
              coordinates: [...newCoordinates, latlng],
            }, //se agrega el punto al polyline correspondiente
          }));
        }
        if (
          this.props.selectedPanel &&
          this.props.selectedPanel.panelId == panelId //si es el panel seleccionado
        ) {
          this.setState(() => ({
            popupPosition: latlng, //se actualiza posicion de popup si este esta abierto
            popupContent: { ...properties },
          }));
          this.props.handleUpdateSelectedPanelPosition(latlng); //se actualiza posicion de panel seleccionado

          if (this.props.followDevice) {
            this.mapRef.current.leafletElement.setView(latlng); //se centra mapa en el panel seleccionado
          }
        }
        obj[key] = newPoints[key];
        return obj;
      }, {});
    return filtered;
  };

  render() {
    const {
      t,
      theme,
      classes,
      panels,
      panelsCount,
      selectedTab,
      mapData,
      followDevice,
    } = this.props;
    const {
      locations,
      markers = {},
      gpsPoints = {},
      panelsGpsPoint = {},
      position,
      centerTo,
    } = this.state;

    const markersPositions = Object.values(this.state.markers);
    const center = markersPositions[0] ? markersPositions[0].latlng : centerTo;
    return (
      <MapContainer
        center={center}
        zoom={this.state.zoom}
        style={{
          height: "100vh",
          width: "100%",
          bounds: 12,
          maxBounds: 12,
          alignItems: "center",
        }}
        onmousedown={this.mouseDown}
        onPopupClose={this.handlePopupClose}
        // onPopupOpen={this.handlePopupOpen}
        ref={this.mapRef}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
        />
        {this.props.showDevices && (
          <MarkerClusterGroup
            removeOutsideVisibleBounds={true}
            spiderfyOnMaxZoom={false}
            zoomToBoundsOnClick={true}
            disableClusteringAtZoom={this.state.zoom}
            key={this.state.key}
          >
            {markersPositions
              .filter(
                (marker) =>
                  !this.props.devicesToShow ||
                  this.props.devicesToShow.includes(
                    parseInt(marker.properties.PanelId)
                  )
              )
              .map((marker, index) => {
                return (
                  <DriftMarker
                    key={marker.properties.PanelId}
                    position={marker.latlng}
                    duration={300}
                    onContextMenu={(e) =>
                      this.showContextMenu(e, "showPanelContextMenu", marker)
                    }
                    onClick={(e) => this.panelClick(marker)}
                    icon={
                      this.props.selectedPanel &&
                      marker.properties.PanelId ===
                        this.props.selectedPanel.panelId
                        ? redIcon
                        : blueIcon
                    }
                  >
                    {/* <Popup position={marker.latlng}>
                      <span>{marker.properties.PanelName}</span>
                    </Popup> */}
                  </DriftMarker>
                );
              })}
          </MarkerClusterGroup>
        )}

        {/* {this.props.showDevices && (
          <GeoJSON
            key={this.state.key}
            data={panelsGpsPoint}
            pointToLayer={this.pointToLayer.bind(this)}
            onEachFeature={this.onEachFeature.bind(this)}
            filter={this.filterPoints.bind(this)}
          />
        )} */}

        {mapData && this.props.showZones && (
          <GeoJSON
            data={mapData.virtualZones}
            onEachFeature={this.onEachFeatureZone.bind(this)}
            filter={this.filterZone.bind(this)}
            key={
              (this.props.devicesToShow && this.props.devicesToShow.length) ||
              this.props.lastZoneSelected
            }
          />
        )}
        {this.state.showTracing.coordinates.length > 1 && (
          <Polyline
            key={this.state.key}
            positions={this.state.showTracing.coordinates}
          />
        )}

        <ContextMenu
          items={this.state.panelMenu}
          visible={this.state.showPanelContextMenu}
          x={this.state.x}
          y={this.state.y}
        />
        <ContextMenu
          items={this.state.zoneMenu}
          visible={this.state.showZoneContextMenu}
          x={this.state.x}
          y={this.state.y}
        />

        {this.state.openPopup ? (
          <Popup style={{ bottom: 15 }} position={this.state.popupPosition}>
            <div>
              <span style={{ fontWeight: "bold" }}>
                {this.state.popupContent.PanelName}
              </span>
              <div style={{ display: "flex", marginTop: 5 }}>
                <p style={{ margin: 0, fontWeight: "bold" }}>{`${t(
                  "LastConnection"
                )}:`}</p>
                <p style={{ margin: "0 0 0 5px" }}>
                  {this.props.i18n.language === "en"
                    ? moment(this.state.popupContent.LastActivity)
                        .lang("en")
                        .format("HH:mm MM/DD/YYYY")
                    : moment(this.state.popupContent.LastActivity)
                        .lang("es")
                        .format("HH:mm DD/MM/YYYY")}
                </p>
              </div>
              <div style={{ display: "flex", marginTop: 5 }}>
                <p style={{ margin: 0, fontWeight: "bold" }}>{`${t(
                  "Speed"
                )}:`}</p>
                <p style={{ margin: "0 0 0 5px" }}>
                  {`${this.state.popupContent.Speed} ${
                    this.props.i18n.language === "es" ? "(k/h)" : "(millas/h)"
                  }`}
                </p>
              </div>
            </div>
          </Popup>
        ) : null}
      </MapContainer>
    );
  }
}

const mapStateToProps = ({ Panel, User, DeviceMap }) => {
  return {
    successGetZones: DeviceMap.successGetZones,
    panels: Panel.panels,
    panelsCount: Panel.panelsCount,
    currentUser: User.currentUser,
    mapData: DeviceMap.mapData,
  };
};

const mapDispatchToProps = {
  requestGetPanels,
  requestPanelsPositions,
};

CustomMap.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

const CustomMapConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomMap);

export default withTranslation()(
  withStyles({}, { withTheme: true })(CustomMapConnected)
);
