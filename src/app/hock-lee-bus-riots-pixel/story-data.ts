import type { CharacterSpriteSet } from "./character-sprites";
import type { CharacterCode } from "./scenes";
import {
  ALEXANDRA_ROAD_ROUTE,
  BUS_DEPOT_ROUTE,
  CITY_HALL_ROUTE,
  CLASSROOM_ROUTE,
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
  OUTRO_CUTSCENE_ROUTE,
  POST_RIOT_CUTSCENE_ROUTE,
  RIOT_CUTSCENE_ROUTE,
  SCHOOL_GATES_ROUTE,
  SCHOOL_LAKE_ROUTE,
} from "./story-paths";

export const DEFAULT_CHARACTER_CODE: CharacterCode = "BW";
export const SELECTED_CHARACTER_STORAGE_KEY = "hockLeeSelectedCharacter";

export type StoryPhase = "Pre-Riot" | "Riot" | "Post-Riot";
export type StoryCutsceneKind =
  | "intro"
  | "riot-transition"
  | "post-riot-transition"
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
  characterSpriteBasePath?: string;
  characterSprites?: CharacterSpriteSet;
};

export type CutsceneContent = {
  badge: string;
  heading: string;
  paragraphs: [string, string, string, string];
  continueLabel: string;
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

export const CHARACTER_PRESENTATIONS: Record<CharacterCode, CharacterPresentation> = {
  CIV: {
    code: "CIV",
    playerName: "Rajiv",
    playerFullName: "Rajiv Menon",
    playerAlt: "Rajiv Menon",
    markerSprite: "/character-figures/rajivmenon/south.png",
    cutsceneSprite: "/character-figures/rajivmenon/south.png",
    characterSpriteBasePath: "/character-figures/rajivmenon",
  },
  BW: {
    code: "BW",
    playerName: "Bus Worker",
    playerFullName: "Bus Worker",
    playerAlt: "Bus worker",
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
    playerName: "Chinese Student",
    playerFullName: "Chinese Student",
    playerAlt: "Chinese student activist",
    markerSprite: "/npcfigures/riotfigures/Student Union/Student-Riot_South.webp",
    cutsceneSprite: "/npcfigures/riotfigures/Student Union/Student-Riot_South.webp",
    characterSprites: {
      idle: {
        north: "/npcfigures/riotfigures/Student Union/Student-Riot_North.webp",
        south: "/npcfigures/riotfigures/Student Union/Student-Riot_South.webp",
        east: "/npcfigures/riotfigures/Student Union/Student-Riot_East.webp",
        west: "/npcfigures/riotfigures/Student Union/Student-Riot_West.webp",
      },
    },
  },
};

export const MAP_NODE_DEFINITIONS: Record<MapNodeKey, MapNodeDefinition> = {
  "city-hall": {
    key: "city-hall",
    label: "City Hall",
    description: "Formal power, briefings, and decisions that shape the dispute.",
    position: { left: "43%", top: "65%" },
    image: {
      src: "/map-nodes/cityhall.png",
      alt: "City Hall",
      className: "hl-pixel-map-node--cityhall",
    },
  },
  market: {
    key: "market",
    label: "Market",
    description: "Daily life exposes prices, hardship, and street opinion.",
    position: { left: "52%", top: "45%" },
    image: {
      src: "/map-nodes/market.png",
      alt: "Market",
      className: "hl-pixel-map-node--market",
    },
  },
  home: {
    key: "home",
    label: "Home",
    description: "Private space where public unrest becomes personal.",
    position: { left: "52%", top: "30%" },
    image: {
      src: "/map-nodes/home.png",
      alt: "Home",
      className: "hl-pixel-map-node--home",
    },
  },
  "bus-depot": {
    key: "bus-depot",
    label: "Bus Depot",
    description: "The strike line hardens and the crowd becomes a force.",
    position: { left: "28%", top: "54%" },
    image: {
      src: "/map-nodes/busdepot.png",
      alt: "Bus Depot",
      className: "hl-pixel-map-node--busdepot",
    },
  },
  "government-office": {
    key: "government-office",
    label: "Government Office",
    description: "Negotiation, delay, and official uncertainty meet in one room.",
    position: { left: "40%", top: "50%" },
    image: {
      src: "/map-nodes/governmentoffice.png",
      alt: "Government Office",
      className: "hl-pixel-map-node--governmentoffice",
    },
  },
  "command-center": {
    key: "command-center",
    label: "Command Center",
    description: "Phones, reports, and orders fail to contain the crisis.",
    position: { left: "33%", top: "58%" },
    image: {
      src: "/map-nodes/commandcentre.png",
      alt: "Command Center",
      className: "hl-pixel-map-node--commandcentre",
    },
  },
  "alexandra-road": {
    key: "alexandra-road",
    label: "Alexandra Road",
    description: "The confrontation turns from protest into chaos.",
    position: { left: "23%", top: "58%" },
    image: {
      src: "/map-nodes/alexandraroad.png",
      alt: "Alexandra Road",
      className: "hl-pixel-map-node--alexandraroad",
    },
  },
  hospital: {
    key: "hospital",
    label: "Hospital",
    description: "The wounded make the cost of escalation impossible to ignore.",
    position: { left: "46%", top: "35%" },
    image: {
      src: "/map-nodes/hospital.png",
      alt: "Hospital",
      className: "hl-pixel-map-node--hospital",
    },
  },
  "negotiation-hall": {
    key: "negotiation-hall",
    label: "Negotiation Hall",
    description: "Leaders regroup to define what the struggle achieved.",
    position: { left: "46%", top: "48%" },
    image: {
      src: "/map-nodes/negotiationhall.png",
      alt: "Negotiation Hall",
      className: "hl-pixel-map-node--negotiationhall",
    },
  },
  funeral: {
    key: "funeral",
    label: "Funeral",
    description: "Mourning transforms grief into political meaning.",
    position: { left: "32%", top: "34%" },
    image: {
      src: "/map-nodes/funeral.png",
      alt: "Funeral",
      className: "hl-pixel-map-node--funeral",
    },
  },
  airport: {
    key: "airport",
    label: "Airport",
    description: "A departure point that turns the riots into a larger political transition.",
    position: { left: "52%", top: "62%" },
    image: {
      src: "/map-nodes/kallangairport.png",
      alt: "Kallang Airport",
      className: "hl-pixel-map-node--kallang",
    },
  },
  classroom: {
    key: "classroom",
    label: "Classroom",
    description: "Political awakening begins in the language of school and debate.",
    position: { left: "10.6%", top: "46.4%" },
    image: {
      src: "/map-nodes/schoolbuilding.png",
      alt: "Classroom",
      className: "hl-pixel-map-node--schoolbuilding",
    },
  },
  "school-lake": {
    key: "school-lake",
    label: "School Lake",
    description: "Student networks gather momentum in semi-secret spaces.",
    position: { left: "13%", top: "56.7%" },
    image: {
      src: "/map-nodes/schoollake.png",
      alt: "School Lake",
      className: "hl-pixel-map-node--schoollake",
    },
  },
  "school-gates": {
    key: "school-gates",
    label: "School Gates",
    description: "The school reopens under suspicion, pressure, and fear.",
    position: { left: "18%", top: "43.1%" },
    image: {
      src: "/map-nodes/schoolgate.png",
      alt: "School Gates",
      className: "hl-pixel-map-node--schoolgate",
    },
  },
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
      timelineLabel: "First Briefing",
      sceneTitle: "Pre-Riot: City Hall Briefing",
      sceneSubtitle:
        "Rajiv begins inside a newly elected government that still believes the Hock Lee dispute can be managed through meetings, memos, and calm administration. The victory mood has barely faded, but the pressure to act is already building.",
      summary: "The story opens with confidence, responsibility, and a crisis that still looks containable.",
    },
    {
      id: "civ-market",
      role: "CIV",
      phase: "Pre-Riot",
      route: MARKET_ROUTE,
      nodeKey: "market",
      locationLabel: "Market",
      timelineLabel: "Street Pressure",
      sceneTitle: "Pre-Riot: Market Conversations",
      sceneSubtitle:
        "Away from official files, Rajiv hears workers and stallholders complain about fares, wages, and rising prices. What sounded manageable in City Hall now feels closer, louder, and harder to dismiss.",
      summary: "Public frustration gives the dispute a human face.",
    },
    {
      id: "civ-home",
      role: "CIV",
      phase: "Pre-Riot",
      route: HOME_CIVIL_SERVANT_ROUTE,
      nodeKey: "home",
      locationLabel: "Home",
      timelineLabel: "Worry at Home",
      sceneTitle: "Pre-Riot: Unrest at Home",
      sceneSubtitle:
        "Radio bulletins and family concern follow Rajiv home, turning a public dispute into a private unease he cannot file away. For the first time, he suspects this conflict may outrun routine governance.",
      summary: "By nightfall, the crisis no longer feels distant or professional.",
    },
    {
      id: "civ-bus-depot",
      role: "CIV",
      phase: "Riot",
      route: BUS_DEPOT_ROUTE,
      nodeKey: "bus-depot",
      locationLabel: "Bus Depot",
      timelineLabel: "Strike Line",
      sceneTitle: "Riot: Bus Depot Standoff",
      sceneSubtitle:
        "At the depot, workers, students, and police converge in the same charged space. Rajiv sees the dispute leave the realm of paperwork and become a public confrontation that may break at any moment.",
      summary: "The crisis steps into the street and can no longer be managed from a distance.",
    },
    {
      id: "civ-government-office",
      role: "CIV",
      phase: "Riot",
      route: GOVERNMENT_OFFICE_ROUTE,
      nodeKey: "government-office",
      locationLabel: "Government Office",
      timelineLabel: "Crisis Meeting",
      sceneTitle: "Riot: Government Crisis Meeting",
      sceneSubtitle:
        "Back inside government, every option now feels risky: negotiate too slowly and anger grows; act too forcefully and the city may ignite. Rajiv watches procedure struggle to keep pace with events outside.",
      summary: "Procedure slows down just as events begin to accelerate.",
    },
    {
      id: "civ-command-center",
      role: "CIV",
      phase: "Riot",
      route: COMMAND_CENTER_ROUTE,
      nodeKey: "command-center",
      locationLabel: "Command Center",
      timelineLabel: "Damage Control",
      sceneTitle: "Riot: Command Center",
      sceneSubtitle:
        "Phones ring with contradictory reports of movement, injuries, and blame. Rajiv is no longer trying to steer the situation so much as contain the fallout before it spreads further.",
      summary: "Government shifts from planning the response to triaging the damage.",
    },
    {
      id: "civ-funeral",
      role: "CIV",
      phase: "Post-Riot",
      route: FUNERAL_ROUTE,
      nodeKey: "funeral",
      locationLabel: "Funeral",
      timelineLabel: "Public Mourning",
      sceneTitle: "Post-Riot: Funeral Procession",
      sceneSubtitle:
        "In the mourning crowd, grief and anger are impossible to separate. Rajiv is forced to face the human cost of decisions once discussed as matters of order, timing, and control.",
      summary: "The aftermath turns administrative failure into public grief.",
    },
    {
      id: "civ-negotiation",
      role: "CIV",
      phase: "Post-Riot",
      route: NEGOTIATION_ROUTE,
      nodeKey: "negotiation-hall",
      locationLabel: "Negotiation Hall",
      timelineLabel: "Fragile Settlement",
      sceneTitle: "Post-Riot: Return to Negotiation",
      sceneSubtitle:
        "Officials and labour representatives return to the table because the city cannot survive another rupture. Rajiv helps rebuild order through negotiation, even while knowing that trust in the system has been damaged.",
      summary: "Recovery begins, but confidence in authority does not fully return.",
    },
    {
      id: "civ-airport",
      role: "CIV",
      phase: "Post-Riot",
      route: KALLANG_AIRPORT_ROUTE,
      nodeKey: "airport",
      locationLabel: "Airport",
      timelineLabel: "Uncertain Future",
      sceneTitle: "Post-Riot: Airport Departure",
      sceneSubtitle:
        "At the airport, Rajiv sees the riots receding into the larger political transition already underway. The immediate crisis is ending, but the deeper questions it raised about power, legitimacy, and change remain unresolved.",
      summary: "The route closes with movement forward, but not with certainty.",
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
      sceneTitle: "Pre-Riot: City Hall",
      sceneSubtitle:
        "Waiting outside City Hall, the bus worker overhears officials discussing labour unrest as if it were an administrative inconvenience. Fatigue turns into resentment as he realizes decisions about his life are made without him.",
      summary: "Power is visible here, but workers remain outside it.",
    },
    {
      id: "bw-market",
      role: "BW",
      phase: "Pre-Riot",
      route: MARKET_ROUTE,
      nodeKey: "market",
      locationLabel: "Market",
      sceneTitle: "Pre-Riot: Market",
      sceneSubtitle:
        "Buying food becomes a lesson in inflation and frustration as workers talk wages, rent, and union rumours. Shared grievance settles in: everyone is struggling, and everyone knows why.",
      summary: "Economic pressure gives private frustration a collective voice.",
    },
    {
      id: "bw-home",
      role: "BW",
      phase: "Pre-Riot",
      route: HOME_BUS_WORKER_ROUTE,
      nodeKey: "home",
      locationLabel: "Home",
      sceneTitle: "Pre-Riot: Home",
      sceneSubtitle:
        "At home, the strike becomes an argument about income, risk, and dignity. Family fear collides with determination, and the worker decides that without action nothing will change.",
      summary: "Solidarity starts with what a household can no longer endure.",
    },
    {
      id: "bw-bus-depot",
      role: "BW",
      phase: "Riot",
      route: BUS_DEPOT_ROUTE,
      nodeKey: "bus-depot",
      locationLabel: "Bus Depot",
      sceneTitle: "Riot: Bus Depot",
      sceneSubtitle:
        "The worker joins the picket line among chanting colleagues, police watchfulness, and arriving students. Fear remains, but collective action makes empowerment feel real for the first time.",
      summary: "The depot turns grievance into visible solidarity.",
    },
    {
      id: "bw-government-office",
      role: "BW",
      phase: "Riot",
      route: GOVERNMENT_OFFICE_ROUTE,
      nodeKey: "government-office",
      locationLabel: "Government Office",
      sceneTitle: "Riot: Government Office",
      sceneSubtitle:
        "Outside the negotiation building, rumours spread that talks are failing and the crowd's patience wears thin. Hope curdles into betrayal as workers feel the system still is not listening.",
      summary: "Negotiation feels distant when nothing changes on the ground.",
    },
    {
      id: "bw-alexandra-road",
      role: "BW",
      phase: "Riot",
      route: ALEXANDRA_ROAD_ROUTE,
      nodeKey: "alexandra-road",
      locationLabel: "Alexandra Road",
      sceneTitle: "Riot: Alexandra Road",
      sceneSubtitle:
        "What began as protest turns into stones, panic, and survival. In the chaos, the worker helps where he can, gets hurt, and understands that this is no longer a controlled labour action.",
      summary: "Solidarity survives, but the street now demands endurance more than slogans.",
    },
    {
      id: "bw-hospital",
      role: "BW",
      phase: "Post-Riot",
      route: KK_HOSPITAL_ROUTE,
      nodeKey: "hospital",
      locationLabel: "Hospital",
      sceneTitle: "Post-Riot: Hospital",
      sceneSubtitle:
        "Among bandages, overcrowded wards, and rumours of the dead, the worker confronts the cost of the struggle directly. Shock gives way to exhaustion as survival becomes the only certain victory.",
      summary: "The movement's price is written on bodies before it is written in history.",
    },
    {
      id: "bw-negotiation",
      role: "BW",
      phase: "Post-Riot",
      route: NEGOTIATION_ROUTE,
      nodeKey: "negotiation-hall",
      locationLabel: "Negotiation Hall",
      sceneTitle: "Post-Riot: Negotiation Hall",
      sceneSubtitle:
        "Union leaders speak of next steps while workers argue over whether anything has been won at all. Hope returns in fragments, but the outcome remains morally and politically unresolved.",
      summary: "Victory and defeat become difficult to separate.",
    },
    {
      id: "bw-home-return",
      role: "BW",
      phase: "Post-Riot",
      route: HOME_BUS_WORKER_RETURN_ROUTE,
      nodeKey: "home",
      locationLabel: "Home (Return)",
      sceneTitle: "Post-Riot: Home",
      sceneSubtitle:
        "Back home at last, the room is quiet and the family is relieved, but the future is still uncertain. The worker has survived, yet dignity remains unsettled rather than restored.",
      summary: "Survival closes the day, not the conflict.",
    },
  ],
  CS: [
    {
      id: "cs-classroom",
      role: "CS",
      phase: "Pre-Riot",
      route: CLASSROOM_ROUTE,
      nodeKey: "classroom",
      locationLabel: "Classroom",
      sceneTitle: "Pre-Riot: Classroom",
      sceneSubtitle:
        "A lesson on society and politics suddenly feels urgent as whispers about the strike circulate through the room. Boredom gives way to ideological curiosity: the world outside school now matters.",
      summary: "Awakening begins in conversation before it reaches the street.",
    },
    {
      id: "cs-market",
      role: "CS",
      phase: "Pre-Riot",
      route: MARKET_ROUTE,
      nodeKey: "market",
      locationLabel: "Market",
      sceneTitle: "Pre-Riot: Market",
      sceneSubtitle:
        "In the market, the student sees workers argue, hears stories of rising prices, and feels injustice become concrete. Observation becomes empathy as hardship stops being abstract.",
      summary: "Political feeling forms through ordinary scenes of struggle.",
    },
    {
      id: "cs-home",
      role: "CS",
      phase: "Pre-Riot",
      route: HOME_STUDENT_ROUTE,
      nodeKey: "home",
      locationLabel: "Home",
      sceneTitle: "Pre-Riot: Home",
      sceneSubtitle:
        "Parents warn against involvement, hoping school will remain separate from the unrest outside. Restriction hardens into defiance as the student feels the need to choose a path independently.",
      summary: "Generational caution collides with political self-definition.",
    },
    {
      id: "cs-school-lake",
      role: "CS",
      phase: "Riot",
      route: SCHOOL_LAKE_ROUTE,
      nodeKey: "school-lake",
      locationLabel: "School Lake",
      sceneTitle: "Riot: School Lake",
      sceneSubtitle:
        "Students gather quietly near the school grounds to plan support for the strike. Nervousness turns into collective excitement as the student feels history becoming participatory.",
      summary: "Radicalisation starts with peers deciding to act together.",
    },
    {
      id: "cs-bus-depot",
      role: "CS",
      phase: "Riot",
      route: BUS_DEPOT_ROUTE,
      nodeKey: "bus-depot",
      locationLabel: "Bus Depot",
      sceneTitle: "Riot: Bus Depot",
      sceneSubtitle:
        "At the depot, chanting with workers makes the student feel part of a larger movement, even as police presence introduces fear. The struggle is suddenly bigger than school life.",
      summary: "Solidarity offers purpose, but also danger.",
    },
    {
      id: "cs-alexandra-road",
      role: "CS",
      phase: "Riot",
      route: ALEXANDRA_ROAD_ROUTE,
      nodeKey: "alexandra-road",
      locationLabel: "Alexandra Road",
      sceneTitle: "Riot: Alexandra Road",
      sceneSubtitle:
        "Violence erupts, the crowd scatters, and the student sees injury and arrest up close. Adrenaline collapses into trauma as political conviction meets real danger.",
      summary: "The street teaches consequences more harshly than ideology does.",
    },
    {
      id: "cs-funeral",
      role: "CS",
      phase: "Post-Riot",
      route: FUNERAL_ROUTE,
      nodeKey: "funeral",
      locationLabel: "Funeral",
      sceneTitle: "Post-Riot: Funeral",
      sceneSubtitle:
        "At the funeral procession, speeches and mourning transform loss into political meaning. Grief becomes politicisation as the student begins to believe sacrifice must count for something.",
      summary: "Memory becomes part of movement-building.",
    },
    {
      id: "cs-school-gates",
      role: "CS",
      phase: "Post-Riot",
      route: SCHOOL_GATES_ROUTE,
      nodeKey: "school-gates",
      locationLabel: "School Gates",
      sceneTitle: "Post-Riot: School Gates",
      sceneSubtitle:
        "Police presence and institutional tension now greet students at the entrance. Academic routine feels permanently altered, and the student's life path no longer seems separate from politics.",
      summary: "After the riots, identity itself has shifted.",
    },
    {
      id: "cs-home-return",
      role: "CS",
      phase: "Post-Riot",
      route: HOME_STUDENT_RETURN_ROUTE,
      nodeKey: "home",
      locationLabel: "Home",
      sceneTitle: "Post-Riot: Home",
      sceneSubtitle:
        "Newspaper headlines and worried parents frame the final return home. Silence gives way to reflection as the student realizes innocence is gone and a political self has taken shape.",
      summary: "The route ends with a new identity rather than resolution.",
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
      heading: "Maintaining order before the streets turn",
      paragraphs: [
        "Singapore's political climate is tightening. Labour unrest, student mobilization, and anti-colonial pressure all sit inside the files Rajiv is asked to read as routine governance.",
        "From inside the administration, every problem arrives as a report, a briefing, or a request for restraint. The work seems manageable as long as conflict can be translated into procedure.",
        "But public authority is already fraying. The transport dispute is not simply about buses; it is about wages, legitimacy, and who gets to define order in a changing colony.",
        "Your route begins with watchfulness. Track how confidence in governance shifts into uncertainty once events start outrunning the people meant to contain them.",
      ],
      continueLabel: "Enter the briefing",
    },
    "riot-transition": {
      badge: "PHASE SHIFT",
      heading: "From monitoring unrest to losing control",
      paragraphs: [
        "The administrative distance of the pre-riot phase is over. Reports, rumours, and public anger are now converging around the strike itself.",
        "Rajiv has seen enough to know that policy affects real lives, but that knowledge does not make coordination easier. The machinery of government is being asked to move faster than it knows how.",
        "At the depot and beyond, students, workers, police, and officials will now interpret every action as a signal. Misjudgment can harden the entire city at once.",
        "Enter the riot phase expecting ambiguity, pressure, and decisions made without the comfort of complete information.",
      ],
      continueLabel: "Face the crisis",
    },
    "post-riot-transition": {
      badge: "PHASE SHIFT",
      heading: "From crisis management to consequence",
      paragraphs: [
        "The street battle is ending, but control has not been restored in any simple sense. Death, mourning, and accusation now shape what the administration must answer for.",
        "Rajiv has watched procedure fail under speed and force. The next task is no longer only to coordinate movement, but to confront how authority will explain itself afterward.",
        "Funerals, negotiations, and international attention will define the meaning of the riots as much as the violence itself did. Administration now becomes narrative as well as policy.",
        "The post-riot phase asks what order is worth when it leaves grief behind it, and who gets to decide what the crisis meant.",
      ],
      continueLabel: "Enter the aftermath",
    },
    outro: {
      badge: "AFTERMATH",
      heading: "Reconstructing meaning",
      paragraphs: [
        "Rajiv's route ends where governance and memory overlap. The riots can no longer be reduced to briefings, because they have already been lived, suffered, and interpreted in public.",
        "Order survived, but not untouched. The administration kept moving, yet every later decision now carries the memory of what official control cost.",
        "Political transition continues beyond the airport and beyond this crisis. The institutions Rajiv serves will go on, but their legitimacy has been changed by what they failed to prevent.",
        "This story closes with uncertainty intact: governance has endured, but the meaning of governance itself has become more fragile and more contested.",
      ],
      continueLabel: "Return to map",
    },
  },
  BW: {
    intro: {
      badge: "BUS WORKER",
      heading: "Survival before solidarity becomes public",
      paragraphs: [
        "For the bus worker, the Hock Lee dispute begins before the strike line forms. It starts in wages that do not stretch, prices that keep rising, and hours that wear the body down.",
        "Official discussions happen elsewhere, in rooms workers do not enter. What reaches home instead is exhaustion, rumour, and the knowledge that management can wait longer than a family budget can.",
        "The question is no longer whether conditions are fair. The question is whether staying quiet protects anyone at all.",
        "Your route follows a labour struggle from private strain into collective action, and then into the damage that action must absorb.",
      ],
      continueLabel: "Start the shift",
    },
    "riot-transition": {
      badge: "PHASE SHIFT",
      heading: "From grievance to confrontation",
      paragraphs: [
        "The argument at home and in the market now becomes visible at the depot. Workers who felt cornered separately begin to act together in public.",
        "Solidarity offers courage, but it also draws in police, officials, students, and political actors with their own agendas. The strike stops belonging only to the workers who began it.",
        "Every chant and every delay changes what the crowd believes is possible. Hope rises quickly, and so does the chance that control will disappear.",
        "The riot phase begins with empowerment, but it will test how much survival a movement can demand from the people inside it.",
      ],
      continueLabel: "Join the line",
    },
    "post-riot-transition": {
      badge: "PHASE SHIFT",
      heading: "From solidarity to cost",
      paragraphs: [
        "The street has exacted its price. Whatever the movement hoped to win, it now must carry injuries, rumours of death, and exhausted families back into the story.",
        "For workers, the aftermath is not abstract. It is measured in bandages, fear, and uncertainty about whether sacrifice produced change or only more suffering.",
        "Leaders will keep negotiating, but the worker's question is harsher: was this worth what people had to absorb to stay visible?",
        "The post-riot phase is about survival with no guarantee of closure, and dignity without the comfort of a clear victory.",
      ],
      continueLabel: "Carry the cost",
    },
    outro: {
      badge: "AFTERMATH",
      heading: "Survival without closure",
      paragraphs: [
        "The bus worker survives the route, but survival is not the same as peace. The struggle achieved visibility, solidarity, and pressure, yet it also left wounds that cannot be negotiated away.",
        "What changed remains ambiguous. Workers forced the city to reckon with their conditions, but they also learned how quickly a labour action can become a broader political contest beyond their control.",
        "Home returns at the end of the story, but not as the same place it was before. Relief exists beside unresolved anger, pride, and uncertainty about what the future will demand next.",
        "This ending holds onto tragic labour realism: dignity persists, but it does so without the clean comfort of victory.",
      ],
      continueLabel: "Return to map",
    },
  },
  CS: {
    intro: {
      badge: "CHINESE STUDENT",
      heading: "Awakening before the street claims you",
      paragraphs: [
        "For the student, the Hock Lee story begins in school, conversation, and curiosity. Politics first appears as something whispered, argued over, and half-understood between lessons.",
        "The market and the home then sharpen that curiosity into conviction. Injustice stops being an idea once hardship is visible and parental caution starts to feel like constraint.",
        "Student support for labour unrest is not an accidental side story. It is one of the ways anti-colonial feeling moves from classrooms into the city itself.",
        "Your route is a political coming-of-age: follow how observation becomes commitment, and how commitment is changed once violence enters the lesson.",
      ],
      continueLabel: "Enter the classroom",
    },
    "riot-transition": {
      badge: "PHASE SHIFT",
      heading: "From curiosity to mobilisation",
      paragraphs: [
        "The pre-riot phase has done its work: the student has seen hardship, argued at home, and decided that neutrality is no longer convincing.",
        "Now political energy moves into secret gatherings and public support. The strike becomes a stage on which students can imagine themselves as historical actors rather than spectators.",
        "That excitement is real, but so is the danger. Once the student steps into the movement, fear and consequence begin travelling alongside conviction.",
        "The riot phase will test not whether the student cares, but what caring costs when the city starts to fracture in public.",
      ],
      continueLabel: "Join the students",
    },
    "post-riot-transition": {
      badge: "PHASE SHIFT",
      heading: "From trauma to political identity",
      paragraphs: [
        "After Alexandra Road, the student's education changes permanently. Violence has ended the fantasy that history can be entered without risk.",
        "What comes next is not innocence regained, but the struggle over meaning: funerals, school discipline, and family anxiety all compete to explain what the riots should signify.",
        "For some, the lesson is caution. For the student, grief and fear now mingle with a deeper sense that identity itself has been politicised.",
        "The post-riot phase traces how trauma becomes memory, and how memory becomes part of who this young person will be from now on.",
      ],
      continueLabel: "Face the aftermath",
    },
    outro: {
      badge: "AFTERMATH",
      heading: "No longer innocent",
      paragraphs: [
        "The student ends this route changed more than settled. The riots have turned politics from a topic into a lived condition that shapes school, family, and self-understanding.",
        "What began as curiosity became solidarity, then fear, then a new form of identity. The cost of awakening is that innocence cannot return once history has entered daily life this directly.",
        "Home still exists, but it no longer contains the student the way it once did. Newspapers, school gates, and parental worry now all point to a future that feels politically charged.",
        "This ending is not closure. It is formation: a political self has emerged, and it will carry the memory of these events into whatever comes next.",
      ],
      continueLabel: "Return to map",
    },
  },
};

export const STORY_PHASE_TRACK = [
  { label: "Pre-Riot", span: 3, color: "rgb(255, 193, 94)" },
  { label: "Riot", span: 3, color: "rgb(210, 92, 92)" },
  { label: "Post-Riot", span: 3, color: "rgb(130, 160, 185)" },
] as const;

export const getRoleSteps = (role: CharacterCode) => ROLE_STORY_STEPS[role];

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
  if (stepIndex < 0 || stepIndex >= steps.length) {
    return HOCK_LEE_MAP_ROUTE;
  }
  if (stepIndex === 2) return RIOT_CUTSCENE_ROUTE;
  if (stepIndex === 5) return POST_RIOT_CUTSCENE_ROUTE;
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
  return HOCK_LEE_MAP_ROUTE;
};

export const getCutsceneKindForRoute = (
  route: string
): StoryCutsceneKind | null => {
  if (route === INTRO_CUTSCENE_ROUTE) return "intro";
  if (route === RIOT_CUTSCENE_ROUTE) return "riot-transition";
  if (route === POST_RIOT_CUTSCENE_ROUTE) return "post-riot-transition";
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
