
import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, Image as ImageIcon, Video, Mic, 
  Search, MapPin, Send, Trash2, 
  Sparkles, Zap, Brain, Upload, 
  Download, Play, Languages, RotateCcw, 
  X, Camera, Smartphone, Layers,
  ExternalLink, Globe, Key, Settings,
  Volume2, VolumeX, Ghost, StopCircle,
  Monitor, Maximize2, Ratio
} from 'lucide-react';
import { GoogleGenAI, Modality, Type, LiveServerMessage } from '@google/genai';

// Declare process for TS compatibility
declare const process: any;

// --- Helper Functions ---
function encode(bytes: Uint8Array) {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

function createBlob(data: Float32Array): { data: string, mimeType: string } {
  const l = data.length;
  const int16 = new Int16Array(l);
  for (let i = 0; i < l; i++) {
    int16[i] = data[i] * 32768;
  }
  return {
    data: encode(new Uint8Array(int16.buffer)),
    mimeType: 'audio/pcm;rate=16000',
  };
}

// --- Component ---
export const AiLabDetail: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState<'chat' | 'visual' | 'live' | 'video'>('chat');
  const [isLoading, setIsLoading] = useState(false);
  
  // Chat States
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'ai' | 'thinking', text: string, sources?: any[] }[]>([]);
  const [useSearch, setUseSearch] = useState(false);
  const [useMaps, setUseMaps] = useState(false);
  const [useThinking, setUseThinking] = useState(true);

  // Visual States
  const [visualPrompt, setVisualPrompt] = useState('');
  const [imageSize, setImageSize] = useState<'1K' | '2K' | '4K'>('1K');
  const [aspectRatio, setAspectRatio] = useState<'1:1' | '3:4' | '4:3' | '9:16' | '16:9'>('1:1');
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  
  // Video States
  const [videoPrompt, setVideoPrompt] = useState('');
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [videoLoadingStep, setVideoLoadingStep] = useState<string>('');

  // Live Session
  const [isLiveActive, setIsLiveActive] = useState(false);
  const liveAudioContextRef = useRef<AudioContext | null>(null);
  const liveNextStartTimeRef = useRef<number>(0);
  const liveSourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  // --- API Handlers ---

  const handleChat = async () => {
    if (!chatInput.trim() || isLoading) return;
    
    const prompt = chatInput;
    setChatInput('');
    setMessages(prev => [...prev, { role: 'user', text: prompt }]);
    setIsLoading(true);

    try {
      // Re-init client to ensure latest key usage
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const tools: any[] = [];
      if (useSearch) tools.push({ googleSearch: {} });
      if (useMaps) tools.push({ googleMaps: {} });

      const model = useThinking ? 'gemini-3-pro-preview' : (useMaps ? 'gemini-2.5-flash' : 'gemini-3-flash-preview');
      
      const config: any = {
        tools: tools.length > 0 ? tools : undefined,
      };

      if (useThinking) {
        config.thinkingConfig = { thinkingBudget: 1024 }; // Explicit thinking budget
      }

      if (useMaps && navigator.geolocation) {
        try {
          const pos = await new Promise<GeolocationPosition>((res, rej) => navigator.geolocation.getCurrentPosition(res, rej, {timeout: 5000}));
          config.toolConfig = {
            retrievalConfig: {
              latLng: {
                latitude: pos.coords.latitude,
                longitude: pos.coords.longitude
              }
            }
          };
        } catch (e) {
          console.warn("Geolocation failed", e);
        }
      }

      const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config
      });

      const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
      
      setMessages(prev => [...prev, { role: 'ai', text: response.text || '无法生成回复', sources }]);
    } catch (error: any) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'ai', text: `错误: ${error.message}` }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateImage = async () => {
    if (!visualPrompt.trim() || isLoading) return;
    setIsLoading(true);

    try {
      // 1. Check API Key for Gemini 3 Pro Image (Paid feature)
      if ((window as any).aistudio && !await (window as any).aistudio.hasSelectedApiKey()) {
          await (window as any).aistudio.openSelectKey();
      }

      // 2. Re-init client
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      // 3. Use Gemini 3 Pro Image for High Quality
      const model = 'gemini-3-pro-image-preview';

      const response = await ai.models.generateContent({
        model,
        contents: { parts: [{ text: visualPrompt }] },
        config: {
          imageConfig: {
            aspectRatio: aspectRatio,
            imageSize: imageSize
          }
        }
      });

      const newImages: string[] = [];
      if (response.candidates?.[0]?.content?.parts) {
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
            newImages.push(`data:image/png;base64,${part.inlineData.data}`);
          }
        }
      }
      setGeneratedImages(prev => [...newImages, ...prev]);
    } catch (error: any) {
      console.error(error);
      alert(`生成失败: ${error.message}. 请确保选择了有效的 API Key。`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateVideo = async () => {
    if (!videoPrompt.trim() || isLoading) return;
    setIsLoading(true);
    setVideoLoadingStep('正在连接 Veo 模型...');

    try {
      // 1. Check API Key for Veo (Paid feature)
      if ((window as any).aistudio && !await (window as any).aistudio.hasSelectedApiKey()) {
          await (window as any).aistudio.openSelectKey();
      }

      // 2. Re-init client
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      let operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: videoPrompt,
        config: {
            numberOfVideos: 1,
            resolution: '1080p',
            aspectRatio: '16:9'
        }
      });

      setVideoLoadingStep('AI 正在渲染视频 (可能需要几分钟)...');
      
      while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 5000));
        operation = await ai.operations.getVideosOperation({operation: operation});
      }

      if (operation.response?.generatedVideos?.[0]?.video?.uri) {
        const downloadLink = operation.response.generatedVideos[0].video.uri;
        // Append API key to fetch securely
        const videoRes = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
        const videoBlob = await videoRes.blob();
        setVideoUrl(URL.createObjectURL(videoBlob));
      }

    } catch (error: any) {
       console.error(error);
       alert(`视频生成失败: ${error.message}`);
    } finally {
       setIsLoading(false);
       setVideoLoadingStep('');
    }
  };

  const handleLiveStart = async () => {
    if (isLiveActive) return;
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const inputAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)({sampleRate: 16000});
      const outputAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)({sampleRate: 24000});
      
      liveAudioContextRef.current = outputAudioContext;
      liveNextStartTimeRef.current = outputAudioContext.currentTime;

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        config: {
            responseModalities: [Modality.AUDIO],
            speechConfig: {
              voiceConfig: {prebuiltVoiceConfig: {voiceName: 'Zephyr'}},
            },
            inputAudioTranscription: {},
        },
        callbacks: {
            onopen: () => {
                console.log("Live session connected");
                setIsLiveActive(true);

                const source = inputAudioContext.createMediaStreamSource(stream);
                const scriptProcessor = inputAudioContext.createScriptProcessor(4096, 1, 1);
                scriptProcessor.onaudioprocess = (e) => {
                    const inputData = e.inputBuffer.getChannelData(0);
                    const pcmBlob = createBlob(inputData);
                    sessionPromise.then(session => session.sendRealtimeInput({ media: pcmBlob }));
                };
                source.connect(scriptProcessor);
                scriptProcessor.connect(inputAudioContext.destination);
            },
            onmessage: async (msg: LiveServerMessage) => {
                // Handle Audio
                const base64Audio = msg.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
                if (base64Audio && liveAudioContextRef.current) {
                    const ctx = liveAudioContextRef.current;
                    const audioBuffer = await decodeAudioData(decode(base64Audio), ctx, 24000, 1);
                    
                    const source = ctx.createBufferSource();
                    source.buffer = audioBuffer;
                    source.connect(ctx.destination);
                    
                    const startTime = Math.max(liveNextStartTimeRef.current, ctx.currentTime);
                    source.start(startTime);
                    liveNextStartTimeRef.current = startTime + audioBuffer.duration;
                    
                    liveSourcesRef.current.add(source);
                    source.onended = () => liveSourcesRef.current.delete(source);
                }
            },
            onclose: () => {
                setIsLiveActive(false);
            },
            onerror: (err) => {
                console.error(err);
                setIsLiveActive(false);
            }
        }
      });

    } catch (e) {
        console.error(e);
        alert("无法启动实时语音会话");
    }
  };

  const handleLiveStop = () => {
      window.location.reload(); // Simple cleanup mechanism
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-purple-brand/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            
            {/* Header */}
            <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 bg-gradient-to-tr from-purple-brand to-blue-600 rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(138,132,255,0.3)]">
                      <Brain className="text-white" size={24} />
                   </div>
                   <div>
                      <h1 className="text-2xl font-black tracking-tight">AI 创意实验室 <span className="text-purple-brand text-sm font-mono bg-purple-brand/10 px-2 py-0.5 rounded ml-2">Pro</span></h1>
                      <p className="text-gray-400 text-xs font-medium uppercase tracking-widest mt-1">Gemini 3.0 / Veo / Live API</p>
                   </div>
                </div>
                <div className="flex bg-white/5 p-1 rounded-xl border border-white/10 overflow-x-auto max-w-full">
                    {[
                        {id: 'chat', icon: <Bot size={16} />, label: 'Deep Chat'},
                        {id: 'visual', icon: <ImageIcon size={16} />, label: 'Pro Vision'},
                        {id: 'live', icon: <Mic size={16} />, label: 'Live Audio'},
                        {id: 'video', icon: <Video size={16} />, label: 'Veo Video'}
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveFeature(tab.id as any)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${activeFeature === tab.id ? 'bg-purple-brand text-white shadow-lg' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                        >
                            {tab.icon}
                            <span className="hidden sm:inline">{tab.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Main Content Area */}
            <div className="bg-zinc-900/50 border border-white/10 rounded-[2.5rem] min-h-[600px] flex overflow-hidden relative backdrop-blur-sm shadow-2xl">
                
                {/* 1. Chat Interface */}
                {activeFeature === 'chat' && (
                    <div className="w-full flex flex-col h-[700px]">
                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-8 space-y-6" ref={scrollRef}>
                            {messages.length === 0 && (
                                <div className="h-full flex flex-col items-center justify-center text-gray-500 opacity-50 space-y-4">
                                    <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center animate-pulse">
                                        <Bot size={40} />
                                    </div>
                                    <p className="text-sm font-bold uppercase tracking-widest">Gemini 3 Pro + Thinking</p>
                                </div>
                            )}
                            {messages.map((msg, i) => (
                                <div key={i} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'ai' ? 'bg-gradient-to-br from-purple-brand to-indigo-500' : 'bg-white/10'}`}>
                                        {msg.role === 'ai' ? <Sparkles size={14} /> : <Smartphone size={14} />}
                                    </div>
                                    <div className={`max-w-[80%] space-y-2`}>
                                        <div className={`p-4 rounded-2xl text-sm leading-relaxed ${msg.role === 'user' ? 'bg-white text-black font-medium' : 'bg-white/5 text-gray-200 border border-white/10'}`}>
                                            {msg.text}
                                        </div>
                                        {msg.sources && msg.sources.length > 0 && (
                                            <div className="flex flex-wrap gap-2 mt-2">
                                                {msg.sources.map((src, idx) => {
                                                    const title = src.web?.title || src.web?.uri || 'Source';
                                                    const uri = src.web?.uri;
                                                    return uri ? (
                                                        <a key={idx} href={uri} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-[10px] bg-white/5 px-2 py-1 rounded hover:bg-white/10 transition-colors text-purple-brand border border-purple-brand/20">
                                                            <ExternalLink size={10} />
                                                            {title.substring(0, 20)}...
                                                        </a>
                                                    ) : null;
                                                })}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex gap-4">
                                     <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-brand to-indigo-500 flex items-center justify-center shadow-[0_0_15px_rgba(138,132,255,0.4)]">
                                        <Sparkles size={14} className="animate-spin" />
                                    </div>
                                    <div className="bg-white/5 p-4 rounded-2xl border border-white/10 flex flex-col justify-center gap-2">
                                        <span className="text-[10px] text-purple-brand font-bold uppercase tracking-wider animate-pulse">
                                            {useThinking ? 'Gemini is Thinking...' : 'Generating Response...'}
                                        </span>
                                        <div className="flex gap-1">
                                            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                                            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                                            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        
                        {/* Input Area */}
                        <div className="p-6 border-t border-white/10 bg-zinc-900/80 backdrop-blur-md">
                            <div className="flex flex-wrap gap-3 mb-3">
                                <button 
                                    onClick={() => setUseThinking(!useThinking)}
                                    className={`text-[10px] font-bold px-3 py-1.5 rounded-full border transition-all flex items-center gap-1.5 ${useThinking ? 'bg-purple-brand/20 border-purple-brand text-purple-brand shadow-[0_0_10px_rgba(138,132,255,0.3)]' : 'bg-white/5 border-white/10 text-gray-400'}`}
                                >
                                    <Brain size={12} /> 深度思考 (Thinking Budget)
                                </button>
                                <button 
                                    onClick={() => setUseSearch(!useSearch)}
                                    className={`text-[10px] font-bold px-3 py-1.5 rounded-full border transition-all flex items-center gap-1.5 ${useSearch ? 'bg-blue-500/20 border-blue-500 text-blue-400' : 'bg-white/5 border-white/10 text-gray-400'}`}
                                >
                                    <Globe size={12} /> Google Search
                                </button>
                                <button 
                                    onClick={() => setUseMaps(!useMaps)}
                                    className={`text-[10px] font-bold px-3 py-1.5 rounded-full border transition-all flex items-center gap-1.5 ${useMaps ? 'bg-green-500/20 border-green-500 text-green-400' : 'bg-white/5 border-white/10 text-gray-400'}`}
                                >
                                    <MapPin size={12} /> Maps Grounding
                                </button>
                            </div>
                            <div className="flex gap-4">
                                <input 
                                    value={chatInput}
                                    onChange={(e) => setChatInput(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleChat()}
                                    placeholder="输入您的问题..."
                                    className="flex-1 bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-purple-brand outline-none transition-all placeholder:text-gray-600"
                                />
                                <button 
                                    onClick={handleChat}
                                    disabled={isLoading || !chatInput.trim()}
                                    className="bg-purple-brand text-white w-12 h-12 rounded-xl flex items-center justify-center hover:bg-purple-600 transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                                >
                                    <Send size={20} />
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* 2. Visual Creator (Optimized 1K/2K/4K) */}
                {activeFeature === 'visual' && (
                    <div className="w-full p-8 flex flex-col lg:flex-row gap-8 h-[700px]">
                        <div className="w-full lg:w-1/3 flex flex-col gap-8 overflow-y-auto custom-scrollbar pr-2">
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-xl font-bold flex items-center gap-2">
                                        <ImageIcon size={20} className="text-purple-brand" />
                                        Pro Vision Control
                                    </h3>
                                    <div className="text-[10px] font-bold bg-yellow-500/20 text-yellow-500 px-2 py-1 rounded border border-yellow-500/30">PAID KEY REQUIRED</div>
                                </div>
                                
                                <div className="space-y-3">
                                    <label className="text-xs font-bold text-gray-400 uppercase flex items-center gap-2">
                                        <Ratio size={12} /> 画面比例 (Aspect Ratio)
                                    </label>
                                    <div className="grid grid-cols-3 gap-2">
                                        {['1:1', '3:4', '4:3', '9:16', '16:9'].map(r => (
                                            <button 
                                                key={r}
                                                onClick={() => setAspectRatio(r as any)}
                                                className={`px-3 py-2.5 rounded-lg text-xs font-bold border transition-all ${aspectRatio === r ? 'bg-purple-brand border-purple-brand text-white shadow-md' : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'}`}
                                            >
                                                {r}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <label className="text-xs font-bold text-gray-400 uppercase flex items-center gap-2">
                                        <Maximize2 size={12} /> 分辨率 (Resolution)
                                    </label>
                                    <div className="grid grid-cols-3 gap-2">
                                        {[
                                            { val: '1K', desc: 'Standard' }, 
                                            { val: '2K', desc: 'High' }, 
                                            { val: '4K', desc: 'Ultra' }
                                        ].map(s => (
                                            <button 
                                                key={s.val}
                                                onClick={() => setImageSize(s.val as any)}
                                                className={`px-3 py-3 rounded-lg border transition-all flex flex-col items-center justify-center gap-1 ${imageSize === s.val ? 'bg-purple-brand border-purple-brand text-white shadow-md' : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'}`}
                                            >
                                                <span className="text-sm font-black">{s.val}</span>
                                                <span className="text-[8px] opacity-60 uppercase">{s.desc}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="flex-1"></div>

                            <div className="space-y-4 pt-4 border-t border-white/10">
                                <textarea 
                                    value={visualPrompt}
                                    onChange={(e) => setVisualPrompt(e.target.value)}
                                    placeholder="描述您想生成的图像细节，例如：赛博朋克风格的智能手表界面..."
                                    rows={4}
                                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-purple-brand outline-none resize-none transition-all placeholder:text-gray-600"
                                />
                                <button 
                                    onClick={handleGenerateImage}
                                    disabled={isLoading || !visualPrompt.trim()}
                                    className="w-full bg-gradient-to-r from-purple-brand to-pink-600 text-white py-4 rounded-xl font-bold hover:shadow-[0_0_20px_rgba(138,132,255,0.4)] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5"
                                >
                                    {isLoading ? <Sparkles className="animate-spin" /> : <Zap fill="currentColor" />}
                                    {isLoading ? '正在渲染 4K 图像...' : '使用 Gemini 3 Pro 生成'}
                                </button>
                                <p className="text-[10px] text-gray-500 text-center">
                                    注意：使用 Gemini 3 Pro Image 模型需要连接您的个人 API Key。
                                </p>
                            </div>
                        </div>

                        <div className="flex-1 bg-black/40 rounded-2xl border border-white/5 overflow-y-auto p-6 custom-scrollbar">
                             {generatedImages.length === 0 ? (
                                 <div className="h-full flex flex-col items-center justify-center text-gray-600 space-y-4">
                                     <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center border border-white/5">
                                        <ImageIcon size={48} className="opacity-40" />
                                     </div>
                                     <div className="text-center">
                                         <p className="text-sm font-bold">暂无生成图像</p>
                                         <p className="text-xs text-gray-600 mt-1">在左侧配置参数并开始创作</p>
                                     </div>
                                 </div>
                             ) : (
                                 <div className="grid grid-cols-1 gap-8">
                                     {generatedImages.map((img, i) => (
                                         <div key={i} className="group relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-black">
                                             <img src={img} alt={`Generated ${i}`} className="w-full h-auto object-cover" />
                                             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                                                 <div className="flex justify-between items-end">
                                                    <span className="text-xs font-bold text-white/60">Generated via Gemini 3 Pro</span>
                                                    <a href={img} download={`generated-${i}.png`} className="p-3 bg-white/10 backdrop-blur-md rounded-full hover:bg-white text-white hover:text-black transition-all">
                                                        <Download size={20} />
                                                    </a>
                                                 </div>
                                             </div>
                                         </div>
                                     ))}
                                 </div>
                             )}
                        </div>
                    </div>
                )}

                {/* 3. Live Session */}
                {activeFeature === 'live' && (
                    <div className="w-full h-[700px] flex flex-col items-center justify-center p-8 relative overflow-hidden">
                        {/* Background Effect */}
                        <div className={`absolute inset-0 transition-opacity duration-1000 ${isLiveActive ? 'opacity-100' : 'opacity-0'}`}>
                             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-brand/20 rounded-full blur-[100px] animate-pulse"></div>
                             <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
                        </div>

                        <div className="relative z-10 text-center space-y-8">
                            <div className="relative group cursor-pointer" onClick={isLiveActive ? handleLiveStop : handleLiveStart}>
                                <div className={`w-48 h-48 rounded-full border-4 flex items-center justify-center transition-all duration-500 ${isLiveActive ? 'border-purple-brand bg-purple-brand/10 shadow-[0_0_80px_rgba(138,132,255,0.5)] scale-110' : 'border-white/10 bg-white/5 hover:border-purple-brand/50'}`}>
                                    <Mic size={56} className={isLiveActive ? 'text-purple-brand animate-bounce' : 'text-gray-500 group-hover:text-purple-brand transition-colors'} />
                                </div>
                                {isLiveActive && (
                                    <>
                                        <div className="absolute inset-0 rounded-full border border-purple-brand/30 animate-ping-slow"></div>
                                        <div className="absolute inset-4 rounded-full border border-purple-brand/50 animate-ping-slow delay-300"></div>
                                        <div className="absolute inset-8 rounded-full border border-purple-brand/60 animate-ping-slow delay-700"></div>
                                    </>
                                )}
                            </div>
                            
                            <div className="space-y-3">
                                <h3 className="text-4xl font-black tracking-tight">{isLiveActive ? '正在聆听...' : 'Gemini Live'}</h3>
                                <p className="text-gray-400 text-sm font-medium tracking-wide">
                                    Native Audio Streaming · Low Latency · Real-time
                                </p>
                            </div>

                            <button 
                                onClick={isLiveActive ? handleLiveStop : handleLiveStart}
                                className={`px-10 py-4 rounded-full font-bold text-sm flex items-center gap-3 transition-all hover:scale-105 border ${isLiveActive ? 'bg-red-500/10 border-red-500 text-red-500 hover:bg-red-500 hover:text-white' : 'bg-white text-black border-transparent hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]'}`}
                            >
                                {isLiveActive ? <StopCircle size={18} /> : <Mic size={18} />}
                                {isLiveActive ? '结束会话 (End Session)' : '启动实时对话 (Start Live)'}
                            </button>
                        </div>
                    </div>
                )}

                {/* 4. Video Generator */}
                {activeFeature === 'video' && (
                    <div className="w-full p-8 flex flex-col h-[700px]">
                        <div className="max-w-3xl mx-auto w-full space-y-8 flex flex-col justify-center h-full">
                            <div className="text-center space-y-4">
                                <div className="inline-flex items-center gap-2 bg-purple-brand/10 px-4 py-2 rounded-full border border-purple-brand/20">
                                    <Video size={16} className="text-purple-brand" />
                                    <span className="text-xs font-bold text-purple-brand uppercase tracking-widest">Veo 3.1 Model</span>
                                </div>
                                <h3 className="text-3xl font-black">AI 视频生成实验室</h3>
                                <p className="text-gray-400 text-sm max-w-lg mx-auto">
                                    使用 Google 最先进的 Veo 模型生成 1080p 高清视频。支持复杂的文本描述与电影级镜头语言。
                                </p>
                            </div>

                            <div className="bg-white/5 p-8 rounded-[2.5rem] border border-white/10 space-y-6 relative overflow-hidden group">
                                <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-brand/20 rounded-full blur-2xl group-hover:bg-purple-brand/30 transition-colors"></div>
                                
                                <textarea 
                                    value={videoPrompt}
                                    onChange={(e) => setVideoPrompt(e.target.value)}
                                    placeholder="描述视频内容，例如：一只身穿宇航服的柯基犬在月球表面滑板，背景是巨大的地球，电影质感，4K..."
                                    rows={4}
                                    className="w-full bg-black/50 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:ring-2 focus:ring-purple-brand outline-none resize-none relative z-10 transition-all placeholder:text-gray-600"
                                />
                                
                                <div className="flex justify-between items-center relative z-10">
                                    <span className="text-[10px] text-yellow-500 font-bold flex items-center gap-1.5 bg-yellow-500/10 px-3 py-1.5 rounded-lg border border-yellow-500/20">
                                        <Key size={10} /> Paid API Key Required
                                    </span>
                                    <button 
                                        onClick={handleGenerateVideo}
                                        disabled={isLoading || !videoPrompt.trim()}
                                        className="bg-purple-brand text-white px-8 py-3 rounded-xl font-bold hover:bg-purple-600 transition-all disabled:opacity-50 flex items-center gap-2 hover:shadow-lg hover:-translate-y-0.5"
                                    >
                                        {isLoading ? <Sparkles className="animate-spin" size={16} /> : <Video size={16} />}
                                        {isLoading ? 'Veo 正在生成...' : '生成 1080p 视频'}
                                    </button>
                                </div>
                            </div>

                            {isLoading && videoLoadingStep && (
                                <div className="text-center space-y-6 py-8 animate-in fade-in slide-in-from-bottom-4">
                                    <div className="relative w-20 h-20 mx-auto">
                                        <div className="absolute inset-0 border-4 border-purple-brand/30 rounded-full"></div>
                                        <div className="absolute inset-0 border-4 border-purple-brand border-t-transparent rounded-full animate-spin"></div>
                                        <Video className="absolute inset-0 m-auto text-purple-brand animate-pulse" size={24} />
                                    </div>
                                    <p className="text-purple-brand font-bold animate-pulse text-sm tracking-wide">{videoLoadingStep}</p>
                                </div>
                            )}

                            {videoUrl && !isLoading && (
                                <div className="rounded-3xl overflow-hidden border border-white/20 shadow-2xl relative group animate-in zoom-in-95 duration-500">
                                    <video controls autoPlay loop className="w-full aspect-video bg-black">
                                        <source src={videoUrl} type="video/mp4" />
                                    </video>
                                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <a href={videoUrl} download="generated-video.mp4" className="bg-black/60 backdrop-blur text-white px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 hover:bg-black/80 border border-white/10">
                                            <Download size={14} /> 保存视频
                                        </a>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

            </div>
        </div>
    </div>
  );
};

// CSS Injection
const style = document.createElement('style');
style.textContent = `
  .custom-scrollbar::-webkit-scrollbar {
    width: 6px;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 3px;
  }
  .animate-ping-slow {
    animation: ping 3s cubic-bezier(0, 0, 0.2, 1) infinite;
  }
`;
document.head.appendChild(style);