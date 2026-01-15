
import React, { useState } from 'react';
import { 
  Moon, Activity, Thermometer, Heart, Zap, 
  Battery, Calendar, ChevronRight, BarChart3, 
  Flame, Wind, Droplets, Info, Share2, 
  ArrowUpRight, ArrowDownRight, Smartphone,
  BedDouble, Clock, Sun, Palette, Layers,
  Check, Footprints, Timer
} from 'lucide-react';

export const SmartRingDetail: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'readiness' | 'sleep' | 'activity'>('readiness');
  const [ringFinish, setRingFinish] = useState<'black' | 'silver' | 'gold'>('black');
  
  // 模拟数据状态
  const scores = {
    readiness: 85,
    sleep: 88,
    activity: 92
  };

  const readinessMetrics = [
    { label: '静息心率', value: '48', unit: 'bpm', status: 'optimal', icon: <Heart size={16} /> },
    { label: 'HRV 平衡', value: '52', unit: 'ms', status: 'good', icon: <Activity size={16} /> },
    { label: '体温偏差', value: '-0.2', unit: '°C', status: 'optimal', icon: <Thermometer size={16} /> },
    { label: '恢复指数', value: '98', unit: '%', status: 'optimal', icon: <Zap size={16} /> },
  ];

  const sleepMetrics = [
    { label: '深度睡眠', value: '1h 45m', percent: 25, color: 'bg-indigo-500' },
    { label: '快速眼动', value: '2h 10m', percent: 30, color: 'bg-blue-400' },
    { label: '浅层睡眠', value: '3h 30m', percent: 40, color: 'bg-sky-300' },
    { label: '清醒时间', value: '25m', percent: 5, color: 'bg-orange-300' },
  ];

  // Ring Style Config
  const ringStyles: Record<'black' | 'silver' | 'gold', { 
    outer: string; 
    inner: string; 
    highlight: string; 
    name: string; 
    style?: React.CSSProperties 
  }> = {
    black: {
      outer: 'bg-gradient-to-b from-zinc-700 to-zinc-900',
      inner: 'border-zinc-800',
      highlight: 'from-white/20',
      name: 'Stealth Black'
    },
    silver: {
      outer: 'bg-gradient-to-b from-gray-200 to-gray-400',
      inner: 'border-gray-300',
      highlight: 'from-white/60',
      name: 'Titanium Silver'
    },
    gold: {
      outer: 'bg-gradient-to-b from-[#FAD961] to-[#F76B1C]', // Simplified gold gradient base
      // Override with style prop for better gold effect
      style: { background: 'linear-gradient(to bottom, #FFE5B4, #D4AF37, #8A6E0D)' },
      inner: 'border-[#D4AF37]',
      highlight: 'from-white/60',
      name: 'Rose Gold'
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 space-y-32 pb-20">
      
      {/* 1. Hero Section: Concept & Hardware */}
      <section className="text-center space-y-8 max-w-4xl mx-auto pt-10">
        <div className="inline-flex items-center gap-2 bg-[#8A84FF]/10 px-4 py-2 rounded-full">
           <Moon size={16} className="text-[#8A84FF]" />
           <span className="text-xs font-bold text-[#8A84FF] uppercase tracking-widest">Invisible Tech</span>
        </div>
        <h3 className="text-4xl lg:text-7xl font-black tracking-tight leading-tight flex flex-col items-center justify-center">
          <span>Oura-X <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8A84FF] to-pink-500">Ring</span></span>
          <span className="mt-2">感知于无形</span>
        </h3>
        <p className="text-gray-500 text-xl leading-relaxed max-w-2xl mx-auto">
          智能指环没有屏幕，因此 App 成为了唯一的交互窗口。我们采用“暗夜极光”设计语言，将复杂的生理数据转化为优雅、静谧的视觉流。
        </p>
        
        {/* Hardware Render Simulation */}
        <div className="relative h-[500px] w-full max-w-2xl mx-auto mt-16 group perspective-1000 flex flex-col items-center justify-center">
           {/* Ambient Environment Glow */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#8A84FF]/10 to-pink-500/10 rounded-full blur-[120px] pointer-events-none"></div>
           
           {/* Decorative Orbit Rings */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] border border-[#8A84FF]/10 rounded-full animate-[spin_20s_linear_infinite]"></div>
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] border border-pink-500/10 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>

           {/* 3D Ring Container */}
           <div className="relative transform transition-all duration-1000 ease-out hover:scale-110 hover:rotate-x-12 rotate-x-30 preserve-3d cursor-pointer z-20">
              
              {/* Shadow */}
              <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-64 h-16 bg-black/30 blur-2xl rounded-full transform rotate-x-60 scale-y-50"></div>

              {/* The Ring Structure */}
              <div className="relative w-64 h-64 preserve-3d">
                 {/* Back Face (Inner Thickness) */}
                 <div className={`absolute inset-0 rounded-full border-[28px] ${ringStyles[ringFinish].inner} shadow-inner transform translate-z-[-12px] brightness-50`} style={{ borderColor: 'rgba(0,0,0,0.8)' }}></div>

                 {/* Front Face (Main Body) */}
                 <div 
                   className={`absolute inset-0 rounded-full border-[28px] shadow-[0_20px_50px_rgba(0,0,0,0.4),inset_0_2px_15px_rgba(255,255,255,0.2)] ${ringStyles[ringFinish].outer} transform translate-z-[0px]`}
                   style={ringStyles[ringFinish].style}
                 ></div>

                 {/* Inner Detail Ring (Sensors & Tech) */}
                 <div className="absolute inset-0 flex items-center justify-center preserve-3d">
                    <div className="w-[180px] h-[180px] rounded-full border border-white/5 shadow-[inset_0_0_20px_rgba(0,0,0,0.8)] relative overflow-hidden">
                       <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                          <div className="w-2 h-2 bg-green-500 rounded-full blur-[2px] shadow-[0_0_15px_#22c55e] animate-pulse"></div>
                          <div className="w-2 h-2 bg-red-500 rounded-full blur-[2px] shadow-[0_0_15px_#ef4444] animate-pulse delay-75"></div>
                          <div className="w-2 h-2 bg-green-500 rounded-full blur-[2px] shadow-[0_0_15px_#22c55e] animate-pulse delay-150"></div>
                       </div>
                    </div>
                 </div>

                 {/* Top Highlight/Reflection */}
                 <div className={`absolute inset-0 rounded-full border-[28px] border-transparent bg-gradient-to-tr ${ringStyles[ringFinish].highlight} via-transparent to-transparent opacity-50 pointer-events-none`}></div>
              </div>
           </div>

           {/* Material Switcher */}
           <div className="mt-20 flex items-center gap-6 bg-white/90 backdrop-blur-xl px-6 py-3 rounded-full shadow-2xl border border-white/20 relative z-30 transition-transform hover:scale-105">
              {(['black', 'silver', 'gold'] as const).map((finish) => (
                <button
                  key={finish}
                  onClick={() => setRingFinish(finish)}
                  className={`w-10 h-10 rounded-full border-2 transition-all flex items-center justify-center relative group/btn ${ringFinish === finish ? 'border-[#8A84FF] scale-110 shadow-lg' : 'border-transparent hover:scale-105'}`}
                  title={finish}
                >
                   <div className={`w-full h-full rounded-full ${finish === 'black' ? 'bg-zinc-800' : finish === 'silver' ? 'bg-gray-300' : 'bg-[#D4AF37]'}`}></div>
                   {ringFinish === finish && <div className="absolute -bottom-2 w-1 h-1 bg-[#8A84FF] rounded-full"></div>}
                </button>
              ))}
              <div className="h-8 w-px bg-gray-200"></div>
              <span className="text-xs font-bold text-gray-600 uppercase tracking-wider w-24 text-center">{ringStyles[ringFinish].name}</span>
           </div>
        </div>
      </section>

      {/* 2. App Interface Showcase */}
      <section className="bg-zinc-950 rounded-[4rem] p-8 lg:p-20 overflow-hidden relative">
         <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-zinc-950 to-black pointer-events-none"></div>
         
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">
            {/* Left: Interactive Context */}
            <div className="lg:col-span-5 space-y-12">
               <div className="space-y-6">
                  <h4 className="text-3xl font-bold text-white">三维健康评分系统</h4>
                  <p className="text-gray-400 text-lg">
                     我们将人体状态解构为三个核心维度。点击下方 Tab 切换数据视图，体验从宏观评分到微观数据的层级交互。
                  </p>
               </div>

               <div className="space-y-4">
                  {[
                    { id: 'readiness', label: '准备度 (Readiness)', score: scores.readiness, icon: <Zap size={20} />, color: 'text-emerald-400', desc: '基于 HRV 与体温的身体恢复状况' },
                    { id: 'sleep', label: '睡眠质量 (Sleep)', score: scores.sleep, icon: <Moon size={20} />, color: 'text-indigo-400', desc: '深度睡眠与 REM 周期分析' },
                    { id: 'activity', label: '活动目标 (Activity)', score: scores.activity, icon: <Activity size={20} />, color: 'text-orange-400', desc: '动态热量消耗与久坐提醒' }
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id as any)}
                      className={`w-full p-6 rounded-3xl border text-left transition-all flex items-start gap-5 group ${activeTab === item.id ? 'bg-white/10 border-white/20 shadow-2xl' : 'bg-transparent border-white/5 hover:bg-white/5'}`}
                    >
                       <div className={`p-4 rounded-2xl bg-black/40 border border-white/10 ${activeTab === item.id ? item.color : 'text-gray-500'}`}>
                          {item.icon}
                       </div>
                       <div className="flex-1">
                          <div className="flex justify-between items-center mb-1">
                             <h5 className={`font-bold ${activeTab === item.id ? 'text-white' : 'text-gray-400'}`}>{item.label}</h5>
                             <span className={`text-2xl font-black ${item.color}`}>{item.score}</span>
                          </div>
                          <p className="text-xs text-gray-500 leading-relaxed group-hover:text-gray-400 transition-colors">{item.desc}</p>
                       </div>
                    </button>
                  ))}
               </div>
            </div>

            {/* Right: Mobile App Simulation */}
            <div className="lg:col-span-7 flex justify-center">
               <div className="w-[360px] h-[720px] bg-black rounded-[3rem] border-[8px] border-zinc-800 shadow-2xl relative overflow-hidden ring-1 ring-white/10">
                  {/* Status Bar */}
                  <div className="absolute top-0 left-0 w-full px-8 py-5 flex justify-between items-end z-20 text-white/80">
                     <span className="text-xs font-bold">9:41</span>
                     <div className="flex gap-1.5 items-center">
                        <WifiIcon size={12} />
                        <Battery size={12} />
                     </div>
                  </div>

                  {/* Dynamic Content */}
                  <div className="h-full overflow-y-auto no-scrollbar pt-16 pb-28 px-6 bg-gradient-to-b from-slate-900 to-black text-white relative">
                     
                     {/* Header */}
                     <div className="flex justify-between items-center mb-8">
                        <div>
                           <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">THURSDAY, OCT 24</div>
                           <h2 className="text-2xl font-bold">Good Morning, Alex</h2>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#8A84FF] to-pink-600 p-[2px]">
                           <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100" className="rounded-full w-full h-full object-cover border-2 border-black" />
                        </div>
                     </div>

                     {/* Main Score Ring */}
                     <div className="flex justify-center mb-10 relative">
                        <div className="w-56 h-56 relative flex items-center justify-center">
                           {/* Background Circle */}
                           <svg className="absolute inset-0 w-full h-full -rotate-90 overflow-visible" viewBox="0 0 224 224">
                              <circle cx="112" cy="112" r="96" className="stroke-white/5 fill-none" strokeWidth="12" />
                              <circle 
                                cx="112" cy="112" r="96" 
                                className={`fill-none transition-all duration-1000 ease-out drop-shadow-[0_0_15px_rgba(0,0,0,0.5)] ${activeTab === 'readiness' ? 'stroke-emerald-500' : activeTab === 'sleep' ? 'stroke-indigo-500' : 'stroke-orange-500'}`} 
                                strokeWidth="12" 
                                strokeLinecap="round"
                                strokeDasharray="603"
                                strokeDashoffset={603 - (603 * (activeTab === 'readiness' ? scores.readiness : activeTab === 'sleep' ? scores.sleep : scores.activity)) / 100}
                              />
                           </svg>
                           <div className="text-center animate-in fade-in zoom-in duration-500" key={activeTab}>
                              <span className={`text-6xl font-black tracking-tighter block ${activeTab === 'readiness' ? 'text-emerald-400' : activeTab === 'sleep' ? 'text-indigo-400' : 'text-orange-400'}`}>
                                 {activeTab === 'readiness' ? scores.readiness : activeTab === 'sleep' ? scores.sleep : scores.activity}
                              </span>
                              <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">
                                 {activeTab === 'readiness' ? 'Optimal' : activeTab === 'sleep' ? 'Good' : 'Excellent'}
                              </span>
                           </div>
                        </div>
                     </div>

                     {/* Content: Readiness View */}
                     {activeTab === 'readiness' && (
                        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-8 duration-500">
                           <p className="text-sm text-gray-400 leading-relaxed mb-6">
                              你的身体状态已完全恢复。体温与静息心率均处于理想区间，今天适合进行高强度训练。
                           </p>
                           <div className="grid grid-cols-2 gap-3">
                              {readinessMetrics.map((m, i) => (
                                 <div key={i} className="bg-white/5 p-4 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
                                    <div className={`mb-3 ${m.status === 'optimal' ? 'text-emerald-400' : 'text-blue-400'}`}>
                                       {m.icon}
                                    </div>
                                    <div className="text-2xl font-bold mb-1">{m.value}<span className="text-xs text-gray-500 ml-1 font-medium">{m.unit}</span></div>
                                    <div className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">{m.label}</div>
                                 </div>
                              ))}
                           </div>
                           
                           {/* HRV Data Enhanced */}
                           <div className="bg-white/5 p-5 rounded-3xl border border-white/5 mt-4">
                              <div className="flex justify-between items-center mb-4">
                                 <div>
                                    <h4 className="text-xs font-bold text-gray-300 uppercase mb-1">HRV 深度追踪</h4>
                                    <p className="text-[10px] text-gray-500">Nightly Variability</p>
                                 </div>
                                 <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-1 rounded">RISING</span>
                              </div>
                              
                              {/* SVG Graph for HRV */}
                              <div className="h-24 w-full relative">
                                 {/* Background Grid */}
                                 <div className="absolute inset-0 flex flex-col justify-between">
                                    <div className="w-full h-px bg-white/5 border-t border-white/5 border-dashed"></div>
                                    <div className="w-full h-px bg-white/5 border-t border-white/5 border-dashed"></div>
                                    <div className="w-full h-px bg-white/5 border-t border-white/5 border-dashed"></div>
                                 </div>
                                 
                                 {/* Trace Line */}
                                 <svg className="w-full h-full overflow-visible" viewBox="0 0 100 50" preserveAspectRatio="none">
                                    <path 
                                       d="M0,25 Q10,20 20,30 T40,25 T60,10 T80,20 T100,15" 
                                       fill="none" 
                                       stroke="#10b981" 
                                       strokeWidth="2" 
                                       vectorEffect="non-scaling-stroke"
                                       className="drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                                    />
                                    {/* Average Line */}
                                    <line x1="0" y1="25" x2="100" y2="25" stroke="white" strokeWidth="1" strokeDasharray="4 4" opacity="0.3" vectorEffect="non-scaling-stroke" />
                                 </svg>
                              </div>

                              {/* Stats Row */}
                              <div className="flex justify-between mt-4 pt-4 border-t border-white/5">
                                 <div className="text-center w-1/3 border-r border-white/5">
                                    <div className="text-[10px] text-gray-500 uppercase font-bold">Avg HRV</div>
                                    <div className="text-lg font-black text-white">52 <span className="text-[9px] text-gray-500 font-normal">ms</span></div>
                                 </div>
                                 <div className="text-center w-1/3 border-r border-white/5">
                                    <div className="text-[10px] text-gray-500 uppercase font-bold">Max HRV</div>
                                    <div className="text-lg font-black text-white">68 <span className="text-[9px] text-gray-500 font-normal">ms</span></div>
                                 </div>
                                 <div className="text-center w-1/3">
                                    <div className="text-[10px] text-gray-500 uppercase font-bold">Lowest</div>
                                    <div className="text-lg font-black text-gray-400">38 <span className="text-[9px] text-gray-500 font-normal">ms</span></div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     )}

                     {/* Content: Sleep View */}
                     {activeTab === 'sleep' && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-500">
                           <div className="flex items-center gap-4 bg-indigo-900/20 p-4 rounded-2xl border border-indigo-500/20">
                              <BedDouble size={20} className="text-indigo-400" />
                              <div>
                                 <div className="text-sm font-bold text-indigo-100">睡眠总时长</div>
                                 <div className="text-2xl font-black text-white">7h 42m</div>
                              </div>
                           </div>

                           <div className="space-y-3">
                              <h4 className="text-xs font-bold text-gray-400 uppercase">睡眠分期 (Hypnogram)</h4>
                              {/* Sleep Bar Chart */}
                              <div className="h-4 w-full flex rounded-full overflow-hidden">
                                 {sleepMetrics.map((m, i) => (
                                    <div key={i} className={`h-full ${m.color}`} style={{ width: `${m.percent}%` }}></div>
                                 ))}
                              </div>
                              <div className="grid grid-cols-2 gap-3 mt-4">
                                 {sleepMetrics.map((m, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                       <div className={`w-2 h-2 rounded-full ${m.color}`}></div>
                                       <div>
                                          <div className="text-xs font-bold text-gray-200">{m.label}</div>
                                          <div className="text-[10px] text-gray-500">{m.value}</div>
                                       </div>
                                    </div>
                                 ))}
                              </div>
                           </div>
                           
                           <div className="bg-white/5 p-5 rounded-2xl border border-white/5">
                              <div className="flex justify-between items-center mb-2">
                                 <span className="text-xs font-bold text-gray-400">入睡潜伏期</span>
                                 <span className="text-sm font-bold text-white">12 min</span>
                              </div>
                              <div className="w-full bg-gray-700 h-1.5 rounded-full overflow-hidden">
                                 <div className="bg-indigo-400 h-full w-1/4 rounded-full"></div>
                              </div>
                              <p className="text-[10px] text-gray-500 mt-2">太棒了，你入睡很快！通常建议在 10-20 分钟内。</p>
                           </div>
                        </div>
                     )}

                     {/* Content: Activity View */}
                     {activeTab === 'activity' && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-500">
                           <div className="grid grid-cols-2 gap-4">
                              <div className="bg-orange-900/20 p-5 rounded-2xl border border-orange-500/20 text-center">
                                 <Flame className="text-orange-500 mx-auto mb-2" size={24} />
                                 <div className="text-2xl font-black text-white">420</div>
                                 <div className="text-[9px] text-orange-200 uppercase font-bold tracking-tight">Active Calories</div>
                              </div>
                              <div className="bg-orange-900/20 p-5 rounded-2xl border border-orange-500/20 text-center">
                                 <Wind className="text-orange-400 mx-auto mb-2" size={24} />
                                 <div className="text-2xl font-black text-white">8.5k</div>
                                 <div className="text-[9px] text-orange-200 uppercase font-bold tracking-tight">Steps Today</div>
                              </div>
                           </div>

                           <div className="bg-white/5 p-6 rounded-3xl border border-white/5 space-y-4">
                              <div className="flex justify-between items-center">
                                 <h4 className="text-xs font-bold text-gray-400 uppercase">24小时活动分布</h4>
                                 <Clock size={14} className="text-gray-500" />
                              </div>
                              <div className="h-32 flex items-end justify-between gap-0.5">
                                 {Array.from({length: 24}).map((_, i) => {
                                    // 模拟真实活动数据：白天活跃，早晚高峰，夜间低
                                    let h = 5;
                                    if (i >= 7 && i <= 22) h = Math.random() * 50 + 20; 
                                    if (i === 8 || i === 12 || i === 18) h = Math.random() * 30 + 70; // Peak
                                    if (i < 6) h = Math.random() * 5 + 2; // Sleep

                                    const active = h > 50;
                                    // Color coding intensity
                                    const bgColor = h > 80 ? 'bg-orange-500' : h > 40 ? 'bg-orange-400/70' : 'bg-white/10';

                                    return (
                                       <div key={i} className="w-full flex flex-col items-center gap-1 group relative">
                                          <div 
                                             className={`w-full rounded-[1px] transition-all duration-500 hover:scale-y-110 origin-bottom ${bgColor}`} 
                                             style={{ height: `${h}%` }}
                                          ></div>
                                          {/* Tooltip */}
                                          <div className="absolute -top-6 opacity-0 group-hover:opacity-100 transition-opacity bg-white text-black text-[8px] font-bold px-1.5 py-0.5 rounded pointer-events-none z-10 whitespace-nowrap">
                                             {i}:00
                                          </div>
                                       </div>
                                    )
                                 })}
                              </div>
                              <div className="flex justify-between text-[9px] text-gray-600 font-bold uppercase w-full">
                                 <span>00:00</span>
                                 <span>06:00</span>
                                 <span>12:00</span>
                                 <span>18:00</span>
                                 <span>24:00</span>
                              </div>
                           </div>

                           {/* Hourly Breakdown Log */}
                           <div className="bg-white/5 rounded-3xl border border-white/5 overflow-hidden">
                              <div className="p-4 border-b border-white/5 bg-white/5">
                                 <h4 className="text-xs font-bold text-gray-300 uppercase">Hourly Activity Log</h4>
                              </div>
                              <div className="max-h-40 overflow-y-auto no-scrollbar">
                                 {[
                                    { time: '18:00', type: 'Running', steps: 3400, cals: 210, icon: <Flame size={12} /> },
                                    { time: '17:00', type: 'Walk', steps: 850, cals: 45, icon: <Footprints size={12} /> },
                                    { time: '16:00', type: 'Sedentary', steps: 120, cals: 15, icon: <Timer size={12} /> },
                                    { time: '15:00', type: 'Walk', steps: 400, cals: 25, icon: <Footprints size={12} /> },
                                    { time: '14:00', type: 'Sedentary', steps: 50, cals: 10, icon: <Timer size={12} /> },
                                    { time: '12:00', type: 'Lunch Walk', steps: 1100, cals: 80, icon: <Footprints size={12} /> },
                                    { time: '08:00', type: 'Commute', steps: 1500, cals: 95, icon: <Footprints size={12} /> },
                                 ].map((log, i) => (
                                    <div key={i} className="flex items-center justify-between p-4 border-b border-white/5 hover:bg-white/5 transition-colors">
                                       <div className="flex items-center gap-3">
                                          <span className="text-[10px] font-mono text-gray-500">{log.time}</span>
                                          <div className={`w-6 h-6 rounded-full flex items-center justify-center ${log.type === 'Running' ? 'bg-orange-500/20 text-orange-500' : 'bg-white/10 text-gray-400'}`}>
                                             {log.icon}
                                          </div>
                                          <div>
                                             <div className="text-xs font-bold text-white">{log.type}</div>
                                             <div className="text-[9px] text-gray-500">{log.steps} steps</div>
                                          </div>
                                       </div>
                                       <div className="text-xs font-bold text-orange-400">{log.cals} <span className="text-[9px] font-normal text-gray-500">kcal</span></div>
                                    </div>
                                 ))}
                              </div>
                           </div>

                           <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5">
                              <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-400 flex-shrink-0">
                                 <Info size={20} />
                              </div>
                              <p className="text-xs text-gray-400 leading-tight">
                                 检测到您在 <b>18:00 - 19:00</b> 期间活动量较低，建议晚餐后散步 20 分钟以达成今日目标。
                              </p>
                           </div>
                        </div>
                     )}

                  </div>

                  {/* Bottom Nav Simulation */}
                  <div className="absolute bottom-0 w-full h-20 bg-black/90 backdrop-blur-xl border-t border-white/10 flex items-center justify-around px-2 z-20">
                     <div className={`flex flex-col items-center gap-1 ${activeTab === 'readiness' ? 'text-white' : 'text-gray-600'}`}>
                        <div className="w-1 h-1 bg-current rounded-full mb-1"></div>
                        <span className="text-[9px] font-bold uppercase tracking-widest">Home</span>
                     </div>
                     <div className="flex flex-col items-center gap-1 text-gray-600">
                        <Calendar size={20} />
                     </div>
                     <div className="flex flex-col items-center gap-1 text-gray-600">
                        <Share2 size={20} />
                     </div>
                  </div>
                  
                  {/* Home Indicator */}
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/20 rounded-full z-30"></div>
               </div>
            </div>
         </div>
      </section>

      {/* 3. "Morning Brief" - Key UI Flow */}
      <section className="space-y-12">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-yellow-100 px-4 py-2 rounded-full">
             <Sun size={16} className="text-yellow-600" />
             <span className="text-xs font-bold text-yellow-600 uppercase tracking-widest">Core Experience</span>
          </div>
          <h3 className="text-4xl font-black">Morning Brief <br /><span className="text-gray-400">晨间速览体验</span></h3>
          <p className="text-gray-500 max-w-2xl mx-auto">
            这是用户每天打开 App 的第一个界面。我们摒弃了复杂的数据报表，而是用卡片式叙事，告诉用户“今天感觉如何”。
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {[
             { title: 'Good Morning', sub: 'Sleep Score 88', bg: 'bg-indigo-900 text-white', icon: <Moon size={24} className="text-indigo-300" />, desc: '昨晚的深度睡眠充足，今日精力充沛。' },
             { title: 'Ready to Go', sub: 'Readiness 85', bg: 'bg-emerald-900 text-white', icon: <Zap size={24} className="text-emerald-300" />, desc: '心率变异性(HRV)处于理想区间，适合挑战。' },
             { title: 'Goal Insight', sub: 'Activity Target', bg: 'bg-orange-50 text-orange-900', icon: <Flame size={24} className="text-orange-500" />, desc: '建议今日在下午 5 点前完成 40 分钟有氧。' },
           ].map((card, i) => (
             <div key={i} className={`p-8 rounded-[2.5rem] ${card.bg} flex flex-col justify-between h-80 relative overflow-hidden group hover:scale-[1.02] transition-transform duration-500`}>
                <div className="absolute top-0 right-0 p-8 opacity-20 transform translate-x-4 -translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform">
                   {React.cloneElement(card.icon as any, { size: 100 })}
                </div>
                <div className="relative z-10">
                   {card.icon}
                   <h4 className="text-3xl font-black mt-4 mb-1">{card.title}</h4>
                   <p className="font-bold opacity-60 uppercase text-xs tracking-widest">{card.sub}</p>
                </div>
                <div className="relative z-10 border-t border-current border-opacity-20 pt-6">
                   <p className="text-sm font-medium leading-relaxed opacity-90">{card.desc}</p>
                </div>
             </div>
           ))}
        </div>
      </section>

      {/* 4. Design System & Color Philosophy */}
      <section className="bg-gray-50 rounded-[4rem] p-12 lg:p-20 flex flex-col lg:flex-row gap-16 items-center">
         <div className="lg:w-1/2 space-y-8">
            <h3 className="text-4xl font-black">Circadian UI <br /><span className="text-[#8A84FF]">昼夜节律设计语言</span></h3>
            <p className="text-gray-500 text-lg leading-relaxed">
               为了最大程度减少夜间蓝光干扰，我们设计了一套随时间变化的色彩系统。App 界面会在日落后自动切换至“褪黑素保护模式”，使用波长较长的暖色调与深色背景。
            </p>
            <div className="space-y-4">
               {[
                 { name: 'Deep Sleep Indigo', hex: '#4F46E5', desc: '用于睡眠数据，平静且深邃', bg: 'bg-indigo-600' },
                 { name: 'Vitality Emerald', hex: '#10B981', desc: '用于恢复指数，代表生机', bg: 'bg-emerald-500' },
                 { name: 'Alert Orange', hex: '#F97316', desc: '用于活动激励，激发动能', bg: 'bg-orange-500' }
               ].map((c, i) => (
                 <div key={i} className="flex items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                    <div className={`w-12 h-12 rounded-full ${c.bg} shadow-md`}></div>
                    <div>
                       <div className="font-bold text-gray-900">{c.name}</div>
                       <div className="text-xs text-gray-400 font-mono mt-0.5">{c.hex} · {c.desc}</div>
                    </div>
                 </div>
               ))}
            </div>
         </div>
         <div className="lg:w-1/2 grid grid-cols-2 gap-4">
            <div className="aspect-[3/4] bg-black rounded-3xl p-6 flex flex-col justify-end relative overflow-hidden shadow-2xl">
               <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-indigo-900/50 to-black"></div>
               <div className="relative z-10 text-white">
                  <Moon className="mb-2 text-indigo-400" />
                  <div className="text-2xl font-black">Night</div>
                  <div className="text-xs text-indigo-300">Low Light Mode</div>
               </div>
            </div>
            <div className="aspect-[3/4] bg-white rounded-3xl p-6 flex flex-col justify-end relative overflow-hidden shadow-2xl border border-gray-100">
               <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-orange-50 to-white"></div>
               <div className="relative z-10 text-gray-900">
                  <Sun className="mb-2 text-orange-500" />
                  <div className="text-2xl font-black">Day</div>
                  <div className="text-xs text-orange-500">High Contrast</div>
               </div>
            </div>
         </div>
      </section>
      
      {/* 5. Feature Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         {[
           { title: 'SpO2 血氧传感', desc: '红外光 PPG 传感器，夜间自动监测呼吸质量。', icon: <Droplets className="text-blue-500" /> },
           { title: '皮肤温度趋势', desc: '精确到 0.1°C 的温差监测，提前预知身体不适。', icon: <Thermometer className="text-red-500" /> },
           { title: '周期预测', desc: '基于体温算法的生理周期智能追踪与提醒。', icon: <Calendar className="text-purple-500" /> },
           { title: '7天超长续航', desc: '45mAh 高密度电池，充电一次仅需 80 分钟。', icon: <Battery className="text-green-500" /> },
         ].map((f, i) => (
           <div key={i} className="bg-gray-50 p-8 rounded-[2rem] border border-transparent hover:border-gray-200 hover:shadow-lg transition-all group">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 transition-transform">
                 {f.icon}
              </div>
              <h4 className="text-lg font-bold mb-2 text-gray-900">{f.title}</h4>
              <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
           </div>
         ))}
      </section>

      {/* 6. Comparison Chart (Bento Grid Style) */}
      <section className="bg-white rounded-[4rem] p-12 lg:p-20 border border-gray-100 shadow-xl overflow-hidden relative">
         <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/3 space-y-6">
               <div className="inline-flex items-center gap-2 bg-black text-white px-4 py-2 rounded-full">
                  <BarChart3 size={16} />
                  <span className="text-xs font-bold uppercase tracking-widest">Data Insights</span>
               </div>
               <h3 className="text-4xl font-bold">不仅仅是数据<br /><span className="text-[#8A84FF]">而是行动指南</span></h3>
               <p className="text-gray-500 text-lg">
                  相比于智能手表，指环的数据采集更加连续且无感。我们不仅告诉你昨晚睡了多久，更会建议你“今晚提前30分钟入睡”以恢复精力。
               </p>
               <button className="flex items-center gap-2 text-[#8A84FF] font-bold hover:underline">
                  阅读设计白皮书 <ArrowUpRight size={18} />
               </button>
            </div>
            
            <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4">
               {/* Card 1 */}
               <div className="bg-gray-50 p-6 rounded-[2rem] flex flex-col justify-between h-64">
                  <div className="flex justify-between items-start">
                     <div className="p-3 bg-white rounded-xl shadow-sm"><Flame size={20} className="text-orange-500" /></div>
                     <span className="text-xs font-bold text-gray-400">vs Last Week</span>
                  </div>
                  <div>
                     <div className="text-3xl font-black text-gray-900 mb-1">+12%</div>
                     <div className="text-sm font-bold text-gray-500">平均卡路里消耗</div>
                     <div className="w-full bg-gray-200 h-1.5 rounded-full mt-4 overflow-hidden">
                        <div className="bg-orange-500 w-[60%] h-full rounded-full"></div>
                     </div>
                  </div>
               </div>
               
               {/* Card 2 */}
               <div className="bg-gray-900 text-white p-6 rounded-[2rem] flex flex-col justify-between h-64 relative overflow-hidden">
                  <div className="absolute -right-10 -top-10 w-32 h-32 bg-[#8A84FF] rounded-full blur-[50px] opacity-50"></div>
                  <div className="flex justify-between items-start relative z-10">
                     <div className="p-3 bg-white/10 rounded-xl"><Moon size={20} className="text-indigo-400" /></div>
                     <span className="text-xs font-bold text-gray-400">Sleep Score</span>
                  </div>
                  <div className="relative z-10">
                     <div className="flex items-end gap-2 mb-1">
                        <span className="text-4xl font-black">88</span>
                        <span className="text-sm font-bold text-green-400 mb-1.5 flex items-center gap-0.5"><ArrowUpRight size={14} /> 2.5</span>
                     </div>
                     <div className="text-sm font-bold text-gray-400">本周睡眠质量提升</div>
                     
                     <div className="flex gap-1 mt-4 items-end h-8 opacity-50">
                        {[40, 60, 55, 70, 65, 80, 88].map((h,i) => (
                           <div key={i} className="w-full bg-indigo-400 rounded-t-sm" style={{height: `${h}%`}}></div>
                        ))}
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
};

// Helper Icon
function WifiIcon({ size }: { size: number }) {
   return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
         <path d="M5 12.55a11 11 0 0 1 14.08 0" />
         <path d="M1.42 9a16 16 0 0 1 21.16 0" />
         <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
         <line x1="12" y1="20" x2="12.01" y2="20" />
      </svg>
   )
}
