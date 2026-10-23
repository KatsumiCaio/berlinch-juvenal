import React, { useState } from 'react';
import { soundEffects } from '../utils/audio';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (msg: string) => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  onShowToast
}) => {
  const [selectedFormat, setSelectedFormat] = useState<'whatsapp' | 'slack' | 'teams'>('whatsapp');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const appUrl = window.location.href;

  const templates = {
    whatsapp: `🚨 *URGENTE NO GRUPO DA FIRMA* 🚨\n\nSaiu a premiação oficial do *JUVENAL AWARDS*! 🏆\n"Eu tô muito louco Juvenal!"\n\nConfira o flagra em vídeo do Beijo da Sinergia e o mandado do RH:\n${appUrl}`,
    slack: `:trophy: *JUVENAL AWARDS - Hall da Fama Oficial* :beer:\n> _"Eu tô muito louco Juvenal!"_\nFlagras em vídeo homologados pelo RH e auditoria paralela disponíveis em:\n${appUrl}`,
    teams: `📢 [ALINHAMENTO ESTRATÉGICO] Juvenal Awards 2024\nReconhecimento oficial das maiores façanhas corporativas e quebra-gelo interdepartamental.\nAcesse o portal: ${appUrl}`
  };

  const handleCopy = () => {
    soundEffects.playPop();
    navigator.clipboard.writeText(templates[selectedFormat]);
    setCopied(true);
    onShowToast('📋 Mensagem copiada para disparar na firma!');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleNativeShare = async () => {
    soundEffects.playPop();
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Juvenal Awards - Hall da Fama',
          text: 'Eu tô muito louco Juvenal! Acesse o portal oficial da firma.',
          url: appUrl
        });
        onShowToast('🚀 Compartilhado com sucesso!');
        onClose();
      } catch (err) {
        // Ignored or cancelled
      }
    } else {
      handleCopy();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#171f33] border border-[#4edea3]/30 rounded-2xl p-5 shadow-2xl flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-[#d0bcff]/20 text-[#d0bcff] flex items-center justify-center text-lg">
              📢
            </span>
            <div>
              <h3 className="font-['Bricolage_Grotesque'] text-lg font-bold text-[#dae2fd]">
                Disparar no Grupo da Firma
              </h3>
              <p className="font-['Space_Grotesk'] text-xs text-[#bbcabf]">
                Espalhe a palavra sagrada do Juvena
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#222a3d] text-[#bbcabf] hover:text-white flex items-center justify-center"
          >
            ✕
          </button>
        </div>

        {/* Tab selection */}
        <div className="flex rounded-xl bg-[#0b1326] p-1 border border-white/5">
          <button
            onClick={() => setSelectedFormat('whatsapp')}
            className={`flex-1 py-1.5 rounded-lg text-xs font-['Space_Grotesk'] font-bold transition-all ${
              selectedFormat === 'whatsapp'
                ? 'bg-[#10b981] text-[#002113] shadow'
                : 'text-[#bbcabf] hover:text-white'
            }`}
          >
            WhatsApp
          </button>
          <button
            onClick={() => setSelectedFormat('slack')}
            className={`flex-1 py-1.5 rounded-lg text-xs font-['Space_Grotesk'] font-bold transition-all ${
              selectedFormat === 'slack'
                ? 'bg-[#ec6a06] text-[#4a1c00] shadow'
                : 'text-[#bbcabf] hover:text-white'
            }`}
          >
            Slack
          </button>
          <button
            onClick={() => setSelectedFormat('teams')}
            className={`flex-1 py-1.5 rounded-lg text-xs font-['Space_Grotesk'] font-bold transition-all ${
              selectedFormat === 'teams'
                ? 'bg-[#b090ff] text-[#23005c] shadow'
                : 'text-[#bbcabf] hover:text-white'
            }`}
          >
            MS Teams
          </button>
        </div>

        {/* Preview Box */}
        <div className="bg-[#060e20] p-3 rounded-xl border border-white/10 text-xs font-mono text-[#bbcabf] whitespace-pre-wrap leading-relaxed max-h-40 overflow-y-auto">
          {templates[selectedFormat]}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={handleCopy}
            className="flex-1 bg-[#4edea3] hover:bg-[#6ffbbe] text-[#003824] font-['Space_Grotesk'] font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-[0_0_15px_rgba(78,222,163,0.3)]"
          >
            <span className="material-symbols-outlined text-lg">
              {copied ? 'done' : 'content_copy'}
            </span>
            <span>{copied ? 'Copiado!' : 'Copiar Texto'}</span>
          </button>

          <button
            onClick={handleNativeShare}
            className="bg-[#222a3d] hover:bg-[#2d3449] text-[#dae2fd] p-2.5 rounded-xl flex items-center justify-center transition-transform active:scale-95 border border-white/10"
            title="Compartilhar direto"
          >
            <span className="material-symbols-outlined text-xl">share</span>
          </button>
        </div>
      </div>
    </div>
  );
};
