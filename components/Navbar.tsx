
import React from 'react';

interface NavbarProps {
  onHome: () => void;
  onAbout: () => void;
  onServices: () => void;
  onProjects: () => void;
  onContact: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onHome, onAbout, onServices, onProjects, onContact }) => {
  return (
    <nav className="sticky top-0 z-50 bg-cream/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-2 cursor-pointer" onClick={onHome}>
            <div className="w-10 h-10 bg-purple-brand rounded-full flex items-center justify-center shadow-lg shadow-purple-brand/20">
              <span className="text-white font-bold text-xl">M</span>
            </div>
            <span className="text-2xl font-bold tracking-tight text-gray-900">McCullum</span>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center space-x-1">
              <button onClick={onHome} className="px-5 py-2 rounded-full hover:bg-black/5 text-sm font-bold text-gray-600 hover:text-black transition-all">首页</button>
              <button onClick={onAbout} className="px-5 py-2 rounded-full hover:bg-black/5 text-sm font-bold text-gray-600 hover:text-black transition-all">关于</button>
              <button onClick={onProjects} className="px-5 py-2 rounded-full hover:bg-black/5 text-sm font-bold text-gray-600 hover:text-black transition-all">作品</button>
              <button onClick={onServices} className="px-5 py-2 rounded-full hover:bg-black/5 text-sm font-bold text-gray-600 hover:text-black transition-all">服务</button>
            </div>

            <button 
              onClick={onContact}
              className="bg-black text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-gray-800 transition-all hover:scale-105 hover:shadow-lg"
            >
              联系我
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
