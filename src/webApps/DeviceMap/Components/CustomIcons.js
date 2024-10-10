import L from "leaflet";

const iconPerson = new L.Icon({
  iconUrl: require("../../../assets/Icons/docxIcon.svg"),
  iconRetinaUrl: require("../../../assets/Icons/docxIcon.svg"),
  iconAnchor: null,
  popupAnchor: null,
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: new L.Point(60, 75),
  className: "leaflet-div-icon",
});

export { iconPerson };
