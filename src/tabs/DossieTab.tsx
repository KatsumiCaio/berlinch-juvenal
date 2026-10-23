import React, { useState } from 'react';
import { DossierItem } from '../types';
import { soundEffects } from '../utils/audio';

interface DossieTabProps {
  dossiers: DossierItem[];
  onUpdateDossiers: (dossiers: DossierItem[]) => void;
  onOpenImageViewer: (src: string, title: string, subtitle: string, videoSrc?: string) => void;
  onShowToast: (msg: string) => void;
}

export const DossieTab: React.FC<DossieTabProps> = ({
  dossiers,
  onUpdateDossiers,
  onOpenImageViewer,
  onShowToast
}) => {
  const [revealedIds, setRevealedIds] = useState<Record<string, boolean>>({});
  const [filter, setFilter] = useState<'TODOS' | 'HOMOLOGADOS' | 'INVESTIGAÇÃO'>('TODOS');

  const toggleReveal = (id: string) => {
    soundEffects.playPop();
    setRevealedIds((prev) => {
      const next = !prev[id];
      if (next) {
        onShowToast('🔓 Trecho sigiloso desclassificado pelo comitê!');
      }
      return { ...prev, [id]: next };
    });
  };

  const handleDossierReaction = (dossierId: string, type: 'beer' | 'rh' | 'heart' | 'popcorn') => {
    soundEffects.playPop();
    const updated = dossiers.map((d) => {
      if (d.id !== dossierId) return d;
      return {
        ...d,
        reactions: {
          ...d.reactions,
          [type]: d.reactions[type] + 1
        }
      };
    });
    onUpdateDossiers(updated);
  };

  const filteredDossiers = dossiers.filter((d) => {
    if (filter === 'HOMOLOGADOS') return d.status === 'HOMOLOGADO PELO RH';
    if (filter === 'INVESTIGAÇÃO') return d.status === 'INVESTIGAÇÃO ATIVA';
    return true;
  });

  return (
    <div className="flex flex-col w-full gap-5 relative pb-8">
      {/* Top Banner */}
      <div className="bg-[#171f33]/80 backdrop-blur-xl border border-white/5 rounded-2xl p-4 shadow-xl flex flex-col gap-2 mt-2">
        <div className="flex items-center gap-2 text-[#ffb4ab]">
          <span className="material-symbols-outlined text-[24px]">folder_special</span>
          <span className="font-['Space_Grotesk'] text-xs font-bold uppercase tracking-wider">
            Arquivo Confidencial & Dossiês
          </span>
        </div>
        <h2 className="font-['Bricolage_Grotesque'] text-2xl font-bold text-[#dae2fd]">
          Casos Que Marcaram Época
        </h2>
        <p className="font-['Plus_Jakarta_Sans'] text-xs text-[#bbcabf] leading-relaxed">
          Relatórios detalhados, quebra-gelos interdepartamentais e mistérios corporativos não solucionados.
        </p>

        {/* Filters */}
        <div className="flex gap-2 pt-2">
          {(['TODOS', 'HOMOLOGADOS', 'INVESTIGAÇÃO'] as const).map((f) => (
            <button
              key={f}
              onClick={() => {
                soundEffects.playPop();
                setFilter(f);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-['Space_Grotesk'] font-bold transition-all border ${
                filter === f
                  ? 'bg-[#10b981] text-[#002113] border-[#10b981] shadow'
                  : 'bg-[#222a3d] text-[#bbcabf] border-white/5'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Dossier List */}
      <div className="flex flex-col gap-4">
        {filteredDossiers.map((dossier) => {
          const isRevealed = !!revealedIds[dossier.id];

          return (
            <div
              key={dossier.id}
              className="bg-[#131b2e] border border-white/5 rounded-2xl p-4 shadow-xl flex flex-col gap-3 relative overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-2 pb-2 border-b border-white/5">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-['Space_Grotesk'] text-[10px] text-[#ffb4ab] font-bold uppercase">
                      Dossiê {dossier.code}
                    </span>
                    <span className="text-[10px] text-[#bbcabf] font-['Space_Grotesk']">
                      • {dossier.time}
                    </span>
                  </div>
                  <h3 className="font-['Bricolage_Grotesque'] text-lg font-bold text-white leading-tight mt-0.5">
                    {dossier.title}
                  </h3>
                </div>

                <span
                  className={`text-[9px] font-['Space_Grotesk'] font-black px-2 py-1 rounded shrink-0 uppercase tracking-wider ${
                    dossier.statusColor === 'error'
                      ? 'bg-[#93000a] text-[#ffdad6] border border-[#ffb4ab]/40'
                      : dossier.statusColor === 'secondary'
                      ? 'bg-[#ec6a06]/20 text-[#ffb690] border border-[#ec6a06]/30'
                      : 'bg-[#2d3449] text-[#d0bcff]'
                  }`}
                >
                  {dossier.status}
                </span>
              </div>

              {/* Video / Photo preview if available */}
              {(dossier.videoSrc || dossier.image) && (
                <div
                  onClick={() =>
                    onOpenImageViewer(
                      dossier.image || dossier.videoSrc!,
                      dossier.title,
                      dossier.description,
                      dossier.videoSrc
                    )
                  }
                  className="relative rounded-xl overflow-hidden bg-[#060e20] cursor-pointer group"
                >
                  {dossier.videoSrc ? (
                    <video
                      src={dossier.videoSrc}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-56 object-cover object-center group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <img
                      src={dossier.image}
                      alt={dossier.title}
                      className="w-full h-52 object-cover object-center group-hover:scale-105 transition-transform duration-300"
                    />
                  )}
                  <div className="absolute top-2 right-2 bg-[#93000a] text-[#ffdad6] text-[10px] font-['Space_Grotesk'] font-bold px-2 py-0.5 rounded shadow flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-ping" />
                    <span>{dossier.videoSrc ? 'EVIDÊNCIA EM VÍDEO' : 'EVIDÊNCIA FOTOGRÁFICA'}</span>
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 flex items-center justify-center transition-colors">
                    <span className="material-symbols-outlined text-white text-3xl opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-md">
                      {dossier.videoSrc ? 'play_circle' : 'zoom_in'}
                    </span>
                  </div>
                </div>
              )}

              {/* Description & Redacted Section */}
              <div className="flex flex-col gap-2">
                <p className="font-['Plus_Jakarta_Sans'] text-xs text-[#dae2fd] italic">
                  {dossier.description}
                </p>

                {/* Secret Section */}
                <div
                  onClick={() => toggleReveal(dossier.id)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer ${
                    isRevealed
                      ? 'bg-[#060e20] border-[#4edea3]/40'
                      : 'bg-[#222a3d]/70 hover:bg-[#222a3d] border-dashed border-[#ffb4ab]/40'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] font-['Space_Grotesk'] mb-1">
                    <span className="text-[#ffb4ab] font-bold flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">
                        {isRevealed ? 'lock_open' : 'lock'}
                      </span>
                      {isRevealed ? 'TRECHO DESCLASSIFICADO:' : 'CONTEÚDO CONFIDENCIAL:'}
                    </span>
                    <span className="text-[10px] text-[#bbcabf]">
                      {isRevealed ? 'Clique para ocultar' : 'Clique para ler'}
                    </span>
                  </div>

                  {isRevealed ? (
                    <p className="font-mono text-xs text-[#4edea3] leading-relaxed">
                      {dossier.redactedText}
                    </p>
                  ) : (
                    <div className="h-6 flex items-center bg-[#060e20] rounded px-2 text-[10px] text-[#64748b] font-mono tracking-widest select-none">
                      ████████████████████████████████████████
                    </div>
                  )}
                </div>

                {/* Verdict */}
                <div className="bg-[#171f33] p-2.5 rounded-xl border border-white/5 flex items-center gap-2">
                  <span className="text-base">⚖️</span>
                  <p className="font-['Plus_Jakarta_Sans'] text-xs text-[#bbcabf]">
                    <span className="font-bold text-white">Parecer: </span>
                    {dossier.verdict}
                  </p>
                </div>
              </div>

              {/* Quick reactions */}
              <div className="flex items-center justify-end gap-2 pt-1 border-t border-white/5">
                <button
                  onClick={() => handleDossierReaction(dossier.id, 'beer')}
                  className="flex items-center gap-1 bg-[#222a3d] hover:bg-[#2d3449] px-2.5 py-1 rounded-full text-xs font-['Space_Grotesk'] text-[#dae2fd] active:scale-95"
                >
                  <span>🍺</span>
                  <span>{dossier.reactions.beer}</span>
                </button>
                <button
                  onClick={() => handleDossierReaction(dossier.id, 'rh')}
                  className="flex items-center gap-1 bg-[#222a3d] hover:bg-[#2d3449] px-2.5 py-1 rounded-full text-xs font-['Space_Grotesk'] text-[#ffb4ab] active:scale-95"
                >
                  <span>🚨</span>
                  <span>{dossier.reactions.rh}</span>
                </button>
                <button
                  onClick={() => handleDossierReaction(dossier.id, 'popcorn')}
                  className="flex items-center gap-1 bg-[#222a3d] hover:bg-[#2d3449] px-2.5 py-1 rounded-full text-xs font-['Space_Grotesk'] text-[#dae2fd] active:scale-95"
                >
                  <span>🍿</span>
                  <span>{dossier.reactions.popcorn}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
