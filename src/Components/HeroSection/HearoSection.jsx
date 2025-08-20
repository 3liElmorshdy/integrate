import React from "react";
import { useTranslation } from 'react-i18next';
import "./HeroSection.css";
import group from "../../assets/images/2-header/groub.svg";
import arabic from "../../assets/images/2-header/Arabic.svg";
import google from "../../assets/images/2-header/google.png";
import iphone from "../../assets/images/2-header/iphone.png";

function HeroSection() {
  const { t, i18n } = useTranslation(); // أضف i18n من useTranslation

  return (
    <div id="hero-section">
      <div className="containerHero">
        <div className="container__wrapper">
          <div className="wrapper__intro">
            <h3 className="legal-slogan">{t('legalSlogan')}</h3>
            <p>{t('forIndividuals')}</p>
          </div>
          <div className="mask-group">
            
            <img 
              src={i18n.language === 'ar' ? arabic : group} 
              alt={i18n.language === 'ar' ? "Arabic illustration" : "Group illustration"} 
            />
          </div>
        </div>
        <div className="download-store">
          <h3>{t('downloadApp')}</h3>
          <div className="download-store__wrapper">
            <a 
              href="https:google.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="googleStore"
            >
              <img src={google} className="imgTEst" alt="Download from Google Play" />
              <p className="Handel-Text">{t('googlePlay')}</p>
            </a>
            
            <a 
              href="https:google.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="iphoneStore"
            >
              <img src={iphone} alt="Download from App Store" />
              <p className="Handel-Text">{t('appStore')}</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;