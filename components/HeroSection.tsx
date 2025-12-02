import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { SKILL_DATA, PERSONAL_INFO } from '../constants';
import { Terminal, Cpu } from 'lucide-react';

const HeroSection: React.FC = () => {
  return (
    <section className="mb-16">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 p-8 md:p-12 relative overflow-hidden transition-colors duration-300">
        <div className="absolute top-0 right-0 w-64 h-64 bg-teal-50 dark:bg-teal-900/20 rounded-full -mr-32 -mt-32 opacity-50 blur-3xl"></div>
        
        <div className="relative z-10">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-block py-1 px-3 rounded-full bg-teal-100 dark:bg-teal-900/50 text-teal-700 dark:text-teal-300 text-xs font-semibold tracking-wide uppercase">
              Available for Opportunities
            </span>
            <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 font-mono bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded">
                <Terminal size={12} />
                <span>agent_status: active</span>
            </div>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
            Bridging Data & <span className="text-teal-600 dark:text-teal-400">Intelligence</span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 max-w-2xl leading-relaxed">
            {PERSONAL_INFO.summary}
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
            {/* Chart Area */}
            <div>
               <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                 Technical Proficiency
               </h3>
               <div className="h-64 w-full bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 border border-slate-100 dark:border-slate-700">
                 <ResponsiveContainer width="100%" height="100%">
                   <BarChart
                     data={SKILL_DATA}
                     layout="vertical"
                     margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
                   >
                     <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#e2e8f0" strokeOpacity={0.2} />
                     <XAxis type="number" hide />
                     <YAxis 
                        dataKey="name" 
                        type="category" 
                        width={100} 
                        tick={{fontSize: 12, fill: '#64748b'}} 
                        tickLine={false}
                        axisLine={false}
                     />
                     <Tooltip 
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', backgroundColor: '#1e293b', color: '#fff' }}
                        itemStyle={{ color: '#fff' }}
                        cursor={{fill: 'transparent'}}
                     />
                     <Bar 
                        dataKey="value" 
                        radius={[0, 4, 4, 0]} 
                        barSize={20}
                        isAnimationActive={true}
                        animationBegin={200}
                        animationDuration={1500}
                        animationEasing="ease-out"
                     >
                        {SKILL_DATA.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={['#0d9488', '#0f766e', '#115e59', '#134e4a', '#14b8a6'][index % 5]} />
                        ))}
                     </Bar>
                   </BarChart>
                 </ResponsiveContainer>
               </div>
            </div>
            
            {/* Terminal / Info Cards */}
            <div className="flex flex-col justify-center space-y-4">
                <div className="p-6 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-700 group hover:border-teal-200 dark:hover:border-teal-800 transition-colors">
                    <h4 className="font-bold text-slate-800 dark:text-white flex items-center gap-2">
                        <Cpu size={18} className="text-teal-600"/>
                        Agentic AI & GenAI
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">Specializing in building autonomous agents and leveraging LLMs for complex problem solving.</p>
                </div>
                
                {/* Mini Terminal Effect */}
                <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 font-mono text-xs shadow-inner">
                    <div className="flex gap-1.5 mb-3">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                    </div>
                    <div className="space-y-1 text-slate-300">
                        <p><span className="text-green-400">➜</span> <span className="text-blue-400">~</span> initializing_portfolio_v2.0</p>
                        <p><span className="text-green-400">➜</span> <span className="text-blue-400">~</span> loading_modules: [ 'Python', 'AWS', 'Salesforce' ]</p>
                        <p className="text-teal-400 animate-pulse">_ Ready to build the future</p>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;