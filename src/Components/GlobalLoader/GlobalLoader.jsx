import React from 'react';
import './GlobalLoader.css';

const GlobalLoader = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className="global-loader-overlay">
      <div className="global-loader-spinner">
        <div className="spinner"></div>
        <p className="loading-text">Loading...</p>
      </div>
    </div>
  );
};

export default GlobalLoader;
