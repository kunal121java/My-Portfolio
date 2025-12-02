import React, { useState } from 'react';
import { Mail, Linkedin, MapPin, Award, Download, FileText } from 'lucide-react';
import { PERSONAL_INFO } from '../constants';

const Sidebar: React.FC = () => {
  const [imgError, setImgError] = useState(false);

  return (
    <aside className="w-full md:w-80 bg-slate-800 dark:bg-slate-900 text-white min-h-screen flex flex-col p-8 md:fixed md:left-0 md:top-0 md:bottom-0 z-10 transition-colors duration-300 border-r border-slate-700">
      {/* Profile Image Area */}
      <div className="mb-8 text-center md:text-left">
        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-slate-600 mb-4 mx-auto md:mx-0 shadow-xl bg-slate-700 relative group">
          {imgError ? (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-teal-500 to-blue-600 text-3xl font-bold tracking-widest text-white">
              KP
            </div>
          ) : (
            <img 
                src={PERSONAL_INFO.profileImage} 
                alt={PERSONAL_INFO.name} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                onError={() => setImgError(true)}
            />
          )}
        </div>
        <h1 className="text-2xl font-bold tracking-tight">{PERSONAL_INFO.name}</h1>
        <p className="text-slate-400 text-sm mt-2 leading-relaxed">
          {PERSONAL_INFO.headline}
        </p>
      </div>

      <div className="space-y-8 flex-1">
        {/* Contact Info */}
        <div>
          <h3 className="text-slate-500 uppercase text-xs font-bold tracking-wider mb-4">Contact</h3>
          <ul className="space-y-4 text-sm">
            <li className="flex items-center gap-3 hover:text-teal-400 transition-colors cursor-pointer group">
              <div className="p-2 bg-slate-700 rounded-lg group-hover:bg-slate-600 transition-colors">
                <Mail size={16} />
              </div>
              <a href={`mailto:${PERSONAL_INFO.email}`} className="truncate">
                {PERSONAL_INFO.email}
              </a>
            </li>
            <li className="flex items-center gap-3 hover:text-teal-400 transition-colors cursor-pointer group">
              <div className="p-2 bg-slate-700 rounded-lg group-hover:bg-slate-600 transition-colors">
                <Linkedin size={16} />
              </div>
              <a href={`https://${PERSONAL_INFO.linkedin}`} target="_blank" rel="noopener noreferrer" className="truncate">
                LinkedIn Profile
              </a>
            </li>
            <li className="flex items-start gap-3 text-slate-300 group">
              <div className="p-2 bg-slate-700 rounded-lg shrink-0">
                <MapPin size={16} />
              </div>
              <span className="mt-1">{PERSONAL_INFO.location}</span>
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div>
           <button className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-teal-500/20 mb-3">
             <Download size={16} />
             <span>Download Resume</span>
           </button>
        </div>

        {/* Top Skills Summary in Sidebar */}
        <div>
            <h3 className="text-slate-500 uppercase text-xs font-bold tracking-wider mb-4">Focus Areas</h3>
            <ul className="space-y-2 text-sm text-slate-300">
                <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse"></div>
                    Salesforce Development
                </li>
                 <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-75"></div>
                    Machine Learning & AI
                </li>
                 <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse delay-150"></div>
                    AWS Cloud
                </li>
            </ul>
        </div>
        
        {/* Certification Badge Area */}
        <div>
            <h3 className="text-slate-500 uppercase text-xs font-bold tracking-wider mb-4">Certifications</h3>
            <div className="flex flex-wrap gap-2">
                <span className="bg-slate-700 text-xs px-2 py-1 rounded flex items-center gap-1 border border-slate-600">
                    <Award size={12} className="text-yellow-400"/> AWS
                </span>
                <span className="bg-slate-700 text-xs px-2 py-1 rounded flex items-center gap-1 border border-slate-600">
                    <Award size={12} className="text-blue-400"/> Salesforce
                </span>
                <span className="bg-slate-700 text-xs px-2 py-1 rounded flex items-center gap-1 border border-slate-600">
                    <Award size={12} className="text-green-400"/> Agentic AI
                </span>
            </div>
        </div>
      </div>

      <div className="mt-8 pt-8 border-t border-slate-700 text-xs text-slate-500 text-center md:text-left">
        &copy; {new Date().getFullYear()} Kunal Pandey
      </div>
    </aside>
  );
};

export default Sidebar;