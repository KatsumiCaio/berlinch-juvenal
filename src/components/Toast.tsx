import React from 'react';

interface ToastProps {
  message: string | null;
  icon?: string;
}

export const Toast: React.FC<ToastProps> = ({ message, icon = 'check_circle' }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 bg-[#dae2fd] text-[#283044] px-4 py-2.5 rounded-full shadow-[0_10px_25px_rgba(0,0,0,0.6)] flex items-center gap-2.5 border border-[#4edea3]/40 animate-in fade-in slide-in-from-bottom-4 duration-200">
      <span className="material-symbols-outlined text-[#006c49] text-[20px] font-bold">
        {icon}
      </span>
      <span className="font-['Space_Grotesk'] text-[13px] font-bold tracking-tight">
        {message}
      </span>
    </div>
  );
};
