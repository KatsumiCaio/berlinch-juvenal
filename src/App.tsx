/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { TabType, Excuse, HonoraryTitle, ReactionCounts, DossierItem, VoteCategory, MemePost } from './types';
import { storage } from './utils/storage';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { Toast } from './components/Toast';
import { ShareModal } from './components/ShareModal';
import { ModoLoucoModal } from './components/ModoLoucoModal';
import { ImageViewerModal } from './components/ImageViewerModal';
import { AddExcuseModal } from './components/AddExcuseModal';
import { AddTitleModal } from './components/AddTitleModal';
import { BadgeGeneratorModal } from './components/BadgeGeneratorModal';
import { StatusPickerModal } from './components/StatusPickerModal';

import { HallFamaTab } from './tabs/HallFamaTab';
import { VotacaoTab } from './tabs/VotacaoTab';
import { DossieTab } from './tabs/DossieTab';
import { MuralTab } from './tabs/MuralTab';
import { PerfilTab } from './tabs/PerfilTab';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('hall-da-fama');

  // Application Data
  const [stats, setStats] = useState(() => storage.getStats());
  const [excuses, setExcuses] = useState<Excuse[]>(() => storage.getExcuses());
  const [titles, setTitles] = useState<HonoraryTitle[]>(() => storage.getTitles());
  const [dossiers, setDossiers] = useState<DossierItem[]>(() => storage.getDossiers());
  const [voteCategories, setVoteCategories] = useState<VoteCategory[]>(() => storage.getVoteCategories());
  const [memes, setMemes] = useState<MemePost[]>(() => storage.getMemes());
  const [slackStatus, setSlackStatus] = useState<string>(() => storage.getSlackStatus());

  // Flagra reactions
  const [flagraReactions, setFlagraReactions] = useState<ReactionCounts>(() => {
    const d42 = dossiers.find((d) => d.id === 'dossier-042');
    return d42 ? d42.reactions : { heart: 482, beer: 1200, rh: 999, popcorn: 350 };
  });

  // Modal States
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isModoLoucoOpen, setIsModoLoucoOpen] = useState(false);
  const [isAddExcuseOpen, setIsAddExcuseOpen] = useState(false);
  const [isAddTitleOpen, setIsAddTitleOpen] = useState(false);
  const [isBadgeGeneratorOpen, setIsBadgeGeneratorOpen] = useState(false);
  const [isStatusPickerOpen, setIsStatusPickerOpen] = useState(false);

  // Lightbox Modal
  const [imageViewerState, setImageViewerState] = useState<{
    isOpen: boolean;
    src: string;
    videoSrc?: string;
    title: string;
    subtitle: string;
  }>({
    isOpen: false,
    src: '',
    videoSrc: undefined,
    title: '',
    subtitle: ''
  });

  // Toast State
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 2800);
  };

  // Sync state changes to storage
  const handleUpdateStats = (newStats: typeof stats) => {
    setStats(newStats);
    storage.saveStats(newStats);
  };

  const handleAddExcuse = (excuse: Excuse) => {
    const updated = [excuse, ...excuses];
    setExcuses(updated);
    storage.saveExcuses(updated);
  };

  const handleAddTitle = (title: HonoraryTitle) => {
    const updated = [title, ...titles];
    setTitles(updated);
    storage.saveTitles(updated);
  };

  const handleUpdateDossiers = (updated: DossierItem[]) => {
    setDossiers(updated);
    storage.saveDossiers(updated);
  };

  const handleUpdateVoteCategories = (updated: VoteCategory[]) => {
    setVoteCategories(updated);
    storage.saveVoteCategories(updated);
  };

  const handleUpdateMemes = (updated: MemePost[]) => {
    setMemes(updated);
    storage.saveMemes(updated);
  };

  const handleSelectSlackStatus = (status: string) => {
    setSlackStatus(status);
    storage.saveSlackStatus(status);
  };

  const handleUpdateFlagraReactions = (reactions: ReactionCounts) => {
    setFlagraReactions(reactions);
    const updatedDossiers = dossiers.map((d) => {
      if (d.id === 'dossier-042') {
        return { ...d, reactions };
      }
      return d;
    });
    setDossiers(updatedDossiers);
    storage.saveDossiers(updatedDossiers);
  };

  const openImageViewer = (src: string, title: string, subtitle: string, videoSrc?: string) => {
    setImageViewerState({
      isOpen: true,
      src,
      videoSrc,
      title,
      subtitle
    });
  };

  return (
    <div className="min-h-screen bg-[#0b1326] text-[#dae2fd] font-['Plus_Jakarta_Sans'] flex flex-col relative overflow-x-hidden">
      {/* Header */}
      <Header
        onOpenModoLouco={() => setIsModoLoucoOpen(true)}
        onOpenProfile={() => setIsBadgeGeneratorOpen(true)}
        isModoLoucoActive={isModoLoucoOpen}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-lg mx-auto px-4 pt-20 pb-28">
        {activeTab === 'hall-da-fama' && (
          <HallFamaTab
            stats={stats}
            onUpdateStats={handleUpdateStats}
            excuses={excuses}
            onOpenAddExcuse={() => setIsAddExcuseOpen(true)}
            titles={titles}
            onOpenAddTitle={() => setIsAddTitleOpen(true)}
            onOpenShare={() => setIsShareModalOpen(true)}
            onOpenModoLouco={() => setIsModoLoucoOpen(true)}
            onOpenStatusPicker={() => setIsStatusPickerOpen(true)}
            slackStatus={slackStatus}
            flagraReactions={flagraReactions}
            onUpdateFlagraReactions={handleUpdateFlagraReactions}
            onOpenImageViewer={openImageViewer}
            onShowToast={showToast}
          />
        )}

        {activeTab === 'votacao-ao-vivo' && (
          <VotacaoTab
            categories={voteCategories}
            onUpdateCategories={handleUpdateVoteCategories}
            onShowToast={showToast}
          />
        )}

        {activeTab === 'arquivo-confidencial' && (
          <DossieTab
            dossiers={dossiers}
            onUpdateDossiers={handleUpdateDossiers}
            onOpenImageViewer={openImageViewer}
            onShowToast={showToast}
          />
        )}

        {activeTab === 'mural-de-memes' && (
          <MuralTab
            memes={memes}
            onUpdateMemes={handleUpdateMemes}
            onShowToast={showToast}
          />
        )}

        {activeTab === 'perfil-da-lenda' && (
          <PerfilTab
            onOpenBadgeGenerator={() => setIsBadgeGeneratorOpen(true)}
            onOpenModoLouco={() => setIsModoLoucoOpen(true)}
            onShowToast={showToast}
          />
        )}
      </main>

      {/* Bottom Navigation */}
      <BottomNav
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        unreadDossiersCount={0}
      />

      {/* Modals */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        onShowToast={showToast}
      />

      <ModoLoucoModal
        isOpen={isModoLoucoOpen}
        onClose={() => setIsModoLoucoOpen(false)}
        onAddMoralSupport={(amount) => {
          handleUpdateStats({
            ...stats,
            apoioMoralCount: stats.apoioMoralCount + amount
          });
        }}
        onShowToast={showToast}
      />

      <ImageViewerModal
        isOpen={imageViewerState.isOpen}
        onClose={() =>
          setImageViewerState((prev) => ({ ...prev, isOpen: false }))
        }
        imageSrc={imageViewerState.src}
        videoSrc={imageViewerState.videoSrc}
        title={imageViewerState.title}
        subtitle={imageViewerState.subtitle}
        onShowToast={showToast}
      />

      <AddExcuseModal
        isOpen={isAddExcuseOpen}
        onClose={() => setIsAddExcuseOpen(false)}
        onAddExcuse={handleAddExcuse}
        onShowToast={showToast}
      />

      <AddTitleModal
        isOpen={isAddTitleOpen}
        onClose={() => setIsAddTitleOpen(false)}
        onAddTitle={handleAddTitle}
        onShowToast={showToast}
      />

      <BadgeGeneratorModal
        isOpen={isBadgeGeneratorOpen}
        onClose={() => setIsBadgeGeneratorOpen(false)}
        onShowToast={showToast}
      />

      <StatusPickerModal
        isOpen={isStatusPickerOpen}
        onClose={() => setIsStatusPickerOpen(false)}
        currentStatus={slackStatus}
        onSelectStatus={handleSelectSlackStatus}
        onShowToast={showToast}
      />

      {/* Floating Toast Notification */}
      <Toast message={toastMessage} />
    </div>
  );
}
