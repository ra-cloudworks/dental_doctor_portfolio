import React from 'react';
import { Link } from 'react-router-dom';

export default function ContentLibraryTab({ C, cases, content }) {
  return (
    <>
<div className="space-y-6">
              <h2 className="text-3xl font-normal" style={{ fontFamily: C.serif, color: C.forestGreen }}>Content Library</h2>
              <p className="text-gray-500 text-sm max-w-2xl">Manage all your uploaded media, before/after photos, and clinical assets here.</p>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                 {cases.map((c, i) => (
                    <React.Fragment key={i}>
                      {c.beforeImage && (
                        <div className="bg-white p-3 rounded-2xl border border-black/[0.04] shadow-sm">
                          <div className="aspect-square rounded-xl overflow-hidden bg-gray-100 mb-3">
                             <img src={c.beforeImage} alt={`Before Case ${c.case_id}`} className="w-full h-full object-cover" />
                          </div>
                          <p className="text-[10px] font-bold text-gray-400 truncate" title={c.beforeImage.split('/').pop()}>{c.beforeImage.split('/').pop()}</p>
                          <p className="text-xs font-semibold mt-1 truncate" title={`${c.title} (Before)`}>{c.title} (Before)</p>
                        </div>
                      )}
                      {c.afterImage && (
                        <div className="bg-white p-3 rounded-2xl border border-black/[0.04] shadow-sm">
                          <div className="aspect-square rounded-xl overflow-hidden bg-gray-100 mb-3">
                             <img src={c.afterImage} alt={`After Case ${c.case_id}`} className="w-full h-full object-cover" />
                          </div>
                          <p className="text-[10px] font-bold text-gray-400 truncate" title={c.afterImage.split('/').pop()}>{c.afterImage.split('/').pop()}</p>
                          <p className="text-xs font-semibold mt-1 truncate" title={`${c.title} (After)`}>{c.title} (After)</p>
                        </div>
                      )}
                    </React.Fragment>
                 ))}
                 
                 {content.hero_profile_img && (
                    <div className="bg-white p-3 rounded-2xl border border-black/[0.04] shadow-sm">
                      <div className="aspect-square rounded-xl overflow-hidden bg-gray-100 mb-3">
                         <img src={content.hero_profile_img} alt="Hero Profile" className="w-full h-full object-cover" />
                      </div>
                      <p className="text-[10px] font-bold text-gray-400 truncate" title={content.hero_profile_img.split('/').pop()}>{content.hero_profile_img.split('/').pop()}</p>
                      <p className="text-xs font-semibold mt-1 truncate">Profile Image</p>
                    </div>
                 )}
              </div>
           </div>
    </>
  );
}
