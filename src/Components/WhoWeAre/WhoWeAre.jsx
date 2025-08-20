import React from 'react'
import { useTranslation } from 'react-i18next';
import loyalty from "../../assets/images/3-Who We Are/Loyal.png"
import "./WhoWeAre.css";

function WhoWeAre() {
  const { t } = useTranslation();

  return (
    <section id="about" className="who-section">
      <div className="who-container containerHero">
        <div className="who-wrapper">
          <div className="who-wrapper__description">
            <h2>{t('whoWeAre')}</h2>
            <p>{t('whoWeAreDesc')}</p>
            <p>{t('whoWeAreDesc2')}</p>
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