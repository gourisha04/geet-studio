import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CreditCard, Smartphone, Building2, Landmark, Shield } from 'lucide-react';
import { getClassById } from '../data/classes';
import { getWorkshopById } from '../data/workshops';
import PageTransition from '../components/ui/PageTransition';

const paymentMethods = [
  { id: 'upi', name: 'UPI', icon: Smartphone, description: 'Google Pay, PhonePe, Paytm' },
  { id: 'credit', name: 'Credit Card', icon: CreditCard, description: 'Visa, Mastercard, RuPay' },
  { id: 'debit', name: 'Debit Card', icon: CreditCard, description: 'All major banks' },
  { id: 'netbanking', name: 'Net Banking', icon: Building2, description: 'All major banks' },
];

export default function Payment() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState('upi');
  const [processing, setProcessing] = useState(false);

  const classData = getClassById(id);
  const workshopData = getWorkshopById(id);
  const item = classData || workshopData;

  if (!item) {
    return (
      <PageTransition>
        <div className="min-h-screen flex items-center justify-center pt-20">
          <p className="text-warm-50">Item not found.</p>
        </div>
      </PageTransition>
    );
  }

  const price = item.price;
  const discount = item.discount || 0;
  const discountedPrice = Math.round(price * (1 - discount / 100));

  const handlePay = () => {
    setProcessing(true);
    setTimeout(() => {
      navigate('/payment-success');
    }, 2000);
  };

  return (
    <PageTransition>
      <section className="pt-28 pb-20 md:pt-36 md:pb-32 px-4 md:px-8">
        <div className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-xs tracking-[0.3em] uppercase text-gold-500 mb-2">Payment</p>
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-warm-50 mb-2">
              Complete Your Enrollment
            </h1>
            <div className="h-px w-16 bg-gold-500 mb-10" />
          </motion.div>

          {/* Enrollment Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="bg-dark-800 border border-dark-600 p-6 mb-8"
          >
            <h3 className="text-xs uppercase tracking-wider text-dark-300 mb-4">Enrollment Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-dark-200">{classData ? 'Class' : 'Workshop'}</span>
                <span className="text-sm text-warm-50 font-medium">{item.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-dark-200">Batch</span>
                <span className="text-sm text-warm-50">{item.schedule ? item.schedule.join(' / ') : item.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-dark-200">Time</span>
                <span className="text-sm text-warm-50">{item.time}</span>
              </div>
              <div className="flex justify-between pt-3 border-t border-dark-600">
                <span className="text-sm font-medium text-warm-50">Amount</span>
                <span className="font-heading text-2xl font-bold text-gold-500">₹{discountedPrice.toLocaleString()}</span>
              </div>
            </div>
          </motion.div>

          {/* Payment Methods */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mb-8"
          >
            <h3 className="text-xs uppercase tracking-wider text-dark-300 mb-4">Select Payment Method</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {paymentMethods.map((method) => {
                const Icon = method.icon;
                return (
                  <button
                    key={method.id}
                    onClick={() => setSelectedMethod(method.id)}
                    className={`flex items-center gap-4 p-4 border transition-all duration-300 text-left cursor-pointer ${
                      selectedMethod === method.id
                        ? 'bg-dark-700 border-gold-500'
                        : 'bg-dark-800 border-dark-600 hover:border-dark-400'
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${selectedMethod === method.id ? 'text-gold-500' : 'text-dark-300'}`} />
                    <div>
                      <p className="text-sm font-medium text-warm-50">{method.name}</p>
                      <p className="text-xs text-dark-300">{method.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Pay Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <button
              onClick={handlePay}
              disabled={processing}
              className={`w-full py-4 text-sm uppercase tracking-widest font-semibold transition-all duration-300 cursor-pointer ${
                processing
                  ? 'bg-dark-600 text-dark-300'
                  : 'bg-gold-500 text-dark-900 hover:bg-gold-400'
              }`}
            >
              {processing ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Processing...
                </span>
              ) : (
                `Pay ₹${discountedPrice.toLocaleString()}`
              )}
            </button>

            <div className="flex items-center justify-center gap-2 mt-4">
              <Shield className="w-4 h-4 text-dark-300" />
              <p className="text-xs text-dark-300">Secure payment · SSL encrypted</p>
            </div>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
}
