export interface Excuse {
  id: string;
  text: string;
  category: string;
  successRate: string;
  author: string;
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
  time: string;
  status: string;
  statusColor: string;
  image?: string;
  videoSrc?: string;
  category: string;
  description: string;
  reactions: ReactionCounts;
}
