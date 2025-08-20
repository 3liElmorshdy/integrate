import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import mission from "../../assets/images/5-OurMission/d315a7c807ee296d3354e6a5f698efe844c4ccd2.jpg";
import './Our.css';

function OurMission() {
  const { t } = useTranslation();
  const statsRef = useRef([]);

  const stats = [
    // { count: 4500, icon: 'fa-user-group', text: 'lawyersCount' },
    // { count: 8000, icon: 'fa-scale-balanced', text: 'casesCount' },
    // { count: 12000, icon: 'fa-users', text: 'clientsCount' },
    // { count: 95, icon: 'fa-star', text: 'satisfactionRate', isPercentage: true }
  ];

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
            <h2>{t('ourMission')}</h2>
            <p>{t('ourMissionDesc')}</p>
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