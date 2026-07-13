import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from '../../components/ScrollReveal';

const C = {
  creamBg:     'var(--color-cream-bg)',
  creamCard:   'var(--color-cream-card)',
  forestGreen: 'var(--color-forest-green)',
  gold:        'var(--color-gold-accent)',
  serif:       'var(--font-serif-elegant)',
  sans:        'var(--font-sans-premium)',
};

const defaultFaqItems = [
  { question: 'How long does a consultation take?', answer: 'A standard diagnostic assessment takes approximately 45 minutes. This includes our preliminary visual examination, optional 3D scanning, and mapping out a primary treatment proposal.' },
  { question: 'What should I bring to my first appointment?', answer: 'Please bring any recent dental records, X-rays, or CBCT scans taken within the past 12 months, along with a list of your current medications and medical history.' },
  { question: 'Is there a fee for the initial consultation?', answer: 'Yes, the consultation covers a thorough clinical diagnostic evaluation, high-definition digital visualization, and a customized treatment roadmap designed by Dr. Popuri.' },
  { question: 'Can I reschedule my appointment later?', answer: 'Absolutely. You can reschedule or cancel your consultation up to 24 hours prior to your scheduled time. Simply contact our support desk or reply to your email confirmation.' },
];

export default function Booking() {
  const [faqItems, setFaqItems] = useState(defaultFaqItems);
  const [content, setContent] = useState({
    clinic_phone: '+91 (0) 40 2345 6789',
  });

  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', phone: '', preferredDate: '', specialty: 'implantology', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });

    fetch('/api/patient-resources')
      .then(res => { if (res.ok) return res.json(); throw new Error('Failed'); })
      .then(data => {
        if (data && data.length > 0) {
          const faqs = data.filter(r => r.category === 'FAQ').map(r => ({ question: r.title, answer: r.description }));
          if (faqs.length > 0) setFaqItems(faqs);
        }
      })
      .catch(() => {});

    fetch('/api/content')
      .then(res => { if (res.ok) return res.json(); throw new Error('Failed'); })
      .then(data => { if (data) setContent(prev => ({ ...prev, ...data })); })
      .catch(() => {});
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => { setIsSubmitting(false); setSubmitSuccess(true); setFormData({ firstName: '', lastName: '', email: '', phone: '', preferredDate: '', specialty: 'implantology', message: '' }); }, 1500);
  };

  const toggleFaq = (index) => setOpenFaqIndex(prev => prev === index ? null : index);

  return (
    <div style={{ backgroundColor: C.creamBg, fontFamily: C.sans, color: C.forestGreen }} className="min-h-screen pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-16">

        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: C.gold }}>Clinical Appointment Request</span>
            <h1 className="text-4xl sm:text-5xl font-normal leading-tight" style={{ fontFamily: C.serif }}>Request a Consultation</h1>
            <p className="text-gray-600 text-sm sm:text-base font-light leading-relaxed">Begin your journey towards precision dental restoration. Please provide your details below, and our coordinator will confirm your clinical diagnostic session.</p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-24">

          <ScrollReveal direction="left" x={40} className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-sm border border-black/[0.04] text-left">
              {submitSuccess ? (
                <motion.div className="py-12 text-center space-y-6" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}>
                  <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center text-white" style={{ backgroundColor: C.forestGreen }}>
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <h3 className="text-2xl font-normal" style={{ fontFamily: C.serif }}>Consultation Request Received</h3>
                  <p className="text-gray-600 text-sm font-light leading-relaxed max-w-md mx-auto">Thank you for reaching out. Our clinical patient coordinator will review your request and contact you shortly to finalize your date and time.</p>
                  <button type="button" onClick={() => setSubmitSuccess(false)} className="font-bold py-3 px-8 rounded-full text-[10px] tracking-widest uppercase text-white cursor-pointer" style={{ backgroundColor: C.forestGreen }}>Submit Another Request</button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-[10px] font-bold tracking-wider uppercase text-gray-500">First Name</label>
                      <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required placeholder="e.g. Rajeswari" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[var(--color-gold-accent)] transition-all text-sm font-light" />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-[10px] font-bold tracking-wider uppercase text-gray-500">Last Name</label>
                      <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required placeholder="e.g. Kumar" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[var(--color-gold-accent)] transition-all text-sm font-light" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-[10px] font-bold tracking-wider uppercase text-gray-500">Email Address</label>
                      <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="e.g. rajeswari.k@example.com" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[var(--color-gold-accent)] transition-all text-sm font-light" />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-[10px] font-bold tracking-wider uppercase text-gray-500">Phone Number</label>
                      <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="e.g. +91 98765 43210" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[var(--color-gold-accent)] transition-all text-sm font-light" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-[10px] font-bold tracking-wider uppercase text-gray-500">Preferred Date</label>
                      <input type="date" name="preferredDate" value={formData.preferredDate} onChange={handleChange} required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[var(--color-gold-accent)] transition-all text-sm font-light" />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-[10px] font-bold tracking-wider uppercase text-gray-500">Focus Area</label>
                      <select name="specialty" value={formData.specialty} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[var(--color-gold-accent)] bg-white transition-all text-sm font-light">
                        <option value="implantology">Dental Implantology</option>
                        <option value="rehabilitation">Full-Mouth Rehabilitation</option>
                        <option value="cosmetic">Cosmetic Dentistry</option>
                        <option value="prosthodontics">General Prosthodontics</option>
                        <option value="other">Second Opinion / Other</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-[10px] font-bold tracking-wider uppercase text-gray-500">Brief Case Summary / Notes</label>
                    <textarea name="message" value={formData.message} onChange={handleChange} rows="4" placeholder="Describe your current dental status, missing teeth, active restorations, or diagnostic goals..." className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[var(--color-gold-accent)] transition-all text-sm font-light resize-y" />
                  </div>
                  <motion.button type="submit" disabled={isSubmitting} className="w-full font-bold py-4 rounded-xl text-[11px] tracking-widest uppercase text-white shadow-md transition-all duration-300 hover:shadow-lg active:translate-y-[1px] disabled:opacity-50 cursor-pointer" style={{ backgroundColor: C.forestGreen }} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                    {isSubmitting ? 'Processing Request...' : 'Send Consultation Request'}
                  </motion.button>
                </form>
              )}
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" x={40} delay={0.15} className="lg:col-span-5 space-y-6 text-left">
            <div className="rounded-3xl p-8 sm:p-10 shadow-lg relative overflow-hidden text-white" style={{ backgroundColor: C.forestGreen }}>
              <div className="absolute -right-16 -top-16 w-32 h-32 rounded-full blur-2xl pointer-events-none" style={{ backgroundColor: 'rgba(184,150,108,0.12)' }} />
              <h3 className="text-2xl font-normal mb-6 tracking-wide" style={{ fontFamily: C.serif }}>Assessment Inclusions</h3>
              <ul className="space-y-6">
                {[
                  { title: 'Clinical Diagnostics', desc: 'Thorough examination of occlusal relationships, bone structure, and periodontal support.' },
                  { title: 'Digital CAD/CAM Scan', desc: 'High-definition oral scanning and modeling mapping out prosthodontic designs.' },
                  { title: 'Treatment Roadmap', desc: 'A bespoke multi-phase surgical/prosthetic plan, including structural timeline and cost estimate.' },
                ].map((item, index) => (
                  <li key={index} className="flex gap-4">
                    <div className="w-5 h-5 flex-shrink-0 mt-0.5 rounded-full flex items-center justify-center border" style={{ borderColor: C.gold, color: C.gold }}><span className="text-[10px]">✓</span></div>
                    <div><h4 className="font-semibold text-sm sm:text-base tracking-wide" style={{ color: C.gold }}>{item.title}</h4><p className="text-xs font-light leading-relaxed mt-1 text-gray-300">{item.desc}</p></div>
                  </li>
                ))}
              </ul>
              <div className="pt-8 mt-8 border-t border-white/10 flex justify-between items-center">
                <div><span className="block text-[9px] font-bold tracking-widest uppercase text-gray-400">Duration</span><span className="text-lg font-normal font-serif">~45 minutes</span></div>
                <div className="text-right"><span className="block text-[9px] font-bold tracking-widest uppercase text-gray-400">Diagnostic Fee</span><span className="text-lg font-normal font-serif" style={{ color: C.gold }}>Custom Assessment</span></div>
              </div>
            </div>

            <div className="rounded-3xl p-8 border border-black/[0.04] bg-white text-left space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider" style={{ color: C.gold }}>Immediate Assistance</h4>
              <p className="text-xs text-gray-500 font-light leading-relaxed">If you are experiencing acute pain or have a dental emergency, please call our Jubilee Hills clinic directly.</p>
              <div className="flex gap-3 items-center">
                <svg className="w-4 h-4 flex-shrink-0 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                <a href="tel:+914023456789" className="text-xs sm:text-sm font-semibold hover:underline" style={{ color: C.forestGreen }}>{content.clinic_phone}</a>
              </div>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal>
          <div id="faq" className="max-w-4xl mx-auto border-t border-black/[0.06] pt-20">
            <div className="text-center mb-12 space-y-3">
              <h2 className="text-3xl font-normal" style={{ fontFamily: C.serif }}>Appointment FAQs</h2>
              <p className="text-gray-500 text-xs sm:text-sm font-light">Common information for patients regarding their initial diagnostic consult.</p>
            </div>
            <div className="space-y-4">
              {faqItems.map((faq, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <motion.div key={index} className="rounded-2xl border bg-white overflow-hidden" style={{ borderColor: isOpen ? C.gold : 'rgba(4,35,30,0.06)' }} animate={{ boxShadow: isOpen ? '0 4px 12px -2px rgba(184,150,108,0.12)' : '0 0 0 0 rgba(0,0,0,0)' }}>
                    <button onClick={() => toggleFaq(index)} className="w-full px-6 py-4 flex justify-between items-center text-left focus:outline-none cursor-pointer">
                      <span className="font-semibold text-xs sm:text-sm tracking-wide text-left" style={{ color: C.forestGreen }}>{faq.question}</span>
                      <motion.span className="ml-4 flex-shrink-0 text-sm font-light" style={{ color: C.gold }} animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.2 }}>＋</motion.span>
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}>
                          <div className="px-6 pb-5 text-xs sm:text-sm text-gray-500 font-light leading-relaxed border-t border-black/[0.02] pt-3">{faq.answer}</div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
