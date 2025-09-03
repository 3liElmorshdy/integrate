import React, { useState, useEffect } from 'react'
import './App.css'
import HearoSection from './Components/HeroSection/HearoSection'
import NavBar from './Components/NavBar/NavBar'
import WhoWeAre from './Components/WhoWeAre/WhoWeAre'
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css"
import Services from './Components/Services/Services';
import OurMission from './Components/Mission/OurMission';
import ContactUS from './Components/CotactUs/ContactUS';
import Footer from './Components/Footer/Footer';
import { useTranslation } from 'react-i18next';
import { GlobalLoaderProvider } from './context/GlobalLoaderContext';
import GlobalLoader from './Components/GlobalLoader/GlobalLoader';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  Outlet,
} from 'react-router-dom';

import Blog from './Components/Blog/Blog';
import RealState from './Components/Pages/RealState';
import Contract from './Components/Pages/Contract';
import StateFinance from './Components/Pages/StateFinance';
import OrderCreate from './Components/Pages/OrderCreate';
import RealStateCreate from './Components/Pages/RealStateCreate';
import ContractCreate from './Components/Pages/ContractCreate';


// Layout component that includes NavBar and handles language context
const Layout = ({ onLanguageChange, currentLanguage }) => (
  <>
    <NavBar onLanguageChange={onLanguageChange} currentLanguage={currentLanguage} />
    <Outlet />
  </>
);

// Home page component
const HomePage = () => (
  <>
    <HearoSection />
    <WhoWeAre />
    <Services />
    <OurMission />
    <ContactUS />
    <Footer />
  </>
);

function App() {
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);
  const [language, setLanguage] = useState("en"); 

  useEffect(() => {
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  }, [language]);

  const handleLanguageChange = (language) => {
    i18n.changeLanguage(language);
    setCurrentLanguage(language);
    setLanguage(language);
  };

  // Define routes
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navigate to="/home" />,
    },
    {
      path: "/",
      element: <Layout onLanguageChange={handleLanguageChange} currentLanguage={currentLanguage} />,
      children: [
        {
          path: "home",
          element: <HomePage />,
        },
        {
          path: "blog",
          element: <Blog />,
        },
        {
          path: "real-state",
          element: <RealState />,
        },
        {
          path: "contract",
          element: <Contract />,
        },
        {
          path: "state-finance",
          element: <StateFinance />,
        },
        {
          path: "order/create",
          element: <OrderCreate />,
        },
        {
          path: "real-state/create",
          element: <RealStateCreate />,
        },
        {
          path: "contract/create",
          element: <ContractCreate />,
        },
      ],
    },
  ]);

  return (
    <GlobalLoaderProvider>
      <div className={`app ${currentLanguage === 'ar' ? 'r' : 'ltr'}`}>
        <GlobalLoader />
        <RouterProvider router={router} />
      </div>
    </GlobalLoaderProvider>
  )
}

export default App
