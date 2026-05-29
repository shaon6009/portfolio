'use client';
import React, { useState } from 'react';

export default function AdminPage() {
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');
  
  const handleSubmission = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatusMsg('Processing media formatting pipelines... Please do not close windows.');

    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();

      if (data.success) {
        setStatusMsg('Success! Data asset mapped and verified live on production index.');
        e.target.reset();
      } else {
        setStatusMsg(`Failed: ${data.error}`);
      }
    } catch (err) {
      setStatusMsg(`Critical Error encountered routing payload: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex items-center justify-center p-6">
      <div className="bg-slate-800 border border-slate-700/60 rounded-2xl max-w-xl w-full p-8 shadow-xl">
        <h1 className="text-xl font-bold tracking-tight mb-2">Operational Analytics Command Panel</h1>
        <p className="text-slate-400 text-xs mb-6">Stream binary mock data directly into Google Cloud infrastructure models.</p>
        
        <form onSubmit={handleSubmission} className="space-y-4 text-xs font-semibold uppercase tracking-wider">
          <div>
            <label className="block text-slate-400 mb-1.5">Project Operational Title</label>
            <input name="title" type="text" required className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-100 outline-none focus:border-teal-500 normal-case" placeholder="e.g., Supply Chain Demand Optimizer Pipeline" />
          </div>

          <div>
            <label className="block text-slate-400 mb-1.5">Executive Summary Description</label>
            <textarea name="description" rows={3} required className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-100 outline-none focus:border-teal-500 normal-case" placeholder="Outline specific business KPI values, bottlenecks resolved, and process metrics optimized..." />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-400 mb-1.5">Core Domain Category</label>
              <select name="category" className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-xs text-slate-100 outline-none focus:border-teal-500">
                <option value="Supply Chain Analytics">Supply Chain Analytics</option>
                <option value="Business Intelligence">Business Intelligence</option>
                <option value="Data Engineering">Data Engineering</option>
              </select>
            </div>
            <div>
              <label className="block text-slate-400 mb-1.5">Tech Matrix (Comma Separated)</label>
              <input name="technologies" type="text" required className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-100 outline-none focus:border-teal-500 normal-case" placeholder="Databricks, PySpark, SQL, Tableau" />
            </div>
          </div>

          <div>
            <label className="block text-slate-400 mb-1.5">Source Repository Link (GitHub)</label>
            <input name="github_link" type="url" className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-100 outline-none focus:border-teal-500 normal-case" placeholder="https://github.com/shaon6009/..." />
          </div>

          <div>
            <label className="block text-slate-400 mb-1.5">Media Attachment Asset (Image/Video Upload)</label>
            <input name="file" type="file" accept="image/*,video/*" required className="w-full text-slate-300 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:uppercase file:bg-teal-600 file:text-white hover:file:bg-teal-500 cursor-pointer" />
          </div>

          <button type="submit" disabled={loading} className="w-full bg-teal-600 hover:bg-teal-500 disabled:bg-slate-700 text-white font-bold text-xs py-3.5 px-4 rounded-xl transition-colors tracking-widest uppercase mt-4">
            {loading ? 'Executing Engine Processes...' : 'Deploy Data Record to Production Cloud'}
          </button>
        </form>

        {statusMsg && (
          <div className="mt-6 p-4 rounded-xl bg-slate-900 border border-slate-700/40 text-xs font-medium leading-relaxed text-teal-400">
            {statusMsg}
          </div>
        )}
      </div>
    </div>
  );
}