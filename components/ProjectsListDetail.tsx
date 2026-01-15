
import React, { useState } from 'react';
import { ProjectsSection } from './ProjectsSection';
import { Layers, Watch, Smartphone, Glasses, Layout, Grid } from 'lucide-react';

interface Props {
  onSelectProject: (id: string) => void;
}

const categoryConfig: Record<string, { 
  title: string; 
  subtitle: string; 
  desc: string; 
  bgClass: string;
  icon: React.ReactNode;
}> = {
  '全部': {
    title: '精选设计案例',
    subtitle: 'Selected Works',
    desc: '这里收录了我近年来在智能硬件、AIoT 及移动端领域的代表性作品。每一个像素都经过精心打磨。',
    bgClass: 'bg-white',
    icon: <Grid size={24} />
  },
  '智能穿戴': {
    title: '智能穿戴与微交互',
    subtitle: 'Smart Wearables',
    desc: '从 1.4 英寸的圆形视界到无感佩戴的智能指环，探索受限空间内的高效信息架构与极致视觉美学。',
    bgClass: 'bg-orange-50',
    icon: <Watch size={24} className="text-orange-600" />
  },
  '移动应用': {
    title: '移动端体验设计',
    subtitle: 'Mobile Experiences',
    desc: '打造符合直觉的 iOS 与 Android 应用。关注手指触控的舒适区、流畅的转场动效以及深度的硬件联动体验。',
    bgClass: 'bg-blue-50',
    icon: <Smartphone size={24} className="text-blue-600" />
  },
  'AR/VR': {
    title: '空间计算与增强现实',
    subtitle: 'Spatial Computing',
    desc: '打破屏幕边界，在三维空间中构建下一代人机交互范式。融合手势追踪、眼动控制与沉浸式 UI。',
    bgClass: 'bg-purple-50',
    icon: <Glasses size={24} className="text-purple-600" />
  },
  'Web 设计': {
    title: '沉浸式 Web 界面',
    subtitle: 'Web Interface',
    desc: '响应式布局与现代化 Web 技术的完美结合。从企业级 SaaS 后台到极具视觉冲击力的品牌官网。',
    bgClass: 'bg-emerald-50',
    icon: <Layout size={24} className="text-emerald-600" />
  }
};

export const ProjectsListDetail: React.FC<Props> = ({ onSelectProject }) => {
  const [filter, setFilter] = useState('全部');
  const activeConfig = categoryConfig[filter] || categoryConfig['全部'];

  return (
    <div className={`animate-in fade-in slide-in-from-bottom-8 duration-700 py-20 min-h-screen transition-colors duration-500 ${activeConfig.bgClass}`}>
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Dynamic Page Header */}
          <div className="text-center space-y-8 py-10">
             <div className="inline-flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow-sm border border-gray-100">
                {activeConfig.icon}
                <span className="text-xs font-bold text-gray-900 uppercase tracking-widest">{activeConfig.subtitle}</span>
             </div>
             <h2 className="text-5xl lg:text-7xl font-black text-gray-900 leading-tight">
               {activeConfig.title.split(' ').map((word, i) => (
                 <span key={i} className={i === 1 ? 'text-purple-brand italic block sm:inline sm:ml-4' : ''}>{word}</span>
               ))}
             </h2>
             <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
               {activeConfig.desc}
             </p>
          </div>

          {/* Filter Navigation */}
          <div className="sticky top-24 z-30 bg-white/80 backdrop-blur-md p-2 rounded-full border border-gray-200 shadow-sm mx-auto w-fit flex flex-wrap justify-center gap-2">
             {['全部', '智能穿戴', '移动应用', 'AR/VR', 'Web 设计'].map((f) => (
                <button 
                  key={f} 
                  onClick={() => setFilter(f)}
                  className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${filter === f ? 'bg-black text-white shadow-md' : 'text-gray-500 hover:bg-gray-100'}`}
                >
                  {f}
                </button>
             ))}
          </div>

          {/* Project Grid with Filter */}
          <ProjectsSection onSelectProject={onSelectProject} categoryFilter={filter} />
          
          {/* Footer Note */}
          <div className="text-center pt-20 border-t border-black/5">
             <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-4">More works on social media</p>
             <div className="flex justify-center gap-6 opacity-50">
                <span>Dribbble</span>
                <span>Behance</span>
                <span>Instagram</span>
             </div>
          </div>
       </div>
    </div>
  );
};
