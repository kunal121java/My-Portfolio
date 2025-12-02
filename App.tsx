import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import HeroSection from './components/HeroSection';
import ProjectCard from './components/ProjectCard';
import EducationSection from './components/EducationSection';
import CertificatesSection from './components/CertificatesSection';
import ChatWidget from './components/ChatWidget';
import AddProjectModal from './components/AddProjectModal';
import AddCertificateModal from './components/AddCertificateModal';
import { PROJECTS, SKILLS, CERTIFICATES } from './constants';
import { Project, SkillCategory, Certificate } from './types';
import { Layout, Database, Cloud, Moon, Sun, Settings, Plus, X, Trash2 } from 'lucide-react';

const App: React.FC = () => {
  // Initialize dark mode
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) return savedTheme === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Data State with LocalStorage Persistence
  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem('portfolio_projects');
    return saved ? JSON.parse(saved) : PROJECTS;
  });

  const [skills, setSkills] = useState<SkillCategory[]>(() => {
    const saved = localStorage.getItem('portfolio_skills');
    return saved ? JSON.parse(saved) : SKILLS;
  });

  const [certificates, setCertificates] = useState<Certificate[]>(() => {
    const saved = localStorage.getItem('portfolio_certificates');
    return saved ? JSON.parse(saved) : CERTIFICATES;
  });

  // UI State
  const [filter, setFilter] = useState('All');
  const [isEditing, setIsEditing] = useState(false);
  
  // Modals
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const [isCertModalOpen, setIsCertModalOpen] = useState(false);
  const [editingCert, setEditingCert] = useState<Certificate | null>(null);

  // Skill Input State (temporary storage for the new skill input fields)
  const [newSkillInputs, setNewSkillInputs] = useState<{[key: string]: string}>({});

  // --- Effects ---

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('portfolio_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('portfolio_skills', JSON.stringify(skills));
  }, [skills]);

  useEffect(() => {
    localStorage.setItem('portfolio_certificates', JSON.stringify(certificates));
  }, [certificates]);

  // --- Handlers ---

  const toggleTheme = () => setDarkMode(!darkMode);

  // Project Handlers
  const handleSaveProject = (projectData: Project) => {
    if (editingProject) {
      // Edit existing
      setProjects(prev => prev.map(p => 
        (p.title === editingProject.title) ? projectData : p
      ));
    } else {
      // Add new
      setProjects(prev => [projectData, ...prev]);
    }
    setEditingProject(null);
  };

  const handleDeleteProject = (indexToDelete: number) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      setProjects(prev => prev.filter((_, idx) => idx !== indexToDelete));
    }
  };

  const openAddProjectModal = () => {
    setEditingProject(null);
    setIsProjectModalOpen(true);
  };

  const openEditProjectModal = (project: Project) => {
    setEditingProject(project);
    setIsProjectModalOpen(true);
  };

  // Certificate Handlers
  const handleSaveCertificate = (certData: Certificate) => {
    if (editingCert) {
      // Edit existing (matching by title for demo simplicity, ideally use ID)
      setCertificates(prev => prev.map(c => 
        (c.title === editingCert.title) ? certData : c
      ));
    } else {
      // Add new
      setCertificates(prev => [certData, ...prev]);
    }
    setEditingCert(null);
  }

  const handleDeleteCertificate = (indexToDelete: number) => {
    if (window.confirm('Are you sure you want to delete this certificate?')) {
      setCertificates(prev => prev.filter((_, idx) => idx !== indexToDelete));
    }
  }

  const openAddCertModal = () => {
    setEditingCert(null);
    setIsCertModalOpen(true);
  }

  const openEditCertModal = (cert: Certificate) => {
    setEditingCert(cert);
    setIsCertModalOpen(true);
  }


  // Skill Handlers
  const handleAddSkill = (categoryIdx: number) => {
    const catName = skills[categoryIdx].name;
    const value = newSkillInputs[catName];
    if (!value || !value.trim()) return;

    const newSkills = [...skills];
    newSkills[categoryIdx].skills.push(value.trim());
    setSkills(newSkills);
    
    setNewSkillInputs(prev => ({...prev, [catName]: ''}));
  };

  const handleDeleteSkill = (categoryIdx: number, skillToDelete: string) => {
    const newSkills = [...skills];
    newSkills[categoryIdx].skills = newSkills[categoryIdx].skills.filter(s => s !== skillToDelete);
    setSkills(newSkills);
  };

  // --- Render Helpers ---

  const categories = ['All', ...Array.from(new Set(projects.map(p => p.category)))];

  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 flex flex-col md:flex-row transition-colors duration-300 text-slate-900 dark:text-slate-100">
      
      <Sidebar />

      <main className="flex-1 md:ml-80 p-6 md:p-12 lg:p-16 max-w-6xl mx-auto relative">
        
        {/* Header Controls */}
        <div className="absolute top-6 right-6 flex gap-3 z-20">
            {/* Edit Mode Toggle */}
            <button 
                onClick={() => setIsEditing(!isEditing)}
                className={`p-2 rounded-full shadow-md border transition-all ${isEditing ? 'bg-teal-500 text-white border-teal-600' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-gray-200 dark:border-slate-700 hover:text-teal-600'}`}
                title={isEditing ? "Done Editing" : "Edit Portfolio"}
            >
                <Settings size={20} className={isEditing ? "animate-spin-slow" : ""} />
            </button>

            {/* Dark Mode Toggle */}
            <button 
                onClick={toggleTheme}
                className="p-2 rounded-full bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 shadow-md border border-gray-200 dark:border-slate-700 hover:text-teal-600 dark:hover:text-teal-400 hover:shadow-lg transition-all"
                title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
        </div>

        <HeroSection />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column (Main Content) */}
            <div className="lg:col-span-2 space-y-12">
                
                {/* Projects Section */}
                <section>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                      <h2 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-3">
                          <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg text-indigo-600 dark:text-indigo-400">
                              <Layout size={24} />
                          </div>
                          Featured Projects
                      </h2>

                      <div className="flex gap-2 p-1 bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 overflow-x-auto max-w-full no-scrollbar">
                        {categories.map(cat => (
                          <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                              filter === cat 
                                ? 'bg-slate-800 dark:bg-teal-600 text-white shadow-sm' 
                                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
                            }`}
                          >
                            {cat}
                          </button>
                        ))}
                      </div>
                    </div>

                    {isEditing && (
                        <button 
                            onClick={openAddProjectModal}
                            className="w-full mb-6 py-4 border-2 border-dashed border-teal-300 dark:border-teal-700 rounded-xl flex items-center justify-center gap-2 text-teal-600 dark:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-900/20 transition-all font-semibold"
                        >
                            <Plus size={20} /> Add New Project
                        </button>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {filteredProjects.map((project, idx) => (
                            <ProjectCard 
                                key={idx} 
                                project={project} 
                                isEditing={isEditing}
                                onEdit={openEditProjectModal}
                                onDelete={() => handleDeleteProject(idx)}
                            />
                        ))}
                        {filteredProjects.length === 0 && (
                          <div className="col-span-2 py-12 text-center text-slate-400 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl">
                            No projects found in this category.
                          </div>
                        )}
                    </div>
                </section>
                
                {/* Certificates Section */}
                <CertificatesSection 
                   certificates={certificates}
                   isEditing={isEditing}
                   onAdd={openAddCertModal}
                   onEdit={openEditCertModal}
                   onDelete={handleDeleteCertificate}
                />

                {/* Education Section */}
                <EducationSection />
            </div>

            {/* Right Column (Skills Details) */}
            <div className="lg:col-span-1 space-y-8">
                <section className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-6 sticky top-8 transition-colors duration-300">
                    <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
                        <Database size={20} className="text-teal-600 dark:text-teal-400"/>
                        Tech Stack
                    </h2>
                    
                    <div className="space-y-6">
                        {skills.map((category, idx) => (
                            <div key={idx} className="relative group/cat">
                                <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3 flex justify-between items-center">
                                    {category.name}
                                </h3>
                                
                                <div className="flex flex-wrap gap-2 mb-3">
                                    {category.skills.map((skill, sIdx) => (
                                        <span 
                                            key={sIdx} 
                                            className={`px-3 py-1.5 bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 text-sm rounded-lg border border-slate-100 dark:border-slate-700 transition-colors flex items-center gap-1 ${isEditing ? 'pr-1' : ''}`}
                                        >
                                            {skill}
                                            {isEditing && (
                                                <button 
                                                    onClick={() => handleDeleteSkill(idx, skill)}
                                                    className="p-0.5 text-slate-400 hover:text-red-500 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800"
                                                >
                                                    <X size={12} />
                                                </button>
                                            )}
                                        </span>
                                    ))}
                                </div>
                                
                                {isEditing && (
                                    <div className="flex gap-2">
                                        <input 
                                            type="text" 
                                            placeholder="Add skill..."
                                            className="flex-1 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded px-2 py-1 text-sm focus:outline-none focus:border-teal-500"
                                            value={newSkillInputs[category.name] || ''}
                                            onChange={(e) => setNewSkillInputs({...newSkillInputs, [category.name]: e.target.value})}
                                            onKeyDown={(e) => e.key === 'Enter' && handleAddSkill(idx)}
                                        />
                                        <button 
                                            onClick={() => handleAddSkill(idx)}
                                            className="bg-teal-500 text-white p-1 rounded hover:bg-teal-600"
                                        >
                                            <Plus size={16} />
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 pt-8 border-t border-gray-100 dark:border-slate-700">
                        <div className="p-4 bg-gradient-to-br from-slate-800 to-slate-900 dark:from-slate-900 dark:to-black rounded-xl text-white shadow-lg">
                            <div className="flex items-center gap-2 mb-2 text-teal-300">
                                <Cloud size={20} />
                                <span className="font-bold">Cloud Native</span>
                            </div>
                            <p className="text-sm text-slate-300 leading-relaxed">
                                Actively building and deploying solutions on AWS and leveraging Salesforce for enterprise-grade applications.
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
      </main>

      <ChatWidget />
      
      {/* Modals */}
      <AddProjectModal 
        isOpen={isProjectModalOpen}
        onClose={() => setIsProjectModalOpen(false)}
        onSave={handleSaveProject}
        initialData={editingProject}
      />

      <AddCertificateModal
        isOpen={isCertModalOpen}
        onClose={() => setIsCertModalOpen(false)}
        onSave={handleSaveCertificate}
        initialData={editingCert}
      />
    </div>
  );
};

export default App;