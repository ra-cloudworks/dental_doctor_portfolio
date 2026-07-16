import React from 'react';
import { Link } from 'react-router-dom';

export default function DashboardTab({ C, content, activeSidebarTab, setActiveSidebarTab, setActiveModal, setSelectedItem, saveStatus, setHeroForm, cases, timeline, patientResources, setPatientResourceForm, setAboutForm, setCaseForm, setSpecialtyForm, featuredCase, searchQuery, specialties }) {
  
  const searchLower = (searchQuery || '').toLowerCase();
  const matchedSpecialties = searchLower ? specialties.filter(s => s.title.toLowerCase().includes(searchLower) || s.desc.toLowerCase().includes(searchLower)) : [];
  const matchedCases = searchLower ? cases.filter(c => c.title.toLowerCase().includes(searchLower) || c.desc.toLowerCase().includes(searchLower) || c.case_id.toLowerCase().includes(searchLower)) : [];
  const matchedTimeline = searchLower ? timeline.filter(t => t.title.toLowerCase().includes(searchLower) || t.institution.toLowerCase().includes(searchLower)) : [];
  const isSearching = searchLower.length > 0;

  return (
    <>
    {/* Search Results Overlay */}
    {isSearching && (
      <div className="mb-8 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-normal" style={{ fontFamily: C.serif, color: C.forestGreen }}>
            Search Results for "{searchQuery}"
          </h2>
          <span className="text-xs text-gray-400 font-medium">
            {matchedSpecialties.length + matchedCases.length + matchedTimeline.length} result(s) found
          </span>
        </div>

        {matchedSpecialties.length > 0 && (
          <div className="space-y-3">
            <span className="text-[10px] font-bold tracking-widest uppercase text-gray-400">Specialties</span>
            {matchedSpecialties.map(s => (
              <div key={s.id} className="bg-white p-4 rounded-2xl border border-black/[0.04] flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{s.icon}</span>
                  <div>
                    <h4 className="text-xs font-bold" style={{ color: C.forestGreen }}>{s.title}</h4>
                    <p className="text-[10px] text-gray-400 line-clamp-1">{s.desc}</p>
                  </div>
                </div>
                <button onClick={() => { setSelectedItem(s.id); setSpecialtyForm(s); setActiveModal('specialties'); }} className="px-3 py-1.5 rounded-full border border-black/[0.08] text-[9px] font-bold uppercase hover:bg-white transition-colors">Edit</button>
              </div>
            ))}
          </div>
        )}

        {matchedCases.length > 0 && (
          <div className="space-y-3">
            <span className="text-[10px] font-bold tracking-widest uppercase text-gray-400">Clinical Cases</span>
            {matchedCases.map(c => (
              <div key={c.id} className="bg-white p-4 rounded-2xl border border-black/[0.04] flex justify-between items-center">
                <div>
                  <span className="text-[10px] font-bold text-gray-400">{c.case_id}</span>
                  <h4 className="text-xs font-bold" style={{ color: C.forestGreen }}>{c.title}</h4>
                  <p className="text-[10px] text-gray-400 line-clamp-1">{c.desc}</p>
                </div>
                <button onClick={() => { setSelectedItem(c.id); setCaseForm(c); setActiveModal('gallery'); }} className="px-3 py-1.5 rounded-full border border-black/[0.08] text-[9px] font-bold uppercase hover:bg-white transition-colors">Edit</button>
              </div>
            ))}
          </div>
        )}

        {matchedTimeline.length > 0 && (
          <div className="space-y-3">
            <span className="text-[10px] font-bold tracking-widest uppercase text-gray-400">Credentials</span>
            {matchedTimeline.map(t => (
              <div key={t.id} className="bg-white p-4 rounded-2xl border border-black/[0.04] flex justify-between items-center">
                <div>
                  <span className="text-[8px] font-bold tracking-widest uppercase" style={{ color: C.gold }}>{t.tag}</span>
                  <h4 className="text-xs font-bold" style={{ color: C.forestGreen }}>{t.title}</h4>
                  <p className="text-[10px] text-gray-400">{t.institution}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {matchedSpecialties.length === 0 && matchedCases.length === 0 && matchedTimeline.length === 0 && (
          <div className="bg-white p-12 rounded-2xl border border-black/[0.04] text-center">
            <p className="text-gray-400 text-sm font-light">No results match your search. Try different keywords.</p>
          </div>
        )}

        <div className="border-t border-black/[0.06] pt-8">
          <h3 className="text-lg font-normal mb-4" style={{ fontFamily: C.serif }}>Portfolio Overview</h3>
        </div>
      </div>
    )}

<div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-start ${isSearching ? 'opacity-50 pointer-events-none' : ''}`}>
        
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
              {/* <p className="text-gray-400 text-xs mt-0.5">Clinical CMS v1.0</p> */}
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
                  if (item.id === 'Patient Resources') { setSelectedItem(null); setActiveModal('patient-resources'); }
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
            onClick={() => {
              setSaveStatus('SAVING');
              setTimeout(() => {
                setSaveStatus('SAVED');
                setTimeout(() => setSaveStatus('READY'), 2000);
              }, 800);
            }}
            className="w-full text-white font-bold py-4 rounded-full text-[11px] tracking-widest uppercase text-center shadow-md transition-all hover:opacity-90 active:scale-95 cursor-pointer"
            style={{ backgroundColor: C.forestGreen }}
          >
            PUBLISH CHANGES
          </button>

          {/* Secondary links */}
          <div className="flex justify-around text-xs font-semibold uppercase tracking-wider text-gray-400 pt-2 px-2">
            <button onClick={() => setActiveTab && window.location.reload()} className="hover:text-black flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              Support
            </button>
            <button onClick={() => setActiveModal && setActiveModal('clinic')} className="hover:text-black flex items-center gap-1.5">
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

            {/* Card 5: Patient Resources */}
            <div className="bg-white rounded-[2rem] p-6 border border-black/[0.04] shadow-sm flex flex-col justify-between text-left space-y-6 relative overflow-hidden">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="flex items-center gap-1.5 text-[9px] font-bold px-3 py-1 rounded-full uppercase border border-blue-500/20 bg-blue-500/10 text-blue-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" /> {patientResources.length} Resources
                  </span>
                  <button className="text-gray-400 hover:text-black transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                  </button>
                </div>

                {/* Mock preview */}
                <div className="aspect-[16/10] rounded-2xl overflow-hidden border border-black/[0.05] bg-[#FAF6F0] relative mb-5 flex flex-col items-center justify-center p-4 text-center">
                  <svg className="w-8 h-8 text-blue-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#04231E]">Patient Guides & FAQs</span>
                  <span className="text-[9px] text-gray-400 mt-1">{patientResources.length} articles published</span>
                </div>

                <h3 className="text-xl font-normal leading-snug mb-2" style={{ fontFamily: C.serif }}>Patient Resources</h3>
                <p className="text-gray-500 text-xs font-light leading-relaxed">
                  Pre-operative instructions, post-op care guides, FAQs, and helpful information for your patients.
                </p>
              </div>

              <div>
                <button
                  onClick={() => {
                    setSelectedItem(null);
                    setPatientResourceForm({ id: null, title: '', category: 'General Info', description: '', icon: '📄', link: '', sort_order: 0 });
                    setActiveModal('patient-resources');
                  }}
                  className="w-full text-center font-bold py-3.5 rounded-2xl text-[10px] tracking-widest uppercase border transition-all duration-300 bg-[#04231E] text-white hover:opacity-95 cursor-pointer"
                >
                  MANAGE RESOURCES
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
              onClick={() => {
                const summary = [
                  `Content Keys: ${Object.keys(content).length}`,
                  `Specialties: ${specialties.length}`,
                  `Gallery Cases: ${cases.length}`,
                  `Timeline Items: ${timeline.length}`,
                  `Patient Resources: ${patientResources.length}`,
                ].join('\n');
                alert(`CMS Content Summary:\n\n${summary}\n\nAll changes are saved in real-time via the database.`);
              }}
              className="w-full text-center font-bold py-3.5 rounded-full text-[10px] tracking-widest uppercase border border-gold-accent hover:bg-gold-accent/10 transition-all duration-300 cursor-pointer"
              style={{ borderColor: C.gold, color: C.gold }}
            >
              REVIEW ALL CHANGES
            </button>
          </div>
        </aside>
        </div>
    </>
  );
}
