import React, { useRef, useState, useEffect } from 'react';
import { soundEffects } from '../utils/audio';

interface ImageViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  videoSrc?: string;
  title: string;
  subtitle: string;
  onShowToast: (msg: string) => void;
}

export const ImageViewerModal: React.FC<ImageViewerModalProps> = ({
  isOpen,
  onClose,
  imageSrc,
  videoSrc,
  title,
  subtitle,
  onShowToast
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isBgmActive, setIsBgmActive] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsPlaying(true);
      if (videoRef.current) {
        videoRef.current.playbackRate = 1;
        videoRef.current.play().catch(() => {});
      }
    } else {
      soundEffects.stopBgm();
      setIsBgmActive(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleSpeedChange = (speed: number) => {
    setPlaybackRate(speed);
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
    onShowToast(`⚡ Velocidade do flagra ajustada para ${speed}x`);
  };

  const toggleRomanticSound = () => {
    if (isBgmActive) {
      soundEffects.stopBgm();
      setIsBgmActive(false);
      onShowToast('🔇 Áudio desativado');
    } else {
      soundEffects.playRomanticSinergia();
      setIsBgmActive(true);
      onShowToast('🎷 Saxofone da Sinergia ativado!');
    }
  };

  const handleCopyLink = () => {
    soundEffects.playCameraShutter();
    const mediaUrl = window.location.origin + (videoSrc || imageSrc);
    navigator.clipboard.writeText(mediaUrl);
    onShowToast('🎥 Link direto do vídeo copiado para a área de transferência!');
  };

  const cleanVideoSrc = videoSrc ? (videoSrc.startsWith('/public/') ? videoSrc.replace('/public/', '/') : videoSrc) : undefined;
  const cleanImageSrc = imageSrc ? (imageSrc.startsWith('/public/') ? imageSrc.replace('/public/', '/') : imageSrc) : '';

  const isVideo = Boolean(cleanVideoSrc || cleanImageSrc.endsWith('.webp') || cleanImageSrc.endsWith('.mp4'));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/90 backdrop-blur-lg animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#0b1326] border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col">
        {/* Top bar */}
        <div className="p-3.5 bg-[#171f33] border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ffb4ab] animate-pulse" />
            <span className="font-['Space_Grotesk'] text-xs font-bold text-[#ffb4ab] uppercase tracking-wider">
              {isVideo ? 'GRAVAÇÃO EM VÍDEO CONFIDENCIAL' : 'EVIDÊNCIA FOTOGRÁFICA OFICIAL'}
            </span>
          </div>
          <button
            onClick={() => {
              soundEffects.stopBgm();
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-[#222a3d] text-[#dae2fd] hover:text-white flex items-center justify-center"
          >
            ✕
          </button>
        </div>

        {/* Media Frame */}
        <div className="relative bg-[#060e20] flex items-center justify-center p-2 min-h-[300px]">
          {cleanVideoSrc ? (
            <video
              ref={videoRef}
              src={cleanVideoSrc}
              autoPlay
              loop
              muted
              playsInline
              className="max-h-[55vh] w-full object-contain rounded-xl shadow-lg border border-white/5"
            />
          ) : isVideo ? (
            <img
              src={cleanImageSrc}
              alt={title}
              className="max-h-[55vh] w-full object-contain rounded-xl shadow-lg border border-white/5"
            />
          ) : (
            <img
              src={cleanImageSrc}
              alt={title}
              className="max-h-[55vh] w-auto object-contain rounded-xl shadow-lg border border-white/5"
            />
          )}

          {/* RH Stamp */}
          <div className="absolute top-5 right-5 bg-[#93000a] text-[#ffdad6] font-['Bricolage_Grotesque'] px-3.5 py-1 rounded-lg uppercase tracking-wider shadow-2xl transform rotate-12 flex items-center gap-1.5 border border-[#ffb4ab]/40 pointer-events-none">
            <span className="material-symbols-outlined text-[18px]">verified</span>
            <span className="text-xs font-black tracking-widest">HOMOLOGADO PELO RH</span>
          </div>

          {/* REC watermark indicator */}
          <div className="absolute top-5 left-5 bg-[#060e20]/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10 text-[10px] font-mono text-[#ffb4ab] flex items-center gap-1.5 pointer-events-none">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            <span className="font-bold">REC 00:03:42</span>
          </div>

          {/* Reference watermark */}
          <div className="absolute bottom-5 left-5 bg-[#060e20]/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10 text-[9px] font-mono text-[#bbcabf] pointer-events-none">
            CAM-02 [SALA DE INTEGRAÇÃO]
          </div>

          {/* Quick Player Controls overlay for video */}
          {videoSrc && (
            <div className="absolute bottom-5 right-5 flex items-center gap-1 bg-[#060e20]/80 backdrop-blur-md p-1 rounded-xl border border-white/10">
              <button
                onClick={togglePlay}
                className="w-8 h-8 rounded-lg bg-[#222a3d] hover:bg-[#2d3449] text-white flex items-center justify-center"
                title={isPlaying ? 'Pausar' : 'Reproduzir'}
              >
                <span className="material-symbols-outlined text-sm">
                  {isPlaying ? 'pause' : 'play_arrow'}
                </span>
              </button>

              <button
                onClick={toggleRomanticSound}
                className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                  isBgmActive ? 'bg-[#ffb690] text-[#552100] shadow' : 'bg-[#222a3d] text-[#bbcabf]'
                }`}
                title="Trilha Romântica / Sax da Sinergia"
              >
                <span className="material-symbols-outlined text-sm">
                  {isBgmActive ? 'music_note' : 'music_off'}
                </span>
              </button>

              {/* Speed buttons */}
              {[0.5, 1, 1.5].map((s) => (
                <button
                  key={s}
                  onClick={() => handleSpeedChange(s)}
                  className={`px-2 py-1 rounded-lg text-[10px] font-['Space_Grotesk'] font-bold ${
                    playbackRate === s ? 'bg-[#4edea3] text-[#003824]' : 'bg-[#222a3d] text-[#bbcabf]'
                  }`}
                >
                  {s}x
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Caption */}
        <div className="p-4 bg-[#171f33] flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <h4 className="font-['Bricolage_Grotesque'] text-lg font-bold text-[#dae2fd]">
              {title}
            </h4>
            <span className="font-['Space_Grotesk'] text-[10px] text-[#4edea3] font-bold bg-[#4edea3]/10 px-2 py-0.5 rounded">
              VÍDEO OFICIAL
            </span>
          </div>

          <p className="font-['Plus_Jakarta_Sans'] text-xs text-[#bbcabf] italic leading-relaxed">
            {subtitle}
          </p>

          <div className="flex gap-2 pt-2">
            <button
              onClick={handleCopyLink}
              className="flex-1 bg-[#4edea3] hover:bg-[#6ffbbe] text-[#003824] font-['Space_Grotesk'] font-bold text-xs py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 active:scale-95 transition-transform shadow-[0_0_12px_rgba(78,222,163,0.3)]"
            >
              <span className="material-symbols-outlined text-sm">share</span>
              <span>Compartilhar Vídeo do Flagra</span>
            </button>
            <button
              onClick={() => {
                soundEffects.stopBgm();
                onClose();
              }}
              className="bg-[#222a3d] text-[#dae2fd] font-['Space_Grotesk'] text-xs py-2 px-4 rounded-xl hover:bg-[#2d3449]"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
