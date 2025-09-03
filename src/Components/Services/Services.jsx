import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { useGlobalLoader } from '../../context/GlobalLoaderContext';
import './Services.css'

function Services() {
  const { t, i18n } = useTranslation();
  const { showLoader, hideLoader } = useGlobalLoader();
  
  // API Integration State
  const [categories, setCategories] = useState([]);
  const [apiError, setApiError] = useState(null);

  // Function to fetch categories from API
  const fetchCategories = async () => {
    try {
      showLoader(); // Show global loader
      setApiError(null);
      
      // Clean language parameter to prevent backend errors
      const cleanLanguage = i18n.language ? i18n.language.split(',')[0].trim() : 'en';
      
      const response = await axios.get('https://elitefairlawfirm.net/api/select/categories', {
        headers: {
          'Accept-Language': cleanLanguage,
          'Content-Type': 'application/json'
        }
      });
      
      console.log('Categories API Response:', response.data);
      
      if (response.data.data && Array.isArray(response.data.data)) {
        setCategories(response.data.data);
      } else {
        throw new Error('Invalid API response format');
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
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

  // Fetch categories when component mounts or language changes
  useEffect(() => {
    fetchCategories();
  }, [i18n.language]);

  // Function to decode HTML entities (for Arabic text)
  const decodeHtml = (html) => {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  };

  // Function to get appropriate icon based on service category
  const getServiceIcon = (categoryId) => {
    const iconMap = {
      1: 'fa-scale-balanced', // Civil Law
      2: 'fa-briefcase', // Commercial Law
      3: 'fa-gavel', // Criminal Law
      4: 'fa-landmark', // Administrative Law
      5: 'fa-users', // Labor Law
      6: 'fa-home', // Real Estate Law
    };
    return iconMap[categoryId] || 'fa-legal';
  };

  return (
    <section id="services" className="services-section">
      <div className="services-container containerHero">
        
        {/* ===== OLD STATIC CONTENT (COMMENTED OUT) ===== */}
        {/*
        <h2>{t('servicesTitle')}</h2>
        <p className="services-subtitle">{t('servicesSubtitle')}</p>
        <div className="services-row">
          <article className="services-item">
            <div className="services-item__icon">
              <i className="fa-solid fa-scale-balanced" aria-hidden="true"></i>
            </div>
            <div className="services-item__desc">
              <h3>{t('caseStudyTitle1')}</h3>
              <p className="HandelText">{t('caseStudyDesc1')}</p>
            </div>
          </article>

          <article className="services-item">
            <div className="services-item__icon">
              <i className="fa-solid fa-file-lines" aria-hidden="true"></i>
            </div>
            <div className="services-item__desc">
              <h3>{t('caseStudyTitle2')}</h3>
              <p className="HandelText">{t('caseStudyDesc2')}</p>
            </div>
          </article>

          <article className="services-item">
            <div className="services-item__icon">
              <i className="fa-solid fa-file-signature" aria-hidden="true"></i>
            </div>
            <div className="services-item__desc">
              <h3>{t('caseStudyTitle3')}</h3>
              <p className="HandelText">{t('caseStudyDesc3')}</p>
            </div>
          </article>

          <article className="services-item">
            <div className="services-item__icon">
              <i className="fa-solid fa-gavel" aria-hidden="true"></i>
            </div>
            <div className="services-item__desc">
              <h3>{t('caseStudyTitle4')}</h3>
              <p className="HandelText">{t('caseStudyDesc4')}</p>
            </div>
          </article>

          <article className="services-item">
            <div className="services-item__icon">
              <i className="fa-solid fa-file-invoice" aria-hidden="true"></i>
            </div>
            <div className="services-item__desc">
              <h3>{t('caseStudyTitle5')}</h3>
              <p className="HandelText">{t('caseStudyDesc5')}</p>
            </div>
          </article>

          <article className="services-item">
            <div className="services-item__icon">
              <i className="fa-solid fa-landmark" aria-hidden="true"></i>
            </div>
            <div className="services-item__desc">
              <h3>{t('caseStudyTitle6')}</h3>
              <p className="HandelText">{t('caseStudyDesc6')}</p>
            </div>
          </article>

          <article className="services-item">
            <div className="services-item__icon">
              <i className="fa-solid fa-registered" aria-hidden="true"></i>
            </div>
            <div className="services-item__desc">
              <h3>{t('caseStudyTitle7')}</h3>
              <p className="HandelText">{t('caseStudyDesc7')}</p>
            </div>
          </article>

          <article className="services-item">
            <div className="services-item__icon">
              <i className="fa-solid fa-ellipsis" aria-hidden="true"></i>
            </div>
            <div className="services-item__desc">
              <h3>{t('caseStudyTitle8')}</h3>
              <p className="HandelText">{t('caseStudyDesc8')}</p>
            </div>
          </article>
        </div>
        */}

        {/* ===== NEW DYNAMIC CONTENT FROM API ===== */}
        <h2>{t('servicesTitle')}</h2>
        <p className="services-subtitle">{t('servicesSubtitle')}</p>
        
        {apiError ? (
          <div>
            <p style={{ color: 'red' }}>Error loading services: {apiError}</p>
            {/* Fallback to static content on error */}
            <div className="services-row">
              <article className="services-item">
                <div className="services-item__icon">
                  <i className="fa-solid fa-scale-balanced" aria-hidden="true"></i>
                </div>
                <div className="services-item__desc">
                  <h3>{t('caseStudyTitle1')}</h3>
                  <p className="HandelText">{t('caseStudyDesc1')}</p>
                </div>
              </article>
              {/* Add more fallback items as needed */}
            </div>
          </div>
        ) : categories.length > 0 ? (
          <div className="services-row">
            {categories.map((category) => (
              <article key={category.id} className="services-item">
                <div className="services-item__icon">
                  <i className={`fa-solid ${getServiceIcon(category.id)}`} aria-hidden="true"></i>
                </div>
                <div className="services-item__desc">
                  <h3>{decodeHtml(category.text)}</h3>
                  <p className="HandelText">{decodeHtml(category.description)}</p>
                  {category.starting_price && (
                    <div className="service-price">
                      <span className="price-label">Starting from:</span>
                      <span className="price-amount">{category.formatted_starting_price}</span>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div>
            <p>No services available from API</p>
            {/* Fallback to static content */}
            <div className="services-row">
              <article className="services-item">
                <div className="services-item__icon">
                  <i className="fa-solid fa-scale-balanced" aria-hidden="true"></i>
                </div>
                <div className="services-item__desc">
                  <h3>{t('caseStudyTitle1')}</h3>
                  <p className="HandelText">{t('caseStudyDesc1')}</p>
                </div>
              </article>
              {/* Add more fallback items as needed */}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Services;