import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getClassById } from '../data/classes';
import { getWorkshopById } from '../data/workshops';
import Button from '../components/ui/Button';
import PageTransition from '../components/ui/PageTransition';

export default function Enroll() {
  const { id } = useParams();
  const navigate = useNavigate();
  const classData = getClassById(id);
  const workshopData = getWorkshopById(id);
  const item = classData || workshopData;

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    batch: item?.schedule ? item.schedule.join(' / ') + ' · ' + (item.time || '') : '',
  });

  if (!item) {
    return (
      <PageTransition>
        <div className="min-h-screen flex items-center justify-center pt-20">
          <div className="text-center">
            <h1 className="font-heading text-4xl font-bold text-warm-50 mb-4">Not Found</h1>
            <Button to="/classes" variant="outline">Back to Classes</Button>
          </div>
        </div>
      </PageTransition>
    );
  }

  const price = item.price;
  const discount = item.discount || 0;
  const discountedPrice = Math.round(price * (1 - discount / 100));

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/payment/${id}`);
  };

  return (
    <PageTransition>
      <section className="pt-28 pb-20 md:pt-36 md:pb-32 px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-xs tracking-[0.3em] uppercase text-gold-500 mb-2">Enrollment</p>
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-warm-50 mb-2">
              {item.name}
            </h1>
            <div className="h-px w-16 bg-gold-500 mb-8" />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Form */}
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="lg:col-span-2 space-y-6"
            >
              <div>
                <label className="block text-xs uppercase tracking-wider text-dark-200 mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-dark-800 border border-dark-600 px-4 py-3 text-warm-50 text-sm focus:outline-none focus:border-gold-500 transition-colors"
                  placeholder="Enter your full name"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-dark-200 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-dark-800 border border-dark-600 px-4 py-3 text-warm-50 text-sm focus:outline-none focus:border-gold-500 transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-dark-200 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    className="w-full bg-dark-800 border border-dark-600 px-4 py-3 text-warm-50 text-sm focus:outline-none focus:border-gold-500 transition-colors"
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-dark-200 mb-2">Age</label>
                  <input
                    type="number"
                    name="age"
                    value={form.age}
                    onChange={handleChange}
                    required
                    className="w-full bg-dark-800 border border-dark-600 px-4 py-3 text-warm-50 text-sm focus:outline-none focus:border-gold-500 transition-colors"
                    placeholder="25"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-dark-200 mb-2">Select Batch</label>
                  <select
                    name="batch"
                    value={form.batch}
                    onChange={handleChange}
                    className="w-full bg-dark-800 border border-dark-600 px-4 py-3 text-warm-50 text-sm focus:outline-none focus:border-gold-500 transition-colors"
                  >
                    <option>{item.schedule ? item.schedule.join(' / ') + ' · ' + (item.time || '') : 'Select batch'}</option>
                  </select>
                </div>
              </div>

              <div className="pt-4">
                <Button type="submit" variant="primary" size="lg" className="w-full md:w-auto">
                  Continue to Payment
                </Button>
              </div>
            </motion.form>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <div className="bg-dark-800 border border-dark-600 p-6 sticky top-24">
                <h3 className="font-heading text-lg font-bold text-warm-50 mb-6 pb-4 border-b border-dark-600">
                  Order Summary
                </h3>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-dark-200">{classData ? 'Class' : 'Workshop'}</span>
                    <span className="text-warm-50">{item.name}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-dark-200">Batch</span>
                    <span className="text-warm-50 text-right text-xs">{item.schedule ? item.schedule.join(' / ') : item.date}</span>
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-dark-600">
                  <div className="flex justify-between text-sm">
                    <span className="text-dark-200">Original Fee</span>
                    <span className="text-warm-50">₹{price.toLocaleString()}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-dark-200">Discount ({discount}%)</span>
                      <span className="text-green-400">-₹{(price - discountedPrice).toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between pt-3 border-t border-dark-600">
                    <span className="text-sm font-medium text-warm-50">Total</span>
                    <span className="font-heading text-2xl font-bold text-gold-500">₹{discountedPrice.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
