import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../utils/api';

const ADMIN_INACTIVITY_MS = 15 * 60 * 1000; // Exactly 15 minutes of inactivity
const HEARTBEAT_THROTTLE_MS = 2 * 60 * 1000; // 2 minutes between background heartbeats

const AuthContext = createContext({
  user: null,
  isAuthenticated: false,
  role: 'visitor',
  login: async () => {},
  logout: async () => {},
  register: async () => {},
  loading: true,
});

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check session on mount — tries backend /api/auth/me
  useEffect(() => {
    let cancelled = false;

    const checkSession = async () => {
      try {
        const data = await api.get('/api/auth/me');
        if (!cancelled && data?.success && data?.user) {
          setUser(data.user);
        } else if (!cancelled) {
          setUser(null);
        }
      } catch (err) {
        // 401 Unauthorized is expected for unauthenticated public visitors
        if (!cancelled) {
          setUser(null);
          localStorage.removeItem('geet_user');
          localStorage.removeItem('geet_token');
          sessionStorage.removeItem('geet_token');
          // Only log genuine server/network errors (500, status 0, etc.)
          if (err.status && err.status !== 401) {
            console.warn('Session check note:', err.status, err.message);
          }
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    checkSession();
    return () => { cancelled = true; };
  }, []);

  // Centralized 15-minute inactivity session timeout for ADMIN accounts ONLY
  useEffect(() => {
    if (!user || user.role !== 'admin') {
      return;
    }

    let timerId = null;
    let lastHeartbeat = Date.now();

    const handleSessionExpiry = async () => {
      // Check multi-tab activity: if another tab recorded activity recently, reschedule
      const storedLastActivity = Number(localStorage.getItem('geet_admin_last_activity')) || 0;
      const elapsed = Date.now() - storedLastActivity;
      if (storedLastActivity > 0 && elapsed < ADMIN_INACTIVITY_MS) {
        timerId = setTimeout(handleSessionExpiry, ADMIN_INACTIVITY_MS - elapsed);
        return;
      }

      // Session expired due to inactivity
      localStorage.removeItem('geet_user');
      localStorage.removeItem('geet_token');
      localStorage.removeItem('geet_admin_last_activity');
      sessionStorage.removeItem('geet_token');
      sessionStorage.setItem('geet_session_expired', 'Your session expired due to inactivity. Please log in again.');

      try {
        await api.post('/api/auth/logout');
      } catch {
        // Proceed with local logout regardless of network error
      }

      setUser(null);

      // Redirect to admin login page with clear message
      navigate('/login?role=admin', {
        state: { message: 'Your session expired due to inactivity. Please log in again.' },
        replace: true,
      });
    };

    const resetInactivityTimer = () => {
      const now = Date.now();
      localStorage.setItem('geet_admin_last_activity', String(now));

      if (timerId) {
        clearTimeout(timerId);
      }
      timerId = setTimeout(handleSessionExpiry, ADMIN_INACTIVITY_MS);

      // Periodically synchronize active state with backend heartbeat
      if (now - lastHeartbeat >= HEARTBEAT_THROTTLE_MS) {
        lastHeartbeat = now;
        api.post('/api/auth/heartbeat').catch(() => {});
      }
    };

    // Initialize timer
    resetInactivityTimer();

    // Meaningful user activity events: mouse movement, clicks, keyboard input, scrolling, touch, wheel
    const activityEvents = ['mousemove', 'mousedown', 'keydown', 'scroll', 'touchstart', 'wheel'];

    let throttleTimeout = null;
    const onUserActivity = () => {
      if (!throttleTimeout) {
        throttleTimeout = setTimeout(() => {
          throttleTimeout = null;
          resetInactivityTimer();
        }, 1000); // Throttled to at most once per second for event handling
      }
    };

    activityEvents.forEach((evt) => {
      window.addEventListener(evt, onUserActivity, { passive: true });
    });

    const onStorageChange = (e) => {
      if (e.key === 'geet_admin_last_activity') {
        if (timerId) clearTimeout(timerId);
        timerId = setTimeout(handleSessionExpiry, ADMIN_INACTIVITY_MS);
      }
    };
    window.addEventListener('storage', onStorageChange);

    return () => {
      if (timerId) clearTimeout(timerId);
      if (throttleTimeout) clearTimeout(throttleTimeout);
      activityEvents.forEach((evt) => {
        window.removeEventListener(evt, onUserActivity);
      });
      window.removeEventListener('storage', onStorageChange);
    };
  }, [user, navigate]);

  const login = useCallback(async (credentials) => {
    const data = await api.post('/api/auth/login', credentials);

    if (data?.success && data?.user) {
      if (data.token) {
        sessionStorage.setItem('geet_token', data.token);
        localStorage.setItem('geet_token', data.token);
      }
      if (data.user.role === 'admin') {
        localStorage.setItem('geet_admin_last_activity', String(Date.now()));
      }
      setUser(data.user);
      localStorage.setItem('geet_user', JSON.stringify(data.user));
      return data.user;
    }

    // Failures propagate to the caller. No client-side session is fabricated, so an unreachable
    // or rejecting API can never produce a signed-in (let alone admin) session.
    throw new Error(data?.message || 'Login failed');
  }, []);

  const register = useCallback(async (userData) => {
    const data = await api.post('/api/auth/register', userData);

    if (data?.success && data?.user) {
      if (data.token) {
        sessionStorage.setItem('geet_token', data.token);
        localStorage.setItem('geet_token', data.token);
      }
      setUser(data.user);
      localStorage.setItem('geet_user', JSON.stringify(data.user));
      return data.user;
    }

    // Failures propagate to the caller — no client-side account is ever fabricated.
    throw new Error(data?.message || 'Registration failed');
  }, []);

  const logout = useCallback(async () => {
    try {
      await api.post('/api/auth/logout');
    } catch {
      // Proceed with local logout even if API fails
    }
    setUser(null);
    localStorage.removeItem('geet_user');
    localStorage.removeItem('geet_token');
    localStorage.removeItem('geet_admin_last_activity');
    sessionStorage.removeItem('geet_token');
  }, []);

  const role = user ? user.role : 'visitor';
  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, role, login, logout, register, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
