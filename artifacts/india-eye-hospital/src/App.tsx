import { useEffect, useState, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import {
  Route,
  Switch,
  useLocation,
  Router as WouterRouter,
  Link,
} from 'wouter';
import { SiteLayout, type Language } from '@/components/SiteLayout';
import Home from '@/pages/Home';
import Appointment from '@/pages/Appointment';

const queryClient = new QueryClient();

function Router() {
  const [location] = useLocation();
  const [language, setLanguage] = useState<Language>(() => {
    try {
      return localStorage.getItem('india-eye-language') === 'hi' ? 'hi' : 'en';
    } catch {
      return 'en';
    }
  });
  const changeLanguage = (nextLanguage: Language) => {
    setLanguage(nextLanguage);
    try {
      localStorage.setItem('india-eye-language', nextLanguage);
    } catch {
      // Language selection still works for this visit when storage is unavailable.
    }
  };
  useEffect(() => {
    document.documentElement.lang = language === 'hi' ? 'hi-IN' : 'en-IN';
  }, [language]);
  useEffect(() => {
    const isAppointmentPage = location === '/request-appointment';
    const title = isAppointmentPage
      ? language === 'hi'
        ? 'मोतियाबिंद अपॉइंटमेंट अनुरोध | India Eye Hospital'
        : 'Cataract appointment request | India Eye Hospital'
      : 'India Eye Hospital | Greater Noida';
    const description = isAppointmentPage
      ? language === 'hi'
        ? 'मोतियाबिंद सर्जरी अपॉइंटमेंट का अनुरोध करें। हमारी टीम फ़ोन करके समय की पुष्टि करेगी।'
        : 'Request a cataract surgery appointment. Our team will call to confirm a time.'
      : language === 'hi'
        ? 'ग्रेटर नोएडा में आँखों की देखभाल। सुबह 8 से शाम 6 बजे तक वॉक-इन करें; मोतियाबिंद सर्जरी के अपॉइंटमेंट का अनुरोध करें।'
        : 'Eye care in Greater Noida. Walk in from 8 AM to 6 PM or request a cataract surgery appointment.';
    document.title = title;
    document.querySelector<HTMLMetaElement>('meta[name="description"]')?.setAttribute('content', description);
    document.querySelector<HTMLMetaElement>('meta[property="og:title"]')?.setAttribute('content', title);
    document.querySelector<HTMLMetaElement>('meta[property="og:description"]')?.setAttribute('content', description);
    document.querySelector<HTMLMetaElement>('meta[name="twitter:title"]')?.setAttribute('content', title);
    document.querySelector<HTMLMetaElement>('meta[name="twitter:description"]')?.setAttribute('content', description);
  }, [language, location]);

  return (
    <RoutedErrorBoundary>
      <SiteLayout language={language} setLanguage={changeLanguage}>
        <Switch>
          <Route path="/"><Home language={language} /></Route>
          <Route path="/request-appointment"><Appointment language={language} /></Route>
          <Route><NotFound language={language} /></Route>
        </Switch>
      </SiteLayout>
    </RoutedErrorBoundary>
  );
}

function NotFound({ language }: { language: Language }) {
  const hi = language === 'hi';
  return (
    <section className="not-found">
      <div className="container">
        <span className="eyebrow"><span className="eyebrow-dot" /> 404</span>
        <h1 className="display-font">{hi ? 'यह पेज नहीं मिला।' : 'This page isn’t here.'}</h1>
        <p>{hi ? 'मुख्य पृष्ठ पर लौटकर अपनी जानकारी ढूँढें।' : 'Head back to the home page for the information you need.'}</p>
        <Link href="/" className="button button-primary" data-testid="link-not-found-home">{hi ? 'मुख्य पृष्ठ' : 'Go to home'}</Link>
      </div>
    </section>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
