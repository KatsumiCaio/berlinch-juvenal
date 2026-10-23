import React, { useState } from 'react';
import { soundEffects } from '../utils/audio';

interface StatusPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentStatus: string;
  onSelectStatus: (status: string) => void;
  onShowToast: (msg: string) => void;
}

export const StatusPickerModal: React.FC<StatusPickerModalProps> = ({
  isOpen,
  onClose,
  currentStatus,
  onSelectStatus,
  onShowToast
}) => {
  const [customText, setCustomText] = useState('');

  if (!isOpen) return null;

  const quickStatuses = [
    'Online no Slack fingindo costume',
    'Em reunião com o mudo ligado e câmera off',
    'Fui ali no banheiro do 4º andar e já volto',
    'Atualizando o Windows há 3 horas e meia',
    'Na fila do almoço por quilo comendo pastel',
    'Alinhamento de sinergia interdepartamental',
    'Eu tô muito louco Juvena!'
  ];

  const handleSelect = (status: string) => {
    soundEffects.playSlackKnock();
    onSelectStatus(status);
    onShowToast(`💬 Status atualizado: "${status}"`);
    onClose();
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customText.trim()) return;
    handleSelect(customText.trim());
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-sm bg-[#171f33] border border-[#4edea3]/30 rounded-3xl p-5 shadow-2xl flex flex-col gap-3.5">
        <div className="flex items-center justify-between pb-2 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#4edea3] animate-ping" />
            <h3 className="font-['Bricolage_Grotesque'] text-base font-bold text-[#dae2fd]">
              Alterar Status no Slack
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#222a3d] text-[#bbcabf] hover:text-white flex items-center justify-center"
          >
            ✕
          </button>
        </div>

        <div className="flex flex-col gap-1.5 max-h-56 overflow-y-auto pr-1">
          {quickStatuses.map((st) => (
            <button
              key={st}
              onClick={() => handleSelect(st)}
              className={`p-2.5 rounded-xl text-left text-xs font-['Space_Grotesk'] transition-all flex items-center gap-2 ${
                currentStatus === st
                  ? 'bg-[#10b981]/20 border border-[#4edea3] text-[#4edea3] font-bold'
                  : 'bg-[#0b1326] hover:bg-[#222a3d] text-[#dae2fd]'
              }`}
            >
              <span className="text-sm">🟢</span>
              <span className="truncate">{st}</span>
            </button>
          ))}
        </div>

        <form onSubmit={handleCustomSubmit} className="pt-2 border-t border-white/10 flex gap-2">
          <input
            type="text"
            value={customText}
            onChange={(e) => setCustomText(e.target.value)}
            placeholder="Ou digite seu status personalizado..."
            className="flex-1 bg-[#0b1326] border border-white/15 focus:border-[#4edea3] rounded-xl px-3 py-2 text-xs text-[#dae2fd] outline-none"
          />
          <button
            type="submit"
            className="bg-[#4edea3] text-[#003824] px-3 py-2 rounded-xl text-xs font-['Space_Grotesk'] font-bold active:scale-95"
          >
            OK
          </button>
        </form>
      </div>
    </div>
  );
};
