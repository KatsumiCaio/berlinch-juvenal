import React, { useState } from 'react';
import { soundEffects } from '../utils/audio';

interface BadgeGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (msg: string) => void;
}

export const BadgeGeneratorModal: React.FC<BadgeGeneratorModalProps> = ({
  isOpen,
  onClose,
  onShowToast
}) => {
  const [userName, setUserName] = useState('Colaborador Fiel');
  const [userRole, setUserRole] = useState('Analista de Café & Sinergia Sênior');
  const [matricula] = useState(() => Math.floor(1000 + Math.random() * 9000));

  if (!isOpen) return null;

  const roles = [
    'Analista de Café & Sinergia Sênior',
    'Especialista em Sextou Prematuro',
    'Mestre Supremo do Mudo no Teams',
    'Gerente de Desculpas Homologadas',
    'Auditor Paralelo do Boteco das 16h',
    'Operador de Polo Verde Certificado'
  ];

  const handleCopyBadge = () => {
    soundEffects.playFanfare();
    const badgeText = `🪪 CRACHÁ OFICIAL DA FIRMA - JUVENA AWARDS\n` +
      `Nome: ${userName}\n` +
      `Cargo: ${userRole}\n` +
      `Matrícula: #${matricula}\n` +
      `Status: HOMOLOGADO PELO JUVENA ✅\n` +
      `"Eu tô muito louco Juvena!"`;
    navigator.clipboard.writeText(badgeText);
    onShowToast('🪪 Dados do Crachá copiados para colar no Slack/Teams!');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-sm bg-[#171f33] border border-[#4edea3]/30 rounded-3xl p-5 shadow-2xl flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-2 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-[#4edea3]/20 text-[#4edea3] flex items-center justify-center text-lg">
              🪪
            </span>
            <div>
              <h3 className="font-['Bricolage_Grotesque'] text-lg font-bold text-[#dae2fd]">
                Crachá Oficial da Firma
              </h3>
              <p className="font-['Space_Grotesk'] text-xs text-[#bbcabf]">
                Sua credencial no Hall da Fama
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

        {/* The Badge Card Preview */}
        <div className="relative bg-gradient-to-b from-[#222a3d] via-[#131b2e] to-[#060e20] p-4 rounded-2xl border-2 border-[#4edea3]/40 shadow-xl overflow-hidden">
          {/* Lanyard hole */}
          <div className="w-10 h-2 bg-[#060e20] rounded-full mx-auto mb-3 border border-white/10" />

          {/* Top company label */}
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <span className="font-['Bricolage_Grotesque'] text-xs text-[#4edea3] font-black uppercase tracking-wider">
              JUVENA HOLDING CORP.
            </span>
            <span className="font-['Space_Grotesk'] text-[10px] text-[#ffb690] font-bold">
              MATRÍCULA #{matricula}
            </span>
          </div>

          <div className="flex items-center gap-3.5 my-3">
            <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-[#4edea3] shrink-0 bg-[#060e20] flex items-center justify-center shadow-lg">
              <img
                src="/public/assets/aistudio/Image_4_7e90b7cd.png"
                alt="Avatar"
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-0 inset-x-0 bg-[#10b981] text-[7px] text-[#002113] font-bold text-center uppercase">
                ATIVO
              </span>
            </div>

            <div className="flex flex-col min-w-0">
              <span className="font-['Bricolage_Grotesque'] text-base font-bold text-white truncate">
                {userName || 'Colaborador Fiel'}
              </span>
              <span className="font-['Space_Grotesk'] text-[11px] text-[#4edea3] font-semibold leading-tight line-clamp-2">
                {userRole}
              </span>
              <span className="font-['Space_Grotesk'] text-[9px] text-[#bbcabf] mt-1">
                Lotação: Bloco B / Boteco da Esquina
              </span>
            </div>
          </div>

          {/* Hologram stamp */}
          <div className="mt-2 pt-2 border-t border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-1 text-[10px] text-[#d0bcff] font-['Space_Grotesk'] font-bold">
              <span className="material-symbols-outlined text-[13px] text-[#4edea3]">verified</span>
              <span>CERTIFICADO OFICIAL</span>
            </div>
            <span className="bg-[#ec6a06]/20 text-[#ffb690] px-2 py-0.5 rounded text-[9px] font-bold">
              "MUITO LOUCO"
            </span>
          </div>
        </div>

        {/* Inputs */}
        <div className="flex flex-col gap-2.5">
          <div>
            <label className="block text-[11px] font-['Space_Grotesk'] font-bold text-[#bbcabf] mb-1">
              Seu Nome no Crachá
            </label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full bg-[#0b1326] border border-white/15 focus:border-[#4edea3] rounded-xl p-2 text-xs text-[#dae2fd] outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-['Space_Grotesk'] font-bold text-[#bbcabf] mb-1">
              Cargo Honorário
            </label>
            <select
              value={userRole}
              onChange={(e) => setUserRole(e.target.value)}
              className="w-full bg-[#0b1326] border border-white/15 focus:border-[#4edea3] rounded-xl p-2 text-xs text-[#dae2fd] outline-none"
            >
              {roles.map((r) => (
                <option key={r} value={r} className="bg-[#171f33]">
                  {r}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-2 pt-1">
          <button
            onClick={handleCopyBadge}
            className="flex-1 bg-[#4edea3] hover:bg-[#6ffbbe] text-[#003824] font-['Space_Grotesk'] font-bold text-xs py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 active:scale-95 transition-transform"
          >
            <span className="material-symbols-outlined text-sm">badge</span>
            <span>Copiar Credencial</span>
          </button>
          <button
            onClick={onClose}
            className="bg-[#222a3d] hover:bg-[#2d3449] text-[#dae2fd] font-['Space_Grotesk'] text-xs py-2.5 px-4 rounded-xl"
          >
            Pronto
          </button>
        </div>
      </div>
    </div>
  );
};
