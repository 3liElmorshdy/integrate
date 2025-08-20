import React from "react";
import { useTranslation } from 'react-i18next';
import "./Footer.css";
import footerImage from "../../assets/images/Footer/footerLogo.png";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="footer-container" role="contentinfo">
      <div className="footer-content">
        <div className="footer-image-section">
          <img src={footerImage} alt={t('footerImageAlt')} className="footer-image" />
        </div>

        <div className="footer-description-section">
          <div className="footer-section first-section">
            {/* <h3>{t('workingHours')}</h3> */}
            <p>{t('workingHoursSunToThu')}</p>
            <p>{t('workingHoursSat')}</p>
            <p>{t('workingHoursFri')}</p>
          </div>

          <div className="footer-section">
            {/* <h3>{t('address')}</h3> */}
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
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
