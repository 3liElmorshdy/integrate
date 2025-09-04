import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CustomLoader = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  // Animation steps configuration
  const steps = [
    {
      id: 0,
      name: "Initial Circle",
      duration: 1000, // 1 second
      description: "Full white background with small circle in center"
    },
    {
      id: 1,
      name: "Background Transition",
      duration: 800, // 0.8 seconds
      description: "Background changes to #65471E, circle disappears"
    },
    {
      id: 2,
      name: "Logo Appearance",
      duration: 600, // 0.6 seconds
      description: "Logo appears in center on #65471E background"
    },
    {
      id: 3,
      name: "Logo Scale Up",
      duration: 800, // 0.8 seconds
      description: "Logo scales up with zoom effect"
    },
    {
      id: 4,
      name: "Logo Scale Down",
      duration: 600, // 0.6 seconds
      description: "Logo scales back to normal size"
    },
    {
      id: 5,
      name: "Background to White",
      duration: 800, // 0.8 seconds
      description: "Background transitions back to white"
    },
    {
      id: 6,
      name: "Final Circle",
      duration: 1000, // 1 second
      description: "Show small circle again, then hide loader"
    }
  ];

  // Animation sequence controller
  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        // Animation complete - hide loader and show main content
        setIsVisible(false);
        setTimeout(() => {
          onComplete && onComplete();
        }, 500); // Small delay before calling onComplete
      }
    }, steps[currentStep].duration);

    return () => clearTimeout(timer);
  }, [currentStep, steps, onComplete]);

  // Animation variants for different elements
  const backgroundVariants = {
    white: {
      backgroundColor: "#FFFFFF",
      transition: { duration: 0.8, ease: "easeInOut" }
    },
    brown: {
      backgroundColor: "#65471E",
      transition: { duration: 0.8, ease: "easeInOut" }
    }
  };

  const circleVariants = {
    hidden: {
      scale: 0,
      opacity: 0,
      transition: { duration: 0.3 }
    },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const logoVariants = {
    hidden: {
      scale: 0,
      opacity: 0,
      transition: { duration: 0.3 }
    },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    },
    scaleUp: {
      scale: 1.3,
      transition: { duration: 0.8, ease: "easeInOut" }
    },
    scaleDown: {
      scale: 1,
      transition: { duration: 0.6, ease: "easeInOut" }
    }
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center"
        variants={backgroundVariants}
        animate={currentStep === 0 || currentStep === 5 || currentStep === 6 ? "white" : "brown"}
        initial="white"
      >
        {/* Step 0 & 6: Small Circle */}
        {(currentStep === 0 || currentStep === 6) && (
          <motion.div
            className="w-6 h-6 rounded-full"
            style={{ backgroundColor: "#65471E" }}
            variants={circleVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          />
        )}

        {/* Step 2, 3, 4: Logo */}
        {(currentStep === 2 || currentStep === 3 || currentStep === 4) && (
          <motion.div
            className="flex items-center justify-center"
            variants={logoVariants}
            initial="hidden"
            animate={
              currentStep === 2 ? "visible" :
              currentStep === 3 ? "scaleUp" :
              currentStep === 4 ? "scaleDown" : "visible"
            }
          >
            {/* Replace with real asset - Logo placeholder */}
            <div className="w-20 h-20 bg-white rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-2xl font-bold text-gray-800">LOGO</span>
            </div>
            {/* 
              TODO: Replace with real logo image
              <img 
                src="/path/to/logo.png" 
                alt="Company Logo" 
                className="w-20 h-20 object-contain"
              />
            */}
          </motion.div>
        )}

        {/* Debug Info - Remove in production */}
        {process.env.NODE_ENV === 'development' && (
          <div className="absolute top-4 left-4 bg-black bg-opacity-50 text-white p-2 rounded text-sm">
            <div>Step: {currentStep + 1}/7</div>
            <div>Phase: {steps[currentStep].name}</div>
            <div>Duration: {steps[currentStep].duration}ms</div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default CustomLoader;
