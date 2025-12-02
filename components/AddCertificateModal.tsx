import React, { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';
import { Certificate } from '../types';

interface AddCertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (cert: Certificate) => void;
  initialData?: Certificate | null;
}

const AddCertificateModal: React.FC<AddCertificateModalProps> = ({ isOpen, onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState<Certificate>({
    title: '',
    issuer: '',
    date: '',
    link: '',
    credentialId: '',
    skills: []
  });
  const [skillsInput, setSkillsInput] = useState('');

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
      setSkillsInput(initialData.skills ? initialData.skills.join(', ') : '');
    } else {
      setFormData({
        title: '',
        issuer: '',
        date: '',
        link: '',
        credentialId: '',
        skills: []
      });
      setSkillsInput('');
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const skillsArray = skillsInput.split(',').map(s => s.trim()).filter(s => s.length > 0);
    onSave({ ...formData, skills: skillsArray });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl w-full max-w-lg border border-slate-200 dark:border-slate-700 flex flex-col max-h-[90vh]">
        
        <div className="p-6 border-b border-gray-100 dark:border-slate-800 flex justify-between items-center">
          <h2 className="text-xl font-bold text-slate-800 dark:text-white">
            {initialData ? 'Edit Certificate' : 'Add New Certificate'}
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Certificate Name</label>
            <input 
              required
              type="text" 
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg p-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 outline-none transition-all"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              placeholder="e.g. AWS Cloud Foundations"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Issuer</label>
            <input 
              required
              type="text" 
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg p-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 outline-none transition-all"
              value={formData.issuer}
              onChange={(e) => setFormData({...formData, issuer: e.target.value})}
              placeholder="e.g. Amazon Web Services"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Date Issued</label>
            <input 
              required
              type="text" 
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg p-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 outline-none transition-all"
              value={formData.date}
              onChange={(e) => setFormData({...formData, date: e.target.value})}
              placeholder="e.g. June 2025"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Credential URL (Optional)</label>
            <input 
              type="url" 
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg p-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 outline-none transition-all"
              value={formData.link || ''}
              onChange={(e) => setFormData({...formData, link: e.target.value})}
              placeholder="https://..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Credential ID (Optional)</label>
            <input 
              type="text" 
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg p-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 outline-none transition-all"
              value={formData.credentialId || ''}
              onChange={(e) => setFormData({...formData, credentialId: e.target.value})}
              placeholder="e.g. ABC-123-XYZ"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Key Skills (comma separated)</label>
            <input 
              type="text" 
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg p-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 outline-none transition-all"
              value={skillsInput}
              onChange={(e) => setSkillsInput(e.target.value)}
              placeholder="Cloud Computing, AI, Python"
            />
          </div>
          
          <div className="pt-4 flex gap-3 justify-end">
            <button 
              type="button" 
              onClick={onClose}
              className="px-4 py-2 text-slate-600 dark:text-slate-400 font-medium hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg shadow-lg shadow-teal-500/20 flex items-center gap-2 transition-all transform active:scale-95"
            >
              <Save size={18} />
              Save Certificate
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCertificateModal;