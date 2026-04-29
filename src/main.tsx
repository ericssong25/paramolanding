import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { I18nProvider } from './i18n';
import './index.css';
import CaseStudyWebApp from './pages/CaseStudyWebApp';
import WorkDetail from './pages/WorkDetail';
import { FEATURES } from './config';

const RootRouter = () => {
  const getRoute = () => {
    const hash = window.location.hash;
    const path = window.location.pathname;
    if (!FEATURES.portfolioEnabled) return false;
    if (hash === '#/case/web-app' || path === '/case/web-app') return { type: 'case', slug: 'web-app' } as const;
    const workMatch = path.match(/^\/work\/([^/]+)\/?$/);
    if (workMatch) return { type: 'work', slug: workMatch[1] } as const;
    return false;
  };

  const [route, setRoute] = useState<ReturnType<typeof getRoute>>(getRoute());

  useEffect(() => {
    const onHash = () => setRoute(getRoute());
    const onPop = () => setRoute(getRoute());
    window.addEventListener('hashchange', onHash);
    window.addEventListener('popstate', onPop);
    return () => {
      window.removeEventListener('hashchange', onHash);
      window.removeEventListener('popstate', onPop);
    };
  }, []);

  if (route && route !== false && route.type === 'case') return <CaseStudyWebApp />;
  if (route && route !== false && route.type === 'work') return <WorkDetail slug={route.slug} />;
  return <App />;
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <I18nProvider>
      <RootRouter />
    </I18nProvider>
  </StrictMode>
);
