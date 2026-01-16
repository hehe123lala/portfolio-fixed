
import React, { useState } from 'react';
import { 
  Wallet, CreditCard, PieChart, ArrowUpRight, ArrowDownLeft, 
  Repeat, MoreHorizontal, Bell, Shield, Smartphone, 
  ChevronLeft, Eye, EyeOff, Plus, Send, Download, 
  Wifi, Battery, Signal, User, LayoutGrid, CheckCircle2,
  TrendingUp, DollarSign, ShoppingBag, Coffee, Car, Settings
} from 'lucide-react';

export const MobileAppDetail: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'home' | 'cards' | 'insights'>('home');
  const [showBalance, setShowBalance] = useState(true);
  const [activeCard, setActiveCard] = useState(0);
  const [isFrozen, setIsFrozen] = useState(false);
  const [transferStep, setTransferStep] = useState(0); // 0: none, 1: selecting, 2: success

  // Mock Data
  const transactions = [
    { id: 1, title: 'Netflix Subscription', type: 'sub', amount: -15.99, date: 'Today', icon: <PlayIcon />, color: 'bg-red-500' },
    { id: 2, title: 'Spotify Premium', type: 'sub', amount: -9.99, date: 'Yesterday', icon: <MusicIcon />, color: 'bg-green-500' },
    { id: 3, title: 'Salary Deposit', type: 'income', amount: 4250.00, date: 'Oct 24', icon: <ArrowDownLeft />, color: 'bg-blue-500' },
    { id: 4, title: 'Uber Ride', type: 'transport', amount: -24.50, date: 'Oct 23', icon: <Car size={16} />, color: 'bg-black' },
    { id: 5, title: 'Starbucks', type: 'food', amount: -6.40, date: 'Oct 22', icon: <Coffee size={16} />, color: 'bg-green-700' },
  ];

  const cards = [
    { id: 0, type: 'Visa Infinite', number: '•••• 4242', exp: '12/28', bal: '12,450.00', color: 'from-purple-600 to-blue-600' },
    { id: 1, type: 'Mastercard Black', number: '•••• 8899', exp: '09/26', bal: '3,200.50', color: 'from-gray-900 to-black' },
  ];

  const contacts = [
    { name: 'Alex', img: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100' },
    { name: 'Sarah', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100' },
    { name: 'Mike', img: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=100' },
    { name: 'Lisa', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100' },
  ];

  const handleTransfer = () => {
    setTransferStep(2);
    setTimeout(() => setTransferStep(0), 2000);
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 space-y-24 pb-20">
      
      {/* Hero Header */}
      <section className="text-center space-y-8 max-w-4xl mx-auto pt-10">
        <div className="inline-flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full border border-blue-100">
           <Wallet size={16} className="text-blue-600" />
           <span className="text-xs font-bold text-blue-700 uppercase tracking-widest">Fintech UI Kit</span>
        </div>
        <h3 className="text-5xl lg:text-7xl font-black tracking-tight leading-tight">
          Lumina <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Wallet</span>
        </h3>
        <p className="text-gray-500 text-xl leading-relaxed max-w-2xl mx-auto">
          重新定义数字资产管理体验。我们将复杂的金融数据转化为直观的视觉语言，让每一次支付与转账都流畅如水。
        </p>
      </section>

      {/* Interactive Mockup Container */}
      <section className="bg-gray-50 rounded-[4rem] p-8 lg:p-20 overflow-hidden relative">
         <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-gray-50 to-gray-100 pointer-events-none"></div>
         
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
            
            {/* Left: Features Context */}
            <div className="space-y-12 order-2 lg:order-1">
               <div className="space-y-6">
                  <h4 className="text-3xl font-bold text-gray-900">核心交互亮点</h4>
                  <p className="text-gray-500 text-lg">
                     点击右侧手机屏幕进行交互。体验无缝的卡片切换、一键冻结安全锁以及丝滑的转账动效。
                  </p>
               </div>

               <div className="grid grid-cols-1 gap-4">
                  <button 
                    onClick={() => { setActiveTab('home'); setTransferStep(1); }}
                    className={`p-6 rounded-3xl border text-left transition-all group flex items-center gap-6 ${activeTab === 'home' && transferStep > 0 ? 'bg-white border-blue-200 shadow-xl' : 'bg-white/50 border-gray-200 hover:bg-white'}`}
                  >
                     <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                        <Send size={24} />
                     </div>
                     <div>
                        <h5 className="font-bold text-gray-900 text-lg">极速转账</h5>
                        <p className="text-sm text-gray-500">联系人快捷入口，3秒完成支付。</p>
                     </div>
                  </button>

                  <button 
                    onClick={() => setActiveTab('cards')}
                    className={`p-6 rounded-3xl border text-left transition-all group flex items-center gap-6 ${activeTab === 'cards' ? 'bg-white border-purple-200 shadow-xl' : 'bg-white/50 border-gray-200 hover:bg-white'}`}
                  >
                     <div className="w-14 h-14 rounded-2xl bg-purple-100 flex items-center justify-center text-purple-600 group-hover:scale-110 transition-transform">
                        <CreditCard size={24} />
                     </div>
                     <div>
                        <h5 className="font-bold text-gray-900 text-lg">虚拟卡管理</h5>
                        <p className="text-sm text-gray-500">多卡片 3D 堆叠切换，实时安全设置。</p>
                     </div>
                  </button>

                  <button 
                    onClick={() => setActiveTab('insights')}
                    className={`p-6 rounded-3xl border text-left transition-all group flex items-center gap-6 ${activeTab === 'insights' ? 'bg-white border-green-200 shadow-xl' : 'bg-white/50 border-gray-200 hover:bg-white'}`}
                  >
                     <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center text-green-600 group-hover:scale-110 transition-transform">
                        <PieChart size={24} />
                     </div>
                     <div>
                        <h5 className="font-bold text-gray-900 text-lg">智能账单分析</h5>
                        <p className="text-sm text-gray-500">自动分类支出，可视化财务报表。</p>
                     </div>
                  </button>
               </div>
            </div>

            {/* Right: The Phone Mockup */}
            <div className="flex justify-center order-1 lg:order-2">
               <div className="w-[360px] h-[720px] bg-black rounded-[3.5rem] border-[10px] border-gray-900 shadow-2xl relative overflow-hidden ring-1 ring-gray-200">
                  {/* Dynamic Island */}
                  <div className="absolute top-5 left-1/2 -translate-x-1/2 w-28 h-8 bg-black rounded-full z-30 flex items-center justify-center gap-2">
                     <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                  </div>

                  {/* App Content */}
                  <div className="h-full bg-gray-50 pt-16 pb-8 overflow-hidden flex flex-col relative font-sans text-gray-900">
                     
                     {/* --- VIEW: HOME --- */}
                     {activeTab === 'home' && (
                        <div className="flex-1 flex flex-col px-6 overflow-y-auto no-scrollbar animate-in fade-in slide-in-from-right-8 duration-300">
                           {/* Header */}
                           <div className="flex justify-between items-center mb-8">
                              <div className="flex items-center gap-3">
                                 <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden border-2 border-white">
                                    <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100" className="w-full h-full object-cover" />
                                 </div>
                                 <div>
                                    <div className="text-xs text-gray-400 font-bold">Welcome back</div>
                                    <div className="font-bold text-gray-900">Alex Chen</div>
                                 </div>
                              </div>
                              <div className="p-2 bg-white rounded-full shadow-sm border border-gray-100">
                                 <Bell size={20} className="text-gray-600" />
                              </div>
                           </div>

                           {/* Main Balance Card */}
                           <div className="bg-gradient-to-br from-gray-900 to-black rounded-[2rem] p-6 text-white shadow-xl mb-8 relative overflow-hidden group cursor-pointer" onClick={() => setShowBalance(!showBalance)}>
                              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 rounded-full blur-[60px] opacity-30 group-hover:opacity-50 transition-opacity"></div>
                              <div className="relative z-10">
                                 <div className="flex justify-between items-start mb-4">
                                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Total Balance</span>
                                    {showBalance ? <Eye size={16} className="text-gray-400" /> : <EyeOff size={16} className="text-gray-400" />}
                                 </div>
                                 <div className="text-4xl font-black mb-6 tracking-tight">
                                    {showBalance ? '$24,500.80' : '••••••••'}
                                 </div>
                                 <div className="flex gap-4">
                                    <button onClick={(e) => {e.stopPropagation(); setTransferStep(1)}} className="flex-1 bg-white/20 backdrop-blur-md rounded-xl py-3 flex items-center justify-center gap-2 text-sm font-bold hover:bg-white/30 transition-colors">
                                       <ArrowUpRight size={16} /> Send
                                    </button>
                                    <button className="flex-1 bg-white/20 backdrop-blur-md rounded-xl py-3 flex items-center justify-center gap-2 text-sm font-bold hover:bg-white/30 transition-colors">
                                       <Plus size={16} /> Add
                                    </button>
                                 </div>
                              </div>
                           </div>

                           {/* Send Money Sheet (Conditional) */}
                           {transferStep === 1 && (
                              <div className="absolute inset-x-4 top-32 bg-white rounded-[2rem] shadow-2xl p-6 z-20 animate-in zoom-in-95 duration-200 border border-gray-100">
                                 <div className="flex justify-between items-center mb-6">
                                    <h4 className="font-bold text-lg">Send to</h4>
                                    <button onClick={() => setTransferStep(0)} className="p-1 bg-gray-100 rounded-full"><ChevronLeft size={16}/></button>
                                 </div>
                                 <div className="flex justify-between mb-6">
                                    <div className="flex flex-col items-center gap-2 cursor-pointer">
                                       <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center border-2 border-dashed border-gray-300">
                                          <Plus size={20} className="text-gray-400" />
                                       </div>
                                       <span className="text-xs font-bold text-gray-500">New</span>
                                    </div>
                                    {contacts.map((c, i) => (
                                       <div key={i} className="flex flex-col items-center gap-2 cursor-pointer group" onClick={handleTransfer}>
                                          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-transparent group-hover:border-blue-500 transition-all">
                                             <img src={c.img} className="w-full h-full object-cover" />
                                          </div>
                                          <span className="text-xs font-bold text-gray-700">{c.name}</span>
                                       </div>
                                    ))}
                                 </div>
                              </div>
                           )}

                           {transferStep === 2 && (
                              <div className="absolute inset-0 bg-white/90 backdrop-blur-xl z-30 flex flex-col items-center justify-center animate-in fade-in duration-300">
                                 <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center shadow-lg mb-6 animate-bounce">
                                    <CheckCircle2 size={40} className="text-white" />
                                 </div>
                                 <h3 className="text-2xl font-black text-gray-900 mb-2">Sent Successfully!</h3>
                                 <p className="text-gray-500 font-bold">$120.00 to Alex</p>
                              </div>
                           )}

                           {/* Recent Transactions */}
                           <div className="flex-1">
                              <div className="flex justify-between items-center mb-4">
                                 <h4 className="font-bold text-lg">Recent Activity</h4>
                                 <span className="text-xs font-bold text-blue-600 cursor-pointer">See all</span>
                              </div>
                              <div className="space-y-4">
                                 {transactions.map((t) => (
                                    <div key={t.id} className="flex items-center justify-between p-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                                       <div className="flex items-center gap-4">
                                          <div className={`w-10 h-10 rounded-full ${t.color} flex items-center justify-center text-white shadow-sm`}>
                                             {t.icon}
                                          </div>
                                          <div>
                                             <div className="font-bold text-sm text-gray-900">{t.title}</div>
                                             <div className="text-xs text-gray-400 font-bold">{t.date}</div>
                                          </div>
                                       </div>
                                       <div className={`font-bold text-sm ${t.amount > 0 ? 'text-green-600' : 'text-gray-900'}`}>
                                          {t.amount > 0 ? '+' : ''}{t.amount.toFixed(2)}
                                       </div>
                                    </div>
                                 ))}
                              </div>
                           </div>
                        </div>
                     )}

                     {/* --- VIEW: CARDS --- */}
                     {activeTab === 'cards' && (
                        <div className="flex-1 flex flex-col px-6 animate-in slide-in-from-right-8 duration-300">
                           <h2 className="text-2xl font-black mb-8">My Cards</h2>
                           
                           {/* Card Carousel */}
                           <div className="relative h-56 mb-8 perspective-1000">
                              {cards.map((card, i) => {
                                 const isActive = activeCard === i;
                                 return (
                                    <div 
                                       key={card.id}
                                       onClick={() => setActiveCard(i)}
                                       className={`absolute inset-x-0 h-48 rounded-2xl bg-gradient-to-br ${card.color} p-6 text-white shadow-2xl transition-all duration-500 cursor-pointer border border-white/10 flex flex-col justify-between overflow-hidden`}
                                       style={{ 
                                          transform: isActive ? 'translateY(0) scale(1)' : `translateY(${20 * (i+1)}px) scale(${1 - (i*0.05)})`,
                                          zIndex: isActive ? 10 : 0,
                                          opacity: isActive ? 1 : 0.5
                                       }}
                                    >  
                                       {/* Noise Texture */}
                                       <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
                                       
                                       <div className="relative z-10 flex justify-between items-start">
                                          <span className="font-bold tracking-widest uppercase text-sm opacity-80">{card.type}</span>
                                          <Wifi size={20} className="rotate-90 opacity-80" />
                                       </div>
                                       <div className="relative z-10">
                                          <div className="text-2xl font-mono tracking-widest mb-4">{card.number}</div>
                                          <div className="flex justify-between items-end">
                                             <div className="flex flex-col">
                                                <span className="text-[8px] uppercase opacity-60">Card Holder</span>
                                                <span className="font-bold text-sm">ALEX CHEN</span>
                                             </div>
                                             <div className="flex flex-col items-end">
                                                <span className="text-[8px] uppercase opacity-60">Expires</span>
                                                <span className="font-bold text-sm">{card.exp}</span>
                                             </div>
                                          </div>
                                       </div>
                                    </div>
                                 )
                              })}
                           </div>

                           {/* Card Controls */}
                           <div className="bg-white rounded-[2rem] border border-gray-100 p-6 shadow-sm flex-1">
                              <div className="text-center mb-6">
                                 <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Current Balance</div>
                                 <div className="text-3xl font-black text-gray-900">${cards[activeCard].bal}</div>
                              </div>
                              
                              <div className="grid grid-cols-2 gap-4">
                                 <button 
                                    onClick={() => setIsFrozen(!isFrozen)}
                                    className={`p-4 rounded-2xl border flex flex-col items-center gap-2 transition-all ${isFrozen ? 'bg-blue-600 text-white border-blue-600' : 'bg-gray-50 border-gray-100 text-gray-600 hover:bg-gray-100'}`}
                                 >
                                    <Shield size={20} />
                                    <span className="text-xs font-bold">{isFrozen ? 'Unfreeze' : 'Freeze'}</span>
                                 </button>
                                 <button className="p-4 rounded-2xl bg-gray-50 border border-gray-100 text-gray-600 flex flex-col items-center gap-2 hover:bg-gray-100">
                                    <Settings size={20} />
                                    <span className="text-xs font-bold">Settings</span>
                                 </button>
                                 <button className="p-4 rounded-2xl bg-gray-50 border border-gray-100 text-gray-600 flex flex-col items-center gap-2 hover:bg-gray-100">
                                    <Download size={20} />
                                    <span className="text-xs font-bold">Statement</span>
                                 </button>
                                 <button className="p-4 rounded-2xl bg-gray-50 border border-gray-100 text-gray-600 flex flex-col items-center gap-2 hover:bg-gray-100">
                                    <Eye size={20} />
                                    <span className="text-xs font-bold">Show Pin</span>
                                 </button>
                              </div>
                           </div>
                        </div>
                     )}

                     {/* --- VIEW: INSIGHTS --- */}
                     {activeTab === 'insights' && (
                        <div className="flex-1 flex flex-col px-6 animate-in slide-in-from-right-8 duration-300">
                           <h2 className="text-2xl font-black mb-6">Spending</h2>
                           
                           {/* Chart */}
                           <div className="h-48 flex items-end gap-2 mb-8 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                              {[60, 45, 80, 50, 90, 75, 55].map((h, i) => (
                                 <div key={i} className="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
                                    <div className="w-full bg-blue-100 rounded-t-lg relative overflow-hidden transition-all group-hover:bg-blue-200" style={{ height: `${h}%` }}>
                                       <div className="absolute bottom-0 w-full bg-blue-600 transition-all duration-1000" style={{ height: `${h}%` }}></div>
                                    </div>
                                    <span className="text-[10px] font-bold text-gray-400">
                                       {['M','T','W','T','F','S','S'][i]}
                                    </span>
                                 </div>
                              ))}
                           </div>

                           <h3 className="font-bold text-lg mb-4">Top Categories</h3>
                           <div className="space-y-4">
                              {[
                                 { label: 'Shopping', amount: '$420.00', pct: 45, color: 'bg-purple-500', icon: <ShoppingBag size={16} /> },
                                 { label: 'Food', amount: '$210.50', pct: 25, color: 'bg-orange-500', icon: <Coffee size={16} /> },
                                 { label: 'Transport', amount: '$125.00', pct: 15, color: 'bg-blue-500', icon: <Car size={16} /> },
                              ].map((cat, i) => (
                                 <div key={i} className="bg-white p-4 rounded-2xl border border-gray-100 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                       <div className={`w-10 h-10 rounded-full ${cat.color} flex items-center justify-center text-white`}>
                                          {cat.icon}
                                       </div>
                                       <div>
                                          <div className="font-bold text-sm text-gray-900">{cat.label}</div>
                                          <div className="w-24 h-1.5 bg-gray-100 rounded-full mt-1">
                                             <div className={`h-full rounded-full ${cat.color}`} style={{ width: `${cat.pct}%` }}></div>
                                          </div>
                                       </div>
                                    </div>
                                    <div className="font-bold text-sm">{cat.amount}</div>
                                 </div>
                              ))}
                           </div>
                        </div>
                     )}

                     {/* Bottom Tab Bar */}
                     <div className="absolute bottom-0 w-full h-20 bg-white border-t border-gray-100 flex justify-around items-center px-4 z-40">
                        {[
                           { id: 'home', icon: <Wallet size={24} /> },
                           { id: 'cards', icon: <CreditCard size={24} /> },
                           { id: 'insights', icon: <PieChart size={24} /> },
                           { id: 'profile', icon: <User size={24} /> }
                        ].map((tab) => (
                           <button 
                              key={tab.id}
                              onClick={() => tab.id !== 'profile' && setActiveTab(tab.id as any)}
                              className={`p-3 rounded-xl transition-all ${activeTab === tab.id ? 'text-blue-600 bg-blue-50' : 'text-gray-400 hover:text-gray-600'}`}
                           >
                              {tab.icon}
                           </button>
                        ))}
                     </div>

                     {/* Home Indicator */}
                     <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-gray-300 rounded-full z-50"></div>
                  </div>
               </div>
            </div>
         </div>
      </section>

    </div>
  );
};

// Helper Icons
const PlayIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="white" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>;
const MusicIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>;
