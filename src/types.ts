export type TabType = 'hall-da-fama' | 'votacao-ao-vivo' | 'arquivo-confidencial' | 'mural-de-memes' | 'perfil-da-lenda';

export interface Excuse {
  id: string;
  text: string;
  category: string;
  successRate: string;
  author: string;
}

export interface HonoraryTitle {
  id: string;
  emoji: string;
  title: string;
  description: string;
  tier: 'OURO' | 'ÉPICO' | 'DIAMANTE' | 'PRATA';
  votes?: number;
}

export interface ReactionCounts {
  heart: number;
  beer: number;
  rh: number;
  popcorn: number;
}

export interface DossierItem {
  id: string;
  code: string;
  title: string;
  date: string;
  time: string;
  status: 'HOMOLOGADO PELO RH' | 'ARQUIVADO' | 'INVESTIGAÇÃO ATIVA' | 'PATRIMÔNIO HISTÓRICO';
  statusColor: 'error' | 'primary' | 'secondary' | 'tertiary';
  image?: string;
  videoSrc?: string;
  category: string;
  description: string;
  redactedText: string;
  revealed: boolean;
  verdict: string;
  reactions: ReactionCounts;
}

export interface VoteCandidate {
  id: string;
  title: string;
  description: string;
  votes: number;
  badge?: string;
}

export interface VoteCategory {
  id: string;
  title: string;
  subtitle: string;
  candidates: VoteCandidate[];
  userVotedId?: string;
}

export interface MemePost {
  id: string;
  author: string;
  role: string;
  quote: string;
  timestamp: string;
  likes: number;
  tags: string[];
}
