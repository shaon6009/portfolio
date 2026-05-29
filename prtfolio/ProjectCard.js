'use client';
import React from 'react';

export default function ProjectCard({ title, description, category, technologies, media_url, media_type, github_link }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md flex flex-col h-full">
      {/* Media Window Container */}
      <div className="relative w-full h-52 bg-slate-900 overflow-hidden flex items-center justify-center">
        {media_url ? (
          media_type === 'video' ? (
            <video src={media_url} controls className="w-full h-full object-cover" />
          ) : (
            <img src={media_url} alt={title} className="w-full h-full object-cover" />
          )
        ) : (
          <div className="text-slate-500 text-xs uppercase tracking-wider font-semibold">Data Asset Sandbox</div>
        )}
        <span className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-teal-400 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-teal-500/30">
          {category}
        </span>
      </div>

      {/* Text Card Metadata Content */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-slate-800 tracking-tight mb-2">{title}</h3>
        <p className="text-slate-600 text-sm leading-relaxed mb-4 flex-grow">{description}</p>
        
        {/* Technology Tags Stack */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {technologies?.map((tech, index) => (
            <span key={index} className="bg-slate-100 text-slate-700 text-[11px] font-medium px-2.5 py-0.5 rounded">
              {tech}
            </span>
          ))}
        </div>

        {/* Action Bottom Anchors */}
        {github_link && (
          <a 
            href={github_link} 
            target="_blank" 
            rel="noreferrer" 
            className="inline-flex items-center justify-center w-full bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs py-2.5 px-4 rounded-xl transition-colors"
          >
            Inspect Source Code Repository
          </a>
        )}
      </div>
    </div>
  );
}