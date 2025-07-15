import { TrendData, CategoryData, EvidenceData, HotTrendItem, TimelineData, CycleEvent, NewsHeadline, SocialStats, CategoryType } from './types';

export const categories: CategoryData[] = [
  { id: 1, name: '패션 디자인', icon: 'fa-tshirt', growth: '+18%', sentiment: 42, emoji: '👗' },
  { id: 2, name: '광고·홍보', icon: 'fa-bullhorn', growth: '+12%', sentiment: 38, emoji: '📢' },
  { id: 3, name: '소비자 트렌드', icon: 'fa-shopping-cart', growth: '+15%', sentiment: 35, emoji: '🛍️' },
  { id: 4, name: '시사·정치·세계 정치', icon: 'fa-globe', growth: '+8%', sentiment: 28, emoji: '🌍' },
  { id: 5, name: '경제', icon: 'fa-chart-line', growth: '+10%', sentiment: 32, emoji: '📈' },
  { id: 6, name: '인플루언서·스타', icon: 'fa-star', growth: '+14%', sentiment: 40, emoji: '⭐' }
];

// 시나리오플래닝 데이터 추가
export const scenarioPlanning = {
  targetDate: '2026년 1월',
  methodology: '시나리오플래닝',
  confidence: 78,
  scenarios: [
    {
      id: 1,
      name: '낙관적 시나리오',
      probability: 35,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      description: 'Gen Alpha의 적극적 유입과 글로벌 확산',
      keywords: ['네오-Y2K', '디지털 빈티지', 'AI 패션', '메타버스 스타일링'],
      channels: ['TikTok', 'Instagram Reels', 'YouTube Shorts', 'Discord'],
      evolution: {
        removed: ['과도한 네온 컬러', '플라스틱 액세서리'],
        evolved: ['홀로그램 소재', 'AR 시착 경험'],
        added: ['AI 생성 패턴', '지속가능 Y2K']
      }
    },
    {
      id: 2,
      name: '현실적 시나리오',
      probability: 45,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      description: '점진적 확산과 브랜드 적응',
      keywords: ['모던 레트로', '스마트 빈티지', '하이브리드 스타일', '에코-Y2K'],
      channels: ['Instagram', 'Pinterest', 'YouTube', 'Snapchat'],
      evolution: {
        removed: ['극단적 사이버펑크', '저품질 복제품'],
        evolved: ['프리미엄 빈티지', '맞춤형 레트로'],
        added: ['친환경 소재', '개인화 기술']
      }
    },
    {
      id: 3,
      name: '보수적 시나리오',
      probability: 20,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      description: '니치 트렌드로 축소, 특정 그룹 중심',
      keywords: ['클래식 레트로', '선택적 빈티지', '미니멀 Y2K', '서브컬처'],
      channels: ['Pinterest', 'Tumblr', '전문 커뮤니티', '오프라인 매장'],
      evolution: {
        removed: ['대중적 Y2K 요소', '과장된 미래주의'],
        evolved: ['정제된 레트로', '큐레이션 빈티지'],
        added: ['장인정신', '한정판 문화']
      }
    }
  ],
  actionItems: [
    {
      timeline: '지금 (2025년 7-9월)',
      actions: [
        'TikTok 크리에이터와 파트너십 구축',
        'Gen Alpha 대상 사전 마케팅 시작',
        'AR/VR 체험 콘텐츠 개발',
        '지속가능 Y2K 라인 기획'
      ]
    },
    {
      timeline: '준비기 (2025년 10-12월)',
      actions: [
        '2026년 봄/여름 컬렉션 Y2K 요소 강화',
        '메타버스 플랫폼 진출 준비',
        '개인화 AI 추천 시스템 도입',
        '커뮤니티 기반 마케팅 강화'
      ]
    },
    {
      timeline: '실행기 (2026년 1-3월)',
      actions: [
        '전방위 캠페인 런칭',
        '인플루언서 대규모 협업',
        '리미티드 에디션 출시',
        '글로벌 시장 동시 진출'
      ]
    }
  ]
};

export const trendEvolution = {
  title: '레트로 패션 진화 패턴 분석',
  cycles: [
    {
      period: '2012년 1차 Y2K 리바이벌',
      characteristics: ['네온 컬러', '플라스틱 소재', '기하학적 패턴', 'CD롬 장신구'],
      channels: ['블로그', '초기 인스타그램', '패션쇼'],
      limitations: ['제한적 온라인 노출', '높은 진입장벽', '소수 패션피플 중심']
    },
    {
      period: '2018년 2차 Y2K 부활',
      characteristics: ['홀로그램 소재', '메탈릭 컬러', '미니멀 사이버', 'LED 액세서리'],
      channels: ['인스타그램', '유튜브', '인플루언서'],
      evolution: {
        removed: ['과도한 네온', '무거운 액세서리'],
        evolved: ['세련된 홀로그램', '일상 착용 가능한 디자인'],
        added: ['인스타그래머블', '셀피 친화적 요소']
      },
      limitations: ['밀레니얼 세대 중심', '서구 시장 집중']
    },
    {
      period: '2024년 3차 Y2K 메인스트림',
      characteristics: ['TikTok 바이럴', 'Gen Z 해석', '믹스앤매치', '지속가능성'],
      channels: ['TikTok', '릴스', '숏폼 콘텐츠'],
      evolution: {
        removed: ['단조로운 메탈릭', '일회용 트렌드'],
        evolved: ['개성있는 스타일링', '다양한 브랜드 협업'],
        added: ['환경 의식', '개인화 트렌드', '글로벌 확산']
      }
    }
  ]
};

export const mockTrends: TrendData[] = [
  {
    keyword: '레트로 패션',
    peakYears: [2012, 2018, 2024],
    nextPeak: '2026-02',
    searchMoM: '+18%',
    searchQoQ: '+25%',
    sentiment: 42,
    instagramPosts: 3450,
    twitterPosts: 1278,
    youtubeViews: '2.3M',
    newsHits: 12500,
    category: '패션 디자인',
    engagement: 89,
    source: 'instagram',
    growth: '+275%'
  },
  {
    keyword: 'AI 에이전트',
    peakYears: [2016, 2019, 2023],
    nextPeak: '2026-05',
    searchMoM: '+22%',
    searchQoQ: '+31%',
    sentiment: 55,
    instagramPosts: 4100,
    twitterPosts: 2750,
    youtubeViews: '4.8M',
    newsHits: 15900,
    category: '소비자 트렌드',
    engagement: 95,
    source: 'youtube',
    growth: '+98%'
  },
  {
    keyword: '친환경 백',
    peakYears: [2011, 2015, 2022],
    nextPeak: '2025-11',
    searchMoM: '+12%',
    searchQoQ: '+19%',
    sentiment: 30,
    instagramPosts: 2200,
    twitterPosts: 980,
    youtubeViews: '1.1M',
    newsHits: 8430,
    category: '소비자 트렌드',
    engagement: 75,
    source: 'x-twitter',
    growth: '+65%'
  },
  {
    keyword: '메타버스 패션',
    peakYears: [2020, 2022],
    nextPeak: '2026-01',
    searchMoM: '+15%',
    searchQoQ: '+28%',
    sentiment: 38,
    instagramPosts: 2890,
    twitterPosts: 1456,
    youtubeViews: '3.2M',
    newsHits: 9200,
    category: '패션 디자인',
    engagement: 82,
    source: 'instagram',
    growth: '+42%'
  },
  {
    keyword: 'K-뷰티 글로벌',
    peakYears: [2017, 2020, 2023],
    nextPeak: '2025-09',
    searchMoM: '+20%',
    searchQoQ: '+35%',
    sentiment: 48,
    instagramPosts: 5670,
    twitterPosts: 3200,
    youtubeViews: '6.1M',
    newsHits: 18700,
    category: '패션 디자인',
    engagement: 88,
    source: 'tiktok',
    growth: '+78%'
  },
  {
    keyword: '지속가능 소비',
    peakYears: [2019, 2022],
    nextPeak: '2025-08',
    searchMoM: '+8%',
    searchQoQ: '+15%',
    sentiment: 25,
    instagramPosts: 1980,
    twitterPosts: 890,
    youtubeViews: '890K',
    newsHits: 6700,
    category: '소비자 트렌드',
    engagement: 68,
    source: 'x-twitter',
    growth: '+35%'
  }
];

export const hotTrends: HotTrendItem[] = [
  {
    keyword: '레트로 패션',
    engagement: 89,
    sentiment: 42,
    source: 'instagram',
    growth3h: '+15% (+1.2K)',
    category: '패션 디자인'
  },
  {
    keyword: 'AI 에이전트',
    engagement: 95,
    sentiment: 55,
    source: 'youtube',
    growth3h: '+22% (+2.8K)',
    category: '소비자 트렌드'
  },
  {
    keyword: '친환경 백',
    engagement: 75,
    sentiment: 30,
    source: 'x-twitter',
    growth3h: '+8% (+650)',
    category: '소비자 트렌드'
  },
  {
    keyword: '메타버스 패션',
    engagement: 82,
    sentiment: 38,
    source: 'instagram',
    growth3h: '+12% (+980)',
    category: '패션 디자인'
  },
  {
    keyword: 'K-뷰티 글로벌',
    engagement: 88,
    sentiment: 48,
    source: 'tiktok',
    growth3h: '+18% (+1.5K)',
    category: '패션 디자인'
  },
  {
    keyword: '지속가능 소비',
    engagement: 68,
    sentiment: 25,
    source: 'x-twitter',
    growth3h: '+6% (+420)',
    category: '소비자 트렌드'
  }
];

export const evidenceData: EvidenceData = {
  correlation: 0.84,
  similarity: 89,
  searchMoM: '+18%',
  searchQoQ: '+25%',
  sentiment: 42,
  confidence: 89,
  news: [
    { title: '90년대 패션 리바이벌, Z세대가 이끄는 새로운 트렌드', source: '조선일보', date: '2024-11' },
    { title: 'Y2K 스타일로 패션업계 매출 20% 급증', source: '한국경제', date: '2024-12' },
    { title: '지속가능한 빈티지 패션, MZ세대 사로잡다', source: '매일경제', date: '2025-01' }
  ],
  socialStats: {
    instagram: 3450,
    twitter: 1278,
    youtube: '2.3M',
    tiktok: 2100
  }
};

export const timelineData: TimelineData = {
  keyword: '레트로 패션',
  currentStatus: '상승기 (2024.11 → 2026.02)',
  confidence: 89,
  accuracy: 84,
  cycles: [
    {
      date: '2024-03',
      type: 'peak',
      value: 45000,
      description: '첫 번째 피크',
      events: [
        '인스타그램 해시태그 급증',
        '빈티지 브랜드 재출시',
        '검색량: 12K → 45K'
      ]
    },
    {
      date: '2024-07',
      type: 'peak',
      value: 89000,
      description: '메인스트림 진입',
      events: [
        '대형 브랜드 Y2K 컬렉션',
        '인플루언서 마케팅 확산',
        '검색량: 45K → 89K'
      ]
    },
    {
      date: '2024-11',
      type: 'peak',
      value: 65000,
      description: '안정화 단계',
      events: [
        '소비자 적응기',
        '시장 포화 시작',
        '검색량: 89K → 65K'
      ]
    },
    {
      date: '2025-02',
      type: 'predicted',
      value: 120000,
      description: '다음 사이클 시작',
      events: [
        '새로운 브랜드 진입',
        'Gen Alpha 유입',
        '예상 검색량: 65K → 120K'
      ]
    }
  ]
};

export const todayTrend = {
  keyword: '레트로 패션',
  nextPeak: '2026-02',
  whyMatters: 'Z세대가 Y2K 스타일을 재해석하며 TikTok·인스타에서 바이럴 콘텐츠로 확산되고 있습니다. 브랜드들이 90년대 감성을 활용한 제품 라인을 출시하며 패션업계의 새로운 트렌드로 자리잡고 있어요. 특히 지속가능성과 결합된 빈티지 패션이 MZ세대의 가치관과 맞아떨어지면서 단순한 복고를 넘어 새로운 문화 현상으로 발전하고 있습니다.',
  cycleRecap: [
    { year: 2012, type: 'peak' as const },
    { year: 2018, type: 'peak' as const },
    { year: 2024, type: 'peak' as const },
    { year: 2026, type: 'predicted' as const }
  ]
};

export const risingTrends = [
  { keyword: '비건 화장품', growth: '+25%', emoji: '🔥' },
  { keyword: '디지털 패션', growth: '+19%', emoji: '📈' },
  { keyword: '개인화 AI', growth: '+31%', emoji: '⚡' },
  { keyword: '제로웨이스트', growth: '+12%', emoji: '🌱' },
  { keyword: '버추얼 피팅', growth: '+15%', emoji: '👗' }
];

export const newTrends = [
  '뉴로마케팅',
  '옴니채널',
  '하이브리드',
  '메타커머스',
  '소셜커머스'
];

export const recommendedKeywords = [
  '#레트로패션', '#AI에이전트', '#친환경',
  '#메타버스', '#K뷰티', '#지속가능',
  '#개인화마케팅'
];

export const getSentimentEmoji = (sentiment: number): string => {
  if (sentiment >= 40) return '☺';
  if (sentiment >= 20) return '😐';
  return '☹';
};

export const getSocialIcon = (source: string): string => {
  const icons: Record<string, string> = {
    instagram: 'fa-instagram',
    twitter: 'fa-x-twitter',
    'x-twitter': 'fa-x-twitter',
    youtube: 'fa-youtube',
    tiktok: 'fa-tiktok'
  };
  return icons[source] || 'fa-share';
};

export const getEngagementBar = (engagement: number): string => {
  const bars = Math.floor(engagement / 10);
  return '▇'.repeat(bars) + '░'.repeat(10 - bars);
};
