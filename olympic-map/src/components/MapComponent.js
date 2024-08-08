import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const MapComponent = ({ venues, filteredVenue }) => {
  const mapRef = useRef();
  const markersRef = useRef({});

  useEffect(() => {
    if (filteredVenue && mapRef.current && markersRef.current[filteredVenue.id]) {
      const marker = markersRef.current[filteredVenue.id];
      const latLng = marker.getLatLng();
      mapRef.current.setView(latLng, 12); // Ajusta o nível de zoom para 12
      marker.openPopup();
    }
  }, [filteredVenue]);

  return (
    <MapContainer center={[48.8566, 2.3522]} zoom={12} className="map-container" ref={mapRef}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {venues.map((venue) => {
        const uniqueDisciplines = new Set(venue.events.map(event => event.discipline_name));
        return (
          <Marker
            key={venue.id}
            position={[venue.lat, venue.lon]}
            ref={el => (markersRef.current[venue.id] = el)}
          >
            <Popup>
              <h2>{venue.name}</h2>
              <a href={venue.url} target="_blank" rel="noreferrer">More information</a>
              {uniqueDisciplines.size > 0 && (
                <>
                  <h3>Sports Disciplines:</h3>
                  <ul>
                    {[...uniqueDisciplines].map((discipline, index) => (
                      <li key={index}>{discipline}</li>
                    ))}
                  </ul>
                </>
              )}
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default MapComponent;
