
import React, { useState } from 'react';
import { X, Rocket, UploadCloud, Zap, Github, ArrowRight, CheckCircle2, Globe, Command, FolderOutput, AlertTriangle, MousePointerClick, Laptop, RefreshCw } from 'lucide-react';

interface DeploymentGuideProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DeploymentGuide: React.FC<DeploymentGuideProps> = ({ isOpen, onClose }) => {
  // Only one mode needed now: The "No Code" path is the best for this user
  const [step, setStep] = useState(1);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="bg-white w-full max-w-4xl rounded-[2.5rem] shadow-2xl overflow-hidden relative flex flex-col animate-in zoom-in-95 duration-300 h-[85vh] md:h-[80vh]">
        
        {/* Header */}
        <div className="p-6 md:p-8 pb-4 flex justify-between items-center bg-gray-50 border-b border-gray-100 flex-shrink-0">
          <div>
            <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
              <Laptop size={14} /> 无需代码环境
            </div>
            <h2 className="text-2xl font-black text-gray-900">
              云端部署教程 (免费)
            </h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="flex flex-1 overflow-hidden flex-col md:flex-row">
            {/* Steps Sidebar */}
            <div className="md:w-1/3 bg-gray-50 p-4 space-y-3 border-r border-gray-100 overflow-y-auto">
                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 px-2">操作步骤</div>
                
                {[1, 2, 3].map(s => (
                    <button 
                        key={s}
                        onClick={() => setStep(s)}
                        className={`w-full p-4 rounded-2xl text-left transition-all border-2 relative overflow-hidden group ${step === s ? 'bg-white border-purple-brand shadow-lg' : 'border-transparent hover:bg-white hover:shadow-sm'}`}
                    >
                        <div className="flex items-center gap-4 relative z-10">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step === s ? 'bg-purple-brand text-white' : 'bg-gray-200 text-gray-500'}`}>
                                {s}
                            </div>
                            <div className="font-bold text-gray-900 text-sm">
                                {s === 1 && '获取文件'}
                                {s === 2 && '上传到 GitHub'}
                                {s === 3 && 'Netlify 发布'}
                            </div>
                        </div>
                    </button>
                ))}
            </div>

            {/* Content Area */}
            <div className="flex-1 p-6 md:p-10 overflow-y-auto bg-white">
                
                {/* Step 1: Download */}
                {step === 1 && (
                    <div className="space-y-8 animate-in slide-in-from-right-8 duration-500">
                        <div className="text-center space-y-4 py-8">
                            <div className="w-20 h-20 bg-purple-50 rounded-full flex items-center justify-center mx-auto text-purple-brand mb-4">
                                <FolderOutput size={40} />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900">第一步：获取修复版源码</h3>
                            <p className="text-gray-500 max-w-md mx-auto">
                                我们已经修复了导致 Netlify 构建失败的配置问题。请重新下载最新的代码包。
                            </p>
                        </div>
                        
                        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="bg-white p-2 rounded-lg border border-gray-200 shadow-sm">
                                    <Command size={20} className="text-gray-400" />
                                </div>
                                <div className="text-sm">
                                    <p className="font-bold text-gray-900">点击右上角的按钮</p>
                                    <p className="text-gray-500">Look for "Download Project"</p>
                                </div>
                            </div>
                            <div className="text-xs font-bold bg-black text-white px-3 py-1.5 rounded">ZIP 文件</div>
                        </div>

                        <div className="p-4 bg-yellow-50 text-yellow-800 text-sm rounded-xl border border-yellow-100 flex gap-3">
                            <AlertTriangle size={18} className="flex-shrink-0" />
                            <p>下载后请<strong>解压 (Unzip)</strong> 这个文件。您会得到一个包含 `index.html`, `src` 等文件的文件夹。</p>
                        </div>

                        <button onClick={() => setStep(2)} className="w-full py-4 bg-black text-white rounded-xl font-bold hover:bg-gray-800 transition-all flex items-center justify-center gap-2">
                            我已解压，下一步 <ArrowRight size={18} />
                        </button>
                    </div>
                )}

                {/* Step 2: GitHub Upload */}
                {step === 2 && (
                    <div className="space-y-8 animate-in slide-in-from-right-8 duration-500">
                        <div className="space-y-4">
                            <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                                <Github size={28} /> 上传到 GitHub
                            </h3>
                            <p className="text-gray-500 text-sm">
                                为了确保万无一失，建议您在 GitHub 上创建一个<strong>全新的仓库</strong>来上传这些文件。
                            </p>
                        </div>

                        <div className="space-y-4 text-sm text-gray-600">
                            <div className="flex gap-4">
                                <span className="font-bold text-purple-brand text-lg">1.</span>
                                <div>
                                    <p>登录 <a href="https://github.com" target="_blank" className="text-blue-600 font-bold hover:underline">GitHub.com</a>。</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <span className="font-bold text-purple-brand text-lg">2.</span>
                                <div>
                                    <p>点击右上角的 <strong>+</strong> 号，选择 <strong>"New repository"</strong> (新建仓库)。</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <span className="font-bold text-purple-brand text-lg">3.</span>
                                <div>
                                    <p>输入一个新的名字 (例如 <code>portfolio-fixed</code>)，点击 <strong>"Create repository"</strong>。</p>
                                </div>
                            </div>
                            <div className="flex gap-4 bg-purple-50 p-4 rounded-xl border border-purple-100">
                                <span className="font-bold text-purple-brand text-lg">4.</span>
                                <div>
                                    <p className="font-bold text-gray-900 mb-1">关键步骤：</p>
                                    <p>在创建好的页面中，点击链接：<strong>"uploading an existing file"</strong>。</p>
                                    <p className="mt-2">将您刚才解压出来的<strong>所有文件</strong>拖拽到网页中，并点击绿色按钮提交。</p>
                                </div>
                            </div>
                        </div>

                        <button onClick={() => setStep(3)} className="w-full py-4 bg-black text-white rounded-xl font-bold hover:bg-gray-800 transition-all flex items-center justify-center gap-2">
                            上传完成，下一步 <ArrowRight size={18} />
                        </button>
                    </div>
                )}

                {/* Step 3: Netlify */}
                {step === 3 && (
                    <div className="space-y-8 animate-in slide-in-from-right-8 duration-500">
                        <div className="space-y-4">
                            <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                                <Globe size={28} className="text-teal-600" /> 连接 Netlify
                            </h3>
                            <p className="text-gray-500 text-sm">
                                这次构建应该会成功！
                            </p>
                        </div>

                        <div className="space-y-4 text-sm text-gray-600">
                            <div className="flex gap-4">
                                <span className="font-bold text-teal-600 text-lg">1.</span>
                                <div>
                                    <p>访问 <a href="https://app.netlify.com" target="_blank" className="text-blue-600 font-bold hover:underline">Netlify.com</a>。</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <span className="font-bold text-teal-600 text-lg">2.</span>
                                <div className="space-y-2">
                                    <p>点击 <strong className="text-black bg-teal-200 px-1 rounded">"Add new project"</strong> -> <strong>"Import from GitHub"</strong>。</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <span className="font-bold text-teal-600 text-lg">3.</span>
                                <div>
                                    <p>选择您刚才新建的那个仓库 (例如 <code>portfolio-fixed</code>)。</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <span className="font-bold text-teal-600 text-lg">4.</span>
                                <div>
                                    <p>直接点击底部的 <strong>"Deploy"</strong> 按钮。</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-yellow-50 p-6 rounded-2xl border border-yellow-100 flex gap-3">
                            <RefreshCw size={20} className="text-yellow-700 flex-shrink-0" />
                            <div>
                                <h4 className="font-bold text-yellow-900 text-sm">如果仍然失败？</h4>
                                <p className="text-yellow-800 text-xs mt-1">
                                    请在 Netlify 的部署详情页，点击 <strong>"Retry deploy"</strong> -> <strong>"Clear cache and deploy site"</strong>。
                                </p>
                            </div>
                        </div>
                        
                        <div className="text-center pt-4">
                            <a href="https://app.netlify.com" target="_blank" className="inline-flex items-center gap-2 text-blue-600 font-bold hover:underline">
                                去 Netlify 查看状态 <ArrowRight size={16} />
                            </a>
                        </div>
                    </div>
                )}

            </div>
        </div>
      </div>
    </div>
  );
};
