import React, { useState, useEffect } from 'react';
import { CustomLoader } from './CustomLoader';

// Example of how to integrate CustomLoader into your main App
const AppIntegrationExample = () => {
  const [showCustomLoader, setShowCustomLoader] = useState(true);
  const [isAppReady, setIsAppReady] = useState(false);

  // Simulate app initialization (loading data, setting up services, etc.)
  useEffect(() => {
    const initializeApp = async () => {
      // Simulate loading time
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Your app initialization logic here
      // - Load user data
      // - Initialize services
      // - Setup configurations
      // - etc.
      
      setIsAppReady(true);
    };

    initializeApp();
  }, []);

  const handleCustomLoaderComplete = () => {
    setShowCustomLoader(false);
  };

  // Show custom loader while app is initializing
  if (!isAppReady || showCustomLoader) {
    return <CustomLoader onComplete={handleCustomLoaderComplete} />;
  }

  // Your main app content
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f9fafb',
      padding: '32px 0'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 16px'
      }}>
        <h1 style={{
          fontSize: '36px',
          fontWeight: 'bold',
          textAlign: 'center',
          color: '#1f2937',
          marginBottom: '32px'
        }}>
          Welcome to Your App!
        </h1>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
          padding: '32px'
        }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: '600',
            color: '#374151',
            marginBottom: '16px'
          }}>
            App Successfully Loaded
          </h2>
          <p style={{
            color: '#6b7280',
            marginBottom: '24px',
            lineHeight: '1.6'
          }}>
            The custom loader has completed its animation sequence and your app is now ready to use.
          </p>
          
          <div style={{
            backgroundColor: '#eff6ff',
            border: '1px solid #93c5fd',
            borderRadius: '8px',
            padding: '16px',
            marginBottom: '24px'
          }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '600',
              color: '#1e40af',
              marginBottom: '8px'
            }}>
              Integration Notes:
            </h3>
            <ul style={{
              color: '#1e40af',
              fontSize: '14px',
              lineHeight: '1.6',
              paddingLeft: '20px'
            }}>
              <li style={{ marginBottom: '4px' }}>• CustomLoader runs once on app initialization</li>
              <li style={{ marginBottom: '4px' }}>• Replace logo placeholder with your actual logo</li>
              <li style={{ marginBottom: '4px' }}>• Adjust animation timing in the steps array</li>
              <li style={{ marginBottom: '4px' }}>• Customize colors to match your brand</li>
            </ul>
          </div>
          
          <button
            onClick={() => {
              setShowCustomLoader(true);
              setIsAppReady(false);
            }}
            style={{
              backgroundColor: '#2563eb',
              color: 'white',
              fontWeight: '600',
              padding: '8px 16px',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#1d4ed8'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#2563eb'}
          >
            Restart Custom Loader
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppIntegrationExample;
