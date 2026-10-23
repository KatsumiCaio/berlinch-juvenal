import React, { useState } from 'react';
import { Excuse } from '../types';
import { soundEffects } from '../utils/audio';

interface AddExcuseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddExcuse: (excuse: Excuse) => void;
  onShowToast: (msg: string) => void;
}

export const AddExcuseModal: React.FC<AddExcuseModalProps> = ({
  isOpen,
  onClose,
  onAddExcuse,
  onShowToast
}) => {
  const [text, setText] = useState('');
  const [category, setCategory] = useState('Home Office Ninja');
  const [author, setAuthor] = useState('');

  if (!isOpen) return null;

  const categories = [
    'Home Office Ninja',
    'Tecnologia Falha',
    'Aventuras do Prédio',
    'Arquivo Confidencial',
    'Clássicos do Escritório',
    'Polo Verde Style',
    'Sinceridade Máxima'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    soundEffects.playFanfare();
    const newExcuse: Excuse = {
      id: 'excuse-' + Date.now(),
      text: text.trim(),
      category: category,
      successRate: `${(92 + Math.random() * 7.9).toFixed(1)}% Taxa de Sucesso`,
      author: author.trim() || 'Colaborador Anônimo'
    };

    onAddExcuse(newExcuse);
    onShowToast('✨ Desculpa homologada pelo conselho do Juvena!');
    setText('');
    setAuthor('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#171f33] border border-[#4edea3]/30 rounded-3xl p-5 shadow-2xl flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-[#4edea3]/20 text-[#4edea3] flex items-center justify-center text-lg">
              🧙‍♂️
            </span>
            <div>
              <h3 className="font-['Bricolage_Grotesque'] text-lg font-bold text-[#dae2fd]">
                Propor Desculpa ao Conselho
              </h3>
              <p className="font-['Space_Grotesk'] text-xs text-[#bbcabf]">
                Submeta uma justificativa corporativa de alto escalão
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

        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
          <div>
            <label className="block text-xs font-['Space_Grotesk'] font-bold text-[#bbcabf] mb-1">
              A Desculpa / Justificativa *
            </label>
            <textarea
              required
              rows={3}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Ex: Caiu o disjuntor do condomínio e travou meu teclado no mudo..."
              className="w-full bg-[#0b1326] border border-white/15 focus:border-[#4edea3] rounded-xl p-3 text-sm text-[#dae2fd] placeholder-[#64748b] outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-['Space_Grotesk'] font-bold text-[#bbcabf] mb-1">
              Categoria Tática
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-[#0b1326] border border-white/15 focus:border-[#4edea3] rounded-xl p-2.5 text-xs text-[#dae2fd] outline-none"
            >
              {categories.map((c) => (
                <option key={c} value={c} className="bg-[#171f33]">
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-['Space_Grotesk'] font-bold text-[#bbcabf] mb-1">
              Seu Nome ou Codinome (Opcional)
            </label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Ex: Ninja do 5º Andar"
              className="w-full bg-[#0b1326] border border-white/15 focus:border-[#4edea3] rounded-xl p-2.5 text-xs text-[#dae2fd] placeholder-[#64748b] outline-none"
            />
          </div>

          <div className="flex gap-2 pt-2">
            <button
              type="submit"
              className="flex-1 bg-[#4edea3] hover:bg-[#6ffbbe] text-[#003824] font-['Space_Grotesk'] font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 active:scale-95 transition-transform shadow-[0_0_15px_rgba(78,222,163,0.3)]"
            >
              <span className="material-symbols-outlined text-sm">verified</span>
              <span>Homologar Desculpa</span>
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
