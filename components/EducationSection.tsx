import React from 'react';
import { EDUCATION } from '../constants';
import { GraduationCap, Calendar } from 'lucide-react';

const EducationSection: React.FC = () => {
  return (
    <section className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-8 mb-12 transition-colors duration-300">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-8 flex items-center gap-3">
            <div className="p-2 bg-teal-100 dark:bg-teal-900/30 rounded-lg text-teal-600 dark:text-teal-400">
                <GraduationCap size={24} />
            </div>
            Education & Learning
        </h2>

        <div className="space-y-8 relative before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-100 dark:before:bg-slate-700">
            {EDUCATION.map((edu, idx) => (
                <div key={idx} className="relative pl-12">
                    <div className="absolute left-0 top-1 w-10 h-10 bg-white dark:bg-slate-800 rounded-full border-2 border-teal-100 dark:border-teal-900 flex items-center justify-center z-10">
                        <div className="w-3 h-3 bg-teal-500 rounded-full"></div>
                    </div>
                    
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">{edu.institution}</h3>
                    <p className="text-slate-600 dark:text-slate-400 font-medium mb-1">{edu.degree}</p>
                    <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500 text-sm">
                        <Calendar size={14} />
                        {edu.period}
                    </div>
                </div>
            ))}
        </div>
    </section>
  );
};

export default EducationSection;