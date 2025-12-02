import React from 'react';
import { Certificate } from '../types';
import { Award, ExternalLink, Calendar, ShieldCheck, Edit2, Trash2, Plus } from 'lucide-react';

interface CertificatesSectionProps {
  certificates: Certificate[];
  isEditing: boolean;
  onEdit: (cert: Certificate) => void;
  onDelete: (idx: number) => void;
  onAdd: () => void;
}

const CertificatesSection: React.FC<CertificatesSectionProps> = ({ certificates, isEditing, onEdit, onDelete, onAdd }) => {
  return (
    <section className="mb-12">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-3">
            <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg text-yellow-600 dark:text-yellow-400">
                <Award size={24} />
            </div>
            Certifications & Licenses
        </h2>
        {isEditing && (
            <button 
                onClick={onAdd}
                className="px-4 py-2 bg-teal-600 text-white rounded-lg flex items-center gap-2 text-sm hover:bg-teal-700 transition-colors shadow-lg shadow-teal-500/20"
            >
                <Plus size={16} /> Add Certificate
            </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {certificates.map((cert, idx) => (
          <div key={idx} className="relative group bg-white dark:bg-slate-800 p-5 rounded-xl border border-gray-200 dark:border-slate-700 hover:shadow-md transition-all duration-300 hover:border-teal-200 dark:hover:border-teal-800">
            
            {/* Edit Controls */}
            {isEditing && (
                <div className="absolute top-2 right-2 flex gap-1 z-10 bg-white dark:bg-slate-800 p-1 rounded border border-gray-200 dark:border-slate-700 shadow-sm">
                    <button onClick={() => onEdit(cert)} className="p-1.5 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded">
                        <Edit2 size={14} />
                    </button>
                    <button onClick={() => onDelete(idx)} className="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded">
                        <Trash2 size={14} />
                    </button>
                </div>
            )}

            <div className="flex gap-4">
              <div className="shrink-0 mt-1">
                 <ShieldCheck className="text-teal-500" size={24} />
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-slate-900 dark:text-white text-base leading-snug truncate pr-6" title={cert.title}>
                    {cert.title}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm mb-2">{cert.issuer}</p>
                
                <div className="flex items-center gap-2 text-xs text-slate-400 dark:text-slate-500 mb-3 font-medium">
                    <Calendar size={12} />
                    <span>Issued {cert.date}</span>
                </div>

                {cert.skills && cert.skills.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-3">
                        {cert.skills.slice(0, 3).map((skill, sIdx) => (
                            <span key={sIdx} className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-700/50 text-slate-600 dark:text-slate-400 text-[10px] rounded border border-slate-200 dark:border-slate-700">
                                {skill}
                            </span>
                        ))}
                        {cert.skills.length > 3 && (
                            <span className="text-[10px] text-slate-400 py-0.5">+{cert.skills.length - 3} more</span>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-3 mt-auto">
                    {cert.link && (
                        <a 
                            href={cert.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs font-medium text-teal-600 dark:text-teal-400 hover:underline"
                        >
                            View Credential <ExternalLink size={10} />
                        </a>
                    )}
                    {cert.credentialId && (
                         <span className="text-[10px] text-slate-400 font-mono" title={`ID: ${cert.credentialId}`}>
                            ID: {cert.credentialId.slice(0, 8)}...
                         </span>
                    )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CertificatesSection;