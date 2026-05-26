import type { CharacterSpriteSet } from "./character-sprites";
import type { CharacterCode } from "./scenes";
import {
  ALEXANDRA_ROAD_ROUTE,
  BUS_DEPOT_ROUTE,
  CLASSROOM_ROUTE,
  CITY_HALL_ROUTE,
  COMMAND_CENTER_ROUTE,
  FUNERAL_ROUTE,
  GOVERNMENT_OFFICE_ROUTE,
  HOCK_LEE_MAP_ROUTE,
  HOME_BUS_WORKER_RETURN_ROUTE,
  HOME_BUS_WORKER_ROUTE,
  HOME_CIVIL_SERVANT_ROUTE,
  HOME_STUDENT_RETURN_ROUTE,
  HOME_STUDENT_ROUTE,
  INTRO_CUTSCENE_ROUTE,
  KALLANG_AIRPORT_ROUTE,
  KK_HOSPITAL_ROUTE,
  MARKET_ROUTE,
  NEGOTIATION_ROUTE,
  NEGOTIATION_OUTCOME_CUTSCENE_ROUTE,
  OUTRO_CUTSCENE_ROUTE,
  POST_RIOT_CUTSCENE_ROUTE,
  RIOT_CUTSCENE_ROUTE,
  SCHOOL_GATES_ROUTE,
  SCHOOL_LAKE_ROUTE,
  STUDENT_ESCALATION_CUTSCENE_ROUTE,
  STUDENT_SUPPORT_CUTSCENE_ROUTE,
} from "./story-paths";

export const DEFAULT_CHARACTER_CODE: CharacterCode = "BW";
export const SELECTED_CHARACTER_STORAGE_KEY = "hockLeeSelectedCharacter";

export type StoryPhase = "Pre-Riot" | "Riot" | "Post-Riot";
export type StoryCutsceneKind =
  | "intro"
  | "student-support-transition"
  | "student-escalation-transition"
  | "riot-transition"
  | "post-riot-transition"
  | "negotiation-outcome"
  | "outro";
export type MapNodeKey =
  | "city-hall"
  | "market"
  | "home"
  | "bus-depot"
  | "government-office"
  | "command-center"
  | "alexandra-road"
  | "hospital"
  | "negotiation-hall"
  | "funeral"
  | "airport"
  | "classroom"
  | "school-lake"
  | "school-gates";

export type StoryStep = {
  id: string;
  role: CharacterCode;
  phase: StoryPhase;
  route: string;
  nodeKey: MapNodeKey;
  locationLabel: string;
  timelineLabel?: string;
  dateLabel?: string;
  sceneTitle: string;
  sceneSubtitle: string;
  summary: string;
};

export type MapNodeDefinition = {
  key: MapNodeKey;
  label: string;
  description: string;
  position: {
    left: string;
    top: string;
  };
  image: {
    src: string;
    alt: string;
    className: string;
  };
};

export type CharacterPresentation = {
  code: CharacterCode;
  playerName: string;
  playerFullName: string;
  playerAlt: string;
  markerSprite: string;
  cutsceneSprite: string;
  dialoguePortraitSprite?: string;
  characterSpriteBasePath?: string;
  characterSprites?: CharacterSpriteSet;
};

export type CutsceneContent = {
  badge: string;
  heading: string;
  paragraphs: [string, string, string, string];
  continueLabel: string;
};

export type StoryPhaseTrackSegment = {
  label: StoryPhase;
  span: number;
  color: string;
};

const buildBusWorkerWalkingFrames = (
  direction: "North" | "South" | "East" | "West",
  prefix: string
) =>
  Array.from({ length: 8 }, (_, index) => {
    const frameNumber = index + 1;
    return `/npcfigures/busworker/Bus Worker/${direction}/${encodeURIComponent(
      `${prefix}_${frameNumber}.webp`
    )}`;
  });

// Asset directory name on disk currently includes a trailing space.
const ONG_KIM_CHUAN_FIGURE_FOLDER = "ongkimchuan ";

const buildStudentWalkingFrames = (
  folder: "Walking to Left" | "Walking to Right",
  prefix: "Student_west" | "Student_east"
) =>
  Array.from({ length: 8 }, (_, index) => {
    const frameNumber = index + 1;
    return `/character-figures/${encodeURIComponent(
      ONG_KIM_CHUAN_FIGURE_FOLDER
    )}/${encodeURIComponent(folder)}/${encodeURIComponent(`${prefix}_${frameNumber}.webp`)}`;
  });

const buildStudentIdleSprite = (frameNumber: number) =>
  `/character-figures/${encodeURIComponent(
    ONG_KIM_CHUAN_FIGURE_FOLDER
  )}/${encodeURIComponent(`MC_Chinese Student_${String(frameNumber).padStart(4, "0")}.webp`)}`;

export const CHARACTER_PRESENTATIONS: Record<CharacterCode, CharacterPresentation> = {
  CIV: {
    code: "CIV",
    playerName: "Rajiv",
    playerFullName: "Rajiv Menon",
    playerAlt: "Rajiv Menon",
    markerSprite: "/character-figures/rajivmenon/south.png",
    cutsceneSprite: "/character-figures/rajivmenon/south.png",
    dialoguePortraitSprite: "/npcfigures/civilservant/Civil Servant_0008.webp",
    characterSpriteBasePath: "/character-figures/rajivmenon",
  },
  BW: {
    code: "BW",
    playerName: "Ahmad",
    playerFullName: "Ahmad bin Salleh",
    playerAlt: "Ahmad bin Salleh",
    markerSprite: "/npcfigures/busworker/south.png",
    cutsceneSprite: "/npcfigures/busworker/south.png",
    characterSprites: {
      idle: {
        north: "/npcfigures/busworker/north.png",
        south: "/npcfigures/busworker/south.png",
        east: "/npcfigures/busworker/east.png",
        west: "/npcfigures/busworker/west.png",
      },
      walking: {
        north: buildBusWorkerWalkingFrames("North", "Bus Worker_North"),
        south: buildBusWorkerWalkingFrames("South", "Bus Worker_south"),
        east: buildBusWorkerWalkingFrames("East", "Bus Worker_east"),
        west: buildBusWorkerWalkingFrames("West", "Bus Worker_West"),
      },
    },
  },
  CS: {
    code: "CS",
    playerName: "Kim Chuan",
    playerFullName: "Ong Kim Chuan",
    playerAlt: "Ong Kim Chuan",
    markerSprite: buildStudentIdleSprite(1),
    cutsceneSprite: buildStudentIdleSprite(1),
    dialoguePortraitSprite: buildStudentIdleSprite(8),
    characterSprites: {
      idle: {
        north: buildStudentIdleSprite(5),
        south: buildStudentIdleSprite(1),
        east: buildStudentIdleSprite(7),
        west: buildStudentIdleSprite(3),
      },
      walking: {
        east: buildStudentWalkingFrames("Walking to Right", "Student_east"),
        west: buildStudentWalkingFrames("Walking to Left", "Student_west"),
      },
    },
  },
};

export const MAP_NODE_DEFINITIONS: Record<MapNodeKey, MapNodeDefinition> = {
  "city-hall": {
    key: "city-hall",
    label: "City Hall",
    description:
      "Labour Front takes office and is immediately judged on wages, bus grievances, and public order.",
    position: { left: "57.5%", top: "73.5%" },
    image: {
      src: "/map-nodes/cityhall.png",
      alt: "City Hall",
      className: "hl-pixel-map-node--cityhall",
    },
  },
  market: {
    key: "market",
    label: "Market",
    description:
      "Rising prices, cramped housing, and thin wages explain why labour anger spreads quickly.",
    position: { left: "32.3%", top: "31.5%" },
    image: {
      src: "/map-nodes/market.png",
      alt: "Market",
      className: "hl-pixel-map-node--market",
    },
  },
  home: {
    key: "home",
    label: "Home",
    description:
      "Family talk turns depot rumours, dismissals, and strike fears into something personal.",
    position: { left: "48.7%", top: "18%" },
    image: {
      src: "/map-nodes/home.png",
      alt: "Home",
      className: "hl-pixel-map-node--home",
    },
  },
  "bus-depot": {
    key: "bus-depot",
    label: "Bus Depot",
    description:
      "Dismissed workers sit at the gates, block buses, and turn the dispute into open confrontation.",
    position: { left: "48.5%", top: "48.5%" },
    image: {
      src: "/map-nodes/busdepot.png",
      alt: "Bus Depot",
      className: "hl-pixel-map-node--busdepot",
    },
  },
  "government-office": {
    key: "government-office",
    label: "Government Office",
    description:
      "Marshall tries to settle the dispute as reinstatement, union conflict, and public order collide.",
    position: { left: "49.4%", top: "36.6%" },
    image: {
      src: "/map-nodes/governmentoffice.png",
      alt: "Government Office",
      className: "hl-pixel-map-node--governmentoffice",
    },
  },
  "command-center": {
    key: "command-center",
    label: "Command Center",
    description:
      "On 12 May, officials scramble as water hoses, thrown bricks, and casualty reports overtake the strike.",
    position: { left: "50.2%", top: "47.5%" },
    image: {
      src: "/map-nodes/commandcentre.png",
      alt: "Command Center",
      className: "hl-pixel-map-node--commandcentre",
    },
  },
  "alexandra-road": {
    key: "alexandra-road",
    label: "Alexandra Road",
    description:
      "What began at the depot erupts into deadly clashes on Alexandra Road.",
    position: { left: "42.8%", top: "56.7%" },
    image: {
      src: "/map-nodes/alexandraroad.png",
      alt: "Alexandra Road",
      className: "hl-pixel-map-node--alexandraroad",
    },
  },
  hospital: {
    key: "hospital",
    label: "Hospital",
    description:
      "Hospital wards make the riot's injuries impossible to treat as abstractions.",
    position: { left: "54.2%", top: "38.5%" },
    image: {
      src: "/map-nodes/hospital.png",
      alt: "Hospital",
      className: "hl-pixel-map-node--hospital",
    },
  },
  "negotiation-hall": {
    key: "negotiation-hall",
    label: "Negotiation Hall",
    description:
      "On 14 May, talks return because the city cannot absorb more bloodshed.",
    position: { left: "50.5%", top: "37.2%" },
    image: {
      src: "/map-nodes/negotiationhall.png",
      alt: "Negotiation Hall",
      className: "hl-pixel-map-node--negotiationhall",
    },
  },
  funeral: {
    key: "funeral",
    label: "Funeral",
    description:
      "Deaths from the riot turn mourning into a public argument about blame and memory.",
    position: { left: "60.4%", top: "36.8%" },
    image: {
      src: "/map-nodes/funeral.png",
      alt: "Funeral",
      className: "hl-pixel-map-node--funeral",
    },
  },
  airport: {
    key: "airport",
    label: "Airport",
    description:
      "British doubts after Hock Lee shadow Marshall's 1956 Merdeka mission.",
    position: { left: "57.5%", top: "73.5%" },
    image: {
      src: "/map-nodes/kallangairport.png",
      alt: "Kallang Airport",
      className: "hl-pixel-map-node--kallang",
    },
  },
  classroom: {
    key: "classroom",
    label: "Classroom",
    description:
      "Election news and worker politics pull Chinese-middle-school students toward the Hock Lee dispute.",
    position: { left: "31.3%", top: "45.4%" },
    image: {
      src: "/map-nodes/schoolbuilding.png",
      alt: "Classroom",
      className: "hl-pixel-map-node--schoolbuilding",
    },
  },
  "school-lake": {
    key: "school-lake",
    label: "School Lake",
    description:
      "Students organize food, songs, and numbers to show the depot workers they are not alone.",
    position: { left: "37.9%", top: "39.7%" },
    image: {
      src: "/map-nodes/schoollake.png",
      alt: "School Lake",
      className: "hl-pixel-map-node--schoollake",
    },
  },
  "school-gates": {
    key: "school-gates",
    label: "School Gates",
    description:
      "School reopens under warnings, tighter discipline, and growing suspicion toward student politics.",
    position: { left: "49.7%", top: "35.8%" },
    image: {
      src: "/map-nodes/schoolgate.png",
      alt: "School Gates",
      className: "hl-pixel-map-node--schoolgate",
    },
  },
};

const STORY_DATE_LABELS = {
  scene1: "2 Apr 1955",
  scene2: "1952-1955",
  scene3: "Apr 1955",
  scene4: "27 Apr 1955",
  scene5: "Late Apr - 11 May 1955",
  scene6: "12 May 1955",
  scene7: "14 May 1955",
  scene8: "14 May 1955",
  scene9: "Apr 1956",
} as const;

const STORY_PHASE_ORDER: StoryPhase[] = ["Pre-Riot", "Riot", "Post-Riot"];

const STORY_PHASE_COLORS: Record<StoryPhase, string> = {
  "Pre-Riot": "rgb(255, 193, 94)",
  Riot: "rgb(210, 92, 92)",
  "Post-Riot": "rgb(130, 160, 185)",
};

export const ROLE_STORY_STEPS: Record<CharacterCode, StoryStep[]> = {
  CIV: [
    {
      id: "civ-city-hall",
      role: "CIV",
      phase: "Pre-Riot",
      route: CITY_HALL_ROUTE,
      nodeKey: "city-hall",
      locationLabel: "City Hall",
      dateLabel: STORY_DATE_LABELS.scene1,
      timelineLabel: "First Briefing",
      sceneTitle: "Pre-Riot: City Hall Briefing",
      sceneSubtitle:
        "Rajiv begins inside a Labour Front government fresh from the 2 April 1955 election. Marshall's victory feels hopeful, but worker grievances, bus disputes, and British scrutiny are already closing in.",
      summary: "The new government inherits public hopes and an unstable city.",
    },
    {
      id: "civ-market",
      role: "CIV",
      phase: "Pre-Riot",
      route: MARKET_ROUTE,
      nodeKey: "market",
      locationLabel: "Market",
      dateLabel: STORY_DATE_LABELS.scene2,
      timelineLabel: "Street Pressure",
      sceneTitle: "Pre-Riot: Market Conversations",
      sceneSubtitle:
        "In the market, Rajiv hears why labour anger spreads so easily: wages lag, prices rise, and cramped housing sharpen every complaint.",
      summary: "Street talk explains the social pressure behind the strike.",
    },
    {
      id: "civ-home",
      role: "CIV",
      phase: "Pre-Riot",
      route: HOME_CIVIL_SERVANT_ROUTE,
      nodeKey: "home",
      locationLabel: "Home",
      dateLabel: STORY_DATE_LABELS.scene3,
      timelineLabel: "Worry at Home",
      sceneTitle: "Pre-Riot: Unrest at Home",
      sceneSubtitle:
        "At home, radio bulletins and family questions turn official briefings into private unease. Hock Lee no longer feels like just another case file.",
      summary: "Private life makes the dispute harder to keep at arm's length.",
    },
    {
      id: "civ-bus-depot",
      role: "CIV",
      phase: "Riot",
      route: BUS_DEPOT_ROUTE,
      nodeKey: "bus-depot",
      locationLabel: "Bus Depot",
      dateLabel: STORY_DATE_LABELS.scene4,
      timelineLabel: "Strike Line",
      sceneTitle: "Riot: Bus Depot Standoff",
      sceneSubtitle:
        "At the depot on 27 April, Rajiv sees dismissed workers sitting at the gates, buses blocked from leaving, and police crowding close to a labour dispute that is becoming public theatre.",
      summary: "The strike line turns dismissals into a citywide test.",
    },
    {
      id: "civ-government-office",
      role: "CIV",
      phase: "Riot",
      route: GOVERNMENT_OFFICE_ROUTE,
      nodeKey: "government-office",
      locationLabel: "Government Office",
      dateLabel: STORY_DATE_LABELS.scene5,
      timelineLabel: "Crisis Meeting",
      sceneTitle: "Riot: Government Crisis Meeting",
      sceneSubtitle:
        "Inside government, Rajiv helps track Marshall's attempt to broker terms between the Singapore Bus Workers' Union and the company after 229 dismissals. Every hour without a settlement makes the next clash more likely.",
      summary: "Mediation is failing to outrun public anger.",
    },
    {
      id: "civ-command-center",
      role: "CIV",
      phase: "Riot",
      route: COMMAND_CENTER_ROUTE,
      nodeKey: "command-center",
      locationLabel: "Command Center",
      dateLabel: STORY_DATE_LABELS.scene6,
      timelineLabel: "Damage Control",
      sceneTitle: "Riot: Command Center",
      sceneSubtitle:
        "On 12 May, phone calls from Alexandra Road bring reports of police hoses, thrown bricks and bottles, injuries, and confusion. Rajiv is no longer managing risk so much as counting the cost as it arrives.",
      summary: "The strike has turned into a deadly crisis.",
    },
    {
      id: "civ-funeral",
      role: "CIV",
      phase: "Post-Riot",
      route: FUNERAL_ROUTE,
      nodeKey: "funeral",
      locationLabel: "Funeral",
      dateLabel: STORY_DATE_LABELS.scene7,
      timelineLabel: "Public Mourning",
      sceneTitle: "Post-Riot: Funeral Procession",
      sceneSubtitle:
        "In the funeral crowd, Rajiv confronts what official reports cannot soften: the dead are now being mourned in public, and every act of mourning also speaks about blame.",
      summary: "Public grief becomes political memory.",
    },
    {
      id: "civ-negotiation",
      role: "CIV",
      phase: "Post-Riot",
      route: NEGOTIATION_ROUTE,
      nodeKey: "negotiation-hall",
      locationLabel: "Negotiation Hall",
      dateLabel: STORY_DATE_LABELS.scene8,
      timelineLabel: "Fragile Settlement",
      sceneTitle: "Post-Riot: Return to Negotiation",
      sceneSubtitle:
        "On 14 May, Rajiv watches the government help secure a settlement: the dismissed workers are reinstated, but calm returns with little trust restored.",
      summary: "The agreement ends the riot, not the bitterness.",
    },
    {
      id: "civ-airport",
      role: "CIV",
      phase: "Post-Riot",
      route: KALLANG_AIRPORT_ROUTE,
      nodeKey: "airport",
      locationLabel: "Airport",
      dateLabel: STORY_DATE_LABELS.scene9,
      timelineLabel: "Uncertain Future",
      sceneTitle: "Post-Riot: Airport Departure",
      sceneSubtitle:
        "At the airport in April 1956, Rajiv sees Marshall leave for the First Merdeka Talks under the shadow of Hock Lee. British doubts about law and order now travel with the delegation.",
      summary: "The riots reshape Singapore's case for self-government.",
    },
  ],
  BW: [
    {
      id: "bw-city-hall",
      role: "BW",
      phase: "Pre-Riot",
      route: CITY_HALL_ROUTE,
      nodeKey: "city-hall",
      locationLabel: "City Hall",
      dateLabel: STORY_DATE_LABELS.scene1,
      sceneTitle: "Pre-Riot: City Hall",
      sceneSubtitle:
        "Outside City Hall, Ahmad hears Labour Front's promises and wonders whether a worker will finally be heard after the election or only addressed once the trouble begins.",
      summary: "Political promises now invite worker judgment.",
    },
    {
      id: "bw-market",
      role: "BW",
      phase: "Pre-Riot",
      route: MARKET_ROUTE,
      nodeKey: "market",
      locationLabel: "Market",
      dateLabel: STORY_DATE_LABELS.scene2,
      sceneTitle: "Pre-Riot: Market",
      sceneSubtitle:
        "At the market, every purchase confirms what depot talk already says: wages do not keep up with food, rent, and household needs.",
      summary: "Daily costs turn frustration into shared grievance.",
    },
    {
      id: "bw-home",
      role: "BW",
      phase: "Pre-Riot",
      route: HOME_BUS_WORKER_ROUTE,
      nodeKey: "home",
      locationLabel: "Home",
      dateLabel: STORY_DATE_LABELS.scene3,
      sceneTitle: "Pre-Riot: Home",
      sceneSubtitle:
        "At home, Ahmad explains why the men are angry: union leave is denied, a rival union is treated better, and management keeps dismissing workers as warnings to the rest.",
      summary: "The coming strike is argued out inside the family.",
    },
    {
      id: "bw-bus-depot",
      role: "BW",
      phase: "Riot",
      route: BUS_DEPOT_ROUTE,
      nodeKey: "bus-depot",
      locationLabel: "Bus Depot",
      dateLabel: STORY_DATE_LABELS.scene4,
      sceneTitle: "Riot: Bus Depot",
      sceneSubtitle:
        "At the depot in late April, Ahmad joins men sitting at the gates after 229 dismissals. The hunger strike and bus blockade make their anger impossible to ignore.",
      summary: "Dismissal becomes open resistance.",
    },
    {
      id: "bw-government-office",
      role: "BW",
      phase: "Riot",
      route: GOVERNMENT_OFFICE_ROUTE,
      nodeKey: "government-office",
      locationLabel: "Government Office",
      dateLabel: STORY_DATE_LABELS.scene5,
      sceneTitle: "Riot: Government Office",
      sceneSubtitle:
        "While Marshall tries to mediate, Ahmad waits outside with the other workers, unsure whether the talks will bring back the dismissed men or only more delay.",
      summary: "Hope depends on reinstatement, not speeches.",
    },
    {
      id: "bw-alexandra-road",
      role: "BW",
      phase: "Riot",
      route: ALEXANDRA_ROAD_ROUTE,
      nodeKey: "alexandra-road",
      locationLabel: "Alexandra Road",
      dateLabel: STORY_DATE_LABELS.scene6,
      sceneTitle: "Riot: Alexandra Road",
      sceneSubtitle:
        "On 12 May, hoses, stones, bottles, and panic overtake the strike. Ahmad sees the dispute slip beyond anyone's control.",
      summary: "Alexandra Road becomes a place of injury and death.",
    },
    {
      id: "bw-hospital",
      role: "BW",
      phase: "Post-Riot",
      route: KK_HOSPITAL_ROUTE,
      nodeKey: "hospital",
      locationLabel: "Hospital",
      dateLabel: STORY_DATE_LABELS.scene7,
      sceneTitle: "Post-Riot: Hospital",
      sceneSubtitle:
        "In the hospital, Ahmad sees what the riot left behind: bruised bodies, crowded wards, and workers trying to understand how a labour dispute ended here.",
      summary: "The cost of the clash is written on the injured.",
    },
    {
      id: "bw-negotiation",
      role: "BW",
      phase: "Post-Riot",
      route: NEGOTIATION_ROUTE,
      nodeKey: "negotiation-hall",
      locationLabel: "Negotiation Hall",
      dateLabel: STORY_DATE_LABELS.scene8,
      sceneTitle: "Post-Riot: Negotiation Hall",
      sceneSubtitle:
        "When talks resume on 14 May, Ahmad learns the dismissed workers will be taken back. Even so, reinstatement does not erase the deaths or the distrust.",
      summary: "Workers recover jobs but not a clean victory.",
    },
    {
      id: "bw-home-return",
      role: "BW",
      phase: "Post-Riot",
      route: HOME_BUS_WORKER_RETURN_ROUTE,
      nodeKey: "home",
      locationLabel: "Home (Return)",
      dateLabel: STORY_DATE_LABELS.scene9,
      sceneTitle: "Post-Riot: Home",
      sceneSubtitle:
        "Back home, Ahmad is safe, but safety does not settle what the strike meant or what the next dispute might demand.",
      summary: "Coming home closes the route, not the argument.",
    },
  ],
  CS: [
    {
      id: "cs-city-hall",
      role: "CS",
      phase: "Pre-Riot",
      route: CITY_HALL_ROUTE,
      nodeKey: "city-hall",
      locationLabel: "City Hall",
      dateLabel: STORY_DATE_LABELS.scene1,
      sceneTitle: "Pre-Riot: City Hall",
      sceneSubtitle:
        "Outside City Hall, Kim Chuan listens as election speeches, worker promises, and the mood of the crowd turn politics into something he can hear and question for himself.",
      summary: "City Hall turns election news into a public lesson.",
    },
    {
      id: "cs-classroom",
      role: "CS",
      phase: "Pre-Riot",
      route: CLASSROOM_ROUTE,
      nodeKey: "classroom",
      locationLabel: "Classroom",
      dateLabel: STORY_DATE_LABELS.scene1,
      sceneTitle: "Pre-Riot: Classroom",
      sceneSubtitle:
        "Back in class, Kim Chuan hears the election result turned into debate about Labour Front, workers, and what politics might now demand from students.",
      summary: "Election news follows him from the square into school.",
    },
    {
      id: "cs-market",
      role: "CS",
      phase: "Pre-Riot",
      route: MARKET_ROUTE,
      nodeKey: "market",
      locationLabel: "Market",
      dateLabel: STORY_DATE_LABELS.scene2,
      sceneTitle: "Pre-Riot: Market",
      sceneSubtitle:
        "At the market, Kim Chuan hears that the same rising prices burdening families are also feeding worker anger at Hock Lee.",
      summary: "Everyday hardship makes politics tangible.",
    },
    {
      id: "cs-home",
      role: "CS",
      phase: "Pre-Riot",
      route: HOME_STUDENT_ROUTE,
      nodeKey: "home",
      locationLabel: "Home",
      dateLabel: STORY_DATE_LABELS.scene3,
      sceneTitle: "Pre-Riot: Home",
      sceneSubtitle:
        "At home, Ong Kim Wah explains the dispute plainly: unfair treatment, union tension, and dismissals are pushing the depot toward strike action.",
      summary: "A sibling brings Hock Lee into the household.",
    },
    {
      id: "cs-school-lake",
      role: "CS",
      phase: "Riot",
      route: SCHOOL_LAKE_ROUTE,
      nodeKey: "school-lake",
      locationLabel: "School Lake",
      dateLabel: STORY_DATE_LABELS.scene4,
      sceneTitle: "Riot: School Lake",
      sceneSubtitle:
        "At the school lake, students argue over labour injustice, solidarity, disorder, and blame as they try to decide what Hock Lee means.",
      summary: "Student solidarity is planned, not accidental.",
    },
    {
      id: "cs-bus-depot",
      role: "CS",
      phase: "Riot",
      route: BUS_DEPOT_ROUTE,
      nodeKey: "bus-depot",
      locationLabel: "Bus Depot",
      dateLabel: STORY_DATE_LABELS.scene5,
      sceneTitle: "Riot: Bus Depot",
      sceneSubtitle:
        "At the depot, Kim Chuan sees how student support changes the mood: what began as a workers' dispute now feels like a broader public cause.",
      summary: "The strike becomes a shared political stage.",
    },
    {
      id: "cs-alexandra-road",
      role: "CS",
      phase: "Riot",
      route: ALEXANDRA_ROAD_ROUTE,
      nodeKey: "alexandra-road",
      locationLabel: "Alexandra Road",
      dateLabel: STORY_DATE_LABELS.scene6,
      sceneTitle: "Riot: Alexandra Road",
      sceneSubtitle:
        "On Alexandra Road, Kim Chuan watches the scene turn from chanting to hoses, flying debris, and casualties. One day of support becomes a lesson in fear.",
      summary: "Solidarity collides with violence.",
    },
    {
      id: "cs-funeral",
      role: "CS",
      phase: "Post-Riot",
      route: FUNERAL_ROUTE,
      nodeKey: "funeral",
      locationLabel: "Funeral",
      dateLabel: STORY_DATE_LABELS.scene7,
      sceneTitle: "Post-Riot: Funeral",
      sceneSubtitle:
        "At Chong Lon Chong's funeral, Kim Chuan stands among grieving students and sees how the riot will follow them back into school life.",
      summary: "A fellow student's death turns solidarity into grief.",
    },
    {
      id: "cs-school-gates",
      role: "CS",
      phase: "Post-Riot",
      route: SCHOOL_GATES_ROUTE,
      nodeKey: "school-gates",
      locationLabel: "School Gates",
      dateLabel: STORY_DATE_LABELS.scene8,
      sceneTitle: "Post-Riot: School Gates",
      sceneSubtitle:
        "At the school gates, the memory of Hock Lee and later student unrest lives on in tighter discipline, warnings, and suspicion toward student politics.",
      summary:
        "School becomes another site of political consequence.",
    },
    {
      id: "cs-home-return",
      role: "CS",
      phase: "Post-Riot",
      route: HOME_STUDENT_RETURN_ROUTE,
      nodeKey: "home",
      locationLabel: "Home",
      dateLabel: STORY_DATE_LABELS.scene9,
      sceneTitle: "Post-Riot: Home",
      sceneSubtitle:
        "At home again, Kim Chuan returns with the newspaper version of events in one hand and what he actually saw still unsettled in his mind.",
      summary: "The route ends in reflection shaped by experience.",
    },
  ],
};

export const MASTER_MODE_NODE_ORDER: MapNodeKey[] = [
  "city-hall",
  "market",
  "home",
  "government-office",
  "bus-depot",
  "command-center",
  "classroom",
  "school-lake",
  "alexandra-road",
  "funeral",
  "hospital",
  "negotiation-hall",
  "school-gates",
  "airport",
];

export const CUTSCENE_CONTENT_BY_ROLE: Record<
  CharacterCode,
  Record<StoryCutsceneKind, CutsceneContent>
> = {
  CIV: {
    intro: {
      badge: "CIVIL SERVANT",
      heading: "Keeping Calm, For Now",
      paragraphs: [
        "You are Rajiv Menon, a civil servant working inside a Labour Front government that has only just taken office after the 2 April 1955 election. Your role is to follow how complaints, reports, and political promises become a real test of government.",
        "Rajiv works close to paperwork, meetings, and public statements, but his job is not only clerical. He has to notice when labour grievances, living costs, and public anger stop looking manageable on paper.",
        "At first, Hock Lee appears as a labour dispute about unfair treatment, union conflict, and transport workers who say they are being pushed too far.",
        "You begin at a moment when Marshall's new government still hopes negotiation and credibility will be enough, even as British scrutiny and social pressure make that hope fragile.",
      ],
      continueLabel: "Start the briefing",
    },
    "student-support-transition": {
      badge: "TURNING POINT",
      heading: "Support Becomes Visible",
      paragraphs: [
        "Chinese-middle-school students are no longer only discussing Hock Lee from the sidelines.",
        "They are heading to the depot with food, songs, and numbers to show the bus workers they are not facing management alone.",
        "For the government, that solidarity changes the scale of the dispute. A labour conflict is becoming a public test watched by far more than the company and union.",
        "Rajiv's next scene sits closer to that pressure, where visible support on the ground makes delay harder to defend.",
      ],
      continueLabel: "Continue",
    },
    "student-escalation-transition": {
      badge: "TURNING POINT",
      heading: "From Standoff To Escalation",
      paragraphs: [
        "Crowds around Hock Lee have grown larger and more emotionally charged.",
        "Student solidarity, worker anger, police presence, and failed efforts to calm the dispute are now pressing against one another.",
        "What was once a strike line is becoming the kind of confrontation the government may no longer be able to contain quietly.",
        "Rajiv now moves into the phase where reports stop sounding speculative and start arriving as crisis.",
      ],
      continueLabel: "Continue",
    },
    "riot-transition": {
      badge: "PHASE SHIFT",
      heading: "When Reports Aren't Enough",
      paragraphs: [
        "You are now entering the phase where Hock Lee stops feeling like a contained labour file and starts becoming a public crisis.",
        "Dismissals, union rivalry, and rising frustration are pushing the dispute out of offices and into the open, where every delay makes the government look weaker.",
        "Marshall still hopes mediation can hold the situation together, but the next scenes show how quickly events begin outrunning official control.",
        "From inside government, Rajiv is no longer only gathering information. He is trying to understand a conflict that is starting to move faster than policy can answer it.",
      ],
      continueLabel: "Face the crisis",
    },
    "post-riot-transition": {
      badge: "PHASE SHIFT",
      heading: "After The Clashes",
      paragraphs: [
        "On 12 May, police hoses meet bricks, stones, and bottles on Alexandra Road.",
        "By the next morning, four people are dead and 31 injured. The riot has become a judgement on government, police, unions, and crowd politics all at once.",
        "Before any settlement can be secured, officials must face public mourning, political blame, and the question of whether order can still be restored without looking powerless.",
        "You now enter the immediate aftermath that London and the British administration will study closely when Marshall later argues Singapore's case for self-government.",
      ],
      continueLabel: "Enter the aftermath",
    },
    "negotiation-outcome": {
      badge: "SETTLEMENT",
      heading: "What The Agreement Could Not Erase",
      paragraphs: [
        "On 14 May, the government helps secure a settlement between Hock Lee management and the workers.",
        "The dismissed workers are reinstated, and the agreement brings the immediate dispute to a formal close.",
        "But the bloodshed has already changed how British officials judge Marshall's government: the settlement ends the strike, not the doubts about whether Singapore's leaders can maintain order.",
        "The next stage of Rajiv's route shows how Hock Lee follows Marshall into the wider struggle for self-government.",
      ],
      continueLabel: "Continue the story",
    },
    outro: {
      badge: "AFTERMATH",
      heading: "What Order Cost",
      paragraphs: [
        "You have seen Hock Lee from inside government, where procedure, mediation, and public order collided under pressure.",
        "Marshall chose negotiation over immediate repression, but British officials read the riots as evidence that Singapore's leaders could not fully control the street.",
        "That judgement followed him into the First Merdeka Talks and weakened Singapore's case for self-government.",
        "The lesson of this route is that labour justice, public order, and political legitimacy were never separate problems.",
      ],
      continueLabel: "Return to map",
    },
  },
  BW: {
    intro: {
      badge: "BUS WORKER",
      heading: "When Work No Longer Feels Fair",
      paragraphs: [
        "You are Ahmad bin Salleh, a Hock Lee bus driver. Your role is to follow this dispute from inside the workforce and notice how wages, discipline, union tension, and family responsibility shape each decision.",
        "Ahmad's working life depends on long shifts, steady pay, and the hope that management will treat drivers and conductors fairly. By 1955, that hope is wearing thin.",
        "Workers say union leave is denied, harsh treatment is common, and management favours a rival union. Dismissals hang over the depot like warnings to everyone still employed.",
        "You begin before the clashes peak, when Labour Front's election promises are still being tested and bus workers are asking whether anyone in power will listen before anger hardens into strike action.",
      ],
      continueLabel: "Start Ahmad's route",
    },
    "student-support-transition": {
      badge: "TURNING POINT",
      heading: "Students Come To The Depot",
      paragraphs: [
        "The workers are no longer standing alone.",
        "Students are coming to the depot with food, songs, and sheer presence to show that the dispute matters beyond the company gates.",
        "That support lifts morale, but it also makes the confrontation more public and harder for anyone to back away from quietly.",
        "Ahmad's next scene shows what that solidarity looks like when it reaches the depot itself.",
      ],
      continueLabel: "Continue",
    },
    "student-escalation-transition": {
      badge: "TURNING POINT",
      heading: "Tension Hardens",
      paragraphs: [
        "The depot is no longer only a place of protest. It has become a place of strain, spectators, and rising danger.",
        "More supporters, more police, and more frustration mean every delay now carries the risk of something worse.",
        "What the workers began as a fight over dismissals and treatment is moving toward a broader confrontation no one fully controls.",
        "Ahmad now enters the part of the story where escalation overtakes discipline.",
      ],
      continueLabel: "Continue",
    },
    "riot-transition": {
      badge: "PHASE SHIFT",
      heading: "Standing Together",
      paragraphs: [
        "You are now entering the strike phase of Ahmad's story.",
        "By late April 1955, 229 Hock Lee workers have been dismissed, and the dispute can no longer be contained in private complaints or union meetings.",
        "The next scenes take you to the depot gates and the tense talks around them, where workers, management, and the government all try to force the terms of the conflict.",
        "Pay attention to how a labour grievance changes once it becomes visible to the whole city.",
      ],
      continueLabel: "Enter the strike",
    },
    "post-riot-transition": {
      badge: "PHASE SHIFT",
      heading: "After The Price Was Paid",
      paragraphs: [
        "On 12 May, the labour dispute spills from the strike line into chaos on Alexandra Road.",
        "By the next morning, four people are dead and 31 injured. Workers who wanted justice now have to reckon with grief, shock, and competing stories about who is to blame.",
        "The next part of Ahmad's route moves through wards, rumours, and tense waiting, when the human cost of the riot becomes impossible to ignore.",
        "The street fighting has ended, but the struggle over what Hock Lee means is not finished.",
      ],
      continueLabel: "Face the aftermath",
    },
    "negotiation-outcome": {
      badge: "SETTLEMENT",
      heading: "What The Settlement Changed",
      paragraphs: [
        "On 14 May, negotiations finally produce the result the workers had demanded from the beginning.",
        "The dismissed men are reinstated, and the settlement brings the immediate Hock Lee dispute to an official close.",
        "But it is not a clean victory. Four people are dead, dozens are injured, and trust between workers, management, police, and the government has been badly damaged.",
        "As Ahmad returns home, the real question is no longer only whether the men were heard, but what the strike cost the people who had to live through it.",
      ],
      continueLabel: "Continue the story",
    },
    outro: {
      badge: "AFTERMATH",
      heading: "Home, But Not Finished",
      paragraphs: [
        "You have followed the riot as a worker, from depot grievance to street confrontation and homecoming.",
        "The strike forced attention onto real grievances, especially dismissals, conditions, and the right to be heard.",
        "Yet the road from depot gate to hospital ward shows how easily labour protest could be transformed into public violence.",
        "You leave with the hardest question still open: what counts as victory once the dead are counted too?",
      ],
      continueLabel: "Return to map",
    },
  },
  CS: {
    intro: {
      badge: "CHINESE STUDENT",
      heading: "When School No Longer Feels Separate",
      paragraphs: [
        "You are Ong Kim Chuan, a Chinese-middle-school student. Your role is to see how election politics, school life, and worker grievances slowly stop feeling like separate worlds.",
        "Kim Chuan is young, curious, and already living in a city shaped by arguments over Chinese education, colonial rule, and who gets heard in public life.",
        "At first, Hock Lee reaches him as talk: speeches at City Hall, debate in class, market complaints, and family conversations that make labour politics feel close to home.",
        "You begin before he fully understands what students will be asked to do, or how support for workers might change the way he sees school, authority, and himself.",
      ],
      continueLabel: "Go to City Hall",
    },
    "student-support-transition": {
      badge: "TURNING POINT",
      heading: "Why The Students Go",
      paragraphs: [
        "The students are not going to the depot as spectators.",
        "They go to support the bus workers with food, songs, banners, and their presence, so the strike cannot be dismissed as a private quarrel behind closed gates.",
        "For Kim Chuan, this is the moment when sympathy turns into action and worker struggle becomes something students choose to stand beside.",
        "The next scene takes him to the depot, where that solidarity becomes visible.",
      ],
      continueLabel: "Go to the depot",
    },
    "student-escalation-transition": {
      badge: "TURNING POINT",
      heading: "How Things Escalated",
      paragraphs: [
        "At the depot, solidarity has made the strike larger, louder, and harder to contain.",
        "More workers, more students, more police pressure, and unresolved anger mean the dispute is no longer holding still.",
        "What began as support at the gates is now sliding toward open confrontation as tension spills beyond the depot itself.",
        "Kim Chuan is about to see how quickly a charged crowd can become a riot.",
      ],
      continueLabel: "See what happened next",
    },
    "riot-transition": {
      badge: "PHASE SHIFT",
      heading: "From Questions To Action",
      paragraphs: [
        "You are now entering the part of Kim Chuan's route where student curiosity turns into organised action.",
        "The dispute no longer feels distant. Students are talking about whether workers should be supported openly and what their own role in that support ought to be.",
        "The next scenes follow how songs, food, numbers, and conviction can make solidarity feel inspiring and risky at the same time.",
        "What begins as a student decision to help will reshape how Kim Chuan understands courage, crowds, and consequences.",
      ],
      continueLabel: "Join the students",
    },
    "post-riot-transition": {
      badge: "PHASE SHIFT",
      heading: "After The Shock",
      paragraphs: [
        "On Alexandra Road, the line between protest and riot collapses in minutes.",
        "Among the dead is 16-year-old student Chong Lon Chong, a fact that reshapes how young people remember Hock Lee.",
        "Funerals, school discipline, and family fear now compete to explain what student participation meant.",
        "The city will keep debating the riot, but you now carry it as memory rather than theory.",
      ],
      continueLabel: "Enter the aftermath",
    },
    "negotiation-outcome": {
      badge: "SETTLEMENT",
      heading: "An Outcome Students Still Feel",
      paragraphs: [
        "You are not inside the negotiation hall, but the result reaches students quickly.",
        "On 14 May, a settlement reinstates the dismissed Hock Lee workers and ends the immediate strike.",
        "Even so, the deaths and injuries have already changed how adults, schools, and the authorities talk about student solidarity.",
        "What follows is an aftermath in which Hock Lee survives less as a meeting result than as a memory that keeps shaping school life.",
      ],
      continueLabel: "Continue the story",
    },
    outro: {
      badge: "AFTERMATH",
      heading: "Changed By What Happened",
      paragraphs: [
        "You have seen Hock Lee as a student drawn from City Hall debate into public action.",
        "What began with election discussion and support for workers became an encounter with state force, injury, and grief.",
        "The experience also helps explain why student politics kept worrying the authorities in the years that followed.",
        "You leave not innocent, but historically alert to how quickly solidarity can become danger.",
      ],
      continueLabel: "Return to map",
    },
  },
};

export const getRoleSteps = (role: CharacterCode) => ROLE_STORY_STEPS[role];

export const getStoryPhaseTrack = (
  role: CharacterCode
): StoryPhaseTrackSegment[] =>
  STORY_PHASE_ORDER.map((phase) => ({
    label: phase,
    span: getRoleSteps(role).filter((step) => step.phase === phase).length,
    color: STORY_PHASE_COLORS[phase],
  }));

export const getStoryStepByRoute = (
  role: CharacterCode,
  route: string
) => getRoleSteps(role).find((step) => step.route === route) ?? null;

export const getStoryStepByNodeKey = (
  role: CharacterCode,
  nodeKey: MapNodeKey
) => getRoleSteps(role).find((step) => step.nodeKey === nodeKey) ?? null;

export const getStoryStepIndexByRoute = (role: CharacterCode, route: string) =>
  getRoleSteps(role).findIndex((step) => step.route === route);

export const getLatestStoryStepForNode = (
  role: CharacterCode,
  nodeKey: MapNodeKey,
  maxIndex: number
) => {
  const eligibleSteps = getRoleSteps(role).filter(
    (step, index) => step.nodeKey === nodeKey && index <= maxIndex
  );
  return eligibleSteps[eligibleSteps.length - 1] ?? null;
};

export const getExitRouteForStepIndex = (
  role: CharacterCode,
  stepIndex: number
) => {
  const steps = getRoleSteps(role);
  const getLastIndexForPhase = (phase: StoryPhase) => {
    for (let index = steps.length - 1; index >= 0; index -= 1) {
      if (steps[index]?.phase === phase) {
        return index;
      }
    }
    return -1;
  };

  if (stepIndex < 0 || stepIndex >= steps.length) {
    return HOCK_LEE_MAP_ROUTE;
  }

  if (stepIndex === getLastIndexForPhase("Pre-Riot")) {
    return RIOT_CUTSCENE_ROUTE;
  }
  if (stepIndex === getLastIndexForPhase("Riot")) {
    return POST_RIOT_CUTSCENE_ROUTE;
  }
  if (steps[stepIndex]?.route === NEGOTIATION_ROUTE) {
    return NEGOTIATION_OUTCOME_CUTSCENE_ROUTE;
  }
  if (stepIndex === steps.length - 1) return OUTRO_CUTSCENE_ROUTE;
  return HOCK_LEE_MAP_ROUTE;
};

export const getNextRouteForCutscene = (
  role: CharacterCode,
  cutsceneKind: StoryCutsceneKind
) => {
  if (cutsceneKind === "intro") {
    return getRoleSteps(role)[0]?.route ?? HOCK_LEE_MAP_ROUTE;
  }
  if (cutsceneKind === "student-support-transition") {
    return role === "CS" ? BUS_DEPOT_ROUTE : HOCK_LEE_MAP_ROUTE;
  }
  if (cutsceneKind === "student-escalation-transition") {
    return role === "CS" ? ALEXANDRA_ROAD_ROUTE : HOCK_LEE_MAP_ROUTE;
  }
  if (cutsceneKind === "negotiation-outcome") {
    return HOCK_LEE_MAP_ROUTE;
  }
  return HOCK_LEE_MAP_ROUTE;
};

export const getCutsceneKindForRoute = (
  route: string
): StoryCutsceneKind | null => {
  if (route === INTRO_CUTSCENE_ROUTE) return "intro";
  if (route === STUDENT_SUPPORT_CUTSCENE_ROUTE) return "student-support-transition";
  if (route === STUDENT_ESCALATION_CUTSCENE_ROUTE) {
    return "student-escalation-transition";
  }
  if (route === RIOT_CUTSCENE_ROUTE) return "riot-transition";
  if (route === POST_RIOT_CUTSCENE_ROUTE) return "post-riot-transition";
  if (route === NEGOTIATION_OUTCOME_CUTSCENE_ROUTE) return "negotiation-outcome";
  if (route === OUTRO_CUTSCENE_ROUTE) return "outro";
  return null;
};

export const resolveCharacterCode = (
  value: string | null | undefined
): CharacterCode => {
  if (value === "CIV" || value === "BW" || value === "CS") {
    return value;
  }
  return DEFAULT_CHARACTER_CODE;
};

export const buildRoleAwareRoute = (route: string, role: CharacterCode) => {
  const separator = route.includes("?") ? "&" : "?";
  return `${route}${separator}role=${role}`;
};

export const stripRouteQuery = (route: string) => route.split("?")[0];
