import React from 'react';
import { soundEffects } from '../utils/audio';

interface PerfilTabProps {
  onOpenBadgeGenerator: () => void;
  onOpenModoLouco: () => void;
  onShowToast: (msg: string) => void;
}

export const PerfilTab: React.FC<PerfilTabProps> = ({
  onOpenBadgeGenerator,
  onOpenModoLouco,
  onShowToast
}) => {
  const soundboardItems = [
    {
      label: 'Eu tô muito louco Juvena!',
      icon: 'volume_up',
      action: () => {
        soundEffects.playAirHorn();
        soundEffects.speakQuote('Eu tô muito louco Juvena!');
      }
    },
    {
      label: 'Knock do Slack',
      icon: 'chat',
      action: () => soundEffects.playSlackKnock()
    },
    {
      label: 'Alerta do RH!',
      icon: 'notifications_active',
      action: () => soundEffects.playRhAlert()
    },
    {
      label: 'Brinde de Chopp',
      icon: 'sports_bar',
      action: () => soundEffects.playBeerClink()
    },
    {
      label: 'Buzina de Sextou',
      icon: 'campaign',
      action: () => soundEffects.playAirHorn()
    },
    {
      label: 'Foto do Flagra',
      icon: 'photo_camera',
      action: () => soundEffects.playCameraShutter()
    },
    {
      label: '"Tô no mudo tentando desmutar!"',
      icon: 'mic_off',
      action: () => soundEffects.speakQuote('Tô no mudo tentando desmutar, meu fone travou!')
    },
    {
      label: '"Sextou com autorização do RH!"',
      icon: 'celebration',
      action: () => {
        soundEffects.playFanfare();
        soundEffects.speakQuote('Sextou com autorização do RH!');
      }
    }
  ];

  return (
    <div className="flex flex-col w-full gap-5 relative pb-8">
      {/* Profile Card */}
      <div className="bg-[#171f33]/90 backdrop-blur-xl border border-white/5 rounded-3xl p-5 shadow-xl flex flex-col items-center text-center gap-3 mt-2 relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-32 bg-[#4edea3]/20 blur-3xl pointer-events-none" />

        {/* Avatar */}
        <div className="relative w-32 h-32 rounded-full p-1 bg-gradient-to-tr from-[#4edea3] via-[#ffb690] to-[#d0bcff] shadow-2xl">
          <img
            src="/public/assets/aistudio/Image_4_7e90b7cd.png"
            alt="Juvena Profile"
            className="w-full h-full object-cover rounded-full bg-[#060e20]"
          />
          <div className="absolute -bottom-1 -right-1 bg-[#10b981] text-[#002113] p-1.5 rounded-full shadow-lg border-2 border-[#171f33]">
            <span className="material-symbols-outlined text-base">verified</span>
          </div>
        </div>

        <div>
          <div className="inline-flex items-center gap-1 bg-[#222a3d] px-3 py-1 rounded-full text-[10px] font-['Space_Grotesk'] font-bold text-[#4edea3] border border-white/5 mb-1.5">
            <span>MATRÍCULA #0001 • DIRETORIA DE AFETO</span>
          </div>
          <h2 className="font-['Bricolage_Grotesque'] text-2xl font-black text-white">
            Juvena, O Inatingível
          </h2>
          <p className="font-['Space_Grotesk'] text-xs text-[#ffb690] font-semibold mt-0.5">
            Especialista em Sinergia Interdepartamental & Resenha de Sexta
          </p>
        </div>

        {/* Bio summary */}
        <p className="font-['Plus_Jakarta_Sans'] text-xs text-[#bbcabf] max-w-sm leading-relaxed">
          Responsável pela manutenção do bom humor em 14 andares da holding. Recordista em reuniões que viraram almoço e autor do beijo mais diplomático da história empresarial brasileira.
        </p>

        {/* Action button */}
        <div className="flex gap-2 w-full mt-1">
          <button
            onClick={onOpenBadgeGenerator}
            className="flex-1 bg-[#4edea3] hover:bg-[#6ffbbe] text-[#003824] py-2.5 px-3 rounded-xl font-['Space_Grotesk'] font-bold text-xs flex items-center justify-center gap-2 active:scale-95 shadow-[0_0_15px_rgba(78,222,163,0.3)] transition-transform"
          >
            <span className="material-symbols-outlined text-[18px]">badge</span>
            <span>Gerar Meu Crachá da Firma</span>
          </button>
          <button
            onClick={onOpenModoLouco}
            className="bg-[#ec6a06]/20 hover:bg-[#ec6a06]/30 text-[#ffb690] border border-[#ec6a06]/40 p-2.5 rounded-xl flex items-center justify-center active:scale-95"
            title="Ativar Modo Louco"
          >
            <span className="material-symbols-outlined text-xl">local_fire_department</span>
          </button>
        </div>
      </div>

      {/* SOUNDBOARD INTERATIVO */}
      <div className="bg-[#131b2e] border border-white/5 rounded-2xl p-4 shadow-xl flex flex-col gap-3">
        <div className="flex items-center justify-between pb-2 border-b border-white/10">
          <div className="flex items-center gap-2 text-[#4edea3]">
            <span className="material-symbols-outlined text-xl">sound_detection_dog_barking</span>
            <h3 className="font-['Bricolage_Grotesque'] text-base font-bold text-white">
              Soundboard Oficial do Juvena
            </h3>
          </div>
          <span className="text-[10px] font-['Space_Grotesk'] text-[#bbcabf]">
            Áudio Web interativo
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {soundboardItems.map((sb, idx) => (
            <button
              key={idx}
              onClick={() => {
                sb.action();
                onShowToast(`🔊 Tocando: ${sb.label}`);
              }}
              className="p-3 bg-[#171f33] hover:bg-[#222a3d] border border-white/5 hover:border-[#4edea3]/40 rounded-xl flex flex-col items-start gap-1 text-left transition-all active:scale-95 group shadow-sm"
            >
              <div className="w-7 h-7 rounded-lg bg-[#222a3d] group-hover:bg-[#4edea3] group-hover:text-black flex items-center justify-center text-[#4edea3] transition-colors">
                <span className="material-symbols-outlined text-base">{sb.icon}</span>
              </div>
              <span className="font-['Space_Grotesk'] text-xs font-bold text-[#dae2fd] group-hover:text-[#4edea3] transition-colors line-clamp-1">
                {sb.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Linha do Tempo da Lenda */}
      <div className="bg-[#131b2e] border border-white/5 rounded-2xl p-4 shadow-xl flex flex-col gap-3">
        <div className="flex items-center gap-2 text-[#d0bcff] pb-2 border-b border-white/10">
          <span className="material-symbols-outlined text-xl">history_edu</span>
          <h3 className="font-['Bricolage_Grotesque'] text-base font-bold text-white">
            Cronologia Histórica da Lenda
          </h3>
        </div>

        <div className="flex flex-col gap-3 text-xs font-['Plus_Jakarta_Sans'] pl-2 border-l border-white/10">
          <div className="relative pl-4">
            <span className="absolute -left-[21px] top-0.5 w-2.5 h-2.5 rounded-full bg-[#4edea3]" />
            <span className="font-['Space_Grotesk'] font-bold text-[#4edea3]">2021: O Ingresso</span>
            <p className="text-[#bbcabf] mt-0.5">
              Contratado para acelerar processos; descobriu que o café da copa acelera mais.
            </p>
          </div>

          <div className="relative pl-4">
            <span className="absolute -left-[21px] top-0.5 w-2.5 h-2.5 rounded-full bg-[#ffb690]" />
            <span className="font-['Space_Grotesk'] font-bold text-[#ffb690]">2022: O Almoço de 3 Horas</span>
            <p className="text-[#bbcabf] mt-0.5">
              Reunião de alinhamento com bife a cavalo que quebrou recordes de permanência.
            </p>
          </div>

          <div className="relative pl-4">
            <span className="absolute -left-[21px] top-0.5 w-2.5 h-2.5 rounded-full bg-[#d0bcff]" />
            <span className="font-['Space_Grotesk'] font-bold text-[#d0bcff]">2023: O Grito Canônico</span>
            <p className="text-[#bbcabf] mt-0.5">
              Pronuncia a famosa frase "Eu tô muito louco Juvena!" e entra pro folclore do prédio.
            </p>
          </div>

          <div className="relative pl-4">
            <span className="absolute -left-[21px] top-0.5 w-2.5 h-2.5 rounded-full bg-[#facc15]" />
            <span className="font-['Space_Grotesk'] font-bold text-[#facc15]">2024: O Beijo da Sinergia</span>
            <p className="text-[#bbcabf] mt-0.5">
              Homologado oficialmente como patrimônio imaterial da empresa pelo RH.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
