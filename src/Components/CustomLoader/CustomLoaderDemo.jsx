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
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-8">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Custom Loader Demo
        </h1>
        
        <div className="space-y-4">
          <button
            onClick={handleStartLoader}
            disabled={showLoader}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
          >
            {showLoader ? 'Loading...' : 'Start Custom Loader'}
          </button>
          
          {loaderComplete && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg">
              <p className="font-semibold">Loader Complete!</p>
              <p className="text-sm">The custom loader animation has finished.</p>
            </div>
          )}
          
          {loaderComplete && (
            <button
              onClick={handleReset}
              className="w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
            >
              Reset Demo
            </button>
          )}
        </div>
        
        <div className="mt-8 text-left">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">
            Animation Sequence:
          </h3>
          <ol className="text-sm text-gray-600 space-y-1">
            <li>1. White background + small circle</li>
            <li>2. Background changes to brown</li>
            <li>3. Logo appears in center</li>
            <li>4. Logo scales up (zoom effect)</li>
            <li>5. Logo scales back to normal</li>
            <li>6. Background back to white</li>
            <li>7. Small circle appears, then loader hides</li>
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
