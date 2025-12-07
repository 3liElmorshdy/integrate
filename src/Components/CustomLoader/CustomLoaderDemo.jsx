import React, { useState } from 'react';
import CustomLoader from './CustomLoader';

const CustomLoaderDemo = () => {
  const [showLoader, setShowLoader] = useState(false);
  const [loaderComplete, setLoaderComplete] = useState(false);

  const handleStartLoader = () => {
    setShowLoader(true);
    setLoaderComplete(false);
  };

  const handleLoaderComplete = () => {
    setShowLoader(false);
    setLoaderComplete(true);
  };

  const handleReset = () => {
    setShowLoader(false);
    setLoaderComplete(false);
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f3f4f6',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '32px'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
        padding: '32px',
        maxWidth: '448px',
        width: '100%',
        textAlign: 'center'
      }}>
        <h1 style={{
          fontSize: '30px',
          fontWeight: 'bold',
          color: '#1f2937',
          marginBottom: '24px'
        }}>
          Custom Loader Demo
        </h1>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <button
            onClick={handleStartLoader}
            disabled={showLoader}
            style={{
              width: '100%',
              backgroundColor: showLoader ? '#9ca3af' : '#2563eb',
              color: 'white',
              fontWeight: '600',
              padding: '12px 24px',
              borderRadius: '8px',
              border: 'none',
              cursor: showLoader ? 'not-allowed' : 'pointer',
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => {
              if (!showLoader) e.target.style.backgroundColor = '#1d4ed8';
            }}
            onMouseLeave={(e) => {
              if (!showLoader) e.target.style.backgroundColor = '#2563eb';
            }}
          >
            {showLoader ? 'Loading...' : 'Start Custom Loader'}
          </button>
          
          {loaderComplete && (
            <div style={{
              backgroundColor: '#dcfce7',
              border: '1px solid #16a34a',
              color: '#15803d',
              padding: '16px',
              borderRadius: '8px'
            }}>
              <p style={{ fontWeight: '600', margin: '0 0 4px 0' }}>Loader Complete!</p>
              <p style={{ fontSize: '14px', margin: '0' }}>The custom loader animation has finished.</p>
            </div>
          )}
          
          {loaderComplete && (
            <button
              onClick={handleReset}
              style={{
                width: '100%',
                backgroundColor: '#4b5563',
                color: 'white',
                fontWeight: '600',
                padding: '8px 16px',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#374151'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#4b5563'}
            >
              Reset Demo
            </button>
          )}
        </div>
        
        <div style={{ marginTop: '32px', textAlign: 'left' }}>
          <h3 style={{
            fontSize: '18px',
            fontWeight: '600',
            color: '#374151',
            marginBottom: '12px'
          }}>
            Animation Sequence:
          </h3>
          <ol style={{
            fontSize: '14px',
            color: '#6b7280',
            lineHeight: '1.6',
            paddingLeft: '20px'
          }}>
            <li style={{ marginBottom: '4px' }}>1. White background + small circle</li>
            <li style={{ marginBottom: '4px' }}>2. Background changes to brown</li>
            <li style={{ marginBottom: '4px' }}>3. Logo appears in center</li>
            <li style={{ marginBottom: '4px' }}>4. Logo scales up (zoom effect)</li>
            <li style={{ marginBottom: '4px' }}>5. Logo scales back to normal</li>
            <li style={{ marginBottom: '4px' }}>6. Background back to white</li>
            <li style={{ marginBottom: '4px' }}>7. Small circle appears, then loader hides</li>
          </ol>
        </div>
      </div>
      
      {/* Custom Loader Component */}
      {showLoader && (
        <CustomLoader onComplete={handleLoaderComplete} />
      )}
    </div>
  );
};

export default CustomLoaderDemo;
