import React, { useState, useEffect, Suspense, lazy } from 'react'
import './App.css'
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css"
import { useTranslation } from 'react-i18next';
import { GlobalLoaderProvider } from './context/GlobalLoaderContext';
import GlobalLoader from './Components/GlobalLoader/GlobalLoader';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  Outlet,
} from 'react-router-dom';

// Lazy load all components
const HearoSection = lazy(() => import('./Components/HeroSection/HearoSection'));
const NavBar = lazy(() => import('./Components/NavBar/NavBar'));
const WhoWeAre = lazy(() => import('./Components/WhoWeAre/WhoWeAre'));
const Services = lazy(() => import('./Components/Services/Services'));
const OurMission = lazy(() => import('./Components/Mission/OurMission'));
const ContactUS = lazy(() => import('./Components/CotactUs/ContactUS'));
const Footer = lazy(() => import('./Components/Footer/Footer'));
const Blog = lazy(() => import('./Components/Blog/Blog'));
const RealState = lazy(() => import('./Components/Pages/RealState'));
const Contract = lazy(() => import('./Components/Pages/Contract'));
const StateFinance = lazy(() => import('./Components/Pages/StateFinance'));
const OrderCreate = lazy(() => import('./Components/Pages/OrderCreate'));
const RealStateCreate = lazy(() => import('./Components/Pages/RealStateCreate'));
const ContractCreate = lazy(() => import('./Components/Pages/ContractCreate'));

// Loading component for Suspense fallback
const LoadingFallback = () => (
  <div className="loading-fallback">
    <div className="loading-spinner"></div>
    <p>Loading...</p>
  </div>
);

// Layout component that includes NavBar and handles language context
const Layout = ({ onLanguageChange, currentLanguage }) => (
  <Suspense fallback={<LoadingFallback />}>
    <NavBar onLanguageChange={onLanguageChange} currentLanguage={currentLanguage} />
    <Outlet />
  </Suspense>
);

// Home page component
const HomePage = () => (
  <Suspense fallback={<LoadingFallback />}>
    <HearoSection />
    <WhoWeAre />
    <Services />
    <OurMission />
    <ContactUS />
    <Footer />
  </Suspense>
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
          element: (
            <Suspense fallback={<LoadingFallback />}>
              <Blog />
            </Suspense>
          ),
        },
        {
          path: "real-state",
          element: (
            <Suspense fallback={<LoadingFallback />}>
              <RealState />
            </Suspense>
          ),
        },
        {
          path: "contract",
          element: (
            <Suspense fallback={<LoadingFallback />}>
              <Contract />
            </Suspense>
          ),
        },
        {
          path: "state-finance",
          element: (
            <Suspense fallback={<LoadingFallback />}>
              <StateFinance />
            </Suspense>
          ),
        },
        {
          path: "order/create",
          element: (
            <Suspense fallback={<LoadingFallback />}>
              <OrderCreate />
            </Suspense>
          ),
        },
        {
          path: "real-state/create",
          element: (
            <Suspense fallback={<LoadingFallback />}>
              <RealStateCreate />
            </Suspense>
          ),
        },
        {
          path: "contract/create",
          element: (
            <Suspense fallback={<LoadingFallback />}>
              <ContractCreate />
            </Suspense>
          ),
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
