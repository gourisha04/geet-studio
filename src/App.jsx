import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { AnalyticsProvider } from './context/AnalyticsContext';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import ServicesPage from './pages/ServicesPage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import DanceStylesPage from './pages/DanceStylesPage';
import DanceStyleDetail from './pages/DanceStyleDetail';
import CommunityPage from './pages/CommunityPage';
import CommunityDetail from './pages/CommunityDetail';
import Classes from './pages/Classes';
import ClassDetail from './pages/ClassDetail';
import Workshops from './pages/Workshops';
import WorkshopDetail from './pages/WorkshopDetail';
import Events from './pages/Events';
import EventDetail from './pages/EventDetail';
import InstructorsPage from './pages/InstructorsPage';
import Gallery from './pages/Gallery';
import About from './pages/About';
import Contact from './pages/Contact';
import Updates from './pages/Updates';
import Login from './pages/Login';
import Register from './pages/Register';
import Account from './pages/Account';
import LeadDashboard from './pages/LeadDashboard';
import Enroll from './pages/Enroll';
import Payment from './pages/Payment';
import PaymentSuccess from './pages/PaymentSuccess';
import AdminDashboard from './pages/admin/AdminDashboard';

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <AuthProvider>
          <AnalyticsProvider>
            <Layout>
              <Routes>
                {/* Public Pages */}
                <Route path="/" element={<Home />} />
                <Route path="/updates" element={<Updates />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/services/:id" element={<ServiceDetailPage />} />
                <Route path="/dance-styles" element={<DanceStylesPage />} />
                <Route path="/dance-styles/:id" element={<DanceStyleDetail />} />
                <Route path="/community" element={<CommunityPage />} />
                <Route path="/community/:id" element={<CommunityDetail />} />
                <Route path="/classes" element={<Classes />} />
                <Route path="/classes/:id" element={<ClassDetail />} />
                <Route path="/workshops" element={<Workshops />} />
                <Route path="/workshops/:id" element={<WorkshopDetail />} />
                <Route path="/events" element={<Events />} />
                <Route path="/events/:id" element={<EventDetail />} />
                <Route path="/instructors" element={<InstructorsPage />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />

                {/* Auth */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* User Account */}
                <Route path="/account" element={<Account />} />
                <Route path="/account/enrollments" element={<Account />} />

                {/* Enrollment & Payment */}
                <Route path="/enroll/:id" element={<Enroll />} />
                <Route path="/payment/:id" element={<Payment />} />
                <Route path="/payment-success" element={<PaymentSuccess />} />

                {/* Community Lead Dashboard */}
                <Route path="/lead/dashboard" element={<LeadDashboard />} />

                {/* Admin */}
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/*" element={<AdminDashboard />} />
              </Routes>
            </Layout>
          </AnalyticsProvider>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}
