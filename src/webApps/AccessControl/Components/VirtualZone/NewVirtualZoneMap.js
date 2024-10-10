import React from "react";
import {
  TileLayer,
  Polygon,
  LayersControl,
  FeatureGroup,
  MapContainer,
} from "react-leaflet";
import * as L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import { EditControl } from "react-leaflet-draw";
import GeoSearch from "./GeoSearch";

const renderDefineZone = (props) => {
  let {
    isDetails,
    polygon,
    isEdit,
    rectangle,
    position = [],
    positionArea = [],
    heightValue,
    drawArea,
    onCreate,
    hayZona,
    onDeleted,
    onDeleteStart,
    positionCenter = [],
  } = props;
  // let positionCenter = [-34.917961, -56.163585];
  // const handleCreate = event => {
  //   onCreate(event);
  // };
  const height = heightValue ? 1000 * heightValue : 1000 * 0.55;
  let positionCenterDetails = null;
  if (positionArea.length > 2 && (isEdit || isDetails)) {
    let lat = (positionArea[0][0] + positionArea[1][0]) / 2;
    let lng = (positionArea[1][1] + positionArea[2][1]) / 2;
    positionCenterDetails = [lat, lng];
    positionCenter = positionCenterDetails;
  }

  if (hayZona) {
    var container = L.DomUtil.get("map");
    if (container != null) {
      container._leaflet_id = null;
    }
  }
  return (
    <div
      id="map"
      style={{
        width: "100%",
        height: height,
        justifyContent: "center",
        display: "flex",
        position: "sticky",
        marginBottom: 20,
      }}
    >
      <MapContainer
        center={positionCenterDetails ? positionCenterDetails : positionCenter}
        zoom={15}
        style={{
          //marginBottom: 64,
          // padding: "15px 35px 0px 20px",

          height: height,
          width: props.width,
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
          <GeoSearch />
        </LayersControl>
        <FeatureGroup>
          {!isDetails && (
            <EditControl
              position="topright"
              edit={{ edit: false }}
              onCreated={onCreate}
              onDeleted={onDeleted}
              onDeleteStart={onDeleteStart}
              draw={{
                marker: false,
                circlemarker: false,
                polyline: false,
                circle: false,
                polygon: polygon,
                rectangle: rectangle,
              }}
            />
          )}
          {(hayZona || isEdit || isDetails) && (
            <Polygon color={"#86b4f5"} positions={positionArea} />
          )}
        </FeatureGroup>
        <Polygon color={"blue"} positions={position} />
      </MapContainer>
    </div>
  );
};

export default renderDefineZone;
