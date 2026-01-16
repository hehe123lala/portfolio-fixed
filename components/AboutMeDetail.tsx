
import React from 'react';
import { User, Award, Briefcase, GraduationCap, Code2, PenTool, Layout, Layers, MapPin, Mail, Github, Twitter, Linkedin, Globe } from 'lucide-react';

export const AboutMeDetail: React.FC = () => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 space-y-20 pb-20">
      
      {/* Intro Header */}
      <section className="text-center max-w-3xl mx-auto space-y-6 pt-10">
         <h2 className="text-4xl lg:text-6xl font-black text-gray-900 tracking-tight">
            关于 <span className="text-purple-brand">我</span>
         </h2>
         <p className="text-xl text-gray-500 leading-relaxed">
            我不只是画图，更在解决问题。
            <br/>
            拥有 5 年以上 B 端与 C 端产品设计经验，致力于通过设计驱动业务增长。
         </p>
      </section>

      {/* Bento Grid Layout */}
      <section className="max-w-6xl mx-auto px-4">
         <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[minmax(180px,auto)]">
            
            {/* 1. Large Profile Card (2x2) */}
            <div className="md:col-span-2 md:row-span-2 bg-gray-900 rounded-[2.5rem] p-8 text-white flex flex-col justify-between relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600 rounded-full blur-[80px] opacity-50 group-hover:opacity-70 transition-opacity"></div>
               <div className="relative z-10">
                  <div className="w-20 h-20 bg-white rounded-full overflow-hidden border-4 border-white/20 mb-6">
                     <img src="https://i.ibb.co/qFgsRVKP/image.png" className="w-full h-full object-cover" />
                  </div>
                  <h3 className="text-3xl font-bold mb-2">Xinng</h3>
                  <p className="text-gray-400 text-lg">Product Manager & Designer</p>
                  <p className="text-gray-500 text-sm mt-4 leading-relaxed max-w-sm">
                     专注于智能硬件与复杂系统设计。善于在美学与功能之间寻找完美的平衡点。
                  </p>
               </div>
               <div className="relative z-10 flex gap-4 mt-8">
                  <a href="#" className="p-3 bg-white/10 rounded-full hover:bg-white hover:text-black transition-all"><Mail size={20}/></a>
                  <a href="#" className="p-3 bg-white/10 rounded-full hover:bg-white hover:text-black transition-all"><Linkedin size={20}/></a>
                  <a href="#" className="p-3 bg-white/10 rounded-full hover:bg-white hover:text-black transition-all"><Twitter size={20}/></a>
               </div>
            </div>

            {/* 2. Map/Location Card */}
            <div className="md:col-span-1 bg-white border border-gray-100 shadow-sm rounded-[2.5rem] p-6 flex flex-col items-center justify-center text-center relative overflow-hidden group hover:shadow-xl transition-all">
               <div className="absolute inset-0 bg-blue-50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
               <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4 relative z-10">
                  <MapPin size={32} />
               </div>
               <h4 className="font-bold text-lg relative z-10">Shenzhen</h4>
               <p className="text-xs text-gray-500 font-bold uppercase relative z-10">China</p>
            </div>

            {/* 3. Experience Stat */}
            <div className="md:col-span-1 bg-black text-white rounded-[2.5rem] p-6 flex flex-col items-center justify-center text-center group hover:scale-[1.02] transition-transform">
               <div className="text-6xl font-black bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500">7+</div>
               <p className="text-sm font-bold text-gray-400 mt-2 uppercase tracking-widest">Years Exp.</p>
            </div>

            {/* 4. Tech Stack (2x1) */}
            <div className="md:col-span-2 bg-white border border-gray-100 shadow-sm rounded-[2.5rem] p-8 flex flex-col justify-center">
               <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">常用工具 (Tools)</h4>
               <div className="flex flex-wrap gap-4">
                  {['Figma', 'After Effects', 'AI', 'Sketch', 'Axure', 'Photoshop'].map(tool => (
                     <span key={tool} className="px-4 py-2 bg-gray-100 rounded-xl text-sm font-bold text-gray-700 hover:bg-black hover:text-white transition-colors cursor-default">
                        {tool}
                     </span>
                  ))}
               </div>
            </div>

            {/* 5. Services Card */}
            <div className="md:col-span-2 bg-purple-brand text-white rounded-[2.5rem] p-8 relative overflow-hidden group">
               <div className="absolute right-0 top-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-110 duration-700">
                  <PenTool size={120} />
               </div>
               <h4 className="text-2xl font-bold mb-6">核心能力</h4>
               <div className="grid grid-cols-2 gap-4 relative z-10">
                  <div className="flex items-center gap-3">
                     <Layout size={20} className="text-purple-200"/>
                     <span className="font-medium">Product Strategy</span>
                  </div>
                  <div className="flex items-center gap-3">
                     <Layers size={20} className="text-purple-200"/>
                     <span className="font-medium">Design System</span>
                  </div>
                  <div className="flex items-center gap-3">
                     <Code2 size={20} className="text-purple-200"/>
                     <span className="font-medium">Frontend Dev</span>
                  </div>
                  <div className="flex items-center gap-3">
                     <Globe size={20} className="text-purple-200"/>
                     <span className="font-medium">Web Design</span>
                  </div>
               </div>
            </div>

         </div>
      </section>

      {/* Career Timeline */}
      <section className="max-w-4xl mx-auto px-4 pt-10">
         <h3 className="text-2xl font-bold mb-12 flex items-center gap-3">
            <Briefcase className="text-purple-brand" />
            工作经历
         </h3>
         <div className="space-y-12 relative before:absolute before:left-[27px] md:before:left-[27px] before:top-4 before:bottom-4 before:w-0.5 before:bg-gray-100">
            {[
               { 
                 role: 'Product Manager', 
                 company: 'NextGen Hardware', 
                 time: '2023 - Present', 
                 achievements: [
                   '负责智能穿戴产品线（智能手表、TWS耳机、AR眼镜）的全生命周期管理，制定产品路线图与核心规格定义。',
                   '领导跨职能团队（设计、研发）成功发布 GT-Pro 智能手表与 VisionAir 智能眼镜，单品销量突破 50 万台。',
                   '基于市场洞察推出“AI 自适应降噪”与“多维健康监测”等核心功能，显著提升了产品的市场竞争力与用户满意度。'
                 ]
               },
               { 
                 role: 'Senior Product Designer', 
                 company: 'Smart Wearable Lab', 
                 time: '2021 - 2023', 
                 achievements: [
                   '主导 GT 系列智能手表 OS 3.0 的交互改版，重构信息架构，使用户常用功能触达效率提升 40%。',
                   '建立并维护 "Neon-Dark" 设计系统，统一了 5 条产品线的视觉语言，开发还原度提升至 98%。',
                   '指导 3 名初级设计师，通过定期的 Design Review 提升团队整体设计产出质量。'
                 ]
               },
               { 
                 role: 'UI/UX Designer', 
                 company: 'Tech Giant Corp', 
                 time: '2019 - 2021', 
                 achievements: [
                   '负责 IoT 智能家居核心 App 的改版设计，将 50+ 种智能设备接入统一的控制面板。',
                   '与产品经理协作推出“智能场景”自动化功能，推动日活跃用户 (DAU) 增长 15%。',
                   '制作高保真交互原型进行可用性测试，根据用户反馈优化了设备配网流程，成功率提升 25%。'
                 ]
               },
               { 
                 role: 'Visual Designer', 
                 company: 'Creative Studio', 
                 time: '2017 - 2019', 
                 achievements: [
                   '专注于智能手表表盘设计，主导绘制了 100+ 款原创表盘，涵盖机械仿真、数字运动等多种风格，深受用户喜爱。',
                   '负责早期智能穿戴 OS 的视觉界面探索，在 1.4 英寸圆形视界内重构了信息布局，显著提升了小屏交互体验。',
                   '深入研究 OLED 屏幕特性，通过纯黑背景与高对比度色彩策略，实现了视觉美感与低功耗续航的完美平衡。'
                 ]
               },
            ].map((job, i) => (
               <div key={i} className="relative pl-16 group">
                  <div className="absolute left-[18px] top-1.5 w-5 h-5 bg-white border-4 border-purple-brand rounded-full group-hover:scale-125 transition-transform shadow-sm z-10"></div>
                  <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300">
                     <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                        <div>
                            <h4 className="text-xl font-black text-gray-900">{job.role}</h4>
                            <p className="text-sm font-bold text-purple-brand mt-1">{job.company}</p>
                        </div>
                        <span className="text-xs font-bold text-gray-500 bg-gray-50 px-4 py-2 rounded-full w-fit mt-3 md:mt-0 border border-gray-100">{job.time}</span>
                     </div>
                     <ul className="space-y-3">
                        {job.achievements.map((item, idx) => (
                            <li key={idx} className="text-gray-600 text-sm leading-relaxed flex items-start gap-3">
                                <span className="w-1.5 h-1.5 bg-gray-300 rounded-full mt-2 flex-shrink-0"></span>
                                {item}
                            </li>
                        ))}
                     </ul>
                  </div>
               </div>
            ))}
         </div>
      </section>

    </div>
  );
};
