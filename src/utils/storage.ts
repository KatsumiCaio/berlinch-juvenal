import { Excuse, DossierItem } from '../types';

const INITIAL_EXCUSES: Excuse[] = [
  {
    id: 'excuse-1',
    text: 'Minha internet caiu bem na hora que chamaram meu nome na daily...',
    category: 'Home Office Ninja',
    successRate: '100% Taxa de Sucesso',
    author: 'Juvenal'
  },
  {
    id: 'excuse-2',
    text: 'Tô no mudo tentando desmutar, meu fone desconfigurou o Bluetooth!',
    category: 'Tecnologia Falha',
    successRate: '98% Taxa de Sucesso',
    author: 'Juvenal'
  },
  {
    id: 'excuse-3',
    text: 'Fui almoçar rapidinho e fiquei preso no elevador do bloco B.',
    category: 'Aventuras do Prédio',
    successRate: '94% Taxa de Sucesso',
    author: 'Juvenal'
  },
  {
    id: 'excuse-4',
    text: 'O RH me chamou para um alinhamento emergencial sobre afeto corporativo.',
    category: 'Arquivo Confidencial',
    successRate: '99% Taxa de Sucesso',
    author: 'Juvenal'
  },
  {
    id: 'excuse-5',
    text: 'Tava abrindo o Excel e travou meu computador inteiro, precisei reiniciar.',
    category: 'Clássicos do Escritório',
    successRate: '99.9% Taxa de Sucesso',
    author: 'Juvenal'
  },
  {
    id: 'excuse-6',
    text: 'Tô num alinhamento de sinergia com os meninos da outra ponta.',
    category: 'Polo Verde Style',
    successRate: '100% Taxa de Sucesso',
    author: 'Juvenal'
  },
  {
    id: 'excuse-7',
    text: 'Eu tô muito louco Juvena, fala comigo depois da daily!',
    category: 'Sinceridade Máxima',
    successRate: '100% Taxa de Sucesso',
    author: 'Juvenal'
  },
  {
    id: 'excuse-8',
    text: 'Deu conflito no merge e tô rezando três ave-marias pro Git restaurar.',
    category: 'Dev Sobrevivente',
    successRate: '97% Taxa de Sucesso',
    author: 'Juvenal'
  }
];

const INITIAL_DOSSIER: DossierItem = {
  id: 'dossier-042',
  code: '#042',
  title: 'Flagra: O Beijo da Sinergia',
  time: 'Sex 18:42',
  status: 'HOMOLOGADO PELO RH',
  statusColor: 'error',
  image: '/public/assets/aistudio/932bf9f6-0609-4aa8-afb2-f8bc5a503c6b_1245ac09.webp',
  videoSrc: '/public/assets/aistudio/flagra_sinergia.mp4',
  category: 'Integração Interdepartamental',
  description: '"Alinhamento estratégico e troca profunda de experiências durante a dinâmica de quebra-gelo corporativo."',
  reactions: {
    heart: 482,
    beer: 1200,
    rh: 999,
    popcorn: 350
  }
};

export const storage = {
  getStats: () => {
    const raw = localStorage.getItem('juvenal_stats');
    if (raw) {
      try { return JSON.parse(raw); } catch (e) { /* ignore */ }
    }
    return {
      cafes: 142,
      sextouPercent: 99.8,
      rhsDriblados: 12,
      apoioMoralCount: 84
    };
  },
  saveStats: (stats: { cafes: number; sextouPercent: number; rhsDriblados: number; apoioMoralCount: number }) => {
    localStorage.setItem('juvenal_stats', JSON.stringify(stats));
  },

  getExcuses: (): Excuse[] => {
    const raw = localStorage.getItem('juvenal_excuses');
    if (raw) {
      try { return JSON.parse(raw); } catch (e) { /* ignore */ }
    }
    return INITIAL_EXCUSES;
  },

  getDossiers: (): DossierItem[] => {
    const raw = localStorage.getItem('juvenal_dossiers');
    if (raw) {
      try { return JSON.parse(raw); } catch (e) { /* ignore */ }
    }
    return [INITIAL_DOSSIER];
  },
  saveDossiers: (dossiers: DossierItem[]) => {
    localStorage.setItem('juvenal_dossiers', JSON.stringify(dossiers));
  },

  getSlackStatus: (): string => {
    return localStorage.getItem('juvenal_slack_status') || 'Online no Slack fingindo costume';
  },
  saveSlackStatus: (status: string) => {
    localStorage.setItem('juvenal_slack_status', status);
  }
};
