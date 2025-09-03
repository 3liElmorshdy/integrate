import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { useGlobalLoader } from '../../context/GlobalLoaderContext';
import mission from "../../assets/images/5-OurMission/d315a7c807ee296d3354e6a5f698efe844c4ccd2.jpg";
import './Our.css';

function OurMission() {
  const { t, i18n } = useTranslation();
  const statsRef = useRef([]);
  const { showLoader, hideLoader } = useGlobalLoader();
  
  // API Integration State
  const [missionContent, setMissionContent] = useState(null);
  const [apiError, setApiError] = useState(null);

  const stats = [
    // { count: 4500, icon: 'fa-user-group', text: 'lawyersCount' },
    // { count: 8000, icon: 'fa-scale-balanced', text: 'casesCount' },
    // { count: 12000, icon: 'fa-users', text: 'clientsCount' },
    // { count: 95, icon: 'fa-star', text: 'satisfactionRate', isPercentage: true }
  ];

  // Function to fetch mission content from API
  const fetchMissionContent = async () => {
    try {
      showLoader(); // Show global loader
      setApiError(null);
      
      // Clean language parameter to prevent backend errors
      const cleanLanguage = i18n.language ? i18n.language.split(',')[0].trim() : 'en';
      
      const response = await axios.get('https://elitefairlawfirm.net/api/mission', {
        headers: {
          'Accept-Language': cleanLanguage,
          'Content-Type': 'application/json'
        }
      });
      
      console.log('Mission API Response:', response.data);
      
      if (response.data.success && response.data.data && response.data.data.content) {
        setMissionContent(response.data.data.content);
      } else {
        throw new Error('Invalid API response format');
      }
    } catch (error) {
      console.error('Error fetching mission content:', error);
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

  // Fetch mission content when component mounts or language changes
  useEffect(() => {
    fetchMissionContent();
  }, [i18n.language]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCountUp(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    statsRef.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      statsRef.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  const animateCountUp = (element) => {
    const target = +element.getAttribute('data-target');
    const isPercentage = element.getAttribute('data-percentage') === 'true';
    const CounterDuration = 1000; 
    const start = 0;
    const increment = target / (CounterDuration / 16); 

    const updateCount = () => {
      const current = +element.textContent.replace(/[^0-9.]/g, '');
      if (current < target) {
        const newValue = Math.ceil(current + increment);
        element.textContent = isPercentage 
          ? `${Math.min(newValue, target)}%` 
          : `+${Math.min(newValue, target)}`;
        requestAnimationFrame(updateCount);
      } else {
        element.textContent = isPercentage 
          ? `${target}%` 
          : `+${target}`;
      }
    };

    updateCount();
  };

  return (
    <section id="mission" className="mission-section">
      <div className="mission-container containerHero">
        <div className="mission-wrapper">
          <div className="mission-wrapper__description">
            {/* ===== OLD STATIC CONTENT (COMMENTED OUT) ===== */}
            {/*
            <h2>{t('ourMission')}</h2>
            <p>{t('ourMissionDesc')}</p>
            */}
            
            {/* ===== NEW DYNAMIC CONTENT FROM API ===== */}
            {apiError ? (
              <div>
                <p style={{ color: 'red' }}>Error loading content: {apiError}</p>
                {/* Fallback to static content on error */}
                <h2>{t('ourMission')}</h2>
                <p>{t('ourMissionDesc')}</p>
              </div>
            ) : missionContent ? (
              <div dangerouslySetInnerHTML={{ __html: missionContent }} />
            ) : (
              <div>
                <p>No content available from API</p>
                {/* Fallback to static content */}
                <h2>{t('ourMission')}</h2>
                <p>{t('ourMissionDesc')}</p>
              </div>
            )}
          </div>
          <div className="mission-wrapper__img">
            <img src={mission} alt={t('ourMission')} />
          </div>
        </div>

        {/* <div className="mission-stats">
          {stats.map((stat, index) => (
            <div className="mission-stat" key={index}>
              <div className="mission-stat__content d-flex flex-column">
                <h3 
                  ref={el => statsRef.current[index] = el}
                  data-target={stat.count}
                  data-percentage={stat.isPercentage || false}
                >
                  {stat.isPercentage ? '0%' : '+0'}
                </h3>
                <i className={`fa-solid ${stat.icon}`} aria-hidden="true"></i>
                <p>{t(stat.text)}</p>
              </div>
            </div>
          ))}
        </div> */}
      </div>
    </section>
  );
}

export default OurMission;