
import React, { useState } from 'react';
import { ShieldCheck, Zap, Rocket, Gem, Users, Lock, ChevronRight, FileText } from 'lucide-react';

export const CollaborationDetail: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    type: 'UI 诊断与评估',
    budget: '',
    details: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, type, budget, details } = formData;
    
    const subject = `[私人预约] ${type} - ${name}`;
    const body = `
姓名: ${name}
项目类型: ${type}
预期预算: ${budget || '未选择'}

详细合作背景:
${details}
    `.trim();

    window.location.href = `mailto:1150504048@qq.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const services = [
    {
      title: 'UI/UX 深度诊断',
      price: '¥ 2,999 起',
      desc: '针对现有产品进行全方位的交互体验走查，输出 20+ 页专业改进报告。',
      icon: <Zap className="text-yellow-500" />
    },
    {
      title: '设计系统 (Design System)',
      price: '¥ 9,999 起',
      desc: '为您的企业打造一套可扩展的原子化组件库，提升 50% 以上的开发效率。',
      icon: <Gem className="text-purple-brand" />
    },
    {
      title: 'MVP 快速孵化设计',
      price: '按需报价',
      desc: '从 0 到 1 快速定义核心功能视觉与交互，助力项目最快 2 周内上线演示。',
      icon: <Rocket className="text-blue-500" />
    }
  ];

  const process = [
    { step: '01', title: '深度咨询', detail: '1对1沟通业务目标与核心痛点。' },
    { step: '02', title: '签署 NDA', detail: '严格保护您的商业机密与知识产权。' },
    { step: '03', title: '设计执行', detail: '敏捷迭代，每周定期同步项目进度。' },
    { step: '04', title: '交付支持', detail: '提供源文件、标注及动效参数说明。' }
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 space-y-24">
      {/* Premium Header */}
      <section className="bg-gray-900 text-white rounded-[3rem] p-12 lg:p-24 text-center space-y-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
           <div className="absolute -top-24 -left-24 w-96 h-96 bg-purple-brand rounded-full blur-[100px]"></div>
           <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-500 rounded-full blur-[100px]"></div>
        </div>
        
        <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full border border-white/10 backdrop-blur-md">
           <ShieldCheck size={16} className="text-purple-brand" />
           <span className="text-xs font-bold tracking-widest uppercase">Premium Collaboration</span>
        </div>
        
        <h2 className="text-5xl lg:text-7xl font-bold leading-tight relative z-10">
          打造具有 <span className="text-purple-brand">商业竞争力</span> <br />
          的数字产品
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto relative z-10">
          拒绝模板化设计。我将作为您的准设计合伙人，深入业务逻辑，为您的品牌注入独一无二的交互灵魂。
        </p>
      </section>

      {/* Services Grid */}
      <section className="space-y-12">
        <div className="text-center">
          <h3 className="text-3xl font-bold">合作服务模式</h3>
          <p className="text-gray-500 mt-2">点击下方选项，开启高效设计协作</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((s, i) => (
            <div key={i} className="group bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all flex flex-col justify-between h-full">
              <div>
                <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-purple-brand/10 transition-colors">
                  {/* Fixed: Cast icon to any to allow passing size prop in cloneElement which prevents TS from complaining about unknown props */}
                  {React.cloneElement(s.icon as any, { size: 32 })}
                </div>
                <h4 className="text-2xl font-bold mb-4">{s.title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">{s.desc}</p>
              </div>
              <div className="pt-8 border-t border-gray-50 mt-auto flex justify-between items-center">
                 <span className="text-xl font-black text-gray-900">{s.price}</span>
                 <ChevronRight className="text-gray-300 group-hover:text-purple-brand transition-colors" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Process Workflow */}
      <section className="bg-cream rounded-[4rem] p-12 lg:p-20">
         <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/3 space-y-6 text-center lg:text-left">
               <h3 className="text-4xl font-bold">透明且标准化的 <br /> <span className="text-purple-brand">合作流程</span></h3>
               <p className="text-gray-500">
                  我们相信，明确的流程是高效交付的前提。每一步都经过精心策划，确保项目稳步推进。
               </p>
               <div className="flex items-center gap-3 justify-center lg:justify-start">
                  <Lock size={18} className="text-purple-brand" />
                  <span className="text-sm font-bold text-gray-400 uppercase">100% 隐私安全保障</span>
               </div>
            </div>
            <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-8">
               {process.map((p, i) => (
                 <div key={i} className="bg-white p-8 rounded-[2rem] shadow-sm flex items-start gap-6">
                    <span className="text-4xl font-black text-purple-brand/10">{p.step}</span>
                    <div>
                      <h5 className="text-xl font-bold mb-2">{p.title}</h5>
                      <p className="text-gray-500 text-sm leading-relaxed">{p.detail}</p>
                    </div>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* Private Inquiry Form */}
      <section className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-4">
           <h3 className="text-3xl font-bold">发起私聊预约</h3>
           <p className="text-gray-500">提交您的初步想法，我将在 12 小时内亲自与您取得联系。</p>
        </div>
        
        <div className="bg-white p-12 rounded-[3rem] shadow-2xl border border-gray-50">
           <form className="space-y-8" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase ml-2">您的称呼 / Name</label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-8 py-5 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-purple-brand outline-none" 
                    placeholder="例如：李先生" 
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase ml-2">项目类型 / Type</label>
                  <select 
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="w-full px-8 py-5 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-purple-brand outline-none appearance-none"
                  >
                    <option>UI 诊断与评估</option>
                    <option>设计系统建设</option>
                    <option>新产品全案设计</option>
                    <option>长期设计顾问</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase ml-2">预期预算 / Budget (CNY)</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                   {['5k-10k', '10k-30k', '30k-50k', '50k+'].map((range) => (
                     <label key={range} className="relative group cursor-pointer">
                        <input 
                            type="radio" 
                            name="budget" 
                            value={range}
                            onChange={handleInputChange}
                            className="peer sr-only" 
                        />
                        <div className="text-center py-4 bg-gray-50 rounded-xl font-bold text-sm text-gray-400 peer-checked:bg-purple-brand peer-checked:text-white transition-all">
                           {range}
                        </div>
                     </label>
                   ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase ml-2">详细合作背景 / Details</label>
                <textarea 
                    name="details"
                    rows={6} 
                    value={formData.details}
                    onChange={handleInputChange}
                    className="w-full px-8 py-5 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-purple-brand outline-none resize-none" 
                    placeholder="请简述您的项目目标、目前遇到的挑战以及希望达成的设计预期..."
                    required
                ></textarea>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-6 pt-4">
                 <button type="submit" className="w-full sm:w-auto bg-black text-white px-12 py-5 rounded-2xl font-bold text-lg hover:shadow-2xl transition-all flex items-center justify-center gap-3">
                   <Users size={20} />
                   提交私人预约
                 </button>
                 <div className="flex items-center gap-2 text-gray-400 text-xs font-medium">
                    <FileText size={14} />
                    <span>自动发送保密协议草案至您的邮箱</span>
                 </div>
              </div>
           </form>
        </div>
      </section>
    </div>
  );
};
