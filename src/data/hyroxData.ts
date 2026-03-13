export type StationId =
  | 'skiErg'
  | 'sledPush'
  | 'sledPull'
  | 'burpeeBroadJump'
  | 'rowing'
  | 'farmersCarry'
  | 'sandbagLunges'
  | 'wallBalls';

export type SegmentId = StationId | 'roxpiZone' | 'runTotal';

export type DivisionId =
  | 'proMen'
  | 'proWomen'
  | 'openMen'
  | 'openWomen'
  | 'doublesMen'
  | 'doublesWomen'
  | 'doublesMixed'
  | 'relayMen'
  | 'relayWomen'
  | 'relayMixed';

export interface StationInfo {
  id: StationId;
  name: string;
  nameKo: string;
  distance: string;
  icon: string;
}

export interface DivisionInfo {
  id: DivisionId;
  name: string;
  nameKo: string;
  category: 'pro' | 'open' | 'doubles' | 'relay';
  gender: 'men' | 'women' | 'mixed';
}

export interface DivisionWeights {
  sledPush: string;
  sledPull: string;
  farmersCarry: string;
  sandbagLunges: string;
  wallBalls: string;
  wallBallReps: number;
}

export interface PerformanceBand {
  level: 'elite' | 'advanced' | 'strong' | 'average' | 'beginner';
  labelKo: string;
  maxSeconds: number;
}

export const STATIONS: StationInfo[] = [
  { id: 'skiErg', name: 'SkiErg', nameKo: '스키에르그', distance: '1,000m', icon: '⛷' },
  { id: 'sledPush', name: 'Sled Push', nameKo: '슬레드 푸시', distance: '50m', icon: '🏋' },
  { id: 'sledPull', name: 'Sled Pull', nameKo: '슬레드 풀', distance: '50m', icon: '🪢' },
  { id: 'burpeeBroadJump', name: 'Burpee Broad Jump', nameKo: '버피 브로드 점프', distance: '80m', icon: '🤸' },
  { id: 'rowing', name: 'Rowing', nameKo: '로잉', distance: '1,000m', icon: '🚣' },
  { id: 'farmersCarry', name: "Farmer's Carry", nameKo: '파머스 캐리', distance: '200m', icon: '🧑‍🌾' },
  { id: 'sandbagLunges', name: 'Sandbag Lunges', nameKo: '샌드백 런지', distance: '100m', icon: '🏃' },
  { id: 'wallBalls', name: 'Wall Balls', nameKo: '월 볼', distance: '100 reps', icon: '🎯' },
];

export const DIVISIONS: DivisionInfo[] = [
  { id: 'proMen', name: 'Pro Men', nameKo: '프로 남성', category: 'pro', gender: 'men' },
  { id: 'proWomen', name: 'Pro Women', nameKo: '프로 여성', category: 'pro', gender: 'women' },
  { id: 'openMen', name: 'Open Men', nameKo: '오픈 남성', category: 'open', gender: 'men' },
  { id: 'openWomen', name: 'Open Women', nameKo: '오픈 여성', category: 'open', gender: 'women' },
  { id: 'doublesMen', name: 'Doubles Men', nameKo: '더블스 남성', category: 'doubles', gender: 'men' },
  { id: 'doublesWomen', name: 'Doubles Women', nameKo: '더블스 여성', category: 'doubles', gender: 'women' },
  { id: 'doublesMixed', name: 'Doubles Mixed', nameKo: '더블스 혼성', category: 'doubles', gender: 'mixed' },
  { id: 'relayMen', name: 'Relay Men', nameKo: '릴레이 남성', category: 'relay', gender: 'men' },
  { id: 'relayWomen', name: 'Relay Women', nameKo: '릴레이 여성', category: 'relay', gender: 'women' },
  { id: 'relayMixed', name: 'Relay Mixed', nameKo: '릴레이 혼성', category: 'relay', gender: 'mixed' },
];

function mmss(m: number, s: number): number {
  return m * 60 + s;
}

export type BaselineTimes = Record<SegmentId, number>;

export const BASELINE_TIMES: Record<DivisionId, BaselineTimes> = {
  proMen: {
    skiErg: mmss(4, 11),
    sledPush: mmss(3, 40),
    sledPull: mmss(5, 54),
    burpeeBroadJump: mmss(4, 35),
    rowing: mmss(4, 29),
    farmersCarry: mmss(2, 2),
    sandbagLunges: mmss(5, 8),
    wallBalls: mmss(6, 48),
    roxpiZone: mmss(5, 47),
    runTotal: mmss(35, 44),
  },
  proWomen: {
    skiErg: mmss(4, 48),
    sledPush: mmss(3, 43),
    sledPull: mmss(6, 5),
    burpeeBroadJump: mmss(5, 22),
    rowing: mmss(5, 2),
    farmersCarry: mmss(2, 35),
    sandbagLunges: mmss(5, 21),
    wallBalls: mmss(6, 41),
    roxpiZone: mmss(6, 42),
    runTotal: mmss(40, 36),
  },
  openMen: {
    skiErg: mmss(4, 30),
    sledPush: mmss(3, 0),
    sledPull: mmss(5, 7),
    burpeeBroadJump: mmss(5, 45),
    rowing: mmss(4, 51),
    farmersCarry: mmss(2, 10),
    sandbagLunges: mmss(5, 30),
    wallBalls: mmss(7, 33),
    roxpiZone: mmss(7, 16),
    runTotal: mmss(42, 0),
  },
  openWomen: {
    skiErg: mmss(5, 10),
    sledPush: mmss(2, 45),
    sledPull: mmss(5, 50),
    burpeeBroadJump: mmss(7, 9),
    rowing: mmss(5, 24),
    farmersCarry: mmss(2, 16),
    sandbagLunges: mmss(5, 26),
    wallBalls: mmss(7, 18),
    roxpiZone: mmss(8, 3),
    runTotal: mmss(48, 0),
  },
  doublesMen: {
    skiErg: mmss(4, 0),
    sledPush: mmss(1, 47),
    sledPull: mmss(3, 24),
    burpeeBroadJump: mmss(3, 16),
    rowing: mmss(4, 28),
    farmersCarry: mmss(1, 38),
    sandbagLunges: mmss(3, 34),
    wallBalls: mmss(4, 32),
    roxpiZone: mmss(6, 37),
    runTotal: mmss(41, 14),
  },
  doublesWomen: {
    skiErg: mmss(4, 39),
    sledPush: mmss(1, 51),
    sledPull: mmss(4, 9),
    burpeeBroadJump: mmss(4, 24),
    rowing: mmss(5, 5),
    farmersCarry: mmss(1, 52),
    sandbagLunges: mmss(3, 44),
    wallBalls: mmss(4, 32),
    roxpiZone: mmss(7, 34),
    runTotal: mmss(48, 18),
  },
  doublesMixed: {
    skiErg: mmss(4, 15),
    sledPush: mmss(2, 8),
    sledPull: mmss(4, 3),
    burpeeBroadJump: mmss(3, 40),
    rowing: mmss(4, 43),
    farmersCarry: mmss(1, 47),
    sandbagLunges: mmss(4, 7),
    wallBalls: mmss(4, 52),
    roxpiZone: mmss(7, 9),
    runTotal: mmss(45, 19),
  },
  relayMen: {
    skiErg: mmss(6, 3),
    sledPush: mmss(2, 44),
    sledPull: mmss(4, 54),
    burpeeBroadJump: mmss(4, 58),
    rowing: mmss(4, 45),
    farmersCarry: mmss(2, 7),
    sandbagLunges: mmss(5, 0),
    wallBalls: mmss(6, 38),
    roxpiZone: mmss(6, 38),
    runTotal: mmss(35, 44),
  },
  relayWomen: {
    skiErg: mmss(5, 22),
    sledPush: mmss(2, 32),
    sledPull: mmss(5, 55),
    burpeeBroadJump: mmss(6, 10),
    rowing: mmss(5, 18),
    farmersCarry: mmss(2, 6),
    sandbagLunges: mmss(5, 0),
    wallBalls: mmss(5, 43),
    roxpiZone: mmss(5, 43),
    runTotal: mmss(38, 13),
  },
  relayMixed: {
    skiErg: mmss(5, 48),
    sledPush: mmss(2, 17),
    sledPull: mmss(4, 42),
    burpeeBroadJump: mmss(5, 1),
    rowing: mmss(4, 58),
    farmersCarry: mmss(2, 2),
    sandbagLunges: mmss(4, 37),
    wallBalls: mmss(5, 42),
    roxpiZone: mmss(5, 42),
    runTotal: mmss(34, 11),
  },
};

export const DIVISION_WEIGHTS: Partial<Record<DivisionId, DivisionWeights>> = {
  proMen: {
    sledPush: '202kg',
    sledPull: '153kg',
    farmersCarry: '2×32kg',
    sandbagLunges: '30kg',
    wallBalls: '9kg',
    wallBallReps: 100,
  },
  proWomen: {
    sledPush: '152kg',
    sledPull: '103kg',
    farmersCarry: '2×24kg',
    sandbagLunges: '20kg',
    wallBalls: '6kg',
    wallBallReps: 75,
  },
  openMen: {
    sledPush: '152kg',
    sledPull: '103kg',
    farmersCarry: '2×24kg',
    sandbagLunges: '20kg',
    wallBalls: '6kg',
    wallBallReps: 100,
  },
  openWomen: {
    sledPush: '102kg',
    sledPull: '78kg',
    farmersCarry: '2×16kg',
    sandbagLunges: '10kg',
    wallBalls: '4kg',
    wallBallReps: 75,
  },
};

export const PERFORMANCE_BANDS: Record<DivisionId, PerformanceBand[]> = {
  proMen: [
    { level: 'elite', labelKo: '엘리트', maxSeconds: 60 * 60 },
    { level: 'advanced', labelKo: '상급', maxSeconds: 68 * 60 },
    { level: 'strong', labelKo: '강함', maxSeconds: 75 * 60 },
    { level: 'average', labelKo: '평균', maxSeconds: 90 * 60 },
    { level: 'beginner', labelKo: '초급', maxSeconds: Infinity },
  ],
  proWomen: [
    { level: 'elite', labelKo: '엘리트', maxSeconds: 65 * 60 },
    { level: 'advanced', labelKo: '상급', maxSeconds: 75 * 60 },
    { level: 'strong', labelKo: '강함', maxSeconds: 85 * 60 },
    { level: 'average', labelKo: '평균', maxSeconds: 100 * 60 },
    { level: 'beginner', labelKo: '초급', maxSeconds: Infinity },
  ],
  openMen: [
    { level: 'elite', labelKo: '엘리트', maxSeconds: 65 * 60 },
    { level: 'advanced', labelKo: '상급', maxSeconds: 75 * 60 },
    { level: 'strong', labelKo: '강함', maxSeconds: 85 * 60 },
    { level: 'average', labelKo: '평균', maxSeconds: 100 * 60 },
    { level: 'beginner', labelKo: '초급', maxSeconds: Infinity },
  ],
  openWomen: [
    { level: 'elite', labelKo: '엘리트', maxSeconds: 70 * 60 },
    { level: 'advanced', labelKo: '상급', maxSeconds: 85 * 60 },
    { level: 'strong', labelKo: '강함', maxSeconds: 100 * 60 },
    { level: 'average', labelKo: '평균', maxSeconds: 120 * 60 },
    { level: 'beginner', labelKo: '초급', maxSeconds: Infinity },
  ],
  doublesMen: [
    { level: 'elite', labelKo: '엘리트', maxSeconds: 70 * 60 },
    { level: 'advanced', labelKo: '상급', maxSeconds: 85 * 60 },
    { level: 'strong', labelKo: '강함', maxSeconds: 95 * 60 },
    { level: 'average', labelKo: '평균', maxSeconds: 110 * 60 },
    { level: 'beginner', labelKo: '초급', maxSeconds: Infinity },
  ],
  doublesWomen: [
    { level: 'elite', labelKo: '엘리트', maxSeconds: 75 * 60 },
    { level: 'advanced', labelKo: '상급', maxSeconds: 90 * 60 },
    { level: 'strong', labelKo: '강함', maxSeconds: 100 * 60 },
    { level: 'average', labelKo: '평균', maxSeconds: 115 * 60 },
    { level: 'beginner', labelKo: '초급', maxSeconds: Infinity },
  ],
  doublesMixed: [
    { level: 'elite', labelKo: '엘리트', maxSeconds: 72 * 60 },
    { level: 'advanced', labelKo: '상급', maxSeconds: 88 * 60 },
    { level: 'strong', labelKo: '강함', maxSeconds: 100 * 60 },
    { level: 'average', labelKo: '평균', maxSeconds: 115 * 60 },
    { level: 'beginner', labelKo: '초급', maxSeconds: Infinity },
  ],
  relayMen: [
    { level: 'elite', labelKo: '엘리트', maxSeconds: 58 * 60 },
    { level: 'advanced', labelKo: '상급', maxSeconds: 68 * 60 },
    { level: 'strong', labelKo: '강함', maxSeconds: 78 * 60 },
    { level: 'average', labelKo: '평균', maxSeconds: 90 * 60 },
    { level: 'beginner', labelKo: '초급', maxSeconds: Infinity },
  ],
  relayWomen: [
    { level: 'elite', labelKo: '엘리트', maxSeconds: 65 * 60 },
    { level: 'advanced', labelKo: '상급', maxSeconds: 75 * 60 },
    { level: 'strong', labelKo: '강함', maxSeconds: 87 * 60 },
    { level: 'average', labelKo: '평균', maxSeconds: 100 * 60 },
    { level: 'beginner', labelKo: '초급', maxSeconds: Infinity },
  ],
  relayMixed: [
    { level: 'elite', labelKo: '엘리트', maxSeconds: 55 * 60 },
    { level: 'advanced', labelKo: '상급', maxSeconds: 62 * 60 },
    { level: 'strong', labelKo: '강함', maxSeconds: 70 * 60 },
    { level: 'average', labelKo: '평균', maxSeconds: 80 * 60 },
    { level: 'beginner', labelKo: '초급', maxSeconds: Infinity },
  ],
};

export const EXECUTION_CUES: Record<StationId, string> = {
  skiErg: '일정한 리듬 유지, 다리와 코어 힘 활용',
  sledPush: '짧은 스텝, 멈추지 않고 지속 이동',
  sledPull: '그립 관리, 리셋 최소화',
  burpeeBroadJump: '리듬이 속도를 이긴다, 일정한 케이던스',
  rowing: '다리 드라이브 우선, 호흡 컨트롤',
  farmersCarry: '내려놓는 횟수 줄이기, 호흡 조절',
  sandbagLunges: '꾸준한 스텝, 계획적 휴식',
  wallBalls: '계획된 세트로 나눠서, 코어 유지',
};
