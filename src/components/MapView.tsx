import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import { Icon, LatLng } from 'leaflet';
import { useGPS } from '../context/GPSContext';
import 'leaflet/dist/leaflet.css';
import './MapView.css';

const customIcon = new Icon({
  iconUrl: 'https://cdn.jsdelivr.net/npm/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://cdn.jsdelivr.net/npm/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const spoofedIcon = new Icon({
  iconUrl: 'https://cdn.jsdelivr.net/npm/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://cdn.jsdelivr.net/npm/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
  className: 'spoofed-marker'
});

const MapUpdater = () => {
  const map = useMap();
  const { currentPosition, spoofedPosition } = useGPS();
  
  useEffect(() => {
    if (currentPosition) {
      map.setView([currentPosition.lat, currentPosition.lng], map.getZoom());
    }
  }, [currentPosition, map]);
  
  return null;
};

const DraggableMarker = () => {
  const { spoofedPosition, updatePosition } = useGPS();
  const [position, setPosition] = useState<LatLng | null>(
    spoofedPosition ? new LatLng(spoofedPosition.lat, spoofedPosition.lng) : null
  );

  const map = useMapEvents({
    click(e) {
      setPosition(e.latlng);
      updatePosition({ lat: e.latlng.lat, lng: e.latlng.lng });
    },
  });

  const eventHandlers = useMemo(
    () => ({
      dragend(e) {
        const marker = e.target;
        const position = marker.getLatLng();
        setPosition(position);
        updatePosition({ lat: position.lat, lng: position.lng });
      },
    }),
    [updatePosition]
  );

  if (!position) return null;

  return (
    <Marker
      position={position}
      icon={spoofedIcon}
      draggable={true}
      eventHandlers={eventHandlers}
    >
      <Popup>
        <strong>Spoofed Position</strong><br />
        Lat: {position.lat.toFixed(6)}<br />
        Lng: {position.lng.toFixed(6)}
      </Popup>
    </Marker>
  );
};

const MapView: React.FC = () => {
  const { currentPosition } = useGPS();
  const [darkMap, setDarkMap] = useState(true);
  
  if (!currentPosition) {
    return <div className="loading-map">Loading map...</div>;
  }
  
  const toggleMapStyle = () => {
    setDarkMap(!darkMap);
  };
  
  return (
    <div className="map-container">
      <MapContainer
        center={[currentPosition.lat, currentPosition.lng]}
        zoom={13}
        zoomControl={false}
        attributionControl={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url={darkMap 
            ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
            : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          }
        />
        <MapUpdater />
        
        <Marker position={[currentPosition.lat, currentPosition.lng]} icon={customIcon}>
          <Popup>
            <strong>Actual Position</strong><br />
            Lat: {currentPosition.lat.toFixed(6)}<br />
            Lng: {currentPosition.lng.toFixed(6)}
          </Popup>
        </Marker>
        
        <DraggableMarker />
      </MapContainer>
      
      <div className="map-controls">
        <button className="map-style-toggle" onClick={toggleMapStyle}>
          {darkMap ? 'Light Map' : 'Dark Map'}
        </button>
      </div>
    </div>
  );
};

export default MapView;