import { motion } from 'framer-motion';
import { CheckCircle, MessageCircle, Home } from 'lucide-react';
import { Instagram } from '../components/icons/Instagram';
import Button from '../components/ui/Button';
import PageTransition from '../components/ui/PageTransition';

export default function PaymentSuccess() {
  return (
    <PageTransition>
      <section className="min-h-screen flex items-center justify-center px-4 py-20">
        <div className="max-w-lg w-full text-center">
          {/* Success animation */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
            className="w-20 h-20 mx-auto mb-8 rounded-full bg-green-500/10 border-2 border-green-500 flex items-center justify-center"
          >
            <CheckCircle className="w-10 h-10 text-green-500" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-warm-50 mb-3">
              Congratulations!
            </h1>
            <p className="text-dark-200 mb-8">Your enrollment is confirmed.</p>
          </motion.div>

          {/* Enrollment details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="bg-dark-800 border border-dark-600 p-6 mb-8 text-left"
          >
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-dark-300">Enrollment ID</span>
                <span className="text-gold-500 font-mono font-medium">GS-2026-00124</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-dark-300">Class</span>
                <span className="text-warm-50">Bollywood Beginners</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-dark-300">Batch</span>
                <span className="text-warm-50">Mon / Wed / Fri</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-dark-300">Time</span>
                <span className="text-warm-50">6:00 PM – 7:00 PM</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-dark-300">Location</span>
                <span className="text-warm-50">Geet Studio, Indore</span>
              </div>
              <div className="pt-3 border-t border-dark-600 flex justify-between text-sm">
                <span className="text-dark-300">Amount Paid</span>
                <span className="text-gold-500 font-bold">₹2,400</span>
              </div>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="text-sm text-dark-200 mb-8"
          >
            A confirmation email has been sent to{' '}
            <span className="text-warm-50">user@example.com</span>
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            className="space-y-3"
          >
            <Button href="https://wa.me/919876543210" variant="secondary" size="md" className="w-full">
              <MessageCircle className="w-4 h-4" />
              Join WhatsApp Group
            </Button>
            <Button href="https://instagram.com/geetstudio" variant="secondary" size="md" className="w-full">
              <Instagram className="w-4 h-4" />
              Follow on Instagram
            </Button>
            <Button to="/" variant="primary" size="md" className="w-full">
              <Home className="w-4 h-4" />
              Back to Home
            </Button>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
}
