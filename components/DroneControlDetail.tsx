
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Plane, Map as MapIcon, Crosshair, Battery, Signal, 
  Wifi, Settings, Camera, Video, Play, Pause, 
  RotateCcw, ArrowUp, ArrowDown, Navigation, 
  Layers, Maximize2, Aperture, Sliders, AlertTriangle,
  Compass, Move, Focus, Gauge, Thermometer,
  ChevronLeft, ChevronRight, Target, Box, Activity,
  Grid, Zap, Monitor, ChevronUp, Eye, Moon, Sun, 
  Siren, Volume2, Lightbulb, Shield, Gamepad2,
  HardDrive
} from 'lucide-react';

export const DroneControlDetail: React.FC = () => {
  // Flight State
  const [isFlying, setIsFlying] = useState(false);
  const [altitude, setAltitude] = useState(0); // meters
  const [distance, setDistance] = useState(0); // meters
  const [hSpeed, setHSpeed] = useState(0); // m/s
  const [vSpeed, setVSpeed] = useState(0); // m/s
  const [battery, setBattery] = useState(92);
  const [satellites, setSatellites] = useState(0);
  const [obstacles, setObstacles] = useState({ f: 5, b: 8, l: 12, r: 12 }); 
  
  // Navigation State
  const [position, setPosition] = useState({ x: 0, y: 0 }); // Relative to Home (0,0) in meters
  const [flightPath, setFlightPath] = useState<{x: number, y: number}[]>([]);

  // Control Input State (Virtual RC)
  const inputRef = useRef({
    throttle: 0, // -1 to 1 (W/S)
    yaw: 0,      // -1 to 1 (A/D)
    pitch: 0,    // -1 to 1 (Up/Down)
    roll: 0      // -1 to 1 (Left/Right)
  });

  // Orientation State
  const [roll, setRoll] = useState(0);
  const [pitch, setPitch] = useState(0);
  const [yaw, setYaw] = useState(0);

  // Camera & Vision State
  const [recording, setRecording] = useState(false);
  const [recordTime, setRecordTime] = useState(0);
  const [cameraMode, setCameraMode] = useState<'photo' | 'video'>('video');
  const [visionMode, setVisionMode] = useState<'rgb' | 'thermal' | 'night'>('rgb');
  const [iso, setIso] = useState(100);
  const [shutter, setShutter] = useState('1/60');
  const [gimbalPitch, setGimbalPitch] = useState(0); // -90 (down) to 20 (up)
  const [showProSettings, setShowProSettings] = useState(false);
  const [isControllerConnected, setIsControllerConnected] = useState(false);

  // UI State
  const [viewMode, setViewMode] = useState<'fpv' | 'map'>('fpv'); 
  const [flightMode, setFlightMode] = useState<'N' | 'S' | 'T'>('N'); 
  const [showSmartModes, setShowSmartModes] = useState(false);
  const [activeSmartMode, setActiveSmartMode] = useState<string | null>(null);
  const [showPayload, setShowPayload] = useState(false);
  const [payloads, setPayloads] = useState({ light: false, speaker: false, beacon: false });

  // Smart Modes Definition
  const smartModes = [
    { id: 'ActiveTrack', label: '智能跟随' },
    { id: 'Waypoints', label: '航点飞行' },
    { id: 'POI Orbit', label: '兴趣点环绕' },
    { id: 'Hyperlapse', label: '延时摄影' }
  ];

  // Keyboard Event Listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
        if(!isFlying || !isControllerConnected) return;
        switch(e.key.toLowerCase()) {
            case 'w': inputRef.current.throttle = 1; break;
            case 's': inputRef.current.throttle = -1; break;
            case 'a': inputRef.current.yaw = -1; break;
            case 'd': inputRef.current.yaw = 1; break;
            case 'arrowup': inputRef.current.pitch = 1; break;
            case 'arrowdown': inputRef.current.pitch = -1; break;
            case 'arrowleft': inputRef.current.roll = -1; break;
            case 'arrowright': inputRef.current.roll = 1; break;
        }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
        if(!isControllerConnected) return;
        switch(e.key.toLowerCase()) {
            case 'w': case 's': inputRef.current.throttle = 0; break;
            case 'a': case 'd': inputRef.current.yaw = 0; break;
            case 'arrowup': case 'arrowdown': inputRef.current.pitch = 0; break;
            case 'arrowleft': case 'arrowright': inputRef.current.roll = 0; break;
        }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
        window.removeEventListener('keydown', handleKeyDown);
        window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isFlying, isControllerConnected]);

  // Reset controller inputs when disconnected
  useEffect(() => {
      if (!isControllerConnected) {
          inputRef.current = { throttle: 0, yaw: 0, pitch: 0, roll: 0 };
      }
  }, [isControllerConnected]);

  // Physics Simulation Loop
  useEffect(() => {
    let interval: any;
    if (isFlying) {
      interval = setInterval(() => {
        const inputs = inputRef.current;
        
        // Mode multiplier
        const speedMult = flightMode === 'S' ? 2.5 : flightMode === 'T' ? 0.3 : 1.0;

        // Update Orientation based on input (Response)
        // Smooth transition to target input
        setRoll(prev => prev + (inputs.roll * 20 - prev) * 0.1);
        setPitch(prev => prev + (inputs.pitch * 15 - prev) * 0.1);
        setYaw(prev => (prev + inputs.yaw * 2) % 360);

        // Update Physics
        setVSpeed(prev => prev + (inputs.throttle * 5 * speedMult - prev) * 0.1);
        setAltitude(prev => Math.max(0, prev + vSpeed * 0.1));
        
        // Horizontal Speed approx based on pitch
        const targetHSpeed = inputs.pitch * 15 * speedMult;
        setHSpeed(prev => prev + (targetHSpeed - prev) * 0.05);
        setDistance(prev => prev + Math.abs(hSpeed) * 0.1);

        // Position Tracking for Map (Simple Integration)
        // yaw 0 = North (Y+), 90 = East (X+)
        const rad = (yaw * Math.PI) / 180;
        const vx = hSpeed * Math.sin(rad);
        const vy = hSpeed * Math.cos(rad);
        
        setPosition(prev => ({
            x: prev.x + vx * 0.05,
            y: prev.y + vy * 0.05
        }));

        // Battery drain
        setBattery(prev => Math.max(0, prev - (Math.abs(hSpeed) * 0.001 + 0.005)));
        setSatellites(prev => Math.min(24, Math.max(12, Math.floor(prev + (Math.random() - 0.5)))));

        // Obstacle Simulation (Randomized but persistent)
        setObstacles(prev => ({
            f: Math.max(0.5, prev.f + (Math.random() - 0.5)),
            b: Math.max(0.5, prev.b + (Math.random() - 0.5)),
            l: Math.max(0.5, prev.l + (Math.random() - 0.5)),
            r: Math.max(0.5, prev.r + (Math.random() - 0.5)),
        }));

      }, 50); // 20fps simulation
    } else {
      setHSpeed(0);
      setVSpeed(0);
      setRoll(0);
      setPitch(0);
      setSatellites(18);
      // Reset logic for takeoff
      if(distance === 0 && altitude === 0) {
          setPosition({x: 0, y: 0});
          setFlightPath([]);
      }
    }
    return () => clearInterval(interval);
  }, [isFlying, hSpeed, vSpeed, flightMode, yaw, distance, altitude]);

  // Path History Tracker
  useEffect(() => {
      if(isFlying) {
          const interval = setInterval(() => {
              setFlightPath(prev => {
                  const last = prev[prev.length - 1];
                  // Only add point if moved significantly (> 2m) to optimize
                  if (!last || Math.hypot(position.x - last.x, position.y - last.y) > 2) {
                      return [...prev, position];
                  }
                  return prev;
              });
          }, 1000); // 1Hz update
          return () => clearInterval(interval);
      }
  }, [isFlying, position]);

  // Timer
  useEffect(() => {
    let interval: any;
    if (recording) {
      interval = setInterval(() => setRecordTime(t => t + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [recording]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const takeoff = () => {
    if (!isFlying) {
      setIsFlying(true);
      setAltitude(1.5);
    } else {
      setIsFlying(false);
      setAltitude(0);
      setHSpeed(0);
      inputRef.current = { throttle: 0, yaw: 0, pitch: 0, roll: 0 };
    }
  };

  const getVisionStyle = () => {
    if (visionMode === 'thermal') {
        return { filter: 'contrast(1.2) invert(1) hue-rotate(180deg) saturate(2)' };
    }
    if (visionMode === 'night') {
        return { filter: 'grayscale(1) sepia(1) hue-rotate(60deg) contrast(1.2) brightness(1.2)' };
    }
    return {};
  };

  // --- Components ---

  const CompassStrip = () => {
    const offset = (yaw / 360) * 100;
    return (
        <div className="relative w-64 h-8 overflow-hidden bg-black/40 backdrop-blur-md rounded-full border border-white/20 mask-image-linear-to-r">
            <div className="absolute top-0 left-0 h-full flex items-center transition-transform duration-100 ease-linear" style={{ transform: `translateX(calc(50% - ${offset}%))` }}>
                <div className="flex gap-8 text-[10px] font-mono font-bold text-white whitespace-nowrap px-4">
                    <span>N</span><span>|</span><span>15</span><span>|</span><span>30</span><span>|</span><span>NE</span><span>|</span>
                    <span>60</span><span>|</span><span>75</span><span>|</span><span>E</span><span>|</span><span>105</span><span>|</span>
                    <span>120</span><span>|</span><span>SE</span><span>|</span><span>150</span><span>|</span><span>165</span><span>|</span>
                    <span>S</span><span>|</span><span>195</span><span>|</span><span>210</span><span>|</span><span>SW</span><span>|</span>
                    <span>240</span><span>|</span><span>255</span><span>|</span><span>W</span><span>|</span><span>285</span><span>|</span>
                    <span>300</span><span>|</span><span>NW</span><span>|</span><span>330</span><span>|</span><span>345</span><span>|</span>
                    <span>N</span>
                </div>
            </div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-full bg-red-500 z-10"></div>
        </div>
    )
  }

  const ArtificialHorizon = () => (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-60">
        <div className="relative w-64 h-64 overflow-hidden rounded-full border border-white/10">
            {/* Moving Horizon */}
            <div 
                className="absolute w-[300%] h-[300%] bg-gradient-to-b from-blue-500/20 to-orange-500/20 top-[-100%] left-[-100%]"
                style={{ transform: `rotate(${-roll}deg) translateY(${pitch * 4}px)` }}
            >
                <div className="absolute top-1/2 w-full h-0.5 bg-white/50 shadow-[0_0_10px_white]"></div>
            </div>
            {/* Pitch Ladder */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex flex-col items-center justify-center gap-8 transition-transform duration-75" style={{ transform: `rotate(${-roll}deg) translateY(${pitch * 4}px)` }}>
                <div className="flex flex-col gap-8 items-center opacity-50">
                    <div className="w-12 h-px bg-white/30 flex justify-between"><span className="text-[8px] -mt-2">10</span></div>
                    <div className="w-20 h-px bg-white/30 flex justify-between"><span className="text-[8px] -mt-2">0</span></div>
                    <div className="w-12 h-px bg-white/30 flex justify-between"><span className="text-[8px] -mt-2">-10</span></div>
                </div>
            </div>
            {/* Flight Path Marker (Static Center) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center">
                <div className="w-24 h-1 bg-black/50 backdrop-blur rounded-full border border-white/20"></div>
                <div className="w-1 h-2 bg-yellow-400 absolute"></div>
                <div className="w-24 h-24 border-2 border-white/10 rounded-full absolute"></div>
            </div>
        </div>
    </div>
  )

  const RadarWidget = () => (
    <div className="relative w-32 h-32 flex items-center justify-center">
        <div className="absolute inset-0 border border-white/10 rounded-full bg-black/40 backdrop-blur-md"></div>
        <div className="absolute w-2 h-2 bg-green-500 rounded-full z-10 shadow-[0_0_10px_#22c55e] animate-pulse"></div>
        
        {/* Radar Arcs */}
        {[
            { d: obstacles.f, rot: 0 },
            { d: obstacles.r, rot: 90 },
            { d: obstacles.b, rot: 180 },
            { d: obstacles.l, rot: 270 }
        ].map((obs, i) => {
            const danger = obs.d < 2;
            const warning = obs.d < 5;
            const color = danger ? 'bg-red-500 shadow-[0_0_15px_red]' : warning ? 'bg-orange-500' : 'bg-green-500/30';
            return (
                <div key={i} className="absolute inset-0 flex items-center justify-center" style={{ transform: `rotate(${obs.rot}deg)` }}>
                    <div className="absolute -top-1 w-full h-full flex justify-center">
                        <div className={`w-8 h-1 rounded-full ${color} transition-all duration-300`} style={{ opacity: Math.max(0.1, 1 - obs.d/15), transform: `translateY(-${Math.min(40, obs.d * 4)}px)` }}></div>
                    </div>
                    {/* Distance Text */}
                    {obs.d < 10 && (
                        <div className="absolute top-2 text-[8px] font-bold text-white/70" style={{ transform: `rotate(-${obs.rot}deg)` }}>{obs.d.toFixed(1)}m</div>
                    )}
                </div>
            )
        })}
        
        {/* Rings */}
        <div className="absolute inset-4 border border-white/5 rounded-full"></div>
        <div className="absolute inset-8 border border-white/5 rounded-full"></div>
        
        <span className="absolute bottom-6 text-[8px] font-mono text-gray-400">全向感知</span>
    </div>
  )

  const VirtualStick = ({ label, x, y }: { label: string, x: number, y: number }) => (
      <div className="relative w-24 h-24 bg-white/5 rounded-full border border-white/10 flex items-center justify-center backdrop-blur-sm">
         <div 
            className="w-8 h-8 bg-white/50 rounded-full shadow-[0_0_15px_rgba(255,255,255,0.3)] transition-transform duration-75 ease-out"
            style={{ transform: `translate(${x * 30}px, ${y * -30}px)` }}
         >
            <div className="w-full h-full rounded-full border-2 border-white/50"></div>
         </div>
         {/* Crosshairs */}
         <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
            <div className="w-full h-px bg-white"></div>
            <div className="h-full w-px bg-white absolute"></div>
         </div>
         <span className="absolute -bottom-6 text-[9px] font-bold text-gray-500 uppercase tracking-wider whitespace-nowrap">{label}</span>
      </div>
  );

  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 bg-[#050505] text-white min-h-screen font-sans selection:bg-blue-500/30 overflow-hidden">
      
      {/* 1. Top Bar */}
      <div className="fixed top-0 w-full h-14 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/5 flex justify-between items-center px-6 z-50">
         <div className="flex items-center gap-4">
            <button onClick={() => window.history.back()} className="hover:text-blue-400 transition-colors">
                <ChevronLeft size={24} />
            </button>
            <div className="flex flex-col">
               <span className="font-bold text-md tracking-tight flex items-center gap-2">
                   SkyLink Pro 
                   <span className="text-[9px] bg-blue-500/20 text-blue-400 px-1.5 py-0.5 rounded border border-blue-500/30">企业版</span>
               </span>
            </div>
         </div>
         <div className="flex items-center gap-6">
            <div className="flex items-center gap-4 text-xs font-bold text-gray-400">
                <div className="flex items-center gap-1"><Signal size={14} className={isControllerConnected ? 'text-green-500' : 'text-gray-600'} /> 遥控 <span className={isControllerConnected ? 'text-white' : 'text-gray-600'}>{isControllerConnected ? '5.8G' : '未连接'}</span></div>
                <div className="flex items-center gap-1"><Wifi size={14} /> 图传 <span className="text-white">1080P</span></div>
                <div className="flex items-center gap-1"><Navigation size={14} /> 卫星 <span className="text-white">{satellites}</span></div>
                <div className="flex items-center gap-1 border-l border-white/10 pl-4"><HardDrive size={14} /> SD <span className="text-white">42GB</span></div>
            </div>
            <div className="flex items-center gap-2 pl-4 border-l border-white/10">
                <span className={`text-lg font-black ${battery < 20 ? "text-red-500" : "text-green-500"}`}>{battery.toFixed(0)}%</span>
                <div className="w-8 h-4 border border-white/30 rounded-sm p-0.5 flex">
                    <div className={`h-full ${battery < 20 ? "bg-red-500" : "bg-green-500"}`} style={{width: `${battery}%`}}></div>
                </div>
                <span className="text-[10px] text-gray-500">22.4V</span>
            </div>
         </div>
      </div>

      {/* 2. Main FPV Area */}
      <main className="pt-14 h-[85vh] relative flex flex-col items-center justify-center p-4">
         <div className="relative w-full h-full max-w-[1600px] bg-black rounded-3xl border border-zinc-800 shadow-2xl overflow-hidden group">
            
            {/* Vision Layer */}
            {viewMode === 'fpv' ? (
                <div className="absolute inset-0 overflow-hidden">
                    <img 
                        src="https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&q=80&w=2000" 
                        className={`w-full h-full object-cover transition-transform duration-[5s] ease-out ${isFlying ? 'scale-110' : 'scale-100'}`}
                        style={{
                            ...getVisionStyle(),
                            transform: `scale(${isFlying ? 1.1 : 1}) rotate(${roll * 0.5}deg) translateY(${pitch * 2}px)`
                        }}
                        alt="FPV"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40"></div>
                    
                    {/* AR Smart Mode Overlays */}
                    {activeSmartMode === 'Waypoints' && (
                        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-60">
                            <path d="M 400 600 L 600 400 L 900 500" fill="none" stroke="#8A84FF" strokeWidth="2" strokeDasharray="10 5" className="animate-pulse" />
                            <circle cx="400" cy="600" r="5" fill="#8A84FF" />
                            <circle cx="600" cy="400" r="5" fill="#8A84FF" />
                            <circle cx="900" cy="500" r="5" fill="#8A84FF" />
                            <text x="610" y="400" fill="white" fontSize="12" fontWeight="bold">航点 2</text>
                        </svg>
                    )}
                    {activeSmartMode === 'ActiveTrack' && (
                        <div className="absolute top-1/2 left-1/2 w-32 h-32 border-2 border-green-400 rounded-lg transform -translate-x-16 -translate-y-16 animate-pulse flex flex-col items-center justify-between pb-1">
                            <div className="absolute -top-6 left-0 bg-green-400 text-black text-[10px] font-bold px-2 py-0.5 rounded">目标已锁定</div>
                            <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-white"></div>
                            <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-white"></div>
                            <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-white"></div>
                            <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-white"></div>
                            <Crosshair size={16} className="text-green-400 opacity-80 mt-12" />
                        </div>
                    )}

                    {/* AI Object Tracking Box */}
                    {isFlying && !activeSmartMode && (
                        <div className="absolute top-1/2 left-1/2 w-24 h-24 border-2 border-green-400 rounded-lg transform -translate-x-12 -translate-y-12 animate-pulse flex flex-col items-center justify-between pb-1">
                            <span className="bg-green-400 text-black text-[8px] font-bold px-1 self-start">车辆 98%</span>
                            <Crosshair size={12} className="text-green-400 opacity-50" />
                        </div>
                    )}

                </div>
            ) : (
                <div className="absolute inset-0 bg-[#0f1115] relative overflow-hidden flex items-center justify-center">
                    {/* Map World - Inverse translation to keep drone centered */}
                    <div 
                        className="absolute w-[4000px] h-[4000px] transition-transform duration-75 ease-linear will-change-transform"
                        style={{ 
                            transform: `translate(${-position.x * 2}px, ${position.y * 2}px)`, // Scale 1m = 2px
                            backgroundImage: 'radial-gradient(#333 1px, transparent 1px)', 
                            backgroundSize: '40px 40px',
                            backgroundPosition: 'center' 
                        }}
                    >
                        {/* Home Point */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0 flex items-center justify-center">
                            <div className="w-4 h-4 bg-blue-500/50 rounded-full animate-ping absolute"></div>
                            <div className="w-8 h-8 flex flex-col items-center justify-center">
                               <MapIcon size={16} className="text-blue-500 fill-blue-500/20" />
                               <span className="text-[8px] font-bold text-blue-500 mt-1 whitespace-nowrap">HOME</span>
                            </div>
                        </div>

                        {/* Flight Path */}
                        <svg className="absolute top-0 left-0 w-full h-full pointer-events-none" style={{ overflow: 'visible' }}>
                            <polyline 
                                points={flightPath.map(p => `${2000 + p.x * 2},${2000 - p.y * 2}`).join(' ')} 
                                fill="none" 
                                stroke="#8A84FF" 
                                strokeWidth="2" 
                                strokeDasharray="4 4"
                                opacity="0.6" 
                            />
                            {/* Live Line from last path point to current pos */}
                            {flightPath.length > 0 && (
                                <line 
                                    x1={2000 + flightPath[flightPath.length-1].x * 2} 
                                    y1={2000 - flightPath[flightPath.length-1].y * 2}
                                    x2={2000 + position.x * 2}
                                    y2={2000 - position.y * 2}
                                    stroke="#8A84FF"
                                    strokeWidth="2"
                                    strokeDasharray="4 4"
                                    opacity="0.6"
                                />
                            )}
                        </svg>
                    </div>

                    {/* Drone Marker (Center Screen) */}
                    <div className="absolute z-10 flex flex-col items-center justify-center">
                        <div 
                            className="w-12 h-12 flex items-center justify-center transition-transform duration-75"
                            style={{ transform: `rotate(${yaw}deg)` }}
                        >
                            <Plane size={32} className="text-white fill-white drop-shadow-lg" />
                        </div>
                        <div className="mt-4 bg-black/60 backdrop-blur px-2 py-1 rounded text-[10px] font-bold text-white border border-white/10">
                            {altitude.toFixed(1)}m
                        </div>
                    </div>

                    {/* Map UI Overlays */}
                    <div className="absolute top-4 left-4 flex flex-col gap-2 pointer-events-none">
                        <div className="bg-black/40 backdrop-blur p-2 rounded-lg border border-white/10 text-[10px] text-gray-400">
                            <div>POS X: {position.x.toFixed(1)}</div>
                            <div>POS Y: {position.y.toFixed(1)}</div>
                        </div>
                    </div>
                </div>
            )}

            {/* --- HUD OVERLAYS --- */}

            {/* Top Center: Telemetry Tape */}
            <div className="absolute top-4 left-0 right-0 flex justify-center pointer-events-none z-40">
                <div className="flex flex-col items-center gap-2 pointer-events-auto">
                    <div className="flex items-center gap-4 bg-black/60 backdrop-blur-md px-6 py-2 rounded-full border border-white/10">
                        <div className="flex items-center gap-2 border-r border-white/20 pr-4">
                            <span className={`font-black text-lg ${flightMode === 'S' ? 'text-red-500' : 'text-green-400'}`}>{flightMode}</span>
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{isFlying ? '飞行中' : '地面待机'}</span>
                        </div>
                        <CompassStrip />
                    </div>
                    {/* Vision Mode Selector */}
                    <div className="flex gap-1 bg-black/60 backdrop-blur-md p-1 rounded-full border border-white/10">
                        {[
                            { id: 'rgb', icon: <Eye size={14} />, label: '可见光' },
                            { id: 'thermal', icon: <Thermometer size={14} />, label: '红外' },
                            { id: 'night', icon: <Moon size={14} />, label: '夜视' }
                        ].map(m => (
                            <button 
                                key={m.id}
                                onClick={() => setVisionMode(m.id as any)}
                                className={`flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold transition-all ${visionMode === m.id ? 'bg-white text-black' : 'text-gray-400 hover:text-white'}`}
                            >
                                {m.icon} {m.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Center: Artificial Horizon */}
            {viewMode === 'fpv' && <ArtificialHorizon />}

            {/* Left Sidebar: Flight Controls */}
            <div className="absolute left-6 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-50">
                <div className="flex flex-col gap-3">
                    <button onClick={takeoff} className="w-14 h-14 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl flex items-center justify-center hover:bg-white/20 transition-all active:scale-95">
                        {isFlying ? <ArrowDown size={24} className="text-yellow-400" /> : <ArrowUp size={24} className="text-white" />}
                    </button>
                    <button className="w-14 h-14 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl flex items-center justify-center hover:bg-white/20 transition-all active:scale-95">
                        <RotateCcw size={20} />
                    </button>
                </div>
                
                {/* Payload Menu */}
                <div className="relative">
                    <button 
                        onClick={() => setShowPayload(!showPayload)}
                        className={`w-14 h-14 rounded-2xl border border-white/20 flex items-center justify-center transition-all ${showPayload ? 'bg-orange-500 text-white border-orange-500' : 'bg-white/10 hover:bg-white/20'}`}
                    >
                        <Box size={20} />
                    </button>
                    {showPayload && (
                        <div className="absolute left-16 top-0 bg-black/90 backdrop-blur-xl border border-white/10 p-3 rounded-2xl w-40 space-y-2 animate-in fade-in slide-in-from-left-4 shadow-2xl">
                            <span className="text-[10px] font-bold text-gray-400 uppercase ml-1">负载控制</span>
                            <button onClick={() => setPayloads(p => ({...p, light: !p.light}))} className={`w-full flex items-center justify-between p-2 rounded-lg text-xs font-bold ${payloads.light ? 'bg-white text-black' : 'bg-white/5 text-gray-300'}`}>
                                <span className="flex items-center gap-2"><Lightbulb size={12} /> 探照灯</span>
                                <div className={`w-2 h-2 rounded-full ${payloads.light ? 'bg-green-500' : 'bg-red-500'}`}></div>
                            </button>
                            <button onClick={() => setPayloads(p => ({...p, speaker: !p.speaker}))} className={`w-full flex items-center justify-between p-2 rounded-lg text-xs font-bold ${payloads.speaker ? 'bg-white text-black' : 'bg-white/5 text-gray-300'}`}>
                                <span className="flex items-center gap-2"><Volume2 size={12} /> 喊话器</span>
                                <div className={`w-2 h-2 rounded-full ${payloads.speaker ? 'bg-green-500' : 'bg-red-500'}`}></div>
                            </button>
                            <button onClick={() => setPayloads(p => ({...p, beacon: !p.beacon}))} className={`w-full flex items-center justify-between p-2 rounded-lg text-xs font-bold ${payloads.beacon ? 'bg-white text-black' : 'bg-white/5 text-gray-300'}`}>
                                <span className="flex items-center gap-2"><Siren size={12} /> 夜航灯</span>
                                <div className={`w-2 h-2 rounded-full ${payloads.beacon ? 'bg-green-500' : 'bg-red-500'}`}></div>
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Smart Modes (Top Left) */}
            <div className="absolute left-24 top-6 z-50">
                <button 
                    onClick={() => setShowSmartModes(!showSmartModes)}
                    className={`h-10 px-4 rounded-full border border-white/20 flex items-center gap-2 transition-all ${showSmartModes || activeSmartMode ? 'bg-purple-500 text-white' : 'bg-black/40 text-white hover:bg-black/60'}`}
                >
                    <Target size={16} />
                    <span className="text-xs font-bold">{activeSmartMode ? smartModes.find(m => m.id === activeSmartMode)?.label : '智能模式'}</span>
                </button>
                {showSmartModes && (
                    <div className="absolute top-12 left-0 bg-black/80 backdrop-blur-xl border border-white/10 p-3 rounded-2xl grid grid-cols-2 gap-2 w-56 animate-in fade-in slide-in-from-top-2 shadow-2xl">
                        {smartModes.map(m => (
                            <button 
                                key={m.id} 
                                onClick={() => { setActiveSmartMode(activeSmartMode === m.id ? null : m.id); setShowSmartModes(false); }}
                                className={`p-2 rounded-lg text-[10px] font-bold transition-colors text-left ${activeSmartMode === m.id ? 'bg-purple-500 text-white' : 'bg-white/10 hover:bg-purple-500/50'}`}
                            >
                                {m.label}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Right Sidebar: Camera Pro Controls */}
            {/* Adjusted position to top-[45%] to clear virtual stick area */}
            <div className="absolute right-6 top-[45%] -translate-y-1/2 flex flex-col items-end gap-4 pointer-events-none z-40">
                <div className={`bg-black/60 backdrop-blur-md rounded-3xl border border-white/10 overflow-hidden transition-all duration-300 pointer-events-auto ${showProSettings ? 'w-80' : 'w-16'}`}>
                    <div className="p-1 flex flex-col gap-1">
                        <button 
                            onClick={() => setShowProSettings(!showProSettings)}
                            className="w-14 h-14 flex items-center justify-center hover:bg-white/10 rounded-2xl transition-colors self-end"
                        >
                            <Sliders size={20} className={showProSettings ? 'text-blue-400' : 'text-white'} />
                        </button>
                        
                        {showProSettings && (
                            <div className="p-4 space-y-4 animate-in fade-in slide-in-from-right-4">
                                {/* Controller Settings */}
                                <div className="space-y-3 pb-4 border-b border-white/10">
                                    <div className="flex justify-between items-center">
                                        <span className="text-[10px] font-bold text-gray-400 flex items-center gap-2">
                                            <Gamepad2 size={14} /> 模拟遥控器
                                        </span>
                                        <button 
                                            onClick={() => setIsControllerConnected(!isControllerConnected)}
                                            className={`w-8 h-4 rounded-full relative transition-colors duration-300 ${isControllerConnected ? 'bg-green-500' : 'bg-white/20'}`}
                                        >
                                            <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all duration-300 shadow-sm ${isControllerConnected ? 'left-[18px]' : 'left-0.5'}`}></div>
                                        </button>
                                    </div>
                                    {isControllerConnected && (
                                        <div className="bg-white/5 rounded-lg p-2 grid grid-cols-2 gap-2 text-[9px] text-gray-500 font-mono">
                                            <div className="flex justify-between"><span>THR/YAW</span><span className="text-white">WASD</span></div>
                                            <div className="flex justify-between"><span>PIT/ROL</span><span className="text-white">ARROWS</span></div>
                                        </div>
                                    )}
                                </div>

                                {/* ISO Control */}
                                <div className="space-y-1">
                                    <div className="flex justify-between text-[10px] font-bold text-gray-400"><span>ISO</span><span className="text-white">{iso}</span></div>
                                    <input type="range" min="100" max="6400" step="100" value={iso} onChange={(e) => setIso(Number(e.target.value))} className="w-full h-1 bg-white/20 rounded-full appearance-none cursor-pointer accent-blue-500" />
                                </div>
                                {/* Shutter Control */}
                                <div className="space-y-1">
                                    <div className="flex justify-between text-[10px] font-bold text-gray-400"><span>快门</span><span className="text-white">{shutter}</span></div>
                                    <div className="flex gap-1 overflow-x-auto no-scrollbar pb-1">
                                        {['1/60', '1/120', '1/240', '1/500'].map(s => (
                                            <button key={s} onClick={() => setShutter(s)} className={`px-2 py-1 rounded text-[8px] border ${shutter === s ? 'bg-white text-black border-white' : 'border-white/20 text-gray-400'}`}>{s}</button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 p-2 h-48 flex flex-col items-center pointer-events-auto">
                    <span className="text-[8px] font-bold text-gray-400 mb-2 mt-2 whitespace-nowrap" style={{ writingMode: 'vertical-rl' }}>云台俯仰</span>
                    <div className="relative flex-1 w-1.5 bg-white/20 rounded-full overflow-hidden my-2">
                        <div className="absolute w-full bg-blue-500 rounded-full bottom-0 transition-all duration-100" style={{ height: `${((gimbalPitch + 90) / 110) * 100}%` }}></div>
                        <input type="range" min="-90" max="20" value={gimbalPitch} onChange={(e) => setGimbalPitch(Number(e.target.value))} className="absolute inset-0 opacity-0 cursor-ns-resize" style={{ transform: 'rotate(180deg)' }} />
                    </div>
                    <span className="text-[9px] font-mono text-white mb-1">{gimbalPitch}°</span>
                </div>

                <div className="pointer-events-auto flex flex-col items-center gap-4">
                    <div className="bg-black/60 backdrop-blur-md p-1 rounded-xl flex gap-1 border border-white/10">
                        <button onClick={() => setCameraMode('video')} className={`p-2 rounded-lg transition-colors ${cameraMode === 'video' ? 'bg-white text-black' : 'text-gray-400'}`}><Video size={16}/></button>
                        <button onClick={() => setCameraMode('photo')} className={`p-2 rounded-lg transition-colors ${cameraMode === 'photo' ? 'bg-white text-black' : 'text-gray-400'}`}><Camera size={16}/></button>
                    </div>
                    <button 
                        onClick={() => setRecording(!recording)}
                        className={`w-16 h-16 rounded-full border-4 flex items-center justify-center transition-all active:scale-95 ${recording ? 'border-red-500/50' : 'border-white'}`}
                    >
                        <div className={`rounded-full transition-all duration-300 ${recording ? 'w-6 h-6 bg-red-500 rounded-sm' : 'w-12 h-12 bg-red-500'}`}></div>
                    </button>
                    {recording && <div className="text-xs font-mono font-bold text-red-500 bg-black/60 px-2 py-0.5 rounded border border-red-500/30 animate-pulse">{formatTime(recordTime)}</div>}
                </div>
            </div>

            {/* Bottom Bar: Telemetry & Radar - Lower Z-Index */}
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between pointer-events-none z-40">
                
                {/* PIP Widget */}
                <div 
                    onClick={() => setViewMode(viewMode === 'fpv' ? 'map' : 'fpv')}
                    className="w-48 h-32 rounded-2xl bg-black/80 backdrop-blur-xl border-2 border-white/20 overflow-hidden shadow-2xl pointer-events-auto cursor-pointer hover:border-white transition-colors relative group"
                >
                    {viewMode === 'fpv' ? (
                        <div className="w-full h-full bg-[#1a1a1a] relative flex items-center justify-center">
                            <Navigation size={24} className="text-blue-500 fill-blue-500" style={{ transform: `rotate(${yaw}deg)` }} />
                            <div className="absolute bottom-1 left-2 text-[8px] font-bold bg-black/50 px-1 rounded text-white">地图</div>
                        </div>
                    ) : (
                        <img src="https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover grayscale" />
                    )}
                </div>

                {/* Central Radar & Telemetry */}
                <div className="flex gap-8 items-end pointer-events-auto">
                    {/* Telemetry Left */}
                    <div className="flex flex-col gap-4 text-right">
                        <div className="bg-black/60 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/10">
                            <div className="text-[9px] text-gray-400 uppercase font-bold">距离</div>
                            <div className="text-2xl font-black font-mono">{distance.toFixed(1)}<span className="text-xs text-gray-500 ml-1">m</span></div>
                        </div>
                        <div className="bg-black/60 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/10">
                            <div className="text-[9px] text-gray-400 uppercase font-bold">高度</div>
                            <div className="text-2xl font-black font-mono">{altitude.toFixed(1)}<span className="text-xs text-gray-500 ml-1">m</span></div>
                        </div>
                    </div>

                    {/* Radar */}
                    <RadarWidget />

                    {/* Telemetry Right */}
                    <div className="flex flex-col gap-4 text-left">
                        <div className="bg-black/60 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/10">
                            <div className="text-[9px] text-gray-400 uppercase font-bold">水平速度</div>
                            <div className="text-2xl font-black font-mono">{Math.abs(hSpeed).toFixed(1)}<span className="text-xs text-gray-500 ml-1">m/s</span></div>
                        </div>
                        <div className="bg-black/60 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/10">
                            <div className="text-[9px] text-gray-400 uppercase font-bold">垂直速度</div>
                            <div className="text-2xl font-black font-mono">{vSpeed > 0 ? '+' : ''}{vSpeed.toFixed(1)}<span className="text-xs text-gray-500 ml-1">m/s</span></div>
                        </div>
                    </div>
                </div>

                {/* Spacer to balance layout since we moved storage to top */}
                <div className="w-48"></div>

            </div>

            {/* Virtual Sticks (Simulated Controller) */}
            <div className="absolute bottom-24 left-10 pointer-events-none opacity-50 hidden lg:block">
               <VirtualStick label="油门 (升降) / 航向" x={inputRef.current.yaw} y={inputRef.current.throttle} />
            </div>
            <div className="absolute bottom-24 right-10 pointer-events-none opacity-50 hidden lg:block">
               <VirtualStick label="俯仰 (进退) / 横滚" x={inputRef.current.roll} y={inputRef.current.pitch} />
            </div>

            {/* Warnings Layer */}
            <div className="absolute top-24 left-1/2 -translate-x-1/2 flex flex-col gap-2 items-center pointer-events-none z-50">
                {isFlying && altitude > 120 && (
                   <div className="bg-red-500/90 backdrop-blur px-6 py-2 rounded-full flex items-center gap-2 animate-pulse shadow-[0_0_20px_rgba(239,68,68,0.5)]">
                      <AlertTriangle size={16} className="text-white" />
                      <span className="text-xs font-black text-white uppercase tracking-widest">达到限高</span>
                   </div>
                )}
                {obstacles.f < 2 && (
                   <div className="bg-orange-500/90 backdrop-blur px-6 py-2 rounded-full flex items-center gap-2 animate-pulse">
                      <Shield size={16} className="text-white" />
                      <span className="text-xs font-black text-white uppercase tracking-widest">避障警报</span>
                   </div>
                )}
            </div>

         </div>
      </main>

      {/* 3. Feature Highlights Section (New) */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-8">
                  <h3 className="text-4xl font-bold leading-tight">
                      工业级 <span className="text-blue-500">智能飞行平台</span>
                  </h3>
                  <div className="flex items-start gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
                     <Gamepad2 className="text-blue-400 mt-1" size={24} />
                     <div>
                        <h4 className="font-bold text-lg mb-1">键盘模拟遥控</h4>
                        <p className="text-sm text-gray-400">使用 WASD 和 方向键 即可体验真实的无人机操控手感。界面底部新增虚拟摇杆实时反馈。</p>
                        <div className="grid grid-cols-2 gap-2 mt-3 text-[10px] font-mono text-gray-500">
                           <span className="bg-black/40 px-2 py-1 rounded">W/S: 油门</span>
                           <span className="bg-black/40 px-2 py-1 rounded">A/D: 航向</span>
                           <span className="bg-black/40 px-2 py-1 rounded">↑/↓: 俯仰</span>
                           <span className="bg-black/40 px-2 py-1 rounded">←/→: 横滚</span>
                        </div>
                     </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {[
                          { title: '全向感知雷达', desc: '360° 实时点云避障，可视化的距离波纹反馈。', icon: <Shield className="text-blue-400" /> },
                          { title: '多光谱视觉', desc: 'RGB / 热成像 / 夜视，一键切换全天候视图。', icon: <Eye className="text-purple-400" /> },
                          { title: 'AI 目标锁定', desc: '端侧 NPU 实时识别车辆与行人，智能跟随运镜。', icon: <Target className="text-red-400" /> },
                          { title: '多载荷挂载', desc: '支持喊话器、探照灯等行业配件的独立控制。', icon: <Box className="text-orange-400" /> },
                      ].map((f, i) => (
                          <div key={i} className="bg-white/5 p-6 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors">
                              <div className="mb-4 bg-black/40 w-12 h-12 rounded-xl flex items-center justify-center border border-white/10">
                                  {f.icon}
                              </div>
                              <h4 className="text-lg font-bold mb-2">{f.title}</h4>
                              <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
                          </div>
                      ))}
                  </div>
              </div>

              {/* Right Side: Technical Specs / Context */}
              <div className="bg-zinc-900 rounded-[3rem] p-8 border border-white/10 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 blur-[100px] rounded-full"></div>
                  
                  <div className="relative z-10 space-y-8">
                      <div className="flex items-center justify-between border-b border-white/10 pb-6">
                          <div>
                              <div className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-1">Transmission</div>
                              <div className="text-2xl font-black">O3+ Pro</div>
                          </div>
                          <div className="text-right">
                              <div className="text-2xl font-black text-blue-400">15km</div>
                              <div className="text-xs text-gray-500 font-bold uppercase">Max Range</div>
                          </div>
                      </div>

                      <div className="flex items-center justify-between border-b border-white/10 pb-6">
                          <div>
                              <div className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-1">Latency</div>
                              <div className="text-2xl font-black">28ms</div>
                          </div>
                          <div className="text-right">
                              <div className="text-2xl font-black text-green-400">1080p</div>
                              <div className="text-xs text-gray-500 font-bold uppercase">Live Feed</div>
                          </div>
                      </div>

                      <div className="space-y-4">
                          <h4 className="text-lg font-bold">交互设计理念</h4>
                          <p className="text-gray-400 text-sm leading-relaxed">
                              在高速飞行中，飞手的注意力极其宝贵。我们采用了<span className="text-white font-bold">“信息分层”</span>策略：核心飞行参数（高度、速度、电量）始终位于视野边缘的 HUD 区域，而避障与导航信息则通过 AR 增强现实的方式叠加在画面中心，确保飞手无需转移视线即可获取关键信息。
                          </p>
                      </div>
                  </div>
              </div>
          </div>
      </section>

    </div>
  );
};
