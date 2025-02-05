import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function Map() {

  const [position, setPosition] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ lat: latitude, lng: longitude });
      });
    }
  }, []);

  // 📍 Create a marker at the clicked location
  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        const lat = e.latlng.lat; // Get latitude
        const lng = e.latlng.lng; // Get longitude
        setPosition({ lat, lng }); // Save the position in state
        console.log("Selected Location - Latitude:", lat, "Longitude:", lng); // Log to console
      },
    });

    return position === null ? null : <Marker position={position} />;
  };

  return (
    <div>
      {/* Map Container */}
      <MapContainer
        center={currentLocation || [28.6139, 77.2090]} // Default center (New Delhi) or current location
        zoom={10}
        className="h-[300px] sm:h-[500px] w-[90%] mx-auto"
        // style={{ height: "500px", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {currentLocation && <Marker position={currentLocation} />}
        <LocationMarker />
      </MapContainer>

      {/* Display the current latitude and longitude */}
      {position && (
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
      )}
    </div>
  );
};

export default Map;
