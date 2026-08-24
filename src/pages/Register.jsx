import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { User, Mail, Phone, Lock, ArrowRight } from 'lucide-react';

export default function Register() {
  const { register } = useAuth();
  const { isDark, logo } = useTheme();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    role: 'lead', // Hardcoded to lead, no student sign up
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(false);
    setErrorMsg('');
    setLoading(true);
    try {
      const newUser = await register(form);
      if (newUser && newUser.role === 'lead') navigate('/lead/dashboard');
      else navigate('/');
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`pt-32 pb-24 min-h-screen flex items-center justify-center transition-colors ${isDark ? 'bg-dark-950 text-warm-50' : 'bg-warm-50 text-dark-950'}`}>
      <div className="max-w-md w-full px-4">
        <div className="text-center mb-8">
          <img src={logo} alt="Geet Studio" className="h-36 md:h-48 w-auto mx-auto mb-4 object-contain" />
          <h1 className="font-heading text-3xl font-bold">Community Lead Sign Up</h1>
          <p className="text-xs opacity-75 mt-1">Register as an official artist, coach, or vendor</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-8 rounded-2xl border shadow-2xl ${isDark ? 'bg-dark-900 border-dark-700' : 'bg-white border-warm-200'}`}
        >
          {errorMsg && (
            <div className="mb-4 p-3 rounded bg-red-500/10 border border-red-500/30 text-red-400 text-xs text-center">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">

            <div>
              <label className="block text-xs uppercase font-semibold opacity-80 mb-1">Full Name *</label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gold-500" />
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Enter full name"
                  className={`w-full pl-10 pr-4 py-2.5 text-sm rounded border focus:outline-none focus:border-gold-500 ${
                    isDark ? 'bg-dark-800 border-dark-700 text-warm-50' : 'bg-warm-50 border-warm-300 text-dark-950'
                  }`}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase font-semibold opacity-80 mb-1">Email Address *</label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gold-500" />
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="name@example.com"
                  className={`w-full pl-10 pr-4 py-2.5 text-sm rounded border focus:outline-none focus:border-gold-500 ${
                    isDark ? 'bg-dark-800 border-dark-700 text-warm-50' : 'bg-warm-50 border-warm-300 text-dark-950'
                  }`}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase font-semibold opacity-80 mb-1">Phone Number *</label>
              <div className="relative">
                <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gold-500" />
                <input
                  type="tel"
                  required
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="8770409447"
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
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="Create password"
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
              {loading ? 'Creating Account...' : 'Register Account'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-dark-700/30 text-center text-xs opacity-75">
            Already have an account?{' '}
            <Link to="/login" className="text-gold-500 font-bold hover:underline">
              Sign In
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
