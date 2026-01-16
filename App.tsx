
import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Stats } from './components/Stats';
import { ProjectsSection } from './components/ProjectsSection';
import { SmartwatchDetail } from './components/SmartwatchDetail';
import { EarphoneDetail } from './components/EarphoneDetail';
import { SmartGlassesDetail } from './components/SmartGlassesDetail';
import { SmartRingDetail } from './components/SmartRingDetail';
import { SmartHomeDetail } from './components/SmartHomeDetail';
import { DroneControlDetail } from './components/DroneControlDetail';
import { AiLabDetail } from './components/AiLabDetail';
import { SaasDashboardDetail } from './components/SaasDashboardDetail';
import { EvHmiDetail } from './components/EvHmiDetail';
import { MobileAppDetail } from './components/MobileAppDetail';
import { AboutMeDetail } from './components/AboutMeDetail';
import { ContactDetail } from './components/ContactDetail';
import { CollaborationDetail } from './components/CollaborationDetail';
import { InquiryDetail } from './components/InquiryDetail';
import { ProjectsListDetail } from './components/ProjectsListDetail';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { FeedbackSection } from './components/FeedbackSection';
import { DeploymentGuide } from './components/DeploymentGuide';

type View = 'home' | 'project' | 'about' | 'contact' | 'collaboration' | 'inquiry' | 'services' | 'projects_list';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('home');
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const [showDeployGuide, setShowDeployGuide] = useState(false);

  const handleNavigateHome = () => {
    setCurrentView('home');
    setActiveProjectId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProject = (id: string) => {
    setActiveProjectId(id);
    setCurrentView('project');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateAbout = () => {
    setCurrentView('about');
    setActiveProjectId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateServices = () => {
    setCurrentView('services');
    setActiveProjectId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateProjectsList = () => {
    setCurrentView('projects_list');
    setActiveProjectId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateContact = () => {
    setCurrentView('contact');
    setActiveProjectId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateInquiry = () => {
    setCurrentView('inquiry');
    setActiveProjectId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Determine background color based on project
  const isDarkProject = activeProjectId && ['ai_lab', 'ev_hmi', 'drone_control'].includes(activeProjectId);

  return (
    <div className="min-h-screen">
      <Navbar 
        onHome={handleNavigateHome} 
        onAbout={handleNavigateAbout} 
        onServices={handleNavigateServices}
        onProjects={handleNavigateProjectsList}
        onContact={handleNavigateContact}
      />
      
      <main>
        {currentView === 'home' && (
          <>
            <Hero onInquiry={handleNavigateInquiry} onViewProjects={handleNavigateProjectsList} />
            <Stats />
            <div id="projects" className="py-20 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                 <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-4">精选作品集</h2>
                    <p className="text-gray-500 max-w-2xl mx-auto">
                      专注于智能穿戴设备与声学产品的端到端交互设计，追求极致的视觉美感与流畅的健康监控体验。
                    </p>
                 </div>
                 <ProjectsSection onSelectProject={handleSelectProject} />
                 <div className="text-center mt-12">
                    <button onClick={handleNavigateProjectsList} className="text-purple-brand font-bold hover:underline">查看更多作品 →</button>
                 </div>
                 <FeedbackSection targetId="general" />
              </div>
            </div>
            <Contact />
          </>
        )}

        {currentView === 'project' && activeProjectId && (
          <div id="project-detail" className={`py-20 min-h-screen ${isDarkProject ? 'bg-[#0a0a0a]' : 'bg-white'}`}>
            <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${['saas_dashboard', 'ev_hmi', 'drone_control'].includes(activeProjectId) ? 'max-w-[1600px]' : ''}`}>
               <div className="space-y-12">
                 <button 
                   onClick={handleNavigateProjectsList}
                   className={`flex items-center font-medium hover:underline mb-8 ${isDarkProject ? 'text-white/80 hover:text-white' : 'text-purple-brand'}`}
                 >
                   ← 返回作品列表
                 </button>
                 
                 {activeProjectId === 'watch' && <SmartwatchDetail />}
                 {activeProjectId === 'earphone' && <EarphoneDetail />}
                 {activeProjectId === 'glasses' && <SmartGlassesDetail />}
                 {activeProjectId === 'health_ring' && <SmartRingDetail />}
                 {activeProjectId === 'smart_home' && <SmartHomeDetail />}
                 {activeProjectId === 'drone_control' && <DroneControlDetail />}
                 {activeProjectId === 'saas_dashboard' && <SaasDashboardDetail />}
                 {activeProjectId === 'ev_hmi' && <EvHmiDetail />}
                 {activeProjectId === 'ai_lab' && <AiLabDetail />}
                 {activeProjectId === 'mobile_banking' && <MobileAppDetail />}

                 <FeedbackSection targetId={activeProjectId} />
               </div>
            </div>
          </div>
        )}

        {currentView === 'projects_list' && (
          <div className="bg-white min-h-screen">
             <ProjectsListDetail onSelectProject={handleSelectProject} />
          </div>
        )}

        {currentView === 'about' && (
          <div id="about-detail" className="py-20 bg-white min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               <button 
                 onClick={handleNavigateHome}
                 className="flex items-center text-purple-brand font-medium hover:underline mb-8"
               >
                 ← 返回首页
               </button>
               <AboutMeDetail />
               <FeedbackSection targetId="about_me" />
            </div>
          </div>
        )}

        {currentView === 'services' && (
          <div id="services-detail" className="py-20 bg-white min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               <button 
                 onClick={handleNavigateHome}
                 className="flex items-center text-purple-brand font-medium hover:underline mb-8"
               >
                 ← 返回首页
               </button>
               <CollaborationDetail />
               <FeedbackSection targetId="collaboration_page" />
            </div>
          </div>
        )}

        {currentView === 'contact' && (
          <div id="contact-detail" className="py-20 bg-white min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               <button 
                 onClick={handleNavigateHome}
                 className="flex items-center text-purple-brand font-medium hover:underline mb-8"
               >
                 ← 返回首页
               </button>
               <ContactDetail />
               <FeedbackSection targetId="contact_page" />
            </div>
          </div>
        )}

        {currentView === 'collaboration' && (
          <div id="collaboration-detail" className="py-20 bg-white min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               <button 
                 onClick={handleNavigateHome}
                 className="flex items-center text-purple-brand font-medium hover:underline mb-8"
               >
                 ← 返回首页
               </button>
               <CollaborationDetail />
               <FeedbackSection targetId="collaboration_page" />
            </div>
          </div>
        )}

        {currentView === 'inquiry' && (
          <div id="inquiry-detail" className="py-20 bg-white min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               <button 
                 onClick={handleNavigateHome}
                 className="flex items-center text-purple-brand font-medium hover:underline mb-8"
               >
                 ← 返回首页
               </button>
               <InquiryDetail />
            </div>
          </div>
        )}
      </main>
      <Footer onOpenDeploy={() => setShowDeployGuide(true)} />
      <DeploymentGuide isOpen={showDeployGuide} onClose={() => setShowDeployGuide(false)} />
    </div>
  );
};

export default App;
