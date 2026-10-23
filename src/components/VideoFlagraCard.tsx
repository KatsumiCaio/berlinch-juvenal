import React, { useRef, useState } from 'react';
import { ReactionCounts } from '../types';
import { soundEffects } from '../utils/audio';

interface VideoFlagraCardProps {
  reactions: ReactionCounts;
  onUpdateReactions: (reactions: ReactionCounts) => void;
  onOpenFullscreen: (src: string, title: string, subtitle: string, videoSrc?: string) => void;
  onShowToast: (msg: string) => void;
}

export const VideoFlagraCard: React.FC<VideoFlagraCardProps> = ({
  reactions,
  onUpdateReactions,
  onOpenFullscreen,
  onShowToast
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState(1);
  const [isSaxActive, setIsSaxActive] = useState(false);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
      onShowToast('▶️ Vídeo em reprodução');
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
      onShowToast('⏸️ Vídeo pausado');
    }
  };

  const toggleSax = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSaxActive) {
      soundEffects.stopBgm();
      setIsSaxActive(false);
      onShowToast('🔇 Áudio desativado');
    } else {
      soundEffects.playRomanticSinergia();
      setIsSaxActive(true);
      onShowToast('🎷 Saxofone da Sinergia tocando no vídeo!');
    }
  };

  const toggleSpeed = (e: React.MouseEvent) => {
    e.stopPropagation();
    const next = speed === 1 ? 0.5 : speed === 0.5 ? 1.5 : 1;
    setSpeed(next);
    if (videoRef.current) {
      videoRef.current.playbackRate = next;
    }
    onShowToast(`⚡ Câmera ${next}x ${next < 1 ? '(Lenta)' : ''}`);
  };

  const playKiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundEffects.playKissSound();
    onShowToast('💋 Som do beijo!');
  };

  const playApplause = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundEffects.playApplause();
    onShowToast('👏 Palmas da sala de treinamento!');
  };

  const handleReaction = (key: keyof ReactionCounts) => {
    soundEffects.playPop();
    const updated = { ...reactions, [key]: reactions[key] + 1 };
    onUpdateReactions(updated);
  };

  const formatCount = (count: number) => {
    if (count >= 1000) return (count / 1000).toFixed(1) + 'k';
    return count.toString();
  };

  return (
    <div className="bg-[#131b2e] rounded-2xl p-4 shadow-xl flex flex-col gap-3 relative overflow-hidden border border-white/5">
      {/* Accent Top Strip */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#4edea3] via-[#d0bcff] to-[#ec6a06]" />

      {/* Header */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-lg bg-[#93000a] text-[#ffdad6] flex items-center justify-center text-sm shadow">
            📹
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

      {/* Main Video Frame */}
      <div className="relative w-full rounded-2xl overflow-hidden bg-[#060e20] shadow-2xl border border-white/10 group">
        <video
          ref={videoRef}
          src="/public/assets/aistudio/flagra_sinergia.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-72 sm:h-80 object-cover object-center filter contrast-105 cursor-pointer"
          onClick={() =>
            onOpenFullscreen(
              '/public/assets/aistudio/932bf9f6-0609-4aa8-afb2-f8bc5a503c6b_1245ac09.webp',
              'Flagra em Vídeo: O Beijo da Sinergia (#042)',
              'Alinhamento estratégico e troca profunda de experiências durante a dinâmica de quebra-gelo corporativo.',
              '/public/assets/aistudio/flagra_sinergia.mp4'
            )
          }
        />

        {/* REC indicator */}
        <div className="absolute top-3 left-3 bg-[#060e20]/85 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10 text-[10px] font-mono text-[#ffb4ab] flex items-center gap-1.5 pointer-events-none shadow">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
          <span className="font-bold tracking-wider">● REC VÍDEO</span>
        </div>

        {/* Stamp Homologado */}
        <div className="absolute top-3 right-3 bg-[#ffb4ab] text-[#690005] font-['Bricolage_Grotesque'] px-2.5 py-1 rounded-lg uppercase tracking-wider shadow-lg transform rotate-6 scale-90 flex items-center gap-1 opacity-95 pointer-events-none">
          <span className="material-symbols-outlined text-[18px]">verified</span>
          <span className="text-[11px] font-extrabold tracking-widest">HOMOLOGADO PELO RH</span>
        </div>

        {/* Interactive Sound & Playback Bar on the Video */}
        <div className="absolute top-12 left-3 flex items-center gap-1.5 z-20">
          <button
            onClick={togglePlay}
            className="bg-[#060e20]/85 hover:bg-[#222a3d] text-white px-2 py-1.5 rounded-xl border border-white/10 backdrop-blur-md flex items-center gap-1 text-[11px] font-['Space_Grotesk'] font-bold active:scale-95 transition-all shadow"
            title={isPlaying ? 'Pausar' : 'Play'}
          >
            <span className="material-symbols-outlined text-[16px]">
              {isPlaying ? 'pause' : 'play_arrow'}
            </span>
            <span>{isPlaying ? 'Pausar' : 'Play'}</span>
          </button>

          <button
            onClick={toggleSax}
            className={`px-2 py-1.5 rounded-xl border backdrop-blur-md flex items-center gap-1 text-[11px] font-['Space_Grotesk'] font-bold active:scale-95 transition-all shadow ${
              isSaxActive
                ? 'bg-[#ec6a06] text-[#283044] border-[#ec6a06]'
                : 'bg-[#060e20]/85 hover:bg-[#222a3d] text-[#ffb690] border-white/10'
            }`}
            title="Tocar saxofone da sinergia"
          >
            <span>🎷</span>
            <span>{isSaxActive ? 'Mudo' : 'Sax'}</span>
          </button>

          <button
            onClick={playKiss}
            className="bg-[#060e20]/85 hover:bg-[#222a3d] text-[#ffb4ab] px-2 py-1.5 rounded-xl border border-white/10 backdrop-blur-md text-[11px] font-['Space_Grotesk'] font-bold active:scale-95 transition-all shadow"
            title="Efeito sonoro de beijo"
          >
            💋 Beijo
          </button>

          <button
            onClick={playApplause}
            className="bg-[#060e20]/85 hover:bg-[#222a3d] text-[#4edea3] px-2 py-1.5 rounded-xl border border-white/10 backdrop-blur-md text-[11px] font-['Space_Grotesk'] font-bold active:scale-95 transition-all shadow"
            title="Palmas dos colegas"
          >
            👏 Palmas
          </button>

          <button
            onClick={toggleSpeed}
            className="bg-[#060e20]/85 hover:bg-[#222a3d] text-white px-2 py-1.5 rounded-xl border border-white/10 backdrop-blur-md text-[11px] font-['Space_Grotesk'] font-bold active:scale-95 transition-all shadow"
            title="Velocidade"
          >
            {speed}x
          </button>

          <button
            onClick={() =>
              onOpenFullscreen(
                '/public/assets/aistudio/932bf9f6-0609-4aa8-afb2-f8bc5a503c6b_1245ac09.webp',
                'Flagra em Vídeo: O Beijo da Sinergia (#042)',
                'Alinhamento estratégico e troca profunda de experiências durante a dinâmica de quebra-gelo corporativo.',
                '/public/assets/aistudio/flagra_sinergia.mp4'
              )
            }
            className="bg-[#060e20]/85 hover:bg-[#222a3d] text-white p-1.5 rounded-xl border border-white/10 backdrop-blur-md flex items-center justify-center active:scale-95 shadow"
            title="Tela Cheia"
          >
            <span className="material-symbols-outlined text-[16px]">fullscreen</span>
          </button>
        </div>

        {/* Bottom Subtitle Inside Video */}
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

      {/* Reaction Buttons */}
      <div className="flex items-center justify-between gap-1.5 pt-1 overflow-x-auto py-1">
        <button
          onClick={() => handleReaction('heart')}
          className="flex items-center gap-1.5 bg-[#222a3d] hover:bg-[#2d3449] px-3 py-1.5 rounded-full active:scale-90 transition-transform border border-white/5"
        >
          <span className="text-[16px]">❤️</span>
          <span className="font-['Space_Grotesk'] text-xs text-[#dae2fd] font-semibold">
            {formatCount(reactions.heart)}
          </span>
        </button>

        <button
          onClick={() => handleReaction('beer')}
          className="flex items-center gap-1.5 bg-[#222a3d] hover:bg-[#2d3449] px-3 py-1.5 rounded-full active:scale-90 transition-transform border border-white/5"
        >
          <span className="text-[16px]">🍺</span>
          <span className="font-['Space_Grotesk'] text-xs text-[#dae2fd] font-semibold">
            {formatCount(reactions.beer)}
          </span>
        </button>

        <button
          onClick={() => {
            soundEffects.playRhAlert();
            handleReaction('rh');
            onShowToast('🚨 Alerta emitido para a ouvidoria do RH!');
          }}
          className="flex items-center gap-1.5 bg-[#222a3d] hover:bg-[#2d3449] px-3 py-1.5 rounded-full active:scale-90 transition-transform border border-white/5"
        >
          <span className="text-[16px]">🚨</span>
          <span className="font-['Space_Grotesk'] text-[11px] text-[#ffb4ab] font-bold">Chama RH</span>
          <span className="font-['Space_Grotesk'] text-xs text-[#dae2fd] font-semibold">
            {formatCount(reactions.rh)}
          </span>
        </button>

        <button
          onClick={() => handleReaction('popcorn')}
          className="flex items-center gap-1.5 bg-[#222a3d] hover:bg-[#2d3449] px-3 py-1.5 rounded-full active:scale-90 transition-transform border border-white/5"
        >
          <span className="text-[16px]">🍿</span>
          <span className="font-['Space_Grotesk'] text-xs text-[#dae2fd] font-semibold">
            {formatCount(reactions.popcorn)}
          </span>
        </button>
      </div>
    </div>
  );
};
