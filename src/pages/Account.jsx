import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Link, useNavigate } from 'react-router-dom';
import { User, Calendar, CreditCard, LogOut, ShieldCheck, CheckCircle2 } from 'lucide-react';

const demoEnrollments = [
  {
    enrollmentId: 'GS-2026-X8921',
    className: 'Bollywood Advanced Choreography',
    batch: 'Mon/Wed/Fri (6:00 PM - 7:00 PM)',
    startDate: '25 August 2026',
    endDate: '25 September 2026',
    location: 'Geet Studio, Indore',
    amountPaid: 3500,
    paymentStatus: 'SUCCESS',
    enrollmentStatus: 'CONFIRMED',
    whatsAppGroupLink: 'https://chat.whatsapp.com/demo',
  },
  {
    enrollmentId: 'GS-2026-Y4102',
    className: 'Contemporary Expression Workshop',
    batch: 'Sat/Sun (4:00 PM - 6:00 PM)',
    startDate: '30 August 2026',
    endDate: '01 September 2026',
    location: 'Geet Studio, Indore',
    amountPaid: 1500,
    paymentStatus: 'SUCCESS',
    enrollmentStatus: 'CONFIRMED',
    whatsAppGroupLink: 'https://chat.whatsapp.com/demo',
  },
];

export default function Account() {
  const { user, isAuthenticated, logout } = useAuth();
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('enrollments');

  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  return (
    <div className={`pt-28 pb-24 min-h-screen transition-colors ${isDark ? 'bg-dark-950 text-warm-50' : 'bg-warm-50 text-dark-950'}`}>
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        {/* Header Bar */}
        <div className={`p-6 md:p-8 rounded-2xl border mb-8 flex flex-col md:flex-row items-center justify-between gap-6 ${
          isDark ? 'bg-dark-900 border-dark-700' : 'bg-white border-warm-200 shadow-md'
        }`}>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gold-500/20 border border-gold-500/40 text-gold-500 flex items-center justify-center font-bold text-2xl">
              {user.name?.[0]?.toUpperCase() || 'U'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-heading text-2xl font-bold">{user.name}</h1>
                <span className="px-2 py-0.5 text-[10px] font-bold bg-gold-500 text-dark-950 rounded uppercase">
                  {user.role}
                </span>
              </div>
              <p className="text-xs opacity-75">{user.email}</p>
            </div>
          </div>

          <button
            onClick={() => {
              logout();
              navigate('/login');
            }}
            className="flex items-center gap-2 px-4 py-2 border border-red-500/40 text-red-400 hover:bg-red-500/10 text-xs font-semibold uppercase rounded transition-all cursor-pointer"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-dark-700/40 pb-4 mb-8">
          <button
            onClick={() => setActiveTab('enrollments')}
            className={`px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'enrollments'
                ? 'bg-gold-500 text-dark-950 shadow-md'
                : 'opacity-70 hover:opacity-100'
            }`}
          >
            <Calendar className="w-4 h-4" /> My Enrollments ({demoEnrollments.length})
          </button>

          <button
            onClick={() => setActiveTab('payments')}
            className={`px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'payments'
                ? 'bg-gold-500 text-dark-950 shadow-md'
                : 'opacity-70 hover:opacity-100'
            }`}
          >
            <CreditCard className="w-4 h-4" /> Payment History
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'profile'
                ? 'bg-gold-500 text-dark-950 shadow-md'
                : 'opacity-70 hover:opacity-100'
            }`}
          >
            <User className="w-4 h-4" /> Profile Info
          </button>
        </div>

        {/* Tab Contents */}
        {activeTab === 'enrollments' && (
          <div className="space-y-6">
            {demoEnrollments.map((item) => (
              <div
                key={item.enrollmentId}
                className={`p-6 rounded-2xl border ${isDark ? 'bg-dark-900 border-dark-700' : 'bg-white border-warm-200 shadow-md'}`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 border-b border-dark-700/40 pb-4 gap-2">
                  <div>
                    <span className="text-[10px] font-mono tracking-widest text-gold-500 font-bold uppercase">
                      ID: {item.enrollmentId}
                    </span>
                    <h3 className="font-heading text-xl font-bold">{item.className}</h3>
                  </div>

                  <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 self-start md:self-auto">
                    <CheckCircle2 className="w-4 h-4" /> {item.enrollmentStatus}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs mb-6 opacity-85">
                  <div>
                    <p className="opacity-60 uppercase font-semibold">Batch Timing</p>
                    <p className="font-medium text-gold-400">{item.batch}</p>
                  </div>
                  <div>
                    <p className="opacity-60 uppercase font-semibold">Course Schedule</p>
                    <p className="font-medium">{item.startDate} to {item.endDate}</p>
                  </div>
                  <div>
                    <p className="opacity-60 uppercase font-semibold">Venue Location</p>
                    <p className="font-medium">{item.location}</p>
                  </div>
                  <div>
                    <p className="opacity-60 uppercase font-semibold">Fee Paid</p>
                    <p className="font-medium text-gold-500 text-sm">₹{item.amountPaid}</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-dark-700/30">
                  <a
                    href={item.whatsAppGroupLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded bg-emerald-600 text-white text-xs font-bold uppercase tracking-wider hover:bg-emerald-500 transition-all flex items-center gap-2"
                  >
                    Join Class WhatsApp Group
                  </a>

                  <Link
                    to="/classes"
                    className="px-4 py-2 rounded border border-gold-500/30 text-gold-500 text-xs font-bold uppercase tracking-wider hover:bg-gold-500/10 transition-all"
                  >
                    View Class Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'payments' && (
          <div className={`p-6 rounded-2xl border ${isDark ? 'bg-dark-900 border-dark-700' : 'bg-white border-warm-200 shadow-md'}`}>
            <h3 className="font-heading text-xl font-bold mb-4">Payment Transactions</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-dark-700 text-gold-500 uppercase tracking-wider">
                    <th className="py-3 px-4">Enrollment ID</th>
                    <th className="py-3 px-4">Item</th>
                    <th className="py-3 px-4">Amount</th>
                    <th className="py-3 px-4">Provider</th>
                    <th className="py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {demoEnrollments.map((tx) => (
                    <tr key={tx.enrollmentId} className="border-b border-dark-700/30">
                      <td className="py-3.5 px-4 font-mono">{tx.enrollmentId}</td>
                      <td className="py-3.5 px-4 font-medium">{tx.className}</td>
                      <td className="py-3.5 px-4 text-gold-500 font-bold">₹{tx.amountPaid}</td>
                      <td className="py-3.5 px-4">RAZORPAY</td>
                      <td className="py-3.5 px-4 text-emerald-400 font-bold">{tx.paymentStatus}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className={`p-6 rounded-2xl border ${isDark ? 'bg-dark-900 border-dark-700' : 'bg-white border-warm-200 shadow-md'}`}>
            <h3 className="font-heading text-xl font-bold mb-4">Student Profile</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-xs uppercase opacity-60 font-semibold">Full Name</p>
                <p className="font-bold">{user.name}</p>
              </div>
              <div>
                <p className="text-xs uppercase opacity-60 font-semibold">Email Address</p>
                <p className="font-bold">{user.email}</p>
              </div>
              <div>
                <p className="text-xs uppercase opacity-60 font-semibold">Account Role</p>
                <p className="font-bold uppercase text-gold-500">{user.role}</p>
              </div>
              <div>
                <p className="text-xs uppercase opacity-60 font-semibold">Studio Location</p>
                <p className="font-bold">Indore, Madhya Pradesh</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
