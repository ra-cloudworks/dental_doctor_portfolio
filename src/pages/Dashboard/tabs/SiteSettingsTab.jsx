import React from 'react';
import { Link } from 'react-router-dom';

export default function SiteSettingsTab({ C, content, setClinicForm, setAwardForm, setAboutForm, setFooterBioForm, setActiveModal }) {
  return (
    <>
<div className="space-y-6">
              <h2 className="text-3xl font-normal" style={{ fontFamily: C.serif, color: C.forestGreen }}>Site Settings</h2>
              <p className="text-gray-500 text-sm max-w-2xl">Manage global preferences and operational details for your portfolio.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-[2rem] border border-black/[0.04] shadow-sm space-y-4">
                   <h3 className="text-lg font-bold" style={{ color: C.forestGreen }}>Clinic Contact Information</h3>
                   <div className="space-y-4">
                     <div>
                       <label className="block text-[10px] font-bold text-gray-400 mb-1 uppercase tracking-wider">Phone Number</label>
                       <p className="text-sm font-semibold">{content.clinic_phone || 'Not set'}</p>
                     </div>
                     <div>
                       <label className="block text-[10px] font-bold text-gray-400 mb-1 uppercase tracking-wider">Email Address</label>
                       <p className="text-sm font-semibold">{content.clinic_email || 'Not set'}</p>
                     </div>
                     <div>
                       <label className="block text-[10px] font-bold text-gray-400 mb-1 uppercase tracking-wider">Location</label>
                       <p className="text-sm font-semibold">{content.clinic_location || 'Not set'}</p>
                     </div>
                     <button onClick={() => {
                        setClinicForm({
                          clinic_phone: content.clinic_phone || '',
                          clinic_location: content.clinic_location || '',
                          clinic_email: content.clinic_email || '',
                        });
                        setActiveModal('clinic');
                     }} className="px-4 py-2 bg-[#04231E] text-white text-[10px] font-bold uppercase tracking-wider rounded-full hover:opacity-90 transition-opacity">Edit Clinic Info</button>
                   </div>
                </div>
                
                <div className="bg-white p-6 rounded-[2rem] border border-black/[0.04] shadow-sm space-y-4">
                   <h3 className="text-lg font-bold" style={{ color: C.forestGreen }}>Awards & Recognition</h3>
                   <div className="space-y-4">
                     <div>
                       <label className="block text-[10px] font-bold text-gray-400 mb-1 uppercase tracking-wider">Primary Award Title</label>
                       <p className="text-sm font-semibold">{content.primary_award_title || 'Not set'}</p>
                     </div>
                     <div>
                       <label className="block text-[10px] font-bold text-gray-400 mb-1 uppercase tracking-wider">Award Description</label>
                       <p className="text-sm font-semibold">{content.primary_award_desc || 'Not set'}</p>
                     </div>
                     <button onClick={() => {
                        setAwardForm({
                          primary_award_title: content.primary_award_title || '',
                          primary_award_desc: content.primary_award_desc || '',
                        });
                        setActiveModal('award');
                     }} className="px-4 py-2 bg-[#04231E] text-white text-[10px] font-bold uppercase tracking-wider rounded-full hover:opacity-90 transition-opacity">Edit Award Info</button>
                   </div>
                </div>

                <div className="bg-white p-6 rounded-[2rem] border border-black/[0.04] shadow-sm space-y-4">
                   <h3 className="text-lg font-bold" style={{ color: C.forestGreen }}>About & Commitment</h3>
                   <div className="space-y-4">
                     <div>
                       <label className="block text-[10px] font-bold text-gray-400 mb-1 uppercase tracking-wider">Commitment Title</label>
                       <p className="text-sm font-semibold">{content.commit_title || 'Not set'}</p>
                     </div>
                     <div>
                       <label className="block text-[10px] font-bold text-gray-400 mb-1 uppercase tracking-wider">Commitment Description</label>
                       <p className="text-sm font-semibold line-clamp-2">{content.commit_desc || 'Not set'}</p>
                     </div>
                     <button onClick={() => {
                        setAboutForm({
                          commit_title: content.commit_title || '',
                          commit_desc: content.commit_desc || '',
                          commit_badge1_val: content.commit_badge1_val || '',
                          commit_badge1_lbl: content.commit_badge1_lbl || '',
                          commit_badge2_val: content.commit_badge2_val || '',
                          commit_badge2_lbl: content.commit_badge2_lbl || '',
                        });
                        setActiveModal('about');
                     }} className="px-4 py-2 bg-[#04231E] text-white text-[10px] font-bold uppercase tracking-wider rounded-full hover:opacity-90 transition-opacity">Edit About Details</button>
                   </div>
                </div>

                <div className="bg-white p-6 rounded-[2rem] border border-black/[0.04] shadow-sm space-y-4">
                   <h3 className="text-lg font-bold" style={{ color: C.forestGreen }}>Footer Bio Settings</h3>
                   <div className="space-y-4">
                     <div>
                       <label className="block text-[10px] font-bold text-gray-400 mb-1 uppercase tracking-wider">Footer Summary</label>
                       <p className="text-sm font-semibold line-clamp-3">{content.footer_bio_summary || 'Not set'}</p>
                     </div>
                     <button onClick={() => {
                        setFooterBioForm({
                          footer_bio_summary: content.footer_bio_summary || '',
                        });
                        setActiveModal('footer-bio');
                     }} className="px-4 py-2 bg-[#04231E] text-white text-[10px] font-bold uppercase tracking-wider rounded-full hover:opacity-90 transition-opacity">Edit Footer Bio</button>
                   </div>
                </div>
              </div>
           </div>
    </>
  );
}
