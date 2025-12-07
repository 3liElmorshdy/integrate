import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '../../assets/images/LOgo/LOgo.png';

const CustomLoader = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(true);


  const animationDurations = [200, 200, 800, 1000, 600, 200, 200];

  // Animation sequence controller
  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentStep < animationDurations.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        setIsVisible(false);
        setTimeout(() => {
          onComplete && onComplete();
        }, 200); // Small delay before calling onComplete
      }
    }, animationDurations[currentStep]);

    return () => clearTimeout(timer);
  }, [currentStep, animationDurations, onComplete]);

  // Animation variants for different elements
  // Base background stays white; a circular overlay handles the brown reveal/fade
  const backgroundCircleVariants = {
    hidden: {
      scale: 0,
      opacity: 0
    },
    expanding: {
      scale: 20,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeInOut" }
    },
    expanded: {
      scale: 20,
      opacity: 1
    },
    fading: {
      scale: 20,
      opacity: 0,
      transition: { duration: 0.4, ease: "easeInOut" }
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
      transition: { duration: 0.2 }
    },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    },
    scaleUp: {
      scale: 1.5,
      transition: { duration: 0.8, ease: "easeInOut" }
    },
    scaleDown: {
      scale: 1,
      transition: { duration: 0.8, ease: "easeInOut" }
    }
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#FFFFFF'
        }}
      >
        {/* Expanding/Fading background circle overlay */}
        {(currentStep >= 1 && currentStep <= 5) && (
          <motion.div
            style={{
              position: 'absolute',
              width: '25vmax',
              height: '25vmax',
              borderRadius: '50%',
              backgroundColor: '#65471E'
            }}
            variants={backgroundCircleVariants}
            initial="hidden"
            animate={
              currentStep === 1 ? 'expanding' :
              currentStep >= 2 && currentStep <= 4 ? 'expanded' :
              currentStep === 5 ? 'fading' : 'hidden'
            }
          />
        )}
        {/* Step 0 & 6: Small Circle */}
        {(currentStep === 0 || currentStep === 6) && (
          <motion.div
            style={{
              width: '25px',
              height: '25px',
              borderRadius: '50%',
              backgroundColor: '#65471E'
            }}
            variants={circleVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          />
        )}

        {/* Step 2, 3, 4: Logo */}
        {(currentStep === 2 || currentStep === 3 || currentStep === 4) && (
          <motion.div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            variants={logoVariants}
            initial="hidden"
            animate={
              currentStep === 2 ? "visible" :
              currentStep === 3 ? "scaleUp" :
              currentStep === 4 ? "scaleDown" : "visible"
            }
          >
            {/* Company Logo */}
            <img 
              src={Logo} 
              alt="Elite Fair Law Firm Logo" 
              style={{
                width: '150px',
                height: '150px',
                objectFit: 'contain',
                filter: 'drop-shadow(0 15px 35px rgba(0, 0, 0, 0.3))'
              }}
            />
          </motion.div>
        )}

      </motion.div>
    </AnimatePresence>
  );
};

export default CustomLoader;
