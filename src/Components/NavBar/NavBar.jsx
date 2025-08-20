import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./NavBar.css";
import Logo from "../../assets/images/1-nav/Logo.png";

function NavBar({ onLanguageChange, currentLanguage }) {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleLanguage = () => {
    const newLang = currentLanguage === "en" ? "ar" : "en";
    onLanguageChange(newLang);
    document.documentElement.dir = newLang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = newLang;
    i18n.changeLanguage(newLang);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleSectionClick = (sectionId) => {
    // إذا كنا بالفعل في الصفحة الرئيسية، انتقل إلى القسم
    if (location.pathname === "/home") {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // إذا كنا في صفحة أخرى، انتقل إلى الصفحة الرئيسية ثم إلى القسم
      navigate(`/home#${sectionId}`);
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="custom-navbar">
      <div className="navbar-container container">
        <button
          className="hamburger-menu"
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
          aria-label="Toggle navigation"
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>
        <div className="navbar-logo">
          <Link to="/home">
            <img src={Logo} alt="Logo" className="logo-img" />
          </Link>
        </div>

        <div className={`navbar-links ${isMenuOpen ? "active" : ""}`}>
          <Link
            to="/home"
            className={`nav-link ${isActive("/home") ? "active" : ""}`}
            onClick={() => setIsMenuOpen(false)}
          >
            {t("home")}
          </Link>
          
          <button 
            className="nav-link section-link"
            onClick={() => handleSectionClick("about")}
          >
            {t("aboutUs")}
          </button>
          
          <button 
            className="nav-link section-link"
            onClick={() => handleSectionClick("services")}
          >
            {t("ourServices")}
          </button>
          
          <button 
            className="nav-link section-link"
            onClick={() => handleSectionClick("contact")}
          >
            {t("contactUs")}
          </button>
          
          <Link
            to="/blog"
            className={`nav-link ${isActive("/blog") ? "active" : ""}`}
            onClick={() => setIsMenuOpen(false)}
          >
            {t("Blog")}
          </Link>

          <div className="mobile-language-toggle" onClick={toggleLanguage}>
            <span className={`lang-text ${currentLanguage === "ar" ? "active" : ""}`}>
              عربي
            </span>
            <div className="toggle-switch">
              <div className={`toggle-circle ${currentLanguage === "ar" ? "rtl-active" : ""}`}>
                <i className="fa-solid fa-globe"></i>
              </div>
            </div>
            <span className={`lang-text ${currentLanguage === "en" ? "active" : ""}`}>
              EN
            </span>
          </div>
        </div>

        <div className="desktop-language-toggle" onClick={toggleLanguage}>
          <span className={`lang-text ${currentLanguage === "ar" ? "active" : ""}`}>
            عربي
          </span>
          <div className="toggle-switch">
            <div className={`toggle-circle ${currentLanguage === "ar" ? "rtl-active" : ""}`}>
              <i className="fa-solid fa-globe"></i>
            </div>
          </div>
          <span className={`lang-text ${currentLanguage === "en" ? "active" : ""}`}>
            EN
          </span>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;