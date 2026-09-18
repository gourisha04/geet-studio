import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { api } from '../utils/api';

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

  const login = useCallback(async (credentials) => {
    const data = await api.post('/api/auth/login', credentials);

    if (data?.success && data?.user) {
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
