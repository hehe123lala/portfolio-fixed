
import React, { useState } from 'react';
import { 
  Zap, 
  Watch, 
  Headphones, 
  Layout, 
  Smartphone, 
  Layers, 
  CheckCircle2, 
  Send, 
  Calendar, 
  Briefcase,
  ChevronRight,
  ArrowRight
} from 'lucide-react';

export const InquiryDetail: React.FC = () => {
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const projectTypes = [
    { id: 'watch', name: '智能手表 UI', icon: <Watch />, desc: '表盘设计、穿戴 OS 系统交互' },
    { id: 'earphone', name: '耳机 App 交互', icon: <Headphones />, desc: '设备连接、降噪控制与 EQ 调节' },
    { id: 'app', name: '移动 App 设计', icon: <Smartphone />, desc: '健康监控、IoT 管理类应用' },
    { id: 'branding', name: '品牌视觉系统', icon: <Layers />, desc: '智能硬件品牌风格定义与规范' }
  ];

  const handleNextStep = () => {
    if (step === 1 && !selectedType) return;
    setStep(step + 1);
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 max-w-5xl mx-auto space-y-16 pb-32">
      {/* Header & Stepper */}
      <section className="text-center space-y-8">
        <div className="inline-flex items-center gap-2 bg-purple-brand/10 px-4 py-2 rounded-full">
           <Zap size={16} className="text-purple-brand" />
           <span className="text-xs font-bold text-purple-brand uppercase tracking-widest">Project Kickstart</span>
        </div>
        <h2 className="text-5xl lg:text-6xl font-black">开启您的 <span className="text-purple-brand italic">设计约稿</span></h2>
        
        {/* Progress Stepper */}
        <div className="flex items-center justify-center gap-4 pt-4">
           {[1, 2, 3].map((s) => (
             <div key={s} className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${step >= s ? 'bg-purple-brand text-white shadow-lg' : 'bg-gray-100 text-gray-400'}`}>
                   {step > s ? <CheckCircle2 size={18} /> : s}
                </div>
                {s < 3 && <div className={`h-1 w-12 rounded-full ${step > s ? 'bg-purple-brand' : 'bg-gray-100'}`}></div>}
             </div>
           ))}
        </div>
      </section>

      <div className="bg-white p-8 md:p-16 rounded-[4rem] shadow-2xl border border-gray-50 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-purple-brand/5 rounded-full blur-[80px]"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-yellow-400/10 rounded-full blur-[80px]"></div>

        {/* Step 1: Selection */}
        {step === 1 && (
          <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
             <div className="text-center space-y-2">
                <h3 className="text-3xl font-bold">第一步：选择您的项目类型</h3>
                <p className="text-gray-500">我们将根据项目类型为您匹配最专业的设计工作流。</p>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projectTypes.map((type) => (
                  <button 
                    key={type.id}
                    onClick={() => setSelectedType(type.id)}
                    className={`p-8 rounded-[2.5rem] border-2 text-left transition-all group flex items-start gap-6 ${selectedType === type.id ? 'border-purple-brand bg-purple-brand/5 shadow-xl scale-[1.02]' : 'border-gray-100 hover:border-purple-brand/30 hover:bg-gray-50'}`}
                  >
                     <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors ${selectedType === type.id ? 'bg-purple-brand text-white shadow-lg shadow-purple-brand/30' : 'bg-gray-100 text-gray-400 group-hover:text-purple-brand'}`}>
                        {React.cloneElement(type.icon as any, { size: 28 })}
                     </div>
                     <div className="space-y-1">
                        <h4 className={`text-xl font-bold ${selectedType === type.id ? 'text-purple-brand' : 'text-gray-900'}`}>{type.name}</h4>
                        <p className="text-gray-500 text-sm leading-relaxed">{type.desc}</p>
                     </div>
                  </button>
                ))}
             </div>

             <div className="flex justify-center pt-8">
                <button 
                  onClick={handleNextStep}
                  disabled={!selectedType}
                  className="bg-black text-white px-12 py-5 rounded-2xl font-bold text-lg hover:shadow-2xl transition-all flex items-center gap-3 disabled:opacity-30 disabled:cursor-not-allowed group"
                >
                   下一步
                   <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
             </div>
          </div>
        )}

        {/* Step 2: Details */}
        {step === 2 && (
          <div className="space-y-12 animate-in fade-in slide-in-from-right-4 duration-500">
             <div className="text-center space-y-2">
                <h3 className="text-3xl font-bold">第二步：完善项目细节</h3>
                <p className="text-gray-500">清晰的描述能让我们更快地进入创作状态。</p>
             </div>

             <form className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6 md:col-span-2">
                   <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest ml-4">您的项目愿景</label>
                   <textarea rows={4} className="w-full px-8 py-6 bg-gray-50 rounded-[2.5rem] border-none focus:ring-2 focus:ring-purple-brand outline-none resize-none" placeholder="请简述您的产品核心价值及您希望达成的设计风格..."></textarea>
                </div>

                <div className="space-y-6">
                   <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest ml-4">预期交付周期</label>
                   <div className="relative">
                      <Calendar className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
                      <select className="w-full pl-16 pr-8 py-5 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-purple-brand outline-none appearance-none font-medium">
                         <option>2 周（加急项目）</option>
                         <option>1 个月（标准流程）</option>
                         <option>2 个月及以上（深度打磨）</option>
                         <option>长期顾问形式</option>
                      </select>
                   </div>
                </div>

                <div className="space-y-6">
                   <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest ml-4">预算范畴 (CNY)</label>
                   <div className="relative">
                      <Briefcase className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
                      <select className="w-full pl-16 pr-8 py-5 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-purple-brand outline-none appearance-none font-medium">
                         <option>¥ 10,000 - ¥ 30,000</option>
                         <option>¥ 30,000 - ¥ 50,000</option>
                         <option>¥ 50,000 - ¥ 100,000</option>
                         <option>¥ 100,000 +</option>
                      </select>
                   </div>
                </div>
             </form>

             <div className="flex justify-between items-center pt-8">
                <button onClick={() => setStep(1)} className="text-gray-400 font-bold hover:text-gray-600 transition-colors">上一步</button>
                <button 
                  onClick={handleNextStep}
                  className="bg-black text-white px-12 py-5 rounded-2xl font-bold text-lg hover:shadow-2xl transition-all flex items-center gap-3 group"
                >
                   下一步
                   <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
             </div>
          </div>
        )}

        {/* Step 3: Contact & Submit */}
        {step === 3 && (
          <div className="space-y-12 animate-in fade-in slide-in-from-right-4 duration-500">
             <div className="text-center space-y-2">
                <h3 className="text-3xl font-bold">最后一步：联系信息</h3>
                <p className="text-gray-500">提交后，我将在 24 小时内为您准备一份初步的排期方案。</p>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                   <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-4">您的姓名</label>
                   <input className="w-full px-8 py-5 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-purple-brand outline-none" placeholder="如何称呼您" />
                </div>
                <div className="space-y-3">
                   <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-4">公司 / 组织</label>
                   <input className="w-full px-8 py-5 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-purple-brand outline-none" placeholder="项目归属企业" />
                </div>
                <div className="space-y-3">
                   <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-4">常用邮箱</label>
                   <input className="w-full px-8 py-5 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-purple-brand outline-none" placeholder="用于接收设计提案" />
                </div>
                <div className="space-y-3">
                   <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-4">微信号 / 电话</label>
                   <input className="w-full px-8 py-5 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-purple-brand outline-none" placeholder="方便更及时的沟通" />
                </div>
             </div>

             <div className="bg-purple-brand/5 p-8 rounded-3xl border border-purple-brand/10 space-y-4">
                <div className="flex items-center gap-3">
                   <CheckCircle2 className="text-purple-brand" size={20} />
                   <span className="font-bold text-sm">我承诺：</span>
                </div>
                <ul className="text-sm text-gray-500 space-y-2 list-disc pl-5">
                   <li>所有沟通过程将严格遵守 NDA 保密协议</li>
                   <li>24 小时内必回复您的约稿请求</li>
                   <li>设计过程透明，支持多轮次细节打磨</li>
                </ul>
             </div>

             <div className="flex justify-between items-center pt-8">
                <button onClick={() => setStep(2)} className="text-gray-400 font-bold hover:text-gray-600 transition-colors">上一步</button>
                <button 
                  className="bg-purple-brand text-white px-16 py-6 rounded-2xl font-black text-xl hover:shadow-[0_20px_40px_rgba(138,132,255,0.4)] transition-all flex items-center gap-4 hover:-translate-y-1"
                >
                   <Send size={24} />
                   确认提交约稿
                </button>
             </div>
          </div>
        )}
      </div>

      {/* Footer Info */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
         <div className="space-y-3">
            <h5 className="font-black text-gray-900">高质量交付</h5>
            <p className="text-sm text-gray-500">源文件包含组件库、交互动效演示及开发标注。</p>
         </div>
         <div className="space-y-3">
            <h5 className="font-black text-gray-900">定期同步</h5>
            <p className="text-sm text-gray-500">每周二、五固定通过 Figma 实时展示进度。</p>
         </div>
         <div className="space-y-3">
            <h5 className="font-black text-gray-900">完善售后</h5>
            <p className="text-sm text-gray-500">上线后 3 个月内提供免费的视觉微调支持。</p>
         </div>
      </section>
    </div>
  );
};
