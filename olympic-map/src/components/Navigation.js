// src/components/Navigation.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/map">Olympic Map</Link></li>
        <li><Link to="/ranking">Medal Ranking</Link></li>
      </ul>
    </nav>
  );
};

export default Navigation;
