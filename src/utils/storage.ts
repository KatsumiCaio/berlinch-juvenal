import { Excuse, HonoraryTitle, ReactionCounts, DossierItem, VoteCategory, MemePost } from '../types';

const INITIAL_EXCUSES: Excuse[] = [
  {
    id: 'excuse-1',
    text: 'Minha internet caiu bem na hora que chamaram meu nome na daily...',
    category: 'Home Office Ninja',
    successRate: '100% Taxa de Sucesso',
    author: 'Juvena'
  },
  {
    id: 'excuse-2',
    text: 'Tô no mudo tentando desmutar, meu fone desconfigurou o Bluetooth!',
    category: 'Tecnologia Falha',
    successRate: '98% Taxa de Sucesso',
    author: 'Juvena'
  },
  {
    id: 'excuse-3',
    text: 'Fui almoçar rapidinho e fiquei preso no elevador do bloco B.',
    category: 'Aventuras do Prédio',
    successRate: '94% Taxa de Sucesso',
    author: 'Juvena'
  },
  {
    id: 'excuse-4',
    text: 'O RH me chamou para um alinhamento emergencial sobre afeto corporativo.',
    category: 'Arquivo Confidencial',
    successRate: '99% Taxa de Sucesso',
    author: 'Juvena'
  },
  {
    id: 'excuse-5',
    text: 'Tava abrindo o Excel e travou meu computador inteiro, precisei reiniciar.',
    category: 'Clássicos do Escritório',
    successRate: '99.9% Taxa de Sucesso',
    author: 'Juvena'
  },
  {
    id: 'excuse-6',
    text: 'Tô num alinhamento de sinergia com os meninos da outra ponta.',
    category: 'Polo Verde Style',
    successRate: '100% Taxa de Sucesso',
    author: 'Juvena'
  },
  {
    id: 'excuse-7',
    text: 'Eu tô muito louco Juvena, fala comigo depois da daily!',
    category: 'Sinceridade Máxima',
    successRate: '100% Taxa de Sucesso',
    author: 'Juvena'
  },
  {
    id: 'excuse-8',
    text: 'Deu conflito no merge e tô rezando três ave-marias pro Git restaurar.',
    category: 'Dev Sobrevivente',
    successRate: '97% Taxa de Sucesso',
    author: 'Juvena'
  }
];

const INITIAL_TITLES: HonoraryTitle[] = [
  {
    id: 'title-1',
    emoji: '🥇',
    title: 'Campeão de Sextou Prematuro',
    description: 'Primeiro copo virado antes das 17h01',
    tier: 'OURO',
    votes: 412
  },
  {
    id: 'title-2',
    emoji: '🎭',
    title: 'Ator Coadjuvante do Treinamento',
    description: 'Conexão humana e abraços imprevistos',
    tier: 'ÉPICO',
    votes: 890
  },
  {
    id: 'title-3',
    emoji: '🥷',
    title: 'Ninja do Status Amarelo',
    description: 'Ausente há 4 horas no Slack sem ninguém notar',
    tier: 'DIAMANTE',
    votes: 567
  },
  {
    id: 'title-4',
    emoji: '☕',
    title: 'Sommelier da Garrafa Térmica',
    description: 'Sabe pelo faro se o café é de hoje ou de ontem',
    tier: 'PRATA',
    votes: 310
  }
];

const INITIAL_DOSSIERS: DossierItem[] = [
  {
    id: 'dossier-042',
    code: '#042',
    title: 'Flagra: O Beijo da Sinergia',
    date: 'Última Sexta-feira',
    time: 'Sex 18:42',
    status: 'HOMOLOGADO PELO RH',
    statusColor: 'error',
    image: '/public/assets/aistudio/932bf9f6-0609-4aa8-afb2-f8bc5a503c6b_1245ac09.webp',
    videoSrc: '/public/assets/aistudio/flagra_sinergia.mp4',
    category: 'Integração Interdepartamental',
    description: '"Alinhamento estratégico e troca profunda de experiências durante a dinâmica de quebra-gelo corporativo."',
    redactedText: 'Testemunhas afirmam que o beijo selou a paz entre as equipes de Engenharia e Marketing após 3 semanas de discórdia sobre o botão verde.',
    revealed: false,
    verdict: 'Aprovado pelo RH como prática exemplar de quebra de silos corporativos.',
    reactions: {
      heart: 482,
      beer: 1200,
      rh: 999,
      popcorn: 350
    }
  },
  {
    id: 'dossier-043',
    code: '#043',
    title: 'O Enigmático Almoço de 3 Horas e 42 Minutos',
    date: 'Quarta de Feijoada',
    time: 'Qua 12:00 - 15:42',
    status: 'INVESTIGAÇÃO ATIVA',
    statusColor: 'secondary',
    category: 'Nutrição Corporativa',
    description: '"Foi apenas um buffet a quilo demorado com networking acelerado sobre a reestruturação da TI."',
    redactedText: 'Foram consumidos 4 pastéis de entrada, 2 caipirinhas de limão e o comprovante de estacionamento sumiu misteriosamente.',
    revealed: false,
    verdict: 'Em análise pelo Comitê de Gastronomia Executiva.',
    reactions: {
      heart: 245,
      beer: 810,
      rh: 320,
      popcorn: 512
    }
  },
  {
    id: 'dossier-044',
    code: '#044',
    title: 'A Planilha Fantasma de 1.2GB com VLOOKUP em Loop',
    date: 'Fechamento de Mês',
    time: 'Qui 23:15',
    status: 'ARQUIVADO',
    statusColor: 'tertiary',
    category: 'Falhas da Matrix',
    description: '"Travou 14 notebooks do andar inteiro só de dar duplo clique na célula C42."',
    redactedText: 'A planilha continha uma fórmula recursiva apontando para a escala de plantão do churrasco do final de semana.',
    revealed: false,
    verdict: 'Arquivado por falta de memória RAM para abrir os autos do processo.',
    reactions: {
      heart: 180,
      beer: 420,
      rh: 150,
      popcorn: 680
    }
  }
];

const INITIAL_VOTE_CATEGORIES: VoteCategory[] = [
  {
    id: 'cat-1',
    title: '🏆 O Troféu "Eu Tô Muito Louco"',
    subtitle: 'Maior ato de audácia e coragem presencial na firma',
    candidates: [
      { id: 'c1', title: 'O Beijo da Sinergia na Sala de Treinamento', description: 'Quebrou os silos com afeto e camisa polo verde', votes: 1420, badge: 'Líder' },
      { id: 'c2', title: 'Responder "Depois eu vejo isso" pro Diretor', description: 'Sem gaguejar e fechando o notebook na cara', votes: 980 },
      { id: 'c3', title: 'Abrir cerveja artesanal na Call de All-Hands', description: 'Com a câmera aberta achando que tava no mudo', votes: 720 },
      { id: 'c4', title: 'Colocar status "Almoçando" às 10h da manhã', description: 'E só voltar às 16h com pastel na mão', votes: 530 }
    ]
  },
  {
    id: 'cat-2',
    title: '🔇 Mestre do Mudo & Desculpas de Daily',
    subtitle: 'Quem mais inovou na arte de sumir com classe',
    candidates: [
      { id: 'c5', title: '"Meu fone desconfigurou o Bluetooth"', description: 'Usada 14 vezes na mesma semana', votes: 1110, badge: 'Favorito' },
      { id: 'c6', title: '"Faltou luz no bairro (mas o videogame tá ligado)"', description: 'Clássica do home office com ar-condicionado', votes: 890 },
      { id: 'c7', title: '"Apareceu tela azul e tive que formatar"', description: 'Sumisso que dura 48 horas úteis', votes: 640 }
    ]
  },
  {
    id: 'cat-3',
    title: '🍺 Troféu Sextou Prematuro 2024',
    subtitle: 'Quem bateu o ponto imaginário mais cedo',
    candidates: [
      { id: 'c8', title: 'Juvena às 15h45 no Boteco da Esquina', description: 'Com status verde no Teams pelo celular', votes: 1890, badge: 'Favorito Absoluto' },
      { id: 'c9', title: 'O Estagiário que sumiu depois do almoço', description: 'Deixou a mochila na cadeira pra fingir', votes: 430 },
      { id: 'c10', title: 'A Turma da Engenharia em "Reunião Externa"', description: 'Reunião de alinhamento com torresmo', votes: 760 }
    ]
  }
];

const INITIAL_MEMES: MemePost[] = [
  {
    id: 'm1',
    author: 'Juvena',
    role: 'Patrimônio Imaterial',
    quote: 'Eu tô muito louco Juvena! Não me chame pra alinhamento depois das 16h.',
    timestamp: 'Hoje às 15:40',
    likes: 312,
    tags: ['Clássico', 'Filosofia', 'Sextou']
  },
  {
    id: 'm2',
    author: 'Mariana do RH',
    role: 'Gestão de Clima & Afeto',
    quote: 'O beijo da sinergia foi homologado porque promoveu mais união que 10 workshops de liderança.',
    timestamp: 'Ontem às 18:20',
    likes: 489,
    tags: ['RH', 'Homologado', 'Sinergia']
  },
  {
    id: 'm3',
    author: 'Carlos da TI',
    role: 'Admin do Slack',
    quote: 'Status do Juvena: "Online no Slack fingindo costume". Melhor descrição de cargo.',
    timestamp: '2 dias atrás',
    likes: 275,
    tags: ['Slack', 'Home Office']
  },
  {
    id: 'm4',
    author: 'Anônimo da Firma',
    role: 'Observador do Prédio',
    quote: 'Dizem que se você sussurrar "Sextou" no corredor do 3º andar, o Juvena aparece com duas taças de chopp.',
    timestamp: '3 dias atrás',
    likes: 540,
    tags: ['Lenda', 'Boteco']
  }
];

export const storage = {
  // Stats
  getStats: () => {
    const raw = localStorage.getItem('juvena_stats');
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
    localStorage.setItem('juvena_stats', JSON.stringify(stats));
  },

  // Excuses
  getExcuses: (): Excuse[] => {
    const raw = localStorage.getItem('juvena_excuses');
    if (raw) {
      try { return JSON.parse(raw); } catch (e) { /* ignore */ }
    }
    return INITIAL_EXCUSES;
  },
  saveExcuses: (excuses: Excuse[]) => {
    localStorage.setItem('juvena_excuses', JSON.stringify(excuses));
  },

  // Titles
  getTitles: (): HonoraryTitle[] => {
    const raw = localStorage.getItem('juvena_titles');
    if (raw) {
      try { return JSON.parse(raw); } catch (e) { /* ignore */ }
    }
    return INITIAL_TITLES;
  },
  saveTitles: (titles: HonoraryTitle[]) => {
    localStorage.setItem('juvena_titles', JSON.stringify(titles));
  },

  // Dossiers
  getDossiers: (): DossierItem[] => {
    const raw = localStorage.getItem('juvena_dossiers');
    if (raw) {
      try { return JSON.parse(raw); } catch (e) { /* ignore */ }
    }
    return INITIAL_DOSSIERS;
  },
  saveDossiers: (dossiers: DossierItem[]) => {
    localStorage.setItem('juvena_dossiers', JSON.stringify(dossiers));
  },

  // Votes
  getVoteCategories: (): VoteCategory[] => {
    const raw = localStorage.getItem('juvena_votes');
    if (raw) {
      try { return JSON.parse(raw); } catch (e) { /* ignore */ }
    }
    return INITIAL_VOTE_CATEGORIES;
  },
  saveVoteCategories: (cats: VoteCategory[]) => {
    localStorage.setItem('juvena_votes', JSON.stringify(cats));
  },

  // Memes
  getMemes: (): MemePost[] => {
    const raw = localStorage.getItem('juvena_memes');
    if (raw) {
      try { return JSON.parse(raw); } catch (e) { /* ignore */ }
    }
    return INITIAL_MEMES;
  },
  saveMemes: (memes: MemePost[]) => {
    localStorage.setItem('juvena_memes', JSON.stringify(memes));
  },

  // Slack status
  getSlackStatus: (): string => {
    return localStorage.getItem('juvena_slack_status') || 'Online no Slack fingindo costume';
  },
  saveSlackStatus: (status: string) => {
    localStorage.setItem('juvena_slack_status', status);
  }
};
