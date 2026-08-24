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
        }
      } catch (err) {
        // If API explicitly responds with 401 or status error, user is unauthenticated
        if (!cancelled) {
          setUser(null);
          localStorage.removeItem('geet_user');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    checkSession();
    return () => { cancelled = true; };
  }, []);

  const login = useCallback(async (credentials) => {
    try {
      const data = await api.post('/api/auth/login', credentials);
      if (data?.success && data?.user) {
        setUser(data.user);
        localStorage.setItem('geet_user', JSON.stringify(data.user));
        return data.user;
      }
      throw new Error(data?.message || 'Login failed');
    } catch (err) {
      // Fallback mock for dev when backend is not running
      if (err.message?.includes('fetch') || err.message?.includes('network') || err.message?.includes('Failed')) {
        console.warn('⚠️ Backend unreachable, using mock auth');
        let role = 'lead'; // Default to lead for quick dev mock
        if (credentials.email?.includes('admin')) role = 'admin';

        const mockUser = {
          _id: 'usr_' + Date.now(),
          name: credentials.name || credentials.email?.split('@')[0] || 'User',
          email: credentials.email,
          role,
        };
        setUser(mockUser);
        localStorage.setItem('geet_user', JSON.stringify(mockUser));
        return mockUser;
      }
      throw err;
    }
  }, []);

  const register = useCallback(async (userData) => {
    try {
      const data = await api.post('/api/auth/register', userData);
      if (data?.success && data?.user) {
        setUser(data.user);
        localStorage.setItem('geet_user', JSON.stringify(data.user));
        return data.user;
      }
      throw new Error(data?.message || 'Registration failed');
    } catch (err) {
      // Fallback mock for dev
      if (err.message?.includes('fetch') || err.message?.includes('network') || err.message?.includes('Failed')) {
        console.warn('⚠️ Backend unreachable, using mock registration');
        const mockUser = {
          _id: 'usr_' + Date.now(),
          name: userData.name,
          email: userData.email,
          phone: userData.phone,
          role: userData.role || 'lead',
        };
        setUser(mockUser);
        localStorage.setItem('geet_user', JSON.stringify(mockUser));
        return mockUser;
      }
      throw err;
    }
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
