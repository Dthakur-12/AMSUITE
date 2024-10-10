import React, { createRef } from "react";
import {
  Map,
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
} from "react-leaflet";
import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Sidebar from "../../Shared/SideBar/Sidebar";
import SideBarContent from "./SideBarContent/SideBarContent";
import Tab from "../../Shared/SideBar/Tab";
import {
  ChevronRight,
  Devices,
  GpsFixed,
  PhonelinkSetup,
} from "@mui/icons-material";
import { requestGetPanels } from "../../../actions/AccessControl/panel_actions";
import { withStyles } from '@mui/styles';
import { withTranslation } from "react-i18next";
import PanelsList from "./ControlPanel/PanelsList";
import CustomMap from "./CustomMap";
import { IconButton, Button } from "@mui/material";

let pointIndex = 0;

class DeviceMapHome extends React.Component {
  constructor() {
    super();
    this.state = {
      collapsed: true,
      selected: "home",
      selectedPanel: undefined,
      key: undefined,
      showDevices: true,
      showZones: true,
      showTracing: {
        show: false,
        panelId: undefined,
        coordinates: [],
      },
      devicesToShow: undefined,
      deviceToShow: false,
      followDevice: false,
    };
    this.mapRef = createRef();
    this.timer = "";
  }

  componentDidMount() {}

  componentWillUnmount = () => {};

  panelClick = (panel) => {
    this.setState((prevState) => ({
      selectedZone: undefined,
      selectedPanel: panel,
      followDevice: false,
      key: Math.floor(Math.random() * 100) + 1,
    }));
  };

  updateSelectedPanelPosition = (latlng) => {
    this.setState((prevState) => ({
      selectedPanel: {
        ...prevState.selectedPanel,
        latlng,
      },
    }));
  };

  zoneClick = (zone) => {
    this.setState((prevState) => ({
      selectedPanel: undefined,
      selectedZone: zone,
      key: Math.floor(Math.random() * 100) + 1,
    }));
  };

  showTracingContextMenu = (target) => {
    const newShowTracing = {
      show: true,
      panelId: target.properties.PanelId,
      coordinates: [target.latlng],
    };
    this.setState((prevState) => ({
      key: Math.floor(Math.random() * 100) + 1,
      showTracing: newShowTracing,
    }));
  };

  showOnlyThisPanelContextMenu = (panel) => {
    this.setState((prevState) => ({
      key: Math.floor(Math.random() * 100) + 1,
      devicesToShow: [panel.properties.PanelId],
      lastZoneSelected: undefined,
    }));
  };

  showOnlyAssociatedDevicesContextMenu = (zone) => {
    this.setState((prevState) => ({
      key: Math.floor(Math.random() * 100) + 1,
      devicesToShow: zone.properties.ListPanelIds,
      lastZoneSelected: zone.properties.ZoneId,
    }));
  };

  followDevice = () => {
    this.setState((prevState) => ({
      followDevice: !prevState.followDevice,
      key: Math.floor(Math.random() * 100) + 1,
    }));
  };

  showTracing = () => {
    const { selectedPanel } = this.state;
    const newShowTracing = {
      show: true,
      panelId: selectedPanel.panelId,
      coordinates: [selectedPanel.latlng],
    };
    this.setState((prevState) => ({
      key: Math.floor(Math.random() * 100) + 1,
      showTracing: newShowTracing,
    }));
  };

  showOnlyThisPanel = () => {
    const { selectedPanel } = this.state;
    this.setState((prevState) => ({
      key: Math.floor(Math.random() * 100) + 1,
      devicesToShow: [selectedPanel.panelId],
      lastZoneSelected: undefined,
    }));
  };

  showOnlyAssociatedDevices = () => {
    const { selectedZone } = this.state;
    this.setState((prevState) => ({
      key: Math.floor(Math.random() * 100) + 1,
      devicesToShow: selectedZone.listPanelIds,
      lastZoneSelected: selectedZone.zoneId,
    }));
  };

  onClose() {
    this.setState({ collapsed: true });
  }
  onOpen() {
    this.setState({
      collapsed: false,
    });
  }

  handlePanelSelect = (panel) => {
    this.setState((prevState) => ({
      selectedPanel:
        prevState.selectedPanel === panel.id ? undefined : panel.id,
    }));
  };

  hide = (name) => {
    this.setState((prevState) => ({
      [name]: !prevState[name],
      key: Math.floor(Math.random() * 100) + 1,
    }));
  };

  clearFilters = () => {
    this.setState({
      showDevices: true,
      showZones: true,
      showTracing: {
        show: false,
        panelId: undefined,
        coordinates: [],
      },
      devicesToShow: undefined,
      lastZoneSelected: undefined,
      deviceToShow: false,
      followDevice: false,
    });
  };

  render() {
    const { t, theme, classes, panels, panelsCount, selectedTab } = this.props;

    return (
      <Grid
        container
        className={classes.mapContainer}
        style={{ height: "100%", position: "relative" }}
      >
        <CustomMap
          showDevices={this.state.showDevices}
          showZones={this.state.showZones}
          devicesToShow={this.state.devicesToShow}
          selectedPanel={this.state.selectedPanel}
          showTracing={this.state.showTracing}
          followDevice={this.state.followDevice}
          handleShowTracingContextMenu={this.showTracingContextMenu}
          handleShowOnlyThisPanelContextMenu={this.showOnlyThisPanelContextMenu}
          handleShowOnlyAssociatedDevicesContextMenu={
            this.showOnlyAssociatedDevicesContextMenu
          }
          handlePanelClick={this.panelClick}
          handleZoneClick={this.zoneClick}
          handleUpdateSelectedPanelPosition={this.updateSelectedPanelPosition}
          selectedZone={this.state.selectedZone}
          lastZoneSelected={this.state.lastZoneSelected}
        />
        <Sidebar
          id="sidebar"
          position="right"
          collapsed={this.state.collapsed}
          closeIcon={<ChevronRight />}
          selected={this.state.selected}
          onOpen={this.onOpen.bind(this)}
          onClose={this.onClose.bind(this)}
          key={this.state.key}
        >
          <SideBarContent
            selectedPanel={this.state.selectedPanel}
            hideDevices={this.hide}
            showDevices={this.state.showDevices}
            showZones={this.state.showZones}
            selectedZone={this.state.selectedZone}
            handleShowTracing={this.showTracing}
            handleShowOnlyThisPanel={this.showOnlyThisPanel}
            handleShowOnlyAssociatedDevices={this.showOnlyAssociatedDevices}
            handleClearFilters={this.clearFilters}
            handleFollowDevice={this.followDevice}
            followingDevice={this.state.followDevice}
            showingTracing={
              this.state.selectedPanel &&
              this.state.showTracing.show &&
              this.state.showTracing.panelId ===
                this.state.selectedPanel.panelId
            }
            deviceToShow={
              this.state.devicesToShow
                ? this.state.devicesToShow.length
                : undefined
            }
            key={this.state.key}
            handlePanelClick={this.panelClick}
          />
          {/* <PanelsList
            selectedPanel={this.state.selectedPanel}
            handleChangePanels={this.handleChangePanels}
          /> */}
          {/* <Tab id="panels" header="Panels" icon={<Devices />}>
          </Tab> */}
          {/* <Tab id="GPS" header="GPS" icon={<GpsFixed />}>
            <p>prueba tab</p>
          </Tab>
          <Tab
            id="settings"
            header="Settings"
            anchor="bottom"
            icon={<PhonelinkSetup />}
          >
            <Button
              size="small"
              onClick={() => this.hide("showDevices")}
              className={classes.margin}
              color="primary"
              variant="contained"
            >
              {this.state.showDevices ? "Hide Devices" : "Show Devices"}
            </Button>
            <Button
              size="small"
              onClick={() => this.hide("showZones")}
              color="primary"
              variant="contained"
              className={classes.margin}
            >
              {this.state.showZones ? "Hide Zones" : "Show Zones"}
            </Button>
            <Button
              size="small"
              color="primary"
              variant="contained"
              className={classes.margin}
              onClick={() =>
                this.setState({ showZones: true, showDevices: true })
              }
            >
              Clear Filters
            </Button>
          </Tab> */}
        </Sidebar>
      </Grid>
    );
  }
}

const mapStateToProps = ({ Panel, User }) => {
  return {
    pointsGPS: Panel.pointsGPS,
    possiblyMoreItems: Panel.possiblyMoreItems,
    maxDateReached: Panel.maxDateReached,
    panels: Panel.panels,
    panelsCount: Panel.panelsCount,
    currentUser: User.currentUser,
  };
};

const mapDispatchToProps = { requestGetPanels };

DeviceMapHome.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

const DeviceMapHomeConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(DeviceMapHome);

const styles = (theme) => ({
  mapContainer: {
    "& .leaflet-control a": {
      background: theme.palette.background.main,
      color: theme.palette.text.main,
    },
  },
});

export default withTranslation()(
  withStyles(styles, { withTheme: true })(DeviceMapHomeConnected)
);
