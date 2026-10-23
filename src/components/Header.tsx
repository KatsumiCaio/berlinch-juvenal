import React from 'react';

interface HeaderProps {
  onOpenModoLouco: () => void;
  onOpenProfile: () => void;
  isModoLoucoActive: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenModoLouco,
  onOpenProfile,
  isModoLoucoActive
}) => {
  return (
    <header className="fixed top-0 w-full z-50 bg-[#060e20]/85 backdrop-blur-xl border-b border-white/5 shadow-[0_1px_12px_rgba(0,0,0,0.35)] pt-safe">
      <div className="h-16 px-4 max-w-lg mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-[#222a3d] border border-[#4edea3]/20 flex items-center justify-center transform -rotate-3 shadow-[0_0_14px_rgba(78,222,163,0.3)] transition-transform hover:rotate-0">
            <span className="text-xl">🏆</span>
          </div>
          <div className="flex flex-col">
            <span className="font-['Bricolage_Grotesque'] text-[17px] text-[#4edea3] font-extrabold tracking-tight leading-none uppercase drop-shadow-[0_0_10px_rgba(78,222,163,0.3)]">
              JUVENAL AWARDS
            </span>
            <span className="font-['Space_Grotesk'] text-[10px] text-[#d0bcff] font-bold tracking-widest uppercase mt-0.5">
              Hall Da Fama
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Fire / Modo Louco button */}
          <button
            onClick={onOpenModoLouco}
            aria-label="Ativar Modo 100% Louco"
            title="Ativar Modo 100% Louco"
            className={`w-11 h-11 flex items-center justify-center rounded-xl transition-all active:scale-95 ${
              isModoLoucoActive
                ? 'bg-gradient-to-tr from-[#ec6a06] to-[#facc15] text-[#060e20] shadow-[0_0_20px_rgba(236,106,6,0.6)] animate-pulse'
                : 'bg-[#171f33] text-[#ffb690] hover:text-[#ffdbca] border border-white/5 hover:border-[#ec6a06]/40'
            }`}
          >
            <span className="material-symbols-outlined text-[24px]">local_fire_department</span>
          </button>

          {/* Profile / Badge Creator button */}
          <button
            onClick={onOpenProfile}
            aria-label="Abrir Crachá Oficial"
            title="Abrir Crachá Oficial"
            className="w-9 h-9 rounded-full bg-[#4edea3] hover:bg-[#6ffbbe] flex items-center justify-center shadow-[0_0_12px_rgba(78,222,163,0.5)] transition-transform active:scale-90"
          >
            <span className="material-symbols-outlined text-[#003824] text-[20px] font-bold">person</span>
          </button>
        </div>
      </div>
    </header>
  );
};
