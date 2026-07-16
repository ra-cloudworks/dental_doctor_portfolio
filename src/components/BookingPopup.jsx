import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBooking } from './BookingContext';
import ConfettiBurst from './ConfettiBurst';

const C = {
  forestGreen: 'var(--color-forest-green)',
  gold: 'var(--color-gold-accent)',
  creamBg: 'var(--color-cream-bg)',
  serif: 'var(--font-serif-elegant)',
  sans: 'var(--font-sans-premium)',
};

const OVERLAY = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const PANEL = {
  hidden: { opacity: 0, scale: 0.92, y: 40, filter: 'blur(8px)' },
  visible: {
    opacity: 1, scale: 1, y: 0, filter: 'blur(0px)',
    transition: { type: 'spring', stiffness: 320, damping: 28, mass: 0.8 },
  },
  exit: {
    opacity: 0, scale: 0.95, y: 20, filter: 'blur(4px)',
    transition: { duration: 0.2, ease: [0.4, 0, 1, 1] },
  },
};

const FIELD = {
  hidden: { opacity: 0, x: -12 },
  visible: (i) => ({
    opacity: 1, x: 0,
    transition: { delay: 0.15 + i * 0.06, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

const specialties = [
  { value: 'implantology', label: 'Dental Implantology' },
  { value: 'rehabilitation', label: 'Full-Mouth Rehabilitation' },
  { value: 'cosmetic', label: 'Cosmetic Dentistry' },
  { value: 'prosthodontics', label: 'General Prosthodontics' },
  { value: 'other', label: 'Second Opinion / Other' },
];

const steps = [
  { id: 'personal', label: 'Personal Details' },
  { id: 'appointment', label: 'Appointment Info' },
];

export default function BookingPopup() {
  const { isOpen, closeBooking } = useBooking();
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    preferredDate: '', preferredTime: '', specialty: 'implantology', message: '',
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // eslint-disable-next-line react-hooks/set-state-in-effect -- reset form state on modal open
      setStep(0);
      setSubmitSuccess(false);
      setErrors({});
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateStep = () => {
    const errs = {};
    if (step === 0) {
      if (!formData.firstName.trim()) errs.firstName = 'Required';
      if (!formData.lastName.trim()) errs.lastName = 'Required';
      if (!formData.email.trim()) errs.email = 'Required';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errs.email = 'Invalid email';
      if (!formData.phone.trim()) errs.phone = 'Required';
    } else {
      if (!formData.preferredDate) errs.preferredDate = 'Required';
      if (!formData.preferredTime) errs.preferredTime = 'Required';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const nextStep = () => { if (validateStep()) setStep(1); };
  const prevStep = () => setStep(0);

  const handleSubmit = async () => {
    if (!validateStep()) return;
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, preferredDate: `${formData.preferredDate} ${formData.preferredTime}` }),
      });
      if (!res.ok) throw new Error('Failed');
      setSubmitSuccess(true);
    } catch {
      alert('Failed to submit. Please try again or call us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const fieldClass = (hasError) =>
    `w-full px-4 py-3 rounded-xl border text-sm font-light transition-all duration-300 outline-none ${
      hasError
        ? 'border-red-400 bg-red-50 focus:ring-2 focus:ring-red-300/40'
        : 'border-gray-200 focus:border-[var(--color-gold-accent)] focus:ring-2 focus:ring-[var(--color-gold-accent)]/20'
    }`;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          variants={OVERLAY}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0"
            style={{ backgroundColor: 'rgba(4,35,30,0.6)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}
            onClick={closeBooking}
          />

          {/* Panel */}
          <motion.div
            className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-[2rem] shadow-2xl"
            style={{ backgroundColor: C.creamBg, fontFamily: C.sans }}
            variants={PANEL}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Decorative gold accent top */}
            <div className="absolute top-0 left-0 right-0 h-1 rounded-t-[2rem]"
              style={{ background: `linear-gradient(90deg, transparent, ${C.gold}, transparent)` }} />

            {/* Close button */}
            <motion.button
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full flex items-center justify-center cursor-pointer"
              style={{ backgroundColor: 'rgba(4,35,30,0.06)' }}
              onClick={closeBooking}
              whileHover={{ scale: 1.1, backgroundColor: 'rgba(4,35,30,0.12)' }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-4 h-4" fill="none" stroke="var(--color-forest-green)" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>

            <div className="p-8 sm:p-10">
              <AnimatePresence mode="wait">
                {submitSuccess ? (
                  /* ── SUCCESS STATE ────────────────────────── */
                  <motion.div
                    key="success"
                    className="text-center py-8 space-y-6 relative"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 18 }}
                  >
                    {/* Confetti burst */}
                    <ConfettiBurst count={30} />
                    {/* Animated check circle */}
                    <motion.div
                      className="w-20 h-20 rounded-full mx-auto flex items-center justify-center text-white"
                      style={{ backgroundColor: C.forestGreen }}
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.2 }}
                    >
                      <motion.svg
                        className="w-10 h-10"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        viewBox="0 0 24 24"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                      >
                        <motion.path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"
                          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.4, delay: 0.5 }} />
                      </motion.svg>
                    </motion.div>

                    <motion.h3
                      className="text-2xl font-normal"
                      style={{ fontFamily: C.serif, color: C.forestGreen }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      Appointment Requested!
                    </motion.h3>

                    <motion.p
                      className="text-gray-500 text-sm font-light leading-relaxed max-w-sm mx-auto"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      Thank you, <span className="font-semibold" style={{ color: C.forestGreen }}>{formData.firstName}</span>. Our coordinator will contact you shortly to confirm your appointment.
                    </motion.p>

                    {/* Summary card */}
                    <motion.div
                      className="bg-white rounded-2xl p-5 text-left space-y-3 mx-auto max-w-sm"
                      style={{ border: '1px solid rgba(4,35,30,0.06)' }}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-400 font-medium">Date</span>
                        <span className="font-semibold" style={{ color: C.forestGreen }}>{formData.preferredDate}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-400 font-medium">Time</span>
                        <span className="font-semibold" style={{ color: C.forestGreen }}>{formData.preferredTime}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-400 font-medium">Specialty</span>
                        <span className="font-semibold" style={{ color: C.forestGreen }}>
                          {specialties.find(s => s.value === formData.specialty)?.label}
                        </span>
                      </div>
                    </motion.div>

                    <motion.button
                      className="font-bold py-3 px-8 rounded-full text-[10px] tracking-widest uppercase text-white cursor-pointer"
                      style={{ backgroundColor: C.forestGreen }}
                      onClick={closeBooking}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.7 }}
                    >
                      Done
                    </motion.button>
                  </motion.div>
                ) : (
                  /* ── FORM STATE ────────────────────────────── */
                  <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    {/* Header */}
                    <div className="mb-8 space-y-2">
                      <motion.div
                        className="w-11 h-11 rounded-full flex items-center justify-center mb-3"
                        style={{ background: 'rgba(184,150,108,0.12)', border: '1px solid rgba(184,150,108,0.28)', color: C.gold }}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 300, delay: 0.1 }}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </motion.div>
                      <motion.h2
                        className="text-2xl font-normal tracking-wide"
                        style={{ fontFamily: C.serif, color: C.forestGreen }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 }}
                      >
                        Book a Consultation
                      </motion.h2>
                      <motion.p
                        className="text-gray-500 text-xs sm:text-sm font-light leading-relaxed"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        Fill in your details below. We'll confirm your appointment within 24 hours.
                      </motion.p>
                    </div>

                    {/* Step indicator */}
                    <motion.div
                      className="flex gap-2 mb-8"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.25 }}
                    >
                      {steps.map((s, i) => (
                        <div key={s.id} className="flex-1 flex items-center gap-2">
                          <div
                            className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold transition-all duration-300"
                            style={{
                              backgroundColor: i <= step ? C.forestGreen : 'rgba(4,35,30,0.08)',
                              color: i <= step ? '#fff' : 'rgba(4,35,30,0.3)',
                            }}
                          >
                            {i < step ? (
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                            ) : (i + 1)}
                          </div>
                          <span className="text-[9px] font-bold tracking-widest uppercase hidden sm:inline"
                            style={{ color: i <= step ? C.forestGreen : 'rgba(4,35,30,0.3)' }}>{s.label}</span>
                          {i < steps.length - 1 && (
                            <div className="flex-1 h-px mx-2 transition-colors duration-300"
                              style={{ backgroundColor: i < step ? C.gold : 'rgba(4,35,30,0.1)' }} />
                          )}
                        </div>
                      ))}
                    </motion.div>

                    {/* Form fields */}
                    <AnimatePresence mode="wait">
                      {step === 0 ? (
                        <motion.div
                          key="step0"
                          className="space-y-5"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.3 }}
                        >
                          <motion.div className="grid grid-cols-2 gap-4" custom={0} variants={FIELD} initial="hidden" animate="visible">
                            <div className="space-y-1.5">
                              <label className="block text-[10px] font-bold tracking-wider uppercase text-gray-500">First Name *</label>
                              <input type="text" name="firstName" value={formData.firstName} onChange={handleChange}
                                placeholder="Rajeswari" className={fieldClass(errors.firstName)} />
                              {errors.firstName && <motion.p className="text-[10px] text-red-500 font-medium" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{errors.firstName}</motion.p>}
                            </div>
                            <div className="space-y-1.5">
                              <label className="block text-[10px] font-bold tracking-wider uppercase text-gray-500">Last Name *</label>
                              <input type="text" name="lastName" value={formData.lastName} onChange={handleChange}
                                placeholder="Kumar" className={fieldClass(errors.lastName)} />
                              {errors.lastName && <motion.p className="text-[10px] text-red-500 font-medium" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{errors.lastName}</motion.p>}
                            </div>
                          </motion.div>

                          <motion.div className="space-y-1.5" custom={1} variants={FIELD} initial="hidden" animate="visible">
                            <label className="block text-[10px] font-bold tracking-wider uppercase text-gray-500">Email Address *</label>
                            <input type="email" name="email" value={formData.email} onChange={handleChange}
                              placeholder="rajeswari.k@example.com" className={fieldClass(errors.email)} />
                            {errors.email && <motion.p className="text-[10px] text-red-500 font-medium" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{errors.email}</motion.p>}
                          </motion.div>

                          <motion.div className="space-y-1.5" custom={2} variants={FIELD} initial="hidden" animate="visible">
                            <label className="block text-[10px] font-bold tracking-wider uppercase text-gray-500">Phone Number *</label>
                            <input type="tel" name="phone" value={formData.phone} onChange={handleChange}
                              placeholder="+91 98765 43210" className={fieldClass(errors.phone)} />
                            {errors.phone && <motion.p className="text-[10px] text-red-500 font-medium" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{errors.phone}</motion.p>}
                          </motion.div>

                          <motion.div className="space-y-1.5" custom={3} variants={FIELD} initial="hidden" animate="visible">
                            <label className="block text-[10px] font-bold tracking-wider uppercase text-gray-500">Focus Area</label>
                            <select name="specialty" value={formData.specialty} onChange={handleChange}
                              className={`${fieldClass(false)} bg-white cursor-pointer`}>
                              {specialties.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                            </select>
                          </motion.div>

                          <motion.div
                            className="flex justify-end pt-2"
                            custom={4} variants={FIELD} initial="hidden" animate="visible"
                          >
                            <motion.button
                              className="font-bold py-3 px-8 rounded-full text-[10px] tracking-widest uppercase text-white cursor-pointer flex items-center gap-2"
                              style={{ backgroundColor: C.forestGreen }}
                              onClick={nextStep}
                              whileHover={{ scale: 1.03, boxShadow: '0 8px 25px -5px rgba(4,35,30,0.3)' }}
                              whileTap={{ scale: 0.97 }}
                            >
                              Continue
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                              </svg>
                            </motion.button>
                          </motion.div>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="step1"
                          className="space-y-5"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          transition={{ duration: 0.3 }}
                        >
                          <motion.div className="grid grid-cols-2 gap-4" custom={0} variants={FIELD} initial="hidden" animate="visible">
                            <div className="space-y-1.5">
                              <label className="block text-[10px] font-bold tracking-wider uppercase text-gray-500">Preferred Date *</label>
                              <input type="date" name="preferredDate" value={formData.preferredDate} onChange={handleChange}
                                min={new Date().toISOString().split('T')[0]}
                                className={fieldClass(errors.preferredDate)} />
                              {errors.preferredDate && <motion.p className="text-[10px] text-red-500 font-medium" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{errors.preferredDate}</motion.p>}
                            </div>
                            <div className="space-y-1.5">
                              <label className="block text-[10px] font-bold tracking-wider uppercase text-gray-500">Preferred Time *</label>
                              <select name="preferredTime" value={formData.preferredTime} onChange={handleChange}
                                className={`${fieldClass(errors.preferredTime)} bg-white cursor-pointer`}>
                                <option value="">Select time</option>
                                <option value="09:00 AM">09:00 AM</option>
                                <option value="10:00 AM">10:00 AM</option>
                                <option value="11:00 AM">11:00 AM</option>
                                <option value="12:00 PM">12:00 PM</option>
                                <option value="02:00 PM">02:00 PM</option>
                                <option value="03:00 PM">03:00 PM</option>
                                <option value="04:00 PM">04:00 PM</option>
                                <option value="05:00 PM">05:00 PM</option>
                              </select>
                              {errors.preferredTime && <motion.p className="text-[10px] text-red-500 font-medium" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{errors.preferredTime}</motion.p>}
                            </div>
                          </motion.div>

                          <motion.div className="space-y-1.5" custom={1} variants={FIELD} initial="hidden" animate="visible">
                            <label className="block text-[10px] font-bold tracking-wider uppercase text-gray-500">Brief Case Summary (Optional)</label>
                            <textarea name="message" value={formData.message} onChange={handleChange} rows="3"
                              placeholder="Describe your current dental status or concerns..."
                              className={`${fieldClass(false)} resize-none`} />
                          </motion.div>

                          {/* Quick summary */}
                          <motion.div
                            className="bg-white rounded-xl p-4 space-y-2"
                            style={{ border: '1px solid rgba(4,35,30,0.06)' }}
                            custom={2} variants={FIELD} initial="hidden" animate="visible"
                          >
                            <div className="text-[9px] font-bold tracking-widest uppercase" style={{ color: C.gold }}>Appointment Summary</div>
                            <div className="text-xs text-gray-600 font-light">
                              <span className="font-semibold" style={{ color: C.forestGreen }}>{formData.firstName} {formData.lastName}</span>
                              {' '}&mdash;{' '}
                              {specialties.find(s => s.value === formData.specialty)?.label}
                            </div>
                          </motion.div>

                          <motion.div
                            className="flex justify-between gap-3 pt-2"
                            custom={3} variants={FIELD} initial="hidden" animate="visible"
                          >
                            <motion.button
                              className="font-bold py-3 px-6 rounded-full text-[10px] tracking-widest uppercase cursor-pointer"
                              style={{ border: '1px solid rgba(4,35,30,0.15)', color: C.forestGreen }}
                              onClick={prevStep}
                              whileHover={{ scale: 1.03 }}
                              whileTap={{ scale: 0.97 }}
                            >
                              Back
                            </motion.button>
                            <motion.button
                              className="font-bold py-3 px-8 rounded-full text-[10px] tracking-widest uppercase text-white cursor-pointer flex items-center gap-2 disabled:opacity-50"
                              style={{ backgroundColor: C.forestGreen }}
                              onClick={handleSubmit}
                              disabled={isSubmitting}
                              whileHover={!isSubmitting ? { scale: 1.03, boxShadow: '0 8px 25px -5px rgba(4,35,30,0.3)' } : {}}
                              whileTap={!isSubmitting ? { scale: 0.97 } : {}}
                            >
                              {isSubmitting ? (
                                <>
                                  <motion.div
                                    className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                                  />
                                  Submitting...
                                </>
                              ) : (
                                <>
                                  Confirm Booking
                                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                  </svg>
                                </>
                              )}
                            </motion.button>
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
