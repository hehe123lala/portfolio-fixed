
import React, { useState, useEffect } from 'react';
import {
  Monitor, Smartphone, Tablet, MousePointer2,
  Move, Type, Palette, Code2, ArrowRight,
  Layers, Zap, Sparkles, Eye, X, Globe,
  Layout, Grid, Box
} from 'lucide-react';

export const PortfolioWebDetail: React.FC = () => {
  const [activeDevice, setActiveDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  // Fake cursor movement simulation for the preview area
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorPos({
        x: Math.sin(Date.now() / 1000) * 100,
        y: Math.cos(Date.now() / 1000) * 50
      });
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 space-y-32 pb-20 bg-white text-black font-sans selection:bg-black selection:text-white">
      
      {/* 1. Hero Section: The Brand */}
      <section className="min-h-[90vh] flex flex-col justify-center items-center text-center relative overflow-hidden pt-20">
         {/* Abstract CSS Background - Simulating WebGL Fluid */}
         <div className="absolute inset-0 bg-[#FAFAFA] -z-20"></div>
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/5 rounded-full blur-[100px] animate-pulse-slow -z-10"></div>
         <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[80px] -z-10"></div>

         <div className="relative z-10 space-y-6 max-w-5xl px-4">
            <div className="inline-flex items-center gap-3 bg-black text-white px-5 py-2 rounded-full mb-4 hover:scale-105 transition-transform cursor-pointer">
               <Sparkles size={16} />
               <span className="text-xs font-bold uppercase tracking-[0.2em]">WebGL Template v2.0</span>
            </div>
            
            <h1 className="text-7xl md:text-9xl font-black tracking-tighter leading-none mix-blend-difference text-black mb-2">
               AESTHETIC
            </h1>
            <h2 className="text-3xl md:text-5xl font-serif italic font-light text-gray-400">
               为创意人士打造的作品集
            </h2>
            
            <p className="text-lg text-gray-500 max-w-xl mx-auto pt-8 leading-relaxed">
               专为设计师与创意开发者打造的 React + Three.js 模版。
               <br />
               融合流体动效、平滑滚动与极简主义排版，让作品成为主角。
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-8">
               <button className="bg-black text-white px-10 py-4 rounded-full font-bold text-sm hover:shadow-2xl hover:-translate-y-1 transition-all flex items-center gap-2 justify-center">
                  <Eye size={18} />
                  在线预览
               </button>
               <button className="bg-white text-black border border-gray-200 px-10 py-4 rounded-full font-bold text-sm hover:bg-gray-50 transition-all flex items-center gap-2 justify-center">
                  <Code2 size={18} />
                  开发文档
               </button>
            </div>
         </div>

         {/* Floating Elements */}
         <div className="absolute bottom-10 left-10 hidden lg:block">
            <div className="text-[10px] font-mono text-gray-400 text-left space-y-1">
               <p>REACT 18.0</p>
               <p>THREE.JS / FIBER</p>
               <p>TAILWIND CSS</p>
               <p>GSAP ANIMATION</p>
            </div>
         </div>
         <div className="absolute bottom-10 right-10 hidden lg:block">
            <Move size={24} className="text-gray-300 animate-bounce" />
         </div>
      </section>

      {/* 2. Interactive Browser Simulator */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8 -mt-20 relative z-20">
         <div className="bg-white rounded-t-2xl shadow-2xl border border-gray-200 overflow-hidden">
            {/* Browser Header */}
            <div className="h-12 bg-gray-50 border-b border-gray-200 flex items-center px-4 gap-4">
               <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
               </div>
               <div className="flex-1 bg-white h-8 rounded-md border border-gray-200 flex items-center justify-center text-xs font-mono text-gray-400">
                  aesthetic-portfolio.com/demo
               </div>
            </div>
            
            {/* Viewport Content */}
            <div className="relative aspect-[16/10] bg-white overflow-hidden group cursor-none" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
               
               {/* Simulated Content Layer */}
               <div className="absolute inset-0 p-8 md:p-16 grid grid-cols-12 gap-8 overflow-hidden">
                  <div className="col-span-12 mb-12">
                     <h3 className="text-4xl md:text-6xl font-serif font-light text-gray-900">精选作品 <span className="text-lg font-sans font-bold text-gray-300 align-top">('23-'24)</span></h3>
                  </div>
                  
                  {/* Grid Item 1 */}
                  <div className="col-span-5 relative mt-12 transform transition-transform duration-700 group-hover:-translate-y-4">
                     <div className="aspect-[3/4] bg-gray-100 overflow-hidden relative">
                        <img src="https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
                     </div>
                     <div className="mt-4 flex justify-between items-baseline border-b border-black pb-2">
                        <span className="text-xl font-bold">Noir</span>
                        <span className="text-xs font-mono text-gray-500">品牌设计</span>
                     </div>
                  </div>

                  {/* Grid Item 2 */}
                  <div className="col-span-1"></div>

                  {/* Grid Item 3 */}
                  <div className="col-span-6 relative transform transition-transform duration-700 group-hover:translate-y-4">
                     <div className="aspect-square bg-gray-100 overflow-hidden relative">
                        <img src="https://images.unsplash.com/photo-1558655146-d09347e0b7a9?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" />
                     </div>
                     <div className="mt-4 flex justify-between items-baseline border-b border-black pb-2">
                        <span className="text-xl font-bold">Vogue</span>
                        <span className="text-xs font-mono text-gray-500">版式设计</span>
                     </div>
                  </div>
               </div>

               {/* Custom Cursor Simulation */}
               <div 
                  className={`absolute w-8 h-8 border border-black rounded-full pointer-events-none z-50 flex items-center justify-center transition-opacity duration-300 ${isHovering ? 'opacity-100' : 'opacity-0'}`}
                  style={{ 
                     top: '50%', 
                     left: '50%', 
                     transform: `translate(calc(-50% + ${cursorPos.x}px), calc(-50% + ${cursorPos.y}px))`
                  }}
               >
                  <div className="w-1 h-1 bg-black rounded-full"></div>
               </div>
            </div>
         </div>
      </section>

      {/* 3. Features & Tech Stack */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-20">
         <div className="space-y-12">
            <div className="space-y-4">
               <h3 className="text-4xl font-bold flex items-center gap-3">
                  <Box className="text-blue-600" size={36} />
                  核心特性 (Core Features)
               </h3>
               <p className="text-gray-500 leading-relaxed">
                  不仅仅是一个静态网页。Aesthetic 模版集成了当前 Web 前端最前沿的视觉技术，同时保持了极高的性能评分（Lighthouse 98+）。
               </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
               {[
                  { title: '平滑滚动', desc: '基于 Lenis 的惯性滚动，丝般顺滑。', icon: <Move size={20} /> },
                  { title: 'WebGL 扭曲', desc: '图片悬停时的液体扭曲与噪点效果。', icon: <Layers size={20} /> },
                  { title: '页面转场', desc: '无刷新页面切换，保持沉浸感。', icon: <Zap size={20} /> },
                  { title: 'CMS 适配', desc: '已适配 Contentful 与 Sanity 内容管理。', icon: <DatabaseIcon size={20} /> },
               ].map((f, i) => (
                  <div key={i} className="p-6 bg-gray-50 rounded-2xl border border-gray-100 hover:border-black/10 transition-colors">
                     <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm text-black">
                        {f.icon}
                     </div>
                     <h4 className="font-bold text-lg mb-2">{f.title}</h4>
                     <p className="text-sm text-gray-500">{f.desc}</p>
                  </div>
               ))}
            </div>
         </div>

         <div className="bg-black text-white p-12 rounded-[2.5rem] relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 rounded-full blur-[100px] opacity-30 pointer-events-none"></div>
            
            <div className="space-y-6 relative z-10">
               <h4 className="text-2xl font-bold font-mono">
                  <span className="text-blue-500">&gt;</span> npm install
               </h4>
               <div className="space-y-4 font-mono text-sm text-gray-400">
                  <div className="flex items-center gap-3 p-3 bg-white/10 rounded-lg border border-white/10">
                     <div className="w-2 h-2 rounded-full bg-green-500"></div>
                     <span>react @18.2.0</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white/10 rounded-lg border border-white/10">
                     <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                     <span>@react-three/fiber @8.13.0</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white/10 rounded-lg border border-white/10">
                     <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                     <span>gsap @3.12.0</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white/10 rounded-lg border border-white/10">
                     <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                     <span>framer-motion @10.12.0</span>
                  </div>
               </div>
            </div>

            <div className="mt-12 pt-8 border-t border-white/10 flex justify-between items-end relative z-10">
               <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">开发者友好</p>
                  <p className="text-lg font-bold">支持 TypeScript</p>
               </div>
               <Code2 size={32} className="text-gray-500" />
            </div>
         </div>
      </section>

      {/* 4. Typography & Design System */}
      <section className="bg-gray-50 py-20 border-y border-gray-100">
         <div className="max-w-7xl mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
               <div className="space-y-8">
                  <div className="inline-flex items-center gap-2 text-black border-b-2 border-black pb-1">
                     <Type size={20} />
                     <span className="font-bold uppercase tracking-widest">字体排版系统</span>
                  </div>
                  <div className="space-y-6">
                     <div>
                        <p className="text-xs text-gray-400 font-mono mb-2">标题 / 展示 (DISPLAY)</p>
                        <h2 className="text-6xl font-serif">Playfair Display</h2>
                     </div>
                     <div>
                        <p className="text-xs text-gray-400 font-mono mb-2">正文 / 界面 (BODY)</p>
                        <h2 className="text-4xl font-sans font-light">Inter Tight</h2>
                     </div>
                     <p className="text-gray-500 leading-relaxed max-w-md">
                        经典的衬线体与现代无衬线体的碰撞。通过极致的字重对比与留白，营造出画廊般的阅读体验。
                     </p>
                  </div>
               </div>

               <div className="grid grid-cols-2 gap-4">
                  <div className="aspect-square bg-white p-6 flex flex-col justify-between border border-gray-200">
                     <span className="font-serif text-6xl">Aa</span>
                     <span className="text-xs font-mono text-gray-400">常规 400</span>
                  </div>
                  <div className="aspect-square bg-black text-white p-6 flex flex-col justify-between">
                     <span className="font-serif text-6xl italic">Aa</span>
                     <span className="text-xs font-mono text-gray-400">斜体 400</span>
                  </div>
                  <div className="aspect-square bg-blue-600 text-white p-6 flex flex-col justify-between">
                     <span className="font-sans text-6xl font-bold">Aa</span>
                     <span className="text-xs font-mono text-blue-200">粗体 700</span>
                  </div>
                  <div className="aspect-square bg-gray-100 p-6 flex flex-col justify-between border border-gray-200">
                     <div className="space-y-2">
                        <div className="w-full h-2 bg-gray-300 rounded-full"></div>
                        <div className="w-2/3 h-2 bg-gray-300 rounded-full"></div>
                        <div className="w-full h-2 bg-gray-300 rounded-full"></div>
                     </div>
                     <span className="text-xs font-mono text-gray-400">行高 1.6</span>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* 5. Responsive Design Showcase */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8 text-center space-y-12">
         <div className="space-y-4">
            <h3 className="text-4xl font-bold">
               全平台 <br />
               <span className="font-serif italic text-blue-600">像素级适配</span>
            </h3>
            <div className="flex justify-center gap-4 pt-4">
               {['desktop', 'tablet', 'mobile'].map((device) => (
                  <button 
                     key={device}
                     onClick={() => setActiveDevice(device as any)}
                     className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-all ${activeDevice === device ? 'bg-black text-white shadow-lg' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
                  >
                     {device === 'desktop' && <Monitor size={16} />}
                     {device === 'tablet' && <Tablet size={16} />}
                     {device === 'mobile' && <Smartphone size={16} />}
                     <span className="uppercase">{device}</span>
                  </button>
               ))}
            </div>
         </div>

         <div className="relative h-[600px] bg-gray-50 rounded-[3rem] border border-gray-100 flex items-center justify-center overflow-hidden transition-all duration-500">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
            
            {/* Device Frame */}
            <div 
               className={`bg-white shadow-2xl border-8 border-gray-900 relative overflow-hidden transition-all duration-700 ease-in-out ${
                  activeDevice === 'desktop' ? 'w-[90%] h-[80%] rounded-xl' : 
                  activeDevice === 'tablet' ? 'w-[500px] h-[700px] rounded-[2rem]' : 
                  'w-[300px] h-[600px] rounded-[3rem]'
               }`}
            >
               {/* Mockup Content */}
               <div className="w-full h-full overflow-y-auto no-scrollbar bg-white">
                  {/* Navbar */}
                  <div className="h-16 flex justify-between items-center px-6 sticky top-0 bg-white/90 backdrop-blur z-10">
                     <span className="font-bold text-lg">Aesthetic.</span>
                     <div className="hidden sm:flex gap-4 text-xs font-bold uppercase tracking-widest">
                        <span>作品</span>
                        <span>关于</span>
                        <span>联系</span>
                     </div>
                     <div className="sm:hidden">
                        <Grid size={20} />
                     </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6 space-y-8">
                     <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center relative overflow-hidden group">
                        <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover opacity-80" />
                        <h1 className="absolute text-4xl font-serif mix-blend-difference text-white">Hello World</h1>
                     </div>
                     <div className="grid grid-cols-2 gap-4">
                        <div className="aspect-[3/4] bg-black text-white p-4 flex flex-col justify-end">
                           <span className="text-xl font-serif italic">项目 01</span>
                        </div>
                        <div className="aspect-[3/4] bg-gray-200"></div>
                     </div>
                     <div className="space-y-4">
                        <div className="h-4 bg-gray-100 w-3/4 rounded"></div>
                        <div className="h-4 bg-gray-100 w-full rounded"></div>
                        <div className="h-4 bg-gray-100 w-5/6 rounded"></div>
                     </div>
                  </div>
               </div>

               {/* Camera Notch for Mobile */}
               {activeDevice === 'mobile' && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-900 rounded-b-xl z-20"></div>
               )}
            </div>
         </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center">
         <h3 className="text-3xl font-black mb-8">准备好构建您的网站了吗？</h3>
         <button className="bg-blue-600 text-white px-12 py-5 rounded-full font-bold text-lg hover:bg-blue-700 transition-colors shadow-xl shadow-blue-500/30 flex items-center gap-3 mx-auto">
            获取此模版 <ArrowRight size={20} />
         </button>
      </section>

    </div>
  );
};

// Helper Icon
function DatabaseIcon({ size }: { size: number }) {
   return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
         <ellipse cx="12" cy="5" rx="9" ry="3" />
         <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
         <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      </svg>
   )
}
