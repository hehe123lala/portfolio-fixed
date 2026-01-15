
import React from 'react';
import { Project } from '../types';
import { Layers } from 'lucide-react';

const projects: Project[] = [
  {
    id: 'watch',
    title: 'GT-Pro 智能手表全场景 UI',
    category: '智能硬件 / 穿戴设计',
    description: '涵盖20款原创表盘、运动健康监控、多维度数据可视化设计。',
    thumbnail: 'https://i.ibb.co/YBMJHV74/20260113103231-16399-11.png'
  },
  {
    id: 'health_ring',
    title: 'Oura-X 智能健康指环',
    category: '智能硬件 / 穿戴设计',
    description: '无感佩戴设备的配套 App 设计，专注于睡眠质量深度分析与恢复指数可视化。',
    thumbnail: 'https://i.ibb.co/TBND8F0c/image.png'
  },
  {
    id: 'earphone',
    title: 'Acoustic Connect 耳机伴侣',
    category: '移动应用 / 设备控制',
    description: '适配真无线耳机的智能控制中心，包含降噪管理、均衡器调节及固件升级。',
    thumbnail: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'smart_home',
    title: 'Lumiere 智能家居中控',
    category: '移动应用 / IoT',
    description: '全屋智能灯光与环境控制系统，采用拟物化光影交互，支持场景自动化配置。',
    thumbnail: 'https://i.ibb.co/LXQ3rbvn/image.png'
  },
  {
    id: 'glasses',
    title: 'VisionAir 智能 AR 眼镜',
    category: 'AR 交互 / 智能硬件',
    description: '探索增强现实下的轻量化 OS 交互，包含实时翻译、AR 导航及空间可视化界面设计。',
    thumbnail: 'https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'drone_control',
    title: 'SkyLink 专业无人机飞控',
    category: '智能硬件 / 飞行控制',
    description: '面向专业航拍的无人机地面站系统，集成 FPV 图传、高精度遥测与智能运镜辅助。',
    thumbnail: 'https://images.unsplash.com/photo-1506947411487-a56738267384?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'saas_dashboard',
    title: 'Nexus 数据分析后台',
    category: 'Web 设计 / B端产品',
    description: '面向企业级的复杂数据可视化看板，模块化组件库设计，提升运营决策效率。',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'ev_hmi',
    title: 'FutureFlow 智能座舱系统',
    category: '车联网 / HMI',
    description: '专为新能源汽车打造的沉浸式中控交互系统，融合 3D 导航与多屏联动体验。',
    thumbnail: 'https://images.unsplash.com/photo-1542282088-fe8426682b8f?auto=format&fit=crop&q=80&w=800'
  }
];

interface Props {
  onSelectProject: (id: string) => void;
  categoryFilter?: string;
}

export const ProjectsSection: React.FC<Props> = ({ onSelectProject, categoryFilter }) => {
  const filteredProjects = categoryFilter && categoryFilter !== '全部'
    ? projects.filter(p => {
        if (categoryFilter === '智能穿戴') return p.category.includes('穿戴');
        if (categoryFilter === '移动应用') return p.category.includes('移动应用');
        if (categoryFilter === 'AR/VR') return p.category.includes('AR') || p.category.includes('VR');
        if (categoryFilter === 'Web 设计') return p.category.includes('Web') || p.category.includes('B端');
        return true;
    })
    : projects;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {filteredProjects.map((project) => (
        <div 
          key={project.id} 
          className="group cursor-pointer rounded-3xl overflow-hidden bg-white shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100"
          onClick={() => onSelectProject(project.id)}
        >
          <div className="relative aspect-[4/3] overflow-hidden">
            <img 
              src={project.thumbnail} 
              alt={project.title} 
              className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
            
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-gray-800 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
               View Case Study
            </div>
          </div>
          
          <div className="p-8 space-y-3">
            <div className="flex justify-between items-start">
               <div>
                  <p className="text-xs font-bold text-purple-brand uppercase tracking-widest mb-2">{project.category}</p>
                  <h3 className="text-2xl font-bold text-gray-900 group-hover:text-purple-brand transition-colors">{project.title}</h3>
               </div>
               <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-purple-brand group-hover:text-white transition-all duration-300">
                  <Layers size={18} />
               </div>
            </div>
            <p className="text-gray-500 leading-relaxed text-sm">
              {project.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
