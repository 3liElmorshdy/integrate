import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { useGlobalLoader } from '../../context/GlobalLoaderContext';
import "./Footer.css";
import footerImage from "../../assets/images/Footer/footerLogo.png";

const Footer = () => {
  const { t, i18n } = useTranslation();
  const { showLoader, hideLoader } = useGlobalLoader();
  
  // API Integration State
  const [footerData, setFooterData] = useState(null);
  const [apiError, setApiError] = useState(null);

  // Function to fetch footer data from API
  const fetchFooterData = async () => {
    try {
      showLoader(); // Show global loader
      setApiError(null);
      
      // Clean language parameter to prevent backend errors
      const cleanLanguage = i18n.language ? i18n.language.split(',')[0].trim() : 'en';
      
      // TODO: Replace with actual footer API endpoint when backend provides it
      // For now, using a mock API call structure
      const response = await axios.get('https://elitefairlawfirm.net/api/footer', {
        headers: {
          'Accept-Language': cleanLanguage,
          'Content-Type': 'application/json'
        }
      });
      
      console.log('Footer API Response:', response.data);
      
      if (response.data.success && response.data.data) {
        setFooterData(response.data.data);
      } else {
        throw new Error('Invalid API response format');
      }
    } catch (error) {
      console.error('Error fetching footer data:', error);
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

  // Fetch footer data when component mounts or language changes
  useEffect(() => {
    fetchFooterData();
  }, [i18n.language]);

  // Function to decode HTML entities (for Arabic text)
  const decodeHtml = (html) => {
    if (!html) return '';
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  };

  return (
    <footer className="footer-container" role="contentinfo">
      <div className="footer-content">
        <div className="footer-image-section">
          <img src={footerImage} alt={t('footerImageAlt')} className="footer-image" />
        </div>

        <div className="footer-description-section">
          <div className="footer-section first-section">
            {/* ===== OLD STATIC CONTENT (COMMENTED OUT) ===== */}
            {/*
            <h3>{t('workingHours')}</h3>
            <p>{t('workingHoursSunToThu')}</p>
            <p>{t('workingHoursSat')}</p>
            <p>{t('workingHoursFri')}</p>
            */}
            
            {/* ===== NEW DYNAMIC CONTENT FROM API ===== */}
            {apiError ? (
              <div>
                {/* <p style={{ color: 'red' }}>Error loading footer data: {apiError}</p> */}
                {/* Fallback to static content on error */}
                <h3>{t('workingHours')}</h3>
                <p>{t('workingHoursSunToThu')}</p>
                <p>{t('workingHoursSat')}</p>
                <p>{t('workingHoursFri')}</p>
              </div>
            ) : footerData ? (
              <div>
                {footerData.working_hours_title && (
                  <h3>{decodeHtml(footerData.working_hours_title)}</h3>
                )}
                {footerData.working_hours_sun_thu && (
                  <p>{decodeHtml(footerData.working_hours_sun_thu)}</p>
                )}
                {footerData.working_hours_sat && (
                  <p>{decodeHtml(footerData.working_hours_sat)}</p>
                )}
                {footerData.working_hours_fri && (
                  <p>{decodeHtml(footerData.working_hours_fri)}</p>
                )}
              </div>
            ) : (
              <div>
                {/* Fallback to static content */}
                <h3>{t('workingHours')}</h3>
                <p>{t('workingHoursSunToThu')}</p>
                <p>{t('workingHoursSat')}</p>
                <p>{t('workingHoursFri')}</p>
              </div>
            )}
          </div>

          <div className="footer-section">
            {/* ===== OLD STATIC CONTENT (COMMENTED OUT) ===== */}
            {/*
            <h3>{t('address')}</h3>
            <address>
              <p>{t('officeAddress1')}</p>
              <p>{t('officeAddress2')}</p>
              <p>
                <a href="mailto:info@elitefairlawfirm.com" className="footer-link">
                  info@elitefairlawfirm.com
                </a>
              </p>
              <p>
                <a href="tel:0138222240" className="footer-link">
                  {t('phoneNumber')}: 0138222240
                </a>
              </p>
            </address>
            */}
            
            {/* ===== NEW DYNAMIC CONTENT FROM API ===== */}
            {apiError ? (
              <address>
                {/* Fallback to static content on error */}
                <p>{t('officeAddress1')}</p>
                <p>{t('officeAddress2')}</p>
                <p>
                  <a href="mailto:info@elitefairlawfirm.com" className="footer-link">
                    info@elitefairlawfirm.com
                  </a>
                </p>
                <p>
                  <a href="tel:0138222240" className="footer-link">
                    {t('phoneNumber')}: 0138222240
                  </a>
                </p>
              </address>
            ) : footerData ? (
              <address>
                {footerData.address_line1 && (
                  <p>{decodeHtml(footerData.address_line1)}</p>
                )}
                {footerData.address_line2 && (
                  <p>{decodeHtml(footerData.address_line2)}</p>
                )}
                {footerData.email && (
                  <p>
                    <a href={`mailto:${footerData.email}`} className="footer-link">
                      {footerData.email}
                    </a>
                  </p>
                )}
                {footerData.phone && (
                  <p>
                    <a href={`tel:${footerData.phone}`} className="footer-link">
                      {footerData.phone_label || t('phoneNumber')}: {footerData.phone}
                    </a>
                  </p>
                )}
              </address>
            ) : (
              <address>
                {/* Fallback to static content */}
                <p>{t('officeAddress1')}</p>
                <p>{t('officeAddress2')}</p>
                <p>
                  <a href="mailto:info@elitefairlawfirm.com" className="footer-link">
                    info@elitefairlawfirm.com
                  </a>
                </p>
                <p>
                  <a href="tel:0138222240" className="footer-link">
                    {t('phoneNumber')}: 0138222240
                  </a>
                </p>
              </address>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
