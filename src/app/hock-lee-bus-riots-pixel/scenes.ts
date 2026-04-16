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
  CIV: "Rajiv Menon",
  BW: "Ahmad bin Salleh",
  CS: "Ong Kim Chuan",
};

export const HOCK_LEE_SCENES: HockLeeScene[] = [
  {
    phase: "Pre-Riot",
    sceneNumber: 1,
    route: "/hock-lee-bus-riots-pixel/pre-riot/scene-1-city-hall",
    locationEvent: "City Hall",
    description:
      "Labour Front takes office on 2 April 1955 and is immediately judged on wages, bus grievances, and public order.",
    characters: ["CIV", "BW", "CS"],
  },
  {
    phase: "Pre-Riot",
    sceneNumber: 2,
    route: "/hock-lee-bus-riots-pixel/pre-riot/scene-2-market",
    locationEvent: "Market",
    description:
      "Rising prices, cramped housing, and thin wages show why labour anger travels quickly through the city.",
    characters: ["BW", "CS", "CIV"],
  },
  {
    phase: "Pre-Riot",
    sceneNumber: 3,
    route: "/hock-lee-bus-riots-pixel/pre-riot/scene-3-chinese-medium-school",
    locationEvent: "Chinese Medium School",
    description:
      "Students talk about worker hardship, Chinese education, and why Hock Lee is drawing their attention too.",
    characters: ["CS"],
  },
  {
    phase: "Pre-Riot",
    sceneNumber: 4,
    route: "/hock-lee-bus-riots-pixel/pre-riot/scene-4-government-office",
    locationEvent: "Government Office",
    description:
      "Marshall tries to prevent the Hock Lee dispute from hardening into a public test of his new government.",
    characters: ["CIV"],
  },
  {
    phase: "Pre-Riot",
    sceneNumber: 5,
    route: "/hock-lee-bus-riots-pixel/pre-riot/scene-5-bus-depot",
    locationEvent: "Bus Depot",
    description:
      "Denied union leave, unfair treatment, and rivalry with a favored union push workers toward open action.",
    characters: ["BW"],
  },
  {
    phase: "Riot",
    sceneNumber: 6,
    route: "/hock-lee-bus-riots-pixel/riot/scene-6-bus-depot-strike-i",
    locationEvent: "Bus Depot - Strike I",
    description:
      "Late April 1955: dismissed workers sit at the depot gates in hunger strike and stop buses from leaving.",
    characters: ["BW", "CIV", "CS"],
    npc: "Bus Boss",
  },
  {
    phase: "Riot",
    sceneNumber: 7,
    route: "/hock-lee-bus-riots-pixel/riot/scene-7-negotiation",
    locationEvent: "Negotiation",
    description:
      "Marshall tries to broker reinstatement and calmer terms, but the union and company cannot agree.",
    characters: ["BW", "CIV"],
    npc: "Bus Boss",
  },
  {
    phase: "Riot",
    sceneNumber: 8,
    route: "/hock-lee-bus-riots-pixel/riot/scene-8-bus-depot-strike-ii",
    locationEvent: "Bus Depot - Strike II",
    description:
      "On 12 May 1955, police hoses and crowd retaliation turn the strike into deadly street violence.",
    characters: ["CS", "BW"],
  },
  {
    phase: "Riot",
    sceneNumber: 9,
    route: "/hock-lee-bus-riots-pixel/riot/scene-9-radio-news",
    locationEvent: "Home",
    description:
      "As the clashes spread, officials scramble to verify casualties, control rumours, and keep order.",
    characters: ["CIV"],
  },
  {
    phase: "Riot",
    sceneNumber: 10,
    route: "/hock-lee-bus-riots-pixel/riot/scene-10-funeral-newspaper",
    locationEvent: "Funeral / Newspaper",
    description:
      "Deaths, mourning, and news coverage shape how the riot is remembered and argued over.",
    characters: ["CS", "BW", "CIV"],
  },
  {
    phase: "Riot",
    sceneNumber: 15,
    route: "/hock-lee-bus-riots-pixel/riot/school-lake",
    locationEvent: "School Lake",
    description:
      "Students gather to bring food, songs, placards, and numbers to the depot in support of the strike.",
    characters: ["CS"],
  },
  {
    phase: "Riot",
    sceneNumber: 16,
    route: "/hock-lee-bus-riots-pixel/riot/classroom",
    locationEvent: "Classroom",
    description:
      "Election news and worker politics turn classroom discussion into student planning and argument.",
    characters: ["CS"],
  },
  {
    phase: "Post-Riot",
    sceneNumber: 11,
    route: "/hock-lee-bus-riots-pixel/post-riot/scene-11-settlement",
    locationEvent: "Negotiation Hall",
    description:
      "On 14 May 1955, the government helps secure a settlement and the dismissed workers are reinstated.",
    characters: ["BW", "CIV"],
    npc: "Bus Boss",
  },
  {
    phase: "Post-Riot",
    sceneNumber: 12,
    route: "/hock-lee-bus-riots-pixel/post-riot/hospital",
    locationEvent: "KK Hospital",
    description:
      "Hospital wards fill with the injured as families confront the human cost of the clashes.",
    characters: ["CS"],
  },
  {
    phase: "Post-Riot",
    sceneNumber: 13,
    route: "/hock-lee-bus-riots-pixel/post-riot/scene-13-paya-lebar-airport",
    locationEvent: "Kallang Airport",
    description:
      "British doubts after Hock Lee now shadow Marshall's push for self-government.",
    characters: ["CIV", "BW", "CS"],
    notes: "TV Scene?; DM resign",
  },
  {
    phase: "Post-Riot",
    sceneNumber: 17,
    route: "/hock-lee-bus-riots-pixel/post-riot/school-gates",
    locationEvent: "School Gates",
    description:
      "School returns under tighter discipline as authorities grow more suspicious of student politics after Hock Lee and later unrest.",
    characters: ["CS"],
  },
];
