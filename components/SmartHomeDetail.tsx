
import React, { useState, useEffect } from 'react';
import { 
  Lightbulb, Home, Wind, Thermometer, Lock, 
  Power, Sun, Moon, Fan, Music, Tv, 
  Palette, Droplets, Clock, Plus, Zap,
  Wifi, Sliders, LayoutGrid, Sparkles,
  ChevronRight, ArrowRight, Settings,
  Shield, Smartphone, LampCeiling,
  BedDouble, Video, Bell, Eye,
  BatteryCharging, Leaf, BarChart2,
  ShieldCheck, AlertTriangle, Fingerprint
} from 'lucide-react';

export const SmartHomeDetail: React.FC = () => {
  const [activeRoom, setActiveRoom] = useState<'living' | 'bedroom' | 'kitchen'>('living');
  const [powerOn, setPowerOn] = useState(true);
  const [brightness, setBrightness] = useState(80);
  const [temp, setTemp] = useState(50); // 0 = warm, 100 = cool
  const [activeScene, setActiveScene] = useState<string | null>('movie');
  
  // Security States
  const [securityMode, setSecurityMode] = useState<'布防' | '撤防' | '在家'>('在家');
  const [selectedCamera, setSelectedCamera] = useState(0);

  // Room Configuration
  const rooms = {
    living: { name: '客厅 (Living)', temp: 24, humidity: 45, devices: 8, image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=800' },
    bedroom: { name: '主卧 (Bedroom)', temp: 22, humidity: 50, devices: 5, image: 'https://i.ibb.co/jvkZQ35h/image.png' },
    kitchen: { name: '餐厨 (Kitchen)', temp: 25, humidity: 60, devices: 4, image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=800' },
  };

  // Dynamic Light Style
  const getLightOverlayStyle = () => {
    if (!powerOn) return { opacity: 0.6, background: '#000' };
    
    // Calculate color based on temp (Warm Orange -> Cool Blue)
    // Temp 0 (Warm): 255, 160, 60
    // Temp 100 (Cool): 200, 230, 255
    const r = 255 - (temp * 0.55); 
    const g = 160 + (temp * 0.7);
    const b = 60 + (temp * 1.95);
    
    return {
      background: `linear-gradient(to bottom, rgba(${r},${g},${b},${brightness/150}), rgba(0,0,0,0.2))`,
      mixBlendMode: 'overlay' as any,
      opacity: 1
    };
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 space-y-32 pb-20">
      
      {/* 1. Hero Section */}
      <section className="text-center space-y-8 max-w-4xl mx-auto pt-10">
        <div className="inline-flex items-center gap-2 bg-yellow-400/10 px-4 py-2 rounded-full border border-yellow-400/20">
           <Lightbulb size={16} className="text-yellow-500 fill-yellow-500" />
           <span className="text-xs font-bold text-yellow-600 uppercase tracking-widest">Ambient Intelligence</span>
        </div>
        <h3 className="text-4xl lg:text-7xl font-black tracking-tight leading-tight">
          Lumiere <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">OS</span><br />
          光影的指挥家
        </h3>
        <p className="text-gray-500 text-xl leading-relaxed max-w-2xl mx-auto">
          这不仅是一个开关，而是一套重塑空间氛围的拟物化交互系统。我们利用光影渲染与物理反馈，让每一次触控都仿佛在真实地“塑造”光线。
        </p>
      </section>

      {/* 2. Interactive Lighting Studio (The Core Feature) */}
      <section className="bg-[#1a1a1a] rounded-[4rem] p-8 lg:p-12 overflow-hidden relative shadow-2xl">
         {/* Background Glow */}
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-gray-800 via-[#1a1a1a] to-[#1a1a1a] pointer-events-none"></div>

         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10 h-auto lg:h-[700px]">
            
            {/* Left: Room Selector & Status */}
            <div className="lg:col-span-3 flex flex-col gap-4">
               <div className="bg-white/5 backdrop-blur-md rounded-[2rem] p-6 border border-white/5 flex-1">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">区域选择 (Zone)</h4>
                  <div className="space-y-3">
                     {(Object.keys(rooms) as Array<keyof typeof rooms>).map((room) => (
                        <button
                           key={room}
                           onClick={() => setActiveRoom(room)}
                           className={`w-full p-4 rounded-2xl flex items-center justify-between transition-all group ${activeRoom === room ? 'bg-white text-black shadow-lg' : 'bg-black/20 text-gray-400 hover:bg-white/10'}`}
                        >
                           <span className="font-bold">{rooms[room].name}</span>
                           <ChevronRight size={16} className={`transition-transform ${activeRoom === room ? 'rotate-90' : 'group-hover:translate-x-1'}`} />
                        </button>
                     ))}
                  </div>
               </div>

               <div className="bg-white/5 backdrop-blur-md rounded-[2rem] p-6 border border-white/5">
                   <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">环境监测 (Environment)</h4>
                   <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1">
                         <div className="flex items-center gap-2 text-orange-400">
                            <Thermometer size={18} />
                            <span className="text-xl font-black text-white">{rooms[activeRoom].temp}°</span>
                         </div>
                         <span className="text-[10px] text-gray-500 font-bold">室内温度</span>
                      </div>
                      <div className="flex flex-col gap-1">
                         <div className="flex items-center gap-2 text-blue-400">
                            <Droplets size={18} />
                            <span className="text-xl font-black text-white">{rooms[activeRoom].humidity}%</span>
                         </div>
                         <span className="text-[10px] text-gray-500 font-bold">空气湿度</span>
                      </div>
                   </div>
               </div>
            </div>

            {/* Center: Visualizer Window */}
            <div className="lg:col-span-6 relative group">
               <div className="w-full h-full rounded-[3rem] overflow-hidden relative shadow-2xl border-4 border-[#333] bg-black">
                  {/* Room Image */}
                  <img 
                     src={rooms[activeRoom].image} 
                     className="w-full h-full object-cover transition-opacity duration-700"
                     alt="Room"
                  />
                  
                  {/* Dynamic Lighting Layer */}
                  <div 
                     className="absolute inset-0 transition-all duration-300 pointer-events-none"
                     style={getLightOverlayStyle()}
                  ></div>

                  {/* Reflection/Gloss */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none"></div>

                  {/* Floating Controls Overlay */}
                  <div className="absolute top-6 left-6 right-6 flex justify-between items-start">
                     <div className="bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${powerOn ? 'bg-green-500 shadow-[0_0_8px_#22c55e]' : 'bg-red-500'}`}></div>
                        <span className="text-xs font-bold text-white uppercase">{powerOn ? '系统在线 (System Online)' : '待机中 (Standby)'}</span>
                     </div>
                     <button 
                        onClick={() => setPowerOn(!powerOn)}
                        className={`w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-md border transition-all ${powerOn ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.3)]' : 'bg-black/60 text-gray-400 border-white/10'}`}
                     >
                        <Power size={20} />
                     </button>
                  </div>
                  
                  {/* Quick Scene Selector at Bottom */}
                  <div className="absolute bottom-6 left-6 right-6">
                     <div className="bg-black/80 backdrop-blur-xl rounded-[2rem] p-2 border border-white/10 flex justify-between gap-1 overflow-x-auto no-scrollbar">
                        {[
                           { id: 'movie', icon: <Tv size={16} />, label: '观影 (Movie)', b: 40, t: 20 },
                           { id: 'read', icon: <LayoutGrid size={16} />, label: '阅读 (Read)', b: 90, t: 80 },
                           { id: 'relax', icon: <Wind size={16} />, label: '休闲 (Relax)', b: 60, t: 10 },
                           { id: 'party', icon: <Music size={16} />, label: '派对 (Party)', b: 85, t: 50 },
                        ].map((scene) => (
                           <button
                              key={scene.id}
                              onClick={() => { 
                                 setActiveScene(scene.id); 
                                 setPowerOn(true);
                                 setBrightness(scene.b);
                                 setTemp(scene.t);
                              }}
                              className={`flex-1 flex flex-col items-center justify-center gap-1 py-3 px-4 rounded-2xl transition-all ${activeScene === scene.id && powerOn ? 'bg-white/10 text-white shadow-inner' : 'text-gray-500 hover:bg-white/5 hover:text-gray-300'}`}
                           >
                              {scene.icon}
                              <span className="text-[9px] font-bold uppercase">{scene.label}</span>
                           </button>
                        ))}
                     </div>
                  </div>
               </div>
            </div>

            {/* Right: Skeuomorphic Controls */}
            <div className="lg:col-span-3 flex flex-col gap-6">
               {/* Brightness Slider */}
               <div className="bg-[#222] rounded-[2.5rem] p-8 flex flex-col items-center justify-between border-2 border-[#2a2a2a] shadow-inner relative overflow-hidden h-1/2">
                  <div className="text-center space-y-1 relative z-10">
                     <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest">亮度调节</h4>
                     <p className="text-3xl font-black text-white">{powerOn ? brightness : 0}%</p>
                  </div>
                  
                  <div className="relative h-full w-16 bg-[#111] rounded-full shadow-[inset_0_2px_5px_rgba(0,0,0,0.8)] border border-[#333] mt-6">
                     <div 
                        className="absolute bottom-0 w-full bg-yellow-400 rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(250,204,21,0.3)]"
                        style={{ height: `${powerOn ? brightness : 0}%` }}
                     ></div>
                     {/* Interactable Area */}
                     <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        value={brightness}
                        onChange={(e) => { setBrightness(Number(e.target.value)); setPowerOn(true); setActiveScene(null); }}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-ns-resize z-20"
                        {...({ orient: "vertical" } as any)}
                     />
                     {/* Thumb Graphic */}
                     <div 
                        className="absolute left-1/2 -translate-x-1/2 w-12 h-12 bg-[#333] rounded-full border border-[#555] shadow-xl pointer-events-none transition-all duration-300 flex items-center justify-center"
                        style={{ bottom: `calc(${powerOn ? brightness : 0}% - 24px)` }}
                     >
                        <Sun size={20} className={powerOn ? 'text-yellow-400' : 'text-gray-600'} />
                     </div>
                  </div>
               </div>

               {/* Temp Slider */}
               <div className="bg-[#222] rounded-[2.5rem] p-8 flex flex-col items-center justify-between border-2 border-[#2a2a2a] shadow-inner relative overflow-hidden h-1/2">
                  <div className="text-center space-y-1 relative z-10">
                     <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest">色温调节</h4>
                     <p className="text-3xl font-black text-white">{powerOn ? `${2700 + (temp * 38)}K` : '--'}</p>
                  </div>
                  
                  <div className="relative h-full w-16 bg-gradient-to-t from-orange-400 to-blue-300 rounded-full border border-[#333] mt-6 opacity-80">
                     {/* Interactable Area */}
                     <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        value={temp}
                        onChange={(e) => { setTemp(Number(e.target.value)); setPowerOn(true); setActiveScene(null); }}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-ns-resize z-20"
                     />
                     {/* Thumb Graphic */}
                     <div 
                        className="absolute left-1/2 -translate-x-1/2 w-14 h-8 bg-white/20 backdrop-blur-md rounded-lg border border-white/40 shadow-xl pointer-events-none transition-all duration-300"
                        style={{ bottom: `calc(${temp}% - 16px)` }}
                     ></div>
                  </div>
                  <div className="flex justify-between w-full mt-2 px-2 text-gray-500">
                     <span className="text-[10px] font-bold">暖光</span>
                     <span className="text-[10px] font-bold">冷光</span>
                  </div>
               </div>
            </div>

         </div>
      </section>

      {/* 3. Design Philosophy */}
      <section className="bg-white rounded-[4rem] p-12 lg:p-20 border border-gray-100 shadow-xl overflow-hidden relative">
         <div className="absolute top-0 right-0 w-1/3 h-full bg-yellow-400/5 blur-[150px] pointer-events-none"></div>
         
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
            <div className="space-y-8">
               <h3 className="text-4xl font-black text-gray-900">拟物与极简的 <br /><span className="text-yellow-500">完美平衡</span></h3>
               <p className="text-gray-500 text-lg leading-relaxed">
                  在 Lumiere OS 中，我们没有完全摒弃拟物化（Skeuomorphism），而是将其与现代极简主义（Minimalism）融合。
                  <br /><br />
                  旋钮的阻尼感、开关的清脆声效、以及光线在界面上的漫反射，这些物理世界的隐喻让智能家居的控制变得直观且富有温度。我们称之为 <b>"Tactile Digital (数字触感)"</b> 设计语言。
               </p>
               <div className="grid grid-cols-2 gap-6">
                  <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100">
                     <div className="w-10 h-10 bg-white shadow-md rounded-full flex items-center justify-center mb-3">
                        <Sliders size={20} className="text-gray-800" />
                     </div>
                     <h5 className="font-bold text-gray-900">触觉反馈</h5>
                     <p className="text-xs text-gray-500 mt-1">操作时的微震动反馈，模拟机械手感。</p>
                  </div>
                  <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100">
                     <div className="w-10 h-10 bg-white shadow-md rounded-full flex items-center justify-center mb-3">
                        <Sparkles size={20} className="text-gray-800" />
                     </div>
                     <h5 className="font-bold text-gray-900">动态光影</h5>
                     <p className="text-xs text-gray-500 mt-1">界面阴影随虚拟光源位置实时变化。</p>
                  </div>
               </div>
            </div>

            <div className="relative">
               {/* Decorative App Icon Grid */}
               <div className="grid grid-cols-2 gap-6 scale-95 rotate-3 hover:rotate-0 transition-transform duration-700">
                  <div className="bg-white p-6 rounded-[2.5rem] shadow-[0_20px_40px_rgba(0,0,0,0.08)] border border-gray-100 flex flex-col items-center gap-4 aspect-square justify-center">
                     <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 shadow-inner flex items-center justify-center border border-white">
                        <Power size={32} className="text-gray-400" />
                     </div>
                     <span className="text-xs font-bold text-gray-400 uppercase">按钮状态：关</span>
                  </div>
                  <div className="bg-white p-6 rounded-[2.5rem] shadow-[0_20px_40px_rgba(250,204,21,0.2)] border border-yellow-100 flex flex-col items-center gap-4 aspect-square justify-center">
                     <div className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-300 to-orange-400 shadow-[0_10px_20px_rgba(250,204,21,0.4)] flex items-center justify-center border border-white/20">
                        <Power size={32} className="text-white" />
                     </div>
                     <span className="text-xs font-bold text-yellow-600 uppercase">按钮状态：开</span>
                  </div>
                  <div className="bg-black p-6 rounded-[2.5rem] shadow-2xl flex flex-col items-center gap-4 aspect-square justify-center col-span-2 relative overflow-hidden">
                     <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-black"></div>
                     <div className="relative z-10 w-full px-8">
                        <div className="flex justify-between text-white text-xs font-bold mb-2 uppercase opacity-60">
                           <span>滑动条</span>
                           <span>80%</span>
                        </div>
                        <div className="w-full h-4 bg-gray-800 rounded-full shadow-inner border border-gray-700 relative">
                           <div className="absolute left-0 top-0 h-full w-[80%] bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full shadow-[0_0_10px_rgba(250,204,21,0.5)]"></div>
                           <div className="absolute top-1/2 -translate-y-1/2 left-[80%] w-8 h-8 bg-white rounded-full shadow-lg border border-gray-200"></div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* 4. NEW: Sentinel Security Hub */}
      <section className="bg-zinc-950 text-white rounded-[4rem] p-8 lg:p-16 overflow-hidden relative border border-white/5">
         <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-900/10 blur-[120px] pointer-events-none"></div>
         
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10">
            {/* Monitor Feed */}
            <div className="space-y-6">
               <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                     <ShieldCheck className="text-blue-500" size={24} />
                     <h3 className="text-2xl font-black tracking-tight">Sentinel 安防中心</h3>
                  </div>
                  <div className="flex bg-white/10 p-1 rounded-lg border border-white/10">
                     {['布防', '在家', '撤防'].map(mode => (
                        <button 
                           key={mode}
                           onClick={() => setSecurityMode(mode as any)}
                           className={`px-4 py-2 rounded-md text-[10px] font-bold uppercase transition-all ${securityMode === mode ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
                        >
                           {mode}
                        </button>
                     ))}
                  </div>
               </div>

               <div className="aspect-video bg-black rounded-3xl border border-white/10 relative overflow-hidden group">
                  <img src="https://images.unsplash.com/photo-1560185009-dddeb820c7b7?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover opacity-60" />
                  
                  {/* Bounding Box Simulation */}
                  <div className="absolute top-1/4 left-1/3 w-32 h-64 border-2 border-green-500 rounded-lg opacity-80 animate-pulse">
                     <div className="absolute -top-6 left-0 bg-green-500 text-black text-[9px] font-bold px-2 py-0.5">人行检测 98%</div>
                  </div>

                  {/* Camera UI Overlay */}
                  <div className="absolute top-4 left-4 flex gap-2">
                     <div className="flex items-center gap-1 bg-red-600/80 px-2 py-1 rounded text-[9px] font-bold animate-pulse">
                        <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                        直播
                     </div>
                     <span className="bg-black/50 px-2 py-1 rounded text-[9px] font-mono border border-white/10">CAM 01 - 正门监控</span>
                  </div>
                  
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                     <div className="flex gap-2">
                        {['正门', '后院', '车库'].map((cam, i) => (
                           <button 
                              key={i}
                              onClick={() => setSelectedCamera(i)}
                              className={`px-3 py-1.5 rounded-lg border text-[10px] font-bold backdrop-blur-md transition-all ${selectedCamera === i ? 'bg-white text-black border-white' : 'bg-black/40 text-gray-400 border-white/10 hover:bg-black/60'}`}
                           >
                              {cam}
                           </button>
                        ))}
                     </div>
                     <button className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 transition-transform">
                        <Video size={18} />
                     </button>
                  </div>
               </div>
            </div>

            {/* Event Timeline & Status */}
            <div className="flex flex-col justify-between space-y-8">
               <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-900/20 p-5 rounded-2xl border border-blue-500/20">
                     <div className="flex justify-between items-start mb-2">
                        <Shield className="text-blue-400" size={20} />
                        <span className="text-[10px] text-blue-300 font-bold bg-blue-500/10 px-2 py-0.5 rounded">已布防</span>
                     </div>
                     <div className="text-2xl font-black">安全无异常</div>
                     <p className="text-[10px] text-gray-400 mt-1">系统自检完成 12:00</p>
                  </div>
                  <div className="bg-white/5 p-5 rounded-2xl border border-white/10">
                     <div className="flex justify-between items-start mb-2">
                        <Bell className="text-gray-400" size={20} />
                        <span className="text-[10px] text-gray-500 font-bold bg-white/5 px-2 py-0.5 rounded">0 警报</span>
                     </div>
                     <div className="text-2xl font-black text-gray-200">宁静</div>
                     <p className="text-[10px] text-gray-500 mt-1">2小时内无移动</p>
                  </div>
               </div>

               <div className="flex-1 bg-white/5 rounded-3xl border border-white/10 p-6 overflow-hidden">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">近期动态</h4>
                  <div className="space-y-6 relative before:absolute before:left-[7px] before:top-2 before:bottom-2 before:w-px before:bg-white/10">
                     {[
                        { time: '12:42 PM', event: '正门检测到人员', icon: <Eye size={12} />, active: true },
                        { time: '10:15 AM', event: '系统布防（离家模式）', icon: <Lock size={12} /> },
                        { time: '08:30 AM', event: '车库门已开启', icon: <Home size={12} /> },
                     ].map((item, i) => (
                        <div key={i} className="relative pl-8 group">
                           <div className={`absolute left-0 top-1 w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center bg-zinc-950 ${item.active ? 'border-green-500 text-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]' : 'border-gray-600 text-gray-600'}`}>
                              <div className={`w-1.5 h-1.5 rounded-full ${item.active ? 'bg-green-500' : 'bg-gray-600'}`}></div>
                           </div>
                           <div className="flex justify-between items-start">
                              <div>
                                 <div className={`text-sm font-bold ${item.active ? 'text-white' : 'text-gray-500'}`}>{item.event}</div>
                                 <div className="text-[10px] text-gray-600 font-mono mt-0.5">{item.time}</div>
                              </div>
                              {item.active && (
                                 <button className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded text-[9px] font-bold transition-colors">查看录像</button>
                              )}
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* 5. NEW: Eco-Grid Energy Dashboard */}
      <section className="bg-white rounded-[4rem] p-12 lg:p-20 border border-gray-100 shadow-xl overflow-hidden relative">
         <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-green-50/50 to-transparent pointer-events-none"></div>
         
         <div className="text-center mb-12 relative z-10">
            <div className="inline-flex items-center gap-2 bg-green-100 px-4 py-2 rounded-full mb-4">
               <Leaf size={16} className="text-green-600" />
               <span className="text-xs font-bold text-green-700 uppercase tracking-widest">Eco-Grid 2.0</span>
            </div>
            <h3 className="text-4xl font-black text-gray-900">家庭能源可视化</h3>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
            {/* Source: Solar */}
            <div className="bg-gray-50 p-8 rounded-[2.5rem] flex flex-col items-center justify-center text-center border border-gray-100 relative group">
               <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600 mb-4 group-hover:scale-110 transition-transform">
                  <Sun size={32} />
               </div>
               <h4 className="text-lg font-bold text-gray-900">光伏输入</h4>
               <div className="text-3xl font-black text-gray-900 mt-1">4.2 <span className="text-sm text-gray-400 font-medium">kW</span></div>
               <div className="mt-4 w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div className="w-[70%] h-full bg-yellow-400 rounded-full animate-pulse"></div>
               </div>
               
               {/* Animated Flow Line (Right) */}
               <div className="hidden lg:block absolute top-1/2 right-0 w-8 h-0.5 bg-gray-200 translate-x-full">
                  <div className="absolute top-0 left-0 w-full h-full bg-green-400 animate-flow-right"></div>
               </div>
            </div>

            {/* Hub: Home Battery */}
            <div className="bg-black text-white p-8 rounded-[2.5rem] flex flex-col items-center justify-center text-center shadow-2xl relative overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 to-black pointer-events-none"></div>
               <div className="relative z-10">
                  <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-green-400 mb-4 mx-auto border border-white/10 shadow-[0_0_30px_rgba(74,222,128,0.2)]">
                     <BatteryCharging size={32} />
                  </div>
                  <h4 className="text-xl font-bold">储能电池</h4>
                  <div className="text-4xl font-black mt-2">86<span className="text-lg text-gray-400 font-medium">%</span></div>
                  <p className="text-xs text-gray-400 mt-2">正在使用光伏充电</p>
               </div>
            </div>

            {/* Load: Home Usage */}
            <div className="bg-gray-50 p-8 rounded-[2.5rem] flex flex-col items-center justify-center text-center border border-gray-100 relative group">
               {/* Animated Flow Line (Left) */}
               <div className="hidden lg:block absolute top-1/2 left-0 w-8 h-0.5 bg-gray-200 -translate-x-full">
                  <div className="absolute top-0 left-0 w-full h-full bg-green-400 animate-flow-right"></div>
               </div>

               <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4 group-hover:scale-110 transition-transform">
                  <Home size={32} />
               </div>
               <h4 className="text-lg font-bold text-gray-900">家庭负载</h4>
               <div className="text-3xl font-black text-gray-900 mt-1">1.8 <span className="text-sm text-gray-400 font-medium">kW</span></div>
               <div className="grid grid-cols-3 gap-2 mt-4 w-full">
                  <div className="bg-white p-2 rounded-lg text-[10px] font-bold text-gray-500 shadow-sm">暖通空调</div>
                  <div className="bg-white p-2 rounded-lg text-[10px] font-bold text-gray-500 shadow-sm">新能源车</div>
                  <div className="bg-white p-2 rounded-lg text-[10px] font-bold text-gray-500 shadow-sm">其他</div>
               </div>
            </div>
         </div>
      </section>

      {/* 6. Automation Flow Cards */}
      <section className="space-y-12">
        <div className="text-center space-y-4">
          <h3 className="text-3xl font-black">自动化场景 (Automation)<br /><span className="text-gray-400">看得见的智能</span></h3>
          <p className="text-gray-500 max-w-xl mx-auto">
             将复杂的 IFTTT 逻辑转化为简单的卡片式语言。用户可以像搭积木一样构建自己的智能生活场景。
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {[
             { name: '回家模式', trigger: '当门锁打开', action: '打开客厅主灯 · 暖光 50%', icon: <Home size={24} />, color: 'bg-blue-50 text-blue-600', accent: 'bg-blue-500' },
             { name: '离家模式', trigger: '当全屋无人', action: '关闭所有设备 · 开启安防', icon: <Lock size={24} />, color: 'bg-gray-100 text-gray-600', accent: 'bg-gray-800' },
             { name: '观影时刻', trigger: '当电视开启', action: '窗帘关闭 · 灯光调暗至 10%', icon: <Tv size={24} />, color: 'bg-purple-50 text-purple-600', accent: 'bg-purple-brand' },
           ].map((card, i) => (
             <div key={i} className="group bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1">
                <div className={`w-14 h-14 ${card.color} rounded-2xl flex items-center justify-center mb-6`}>
                   {card.icon}
                </div>
                <h4 className="text-xl font-bold mb-4">{card.name}</h4>
                
                <div className="space-y-0 relative">
                   <div className="absolute left-[11px] top-6 bottom-6 w-0.5 bg-gray-100 group-hover:bg-gray-200 transition-colors"></div>
                   
                   <div className="flex items-start gap-4">
                      <div className={`w-6 h-6 rounded-full border-4 border-white shadow-sm flex-shrink-0 z-10 ${card.accent}`}></div>
                      <div>
                         <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">当 (IF)</span>
                         <p className="text-sm font-medium text-gray-900">{card.trigger}</p>
                      </div>
                   </div>
                   <div className="flex items-start gap-4 pt-6">
                      <div className={`w-6 h-6 rounded-full border-4 border-white shadow-sm flex-shrink-0 z-10 ${card.accent}`}></div>
                      <div>
                         <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">执行 (THEN)</span>
                         <p className="text-sm font-medium text-gray-900">{card.action}</p>
                      </div>
                   </div>
                </div>
                
                <div className="mt-8 pt-6 border-t border-gray-50 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity">
                   <span className="text-xs font-bold text-gray-400">编辑流程</span>
                   <Settings size={16} className="text-gray-400 hover:text-gray-900 cursor-pointer" />
                </div>
             </div>
           ))}
        </div>
      </section>

      {/* 7. Mobile App Preview */}
      <section className="bg-yellow-400 rounded-[4rem] p-12 lg:p-24 flex flex-col lg:flex-row items-center gap-20 overflow-hidden relative">
         <div className="lg:w-1/2 space-y-8 relative z-10">
            <h3 className="text-4xl lg:text-6xl font-black text-black leading-tight">Lumiere App <br /> 掌心里的光</h3>
            <p className="text-black/70 text-lg font-medium leading-relaxed">
               我们将中控屏的体验完美移植到了移动端。通过 Haptic Touch 技术，你在手机屏幕上滑动调光时，能感受到仿佛转动真实旋钮般的细腻震动。
            </p>
            <div className="flex flex-wrap gap-4">
               <button className="bg-black text-white px-8 py-4 rounded-2xl font-bold hover:bg-gray-900 transition-all flex items-center gap-3">
                  <Smartphone size={20} />
                  下载应用
               </button>
               <button className="bg-white text-black border border-black/10 px-8 py-4 rounded-2xl font-bold hover:bg-white/90 transition-all flex items-center gap-3">
                  <LayoutGrid size={20} />
                  查看组件库
               </button>
            </div>
         </div>
         
         <div className="lg:w-1/2 relative flex justify-center z-10">
            <div className="w-[320px] bg-white rounded-[3rem] shadow-2xl border-8 border-black overflow-hidden relative">
               <div className="aspect-[9/19.5] bg-gray-50 relative overflow-y-auto no-scrollbar">
                  {/* Fake App UI */}
                  <div className="p-6 space-y-6">
                     <div className="flex justify-between items-center pt-8">
                        <div>
                           <div className="text-xs font-bold text-gray-400 uppercase">我的家</div>
                           <h4 className="text-2xl font-black">Morning, Alex</h4>
                        </div>
                        <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center border-2 border-white shadow-md">
                           <span className="font-bold">A</span>
                        </div>
                     </div>
                     
                     {/* Energy Card */}
                     <div className="bg-black text-white p-6 rounded-3xl shadow-xl">
                        <div className="flex items-center gap-3 mb-4">
                           <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center text-black">
                              <Zap size={16} fill="currentColor" />
                           </div>
                           <span className="text-xs font-bold uppercase tracking-widest text-gray-400">能耗统计</span>
                        </div>
                        <div className="flex items-end justify-between">
                           <div>
                              <span className="text-3xl font-black">12.4</span>
                              <span className="text-sm font-bold text-gray-500 ml-1">kWh</span>
                           </div>
                           <div className="h-10 flex gap-1 items-end">
                              {[30, 50, 40, 70, 55, 30, 45].map((h, i) => (
                                 <div key={i} className="w-2 bg-white/20 rounded-t-sm" style={{ height: `${h}%` }}></div>
                              ))}
                              <div className="w-2 bg-yellow-400 rounded-t-sm" style={{ height: '60%' }}></div>
                           </div>
                        </div>
                     </div>

                     {/* Room Grid */}
                     <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100">
                           <LampCeiling size={24} className="text-yellow-500 mb-3" />
                           <h5 className="font-bold text-gray-900">客厅</h5>
                           <p className="text-xs text-gray-400">4 设备开启</p>
                        </div>
                        <div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 opacity-60">
                           <BedDouble size={24} className="text-gray-400 mb-3" />
                           <h5 className="font-bold text-gray-900">卧室</h5>
                           <p className="text-xs text-gray-400">关闭</p>
                        </div>
                        <div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 opacity-60">
                           <Utensils size={24} className="text-gray-400 mb-3" />
                           <h5 className="font-bold text-gray-900">厨房</h5>
                           <p className="text-xs text-gray-400">关闭</p>
                        </div>
                        <div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 opacity-60 flex items-center justify-center">
                           <Plus size={24} className="text-gray-300" />
                        </div>
                     </div>
                  </div>
                  
                  {/* Floating Action Button */}
                  <div className="absolute bottom-6 right-6 w-14 h-14 bg-black text-white rounded-full flex items-center justify-center shadow-2xl">
                     <Plus size={24} />
                  </div>
               </div>
            </div>
            
            {/* Background Spline */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-white/20 blur-3xl -z-10 rounded-full"></div>
         </div>
      </section>

    </div>
  );
};

// Helper Icon for Kitchen
function Utensils({ size, className }: { size: number, className?: string }) {
   return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
         <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
         <path d="M7 2v20" />
         <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
      </svg>
   )
}

// Style injection for energy flow animation
const style = document.createElement('style');
style.textContent = `
  @keyframes flow-right {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
  .animate-flow-right { animation: flow-right 2s linear infinite; }
`;
document.head.appendChild(style);
