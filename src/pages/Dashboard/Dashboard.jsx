import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const C = {
  creamBg:     'var(--color-cream-bg)',
  creamCard:   'var(--color-cream-card)',
  forestGreen: 'var(--color-forest-green)',
  gold:        'var(--color-gold-accent)',
  serif:       'var(--font-serif-elegant)',
  sans:        'var(--font-sans-premium)',
};

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [activeSidebarTab, setActiveSidebarTab] = useState('Home Page');
  
  // Data states
  const [content, setContent] = useState({});
  const [specialties, setSpecialties] = useState([]);
  const [cases, setCases] = useState([]);
  const [timeline, setTimeline] = useState([]);
  const [stats, setStats] = useState([]);
  
  // Loading & status states
  const [loading, setLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState('READY'); // READY, SAVING, SAVED, ERROR
  
  // Modal states
  const [activeModal, setActiveModal] = useState(null); // 'hero', 'specialties', 'gallery', 'about', 'award', 'clinic', 'footer-bio'
  const [selectedItem, setSelectedItem] = useState(null); // for specialties/gallery/timeline item editing
  
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

  // Fetch all database content
  const fetchData = async () => {
    try {
      setLoading(true);
      const [resContent, resSpecialties, resCases, resTimeline, resStats] = await Promise.all([
        fetch('/api/content').then(res => res.json()),
        fetch('/api/specialties').then(res => res.json()),
        fetch('/api/cases').then(res => res.json()),
        fetch('/api/timeline').then(res => res.json()),
        fetch('/api/stats').then(res => res.json()),
      ]);

      setContent(resContent);
      setSpecialties(resSpecialties);
      setCases(resCases);
      setTimeline(resTimeline);
      setStats(resStats);
      
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
              Prosthodontic <span style={{ color: C.gold, fontStyle: 'italic' }}>CMS</span>
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
                className="w-full sm:w-60 pl-9 pr-4 py-2 text-xs rounded-full border border-black/[0.08] bg-black/[0.01] focus:bg-white focus:outline-none focus:border-gold-accent transition-all duration-300"
              />
              <svg className="w-3.5 h-3.5 absolute left-3.5 top-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            
            {/* Notification Bell */}
            <button className="p-2 text-gray-500 hover:text-black transition-colors rounded-full bg-black/[0.02] border border-black/[0.04]">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            
            {/* Help */}
            <button className="p-2 text-gray-500 hover:text-black transition-colors rounded-full bg-black/[0.02] border border-black/[0.04] hidden sm:block">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
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
      <main className="max-w-8xl mx-auto w-full px-6 py-10 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT SIDEBAR (Col span 3) */}
        <aside className="lg:col-span-3 space-y-6">
          
          {/* Elite Clinic Widget Card */}
          <div className="bg-white rounded-3xl p-6 border border-black/[0.04] shadow-sm flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl flex items-center justify-center bg-[#04231E]/5 text-[#04231E] border border-black/5 flex-shrink-0">
              {/* Dental CMS Logo Icon */}
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: C.gold }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-sm tracking-wide">Elite Clinic</h3>
              <p className="text-gray-400 text-xs mt-0.5">Clinical CMS v1.0</p>
            </div>
          </div>

          {/* Navigation Menu */}
          <div className="bg-white rounded-3xl p-4 border border-black/[0.04] shadow-sm space-y-1">
            {[
              { id: 'Home Page', label: 'Home Page' },
              { id: 'Clinical Cases', label: 'Clinical Cases' },
              { id: 'Services', label: 'Services' },
              { id: 'Patient Resources', label: 'Patient Resources' },
              { id: 'About Me', label: 'About Me' }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSidebarTab(item.id);
                  // Open corresponding modal for shortcut editing
                  if (item.id === 'Home Page') setActiveModal('hero');
                  if (item.id === 'Clinical Cases') { setSelectedItem(null); setActiveModal('gallery'); }
                  if (item.id === 'Services') { setSelectedItem(null); setActiveModal('specialties'); }
                  if (item.id === 'About Me') setActiveModal('about');
                }}
                className="w-full text-left px-5 py-3.5 rounded-2xl text-xs font-semibold uppercase tracking-widest transition-all duration-200 flex items-center justify-between"
                style={{
                  backgroundColor: activeSidebarTab === item.id ? 'var(--color-cream-card)' : 'transparent',
                  color: activeSidebarTab === item.id ? C.forestGreen : 'rgba(4,35,30,0.6)'
                }}
              >
                <span>{item.label}</span>
                {activeSidebarTab === item.id && (
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: C.gold }} />
                )}
              </button>
            ))}
          </div>

          {/* Action button */}
          <button
            onClick={() => alert('All changes have been compiled and published dynamically in real-time!')}
            className="w-full text-white font-bold py-4 rounded-full text-[11px] tracking-widest uppercase text-center shadow-md transition-all hover:opacity-90 active:scale-95 cursor-pointer"
            style={{ backgroundColor: C.forestGreen }}
          >
            PUBLISH CHANGES
          </button>

          {/* Secondary links */}
          <div className="flex justify-around text-xs font-semibold uppercase tracking-wider text-gray-400 pt-2 px-2">
            <button onClick={() => alert('Support portal loading...')} className="hover:text-black flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              Support
            </button>
            <button onClick={() => alert('Settings menu...')} className="hover:text-black flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              Settings
            </button>
          </div>
        </aside>

        {/* MAIN PANEL - PORTFOLIO OVERVIEW (Col span 6) */}
        <section className="lg:col-span-6 space-y-6">
          <div className="space-y-2 text-left">
            <h1 className="text-4xl font-normal leading-tight text-[#04231E]" style={{ fontFamily: C.serif }}>
              Portfolio Overview
            </h1>
            <p className="text-gray-500 font-light text-sm leading-relaxed max-w-xl">
              Manage your clinical identity and digital presence from a single, high-fidelity command center.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Card 1: Home Page */}
            <div className="bg-white rounded-[2rem] p-6 border border-black/[0.04] shadow-sm flex flex-col justify-between text-left space-y-6 relative overflow-hidden group">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="flex items-center gap-1.5 text-[9px] font-bold px-3 py-1 rounded-full uppercase border border-[#04231E]/10 bg-[#04231E]/5 text-emerald-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Live
                  </span>
                  <Link to="/" target="_blank" className="text-gray-400 hover:text-black transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                  </Link>
                </div>
                
                {/* Mock image screen */}
                <div className="aspect-[16/10] rounded-2xl overflow-hidden border border-black/[0.05] relative mb-5">
                  <img src={content.hero_profile_img || "/src/assets/profile.jpeg"} alt="Home Page Preview" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end p-3">
                    <span className="text-white text-[9px] font-semibold tracking-wider uppercase bg-white/20 backdrop-blur-md px-2 py-0.5 rounded">Hero Section</span>
                  </div>
                </div>

                <h3 className="text-xl font-normal leading-snug mb-2" style={{ fontFamily: C.serif }}>Home Page</h3>
                <p className="text-gray-500 text-xs font-light leading-relaxed">
                  Primary landing page highlighting your core values, credentials, clinical stats, and patient trust.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setHeroForm({
                      hero_badge: content.hero_badge || '',
                      hero_title_left: content.hero_title_left || '',
                      hero_title_gold: content.hero_title_gold || '',
                      hero_title_right: content.hero_title_right || '',
                      hero_desc: content.hero_desc || '',
                      hero_profile_img: content.hero_profile_img || '',
                      hero_badge_title: content.hero_badge_title || '',
                      hero_badge_desc: content.hero_badge_desc || '',
                    });
                    setActiveModal('hero');
                  }}
                  className="flex-1 text-center font-bold py-3.5 rounded-2xl text-[10px] tracking-widest uppercase border transition-all duration-300 bg-[#04231E] text-white hover:opacity-95 cursor-pointer"
                >
                  EDIT PAGE
                </button>
                <button
                  onClick={() => setActiveModal('stats')}
                  className="p-3.5 rounded-2xl border border-black/[0.06] hover:bg-black/[0.02] transition-colors"
                  title="Edit Stats"
                >
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                </button>
              </div>
            </div>

            {/* Card 2: Specialties */}
            <div className="bg-white rounded-[2rem] p-6 border border-black/[0.04] shadow-sm flex flex-col justify-between text-left space-y-6 relative overflow-hidden">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="flex items-center gap-1.5 text-[9px] font-bold px-3 py-1 rounded-full uppercase border border-amber-500/20 bg-amber-500/10 text-amber-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" /> Drafting
                  </span>
                  <button className="text-gray-400 hover:text-black transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                  </button>
                </div>
                
                {/* Mock image screen */}
                <div className="aspect-[16/10] rounded-2xl overflow-hidden border border-black/[0.05] bg-[#FAF6F0] relative mb-5 flex flex-col items-center justify-center text-center p-4">
                  <svg className="w-8 h-8 text-gray-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <span className="text-[10px] text-gray-400 font-medium tracking-wide">Pending preview update</span>
                </div>

                <h3 className="text-xl font-normal leading-snug mb-2" style={{ fontFamily: C.serif }}>Specialties</h3>
                <p className="text-gray-500 text-xs font-light leading-relaxed">
                  Detailed clinical service catalog covering implants, full rehabilitation, and advanced technology.
                </p>
              </div>

              <div>
                <button
                  onClick={() => {
                    setSelectedItem(null);
                    setSpecialtyForm({ id: null, title: '', desc: '', icon: '🦷', link: '' });
                    setActiveModal('specialties');
                  }}
                  className="w-full text-center font-bold py-3.5 rounded-2xl text-[10px] tracking-widest uppercase border transition-all duration-300 bg-[#04231E] text-white hover:opacity-95 cursor-pointer"
                >
                  RESUME EDIT
                </button>
              </div>
            </div>

            {/* Card 3: Clinical Gallery */}
            <div className="bg-white rounded-[2rem] p-6 border border-black/[0.04] shadow-sm flex flex-col justify-between text-left space-y-6 relative overflow-hidden">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="flex items-center gap-1.5 text-[9px] font-bold px-3 py-1 rounded-full uppercase border border-[#04231E]/10 bg-[#04231E]/5 text-emerald-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Live
                  </span>
                  <Link to="/gallery" className="text-gray-400 hover:text-black transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                  </Link>
                </div>
                
                {/* Mock image screen */}
                <div className="aspect-[16/10] rounded-2xl overflow-hidden border border-black/[0.05] relative mb-5 bg-[#04231E]">
                  <img src={featuredCase.afterImage || "/src/assets/before_after_showcase.png"} alt="Featured Case Preview" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end p-3">
                    <span className="text-white text-[9px] font-semibold tracking-wider uppercase bg-white/20 backdrop-blur-md px-2 py-0.5 rounded">Featured Case: {featuredCase.case_id}</span>
                  </div>
                </div>

                <h3 className="text-xl font-normal leading-snug mb-2" style={{ fontFamily: C.serif }}>Clinical Gallery</h3>
                <p className="text-gray-500 text-xs font-light leading-relaxed">
                  Visual case studies demonstrating surgical success, crowns, bridges, and before/after sliders.
                </p>
              </div>

              <div>
                <button
                  onClick={() => {
                    setSelectedItem(null);
                    setCaseForm({
                      id: null,
                      case_id: `Case #${String(cases.length + 1).padStart(2, '0')}`,
                      category: 'Dental Implants',
                      title: '',
                      desc: '',
                      beforeImage: '',
                      afterImage: '',
                      prosthetics: '',
                      duration: '',
                      material: '',
                      featured: 0
                    });
                    setActiveModal('gallery');
                  }}
                  className="w-full text-center font-bold py-3.5 rounded-2xl text-[10px] tracking-widest uppercase border transition-all duration-300 bg-[#04231E] text-white hover:opacity-95 cursor-pointer"
                >
                  MANAGE CASES
                </button>
              </div>
            </div>

            {/* Card 4: About Dr. Popuri */}
            <div className="bg-white rounded-[2rem] p-6 border border-black/[0.04] shadow-sm flex flex-col justify-between text-left space-y-6 relative overflow-hidden">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="flex items-center gap-1.5 text-[9px] font-bold px-3 py-1 rounded-full uppercase border border-[#04231E]/10 bg-[#04231E]/5 text-emerald-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Live
                  </span>
                  <Link to="/#clinical" className="text-gray-400 hover:text-black transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                  </Link>
                </div>
                
                {/* Mock image screen */}
                <div className="aspect-[16/10] rounded-2xl overflow-hidden border border-black/[0.05] relative mb-5 bg-[#FAF6F0] flex flex-col items-center justify-center p-6 text-center">
                  <svg className="w-8 h-8 text-[#B8966C] mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#04231E]">Academic Credentials</p>
                  <p className="text-[9px] text-gray-400 mt-1 max-w-[150px] truncate">{timeline[0]?.title || 'Prosthodontics'}</p>
                </div>

                <h3 className="text-xl font-normal leading-snug mb-2" style={{ fontFamily: C.serif }}>About Dr. Popuri</h3>
                <p className="text-gray-500 text-xs font-light leading-relaxed">
                  Academic background, degrees, certifications, timelines, and philosophy of prosthodontic care.
                </p>
              </div>

              <div>
                <button
                  onClick={() => {
                    setAboutForm({
                      commit_title: content.commit_title || '',
                      commit_desc: content.commit_desc || '',
                      commit_badge1_val: content.commit_badge1_val || '',
                      commit_badge1_lbl: content.commit_badge1_lbl || '',
                      commit_badge2_val: content.commit_badge2_val || '',
                      commit_badge2_lbl: content.commit_badge2_lbl || '',
                    });
                    setSelectedItem(null);
                    setActiveModal('about');
                  }}
                  className="w-full text-center font-bold py-3.5 rounded-2xl text-[10px] tracking-widest uppercase border transition-all duration-300 bg-[#04231E] text-white hover:opacity-95 cursor-pointer"
                >
                  UPDATE BIO
                </button>
              </div>
            </div>

          </div>
        </section>

        {/* RIGHT SIDEBAR PANEL - GLOBAL CONTENT (Col span 3) */}
        <aside className="lg:col-span-3 space-y-6">
          <div className="bg-white rounded-[2rem] p-6 border border-black/[0.04] shadow-sm text-left space-y-6">
            <div>
              <h2 className="text-lg font-normal mb-1 tracking-wide" style={{ fontFamily: C.serif }}>Global Content</h2>
              <p className="text-gray-400 text-xs font-light leading-relaxed">Updates here apply site-wide immediately.</p>
            </div>

            {/* Primary Award Card */}
            <div className="space-y-3">
              <span className="block text-[9px] font-bold tracking-widest uppercase text-gray-400">Primary Award</span>
              <div className="p-4 rounded-2xl border border-black/[0.05] bg-[#FAF6F0] flex gap-3.5 items-start">
                <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-amber-500 bg-amber-500/10 border border-amber-500/10">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5a2 2 0 10-2 2h2zm0 0H4m8 0h8m-8 0v13m0 0H6m6 0h6" /></svg>
                </div>
                <div className="overflow-hidden">
                  <h4 className="text-xs font-bold text-[#04231E] truncate">{content.primary_award_title}</h4>
                  <p className="text-[10px] text-gray-400 mt-0.5 truncate">{content.primary_award_desc}</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setAwardForm({
                    primary_award_title: content.primary_award_title || '',
                    primary_award_desc: content.primary_award_desc || '',
                  });
                  setActiveModal('award');
                }}
                className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-widest uppercase"
                style={{ color: C.gold }}
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                Edit Reward
              </button>
            </div>

            {/* Clinic Info Card */}
            <div className="space-y-3 pt-2" style={{ borderTop: '1px solid rgba(4,35,30,0.06)' }}>
              <span className="block text-[9px] font-bold tracking-widest uppercase text-gray-400">Clinic Information</span>
              <div className="space-y-2.5 text-xs">
                <div>
                  <span className="block text-[9px] font-semibold text-gray-400 uppercase tracking-widest">Phone Number</span>
                  <span className="font-bold text-gray-700">{content.clinic_phone}</span>
                </div>
                <div>
                  <span className="block text-[9px] font-semibold text-gray-400 uppercase tracking-widest">Location</span>
                  <p className="text-gray-600 font-light leading-relaxed">{content.clinic_location}</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setClinicForm({
                    clinic_phone: content.clinic_phone || '',
                    clinic_location: content.clinic_location || '',
                    clinic_email: content.clinic_email || '',
                  });
                  setActiveModal('clinic');
                }}
                className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-widest uppercase"
                style={{ color: C.gold }}
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                Update Details
              </button>
            </div>

            {/* Footer Bio Card */}
            <div className="space-y-3 pt-2" style={{ borderTop: '1px solid rgba(4,35,30,0.06)' }}>
              <span className="block text-[9px] font-bold tracking-widest uppercase text-gray-400">Footer Bio Summary</span>
              <div className="p-4 rounded-2xl border border-black/[0.05] bg-[#FAF6F0]">
                <p className="text-xs text-gray-600 font-light leading-relaxed italic">
                  "{content.footer_bio_summary}"
                </p>
              </div>
              <button
                onClick={() => {
                  setFooterBioForm({
                    footer_bio_summary: content.footer_bio_summary || '',
                  });
                  setActiveModal('footer-bio');
                }}
                className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-widest uppercase"
                style={{ color: C.gold }}
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                Edit Text
              </button>
            </div>

            {/* Auto Save Status */}
            <div className="pt-4 flex justify-between items-center text-xs" style={{ borderTop: '1px solid rgba(4,35,30,0.06)' }}>
              <span className="text-gray-400 font-medium">Auto-Save Status</span>
              {saveStatus === 'READY' && (
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-50 text-emerald-600">Ready</span>
              )}
              {saveStatus === 'SAVING' && (
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-50 text-amber-600 animate-pulse">Saving...</span>
              )}
              {saveStatus === 'SAVED' && (
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">Saved!</span>
              )}
              {saveStatus === 'ERROR' && (
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-rose-50 text-rose-600">Error</span>
              )}
            </div>
            
            <button
              onClick={() => alert('Review panel loaded. All changes compiled in settings db.')}
              className="w-full text-center font-bold py-3.5 rounded-full text-[10px] tracking-widest uppercase border border-gold-accent hover:bg-gold-accent/10 transition-all duration-300 cursor-pointer"
              style={{ borderColor: C.gold, color: C.gold }}
            >
              REVIEW ALL CHANGES
            </button>
          </div>
        </aside>
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

      {/* ── MODALS (Forms Overlay) ── */}
      {activeModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-[2rem] shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto border border-black/[0.04]">
            
            {/* Modal Header */}
            <div className="px-8 py-6 border-b border-black/[0.06] flex justify-between items-center bg-[#FAF6F0] rounded-t-[2rem]">
              <h3 className="text-2xl font-normal" style={{ fontFamily: C.serif, color: C.forestGreen }}>
                {activeModal === 'hero' && 'Edit Home Page Content'}
                {activeModal === 'specialties' && 'Edit Service Specialties'}
                {activeModal === 'gallery' && 'Manage Clinical Gallery'}
                {activeModal === 'about' && 'Edit About Dr. Popuri & Bio'}
                {activeModal === 'award' && 'Edit Primary Award'}
                {activeModal === 'clinic' && 'Update Clinic Information'}
                {activeModal === 'footer-bio' && 'Edit Footer Bio Summary'}
                {activeModal === 'stats' && 'Update Clinical Statistics'}
              </h3>
              <button
                onClick={() => { setActiveModal(null); setSelectedItem(null); }}
                className="text-gray-400 hover:text-black transition-colors p-1 bg-black/[0.02] border border-black/[0.04] rounded-full"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-8 text-left">
              
              {/* HERO FORM */}
              {activeModal === 'hero' && (
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
              {activeModal === 'stats' && (
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
              {activeModal === 'specialties' && (
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
              {activeModal === 'gallery' && (
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

              {/* ABOUT & TIMELINE FORM */}
              {activeModal === 'about' && (
                <div className="space-y-8">
                  {/* Commitment Settings */}
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

                  {/* Professional Credentials Timeline list */}
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
                </div>
              )}

              {/* AWARD FORM */}
              {activeModal === 'award' && (
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
              {activeModal === 'clinic' && (
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
              {activeModal === 'footer-bio' && (
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

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
