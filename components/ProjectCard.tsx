import React from 'react';
import { Project } from '../types';
import { Code, ArrowUpRight, Trash2, Edit2 } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  isEditing?: boolean;
  onEdit?: (project: Project) => void;
  onDelete?: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, isEditing, onEdit, onDelete }) => {
  return (
    <div className="group bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-6 hover:shadow-xl transition-all duration-300 hover:border-teal-200 dark:hover:border-teal-800 relative overflow-hidden hover:-translate-y-2 flex flex-col h-full">
      
      {/* Top Decoration */}
      <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <ArrowUpRight size={20} className="text-teal-500" />
      </div>

      {/* Edit Mode Controls */}
      {isEditing && (
        <div className="absolute top-2 right-2 flex gap-2 z-20 bg-white dark:bg-slate-800 p-1 rounded-lg shadow-sm border border-gray-200 dark:border-slate-700">
           <button 
              onClick={(e) => { e.stopPropagation(); onEdit && onEdit(project); }}
              className="p-1.5 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded transition-colors"
              title="Edit Project"
           >
              <Edit2 size={16} />
           </button>
           <button 
              onClick={(e) => { e.stopPropagation(); onDelete && onDelete(); }}
              className="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded transition-colors"
              title="Delete Project"
           >
              <Trash2 size={16} />
           </button>
        </div>
      )}

      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-teal-50 dark:bg-teal-900/30 rounded-lg text-teal-600 dark:text-teal-400 group-hover:bg-teal-600 group-hover:text-white transition-colors">
            <Code size={24} />
        </div>
        <span className="text-xs font-semibold px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded uppercase tracking-wider">
            {project.category}
        </span>
      </div>
      
      <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2 group-hover:text-teal-700 dark:group-hover:text-teal-400 transition-colors pr-8">
        {project.title}
      </h3>
      
      <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6 flex-grow">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-6">
        {project.tech.map((tech, idx) => (
          <span key={idx} className="px-2 py-1 bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 text-xs font-medium rounded border border-slate-200 dark:border-slate-700">
            {tech}
          </span>
        ))}
      </div>

      <button className="w-full py-2.5 rounded-lg bg-slate-100 dark:bg-slate-700/50 text-slate-600 dark:text-slate-400 font-medium text-sm group-hover:bg-teal-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-teal-500/20 transition-all duration-300 flex items-center justify-center gap-2">
        View Project <ArrowUpRight size={16} />
      </button>
    </div>
  );
};

export default ProjectCard;