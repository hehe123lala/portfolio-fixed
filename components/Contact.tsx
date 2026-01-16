
import React from 'react';

export const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-8">
            <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
              让我们谈谈 <br /> <span className="text-purple-brand italic">特别的项目</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-md">
              我始终对新的挑战保持开放态度。无论是寻求全职合作还是项目顾问，我都非常乐意听取你的想法。
            </p>
            <div className="space-y-4">
              <a href="mailto:1150504048@qq.com" className="text-2xl font-bold block hover:text-purple-brand transition-colors">
                1150504048@qq.com
              </a>
              <p className="text-gray-500">期待与您共创未来</p>
            </div>
          </div>
          
          <div className="bg-white p-10 rounded-[2.5rem] shadow-xl">
             <form className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">您的姓名</label>
                  <input type="text" placeholder="您的名字" className="w-full px-6 py-4 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-purple-brand outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">电子邮箱</label>
                  <input type="email" placeholder="email@example.com" className="w-full px-6 py-4 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-purple-brand outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">项目详情</label>
                  <textarea rows={4} placeholder="描述您的需求或想法" className="w-full px-6 py-4 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-purple-brand outline-none resize-none"></textarea>
                </div>
                <button className="w-full bg-black text-white py-5 rounded-xl font-bold text-lg hover:bg-gray-800 transition-colors">
                  发送消息
                </button>
             </form>
          </div>
        </div>
      </div>
    </section>
  );
};
