
import React from 'react';
import { ArrowRight, Download, MousePointer2, Layers, Figma, PenTool, LayoutTemplate } from 'lucide-react';

interface HeroProps {
  onInquiry?: () => void;
  onViewProjects?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onInquiry, onViewProjects }) => {
  return (
    <section id="hero" className="relative min-h-[90vh] flex items-center bg-[#FAFAFA] overflow-hidden pt-20">
      
      {/* Dynamic Background */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-purple-brand/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/3"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none translate-y-1/3 -translate-x-1/4"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Text Content */}
          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="inline-flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-full shadow-sm hover:shadow-md transition-shadow cursor-default">
               <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
               <span className="text-xs font-bold text-gray-600 uppercase tracking-wider">Open to Work · 2025</span>
            </div>
            
            <div className="space-y-6">
                <h1 className="text-6xl lg:text-8xl font-black leading-[1.05] tracking-tighter text-gray-900">
                  Designing <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">Future</span>
                  <span className="block text-gray-900">Interfaces.</span>
                </h1>
                <p className="text-xl text-gray-500 max-w-lg leading-relaxed font-medium">
                  我是 <b>Xinng</b>，一名追求极致体验的 UI/UX 设计师。
                  <br className="hidden md:block" />
                  我不仅设计像素，更构建连接人与数字世界的桥梁。
                </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <button 
                onClick={onViewProjects}
                className="group bg-gray-900 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-black transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 flex items-center gap-3 active:scale-95"
              >
                浏览作品
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={onInquiry}
                className="bg-white text-black border border-gray-200 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-gray-50 transition-all flex items-center gap-3 hover:border-gray-300 active:scale-95"
              >
                预约咨询
                <MousePointer2 size={20} className="text-purple-brand" />
              </button>
            </div>

            <div className="pt-8 flex items-center gap-8 text-gray-400">
                <div className="flex items-center gap-2">
                    <LayoutTemplate size={20} />
                    <span className="text-xs font-bold uppercase tracking-widest">UI/UX</span>
                </div>
                <div className="flex items-center gap-2">
                    <Layers size={20} />
                    <span className="text-xs font-bold uppercase tracking-widest">Design System</span>
                </div>
                <div className="flex items-center gap-2">
                    <PenTool size={20} />
                    <span className="text-xs font-bold uppercase tracking-widest">Branding</span>
                </div>
            </div>
          </div>
          
          {/* Right: Visual Abstract Composition */}
          <div className="relative h-[600px] hidden lg:flex items-center justify-center animate-in fade-in zoom-in duration-1000 delay-200">
             {/* Main Portrait Card */}
             <div className="relative w-[380px] h-[500px] bg-gray-200 rounded-[2.5rem] overflow-hidden shadow-2xl rotate-[-3deg] hover:rotate-0 transition-transform duration-700 z-20 border-[8px] border-white">
                <img 
                  src="https://i.ibb.co/qFgsRVKP/image.png" 
                  className="w-full h-full object-cover"
                  alt="Portrait"
                />
                {/* Glassmorphism Overlay Label */}
                <div className="absolute bottom-6 left-6 right-6 bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-white/40 shadow-lg">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-sm font-black text-gray-900">Xinng</p>
                            <p className="text-xs text-gray-500 font-bold">Product Designer</p>
                        </div>
                        <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white">
                            <ArrowRight size={14} className="-rotate-45" />
                        </div>
                    </div>
                </div>
             </div>

             {/* Floating UI Elements (Parallax feel) */}
             <div className="absolute top-20 right-10 bg-white p-4 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.1)] rotate-6 z-30 animate-bounce-slow">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600">
                        <Figma size={20} />
                    </div>
                    <div>
                        <p className="text-xs text-gray-400 font-bold uppercase">Software</p>
                        <p className="text-sm font-bold">Figma Expert</p>
                    </div>
                </div>
             </div>

             <div className="absolute bottom-32 left-0 bg-white p-4 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.1)] -rotate-6 z-30 animate-bounce-slow delay-700">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center text-green-600">
                        <Layers size={20} />
                    </div>
                    <div>
                        <p className="text-xs text-gray-400 font-bold uppercase">Experience</p>
                        <p className="text-sm font-bold">5 Years+</p>
                    </div>
                </div>
             </div>

             {/* Background Shape */}
             <div className="absolute inset-0 bg-gradient-to-tr from-gray-100 to-white rounded-[3rem] -z-10 transform scale-90 border border-gray-200/50"></div>
          </div>

        </div>
      </div>
    </section>
  );
};
