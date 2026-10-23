import React, { useState } from 'react';
import { HonoraryTitle } from '../types';
import { soundEffects } from '../utils/audio';

interface AddTitleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTitle: (title: HonoraryTitle) => void;
  onShowToast: (msg: string) => void;
}

export const AddTitleModal: React.FC<AddTitleModalProps> = ({
  isOpen,
  onClose,
  onAddTitle,
  onShowToast
}) => {
  const [emoji, setEmoji] = useState('🏆');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tier, setTier] = useState<'OURO' | 'ÉPICO' | 'DIAMANTE' | 'PRATA'>('OURO');

  if (!isOpen) return null;

  const popularEmojis = ['🏆', '🥇', '🍺', '🎭', '🥷', '☕', '🎪', '👔', '👑', '🍕'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    soundEffects.playFanfare();
    const newTitleItem: HonoraryTitle = {
      id: 'title-' + Date.now(),
      emoji: emoji || '🏆',
      title: title.trim(),
      description: description.trim(),
      tier: tier,
      votes: 1
    };

    onAddTitle(newTitleItem);
    onShowToast('🎖️ Novo título adicionado ao Mural de Honrarias!');
    setTitle('');
    setDescription('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#171f33] border border-[#ffb690]/30 rounded-3xl p-5 shadow-2xl flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-[#ffb690]/20 text-[#ffb690] flex items-center justify-center text-lg">
              🎖️
            </span>
            <div>
              <h3 className="font-['Bricolage_Grotesque'] text-lg font-bold text-[#dae2fd]">
                Propor Título Honorário
              </h3>
              <p className="font-['Space_Grotesk'] text-xs text-[#bbcabf]">
                Para quem faz história nos corredores da firma
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

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {/* Emoji selector */}
          <div>
            <label className="block text-xs font-['Space_Grotesk'] font-bold text-[#bbcabf] mb-1">
              Emoji da Condecoração
            </label>
            <div className="flex flex-wrap gap-1.5">
              {popularEmojis.map((e) => (
                <button
                  type="button"
                  key={e}
                  onClick={() => setEmoji(e)}
                  className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg transition-transform ${
                    emoji === e
                      ? 'bg-[#4edea3] text-black scale-110 shadow-[0_0_10px_#4edea3]'
                      : 'bg-[#0b1326] hover:bg-[#222a3d]'
                  }`}
                >
                  {e}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-['Space_Grotesk'] font-bold text-[#bbcabf] mb-1">
              Nome do Título *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Embaixador da Saída das 16h"
              className="w-full bg-[#0b1326] border border-white/15 focus:border-[#4edea3] rounded-xl p-2.5 text-xs text-[#dae2fd] placeholder-[#64748b] outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-['Space_Grotesk'] font-bold text-[#bbcabf] mb-1">
              Critério da Honraria *
            </label>
            <input
              type="text"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ex: Fechou o notebook com maestria antes do chefe respirar"
              className="w-full bg-[#0b1326] border border-white/15 focus:border-[#4edea3] rounded-xl p-2.5 text-xs text-[#dae2fd] placeholder-[#64748b] outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-['Space_Grotesk'] font-bold text-[#bbcabf] mb-1">
              Patamar da Condecoração
            </label>
            <div className="grid grid-cols-4 gap-1.5">
              {(['OURO', 'ÉPICO', 'DIAMANTE', 'PRATA'] as const).map((t) => (
                <button
                  type="button"
                  key={t}
                  onClick={() => setTier(t)}
                  className={`py-1.5 rounded-lg text-[10px] font-['Space_Grotesk'] font-bold uppercase transition-all ${
                    tier === t
                      ? 'bg-[#10b981] text-[#002113] shadow'
                      : 'bg-[#0b1326] text-[#bbcabf]'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <button
              type="submit"
              className="flex-1 bg-[#ffb690] hover:bg-[#ffdbca] text-[#552100] font-['Space_Grotesk'] font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-1.5 active:scale-95 transition-transform"
            >
              <span className="material-symbols-outlined text-sm">workspace_premium</span>
              <span>Condecorar</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-[#222a3d] hover:bg-[#2d3449] text-[#dae2fd] font-['Space_Grotesk'] text-xs py-2.5 px-4 rounded-xl"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
