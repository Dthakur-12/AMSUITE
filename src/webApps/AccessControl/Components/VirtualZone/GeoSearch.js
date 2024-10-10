import { useEffect } from "react";
import { useMap } from "react-leaflet";
import { OpenStreetMapProvider, GeoSearchControl } from "leaflet-geosearch";
import L from "leaflet";
import "leaflet-geosearch/dist/geosearch.css"; // Import CSS

const GeoSearch = () => {
  const map = useMap();

  useEffect(() => {
    const provider = new OpenStreetMapProvider();

    const searchControl = new GeoSearchControl({
      provider: provider,
      position: "topleft",
      showMarker: false,
      showPopup: false,
      autoClose: true,
      retainZoomLevel: true,
      animateZoom: true,
      keepResult: false,
      searchLabel: "Search",
    });

    map.addControl(searchControl);

    // Clean up control on component unmount
    return () => {
      map.removeControl(searchControl);
    };
  }, [map]);

  return null;
};

export default GeoSearch;
