import { useState } from 'react';
import { TopBar } from '@/components/TopBar';
import { BottomNav } from '@/components/BottomNav';
import { HomePage } from '@/pages/HomePage';
import { SchemesPage } from '@/pages/SchemesPage';
import { ChatPage } from '@/pages/ChatPage';
import { MapPage } from '@/pages/MapPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { EligibilityPage } from '@/pages/EligibilityPage';
import { AuthPage } from '@/pages/AuthPage';
import { SchemeDetail } from '@/components/SchemeDetail';
import type { Scheme } from '@/data/schemes';

const Index = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedScheme, setSelectedScheme] = useState<Scheme | null>(null);

  const handleNavigate = (tab: string) => {
    setSelectedScheme(null);
    setActiveTab(tab);
  };

  const handleSelectScheme = (scheme: Scheme) => {
    setSelectedScheme(scheme);
    setActiveTab('schemeDetail');
  };

  const handleSearch = (query: string) => {
    setActiveTab('chat');
  };

  const renderContent = () => {
    if (activeTab === 'schemeDetail' && selectedScheme) {
      return <SchemeDetail scheme={selectedScheme} onBack={() => handleNavigate('schemes')} />;
    }
    if (activeTab === 'eligibility') {
      return <EligibilityPage onSelectScheme={handleSelectScheme} onBack={() => handleNavigate('home')} />;
    }
    if (activeTab === 'auth') {
      return <AuthPage onBack={() => handleNavigate('profile')} onSuccess={() => handleNavigate('profile')} />;
    }

    switch (activeTab) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} onSelectScheme={handleSelectScheme} onSearch={handleSearch} />;
      case 'schemes':
        return <SchemesPage onSelectScheme={handleSelectScheme} />;
      case 'chat':
        return <ChatPage />;
      case 'map':
        return <MapPage />;
      case 'profile':
        return <ProfilePage onNavigate={handleNavigate} onSelectScheme={handleSelectScheme} />;
      default:
        return <HomePage onNavigate={handleNavigate} onSelectScheme={handleSelectScheme} onSearch={handleSearch} />;
    }
  };

  const navTab = ['schemeDetail', 'eligibility', 'auth'].includes(activeTab)
    ? activeTab === 'eligibility' ? 'home' : activeTab === 'auth' ? 'profile' : 'schemes'
    : activeTab;

  return (
    <div className="min-h-screen bg-background max-w-lg mx-auto">
      <TopBar />
      <main className="pt-[60px] pb-[72px]">
        {renderContent()}
      </main>
      <BottomNav active={navTab} onNavigate={handleNavigate} />
    </div>
  );
};

export default Index;
