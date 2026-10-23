import React, { useState, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Excuse, HonoraryTitle, ReactionCounts } from '../types';
import { soundEffects } from '../utils/audio';

interface HallFamaTabProps {
  stats: {
    cafes: number;
    sextouPercent: number;
    rhsDriblados: number;
    apoioMoralCount: number;
  };
  onUpdateStats: (newStats: {
    cafes: number;
    sextouPercent: number;
    rhsDriblados: number;
    apoioMoralCount: number;
  }) => void;
  excuses: Excuse[];
  onOpenAddExcuse: () => void;
  titles: HonoraryTitle[];
  onOpenAddTitle: () => void;
  onOpenShare: () => void;
  onOpenModoLouco: () => void;
  onOpenStatusPicker: () => void;
  slackStatus: string;
  flagraReactions: ReactionCounts;
  onUpdateFlagraReactions: (reactions: ReactionCounts) => void;
  onOpenImageViewer: (src: string, title: string, subtitle: string, videoSrc?: string) => void;
  onShowToast: (msg: string) => void;
}

export const HallFamaTab: React.FC<HallFamaTabProps> = ({
  stats,
  onUpdateStats,
  excuses,
  onOpenAddExcuse,
  titles,
  onOpenAddTitle,
  onOpenShare,
  onOpenModoLouco,
  onOpenStatusPicker,
  slackStatus,
  flagraReactions,
  onUpdateFlagraReactions,
  onOpenImageViewer,
  onShowToast
}) => {
  const [currentExcuseIndex, setCurrentExcuseIndex] = useState(0);
  const [isRotatingDice, setIsRotatingDice] = useState(false);
  const [floatingEmojis, setFloatingEmojis] = useState<{ id: number; char: string; left: number }[]>([]);

  // Video Flagra state
  const flagraVideoRef = useRef<HTMLVideoElement | null>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [isSaxPlaying, setIsSaxPlaying] = useState(false);
  const [videoSpeed, setVideoSpeed] = useState(1);

  const currentExcuse = excuses[currentExcuseIndex] || excuses[0];

  // Randomize excuse
  const handleRandomizeExcuse = () => {
    soundEffects.playShuffle();
    setIsRotatingDice(true);
    setTimeout(() => setIsRotatingDice(false), 350);

    let nextIdx = Math.floor(Math.random() * excuses.length);
    if (nextIdx === currentExcuseIndex && excuses.length > 1) {
      nextIdx = (nextIdx + 1) % excuses.length;
    }
    setCurrentExcuseIndex(nextIdx);
  };

  const handleCopyExcuse = () => {
    soundEffects.playPop();
    navigator.clipboard.writeText(`"${currentExcuse.text}" - Juvena`);
    onShowToast('📋 Desculpa copiada para colar no Slack!');
  };

  // Apoio Moral trigger with floating particles and sound
  const handleApoioMoral = () => {
    soundEffects.playBeerClink();
    const newCount = stats.apoioMoralCount + 1;
    onUpdateStats({ ...stats, apoioMoralCount: newCount });

    // Spawn floating emojis
    const chars = ['🍻', '☕', '❤️', '🏆', '🎉', '💸'];
    const chosen = chars[Math.floor(Math.random() * chars.length)];
    const emojiId = Date.now();
    setFloatingEmojis((prev) => [...prev, { id: emojiId, char: chosen, left: 30 + Math.random() * 40 }]);

    setTimeout(() => {
      setFloatingEmojis((prev) => prev.filter((item) => item.id !== emojiId));
    }, 1500);

    try {
      confetti({
        particleCount: 30,
        spread: 60,
        origin: { y: 0.4 }
      });
    } catch (e) {
      // ignore
    }

    onShowToast(`🍻 Apoio moral #${newCount} enviado para o Juvena!`);
  };

  // Metric increments
  const handleAddCoffee = () => {
    soundEffects.playPop();
    const updated = { ...stats, cafes: stats.cafes + 1 };
    onUpdateStats(updated);
    onShowToast(`☕ Mais 1 café contabilizado na auditoria! (${updated.cafes} cafés)`);
  };

  const handleAddRhDribble = () => {
    soundEffects.playRhAlert();
    const updated = { ...stats, rhsDriblados: stats.rhsDriblados + 1 };
    onUpdateStats(updated);
    onShowToast(`🛡️ Mais 1 RH driblado com pura oratória! Total: ${updated.rhsDriblados}`);
  };

  // Reaction toggles
  const handleReactionClick = (key: keyof ReactionCounts) => {
    soundEffects.playPop();
    const updated = { ...flagraReactions, [key]: flagraReactions[key] + 1 };
    onUpdateFlagraReactions(updated);
  };

  const formatCount = (count: number) => {
    if (count >= 1000) {
      return (count / 1000).toFixed(1) + 'k';
    }
    return count.toString();
  };

  return (
    <div className="flex flex-col w-full gap-5 relative pb-8">
      {/* Ambient Glow Backdrops */}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-72 h-72 bg-[#4edea3]/15 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute top-96 -left-12 w-64 h-64 bg-[#d0bcff]/10 rounded-full blur-[90px] pointer-events-none -z-10" />

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

      {/* HERO SPOTLIGHT: O Mito, A Lenda */}
      <div className="relative flex flex-col items-center bg-[#171f33]/70 backdrop-blur-xl border border-white/5 rounded-2xl p-4 shadow-xl overflow-hidden mt-2">
        {/* Top Mock Ribbon */}
        <div className="w-full flex items-center justify-between pb-3 border-b border-white/5">
          <button
            onClick={onOpenStatusPicker}
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
            onClick={onOpenModoLouco}
            className="bg-[#ec6a06]/20 hover:bg-[#ec6a06]/30 px-2 py-0.5 rounded-lg flex items-center gap-1 border border-[#ec6a06]/30 transition-transform active:scale-95"
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

          {/* Sticker Cutout Image */}
          <div
            onClick={() => {
              soundEffects.playAirHorn();
              soundEffects.speakQuote('Eu tô muito louco Juvena!');
              onShowToast('📢 "Eu tô muito louco Juvena!"');
            }}
            title="Clique para ouvir a voz sagrada"
            className="relative z-10 w-48 h-48 sm:w-56 sm:h-56 rounded-full p-1 bg-gradient-to-b from-[#4edea3] via-[#10b981] to-[#2d3449] flex items-center justify-center shadow-2xl cursor-pointer group"
          >
            <div className="w-full h-full rounded-full overflow-hidden bg-[#060e20] flex items-center justify-center relative">
              <img
                alt="Juvena Sticker Oficial"
                className="w-full h-full object-cover scale-105 transform group-hover:scale-110 transition-transform duration-300"
                src="/public/assets/aistudio/Image_4_7e90b7cd.png"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                <span className="material-symbols-outlined text-white text-3xl opacity-0 group-hover:opacity-90 drop-shadow transition-opacity">
                  volume_up
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Identity & Punchy Quote Banner */}
        <div className="text-center flex flex-col items-center mt-1 w-full">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#222a3d]/90 text-[#bbcabf] font-['Space_Grotesk'] text-xs mb-2 border border-white/5">
            <span className="material-symbols-outlined text-[16px] text-[#d0bcff]">verified</span>
            <span className="font-bold tracking-wide">PATRIMÔNIO IMATERIAL DO SETOR</span>
          </div>

          <h1 className="font-['Bricolage_Grotesque'] text-[28px] sm:text-[34px] font-bold text-[#dae2fd] tracking-tight leading-none mb-2">
            O Mito, A Lenda: <span className="text-[#4edea3] font-extrabold drop-shadow-[0_0_12px_rgba(78,222,163,0.4)]">JUVENA</span>
          </h1>

          {/* The Viral Quote Card */}
          <div
            onClick={() => {
              soundEffects.playPop();
              soundEffects.speakQuote('Eu tô muito louco Juvena!');
              navigator.clipboard.writeText('"Eu tô muito louco Juvena!"');
              onShowToast('🗣️ Frase copiada e reproduzida!');
            }}
            title="Clique para reproduzir / copiar"
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

          {/* Quick Action Buttons Bar */}
          <div className="flex items-center gap-2 w-full mt-4">
            <button
              onClick={handleApoioMoral}
              className="flex-1 bg-[#4edea3] hover:bg-[#6ffbbe] text-[#003824] py-2.5 px-3 rounded-xl font-['Space_Grotesk'] font-bold text-sm flex items-center justify-center gap-2 shadow-[0_0_16px_rgba(78,222,163,0.35)] active:scale-95 transition-transform"
            >
              <span className="material-symbols-outlined text-[20px]">volunteer_activism</span>
              <span>Apoio Moral ({stats.apoioMoralCount})</span>
            </button>

            <button
              onClick={onOpenShare}
              className="flex-1 bg-[#222a3d] text-[#dae2fd] hover:bg-[#31394d] border border-white/5 py-2.5 px-3 rounded-xl font-['Space_Grotesk'] font-bold text-sm flex items-center justify-center gap-2 active:scale-95 transition-transform"
            >
              <span className="material-symbols-outlined text-[#d0bcff] text-[20px]">share</span>
              <span>Grupo da Firma</span>
            </button>
          </div>
        </div>
      </div>

      {/* STATS GRID: Dossiê de Métricas Ultra-Confiáveis */}
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
              soundEffects.playPop();
              onShowToast('🏃‍♂️ Próximo sumiço programado pontualmente para as 15h59!');
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

      {/* FLAGRA CONFIDENCIAL / MEME HIGHLIGHT CARD */}
      <div className="bg-[#131b2e] rounded-2xl p-4 shadow-xl flex flex-col gap-3 relative overflow-hidden border border-white/5">
        {/* Ambient Accent Strip */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#4edea3] via-[#d0bcff] to-[#ffb690]" />

        {/* Case Header */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-[#93000a] text-[#ffdad6] flex items-center justify-center">
              <span className="material-symbols-outlined text-[16px]">folder_open</span>
            </span>
            <div className="flex flex-col">
              <span className="font-['Space_Grotesk'] text-[10px] text-[#ffb4ab] font-bold uppercase tracking-wider leading-none">
                Dossiê Confidencial #042
              </span>
              <span className="font-['Bricolage_Grotesque'] text-[17px] font-bold text-[#dae2fd] leading-tight">
                Flagra: O Beijo da Sinergia
              </span>
            </div>
          </div>
          <div className="bg-[#222a3d] text-[#bbcabf] px-2 py-0.5 rounded text-[11px] font-['Space_Grotesk'] flex items-center gap-1 border border-white/5">
            <span className="material-symbols-outlined text-[13px] text-[#ffb690]">schedule</span>
            <span>Sex 18:42</span>
          </div>
        </div>

        {/* Video Frame */}
        <div className="relative w-full rounded-2xl overflow-hidden bg-[#060e20] shadow-2xl group border border-white/10">
          <video
            ref={flagraVideoRef}
            src="/public/assets/aistudio/flagra_sinergia.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-72 sm:h-80 object-cover object-center filter contrast-105"
            onClick={() =>
              onOpenImageViewer(
                '/public/assets/aistudio/932bf9f6-0609-4aa8-afb2-f8bc5a503c6b_1245ac09.webp',
                'Flagra em Vídeo: O Beijo da Sinergia (#042)',
                'Alinhamento estratégico e troca profunda de experiências durante a dinâmica de quebra-gelo corporativo.',
                '/public/assets/aistudio/flagra_sinergia.mp4'
              )
            }
          />

          {/* REC watermark indicator */}
          <div className="absolute top-3 left-3 bg-[#060e20]/85 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10 text-[10px] font-mono text-[#ffb4ab] flex items-center gap-1.5 pointer-events-none shadow">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            <span className="font-bold tracking-wider">● REC VIDEO</span>
          </div>

          {/* Overlay Stamp: Homologado Pelo RH */}
          <div className="absolute top-3 right-3 bg-[#ffb4ab] text-[#690005] font-['Bricolage_Grotesque'] px-2.5 py-1 rounded-lg uppercase tracking-wider shadow-lg transform rotate-6 scale-90 flex items-center gap-1 opacity-95 pointer-events-none">
            <span className="material-symbols-outlined text-[18px]">verified</span>
            <span className="text-[11px] font-extrabold tracking-widest">HOMOLOGADO PELO RH</span>
          </div>

          {/* Floating Video Control Bar */}
          <div className="absolute top-12 left-3 flex items-center gap-1.5 z-20">
            {/* Play / Pause Toggle */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                if (!flagraVideoRef.current) return;
                if (flagraVideoRef.current.paused) {
                  flagraVideoRef.current.play();
                  setIsVideoPlaying(true);
                  onShowToast('▶️ Vídeo em reprodução');
                } else {
                  flagraVideoRef.current.pause();
                  setIsVideoPlaying(false);
                  onShowToast('⏸️ Vídeo pausado');
                }
              }}
              className="bg-[#060e20]/85 hover:bg-[#222a3d] text-white p-1.5 rounded-xl border border-white/10 backdrop-blur-md flex items-center gap-1 text-[11px] font-['Space_Grotesk'] font-bold active:scale-95 transition-all shadow"
              title={isVideoPlaying ? 'Pausar vídeo' : 'Reproduzir vídeo'}
            >
              <span className="material-symbols-outlined text-[16px]">
                {isVideoPlaying ? 'pause' : 'play_arrow'}
              </span>
              <span>{isVideoPlaying ? 'Pausar' : 'Play'}</span>
            </button>

            {/* Sax BGM Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                if (isSaxPlaying) {
                  soundEffects.stopBgm();
                  setIsSaxPlaying(false);
                  onShowToast('🔇 Áudio desativado');
                } else {
                  soundEffects.playRomanticSinergia();
                  setIsSaxPlaying(true);
                  onShowToast('🎷 Trilha sonora romântica ativada!');
                }
              }}
              className={`p-1.5 rounded-xl border backdrop-blur-md flex items-center gap-1 text-[11px] font-['Space_Grotesk'] font-bold active:scale-95 transition-all shadow ${
                isSaxPlaying
                  ? 'bg-[#ec6a06] text-[#283044] border-[#ec6a06]'
                  : 'bg-[#060e20]/85 hover:bg-[#222a3d] text-[#ffb690] border-white/10'
              }`}
              title="Trilha romântica do beijo"
            >
              <span className="text-[14px]">🎷</span>
              <span>{isSaxPlaying ? 'Mudo' : 'Sax da Sinergia'}</span>
            </button>

            {/* Speed Toggle */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                const nextSpeed = videoSpeed === 1 ? 0.5 : videoSpeed === 0.5 ? 1.5 : 1;
                setVideoSpeed(nextSpeed);
                if (flagraVideoRef.current) {
                  flagraVideoRef.current.playbackRate = nextSpeed;
                }
                onShowToast(`⚡ Câmera ${nextSpeed}x ${nextSpeed < 1 ? '(Lenta)' : ''}`);
              }}
              className="bg-[#060e20]/85 hover:bg-[#222a3d] text-[#4edea3] px-2 py-1.5 rounded-xl border border-white/10 backdrop-blur-md text-[11px] font-['Space_Grotesk'] font-bold active:scale-95 transition-all shadow"
              title="Ajustar velocidade do vídeo"
            >
              {videoSpeed}x
            </button>

            {/* Zoom / Fullscreen Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onOpenImageViewer(
                  '/public/assets/aistudio/932bf9f6-0609-4aa8-afb2-f8bc5a503c6b_1245ac09.webp',
                  'Flagra em Vídeo: O Beijo da Sinergia (#042)',
                  'Alinhamento estratégico e troca profunda de experiências durante a dinâmica de quebra-gelo corporativo.',
                  '/public/assets/aistudio/flagra_sinergia.mp4'
                );
              }}
              className="bg-[#060e20]/85 hover:bg-[#222a3d] text-white p-1.5 rounded-xl border border-white/10 backdrop-blur-md flex items-center justify-center active:scale-95 transition-all shadow"
              title="Tela cheia do flagra"
            >
              <span className="material-symbols-outlined text-[16px]">fullscreen</span>
            </button>
          </div>

          {/* Bottom Floating Subtitle Bar inside video */}
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#060e20] via-[#060e20]/85 to-transparent p-3 flex flex-col pointer-events-none">
            <div className="flex items-center gap-1.5 text-[#ffb690]">
              <span className="material-symbols-outlined text-[16px]">handshake</span>
              <span className="font-['Space_Grotesk'] text-[11px] font-bold uppercase tracking-wider">
                Integração Interdepartamental
              </span>
            </div>
            <p className="font-['Plus_Jakarta_Sans'] text-xs text-[#dae2fd] mt-0.5 line-clamp-2">
              "Alinhamento estratégico e troca profunda de experiências durante a dinâmica de quebra-gelo corporativo."
            </p>
          </div>
        </div>

        {/* Interactive Reaction Bar */}
        <div className="flex items-center justify-between gap-1.5 pt-1 overflow-x-auto py-1">
          {/* Reaction 1: Heart */}
          <button
            onClick={() => handleReactionClick('heart')}
            className="flex items-center gap-1.5 bg-[#222a3d] hover:bg-[#2d3449] px-3 py-1.5 rounded-full active:scale-90 transition-transform border border-white/5"
          >
            <span className="text-[16px]">❤️</span>
            <span className="font-['Space_Grotesk'] text-xs text-[#dae2fd] font-semibold">
              {formatCount(flagraReactions.heart)}
            </span>
          </button>

          {/* Reaction 2: Beer */}
          <button
            onClick={() => handleReactionClick('beer')}
            className="flex items-center gap-1.5 bg-[#222a3d] hover:bg-[#2d3449] px-3 py-1.5 rounded-full active:scale-90 transition-transform border border-white/5"
          >
            <span className="text-[16px]">🍺</span>
            <span className="font-['Space_Grotesk'] text-xs text-[#dae2fd] font-semibold">
              {formatCount(flagraReactions.beer)}
            </span>
          </button>

          {/* Reaction 3: Chama RH */}
          <button
            onClick={() => {
              soundEffects.playRhAlert();
              handleReactionClick('rh');
              onShowToast('🚨 Alerta emitido para a ouvidoria de afeto do RH!');
            }}
            className="flex items-center gap-1.5 bg-[#222a3d] hover:bg-[#2d3449] px-3 py-1.5 rounded-full active:scale-90 transition-transform border border-white/5"
          >
            <span className="text-[16px]">🚨</span>
            <span className="font-['Space_Grotesk'] text-[11px] text-[#ffb4ab] font-bold">Chama RH</span>
            <span className="font-['Space_Grotesk'] text-xs text-[#dae2fd] font-semibold">
              {formatCount(flagraReactions.rh)}
            </span>
          </button>

          {/* Reaction 4: Popcorn */}
          <button
            onClick={() => handleReactionClick('popcorn')}
            className="flex items-center gap-1.5 bg-[#222a3d] hover:bg-[#2d3449] px-3 py-1.5 rounded-full active:scale-90 transition-transform border border-white/5"
          >
            <span className="text-[16px]">🍿</span>
            <span className="font-['Space_Grotesk'] text-xs text-[#dae2fd] font-semibold">
              {formatCount(flagraReactions.popcorn)}
            </span>
          </button>
        </div>
      </div>

      {/* INTERACTIVE WIDGET: Gerador de Desculpas do Juvena */}
      <div className="bg-[#171f33]/80 backdrop-blur-lg rounded-2xl p-4 shadow-lg flex flex-col gap-3 relative border border-white/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#b090ff]/20 text-[#d0bcff] flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">casino</span>
            </div>
            <div>
              <span className="font-['Bricolage_Grotesque'] text-[17px] font-bold text-[#dae2fd]">
                Gerador de Desculpas
              </span>
              <p className="font-['Space_Grotesk'] text-[11px] text-[#86948a]">
                Desculpas oficiais aprovadas pelo conselho
              </p>
            </div>
          </div>
          <button
            onClick={onOpenAddExcuse}
            className="text-xs font-['Space_Grotesk'] font-bold text-[#4edea3] hover:underline flex items-center gap-1"
          >
            <span>+ Propor</span>
          </button>
        </div>

        {/* Dynamic Speech Bubble */}
        <div className="relative bg-[#2d3449]/70 p-4 rounded-xl shadow-inner border border-white/5">
          <div className="flex items-start gap-2.5">
            <span className="material-symbols-outlined text-[#4edea3] text-[22px] shrink-0 mt-0.5">
              chat_bubble
            </span>
            <p className="font-['Plus_Jakarta_Sans'] text-sm sm:text-[15px] text-[#dae2fd] font-semibold italic leading-relaxed">
              "{currentExcuse.text}"
            </p>
          </div>
          <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between text-xs font-['Space_Grotesk']">
            <span className="text-[#d0bcff] font-bold uppercase text-[10px]">
              Categoria: {currentExcuse.category}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-[#dae2fd] text-[10px] flex items-center gap-1">
                <span className="material-symbols-outlined text-[13px] text-[#4edea3]">thumb_up</span>
                {currentExcuse.successRate}
              </span>
              <button
                onClick={handleCopyExcuse}
                className="text-[#4edea3] hover:text-[#6ffbbe] text-[11px] font-bold flex items-center gap-0.5 ml-1"
                title="Copiar"
              >
                <span className="material-symbols-outlined text-[14px]">content_copy</span>
              </button>
            </div>
          </div>
        </div>

        {/* Randomizer Button */}
        <button
          onClick={handleRandomizeExcuse}
          className="w-full bg-[#222a3d] hover:bg-[#2d3449] text-[#4edea3] font-['Space_Grotesk'] font-bold text-sm py-2.5 rounded-xl flex items-center justify-center gap-2 active:scale-98 transition-all border border-white/5 shadow-sm"
        >
          <span
            className={`material-symbols-outlined text-[20px] transition-transform duration-300 ${
              isRotatingDice ? 'rotate-180' : ''
            }`}
          >
            autorenew
          </span>
          <span>Sortear Outra Desculpa do Juvena</span>
        </button>
      </div>

      {/* AWARDS WALL: Mural de Títulos Honorários */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#ffb690] text-[20px]">military_tech</span>
            <span className="font-['Bricolage_Grotesque'] text-[18px] font-bold text-[#dae2fd]">
              Mural de Títulos Honorários
            </span>
          </div>
          <button
            onClick={onOpenAddTitle}
            className="text-xs font-['Space_Grotesk'] font-bold text-[#ffb690] hover:underline"
          >
            + Condecorar
          </button>
        </div>

        <div className="flex flex-col gap-2">
          {titles.map((title) => (
            <div
              key={title.id}
              className="flex items-center justify-between p-3 bg-[#171f33]/60 hover:bg-[#171f33]/90 rounded-2xl border border-white/5 transition-colors"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-[#222a3d] flex items-center justify-center text-xl shrink-0 border border-white/5">
                  {title.emoji}
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-['Space_Grotesk'] text-sm text-[#dae2fd] font-bold truncate">
                    {title.title}
                  </span>
                  <span className="font-['Plus_Jakarta_Sans'] text-xs text-[#bbcabf] truncate">
                    {title.description}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 ml-2">
                <span
                  className={`font-['Space_Grotesk'] text-[10px] font-black px-2 py-0.5 rounded ${
                    title.tier === 'OURO'
                      ? 'text-[#4edea3] bg-[#4edea3]/10'
                      : title.tier === 'DIAMANTE'
                      ? 'text-[#6ffbbe] bg-[#6ffbbe]/10'
                      : title.tier === 'ÉPICO'
                      ? 'text-[#d0bcff] bg-[#d0bcff]/10'
                      : 'text-[#ffb690] bg-[#ffb690]/10'
                  }`}
                >
                  {title.tier}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
