import type {
  BaseSceneConfig,
  SceneAnimatedElement,
  SceneArtifact,
  SceneNpcFigure,
} from "./base-scene-shell";
import { CHARACTER_LABELS, HOCK_LEE_SCENES } from "./scenes";

const DEFAULT_PETIR_ARTIFACT: SceneArtifact = {
  id: "petir-weekly",
  title: "PAP Publication: Petir Weekly (1959)",
  image: "/artifacts/PAP_publication_petir_weekly_1959.png",
  alt: "PAP publication Petir weekly 1959",
  description:
    "An issue of Petir Weekly, a PAP publication used to share policy positions and party updates.",
  inventoryIndex: 0,
  position: {
    left: "30%",
    top: "65%",
    width: "180px",
  },
  chat: {
    master1:
      "Petir Weekly was a key tool for communicating policy and party messaging in 1959.",
    user1: "What does this issue highlight?",
    master2:
      "It emphasizes party unity and policy direction after the 1959 election.",
  },
  rootsUrl: "https://www.roots.gov.sg/Collection-Landing/listing/1581109",
};

const HOME_CIVIL_SERVANT_ARTIFACT: SceneArtifact = {
  id: "civil-servant-briefcase",
  title: "Civil Service Briefcase",
  image: "/artifacts/briefcase.png",
  alt: "A brown briefcase",
  description:
    "A briefcase carrying policy drafts, correspondence, and handwritten notes from a long day at work.",
  inventoryIndex: 0,
  position: {
    right: "22%",
    bottom: "27%",
    width: "170px",
  },
  chat: {
    master1:
      "The briefcase represents the quiet bureaucratic labor behind public policy.",
    user1: "What do these papers reveal?",
    master2:
      "Rising costs, labor complaints, and pressure on officials to respond quickly and carefully.",
  },
  rootsUrl: "https://www.roots.gov.sg/Collection-Landing/listing/1062963",
};

const COMMAND_CENTER_RADIO_ARTIFACT: SceneArtifact = {
  id: "command-center-radio",
  title: "National Panasonic 8 Transistor Radio",
  image: "/artifacts/hockleebusriots/objects/radio.png",
  alt: "National Panasonic transistor radio",
  description:
    "A metal-and-plastic transistor radio of the kind that became popular in Singapore in the 1950s and 1960s. In a crisis, sets like this could carry urgent bulletins far beyond a single office.",
  inventoryIndex: 2,
  position: {
    left: "24%",
    top: "45%",
    width: "84px",
  },
  chat: {
    master1:
      "Roots describes this National Panasonic set as a metal-and-plastic transistor radio, part of the portable radios that became popular in Singapore in the 1950s and 1960s.",
    user1: "Why does this matter in the command center?",
    master2:
      "Because phones carry internal reports, but radio carries the public version of events. In a fast-moving riot, that can shape what people believe almost immediately.",
  },
  rootsUrl: "https://www.roots.gov.sg/Collection-Landing/listing/1039006",
};

const CITY_HALL_DAVID_MARSHALL_NPC = {
  id: "city-hall-david-marshall",
  image: "/npcfigures/davidmarshall/David Marshall_South.webp",
  alt: "David Marshall in City Hall",
  chatBubbleSpeaker: "David Marshall",
  chatBubbleTexts: [
    "Labour Front has won the election. The cheering is over; now we must govern.",
    "We promised relief for workers, cleaner administration, and a more responsive government. Every office must now account for the pressures building in the city.",
    "The bus dispute, wage complaints, and student agitation are not separate files on a desk. They are one test of whether this new government can keep order and still answer public need.",
    "So take this as your briefing: gather facts quickly, report honestly, and do not mistake a victory at the polls for calm on the ground.",
  ],
  autoOpenChatOnLoad: true,
  position: {
    left: "clamp(0px, calc(55vw - 300px), calc(100vw - 310px))",
    top: "clamp(0px, 70vh, calc(100vh - 210px))",
    width: "210px",
  },
};

const CITY_HALL_BRITISH_OFFICER_SOUTH_NPC = {
  id: "city-hall-british-officer-south",
  image: "/npcfigures/britishofficer/British Officer_South.webp",
  alt: "British officer facing south in City Hall",
  chatBubbleSpeaker: "Commander Albert",
  chatBubbleTexts: [
    "Singapore may have a new Chief Minister, but the colony is still brittle underneath the speeches.",
    "Prices are rising, housing is poor, and every wage dispute now carries political consequence.",
    "If the government cannot answer hardship quickly, the streets will answer in its place.",
  ],
  position: {
    left: "clamp(0px, calc(55vw - 760px), calc(100vw - 440px))",
    top: "clamp(0px, 70vh, calc(100vh - 210px))",
    width: "210px",
  },
};

const CITY_HALL_BRITISH_OFFICER_WEST_NPC = {
  id: "city-hall-british-officer-west",
  image: "/npcfigures/britishofficer/British Officer_West.webp",
  alt: "British officer facing west in City Hall",
  chatBubbleSpeaker: "Major Alfred",
  chatBubbleTexts: [
    "Everyone here says 'security', but unrest does not grow from slogans alone.",
    "Crowded schools, scarce jobs, and angry unions make this city easy to inflame.",
    "We call it subversion; many here call it desperation with a political language attached.",
  ],
  position: {
    left: "clamp(0px, calc(55vw - 680px), calc(100vw - 570px))",
    top: "clamp(0px, 70vh, calc(100vh - 210px))",
    width: "210px",
  },
};

const CITY_HALL_CHARACTER_SCALE = 1.3;
const CITY_HALL_NPC_LEFT_OVERRIDES: Record<string, string> = {
  "city-hall-british-officer-west":
    "clamp(0px, calc(55vw + 110px), calc(100vw - 270px))",
  "city-hall-british-officer-south":
    "clamp(0px, calc(55vw + 220px), calc(100vw - 140px))",
  "city-hall-david-marshall":
    "clamp(0px, calc(55vw - 150px), calc(100vw - 160px))",
};

const PARTY_WORKER_MANIFESTO_ARTIFACT: SceneArtifact = {
  id: "labour-front-manifesto",
  title: "Labour Front Manifesto",
  image: "/artifacts/hockleebusriots/objects/labourpartymanifesto.png",
  alt: "Labour Front manifesto leaflet",
  description:
    "A manifesto now being read less as campaign rhetoric and more as a public checklist for the new government.",
  inventoryIndex: 1,
  position: {
    left: "32%",
    top: "65%",
    width: "180px",
  },
  chat: {
    master1:
      "Now that Labour Front has won, every promise in this manifesto is being measured against what the government can actually deliver.",
    user1: "What should I focus on first?",
    master2:
      "Start with labour conditions, transport grievances, and cost-of-living promises. Those are the pledges people will test first.",
  },
  rootsUrl: "https://www.roots.gov.sg/Collection-Landing/listing/1223724",
};

const STUDENT_RIOT_WOODBLOCK_PRINT_ARTIFACT: SceneArtifact = {
  id: "student-riot-woodblock-print",
  title: "Student Riot Woodblock Print",
  image: "/artifacts/hockleebusriots/objects/student-riot-woodblock-print.png",
  alt: "Student riot woodblock print",
  description:
    "A 1954 woodcut by Choo Keng Kwang, reprinted in 1997, showing an artist's impression of the Chinese Middle School students' protest of 13 May 1954 against the National Service Ordinance.",
  inventoryIndex: 1,
  position: {
    left: "32%",
    top: "65%",
    width: "180px",
  },
  chat: {
    master1:
      "This woodcut by Choo Keng Kwang turns the Chinese Middle School students' protest of 13 May 1954 into a public image people can carry, read, and remember.",
    user1: "Why would this print matter in the market?",
    master2:
      "Because it gives people a shared picture of the protest. In a market, an artist's impression like this can spread the story, the anger, and the argument from stall to stall.",
  },
  rootsUrl: "https://www.roots.gov.sg/Collection-Landing/listing/1132595",
};

const CITY_HALL_PARTY_WORKER_ARTIFACT_NPC: SceneNpcFigure = {
  id: "city-hall-party-worker-manifesto",
  image: "/artifacts/hockleebusriots/heldartifacts/char-holding-manifestoro.png",
  alt: "Party worker holding a manifesto in City Hall",
  chatBubbleSpeaker: "Party Worker",
  chatBubbleText:
    "Labour Front has won. Read the manifesto carefully; these promises now belong to the government.",
  npcType: "artifact",
  autoChatCycle: {
    initialDelayMs: 2000,
    firstVisibleMs: 5000,
    hiddenMs: 2000,
    secondVisibleMs: 5000,
  },
  flipHorizontallyEachCycle: true,
  artifactWalkToSideBeforeOpen: "right",
  artifactId: PARTY_WORKER_MANIFESTO_ARTIFACT.id,
  position: {
    left: "clamp(0px, calc(55vw - 680px), calc(100vw - 810px))",
    top: "clamp(0px, 70vh, calc(100vh - 210px))",
    width: "210px",
  },
};

const CITY_HALL_NPCS: SceneNpcFigure[] = [
  CITY_HALL_BRITISH_OFFICER_WEST_NPC,
  CITY_HALL_BRITISH_OFFICER_SOUTH_NPC,
  CITY_HALL_DAVID_MARSHALL_NPC,
].map((npcFigure) => {
  const overriddenLeft = CITY_HALL_NPC_LEFT_OVERRIDES[npcFigure.id];
  if (!overriddenLeft) return npcFigure;
  return {
    ...npcFigure,
    position: {
      ...npcFigure.position,
      left: overriddenLeft,
    },
  };
});

const MARKET_DEVAN_NAIR_NPC = {
  id: "market-devan-nair",
  image: "/npcfigures/devannair/Devan Nair_South.webp",
  alt: "Devan Nair facing south in the market",
  chatBubbleSpeaker: "Devan Nair",
  chatBubbleTexts: [
    "I'm Devan Nair, a trade unionist working to organise workers across Singapore.",
    "I came back to union work after detention because workers still need someone to speak plainly for them.",
    "In 1955 I am with the Singapore Factory and Shopworkers' Union, and I can tell you this much: people are tired of being told to endure low pay as if hardship were a civic duty.",
    "Teachers, clerks, shop hands, drivers, conductors, they all feel the same squeeze: wages lag behind prices while colonial power still decides too much from above.",
    "Listen closely in a market and you hear the whole economy laid bare. One woman waters down her soup, one father puts back fish he cannot afford, one stallholder wonders how to pay the wholesaler.",
    "Malay, Chinese, Indian, English-speaking, it makes little difference once the bills come due. Hardship has a way of teaching solidarity faster than any pamphlet can.",
    "The authorities often speak as though labour unrest appears from nowhere. It does not. It grows wherever people are expected to work harder, accept less, and remain grateful.",
    "If Singapore wants stability, it cannot treat labour only as a police problem. Workers want dignity, representation, and enough to keep a family fed.",
    "That is why union work matters here as much as in any office or depot. The struggle begins long before a strike, in places like this where ordinary people compare what they earn with what life now costs.",
  ],
  position: {
    left: "clamp(0px, calc(55vw + 250px), calc(100vw - 250px))",
    top: "clamp(0px, 70vh, calc(100vh - 210px))",
    width: "210px",
  },
};

const MARKET_FISHERMAN_NPC = {
  id: "market-fisherman-south",
  image: "/npcfigures/marketfisherman/Fisherman_South.webp",
  alt: "Fisherman facing south in the market",
  className: "npc-figure--fisherman",
  chatBubbleSpeaker: "Pak Hamid",
  chatBubbleTexts: [
    "Some mornings I bring in a fair catch and still go home short after paying for rice, fuel, and rent.",
    "The city grows, but for men like us the kampong stays crowded and the drains stay bad.",
    "People talk politics here because the cost of living reaches the market before any policy does.",
  ],
  position: {
    left: "clamp(0px, calc(55vw - 140px), calc(100vw - 140px))",
    top: "clamp(0px, 58vh, calc(100vh - 250px))",
    width: "115px",
  },
};

const MARKET_ARTIST_NPC: SceneNpcFigure = {
  id: "market-artist",
  image: "/artifacts/hockleebusriots/heldartifacts/artist-holding-blockprint.png",
  alt: "Artifact NPC holding a print in the market",
  chatBubbleSpeaker: "Artist",
  chatBubbleText:
    "This woodcut shows the Chinese Middle School students' protest of 13 May 1954 as Choo Keng Kwang imagined it. A print like this lets people carry that moment, and its politics, into the market.",
  npcType: "artifact",
  artifactWalkToSideBeforeOpen: "right",
  artifactId: STUDENT_RIOT_WOODBLOCK_PRINT_ARTIFACT.id,
  position: {
    left: "clamp(0px, calc(55vw - 20px), calc(100vw - 20px))",
    top: "clamp(0px, 58vh, calc(100vh - 250px))",
    width: "115px",
  },
};

const MARKET_FOOD_SELLER_EAST_NPC = {
  id: "market-food-seller-east",
  image: "/npcfigures/marketfoodseller/Food Seller_East.webp",
  alt: "Food seller facing east in the market",
  chatBubbleSpeaker: "Mdm Lee",
  chatBubbleTexts: [
    "Customers complain my noodles cost more now, but charcoal, oil, and ingredients all cost more too.",
    "The poor blame the seller, the seller blames the wholesaler, and everyone wonders who in government is actually listening.",
    "A family can work all day in Singapore and still worry about the next month's rent. That is the real scandal.",
  ],
  position: {
    left: "clamp(0px, calc(55vw - 410px), calc(100vw - 330px))",
    top: "clamp(0px, calc(54vh - 30px), calc(100vh - 320px))",
    width: "100px",
  },
};

const MARKET_BUS_WORKER_EAST_NPC = {
  id: "market-bus-worker-east",
  image: "/npcfigures/busworker/east.png",
  alt: "Bus worker facing east in the market",
  chatBubbleSpeaker: "Tan Ah Seng",
  chatBubbleTexts: [
    "So many hours on the road and still my pay disappears the moment I hand it over at home.",
    "They want punctual buses, but drivers are tired, conductors are stretched, and the company treats us as replaceable.",
    "If this is progress, why do working men feel poorer each month?",
  ],
  position: {
    left: "clamp(0px, calc(55vw - 560px), calc(100vw - 500px))",
    top: "clamp(0px, 66vh, calc(100vh - 180px))",
    width: "155px",
  },
};

const MARKET_BUS_WORKER_SOUTH_NPC = {
  id: "market-bus-worker-south",
  image: "/npcfigures/busworker/south.png",
  alt: "Bus worker facing south in the market",
  chatBubbleSpeaker: "Ahmad bin Salleh",
  chatBubbleTexts: [
    "I am struggling to find a new house. The old place leaks, but every better room costs more than I can manage.",
    "We keep the city moving, yet many of us still raise children in cramped quarters with bad roofs and worse sanitation.",
    "A man can accept hard work. It is harder to accept that hard work still buys so little.",
  ],
  position: {
    left: "clamp(0px, calc(55vw - 420px), calc(100vw - 360px))",
    top: "clamp(0px, 66vh, calc(100vh - 180px))",
    width: "155px",
  },
};

const MARKET_BUS_WORKER_WEST_NPC = {
  id: "market-bus-worker-west",
  image: "/npcfigures/busworker/west.png",
  alt: "Bus worker facing west in the market",
  chatBubbleSpeaker: "Lim Boon Chye",
  chatBubbleTexts: [
    "Everything is so expensive now. I joke about eggs, but truthfully even simple meals are becoming a calculation.",
    "When wages stay flat and food climbs, every small purchase turns into an argument at home.",
    "That is why people join unions. It is not only politics. It is survival.",
  ],
  position: {
    left: "clamp(0px, calc(55vw - 280px), calc(100vw - 220px))",
    top: "clamp(0px, 66vh, calc(100vh - 180px))",
    width: "155px",
  },
};

const GOVERNMENT_OFFICE_NPC_WIDTH = "210px";
const GOVERNMENT_OFFICE_NPC_TOP = "66%";
const GOVERNMENT_OFFICE_NPC_Y_OFFSET = "translateY(-100px)";
const GOVERNMENT_OFFICE_TALKING_GROUP_X_OFFSET = "400px";
const GOVERNMENT_OFFICE_DESK_ARTIFACT_WIDTH = "46px";
const GOVERNMENT_OFFICE_DESK_ARTIFACT_LEFT = `clamp(40px, calc(54.5% + ${GOVERNMENT_OFFICE_TALKING_GROUP_X_OFFSET} - 690px), calc(100vw - 96px))`;
const GOVERNMENT_OFFICE_DESK_ARTIFACT_TOP = "46%";

const GOVERNMENT_OFFICE_PIPES_ARTIFACT: SceneArtifact = {
  id: "government-office-david-marshall-pipes",
  title: "Pipes and pipe stand",
  image: "/artifacts/hockleebusriots/objects/davidmarshallpipes.png",
  alt: "David Marshall's pipes and pipe stand on the government office desk",
  description:
    "David Marshall's favorite pipe set, including the pipe holder and tobacco container. Roots notes that the stand was made by his son Jonathan, and the pipe became a trademark on Marshall's office desk during his years as Chief Minister.",
  inventoryIndex: 0,
  position: {
    left: GOVERNMENT_OFFICE_DESK_ARTIFACT_LEFT,
    top: GOVERNMENT_OFFICE_DESK_ARTIFACT_TOP,
    width: GOVERNMENT_OFFICE_DESK_ARTIFACT_WIDTH,
    transform: "translateX(-50%)",
  },
  chat: {
    master1:
      "Roots describes these as David Marshall's favorite pipes and pipe holder, with the tobacco container belonging to the same set.",
    user1: "Why notice the pipes during this meeting?",
    master2:
      "Because the pipe had become part of Marshall's public image. On his desk, it turns a private habit into a visible symbol of authority in the room.",
  },
  rootsUrl: "https://www.roots.gov.sg/Collection-Landing/listing/1134262",
};

const GOVERNMENT_OFFICE_PIPES_ARTIFACT_NPC: SceneNpcFigure = {
  id: "government-office-david-marshall-pipes-object",
  image: "/artifacts/hockleebusriots/objects/davidmarshallpipes.png",
  alt: "David Marshall's pipes resting on the desk in the government office",
  npcType: "artifact",
  artifactId: GOVERNMENT_OFFICE_PIPES_ARTIFACT.id,
  position: {
    left: GOVERNMENT_OFFICE_DESK_ARTIFACT_LEFT,
    top: GOVERNMENT_OFFICE_DESK_ARTIFACT_TOP,
    width: GOVERNMENT_OFFICE_DESK_ARTIFACT_WIDTH,
    transform: "translateX(-50%)",
  },
  zIndex: 9,
};

const GOVERNMENT_OFFICE_DAVID_MARSHALL_NPC: SceneNpcFigure = {
  id: "government-office-david-marshall-south",
  image: "/npcfigures/davidmarshall/David Marshall_South.webp",
  alt: "David Marshall facing south in the government office",
  className: "npc-figure--priority-chat",
  chatBubbleSpeaker: "David Marshall",
  chatBubbleTexts: [
    "Let's keep our voices down and get to the point. The longer this drags on, the worse it will get outside this room.",
    "No one is leaving this room satisfied on every point. The question is whether both sides are willing to prevent this dispute from turning into something larger.",
    "This is exactly why I called both sides in. I am trying to hold the line while there is still room for settlement. If these negotiations fail, anger will spread far beyond the depot.",
  ],
  position: {
    left: `calc(50% + ${GOVERNMENT_OFFICE_TALKING_GROUP_X_OFFSET})`,
    top: GOVERNMENT_OFFICE_NPC_TOP,
    width: GOVERNMENT_OFFICE_NPC_WIDTH,
    transform: `translateX(-50%) ${GOVERNMENT_OFFICE_NPC_Y_OFFSET}`,
  },
};

const GOVERNMENT_OFFICE_LEE_KUAN_YEW_NPC: SceneNpcFigure = {
  id: "government-office-lee-kuan-yew-south",
  image: "/npcfigures/leekuanyew/LeeKuanYew_South.webp",
  alt: "Lee Kuan Yew standing in the background of the government office",
  chatBubbleSpeaker: "Lee Kuan Yew",
  chatBubbleTexts: [
    "Lee Kuan Yew. I'm here as a lawyer and political observer, not the man chairing the meeting.",
    "Marshall is leading the talks. I'm watching how labour, government, and the companies are testing one another.",
    "What happens in this room will not stay in this room. These disputes are shaping the future of politics in Singapore.",
  ],
  position: {
    left: "26%",
    top: "56%",
    width: "150px",
    transform: "translateX(-50%) translateY(-40px)",
  },
};

const GOVERNMENT_OFFICE_FENG_SWEE_SUAN_NPC: SceneNpcFigure = {
  id: "government-office-feng-swee-suan-east",
  image: "/npcfigures/fengsweesuan/Feng Swee Suan_East South.webp",
  alt: "Feng Swee Suan facing southeast in the government office",
  className: "npc-figure--priority-chat",
  chatBubbleSpeaker: "Feng Swee Suan",
  chatBubbleTexts: [
    "Our workers have already waited long enough. Men were dismissed, wages are too low, and families are paying the price.",
    "Then begin with the dismissed workers. If there is no movement on reinstatement, people will see these talks as empty.",
  ],
  position: {
    left: `calc(42% + ${GOVERNMENT_OFFICE_TALKING_GROUP_X_OFFSET})`,
    top: GOVERNMENT_OFFICE_NPC_TOP,
    width: GOVERNMENT_OFFICE_NPC_WIDTH,
    transform: `translateX(-50%) ${GOVERNMENT_OFFICE_NPC_Y_OFFSET}`,
  },
};

const GOVERNMENT_OFFICE_BUS_BOSS_NPC: SceneNpcFigure = {
  id: "government-office-bus-boss-west",
  image: "/npcfigures/busboss/Buss Boss_West.webp",
  alt: "Bus company boss facing west in the government office",
  className: "npc-figure--priority-chat",
  chatBubbleSpeaker: "Bus Company Boss",
  chatBubbleTexts: [
    "You speak as if the company has no problems of its own. Costs are rising too. We cannot promise what we cannot afford.",
    "I can discuss terms, but I will not be forced into a decision under pressure from the street.",
  ],
  position: {
    left: `calc(61% + ${GOVERNMENT_OFFICE_TALKING_GROUP_X_OFFSET})`,
    top: GOVERNMENT_OFFICE_NPC_TOP,
    width: GOVERNMENT_OFFICE_NPC_WIDTH,
    transform: `translateX(-50%) ${GOVERNMENT_OFFICE_NPC_Y_OFFSET}`,
  },
};

const GOVERNMENT_OFFICE_NPCS: SceneNpcFigure[] = [
  GOVERNMENT_OFFICE_LEE_KUAN_YEW_NPC,
  GOVERNMENT_OFFICE_DAVID_MARSHALL_NPC,
  GOVERNMENT_OFFICE_FENG_SWEE_SUAN_NPC,
  GOVERNMENT_OFFICE_BUS_BOSS_NPC,
  GOVERNMENT_OFFICE_PIPES_ARTIFACT_NPC,
];

const BUS_DEPOT_WORKER_1_NPCS = [
  {
    id: "bus-depot-worker-1-east",
    image: "/npcfigures/busdepotworker1/Bus Worker01_East.webp",
    alt: "Bus depot worker 1 facing east",
    position: {
      left: "8%",
      top: "66%",
      width: "132px",
    },
  },
  {
    id: "bus-depot-worker-1-north",
    image: "/npcfigures/busdepotworker1/Bus Worker01_North.webp",
    alt: "Bus depot worker 1 facing north",
    position: {
      left: "18%",
      top: "62%",
      width: "132px",
    },
  },
  {
    id: "bus-depot-worker-1-south",
    image: "/npcfigures/busdepotworker1/Bus Worker01_South.webp",
    alt: "Bus depot worker 1 facing south",
    position: {
      left: "28%",
      top: "68%",
      width: "132px",
    },
  },
  {
    id: "bus-depot-worker-1-west",
    image: "/npcfigures/busdepotworker1/Bus Worker01_West.webp",
    alt: "Bus depot worker 1 facing west",
    position: {
      left: "38%",
      top: "64%",
      width: "132px",
    },
  },
];

const BUS_DEPOT_WORKER_2_NPCS = [
  {
    id: "bus-depot-worker-2-east",
    image: "/npcfigures/busdepotworker2/Bus Worker02_East.webp",
    alt: "Bus depot worker 2 facing east",
    position: {
      left: "48%",
      top: "65%",
      width: "132px",
    },
  },
  {
    id: "bus-depot-worker-2-north",
    image: "/npcfigures/busdepotworker2/Bus Worker02_North.webp",
    alt: "Bus depot worker 2 facing north",
    position: {
      left: "58%",
      top: "61%",
      width: "132px",
    },
  },
  {
    id: "bus-depot-worker-2-south",
    image: "/npcfigures/busdepotworker2/Bus Worker02_South.webp",
    alt: "Bus depot worker 2 facing south",
    position: {
      right: "28%",
      top: "67%",
      width: "132px",
    },
  },
  {
    id: "bus-depot-worker-2-west",
    image: "/npcfigures/busdepotworker2/Bus Worker02_West.webp",
    alt: "Bus depot worker 2 facing west",
    position: {
      right: "18%",
      top: "63%",
      width: "132px",
    },
  },
];

const BUS_DEPOT_WORKER_3_NPCS = [
  {
    id: "bus-depot-worker-3-east",
    image: "/npcfigures/busdepotworker3/Bus Worker03_east.png",
    alt: "Bus depot worker 3 facing east",
    position: {
      right: "8%",
      top: "66%",
      width: "132px",
    },
  },
  {
    id: "bus-depot-worker-3-north",
    image: "/npcfigures/busdepotworker3/Bus Worker03_north.png",
    alt: "Bus depot worker 3 facing north",
    position: {
      right: "34%",
      top: "58%",
      width: "132px",
    },
  },
  {
    id: "bus-depot-worker-3-south",
    image: "/npcfigures/busdepotworker3/Bus Worker03_south.png",
    alt: "Bus depot worker 3 facing south",
    position: {
      left: "22%",
      top: "74%",
      width: "132px",
    },
  },
  {
    id: "bus-depot-worker-3-west",
    image: "/npcfigures/busdepotworker3/Bus Worker03_west.png",
    alt: "Bus depot worker 3 facing west",
    position: {
      right: "42%",
      top: "72%",
      width: "132px",
    },
  },
];

const BUS_DEPOT_GATE_WORKER_NPCS: SceneNpcFigure[] = [
  {
    ...BUS_DEPOT_WORKER_1_NPCS[0],
    position: { left: "42%", top: "69%", width: "132px" },
  },
  {
    ...BUS_DEPOT_WORKER_1_NPCS[1],
    position: { left: "48%", top: "64%", width: "132px" },
  },
  {
    ...BUS_DEPOT_WORKER_1_NPCS[2],
    position: { left: "54%", top: "71%", width: "132px" },
  },
  {
    ...BUS_DEPOT_WORKER_1_NPCS[3],
    position: { left: "60%", top: "66%", width: "132px" },
  },
  {
    ...BUS_DEPOT_WORKER_2_NPCS[0],
    position: { left: "66%", top: "69%", width: "132px" },
  },
  {
    ...BUS_DEPOT_WORKER_2_NPCS[1],
    position: { left: "45%", top: "60%", width: "132px" },
  },
  {
    ...BUS_DEPOT_WORKER_2_NPCS[2],
    position: { right: "30%", top: "72%", width: "132px" },
  },
  {
    ...BUS_DEPOT_WORKER_2_NPCS[3],
    position: { right: "22%", top: "65%", width: "132px" },
  },
  {
    ...BUS_DEPOT_WORKER_3_NPCS[0],
    position: { right: "14%", top: "69%", width: "132px" },
  },
  {
    ...BUS_DEPOT_WORKER_3_NPCS[1],
    position: { right: "38%", top: "61%", width: "132px" },
  },
  {
    ...BUS_DEPOT_WORKER_3_NPCS[2],
    position: { left: "50%", top: "76%", width: "132px" },
  },
  {
    ...BUS_DEPOT_WORKER_3_NPCS[3],
    position: { right: "46%", top: "70%", width: "132px" },
  },
];

const BUS_DEPOT_POLICE_WIDTH = "156px";
const BUS_DEPOT_POLICE_SCALE = 1.05;
const BUS_DEPOT_POLICE_Z_INDEX = 11;
const BUS_DEPOT_POLICE_NPC_IDS = new Set([
  "bus-depot-police-1-west",
  "bus-depot-police-2-west",
  "bus-depot-police-3-west",
]);

const BUS_DEPOT_HIDDEN_POLICE_NPCS: SceneNpcFigure[] = [
  {
    id: "bus-depot-police-1-west",
    image: "/npcfigures/police/Police01_0005.webp",
    alt: "Police officer waiting below the bus depot scene",
    position: {
      left: "clamp(24px, calc(55vw + 84px), calc(100vw - 330px))",
      top: "calc(100vh + 240px)",
      width: BUS_DEPOT_POLICE_WIDTH,
    },
    zIndex: BUS_DEPOT_POLICE_Z_INDEX,
  },
  {
    id: "bus-depot-police-2-west",
    image: "/npcfigures/police/Police02_0005.webp",
    alt: "Police officer waiting below the bus depot scene",
    position: {
      left: "clamp(24px, calc(55vw + 172px), calc(100vw - 220px))",
      top: "calc(100vh + 320px)",
      width: BUS_DEPOT_POLICE_WIDTH,
    },
    zIndex: BUS_DEPOT_POLICE_Z_INDEX,
  },
  {
    id: "bus-depot-police-3-west",
    image: "/npcfigures/police/Police03_0005.webp",
    alt: "Police officer waiting below the bus depot scene",
    position: {
      left: "clamp(24px, calc(55vw + 260px), calc(100vw - 110px))",
      top: "calc(100vh + 400px)",
      width: BUS_DEPOT_POLICE_WIDTH,
    },
    zIndex: BUS_DEPOT_POLICE_Z_INDEX,
  },
];

const BUS_DEPOT_RAJIV_POLICE_NPCS: SceneNpcFigure[] = [
  {
    ...BUS_DEPOT_HIDDEN_POLICE_NPCS[0],
    alt: "Police officer moving up beside Rajiv at the bus depot",
    position: {
      left: "clamp(24px, calc(55vw + 84px), calc(100vw - 330px))",
      top: "clamp(0px, calc(70vh + 96px), calc(100vh - 120px))",
      width: BUS_DEPOT_POLICE_WIDTH,
    },
  },
  {
    ...BUS_DEPOT_HIDDEN_POLICE_NPCS[1],
    alt: "Police officer moving up beside Rajiv at the bus depot",
    position: {
      left: "clamp(24px, calc(55vw + 172px), calc(100vw - 220px))",
      top: "clamp(0px, calc(70vh + 78px), calc(100vh - 138px))",
      width: BUS_DEPOT_POLICE_WIDTH,
    },
  },
  {
    ...BUS_DEPOT_HIDDEN_POLICE_NPCS[2],
    alt: "Police officer moving up beside Rajiv at the bus depot",
    position: {
      left: "clamp(24px, calc(55vw + 260px), calc(100vw - 110px))",
      top: "clamp(0px, calc(70vh + 112px), calc(100vh - 104px))",
      width: BUS_DEPOT_POLICE_WIDTH,
    },
  },
];

const BUS_DEPOT_FENG_SWEE_SUAN_NPC = {
  id: "bus-depot-feng-swee-suan-east-south",
  image: "/npcfigures/fengsweesuan/Feng Swee Suan_East South.webp",
  alt: "Feng Swee Suan facing southeast in the bus depot",
  className: "npc-figure--priority-chat",
  chatBubbleSpeaker: "Feng Swee Suan",
  chatBubbleTexts: [
    "Boss, the workers are united. Low pay and poor conditions have pushed them far enough, and the trade union dispute has made matters worse.",
    "If the company will not recognize the union properly or improve conditions, we will begin a peaceful strike at the depot gates.",
    "Let the buses stay still today. We will stand together outside and show that the workers mean business.",
  ],
  position: {
    left: "51%",
    top: "61%",
    width: "132px",
    transform: "translateX(-50%) translateY(200px)",
  },
  zIndex: 10,
};

const BUS_DEPOT_GATE_FENG_SWEE_SUAN_NPC = {
  ...BUS_DEPOT_FENG_SWEE_SUAN_NPC,
  id: "bus-depot-feng-swee-suan-gate",
  chatBubbleTexts: [
    "Hold the line, everyone. No rushing the gate and no giving them an excuse to call this something else.",
    "Rajiv, look at the men now. They are standing firm, and that is exactly when the authorities decide they need police at their side.",
    "Stay calm, stay together, and remember that we came here as workers with demands, not as rioters looking for a fight.",
  ],
};

const BUS_DEPOT_BUS_BOSS_NPC = {
  id: "bus-depot-bus-boss-west",
  image: "/npcfigures/busboss/Buss Boss_West.webp",
  alt: "Bus boss facing west in the bus depot",
  className: "npc-figure--priority-chat",
  chatBubbleSpeaker: "Bus Company Boss",
  chatBubbleTexts: [
    "You keep stirring the men up, Feng, as if I have money hidden somewhere. I do not have the funds to hand out higher wages just because you demand them.",
    "Now you bring trade unions into this and expect me to simply bow my head. The company is already strained, and I am tired of being painted as the villain for accounts that do not balance.",
    "If you bring the men to the gate, keep them calm. I will hear the demands, but do not mistake my frustration for surrender.",
  ],
  position: {
    left: "61%",
    top: "61%",
    width: "132px",
    transform: "translateX(-50%) translateY(200px)",
  },
  zIndex: 10,
};

const BUS_DEPOT_REACTING_BUS_BOSS_NPC = {
  ...BUS_DEPOT_BUS_BOSS_NPC,
  chatBubbleTexts: [
    "So this is your answer then, Feng, a line of men at my gate and every bus standing idle. You have made your point.",
    "I am still short of funds, and a crowd outside does not change the company books, but now the whole depot can see how serious this dispute has become.",
    "Keep this peaceful and we will talk. If the union wants recognition, it will have to be argued across the table, not shouted through the gate.",
  ],
};

const BUS_DEPOT_NPC_Y_OFFSET_PX = -200;
const BUS_DEPOT_NON_INTERACTIVE_NPC_SCALE = 0.8;
const BUS_DEPOT_INTERACTIVE_NPC_IDS = new Set([
  "bus-depot-feng-swee-suan-east-south",
  "bus-depot-feng-swee-suan-gate",
  "bus-depot-bus-boss-west",
]);

const buildBusDepotNpcs = (
  workerNpcFigures: SceneNpcFigure[],
  options?: {
    fengNpc?: SceneNpcFigure;
    bossNpc?: SceneNpcFigure;
  }
) =>
  (
    [
      ...workerNpcFigures,
      options?.fengNpc ?? BUS_DEPOT_FENG_SWEE_SUAN_NPC,
      options?.bossNpc ?? BUS_DEPOT_BUS_BOSS_NPC,
    ] as SceneNpcFigure[]
  ).map((npcFigure): SceneNpcFigure => {
    const isInteractive = BUS_DEPOT_INTERACTIVE_NPC_IDS.has(npcFigure.id);
    const nonInteractiveScale = BUS_DEPOT_POLICE_NPC_IDS.has(npcFigure.id)
      ? BUS_DEPOT_POLICE_SCALE
      : BUS_DEPOT_NON_INTERACTIVE_NPC_SCALE;
    const scaleTransform = isInteractive
      ? ""
      : ` scale(${nonInteractiveScale})`;

    return {
      ...npcFigure,
      isInteractive,
      position: {
        ...npcFigure.position,
        transform: npcFigure.position.transform
          ? `${npcFigure.position.transform} translateY(${BUS_DEPOT_NPC_Y_OFFSET_PX}px)${scaleTransform}`
          : `translateY(${BUS_DEPOT_NPC_Y_OFFSET_PX}px)${scaleTransform}`,
      },
    };
  });

const BUS_DEPOT_NPCS = buildBusDepotNpcs([
  ...BUS_DEPOT_WORKER_1_NPCS,
  ...BUS_DEPOT_WORKER_2_NPCS,
  ...BUS_DEPOT_WORKER_3_NPCS,
  ...BUS_DEPOT_HIDDEN_POLICE_NPCS,
]);

const BUS_DEPOT_GATE_NPCS = buildBusDepotNpcs([
  ...BUS_DEPOT_GATE_WORKER_NPCS,
  ...BUS_DEPOT_HIDDEN_POLICE_NPCS,
], {
  fengNpc: BUS_DEPOT_GATE_FENG_SWEE_SUAN_NPC,
  bossNpc: BUS_DEPOT_REACTING_BUS_BOSS_NPC,
});

const BUS_DEPOT_GATE_WITH_POLICE_NPCS = buildBusDepotNpcs([
  ...BUS_DEPOT_GATE_WORKER_NPCS,
  ...BUS_DEPOT_RAJIV_POLICE_NPCS,
], {
  fengNpc: BUS_DEPOT_GATE_FENG_SWEE_SUAN_NPC,
  bossNpc: BUS_DEPOT_REACTING_BUS_BOSS_NPC,
});

const HOME_CIVIL_SERVANT_WIFE_NPC = {
  id: "home-civil-servant-wife-south",
  image: "/npcfigures/wife/west.png",
  imageOnChatOpen: "/npcfigures/wife/south.png",
  alt: "Civil servant wife facing west at home",
  chatBubbleSpeaker: "Sharon",
  chatBubbleTexts: [
    "You've been so quiet since you came home. What have you observed so far from all those reports and meetings?",
  ],
  dialogueChoices: [
    {
      id: "rising-prices",
      label: "Rising prices are sharpening every grievance.",
      playerText:
        "I've noticed rising prices sharpening every grievance. Even ordinary labour complaints are starting to feel political.",
      npcReply:
        "Then the city is more brittle than the papers admit. Promise me you will not treat this like just another file.",
    },
    {
      id: "government-unsure",
      label: "The office thinks it can manage this, but I'm no longer sure.",
      playerText:
        "The office still believes it can manage the dispute through meetings and reports, but I'm no longer sure that will be enough.",
      npcReply:
        "That uncertainty worries me more than any headline. If even you sound doubtful, the situation must be serious.",
    },
    {
      id: "rumor-faster-than-facts",
      label: "Rumor is moving faster than facts.",
      playerText:
        "What troubles me most is how fast rumor is moving. People may act on fear before the government even understands the situation.",
      npcReply:
        "Then be careful what you repeat and who you trust. Fear can do damage before any order is given.",
    },
  ],
  position: {
    left: "clamp(0px, calc(55vw - 580px), calc(100vw - 770px))",
    top: "calc(58vh - 44px)",
    width: "352px",
  },
};

const ALEXANDRA_ROAD_FIRE_FRAMES: [string, string, string] = [
  "/animatedelements/fire/1.png",
  "/animatedelements/fire/2.png",
  "/animatedelements/fire/3.png",
];

const ALEXANDRA_ROAD_FIRE_ELEMENTS: SceneAnimatedElement[] = [
  {
    id: "alexandra-road-fire-left",
    frames: ALEXANDRA_ROAD_FIRE_FRAMES,
    alt: "",
    frameOffset: 0,
    className: "hl-pixel-fire",
    position: {
      left: "16%",
      top: "65%",
      width: "84px",
      opacity: 0.95,
    },
  },
  {
    id: "alexandra-road-fire-center",
    frames: ALEXANDRA_ROAD_FIRE_FRAMES,
    alt: "",
    frameOffset: 1,
    className: "hl-pixel-fire",
    position: {
      left: "44%",
      top: "63%",
      width: "98px",
      opacity: 0.95,
    },
  },
  {
    id: "alexandra-road-fire-right",
    frames: ALEXANDRA_ROAD_FIRE_FRAMES,
    alt: "",
    frameOffset: 2,
    className: "hl-pixel-fire",
    position: {
      left: "67%",
      top: "64%",
      width: "90px",
      opacity: 0.93,
    },
  },
];

const ALEXANDRA_ROAD_BUS_WORKER_NPCS: SceneNpcFigure[] = [
  {
    id: "alexandra-road-bus-worker-1-east",
    image: "/npcfigures/riotfigures/Bus Worker/Bus Worker02-Riot_East.webp",
    alt: "Bus worker facing east at Alexandra Road",
    position: {
      left: "10%",
      top: "71%",
      width: "168px",
    },
  },
  {
    id: "alexandra-road-bus-worker-2-south",
    image: "/npcfigures/riotfigures/Bus Worker/Bus Worker02-Riot_South.webp",
    alt: "Bus worker facing south at Alexandra Road",
    position: {
      left: "24%",
      top: "75%",
      width: "176px",
    },
  },
  {
    id: "alexandra-road-bus-worker-3-east",
    image: "/npcfigures/riotfigures/Bus Worker/Bus Worker02-Riot_East.webp",
    alt: "Bus worker facing east at Alexandra Road",
    position: {
      right: "31%",
      top: "73%",
      width: "172px",
    },
  },
  {
    id: "alexandra-road-bus-worker-4-south",
    image: "/npcfigures/riotfigures/Bus Worker/Bus Worker02-Riot_South.webp",
    alt: "Bus worker facing south at Alexandra Road",
    position: {
      right: "15%",
      top: "76%",
      width: "176px",
    },
  },
];

const ALEXANDRA_ROAD_LEE_CHIM_SIONG_NPCS: SceneNpcFigure[] = [
  {
    id: "alexandra-road-lee-chim-siong-1-east",
    image: "/npcfigures/riotfigures/Lee Chim Siong/Lee Chim Siong-Riot_East.webp",
    alt: "Lee Chim Siong facing east at Alexandra Road",
    position: {
      left: "31%",
      top: "62%",
      width: "148px",
    },
  },
  {
    id: "alexandra-road-lee-chim-siong-2-south",
    image: "/npcfigures/riotfigures/Lee Chim Siong/Lee Chim Siong-Riot_South.webp",
    alt: "Lee Chim Siong facing south at Alexandra Road",
    position: {
      left: "46%",
      top: "60%",
      width: "144px",
    },
  },
  {
    id: "alexandra-road-lee-chim-siong-3-east",
    image: "/npcfigures/riotfigures/Lee Chim Siong/Lee Chim Siong-Riot_East.webp",
    alt: "Lee Chim Siong facing east at Alexandra Road",
    position: {
      left: "59%",
      top: "61%",
      width: "146px",
    },
  },
  {
    id: "alexandra-road-lee-chim-siong-4-south",
    image: "/npcfigures/riotfigures/Lee Chim Siong/Lee Chim Siong-Riot_South.webp",
    alt: "Lee Chim Siong facing south at Alexandra Road",
    position: {
      left: "74%",
      top: "59%",
      width: "142px",
    },
  },
];

const ALEXANDRA_ROAD_STUDENT_UNION_NPCS: SceneNpcFigure[] = [
  {
    id: "alexandra-road-student-union-1-west",
    image: "/npcfigures/riotfigures/Student Union/Student-Riot_West.webp",
    alt: "Student union member facing west at Alexandra Road",
    position: {
      left: "6%",
      top: "58%",
      width: "138px",
    },
  },
  {
    id: "alexandra-road-student-union-2-north",
    image: "/npcfigures/riotfigures/Student Union/Student-Riot_North.webp",
    alt: "Student union member facing north at Alexandra Road",
    position: {
      left: "20%",
      top: "56%",
      width: "132px",
    },
  },
  {
    id: "alexandra-road-student-union-3-east",
    image: "/npcfigures/riotfigures/Student Union/Student-Riot_East.webp",
    alt: "Student union member facing east at Alexandra Road",
    position: {
      right: "30%",
      top: "57%",
      width: "134px",
    },
  },
  {
    id: "alexandra-road-student-union-4-south",
    image: "/npcfigures/riotfigures/Student Union/Student-Riot_South.webp",
    alt: "Student union member facing south at Alexandra Road",
    position: {
      right: "14%",
      top: "58%",
      width: "138px",
    },
  },
];

const ALEXANDRA_ROAD_JOURNALIST_NPCS: SceneNpcFigure[] = [
  {
    id: "alexandra-road-american-journalist",
    image: "/npcfigures/journalists/American Journalist_0001.webp",
    alt: "American journalist covering unrest at Alexandra Road",
    chatBubbleSpeaker: "American Journalist",
    chatBubbleText: "I'm filing this to the international press right now.",
    position: {
      left: "4%",
      top: "68%",
      width: "158px",
    },
  },
  {
    id: "alexandra-road-asian-reporter",
    image: "/npcfigures/journalists/Asian Reporter_0001.webp",
    alt: "Asian reporter documenting events at Alexandra Road",
    chatBubbleSpeaker: "Asian Reporter",
    chatBubbleText: "Witness accounts are changing by the hour out here.",
    position: {
      right: "4%",
      top: "67%",
      width: "154px",
    },
  },
];

const ALEXANDRA_ROAD_NPCS: SceneNpcFigure[] = [
  ...ALEXANDRA_ROAD_BUS_WORKER_NPCS,
  ...ALEXANDRA_ROAD_LEE_CHIM_SIONG_NPCS,
  ...ALEXANDRA_ROAD_STUDENT_UNION_NPCS,
  ...ALEXANDRA_ROAD_JOURNALIST_NPCS,
];

const NEGOTIATION_BACK_BUS_WORKER_NPCS: SceneNpcFigure[] = [
  {
    id: "negotiation-bus-worker-back-1-south",
    image: "/npcfigures/busdepotworker1/Bus Worker01_South.webp",
    alt: "Bus worker standing in the back of the negotiation hall",
    position: {
      left: "20%",
      top: "50%",
      width: "108px",
    },
  },
  {
    id: "negotiation-bus-worker-back-2-south",
    image: "/npcfigures/busdepotworker2/Bus Worker02_South.webp",
    alt: "Bus worker standing in the back of the negotiation hall",
    position: {
      left: "45%",
      top: "48%",
      width: "112px",
    },
  },
  {
    id: "negotiation-bus-worker-back-3-south",
    image: "/npcfigures/busdepotworker3/Bus Worker03_south.png",
    alt: "Bus worker standing in the back of the negotiation hall",
    position: {
      right: "20%",
      top: "50%",
      width: "110px",
    },
  },
];

const NEGOTIATION_FRONT_LEADERS_NPCS: SceneNpcFigure[] = [
  {
    id: "negotiation-david-marshall-south",
    image: "/npcfigures/davidmarshall/David Marshall_South.webp",
    alt: "David Marshall in front at the negotiation hall",
    position: {
      left: "14%",
      top: "68%",
      width: "178px",
    },
  },
  {
    id: "negotiation-lee-kuan-yew-south",
    image: "/npcfigures/leekuanyew/LeeKuanYew_South.webp",
    alt: "Lee Kuan Yew in front at the negotiation hall",
    position: {
      left: "35%",
      top: "67%",
      width: "172px",
    },
  },
  {
    id: "negotiation-feng-swee-suan-south",
    image: "/npcfigures/fengsweesuan/Feng Swee Suan_South.webp",
    alt: "Feng Swee Suan in front at the negotiation hall",
    position: {
      left: "56%",
      top: "67%",
      width: "174px",
    },
  },
  {
    id: "negotiation-bus-boss-west",
    image: "/npcfigures/busboss/Buss Boss_West.webp",
    alt: "Bus boss in front at the negotiation hall",
    position: {
      right: "12%",
      top: "69%",
      width: "180px",
    },
  },
];

const NEGOTIATION_NPCS: SceneNpcFigure[] = [
  ...NEGOTIATION_BACK_BUS_WORKER_NPCS,
  ...NEGOTIATION_FRONT_LEADERS_NPCS,
];

const KALLANG_AIRPORT_NPCS: SceneNpcFigure[] = [
  {
    id: "kallang-airport-david-marshall-south",
    image: "/npcfigures/davidmarshall/David Marshall_South.webp",
    alt: "David Marshall speaking at Kallang Airport",
    className: "npc-figure--priority-chat",
    chatBubbleSpeaker: "David Marshall",
    chatBubbleText:
      "I am heading for the Merdeka Talks. Keep the peace while we press for self-government.",
    isInteractive: true,
    position: {
      left: "50%",
      top: "64%",
      width: "198px",
      transform: "translateX(-50%)",
    },
  },
  {
    id: "kallang-airport-civil-servant-1",
    image: "/npcfigures/civilservant/Civil Servant_0002.webp",
    alt: "Civil servant standing near the departure steps",
    isInteractive: false,
    position: {
      left: "23%",
      top: "68%",
      width: "168px",
    },
  },
  {
    id: "kallang-airport-civil-servant-2",
    image: "/npcfigures/civilservant/Civil Servant_0005.webp",
    alt: "Civil servant reviewing notes at Kallang Airport",
    isInteractive: false,
    position: {
      right: "26%",
      top: "66%",
      width: "166px",
    },
  },
  {
    id: "kallang-airport-civil-servant-3",
    image: "/npcfigures/civilservant/Civil Servant_0007.webp",
    alt: "Civil servant waiting by the tarmac",
    isInteractive: false,
    position: {
      right: "10%",
      top: "72%",
      width: "160px",
    },
  },
];

const COMMAND_CENTER_NPCS: SceneNpcFigure[] = [
  {
    id: "command-center-ringing-phone",
    image: "/artifacts/hockleebusriots/objects/telephone1-idle.png",
    imageOnChatOpen: "/artifacts/hockleebusriots/objects/telephone1-ringing.png",
    alt: "Ringing desk telephone in the command center",
    className: "npc-figure--priority-chat",
    chatBubbleSpeaker: "Telephone Report",
    chatBubbleTexts: [
      "Ring-ring. Command center? Urgent line from Alexandra Road.",
      "Crowds are spreading beyond the depot. Students are still mixed in and the police line is shifting.",
      "We have injuries but no reliable count yet. Officers and witnesses are contradicting one another.",
      "Rajiv, we need instructions now: reinforcements, ambulances, and what the press is to be told.",
    ],
    autoOpenChatOnLoad: true,
    position: {
      left: "35.5%",
      top: "55.5%",
      width: "60px",
    },
    zIndex: 8,
  },
  {
    id: "command-center-second-phone",
    image: "/artifacts/hockleebusriots/objects/telephone2-idle.png",
    imageOnChatOpen: "/artifacts/hockleebusriots/objects/telephone2-ringing.png",
    alt: "Second desk telephone in the command center",
    className: "npc-figure--priority-chat",
    chatBubbleSpeaker: "Operations Line",
    chatBubbleTexts: [
      "Command center, operations desk. We are receiving conflicting reports from multiple streets now.",
      "Some officers say the crowd is breaking up. Others say smaller groups are reforming further down the road.",
      "If Mr. Marshall wants a statement soon, Rajiv will need to mark clearly what is confirmed and what is only rumor.",
    ],
    position: {
      left: "45%",
      top: "54.2%",
      width: "50px",
    },
    zIndex: 8,
  },
  {
    id: "command-center-radio-bulletin",
    image: "/artifacts/hockleebusriots/objects/radio.png",
    alt: "Transistor radio relaying a live bulletin in the command center",
    chatBubbleSpeaker: "Radio Bulletin",
    chatBubbleText:
      "Radio Malaya bulletin: unrest linked to the Hock Lee dispute continues, and official details are still being verified.",
    npcType: "artifact",
    autoChatCycle: {
      initialDelayMs: 1800,
      firstVisibleMs: 4800,
      hiddenMs: 2200,
      secondVisibleMs: 4200,
    },
    artifactWalkToSideBeforeOpen: "right",
    artifactId: COMMAND_CENTER_RADIO_ARTIFACT.id,
    position: {
      left: "24%",
      top: "48%",
      width: "54px",
    },
    zIndex: 7,
  },
  {
    id: "command-center-david-marshall-south",
    image: "/npcfigures/davidmarshall/David Marshall_South.webp",
    alt: "David Marshall standing on the left side of the command center",
    className: "npc-figure--priority-chat",
    chatBubbleSpeaker: "David Marshall",
    chatBubbleTexts: [
      "Rajiv, separate rumor from report and label both plainly. If we speak carelessly now, we deepen the panic.",
      "I want the police response tracked as closely as the crowd itself. Order is necessary, but disorder in uniform will return to this desk by nightfall.",
      "Keep the lines open. You and the staff brief me with facts, not reassurance. The government cannot afford blindness dressed up as confidence.",
    ],
    position: {
      left: "clamp(806px, calc(12vw + 710px), 880px)",
      top: "clamp(0px, calc(62vh - 30px), calc(100vh - 230px))",
      width: "50%",
    },
    zIndex: 7,
  },
  {
    id: "command-center-civil-servant-right",
    image: "/npcfigures/civilservant/Civil Servant_0005.webp",
    alt: "Civil servant watching the street from the right window in the command center",
    chatBubbleSpeaker: "Civil Servant",
    chatBubbleTexts: [
      "Sir, from the window the crowd looks less frightened than watchful. People are waiting for what happens next.",
      "They keep pointing down the road whenever another vehicle passes. Word is moving faster than our messengers.",
      "Whatever is being decided in here, the street is already reacting to rumors outside.",
    ],
    position: {
      right: "clamp(144px, calc(6vw + 100px), 188px)",
      top: "clamp(0px, 57vh, calc(100vh - 210px))",
      width: "210px",
    },
  },
];

const getScene = (sceneNumber: number) =>
  HOCK_LEE_SCENES.find((candidate) => candidate.sceneNumber === sceneNumber) ??
  HOCK_LEE_SCENES[0];

const buildSceneSubtitle = (sceneNumber: number) => {
  const scene = getScene(sceneNumber);
  return [
    scene.description,
    `Playable characters: ${scene.characters
      .map((character) => CHARACTER_LABELS[character])
      .join(", ")}.`,
    scene.npc ? `NPC: ${scene.npc}.` : null,
    scene.notes ? `Notes: ${scene.notes}.` : null,
  ]
    .filter(Boolean)
    .join(" ");
};

export const buildDefaultSceneConfig = (sceneNumber: number): BaseSceneConfig => {
  const scene = getScene(sceneNumber);

  return {
    sceneTitle: `Scene ${scene.sceneNumber}: ${scene.locationEvent}`,
    sceneSubtitle: buildSceneSubtitle(sceneNumber),
    sceneBackgroundImage:
      sceneNumber === 1
        ? "url(/background/hockleescenes/cityhall.png)"
        : "url(/background/placeholder.png)",
    artifacts: [DEFAULT_PETIR_ARTIFACT],
    npcFigures:
      sceneNumber === 1
        ? [
          CITY_HALL_BRITISH_OFFICER_WEST_NPC,
          CITY_HALL_BRITISH_OFFICER_SOUTH_NPC,
          CITY_HALL_DAVID_MARSHALL_NPC,
        ]
        : undefined,
    mapRoute: "/hock-lee-bus-riots-pixel/map",
  };
};

export type PixelSceneVariantKey =
  | "scene-1-city-hall"
  | "home-civil-servant"
  | "home-bus-worker"
  | "home-chinese-student"
  | "home-bus-worker-return"
  | "home-chinese-student-return"
  | "government-office"
  | "market"
  | "bus-depot"
  | "command-center"
  | "classroom"
  | "negotiation"
  | "alexandra-road"
  | "school-lake"
  | "funeral"
  | "kkhospital"
  | "school-gates"
  | "kallangairport";

export const PIXEL_SCENE_VARIANTS: Record<PixelSceneVariantKey, BaseSceneConfig> = {
  "scene-1-city-hall": {
    ...buildDefaultSceneConfig(1),
    sceneBackgroundImage:
      "linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(/background/hockleescenes/cityhall.png)",
    artifacts: [PARTY_WORKER_MANIFESTO_ARTIFACT],
    npcFigures: [...CITY_HALL_NPCS, CITY_HALL_PARTY_WORKER_ARTIFACT_NPC],
    showArtifacts: false,
    sceneCharacterScaleMultiplier: CITY_HALL_CHARACTER_SCALE,
    characterInitialXOffset: (buildDefaultSceneConfig(1).characterInitialXOffset ?? 0) + 350,
    introGuide: {
      title: "Pro Tip",
      description: "Learn movement and interaction for this story!",
      tips: [
        "Move Rajiv with the Left/Right arrow keys or click on the ground to walk there.",
        "Click characters with chat bubbles to talk or inspect artifacts!",
        "Use the MAP button when you're ready to continue.",
      ],
      dismissLabel: "Ok, got it!",
    },
  },
  market: {
    sceneTitle: "Pre-Riot: Market",
    sceneSubtitle: buildSceneSubtitle(2),
    sceneBackgroundImage: "url(/background/hockleescenes/market.png)",
    artifacts: [STUDENT_RIOT_WOODBLOCK_PRINT_ARTIFACT],
    showArtifacts: false,
    sceneCharacterScaleMultiplier: 1.75,
    npcFigures: [
      MARKET_FISHERMAN_NPC,
      MARKET_ARTIST_NPC,
      MARKET_FOOD_SELLER_EAST_NPC,
      MARKET_DEVAN_NAIR_NPC,
      MARKET_BUS_WORKER_EAST_NPC,
      MARKET_BUS_WORKER_SOUTH_NPC,
      MARKET_BUS_WORKER_WEST_NPC,
    ],
    mapRoute: "/hock-lee-bus-riots-pixel/map",
  },
  "government-office": {
    sceneTitle: "Pre-Riot: Government Office",
    sceneSubtitle: buildSceneSubtitle(4),
    sceneBackgroundImage: "url(/background/hockleescenes/governmentoffice.png)",
    artifacts: [GOVERNMENT_OFFICE_PIPES_ARTIFACT],
    showArtifacts: false,
    sceneCharacterZIndex: 20,
    sceneCharacterScaleMultiplier: 2,
    npcFigures: GOVERNMENT_OFFICE_NPCS,
    mapRoute: "/hock-lee-bus-riots-pixel/map",
  },
  "bus-depot": {
    sceneTitle: "Riot: Bus Depot",
    sceneSubtitle: buildSceneSubtitle(5),
    sceneBackgroundImage: "url(/background/hockleescenes/busdepot.png)",
    characterName: "",
    artifacts: [DEFAULT_PETIR_ARTIFACT],
    showArtifacts: false,
    sceneCharacterScaleMultiplier: 1.43,
    characterScaleMultiplier: 0.33,
    characterInitialYOffset: -80,
    npcFigures: BUS_DEPOT_NPCS,
    npcTransitions: [
      {
        triggerNpcId: "bus-depot-feng-swee-suan-east-south",
        nextNpcFigures: BUS_DEPOT_GATE_NPCS,
      },
      {
        triggerNpcId: "bus-depot-feng-swee-suan-gate",
        nextNpcFigures: BUS_DEPOT_GATE_WITH_POLICE_NPCS,
      },
    ],
    npcPositionTransitionMs: 700,
    mapRoute: "/hock-lee-bus-riots-pixel/map",
  },
  "command-center": {
    sceneTitle: "Riot: Command Center",
    sceneSubtitle: "Officials track reports and coordinate the response as unrest spreads across the city.",
    sceneBackgroundImage: "url(/background/hockleescenes/commandcenter.png)",
    artifacts: [COMMAND_CENTER_RADIO_ARTIFACT],
    showArtifacts: false,
    npcFigures: COMMAND_CENTER_NPCS,
    sceneCharacterZIndex: 12,
    sceneCharacterScaleMultiplier: 2.5,
    characterInitialXRatio: 0.44,
    characterInitialYRatio: 0.75,
    characterInitialYOffset: -50,
    mapRoute: "/hock-lee-bus-riots-pixel/map",
  },
  classroom: {
    sceneTitle: "Riot: Classroom",
    sceneSubtitle: buildSceneSubtitle(16),
    sceneBackgroundImage: "url(/background/hockleescenes/classroom.png)",
    artifacts: [DEFAULT_PETIR_ARTIFACT],
    showArtifacts: false,
    mapRoute: "/hock-lee-bus-riots-pixel/map",
  },
  negotiation: {
    sceneTitle: "Riot: Negotiation Hall",
    sceneSubtitle: buildSceneSubtitle(11),
    sceneBackgroundImage: "url(/background/hockleescenes/negotiation.png)",
    artifacts: [DEFAULT_PETIR_ARTIFACT],
    showArtifacts: false,
    sceneCharacterScaleMultiplier: 1.75,
    npcFigures: NEGOTIATION_NPCS,
    mapRoute: "/hock-lee-bus-riots-pixel/map",
  },
  "alexandra-road": {
    sceneTitle: "Riot: Alexandra Road",
    sceneSubtitle: buildSceneSubtitle(8),
    sceneBackgroundImage: "url(/background/hockleescenes/alexandra-road.png)",
    artifacts: [DEFAULT_PETIR_ARTIFACT],
    showArtifacts: false,
    sceneAnimatedElements: ALEXANDRA_ROAD_FIRE_ELEMENTS,
    npcFigures: ALEXANDRA_ROAD_NPCS,
    mapRoute: "/hock-lee-bus-riots-pixel/cutscenes/post-riot-cutscene",
  },
  "school-lake": {
    sceneTitle: "Riot: School Lake",
    sceneSubtitle: buildSceneSubtitle(15),
    sceneBackgroundImage: "url(/background/hockleescenes/schoollake.png)",
    artifacts: [DEFAULT_PETIR_ARTIFACT],
    showArtifacts: false,
    npcFigures: ALEXANDRA_ROAD_STUDENT_UNION_NPCS,
    mapRoute: "/hock-lee-bus-riots-pixel/map",
  },
  funeral: {
    sceneTitle: "Post-Riot: Funeral",
    sceneSubtitle: buildSceneSubtitle(10),
    sceneBackgroundImage: "url(/background/hockleescenes/funeral.png)",
    artifacts: [DEFAULT_PETIR_ARTIFACT],
    mapRoute: "/hock-lee-bus-riots-pixel/map",
  },
  kkhospital: {
    sceneTitle: "Post-Riot: KK Hospital",
    sceneSubtitle: buildSceneSubtitle(12),
    sceneBackgroundImage: "url(/background/hockleescenes/kkhospital.png)",
    artifacts: [DEFAULT_PETIR_ARTIFACT],
    mapRoute: "/hock-lee-bus-riots-pixel/map",
  },
  "school-gates": {
    sceneTitle: "Post-Riot: School Gates",
    sceneSubtitle: buildSceneSubtitle(17),
    sceneBackgroundImage: "url(/background/hockleescenes/schoolgates.png)",
    artifacts: [DEFAULT_PETIR_ARTIFACT],
    showArtifacts: false,
    mapRoute: "/hock-lee-bus-riots-pixel/map",
  },
  kallangairport: {
    sceneTitle: "Post-Riot: Kallang Airport",
    sceneSubtitle: buildSceneSubtitle(13),
    sceneBackgroundImage: "url(/background/hockleescenes/kallangairport.png)",
    artifacts: [DEFAULT_PETIR_ARTIFACT],
    showArtifacts: false,
    npcFigures: KALLANG_AIRPORT_NPCS,
    mapRoute: "/hock-lee-bus-riots-pixel/cutscenes/outro-cutscene",
  },
  "home-civil-servant": {
    sceneTitle: "Pre-Riot: Home of a Civil Servant",
    sceneSubtitle:
      "At home after work, the civil servant reviews reports on living costs and labor tensions before deciding what to brief next.",
    sceneBackgroundImage: "url(/background/hockleescenes/home-civil-servant.png)",
    artifacts: [HOME_CIVIL_SERVANT_ARTIFACT],
    showArtifacts: false,
    npcFigures: [HOME_CIVIL_SERVANT_WIFE_NPC],
    characterScaleMultiplier: 0.935,
    characterInitialYRatio: 0.58,
    characterInitialYOffset: 98,
    mapRoute: "/hock-lee-bus-riots-pixel/cutscenes/riot-cutscene",
  },
  "home-bus-worker": {
    sceneTitle: "Pre-Riot: Home",
    sceneSubtitle:
      "A cramped home interior where labour unrest becomes a family argument about pay, risk, and dignity.",
    sceneBackgroundImage: "url(/background/hockleescenes/home-civil-servant.png)",
    artifacts: [HOME_CIVIL_SERVANT_ARTIFACT],
    showArtifacts: false,
    characterScaleMultiplier: 0.935,
    characterInitialYRatio: 0.58,
    characterInitialYOffset: 98,
    mapRoute: "/hock-lee-bus-riots-pixel/cutscenes/riot-cutscene",
  },
  "home-chinese-student": {
    sceneTitle: "Pre-Riot: Home",
    sceneSubtitle:
      "Parents urge caution while the student quietly decides whether school can stay separate from the conflict outside.",
    sceneBackgroundImage: "url(/background/hockleescenes/home-civil-servant.png)",
    artifacts: [HOME_CIVIL_SERVANT_ARTIFACT],
    showArtifacts: false,
    characterScaleMultiplier: 0.935,
    characterInitialYRatio: 0.58,
    characterInitialYOffset: 98,
    mapRoute: "/hock-lee-bus-riots-pixel/cutscenes/riot-cutscene",
  },
  "home-bus-worker-return": {
    sceneTitle: "Post-Riot: Home",
    sceneSubtitle:
      "The worker returns home bruised and alive, but the room is still full of uncertainty about what the strike achieved.",
    sceneBackgroundImage: "url(/background/hockleescenes/home-civil-servant.png)",
    artifacts: [HOME_CIVIL_SERVANT_ARTIFACT],
    showArtifacts: false,
    characterScaleMultiplier: 0.935,
    characterInitialYRatio: 0.58,
    characterInitialYOffset: 98,
    mapRoute: "/hock-lee-bus-riots-pixel/cutscenes/outro-cutscene",
  },
  "home-chinese-student-return": {
    sceneTitle: "Post-Riot: Home",
    sceneSubtitle:
      "Headlines, parental fear, and silence leave the student to reckon with an identity that no longer feels innocent.",
    sceneBackgroundImage: "url(/background/hockleescenes/home-civil-servant.png)",
    artifacts: [HOME_CIVIL_SERVANT_ARTIFACT],
    showArtifacts: false,
    characterScaleMultiplier: 0.935,
    characterInitialYRatio: 0.58,
    characterInitialYOffset: 98,
    mapRoute: "/hock-lee-bus-riots-pixel/cutscenes/outro-cutscene",
  },
};
