/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { storage } from './utils/storage';
import { soundEffects } from './utils/audio';
import { Header } from './components/Header';
import { VideoFlagraCard } from './components/VideoFlagraCard';
import { ProcuradoCard } from './components/ProcuradoCard';
import { ShareModal } from './components/ShareModal';
import { ImageViewerModal } from './components/ImageViewerModal';
import { Toast } from './components/Toast';
import { StatusPickerModal } from './components/StatusPickerModal';
import { ReactionCounts } from './types';

export default function App() {
  // Core persistent data
  const [stats, setStats] = useState(() => storage.getStats());
  const [slackStatus, setSlackStatus] = useState<string>(() => storage.getSlackStatus());

  // Reactions for the kiss video
  const [reactions, setReactions] = useState<ReactionCounts>(() => {
    const d42 = storage.getDossiers().find((d) => d.id === 'dossier-042');
    return d42 ? d42.reactions : { heart: 482, beer: 1200, rh: 999, popcorn: 350 };
  });

  // Floating emoji particles from Apoio Moral
  const [floatingEmojis, setFloatingEmojis] = useState<{ id: number; char: string; left: number }[]>([]);

  // Modals
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isStatusPickerOpen, setIsStatusPickerOpen] = useState(false);
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

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 2600);
  };

  // Hero sticker click
  const handleStickerClick = () => {
    soundEffects.playAirHorn();
    soundEffects.speakQuote('Eu tô muito louco Juvena!');
    showToast('📢 "Eu tô muito louco Juvena!"');
    try {
      confetti({
        particleCount: 40,
        spread: 70,
        origin: { y: 0.3 }
      });
    } catch (e) {
      // ignore
    }
  };

  // Apoio Moral
  const handleApoioMoral = () => {
    soundEffects.playBeerClink();
    const updatedCount = stats.apoioMoralCount + 1;
    const newStats = { ...stats, apoioMoralCount: updatedCount };
    setStats(newStats);
    storage.saveStats(newStats);

    const chars = ['🍻', '☕', '❤️', '🏆', '🎉', '💸'];
    const chosen = chars[Math.floor(Math.random() * chars.length)];
    const emojiId = Date.now();
    setFloatingEmojis((prev) => [...prev, { id: emojiId, char: chosen, left: 30 + Math.random() * 40 }]);

    setTimeout(() => {
      setFloatingEmojis((prev) => prev.filter((item) => item.id !== emojiId));
    }, 1400);

    try {
      confetti({
        particleCount: 30,
        spread: 55,
        origin: { y: 0.4 }
      });
    } catch (e) {
      // ignore
    }

    showToast(`🍻 Apoio moral #${updatedCount} enviado para o Juvenal!`);
  };

  // Quick Modo Louco from top button
  const handleTopFire = () => {
    soundEffects.playAirHorn();
    try {
      confetti({
        particleCount: 100,
        spread: 90,
        origin: { y: 0.2 },
        colors: ['#4edea3', '#ffb690', '#d0bcff', '#facc15', '#ec6a06']
      });
    } catch (e) {
      // ignore
    }
    showToast('🔥 MODO 100% LOUCO ATIVADO!');
  };

  // Increment Metric
  const handleAddCoffee = () => {
    soundEffects.playPop();
    const updated = { ...stats, cafes: stats.cafes + 1 };
    setStats(updated);
    storage.saveStats(updated);
    showToast(`☕ Mais 1 café fingindo que trabalha! (${updated.cafes} cafés)`);
  };

  const handleAddRhDribble = () => {
    soundEffects.playRhAlert();
    const updated = { ...stats, rhsDriblados: stats.rhsDriblados + 1 };
    setStats(updated);
    storage.saveStats(updated);
    showToast(`🛡️ Mais 1 RH driblado no carisma! Total: ${updated.rhsDriblados}`);
  };

  return (
    <div className="min-h-screen bg-[#0b1326] text-[#dae2fd] font-['Plus_Jakarta_Sans'] flex flex-col relative overflow-x-hidden selection:bg-[#4edea3]/30 selection:text-[#4edea3]">
      {/* Header */}
      <Header
        onOpenModoLouco={handleTopFire}
        onOpenProfile={handleStickerClick}
        isModoLoucoActive={false}
      />

      {/* Floating particles from Apoio Moral */}
      {floatingEmojis.map((e) => (
        <span
          key={e.id}
          style={{ left: `${e.left}%` }}
          className="fixed bottom-36 text-3xl pointer-events-none z-50 animate-out fade-out slide-out-to-top duration-1000 transform -translate-x-1/2"
        >
          {e.char}
        </span>
      ))}

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-lg mx-auto px-4 pt-20 pb-16 flex flex-col gap-5">
        {/* HERO SPOTLIGHT: O Mito, A Lenda */}
        <div className="relative flex flex-col items-center bg-[#171f33]/75 backdrop-blur-xl border border-white/5 rounded-3xl p-4 shadow-xl overflow-hidden mt-1">
          {/* Top Status & Louco Ribbon */}
          <div className="w-full flex items-center justify-between pb-3 border-b border-white/5">
            <button
              onClick={() => setIsStatusPickerOpen(true)}
              title="Clique para alterar status"
              className="flex items-center gap-2 bg-[#222a3d] hover:bg-[#2d3449] px-2.5 py-1 rounded-full transition-colors group cursor-pointer max-w-[70%]"
            >
              <div className="relative flex items-center justify-center">
                <span className="w-2 h-2 rounded-full bg-[#4edea3] animate-ping" />
                <span className="w-2 h-2 rounded-full bg-[#4edea3] absolute" />
              </div>
              <span className="font-['Space_Grotesk'] text-[10px] text-[#4edea3] font-bold uppercase tracking-wider truncate">
                {slackStatus}
              </span>
              <span className="material-symbols-outlined text-[13px] text-[#86948a] group-hover:text-white">edit</span>
            </button>

            <button
              onClick={handleTopFire}
              className="bg-[#ec6a06]/20 hover:bg-[#ec6a06]/30 px-2.5 py-0.5 rounded-lg flex items-center gap-1 border border-[#ec6a06]/30 transition-transform active:scale-95"
            >
              <span className="material-symbols-outlined text-[#ffb690] text-[16px]">local_fire_department</span>
              <span className="font-['Space_Grotesk'] text-[10px] text-[#ffb690] font-black">100% LOUCO</span>
            </button>
          </div>

          {/* Centered Hero Cutout with Glowing Halos */}
          <div className="relative my-4 flex justify-center items-center">
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#4edea3] via-[#b090ff] to-[#ffb690] opacity-40 blur-xl scale-110" />

            {/* Rotating Decorative Badge */}
            <div className="absolute -top-2 -right-2 z-20 bg-[#ec6a06] text-[#4a1c00] px-2.5 py-1 rounded-full shadow-lg transform rotate-6 flex items-center gap-1 border border-[#ffdbca]/40">
              <span className="text-[14px]">👑</span>
              <span className="font-['Space_Grotesk'] text-[10px] font-black tracking-tight">FUNCIONÁRIO DO MÊS</span>
            </div>

            {/* Sticker Cutout Image with Sound Trigger */}
            <div
              onClick={handleStickerClick}
              title="Clique para ouvir o áudio do Juvenal"
              className="relative z-10 w-48 h-48 sm:w-56 sm:h-56 rounded-full p-1 bg-gradient-to-b from-[#4edea3] via-[#10b981] to-[#2d3449] flex items-center justify-center shadow-2xl cursor-pointer group"
            >
              <div className="w-full h-full rounded-full overflow-hidden bg-[#060e20] flex items-center justify-center relative">
                <img
                  alt="Juvena Sticker Oficial"
                  className="w-full h-full object-cover scale-105 transform group-hover:scale-110 transition-transform duration-300"
                  src="/public/assets/aistudio/Image_4_7e90b7cd.png"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors flex items-center justify-center">
                  <span className="material-symbols-outlined text-white text-3xl opacity-0 group-hover:opacity-90 drop-shadow transition-opacity">
                    volume_up
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Identity & Viral Quote Banner */}
          <div className="text-center flex flex-col items-center mt-1 w-full">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#222a3d]/90 text-[#bbcabf] font-['Space_Grotesk'] text-xs mb-2 border border-white/5">
              <span className="material-symbols-outlined text-[16px] text-[#d0bcff]">verified</span>
              <span className="font-bold tracking-wide">PATRIMÔNIO IMATERIAL DO SETOR</span>
            </div>

            <h1 className="font-['Bricolage_Grotesque'] text-[28px] sm:text-[34px] font-bold text-[#dae2fd] tracking-tight leading-none mb-2">
              O Mito, A Lenda: <span className="text-[#4edea3] font-extrabold drop-shadow-[0_0_12px_rgba(78,222,163,0.4)]">JUVENAL</span>
            </h1>

            {/* The Viral Quote Card */}
            <div
              onClick={handleStickerClick}
              title="Clique para ouvir / copiar"
              className="relative mt-2 w-full bg-gradient-to-r from-[#222a3d] via-[#31394d] to-[#222a3d] p-3 rounded-xl shadow-md transform -rotate-1 border border-white/10 cursor-pointer hover:border-[#4edea3]/40 transition-colors"
            >
              <div className="flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-[#4edea3] text-[20px]">format_quote</span>
                <span className="font-['Bricolage_Grotesque'] text-[18px] sm:text-[20px] text-[#4edea3] tracking-tight font-extrabold italic">
                  "Eu tô muito louco Juvena!"
                </span>
                <span className="material-symbols-outlined text-[#4edea3] text-[20px] scale-x-[-1]">format_quote</span>
              </div>
              <p className="font-['Space_Grotesk'] text-[10px] text-[#bbcabf] uppercase tracking-widest mt-1">
                Filosofia Corporativa Contemporânea (2024)
              </p>
            </div>

            {/* Action Buttons Bar */}
            <div className="flex items-center gap-2 w-full mt-4">
              <button
                onClick={handleApoioMoral}
                className="flex-1 bg-[#4edea3] hover:bg-[#6ffbbe] text-[#003824] py-2.5 px-3 rounded-xl font-['Space_Grotesk'] font-bold text-sm flex items-center justify-center gap-2 shadow-[0_0_16px_rgba(78,222,163,0.35)] active:scale-95 transition-transform"
              >
                <span className="material-symbols-outlined text-[20px]">volunteer_activism</span>
                <span>Apoio Moral ({stats.apoioMoralCount})</span>
              </button>

              <button
                onClick={() => setIsShareModalOpen(true)}
                className="flex-1 bg-[#222a3d] text-[#dae2fd] hover:bg-[#31394d] border border-white/5 py-2.5 px-3 rounded-xl font-['Space_Grotesk'] font-bold text-sm flex items-center justify-center gap-2 active:scale-95 transition-transform"
              >
                <span className="material-symbols-outlined text-[#d0bcff] text-[20px]">share</span>
                <span>Grupo da Firma</span>
              </button>
            </div>
          </div>
        </div>

        {/* O VÍDEO DO FLAGRA: O Beijo da Sinergia */}
        <VideoFlagraCard
          reactions={reactions}
          onUpdateReactions={(newReactions) => {
            setReactions(newReactions);
            const d = storage.getDossiers().map((item) =>
              item.id === 'dossier-042' ? { ...item, reactions: newReactions } : item
            );
            storage.saveDossiers(d);
          }}
          onOpenFullscreen={(src, title, subtitle, videoSrc) => {
            setImageViewerState({
              isOpen: true,
              src,
              videoSrc,
              title,
              subtitle
            });
          }}
          onShowToast={showToast}
        />

        {/* NOVA IMAGEM ENVIADA: MANDADO DO RH - PROCURADO */}
        <ProcuradoCard
          onOpenFullscreen={(src, title, subtitle) => {
            setImageViewerState({
              isOpen: true,
              src,
              videoSrc: undefined,
              title,
              subtitle
            });
          }}
          onAddFianca={() => {
            const updated = { ...stats, apoioMoralCount: stats.apoioMoralCount + 1 };
            setStats(updated);
            storage.saveStats(updated);
          }}
          onShowToast={showToast}
        />

        {/* MÉTRICAS DE PERFORMANCE DA AUDITORIA PARALELA */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#4edea3] text-[20px]">query_stats</span>
              <span className="font-['Bricolage_Grotesque'] text-[18px] font-bold text-[#dae2fd]">
                Métricas de Performance
              </span>
            </div>
            <span className="font-['Space_Grotesk'] text-[10px] text-[#86948a] uppercase tracking-wider font-bold">
              Auditoria Paralela
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {/* Stat 1: Cafés */}
            <div
              onClick={handleAddCoffee}
              title="Clique para adicionar +1 café"
              className="bg-[#171f33]/70 hover:bg-[#222a3d]/80 backdrop-blur-md rounded-2xl p-3 flex flex-col items-center text-center justify-between shadow-sm border border-white/5 cursor-pointer active:scale-95 transition-transform group"
            >
              <div className="w-8 h-8 rounded-lg bg-[#222a3d] flex items-center justify-center text-[#4edea3] mb-1 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[18px]">coffee</span>
              </div>
              <span className="font-['Bricolage_Grotesque'] text-2xl text-[#4edea3] font-bold tracking-tight">
                {stats.cafes}
              </span>
              <span className="font-['Space_Grotesk'] text-[10px] text-[#bbcabf] leading-tight mt-1">
                Cafés fingindo que trabalha (+1)
              </span>
            </div>

            {/* Stat 2: Sumiço */}
            <div
              onClick={() => {
                soundEffects.playAirHorn();
                showToast('🏃‍♂️ Próximo sumiço programado pontualmente para as 15h59!');
              }}
              className="bg-[#171f33]/70 hover:bg-[#222a3d]/80 backdrop-blur-md rounded-2xl p-3 flex flex-col items-center text-center justify-between shadow-sm border border-white/5 cursor-pointer active:scale-95 transition-transform"
            >
              <div className="w-8 h-8 rounded-lg bg-[#222a3d] flex items-center justify-center text-[#ffb690] mb-1">
                <span className="material-symbols-outlined text-[18px]">directions_run</span>
              </div>
              <span className="font-['Bricolage_Grotesque'] text-2xl text-[#ffb690] font-bold tracking-tight">
                {stats.sextouPercent}%
              </span>
              <span className="font-['Space_Grotesk'] text-[10px] text-[#bbcabf] leading-tight mt-1">
                Sumiço às 16h de sexta
              </span>
            </div>

            {/* Stat 3: RHs driblados */}
            <div
              onClick={handleAddRhDribble}
              title="Clique para registrar drible"
              className="bg-[#171f33]/70 hover:bg-[#222a3d]/80 backdrop-blur-md rounded-2xl p-3 flex flex-col items-center text-center justify-between shadow-sm border border-white/5 cursor-pointer active:scale-95 transition-transform group"
            >
              <div className="w-8 h-8 rounded-lg bg-[#222a3d] flex items-center justify-center text-[#d0bcff] mb-1 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[18px]">shield</span>
              </div>
              <span className="font-['Bricolage_Grotesque'] text-2xl text-[#d0bcff] font-bold tracking-tight">
                {stats.rhsDriblados}
              </span>
              <span className="font-['Space_Grotesk'] text-[10px] text-[#bbcabf] leading-tight mt-1">
                RHs driblados no carisma (+1)
              </span>
            </div>
          </div>
        </div>
      </main>

      {/* Share Modal */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        onShowToast={showToast}
      />

      {/* Fullscreen Video / Image Modal */}
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

      {/* Slack Status Modal */}
      <StatusPickerModal
        isOpen={isStatusPickerOpen}
        onClose={() => setIsStatusPickerOpen(false)}
        currentStatus={slackStatus}
        onSelectStatus={(st) => {
          setSlackStatus(st);
          storage.saveSlackStatus(st);
        }}
        onShowToast={showToast}
      />

      {/* Toast */}
      <Toast message={toastMessage} />
    </div>
  );
}
