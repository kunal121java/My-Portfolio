import React, { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';
import { Project } from '../types';

interface AddProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (project: Project) => void;
  initialData?: Project | null;
}

const AddProjectModal: React.FC<AddProjectModalProps> = ({ isOpen, onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState<Project>({
    title: '',
    description: '',
    tech: [],
    category: 'Web Dev'
  });
  const [techInput, setTechInput] = useState('');

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
      setTechInput(initialData.tech.join(', '));
    } else {
      setFormData({
        title: '',
        description: '',
        tech: [],
        category: 'Web Dev'
      });
      setTechInput('');
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const techArray = techInput.split(',').map(t => t.trim()).filter(t => t.length > 0);
    onSave({ ...formData, tech: techArray });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl w-full max-w-lg border border-slate-200 dark:border-slate-700 flex flex-col max-h-[90vh]">
        
        <div className="p-6 border-b border-gray-100 dark:border-slate-800 flex justify-between items-center">
          <h2 className="text-xl font-bold text-slate-800 dark:text-white">
            {initialData ? 'Edit Project' : 'Add New Project'}
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Project Title</label>
            <input 
              required
              type="text" 
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg p-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 outline-none transition-all"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              placeholder="e.g. AI Customer Support Bot"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Category</label>
            <select 
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg p-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 outline-none transition-all"
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
            >
              <option value="ML/AI">ML/AI</option>
              <option value="Web Dev">Web Dev</option>
              <option value="Cloud">Cloud</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Description</label>
            <textarea 
              required
              rows={4}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg p-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 outline-none transition-all resize-none"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Describe the key features and impact..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Tech Stack (comma separated)</label>
            <input 
              type="text" 
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg p-2.5 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 outline-none transition-all"
              value={techInput}
              onChange={(e) => setTechInput(e.target.value)}
              placeholder="Python, React, AWS, Docker"
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
              Save Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProjectModal;