import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MapComponent from './components/MapComponent';
import Filter from './components/Filter';
import MedalRanking from './components/MedalRanking';
import Home from './Home';
import Navigation from './components/Navigation';
import './App.css';

const App = () => {
  const [venues, setVenues] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const response = await axios.get('https://apis.codante.io/olympic-games/venues');
        const venuesWithCoords = await Promise.all(response.data.data.map(async (venue) => {
          const coords = await getCoordinates(venue.name);
          const events = await fetchEventsForVenue(venue.id);
          return { ...venue, lat: coords[0], lon: coords[1], events };
        }));
        setVenues(venuesWithCoords);
      } catch (error) {
        console.error('Erro ao obter locais:', error);
      }
    };

    fetchVenues();
  }, []);

  const getCoordinates = async (venueName) => {
    try {
      const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
        params: {
          address: venueName,
          key: 'AIzaSyDnfwgoG1B-blXEGIeX1WJXju4DefMedbc'
        }
      });
      const location = response.data.results[0].geometry.location;
      return [location.lat, location.lng];
    } catch (error) {
      console.error('Erro ao obter coordenadas:', error);
      return [0, 0];
    }
  };

  const fetchEventsForVenue = async (venueId) => {
    let events = [];
    let page = 1;
    let totalPages = 1;
    while (page <= totalPages) {
      try {
        const response = await axios.get('https://apis.codante.io/olympic-games/events', {
          params: {
            venue: venueId,
            page: page
          }
        });
        events = events.concat(response.data.data);
        totalPages = response.data.meta.last_page;
        page += 1;
      } catch (error) {
        console.error('Erro ao obter eventos:', error);
        break;
      }
    }

    return events;
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredVenues = venues.filter(venue => 
    venue.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <Router>
      <div className="app">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/map" element={
            <div className="map-page-container">
              <h1 className="map-title">Map of the Olympic</h1>
              <Filter filter={filter} handleFilterChange={handleFilterChange} />
              <MapComponent venues={filteredVenues} filteredVenue={filteredVenues[0]} />
            </div>
          } />
          <Route path="/ranking" element={<MedalRanking />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
