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
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Welcome to Your App!
        </h1>
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            App Successfully Loaded
          </h2>
          <p className="text-gray-600 mb-6">
            The custom loader has completed its animation sequence and your app is now ready to use.
          </p>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-blue-800 mb-2">
              Integration Notes:
            </h3>
            <ul className="text-blue-700 space-y-1 text-sm">
              <li>• CustomLoader runs once on app initialization</li>
              <li>• Replace logo placeholder with your actual logo</li>
              <li>• Adjust animation timing in the steps array</li>
              <li>• Customize colors to match your brand</li>
            </ul>
          </div>
          
          <button
            onClick={() => {
              setShowCustomLoader(true);
              setIsAppReady(false);
            }}
            className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
          >
            Restart Custom Loader
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppIntegrationExample;
