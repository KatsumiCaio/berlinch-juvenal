import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { soundEffects } from '../utils/audio';

interface ModoLoucoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddMoralSupport: (amount: number) => void;
  onShowToast: (msg: string) => void;
}

export const ModoLoucoModal: React.FC<ModoLoucoModalProps> = ({
  isOpen,
  onClose,
  onAddMoralSupport,
  onShowToast
}) => {
  const [loucuraLevel, setLoucuraLevel] = useState(100);
  const [activePhrase, setActivePhrase] = useState('EU TÔ MUITO LOUCO JUVENA!');

  const crazyPhrases = [
    'EU TÔ MUITO LOUCO JUVENA!',
    'CANETA AZUL, AZUL CANETA, HOJE NÃO TEM SPRINT!',
    'SEXTOU ÀS 11H DA MANHÃ COM APROVAÇÃO DO DIRETOR!',
    'O RH TÁ OLHANDO MAS NÃO PODE FAZER NADA!',
    'HOMOLOGADO PELA DIRETORIA DE AFETO CORPORATIVO!',
    'ALINHAMENTO DE SINERGIA COM TORRESMO E CHOPP!'
  ];

  useEffect(() => {
    if (isOpen) {
      soundEffects.playAirHorn();
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#4edea3', '#ffb690', '#d0bcff', '#facc15', '#ec6a06']
        });
      } catch (e) {
        // ignore
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const boostLoucura = () => {
    soundEffects.playAirHorn();
    const newLvl = loucuraLevel + 25;
    setLoucuraLevel(newLvl);
    const randomPhrase = crazyPhrases[Math.floor(Math.random() * crazyPhrases.length)];
    setActivePhrase(randomPhrase);
    onAddMoralSupport(5);
    try {
      confetti({
        particleCount: 60,
        spread: 100,
        origin: { y: 0.5 }
      });
    } catch (e) {
      // ignore
    }
    onShowToast(`🔥 Nível de loucura subiu para ${newLvl}%! +5 Apoios Morais!`);
  };

  const handleBeerRound = () => {
    soundEffects.playBeerClink();
    onAddMoralSupport(10);
    onShowToast('🍻 Rodada de cerveja virtual paga pro setor inteiro!');
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.7 }
      });
    } catch (e) {
      // ignore
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-sm bg-gradient-to-b from-[#222a3d] via-[#171f33] to-[#0b1326] border-2 border-[#ec6a06] rounded-3xl p-6 shadow-[0_0_50px_rgba(236,106,6,0.5)] flex flex-col items-center text-center gap-4">
        {/* Glow */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-48 bg-[#ec6a06]/30 rounded-full blur-3xl pointer-events-none" />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#2d3449] text-[#dae2fd] hover:text-white flex items-center justify-center"
        >
          ✕
        </button>

        {/* Animated Badge */}
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#ec6a06] to-[#facc15] flex items-center justify-center text-3xl shadow-[0_0_20px_rgba(236,106,6,0.7)] animate-bounce mt-2">
          🔥
        </div>

        <div>
          <span className="font-['Space_Grotesk'] text-xs font-black tracking-widest text-[#ffb690] uppercase bg-[#ec6a06]/20 px-3 py-1 rounded-full border border-[#ec6a06]/40">
            MODO 100% LOUCO ATIVADO
          </span>
          <h2 className="font-['Bricolage_Grotesque'] text-2xl font-black text-white mt-2">
            Nível: <span className="text-[#facc15]">{loucuraLevel}%</span>
          </h2>
        </div>

        {/* Quote banner */}
        <div className="w-full bg-[#060e20] p-3 rounded-2xl border border-[#ec6a06]/30 shadow-inner">
          <p className="font-['Bricolage_Grotesque'] text-sm font-extrabold text-[#4edea3] italic">
            "{activePhrase}"
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-2.5 w-full mt-2">
          <button
            onClick={boostLoucura}
            className="w-full bg-gradient-to-r from-[#ec6a06] to-[#f97316] text-[#283044] font-['Space_Grotesk'] font-black py-3 rounded-xl flex items-center justify-center gap-2 active:scale-95 transition-transform shadow-[0_0_20px_rgba(236,106,6,0.4)]"
          >
            <span className="text-xl">📢</span>
            <span>Apertar Buzina da Loucura</span>
          </button>

          <button
            onClick={handleBeerRound}
            className="w-full bg-[#171f33] hover:bg-[#222a3d] text-[#ffb690] border border-[#ffb690]/30 font-['Space_Grotesk'] font-bold py-2.5 rounded-xl flex items-center justify-center gap-2 active:scale-95 transition-transform"
          >
            <span className="text-xl">🍻</span>
            <span>Pagar Rodada Pro Setor (+10 Apoios)</span>
          </button>

          <button
            onClick={onClose}
            className="w-full text-xs text-[#bbcabf] hover:text-white py-1.5 font-['Space_Grotesk']"
          >
            Voltar ao trabalho fingindo costume
          </button>
        </div>
      </div>
    </div>
  );
};
