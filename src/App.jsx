import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Classes from './pages/Classes';
import ClassDetail from './pages/ClassDetail';
import Workshops from './pages/Workshops';
import WorkshopDetail from './pages/WorkshopDetail';
import Events from './pages/Events';
import EventDetail from './pages/EventDetail';
import DanceStylesPage from './pages/DanceStylesPage';
import DanceStyleDetail from './pages/DanceStyleDetail';
import Gallery from './pages/Gallery';
import About from './pages/About';
import Contact from './pages/Contact';
import Enroll from './pages/Enroll';
import Payment from './pages/Payment';
import PaymentSuccess from './pages/PaymentSuccess';
import Updates from './pages/Updates';

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/updates" element={<Updates />} />
          <Route path="/classes" element={<Classes />} />
          <Route path="/classes/:id" element={<ClassDetail />} />
          <Route path="/workshops" element={<Workshops />} />
          <Route path="/workshops/:id" element={<WorkshopDetail />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:id" element={<EventDetail />} />
          <Route path="/dance-styles" element={<DanceStylesPage />} />
          <Route path="/dance-styles/:id" element={<DanceStyleDetail />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/enroll/:id" element={<Enroll />} />
          <Route path="/payment/:id" element={<Payment />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
        </Routes>
      </Layout>
    </Router>
  );
}
