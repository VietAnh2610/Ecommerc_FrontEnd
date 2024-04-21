
import './LoadingComponent.scss'
import React from 'react';

const LoadingComponent = () => {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p>Loading...</p>
    </div>
  );
};

export default LoadingComponent;
