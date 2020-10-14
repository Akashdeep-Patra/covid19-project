import React from "react";
import "./map.scss";
import { Map as LeafletMap, TileLayer } from "react-leaflet";
import {showDataOnMap} from "../../api"
function Map({ countries,center, zoom }) {
  return (
    <div className="map-container">
      <LeafletMap center={center} zoom={zoom}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {showDataOnMap(countries,"cases")}
      </LeafletMap>
    </div>
  );
}

export default Map;
