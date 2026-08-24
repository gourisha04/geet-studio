import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Lock, Mail, ArrowRight, ShieldCheck } from 'lucide-react';

export default function Login() {
  const { login } = useAuth();
  const { isDark, logo } = useTheme();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    try {
      const user = await login({ email, password });
      if (user.role === 'admin') {
        navigate('/admin');
      } else if (user.role === 'lead') {
        navigate('/lead/dashboard');
      } else {
        setErrorMsg('Access denied. Only Community Leads and Administrators can log in.');
      }
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || 'Authentication failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const fillQuickAuth = (type) => {
    if (type === 'admin') setEmail('admin@geetstudio.com');
    else if (type === 'lead') setEmail('lead.artist@geetstudio.com');
    setPassword('password123');
  };

  return (
    <div className={`pt-32 pb-24 min-h-screen flex items-center justify-center transition-colors ${isDark ? 'bg-dark-950 text-warm-50' : 'bg-warm-50 text-dark-950'}`}>
      <div className="max-w-md w-full px-4">
        <div className="text-center mb-8">
          <img src={logo} alt="Geet Studio" className="h-36 md:h-48 w-auto mx-auto mb-4 object-contain" />
          <h1 className="font-heading text-3xl font-bold">Portal Sign In</h1>
          <p className="text-xs opacity-75 mt-1">Access Community Lead or Admin dashboard</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-8 rounded-2xl border shadow-2xl ${isDark ? 'bg-dark-900 border-dark-700' : 'bg-white border-warm-200'}`}
        >
          {errorMsg && (
            <div className="mb-4 p-3 rounded bg-red-500/10 border border-red-500/30 text-red-400 text-xs text-center font-medium">
              {errorMsg}
            </div>
          )}

          {/* Demo Role Switcher */}
          <div className="mb-6 p-3 rounded-lg border border-gold-500/30 bg-gold-500/10 text-xs">
            <p className="font-bold text-gold-500 mb-2 flex items-center gap-1">
              <ShieldCheck className="w-4 h-4" /> Quick Role Login (Dev):
            </p>
            <div className="flex gap-2">
              <button onClick={() => fillQuickAuth('lead')} className="px-2.5 py-1 bg-purple-500/20 text-purple-400 rounded text-[11px] font-semibold cursor-pointer">
                Lead
              </button>
              <button onClick={() => fillQuickAuth('admin')} className="px-2.5 py-1 bg-red-500/20 text-red-400 rounded text-[11px] font-semibold cursor-pointer">
                Admin
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs uppercase font-semibold opacity-80 mb-1">Email Address *</label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gold-500" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className={`w-full pl-10 pr-4 py-2.5 text-sm rounded border focus:outline-none focus:border-gold-500 ${
                    isDark ? 'bg-dark-800 border-dark-700 text-warm-50' : 'bg-warm-50 border-warm-300 text-dark-950'
                  }`}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase font-semibold opacity-80 mb-1">Password *</label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gold-500" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={`w-full pl-10 pr-4 py-2.5 text-sm rounded border focus:outline-none focus:border-gold-500 ${
                    isDark ? 'bg-dark-800 border-dark-700 text-warm-50' : 'bg-warm-50 border-warm-300 text-dark-950'
                  }`}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-gold-500 text-dark-950 font-bold text-xs uppercase tracking-[0.2em] hover:bg-gold-400 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg mt-6"
            >
              {loading ? 'Authenticating...' : 'Sign In'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-dark-700/30 text-center text-xs opacity-75">
            Don't have an account?{' '}
            <Link to="/register" className="text-gold-500 font-bold hover:underline">
              Register Now
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
