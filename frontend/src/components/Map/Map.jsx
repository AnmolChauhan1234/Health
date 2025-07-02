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
        // Handle map click events if needed
      },
    });

    return null; // No marker rendered here
  };

  return (
    <div>
      <MapContainer
        center={position || currentLocation || [28.4744, 77.5038]} // Default: Sector 83, Greater Noida
        zoom={10}
        className="h-[300px] sm:h-[500px] w-[90%] mx-auto relative z-0"
      >
        <TileLayer
          url={`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`}
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <MapView position={position} />
        {/* Render only one marker based on the priority */}
        {position ? (
          <Marker position={position} /> // Show searched location marker
        ) : (
          currentLocation && <Marker position={currentLocation} /> // Show current location marker
        )}
        <LocationMarker />
      </MapContainer>
    </div>
  );
}

export default Map;
