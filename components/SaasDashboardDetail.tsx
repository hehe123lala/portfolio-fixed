
import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, PieChart, Users, Settings, 
  Search, Bell, MoreVertical, ArrowUpRight, 
  ArrowDownRight, Filter, Download, Plus, 
  GripVertical, BarChart3, Database, Layers,
  CreditCard, Globe, Zap, MousePointer2,
  CheckCircle2, AlertCircle, XCircle, Info,
  Sun, Moon, Sparkles, MessageSquare, Bot,
  TrendingUp, Activity, DollarSign, Calendar,
  MoreHorizontal, FileText, ChevronDown, User,
  Check
} from 'lucide-react';

export const SaasDashboardDetail: React.FC = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [simulatedData, setSimulatedData] = useState([65, 40, 75, 55, 80, 60, 90]);
  const [toast, setToast] = useState<string | null>(null);
  
  // AI Interaction State
  const [aiQuery, setAiQuery] = useState('');
  const [aiThinking, setAiThinking] = useState(false);
  const [aiResult, setAiResult] = useState<boolean>(false);

  // Design System Demo State
  const [demoToggle, setDemoToggle] = useState(true);

  // Helper: Show Toast
  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  // Simulate live data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSimulatedData(prev => {
        const newData = [...prev.slice(1), Math.floor(Math.random() * 50) + 40];
        return newData;
      });
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const handleAiAsk = (query: string) => {
    setAiQuery(query);
    setAiThinking(true);
    setAiResult(false);
    setTimeout(() => {
      setAiThinking(false);
      setAiResult(true);
    }, 1500);
  };

  // --- Views Content Renderers ---

  const renderOverview = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-in fade-in duration-500">
        {/* Widget 1: Revenue */}
        <DashboardCard title="总营收 (Total Revenue)" value="¥ 84,294" trend="+12.5%" trendUp={true} editMode={isEditMode} darkMode={isDarkMode} delay={0} onMore={() => showToast("已导出营收报表")}>
        <div className="h-12 flex items-end gap-1 mt-4 cursor-crosshair">
            {simulatedData.map((h, i) => (
                <div 
                    key={i} 
                    className={`flex-1 rounded-sm transition-colors group relative ${isDarkMode ? 'bg-blue-900/40 hover:bg-blue-500' : 'bg-blue-100 hover:bg-blue-500'}`} 
                    style={{ height: `${h}%` }}
                    onClick={() => showToast(`数据点: ${h * 120}`)}
                >
                    <div className="w-full h-full bg-blue-600 opacity-40 group-hover:opacity-100"></div>
                </div>
            ))}
        </div>
        </DashboardCard>

        {/* Widget 2: Users */}
        <DashboardCard title="活跃用户 (Active Users)" value="12,450" trend="+5.2%" trendUp={true} editMode={isEditMode} darkMode={isDarkMode} delay={100} onMore={() => showToast("查看用户列表")}>
        <div className="flex items-center gap-2 mt-4 cursor-pointer" onClick={() => setActiveTab('customers')}>
            <div className="flex -space-x-2">
                {[1,2,3,4].map(i => (
                    <div key={i} className={`w-8 h-8 rounded-full border-2 ${isDarkMode ? 'border-slate-800 bg-slate-700' : 'border-white bg-slate-200'}`}></div>
                ))}
            </div>
            <span className={`text-xs font-bold ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>+42 新增</span>
        </div>
        </DashboardCard>

        {/* Widget 3: Bounce Rate */}
        <DashboardCard title="跳出率 (Bounce Rate)" value="42.3%" trend="-2.1%" trendUp={true} positiveReverse editMode={isEditMode} darkMode={isDarkMode} delay={200} onMore={() => showToast("分析跳出原因")}>
        <div className={`mt-4 w-full rounded-full h-2 overflow-hidden ${isDarkMode ? 'bg-slate-700' : 'bg-slate-100'}`}>
            <div className="bg-orange-400 h-full rounded-full animate-pulse" style={{ width: '42%' }}></div>
        </div>
        </DashboardCard>

        {/* Widget 4: Server Load */}
        <DashboardCard title="服务器负载 (Server Load)" value="34%" trend="+1.2%" trendUp={false} editMode={isEditMode} darkMode={isDarkMode} delay={300} onMore={() => showToast("查看服务器监控")}>
        <div className="mt-4 flex gap-1">
            {[1,2,3,4,5,6,7,8,9,10].map(i => (
                <div key={i} className={`flex-1 h-2 rounded-full ${i < 4 ? 'bg-emerald-500' : isDarkMode ? 'bg-slate-700' : 'bg-slate-200'}`}></div>
            ))}
        </div>
        </DashboardCard>

        {/* Large Widget: Main Chart */}
        <div className={`col-span-1 md:col-span-2 lg:col-span-3 p-6 rounded-xl border transition-all ${isEditMode ? 'border-blue-400 border-dashed bg-blue-50/10 cursor-move' : isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200 shadow-sm'}`}>
        {isEditMode && <div className="mb-2 text-blue-500 flex justify-center"><GripVertical size={20} /></div>}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 sm:gap-0">
            <h3 className={`font-bold ${isDarkMode ? 'text-slate-100' : 'text-slate-700'}`}>营收分析 (Revenue Analytics)</h3>
            <div className="flex gap-2">
                {['日', '周', '月', '年'].map(t => (
                    <button 
                        key={t} 
                        onClick={() => showToast(`切换时间维度: ${t}`)}
                        className={`text-xs font-bold px-3 py-1 rounded-md transition-colors ${t === '月' ? (isDarkMode ? 'bg-slate-700 text-white' : 'bg-slate-100 text-slate-900') : (isDarkMode ? 'text-slate-500 hover:bg-slate-700' : 'text-slate-400 hover:bg-slate-50')}`}
                    >
                        {t}
                    </button>
                ))}
            </div>
        </div>
        <div className={`h-64 w-full rounded-lg flex items-end justify-between px-4 pb-0 relative overflow-hidden group ${isDarkMode ? 'bg-slate-900/50' : 'bg-slate-50'}`}>
            {/* Grid Lines */}
            <div className="absolute inset-0 flex flex-col justify-between py-4 px-4 pointer-events-none">
                {[1,2,3,4].map(i => <div key={i} className={`w-full h-px dashed ${isDarkMode ? 'bg-slate-700' : 'bg-slate-200'}`}></div>)}
            </div>
            
            {/* Animated Bars */}
            {Array.from({length: 24}).map((_, i) => {
                const h = Math.floor(Math.random() * 60) + 20;
                return (
                    <div 
                        key={i} 
                        className="w-full mx-1 bg-blue-500 rounded-t-sm relative group/bar hover:bg-blue-600 transition-colors cursor-pointer" 
                        style={{ height: `${h}%` }}
                        onClick={() => showToast(`2023-11-${i+1}: ¥${h * 120}`)}
                    >
                        {/* Tooltip */}
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-slate-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                            ¥ {h * 120}
                        </div>
                    </div>
                );
            })}
        </div>
        </div>

        {/* Large Widget: Traffic Source */}
        <div className={`col-span-1 lg:col-span-1 p-6 rounded-xl border transition-all ${isEditMode ? 'border-blue-400 border-dashed bg-blue-50/10 cursor-move' : isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200 shadow-sm'}`}>
        {isEditMode && <div className="mb-2 text-blue-500 flex justify-center"><GripVertical size={20} /></div>}
        <div className="flex justify-between items-start mb-6">
            <h3 className={`font-bold ${isDarkMode ? 'text-slate-100' : 'text-slate-700'}`}>流量来源</h3>
            <button className="text-slate-400 hover:text-slate-600" onClick={() => showToast("查看流量详情")}><MoreHorizontal size={16} /></button>
        </div>
        <div className="flex justify-center mb-6 relative">
            {/* Donut Chart - Pure SVG Implementation */}
            <div className="w-40 h-40 relative">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    {/* Background Track */}
                    <circle cx="50" cy="50" r="42" fill="none" stroke={isDarkMode ? "#334155" : "#f1f5f9"} strokeWidth="10" />
                    {/* Data Segments */}
                    <circle cx="50" cy="50" r="42" fill="none" stroke="#3b82f6" strokeWidth="10" strokeDasharray="180 264" strokeLinecap="round" className="cursor-pointer hover:opacity-80 transition-opacity" onClick={() => showToast("Direct: 65%")} />
                    <circle cx="50" cy="50" r="42" fill="none" stroke="#8b5cf6" strokeWidth="10" strokeDasharray="50 264" strokeDashoffset="-180" strokeLinecap="round" className="cursor-pointer hover:opacity-80 transition-opacity" onClick={() => showToast("Social: 25%")} />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
                    <span className={`text-3xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'} leading-none`}>42k</span>
                    <span className="text-[10px] text-slate-400 uppercase font-bold mt-1">总访问</span>
                </div>
            </div>
        </div>
        <div className="space-y-3">
            <div className="flex justify-between items-center text-sm cursor-pointer hover:bg-black/5 p-1 rounded" onClick={() => showToast("直接访问: 65%")}>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className={isDarkMode ? 'text-slate-300' : 'text-slate-600'}>直接访问</span>
                </div>
                <span className={`font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>65%</span>
            </div>
            <div className="flex justify-between items-center text-sm cursor-pointer hover:bg-black/5 p-1 rounded" onClick={() => showToast("社交媒体: 25%")}>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <span className={isDarkMode ? 'text-slate-300' : 'text-slate-600'}>社交媒体</span>
                </div>
                <span className={`font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>25%</span>
            </div>
            <div className="flex justify-between items-center text-sm cursor-pointer hover:bg-black/5 p-1 rounded" onClick={() => showToast("其他来源: 10%")}>
                <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${isDarkMode ? 'bg-slate-600' : 'bg-slate-200'}`}></div>
                    <span className={isDarkMode ? 'text-slate-300' : 'text-slate-600'}>其他</span>
                </div>
                <span className={`font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>10%</span>
            </div>
        </div>
        </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-6">
        <div className={`p-6 rounded-xl border ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
            <div className="flex justify-between items-center mb-6">
                <h3 className={`font-bold text-lg ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>深度数据分析</h3>
                <button className={`px-3 py-1.5 rounded text-xs font-bold ${isDarkMode ? 'bg-slate-700 text-white' : 'bg-slate-100 text-slate-600'}`}>导出 CSV</button>
            </div>
            <div className="h-64 flex items-end gap-2">
                {Array.from({length: 40}).map((_, i) => {
                    const h = Math.random() * 80 + 10;
                    return <div key={i} className="flex-1 bg-purple-500/50 rounded-t hover:bg-purple-500 transition-colors" style={{height: `${h}%`}}></div>
                })}
            </div>
        </div>
        <div className="grid grid-cols-2 gap-6">
            <div className={`p-6 rounded-xl border ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
                <h4 className={`font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>用户留存 (Retention)</h4>
                <div className="grid grid-cols-7 gap-1">
                    {Array.from({length: 49}).map((_, i) => (
                        <div key={i} className={`aspect-square rounded ${Math.random() > 0.5 ? 'bg-emerald-500' : 'bg-emerald-500/20'}`} style={{opacity: Math.random() + 0.2}}></div>
                    ))}
                </div>
            </div>
            <div className={`p-6 rounded-xl border ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
                <h4 className={`font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>转化漏斗 (Funnel)</h4>
                <div className="space-y-3">
                    {['访问 (100%)', '注册 (45%)', '试用 (20%)', '付费 (8%)'].map((label, i) => (
                        <div key={i} className="space-y-1">
                            <div className="flex justify-between text-xs text-slate-500">
                                <span>{label}</span>
                                <span>{1000 >> i} Users</span>
                            </div>
                            <div className={`h-2 rounded-full ${isDarkMode ? 'bg-slate-700' : 'bg-slate-100'}`}>
                                <div className="h-full bg-blue-500 rounded-full" style={{width: `${100 / (i + 1)}%`}}></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
  );

  const renderCustomers = () => (
    <div className={`animate-in fade-in slide-in-from-right-4 duration-500 rounded-xl border overflow-hidden ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
        <div className="p-6 border-b border-slate-200/10 flex justify-between items-center">
            <h3 className={`font-bold text-lg ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>客户列表 (Recent Customers)</h3>
            <div className="flex gap-2">
                <input placeholder="搜索用户..." className={`px-3 py-1.5 rounded text-sm outline-none ${isDarkMode ? 'bg-slate-900 text-white placeholder-slate-600' : 'bg-slate-100 text-slate-900'}`} />
            </div>
        </div>
        <table className="w-full text-sm">
            <thead className={`text-left ${isDarkMode ? 'bg-slate-900/50 text-slate-400' : 'bg-slate-50 text-slate-500'}`}>
                <tr>
                    <th className="p-4 pl-6">用户</th>
                    <th className="p-4">状态</th>
                    <th className="p-4">消费金额</th>
                    <th className="p-4">注册时间</th>
                    <th className="p-4">操作</th>
                </tr>
            </thead>
            <tbody className={isDarkMode ? 'text-slate-300' : 'text-slate-600'}>
                {[1,2,3,4,5].map((i) => (
                    <tr key={i} className={`border-t ${isDarkMode ? 'border-slate-700 hover:bg-slate-700/50' : 'border-slate-100 hover:bg-slate-50'} transition-colors`}>
                        <td className="p-4 pl-6 flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-400"></div>
                            <div>
                                <div className={`font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>User {100 + i}</div>
                                <div className="text-xs opacity-60">user{100+i}@example.com</div>
                            </div>
                        </td>
                        <td className="p-4">
                            <span className={`px-2 py-1 rounded text-xs font-bold ${i % 2 === 0 ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>
                                {i % 2 === 0 ? 'Active' : 'Offline'}
                            </span>
                        </td>
                        <td className="p-4 font-mono">¥ {i * 1230 + 500}</td>
                        <td className="p-4">2023-10-{10+i}</td>
                        <td className="p-4">
                            <button className="text-blue-500 hover:underline" onClick={() => showToast(`编辑用户 ${100+i}`)}>Edit</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  );

  const renderFinance = () => (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-6">
        <div className="grid grid-cols-3 gap-6">
            {[
                { label: '本月支出', val: '¥ 12,400', icon: <CreditCard className="text-red-500" />, trend: '+2%' },
                { label: '本月净利', val: '¥ 45,200', icon: <TrendingUp className="text-emerald-500" />, trend: '+15%' },
                { label: '待结算', val: '¥ 8,100', icon: <DollarSign className="text-orange-500" />, trend: '3 笔' },
            ].map((item, i) => (
                <div key={i} className={`p-6 rounded-xl border ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
                    <div className="flex justify-between items-start mb-4">
                        <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-slate-700' : 'bg-slate-100'}`}>{item.icon}</div>
                        <span className="text-xs font-bold text-slate-400">{item.trend}</span>
                    </div>
                    <div className={`text-2xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{item.val}</div>
                    <div className="text-xs text-slate-500 mt-1">{item.label}</div>
                </div>
            ))}
        </div>
        <div className={`rounded-xl border p-6 ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
            <h3 className={`font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>近期交易 (Transactions)</h3>
            <div className="space-y-4">
                {[1,2,3].map(i => (
                    <div key={i} className={`flex items-center justify-between p-4 rounded-lg border ${isDarkMode ? 'border-slate-700 bg-slate-900/50' : 'border-slate-100 bg-slate-50'}`}>
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-500"><FileText size={18} /></div>
                            <div>
                                <div className={`font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>SaaS Subscription Pro</div>
                                <div className="text-xs text-slate-500">TXN-8842-{i}</div>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="font-bold text-emerald-500">+ ¥ 299.00</div>
                            <div className="text-xs text-slate-500">Today, 14:00</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
  );

  const components = [
    { name: '主要按钮', type: 'Atom', visual: <button onClick={() => showToast("点击了主要按钮")} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors active:scale-95">确认操作</button> },
    { name: '状态标签', type: 'Atom', visual: <span className="bg-emerald-100 text-emerald-700 px-2.5 py-0.5 rounded-full text-xs font-bold border border-emerald-200 cursor-default">运行中</span> },
    { name: '切换开关', type: 'Atom', visual: <div onClick={() => {setDemoToggle(!demoToggle); showToast(demoToggle ? "开关已关闭" : "开关已开启")}} className={`w-10 h-6 rounded-full relative cursor-pointer transition-colors ${demoToggle ? 'bg-blue-600' : 'bg-slate-300'}`}><div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all ${demoToggle ? 'right-1' : 'left-1'}`}></div></div> },
    { name: '用户头像', type: 'Atom', visual: <div onClick={() => showToast("点击了头像")} className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 border-2 border-white shadow-sm cursor-pointer hover:scale-110 transition-transform"></div> },
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 space-y-32 pb-20 bg-slate-50 relative">
      
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-6 py-3 rounded-full shadow-2xl z-[100] animate-in slide-in-from-top-4 fade-in duration-300 flex items-center gap-3">
           <CheckCircle2 size={18} className="text-emerald-400" />
           <span className="text-sm font-bold">{toast}</span>
        </div>
      )}

      {/* 1. Hero Section */}
      <section className="pt-20 pb-10 text-center max-w-5xl mx-auto px-4">
        <div className="inline-flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full border border-blue-100 mb-8">
           <Database size={16} className="text-blue-600" />
           <span className="text-xs font-bold text-blue-700 uppercase tracking-widest">企业级数据智能</span>
        </div>
        <h1 className="text-5xl lg:text-7xl font-black text-slate-900 tracking-tight leading-tight mb-6">
          Nexus <span className="text-blue-600">数据分析</span>
        </h1>
        <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
          这不仅是一个后台，更是企业决策的数字驾驶舱。我们通过模块化设计与原子化组件库，解决了海量数据展示下的信息过载问题。
        </p>
      </section>

      {/* 2. Interactive Dashboard Simulator (The Core) */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8">
         <div className={`rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border overflow-hidden flex flex-col md:flex-row h-[800px] md:h-[900px] relative transition-colors duration-500 ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
            
            {/* Sidebar */}
            <div className={`w-20 md:w-64 flex flex-col flex-shrink-0 transition-all duration-300 border-r ${isDarkMode ? 'bg-slate-950 border-slate-800 text-slate-400' : 'bg-slate-900 text-slate-400 border-slate-800'}`}>
               <div className={`h-16 flex items-center px-6 border-b ${isDarkMode ? 'border-slate-800' : 'border-slate-800'}`}>
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl cursor-pointer" onClick={() => showToast("点击了 Logo")}>N</div>
                  <span className="ml-3 font-bold text-white text-lg hidden md:block">Nexus</span>
               </div>
               <div className="p-4 space-y-2">
                  {[
                    { id: 'overview', icon: <LayoutDashboard size={20} />, label: '总览面板' },
                    { id: 'analytics', icon: <BarChart3 size={20} />, label: '数据分析' },
                    { id: 'customers', icon: <Users size={20} />, label: '客户管理' },
                    { id: 'finance', icon: <CreditCard size={20} />, label: '财务报表' },
                  ].map(item => (
                    <button 
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === item.id ? 'bg-blue-600 text-white' : 'hover:bg-slate-800 hover:text-white'}`}
                    >
                       {item.icon}
                       <span className="hidden md:block text-sm font-medium">{item.label}</span>
                    </button>
                  ))}
               </div>
               <div className={`mt-auto p-4 border-t ${isDarkMode ? 'border-slate-800' : 'border-slate-800'}`}>
                  <button className="flex items-center gap-3 w-full hover:bg-slate-800 p-2 rounded-lg transition-colors" onClick={() => showToast("打开个人中心")}>
                     <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500"></div>
                     <div className="hidden md:block text-left">
                        <div className="text-sm font-bold text-white">管理员</div>
                        <div className="text-xs">admin@nexus.com</div>
                     </div>
                  </button>
               </div>
            </div>

            {/* Main Content Area */}
            <div className={`flex-1 flex flex-col overflow-hidden ${isDarkMode ? 'bg-slate-900' : 'bg-slate-50'}`}>
               {/* Top Bar */}
               <div className={`h-16 border-b flex justify-between items-center px-6 md:px-8 ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                  <div className={`flex items-center gap-4 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'} flex-1 max-w-lg`}>
                     <Search size={20} className="flex-shrink-0" />
                     <input 
                        placeholder="搜索交易、客户或报表..." 
                        className={`bg-transparent w-full outline-none text-sm ${isDarkMode ? 'text-white placeholder-slate-600' : 'text-slate-900 placeholder-slate-400'}`}
                        onKeyDown={(e) => e.key === 'Enter' && showToast(`正在搜索: ${e.currentTarget.value}`)}
                     />
                  </div>
                  <div className="flex items-center gap-3 sm:gap-4">
                     {/* Theme Toggle */}
                     <button 
                        onClick={() => setIsDarkMode(!isDarkMode)}
                        className={`p-2 rounded-full transition-colors ${isDarkMode ? 'hover:bg-slate-800 text-yellow-400' : 'hover:bg-slate-100 text-slate-400'}`}
                        title="切换日/夜模式"
                     >
                        {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
                     </button>

                     {/* Edit Layout Toggle */}
                     <button 
                        onClick={() => { setIsEditMode(!isEditMode); showToast(isEditMode ? "已保存布局" : "进入编辑模式"); }}
                        className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${isEditMode ? 'bg-blue-600 text-white shadow-md' : isDarkMode ? 'text-slate-400 hover:bg-slate-800' : 'text-slate-600 hover:bg-slate-100'}`}
                     >
                        {isEditMode ? <CheckCircle2 size={14} /> : <Settings size={14} />}
                        <span>{isEditMode ? '完成' : '布局'}</span>
                     </button>

                     <div className={`h-6 w-px ${isDarkMode ? 'bg-slate-800' : 'bg-slate-200'} mx-1`}></div>

                     <button 
                        onClick={() => showToast("暂无新通知")}
                        className={`p-2 rounded-full relative transition-colors ${isDarkMode ? 'hover:bg-slate-800 text-slate-400' : 'hover:bg-slate-100 text-slate-600'}`}
                     >
                        <Bell size={18} />
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                     </button>
                     
                     <div className={`hidden sm:block h-6 w-px ${isDarkMode ? 'bg-slate-800' : 'bg-slate-200'} mx-1`}></div>

                     <button 
                        onClick={() => showToast("日期选择器已打开")}
                        className={`flex items-center gap-2 text-sm font-bold ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}
                     >
                        <CalendarDropdown darkMode={isDarkMode} />
                     </button>
                  </div>
               </div>

               {/* Dynamic Page Content */}
               <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
                  <div className="flex justify-between items-end mb-8">
                     <div>
                        <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                            {activeTab === 'overview' && '仪表盘总览'}
                            {activeTab === 'analytics' && '数据分析'}
                            {activeTab === 'customers' && '客户管理'}
                            {activeTab === 'finance' && '财务报表'}
                        </h2>
                        <p className={`text-sm mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                            {activeTab === 'overview' && '实时更新企业全域核心指标数据。'}
                            {activeTab === 'analytics' && '深度洞察业务增长趋势与用户行为。'}
                            {activeTab === 'customers' && '管理您的用户群与订阅状态。'}
                            {activeTab === 'finance' && '查看近期收入、支出与税务报表。'}
                        </p>
                     </div>
                     <div className="flex gap-2">
                        <button onClick={() => showToast("筛选面板已展开")} className={`p-2 border rounded-lg hover:bg-slate-50 transition-colors ${isDarkMode ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700' : 'bg-white border-slate-200 text-slate-600'}`}><Filter size={18} /></button>
                        <button onClick={() => showToast("报表导出中...")} className={`p-2 border rounded-lg hover:bg-slate-50 transition-colors ${isDarkMode ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700' : 'bg-white border-slate-200 text-slate-600'}`}><Download size={18} /></button>
                        <button onClick={() => showToast("组件库已打开")} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30">
                           <Plus size={16} /> 添加组件
                        </button>
                     </div>
                  </div>

                  {/* Render Content Based on Tab */}
                  {activeTab === 'overview' && renderOverview()}
                  {activeTab === 'analytics' && renderAnalytics()}
                  {activeTab === 'customers' && renderCustomers()}
                  {activeTab === 'finance' && renderFinance()}
               </div>
            </div>
         </div>
      </section>

      {/* 3. AI Smart Insights */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8">
         <div className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-[3rem] p-12 lg:p-20 text-white overflow-hidden relative shadow-2xl">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-[100px] pointer-events-none"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
               <div className="space-y-8">
                  <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full border border-white/10">
                     <Sparkles size={16} className="text-yellow-400" />
                     <span className="text-xs font-bold uppercase tracking-widest">Nexus 智能助手</span>
                  </div>
                  <h3 className="text-4xl lg:text-5xl font-black leading-tight">
                     像分析师一样思考 <br /> 
                     <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300">像对话一样简单</span>
                  </h3>
                  <p className="text-indigo-200 text-lg leading-relaxed">
                     内置 NL2SQL (自然语言转 SQL) 引擎。无需学习复杂的查询语句，直接用自然语言提问，AI 将自动生成可视化图表并分析数据异动原因。
                  </p>
                  <div className="flex flex-wrap gap-3">
                     {['分析上周用户流失的主要原因', '对比 Q3 与 Q4 的营收增长趋势', '预测下个月的服务器负载峰值'].map((q, i) => (
                        <button 
                            key={i} 
                            onClick={() => handleAiAsk(q)}
                            className="px-4 py-2 bg-white/10 rounded-full text-sm font-medium border border-white/10 hover:bg-white/20 cursor-pointer transition-colors text-left"
                        >
                           "{q}"
                        </button>
                     ))}
                  </div>
               </div>

               <div className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/10 p-6 flex flex-col gap-4 shadow-2xl min-h-[400px]">
                  {/* Chat Interface Simulation */}
                  <div className="flex-1 space-y-4">
                      {/* User Query */}
                      <div className={`flex gap-4 transition-all duration-500 ${aiQuery ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                        <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center flex-shrink-0">
                            <Users size={20} />
                        </div>
                        <div className="bg-indigo-900/50 p-4 rounded-2xl rounded-tl-none border border-indigo-500/30">
                            <p className="text-sm">{aiQuery || "帮我分析一下为什么周三的流量突然下降了？"}</p>
                        </div>
                      </div>

                      {/* AI Thinking */}
                      {aiThinking && (
                          <div className="flex gap-4 flex-row-reverse animate-pulse">
                             <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center flex-shrink-0">
                                <Bot size={20} />
                             </div>
                             <div className="bg-white/10 p-4 rounded-2xl rounded-tr-none text-white/50 text-sm">
                                AI 正在分析数据...
                             </div>
                          </div>
                      )}

                      {/* AI Response (Default or New) */}
                      {(!aiQuery || aiResult) && (
                        <div className={`flex gap-4 flex-row-reverse transition-all duration-500 ${aiResult || !aiQuery ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 hidden'}`}>
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0 shadow-lg">
                                <Bot size={20} />
                            </div>
                            <div className="bg-white p-4 rounded-2xl rounded-tr-none text-slate-800 shadow-lg w-full max-w-md">
                                <div className="flex items-center gap-2 mb-3">
                                <Sparkles size={16} className="text-purple-600" />
                                <span className="text-xs font-bold text-purple-600 uppercase">AI 智能分析</span>
                                </div>
                                <p className="text-sm mb-4">
                                {aiResult ? "已为您生成分析报告。数据显示该时间段服务器响应延迟增加了 400ms，导致移动端用户跳出率上升 15%。" : "检测到周三 14:00 - 16:00 期间，移动端入口 (Mobile API) 的响应时间增加了 400ms，导致跳出率上升了 15%。"}
                                </p>
                                {/* Mini Chart */}
                                <div className="h-24 bg-slate-50 rounded-lg border border-slate-100 relative flex items-end justify-between px-2 pb-2">
                                {[40, 42, 45, 80, 20, 25, 40, 45, 50, 48].map((h, i) => (
                                    <div key={i} className={`w-full mx-0.5 rounded-sm ${i === 4 || i === 5 ? 'bg-red-400' : 'bg-blue-400'}`} style={{ height: `${h}%` }}></div>
                                ))}
                                <div className="absolute top-2 right-2 flex gap-1">
                                    <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                                    <span className="text-[8px] text-slate-400">平均</span>
                                    <span className="w-2 h-2 rounded-full bg-red-400 ml-1"></span>
                                    <span className="text-[8px] text-slate-400">异常</span>
                                </div>
                                </div>
                            </div>
                        </div>
                      )}
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* 4. Design System / Component Library */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16">
         <div className="space-y-8">
            <div>
               <h3 className="text-3xl font-bold text-slate-900 mb-2">原子设计系统 (Atomic Design)</h3>
               <p className="text-slate-500 leading-relaxed">
                  为了保证系统的一致性与可维护性，我们构建了一套基于原子设计理论的组件库。从最小的 Token 到复杂的业务组件，每个元素都经过精细打磨。
               </p>
            </div>
            
            <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
               <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">基础与原子 (Foundations & Atoms)</h4>
               <div className="grid grid-cols-2 gap-8">
                  {components.map((comp, i) => (
                     <div key={i} className="flex flex-col gap-2">
                        <div className="h-16 bg-slate-50 rounded-lg flex items-center justify-center border border-slate-100">
                           {comp.visual}
                        </div>
                        <div className="flex justify-between items-center">
                           <span className="text-sm font-bold text-slate-700">{comp.name}</span>
                           <span className="text-[10px] text-slate-400 bg-slate-100 px-2 py-0.5 rounded">{comp.type}</span>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </div>

         <div className="space-y-8">
            <div>
               <h3 className="text-3xl font-bold text-slate-900 mb-2">设计变量 (Tokens)</h3>
               <p className="text-slate-500 leading-relaxed">
                  定义了语义化的色彩、排版与间距系统，支持一键切换深色模式与品牌主题。
               </p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm space-y-6">
               <div className="space-y-3">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">色彩规范 (Palette)</span>
                  <div className="flex gap-2">
                     {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map(shade => (
                        <div key={shade} className={`h-8 flex-1 rounded bg-blue-${shade} hover:scale-110 transition-transform cursor-pointer`} title={`Blue-${shade}`} onClick={() => showToast(`复制色值: Blue-${shade}`)}></div>
                     ))}
                  </div>
                  <div className="flex gap-2">
                     {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map(shade => (
                        <div key={shade} className={`h-8 flex-1 rounded bg-slate-${shade} hover:scale-110 transition-transform cursor-pointer`} title={`Slate-${shade}`} onClick={() => showToast(`复制色值: Slate-${shade}`)}></div>
                     ))}
                  </div>
               </div>

               <div className="space-y-3 pt-4 border-t border-slate-100">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">排版规范 (Typography)</span>
                  <div className="space-y-2 cursor-default">
                     <div className="text-4xl font-black text-slate-900 hover:text-blue-600 transition-colors">H1 Display Bold</div>
                     <div className="text-2xl font-bold text-slate-800 hover:text-blue-600 transition-colors">H2 Title Semibold</div>
                     <div className="text-lg font-medium text-slate-700 hover:text-blue-600 transition-colors">H3 Heading Medium</div>
                     <div className="text-base text-slate-600">正文 (Body Regular) - Nexus UI 使用 Inter 字体以确保最佳的可读性。</div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* 5. UX Case Study */}
      <section className="bg-white py-20 border-y border-slate-200">
         <div className="max-w-7xl mx-auto px-4 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
               <h3 className="text-3xl font-black text-slate-900 mb-4">解决“数据过载”</h3>
               <p className="text-lg text-slate-500">
                  在 B 端产品中，用户常常面对海量数据无从下手。我们采用了<b>“渐进式披露 (Progressive Disclosure)”</b>的设计策略。
               </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               <CaseCard 
                  icon={<Layers size={32} className="text-purple-600" />}
                  title="层级化展示"
                  desc="将信息分为：概览层（Key Metrics）、分析层（Charts）与详情层（Data Tables）。用户默认只看到最关键的指标。"
               />
               <CaseCard 
                  icon={<MousePointer2 size={32} className="text-blue-600" />}
                  title="下钻交互 (Drill-down)"
                  desc="任何图表均支持点击下钻。点击柱状图的某一根柱子，即可查看该时间段内的详细交易记录。"
               />
               <CaseCard 
                  icon={<Filter size={32} className="text-orange-600" />}
                  title="智能筛选"
                  desc="基于上下文的动态筛选器。系统会自动推荐用户最可能关心的维度（如：按地区、按活跃度）。"
               />
            </div>
         </div>
      </section>

    </div>
  );
};

// --- Helper Components ---

const DashboardCard: React.FC<{
  title: string;
  value: string;
  trend: string;
  trendUp: boolean;
  positiveReverse?: boolean;
  editMode: boolean;
  darkMode: boolean;
  delay: number;
  onMore?: () => void;
  children?: React.ReactNode;
}> = ({ title, value, trend, trendUp, positiveReverse, editMode, darkMode, delay, onMore, children }) => {
  const isPositive = positiveReverse ? !trendUp : trendUp;
  
  return (
    <div 
      className={`p-6 rounded-xl border transition-all duration-500 animate-in fade-in slide-in-from-bottom-4 ${editMode ? 'border-blue-400 border-dashed bg-blue-50/10 cursor-move' : darkMode ? 'bg-slate-800 border-slate-700 hover:bg-slate-750' : 'bg-white border-slate-200 shadow-sm hover:shadow-md'}`}
      style={{ animationDelay: `${delay}ms` }}
    >
       {editMode && <div className="mb-2 text-blue-500 flex justify-center"><GripVertical size={20} /></div>}
       <div className="flex justify-between items-start">
          <span className={`text-sm font-medium ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{title}</span>
          <button onClick={onMore} className={`${darkMode ? 'text-slate-500 hover:text-slate-300' : 'text-slate-300 hover:text-slate-600'}`}><MoreVertical size={16} /></button>
       </div>
       <div className="mt-2 flex items-baseline gap-3">
          <span className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>{value}</span>
          <span className={`text-xs font-bold flex items-center ${isPositive ? (darkMode ? 'text-emerald-400 bg-emerald-500/10' : 'text-emerald-600 bg-emerald-50') : (darkMode ? 'text-red-400 bg-red-500/10' : 'text-red-600 bg-red-50')} px-1.5 py-0.5 rounded`}>
             {trendUp ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
             {trend}
          </span>
       </div>
       {children}
    </div>
  );
};

const CalendarDropdown = ({ darkMode }: { darkMode?: boolean }) => (
  <div className={`flex items-center gap-2 cursor-pointer px-2 py-1 rounded transition-colors max-w-full ${darkMode ? 'hover:bg-slate-800' : 'hover:bg-slate-50'}`}>
     <Calendar size={16} className={`flex-shrink-0 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`} />
     <span className="whitespace-nowrap text-xs sm:text-sm hidden sm:inline">2023年10月24日 - 11月24日</span>
     <span className="whitespace-nowrap text-xs sm:text-sm sm:hidden">10/24 - 11/24</span>
     <ArrowDownRight size={14} className={`flex-shrink-0 ${darkMode ? 'text-slate-500' : 'text-slate-400'}`} />
  </div>
);

const CaseCard: React.FC<{ icon: React.ReactNode; title: string; desc: string }> = ({ icon, title, desc }) => (
   <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 hover:bg-white hover:shadow-xl transition-all group">
      <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6 group-hover:scale-110 transition-transform border border-slate-100">
         {icon}
      </div>
      <h4 className="text-xl font-bold text-slate-900 mb-3">{title}</h4>
      <p className="text-slate-500 leading-relaxed text-sm">
         {desc}
      </p>
   </div>
);
