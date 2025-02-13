import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

function MapView({ position }) {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.setView(position, map.getZoom(), { animate: true });
    }
  }, [position, map]);

  return null;
}

function Map({ isDarkMode, position }) {
  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const { latitude, longitude } = pos.coords;
        setCurrentLocation({ lat: latitude, lng: longitude });
      });
    }
  }, []);

  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        // console.log(
        //   "Selected Location - Latitude:",
        //   e.latlng.lat,
        //   "Longitude:",
        //   e.latlng.lng
        // );
      },
    });

    return position ? <Marker position={position} /> : null;
  };

  return (
    <div>
      <MapContainer
        center={position || currentLocation || [28.6139, 77.209]} // Default: New Delhi
        zoom={10}
        className="h-[300px] sm:h-[500px] w-[90%] mx-auto relative z-0"
      >
        <TileLayer
          url={`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`}
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <MapView position={position} />
        {currentLocation && <Marker position={currentLocation} />}
        <LocationMarker />
      </MapContainer>

      {/* {position && (
        <div>
          <h3>Selected Location:</h3>
          <p>Latitude: {position.lat}</p>
          <p>Longitude: {position.lng}</p>
        </div>
      )}
      {currentLocation && (
        <div>
          <h3>Current Location:</h3>
          <p>Latitude: {currentLocation.lat}</p>
          <p>Longitude: {currentLocation.lng}</p>
        </div>
      )} */}
    </div>
  );
}

export default Map;
