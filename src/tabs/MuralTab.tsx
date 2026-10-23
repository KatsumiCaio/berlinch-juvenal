import React, { useState } from 'react';
import { MemePost } from '../types';
import { soundEffects } from '../utils/audio';

interface MuralTabProps {
  memes: MemePost[];
  onUpdateMemes: (memes: MemePost[]) => void;
  onShowToast: (msg: string) => void;
}

export const MuralTab: React.FC<MuralTabProps> = ({
  memes,
  onUpdateMemes,
  onShowToast
}) => {
  const [newQuote, setNewQuote] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newRole, setNewRole] = useState('');
  const [isPosting, setIsPosting] = useState(false);
  const [activeFilter, setActiveFilter] = useState('TODOS');

  const handleLike = (id: string) => {
    soundEffects.playBeerClink();
    const updated = memes.map((m) => {
      if (m.id === id) {
        return { ...m, likes: m.likes + 1 };
      }
      return m;
    });
    onUpdateMemes(updated);
  };

  const handlePostMeme = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuote.trim()) return;

    soundEffects.playFanfare();
    const newPost: MemePost = {
      id: 'm-' + Date.now(),
      author: newAuthor.trim() || 'Colega de Baia',
      role: newRole.trim() || 'Observador Corporativo',
      quote: newQuote.trim(),
      timestamp: 'Agora mesmo',
      likes: 1,
      tags: ['Novo', 'Firma']
    };

    onUpdateMemes([newPost, ...memes]);
    onShowToast('🎉 Frase/Meme publicado no Mural da Firma!');
    setNewQuote('');
    setNewAuthor('');
    setNewRole('');
    setIsPosting(false);
  };

  const allTags = ['TODOS', 'Clássico', 'Sextou', 'RH', 'Slack'];

  const filteredMemes = memes.filter((m) => {
    if (activeFilter === 'TODOS') return true;
    return m.tags.includes(activeFilter);
  });

  return (
    <div className="flex flex-col w-full gap-5 relative pb-8">
      {/* Top Banner */}
      <div className="bg-[#171f33]/80 backdrop-blur-xl border border-white/5 rounded-2xl p-4 shadow-xl flex flex-col gap-2 mt-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-[#d0bcff]">
            <span className="material-symbols-outlined text-[24px]">mood</span>
            <span className="font-['Space_Grotesk'] text-xs font-bold uppercase tracking-wider">
              Mural da Firma & Pérolas
            </span>
          </div>
          <button
            onClick={() => setIsPosting(!isPosting)}
            className="text-xs font-['Space_Grotesk'] font-bold text-[#4edea3] hover:underline flex items-center gap-1"
          >
            <span>{isPosting ? '✕ Fechar' : '+ Postar Pérola'}</span>
          </button>
        </div>

        <h2 className="font-['Bricolage_Grotesque'] text-2xl font-bold text-[#dae2fd]">
          Frases Que Viraram Filosofia
        </h2>
        <p className="font-['Plus_Jakarta_Sans'] text-xs text-[#bbcabf] leading-relaxed">
          Citações memoráveis ouvidas na copa, no elevador e durante reuniões que poderiam ser um email.
        </p>

        {/* Filter tags */}
        <div className="flex gap-2 pt-2 overflow-x-auto">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => {
                soundEffects.playPop();
                setActiveFilter(tag);
              }}
              className={`px-3 py-1 rounded-xl text-xs font-['Space_Grotesk'] font-bold whitespace-nowrap transition-all border ${
                activeFilter === tag
                  ? 'bg-[#b090ff] text-[#23005c] border-[#b090ff] shadow'
                  : 'bg-[#222a3d] text-[#bbcabf] border-white/5 hover:text-white'
              }`}
            >
              #{tag}
            </button>
          ))}
        </div>
      </div>

      {/* Post creation card if active */}
      {isPosting && (
        <form
          onSubmit={handlePostMeme}
          className="bg-[#171f33] border border-[#4edea3]/40 rounded-2xl p-4 shadow-xl flex flex-col gap-3 animate-in fade-in duration-200"
        >
          <h3 className="font-['Bricolage_Grotesque'] text-sm font-bold text-[#4edea3]">
            Publicar no Mural da Firma
          </h3>

          <textarea
            required
            rows={2}
            value={newQuote}
            onChange={(e) => setNewQuote(e.target.value)}
            placeholder="Qual frase memorável foi dita hoje na firma?"
            className="w-full bg-[#0b1326] border border-white/15 focus:border-[#4edea3] rounded-xl p-2.5 text-xs text-[#dae2fd] placeholder-[#64748b] outline-none"
          />

          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              value={newAuthor}
              onChange={(e) => setNewAuthor(e.target.value)}
              placeholder="Quem disse? (Ex: Juvena)"
              className="bg-[#0b1326] border border-white/15 focus:border-[#4edea3] rounded-xl p-2 text-xs text-[#dae2fd] placeholder-[#64748b] outline-none"
            />
            <input
              type="text"
              value={newRole}
              onChange={(e) => setNewRole(e.target.value)}
              placeholder="Cargo / Setor (Ex: Marketing)"
              className="bg-[#0b1326] border border-white/15 focus:border-[#4edea3] rounded-xl p-2 text-xs text-[#dae2fd] placeholder-[#64748b] outline-none"
            />
          </div>

          <div className="flex justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={() => setIsPosting(false)}
              className="px-3 py-1.5 rounded-xl text-xs font-['Space_Grotesk'] text-[#bbcabf] hover:text-white"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-[#4edea3] hover:bg-[#6ffbbe] text-[#003824] font-['Space_Grotesk'] font-bold text-xs px-4 py-1.5 rounded-xl shadow active:scale-95"
            >
              Postar
            </button>
          </div>
        </form>
      )}

      {/* Meme cards */}
      <div className="flex flex-col gap-3">
        {filteredMemes.map((meme) => (
          <div
            key={meme.id}
            className="bg-[#131b2e] border border-white/5 rounded-2xl p-4 shadow-lg flex flex-col gap-2.5 relative group hover:border-[#4edea3]/30 transition-all"
          >
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#222a3d] flex items-center justify-center font-bold text-[#4edea3] text-sm">
                  {meme.author.charAt(0)}
                </div>
                <div>
                  <h4 className="font-['Bricolage_Grotesque'] text-sm font-bold text-white leading-none">
                    {meme.author}
                  </h4>
                  <span className="font-['Space_Grotesk'] text-[10px] text-[#bbcabf]">
                    {meme.role} • {meme.timestamp}
                  </span>
                </div>
              </div>

              <div className="flex gap-1">
                {meme.tags.map((t) => (
                  <span
                    key={t}
                    className="text-[9px] font-['Space_Grotesk'] font-bold px-1.5 py-0.5 rounded bg-[#222a3d] text-[#d0bcff]"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </div>

            <p className="font-['Plus_Jakarta_Sans'] text-sm sm:text-[15px] text-[#dae2fd] italic pl-2 border-l-2 border-[#4edea3]/60 py-1 leading-relaxed">
              "{meme.quote}"
            </p>

            <div className="flex items-center justify-between pt-2 border-t border-white/5">
              <button
                onClick={() => handleLike(meme.id)}
                className="flex items-center gap-1.5 text-xs font-['Space_Grotesk'] font-bold text-[#ffb690] hover:text-white active:scale-90 transition-transform bg-[#222a3d] px-3 py-1 rounded-full border border-white/5"
              >
                <span>🍻</span>
                <span>{meme.likes} Brindes</span>
              </button>

              <button
                onClick={() => {
                  soundEffects.playPop();
                  navigator.clipboard.writeText(`"${meme.quote}" - ${meme.author}`);
                  onShowToast('📋 Citação copiada para a área de transferência!');
                }}
                className="text-xs text-[#bbcabf] hover:text-[#4edea3] flex items-center gap-1 font-['Space_Grotesk']"
              >
                <span className="material-symbols-outlined text-[14px]">share</span>
                <span>Copiar</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
