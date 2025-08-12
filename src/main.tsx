import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { I18nProvider } from './i18n';
import './index.css';
import CaseStudyWebApp from './pages/CaseStudyWebApp';
import { FEATURES } from './config';

const RootRouter = () => {
  const getIsCaseRoute = () => {
    const hash = window.location.hash;
    const path = window.location.pathname;
    if (!FEATURES.portfolioEnabled) return false;
    return hash === '#/case/web-app' || path === '/case/web-app';
  };

  const [isCaseRoute, setIsCaseRoute] = useState<boolean>(getIsCaseRoute());

  useEffect(() => {
    const onHash = () => setIsCaseRoute(getIsCaseRoute());
    const onPop = () => setIsCaseRoute(getIsCaseRoute());
    window.addEventListener('hashchange', onHash);
    window.addEventListener('popstate', onPop);
    return () => {
      window.removeEventListener('hashchange', onHash);
      window.removeEventListener('popstate', onPop);
    };
  }, []);

  if (isCaseRoute) return <CaseStudyWebApp />;
  return <App />;
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <I18nProvider>
      <RootRouter />
    </I18nProvider>
  </StrictMode>
);
