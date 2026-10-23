import React from 'react';
import { TabType } from '../types';
import { soundEffects } from '../utils/audio';

interface BottomNavProps {
  activeTab: TabType;
  onSelectTab: (tab: TabType) => void;
  unreadDossiersCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onSelectTab,
  unreadDossiersCount = 1
}) => {
  const tabs = [
    {
      id: 'hall-da-fama' as TabType,
      label: 'Hall Fama',
      icon: 'military_tech'
    },
    {
      id: 'votacao-ao-vivo' as TabType,
      label: 'Votar',
      icon: 'how_to_vote'
    },
    {
      id: 'arquivo-confidencial' as TabType,
      label: 'Dossiê',
      icon: 'folder_special',
      badge: unreadDossiersCount > 0 ? 'NOVO' : undefined
    },
    {
      id: 'mural-de-memes' as TabType,
      label: 'Mural',
      icon: 'mood'
    },
    {
      id: 'perfil-da-lenda' as TabType,
      label: 'Perfil',
      icon: 'smart_toy'
    }
  ];

  const handleTabClick = (tabId: TabType) => {
    soundEffects.playPop();
    onSelectTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="fixed bottom-0 w-full z-50 pb-safe bg-[#060e20]/95 backdrop-blur-xl border-t border-white/5 shadow-[0_-4px_24px_rgba(0,0,0,0.4)]">
      <div className="flex justify-around items-center h-16 max-w-lg mx-auto px-1">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`relative flex flex-col items-center justify-center min-w-[56px] min-h-[44px] transition-all duration-200 active:scale-95 ${
                isActive
                  ? 'text-[#4edea3] scale-105 font-bold drop-shadow-[0_0_10px_rgba(78,222,163,0.5)]'
                  : 'text-[#bbcabf] hover:text-[#dae2fd]'
              }`}
            >
              {tab.badge && !isActive && (
                <span className="absolute -top-1 right-2 px-1 py-0.2 bg-[#ffb4ab] text-[#690005] text-[9px] font-black rounded-full animate-bounce">
                  {tab.badge}
                </span>
              )}
              <span className="material-symbols-outlined text-[24px]">
                {tab.icon}
              </span>
              <span className="font-['Space_Grotesk'] text-[10px] tracking-wide mt-0.5">
                {tab.label}
              </span>
              {isActive && (
                <span className="absolute -bottom-1.5 w-6 h-1 rounded-full bg-[#4edea3] shadow-[0_0_8px_#4edea3]" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
