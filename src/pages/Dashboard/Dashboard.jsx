import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import DashboardTab from './tabs/DashboardTab';
import ContentLibraryTab from './tabs/ContentLibraryTab';
import SiteSettingsTab from './tabs/SiteSettingsTab';
import AnalyticsTab from './tabs/AnalyticsTab';

const C = {
  creamBg:     'var(--color-cream-bg)',
  creamCard:   'var(--color-cream-card)',
  forestGreen: 'var(--color-forest-green)',
  gold:        'var(--color-gold-accent)',
  serif:       'var(--font-serif-elegant)',
  sans:        'var(--font-sans-premium)',
};

const MODAL_SECTIONS = [
  { key: 'hero', label: 'Hero', icon: '🏠' },
  { key: 'stats', label: 'Stats', icon: '📊' },
  { key: 'specialties', label: 'Specialties', icon: '🦷' },
  { key: 'gallery', label: 'Gallery', icon: '🖼' },
  { key: 'about', label: 'About', icon: '👨‍⚕️' },
  { key: 'credentials', label: 'Credentials', icon: '🎓' },
  { key: 'patient-resources', label: 'Patient Resources', icon: '📋' },
  { key: 'award', label: 'Awards', icon: '🏆' },
  { key: 'clinic', label: 'Clinic Info', icon: '🏥' },
  { key: 'footer-bio', label: 'Footer Bio', icon: '📝' },
  { key: 'success-stories', label: 'Success Stories', icon: '⭐' },
];

const SECTION_TITLES = {
  'hero': 'Edit Home Page Content',
  'stats': 'Update Clinical Statistics',
  'specialties': 'Edit Service Specialties',
  'gallery': 'Manage Clinical Gallery',
  'about': 'Edit About Dr. Popuri & Bio',
  'credentials': 'Manage Timeline Credentials',
  'patient-resources': 'Manage Patient Resources',
  'award': 'Edit Primary Award',
  'clinic': 'Update Clinic Information',
  'footer-bio': 'Edit Footer Bio Summary',
  'success-stories': 'Edit Success Stories',
};

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [activeSidebarTab, setActiveSidebarTab] = useState('Home Page');
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('dashboard_auth') === 'true';
  });
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [bookings, setBookings] = useState([]);
  
  // Data states
  const [content, setContent] = useState({});
  const [specialties, setSpecialties] = useState([]);
  const [cases, setCases] = useState([]);
  const [timeline, setTimeline] = useState([]);
  const [stats, setStats] = useState([]);
  const [patientResources, setPatientResources] = useState([]);
  
  // Loading & status states
  const [loading, setLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState('READY');
  
  // Modal states
  const [activeModal, setActiveModal] = useState(null);
  const [modalSection, setModalSection] = useState('hero');
  const [selectedItem, setSelectedItem] = useState(null);
  
  // Form states
  const [heroForm, setHeroForm] = useState({
    hero_badge: '',
    hero_title_left: '',
    hero_title_gold: '',
    hero_title_right: '',
    hero_desc: '',
    hero_profile_img: '',
    hero_badge_title: '',
    hero_badge_desc: '',
  });

  const [implantForm, setImplantForm] = useState({
    implant_title: '',
    implant_subtitle: '',
    implant_desc: '',
    implant_proc1_title: '',
    implant_proc1_desc: '',
    implant_proc2_title: '',
    implant_proc2_desc: '',
    tech_item1_title: '',
    tech_item1_desc: '',
    tech_item2_title: '',
    tech_item2_desc: '',
    tech_item3_title: '',
    tech_item3_desc: '',
  });

  const [aboutForm, setAboutForm] = useState({
    commit_title: '',
    commit_desc: '',
    commit_badge1_val: '',
    commit_badge1_lbl: '',
    commit_badge2_val: '',
    commit_badge2_lbl: '',
  });

  const [awardForm, setAwardForm] = useState({
    primary_award_title: '',
    primary_award_desc: '',
  });

  const [clinicForm, setClinicForm] = useState({
    clinic_phone: '',
    clinic_location: '',
    clinic_email: '',
  });

  const [footerBioForm, setFooterBioForm] = useState({
    footer_bio_summary: '',
  });

  const [storyForm, setStoryForm] = useState({
    story_quote: '',
    story_patient_name: '',
    story_patient_role: '',
  });

  // Modal item editors
  const [specialtyForm, setSpecialtyForm] = useState({ id: null, title: '', desc: '', icon: '', link: '' });
  const [caseForm, setCaseForm] = useState({
    id: null,
    case_id: '',
    category: '',
    title: '',
    desc: '',
    beforeImage: '',
    afterImage: '',
    prosthetics: '',
    duration: '',
    material: '',
    featured: 0
  });
  const [timelineForm, setTimelineForm] = useState({ id: null, tag: '', title: '', institution: '', details: '' });
  const [statsForm, setStatsForm] = useState([]);
  const [patientResourceForm, setPatientResourceForm] = useState({ id: null, title: '', category: 'General Info', description: '', icon: '📄', link: '', sort_order: 0 });

  // Sync modalSection when activeModal changes
  useEffect(() => {
    if (activeModal) {
      setModalSection(activeModal);
    }
  }, [activeModal]);

  // Fetch all database content
  const fetchData = async () => {
    try {
      setLoading(true);
      const [resContent, resSpecialties, resCases, resTimeline, resStats, resPatientResources, resBookings] = await Promise.all([
        fetch('/api/content').then(res => res.json()),
        fetch('/api/specialties').then(res => res.json()),
        fetch('/api/cases').then(res => res.json()),
        fetch('/api/timeline').then(res => res.json()),
        fetch('/api/stats').then(res => res.json()),
        fetch('/api/patient-resources').then(res => res.json()),
        fetch('/api/bookings').then(res => res.ok ? res.json() : []).catch(() => []),
      ]);

      setContent(resContent);
      setSpecialties(resSpecialties);
      setCases(resCases);
      setTimeline(resTimeline);
      setStats(resStats);
      setPatientResources(resPatientResources);
      setBookings(Array.isArray(resBookings) ? resBookings : []);
      
      // Populate forms
      setHeroForm({
        hero_badge: resContent.hero_badge || '',
        hero_title_left: resContent.hero_title_left || '',
        hero_title_gold: resContent.hero_title_gold || '',
        hero_title_right: resContent.hero_title_right || '',
        hero_desc: resContent.hero_desc || '',
        hero_profile_img: resContent.hero_profile_img || '',
        hero_badge_title: resContent.hero_badge_title || '',
        hero_badge_desc: resContent.hero_badge_desc || '',
      });

      setImplantForm({
        implant_title: resContent.implant_title || '',
        implant_subtitle: resContent.implant_subtitle || '',
        implant_desc: resContent.implant_desc || '',
        implant_proc1_title: resContent.implant_proc1_title || '',
        implant_proc1_desc: resContent.implant_proc1_desc || '',
        implant_proc2_title: resContent.implant_proc2_title || '',
        implant_proc2_desc: resContent.implant_proc2_desc || '',
        tech_item1_title: resContent.tech_item1_title || '',
        tech_item1_desc: resContent.tech_item1_desc || '',
        tech_item2_title: resContent.tech_item2_title || '',
        tech_item2_desc: resContent.tech_item2_desc || '',
        tech_item3_title: resContent.tech_item3_title || '',
        tech_item3_desc: resContent.tech_item3_desc || '',
      });

      setAboutForm({
        commit_title: resContent.commit_title || '',
        commit_desc: resContent.commit_desc || '',
        commit_badge1_val: resContent.commit_badge1_val || '',
        commit_badge1_lbl: resContent.commit_badge1_lbl || '',
        commit_badge2_val: resContent.commit_badge2_val || '',
        commit_badge2_lbl: resContent.commit_badge2_lbl || '',
      });

      setAwardForm({
        primary_award_title: resContent.primary_award_title || '',
        primary_award_desc: resContent.primary_award_desc || '',
      });

      setClinicForm({
        clinic_phone: resContent.clinic_phone || '',
        clinic_location: resContent.clinic_location || '',
        clinic_email: resContent.clinic_email || '',
      });

      setFooterBioForm({
        footer_bio_summary: resContent.footer_bio_summary || '',
      });

      setStoryForm({
        story_quote: resContent.story_quote || '',
        story_patient_name: resContent.story_patient_name || '',
        story_patient_role: resContent.story_patient_role || '',
      });

      setStatsForm(resStats);

      setLoading(false);
    } catch (err) {
      console.error('Error fetching CMS data:', err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError('');
    try {
      const res = await fetch('/api/auth/dashboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: loginPassword }),
      });
      if (!res.ok) throw new Error('Invalid password');
      sessionStorage.setItem('dashboard_auth', 'true');
      setIsAuthenticated(true);
    } catch (err) {
      setLoginError('Invalid password. Please try again.');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('dashboard_auth');
    setIsAuthenticated(false);
    setLoginPassword('');
  };

  // Handle generic image upload to backend
  const handleImageUpload = async (e, callback) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
      setSaveStatus('SAVING');
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Upload failed');
      const data = await response.json();
      
      callback(data.imagePath);
      setSaveStatus('SAVED');
      setTimeout(() => setSaveStatus('READY'), 2000);
    } catch (error) {
      console.error('Error uploading image:', error);
      setSaveStatus('ERROR');
      alert('Failed to upload image. Please try again.');
    }
  };

  // Submit Settings updates
  const saveSettings = async (settingsData) => {
    try {
      setSaveStatus('SAVING');
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settingsData),
      });
      if (!res.ok) throw new Error('Save settings failed');
      setSaveStatus('SAVED');
      setContent(prev => ({ ...prev, ...settingsData }));
      setTimeout(() => setSaveStatus('READY'), 2000);
      setActiveModal(null);
    } catch (err) {
      console.error(err);
      setSaveStatus('ERROR');
    }
  };

  // Specialty handlers
  const saveSpecialty = async (e) => {
    e.preventDefault();
    try {
      setSaveStatus('SAVING');
      const res = await fetch('/api/specialties', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(specialtyForm),
      });
      if (!res.ok) throw new Error('Save specialty failed');
      await fetchData();
      setSaveStatus('SAVED');
      setTimeout(() => setSaveStatus('READY'), 2000);
      setSelectedItem(null);
    } catch (err) {
      console.error(err);
      setSaveStatus('ERROR');
    }
  };

  const deleteSpecialty = async (id) => {
    if (!confirm('Are you sure you want to delete this service specialty?')) return;
    try {
      setSaveStatus('SAVING');
      const res = await fetch(`/api/specialties/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete specialty failed');
      await fetchData();
      setSaveStatus('SAVED');
      setTimeout(() => setSaveStatus('READY'), 2000);
    } catch (err) {
      console.error(err);
      setSaveStatus('ERROR');
    }
  };

  // Case handlers
  const saveCase = async (e) => {
    e.preventDefault();
    try {
      setSaveStatus('SAVING');
      const res = await fetch('/api/cases', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(caseForm),
      });
      if (!res.ok) throw new Error('Save case failed');
      await fetchData();
      setSaveStatus('SAVED');
      setTimeout(() => setSaveStatus('READY'), 2000);
      setSelectedItem(null);
    } catch (err) {
      console.error(err);
      setSaveStatus('ERROR');
    }
  };

  const deleteCase = async (id) => {
    if (!confirm('Are you sure you want to delete this clinical case?')) return;
    try {
      setSaveStatus('SAVING');
      const res = await fetch(`/api/cases/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete case failed');
      await fetchData();
      setSaveStatus('SAVED');
      setTimeout(() => setSaveStatus('READY'), 2000);
    } catch (err) {
      console.error(err);
      setSaveStatus('ERROR');
    }
  };

  // Timeline handlers
  const saveTimelineItem = async (e) => {
    e.preventDefault();
    try {
      setSaveStatus('SAVING');
      const res = await fetch('/api/timeline', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(timelineForm),
      });
      if (!res.ok) throw new Error('Save timeline item failed');
      await fetchData();
      setSaveStatus('SAVED');
      setTimeout(() => setSaveStatus('READY'), 2000);
      setSelectedItem(null);
    } catch (err) {
      console.error(err);
      setSaveStatus('ERROR');
    }
  };

  const deleteTimelineItem = async (id) => {
    if (!confirm('Are you sure you want to delete this timeline credential?')) return;
    try {
      setSaveStatus('SAVING');
      const res = await fetch(`/api/timeline/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete timeline item failed');
      await fetchData();
      setSaveStatus('SAVED');
      setTimeout(() => setSaveStatus('READY'), 2000);
    } catch (err) {
      console.error(err);
      setSaveStatus('ERROR');
    }
  };

  // Stats handlers
  const saveStats = async (e) => {
    e.preventDefault();
    try {
      setSaveStatus('SAVING');
      for (const stat of statsForm) {
        await fetch('/api/stats', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(stat),
        });
      }
      await fetchData();
      setSaveStatus('SAVED');
      setTimeout(() => setSaveStatus('READY'), 2000);
      setActiveModal(null);
    } catch (err) {
      console.error(err);
      setSaveStatus('ERROR');
    }
  };

  // Patient Resource handlers
  const savePatientResource = async (e) => {
    e.preventDefault();
    try {
      setSaveStatus('SAVING');
      const res = await fetch('/api/patient-resources', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(patientResourceForm),
      });
      if (!res.ok) throw new Error('Save patient resource failed');
      await fetchData();
      setSaveStatus('SAVED');
      setTimeout(() => setSaveStatus('READY'), 2000);
      setSelectedItem(null);
      setPatientResourceForm({ id: null, title: '', category: 'General Info', description: '', icon: '📄', link: '', sort_order: 0 });
    } catch (err) {
      console.error(err);
      setSaveStatus('ERROR');
    }
  };

  const deletePatientResource = async (id) => {
    if (!confirm('Are you sure you want to delete this patient resource?')) return;
    try {
      setSaveStatus('SAVING');
      const res = await fetch(`/api/patient-resources/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete patient resource failed');
      await fetchData();
      setSaveStatus('SAVED');
      setTimeout(() => setSaveStatus('READY'), 2000);
    } catch (err) {
      console.error(err);
      setSaveStatus('ERROR');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF6F0]" style={{ fontFamily: C.sans }}>
        <div className="bg-white rounded-[2rem] p-10 shadow-lg border border-black/[0.04] max-w-sm w-full mx-4 text-center space-y-6">
          <div className="w-14 h-14 rounded-2xl mx-auto flex items-center justify-center" style={{ backgroundColor: 'rgba(4,35,30,0.05)' }}>
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: C.gold }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-normal" style={{ fontFamily: C.serif, color: C.forestGreen }}>Dashboard Access</h2>
            <p className="text-gray-500 text-xs font-light mt-2">Enter the admin password to access the CMS panel.</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={loginPassword}
              onChange={e => { setLoginPassword(e.target.value); setLoginError(''); }}
              placeholder="Enter password"
              className="w-full px-4 py-3 rounded-xl border border-black/[0.08] focus:outline-none focus:border-[var(--color-gold-accent)] text-sm text-center"
              autoFocus
            />
            {loginError && <p className="text-rose-500 text-xs">{loginError}</p>}
            <button
              type="submit"
              disabled={loginLoading}
              className="w-full font-bold py-3.5 rounded-full text-[11px] tracking-widest uppercase text-white transition-all hover:opacity-90 disabled:opacity-50 cursor-pointer"
              style={{ backgroundColor: C.forestGreen }}
            >
              {loginLoading ? 'Verifying...' : 'Unlock Dashboard'}
            </button>
          </form>
          <Link to="/" className="inline-block text-xs font-semibold uppercase tracking-wider hover:underline" style={{ color: C.gold }}>
            Return to Site
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF6F0]" style={{ fontFamily: C.sans }}>
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-t-transparent rounded-full animate-spin mx-auto" style={{ borderColor: C.gold, borderTopColor: 'transparent' }} />
          <p className="text-gray-500 font-light text-sm uppercase tracking-widest">Loading CMS Command Center...</p>
        </div>
      </div>
    );
  }

  // Get featured case for rendering mock in card
  const featuredCase = cases.find(c => c.featured === 1) || cases[0] || {};

  return (
    <div className="bg-[#FAF6F0] min-h-screen flex flex-col justify-between" style={{ fontFamily: C.sans, color: C.forestGreen }}>
      
      {/* ── HEADER ── */}
      <header className="bg-white border-b border-black/[0.06] sticky top-0 z-40">
        <div className="max-w-8xl mx-auto px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-8">
            <Link to="/" className="text-xl font-normal tracking-wide transition-opacity hover:opacity-80" style={{ fontFamily: C.serif, color: C.forestGreen }}>
               <span style={{ color: C.gold, fontStyle: 'italic' }}>Dr.</span> Chandrika Lakshmi Popuri
            </Link>
            <nav className="hidden md:flex gap-6 text-xs font-semibold uppercase tracking-wider">
              {['Dashboard', 'Content Library', 'Site Settings', 'Analytics'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className="py-1 transition-all duration-300 relative"
                  style={{
                    color: activeTab === tab ? C.forestGreen : 'rgba(4,35,30,0.4)',
                    borderBottom: activeTab === tab ? `2px solid ${C.forestGreen}` : '2px solid transparent'
                  }}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>
          
          <div className="flex items-center gap-4 w-full sm:w-auto">
            {/* Search */}
            <div className="relative flex-1 sm:flex-initial">
              <input
                type="text"
                placeholder="Search portfolio..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full sm:w-60 pl-9 pr-4 py-2 text-xs rounded-full border border-black/[0.08] bg-black/[0.01] focus:bg-white focus:outline-none focus:border-gold-accent transition-all duration-300"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-black transition-colors"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              )}
              <svg className="w-3.5 h-3.5 absolute left-3.5 top-2.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            
            {/* Notification Bell */}
            <button
              onClick={() => {
                const pending = bookings.filter(b => b.status === 'pending').length;
                alert(pending > 0 ? `You have ${pending} pending consultation request(s).` : 'No new notifications.');
              }}
              className="p-2 text-gray-500 hover:text-black transition-colors rounded-full bg-black/[0.02] border border-black/[0.04] relative"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              {bookings.filter(b => b.status === 'pending').length > 0 && (
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-rose-500 rounded-full text-white text-[8px] font-bold flex items-center justify-center">
                  {bookings.filter(b => b.status === 'pending').length}
                </span>
              )}
            </button>
            
            {/* Help */}
            <a
              href="https://github.com/anomalyco/opencode/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-500 hover:text-black transition-colors rounded-full bg-black/[0.02] border border-black/[0.04] hidden sm:block"
              title="Get Help"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </a>
            
            {/* Logout */}
            <button
              onClick={handleLogout}
              className="p-2 text-gray-500 hover:text-rose-500 transition-colors rounded-full bg-black/[0.02] border border-black/[0.04]"
              title="Logout"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
            
            {/* Profile Avatar */}
            <div className="w-8 h-8 rounded-full overflow-hidden border border-black/[0.1] flex-shrink-0">
              <img src="/src/assets/profile.jpeg" alt="Admin Avatar" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </header>

      {/* ── MAIN CONTENT GRID ── */}
      <main className="max-w-8xl mx-auto w-full px-6 py-10 flex-1">
        {activeTab === 'Dashboard' && (
          <DashboardTab 
            C={C}
            content={content}
            activeSidebarTab={activeSidebarTab}
            setActiveSidebarTab={setActiveSidebarTab}
            setActiveModal={setActiveModal}
            setSelectedItem={setSelectedItem}
            saveStatus={saveStatus}
            setHeroForm={setHeroForm}
            cases={cases}
            timeline={timeline}
            patientResources={patientResources}
            setPatientResourceForm={setPatientResourceForm}
            setAboutForm={setAboutForm}
            setCaseForm={setCaseForm}
            setSpecialtyForm={setSpecialtyForm}
            featuredCase={featuredCase}
            searchQuery={searchQuery}
            specialties={specialties}
          />
        )}
        {activeTab === 'Content Library' && (
          <ContentLibraryTab C={C} cases={cases} content={content} handleImageUpload={handleImageUpload} />
        )}
        {activeTab === 'Site Settings' && (
          <SiteSettingsTab 
            C={C}
            content={content}
            setContent={setContent}
            saveSettings={saveSettings}
            setSaveStatus={setSaveStatus}
          />
        )}
        {activeTab === 'Analytics' && (
          <AnalyticsTab C={C} stats={stats} bookings={bookings} />
        )}
      </main>

      {/* ── FOOTER ── */}
      <footer className="py-8 text-center text-xs font-light text-white" style={{ backgroundColor: C.forestGreen }}>
        <div className="max-w-8xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <span className="font-bold text-sm tracking-wide text-white uppercase" style={{ fontFamily: C.serif }}>Elite Clinic CMS</span>
          <div className="flex gap-4">
            {['Privacy Policy', 'Terms of Service', 'API Documentation'].map(link => (
              <a key={link} href={`#${link.toLowerCase().replace(/\s/g, '-')}`} className="hover:text-gray-300 transition-colors uppercase tracking-wider text-[10px] font-semibold">{link}</a>
            ))}
          </div>
          <span className="text-[10px] text-gray-400">© 2026 Clinical Prestige CMS. All Rights Reserved.</span>
        </div>
      </footer>

      {/* ── MODAL (Sidebar-Tabbed Editor) ── */}
      <AnimatePresence>
      {activeModal && (
        <motion.div 
          className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4"
          initial={{ backgroundColor: 'rgba(0,0,0,0)' }}
          animate={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
          exit={{ backgroundColor: 'rgba(0,0,0,0)' }}
          transition={{ duration: 0.25 }}
          style={{ backdropFilter: 'blur(4px)' }}
        >
          <motion.div 
            className="bg-white rounded-[2rem] shadow-2xl max-w-5xl w-full max-h-[85vh] overflow-hidden border border-black/[0.04] flex flex-col"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          >
            
            {/* Modal Header */}
            <div className="px-8 py-6 border-b border-black/[0.06] flex justify-between items-center bg-[#FAF6F0] rounded-t-[2rem] flex-shrink-0">
              <h3 className="text-2xl font-normal" style={{ fontFamily: C.serif, color: C.forestGreen }}>
                {SECTION_TITLES[modalSection] || 'Edit Content'}
              </h3>
              <button
                onClick={() => { setActiveModal(null); setSelectedItem(null); }}
                className="text-gray-400 hover:text-black transition-colors p-1 bg-black/[0.02] border border-black/[0.04] rounded-full"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            {/* Modal Body: Sidebar + Content */}
            <div className="flex flex-1 min-h-0">
              
              {/* Sidebar Navigation */}
              <div className="w-[220px] flex-shrink-0 border-r border-black/[0.06] bg-[#FAF6F0]/60 overflow-y-auto py-4">
                <div className="space-y-1 px-3">
                  {MODAL_SECTIONS.map(section => (
                    <button
                      key={section.key}
                      onClick={() => setModalSection(section.key)}
                      className="w-full text-left px-4 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 flex items-center gap-3"
                      style={{
                        backgroundColor: modalSection === section.key ? C.forestGreen : 'transparent',
                        color: modalSection === section.key ? 'white' : 'rgba(4,35,30,0.5)',
                      }}
                    >
                      <span className="text-sm">{section.icon}</span>
                      <span className="tracking-wide">{section.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Content Area */}
              <div className="flex-1 overflow-y-auto p-8 text-left">
                
                {/* HERO FORM */}
                {modalSection === 'hero' && (
                  <form onSubmit={(e) => { e.preventDefault(); saveSettings(heroForm); }} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="sm:col-span-2">
                        <label className="block text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-2">Hero Certification Badge</label>
                        <input
                          type="text"
                          value={heroForm.hero_badge}
                          onChange={e => setHeroForm({ ...heroForm, hero_badge: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-black/[0.08] focus:outline-none focus:border-gold-accent text-sm"
                        />
                      </div>
                      
                      <div className="sm:col-span-2">
                        <label className="block text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-2">Hero Main Heading (split into three segments)</label>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-[9px] font-bold text-gray-400 mb-1">Prefix Text</label>
                            <input
                              type="text"
                              value={heroForm.hero_title_left}
                              onChange={e => setHeroForm({ ...heroForm, hero_title_left: e.target.value })}
                              className="w-full px-3 py-2.5 rounded-lg border border-black/[0.08] focus:outline-none text-xs"
                            />
                          </div>
                          <div>
                            <label className="block text-[9px] font-bold text-gray-400 mb-1">Gold Highlight (Italic)</label>
                            <input
                              type="text"
                              value={heroForm.hero_title_gold}
                              onChange={e => setHeroForm({ ...heroForm, hero_title_gold: e.target.value })}
                              className="w-full px-3 py-2.5 rounded-lg border border-black/[0.08] focus:outline-none text-xs"
                            />
                          </div>
                          <div>
                            <label className="block text-[9px] font-bold text-gray-400 mb-1">Suffix Text</label>
                            <input
                              type="text"
                              value={heroForm.hero_title_right}
                              onChange={e => setHeroForm({ ...heroForm, hero_title_right: e.target.value })}
                              className="w-full px-3 py-2.5 rounded-lg border border-black/[0.08] focus:outline-none text-xs"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-2">Hero Description Paragraph</label>
                        <textarea
                          rows="3"
                          value={heroForm.hero_desc}
                          onChange={e => setHeroForm({ ...heroForm, hero_desc: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-black/[0.08] focus:outline-none focus:border-gold-accent text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-2">Hero Profile Picture (Upload)</label>
                        <div className="flex items-center gap-3">
                          {heroForm.hero_profile_img && (
                            <img src={heroForm.hero_profile_img} className="w-10 h-10 object-cover rounded-lg border border-black/[0.08]" alt="Profile thumbnail" />
                          )}
                          <input
                            type="file"
                            onChange={e => handleImageUpload(e, (path) => setHeroForm({ ...heroForm, hero_profile_img: path }))}
                            className="text-xs text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-[10px] file:font-bold file:uppercase file:bg-gray-100 file:text-[#04231E] hover:file:bg-gray-200 cursor-pointer"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-2">Or Direct Image URL Path</label>
                        <input
                          type="text"
                          value={heroForm.hero_profile_img}
                          onChange={e => setHeroForm({ ...heroForm, hero_profile_img: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-black/[0.08] focus:outline-none text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-2">Floating Badge Specialty</label>
                        <input
                          type="text"
                          value={heroForm.hero_badge_title}
                          onChange={e => setHeroForm({ ...heroForm, hero_badge_title: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-black/[0.08] focus:outline-none text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-2">Floating Badge Subtitle</label>
                        <input
                          type="text"
                          value={heroForm.hero_badge_desc}
                          onChange={e => setHeroForm({ ...heroForm, hero_badge_desc: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-black/[0.08] focus:outline-none text-sm"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-black/[0.06]">
                      <button type="button" onClick={() => setActiveModal(null)} className="px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider border border-black/[0.08] hover:bg-black/[0.01]">Cancel</button>
                      <button type="submit" className="px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider text-white" style={{ backgroundColor: C.forestGreen }}>Save Homepage Settings</button>
                    </div>
                  </form>
                )}

                {/* STATS FORM */}
                {modalSection === 'stats' && (
                  <form onSubmit={saveStats} className="space-y-6">
                    <div className="space-y-4">
                      {statsForm.map((stat, i) => (
                        <div key={stat.id || i} className="grid grid-cols-2 gap-4 items-center p-4 border border-black/[0.04] bg-[#FAF6F0] rounded-2xl">
                          <div>
                            <label className="block text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-1">Stat Value</label>
                            <input
                              type="text"
                              value={stat.value}
                              onChange={(e) => {
                                const newStats = [...statsForm];
                                newStats[i].value = e.target.value;
                                setStatsForm(newStats);
                              }}
                              className="w-full px-3 py-2.5 rounded-lg border border-black/[0.08] focus:outline-none bg-white text-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-1">Stat Label</label>
                            <input
                              type="text"
                              value={stat.label}
                              onChange={(e) => {
                                const newStats = [...statsForm];
                                newStats[i].label = e.target.value;
                                setStatsForm(newStats);
                              }}
                              className="w-full px-3 py-2.5 rounded-lg border border-black/[0.08] focus:outline-none bg-white text-sm"
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-black/[0.06]">
                      <button type="button" onClick={() => setActiveModal(null)} className="px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider border border-black/[0.08]">Cancel</button>
                      <button type="submit" className="px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider text-white" style={{ backgroundColor: C.forestGreen }}>Update Statistics</button>
                    </div>
                  </form>
                )}

                {/* SPECIALTIES FORM */}
                {modalSection === 'specialties' && (
                  <div className="space-y-8">
                    {/* Current Specialties List */}
                    <div className="space-y-3">
                      <span className="block text-[10px] font-bold tracking-widest uppercase text-gray-400">Current Specialized Services</span>
                      <div className="grid grid-cols-1 gap-3">
                        {specialties.map(s => (
                          <div key={s.id} className="p-4 border border-black/[0.04] bg-[#FAF6F0] rounded-2xl flex justify-between items-center gap-4">
                            <div className="flex items-center gap-4">
                              <span className="text-3xl">{s.icon}</span>
                              <div>
                                <h4 className="text-xs font-bold text-[#04231E]">{s.title}</h4>
                                <p className="text-[10px] text-gray-400 mt-0.5 line-clamp-1">{s.desc}</p>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <button
                                onClick={() => { setSelectedItem(s.id); setSpecialtyForm(s); }}
                                className="px-3.5 py-1.5 rounded-full border border-black/[0.08] hover:bg-white text-[9px] font-bold tracking-wider uppercase transition-colors"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => deleteSpecialty(s.id)}
                                className="px-3.5 py-1.5 rounded-full border border-rose-200 text-rose-600 hover:bg-rose-50 text-[9px] font-bold tracking-wider uppercase transition-colors"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Add / Edit Form */}
                    <form onSubmit={saveSpecialty} className="p-6 border border-black/[0.06] rounded-3xl space-y-4">
                      <h4 className="text-sm font-bold uppercase tracking-widest text-gray-500">
                        {selectedItem ? 'Edit Specialty Details' : 'Add New Service Specialty'}
                      </h4>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="sm:col-span-2">
                          <label className="block text-[10px] font-bold text-gray-400 mb-1">Service Title</label>
                          <input
                            type="text"
                            required
                            value={specialtyForm.title}
                            onChange={e => setSpecialtyForm({ ...specialtyForm, title: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg border border-black/[0.08] focus:outline-none text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-gray-400 mb-1">Icon Emoji (e.g. 🦷)</label>
                          <input
                            type="text"
                            required
                            value={specialtyForm.icon}
                            onChange={e => setSpecialtyForm({ ...specialtyForm, icon: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg border border-black/[0.08] focus:outline-none text-center text-xs"
                          />
                        </div>
                        <div className="sm:col-span-3">
                          <label className="block text-[10px] font-bold text-gray-400 mb-1">Service Description</label>
                          <input
                            type="text"
                            required
                            value={specialtyForm.desc}
                            onChange={e => setSpecialtyForm({ ...specialtyForm, desc: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg border border-black/[0.08] focus:outline-none text-xs"
                          />
                        </div>
                        <div className="sm:col-span-3">
                          <label className="block text-[10px] font-bold text-gray-400 mb-1">Internal Target Link (optional, e.g. #implantology)</label>
                          <input
                            type="text"
                            value={specialtyForm.link}
                            onChange={e => setSpecialtyForm({ ...specialtyForm, link: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg border border-black/[0.08] focus:outline-none text-xs"
                          />
                        </div>
                      </div>

                      <div className="flex gap-2 justify-end pt-2">
                        {selectedItem && (
                          <button type="button" onClick={() => { setSelectedItem(null); setSpecialtyForm({ id: null, title: '', desc: '', icon: '🦷', link: '' }); }} className="px-4 py-2 border rounded-full text-[10px] uppercase font-bold tracking-wider">Cancel Edit</button>
                        )}
                        <button type="submit" className="px-5 py-2 text-white rounded-full text-[10px] uppercase font-bold tracking-wider" style={{ backgroundColor: C.forestGreen }}>
                          {selectedItem ? 'Update Specialty' : 'Add Specialty'}
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {/* GALLERY FORM */}
                {modalSection === 'gallery' && (
                  <div className="space-y-8">
                    {/* Current Cases Grid */}
                    <div className="space-y-3">
                      <span className="block text-[10px] font-bold tracking-widest uppercase text-gray-400">Current Clinical Cases</span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {cases.map(c => (
                          <div key={c.id} className="p-4 border border-black/[0.04] bg-[#FAF6F0] rounded-2xl flex flex-col justify-between space-y-4">
                            <div>
                              <div className="flex justify-between items-center">
                                <span className="text-[10px] font-bold text-gray-400">{c.case_id}</span>
                                <span className="text-[9px] font-bold px-2 py-0.5 rounded-full uppercase border border-[#04231E]/10" style={{ color: C.gold, borderColor: C.gold }}>{c.category}</span>
                              </div>
                              <h4 className="text-xs font-bold text-[#04231E] mt-2">{c.title}</h4>
                              <p className="text-[10px] text-gray-500 mt-1 line-clamp-2">{c.desc}</p>
                              {c.featured === 1 && (
                                <span className="inline-block mt-2 text-[8px] font-bold tracking-widest uppercase text-amber-600 bg-amber-50 px-2 py-0.5 rounded">Featured Case study</span>
                              )}
                            </div>
                            
                            <div className="flex gap-2 border-t border-black/[0.04] pt-2">
                              <button
                                onClick={() => { setSelectedItem(c.id); setCaseForm(c); }}
                                className="flex-1 text-center py-2 rounded-full border border-black/[0.08] hover:bg-white text-[9px] font-bold tracking-wider uppercase transition-colors"
                              >
                                Edit details
                              </button>
                              <button
                                onClick={() => deleteCase(c.id)}
                                className="px-4 py-2 rounded-full border border-rose-200 text-rose-600 hover:bg-rose-50 text-[9px] font-bold tracking-wider uppercase transition-colors"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Add / Edit Case Form */}
                    <form onSubmit={saveCase} className="p-6 border border-black/[0.06] rounded-3xl space-y-4">
                      <h4 className="text-sm font-bold uppercase tracking-widest text-gray-500">
                        {selectedItem ? 'Edit Clinical Case Details' : 'Add New Clinical Success Case'}
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-bold text-gray-400 mb-1">Case Number (e.g. Case #01)</label>
                          <input
                            type="text"
                            required
                            value={caseForm.case_id}
                            onChange={e => setCaseForm({ ...caseForm, case_id: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg border border-black/[0.08] focus:outline-none text-xs"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-[10px] font-bold text-gray-400 mb-1">Category</label>
                          <select
                            value={caseForm.category}
                            onChange={e => setCaseForm({ ...caseForm, category: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg border border-black/[0.08] focus:outline-none text-xs"
                          >
                            <option value="Dental Implants">Dental Implants</option>
                            <option value="Full-Mouth">Full-Mouth</option>
                            <option value="Cosmetic Dentistry">Cosmetic Dentistry</option>
                          </select>
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-[10px] font-bold text-gray-400 mb-1">Case Title / Diagnosis</label>
                          <input
                            type="text"
                            required
                            value={caseForm.title}
                            onChange={e => setCaseForm({ ...caseForm, title: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg border border-black/[0.08] focus:outline-none text-xs"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-[10px] font-bold text-gray-400 mb-1">Case Treatment Description</label>
                          <textarea
                            rows="2"
                            required
                            value={caseForm.desc}
                            onChange={e => setCaseForm({ ...caseForm, desc: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg border border-black/[0.08] focus:outline-none text-xs"
                          />
                        </div>

                        {/* Before and After Image Uploads */}
                        <div className="p-3 border border-black/[0.04] bg-[#FAF6F0] rounded-xl">
                          <label className="block text-[9px] font-bold uppercase text-gray-400 mb-1">Before Restoration Image</label>
                          <div className="flex items-center gap-2">
                            <input
                              type="file"
                              onChange={e => handleImageUpload(e, (path) => setCaseForm({ ...caseForm, beforeImage: path }))}
                              className="text-[10px] file:py-1 file:px-2 file:rounded-md file:border-0 file:bg-gray-100"
                            />
                          </div>
                          <input
                            type="text"
                            placeholder="Before path"
                            value={caseForm.beforeImage}
                            onChange={e => setCaseForm({ ...caseForm, beforeImage: e.target.value })}
                            className="w-full mt-2 px-2 py-1 border rounded text-[10px]"
                          />
                        </div>

                        <div className="p-3 border border-black/[0.04] bg-[#FAF6F0] rounded-xl">
                          <label className="block text-[9px] font-bold uppercase text-gray-400 mb-1">After Restoration Image</label>
                          <div className="flex items-center gap-2">
                            <input
                              type="file"
                              onChange={e => handleImageUpload(e, (path) => setCaseForm({ ...caseForm, afterImage: path }))}
                              className="text-[10px] file:py-1 file:px-2 file:rounded-md file:border-0 file:bg-gray-100"
                            />
                          </div>
                          <input
                            type="text"
                            placeholder="After path"
                            value={caseForm.afterImage}
                            onChange={e => setCaseForm({ ...caseForm, afterImage: e.target.value })}
                            className="w-full mt-2 px-2 py-1 border rounded text-[10px]"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-gray-400 mb-1">Prosthetics Fitted</label>
                          <input
                            type="text"
                            value={caseForm.prosthetics}
                            onChange={e => setCaseForm({ ...caseForm, prosthetics: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg border border-black/[0.08] focus:outline-none text-xs"
                            placeholder="e.g. Screw-retained Crown"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-gray-400 mb-1">Treatment Duration</label>
                          <input
                            type="text"
                            value={caseForm.duration}
                            onChange={e => setCaseForm({ ...caseForm, duration: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg border border-black/[0.08] focus:outline-none text-xs"
                            placeholder="e.g. 3 Months"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-[10px] font-bold text-gray-400 mb-1">Material Used</label>
                          <input
                            type="text"
                            value={caseForm.material}
                            onChange={e => setCaseForm({ ...caseForm, material: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg border border-black/[0.08] focus:outline-none text-xs"
                            placeholder="e.g. Monolithic Zirconia"
                          />
                        </div>

                        <div className="flex items-center gap-2 pt-2 sm:col-span-2">
                          <input
                            type="checkbox"
                            id="featuredToggle"
                            checked={caseForm.featured === 1}
                            onChange={e => setCaseForm({ ...caseForm, featured: e.target.checked ? 1 : 0 })}
                            className="w-4 h-4 rounded text-gold-accent border-gray-300 focus:ring-gold-accent"
                          />
                          <label htmlFor="featuredToggle" className="text-xs font-bold text-gray-700">Set as Featured Case Study on website gallery hero banner</label>
                        </div>
                      </div>

                      <div className="flex gap-2 justify-end pt-2">
                        {selectedItem && (
                          <button type="button" onClick={() => { setSelectedItem(null); setCaseForm({ id: null, case_id: '', category: 'Dental Implants', title: '', desc: '', beforeImage: '', afterImage: '', prosthetics: '', duration: '', material: '', featured: 0 }); }} className="px-4 py-2 border rounded-full text-[10px] uppercase font-bold tracking-wider">Cancel Edit</button>
                        )}
                        <button type="submit" className="px-5 py-2 text-white rounded-full text-[10px] uppercase font-bold tracking-wider" style={{ backgroundColor: C.forestGreen }}>
                          {selectedItem ? 'Update Case' : 'Add Case'}
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {/* ABOUT FORM (Commitment Section Only) */}
                {modalSection === 'about' && (
                  <div className="space-y-8">
                    <form onSubmit={(e) => { e.preventDefault(); saveSettings(aboutForm); }} className="space-y-4 p-6 border border-black/[0.06] bg-[#FAF6F0] rounded-3xl">
                      <h4 className="text-sm font-bold uppercase tracking-widest text-gray-500">Bio Commitment Section Settings</h4>
                      
                      <div className="grid grid-cols-1 gap-4">
                        <div>
                          <label className="block text-[10px] font-bold text-gray-400 mb-1">Commitment Title Banner</label>
                          <input
                            type="text"
                            required
                            value={aboutForm.commit_title}
                            onChange={e => setAboutForm({ ...aboutForm, commit_title: e.target.value })}
                            className="w-full px-3 py-2.5 rounded-lg border border-black/[0.08] focus:outline-none bg-white text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-gray-400 mb-1">Commitment Text Description</label>
                          <textarea
                            rows="3"
                            required
                            value={aboutForm.commit_desc}
                            onChange={e => setAboutForm({ ...aboutForm, commit_desc: e.target.value })}
                            className="w-full px-3 py-2.5 rounded-lg border border-black/[0.08] focus:outline-none bg-white text-xs"
                          />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="p-3 border border-black/[0.04] bg-white rounded-xl">
                            <label className="block text-[9px] font-bold uppercase text-gray-400 mb-1">Performance Badge 1</label>
                            <input type="text" value={aboutForm.commit_badge1_val} onChange={e => setAboutForm({ ...aboutForm, commit_badge1_val: e.target.value })} placeholder="Value (e.g. Top 1%)" className="w-full px-2 py-1 border rounded text-xs mb-1" />
                            <input type="text" value={aboutForm.commit_badge1_lbl} onChange={e => setAboutForm({ ...aboutForm, commit_badge1_lbl: e.target.value })} placeholder="Label (e.g. Graduates)" className="w-full px-2 py-1 border rounded text-xs" />
                          </div>
                          <div className="p-3 border border-black/[0.04] bg-white rounded-xl">
                            <label className="block text-[9px] font-bold uppercase text-gray-400 mb-1">Performance Badge 2</label>
                            <input type="text" value={aboutForm.commit_badge2_val} onChange={e => setAboutForm({ ...aboutForm, commit_badge2_val: e.target.value })} placeholder="Value (e.g. Global)" className="w-full px-2 py-1 border rounded text-xs mb-1" />
                            <input type="text" value={aboutForm.commit_badge2_lbl} onChange={e => setAboutForm({ ...aboutForm, commit_badge2_lbl: e.target.value })} placeholder="Label (e.g. Fellowship)" className="w-full px-2 py-1 border rounded text-xs" />
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end pt-2">
                        <button type="submit" className="px-5 py-2.5 text-white rounded-full text-[10px] uppercase font-bold tracking-wider" style={{ backgroundColor: C.forestGreen }}>Update Bio Section</button>
                      </div>
                    </form>
                  </div>
                )}

                {/* CREDENTIALS FORM (Timeline) */}
                {modalSection === 'credentials' && (
                  <div className="space-y-4">
                    <span className="block text-[10px] font-bold tracking-widest uppercase text-gray-400">Manage Timeline Credentials</span>
                    <div className="space-y-3">
                      {timeline.map(t => (
                        <div key={t.id} className="p-4 border border-black/[0.04] bg-[#FAF6F0] rounded-2xl flex justify-between items-center gap-4">
                          <div>
                            <span className="text-[8px] font-bold tracking-widest uppercase text-[#B8966C]">{t.tag}</span>
                            <h4 className="text-xs font-bold text-[#04231E] mt-0.5">{t.title}</h4>
                            <p className="text-[10px] text-gray-400 font-semibold">{t.institution}</p>
                            <p className="text-[10px] text-gray-500 font-light mt-1 max-w-md line-clamp-1">{t.details}</p>
                          </div>
                          <div className="flex gap-2 flex-shrink-0">
                            <button onClick={() => { setSelectedItem(t.id); setTimelineForm(t); }} className="px-3.5 py-1.5 rounded-full border border-black/[0.08] hover:bg-white text-[9px] font-bold uppercase transition-colors">Edit</button>
                            <button onClick={() => deleteTimelineItem(t.id)} className="px-3.5 py-1.5 rounded-full border border-rose-200 text-rose-600 hover:bg-rose-50 text-[9px] font-bold uppercase transition-colors">Delete</button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Timeline form */}
                    <form onSubmit={saveTimelineItem} className="p-6 border border-black/[0.06] rounded-3xl space-y-4">
                      <h4 className="text-sm font-bold uppercase tracking-widest text-gray-500">
                        {selectedItem ? 'Edit Credential Degree' : 'Add New Timeline Credential'}
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="sm:col-span-2">
                          <label className="block text-[10px] font-bold text-gray-400 mb-1">Timeframe Tag (e.g. MDS - DENTAL SURGERY (2016))</label>
                          <input type="text" required value={timelineForm.tag} onChange={e => setTimelineForm({ ...timelineForm, tag: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-black/[0.08] focus:outline-none text-xs" />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-gray-400 mb-1">Degree Title</label>
                          <input type="text" required value={timelineForm.title} onChange={e => setTimelineForm({ ...timelineForm, title: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-black/[0.08] focus:outline-none text-xs" />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-gray-400 mb-1">Institution</label>
                          <input type="text" required value={timelineForm.institution} onChange={e => setTimelineForm({ ...timelineForm, institution: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-black/[0.08] focus:outline-none text-xs" />
                        </div>
                        <div className="sm:col-span-2">
                          <label className="block text-[10px] font-bold text-gray-400 mb-1">Academic / Research Details</label>
                          <textarea rows="2" required value={timelineForm.details} onChange={e => setTimelineForm({ ...timelineForm, details: e.target.value })} className="w-full px-3 py-2 rounded-lg border border-black/[0.08] focus:outline-none text-xs" />
                        </div>
                      </div>

                      <div className="flex gap-2 justify-end pt-2">
                        {selectedItem && (
                          <button type="button" onClick={() => { setSelectedItem(null); setTimelineForm({ id: null, tag: '', title: '', institution: '', details: '' }); }} className="px-4 py-2 border rounded-full text-[10px] uppercase font-bold tracking-wider">Cancel Edit</button>
                        )}
                        <button type="submit" className="px-5 py-2 text-white rounded-full text-[10px] uppercase font-bold tracking-wider" style={{ backgroundColor: C.forestGreen }}>
                          {selectedItem ? 'Update Degree' : 'Add Degree'}
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {/* PATIENT RESOURCES FORM */}
                {modalSection === 'patient-resources' && (
                  <div className="space-y-8">
                    {/* Current Patient Resources List */}
                    <div className="space-y-3">
                      <span className="block text-[10px] font-bold tracking-widest uppercase text-gray-400">Current Patient Resources</span>
                      <div className="grid grid-cols-1 gap-3">
                        {patientResources.length === 0 && (
                          <p className="text-xs text-gray-400 text-center py-4">No patient resources yet. Add one below.</p>
                        )}
                        {patientResources.map(r => (
                          <div key={r.id} className="p-4 border border-black/[0.04] bg-[#FAF6F0] rounded-2xl flex justify-between items-start gap-4">
                            <div className="flex items-start gap-4 flex-1 min-w-0">
                              <span className="text-2xl flex-shrink-0 mt-0.5">{r.icon}</span>
                              <div className="min-w-0">
                                <div className="flex items-center gap-2">
                                  <h4 className="text-xs font-bold text-[#04231E] truncate">{r.title}</h4>
                                  <span className="text-[8px] font-bold px-2 py-0.5 rounded-full uppercase bg-[#04231E]/5 text-[#04231E]/60 flex-shrink-0">{r.category}</span>
                                </div>
                                <p className="text-[10px] text-gray-400 mt-0.5 line-clamp-2">{r.description}</p>
                              </div>
                            </div>
                            <div className="flex gap-2 flex-shrink-0">
                              <button
                                onClick={() => { setSelectedItem(r.id); setPatientResourceForm(r); }}
                                className="px-3.5 py-1.5 rounded-full border border-black/[0.08] hover:bg-white text-[9px] font-bold tracking-wider uppercase transition-colors"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => deletePatientResource(r.id)}
                                className="px-3.5 py-1.5 rounded-full border border-rose-200 text-rose-600 hover:bg-rose-50 text-[9px] font-bold tracking-wider uppercase transition-colors"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Add / Edit Form */}
                    <form onSubmit={savePatientResource} className="p-6 border border-black/[0.06] rounded-3xl space-y-4">
                      <h4 className="text-sm font-bold uppercase tracking-widest text-gray-500">
                        {selectedItem ? 'Edit Patient Resource' : 'Add New Patient Resource'}
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="sm:col-span-2">
                          <label className="block text-[10px] font-bold text-gray-400 mb-1">Resource Title</label>
                          <input
                            type="text"
                            required
                            value={patientResourceForm.title}
                            onChange={e => setPatientResourceForm({ ...patientResourceForm, title: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg border border-black/[0.08] focus:outline-none text-xs"
                            placeholder="e.g. Pre-Operative Instructions"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-gray-400 mb-1">Category</label>
                          <select
                            value={patientResourceForm.category}
                            onChange={e => setPatientResourceForm({ ...patientResourceForm, category: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg border border-black/[0.08] focus:outline-none text-xs"
                          >
                            <option value="Pre-Op Instructions">Pre-Op Instructions</option>
                            <option value="Post-Op Care">Post-Op Care</option>
                            <option value="General Info">General Info</option>
                            <option value="FAQ">FAQ</option>
                            <option value="Payment & Insurance">Payment & Insurance</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-gray-400 mb-1">Icon Emoji</label>
                          <input
                            type="text"
                            required
                            value={patientResourceForm.icon}
                            onChange={e => setPatientResourceForm({ ...patientResourceForm, icon: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg border border-black/[0.08] focus:outline-none text-center text-xs"
                          />
                        </div>

                        <div className="sm:col-span-2">
                          <label className="block text-[10px] font-bold text-gray-400 mb-1">Description</label>
                          <textarea
                            rows="3"
                            required
                            value={patientResourceForm.description}
                            onChange={e => setPatientResourceForm({ ...patientResourceForm, description: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg border border-black/[0.08] focus:outline-none text-xs"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-gray-400 mb-1">External Link (optional)</label>
                          <input
                            type="text"
                            value={patientResourceForm.link}
                            onChange={e => setPatientResourceForm({ ...patientResourceForm, link: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg border border-black/[0.08] focus:outline-none text-xs"
                            placeholder="https://..."
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold text-gray-400 mb-1">Sort Order</label>
                          <input
                            type="number"
                            value={patientResourceForm.sort_order}
                            onChange={e => setPatientResourceForm({ ...patientResourceForm, sort_order: parseInt(e.target.value) || 0 })}
                            className="w-full px-3 py-2 rounded-lg border border-black/[0.08] focus:outline-none text-xs"
                          />
                        </div>
                      </div>

                      <div className="flex gap-2 justify-end pt-2">
                        {selectedItem && (
                          <button
                            type="button"
                            onClick={() => { setSelectedItem(null); setPatientResourceForm({ id: null, title: '', category: 'General Info', description: '', icon: '📄', link: '', sort_order: 0 }); }}
                            className="px-4 py-2 border rounded-full text-[10px] uppercase font-bold tracking-wider"
                          >
                            Cancel Edit
                          </button>
                        )}
                        <button type="submit" className="px-5 py-2 text-white rounded-full text-[10px] uppercase font-bold tracking-wider" style={{ backgroundColor: C.forestGreen }}>
                          {selectedItem ? 'Update Resource' : 'Add Resource'}
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {/* AWARD FORM */}
                {modalSection === 'award' && (
                  <form onSubmit={(e) => { e.preventDefault(); saveSettings(awardForm); }} className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-2">Award Title</label>
                        <input
                          type="text"
                          required
                          value={awardForm.primary_award_title}
                          onChange={e => setAwardForm({ ...awardForm, primary_award_title: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-black/[0.08] focus:outline-none focus:border-gold-accent text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-2">Award Institution / Description</label>
                        <input
                          type="text"
                          required
                          value={awardForm.primary_award_desc}
                          onChange={e => setAwardForm({ ...awardForm, primary_award_desc: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-black/[0.08] focus:outline-none focus:border-gold-accent text-sm"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-black/[0.06]">
                      <button type="button" onClick={() => setActiveModal(null)} className="px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider border border-black/[0.08]">Cancel</button>
                      <button type="submit" className="px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider text-white" style={{ backgroundColor: C.forestGreen }}>Save Reward Details</button>
                    </div>
                  </form>
                )}

                {/* CLINIC INFO FORM */}
                {modalSection === 'clinic' && (
                  <form onSubmit={(e) => { e.preventDefault(); saveSettings(clinicForm); }} className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-2">Clinic Telephone Contact</label>
                        <input
                          type="text"
                          required
                          value={clinicForm.clinic_phone}
                          onChange={e => setClinicForm({ ...clinicForm, clinic_phone: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-black/[0.08] focus:outline-none focus:border-gold-accent text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-2">Clinic Location Address</label>
                        <textarea
                          rows="2"
                          required
                          value={clinicForm.clinic_location}
                          onChange={e => setClinicForm({ ...clinicForm, clinic_location: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-black/[0.08] focus:outline-none focus:border-gold-accent text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-2">Clinic Email Address</label>
                        <input
                          type="email"
                          required
                          value={clinicForm.clinic_email}
                          onChange={e => setClinicForm({ ...clinicForm, clinic_email: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-black/[0.08] focus:outline-none focus:border-gold-accent text-sm"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-black/[0.06]">
                      <button type="button" onClick={() => setActiveModal(null)} className="px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider border border-black/[0.08]">Cancel</button>
                      <button type="submit" className="px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider text-white" style={{ backgroundColor: C.forestGreen }}>Save Clinic Settings</button>
                    </div>
                  </form>
                )}

                {/* FOOTER BIO FORM */}
                {modalSection === 'footer-bio' && (
                  <form onSubmit={(e) => { e.preventDefault(); saveSettings(footerBioForm); }} className="space-y-6">
                    <div>
                      <label className="block text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-2">Footer Short Bio Summary</label>
                      <textarea
                        rows="4"
                        required
                        value={footerBioForm.footer_bio_summary}
                        onChange={e => setFooterBioForm({ ...footerBioForm, footer_bio_summary: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-black/[0.08] focus:outline-none focus:border-gold-accent text-sm"
                      />
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-black/[0.06]">
                      <button type="button" onClick={() => setActiveModal(null)} className="px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider border border-black/[0.08]">Cancel</button>
                      <button type="submit" className="px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider text-white" style={{ backgroundColor: C.forestGreen }}>Save Bio Text</button>
                    </div>
                  </form>
                )}

                {/* SUCCESS STORIES FORM */}
                {modalSection === 'success-stories' && (
                  <form onSubmit={(e) => { e.preventDefault(); saveSettings(storyForm); }} className="space-y-6">
                    <div className="p-6 border border-black/[0.06] bg-[#FAF6F0] rounded-3xl space-y-4">
                      <h4 className="text-sm font-bold uppercase tracking-widest text-gray-500">Patient Success Story</h4>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-2">Patient Testimonial Quote</label>
                          <textarea
                            rows="4"
                            required
                            value={storyForm.story_quote}
                            onChange={e => setStoryForm({ ...storyForm, story_quote: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-black/[0.08] focus:outline-none focus:border-gold-accent text-sm"
                            placeholder="e.g. Dr. Popuri changed my life. I can smile confidently again..."
                          />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-2">Patient Name</label>
                            <input
                              type="text"
                              required
                              value={storyForm.story_patient_name}
                              onChange={e => setStoryForm({ ...storyForm, story_patient_name: e.target.value })}
                              className="w-full px-4 py-3 rounded-xl border border-black/[0.08] focus:outline-none text-sm"
                              placeholder="e.g. Sarah Mitchell"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-2">Patient Role / Description</label>
                            <input
                              type="text"
                              required
                              value={storyForm.story_patient_role}
                              onChange={e => setStoryForm({ ...storyForm, story_patient_role: e.target.value })}
                              className="w-full px-4 py-3 rounded-xl border border-black/[0.08] focus:outline-none text-sm"
                              placeholder="e.g. Full-Mouth Reconstruction Patient"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-black/[0.06]">
                      <button type="button" onClick={() => setActiveModal(null)} className="px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider border border-black/[0.08]">Cancel</button>
                      <button type="submit" className="px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider text-white" style={{ backgroundColor: C.forestGreen }}>Save Success Story</button>
                    </div>
                  </form>
                )}

              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
      </AnimatePresence>
    </div>
  );
}
