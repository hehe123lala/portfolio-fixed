
import React, { useState, useEffect } from 'react';
import { 
  Eye, Languages, Navigation2, Cpu, Smartphone, Layers, 
  Palette, Type, Sparkles, Check, ChevronRight, Compass, 
  MapPin, Battery, Wifi, Bluetooth, Grid3x3, Aperture, 
  Radio, Play, Download, Share2, Activity, Zap, Target
} from 'lucide-react';

export const SmartGlassesDetail: React.FC = () => {
  // Theme & HUD State
  const [activeTheme, setActiveTheme] = useState('cyber');
  const [activeFont, setActiveFont] = useState('mono');
  const [showScanlines, setShowScanlines] = useState(true);
  const [activeHUD, setActiveHUD] = useState<'translation' | 'navigation'>('navigation');
  
  // Interaction State (Eye Tracking Simulation)
  const [cursorPos, setCursorPos] = useState({ x: 50, y: 50 });
  const [isHoveringViewport, setIsHoveringViewport] = useState(false);
  const [gazeTarget, setGazeTarget] = useState<string | null>(null);
  
  // App Mockup State
  const [appTab, setAppTab] = useState<'dashboard' | 'gallery'>('dashboard');

  const themes = [
    { id: 'cyber', name: '极客霓虹', primary: '#8A84FF', secondary: '#FF2E63', bg: 'bg-purple-brand' },
    { id: 'minimal', name: '纯净白昼', primary: '#FFFFFF', secondary: '#000000', bg: 'bg-white' },
    { id: 'tactical', name: '战术琥珀', primary: '#FFB400', secondary: '#333333', bg: 'bg-yellow-500' },
    { id: 'forest', name: '自然视界', primary: '#00D1FF', secondary: '#2ECC71', bg: 'bg-blue-400' },
  ];

  const fonts = [
    { id: 'mono', name: '科技等宽', family: 'font-mono' },
    { id: 'sans', name: '现代无衬线', family: 'font-sans' },
  ];

  const currentThemeData = themes.find(t => t.id === activeTheme) || themes[0];
  const currentFontData = fonts.find(f => f.id === activeFont) || fonts[0];

  const features = [
    {
      title: '实时同声传译',
      icon: <Languages className="text-orange-500" />,
      desc: '支持 40+ 语言实时转写并显示在视网膜中心 5° 区域，实现无障碍交流。',
      color: 'bg-orange-50'
    },
    {
      title: 'AR 步行导航',
      icon: <Navigation2 className="text-blue-500" />,
      desc: '基于 SLAM 算法的虚拟路标投影，将导航指示直接融入现实街景。',
      color: 'bg-blue-50'
    },
    {
      title: '环境语义理解',
      icon: <Eye className="text-green-500" />,
      desc: '识别视野中的物体与文本，提供百科知识或智能操作建议。',
      color: 'bg-green-50'
    },
    {
      title: '轻量化控制中心',
      icon: <Cpu className="text-purple-brand" />,
      desc: '仅需简单的指尖微动或侧边触控，即可快速调节音量、亮度。',
      color: 'bg-purple-brand/5'
    }
  ];

  const handleViewportMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setCursorPos({ x, y });
    setIsHoveringViewport(true);
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 space-y-24">
      {/* Hero Section */}
      <section className="text-center space-y-8 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-purple-brand/10 px-4 py-2 rounded-full">
           <Layers size={16} className="text-purple-brand" />
           <span className="text-xs font-bold text-purple-brand uppercase tracking-widest">AR 交互全案</span>
        </div>
        <h3 className="text-4xl lg:text-6xl font-black leading-tight">VisionAir <br /> 重新定义视觉边界</h3>
        <p className="text-gray-500 text-xl leading-relaxed">
          作为主设计师，我主导了 VisionAir AR 眼镜的核心交互系统设计。除了功能性，我们也极度重视“个性化美学”，让每一位用户都能定义自己的视野风格。
        </p>
      </section>

      {/* Interface Showcase & Theme Customizer */}
      <section className="bg-gray-900 rounded-[4rem] p-12 lg:p-24 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 blur-[120px] pointer-events-none" style={{ backgroundColor: currentThemeData.primary }}></div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
           {/* Left: Customizer Controls */}
           <div className="lg:col-span-5 space-y-12 relative z-10">
              <div className="space-y-4">
                 <h4 className="text-3xl font-bold text-white">个性化 <span style={{ color: currentThemeData.primary }}>主题引擎</span></h4>
                 <p className="text-gray-400 text-sm">实时调整 HUD 视觉参数，适配不同光线环境与个人审美偏好。</p>
              </div>

              <div className="space-y-10">
                {/* HUD Mode Selection */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-white/60 text-xs font-bold uppercase tracking-widest">
                    <Sparkles size={14} /> 交互模式
                  </div>
                  <div className="flex p-1 bg-white/5 rounded-2xl border border-white/10">
                    <button 
                      onClick={() => setActiveHUD('navigation')}
                      className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all ${activeHUD === 'navigation' ? 'bg-white text-black shadow-lg' : 'text-white/40 hover:text-white/60'}`}
                    >
                      <Navigation2 size={16} /> 步行导航
                    </button>
                    <button 
                      onClick={() => setActiveHUD('translation')}
                      className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all ${activeHUD === 'translation' ? 'bg-white text-black shadow-lg' : 'text-white/40 hover:text-white/60'}`}
                    >
                      <Languages size={16} /> 实时同传
                    </button>
                  </div>
                </div>

                {/* Color Selection */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-white/60 text-xs font-bold uppercase tracking-widest">
                    <Palette size={14} /> 核心色谱
                  </div>
                  <div className="flex gap-4">
                    {themes.map((t) => (
                      <button 
                        key={t.id}
                        onClick={() => setActiveTheme(t.id)}
                        className={`w-12 h-12 rounded-2xl ${t.bg} border-2 transition-all flex items-center justify-center ${activeTheme === t.id ? 'border-white scale-110 shadow-lg' : 'border-transparent opacity-60 hover:opacity-100'}`}
                        title={t.name}
                      >
                        {activeTheme === t.id && <Check className={t.id === 'minimal' ? 'text-black' : 'text-white'} size={20} />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Typography Selection */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-white/60 text-xs font-bold uppercase tracking-widest">
                    <Type size={14} /> 字体样式
                  </div>
                  <div className="flex gap-3">
                    {fonts.map((f) => (
                      <button 
                        key={f.id}
                        onClick={() => setActiveFont(f.id)}
                        className={`px-6 py-3 rounded-xl text-sm font-bold transition-all border ${activeFont === f.id ? 'bg-white text-black border-white' : 'bg-white/5 text-white/60 border-white/10 hover:bg-white/10'}`}
                      >
                        {f.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
           </div>
           
           {/* Right: Real-time Mockup Preview */}
           <div className="lg:col-span-7 relative">
              <div 
                className="aspect-video bg-gray-800 rounded-3xl border-8 border-gray-700 shadow-2xl relative overflow-hidden group perspective-1000 cursor-none"
                onMouseMove={handleViewportMouseMove}
                onMouseLeave={() => { setIsHoveringViewport(false); setGazeTarget(null); }}
              >
                 {/* Main Scene Image */}
                 <img 
                    src="https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=1200" 
                    className="w-full h-full object-cover opacity-60 grayscale-[0.2]"
                    alt="AR Street View"
                 />

                 {/* Scanlines Effect Overlay */}
                 {showScanlines && (
                   <div className="absolute inset-0 pointer-events-none opacity-20" style={{ background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))', backgroundSize: '100% 4px, 3px 100%' }}></div>
                 )}

                 {/* Custom Gaze Cursor */}
                 {isHoveringViewport && (
                    <div 
                      className="absolute pointer-events-none z-50 transition-all duration-75 ease-out flex items-center justify-center"
                      style={{ left: `${cursorPos.x}%`, top: `${cursorPos.y}%`, transform: 'translate(-50%, -50%)' }}
                    >
                       <div className={`rounded-full transition-all duration-300 border-2 ${gazeTarget ? 'w-16 h-16 border-transparent' : 'w-8 h-8 border-white/50'}`}>
                          {gazeTarget && (
                             <div className="absolute inset-0 rounded-full border-2 animate-ping opacity-50" style={{ borderColor: currentThemeData.primary }}></div>
                          )}
                          {gazeTarget && (
                             <div className="absolute inset-0 rounded-full border-2 scale-110" style={{ borderColor: currentThemeData.primary }}></div>
                          )}
                       </div>
                       <div className={`w-1 h-1 bg-white rounded-full absolute transition-opacity ${gazeTarget ? 'opacity-0' : 'opacity-100'}`}></div>
                       
                       {/* Gaze Reticle Decor */}
                       {gazeTarget && (
                          <>
                            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-0.5 h-2 bg-white"></div>
                            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0.5 h-2 bg-white"></div>
                            <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-0.5 bg-white"></div>
                            <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-2 h-0.5 bg-white"></div>
                            <div className="absolute top-10 left-1/2 -translate-x-1/2 text-[9px] font-mono font-bold whitespace-nowrap px-2 py-0.5 bg-black/80 rounded border border-white/20 text-white animate-in fade-in slide-in-from-top-1">
                               LOCKED: <span style={{ color: currentThemeData.primary }}>{gazeTarget}</span>
                            </div>
                          </>
                       )}
                    </div>
                 )}

                 {/* HUD Elements with Dynamic Styles */}
                 <div className={`absolute inset-0 p-8 flex flex-col justify-between ${currentFontData.family}`}>
                    
                    {/* Top Bar - Dynamic based on Mode */}
                    <div className="flex justify-between items-start animate-in fade-in slide-in-from-top-4 duration-500 pointer-events-none">
                       <div 
                        className="bg-black/60 backdrop-blur-md px-4 py-2 rounded-xl border transition-colors flex items-center gap-3"
                        style={{ borderColor: `${currentThemeData.primary}33` }}
                       >
                          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                          <span className="text-xs font-bold" style={{ color: currentThemeData.primary }}>
                            {activeHUD === 'navigation' ? 'GPS FIXED // 导航中' : '14:30 · 晴 26℃'}
                          </span>
                       </div>
                       <div className="flex items-center gap-4">
                          <div 
                            className="bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-2"
                          >
                             <div className="w-1.5 h-3 bg-white/20 rounded-full overflow-hidden">
                                <div className="w-full h-2/3 bg-green-500 mt-auto"></div>
                             </div>
                             <span className="text-[10px] font-bold text-white/80">82%</span>
                          </div>
                          <div 
                            className="w-10 h-10 rounded-full flex items-center justify-center animate-pulse shadow-lg"
                            style={{ backgroundColor: activeTheme === 'cyber' ? '#FF2E63' : currentThemeData.primary }}
                          >
                             {activeHUD === 'navigation' ? <Navigation2 size={20} className={currentThemeData.id === 'minimal' ? 'text-black' : 'text-white'} /> : <Languages size={20} className={currentThemeData.id === 'minimal' ? 'text-black' : 'text-white'} />}
                          </div>
                       </div>
                    </div>

                    {/* Center Overlay Content */}
                    <div className="flex flex-col items-center justify-center flex-1 relative">
                       {activeHUD === 'translation' ? (
                          <div 
                            onMouseEnter={() => setGazeTarget('TRANS_BUBBLE')}
                            onMouseLeave={() => setGazeTarget(null)}
                            className={`bg-black/80 backdrop-blur-2xl p-6 rounded-3xl border shadow-2xl space-y-3 max-w-sm transform transition-all duration-300 animate-in zoom-in-95 ${gazeTarget === 'TRANS_BUBBLE' ? 'scale-110 border-white/50 shadow-[0_0_50px_rgba(255,255,255,0.2)]' : 'scale-100'}`}
                            style={{ borderColor: gazeTarget === 'TRANS_BUBBLE' ? currentThemeData.primary : `${currentThemeData.primary}66` }}
                          >
                            <div className="flex items-center justify-between">
                              <p className="text-[10px] uppercase font-bold tracking-widest opacity-60" style={{ color: currentThemeData.primary }}>实时翻译 · ENG → CHN</p>
                              <div className="flex gap-1">
                                <div className="w-1 h-1 rounded-full animate-bounce" style={{ backgroundColor: currentThemeData.primary }}></div>
                                <div className="w-1 h-1 rounded-full animate-bounce delay-100 opacity-50" style={{ backgroundColor: currentThemeData.primary }}></div>
                              </div>
                            </div>
                            <p className="text-white text-base leading-tight italic">"Where is the nearest subway station?"</p>
                            <div className={`transition-all duration-300 overflow-hidden ${gazeTarget === 'TRANS_BUBBLE' ? 'max-h-20 opacity-100 mt-2 pt-2 border-t border-white/10' : 'max-h-0 opacity-0'}`}>
                               <div className="flex items-center gap-2 mb-1">
                                  <span className="text-[9px] bg-white/20 px-1.5 py-0.5 rounded text-white font-bold">CONFIDENCE 98%</span>
                               </div>
                            </div>
                            <p className="text-lg font-black" style={{ color: currentThemeData.primary }}>"最近的地铁站在哪里？"</p>
                          </div>
                       ) : (
                          <div className="w-full h-full relative">
                             {/* AR Path Projection - SVG Overlay */}
                             <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40" preserveAspectRatio="none">
                               <path 
                                 d="M 400 600 Q 400 450, 450 400 T 500 250" 
                                 stroke={currentThemeData.primary} 
                                 strokeWidth={gazeTarget === 'PATH_GUIDE' ? "140" : "120"} 
                                 fill="none" 
                                 className="transition-all duration-500"
                                 style={{ filter: `blur(40px) drop-shadow(0 0 20px ${currentThemeData.primary})` }}
                               />
                               <path 
                                 d="M 400 600 Q 400 450, 450 400 T 500 250" 
                                 stroke={currentThemeData.primary} 
                                 strokeWidth="2" 
                                 fill="none" 
                                 strokeDasharray="10 10"
                                 className="animate-dash"
                               />
                               {/* Interactive Invisible Path for Hover */}
                               <path 
                                 d="M 400 600 Q 400 450, 450 400 T 500 250" 
                                 stroke="transparent" 
                                 strokeWidth="150" 
                                 fill="none" 
                                 className="pointer-events-auto cursor-none"
                                 onMouseEnter={() => setGazeTarget('PATH_GUIDE')}
                                 onMouseLeave={() => setGazeTarget(null)}
                               />
                             </svg>

                             {/* Floating Navigation Card */}
                             <div 
                                onMouseEnter={() => setGazeTarget('NAV_CARD')}
                                onMouseLeave={() => setGazeTarget(null)}
                                className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/70 backdrop-blur-xl p-5 rounded-[2rem] border-2 shadow-2xl flex items-center gap-6 animate-in slide-in-from-bottom-8 duration-500 transition-all ${gazeTarget === 'NAV_CARD' ? 'scale-110 bg-black/90' : 'scale-100'}`}
                                style={{ borderColor: gazeTarget === 'NAV_CARD' ? currentThemeData.primary : `${currentThemeData.primary}44` }}
                             >
                                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center relative">
                                   <div className="absolute inset-0 bg-current opacity-20 blur-lg rounded-2xl" style={{ color: currentThemeData.primary }}></div>
                                   <Navigation2 size={32} style={{ color: currentThemeData.primary }} className="rotate-45" />
                                </div>
                                <div>
                                   <div className="text-[10px] font-black uppercase tracking-widest opacity-40 text-white">前方 150 米右转</div>
                                   <div className="text-2xl font-black text-white">进入静安公园</div>
                                   <div className="flex items-center gap-2 mt-1">
                                      <div className="h-1 w-24 bg-white/10 rounded-full overflow-hidden">
                                         <div className="h-full w-2/3 bg-current rounded-full" style={{ color: currentThemeData.primary }}></div>
                                      </div>
                                      <span className="text-[10px] text-white/40 font-bold">2.4 KM 剩余</span>
                                   </div>
                                </div>
                             </div>

                             {/* Floating Landmark Pins */}
                             <div 
                                className="absolute top-1/4 right-1/4 animate-bounce-slow"
                                onMouseEnter={() => setGazeTarget('POI_CAFE')}
                                onMouseLeave={() => setGazeTarget(null)}
                             >
                                <div className="flex flex-col items-center gap-1 transition-transform duration-300">
                                   <div 
                                      className={`px-3 py-1.5 bg-black/80 backdrop-blur rounded-lg border text-[10px] font-bold text-white whitespace-nowrap transition-all ${gazeTarget === 'POI_CAFE' ? 'scale-125 border-white bg-black' : ''}`}
                                      style={{ borderColor: currentThemeData.primary }}
                                   >
                                      🌟 网红咖啡店
                                      {gazeTarget === 'POI_CAFE' && <span className="block text-[8px] text-gray-400 font-normal mt-1 border-t border-white/20 pt-1">4.8分 · 距离 50m</span>}
                                   </div>
                                   <div className="w-1 h-4 bg-white/40 rounded-full"></div>
                                </div>
                             </div>
                          </div>
                       )}
                    </div>

                    {/* Bottom System Status */}
                    <div className="flex justify-between items-end animate-in fade-in slide-in-from-bottom-4 duration-500 pointer-events-none">
                       <div className="flex gap-3">
                          <div className="bg-black/40 backdrop-blur-sm p-4 rounded-2xl border border-white/10 flex flex-col items-start gap-1">
                             <Compass size={16} style={{ color: currentThemeData.primary }} className="animate-spin-slow" />
                             <span className="text-[9px] font-bold text-white/40 uppercase">NORTH: 12.4°</span>
                          </div>
                          <div className="bg-black/40 backdrop-blur-sm p-4 rounded-2xl border border-white/10 flex flex-col items-start gap-1">
                             <MapPin size={16} style={{ color: currentThemeData.primary }} />
                             <span className="text-[9px] font-bold text-white/40 uppercase">南京西路 1505 号</span>
                          </div>
                       </div>
                       
                       <div className="bg-black/40 backdrop-blur-sm p-4 rounded-2xl border border-white/10 flex flex-col items-end gap-2">
                          <div className="flex gap-1 h-2">
                             {[1, 2, 3, 4, 5, 6].map(i => (
                               <div key={i} className="w-1 h-full rounded-full transition-all" style={{ backgroundColor: i < 5 ? currentThemeData.primary : 'rgba(255,255,255,0.1)' }}></div>
                             ))}
                          </div>
                          <span className="text-[9px] font-mono text-white/40">V-AIR_OS v4.2 // NAV_ACTIVE</span>
                       </div>
                    </div>
                 </div>
              </div>
              
              {/* Floating Floating Info Badge */}
              <div className="absolute -bottom-6 -left-6 bg-white p-5 rounded-3xl shadow-2xl text-black border border-gray-100 hidden sm:block">
                 <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${currentThemeData.primary}22` }}>
                       {activeHUD === 'navigation' ? <Navigation2 size={20} style={{ color: currentThemeData.primary }} /> : <Palette size={20} style={{ color: currentThemeData.primary }} />}
                    </div>
                    <div>
                       <div className="text-sm font-bold">{activeHUD === 'navigation' ? 'AR 智能导引已开启' : '自适应环境模式'}</div>
                       <div className="text-[10px] text-gray-400 font-medium uppercase tracking-tight">
                        {activeHUD === 'navigation' ? 'SLAM 空间计算模式' : '智能切换最优色谱'}
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Grid of standard features */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((f, i) => (
          <div key={i} className={`${f.color} p-10 rounded-[2.5rem] border border-transparent hover:border-gray-200 hover:shadow-xl transition-all`}>
             <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-sm">
                {f.icon}
             </div>
             <h4 className="text-xl font-bold mb-4">{f.title}</h4>
             <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

// CSS 动画增强
const style = document.createElement('style');
style.textContent = `
  @keyframes dash {
    to {
      stroke-dashoffset: -100;
    }
  }
  .animate-dash {
    animation: dash 20s linear infinite;
  }
  @keyframes spin-slow {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  @keyframes bounce-slow {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-15px); }
  }
  .animate-spin-slow { animation: spin-slow 12s linear infinite; }
  .animate-bounce-slow { animation: bounce-slow 4s ease-in-out infinite; }
  .perspective-1000 { perspective: 1000px; }
  .no-scrollbar::-webkit-scrollbar { display: none; }
  .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
`;
document.head.appendChild(style);
