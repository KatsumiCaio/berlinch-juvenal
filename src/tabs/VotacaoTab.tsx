import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { VoteCategory } from '../types';
import { soundEffects } from '../utils/audio';

interface VotacaoTabProps {
  categories: VoteCategory[];
  onUpdateCategories: (categories: VoteCategory[]) => void;
  onShowToast: (msg: string) => void;
}

export const VotacaoTab: React.FC<VotacaoTabProps> = ({
  categories,
  onUpdateCategories,
  onShowToast
}) => {
  const [selectedCatId, setSelectedCatId] = useState(categories[0]?.id || 'cat-1');

  const currentCat = categories.find((c) => c.id === selectedCatId) || categories[0];

  const handleVote = (candidateId: string) => {
    soundEffects.playFanfare();
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
    } catch (e) {
      // ignore
    }

    const updated = categories.map((cat) => {
      if (cat.id !== currentCat.id) return cat;

      const prevUserVotedId = cat.userVotedId;
      const updatedCandidates = cat.candidates.map((cand) => {
        if (cand.id === candidateId) {
          return { ...cand, votes: cand.votes + 1 };
        }
        if (cand.id === prevUserVotedId && prevUserVotedId !== candidateId) {
          return { ...cand, votes: Math.max(0, cand.votes - 1) };
        }
        return cand;
      });

      return {
        ...cat,
        candidates: updatedCandidates,
        userVotedId: candidateId
      };
    });

    onUpdateCategories(updated);
    onShowToast('🗳️ Seu voto foi computado na urna auditada pelo Juvena!');
  };

  const totalVotes = currentCat.candidates.reduce((sum, c) => sum + c.votes, 0);

  return (
    <div className="flex flex-col w-full gap-5 relative pb-8">
      {/* Header banner */}
      <div className="bg-[#171f33]/80 backdrop-blur-xl border border-white/5 rounded-2xl p-4 shadow-xl flex flex-col gap-2 mt-2">
        <div className="flex items-center gap-2 text-[#4edea3]">
          <span className="material-symbols-outlined text-[24px]">how_to_vote</span>
          <span className="font-['Space_Grotesk'] text-xs font-bold uppercase tracking-wider">
            Urna Paralela Eletrônica 2024
          </span>
        </div>
        <h2 className="font-['Bricolage_Grotesque'] text-2xl font-bold text-[#dae2fd]">
          Eleições de Gala Corporativa
        </h2>
        <p className="font-['Plus_Jakarta_Sans'] text-xs text-[#bbcabf] leading-relaxed">
          Vote nas maiores proezas de coragem, sumiço e sinergia da firma. Votação 100% anônima e inviolável.
        </p>

        {/* Category Pills */}
        <div className="flex gap-2 overflow-x-auto pt-2 pb-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                soundEffects.playPop();
                setSelectedCatId(cat.id);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-['Space_Grotesk'] font-bold whitespace-nowrap transition-all border ${
                selectedCatId === cat.id
                  ? 'bg-[#4edea3] text-[#003824] border-[#4edea3] shadow-[0_0_12px_rgba(78,222,163,0.4)]'
                  : 'bg-[#222a3d] text-[#bbcabf] border-white/5 hover:text-white'
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>
      </div>

      {/* Active Ballot */}
      <div className="bg-[#131b2e] rounded-2xl p-4 shadow-xl flex flex-col gap-3.5 border border-white/5">
        <div className="flex items-center justify-between pb-2 border-b border-white/10">
          <div>
            <h3 className="font-['Bricolage_Grotesque'] text-lg font-bold text-[#dae2fd]">
              {currentCat.title}
            </h3>
            <p className="font-['Space_Grotesk'] text-xs text-[#d0bcff]">
              {currentCat.subtitle}
            </p>
          </div>
          <span className="font-['Space_Grotesk'] text-[11px] text-[#bbcabf] font-semibold bg-[#222a3d] px-2.5 py-1 rounded-full border border-white/5">
            {totalVotes} votos
          </span>
        </div>

        {/* Candidates list */}
        <div className="flex flex-col gap-2.5">
          {currentCat.candidates.map((candidate) => {
            const isVoted = currentCat.userVotedId === candidate.id;
            const percent = totalVotes > 0 ? Math.round((candidate.votes / totalVotes) * 100) : 0;

            return (
              <div
                key={candidate.id}
                className={`relative p-3.5 rounded-2xl border transition-all ${
                  isVoted
                    ? 'bg-[#171f33] border-[#4edea3] shadow-[0_0_15px_rgba(78,222,163,0.2)]'
                    : 'bg-[#171f33]/60 border-white/5 hover:border-white/15'
                }`}
              >
                {/* Progress bar fill in background */}
                <div
                  className={`absolute left-0 top-0 bottom-0 rounded-2xl transition-all duration-500 opacity-15 pointer-events-none ${
                    isVoted ? 'bg-[#4edea3]' : 'bg-[#bbcabf]'
                  }`}
                  style={{ width: `${percent}%` }}
                />

                <div className="relative z-10 flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-['Bricolage_Grotesque'] text-sm sm:text-base font-bold text-white">
                        {candidate.title}
                      </span>
                      {candidate.badge && (
                        <span className="bg-[#ec6a06]/20 text-[#ffb690] text-[9px] font-black font-['Space_Grotesk'] px-1.5 py-0.5 rounded border border-[#ec6a06]/30">
                          {candidate.badge}
                        </span>
                      )}
                    </div>
                    <p className="font-['Plus_Jakarta_Sans'] text-xs text-[#bbcabf] mt-0.5">
                      {candidate.description}
                    </p>
                  </div>

                  <div className="flex flex-col items-end gap-1.5 shrink-0">
                    <span className="font-['Space_Grotesk'] text-sm font-bold text-[#4edea3]">
                      {percent}%
                    </span>
                    <button
                      onClick={() => handleVote(candidate.id)}
                      className={`px-3 py-1 rounded-xl text-xs font-['Space_Grotesk'] font-bold transition-all active:scale-95 ${
                        isVoted
                          ? 'bg-[#4edea3] text-[#003824] shadow'
                          : 'bg-[#222a3d] hover:bg-[#2d3449] text-[#dae2fd] border border-white/10'
                      }`}
                    >
                      {isVoted ? 'Votado ✓' : 'Votar'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
