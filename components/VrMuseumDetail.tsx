
import React, { useState, useEffect } from 'react';
import { 
  Box, Move3d, Scan, Layers, Eye, 
  Hand, MousePointer2, Rotate3d, Maximize, 
  Info, History, Play, Share2, Globe,
  Cpu, Grid, ZoomIn, X
} from 'lucide-react';

export const VrMuseumDetail: React.FC = () => {
  const [scanLayer, setScanLayer] = useState(50); // 0 = Wireframe, 100 = Reality
  const [activeArtifact, setActiveArtifact] = useState<'nike' | 'venus'>('nike');
  const [activeGesture, setActiveGesture] = useState<number | null>(null);

  // Artifact Data
  const artifacts = {
    nike: {
      name: 'Winged Victory of Samothrace',
      date: '190 BC',
      material: 'Parian Marble',
      desc: '希腊化时期雕塑的杰作，展现了胜利女神尼姬降落在船头的瞬间。在 VR 中，我们重建了其缺失的头部与手臂的各种历史猜想。',
      image: 'https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&q=80&w=800',
      mesh: 'https://images.unsplash.com/photo-1626084620023-44d7c0e64344?auto=format&fit=crop&q=80&w=800' // Using a wireframe-like abstract image as placeholder
    },
    venus: {
      name: 'Venus de Milo',
      date: '130-100 BC',
      material: 'Marble',
      desc: '爱与美的女神阿佛洛狄忒。用户可通过“时空回溯”功能，身临其境地观察古代雕塑家打磨大理石的过程。',
      image: 'https://images.unsplash.com/photo-1563200305-64bc77583a27?auto=format&fit=crop&q=80&w=800',
      mesh: 'https://images.unsplash.com/photo-1633465809743-349c20f5c222?auto=format&fit=crop&q=80&w=800'
    }
  };

  const currentArtifact = artifacts[activeArtifact];

  // Gestures Data
  const gestures = [
    { id: 1, name: 'Pinch & Hold', action: '抓取 / 移动', icon: <Hand size={24} />, desc: '拇指与食指捏合，模拟物理世界的抓取动作，用于移动文物或拖拽进度条。' },
    { id: 2, name: 'Ray Casting', action: '远距离交互', icon: <MousePointer2 size={24} />, desc: '手掌张开，从指尖发射激光射线，用于选择远处的画作或菜单项。' },
    { id: 3, name: 'Palm Menu', action: '系统菜单', icon: <Grid size={24} />, desc: '翻转手掌面向自己，在手心处激活悬浮的快捷功能圆盘。' },
    { id: 4, name: 'Two-Hand Scale', action: '缩放 / 旋转', icon: <Maximize size={24} />, desc: '双手同时捏合拉伸，无级缩放文物模型，查看微米级细节。' },
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 space-y-32 pb-20 bg-[#0a0a0a] text-white">
      
      {/* 1. Hero Section: The Metaverse Entrance */}
      <section className="relative pt-20 pb-10 text-center overflow-hidden">
        {/* Background Grid Animation */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-purple-brand/10 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="relative z-10 max-w-4xl mx-auto space-y-8">
           <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full backdrop-blur-md">
              <Box size={16} className="text-purple-brand" />
              <span className="text-xs font-bold text-gray-300 uppercase tracking-widest">Spatial Computing Experience</span>
           </div>
           <h3 className="text-5xl lg:text-8xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500">
              Louvre <span className="text-purple-brand font-serif italic">VR</span>
           </h3>
           <p className="text-gray-400 text-xl max-w-2xl mx-auto leading-relaxed">
              打破物理展馆的时空限制。我们不仅重建了罗浮宫的建筑，更通过全息复原技术，让断臂的维纳斯重获双臂，让胜利女神重返萨莫色雷斯岛的船头。
           </p>
        </div>
      </section>

      {/* 2. Interactive Holo-Scanner (Core Feature) */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8">
         <div className="bg-[#111] rounded-[3rem] border border-white/10 overflow-hidden relative shadow-2xl">
            {/* Control Bar */}
            <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-start z-30 pointer-events-none">
               <div className="bg-black/60 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/10 pointer-events-auto">
                  <h4 className="text-xl font-bold font-serif italic text-white">{currentArtifact.name}</h4>
                  <div className="flex gap-4 text-xs text-gray-400 mt-1 font-mono">
                     <span className="flex items-center gap-1"><History size={12} /> {currentArtifact.date}</span>
                     <span className="flex items-center gap-1"><Layers size={12} /> {currentArtifact.material}</span>
                  </div>
               </div>
               <div className="flex gap-2 pointer-events-auto">
                  <button 
                     onClick={() => setActiveArtifact('nike')}
                     className={`w-12 h-12 rounded-xl border flex items-center justify-center transition-all ${activeArtifact === 'nike' ? 'bg-purple-brand border-purple-brand text-white' : 'bg-black/40 border-white/10 text-gray-400 hover:bg-white/10'}`}
                  >
                     <span className="font-serif font-bold text-lg">N</span>
                  </button>
                  <button 
                     onClick={() => setActiveArtifact('venus')}
                     className={`w-12 h-12 rounded-xl border flex items-center justify-center transition-all ${activeArtifact === 'venus' ? 'bg-purple-brand border-purple-brand text-white' : 'bg-black/40 border-white/10 text-gray-400 hover:bg-white/10'}`}
                  >
                     <span className="font-serif font-bold text-lg">V</span>
                  </button>
               </div>
            </div>

            {/* Main Viewport */}
            <div className="relative h-[600px] w-full flex items-center justify-center overflow-hidden bg-gradient-to-b from-gray-900 to-black cursor-ew-resize group select-none">
               {/* Grid Floor */}
               <div className="absolute bottom-0 w-full h-1/2 bg-[linear-gradient(to_bottom,transparent_0%,#ffffff05_100%),linear-gradient(to_right,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] perspective-[1000px] rotate-x-60 transform-gpu origin-bottom"></div>

               {/* Layer 1: Wireframe / Mesh (Base) */}
               <div className="absolute inset-0 flex items-center justify-center filter grayscale contrast-150 opacity-40">
                  <img src={currentArtifact.mesh} className="h-[80%] object-contain opacity-50 mix-blend-screen animate-pulse-slow" />
                  <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
               </div>

               {/* Layer 2: Real Render (Clipped) */}
               <div 
                  className="absolute inset-y-0 left-0 overflow-hidden border-r-2 border-purple-brand shadow-[0_0_40px_rgba(138,132,255,0.6)] z-20 transition-all duration-75 ease-linear"
                  style={{ width: `${scanLayer}%` }}
               >
                  <div className="absolute inset-0 w-screen max-w-7xl mx-auto flex items-center justify-center h-full">
                     <img src={currentArtifact.image} className="h-[80%] object-contain drop-shadow-2xl" />
                  </div>
                  {/* Floating particles at cut line */}
                  <div className="absolute top-0 right-0 h-full w-1 bg-white/50 blur-[2px]"></div>
               </div>

               {/* Slider Interaction Overlay */}
               <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={scanLayer} 
                  onChange={(e) => setScanLayer(Number(e.target.value))}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-50" 
               />

               {/* Floating UI Tags */}
               <div className="absolute top-1/2 left-[20%] -translate-y-1/2 z-10 hidden lg:block">
                  <div className="bg-black/60 backdrop-blur border border-white/10 p-4 rounded-xl max-w-xs space-y-2 transform -translate-x-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                     <div className="text-[10px] text-purple-brand font-bold uppercase tracking-widest flex items-center gap-2">
                        <Scan size={12} /> Laser Scan Data
                     </div>
                     <p className="text-xs text-gray-400 leading-relaxed">
                        基于 50 亿面片的高精度激光扫描数据，完美还原大理石表面的微小风化痕迹。
                     </p>
                  </div>
               </div>
               
               <div className="absolute bottom-12 w-full text-center z-20 pointer-events-none">
                  <div className="inline-flex flex-col items-center gap-2 text-white/50">
                     <div className="flex gap-2 text-[10px] font-bold uppercase tracking-[0.2em]">
                        <span>Wireframe</span>
                        <div className="w-20 h-px bg-white/20 self-center"></div>
                        <span>Reality</span>
                     </div>
                     <Move3d size={20} className="animate-bounce-slow" />
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* 3. Spatial UI Concept */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center max-w-7xl mx-auto px-4 lg:px-8">
         <div className="space-y-10">
            <h3 className="text-4xl font-bold leading-tight">
               <span className="text-purple-brand">以眼为鼠，以手为键</span><br />
               自然交互体系
            </h3>
            <p className="text-gray-400 text-lg leading-relaxed">
               在 VR 中，UI 不应是阻挡视线的平面，而是融入环境的立体结构。我们设计了基于视线追踪（Eye-Tracking）的“凝视激活”系统，配合手势识别，实现了真正无接触的直觉操作。
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               {gestures.map((g) => (
                  <div 
                     key={g.id}
                     onMouseEnter={() => setActiveGesture(g.id)}
                     onMouseLeave={() => setActiveGesture(null)}
                     className={`p-6 rounded-2xl border transition-all duration-300 cursor-default ${activeGesture === g.id ? 'bg-purple-brand border-purple-brand text-white shadow-[0_0_30px_rgba(138,132,255,0.3)] scale-105' : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'}`}
                  >
                     <div className="mb-4 text-current opacity-80">{g.icon}</div>
                     <h5 className="font-bold text-sm mb-1">{g.name}</h5>
                     <p className="text-[10px] opacity-60 uppercase tracking-widest mb-3">{g.action}</p>
                     <div className={`text-xs leading-relaxed overflow-hidden transition-all duration-300 ${activeGesture === g.id ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'}`}>
                        {g.desc}
                     </div>
                  </div>
               ))}
            </div>
         </div>

         {/* 3D Curved UI Mockup */}
         <div className="relative perspective-[2000px] group">
            <div className="absolute inset-0 bg-purple-brand/20 blur-[100px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            
            {/* The Curved Panel */}
            <div className="relative w-full aspect-square bg-gradient-to-br from-gray-800/80 to-black/80 backdrop-blur-xl border border-white/20 rounded-[3rem] shadow-2xl transform rotate-y-[-15deg] group-hover:rotate-y-[-5deg] transition-all duration-700 ease-out overflow-hidden flex flex-col">
               {/* Glossy Overlay */}
               <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent pointer-events-none z-20"></div>
               
               {/* UI Header */}
               <div className="p-8 border-b border-white/10 flex justify-between items-center bg-white/5">
                  <div className="flex items-center gap-3">
                     <div className="w-10 h-10 rounded-full bg-purple-brand flex items-center justify-center text-white font-serif font-bold">L</div>
                     <div>
                        <div className="text-sm font-bold text-white">Louvre OS</div>
                        <div className="text-[10px] text-gray-400">Guest User</div>
                     </div>
                  </div>
                  <div className="flex gap-2">
                     <div className="w-3 h-3 rounded-full bg-red-500"></div>
                     <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                     <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
               </div>

               {/* Grid Content */}
               <div className="p-8 grid grid-cols-2 gap-4 flex-1 overflow-y-auto custom-scrollbar">
                  {[1,2,3,4].map(i => (
                     <div key={i} className="bg-white/5 rounded-2xl p-4 border border-white/5 hover:bg-white/10 hover:border-purple-brand/50 transition-all group/item cursor-pointer">
                        <div className="aspect-video bg-black/50 rounded-lg mb-3 overflow-hidden relative">
                           <img src={`https://picsum.photos/seed/${i+50}/300/200`} className="w-full h-full object-cover opacity-60 group-hover/item:opacity-100 transition-opacity" />
                           <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/item:opacity-100 transition-opacity">
                              <Play className="fill-white text-white drop-shadow-lg" size={24} />
                           </div>
                        </div>
                        <div className="h-2 w-2/3 bg-white/10 rounded-full mb-2"></div>
                        <div className="h-2 w-1/3 bg-white/10 rounded-full"></div>
                     </div>
                  ))}
               </div>

               {/* Eye Tracking Cursor Simulation */}
               <div className="absolute top-1/2 left-1/2 w-12 h-12 border-2 border-purple-brand rounded-full rounded-tl-none -translate-x-1/2 -translate-y-1/2 shadow-[0_0_20px_#8A84FF] z-30 animate-float-slow pointer-events-none mix-blend-screen flex items-center justify-center">
                  <div className="w-1 h-1 bg-white rounded-full"></div>
               </div>
            </div>

            {/* Floating Background Elements */}
            <div className="absolute -right-12 top-20 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 shadow-xl transform rotate-y-[-15deg] translate-z-10 animate-float-slow delay-700">
               <Info size={20} className="text-white mb-2" />
               <div className="w-24 h-2 bg-white/20 rounded-full mb-1"></div>
               <div className="w-16 h-2 bg-white/20 rounded-full"></div>
            </div>
         </div>
      </section>

      {/* 4. Spatial Audio Visualizer */}
      <section className="bg-white text-black rounded-[4rem] p-12 lg:p-24 overflow-hidden relative">
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
            <div className="order-2 lg:order-1">
               <div className="relative w-full aspect-square flex items-center justify-center">
                  {/* Sound Waves */}
                  {[1, 2, 3, 4, 5].map((i) => (
                     <div 
                        key={i} 
                        className="absolute border border-black/10 rounded-full"
                        style={{ 
                           width: `${i * 20}%`, 
                           height: `${i * 20}%`,
                           animation: `ping-slow ${3 + i}s infinite linear` 
                        }}
                     ></div>
                  ))}
                  
                  {/* Central Head */}
                  <div className="w-32 h-32 bg-black rounded-full flex items-center justify-center relative z-10 shadow-2xl">
                     <Cpu size={48} className="text-white" />
                     {/* Floating Sound Sources */}
                     <div className="absolute -top-16 right-0 bg-purple-brand text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-lg animate-bounce">
                        Guide Voice
                     </div>
                     <div className="absolute bottom-0 -left-20 bg-gray-200 text-black px-3 py-1.5 rounded-lg text-xs font-bold shadow-lg animate-bounce delay-700">
                        Ambient: River
                     </div>
                  </div>
               </div>
            </div>
            
            <div className="space-y-8 order-1 lg:order-2">
               <h3 className="text-4xl font-bold">HRTF 空间音频 <br /><span className="text-purple-brand">听见历史的回响</span></h3>
               <p className="text-gray-600 text-lg leading-relaxed">
                  利用 HRTF（头部相关传输函数）算法，我们模拟了声音在卢浮宫长廊中的物理反射。当用户转身时，导览语音的来源方向会实时锁定，带来如同真人在耳边低语的临场感。
               </p>
               <div className="flex flex-wrap gap-4">
                  <div className="bg-gray-100 px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2">
                     <Rotate3d size={16} /> 6DoF 追踪
                  </div>
                  <div className="bg-gray-100 px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2">
                     <ZoomIn size={16} /> 距离衰减
                  </div>
                  <div className="bg-gray-100 px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2">
                     <Globe size={16} /> 混响模拟
                  </div>
               </div>
            </div>
         </div>
      </section>

    </div>
  );
};

// CSS Injection for VR specific animations
const style = document.createElement('style');
style.textContent = `
  .custom-scrollbar::-webkit-scrollbar {
    width: 4px;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 2px;
  }
  @keyframes pulse-slow {
    0%, 100% { opacity: 0.5; }
    50% { opacity: 0.8; }
  }
  .animate-pulse-slow {
    animation: pulse-slow 4s ease-in-out infinite;
  }
`;
document.head.appendChild(style);
