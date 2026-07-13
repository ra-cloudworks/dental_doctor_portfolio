import React from 'react';
import { Link } from 'react-router-dom';

export default function AnalyticsTab({ C }) {
  return (
    <>
<div className="space-y-6">
              <h2 className="text-3xl font-normal" style={{ fontFamily: C.serif, color: C.forestGreen }}>Analytics Overview</h2>
              <p className="text-gray-500 text-sm max-w-2xl">Monitor your portfolio traffic and patient engagement metrics.</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                 <div className="bg-white p-6 rounded-[2rem] border border-black/[0.04] shadow-sm text-center">
                    <p className="text-4xl font-light" style={{ fontFamily: C.serif, color: C.forestGreen }}>1,248</p>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-2">Total Page Views</p>
                    <p className="text-[10px] text-emerald-600 font-semibold mt-1">↑ 12% from last month</p>
                 </div>
                 <div className="bg-white p-6 rounded-[2rem] border border-black/[0.04] shadow-sm text-center">
                    <p className="text-4xl font-light" style={{ fontFamily: C.serif, color: C.forestGreen }}>342</p>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-2">Gallery Views</p>
                    <p className="text-[10px] text-emerald-600 font-semibold mt-1">↑ 8% from last month</p>
                 </div>
                 <div className="bg-white p-6 rounded-[2rem] border border-black/[0.04] shadow-sm text-center">
                    <p className="text-4xl font-light" style={{ fontFamily: C.serif, color: C.forestGreen }}>45</p>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-2">Inquiries</p>
                    <p className="text-[10px] text-emerald-600 font-semibold mt-1">↑ 24% from last month</p>
                 </div>
              </div>
              
              <div className="bg-white p-6 rounded-[2rem] border border-black/[0.04] shadow-sm mt-8 flex flex-col items-center justify-center h-64 text-center">
                 <svg className="w-12 h-12 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" /></svg>
                 <p className="text-gray-400 text-sm font-light italic">Detailed chart visualization data is currently populating...</p>
              </div>
           </div>
    </>
  );
}
