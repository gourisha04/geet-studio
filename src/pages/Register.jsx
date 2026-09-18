import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { User, Mail, Phone, Lock, ArrowRight, Grid, Award } from 'lucide-react';
import PageTransition from '../components/ui/PageTransition';

const categories = [
  'Artist',
  'Dancer',
  'Anchor',
  'Singer',
  'DJ',
  'Musician',
  'Event Planner',
  'Sound Vendor',
  'Light Vendor',
  'LED Vendor',
  'Decor Vendor',
  'Event Manager',
  'Other',
];

export default function Register() {
  const { register } = useAuth();
  const { isDark, logo } = useTheme();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    category: '',
    role: 'member', // Default community member
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);
    try {
      const newUser = await register({ ...form, role: 'lead' }); // Auto-login to lead/dashboard for demo
      if (newUser) navigate('/lead/dashboard');
      else navigate('/community');
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTransition>
      <div className={`pt-32 pb-24 min-h-screen flex items-center justify-center transition-colors ${isDark ? 'bg-dark-950 text-warm-50' : 'bg-warm-50 text-dark-950'}`}>
        <div className="max-w-lg w-full px-4">
          
          {/* Header */}
          <div className="text-center mb-8">
            <img src={logo} alt="Geet Studio" className="h-32 md:h-40 w-auto mx-auto mb-4 object-contain" />
            <h1 className="font-heading text-3xl font-bold tracking-tight">Join The Geet Community</h1>
            <p className="text-xs md:text-sm text-gold-500/90 font-medium mt-1">
              Build your profile. Find opportunities. Grow with the community.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-8 md:p-10 rounded-2xl border shadow-2xl backdrop-blur-sm ${isDark ? 'bg-dark-900/90 border-dark-700' : 'bg-white border-warm-200'}`}
          >
            {errorMsg && (
              <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs text-center font-medium">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold opacity-80 mb-1.5">FULL NAME *</label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gold-500/70" />
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Enter your full name"
                    className={`w-full pl-11 pr-4 py-3 text-sm rounded-xl border focus:outline-none focus:border-gold-500 transition-colors ${
                      isDark ? 'bg-dark-800/80 border-dark-700 text-warm-50' : 'bg-warm-50 border-warm-300 text-dark-950'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold opacity-80 mb-1.5">EMAIL ADDRESS *</label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gold-500/70" />
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="name@example.com"
                    className={`w-full pl-11 pr-4 py-3 text-sm rounded-xl border focus:outline-none focus:border-gold-500 transition-colors ${
                      isDark ? 'bg-dark-800/80 border-dark-700 text-warm-50' : 'bg-warm-50 border-warm-300 text-dark-950'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold opacity-80 mb-1.5">PHONE NUMBER *</label>
                <div className="relative">
                  <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gold-500/70" />
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="+91 XXXXX XXXXX"
                    className={`w-full pl-11 pr-4 py-3 text-sm rounded-xl border focus:outline-none focus:border-gold-500 transition-colors ${
                      isDark ? 'bg-dark-800/80 border-dark-700 text-warm-50' : 'bg-warm-50 border-warm-300 text-dark-950'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold opacity-80 mb-1.5">CREATE PASSWORD *</label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gold-500/70" />
                  <input
                    type="password"
                    required
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    placeholder="Create a secure password"
                    className={`w-full pl-11 pr-4 py-3 text-sm rounded-xl border focus:outline-none focus:border-gold-500 transition-colors ${
                      isDark ? 'bg-dark-800/80 border-dark-700 text-warm-50' : 'bg-warm-50 border-warm-300 text-dark-950'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold opacity-80 mb-1.5">SELECT YOUR CATEGORY *</label>
                <div className="relative">
                  <Grid className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gold-500/70 pointer-events-none" />
                  <select
                    required
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className={`w-full pl-11 pr-4 py-3 text-sm rounded-xl border focus:outline-none focus:border-gold-500 transition-colors appearance-none cursor-pointer ${
                      isDark ? 'bg-dark-800/80 border-dark-700 text-warm-50' : 'bg-warm-50 border-warm-300 text-dark-950'
                    }`}
                  >
                    <option value="">Choose your category</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-gold-500 text-dark-950 font-bold text-xs uppercase tracking-[0.2em] hover:bg-gold-400 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg rounded-xl mt-6"
              >
                {loading ? 'CREATING ACCOUNT...' : 'CREATE COMMUNITY ACCOUNT →'}
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-dark-700/40 text-center text-xs opacity-80">
              Already have an account?{' '}
              <Link to="/login" className="text-gold-500 font-bold hover:underline">
                Sign In
              </Link>
            </div>
          </motion.div>

          {/* Lead Application Option Layer */}
          <div className="mt-8 p-6 rounded-2xl border border-gold-500/20 bg-dark-900/60 backdrop-blur-sm text-center space-y-3">
            <p className="text-xs font-bold text-gold-500 uppercase tracking-widest flex items-center justify-center gap-1.5">
              <Award className="w-4 h-4" /> Want to represent your category?
            </p>
            <p className="text-xs text-dark-200 leading-relaxed max-w-sm mx-auto">
              Become a verified Community Member and help connect talented professionals with real opportunities.
            </p>
            <div>
              <Link
                to="/lead/dashboard"
                className="inline-block px-5 py-2.5 bg-dark-800 border border-gold-500/40 text-gold-500 text-[11px] font-bold uppercase tracking-wider rounded-xl hover:bg-gold-500/10 transition-colors"
              >
                APPLY AS COMMUNITY MEMBER →
              </Link>
            </div>
          </div>

        </div>
      </div>
    </PageTransition>
  );
}
