export type CharacterCode = "CIV" | "BW" | "CS";

export type HockLeeScene = {
  phase: "Pre-Riot" | "Riot" | "Post-Riot";
  sceneNumber: number;
  route: string;
  locationEvent: string;
  description: string;
  characters: CharacterCode[];
  npc?: string;
  notes?: string;
};

export const CHARACTER_LABELS: Record<CharacterCode, string> = {
  CIV: "Civil Servant",
  BW: "Bus Worker",
  CS: "Chinese Student",
};

export const HOCK_LEE_SCENES: HockLeeScene[] = [
  {
    phase: "Pre-Riot",
    sceneNumber: 1,
    route: "/hock-lee-bus-riots-pixel/pre-riot/scene-1-city-hall",
    locationEvent: "City Hall",
    description: "Political shift (LF Rendel win)",
    characters: ["CIV", "BW", "CS"],
  },
  {
    phase: "Pre-Riot",
    sceneNumber: 2,
    route: "/hock-lee-bus-riots-pixel/pre-riot/scene-2-market",
    locationEvent: "Market",
    description: "Cost of living struggles",
    characters: ["BW", "CS", "CIV"],
  },
  {
    phase: "Pre-Riot",
    sceneNumber: 3,
    route: "/hock-lee-bus-riots-pixel/pre-riot/scene-3-chinese-medium-school",
    locationEvent: "Chinese Medium School",
    description: "Bus worker father; discussion of pre-riot tensions",
    characters: ["CS"],
  },
  {
    phase: "Pre-Riot",
    sceneNumber: 4,
    route: "/hock-lee-bus-riots-pixel/pre-riot/scene-4-government-office",
    locationEvent: "Government Office",
    description:
      "Civil servant reports struggles to David Marshall (cost, poor reform)",
    characters: ["CIV"],
  },
  {
    phase: "Pre-Riot",
    sceneNumber: 5,
    route: "/hock-lee-bus-riots-pixel/pre-riot/scene-5-bus-depot",
    locationEvent: "Bus Depot",
    description: "Low pay, union issues, mistreatment",
    characters: ["BW"],
  },
  {
    phase: "Riot",
    sceneNumber: 6,
    route: "/hock-lee-bus-riots-pixel/riot/scene-6-bus-depot-strike-i",
    locationEvent: "Bus Depot - Strike I",
    description: "Peaceful strike",
    characters: ["BW", "CIV", "CS"],
    npc: "Bus Boss",
  },
  {
    phase: "Riot",
    sceneNumber: 7,
    route: "/hock-lee-bus-riots-pixel/riot/scene-7-negotiation",
    locationEvent: "Negotiation",
    description: "SBWU + Hock Lee Company meeting with David Marshall",
    characters: ["BW", "CIV"],
    npc: "Bus Boss",
  },
  {
    phase: "Riot",
    sceneNumber: 8,
    route: "/hock-lee-bus-riots-pixel/riot/scene-8-bus-depot-strike-ii",
    locationEvent: "Bus Depot - Strike II",
    description: "Violent escalation",
    characters: ["CS", "BW"],
  },
  {
    phase: "Riot",
    sceneNumber: 9,
    route: "/hock-lee-bus-riots-pixel/riot/scene-9-radio-news",
    locationEvent: "Home",
    description: "Civil servant hears riot developments",
    characters: ["CIV"],
  },
  {
    phase: "Riot",
    sceneNumber: 10,
    route: "/hock-lee-bus-riots-pixel/riot/scene-10-funeral-newspaper",
    locationEvent: "Funeral / Newspaper",
    description: "Public grief and media coverage",
    characters: ["CS", "BW", "CIV"],
  },
  {
    phase: "Riot",
    sceneNumber: 15,
    route: "/hock-lee-bus-riots-pixel/riot/school-lake",
    locationEvent: "School Lake",
    description: "Student activists regroup near the school grounds",
    characters: ["CS"],
  },
  {
    phase: "Riot",
    sceneNumber: 16,
    route: "/hock-lee-bus-riots-pixel/riot/classroom",
    locationEvent: "Classroom",
    description: "Students organize inside the school amid escalating unrest",
    characters: ["CS"],
  },
  {
    phase: "Post-Riot",
    sceneNumber: 11,
    route: "/hock-lee-bus-riots-pixel/post-riot/scene-11-settlement",
    locationEvent: "Negotiation Hall",
    description: "David Marshall negotiates with SBWU",
    characters: ["BW", "CIV"],
    npc: "Bus Boss",
  },
  {
    phase: "Post-Riot",
    sceneNumber: 12,
    route: "/hock-lee-bus-riots-pixel/post-riot/hospital",
    locationEvent: "KK Hospital",
    description: "Students and families confront the riot's aftermath",
    characters: ["CS"],
  },
  {
    phase: "Post-Riot",
    sceneNumber: 13,
    route: "/hock-lee-bus-riots-pixel/post-riot/scene-13-paya-lebar-airport",
    locationEvent: "Kallang Airport",
    description: "Departure for Merdeka Talks",
    characters: ["CIV", "BW", "CS"],
    notes: "TV Scene?; DM resign",
  },
  {
    phase: "Post-Riot",
    sceneNumber: 17,
    route: "/hock-lee-bus-riots-pixel/post-riot/school-gates",
    locationEvent: "School Gates",
    description: "Students face the guarded school entrance in the aftermath",
    characters: ["CS"],
  },
];
