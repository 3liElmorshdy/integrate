import React, { useState, useEffect, lazy } from 'react'
import './App.css'
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css"
import { useTranslation } from 'react-i18next';
import { GlobalLoaderProvider } from './context/GlobalLoaderContext';
import GlobalLoader from './Components/GlobalLoader/GlobalLoader';
import CustomLoader from './Components/CustomLoader/CustomLoader';
import {
  createBrowserRouter,
  RouterProvider,
  // Navigate,
  // Outlet,
} from 'react-router-dom';

// Lazy load all components
// const HearoSection = lazy(() => import('./Components/HeroSection/HearoSection'));
// const NavBar = lazy(() => import('./Components/NavBar/NavBar'));
// const WhoWeAre = lazy(() => import('./Components/WhoWeAre/WhoWeAre'));
// const Services = lazy(() => import('./Components/Services/Services'));
// const OurMission = lazy(() => import('./Components/Mission/OurMission'));
// const ContactUS = lazy(() => import('./Components/CotactUs/ContactUS'));
// const Footer = lazy(() => import('./Components/Footer/Footer'));
// const Blog = lazy(() => import('./Components/Blog/Blog'));
// const RealState = lazy(() => import('./Components/Pages/RealState'));
// const Contract = lazy(() => import('./Components/Pages/Contract'));
// const StateFinance = lazy(() => import('./Components/Pages/StateFinance'));
// const OrderCreate = lazy(() => import('./Components/Pages/OrderCreate'));
// const RealStateCreate = lazy(() => import('./Components/Pages/RealStateCreate'));
// const ContractCreate = lazy(() => import('./Components/Pages/ContractCreate'));
const Block = lazy(() => import('./Components/Pages/Block'));


// const Layout = ({ onLanguageChange, currentLanguage }) => (
//   <>
//     <NavBar onLanguageChange={onLanguageChange} currentLanguage={currentLanguage} />
//     <Outlet />
//   </>
// );

// const HomePage = () => (
//   <>
//     <HearoSection />
//     <WhoWeAre />
//     <Services />
//     <OurMission />
//     <ContactUS />
//     <Footer />
//   </>
// );

function App() {
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);
  const [language, setLanguage] = useState("en");
  
  // Check if CustomLoader has been shown before in this session
  const [showCustomLoader, setShowCustomLoader] = useState(() => {
    return !sessionStorage.getItem('customLoaderShown');
  }); 

  useEffect(() => {
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  }, [language]);

  const handleLanguageChange = (language) => {
    i18n.changeLanguage(language);
    setCurrentLanguage(language);
    setLanguage(language);
  };
  const router = createBrowserRouter([
    {
      path: '*',
      element: <Block />,
    },
  ]);
  
  const handleCustomLoaderComplete = () => {
    setShowCustomLoader(false);
    // Mark that CustomLoader has been shown in this session
    sessionStorage.setItem('customLoaderShown', 'true');
  };

  return (
    <GlobalLoaderProvider>
      <div className={`app ${currentLanguage === 'ar' ? 'r' : 'ltr'}`}>
        <GlobalLoader />
        {showCustomLoader && <CustomLoader onComplete={handleCustomLoaderComplete} />}
        {!showCustomLoader && <RouterProvider router={router} />}
      </div>
    </GlobalLoaderProvider>
  )
}

export default App
