export type Locale = 'en' | 'ko' | 'my' | 'th';

export interface Translations {
  // Header
  appTitle: string;
  appSubtitle: string;

  // Input
  selectDivision: string;
  targetTime: string;
  hours: string;
  minutes: string;
  seconds: string;
  quickSelect: string;
  runSimulation: string;

  // Presets
  presetElite: string;
  presetAdvanced: string;
  presetStrong: string;
  presetChallenge: string;

  // Category labels
  catPro: string;
  catOpen: string;
  catDoubles: string;
  catRelay: string;

  // How-to
  howToTitle: string;
  howToStep1: string;
  howToStep2: string;
  howToStep3: string;
  howToStep4: string;
  howToNote: string;

  // Empty state
  emptyTitle: string;
  emptyDescription: string;
  tagRunning: string;
  tagStations: string;
  tagRoxZone: string;

  // Performance Badge
  targetFinishTime: string;

  // Performance levels
  levelElite: string;
  levelAdvanced: string;
  levelStrong: string;
  levelAverage: string;
  levelBeginner: string;
  descElite: string;
  descAdvanced: string;
  descStrong: string;
  descAverage: string;
  descBeginner: string;

  // Chart
  timeComposition: string;
  chartRunning: string;
  chartStations: string;
  chartRoxZone: string;

  // Run splits
  runSplitsTitle: string;
  avgPace: string;
  total: string;
  range: string;

  // Time breakdown table
  stationTimeBreakdown: string;
  thStation: string;
  thDistance: string;
  thWeight: string;
  thTarget: string;
  thVsAvg: string;
  roxZone: string;
  transitionZone: string;

  // Station cards
  stationDetailGuide: string;
  weight: string;
  avg: string;

  // Divisions
  divProMen: string;
  divProWomen: string;
  divOpenMen: string;
  divOpenWomen: string;
  divDoublesMen: string;
  divDoublesWomen: string;
  divDoublesMixed: string;
  divRelayMen: string;
  divRelayWomen: string;
  divRelayMixed: string;

  // Stations
  stSkiErg: string;
  stSledPush: string;
  stSledPull: string;
  stBurpeeBroadJump: string;
  stRowing: string;
  stFarmersCarry: string;
  stSandbagLunges: string;
  stWallBalls: string;

  // Execution cues
  cueSkiErg: string;
  cueSledPush: string;
  cueSledPull: string;
  cueBurpeeBroadJump: string;
  cueRowing: string;
  cueFarmersCarry: string;
  cueSandbagLunges: string;
  cueWallBalls: string;

  // Footer
  footer: string;
}
