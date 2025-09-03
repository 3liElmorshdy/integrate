import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import loyalty from "../../assets/images/3-Who We Are/Loyal.png"
import "./WhoWeAre.css";
import { useGlobalLoader } from '../../context/GlobalLoaderContext';
import axios from 'axios';

function WhoWeAre() {
  const { t, i18n } = useTranslation();
  const { showLoader, hideLoader } = useGlobalLoader();
  
  // API Integration State
  const [apiContent, setApiContent] = useState(null);
  const [apiError, setApiError] = useState(null);

  // Function to fetch content from API using axios
  const fetchApiContent = async () => {
    try {
      showLoader(); // Show global loader
      setApiError(null);
      
      // Clean language parameter to prevent backend errors
      const cleanLanguage = i18n.language ? i18n.language.split(',')[0].trim() : 'en';
      
      const response = await axios.get('https://elitefairlawfirm.net/api/about', {
        headers: {
          'Accept-Language': cleanLanguage,
          'Content-Type': 'application/json'
        }
      });
      
      console.log('About API Response:', response.data);
      
      if (response.data.success && response.data.data && response.data.data.content) {
        setApiContent(response.data.data.content);
      } else {
        throw new Error('Invalid API response format');
      }
    } catch (error) {
      console.error('Error fetching API content:', error);
      if (error.response) {
        setApiError(`HTTP Error: ${error.response.status} - ${error.response.data?.message || 'Unknown error'}`);
      } else if (error.request) {
        setApiError('Network Error: No response received from server');
      } else {
        setApiError(`Request Error: ${error.message}`);
      }
    } finally {
      hideLoader(); // Hide global loader
    }
  };

  // Fetch content when component mounts or language changes
  useEffect(() => {
    fetchApiContent();
  }, [i18n.language]);



  return (
    <section id="about" className="who-section">
      <div className="who-container containerHero">
        <div className="who-wrapper">
          <div className="who-wrapper__description">
            {/* ===== OLD STATIC CONTENT (COMMENTED OUT) ===== */}
            {/*
            <h2>{t('whoWeAre')}</h2>
            <p>{t('whoWeAreDesc')}</p>
            <p>{t('whoWeAreDesc2')}</p>
            */}
            
            {/* ===== NEW DYNAMIC CONTENT FROM API ===== */}
            {apiError ? (
              <div>
                <p style={{ color: 'red' }}>Error loading content: {apiError}</p>
                {/* Fallback to static content on error */}
                <h2>{t('whoWeAre')}</h2>
                <p>{t('whoWeAreDesc')}</p>
                <p>{t('whoWeAreDesc2')}</p>
              </div>
            ) : apiContent ? (
              <div dangerouslySetInnerHTML={{ __html: apiContent }} />
            ) : (
              <div>
                <p>No content available from API</p>
                {/* Fallback to static content */}
                <h2>{t('whoWeAre')}</h2>
                <p>{t('whoWeAreDesc')}</p>
                <p>{t('whoWeAreDesc2')}</p>
              </div>
            )}
          </div>
          <div className="who-wrapper__img">
            <img src={loyalty} alt={t('whoWeAre')} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhoWeAre