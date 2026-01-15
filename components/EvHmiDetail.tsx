
import React, { useState, useEffect } from 'react';
import { 
  Car, Zap, Gauge, Navigation, Music, Wind, 
  MapPin, Fan, Thermometer, ShieldCheck, 
  Settings, Radio, BatteryCharging, Power,
  ChevronRight, Play, SkipForward, SkipBack,
  Phone, MessageSquare, Mic, Layers, Grid,
  Maximize2, Lock, Unlock, Pause, Repeat, Repeat1,
  Shuffle, Smartphone, Bluetooth, Wifi,
  Sun, Moon, Droplets, ArrowUp, Key, AlertTriangle,
  Search, Volume2, Cloud, MoreHorizontal, User,
  Sparkles, PhoneCall, X, LayoutGrid, ToggleLeft, ToggleRight,
  Palette, Type, ChevronUp, ChevronDown
} from 'lucide-react';

export const EvHmiDetail: React.FC = () => {
  // Vehicle State
  const [gear, setGear] = useState<'P'|'R'|'N'|'D'>('P');
  const [speed, setSpeed] = useState(0);
  const [battery, setBattery] = useState(82);
  const [isLocked, setIsLocked] = useState(true);
  const [trunkOpen, setTrunkOpen] = useState(false);
  const [isCharging, setIsCharging] = useState(true);
  const [isClimateOn, setIsClimateOn] = useState(false);
  
  // Windows State
  const [windows, setWindows] = useState({ fl: 0, fr: 0, rl: 0, rr: 0 }); // 0% closed, 100% open

  // Climate State
  const [tempLeft, setTempLeft] = useState(22.5);
  const [tempRight, setTempRight] = useState(23.5);
  const [fanLevel, setFanLevel] = useState(2);
  const [seatHeatL, setSeatHeatL] = useState(0); // 0-3
  const [seatVentL, setSeatVentL] = useState(0); // 0-3
  const [seatHeatR, setSeatHeatR] = useState(0); // 0-3
  const [seatVentR, setSeatVentR] = useState(0); // 0-3

  // App State
  const [activeApp, setActiveApp] = useState<'map' | 'music' | 'phone' | 'settings' | 'apps'>('map');
  
  // Music State
  const [isPlaying, setIsPlaying] = useState(true);
  const [musicProgress, setMusicProgress] = useState(30);
  const [isShuffle, setIsShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState<'off' | 'all' | 'one'>('off');
  const [currentSong, setCurrentSong] = useState({
    title: '光年之外',
    artist: '邓紫棋',
    album: '摩天动物园',
    cover: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&q=80&w=400'
  });

  // Driving Simulation
  useEffect(() => {
    let interval: any;
    if (gear === 'D') {
      interval = setInterval(() => {
        setSpeed(prev => {
          const target = 65;
          const variation = Math.random() * 2 - 1;
          return Math.max(0, Math.floor(prev + (target - prev) * 0.05 + variation));
        });
      }, 100);
    } else {
      // Decelerate to 0 if not in Drive
      interval = setInterval(() => {
        setSpeed(prev => Math.max(0, Math.floor(prev * 0.9)));
      }, 100);
    }
    return () => clearInterval(interval);
  }, [gear]);

  // Music Progress Simulation
  useEffect(() => {
    const interval = setInterval(() => {
      if (isPlaying) {
        setMusicProgress(prev => (prev >= 100 ? 0 : prev + 0.1));
      }
    }, 100);
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 space-y-24 pb-20 bg-[#050505] text-white selection:bg-blue-500/30">
      
      {/* 1. Hero Section */}
      <section className="relative pt-20 text-center space-y-8 max-w-5xl mx-auto px-4">
         <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full border border-white/10 backdrop-blur-md">
            <Zap size={16} className="text-white" />
            <span className="text-xs font-bold uppercase tracking-widest text-white">FutureFlow OS 3.1</span>
         </div>
         <h3 className="text-5xl lg:text-7xl font-black tracking-tighter leading-tight">
            全域交互 <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500">触手可及的未来</span>
         </h3>
         <p className="text-gray-400 text-xl leading-relaxed max-w-2xl mx-auto">
            请尝试点击屏幕。从切换档位、调节空调到浏览多媒体应用，这是一套完全可交互的智能座舱高保真原型。
         </p>
      </section>

      {/* 2. Interactive HMI Screen */}
      <section className="max-w-[1400px] mx-auto px-4 lg:px-8">
         {/* Physical Bezel */}
         <div className="bg-[#111] rounded-[2rem] p-3 border-4 border-[#222] shadow-[0_50px_100px_rgba(0,0,0,0.8)] relative">
            
            {/* Screen Container */}
            <div className="relative aspect-[16/10] w-full bg-[#1a1a1a] rounded-2xl overflow-hidden flex flex-col font-sans select-none ring-1 ring-white/5">
               
               {/* --- MAIN SPLIT AREA --- */}
               <div className="flex-1 flex overflow-hidden">
                  
                  {/* LEFT PANEL: Driving Visualization (30%) */}
                  <div className="w-[30%] bg-gradient-to-b from-[#2a2a2a] to-[#1a1a1a] relative flex flex-col border-r border-black/20 z-10 shadow-2xl">
                     
                     {/* Top Status */}
                     <div className="p-6 flex justify-between items-start">
                        <div className="flex flex-col">
                           <div className="flex items-baseline gap-2">
                              <span className="text-6xl font-medium tracking-tighter tabular-nums">{speed}</span>
                              <span className="text-sm font-medium text-gray-400 uppercase">km/h</span>
                           </div>
                           <div className="flex items-center gap-3 mt-2">
                              <div className="px-2 py-0.5 rounded border border-gray-600 text-[10px] font-bold text-gray-400">限速 80</div>
                              {/* Gear Selector */}
                              <div className="flex gap-1 bg-black/20 p-1 rounded-lg">
                                 {['P', 'R', 'N', 'D'].map(g => (
                                    <button 
                                       key={g}
                                       onClick={() => setGear(g as any)}
                                       className={`w-6 h-6 flex items-center justify-center rounded text-sm font-bold transition-all ${gear === g ? 'bg-white text-black shadow-sm' : 'text-gray-500 hover:text-gray-300'}`}
                                    >
                                       {g}
                                    </button>
                                 ))}
                              </div>
                           </div>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                           <div className="flex gap-2 items-center">
                              <span className={`text-sm font-bold ${battery < 20 ? 'text-red-500' : 'text-green-400'}`}>{battery}%</span>
                              <BatteryCharging size={18} className={battery < 20 ? 'text-red-500' : 'text-green-400'} />
                           </div>
                           <span className="text-[10px] text-gray-500">420 km</span>
                        </div>
                     </div>

                     {/* 3D Car Visualization Area */}
                     <div className="flex-1 relative flex items-center justify-center perspective-[800px] overflow-hidden group">
                        {/* Dynamic Road Lines */}
                        <div className="absolute inset-0 flex justify-center transform-style-3d">
                           <div className={`w-[2px] h-[200%] bg-gray-600/30 absolute left-1/2 -ml-20 transform-gpu ${gear === 'D' && speed > 0 ? 'animate-road-move' : ''}`} style={{ animationDuration: `${2000 / (speed || 1)}ms` }}></div>
                           <div className={`w-[2px] h-[200%] bg-gray-600/30 absolute right-1/2 -mr-20 transform-gpu ${gear === 'D' && speed > 0 ? 'animate-road-move' : ''}`} style={{ animationDuration: `${2000 / (speed || 1)}ms` }}></div>
                        </div>
                        
                        {/* The Car Model */}
                        <div 
                           className="relative z-10 transform rotate-x-12 cursor-pointer transition-transform duration-500 active:scale-95"
                           onClick={() => setTrunkOpen(!trunkOpen)}
                        >
                           <div className="relative">
                              <Car size={180} className="text-gray-200 fill-[#222] drop-shadow-2xl" strokeWidth={1} />
                              
                              {/* Headlights */}
                              <div className="absolute top-10 left-2 w-8 h-24 bg-white/20 blur-xl rounded-full transform -rotate-12 opacity-80"></div>
                              <div className="absolute top-10 right-2 w-8 h-24 bg-white/20 blur-xl rounded-full transform rotate-12 opacity-80"></div>
                              
                              {/* Brake Lights (Active when P or Speed decreasing) */}
                              {(gear === 'P' || speed === 0) && (
                                 <>
                                    <div className="absolute bottom-8 left-4 w-4 h-2 bg-red-600 blur-sm rounded-full shadow-[0_0_10px_red]"></div>
                                    <div className="absolute bottom-8 right-4 w-4 h-2 bg-red-600 blur-sm rounded-full shadow-[0_0_10px_red]"></div>
                                 </>
                              )}

                              {/* Trunk Visualization */}
                              <div className={`absolute top-[60%] left-1/2 -translate-x-1/2 w-20 h-2 bg-black/50 blur-sm transition-all duration-700 ${trunkOpen ? 'w-24 opacity-100' : 'w-0 opacity-0'}`}></div>
                           </div>
                           
                           {/* Trunk Label */}
                           {trunkOpen && (
                              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-12 bg-black/80 text-white text-[10px] px-2 py-1 rounded border border-white/20 animate-in fade-in zoom-in slide-in-from-bottom-2">
                                 后备箱已开启
                              </div>
                           )}
                        </div>
                     </div>

                     {/* Quick Controls Bar */}
                     <div className="p-6 grid grid-cols-4 gap-4 justify-items-center bg-[#1a1a1a]">
                        <button 
                           onClick={() => setIsLocked(!isLocked)} 
                           className={`p-3 rounded-full transition-all ${isLocked ? 'bg-gray-800 text-gray-400' : 'bg-white text-black'}`}
                        >
                           {isLocked ? <Lock size={20} /> : <Unlock size={20} />}
                        </button>
                        <button className="p-3 rounded-full hover:bg-gray-800 transition-colors text-gray-400 hover:text-white">
                           <Zap size={20} />
                        </button>
                        <button 
                           onClick={() => setTrunkOpen(!trunkOpen)}
                           className={`p-3 rounded-full transition-all ${trunkOpen ? 'bg-white text-black' : 'bg-gray-800 text-gray-400 hover:text-white'}`}
                        >
                           <ArrowUp size={20} className="rotate-180" />
                        </button>
                        <button className="p-3 rounded-full hover:bg-gray-800 transition-colors text-gray-400 hover:text-white">
                           <MoreHorizontal size={20} />
                        </button>
                     </div>
                  </div>

                  {/* RIGHT PANEL: Content Area (70%) */}
                  <div className="flex-1 bg-[#222] relative overflow-hidden group">
                     
                     {/* 1. MAP APP (Default) */}
                     {activeApp === 'map' && (
                        <div className="absolute inset-0 animate-in fade-in duration-500">
                           <div className="absolute inset-0 opacity-60">
                              <img 
                                 src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=2000" 
                                 className="w-full h-full object-cover grayscale invert" 
                                 alt="Map"
                              />
                              <div className="absolute inset-0 bg-black/10"></div>
                           </div>

                           {/* Map Overlay UI */}
                           <div className="absolute top-4 left-4 right-4 flex justify-between items-start pointer-events-none">
                              <div className="bg-[#2a2a2a] shadow-xl rounded-lg p-3 flex items-center gap-3 w-80 pointer-events-auto border border-white/5 cursor-text transition-all focus-within:w-96 focus-within:bg-[#333]">
                                 <Search size={18} className="text-gray-400" />
                                 <input placeholder="搜寻地点或导航..." className="bg-transparent border-none outline-none text-sm text-white placeholder-gray-500 w-full" />
                              </div>
                              <div className="flex gap-4 items-center text-sm font-medium text-gray-200 bg-black/40 backdrop-blur-md px-4 py-2 rounded-lg pointer-events-auto">
                                 <Bluetooth size={16} className="text-blue-400" />
                                 <span className="uppercase">LTE</span>
                                 <span>14:30</span>
                                 <span>24°C</span>
                              </div>
                           </div>

                           {/* Floating Music Widget (When Map is active but music playing) */}
                           <div 
                              onClick={() => setActiveApp('music')}
                              className="absolute bottom-6 left-6 w-80 bg-[#2a2a2a]/95 backdrop-blur-xl rounded-xl p-4 shadow-2xl border border-white/5 transition-all hover:-translate-y-1 cursor-pointer pointer-events-auto group/music"
                           >
                              <div className="flex gap-4 items-center">
                                 <div className="relative">
                                    <img src={currentSong.cover} className="w-12 h-12 rounded bg-gray-800 object-cover" />
                                    {isPlaying && <div className="absolute inset-0 bg-black/20 flex items-center justify-center"><div className="w-4 h-4 bg-white rounded-full animate-ping opacity-75"></div></div>}
                                 </div>
                                 <div className="flex-1 min-w-0">
                                    <div className="text-sm font-bold text-white truncate">{currentSong.title}</div>
                                    <div className="text-xs text-gray-400 truncate">{currentSong.artist}</div>
                                 </div>
                                 <button 
                                    onClick={(e) => { e.stopPropagation(); setIsPlaying(!isPlaying); }} 
                                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                                 >
                                    {isPlaying ? <Pause size={18} className="fill-white" /> : <Play size={18} className="fill-white ml-0.5" />}
                                 </button>
                              </div>
                              <div className="mt-3 h-1 bg-gray-700 rounded-full overflow-hidden">
                                 <div className="h-full bg-white rounded-full transition-all duration-300" style={{ width: `${musicProgress}%` }}></div>
                              </div>
                           </div>
                        </div>
                     )}

                     {/* 2. MUSIC APP */}
                     {activeApp === 'music' && (
                        <div className="absolute inset-0 bg-gradient-to-b from-[#111] to-[#222] p-8 md:p-16 flex flex-col items-center justify-center animate-in zoom-in-95 duration-300">
                           <div className="flex flex-col md:flex-row items-center gap-12 w-full max-w-4xl">
                              <div className="relative group">
                                 <img src={currentSong.cover} className="w-64 h-64 md:w-96 md:h-96 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] object-cover transform transition-transform duration-700 group-hover:scale-105" />
                                 {/* Vinyl shine effect */}
                                 <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent rounded-2xl pointer-events-none"></div>
                              </div>
                              <div className="flex-1 w-full space-y-8">
                                 <div className="space-y-2">
                                    <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">{currentSong.title}</h2>
                                    <p className="text-xl text-gray-400">{currentSong.artist} — {currentSong.album}</p>
                                 </div>
                                 
                                 {/* Progress */}
                                 <div className="space-y-2 group/progress cursor-pointer">
                                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                                       <div className="h-full bg-white rounded-full relative" style={{ width: `${musicProgress}%` }}>
                                          <div className="absolute right-0 top-1/2 -translate-x-1/2 w-3 h-3 bg-white rounded-full shadow opacity-0 group-hover/progress:opacity-100"></div>
                                       </div>
                                    </div>
                                    <div className="flex justify-between text-xs text-gray-500 font-mono">
                                       <span>1:20</span>
                                       <span>4:03</span>
                                    </div>
                                 </div>

                                 {/* Controls - Optimized Icons */}
                                 <div className="flex items-center justify-between">
                                    <button 
                                      onClick={() => setIsShuffle(!isShuffle)}
                                      className={`p-2 rounded-full transition-all ${isShuffle ? 'text-green-400 bg-green-400/10' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                                      title="随机播放"
                                    >
                                       <Shuffle size={24} />
                                    </button>
                                    
                                    <div className="flex items-center gap-8">
                                       <button className="text-white hover:text-gray-300 transition-colors"><SkipBack size={40} fill="currentColor" /></button>
                                       <button 
                                          onClick={() => setIsPlaying(!isPlaying)} 
                                          className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-black hover:scale-105 active:scale-95 transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                                       >
                                          {isPlaying ? <Pause size={32} fill="black" /> : <Play size={32} fill="black" className="ml-1" />}
                                       </button>
                                       <button className="text-white hover:text-gray-300 transition-colors"><SkipForward size={40} fill="currentColor" /></button>
                                    </div>
                                    
                                    <button 
                                       onClick={() => setRepeatMode(m => m === 'off' ? 'all' : m === 'all' ? 'one' : 'off')}
                                       className={`p-2 rounded-full transition-all ${repeatMode !== 'off' ? 'text-green-400 bg-green-400/10' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                                       title="顺序播放"
                                    >
                                       {repeatMode === 'one' ? <Repeat1 size={24} /> : <Repeat size={24} />}
                                    </button>
                                 </div>
                              </div>
                           </div>
                        </div>
                     )}

                     {/* 3. PHONE APP */}
                     {activeApp === 'phone' && (
                        <div className="absolute inset-0 bg-[#151515] flex animate-in slide-in-from-bottom-8 duration-300">
                           {/* Sidebar */}
                           <div className="w-1/3 border-r border-white/10 p-6 flex flex-col gap-4">
                              <h3 className="text-2xl font-bold mb-4">最近通话</h3>
                              {[
                                 { name: '王爱丽', time: '10:42 AM', type: 'incoming' },
                                 { name: '妈妈', time: '昨天', type: 'missed' },
                                 { name: '老板', time: '昨天', type: 'outgoing' },
                              ].map((call, i) => (
                                 <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors cursor-pointer">
                                    <div className="flex items-center gap-3">
                                       <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-sm font-bold">
                                          {call.name[0]}
                                       </div>
                                       <div>
                                          <div className="font-bold">{call.name}</div>
                                          <div className="text-xs text-gray-500">{call.time}</div>
                                       </div>
                                    </div>
                                    <PhoneCall size={16} className={call.type === 'missed' ? 'text-red-500' : 'text-green-500'} />
                                 </div>
                              ))}
                           </div>
                           {/* Keypad Area */}
                           <div className="flex-1 p-12 flex flex-col items-center justify-center">
                              <div className="text-4xl font-mono mb-12 tracking-widest border-b border-white/20 pb-2 px-8 min-w-[200px] text-center">
                                 138-0000-
                              </div>
                              <div className="grid grid-cols-3 gap-6">
                                 {[1,2,3,4,5,6,7,8,9,'*',0,'#'].map(n => (
                                    <button key={n} className="w-20 h-20 rounded-full bg-white/5 hover:bg-white/20 text-2xl font-bold transition-all active:bg-white/30 flex items-center justify-center">
                                       {n}
                                    </button>
                                 ))}
                              </div>
                              <button className="mt-8 w-20 h-20 rounded-full bg-green-500 flex items-center justify-center shadow-lg hover:bg-green-400 transition-colors">
                                 <PhoneCall size={32} fill="white" />
                              </button>
                           </div>
                        </div>
                     )}

                     {/* 4. SETTINGS APP */}
                     {activeApp === 'settings' && (
                        <div className="absolute inset-0 bg-[#111] p-8 animate-in fade-in duration-300 overflow-y-auto no-scrollbar">
                           <div className="max-w-3xl mx-auto space-y-8">
                              <h2 className="text-3xl font-bold border-b border-white/10 pb-6">车辆设置 (Vehicle Settings)</h2>
                              
                              <div className="space-y-6">
                                 <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                                    <h4 className="text-lg font-bold mb-4 flex items-center gap-2"><Sun size={20} /> 灯光与显示</h4>
                                    <div className="space-y-4">
                                       <div className="flex justify-between items-center">
                                          <span>自动远光灯</span>
                                          <ToggleRight size={40} className="text-green-500 cursor-pointer" />
                                       </div>
                                       <div className="flex justify-between items-center">
                                          <span>氛围灯颜色</span>
                                          <div className="flex gap-2">
                                             <div className="w-6 h-6 rounded-full bg-blue-500 cursor-pointer ring-2 ring-white"></div>
                                             <div className="w-6 h-6 rounded-full bg-purple-500 cursor-pointer opacity-50"></div>
                                             <div className="w-6 h-6 rounded-full bg-orange-500 cursor-pointer opacity-50"></div>
                                          </div>
                                       </div>
                                    </div>
                                 </div>

                                 <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                                    <h4 className="text-lg font-bold mb-4 flex items-center gap-2"><Lock size={20} /> 门锁与安全</h4>
                                    <div className="space-y-4">
                                       <div className="flex justify-between items-center">
                                          <span>离车自动落锁</span>
                                          <ToggleRight size={40} className="text-green-500 cursor-pointer" />
                                       </div>
                                       <div className="flex justify-between items-center">
                                          <span>哨兵模式</span>
                                          <ToggleLeft size={40} className="text-gray-500 cursor-pointer" />
                                       </div>
                                    </div>
                                 </div>

                                 {/* Windows Control Section */}
                                 <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                                    <h4 className="text-lg font-bold mb-4 flex items-center gap-2"><LayoutGrid size={20} /> 车窗与玻璃</h4>
                                    <div className="space-y-6">
                                        <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                                            {[
                                                { id: 'fl', label: '主驾' },
                                                { id: 'fr', label: '副驾' },
                                                { id: 'rl', label: '左后' },
                                                { id: 'rr', label: '右后' },
                                            ].map((win) => (
                                                <div key={win.id} className="flex flex-col gap-2">
                                                    <div className="flex justify-between text-xs text-gray-400 uppercase font-bold">
                                                        <span>{win.label}</span>
                                                        <span>{windows[win.id as keyof typeof windows]}%</span>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <button 
                                                            onMouseDown={() => setWindows(prev => ({ ...prev, [win.id]: Math.max(0, prev[win.id as keyof typeof windows] - 5) }))}
                                                            onClick={() => setWindows(prev => ({ ...prev, [win.id]: Math.max(0, prev[win.id as keyof typeof windows] - 25) }))}
                                                            className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 active:bg-white/30 transition-colors"
                                                        >
                                                            <ChevronDown size={18} />
                                                        </button>
                                                        <div className="flex-1 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                                                            <div className="h-full bg-blue-500 transition-all duration-300" style={{ width: `${windows[win.id as keyof typeof windows]}%` }}></div>
                                                        </div>
                                                        <button 
                                                            onMouseDown={() => setWindows(prev => ({ ...prev, [win.id]: Math.min(100, prev[win.id as keyof typeof windows] + 5) }))}
                                                            onClick={() => setWindows(prev => ({ ...prev, [win.id]: Math.min(100, prev[win.id as keyof typeof windows] + 25) }))}
                                                            className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 active:bg-white/30 transition-colors"
                                                        >
                                                            <ChevronUp size={18} />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        
                                        <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-6">
                                            <button 
                                                onClick={() => setWindows({ fl: 10, fr: 10, rl: 10, rr: 10 })}
                                                className="py-3 bg-white/5 rounded-xl font-bold text-sm hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
                                            >
                                                <Wind size={16} /> 一键透气
                                            </button>
                                            <button 
                                                onClick={() => setWindows({ fl: 0, fr: 0, rl: 0, rr: 0 })}
                                                className="py-3 bg-white/5 rounded-xl font-bold text-sm hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
                                            >
                                                <X size={16} /> 全闭
                                            </button>
                                        </div>
                                    </div>
                                 </div>

                                 {/* Climate Control Section */}
                                 <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                                    <h4 className="text-lg font-bold mb-6 flex items-center gap-2"><Thermometer size={20} /> 空调与舒适</h4>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {/* Driver Zone */}
                                        <div className="bg-black/20 p-5 rounded-2xl border border-white/5">
                                            <div className="flex justify-between items-center mb-6">
                                                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">主驾区域</span>
                                                <Fan size={14} className={seatVentL > 0 ? 'text-blue-400 animate-spin' : 'text-gray-600'} />
                                            </div>
                                            
                                            {/* Temperature Dial Simulation */}
                                            <div className="flex items-center justify-between mb-8">
                                                <button onClick={() => setTempLeft(t => Math.max(16, t - 0.5))} className="w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"><ChevronDown size={24} /></button>
                                                <div className="text-center">
                                                    <div className="text-4xl font-light tracking-tighter text-white tabular-nums">{tempLeft.toFixed(1)}<span className="text-lg text-gray-500 align-top ml-1">°C</span></div>
                                                </div>
                                                <button onClick={() => setTempLeft(t => Math.min(30, t + 0.5))} className="w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"><ChevronUp size={24} /></button>
                                            </div>

                                            {/* Seat Sliders */}
                                            <div className="space-y-4">
                                                {/* Heating */}
                                                <div className="space-y-2">
                                                    <div className="flex justify-between text-[10px] font-bold text-gray-500 uppercase">
                                                        <span>座椅加热</span>
                                                        <span className={seatHeatL > 0 ? 'text-red-500' : ''}>{seatHeatL > 0 ? `${seatHeatL} 档` : '关闭'}</span>
                                                    </div>
                                                    <div className="h-10 bg-white/5 rounded-xl p-1 flex gap-1">
                                                        {[1, 2, 3].map(level => (
                                                            <button 
                                                                key={level}
                                                                onClick={() => setSeatHeatL(seatHeatL === level ? 0 : level)}
                                                                className={`flex-1 rounded-lg transition-all duration-300 ${seatHeatL >= level ? 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.4)]' : 'bg-transparent hover:bg-white/5'}`}
                                                            />
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Ventilation */}
                                                <div className="space-y-2">
                                                    <div className="flex justify-between text-[10px] font-bold text-gray-500 uppercase">
                                                        <span>座椅通风</span>
                                                        <span className={seatVentL > 0 ? 'text-blue-400' : ''}>{seatVentL > 0 ? `${seatVentL} 档` : '关闭'}</span>
                                                    </div>
                                                    <div className="h-10 bg-white/5 rounded-xl p-1 flex gap-1">
                                                        {[1, 2, 3].map(level => (
                                                            <button 
                                                                key={level}
                                                                onClick={() => setSeatVentL(seatVentL === level ? 0 : level)}
                                                                className={`flex-1 rounded-lg transition-all duration-300 ${seatVentL >= level ? 'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.4)]' : 'bg-transparent hover:bg-white/5'}`}
                                                            />
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Passenger Zone */}
                                        <div className="bg-black/20 p-5 rounded-2xl border border-white/5">
                                            <div className="flex justify-between items-center mb-6">
                                                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">副驾区域</span>
                                                <Fan size={14} className={seatVentR > 0 ? 'text-blue-400 animate-spin' : 'text-gray-600'} />
                                            </div>
                                            
                                            {/* Temperature Dial Simulation */}
                                            <div className="flex items-center justify-between mb-8">
                                                <button onClick={() => setTempRight(t => Math.max(16, t - 0.5))} className="w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"><ChevronDown size={24} /></button>
                                                <div className="text-center">
                                                    <div className="text-4xl font-light tracking-tighter text-white tabular-nums">{tempRight.toFixed(1)}<span className="text-lg text-gray-500 align-top ml-1">°C</span></div>
                                                </div>
                                                <button onClick={() => setTempRight(t => Math.min(30, t + 0.5))} className="w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"><ChevronUp size={24} /></button>
                                            </div>

                                            {/* Seat Sliders */}
                                            <div className="space-y-4">
                                                {/* Heating */}
                                                <div className="space-y-2">
                                                    <div className="flex justify-between text-[10px] font-bold text-gray-500 uppercase">
                                                        <span>座椅加热</span>
                                                        <span className={seatHeatR > 0 ? 'text-red-500' : ''}>{seatHeatR > 0 ? `${seatHeatR} 档` : '关闭'}</span>
                                                    </div>
                                                    <div className="h-10 bg-white/5 rounded-xl p-1 flex gap-1">
                                                        {[1, 2, 3].map(level => (
                                                            <button 
                                                                key={level}
                                                                onClick={() => setSeatHeatR(seatHeatR === level ? 0 : level)}
                                                                className={`flex-1 rounded-lg transition-all duration-300 ${seatHeatR >= level ? 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.4)]' : 'bg-transparent hover:bg-white/5'}`}
                                                            />
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Ventilation */}
                                                <div className="space-y-2">
                                                    <div className="flex justify-between text-[10px] font-bold text-gray-500 uppercase">
                                                        <span>座椅通风</span>
                                                        <span className={seatVentR > 0 ? 'text-blue-400' : ''}>{seatVentR > 0 ? `${seatVentR} 档` : '关闭'}</span>
                                                    </div>
                                                    <div className="h-10 bg-white/5 rounded-xl p-1 flex gap-1">
                                                        {[1, 2, 3].map(level => (
                                                            <button 
                                                                key={level}
                                                                onClick={() => setSeatVentR(seatVentR === level ? 0 : level)}
                                                                className={`flex-1 rounded-lg transition-all duration-300 ${seatVentR >= level ? 'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.4)]' : 'bg-transparent hover:bg-white/5'}`}
                                                            />
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     )}

                     {/* 5. APPS DRAWER */}
                     {activeApp === 'apps' && (
                        <div className="absolute inset-0 bg-black/90 backdrop-blur-xl p-12 animate-in zoom-in-95 duration-300">
                           <div className="flex justify-between items-center mb-8">
                              <h2 className="text-2xl font-bold">应用中心</h2>
                              <button onClick={() => setActiveApp('map')} className="p-2 bg-white/10 rounded-full hover:bg-white/20"><X size={20} /></button>
                           </div>
                           <div className="grid grid-cols-4 lg:grid-cols-6 gap-8">
                              {[
                                 { name: '地图', icon: <Navigation size={24} />, bg: 'bg-green-600' },
                                 { name: '音乐', icon: <Music size={24} />, bg: 'bg-red-500' },
                                 { name: '电话', icon: <Phone size={24} />, bg: 'bg-green-500' },
                                 { name: '相机', icon: <Car size={24} />, bg: 'bg-gray-500' },
                                 { name: '日历', icon: <Grid size={24} />, bg: 'bg-blue-500' },
                                 { name: '浏览器', icon: <Cloud size={24} />, bg: 'bg-blue-400' },
                                 { name: '充能', icon: <Zap size={24} />, bg: 'bg-green-400' },
                                 { name: '卡拉OK', icon: <Mic size={24} />, bg: 'bg-purple-500' },
                                 { name: '玩具箱', icon: <Sparkles size={24} />, bg: 'bg-orange-500' },
                                 { name: '设置', icon: <Settings size={24} />, bg: 'bg-gray-600' },
                              ].map((app, i) => (
                                 <div key={i} className="flex flex-col items-center gap-3 group cursor-pointer" onClick={() => setActiveApp(app.name === '地图' ? 'map' : app.name === '音乐' ? 'music' : app.name === '电话' ? 'phone' : app.name === '设置' ? 'settings' : 'map')}>
                                    <div className={`w-20 h-20 rounded-2xl ${app.bg} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                                       {React.cloneElement(app.icon as any, { size: 32, className: 'text-white' })}
                                    </div>
                                    <span className="text-sm font-bold text-gray-300">{app.name}</span>
                                 </div>
                              ))}
                           </div>
                        </div>
                     )}

                  </div>
               </div>

               {/* --- GLOBAL BOTTOM DOCK (Interactive) --- */}
               <div className="h-20 bg-black flex items-center justify-between px-8 relative z-20 border-t border-gray-800">
                  
                  {/* Car Settings Toggle */}
                  <button 
                     onClick={() => setActiveApp(activeApp === 'settings' ? 'map' : 'settings')}
                     className={`p-3 rounded-xl transition-colors ${activeApp === 'settings' ? 'bg-white/20 text-white' : 'bg-gray-800/50 hover:bg-gray-700 text-gray-400'}`}
                  >
                     <Car size={24} />
                  </button>

                  {/* Driver Climate */}
                  <div className="flex items-center gap-4 select-none">
                     <button onClick={() => setTempLeft(t => Math.max(16, t - 0.5))} className="text-gray-500 hover:text-white p-2"><ChevronRight className="rotate-180" size={18} /></button>
                     <div className="flex flex-col items-center cursor-pointer hover:bg-white/5 px-4 py-1 rounded-lg">
                        <span className={`text-xl font-medium ${tempLeft < 20 ? 'text-blue-400' : tempLeft > 26 ? 'text-red-400' : 'text-white'}`}>{tempLeft.toFixed(1)}°</span>
                        <div className="flex gap-0.5">
                           {[1,2,3].map(l => <div key={l} className={`w-3 h-1 rounded-full ${seatHeatL >= l ? 'bg-red-500' : 'bg-gray-700'}`}></div>)}
                        </div>
                     </div>
                     <button onClick={() => setTempLeft(t => Math.min(30, t + 0.5))} className="text-gray-500 hover:text-white p-2"><ChevronRight size={18} /></button>
                  </div>

                  {/* Center App Dock */}
                  <div className="flex items-center gap-4">
                     {[
                        { id: 'phone', icon: <Phone size={24} /> },
                        { id: 'music', icon: <Music size={24} /> },
                        { id: 'map', icon: <Navigation size={24} /> },
                        { id: 'apps', icon: <LayoutGrid size={24} /> }, 
                     ].map((app) => (
                        <button 
                           key={app.id} 
                           onClick={() => setActiveApp(app.id as any)}
                           className={`p-3.5 rounded-2xl transition-all duration-300 relative group ${activeApp === app.id ? 'text-black bg-white scale-110 shadow-[0_0_20px_rgba(255,255,255,0.3)]' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}
                        >
                           {app.icon}
                           {activeApp === app.id && <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full"></div>}
                        </button>
                     ))}
                  </div>

                  {/* Passenger Climate & Volume */}
                  <div className="flex items-center gap-8 select-none">
                     <div className="flex items-center gap-2 group cursor-pointer hover:bg-white/5 p-2 rounded-lg">
                        <Volume2 size={20} className="text-gray-400 group-hover:text-white" />
                     </div>
                     <div className="flex items-center gap-4">
                        <button onClick={() => setTempRight(t => Math.max(16, t - 0.5))} className="text-gray-500 hover:text-white p-2"><ChevronRight className="rotate-180" size={18} /></button>
                        <span className={`text-xl font-medium ${tempRight < 20 ? 'text-blue-400' : tempRight > 26 ? 'text-red-400' : 'text-white'}`}>{tempRight.toFixed(1)}°</span>
                        <button onClick={() => setTempRight(t => Math.min(30, t + 0.5))} className="text-gray-500 hover:text-white p-2"><ChevronRight size={18} /></button>
                     </div>
                  </div>

               </div>
            </div>
         </div>
      </section>

      {/* 3. Companion App Section */}
      <section className="bg-zinc-950 text-white rounded-[4rem] p-12 lg:p-24 overflow-hidden relative max-w-7xl mx-auto">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-900/10 blur-[150px] pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
              <div className="space-y-8 order-2 lg:order-1">
                  <h3 className="text-4xl lg:text-5xl font-black leading-tight">
                      无缝流转 <br/>
                      <span className="text-blue-500">口袋里的控制台</span>
                  </h3>
                  <p className="text-gray-400 text-lg leading-relaxed">
                      离开座舱，体验依然在线。FutureFlow App 提供毫秒级的远程车控体验。
                      无论是提前开启空调、查看实时哨兵画面，还是数字钥匙无感解锁，一切尽在掌握。
                  </p>
                  <div className="flex flex-col gap-4">
                      <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5">
                          <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-400">
                              <Smartphone size={24} />
                          </div>
                          <div>
                              <div className="font-bold text-white">数字钥匙 (UWB)</div>
                              <div className="text-xs text-gray-500">靠近自动解锁，离车自动落锁</div>
                          </div>
                      </div>
                      <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5">
                          <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center text-green-400">
                              <Zap size={24} />
                          </div>
                          <div>
                              <div className="font-bold text-white">智慧充电管理</div>
                              <div className="text-xs text-gray-500">预约低谷充电，实时监控功率</div>
                          </div>
                      </div>
                  </div>
              </div>

              {/* Mobile Mockup */}
              <div className="flex justify-center order-1 lg:order-2">
                  <div className="w-[320px] h-[650px] bg-black rounded-[3rem] border-8 border-gray-800 shadow-2xl relative overflow-hidden ring-1 ring-white/10">
                      {/* Dynamic Island */}
                      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-7 bg-black rounded-full z-20 flex items-center justify-center gap-2">
                          <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${isCharging ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                      </div>

                      {/* App Content */}
                      <div className="h-full bg-gradient-to-b from-gray-900 to-black text-white pt-14 pb-8 px-6 overflow-y-auto no-scrollbar relative">
                          
                          {/* Header */}
                          <div className="flex justify-between items-center mb-6">
                              <div>
                                  <div className="text-xs text-gray-400 font-bold uppercase tracking-wider">我的座驾</div>
                                  <div className="text-xl font-black">Model F</div>
                              </div>
                              <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center"><User size={16}/></div>
                          </div>

                          {/* Car Visual */}
                          <div className="relative h-40 w-full flex items-center justify-center mb-6">
                              {/* Abstract Car Graphic or Icon */}
                              <Car size={120} className="text-gray-200 drop-shadow-2xl" strokeWidth={1} />
                              <div className="absolute bottom-0 w-32 h-4 bg-black blur-xl opacity-50"></div>
                              
                              {/* Charging Status */}
                              {isCharging && (
                                 <div className="absolute -right-2 top-0 bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 border border-green-500/30 animate-in fade-in zoom-in">
                                    <Zap size={10} fill="currentColor" /> 充电中
                                 </div>
                              )}
                          </div>

                          {/* Battery Card */}
                          <div className="bg-gray-800/50 rounded-3xl p-6 border border-white/5 mb-4 backdrop-blur-md">
                              <div className="flex justify-between items-end mb-2">
                                  <div className="text-4xl font-black">82<span className="text-lg text-gray-400">%</span></div>
                                  <div className="text-sm font-bold text-gray-400">420 km</div>
                              </div>
                              <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                                  <div className={`w-[82%] h-full rounded-full transition-all duration-1000 ${isCharging ? 'bg-green-500 shadow-[0_0_10px_#22c55e]' : 'bg-white'}`}></div>
                              </div>
                              <div className="mt-3 flex justify-between text-[10px] text-gray-500 font-bold">
                                  <span>{isCharging ? '剩余: 45 分钟' : '放电中'}</span>
                                  <span>{isCharging ? '22 千瓦' : '空闲'}</span>
                              </div>
                          </div>

                          {/* Controls Grid */}
                          <div className="grid grid-cols-4 gap-3 mb-4">
                              <div className="flex flex-col items-center gap-2">
                                  <button 
                                    onClick={() => setIsLocked(!isLocked)}
                                    className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${isLocked ? 'bg-white text-black' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
                                  >
                                      {isLocked ? <Lock size={20} /> : <Unlock size={20} />}
                                  </button>
                                  <span className="text-[10px] font-bold text-gray-500">车锁</span>
                              </div>

                              <div className="flex flex-col items-center gap-2">
                                  <button 
                                    onClick={() => setIsClimateOn(!isClimateOn)}
                                    className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${isClimateOn ? 'bg-white text-black' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
                                  >
                                      <Fan size={20} className={isClimateOn ? 'animate-spin' : ''} />
                                  </button>
                                  <span className="text-[10px] font-bold text-gray-500">空调</span>
                              </div>

                              <div className="flex flex-col items-center gap-2">
                                  <button 
                                    onClick={() => setIsCharging(!isCharging)}
                                    className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${isCharging ? 'bg-white text-black' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
                                  >
                                      <Zap size={20} fill={isCharging ? "currentColor" : "none"} />
                                  </button>
                                  <span className="text-[10px] font-bold text-gray-500">充电</span>
                              </div>

                              <div className="flex flex-col items-center gap-2">
                                  <button 
                                    onClick={() => setTrunkOpen(!trunkOpen)}
                                    className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${trunkOpen ? 'bg-white text-black' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
                                  >
                                      <ArrowUp size={20} className={trunkOpen ? '' : 'rotate-180'} />
                                  </button>
                                  <span className="text-[10px] font-bold text-gray-500">后备箱</span>
                              </div>
                          </div>

                          {/* Quick Info Cards */}
                          <div className="grid grid-cols-2 gap-3">
                              <div className="bg-gray-800/30 p-4 rounded-2xl border border-white/5">
                                  <div className="flex items-center gap-2 text-gray-400 mb-2">
                                      <Thermometer size={14} /> <span className="text-[10px] font-bold">车内温度</span>
                                  </div>
                                  <div className="text-xl font-bold">{isClimateOn ? '22°C' : '24°C'}</div>
                              </div>
                              <div className="bg-gray-800/30 p-4 rounded-2xl border border-white/5">
                                  <div className="flex items-center gap-2 text-gray-400 mb-2">
                                      <MapPin size={14} /> <span className="text-[10px] font-bold">当前位置</span>
                                  </div>
                                  <div className="text-xs font-bold truncate">南京西路 1088 号</div>
                              </div>
                          </div>

                      </div>
                      
                      {/* Home Indicator */}
                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 bg-white/20 rounded-full z-20"></div>
                  </div>
              </div>
          </div>
      </section>

      {/* NEW: Design System Section */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8 py-24">
         <div className="text-center mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full border border-white/10">
               <Palette size={16} className="text-blue-400" />
               <span className="text-xs font-bold uppercase tracking-widest text-blue-400">FutureFlow Design System</span>
            </div>
            <h3 className="text-4xl lg:text-5xl font-black text-white">HMI 设计规范</h3>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
               专为驾驶场景打造的视觉语言。我们遵循“扫视即所得”原则，在高对比度暗色模式下，确保信息的瞬时可读性与交互的盲操安全性。
            </p>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 1. Color Palette */}
            <div className="bg-[#111] p-8 rounded-[2.5rem] border border-white/5 space-y-8">
               <h4 className="text-xl font-bold text-white flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400"><Palette size={18} /></div>
                  色彩体系 (Automotive Dark)
               </h4>
               <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {[
                     { name: '电光蓝', hex: '#3B82F6', use: '激活 / 品牌色' },
                     { name: '警示红', hex: '#EF4444', use: '警告 / 错误' },
                     { name: '生态绿', hex: '#10B981', use: '充电 / 节能' },
                     { name: '道路灰', hex: '#9CA3AF', use: '次要文本' },
                     { name: '面板黑', hex: '#1A1A1A', use: '卡片背景' },
                     { name: '纯净白', hex: '#FFFFFF', use: '主要文本' },
                  ].map((color, i) => (
                     <div key={i} className="group cursor-pointer">
                        <div className="h-20 rounded-2xl mb-3 border border-white/5 shadow-lg transition-transform group-hover:scale-105" style={{ backgroundColor: color.hex }}></div>
                        <div>
                           <div className="text-sm font-bold text-white">{color.name}</div>
                           <div className="text-xs text-gray-500 font-mono">{color.hex}</div>
                           <div className="text-[10px] text-gray-600 mt-1 uppercase tracking-wider">{color.use}</div>
                        </div>
                     </div>
                  ))}
               </div>
            </div>

            {/* 2. Typography & Legibility */}
            <div className="bg-[#111] p-8 rounded-[2.5rem] border border-white/5 space-y-8">
               <h4 className="text-xl font-bold text-white flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400"><Type size={18} /></div>
                  排版与易读性 (Legibility)
               </h4>
               <div className="space-y-6">
                  <div className="bg-[#000] p-6 rounded-2xl border border-white/5 flex items-baseline gap-4">
                     <span className="text-6xl font-medium text-white tracking-tighter">120</span>
                     <div className="flex flex-col">
                        <span className="text-sm font-bold text-gray-400 uppercase">DIN Next LT Pro</span>
                        <span className="text-xs text-gray-600">车速 / 关键数据</span>
                     </div>
                  </div>
                  <div className="bg-[#000] p-6 rounded-2xl border border-white/5 flex flex-col justify-center gap-1">
                     <span className="text-2xl font-bold text-white">导航进行中</span>
                     <div className="flex justify-between items-center">
                        <span className="text-sm font-bold text-gray-400 uppercase">Inter Display</span>
                        <span className="text-xs text-gray-600">标题 / 菜单项</span>
                     </div>
                  </div>
                  <div className="bg-[#000] p-6 rounded-2xl border border-white/5 flex flex-col justify-center gap-1">
                     <span className="text-base font-medium text-gray-300">保持当前车速以优化续航里程。</span>
                     <div className="flex justify-between items-center mt-1">
                        <span className="text-sm font-bold text-gray-400 uppercase">Inter Regular</span>
                        <span className="text-xs text-gray-600">正文 / 通知</span>
                     </div>
                  </div>
               </div>
            </div>

            {/* 3. Iconography */}
            <div className="bg-[#111] p-8 rounded-[2.5rem] border border-white/5 space-y-8 lg:col-span-2">
               <div className="flex justify-between items-end">
                  <h4 className="text-xl font-bold text-white flex items-center gap-3">
                     <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400"><Grid size={18} /></div>
                     功能图标 (Functional Icons)
                  </h4>
                  <p className="text-xs text-gray-500 hidden sm:block">2px Stroke / 24px Grid / Rounded Caps</p>
               </div>
               
               <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
                  {[
                     { icon: <Car />, label: '车辆' },
                     { icon: <Zap />, label: '能耗' },
                     { icon: <Fan />, label: '空调' },
                     { icon: <Music />, label: '媒体' },
                     { icon: <Navigation />, label: '导航' },
                     { icon: <Phone />, label: '电话' },
                     { icon: <Settings />, label: '设置' },
                     { icon: <ShieldCheck />, label: '安全' },
                  ].map((item, i) => (
                     <div key={i} className="bg-[#1a1a1a] aspect-square rounded-2xl flex flex-col items-center justify-center gap-2 border border-white/5 hover:bg-[#222] hover:border-white/20 transition-colors group">
                        {React.cloneElement(item.icon as any, { size: 24, className: 'text-gray-400 group-hover:text-white transition-colors' })}
                        <span className="text-[10px] text-gray-600 font-bold uppercase group-hover:text-gray-400">{item.label}</span>
                     </div>
                  ))}
               </div>
            </div>

            {/* 4. Interactive Components */}
            <div className="bg-[#111] p-8 rounded-[2.5rem] border border-white/5 space-y-8 lg:col-span-2">
                <h4 className="text-xl font-bold text-white flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-400"><Layers size={18} /></div>
                  交互组件 (Interactive Components)
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                   {/* Toggle */}
                   <div className="space-y-4">
                      <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">开关控件</span>
                      <div className="bg-[#000] p-6 rounded-2xl border border-white/5 flex items-center justify-between">
                         <span className="text-white font-bold">自动驾驶</span>
                         <div className="w-12 h-7 bg-blue-600 rounded-full relative cursor-pointer">
                            <div className="absolute right-1 top-1 w-5 h-5 bg-white rounded-full shadow-md"></div>
                         </div>
                      </div>
                      <div className="bg-[#000] p-6 rounded-2xl border border-white/5 flex items-center justify-between">
                         <span className="text-gray-400 font-bold">哨兵模式</span>
                         <div className="w-12 h-7 bg-[#333] rounded-full relative cursor-pointer">
                            <div className="absolute left-1 top-1 w-5 h-5 bg-gray-500 rounded-full shadow-md"></div>
                         </div>
                      </div>
                   </div>

                   {/* Sliders */}
                   <div className="space-y-4">
                      <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">进度条</span>
                      <div className="bg-[#000] p-6 rounded-2xl border border-white/5 space-y-2">
                         <div className="flex justify-between text-xs font-bold text-gray-400">
                            <span>屏幕亮度</span>
                            <span>80%</span>
                         </div>
                         <div className="h-2 bg-[#333] rounded-full overflow-hidden">
                            <div className="h-full w-[80%] bg-white rounded-full"></div>
                         </div>
                      </div>
                      <div className="bg-[#000] p-6 rounded-2xl border border-white/5 space-y-2">
                         <div className="flex justify-between text-xs font-bold text-gray-400">
                            <span>空调温度</span>
                            <span className="text-red-400">26°C</span>
                         </div>
                         <div className="h-2 bg-[#333] rounded-full overflow-hidden">
                            <div className="h-full w-[60%] bg-gradient-to-r from-blue-500 via-white to-red-500 rounded-full"></div>
                         </div>
                      </div>
                   </div>

                   {/* Buttons */}
                   <div className="space-y-4">
                      <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">按钮控件</span>
                      <div className="bg-[#000] p-6 rounded-2xl border border-white/5 flex flex-col gap-4">
                         <button className="w-full py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors">
                            主要操作
                         </button>
                         <button className="w-full py-3 bg-[#222] text-white font-bold rounded-xl border border-white/10 hover:bg-[#333] transition-colors">
                            次要操作
                         </button>
                      </div>
                   </div>
                </div>
            </div>
         </div>
      </section>

      {/* 4. Feature Highlights */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto px-4 lg:px-8">
         <div className="bg-[#111] p-8 rounded-[2.5rem] border border-white/5 hover:border-white/10 transition-colors group">
            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-6 text-blue-400 group-hover:scale-110 transition-transform">
               <Layers size={24} />
            </div>
            <h4 className="text-xl font-bold mb-2 text-white">实时可视化 (Live Viz)</h4>
            <p className="text-gray-500 text-sm leading-relaxed">
               左侧的 3D 车辆模型不仅仅是动画。试着点击它，您可以实时控制后备箱的开闭。驾驶时，它会精确映射周围的车道线与障碍物。
            </p>
         </div>
         <div className="bg-[#111] p-8 rounded-[2.5rem] border border-white/5 hover:border-white/10 transition-colors group">
            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-6 text-green-400 group-hover:scale-110 transition-transform">
               <Grid size={24} />
            </div>
            <h4 className="text-xl font-bold mb-2 text-white">多任务处理</h4>
            <p className="text-gray-500 text-sm leading-relaxed">
               点击底部 Dock 栏的图标，可以在导航、音乐和设置之间极速切换。我们优化了内存管理，确保应用冷启动时间低于 200ms。
            </p>
         </div>
         <div className="bg-[#111] p-8 rounded-[2.5rem] border border-white/5 hover:border-white/10 transition-colors group">
            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-6 text-purple-400 group-hover:scale-110 transition-transform">
               <Sparkles size={24} className="fill-current" />
            </div>
            <h4 className="text-xl font-bold mb-2 text-white">沉浸式多媒体</h4>
            <p className="text-gray-500 text-sm leading-relaxed">
               进入“音乐”应用，体验全屏的专辑封面艺术与自适应背景色。配合虚拟环绕声算法，让车厢瞬间变身移动音乐厅。
            </p>
         </div>
      </section>

    </div>
  );
};

// CSS for animations
const style = document.createElement('style');
style.textContent = `
  @keyframes road-move {
    from { transform: translateY(-50%); }
    to { transform: translateY(0); }
  }
  .animate-road-move {
    animation: road-move 1s linear infinite;
  }
  .perspective-800 {
    perspective: 800px;
  }
  .transform-style-3d {
    transform-style: preserve-3d;
  }
`;
document.head.appendChild(style);
