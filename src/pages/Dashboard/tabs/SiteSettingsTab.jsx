import React, { useState } from 'react';

export default function SiteSettingsTab({ C, content, setContent, saveSettings, setSaveStatus }) {
  const [clinicForm, setClinicForm] = useState({
    clinic_phone: content.clinic_phone || '',
    clinic_email: content.clinic_email || '',
    clinic_location: content.clinic_location || '',
  });
  const [awardForm, setAwardForm] = useState({
    primary_award_title: content.primary_award_title || '',
    primary_award_desc: content.primary_award_desc || '',
  });
  const [aboutForm, setAboutForm] = useState({
    commit_title: content.commit_title || '',
    commit_desc: content.commit_desc || '',
    commit_badge1_val: content.commit_badge1_val || '',
    commit_badge1_lbl: content.commit_badge1_lbl || '',
    commit_badge2_val: content.commit_badge2_val || '',
    commit_badge2_lbl: content.commit_badge2_lbl || '',
  });
  const [footerForm, setFooterForm] = useState({
    footer_bio_summary: content.footer_bio_summary || '',
  });
  const [storyForm, setStoryForm] = useState({
    story_quote: content.story_quote || '',
    story_patient_name: content.story_patient_name || '',
    story_patient_role: content.story_patient_role || '',
  });

  const [saveMsg, setSaveMsg] = useState({});

  const handleSave = async (key, data) => {
    try {
      setSaveMsg((p) => ({ ...p, [key]: 'SAVING' }));
      setSaveStatus('SAVING');
      await saveSettings(data);
      setSaveMsg((p) => ({ ...p, [key]: 'SAVED' }));
      setSaveStatus('SAVED');
      setTimeout(() => {
        setSaveMsg((p) => ({ ...p, [key]: null }));
        setSaveStatus('READY');
      }, 2000);
    } catch {
      setSaveMsg((p) => ({ ...p, [key]: 'ERROR' }));
      setSaveStatus('ERROR');
      setTimeout(() => {
        setSaveMsg((p) => ({ ...p, [key]: null }));
        setSaveStatus('READY');
      }, 2000);
    }
  };

  const inputCls = 'w-full px-4 py-2.5 text-sm font-medium rounded-xl border border-black/[0.08] bg-[#FAF6F0] focus:outline-none focus:ring-2 focus:ring-[#04231E]/20 transition-all';
  const labelCls = 'block text-[10px] font-bold text-gray-400 mb-1.5 uppercase tracking-widest';

  const SaveBtn = ({ status, onClick }) => (
    <div className="flex items-center gap-3 pt-2">
      <button
        onClick={onClick}
        disabled={status === 'SAVING'}
        className="px-5 py-2 bg-[#04231E] text-white text-[10px] font-bold uppercase tracking-widest rounded-full hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        {status === 'SAVING' ? 'Saving...' : status === 'SAVED' ? 'Saved!' : 'Save'}
      </button>
      {status === 'SAVED' && <span className="text-xs font-semibold" style={{ color: C.forestGreen }}>Changes saved</span>}
      {status === 'ERROR' && <span className="text-xs font-semibold text-red-500">Failed to save</span>}
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-normal" style={{ fontFamily: C.serif, color: C.forestGreen }}>Site Settings</h2>
        <p className="text-gray-500 text-sm max-w-2xl mt-1">Edit global content, contact details, and section copy directly. Changes save per section.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Clinic Contact */}
        <div className="bg-white p-6 rounded-[2rem] border border-black/[0.04] shadow-sm space-y-4">
          <h3 className="text-lg font-bold" style={{ color: C.forestGreen }}>Clinic Contact</h3>
          <div className="space-y-3">
            <div>
              <label className={labelCls}>Phone Number</label>
              <input className={inputCls} value={clinicForm.clinic_phone} onChange={(e) => setClinicForm({ ...clinicForm, clinic_phone: e.target.value })} placeholder="e.g. +91 98765 43210" />
            </div>
            <div>
              <label className={labelCls}>Email Address</label>
              <input className={inputCls} value={clinicForm.clinic_email} onChange={(e) => setClinicForm({ ...clinicForm, clinic_email: e.target.value })} placeholder="clinic@example.com" />
            </div>
            <div>
              <label className={labelCls}>Location</label>
              <input className={inputCls} value={clinicForm.clinic_location} onChange={(e) => setClinicForm({ ...clinicForm, clinic_location: e.target.value })} placeholder="City, State" />
            </div>
          </div>
          <SaveBtn status={saveMsg.clinic} onClick={() => handleSave('clinic', clinicForm)} />
        </div>

        {/* Awards */}
        <div className="bg-white p-6 rounded-[2rem] border border-black/[0.04] shadow-sm space-y-4">
          <h3 className="text-lg font-bold" style={{ color: C.forestGreen }}>Awards & Recognition</h3>
          <div className="space-y-3">
            <div>
              <label className={labelCls}>Primary Award Title</label>
              <input className={inputCls} value={awardForm.primary_award_title} onChange={(e) => setAwardForm({ ...awardForm, primary_award_title: e.target.value })} placeholder="Award name" />
            </div>
            <div>
              <label className={labelCls}>Award Description</label>
              <textarea rows={3} className={inputCls + ' resize-none'} value={awardForm.primary_award_desc} onChange={(e) => setAwardForm({ ...awardForm, primary_award_desc: e.target.value })} placeholder="Brief description" />
            </div>
          </div>
          <SaveBtn status={saveMsg.award} onClick={() => handleSave('award', awardForm)} />
        </div>

        {/* About & Commitment */}
        <div className="bg-white p-6 rounded-[2rem] border border-black/[0.04] shadow-sm space-y-4">
          <h3 className="text-lg font-bold" style={{ color: C.forestGreen }}>About & Commitment</h3>
          <div className="space-y-3">
            <div>
              <label className={labelCls}>Commitment Title</label>
              <input className={inputCls} value={aboutForm.commit_title} onChange={(e) => setAboutForm({ ...aboutForm, commit_title: e.target.value })} placeholder="Title" />
            </div>
            <div>
              <label className={labelCls}>Description</label>
              <textarea rows={3} className={inputCls + ' resize-none'} value={aboutForm.commit_desc} onChange={(e) => setAboutForm({ ...aboutForm, commit_desc: e.target.value })} placeholder="Commitment description" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelCls}>Badge 1 Value</label>
                <input className={inputCls} value={aboutForm.commit_badge1_val} onChange={(e) => setAboutForm({ ...aboutForm, commit_badge1_val: e.target.value })} placeholder="e.g. 25+" />
              </div>
              <div>
                <label className={labelCls}>Badge 1 Label</label>
                <input className={inputCls} value={aboutForm.commit_badge1_lbl} onChange={(e) => setAboutForm({ ...aboutForm, commit_badge1_lbl: e.target.value })} placeholder="e.g. Years Exp." />
              </div>
              <div>
                <label className={labelCls}>Badge 2 Value</label>
                <input className={inputCls} value={aboutForm.commit_badge2_val} onChange={(e) => setAboutForm({ ...aboutForm, commit_badge2_val: e.target.value })} placeholder="e.g. 5000+" />
              </div>
              <div>
                <label className={labelCls}>Badge 2 Label</label>
                <input className={inputCls} value={aboutForm.commit_badge2_lbl} onChange={(e) => setAboutForm({ ...aboutForm, commit_badge2_lbl: e.target.value })} placeholder="e.g. Patients" />
              </div>
            </div>
          </div>
          <SaveBtn status={saveMsg.about} onClick={() => handleSave('about', aboutForm)} />
        </div>

        {/* Footer Bio */}
        <div className="bg-white p-6 rounded-[2rem] border border-black/[0.04] shadow-sm space-y-4">
          <h3 className="text-lg font-bold" style={{ color: C.forestGreen }}>Footer Bio</h3>
          <div className="space-y-3">
            <div>
              <label className={labelCls}>Footer Bio Summary</label>
              <textarea rows={4} className={inputCls + ' resize-none'} value={footerForm.footer_bio_summary} onChange={(e) => setFooterForm({ ...footerForm, footer_bio_summary: e.target.value })} placeholder="Short bio shown in footer" />
            </div>
          </div>
          <SaveBtn status={saveMsg.footer} onClick={() => handleSave('footer', footerForm)} />
        </div>

        {/* Success Stories */}
        <div className="bg-white p-6 rounded-[2rem] border border-black/[0.04] shadow-sm space-y-4 md:col-span-2">
          <h3 className="text-lg font-bold" style={{ color: C.forestGreen }}>Success Stories</h3>
          <div className="space-y-3">
            <div>
              <label className={labelCls}>Testimonial Quote</label>
              <textarea rows={3} className={inputCls + ' resize-none'} value={storyForm.story_quote} onChange={(e) => setStoryForm({ ...storyForm, story_quote: e.target.value })} placeholder="Patient testimonial" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelCls}>Patient Name</label>
                <input className={inputCls} value={storyForm.story_patient_name} onChange={(e) => setStoryForm({ ...storyForm, story_patient_name: e.target.value })} placeholder="Name" />
              </div>
              <div>
                <label className={labelCls}>Patient Role</label>
                <input className={inputCls} value={storyForm.story_patient_role} onChange={(e) => setStoryForm({ ...storyForm, story_patient_role: e.target.value })} placeholder="e.g. Smile Makeover Patient" />
              </div>
            </div>
          </div>
          <SaveBtn status={saveMsg.story} onClick={() => handleSave('story', storyForm)} />
        </div>

      </div>
    </div>
  );
}
