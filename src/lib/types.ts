export interface TrendData {
  keyword: string;
  peakYears: number[];
  nextPeak: string;
  searchMoM: string;
  searchQoQ: string;
  sentiment: number;
  instagramPosts: number;
  twitterPosts: number;
  youtubeViews: string;
  newsHits: number;
  category: CategoryType;
  engagement: number;
  source: SocialSource;
  growth: string;
}

export interface CategoryData {
  id: number;
  name: string;
  icon: string;
  growth: string;
  sentiment: number;
  emoji: string;
}

export interface CycleEvent {
  date: string;
  type: 'peak' | 'predicted';
  value: number;
  description: string;
  events: string[];
}

export interface EvidenceData {
  correlation: number;
  similarity: number;
  searchMoM: string;
  searchQoQ: string;
  sentiment: number;
  confidence: number;
  news: NewsHeadline[];
  socialStats: SocialStats;
}

export interface NewsHeadline {
  title: string;
  source: string;
  date: string;
}

export interface SocialStats {
  instagram: number;
  twitter: number;
  youtube: string;
  tiktok: number;
}

export type CategoryType =
  | '패션 디자인'
  | '광고·홍보'
  | '소비자 트렌드'
  | '시사·정치·세계 정치'
  | '경제'
  | '인플루언서·스타';

export type SocialSource = 'instagram' | 'twitter' | 'youtube' | 'tiktok' | 'x-twitter';

export interface ExportConfig {
  format: 'csv' | 'json' | 'pdf' | 'png' | 'xml';
  datasets: string[];
  dateRange: {
    start: string;
    end: string;
  };
  includeData: {
    searchVolume: boolean;
    socialMentions: boolean;
    sentiment: boolean;
    predictions: boolean;
    evidence: boolean;
  };
  filename: string;
}

export interface FeedbackData {
  rating: number;
  mostUseful: string;
  suggestions: string;
  email?: string;
  features: {
    [key: string]: number;
  };
}

export interface HotTrendItem {
  keyword: string;
  engagement: number;
  sentiment: number;
  source: SocialSource;
  growth3h: string;
  category: CategoryType;
}

export interface TimelineData {
  keyword: string;
  cycles: CycleEvent[];
  currentStatus: string;
  confidence: number;
  accuracy: number;
}
