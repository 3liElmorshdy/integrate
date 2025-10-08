import React, { useState } from 'react';
import CustomLoader from './CustomLoader';

// Simple test component to verify CustomLoader works
const TestCustomLoader = () => {
  const [showLoader, setShowLoader] = useState(false);

  const handleStartLoader = () => {
    setShowLoader(true);
  };

  const handleLoaderComplete = () => {
    setShowLoader(false);
    alert('CustomLoader animation completed!');
  };

  return (
    <div style={{
      padding: '20px',
      textAlign: 'center',
      backgroundColor: '#f0f0f0',
      minHeight: '100vh'
    }}>
      <h1 style={{ color: '#333', marginBottom: '20px' }}>
        CustomLoader Test
      </h1>
      
      <button
        onClick={handleStartLoader}
        style={{
          backgroundColor: '#007bff',
          color: 'white',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '16px'
        }}
      >
        Test Custom Loader
      </button>
      
      <p style={{ marginTop: '20px', color: '#666' }}>
        Click the button above to test the CustomLoader animation sequence.
      </p>
      
      {showLoader && (
        <CustomLoader onComplete={handleLoaderComplete} />
      )}
    </div>
  );
};

export default TestCustomLoader;
