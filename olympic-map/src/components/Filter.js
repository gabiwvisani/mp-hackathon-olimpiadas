import React from 'react';
import './Filter.css'; // Importar o CSS separado para estilização

const Filter = ({ filter, handleFilterChange }) => {
  return (
    <div className="filter">
      <input
        type="text"
        placeholder="Filter by venue name"
        value={filter}
        onChange={handleFilterChange}
      />
    </div>
  );
};

export default Filter;
