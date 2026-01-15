
import React, { useState, useEffect, useRef } from 'react';
import { 
  Volume2, Bluetooth, Settings, Music, Mic, 
  Languages, Bot, Zap, ChevronRight, Share2, 
  Sparkles, AudioLines, Smartphone, User2, 
  Ear, Activity, MapPin, RefreshCcw, 
  Waves, Wind, Disc, CheckCircle2, Info,
  MessageCircle, Send, RotateCcw, VolumeX,
  X, Play, Eye, ArrowDown, Fingerprint
} from 'lucide-react';

export const EarphoneDetail: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'audio' | 'translate' | 'face2face' | 'ai_qa'>('audio');
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState<{ lang: string, text: string }[]>([]);
  const [aiMessages, setAiMessages] = useState<{ role: 'user' | 'ai', text: string }[]>([]);
  const [ancLevel, setAncLevel] = useState(80);
  const [showAnimationGallery, setShowAnimationGallery] = useState(false);
  
  // Animation Lab States
  const [eqMode, setEqMode] = useState<'balance' | 'bass'>('balance');
  const [isCharging, setIsCharging] = useState(true);
  const [voiceActive, setVoiceActive] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);

  // 模拟流式翻译文本
  useEffect(() => {
    if (isListening && activeTab === 'translate') {
      const demoTexts = [
        { lang: 'en', text: "Hello, can you help me find the gate?" },
        { lang: 'cn', text: "你好，能帮我找一下登机口吗？" },
        { lang: 'en', text: "It's near the duty-free shop." },
        { lang: 'cn', text: "就在免税店旁边。" },
      ];
      let i = 0;
      const interval = setInterval(() => {
        if (i < demoTexts.length) {
          setTranscript(prev => [...prev, demoTexts[i]]);
          i++;
        } else {
          setIsListening(false);
          clearInterval(interval);
        }
      }, 1500);
      return () => clearInterval(interval);
    }
  }, [isListening, activeTab]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [transcript, aiMessages]);

  const handleAiAsk = () => {
    const userMsg = "帮我分析一下目前的降噪环境。";
    setAiMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setTimeout(() => {
      setAiMessages(prev => [...prev, { role: 'ai', text: "当前环境噪音约 65dB，主要为低频风噪。已为您自动切换至‘强力降噪’模式，并优化了中频人声透传。" }]);
    }, 1000);
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 space-y-32 pb-32 relative">
      
      {/* 沉浸式动效实验室 (Motion Lab) */}
      {showAnimationGallery && (
        <div className="fixed inset-0 z-[100] bg-[#050505] flex flex-col animate-in zoom-in-95 duration-700 overflow-y-auto no-scrollbar scroll-smooth">
          {/* 顶栏 */}
          <div className="sticky top-0 z-50 px-8 py-10 flex justify-between items-center bg-[#050505]/80 backdrop-blur-3xl border-b border-white/5">
            <div className="flex items-center gap-6">
               <div className="w-14 h-14 bg-gradient-to-br from-purple-brand to-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-[0_0_30px_rgba(138,132,255,0.4)]">
                  <Play size={24} className="fill-current" />
               </div>
               <div>
                  <h4 className="text-2xl font-black text-white tracking-tight">Motion Lab <span className="text-purple-brand opacity-50 ml-2 font-mono text-sm">v4.0.2</span></h4>
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.3em] mt-1">Acoustic Pro Interactive Prototype Showcase</p>
               </div>
            </div>
            <button 
              onClick={() => setShowAnimationGallery(false)}
              className="w-14 h-14 rounded-full bg-white/5 text-white flex items-center justify-center hover:bg-white/10 hover:rotate-90 transition-all duration-500 border border-white/10"
            >
              <X size={28} />
            </button>
          </div>

          <div className="max-w-7xl mx-auto w-full p-8 lg:p-20 grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* 动效 1: 神经元配对 (Neuro-Pairing) */}
            <div className="bg-gradient-to-b from-white/[0.03] to-transparent rounded-[4rem] p-16 flex flex-col items-center justify-center space-y-12 border border-white/5 hover:border-purple-brand/30 transition-all duration-700 relative group overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-brand/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
               <div className="text-center space-y-4">
                  <h5 className="text-2xl font-black text-white">自适应蓝牙场</h5>
                  <p className="text-xs text-gray-400 font-medium max-w-[280px]">使用基于物理规律的多层引力场动效，模拟设备发现的呼吸感</p>
               </div>
               <div className="relative w-64 h-64 flex items-center justify-center">
                  <div className="absolute inset-0 bg-purple-brand/5 rounded-full animate-pulse scale-150 blur-3xl"></div>
                  <div className="absolute inset-0 border border-purple-brand/10 rounded-full animate-ping-slow"></div>
                  <div className="absolute inset-8 border border-purple-brand/20 rounded-full animate-ping-slow delay-300"></div>
                  <div className="absolute inset-16 border border-purple-brand/40 rounded-full animate-ping-slow delay-700"></div>
                  
                  {/* Floating Devices */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 w-12 h-12 bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 flex items-center justify-center text-white/40 animate-float-slow">
                     <Smartphone size={20} />
                  </div>
                  
                  <div className="w-24 h-24 bg-purple-brand rounded-full flex items-center justify-center text-white relative z-10 shadow-[0_0_60px_rgba(138,132,255,0.7)] group-hover:scale-110 transition-transform duration-500">
                    <Bluetooth size={40} className="animate-pulse" />
                  </div>
               </div>
            </div>

            {/* 动效 2: 流体频谱 (Fluid Spectrum) */}
            <div className="bg-gradient-to-b from-white/[0.03] to-transparent rounded-[4rem] p-16 flex flex-col justify-between space-y-12 border border-white/5 transition-all duration-700">
               <div className="space-y-4">
                  <h5 className="text-2xl font-black text-white">高斯模糊频谱器</h5>
                  <p className="text-xs text-gray-400 font-medium">采用粒子系统渲染，实时响应音频频率的平滑过渡效果</p>
               </div>
               <div className="h-48 w-full flex items-end gap-2 px-4 relative">
                  {/* Background glow */}
                  <div className="absolute inset-x-10 bottom-0 h-24 bg-purple-brand/20 blur-[60px] rounded-full"></div>
                  
                  {(eqMode === 'balance' ? [40, 60, 85, 95, 70, 45, 65, 80, 50, 30] : [95, 90, 80, 60, 40, 30, 20, 15, 10, 5]).map((h, i) => (
                    <div 
                      key={i} 
                      className="flex-1 bg-gradient-to-t from-purple-brand/40 to-purple-brand rounded-full transition-all duration-1000 ease-in-out" 
                      style={{ height: `${h}%`, transitionDelay: `${i * 50}ms` }}
                    >
                       <div className="w-full h-1 bg-white/40 rounded-full shadow-[0_0_10px_#fff]"></div>
                    </div>
                  ))}
               </div>
               <div className="flex gap-4">
                  <button 
                    onClick={() => setEqMode('balance')}
                    className={`flex-1 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all ${eqMode === 'balance' ? 'bg-purple-brand text-white shadow-lg' : 'bg-white/5 text-gray-500 hover:bg-white/10'}`}
                  >
                    Natural Balance
                  </button>
                  <button 
                    onClick={() => setEqMode('bass')}
                    className={`flex-1 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all ${eqMode === 'bass' ? 'bg-purple-brand text-white shadow-lg' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
                  >
                    Deep Bass 5.0
                  </button>
               </div>
            </div>

            {/* 动效 3: 神经网络采样 (Neural Waveform) */}
            <div className="bg-gradient-to-b from-white/[0.03] to-transparent rounded-[4rem] p-16 flex flex-col items-center justify-center space-y-12 border border-white/5">
               <div className="text-center space-y-4">
                  <h5 className="text-2xl font-black text-white">神经网络语音采样</h5>
                  <p className="text-xs text-gray-400 font-medium">使用动态波形引擎，展现 AI 降噪过程中的原始采样与重构过程</p>
               </div>
               <div className="flex items-center gap-2 h-24">
                  {[1.2, 2.5, 4.0, 3.2, 1.8, 4.5, 6.0, 5.2, 3.5, 4.2, 5.8, 3.2, 1.5].map((s, idx) => (
                    <div 
                      key={idx} 
                      className={`w-2 bg-purple-brand rounded-full ${voiceActive ? 'animate-voice-fluid' : 'opacity-20'}`} 
                      style={{ 
                        animationDelay: `${idx * 0.08}s`, 
                        height: `${s * 15}px`,
                        boxShadow: voiceActive ? '0 0 15px rgba(138,132,255,0.5)' : 'none'
                      }}
                    ></div>
                  ))}
               </div>
               <button 
                onMouseDown={() => setVoiceActive(true)}
                onMouseUp={() => setVoiceActive(false)}
                onMouseLeave={() => setVoiceActive(false)}
                className={`px-12 py-5 rounded-full text-sm font-black transition-all flex items-center gap-3 ${voiceActive ? 'bg-purple-brand text-white shadow-[0_0_40px_#8A84FF] scale-95' : 'bg-white/10 text-white'}`}
               >
                  <Fingerprint size={20} />
                  {voiceActive ? '正在采样音频...' : '长按模拟语音输入'}
               </button>
            </div>

            {/* 动效 4: 液态极速充能 (Quantum Charge) */}
            <div className="bg-gradient-to-b from-white/[0.03] to-transparent rounded-[4rem] p-16 flex flex-col justify-between space-y-12 border border-white/5 overflow-hidden">
               <div className="space-y-4 text-center lg:text-left">
                  <h5 className="text-2xl font-black text-white">量子态电量反馈</h5>
                  <p className="text-xs text-gray-400 font-medium">模拟流体在容器内的动态惯性，提供更具生命力的充电进度展示</p>
               </div>
               <div className="flex flex-col items-center justify-center gap-8 lg:flex-row lg:gap-16">
                  <div className="relative w-32 h-52 bg-white/[0.02] rounded-[2.5rem] border border-white/10 overflow-hidden shadow-inner">
                     <div 
                      className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-green-500 to-green-300 transition-all duration-[3000ms] ease-out" 
                      style={{ height: isCharging ? '85%' : '20%' }}
                     >
                        <div className="absolute top-0 left-0 w-full h-8 bg-white/30 blur-xl animate-liquid-wave"></div>
                        <div className="absolute inset-0 bg-white/10 animate-pulse"></div>
                     </div>
                     <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-4xl font-black text-white drop-shadow-lg">{isCharging ? '85' : '20'}<span className="text-sm ml-1">%</span></span>
                        <Zap size={24} className="text-white animate-bounce mt-2" />
                     </div>
                  </div>
                  <div className="space-y-6 text-center lg:text-left">
                     <div className="inline-flex items-center gap-3 bg-green-500/10 px-4 py-2 rounded-xl border border-green-500/20">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
                        <span className="text-[10px] font-black text-green-500 uppercase tracking-widest">GaN Turbo Charging</span>
                     </div>
                     <p className="text-sm text-gray-500 max-w-[200px] leading-relaxed">
                        由于采用了新一代氮化镓技术，充电效率提升 <b>40%</b>，且发热降低 <b>15℃</b>。
                     </p>
                     <button 
                      onClick={() => setIsCharging(!isCharging)}
                      className="px-8 py-3 bg-white/5 rounded-xl text-[10px] font-bold text-white border border-white/10 hover:bg-white/10 transition-all"
                     >
                       切换充放电状态
                     </button>
                  </div>
               </div>
            </div>
          </div>
          
          <div className="p-24 text-center border-t border-white/5 bg-gradient-to-b from-transparent to-white/[0.02]">
             <Disc size={48} className="text-purple-brand/20 mx-auto mb-8 animate-spin-slow" />
             <p className="text-gray-600 font-medium italic max-w-xl mx-auto text-lg leading-relaxed">
               "好的动效不仅仅是视觉修饰，它是用户行为的反馈桥梁。我们通过微秒级的反馈延迟，让数字交互具备物理世界的真实触感。"
             </p>
          </div>
        </div>
      )}

      {/* 头部标题区 */}
      <div className="text-center max-w-3xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 bg-purple-brand/10 px-4 py-2 rounded-full">
           <Sparkles size={16} className="text-purple-brand" />
           <span className="text-xs font-bold text-purple-brand uppercase tracking-widest">Acoustic AI Intelligence</span>
        </div>
        <h3 className="text-4xl lg:text-7xl font-black tracking-tighter">Acoustic Connect<br /><span className="text-purple-brand">重塑声音的智慧</span></h3>
        <p className="text-gray-500 text-lg leading-relaxed">
          耳机不再仅仅是音频出口，而是您的随身翻译官与智能助理。通过深度集成大语言模型与边缘计算，我们实现了亚秒级的语音交互反馈。
        </p>
      </div>

      {/* 主交互演示区 */}
      <section className="bg-zinc-950 rounded-[4rem] p-8 lg:p-20 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-purple-brand/5 blur-[150px] pointer-events-none"></div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
           {/* 左侧控制面板 */}
           <div className="lg:col-span-5 space-y-10 relative z-10">
              <div className="space-y-4">
                 <h4 className="text-3xl font-bold text-white">智慧内核 <br /><span className="text-purple-brand">多维应用场景</span></h4>
                 <p className="text-gray-400 text-sm">点击下方模块切换 App 实时演示效果，感受设计的温度与智能的深度。</p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                 {[
                   { id: 'audio', label: '声学实验室', icon: <Volume2 size={20} />, desc: '专业级 EQ 调节与降噪控制' },
                   { id: 'translate', label: '实时同声传译', icon: <Languages size={20} />, desc: '国际会议与演讲的最佳伙伴' },
                   { id: 'face2face', label: '面对面翻译', desc: '双向视窗，消除跨国沟通阻碍', icon: <User2 size={20} /> },
                   { id: 'ai_qa', label: 'AI 灵感问答', desc: '基于 LLM 的耳机百科与环境分析', icon: <Bot size={20} /> },
                 ].map((tab) => (
                   <button 
                    key={tab.id}
                    onClick={() => { setActiveTab(tab.id as any); setIsListening(false); }}
                    className={`flex items-start gap-5 p-6 rounded-3xl border transition-all text-left group ${activeTab === tab.id ? 'bg-white border-white shadow-2xl' : 'bg-white/5 border-white/5 hover:bg-white/10'}`}
                   >
                      <div className={`p-3 rounded-2xl transition-colors ${activeTab === tab.id ? 'bg-purple-brand text-white shadow-lg shadow-purple-brand/30' : 'bg-white/5 text-gray-500 group-hover:text-white'}`}>
                        {tab.icon}
                      </div>
                      <div>
                         <h5 className={`font-bold transition-colors ${activeTab === tab.id ? 'text-black' : 'text-white'}`}>{tab.label}</h5>
                         <p className={`text-xs mt-1 transition-colors ${activeTab === tab.id ? 'text-gray-500' : 'text-gray-500'}`}>{tab.desc}</p>
                      </div>
                   </button>
                 ))}
              </div>
           </div>

           {/* 右侧手机模拟器 */}
           <div className="lg:col-span-7 flex justify-center">
              <div className="w-[320px] h-[660px] bg-zinc-900 rounded-[3.5rem] p-4 shadow-2xl border-8 border-zinc-800 relative group">
                 <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden flex flex-col text-black shadow-inner">
                    
                    {/* 状态栏 */}
                    <div className="px-8 pt-8 pb-4 flex justify-between items-center border-b border-gray-100">
                       <span className="text-[10px] font-black uppercase text-gray-400">GT-Pro Connect</span>
                       <div className="flex gap-2 items-center">
                          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                          <span className="text-[9px] font-bold text-gray-500">已连接</span>
                       </div>
                    </div>

                    {/* App 动态内容 */}
                    <div className="flex-1 overflow-y-auto no-scrollbar relative flex flex-col" ref={scrollRef}>
                       
                       {/* 01. 基础声学模式 */}
                       {activeTab === 'audio' && (
                         <div className="p-6 space-y-8 animate-in fade-in duration-500">
                            <div className="space-y-4">
                               <div className="flex justify-between items-end">
                                  <h6 className="text-sm font-black">ANC 降噪强度</h6>
                                  <span className="text-2xl font-black text-purple-brand">{ancLevel}%</span>
                               </div>
                               <input type="range" value={ancLevel} onChange={(e) => setAncLevel(Number(e.target.value))} className="w-full h-1.5 bg-gray-100 rounded-full appearance-none cursor-pointer accent-purple-brand" />
                            </div>
                            <div className="space-y-4">
                               <h6 className="text-sm font-black">专业调音预设</h6>
                               <div className="grid grid-cols-2 gap-3">
                                  {['平衡', '低音增强', '清澈人声', '现场感'].map(m => (
                                    <div key={m} className={`p-4 rounded-2xl text-[10px] font-bold text-center border transition-all cursor-pointer ${m === '平衡' ? 'bg-black text-white border-black' : 'bg-gray-50 border-gray-100 text-gray-400 hover:border-purple-brand/20'}`}>
                                      {m}
                                    </div>
                                  ))}
                               </div>
                            </div>
                            <div className="bg-purple-brand/5 p-6 rounded-3xl border border-purple-brand/10 space-y-3">
                               <div className="flex items-center gap-3">
                                  <Waves className="text-purple-brand" size={20} />
                                  <span className="text-xs font-black">空间音频 360°</span>
                               </div>
                               <p className="text-[10px] text-gray-400">头部追踪已根据重力感应自动校准。</p>
                            </div>
                         </div>
                       )}

                       {/* 02. 同声传译模式 (Refined UI) */}
                       {activeTab === 'translate' && (
                         <div className="flex-1 flex flex-col p-4 animate-in slide-in-from-right-4 duration-500">
                            <div className="flex-1 space-y-6 overflow-y-auto no-scrollbar mb-6 pb-4">
                               {Array.from({ length: Math.ceil(transcript.length / 2) }).map((_, idx) => {
                                 const original = transcript[idx * 2];
                                 const translated = transcript[idx * 2 + 1];
                                 return (
                                   <div key={idx} className="space-y-2 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                      {original && (
                                        <div className="flex flex-col items-start space-y-1">
                                           <div className="flex items-center gap-2 px-2">
                                              <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest">EN SOURCE</span>
                                           </div>
                                           <div className="bg-gray-100 text-gray-600 text-[11px] p-3 rounded-2xl rounded-bl-none shadow-sm w-fit max-w-[90%]">
                                              {original.text}
                                           </div>
                                        </div>
                                      )}
                                      
                                      {translated && (
                                        <div className="px-6 py-1 opacity-20">
                                           <ArrowDown size={12} className="text-purple-brand" />
                                        </div>
                                      )}

                                      {translated && (
                                        <div className="flex flex-col items-end space-y-1">
                                           <div className="flex items-center gap-2 px-2">
                                              <span className="text-[8px] font-black text-purple-brand uppercase tracking-widest">CN TARGET</span>
                                           </div>
                                           <div className="bg-purple-brand text-white text-[12px] font-bold p-4 rounded-2xl rounded-br-none shadow-lg shadow-purple-brand/20 w-fit max-w-[90%] border border-white/10">
                                              {translated.text}
                                           </div>
                                        </div>
                                      )}
                                   </div>
                                 );
                               })}
                               
                               {transcript.length % 2 !== 0 && (
                                 <div className="flex justify-end p-4">
                                    <div className="flex gap-1">
                                       <div className="w-1.5 h-1.5 bg-purple-brand/40 rounded-full animate-bounce"></div>
                                       <div className="w-1.5 h-1.5 bg-purple-brand/40 rounded-full animate-bounce delay-100"></div>
                                       <div className="w-1.5 h-1.5 bg-purple-brand/40 rounded-full animate-bounce delay-200"></div>
                                    </div>
                                 </div>
                               )}

                               {transcript.length === 0 && (
                                 <div className="h-full flex flex-col items-center justify-center opacity-20 space-y-6 py-20">
                                    <div className="relative">
                                       <div className="absolute inset-0 bg-purple-brand/20 blur-2xl rounded-full"></div>
                                       <AudioLines size={64} className="text-purple-brand relative z-10" />
                                    </div>
                                    <p className="text-[11px] font-black uppercase tracking-[0.2em] text-center leading-relaxed">
                                       等待语音输入<br/>
                                       <span className="text-gray-400">正在监听外部环境...</span>
                                    </p>
                                 </div>
                               )}
                            </div>
                            
                            <div className="space-y-4">
                               <div className="flex justify-center gap-6">
                                  <div className="flex flex-col items-center gap-1">
                                     <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center border border-gray-100">
                                        <span className="text-[10px] font-black">EN</span>
                                     </div>
                                     <span className="text-[8px] text-gray-400 font-bold uppercase">Source</span>
                                  </div>
                                  <ChevronRight size={14} className="mt-3 text-gray-200" />
                                  <div className="flex flex-col items-center gap-1">
                                     <div className="w-10 h-10 rounded-full bg-purple-brand/10 flex items-center justify-center border border-purple-brand/20">
                                        <span className="text-[10px] font-black text-purple-brand">CN</span>
                                     </div>
                                     <span className="text-[8px] text-gray-400 font-bold uppercase">Target</span>
                                  </div>
                               </div>
                               <button 
                                 onClick={() => { setIsListening(!isListening); if(!isListening) setTranscript([]); }}
                                 className={`w-full py-5 rounded-[2rem] font-black text-sm flex items-center justify-center gap-3 transition-all ${isListening ? 'bg-red-500 text-white shadow-xl scale-95 shadow-red-500/20' : 'bg-black text-white hover:shadow-lg'}`}
                               >
                                  {isListening ? <><RotateCcw size={18} className="animate-spin" /> 正在监听同传</> : <><Mic size={18} /> 开启语音同传</> }
                               </button>
                            </div>
                         </div>
                       )}

                       {/* 03. 面对面翻译 */}
                       {activeTab === 'face2face' && (
                         <div className="flex-1 flex flex-col animate-in zoom-in-95 duration-500">
                            <div className="flex-1 bg-gray-900 text-white p-8 rotate-180 flex flex-col justify-end gap-2">
                               <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">对方视角 (ENG)</div>
                               <p className="text-2xl font-black">"How's the weather today?"</p>
                            </div>
                            <div className="flex-1 bg-white p-8 flex flex-col justify-start gap-2 border-t border-gray-100">
                               <div className="text-[10px] font-bold text-purple-brand uppercase tracking-widest">我的视角 (CN)</div>
                               <p className="text-2xl font-black text-gray-900">"今天天气怎么样？"</p>
                               <div className="mt-4 flex gap-2">
                                  <div className="w-1.5 h-1.5 bg-purple-brand rounded-full animate-bounce"></div>
                                  <div className="w-1.5 h-1.5 bg-purple-brand rounded-full animate-bounce delay-100"></div>
                                  <div className="w-1.5 h-1.5 bg-purple-brand rounded-full animate-bounce delay-200"></div>
                               </div>
                            </div>
                         </div>
                       )}

                       {/* 04. AI 问答模式 */}
                       {activeTab === 'ai_qa' && (
                         <div className="flex-1 flex flex-col p-6 animate-in slide-in-from-bottom-4 duration-500">
                            <div className="flex-1 space-y-4 overflow-y-auto no-scrollbar mb-4">
                               <div className="bg-gray-50 p-4 rounded-3xl border border-gray-100">
                                  <div className="flex items-center gap-2 mb-2">
                                     <Bot size={14} className="text-purple-brand" />
                                     <span className="text-[10px] font-black uppercase text-gray-400">Acoustic AI</span>
                                  </div>
                                  <p className="text-xs text-gray-600 leading-relaxed">你好！我是您的声学助理。您可以询问我关于降噪调节、音频曲线分析或耳机使用的小技巧。</p>
                               </div>
                               {aiMessages.map((m, i) => (
                                 <div key={i} className={`p-4 rounded-2xl text-xs font-bold animate-in fade-in duration-300 ${m.role === 'user' ? 'bg-black text-white self-end' : 'bg-purple-brand/5 text-purple-brand border border-purple-brand/10'}`}>
                                    {m.text}
                                 </div>
                               ))}
                            </div>
                            <div className="flex gap-2">
                               <input 
                                 placeholder="询问 AI..." 
                                 className="flex-1 px-5 py-4 bg-gray-50 rounded-2xl text-xs border-none outline-none focus:ring-2 focus:ring-purple-brand/20"
                                 onKeyPress={(e) => e.key === 'Enter' && handleAiAsk()}
                               />
                               <button onClick={handleAiAsk} className="w-12 h-12 bg-black text-white rounded-2xl flex items-center justify-center hover:bg-purple-brand transition-colors">
                                  <Send size={18} />
                               </button>
                            </div>
                         </div>
                       )}

                    </div>

                    {/* 模拟器底部导航条 */}
                    <div className="px-8 py-6 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
                       <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-black rounded-xl flex items-center justify-center text-white">
                             <Bluetooth size={16} />
                          </div>
                          <div>
                             <div className="text-[10px] font-black">L 82% · R 85%</div>
                             <div className="text-[8px] text-gray-400 font-bold">GT-PRO-EAR-01</div>
                          </div>
                       </div>
                       <VolumeX size={16} className="text-gray-300" />
                    </div>
                    
                    {/* iPhone 指示条 */}
                    <div className="h-1.5 w-24 bg-gray-200 rounded-full mx-auto mb-2"></div>
                 </div>
              </div>

              {/* 装饰性漂浮卡片 */}
              <div className="absolute -top-10 -right-20 bg-white/90 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white shadow-2xl z-30 hidden lg:block animate-bounce-slow max-w-[220px]">
                 <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-purple-brand rounded-2xl flex items-center justify-center text-white shadow-lg">
                       <Zap size={24} />
                    </div>
                    <div className="text-left">
                       <div className="text-[10px] font-bold text-gray-400 uppercase">Live Insight</div>
                       <div className="text-lg font-black">即时分析</div>
                    </div>
                 </div>
                 <p className="text-[10px] text-gray-500 leading-relaxed">
                    AI 正在通过 3 个外置麦克风实时采样环境噪音，并动态调整降噪曲线。
                 </p>
              </div>
           </div>
        </div>
      </section>

      {/* 技术指标展示 */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { title: '极低延迟', value: '28ms', desc: '基于 LE Audio 技术的超低延迟传输', color: 'bg-blue-50' },
          { title: '宽频消噪', value: '48dB', desc: '深度过滤中高频噪音，人声更清澈', color: 'bg-purple-50' },
          { title: '翻译语种', value: '40+', desc: '支持全球主流语种实时语音转写', color: 'bg-orange-50' },
          { title: '云端同步', value: 'Instant', desc: '历史翻译记录多端自动同步归档', color: 'bg-green-50' }
        ].map((item, i) => (
          <div key={i} className={`${item.color} p-10 rounded-[2.5rem] border border-transparent hover:border-gray-200 hover:shadow-xl transition-all group`}>
             <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">{item.title}</h4>
             <div className="text-4xl font-black mb-4 group-hover:text-purple-brand transition-colors">{item.value}</div>
             <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </section>

      {/* 底部生态展示 */}
      <div className="bg-cream rounded-[4rem] p-12 lg:p-24 flex flex-col lg:flex-row items-center gap-20">
         <div className="lg:w-1/2 space-y-8">
            <h4 className="text-4xl lg:text-5xl font-black leading-tight italic">每一声呼吸 <br /> 都有 AI 在聆听</h4>
            <p className="text-gray-600 text-lg leading-relaxed">
               通过高度可视化的交互界面，我们将复杂的声学参数转化为直观的视觉反馈。支持“查找耳机”高分贝预警、多点连接快速切换、以及固件静默升级。
            </p>
            <div className="flex flex-wrap gap-4">
               <button className="bg-black text-white px-10 py-5 rounded-2xl font-bold text-lg hover:shadow-2xl transition-all flex items-center gap-3">
                  <Smartphone size={20} />
                  下载配套 App
               </button>
               <button 
                onClick={() => setShowAnimationGallery(true)}
                className="bg-white text-black border border-gray-200 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-gray-50 transition-all flex items-center gap-2"
               >
                  <Eye size={20} />
                  查看动效展示
               </button>
            </div>
         </div>
         <div className="lg:w-1/2 relative">
            <div className="aspect-video bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-gray-100 flex items-center justify-center p-12">
               <div className="w-full h-full border-4 border-dashed border-gray-100 rounded-[2rem] flex items-center justify-center relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-48 h-48 bg-purple-brand/5 rounded-full animate-ping"></div>
                  </div>
                  <Music className="text-purple-brand/20 w-32 h-32" />
                  <div className="absolute top-4 right-4 bg-white px-4 py-2 rounded-xl shadow-lg border border-gray-100 text-[10px] font-black animate-bounce">
                     FIND MY BUDS
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

// 注入额外样式
const style = document.createElement('style');
style.textContent = `
  @keyframes spin-slow {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  @keyframes bounce-slow {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-20px); }
  }
  @keyframes voice-fluid {
    0%, 100% { transform: scaleY(1); }
    50% { transform: scaleY(2.2); }
  }
  @keyframes ping-slow {
    0% { transform: scale(1); opacity: 0.4; }
    100% { transform: scale(1.8); opacity: 0; }
  }
  @keyframes float-slow {
    0%, 100% { transform: translate(-50%, -16px); }
    50% { transform: translate(-50%, -32px); }
  }
  @keyframes liquid-wave {
    0% { transform: translateX(-100%) skewX(-20deg); }
    100% { transform: translateX(200%) skewX(-20deg); }
  }
  .animate-spin-slow { animation: spin-slow 12s linear infinite; }
  .animate-bounce-slow { animation: bounce-slow 4s ease-in-out infinite; }
  .animate-voice-fluid { animation: voice-fluid 0.8s ease-in-out infinite; }
  .animate-ping-slow { animation: ping-slow 3s ease-out infinite; }
  .animate-float-slow { animation: float-slow 4s ease-in-out infinite; }
  .animate-liquid-wave { animation: liquid-wave 2.5s ease-in-out infinite; }
  .no-scrollbar::-webkit-scrollbar { display: none; }
  .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
  .delay-100 { animation-delay: 100ms; }
  .delay-300 { animation-delay: 300ms; }
  .delay-700 { animation-delay: 700ms; }
`;
document.head.appendChild(style);
