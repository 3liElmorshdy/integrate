import React from "react";
import { useTranslation } from 'react-i18next';
import './Services.css'

function Services() {
  const { t } = useTranslation();

  return (
    <section id="services" className="services-section">
  
      <div className="services-container containerHero">
    
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
      </div>
    </section>
  );
}

export default Services;