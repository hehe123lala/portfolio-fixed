
import React, { useState, useEffect } from 'react';
import { 
  Heart, Activity, Wind, Zap, Navigation, Clock, 
  ShieldCheck, ChevronRight, TrendingUp, Bell, 
  Grid, List, MessageCircle, Play, Layers, 
  Sun, Moon, Bike, Waves, Dumbbell,
  Settings, Award, Map as MapIcon, Smartphone, 
  User as UserIcon, CheckCircle2, Share2, Download, X,
  Palette, Grid3x3, Check, Eye, Flame, Timer, Footprints,
  Droplets, LocateFixed, Music, Phone, Calendar, Mail,
  Thermometer, MoreHorizontal, CloudRain, BarChart3, Watch,
  Battery, Bluetooth, Wifi, Medal, Trophy, Target, CreditCard,
  Type, MousePointerClick, Move, Cpu, Sparkles, Box, Contrast,
  ChevronLeft, Scale, ArrowUpRight, Cog, Disc, Hexagon, Circle, Gem
} from 'lucide-react';

export const SmartwatchDetail: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'health' | 'sport' | 'system'>('health');
  const [activeScreen, setActiveScreen] = useState(0);
  const [activeAppTab, setActiveAppTab] = useState<'home' | 'exercise' | 'device' | 'me'>('home');
  const [appDetailView, setAppDetailView] = useState<null | 'heart' | 'sleep'>(null);
  const [selectedFaceId, setSelectedFaceId] = useState<number | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(true);
  
  // Image Assets Mapping for UI Display
  const uiScreenImages = {
    health: [
      'https://i.ibb.co/93CxpnLh/image.png', // Heart Rate (Data Rich)
      'https://i.ibb.co/h0f5gYg/image.png', // SpO2 (Blue Theme) - Updated
      'https://i.ibb.co/xSxsrYk8/image.png', // Stress (Green Theme) - Updated
      'https://i.ibb.co/JRrbZ7r3/image.png', // Sleep (Moon Theme) - Updated
    ],
    sport: [
      'https://i.ibb.co/XrCmrgFG/frame-1000005042.png', // Running (Red Theme) - Updated
      'https://i.ibb.co/YTXRPPcH/frame-1000005042.png', // Cycling (Tactical) - Updated
      'https://i.ibb.co/wZDr25m5/frame-1000005042.png', // Swimming (Diver) - Updated
      'https://i.ibb.co/Xf9qkxNT/frame-1000005042.png', // Strength (Industrial) - Updated
    ],
    system: [
      'https://i.ibb.co/LzdR7Wvq/frame-22.png', // Apps (Pixel Grid) - Updated
      'https://i.ibb.co/bgqs2XCm/frame-28.png', // Notifications (Graffiti) - Updated
      'https://i.ibb.co/WWWkCqqj/frame-1000004897.png', // Cards (Negative Screen) - Updated
      'https://i.ibb.co/9HQKsGhm/image.png', // Media (Holo) - Updated
    ]
  };

  // Reset detail view when changing tabs
  useEffect(() => {
    setAppDetailView(null);
  }, [activeAppTab]);

  // 20 Watch Faces Data - Updated Future Mech with Image
  const watchFaces = [
    { 
      id: 1, name: '未来机械', style: 'Future Mech', color: 'bg-[#0f0f0f]', text: 'text-cyan-400', 
      type: 'Image', desc: '赛博机械风格，数字与指针的完美融合，多维度健康数据看板',
      accent: 'border-cyan-500/30',
      imageUrl: 'https://i.ibb.co/MD4RG2r6/2.png'
    },
    { 
      id: 2, name: '暗夜星球', style: 'Space', color: 'bg-black', text: 'text-white', 
      type: 'Image', desc: '深空星环，极简指针',
      accent: 'border-white/10',
      imageUrl: 'https://i.ibb.co/tTfbwFdH/image.png'
    },
    { 
      id: 3, name: '齿轮灰械', style: 'Industrial', color: 'bg-gray-800', text: 'text-gray-300', 
      type: 'Image', desc: '冷峻工业风，金属拉丝质感',
      accent: 'border-gray-500/50',
      imageUrl: 'https://i.ibb.co/k6MJfxZX/image.png'
    },
    { 
      id: 4, name: '绿洞', style: 'Cyber', color: 'bg-black', text: 'text-emerald-400', 
      type: 'Image', desc: '赛博朋克，绿色霓虹光环',
      accent: 'border-emerald-500 shadow-[0_0_15px_#10b981]',
      imageUrl: 'https://i.ibb.co/ccQxZ7bH/image.png'
    },
    { 
      id: 5, name: '红甲', style: 'Tactical', color: 'bg-zinc-950', text: 'text-red-600', 
      type: 'Image', desc: '战术仪表盘，关键数据高亮',
      accent: 'border-red-600/50',
      imageUrl: 'https://i.ibb.co/QzHw9c4/8.png'
    },
    { 
      id: 6, name: '背影月球', style: 'Lunar', color: 'bg-slate-900', text: 'text-blue-100', 
      type: 'Image', desc: '3D 月面纹理，潮汐引力',
      accent: 'border-slate-700',
      imageUrl: 'https://i.ibb.co/YTRdNYq5/image.png'
    },
    { 
      id: 7, name: '星空暗金', style: 'Luxury', color: 'bg-[#1a1a1a]', text: 'text-amber-500', 
      type: 'Image', desc: '黑金配色，奢华星图罗盘',
      accent: 'border-amber-500/40',
      imageUrl: 'https://i.ibb.co/7xd1QgKJ/10.png'
    },
    { 
      id: 8, name: '半月', style: 'Minimal', color: 'bg-zinc-950', text: 'text-red-500', 
      type: 'Image', desc: '极简几何构成，红线点缀',
      accent: 'border-red-900/30',
      imageUrl: 'https://i.ibb.co/p6J2kSJd/16.png'
    },
    { 
      id: 9, name: '深海潜行', style: 'Diver', color: 'bg-blue-950', text: 'text-white', 
      type: 'Image', desc: '专业潜水仪表，深海幽蓝',
      accent: 'border-blue-500',
      imageUrl: 'https://i.ibb.co/35zYYhtB/image.png'
    },
    { 
      id: 10, name: '极速仪表', style: 'Racing', color: 'bg-red-950', text: 'text-white', 
      type: 'Image', desc: '赛道基因，红色激情',
      accent: 'border-red-500',
      imageUrl: 'https://i.ibb.co/cSQbSCs7/Frame-2090052796.png'
    },
    { 
      id: 11, name: '未来极客', style: 'Glitch', color: 'bg-purple-950', text: 'text-green-400', 
      type: 'Image', desc: '故障艺术风格，赛博朋克数据流',
      accent: 'border-purple-500',
      imageUrl: 'https://i.ibb.co/bSjGGMz/Frame-2090052709.png'
    },
    { 
      id: 12, name: '包豪斯', style: 'Art', color: 'bg-amber-50', text: 'text-slate-900', 
      type: 'Image', desc: '经典包豪斯风格，几何美学与功能主义',
      accent: 'border-slate-900',
      imageUrl: 'https://i.ibb.co/PGkm1FKQ/Frame-2090050827.png'
    },
    { 
      id: 13, name: '全息投影', style: 'Holo', color: 'bg-cyan-950', text: 'text-cyan-200', 
      type: 'Image', desc: '全息3D投影效果，未来科幻风格',
      accent: 'border-cyan-400',
      imageUrl: 'https://i.ibb.co/ycvX3yhb/image.png' 
    },
    { 
      id: 14, name: '纸艺', style: 'Paper', color: 'bg-white', text: 'text-gray-800', 
      type: 'Image', desc: '层叠纸艺风格，光影与质感的细腻呈现',
      accent: 'border-gray-200',
      imageUrl: 'https://i.ibb.co/cX2C4m6Q/image.png'
    },
    { 
      id: 15, name: '液态金属', style: 'Fluid', color: 'bg-gray-400', text: 'text-black', 
      type: 'Image', desc: '流动的液态金属，极具张力的视觉冲击',
      accent: 'border-white',
      imageUrl: 'https://i.ibb.co/CZ7jRVN/646726.png'
    },
    { 
      id: 16, name: '像素大战', style: 'Pixel', color: 'bg-indigo-700', text: 'text-yellow-300', 
      type: 'Image', desc: '8-bit 复古像素风格，致敬经典街机游戏',
      accent: 'border-yellow-400',
      imageUrl: 'https://i.ibb.co/pvFKM3QW/15.png'
    },
    { 
      id: 17, name: '禅意花园', style: 'Zen', color: 'bg-stone-200', text: 'text-stone-600', 
      type: 'Image', desc: '枯山水与苔藓的微缩景观，东方禅意美学',
      accent: 'border-stone-400',
      imageUrl: 'https://i.ibb.co/20N777h0/Frame-2090050823.png'
    },
    { 
      id: 18, name: '涂鸦', style: 'Graffiti', color: 'bg-yellow-400', text: 'text-black', 
      type: 'Image', desc: '街头艺术风格，高饱和度色彩与自由奔放的线条',
      accent: 'border-black',
      imageUrl: 'https://i.ibb.co/DPN1YKzH/94.png'
    },
    { 
      id: 19, name: '蓝图', style: 'Blueprint', color: 'bg-blue-600', text: 'text-white', 
      type: 'Image', desc: '工程蓝图风格，精细的线条与数据标注',
      accent: 'border-white/50',
      imageUrl: 'https://i.ibb.co/gM3MXQ5w/image.png'
    },
    { 
      id: 20, name: '黑洞', style: 'Cosmos', color: 'bg-black', text: 'text-purple-500', 
      type: 'Image', desc: '深邃的黑洞视界，引力透镜效应扭曲了周围的光线',
      accent: 'border-purple-900',
      imageUrl: 'https://i.ibb.co/1GLpksvk/image.png'
    },
  ];

  const contentMap = {
    health: [
      { title: '心率监测', icon: <Heart className="text-red-500" />, value: '72', unit: 'bpm', desc: 'ECG 毫秒级心电分析' },
      { title: '血氧饱和', icon: <Droplets className="text-blue-500" />, value: '98', unit: '%', desc: 'TruSleep™ 睡眠呼吸监测' },
      { title: '压力监控', icon: <Zap className="text-cyan-500" />, value: '34', unit: '轻松', desc: 'HRV 压力算法实时反馈' },
      { title: '睡眠分析', icon: <Moon className="text-indigo-500" />, value: '7.5', unit: 'h', desc: 'REM 快速眼动期追踪' },
    ],
    sport: [
      { title: '户外跑步', icon: <Activity className="text-orange-500" />, value: '5.2', unit: 'km', desc: '双频 GPS 轨迹修正' },
      { title: '室内单车', icon: <Bike className="text-blue-400" />, value: '320', unit: 'kcal', desc: '功率区间与踏频分析' },
      { title: '开放水域', icon: <Waves className="text-cyan-500" />, value: '1.5', unit: 'km', desc: 'SWOLF 划水效率识别' },
      { title: '力量训练', icon: <Dumbbell className="text-slate-500" />, value: '45', unit: 'min', desc: 'AI 动作自动识别计数' },
    ],
    system: [
      { title: '应用矩阵', icon: <Grid className="text-purple-brand" />, value: 'Grid', unit: 'View', desc: '高性能 60fps 蜂窝启动器' },
      { title: '消息中心', icon: <Bell className="text-yellow-400" />, value: '3', unit: 'New', desc: '全局通知与快捷回复' },
      { title: '负一屏', icon: <Layers className="text-green-500" />, value: 'Side', unit: 'Card', desc: '情景智能服务卡片' },
      { title: '多媒体', icon: <Play className="text-pink-500" />, value: 'Mix', unit: 'Player', desc: '离线音乐与独立播放' },
    ]
  };

  const currentScreens = contentMap[activeCategory];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 space-y-32">
      
      {/* 01. Watch Interface Section */}
      <section className="relative py-10">
         <div className="absolute top-1/2 right-0 -translate-x-1/2 w-[800px] h-[800px] bg-purple-brand/5 rounded-full blur-[120px] pointer-events-none"></div>

         <div className="flex flex-col lg:flex-row gap-20 items-center">
            <div className="lg:w-5/12 space-y-12 relative z-10">
               <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 bg-black text-white px-4 py-2 rounded-full shadow-lg shadow-purple-brand/20 border border-purple-brand/30">
                     <ShieldCheck size={16} className="text-purple-brand" />
                     <span className="text-xs font-bold uppercase tracking-wider">GT-Pro OS 3.0</span>
                  </div>
                  <h3 className="text-5xl lg:text-7xl font-black leading-tight tracking-tight">
                     腕上交互 <br /> 
                     <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-brand to-pink-500">全场景进化</span>
                  </h3>
                  <p className="text-gray-500 text-lg leading-relaxed">
                     我们将手机级的流畅体验浓缩于 1.43 英寸的圆形视界。全新的“微动能”引擎，让每一次心跳、每一公里配速都跃然屏上。
                  </p>
               </div>

               {/* Category Tabs */}
               <div className="p-1.5 bg-white rounded-2xl w-fit flex gap-1 border border-gray-100 shadow-sm">
                  {(['health', 'sport', 'system'] as const).map((cat) => (
                    <button 
                      key={cat}
                      onClick={() => { setActiveCategory(cat); setActiveScreen(0); }}
                      className={`px-8 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${activeCategory === cat ? 'bg-black text-white shadow-lg scale-105' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}
                    >
                      {cat === 'health' && '健康生态'}
                      {cat === 'sport' && '专业运动'}
                      {cat === 'system' && '系统交互'}
                    </button>
                  ))}
               </div>

               {/* Dynamic Feature Grid */}
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {currentScreens.map((s, idx) => (
                    <button 
                      key={idx}
                      onClick={() => setActiveScreen(idx)}
                      className={`group p-5 rounded-[1.5rem] border text-left transition-all duration-300 relative overflow-hidden ${activeScreen === idx ? 'border-purple-brand bg-white shadow-xl shadow-purple-brand/10 scale-[1.02] ring-2 ring-purple-brand/20' : 'border-transparent bg-white/50 hover:bg-white hover:shadow-lg'}`}
                    >
                       <div className="relative z-10 flex flex-col h-full justify-between gap-3">
                          <div className="flex justify-between items-start">
                             <div className={`p-2.5 rounded-xl transition-colors ${activeScreen === idx ? 'bg-purple-brand text-white shadow-lg' : 'bg-gray-100 text-gray-500 group-hover:bg-purple-brand group-hover:text-white'}`}>
                                {s.icon}
                             </div>
                             {activeScreen === idx && <div className="w-2 h-2 bg-purple-brand rounded-full animate-pulse shadow-[0_0_10px_#8A84FF]"></div>}
                          </div>
                          <div>
                             <span className="font-bold text-gray-900 block mb-1">{s.title}</span>
                             <p className="text-xs text-gray-400 font-medium leading-relaxed">{s.desc}</p>
                          </div>
                       </div>
                    </button>
                  ))}
               </div>
            </div>

            {/* Right: Watch Simulator */}
            <div className="lg:w-7/12 flex justify-center lg:justify-end relative">
               <div className="relative w-[420px] h-[520px] flex items-center justify-center scale-90 sm:scale-100 transition-transform duration-500">
                  <div className="absolute top-0 w-[180px] h-1/2 bg-[#222] rounded-t-[3rem] -z-10 transform -translate-y-20 shadow-inner"></div>
                  <div className="absolute bottom-0 w-[180px] h-1/2 bg-[#222] rounded-b-[3rem] -z-10 transform translate-y-20 shadow-inner"></div>

                  <div className="w-[400px] h-[400px] rounded-full shadow-[0_40px_80px_rgba(0,0,0,0.5)] flex items-center justify-center relative z-10 bg-gradient-to-br from-zinc-700 via-black to-zinc-900 ring-1 ring-white/10">
                     <div className="absolute -right-2 top-1/3 w-4 h-12 bg-gradient-to-l from-zinc-600 to-zinc-800 rounded-r-lg"></div>
                     <div className="absolute -right-2 bottom-1/3 w-4 h-8 bg-gradient-to-l from-zinc-600 to-zinc-800 rounded-r-lg"></div>

                     <div className="w-[380px] h-[380px] bg-black rounded-full relative flex items-center justify-center overflow-hidden border-[12px] border-black">
                        <div className="w-full h-full relative z-20 text-white animate-in fade-in zoom-in duration-500 font-sans">
                           {/* Replace dynamic component rendering with image display based on category and screen */}
                           <img 
                              key={`${activeCategory}-${activeScreen}`}
                              src={uiScreenImages[activeCategory][activeScreen] || uiScreenImages[activeCategory][0]} 
                              alt={`${activeCategory} UI`} 
                              className="w-full h-full object-cover transition-opacity duration-500"
                           />
                           
                           {/* Overlay for realism */}
                           <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none rounded-full"></div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* 02. Watch Face Gallery */}
      <section className="space-y-16">
        <div className="text-center space-y-4">
          <h3 className="text-4xl font-black">20款 表盘艺术画廊</h3>
          <p className="text-gray-500 max-w-2xl mx-auto">涵盖商务、运动、极简与潮流，满足全天候佩戴需求。点击查看大图细节。</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-10 gap-8 px-4">
          {watchFaces.map((face) => (
            <div 
              key={face.id} 
              className={`group flex flex-col items-center cursor-pointer transition-all duration-300`}
              onClick={() => setSelectedFaceId(face.id)}
            >
              <div className={`w-full aspect-square rounded-full ${face.color} ${face.text} border-4 border-zinc-900 shadow-xl relative flex flex-col items-center justify-center overflow-hidden transition-transform duration-300 hover:scale-110 ring-2 ring-transparent group-hover:ring-purple-brand/50`}>
                 
                 {/* Specific Renderer for Image Face */}
                 {face.imageUrl ? (
                    <img src={face.imageUrl} alt={face.name} className="w-full h-full object-cover" />
                 ) : (
                    <>
                        {/* Standard Visual Indicators for other faces */}
                        {face.type === 'Gear' && <Cog size={40} className="opacity-20 animate-spin-slow absolute" />}
                        {face.type === 'Planet' && <div className="absolute w-20 h-20 border border-white/20 rounded-full rotate-45 skew-x-12"></div>}
                        {face.type === 'Neon' && <div className="absolute inset-4 border-2 border-current rounded-full shadow-[0_0_10px_currentColor] opacity-50"></div>}
                        {face.type === 'HUD' && (
                            <div className="absolute inset-2 flex items-center justify-center">
                            <div className="w-full h-px bg-current opacity-20"></div>
                            <div className="h-full w-px bg-current opacity-20 absolute"></div>
                            <Circle size={48} className="absolute opacity-30" strokeWidth={1} />
                            </div>
                        )}
                        {face.type === 'Nature' && <div className="absolute bottom-0 w-full h-1/3 bg-white/10 blur-xl"></div>}
                        {face.type === 'Classic' && (
                            <>
                            <div className="absolute w-1 h-8 bg-current top-1/2 left-1/2 -translate-x-1/2 -translate-y-full origin-bottom rotate-45"></div>
                            <div className="absolute w-1 h-6 bg-current/70 top-1/2 left-1/2 -translate-x-1/2 -translate-y-full origin-bottom -rotate-45"></div>
                            </>
                        )}

                        <span className="text-[6px] font-black uppercase opacity-40 mb-1 relative z-10">{face.style}</span>
                        <div className="text-[10px] font-black leading-none relative z-10">10:08</div>
                        {face.type === 'Abstract' && <div className="absolute top-1/2 left-0 w-full h-px bg-red-500 rotate-45"></div>}
                        
                        {/* Decorative Ring if present */}
                        {face.accent && <div className={`absolute inset-1 rounded-full border-2 ${face.accent} opacity-50`}></div>}
                    </>
                 )}
              </div>
              <p className="text-[9px] font-bold mt-4 uppercase text-gray-500 group-hover:text-black transition-colors">{face.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 03. Companion App Dashboard */}
      <section className="bg-zinc-950 text-white rounded-[4rem] p-12 lg:p-24 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-purple-brand/10 blur-[150px] pointer-events-none"></div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
           <div className="space-y-12 relative z-10">
              <div className="space-y-6 text-center lg:text-left">
                <h3 className="text-4xl lg:text-5xl font-black leading-tight">运动健康 App <br /> 深度数据生态展示</h3>
                <p className="text-gray-400 text-lg leading-relaxed">
                   移动端 App 承担着深度数据解读的任务。我们通过四个核心 Tab：<b>健康、运动、设备、我的</b>，构建了一个完整的穿戴设备服务链路。
                </p>
                <div className="flex gap-3 justify-center lg:justify-start">
                   <div className="px-4 py-2 bg-white/5 rounded-full text-xs font-bold text-gray-400 flex items-center gap-2">
                      <TrendingUp size={14} /> 数据可视化
                   </div>
                   <div className="px-4 py-2 bg-white/5 rounded-full text-xs font-bold text-gray-400 flex items-center gap-2">
                      <Share2 size={14} /> 多设备互联
                   </div>
                </div>
              </div>

              {/* App Page Navigator */}
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                 {[
                   { id: 'home', label: '健康看板', icon: <Heart size={16} /> },
                   { id: 'exercise', label: '运动记录', icon: <MapIcon size={16} /> },
                   { id: 'device', label: '设备中心', icon: <Smartphone size={16} /> },
                   { id: 'me', label: '成就体系', icon: <Award size={16} /> }
                 ].map((tab) => (
                   <button 
                    key={tab.id}
                    onClick={() => setActiveAppTab(tab.id as any)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition-all ${activeAppTab === tab.id ? 'bg-purple-brand text-white shadow-lg' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
                   >
                     {tab.icon}
                     {tab.label}
                   </button>
                 ))}
              </div>
           </div>

           {/* Mobile App Screen High-Fidelity Simulation */}
           <div className="flex justify-center relative">
              <div className="w-[340px] h-[680px] bg-zinc-900 rounded-[3.5rem] p-4 shadow-2xl border-8 border-zinc-800 relative z-20">
                 <div className={`w-full h-full rounded-[2.5rem] flex flex-col overflow-hidden relative transition-colors duration-500 ${isDarkMode ? 'bg-[#09090b] text-white' : 'bg-[#F5F5F7] text-gray-900'}`}>
                    
                    {/* Status Bar */}
                    <div className={`px-6 pt-3 pb-2 flex justify-between items-center text-[10px] font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} relative z-20`}>
                       <span>12:30</span>
                       <div className="flex items-center gap-3">
                          {/* Theme Toggle */}
                          <button 
                            onClick={() => setIsDarkMode(!isDarkMode)} 
                            className={`rounded-full p-1 transition-colors ${isDarkMode ? 'hover:bg-white/10 text-yellow-400' : 'hover:bg-black/5 text-purple-600'}`}
                          >
                            {isDarkMode ? <Sun size={12} /> : <Moon size={12} />}
                          </button>
                          <div className="flex gap-1.5">
                             <div className={`w-3 h-3 rounded-full ${isDarkMode ? 'bg-white/20' : 'bg-black/20'}`}></div>
                             <div className={`w-3 h-3 rounded-full ${isDarkMode ? 'bg-white/20' : 'bg-black/20'}`}></div>
                             <div className={`w-4 h-3 rounded-sm ${isDarkMode ? 'bg-white/20' : 'bg-black/20'}`}></div>
                          </div>
                       </div>
                    </div>

                    {/* Inner App Content Area */}
                    <div className="flex-1 overflow-y-auto no-scrollbar relative" key={activeAppTab}>
                       
                       {/* --- Detail Views Logic --- */}
                       {appDetailView === 'heart' ? (
                          <div className={`p-5 space-y-6 animate-in slide-in-from-right-8 duration-500 min-h-full ${isDarkMode ? 'bg-black' : 'bg-white'}`}>
                             <div className="flex items-center gap-4 mb-4">
                                <button onClick={() => setAppDetailView(null)} className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isDarkMode ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-gray-100 hover:bg-gray-200 text-black'}`}><ChevronLeft size={18} /></button>
                                <h3 className="text-lg font-bold">心脏健康</h3>
                             </div>
                             
                             <div className="bg-gradient-to-br from-red-900/40 to-black p-6 rounded-[2rem] border border-red-500/20 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 opacity-20"><Heart size={80} /></div>
                                <div className="text-xs font-bold text-red-400 uppercase mb-1">当前心率 (BPM)</div>
                                <div className="text-5xl font-black text-white mb-4">72</div>
                                {/* Detailed Graph (Static) */}
                                <div className="h-32 w-full flex items-end gap-1">
                                   {Array.from({length: 40}).map((_, i) => {
                                      // Static sine wave pattern
                                      const val = 50 + Math.sin(i * 0.3) * 20 + Math.cos(i * 0.8) * 10;
                                      return (
                                        <div key={i} className="flex-1 bg-red-500/50 rounded-t-sm hover:bg-red-500 transition-colors group relative" style={{ height: `${val}%` }}>
                                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 bg-white text-black text-[8px] px-1 py-0.5 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">
                                                {Math.round(val + 40)} bpm
                                            </div>
                                        </div>
                                      );
                                   })}
                                </div>
                                <div className="flex justify-between text-[9px] text-gray-500 mt-2 font-mono uppercase">
                                   <span>00:00</span><span>12:00</span><span>24:00</span>
                                </div>
                             </div>

                             <div className="space-y-3">
                                <h4 className={`text-xs font-bold uppercase ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>心率区间分布</h4>
                                <div className="space-y-2">
                                   {[
                                      { label: '极限', range: '160-180', time: '2m', color: 'bg-red-500', width: '10%' },
                                      { label: '无氧', range: '140-160', time: '15m', color: 'bg-orange-500', width: '30%' },
                                      { label: '有氧', range: '120-140', time: '45m', color: 'bg-yellow-500', width: '60%' },
                                      { label: '燃脂', range: '100-120', time: '20m', color: 'bg-green-500', width: '25%' },
                                      { label: '热身', range: '80-100', time: '10m', color: 'bg-blue-500', width: '15%' },
                                   ].map((zone, i) => (
                                      <div key={i} className="flex items-center gap-3 text-[10px]">
                                         <div className={`w-16 font-bold ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{zone.label}</div>
                                         <div className={`flex-1 h-2 rounded-full overflow-hidden ${isDarkMode ? 'bg-white/5' : 'bg-gray-100'}`}>
                                            <div className={`h-full ${zone.color}`} style={{ width: zone.width }}></div>
                                         </div>
                                         <div className="w-8 text-right text-gray-500">{zone.time}</div>
                                      </div>
                                   ))}
                                </div>
                             </div>

                             <div className={`p-4 rounded-2xl ${isDarkMode ? 'bg-white/5 border border-white/5' : 'bg-white border border-gray-100 shadow-sm'}`}>
                                <div className="flex justify-between items-center mb-2">
                                   <span className={`text-xs font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>HRV 压力状态</span>
                                   <span className="text-[10px] bg-green-500/20 text-green-500 px-2 py-0.5 rounded font-bold">正常</span>
                                </div>
                                <p className="text-[10px] text-gray-500 leading-relaxed">
                                   您的心率变异性指数保持在 45ms 左右，显示您的身体恢复状况良好，适合进行中高强度训练。
                                </p>
                             </div>
                          </div>
                       ) : appDetailView === 'sleep' ? (
                          <div className={`p-5 space-y-6 animate-in slide-in-from-right-8 duration-500 min-h-full ${isDarkMode ? 'bg-black' : 'bg-white'}`}>
                             <div className="flex items-center gap-4 mb-4">
                                <button onClick={() => setAppDetailView(null)} className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isDarkMode ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-gray-100 hover:bg-gray-200 text-black'}`}><ChevronLeft size={18} /></button>
                                <h3 className="text-lg font-bold">睡眠分析</h3>
                             </div>

                             <div className="bg-indigo-900/20 p-6 rounded-[2rem] border border-indigo-500/20 text-center">
                                <div className="text-xs font-bold text-indigo-300 uppercase mb-2">睡眠评分</div>
                                <div className="text-6xl font-black text-white mb-2">88</div>
                                <div className="text-[10px] text-gray-400">优于 72% 的用户</div>
                             </div>

                             <div className="space-y-4">
                                <h4 className="text-xs font-bold text-gray-400 uppercase">睡眠分期 (Hypnogram)</h4>
                                <div className="h-40 w-full flex items-end gap-0.5">
                                   {Array.from({length: 50}).map((_, i) => {
                                      // Static deterministic pattern for sleep stages
                                      const check = (i * 7) % 100;
                                      const stage = check > 85 ? 0 : check > 65 ? 1 : check > 30 ? 2 : 3;
                                      
                                      const height = stage === 0 ? '100%' : stage === 1 ? '75%' : stage === 2 ? '50%' : '25%';
                                      const color = stage === 0 ? 'bg-orange-400' : stage === 1 ? 'bg-blue-300' : stage === 2 ? 'bg-indigo-400' : 'bg-purple-600';
                                      return (
                                         <div key={i} className={`flex-1 ${color} rounded-sm`} style={{ height }}></div>
                                      );
                                   })}
                                </div>
                                <div className="flex justify-between text-[8px] text-gray-500 uppercase font-bold">
                                   <span className="flex items-center gap-1"><div className="w-2 h-2 bg-purple-600 rounded-full"></div> 深睡</span>
                                   <span className="flex items-center gap-1"><div className="w-2 h-2 bg-indigo-400 rounded-full"></div> 浅睡</span>
                                   <span className="flex items-center gap-1"><div className="w-2 h-2 bg-blue-300 rounded-full"></div> 眼动</span>
                                   <span className="flex items-center gap-1"><div className="w-2 h-2 bg-orange-400 rounded-full"></div> 清醒</span>
                                </div>
                             </div>

                             <div className="grid grid-cols-2 gap-3">
                                <div className={`p-4 rounded-2xl ${isDarkMode ? 'bg-white/5' : 'bg-gray-50'}`}>
                                   <div className="text-xs text-gray-400 mb-1">总睡眠时长</div>
                                   <div className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>7h 42m</div>
                                </div>
                                <div className={`p-4 rounded-2xl ${isDarkMode ? 'bg-white/5' : 'bg-gray-50'}`}>
                                   <div className="text-xs text-gray-400 mb-1">深睡时长</div>
                                   <div className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>1h 50m</div>
                                </div>
                                <div className={`p-4 rounded-2xl ${isDarkMode ? 'bg-white/5' : 'bg-gray-50'}`}>
                                   <div className="text-xs text-gray-400 mb-1">呼吸质量</div>
                                   <div className="text-xl font-bold text-green-500">98/100</div>
                                </div>
                                <div className={`p-4 rounded-2xl ${isDarkMode ? 'bg-white/5' : 'bg-gray-50'}`}>
                                   <div className="text-xs text-gray-400 mb-1">清醒次数</div>
                                   <div className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>2 次</div>
                                </div>
                             </div>
                          </div>
                       ) : (
                          // Default Tabs
                          <>
                             {activeAppTab === 'home' && (
                               <div className="p-5 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                  {/* ... Existing Home Header ... */}
                                  <div className="flex justify-between items-center">
                                     <div>
                                        <div className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1">今日摘要</div>
                                        <h2 className="text-3xl font-black tracking-tight">活动圆环</h2>
                                      </div>
                                     <div className="w-10 h-10 rounded-full bg-gray-800 border border-white/10 overflow-hidden">
                                        <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100" className="w-full h-full object-cover opacity-80" />
                                     </div>
                                  </div>

                                  {/* Activity Rings (Keep existing) */}
                                  <div className={`p-6 rounded-[2rem] relative overflow-hidden transition-colors ${isDarkMode ? 'bg-zinc-900/80 border border-white/10' : 'bg-white border border-gray-100 shadow-sm'}`}>
                                     <div className="flex justify-center items-center py-4">
                                        <div className="w-48 h-48 relative">
                                           {/* ... Rings SVG ... */}
                                           <svg className="w-full h-full -rotate-90 absolute inset-0" viewBox="0 0 192 192">
                                              <circle cx="96" cy="96" r="76" className={`fill-none ${isDarkMode ? 'stroke-red-900/20' : 'stroke-red-100'}`} strokeWidth="16" strokeLinecap="round" />
                                              <circle cx="96" cy="96" r="76" className="stroke-red-500 fill-none drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]" strokeWidth="16" strokeDasharray="477" strokeDashoffset="120" strokeLinecap="round" />
                                              <circle cx="96" cy="20" r="8" className="fill-red-400 shadow-[0_0_10px_#f87171]" style={{ transformOrigin: '96px 96px', transform: 'rotate(268deg)' }} />
                                           </svg>
                                           <svg className="w-full h-full -rotate-90 absolute inset-0 scale-[0.78]" viewBox="0 0 192 192">
                                              <circle cx="96" cy="96" r="76" className={`fill-none ${isDarkMode ? 'stroke-green-900/20' : 'stroke-green-100'}`} strokeWidth="20" strokeLinecap="round" />
                                              <circle cx="96" cy="96" r="76" className="stroke-emerald-500 fill-none drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]" strokeWidth="20" strokeDasharray="477" strokeDashoffset="172" strokeLinecap="round" />
                                              <circle cx="96" cy="20" r="10" className="fill-emerald-400 shadow-[0_0_10px_#34d399]" style={{ transformOrigin: '96px 96px', transform: 'rotate(230deg)' }} />
                                           </svg>
                                           <svg className="w-full h-full -rotate-90 absolute inset-0 scale-[0.56]" viewBox="0 0 192 192">
                                              <circle cx="96" cy="96" r="76" className={`fill-none ${isDarkMode ? 'stroke-blue-900/20' : 'stroke-blue-100'}`} strokeWidth="28" strokeLinecap="round" />
                                              <circle cx="96" cy="96" r="76" className="stroke-cyan-500 fill-none drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]" strokeWidth="28" strokeDasharray="477" strokeDashoffset="329" strokeLinecap="round" />
                                              <circle cx="96" cy="20" r="14" className="fill-cyan-400 shadow-[0_0_10px_#22d3ee]" style={{ transformOrigin: '96px 96px', transform: 'rotate(110deg)' }} />
                                           </svg>
                                           <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
                                              <Flame size={20} className="text-red-500 fill-red-500" />
                                              <div className={`text-2xl font-black ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>840</div>
                                              <div className="text-[9px] font-bold text-gray-500 uppercase">千卡</div>
                                           </div>
                                        </div>
                                     </div>
                                     <div className="grid grid-cols-3 gap-2 mt-2">
                                        <div className="text-center">
                                           <div className="text-[10px] text-gray-500 font-bold mb-1">活动</div>
                                           <div className="text-red-500 font-black">840/600</div>
                                        </div>
                                        <div className="text-center">
                                           <div className="text-[10px] text-gray-500 font-bold mb-1">运动</div>
                                           <div className="text-emerald-500 font-black">42/30</div>
                                        </div>
                                        <div className="text-center">
                                           <div className="text-[10px] text-gray-500 font-bold mb-1">站立</div>
                                           <div className="text-cyan-500 font-black">8/12</div>
                                        </div>
                                     </div>
                                  </div>

                                  {/* Detailed Metrics Cards - Made Clickable */}
                                  <div className="grid grid-cols-2 gap-3">
                                     <div 
                                      className={`p-4 rounded-2xl cursor-pointer transition-colors ${isDarkMode ? 'bg-red-500/10 border border-red-500/20 hover:bg-red-500/20' : 'bg-red-50 border border-red-100 hover:bg-red-100'}`}
                                      onClick={() => setAppDetailView('heart')}
                                     >
                                        <div className="flex items-center gap-2 mb-2">
                                           <Heart size={14} className="text-red-500 fill-current" />
                                           <span className="text-[10px] font-bold text-red-400 uppercase">实时心率</span>
                                        </div>
                                        <div className={`text-xl font-black flex items-center justify-between ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                           72 <ChevronRight size={14} className="text-red-500/50" />
                                        </div>
                                        <div className="h-6 flex items-end gap-0.5 mt-2 opacity-50">
                                           {[40, 60, 55, 70, 65, 80, 72].map((h, i) => (
                                              <div key={i} className="flex-1 bg-red-500 rounded-t-sm" style={{height: `${h}%`}}></div>
                                           ))}
                                        </div>
                                     </div>
                                     <div 
                                      className={`p-4 rounded-2xl cursor-pointer transition-colors ${isDarkMode ? 'bg-indigo-500/10 border border-indigo-500/20 hover:bg-indigo-500/20' : 'bg-indigo-50 border border-indigo-100 hover:bg-indigo-100'}`}
                                      onClick={() => setAppDetailView('sleep')}
                                     >
                                        <div className="flex items-center gap-2 mb-2">
                                           <Moon size={14} className="text-indigo-400 fill-current" />
                                           <span className="text-[10px] font-bold text-indigo-400 uppercase">睡眠监测</span>
                                        </div>
                                        <div className={`text-xl font-black flex items-center justify-between ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                                           7h 30m <ChevronRight size={14} className="text-indigo-500/50" />
                                        </div>
                                        <div className="flex gap-1 mt-2">
                                           <span className="text-[9px] bg-indigo-500/20 px-1.5 py-0.5 rounded text-indigo-400 font-bold">深睡 25%</span>
                                           <span className="text-[9px] bg-purple-500/20 px-1.5 py-0.5 rounded text-purple-400 font-bold">眼动 18%</span>
                                        </div>
                                     </div>
                                  </div>

                                  {/* 24-Hour Activity Distribution (Static) */}
                                  <div className={`p-5 rounded-[2rem] space-y-4 transition-colors ${isDarkMode ? 'bg-zinc-900/80 border border-white/10' : 'bg-white border border-gray-100 shadow-sm'}`}>
                                    <div className="flex items-center justify-between text-orange-500">
                                      <div className="flex items-center gap-2">
                                        <BarChart3 size={16} fill="currentColor" className="opacity-80"/>
                                        <span className="text-xs font-bold uppercase tracking-wider">24小时分布</span>
                                      </div>
                                      <span className="text-[10px] font-bold bg-orange-500/10 px-2 py-0.5 rounded text-orange-500">步数统计</span>
                                    </div>
                                    <div className="h-24 w-full flex items-end justify-between gap-[2px]">
                                      {Array.from({ length: 24 }).map((_, i) => {
                                        // Static deterministic pattern for 24h activity
                                        let h = 10; 
                                        if (i >= 7 && i <= 9) h = 60 + (i % 2) * 15;
                                        if (i >= 12 && i <= 13) h = 40 + (i % 2) * 10;
                                        if (i >= 18 && i <= 20) h = 80 + (i % 3) * 10;
                                        if (i > 9 && i < 18 && ![12,13].includes(i)) h = 25 + (i % 3) * 5;
                                        
                                        const isPeak = h > 60;
                                        return (
                                          <div key={i} className="flex-1 flex flex-col justify-end group relative h-full">
                                              <div className={`w-full rounded-sm transition-all duration-500 ${isPeak ? 'bg-gradient-to-t from-orange-600 to-orange-400' : isDarkMode ? 'bg-zinc-700/50' : 'bg-gray-200'}`} style={{ height: `${h}%` }}></div>
                                          </div>
                                        )
                                      })}
                                    </div>
                                    <div className="flex justify-between text-[9px] text-gray-500 font-bold font-mono uppercase">
                                      <span>00:00</span><span>12:00</span><span>23:59</span>
                                    </div>
                                  </div>
                               </div>
                             )}

                             {activeAppTab === 'exercise' && (
                               <div className={`h-full relative flex flex-col animate-in fade-in duration-500 ${isDarkMode ? 'bg-[#0F1115]' : 'bg-gray-100'}`}>
                                  {/* ... Existing Exercise Content ... */}
                                  <div className="absolute inset-0">
                                     <svg className="absolute inset-0 w-full h-full opacity-20">
                                        <path d="M-10,180 L80,180 Q100,180 100,200 L100,300 Q100,350 150,350 L350,350" stroke={isDarkMode ? "#27272a" : "#cbd5e1"} strokeWidth="18" fill="none" />
                                        <path d="M150,150 L150,350 L250,350 L250,220" stroke="#ec4899" strokeWidth="5" fill="none" strokeLinecap="round" className="drop-shadow-[0_0_10px_rgba(236,72,153,0.5)]" />
                                        <circle cx="250" cy="220" r="8" fill="#ec4899" stroke={isDarkMode ? "#fff" : "#fff"} strokeWidth="2" />
                                     </svg>
                                  </div>
                                  <div className="relative z-10 flex-1 flex flex-col justify-between p-5">
                                     <div className="flex justify-between items-start">
                                        <div className="bg-black/40 backdrop-blur-xl px-4 py-2 rounded-full border border-white/5 w-fit">
                                           <span className="text-[10px] font-bold uppercase text-white/90">户外跑步</span>
                                        </div>
                                        <div className="bg-black/40 backdrop-blur-xl p-2 rounded-full border border-white/5 text-white">
                                           <MapIcon size={16} />
                                        </div>
                                     </div>
                                     
                                     <div className="space-y-4">
                                        {/* Static Exercise Graph */}
                                        <div className={`h-16 flex items-end gap-1 px-4 pb-2 bg-gradient-to-t ${isDarkMode ? 'from-black/80' : 'from-gray-200/80'} to-transparent`}>
                                           {Array.from({length: 30}).map((_, i) => {
                                              const h = 30 + Math.abs(Math.sin(i * 0.5)) * 50;
                                              return (
                                                <div key={i} className="flex-1 bg-orange-500 rounded-t-sm opacity-80" style={{height: `${h}%`}}></div>
                                              )
                                           })}
                                        </div>

                                        <div className={`backdrop-blur-2xl p-6 rounded-[2.5rem] space-y-6 shadow-2xl transition-colors ${isDarkMode ? 'bg-[#09090b]/90 border border-white/10 text-white' : 'bg-white/90 border border-gray-200 text-gray-900'}`}>
                                           <div className="flex justify-between items-end">
                                              <div>
                                                 <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">总距离</div>
                                                 <div className="text-3xl font-black">5.42 <span className="text-sm text-gray-500">km</span></div>
                                              </div>
                                              <div className="text-right">
                                                 <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">平均配速</div>
                                                 <div className="text-xl font-bold text-orange-400">5'20"</div>
                                              </div>
                                           </div>
                                           <div className={`h-px ${isDarkMode ? 'bg-white/10' : 'bg-gray-100'}`}></div>
                                           <div className="text-4xl font-black font-mono tracking-tight text-center">00:42.15</div>
                                           <div className="flex gap-4">
                                              <div className="flex-1 h-12 bg-red-500 text-white rounded-2xl flex items-center justify-center font-bold shadow-[0_0_20px_rgba(239,68,68,0.4)]">停止</div>
                                              <div className={`flex-1 h-12 rounded-2xl flex items-center justify-center font-bold ${isDarkMode ? 'bg-white/10 text-white' : 'bg-gray-100 text-gray-900'}`}>暂停</div>
                                           </div>
                                        </div>
                                     </div>
                                  </div>
                               </div>
                             )}

                             {activeAppTab === 'device' && (
                               <div className="p-6 space-y-8 pt-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                  {/* ... Existing Device Content ... */}
                                  <div className="flex flex-col items-center">
                                     <div className={`w-32 h-32 rounded-full border-4 shadow-2xl flex items-center justify-center relative mb-6 ${isDarkMode ? 'bg-gradient-to-b from-gray-800 to-black border-gray-700' : 'bg-gradient-to-b from-gray-100 to-white border-gray-200'}`}>
                                        <div className={`w-28 h-28 rounded-full flex items-center justify-center border-2 ${isDarkMode ? 'bg-black border-gray-800' : 'bg-white border-gray-100'}`}>
                                           <span className={`text-3xl font-black ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>12:30</span>
                                        </div>
                                        <div className="absolute bottom-0 right-0 w-8 h-8 bg-green-500 rounded-full border-4 border-[#09090b] flex items-center justify-center">
                                           <Zap size={12} className="text-black fill-current" />
                                        </div>
                                     </div>
                                     <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>GT-Pro Ultra</h3>
                                     <p className="text-xs text-gray-500 font-mono mt-1">SN: 8842-1024-X</p>
                                  </div>

                                  <div className={`rounded-3xl p-6 border flex justify-between items-center ${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-white border-gray-100 shadow-sm'}`}>
                                     <div className="flex items-center gap-4">
                                        <Battery size={24} className="text-green-500" />
                                        <div>
                                           <div className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>电量状态</div>
                                           <div className="text-xs text-gray-500">2小时前已充满</div>
                                        </div>
                                     </div>
                                     <span className="text-xl font-black text-green-500">82%</span>
                                  </div>

                                  {/* Enhanced: Device Ecosystem */}
                                  <div className="space-y-4">
                                     <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest px-2">智能配件生态</h4>
                                     <div className={`rounded-3xl p-4 space-y-4 border ${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-white border-gray-100 shadow-sm'}`}>
                                        <div className="flex items-center justify-between">
                                           <div className="flex items-center gap-3">
                                              <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-400">
                                                 <Scale size={18} />
                                              </div>
                                              <div>
                                                 <div className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>体脂秤 S2</div>
                                                 <div className="text-[9px] text-gray-500">今日已同步</div>
                                              </div>
                                           </div>
                                           <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                        </div>
                                        <div className="flex items-center justify-between">
                                           <div className="flex items-center gap-3">
                                              <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center text-red-400">
                                                 <Activity size={18} />
                                              </div>
                                              <div>
                                                 <div className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>心率胸带</div>
                                                 <div className="text-[9px] text-gray-500">已连接</div>
                                              </div>
                                           </div>
                                           <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                        </div>
                                        <div className="text-center pt-2">
                                           <button className="text-[10px] font-bold text-purple-brand border border-purple-brand/30 px-4 py-2 rounded-full hover:bg-purple-brand/10 transition-colors">
                                              + 添加新设备
                                           </button>
                                        </div>
                                     </div>
                                  </div>

                                  {/* New: Health Monitoring Settings */}
                                  <div className="space-y-4">
                                     <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest px-2">健康监测设置</h4>
                                     <div className={`rounded-3xl overflow-hidden border ${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-white border-gray-100 shadow-sm'}`}>
                                        {[
                                          { label: '连续心率监测', active: true },
                                          { label: '自动血氧检测', active: true },
                                          { label: '压力自动监测', active: false },
                                          { label: '睡眠呼吸质量', active: true },
                                        ].map((setting, i) => (
                                          <div key={i} className={`flex justify-between items-center p-4 border-b last:border-0 transition-colors ${isDarkMode ? 'border-white/5 hover:bg-white/5' : 'border-gray-50 hover:bg-gray-50'}`}>
                                             <span className={`text-sm font-bold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{setting.label}</span>
                                             <div className={`w-10 h-6 rounded-full relative transition-colors ${setting.active ? 'bg-purple-brand' : isDarkMode ? 'bg-gray-600' : 'bg-gray-300'}`}>
                                                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${setting.active ? 'right-1' : 'left-1'}`}></div>
                                             </div>
                                          </div>
                                        ))}
                                     </div>
                                  </div>

                                  {/* Quick Apps */}
                                  <div className="space-y-4">
                                     <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest px-2">快捷应用</h4>
                                     <div className="grid grid-cols-3 gap-3">
                                        {[
                                          { name: '钱包', icon: <CreditCard size={20} />, color: 'bg-blue-500' },
                                          { name: '音乐', icon: <Music size={20} />, color: 'bg-red-500' },
                                          { name: '闹钟', icon: <Clock size={20} />, color: 'bg-orange-500' }
                                        ].map((app, i) => (
                                          <div key={i} className={`rounded-2xl p-4 flex flex-col items-center gap-2 transition-colors cursor-pointer ${isDarkMode ? 'bg-white/5 hover:bg-white/10' : 'bg-white border border-gray-100 shadow-sm hover:bg-gray-50'}`}>
                                             <div className={`w-10 h-10 rounded-full ${app.color} flex items-center justify-center text-white`}>
                                                {app.icon}
                                             </div>
                                             <span className="text-[10px] font-bold text-gray-400">{app.name}</span>
                                          </div>
                                        ))}
                                     </div>
                                  </div>
                               </div>
                             )}

                             {activeAppTab === 'me' && (
                               <div className="p-6 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                  {/* ... Existing Me Content ... */}
                                  <div className="flex items-center gap-4 pt-4">
                                     <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-purple-brand to-pink-500 p-[2px]">
                                        <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100" className="w-full h-full rounded-full border-2 border-black object-cover" />
                                     </div>
                                     <div>
                                        <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Alex Chen</h3>
                                        <div className="flex gap-2 mt-1">
                                           <span className="bg-yellow-500/20 text-yellow-500 text-[9px] font-bold px-2 py-0.5 rounded">金牌会员</span>
                                           <span className={`text-[9px] font-bold px-2 py-0.5 rounded ${isDarkMode ? 'bg-white/10 text-gray-400' : 'bg-gray-200 text-gray-600'}`}>LV. 42</span>
                                        </div>
                                     </div>
                                  </div>

                                  {/* Weekly Report */}
                                  <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-6 border border-white/10 relative overflow-hidden text-white shadow-xl">
                                     <div className="absolute top-0 right-0 w-32 h-32 bg-purple-brand/20 rounded-full blur-3xl"></div>
                                     <div className="relative z-10">
                                         <div className="flex justify-between items-start mb-4">
                                            <div>
                                               <h4 className="text-lg font-bold text-white">周报分析</h4>
                                               <p className="text-xs text-gray-400">Oct 24 - Oct 30</p>
                                            </div>
                                            <BarChart3 className="text-purple-brand" size={20} />
                                         </div>
                                         <div className="flex items-end gap-2 h-24 mb-2">
                                            {[40, 65, 30, 85, 50, 90, 60].map((h, i) => (
                                               <div key={i} className="flex-1 bg-purple-brand/20 rounded-t-sm relative group">
                                                  <div className="absolute bottom-0 w-full bg-purple-brand rounded-t-sm transition-all duration-500" style={{ height: `${h}%` }}></div>
                                               </div>
                                            ))}
                                         </div>
                                         <div className="flex justify-between text-[10px] text-gray-500 font-bold uppercase">
                                            <span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span>
                                         </div>
                                      </div>
                                  </div>

                                  <div className="grid grid-cols-2 gap-4">
                                     <div className={`p-4 rounded-2xl border ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-gray-100 shadow-sm'}`}>
                                        <Trophy className="text-yellow-500 mb-2" size={20} />
                                        <div className={`text-2xl font-black ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>12</div>
                                        <div className="text-[10px] text-gray-500 uppercase font-bold">获得奖章</div>
                                     </div>
                                     <div className={`p-4 rounded-2xl border ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-gray-100 shadow-sm'}`}>
                                        <Target className="text-red-500 mb-2" size={20} />
                                        <div className={`text-2xl font-black ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>85%</div>
                                        <div className="text-[10px] text-gray-500 uppercase font-bold">目标达成率</div>
                                     </div>
                                  </div>

                                  {/* Personal Bests */}
                                  <div className="space-y-4">
                                     <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest px-2">个人最佳记录</h4>
                                     <div className="space-y-3">
                                        {[
                                          { label: '最快 5公里', value: '24:12', date: '2023.10.12', icon: <Timer size={16} /> },
                                          { label: '最长跑步', value: '15.4 km', date: '2023.09.08', icon: <MapIcon size={16} /> },
                                          { label: '单日最高步数', value: '24,302', date: '2023.08.15', icon: <Footprints size={16} /> },
                                        ].map((pb, i) => (
                                          <div key={i} className={`flex items-center justify-between p-4 rounded-2xl border ${isDarkMode ? 'bg-white/5 border-white/5' : 'bg-white border-gray-100 shadow-sm'}`}>
                                             <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-yellow-500/20 text-yellow-500 flex items-center justify-center">
                                                   {pb.icon}
                                                </div>
                                                <div>
                                                   <div className={`text-xs font-bold ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{pb.label}</div>
                                                   <div className="text-[10px] text-gray-500">{pb.date}</div>
                                                </div>
                                             </div>
                                             <div className={`text-lg font-black ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{pb.value}</div>
                                          </div>
                                        ))}
                                     </div>
                                  </div>
                               </div>
                             )}
                          </>
                       )}

                    </div>

                    {/* App Bottom Navigation Bar */}
                    <div className={`h-20 backdrop-blur-xl border-t flex items-center justify-around px-2 relative z-20 ${isDarkMode ? 'bg-[#09090b]/90 border-white/5' : 'bg-white/90 border-gray-200'}`}>
                       {[{ id: 'home', icon: <Heart size={20} /> }, { id: 'exercise', icon: <MapIcon size={20} /> }, { id: 'device', icon: <Smartphone size={20} /> }, { id: 'me', icon: <UserIcon size={20} /> }].map((item) => (
                         <button key={item.id} onClick={() => setActiveAppTab(item.id as any)} className={`p-2 rounded-xl transition-all ${activeAppTab === item.id ? 'text-purple-brand bg-purple-brand/10' : isDarkMode ? 'text-gray-600 hover:text-gray-400' : 'text-gray-400 hover:text-gray-600'}`}>
                            {item.icon}
                         </button>
                       ))}
                    </div>
                    <div className={`absolute bottom-1 left-1/2 -translate-x-1/2 h-1 w-24 rounded-full z-30 ${isDarkMode ? 'bg-white/20' : 'bg-gray-300'}`}></div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* 04. Design Specifications (New Section) */}
      <section className="bg-white rounded-[4rem] p-12 lg:p-24 space-y-24 border border-gray-100 shadow-xl overflow-hidden relative">
         <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gray-50 rounded-full blur-[100px] pointer-events-none -z-10"></div>
         
         {/* Title */}
         <div className="text-center space-y-4">
            <h3 className="text-4xl font-black">UI 设计规范 <br /><span className="text-purple-brand">GT-Pro OS Design System</span></h3>
            <p className="text-gray-500 max-w-2xl mx-auto">
               一套专为 1.43 英寸圆形屏幕打造的原子化设计系统。我们定义了从色彩、排版到交互反馈的完整规范，确保在受限空间内提供一致且高效的用户体验。
            </p>
         </div>

         {/* 1. Color System */}
         <div className="space-y-8">
            <h4 className="text-2xl font-bold flex items-center gap-3">
               <Palette className="text-purple-brand" size={28} />
               色彩体系 (Neon-Dark Color)
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
               {[
                  { name: 'Primary Purple', hex: '#8A84FF', bg: 'bg-[#8A84FF]', text: 'text-white' },
                  { name: 'Heart Rate Red', hex: '#EF4444', bg: 'bg-red-500', text: 'text-white' },
                  { name: 'Activity Orange', hex: '#F97316', bg: 'bg-orange-500', text: 'text-white' },
                  { name: 'Data Green', hex: '#10B981', bg: 'bg-emerald-500', text: 'text-white' },
                  { name: 'True Black', hex: '#000000', bg: 'bg-black', text: 'text-white' },
               ].map((c, i) => (
                  <div key={i} className="space-y-3 group">
                     <div className={`h-24 rounded-2xl ${c.bg} shadow-lg flex items-center justify-center transition-transform group-hover:scale-105 border border-black/5`}>
                        <span className={`text-xs font-bold uppercase ${c.text}`}>{c.hex}</span>
                     </div>
                     <div>
                        <div className="font-bold text-sm">{c.name}</div>
                        <div className="text-[10px] text-gray-400 uppercase tracking-wider">Usage Example</div>
                     </div>
                  </div>
               ))}
            </div>
         </div>

         {/* 2. Typography */}
         <div className="space-y-8">
            <h4 className="text-2xl font-bold flex items-center gap-3">
               <Type className="text-purple-brand" size={28} />
               排版规范 (Typography)
            </h4>
            <div className="bg-gray-50 rounded-3xl p-8 lg:p-12 border border-gray-100 flex flex-col md:flex-row gap-12 items-start">
               <div className="flex-1 space-y-8">
                  <div>
                     <span className="text-6xl font-black tracking-tighter text-gray-900">Aa</span>
                     <p className="mt-4 font-bold text-lg">DIN Alternate</p>
                     <p className="text-gray-500 text-sm">Primary Font for Numbers & Data</p>
                  </div>
                  <div className="space-y-2">
                     <div className="flex items-baseline justify-between border-b border-gray-200 pb-2">
                        <span className="text-4xl font-black tracking-tighter">10:24</span>
                        <span className="text-xs font-mono text-gray-400">Heading 1 / 48px</span>
                     </div>
                     <div className="flex items-baseline justify-between border-b border-gray-200 pb-2">
                        <span className="text-2xl font-bold">Health Data</span>
                        <span className="text-xs font-mono text-gray-400">Heading 2 / 24px</span>
                     </div>
                     <div className="flex items-baseline justify-between border-b border-gray-200 pb-2">
                        <span className="text-base font-medium text-gray-600">Body text description</span>
                        <span className="text-xs font-mono text-gray-400">Body / 16px</span>
                     </div>
                  </div>
               </div>
               <div className="w-full md:w-1/3 bg-black rounded-2xl p-6 text-white shadow-xl">
                  <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-4">Preview</div>
                  <div className="text-5xl font-black mb-1">86</div>
                  <div className="text-sm font-bold text-red-500 mb-6">BPM</div>
                  <div className="text-5xl font-black mb-1">5.2</div>
                  <div className="text-sm font-bold text-orange-500">KM Run</div>
               </div>
            </div>
         </div>

         {/* 3. Atomic Components */}
         <div className="space-y-8">
            <h4 className="text-2xl font-bold flex items-center gap-3">
               <Grid3x3 className="text-purple-brand" size={28} />
               原子组件 (Atomic Components)
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               {/* Buttons */}
               <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 space-y-6">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Buttons</span>
                  <div className="space-y-4">
                     <button className="w-full py-4 rounded-full bg-black text-white font-bold shadow-lg flex items-center justify-center gap-2">
                        <Play size={16} fill="white" /> Primary Action
                     </button>
                     <div className="flex gap-4">
                        <button className="flex-1 py-4 rounded-2xl bg-white border border-gray-200 font-bold shadow-sm text-gray-700">Secondary</button>
                        <button className="w-14 h-14 rounded-full bg-purple-brand text-white flex items-center justify-center shadow-lg shadow-purple-brand/30">
                           <Check size={24} />
                        </button>
                     </div>
                  </div>
               </div>

               {/* Cards */}
               <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 space-y-6">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Data Cards</span>
                  <div className="bg-black rounded-2xl p-5 text-white shadow-xl">
                     <div className="flex justify-between items-center mb-2">
                        <Heart size={16} className="text-red-500" />
                        <span className="text-[10px] font-bold text-gray-500">LIVE</span>
                     </div>
                     <div className="text-3xl font-black">124 <span className="text-sm text-gray-500">BPM</span></div>
                  </div>
                  <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-center gap-4">
                     <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                        <Flame size={20} />
                     </div>
                     <div>
                        <div className="font-bold text-gray-900">Calories</div>
                        <div className="text-xs text-gray-500">480 kcal</div>
                     </div>
                  </div>
               </div>

               {/* Charts */}
               <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100 space-y-6">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Micro Charts</span>
                  <div className="h-24 flex items-end gap-1">
                     {[40, 60, 35, 80, 55, 90, 45].map((h, i) => (
                        <div key={i} className="flex-1 bg-purple-brand/20 rounded-t-sm overflow-hidden relative">
                           <div className="absolute bottom-0 left-0 w-full bg-purple-brand transition-all hover:bg-purple-600" style={{ height: `${h}%` }}></div>
                        </div>
                     ))}
                  </div>
                  <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                     <div className="absolute left-0 top-0 h-full w-3/4 bg-gradient-to-r from-blue-400 to-purple-500"></div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* Watch Face Zoom Overlay */}
      {selectedFaceId !== null && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-8 animate-in fade-in duration-300" onClick={() => setSelectedFaceId(null)}>
           {(() => {
              const face = watchFaces.find(f => f.id === selectedFaceId);
              if (!face) return null;
              return (
                 <div className="relative transform transition-all animate-in zoom-in-95 duration-300" onClick={e => e.stopPropagation()}>
                    <div className={`w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] rounded-full ${face.color} ${face.text} border-8 border-gray-800 shadow-2xl flex flex-col items-center justify-center relative overflow-hidden ring-4 ring-white/10`}>
                       
                       {/* Enhanced Details for Zoomed View */}
                       {face.imageUrl ? (
                          <img src={face.imageUrl} className="w-full h-full object-cover" alt={face.name} />
                       ) : (
                          <>
                            {face.type === 'Gear' && (
                                <div className="absolute inset-0 flex items-center justify-center opacity-30 animate-spin-slow">
                                    <Cog size={300} />
                                </div>
                            )}
                            {face.type === 'Planet' && (
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/20 to-transparent rotate-45 transform scale-150"></div>
                            )}
                            {face.type === 'Neon' && (
                                <div className="absolute inset-0 border-[20px] border-emerald-500/20 rounded-full"></div>
                            )}
                            {face.type === 'HUD' && (
                                <div className="absolute inset-2 flex items-center justify-center">
                                    <div className="w-full h-px bg-current opacity-20"></div>
                                    <div className="h-full w-px bg-current opacity-20 absolute"></div>
                                    <Circle size={48} className="absolute opacity-30 scale-150" strokeWidth={1} />
                                </div>
                            )}
                            {face.type === 'Nature' && (
                                <div className="absolute bottom-0 w-full h-1/3 bg-white/10 blur-xl"></div>
                            )}
                            {face.type === 'Classic' && (
                                <>
                                    <div className="absolute w-2 h-16 bg-current top-1/2 left-1/2 -translate-x-1/2 -translate-y-full origin-bottom rotate-45"></div>
                                    <div className="absolute w-2 h-12 bg-current/70 top-1/2 left-1/2 -translate-x-1/2 -translate-y-full origin-bottom -rotate-45"></div>
                                </>
                            )}

                            {/* Time Display */}
                            <span className="text-xl font-black uppercase opacity-40 mb-2 relative z-10">{face.style}</span>
                            <div className="text-8xl font-black leading-none relative z-10">10:08</div>
                            <div className="absolute bottom-16 flex gap-6 text-sm font-bold opacity-60 relative z-10">
                                <span>MON 24</span>
                                <span>24°C</span>
                            </div>
                          </>
                       )}
                       {face.desc && <div className="absolute bottom-8 text-xs font-medium opacity-50 max-w-[200px] text-center z-50">{face.desc}</div>}
                    </div>
                    <button onClick={() => setSelectedFaceId(null)} className="absolute -bottom-20 left-1/2 -translate-x-1/2 text-white/50 hover:text-white flex flex-col items-center gap-2">
                       <X size={32} />
                       <span className="text-xs uppercase tracking-widest">Close Preview</span>
                    </button>
                 </div>
              );
           })()}
        </div>
      )}
    </div>
  );
};

// CSS 动画增强
const style = document.createElement('style');
style.textContent = `
  @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
  .animate-spin-slow { animation: spin-slow 12s linear infinite; }
`;
document.head.appendChild(style);
