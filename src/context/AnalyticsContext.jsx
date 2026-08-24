import { createContext, useContext, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const AnalyticsContext = createContext({
  trackEvent: () => {},
});

export function AnalyticsProvider({ children }) {
  const location = useLocation();
  const pageEnterTime = useRef(Date.now());
  const visitorId = useRef(getOrCreateId('geet_visitor_id'));
  const sessionId = useRef(getOrCreateId('geet_session_id', true));

  function getOrCreateId(key, isSession = false) {
    const storage = isSession ? sessionStorage : localStorage;
    let id = storage.getItem(key);
    if (!id) {
      id = 'v_' + Math.random().toString(36).substring(2, 11) + '_' + Date.now();
      storage.setItem(key, id);
    }
    return id;
  }

  const trackEvent = (eventType, target = '', metadata = {}) => {
    const payload = {
      visitorId: visitorId.current,
      sessionId: sessionId.current,
      eventType,
      page: location.pathname,
      target,
      timestamp: new Date().toISOString(),
      metadata,
    };
    // Log in console for dev, send via beacon/fetch to backend
    if (import.meta.env.DEV) {
      console.log('📊 [Analytics]', payload);
    }
    try {
      const apiBase = import.meta.env.VITE_API_URL || '';
      const endpoint = `${apiBase}/api/analytics/log`;
      const blob = new Blob([JSON.stringify(payload)], { type: 'application/json' });
      if (navigator.sendBeacon) {
        navigator.sendBeacon(endpoint, blob);
      }
    } catch (e) {
      // Silent catch
    }
  };

  useEffect(() => {
    // Route change event
    const enterTime = Date.now();
    pageEnterTime.current = enterTime;
    trackEvent('page_enter', location.pathname);

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        const duration = Date.now() - pageEnterTime.current;
        trackEvent('visibility_change', 'hidden', { durationMs: duration });
      } else {
        pageEnterTime.current = Date.now();
        trackEvent('visibility_change', 'visible');
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      const duration = Date.now() - pageEnterTime.current;
      trackEvent('page_exit', location.pathname, { durationMs: duration });
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [location.pathname]);

  return (
    <AnalyticsContext.Provider value={{ trackEvent }}>
      {children}
    </AnalyticsContext.Provider>
  );
}

export function useAnalytics() {
  return useContext(AnalyticsContext);
}
