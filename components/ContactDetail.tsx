
import React, { useState } from 'react';
import { Mail, Phone, MapPin, MessageSquare, Clock, Send, Share2, Globe, CheckCircle2 } from 'lucide-react';

export const ContactDetail: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    type: '项目设计合作',
    details: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, company, email, type, details } = formData;
    
    const subject = `[作品集咨询] ${type} - ${name}`;
    const body = `
姓名: ${name}
公司: ${company}
邮箱: ${email}
咨询意向: ${type}

详情说明:
${details}
    `.trim();

    window.location.href = `mailto:1150504048@qq.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const contactInfo = [
    { 
      title: '电子邮件', 
      value: '1150504048@qq.com', 
      icon: <Mail className="text-purple-brand" />,
      action: 'mailto:1150504048@qq.com'
    },
    { 
      title: '即时通讯', 
      value: 'WeChat: lin_designer_01', 
      icon: <MessageSquare className="text-green-500" />,
      action: '#'
    },
    { 
      title: '联系电话', 
      value: '18825046613', 
      icon: <Phone className="text-blue-500" />,
      action: 'tel:18825046613'
    },
    { 
      title: '办公地点', 
      value: '中国 · 广东 · 深圳', 
      icon: <MapPin className="text-red-500" />,
      action: '#'
    }
  ];

  const faqs = [
    { q: '目前接受新项目预约吗？', a: '是的，目前我正在寻找 2025 年第二季度的合作机会。' },
    { q: '合作流程通常是怎样的？', a: '初步沟通 -> 需求分析 -> 方案报价 -> 协议签署 -> 创意设计 -> 交付与反馈。' },
    { q: '可以提供远程合作吗？', a: '当然，我习惯于远程异步工作，并使用 Figma、Slack 和 Zoom 进行高效协作。' },
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 space-y-24 pb-20">
      {/* Hero Header */}
      <section className="text-center space-y-6 pt-10">
        <h2 className="text-5xl lg:text-7xl font-bold leading-tight">
          期待与您开启 <br />
          <span className="text-purple-brand italic underline decoration-wavy">灵感对话</span>
        </h2>
        <p className="text-gray-500 text-xl max-w-2xl mx-auto">
          无论是关于智能硬件的深度探讨，还是具体的业务合作，我都已准备好倾听。
        </p>
      </section>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left: Contact Info & Details */}
        <div className="lg:col-span-5 space-y-12">
          <div className="space-y-8">
            <h3 className="text-3xl font-bold flex items-center gap-3">
              <Share2 className="text-purple-brand" />
              连接方式
            </h3>
            <div className="grid grid-cols-1 gap-6">
              {contactInfo.map((item, i) => (
                <a 
                  key={i} 
                  href={item.action}
                  className="flex items-center gap-6 p-6 bg-gray-50 rounded-3xl hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-gray-100 group"
                >
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{item.title}</p>
                    <p className="text-lg font-bold text-gray-900">{item.value}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div className="bg-purple-brand text-white p-8 rounded-[2.5rem] space-y-6">
            <div className="flex items-center gap-3">
              <Clock className="text-white/60" />
              <h4 className="text-xl font-bold">工作时间</h4>
            </div>
            <div className="space-y-2 opacity-90">
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span>周一至周五</span>
                <span>10:00 - 19:00</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span>周六</span>
                <span>14:00 - 18:00</span>
              </div>
              <div className="flex justify-between pt-2">
                <span>周日</span>
                <span className="italic">休息中</span>
              </div>
            </div>
            <p className="text-xs text-white/60 italic font-medium">
              * 紧急项目或跨时区协作请通过邮件提前预约。
            </p>
          </div>
        </div>

        {/* Right: Message Form */}
        <div className="lg:col-span-7">
          <div className="bg-white p-10 lg:p-12 rounded-[3rem] shadow-2xl border border-gray-50 relative">
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-yellow-400 rounded-full flex items-center justify-center rotate-12 shadow-lg hidden md:flex">
              <Send className="text-black" size={32} />
            </div>
            
            <h3 className="text-3xl font-bold mb-8">发送即时讯息</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">您的称呼</label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="林先生/女士" 
                    className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-purple-brand outline-none" 
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">公司/组织</label>
                  <input 
                    type="text" 
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="您的企业名称" 
                    className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-purple-brand outline-none" 
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">联系邮箱</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="example@domain.com" 
                  className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-purple-brand outline-none" 
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">咨询意向</label>
                <select 
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-purple-brand outline-none appearance-none"
                >
                  <option>项目设计合作</option>
                  <option>设计顾问/咨询</option>
                  <option>全职机会探讨</option>
                  <option>其他事宜</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">详情说明</label>
                <textarea 
                  rows={5} 
                  name="details"
                  value={formData.details}
                  onChange={handleInputChange}
                  placeholder="请简要描述您的项目背景或具体需求..." 
                  className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-purple-brand outline-none resize-none"
                  required
                ></textarea>
              </div>
              <button 
                type="submit"
                className="w-full bg-black text-white py-6 rounded-2xl font-bold text-xl hover:bg-gray-800 transition-all flex items-center justify-center gap-3"
              >
                <Send size={20} />
                立即发送
              </button>
              <p className="text-center text-xs text-gray-400 font-medium">
                我通常会在 24 小时内回复您的邮件或消息。
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <section className="bg-gray-50 rounded-[3rem] p-12 md:p-20">
         <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h3 className="text-3xl font-bold">常见问题 / FAQ</h3>
              <p className="text-gray-500">在您发起联系前，也许这里已经有您想要的答案。</p>
            </div>
            <div className="grid grid-cols-1 gap-6">
               {faqs.map((f, i) => (
                 <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-3">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="text-purple-brand" size={20} />
                      <h4 className="text-lg font-bold text-gray-900">{f.q}</h4>
                    </div>
                    <p className="text-gray-600 leading-relaxed pl-8 italic">
                      "{f.a}"
                    </p>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* Final CTA */}
      <section className="text-center py-20 bg-cream rounded-[4rem] border-2 border-dashed border-purple-brand/20">
         <Globe className="mx-auto text-purple-brand mb-6" size={48} />
         <h3 className="text-4xl font-bold mb-4">期待跨越屏幕的握手</h3>
         <p className="text-gray-500 mb-10 text-lg">无论您身在何处，优秀的设计都能拉近我们的距离。</p>
         <div className="flex justify-center gap-6">
           <div className="text-center">
             <div className="text-2xl font-black text-gray-900">100%</div>
             <div className="text-[10px] font-bold text-gray-400 uppercase">回复率</div>
           </div>
           <div className="w-px h-10 bg-gray-200"></div>
           <div className="text-center">
             <div className="text-2xl font-black text-gray-900">&lt; 24h</div>
             <div className="text-[10px] font-bold text-gray-400 uppercase">响应时间</div>
           </div>
         </div>
      </section>
    </div>
  );
};
