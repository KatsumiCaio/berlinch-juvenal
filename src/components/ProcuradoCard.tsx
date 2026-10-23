import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { soundEffects } from '../utils/audio';

interface ProcuradoCardProps {
  onOpenFullscreen: (src: string, title: string, subtitle: string) => void;
  onAddFianca: () => void;
  onShowToast: (msg: string) => void;
}

export const ProcuradoCard: React.FC<ProcuradoCardProps> = ({
  onOpenFullscreen,
  onAddFianca,
  onShowToast
}) => {
  const [sightings, setSightings] = useState(42);

  const handleAvistamento = () => {
    soundEffects.playRhAlert();
    setSightings((prev) => prev + 1);
    onShowToast('🚨 Avistamento registrado: Juvenal foi visto na mesa do boteco às 16h02!');
  };

  const handlePagarFianca = () => {
    soundEffects.playBeerClink();
    onAddFianca();
    try {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ffb690', '#facc15', '#4edea3']
      });
    } catch (e) {
      // ignore
    }
    onShowToast('🍻 Fiança de 1 chopp paga! Juvenal segue em liberdade corporativa.');
  };

  return (
    <div className="bg-[#131b2e] rounded-3xl p-5 shadow-2xl flex flex-col gap-4 relative overflow-hidden border-2 border-[#ec6a06]/40">
      {/* Warning Hazard Stripe on Top */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#ec6a06] via-[#facc15] to-[#ec6a06]" />

      {/* Header */}
      <div className="flex items-center justify-between pb-2 border-b border-white/10">
        <div className="flex items-center gap-2">
          <span className="w-8 h-8 rounded-xl bg-[#ec6a06]/20 text-[#ffb690] flex items-center justify-center text-lg border border-[#ec6a06]/40">
            ⚠️
          </span>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-['Bricolage_Grotesque'] text-lg font-black text-white uppercase tracking-tight">
                Mandado do RH: PROCURADO
              </h3>
            </div>
            <p className="font-['Space_Grotesk'] text-[11px] text-[#ffb690] font-semibold">
              Recompensa: 1 Chopp gelado e saída antecipada
            </p>
          </div>
        </div>
        <span className="text-[10px] font-['Space_Grotesk'] font-black bg-[#93000a] text-[#ffdad6] px-2.5 py-1 rounded-full uppercase tracking-widest border border-[#ffb4ab]/30 animate-pulse">
          URGENTE
        </span>
      </div>

      {/* Poster Image Frame */}
      <div className="relative flex flex-col items-center bg-[#060e20] p-3 rounded-2xl border border-white/10 shadow-inner group">
        <div
          onClick={() =>
            onOpenFullscreen(
              '/assets/aistudio/image_7e749432.png',
              'Mandado do RH: JUVENAL PROCURADO',
              'Acusado de beijar a firma inteira no treinamento, sumir às 16h da sexta e alegar quebra de silos corporativos.'
            )
          }
          className="relative max-w-[280px] w-full rounded-2xl overflow-hidden cursor-pointer shadow-xl transition-transform group-hover:scale-102"
        >
          <img
            src="/assets/aistudio/image_7e749432.png"
            alt="Juvenal Procurado"
            className="w-full h-auto object-contain rounded-2xl"
            onError={(e) => {
              const target = e.currentTarget;
              if (!target.src.includes('/public/')) {
                target.src = '/public/assets/aistudio/image_7e749432.png';
              }
            }}
          />

          {/* Stamp overlay */}
          <div className="absolute top-4 right-2 bg-[#93000a] text-[#ffdad6] font-['Bricolage_Grotesque'] px-3 py-0.5 rounded-lg uppercase tracking-wider shadow-2xl transform rotate-12 flex items-center gap-1 border border-[#ffb4ab]/40">
            <span className="material-symbols-outlined text-[14px]">local_police</span>
            <span className="text-[10px] font-black tracking-widest">OUVIDORIA</span>
          </div>

          <div className="absolute bottom-14 inset-x-0 bg-black/40 backdrop-blur-xs py-1 text-center opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="font-['Space_Grotesk'] text-[11px] text-white flex items-center justify-center gap-1">
              <span className="material-symbols-outlined text-[14px]">zoom_in</span>
              Clique para ampliar cartaz
            </span>
          </div>
        </div>

        {/* Crimes List / Ficha Corrida */}
        <div className="w-full mt-3 p-3 bg-[#171f33] rounded-xl border border-white/5 flex flex-col gap-1.5 text-xs font-['Plus_Jakarta_Sans']">
          <div className="flex items-center justify-between text-[11px] font-['Space_Grotesk'] font-bold text-[#ffb690] pb-1 border-b border-white/5">
            <span>FICHA CORRIDA CORPORATIVA</span>
            <span>AVISTAMENTOS: {sightings}</span>
          </div>

          <div className="flex items-start gap-1.5 text-[#dae2fd]">
            <span className="text-[#ec6a06] font-bold">•</span>
            <span><strong>Art. 171:</strong> Alegou que o beijo no treinamento era "alinhamento estratégico de sinergia".</span>
          </div>
          <div className="flex items-start gap-1.5 text-[#dae2fd]">
            <span className="text-[#ec6a06] font-bold">•</span>
            <span><strong>Art. 16:</strong> Visto saindo às 15h58 na sexta com status verde ativo no Slack.</span>
          </div>
          <div className="flex items-start gap-1.5 text-[#dae2fd]">
            <span className="text-[#ec6a06] font-bold">•</span>
            <span><strong>Art. 42:</strong> Disse em alto e bom som: <em>"Eu tô muito louco Juvenal!"</em> para a diretoria.</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2">
        <button
          onClick={handleAvistamento}
          className="flex-1 bg-[#222a3d] hover:bg-[#2d3449] text-[#ffb690] font-['Space_Grotesk'] font-bold text-xs py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 border border-[#ec6a06]/40 active:scale-95 transition-all shadow"
        >
          <span className="material-symbols-outlined text-sm">visibility</span>
          <span>Avistar no Boteco ({sightings})</span>
        </button>

        <button
          onClick={handlePagarFianca}
          className="flex-1 bg-gradient-to-r from-[#ec6a06] to-[#f97316] hover:from-[#f97316] hover:to-[#ec6a06] text-[#283044] font-['Space_Grotesk'] font-black text-xs py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 active:scale-95 transition-transform shadow-[0_0_15px_rgba(236,106,6,0.35)]"
        >
          <span className="text-sm">🍻</span>
          <span>Pagar Fiança de 1 Chopp</span>
        </button>
      </div>
    </div>
  );
};
