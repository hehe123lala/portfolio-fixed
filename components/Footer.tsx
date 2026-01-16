
import React from 'react';
import { Rocket } from 'lucide-react';

interface FooterProps {
  onOpenDeploy?: () => void;
}

const socialLinks = [
  { name: 'Facebook', icon: 'FB', color: 'bg-blue-600' },
  { name: 'Instagram', icon: 'IG', color: 'bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600' },
  { name: 'Twitter', icon: 'TW', color: 'bg-sky-400' },
  { name: 'LinkedIn', icon: 'LD', color: 'bg-blue-700' },
  { name: 'Dribbble', icon: 'DR', color: 'bg-pink-400' },
  { name: 'Behance', icon: 'BE', color: 'bg-blue-600' },
];

export const Footer: React.FC<FooterProps> = ({ onOpenDeploy }) => {
  return (
    <footer className="bg-yellow-400 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-12 flex items-center gap-2">
           我们在 <span className="text-purple-brand">社交媒体</span> 相遇
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-20">
          {socialLinks.map((link, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl flex items-center justify-between hover:shadow-xl transition-all cursor-pointer group">
              <div>
                <span className="font-bold text-sm block">{link.name}</span>
                <span className="text-[10px] text-gray-400 uppercase font-bold">Social Profile</span>
              </div>
              <div className={`w-10 h-10 rounded-full ${link.color} flex items-center justify-center text-white font-bold group-hover:scale-110 transition-transform`}>
                {link.icon}
              </div>
            </div>
          ))}
        </div>
        
        <div className="border-t border-black/10 pt-10 flex flex-col md:flex-row justify-between items-center gap-4">
           <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-purple-brand rounded-full flex items-center justify-center">
              <span className="text-white font-bold">X</span>
            </div>
            <span className="text-xl font-bold tracking-tight">Xinny</span>
          </div>
          
          <div className="flex gap-8 text-sm font-bold opacity-60">
            <a href="#" className="hover:opacity-100">首页</a>
            <a href="#" className="hover:opacity-100">关于</a>
            <a href="#" className="hover:opacity-100">服务</a>
            <a href="#" className="hover:opacity-100">项目</a>
          </div>
          
          <div className="flex flex-col md:flex-row items-center gap-4">
            <p className="text-xs font-bold opacity-40">Copyright © 2025 Xinny. All rights reserved.</p>
            {onOpenDeploy && (
              <button 
                onClick={onOpenDeploy}
                className="flex items-center gap-1 text-[10px] font-bold bg-black/5 hover:bg-black/10 px-3 py-1.5 rounded-full transition-colors text-black/60"
              >
                <Rocket size={12} />
                <span>部署指南</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};
