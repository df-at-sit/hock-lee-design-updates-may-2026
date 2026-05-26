import type {
  BaseSceneConfig,
  SceneAnimatedElement,
  SceneArtifact,
  SceneNpcFigure,
  SceneSideQuest,
} from "./base-scene-shell";
import type { CharacterCode } from "./scenes";
import {
  buildRoleAwareRoute,
  CHARACTER_PRESENTATIONS,
  getExitRouteForStepIndex,
  getStoryStepByRoute,
  getStoryStepIndexByRoute,
  resolveCharacterCode,
  SELECTED_CHARACTER_STORAGE_KEY,
} from "./story-data";
import {
  ALEXANDRA_ROAD_ROUTE,
  BUS_DEPOT_ROUTE,
  CITY_HALL_ROUTE,
  COMMAND_CENTER_ROUTE,
  FUNERAL_ROUTE,
  GOVERNMENT_OFFICE_ROUTE,
  HOCK_LEE_MAP_ROUTE,
  MARKET_ROUTE,
  NEGOTIATION_ROUTE,
  KK_HOSPITAL_ROUTE,
  OUTRO_CUTSCENE_ROUTE,
  SCHOOL_LAKE_ROUTE,
  STUDENT_ESCALATION_CUTSCENE_ROUTE,
  STUDENT_SUPPORT_CUTSCENE_ROUTE,
} from "./story-paths";
import {
  STUDENT_HUNGRY_BUS_WORKERS_ACTIONS,
  STUDENT_HUNGRY_BUS_WORKERS_SIDE_QUEST_ID,
} from "./sidequest-state";

const buildSiblingWalkingFrames = (
  folder: "Left to Right" | "Right to Left",
  prefix: "Ong Kim Wah_Left_to_Right" | "Ong Kim Wah_Right_to_Left"
): SceneAnimatedElement["frames"] =>
  Array.from({ length: 8 }, (_, index) => {
    const frameNumber = String(index + 1).padStart(4, "0");
    return `/npcfigures/sibling/Walking/${encodeURIComponent(folder)}/${encodeURIComponent(
      `${prefix}_${frameNumber}.webp`
    )}`;
  }) as SceneAnimatedElement["frames"];

const COMMAND_CENTER_DAVID_ID = "command-center-david-marshall-south";
const NPC_BEHIND_DESK_CLASS = "npc-figure--behind-desk";
const FUNERAL_CIV_HIDDEN_NPC_IDS = new Set([
  "funeral-police-back-left",
  "funeral-police-back-right",
]);
const FUNERAL_CS_HIDDEN_NPC_IDS = new Set([
  "funeral-civil-servant-left",
  "funeral-civil-servant-center-right",
  "funeral-civil-servant-right",
]);
const FUNERAL_CS_ENTRY_CHAT: NonNullable<BaseSceneConfig["characterEntryChat"]> = {
  text: "He was only sixteen. Standing at Chong Lon Chong's funeral, I cannot pretend Alexandra Road was only noise and slogans.",
};
const FUNERAL_CS_STUDENT_WIDTH = "250px";
const FUNERAL_CS_STUDENT_NPCS: SceneNpcFigure[] = [
  {
    id: "funeral-student-mourner-left",
    image: "/npcfigures/Middle School Students/Students_0007.webp",
    alt: "Student mourner standing quietly on the left side of Chong Lon Chong's funeral",
    npcType: "non-interactive",
    position: {
      left: "8%",
      top: "58%",
      width: FUNERAL_CS_STUDENT_WIDTH,
    },
  },
  {
    id: "funeral-student-classmate-left",
    image: "/npcfigures/Middle School Students/Student_East.webp",
    alt: "Student classmate facing the funeral altar from the left side",
    chatBubbleSpeaker: "Schoolmate",
    chatBubbleTexts: [
      "Chong Lon Chong was only sixteen. Yesterday people were still arguing about the strike; today we are here for a fellow student.",
      "Students from different schools have come with white flowers because once one boy dies in a crowd like that, every classroom starts imagining it could have been one of their own.",
    ],
    dialogueChoices: [
      {
        id: "funeral-student-why-come",
        label: "Ask why so many students came to mourn.",
        playerText:
          "I expected family and union men. I did not expect so many students.",
        npcReply:
          "Because he was one of us. Hock Lee no longer feels like a dispute we visited for a day. It follows us back to our desks, our assemblies, and our homes.",
      },
      {
        id: "funeral-student-school-memory",
        label: "Say school will never talk about the riot the same way again.",
        playerText:
          "After this, nobody at school can speak about Alexandra Road as if it were only rumours.",
        npcReply:
          "Exactly. Teachers may talk about discipline, but students will remember the coffin first. That memory will outlast any official explanation.",
      },
      {
        id: "funeral-student-fear",
        label: "Admit the altar makes the violence feel personal.",
        playerText:
          "At Alexandra Road I kept thinking about the crowd. Here I can only think about the boy who did not come home.",
        npcReply:
          "That is what changes people. Once the dead have a face, even the brave ones start measuring politics against mothers, classmates, and empty seats.",
      },
    ],
    position: {
      left: "18%",
      top: "64%",
      width: FUNERAL_CS_STUDENT_WIDTH,
    },
  },
  {
    id: "funeral-student-mourner-right",
    image: "/npcfigures/Middle School Students/Student_West.webp",
    alt: "Student mourner facing the funeral altar from the right side",
    npcType: "non-interactive",
    position: {
      right: "18%",
      top: "64%",
      width: FUNERAL_CS_STUDENT_WIDTH,
    },
  },
  {
    id: "funeral-student-mourner-far-right",
    image: "/npcfigures/Middle School Students/Students_0006.webp",
    alt: "Student mourner standing quietly on the right side of Chong Lon Chong's funeral",
    npcType: "non-interactive",
    position: {
      right: "8%",
      top: "58%",
      width: FUNERAL_CS_STUDENT_WIDTH,
    },
  },
];
const CITY_HALL_BW_MANIFESTO_ARTIFACT: SceneArtifact = {
  id: "labour-front-manifesto",
  title: "Labour Front Manifesto",
  image: "/artifacts/hockleebusriots/objects/labourpartymanifesto.png",
  alt: "Labour Front manifesto leaflet",
  description:
    "For a bus worker, this manifesto is more than election paper. Once Labour Front takes office, its promises can be measured against wages, dismissals, union tensions, and whether the new government listens when Hock Lee turns into a real dispute.",
  details:
    "Labour Front won the 2 April 1955 election and soon formed the new government under David Marshall. That changes how this leaflet is read: workers can now judge it as a public promise about fair treatment, living costs, and political responsibility rather than as campaign language meant only to win votes.",
  didYouKnow:
    "David Marshall became Singapore's first Chief Minister on 6 April 1955, only weeks before the Hock Lee Bus Riots turned labour unrest into a major political test for the new administration.",
  inventoryIndex: 1,
  position: {
    left: "32%",
    top: "65%",
    width: "180px",
  },
  chat: {
    master1:
      "From the depot, this manifesto feels like a promise workers can compare against wages, unfair treatment, and what the government does once conflict begins.",
    user1: "What part matters most to bus workers now?",
    master2:
      "Anything about fair treatment, the cost of living, and whether the government listens before anger reaches the depot gates.",
  },
  rootsUrl: "https://www.roots.gov.sg/Collection-Landing/listing/1223724",
};
const CITY_HALL_BW_ARTIFACTS: [SceneArtifact] = [CITY_HALL_BW_MANIFESTO_ARTIFACT];
const GOVERNMENT_OFFICE_CIV_TYPEWRITER_ARTIFACT: SceneArtifact = {
  id: "government-office-civil-servant-typewriter",
  title: "Office Typewriter",
  image: "/artifacts/hockleebusriots/objects/Civil Servant_Office_typewriter.png",
  alt: "Typewriter resting on the government office desk",
  description:
    "A desk typewriter turns tense conversations into drafts, minutes, and official records.",
  details:
    "For a civil servant, office machinery like this is part of how a meeting becomes paperwork and paperwork becomes action.",
  didYouKnow:
    "Before digital editing, revising official documents often meant retyping entire sections after handwritten corrections.",
  inventoryIndex: 1,
  position: {
    left: "clamp(40px, calc(54.5% + 400px - 610px), calc(100vw - 128px))",
    top: "43.5%",
    width: "88px",
    transform: "translateX(-50%)",
  },
  chat: {
    master1:
      "A typewriter belongs in a room like this. It is how arguments in the air start becoming records on paper.",
    user1: "Why add it to Rajiv's version of the office?",
    master2:
      "Because a civil servant experiences the room through paperwork too. Notes, drafts, and minutes can outlast the meeting itself.",
  },
  rootsUrl: "https://www.roots.gov.sg/Collection-Landing/listing/1106276",
};
const GOVERNMENT_OFFICE_CIV_TYPEWRITER_NPC: SceneNpcFigure = {
  id: "government-office-civil-servant-typewriter-object",
  image: GOVERNMENT_OFFICE_CIV_TYPEWRITER_ARTIFACT.image,
  alt: GOVERNMENT_OFFICE_CIV_TYPEWRITER_ARTIFACT.alt,
  npcType: "artifact",
  interactionPromptIcon: "artifact",
  artifactId: GOVERNMENT_OFFICE_CIV_TYPEWRITER_ARTIFACT.id,
  chatBubbleText:
    "The typewriter sits ready to turn this meeting's tension into formal notes.",
  position: {
    left: "clamp(40px, calc(54.5% + 400px - 510px), calc(100vw - 128px))",
    top: "46.5%",
    width: "88px",
    transform: "translateX(-50%)",
  },
  zIndex: 9,
};
const CITY_HALL_CIV_INTRO_GUIDE: NonNullable<BaseSceneConfig["introGuide"]> = {
  title: "Pro Tip",
  description:
    "Walk around each scene, listen to different people, and move on when you are ready.",
  tips: [
    "Move with the Left and Right arrow keys, or click on the ground to walk.",
    "Talk to people with chat bubbles and inspect objects when they appear.",
    "Use MAP when you are ready to go to the next place.",
  ],
  dismissLabel: "Start Exploring",
};
const CITY_HALL_BW_INTRO_GUIDE: NonNullable<BaseSceneConfig["introGuide"]> = {
  title: "Pro Tip",
  description:
    "Walk around each scene, listen to different people, and move on when you are ready.",
  tips: [
    "Move with the Left and Right arrow keys, or click on the ground to walk.",
    "Talk to people with chat bubbles and inspect objects when they appear.",
    "Use MAP when you are ready to go to the next place.",
  ],
  dismissLabel: "Start Exploring",
};
const CITY_HALL_CS_ENTRY_CHAT: NonNullable<BaseSceneConfig["characterEntryChat"]> = {
  text: "So Labour Front really won. Everyone here is talking as if the news has only just become real.",
};
const CITY_HALL_FIRST_STEP_ONBOARDING: NonNullable<BaseSceneConfig["onboarding"]> = {
  title: "Tutorial",
  description:
    "Learn the main interaction points in City Hall, then begin exploring on your own.",
  dismissLabel: "Start Exploring",
  callouts: [
    {
      id: "city-hall-chat-npc-open",
      text: "Click David Marshall to start the conversation",
      target: {
        type: "npc-open",
        npcId: "city-hall-david-marshall",
      },
      direction: "down",
    },
    {
      id: "city-hall-chat-npc-finish",
      text: "Keep clicking David Marshall until the chat icon changes",
      renderAboveNpcBubble: true,
      target: {
        type: "npc-finish",
        npcId: "city-hall-david-marshall",
      },
      direction: "down",
    },
    {
      id: "city-hall-artifact-npc-open",
      text: "Click the party worker to open the artifact dialogue",
      target: {
        type: "npc-open",
        npcId: "city-hall-party-worker-manifesto",
      },
      direction: "down",
    },
    {
      id: "city-hall-artifact-look-closer",
      text: "Click Look closer to inspect the artifact",
      target: {
        type: "artifact-look-closer",
        artifactId: CITY_HALL_BW_MANIFESTO_ARTIFACT.id,
      },
      direction: "down",
    },
    {
      id: "city-hall-artifact-close",
      text: "Use the close button to return to the scene",
      target: {
        type: "artifact-close",
        artifactId: CITY_HALL_BW_MANIFESTO_ARTIFACT.id,
      },
      direction: "left",
    },
    {
      id: "city-hall-camera-open",
      text: "Open the camera for the real photo",
      target: {
        type: "camera-open",
      },
      direction: "left",
    },
    {
      id: "city-hall-camera-close",
      text: "Close the photo to return to the scene",
      target: {
        type: "camera-close",
      },
      direction: "right",
    },
    {
      id: "city-hall-disposition-radar",
      text: "Wondering what this is?",
      description:
        "These bars start balanced, then shift as you talk to people and inspect objects. Longer bars mean stronger Awareness, Curiosity, or Empathy. Click the bars to continue.",
      target: {
        type: "disposition-radar",
      },
      direction: "right",
    },
    {
      id: "city-hall-menu-help",
      text: "Open menu or revisit help here",
      target: {
        type: "menu-help",
      },
      direction: "down",
    },
    {
      id: "city-hall-map",
      text: "Use MAP when you are ready to continue",
      target: {
        type: "map",
      },
      direction: "down",
    },
  ],
};
const CITY_HALL_BW_NPC_OVERRIDES: Record<string, Partial<SceneNpcFigure>> = {
  "city-hall-david-marshall": {
    chatBubbleTexts: [
      "Get me clearer facts on conditions, union complaints, and how Hock Lee is treating its workers. We cannot afford to meet our first labour dispute with guesswork.",
      "If bus workers think this government listens to the company first, anger will spread far beyond one depot.",
      "Find out whether management intends to bargain or simply delay until tempers harden.",
    ],
    autoOpenChatOnLoad: false,
  },
  "city-hall-british-officer-south": {
    chatBubbleTexts: [
      "A bus dispute is never just about buses. Communist groups can use it to spread influence across Singapore.",
      "They know workers are frustrated, so they step in and turn anger into politics.",
      "If City Hall moves too slowly, communists will use that frustration to win more support.",
    ],
  },
  "city-hall-british-officer-west": {
    chatBubbleTexts: [
      "The real worry is communist influence in Singapore. They are active in unions, schools, and street politics.",
      "When people feel ignored, communist organisers have an easier time pulling them to their side.",
      "That is why Hock Lee matters. A labour dispute can quickly become part of a bigger communist campaign.",
    ],
  },
  "city-hall-party-worker-manifesto": {
    chatBubbleTexts: [
      "You look like you've come from the bus lines. Take the manifesto and see what the new government promised.",
    ],
    autoChatCycle: undefined,
  },
};
const CITY_HALL_CS_NPC_OVERRIDES: Record<string, Partial<SceneNpcFigure>> = {
  "city-hall-david-marshall": {
    chatBubbleTexts: [
      "Yes, the result is in. Labour Front has won, and by tomorrow people will ask what that victory means beyond the cheering.",
      "If you are a student listening from the crowd, remember this: elections do not end politics. They decide who must answer the public next.",
      "Watch Hock Lee closely. A bus dispute after an election can teach you faster than any civics lesson how power is tested.",
      "Do not remember only that we won. Remember what workers, families, and schools will now expect from us.",
    ],
  },
  "city-hall-british-officer-south": {
    chatBubbleTexts: [
      "Labour Front may have won, but communist influence in Singapore has not gone away.",
      "Bus workers are angry, and communist groups know how to turn that anger into support.",
      "If the new government cannot calm things quickly, communists will say only they truly understand the workers.",
    ],
  },
  "city-hall-british-officer-west": {
    chatBubbleTexts: [
      "Do not look only at the election result. Look at how communist groups are trying to shape events in Singapore.",
      "They are strongest where people already feel disappointed, especially in unions and Chinese schools.",
      "If ordinary people feel let down next week, communists will use that to grow stronger.",
    ],
  },
  "city-hall-party-worker-manifesto": {
    chatBubbleTexts: [
      "First time hearing the result? Labour Front has won. Read the manifesto and see what people now expect this new government to do.",
    ],
    autoChatCycle: undefined,
  },
};
const NEGOTIATION_BW_HIDDEN_NPC_IDS = new Set([
  "negotiation-bus-worker-back-1-south",
  "negotiation-bus-worker-back-2-south",
]);
const NEGOTIATION_BW_NPC_OVERRIDES: Record<string, Partial<SceneNpcFigure>> = {
  "negotiation-lee-kuan-yew-south": {
    position: {
      left: "5%",
      top: "calc(85% - 150px)",
      width: "136px",
    },
  },
  "negotiation-feng-swee-suan-south": {
    position: {
      left: "20%",
      top: "calc(85% - 150px)",
      width: "136px",
    },
  },
};
const MARKET_CS_ENTRY_CHAT: NonNullable<BaseSceneConfig["characterEntryChat"]> = {
  text: "I should get the fish before I head home. Everyone at school seems to be talking about Hock Lee now.",
};
const MARKET_CS_NPC_OVERRIDES: Record<string, Partial<SceneNpcFigure>> = {
  "market-food-seller-east": {
    chatBubbleTexts: [
      "Customers complain my noodles cost more now, but charcoal, oil, and ingredients all cost more too.",
    ],
    chatBubbleActions: [
      {
        label: "Fill Tingkat",
        sideQuestId: STUDENT_HUNGRY_BUS_WORKERS_SIDE_QUEST_ID,
        actionId: STUDENT_HUNGRY_BUS_WORKERS_ACTIONS.getFood,
        requiredCompletedActionIds: [
          STUDENT_HUNGRY_BUS_WORKERS_ACTIONS.findTingkat,
        ],
        availableText:
          "You found a tingkat for the depot? Give it here. I can pack rice, vegetables, and something warm for the men.",
        completedText:
          "The tingkat is packed. Take it back to the bus worker before the food cools.",
        openQuestAfterComplete: true,
      },
    ],
  },
};
const SCHOOL_LAKE_SIBLING_NPC_ID = "school-lake-sibling";
const SCHOOL_LAKE_REPLACED_NPC_ID = "school-lake-student-6";
const SCHOOL_LAKE_SIBLING_ENTRY_DELAY_MS = 5000;
const SCHOOL_LAKE_SIBLING_ANIMATION_DURATION_MS = 1800;
const SCHOOL_LAKE_SIBLING_AUTO_OPEN_DELAY_MS =
  SCHOOL_LAKE_SIBLING_ENTRY_DELAY_MS + SCHOOL_LAKE_SIBLING_ANIMATION_DURATION_MS;
const SCHOOL_LAKE_ORGANIZER_NPC_ID = "school-lake-organizer-left";
const SCHOOL_LAKE_SIBLING_WIDTH_PX = 280;
const SCHOOL_LAKE_SIBLING_LEFT = `calc(50% - ${SCHOOL_LAKE_SIBLING_WIDTH_PX / 2}px)`;
const SCHOOL_LAKE_SIBLING_WIDTH = `${SCHOOL_LAKE_SIBLING_WIDTH_PX}px`;
const SCHOOL_LAKE_STUDENT_INTERACTION_HOTSPOT: NonNullable<
  SceneNpcFigure["interactionHotspotStyle"]
> = {
  top: "8%",
  left: "28%",
  width: "44%",
  height: "90%",
  transform: "none",
};
const SCHOOL_LAKE_SIBLING_INTERACTION_HOTSPOT: NonNullable<
  SceneNpcFigure["interactionHotspotStyle"]
> = {
  top: "4%",
  left: "25%",
  width: "50%",
  height: "92%",
  transform: "none",
};
const SCHOOL_LAKE_SIBLING_NPC: SceneNpcFigure = {
  id: SCHOOL_LAKE_SIBLING_NPC_ID,
  image: "/npcfigures/sibling/BW Sibling_0001.webp",
  imageOnChatOpen: "/npcfigures/sibling/BW Sibling_0001.webp",
  alt: "Ong Kim Wah arriving at the school lake gathering",
  chatBubbleSpeaker: "Ong Kim Wah",
  chatBubbleTexts: [
    "Kim Chuan, things at Hock Lee have changed. After the dismissals, the workers are blocking the buses from leaving.",
    "Students are arguing about it all over school. Some want to support the workers. Others think the crowds are making things worse.",
    "If you go, listen carefully. Everyone is telling the story differently.",
  ],
  autoOpenChatOnLoad: true,
  autoOpenDelayMs: SCHOOL_LAKE_SIBLING_AUTO_OPEN_DELAY_MS,
  autoAdvanceChatOnLoad: true,
  interactionHotspotStyle: SCHOOL_LAKE_SIBLING_INTERACTION_HOTSPOT,
  className: "hl-school-lake-sibling-final npc-figure--priority-chat",
  position: {
    left: SCHOOL_LAKE_SIBLING_LEFT,
    top: "56%",
    width: SCHOOL_LAKE_SIBLING_WIDTH,
  },
  zIndex: 8,
};
const SCHOOL_LAKE_SIBLING_WALK_IN: SceneAnimatedElement = {
  id: "school-lake-sibling-walk-in",
  frames: buildSiblingWalkingFrames("Right to Left", "Ong Kim Wah_Right_to_Left"),
  alt: "Ong Kim Wah walking into the school lake gathering",
  className: "hl-school-lake-sibling-walk-in",
  position: {
    left: SCHOOL_LAKE_SIBLING_LEFT,
    top: "56%",
    width: SCHOOL_LAKE_SIBLING_WIDTH,
  },
  zIndex: 8,
};
const SCHOOL_LAKE_CS_NPC_OVERRIDES: Record<string, Partial<SceneNpcFigure>> = {
  [SCHOOL_LAKE_ORGANIZER_NPC_ID]: {
    chatBubbleTexts: [
      "Kim Wah just came from Hock Lee. The workers are still holding the depot.",
      "Now the students on the left are asking whether we should go there to support the workers and show solidarity.",
      "Some want to go at once with food and numbers. Others think students may make the situation worse.",
      "Go talk to them. Decide what support and solidarity should look like.",
    ],
    autoOpenDelayMs: SCHOOL_LAKE_SIBLING_AUTO_OPEN_DELAY_MS,
    interactionHotspotStyle: SCHOOL_LAKE_STUDENT_INTERACTION_HOTSPOT,
  },
  "school-lake-monitor-right": {
    chatBubbleTexts: [
      "The students on the right are trying to understand why the riots are happening.",
      "Some point to the dismissals. Others say anger over low pay, pressure, and police action has been building for some time.",
    ],
    interactionHotspotStyle: SCHOOL_LAKE_STUDENT_INTERACTION_HOTSPOT,
  },
};
const BUS_DEPOT_CS_POLICE_STAGE_TRIGGER_NPC_ID = "bus-depot-feng-swee-suan-gate";
const BUS_DEPOT_CS_SUPPORT_WIDTH = "156px";
const BUS_DEPOT_CS_SUPPORT_SCALE = 132 / 156;
const BUS_DEPOT_BW_SUPPORT_WIDTH = "132px";
const BUS_DEPOT_BW_SUPPORT_TOP = "calc(69% - 200px)";
const BUS_DEPOT_BW_SUPPORT_SCALE = 0.8;
const BUS_DEPOT_BW_EASTER_EGG_REFERENCE: BaseSceneConfig["easterEggReference"] = {
  title: "Easter Egg: From Hock Lee to SBS",
  description:
    "Hock Lee did not remain a standalone bus company. It became part of the merger trail that led to Singapore Bus Service (SBS) in 1973.",
  caption:
    "The depot bus in this scene belongs to a company that was later folded into much larger bus mergers across Singapore.",
  extraContent: {
    eyebrow: "Bus company merger trail",
    panels: [
      {
        title: "1951",
        body:
          "Hock Lee Amalgamated Bus Company was formed from the merger of Ngo Hock Motor Bus Company and Soon Lee Bus Company.",
      },
      {
        title: "1971",
        body:
          "Hock Lee, Keppel Bus and Kampong Bahru merged to form Amalgamated Bus Company.",
      },
      {
        title: "1973",
        body:
          "Amalgamated, Associated and United bus companies merged to form Singapore Bus Service (SBS).",
      },
    ],
    footer:
      "That makes Hock Lee one of the earlier companies in the merger chain behind SBS.",
  },
};
const prependBusDepotBwStudentSupport = (npcFigures: SceneNpcFigure[]) => [
  ...BUS_DEPOT_BW_STUDENT_SUPPORT_NPCS,
  ...npcFigures,
];
const prependBusDepotStudentSupport = (npcFigures: SceneNpcFigure[]) => [
  ...BUS_DEPOT_CS_STUDENT_SUPPORT_NPCS,
  ...npcFigures,
];
const BUS_DEPOT_BW_STUDENT_SUPPORT_NPCS: SceneNpcFigure[] = [
  {
    id: "bus-depot-bw-student-support-volunteer",
    image: "/npcfigures/Middle School Students/Student_East.webp",
    alt: "Student volunteer hurrying in from the left side of the bus depot",
    chatBubbleSpeaker: "Student Volunteer",
    chatBubbleTexts: [
      "We brought bread, tea, and a little money. The men should not have to choose between holding the gate and eating tonight.",
    ],
    dialogueChoices: [
      {
        id: "why-students-came",
        label: "Ask why students came to a bus depot dispute.",
        playerText:
          "This began as a fight between workers and management. Why did students come all the way here for it?",
        npcReply:
          "Because once 229 workers are dismissed and buses are trapped behind the gate, it stops feeling like a private quarrel. Families, schools, and whole neighbourhoods start talking about the same fear.",
      },
      {
        id: "workers-need-most",
        label: "Ask what the workers need most right now.",
        playerText:
          "If you want to help, what do you think the men here need most?",
        npcReply:
          "Food first, then numbers. A hungry strike is easier to break, and a hidden strike is easier to ignore. We want the workers to feel the city can see them before the police decide the story for everyone.",
      },
      {
        id: "police-risk",
        label: "Warn that the police are already watching.",
        playerText:
          "The police are already studying this crowd. You know the risk in staying, don't you?",
        npcReply:
          "We do. That is why we came carrying food, not bravado. If fear alone clears the gate, the company learns it never had to answer the workers properly.",
      },
    ],
    className: "hl-bus-depot-bw-student-support-enter hl-bus-depot-bw-student-support-enter--lead",
    position: {
      left: "5%",
      top: BUS_DEPOT_BW_SUPPORT_TOP,
      width: BUS_DEPOT_BW_SUPPORT_WIDTH,
    },
    scaleMultiplier: BUS_DEPOT_BW_SUPPORT_SCALE,
    zIndex: 14,
  },
  {
    id: "bus-depot-bw-student-support-singer",
    image: "/npcfigures/Middle School Students/Student_South.webp",
    alt: "Student supporter arriving from the left side of the bus depot",
    chatBubbleSpeaker: "Student Supporter",
    chatBubbleTexts: [
      "We brought song sheets too. If the men are made to stand here in public, then support should be public as well.",
    ],
    dialogueChoices: [
      {
        id: "why-songs-matter",
        label: "Ask what the songs are meant to do.",
        playerText:
          "Food I understand. What are the songs supposed to change here?",
        npcReply:
          "They steady the crowd and make the strike feel less lonely. A song cannot settle a labour dispute, but it can remind tired workers that people beyond the depot gates are willing to stand beside them.",
      },
      {
        id: "student-view-strike",
        label: "Ask how students see the strike.",
        playerText:
          "What do students think they are looking at when they come here?",
        npcReply:
          "Some speak about justice, some about politics, but most recognise the same pressure in rising prices, family wages, and how quickly authority dismisses people who are already struggling.",
      },
      {
        id: "workers-fear-for-students",
        label: "Say the workers do not want students hurt.",
        playerText:
          "The men are grateful, but none of us wants students caught when this turns rough.",
        npcReply:
          "We hear that. But if every warning sends us home at once, support becomes something people promise only from a safe distance. We would rather stand carefully than pretend this struggle belongs to somebody else.",
      },
    ],
    className:
      "hl-bus-depot-bw-student-support-enter hl-bus-depot-bw-student-support-enter--second",
    position: {
      left: "14%",
      top: BUS_DEPOT_BW_SUPPORT_TOP,
      width: BUS_DEPOT_BW_SUPPORT_WIDTH,
    },
    scaleMultiplier: BUS_DEPOT_BW_SUPPORT_SCALE,
    zIndex: 13,
  },
];
const BUS_DEPOT_CS_STUDENT_SUPPORT_NPCS: SceneNpcFigure[] = [
  {
    id: "bus-depot-student-support-volunteer",
    image: "/npcfigures/Middle School Students/Student_East.webp",
    alt: "Student volunteer arriving with food on the left side of the bus depot",
    chatBubbleSpeaker: "Student Volunteer",
    chatBubbleTexts: [
      "We have brought food! Pass the bread and tea forward before the workers miss another meal.",
      "More students are coming from the schools. If the company wanted this quarrel hidden, it is too late for that now.",
      "Even with the police already here, we stay together. The men at the gate should see support, not fear.",
    ],
    autoChatCycle: {
      initialDelayMs: 1200,
      firstVisibleMs: 3000,
      hiddenMs: 1800,
      secondVisibleMs: 2800,
    },
    position: {
      left: "5%",
      top: "69%",
      width: BUS_DEPOT_CS_SUPPORT_WIDTH,
      transform: `translateY(-200px) scale(${BUS_DEPOT_CS_SUPPORT_SCALE})`,
    },
    zIndex: 14,
  },
  {
    id: "bus-depot-student-support-singer",
    image: "/npcfigures/Middle School Students/Student_South.webp",
    alt: "Student supporter rallying classmates on the left side of the bus depot",
    chatBubbleSpeaker: "Student Supporter",
    chatBubbleTexts: [
      "We brought rice packets, fruit, and song sheets. If the workers hold the line, we can help them hold it loudly.",
      "Look at the police watching us already. They want this to feel frightening before anyone has even moved.",
      "Stay on the left and keep the food moving. Solidarity is why we came.",
    ],
    position: {
      left: "14%",
      top: "63%",
      width: BUS_DEPOT_CS_SUPPORT_WIDTH,
      transform: `translateY(-200px) scale(${BUS_DEPOT_CS_SUPPORT_SCALE})`,
    },
    zIndex: 13,
  },
  {
    id: "bus-depot-student-support-crowd",
    image: "/npcfigures/Middle School Students/Students_0002.webp",
    alt: "Cluster of students gathering on the left side of the bus depot",
    npcType: "non-interactive",
    position: {
      left: "21%",
      top: "71%",
      width: BUS_DEPOT_CS_SUPPORT_WIDTH,
      transform: `translateY(-200px) scale(${BUS_DEPOT_CS_SUPPORT_SCALE})`,
    },
    zIndex: 12,
  },
];

const BUS_DEPOT_CS_HUNGRY_WORKER_SIDE_QUEST_ID =
  STUDENT_HUNGRY_BUS_WORKERS_SIDE_QUEST_ID;

const BUS_DEPOT_CS_HUNGRY_WORKER_NPC: SceneNpcFigure = {
  id: "bus-depot-cs-hungry-worker",
  image: "/npcfigures/busdepotworker2/Bus Worker02_South.webp",
  alt: "Hungry bus worker waiting near the blocked depot gates",
  chatBubbleSpeaker: "Bus Worker",
  chatBubbleTexts: [
    "We've been here for a while, and some of the men have missed more than one meal. We could use some food if anyone can help.",
  ],
  chatBubbleActions: [
    {
      label: "Give Food",
      sideQuestId: BUS_DEPOT_CS_HUNGRY_WORKER_SIDE_QUEST_ID,
      actionId: STUDENT_HUNGRY_BUS_WORKERS_ACTIONS.deliverFood,
      requiredCompletedActionIds: [STUDENT_HUNGRY_BUS_WORKERS_ACTIONS.getFood],
      availableText:
        "You came back with food? Pass it here. The men have been waiting, and this will help more than you know.",
      completedText:
        "The food helped steady the men at the depot. Thank you for coming back.",
      openQuestAfterComplete: true,
    },
    {
      label: "Help Out",
      sideQuestId: BUS_DEPOT_CS_HUNGRY_WORKER_SIDE_QUEST_ID,
      hideWhenAccepted: true,
    },
  ],
  position: {
    left: "31%",
    top: "70%",
    width: "132px",
    transform: "translateY(-200px) scale(0.82)",
  },
  zIndex: 18,
};

const BUS_DEPOT_CS_HUNGRY_WORKER_SIDE_QUEST: SceneSideQuest = {
  id: BUS_DEPOT_CS_HUNGRY_WORKER_SIDE_QUEST_ID,
  title: "Hungry Bus Workers!",
  typeLabel: "Side Quest",
  iconSrc: "/icons/quest.png",
  iconAlt: "Quest scroll",
  previewImage: "/sidequestbanners/student_hungrybusworkers.png",
  previewAlt: "Bus depot standoff",
  previewNpcImage: "/npcfigures/busdepotworker2/Bus Worker02_South.webp",
  previewNpcAlt: "Hungry bus worker",
  previewCardTitle: "Bus Workers",
  previewCardImage: "/artifacts/hockleebusriots/objects/Bus Driver_Home_ Tingkat.png",
  previewCardImageAlt: "Food packed in a tingkat carrier",
  description:
    "Bus workers have been waiting at the depot for hours. Help a bus worker get food using a tingkat.",
  actions: [
    {
      id: STUDENT_HUNGRY_BUS_WORKERS_ACTIONS.findTingkat,
      label: "Find tingkat.",
      iconSrc: "/artifacts/hockleebusriots/objects/Bus Driver_Home_ Tingkat.png",
      iconAlt: "Tingkat carrier",
    },
    {
      id: STUDENT_HUNGRY_BUS_WORKERS_ACTIONS.getFood,
      label: "Get food from Mdm Lee.",
      iconSrc: "/npcfigures/marketfoodseller/Food Seller_South.webp",
      iconAlt: "Mdm Lee",
    },
    {
      id: STUDENT_HUNGRY_BUS_WORKERS_ACTIONS.deliverFood,
      label: "Deliver the food to the bus worker.",
      iconSrc: "/npcfigures/busdepotworker2/Bus Worker02_South.webp",
      iconAlt: "Bus worker",
    },
  ],
  laterLabel: "Later",
  acceptLabel: "Take it",
};

const withBusDepotStudentSideQuest = (npcFigures: SceneNpcFigure[]) => [
  BUS_DEPOT_CS_HUNGRY_WORKER_NPC,
  ...prependBusDepotStudentSupport(npcFigures),
];

const MARKET_CHARACTER_INITIAL_Y_RATIO = 0.7;
const CIV_SCENE_POSITION_OVERRIDES: Partial<Record<string, Partial<BaseSceneConfig>>> = {
  [MARKET_ROUTE]: {
    characterInitialYRatio: MARKET_CHARACTER_INITIAL_Y_RATIO,
  },
  [BUS_DEPOT_ROUTE]: {
    characterInitialYRatio: 0.61,
  },
  [FUNERAL_ROUTE]: {
    sceneBackgroundImage: "url(/background/hockleescenes/americanfuneral.png)",
    characterInitialXRatio: 0.5,
    characterMinXRatio: 0.4,
    characterMaxXRatio: 0.55,
  },
};
const BW_SCENE_CONFIG_OVERRIDES: Partial<Record<string, Partial<BaseSceneConfig>>> = {
  [BUS_DEPOT_ROUTE]: {
    characterInitialYOffset: -80,
    sceneCharacterZIndex: 12,
  },
  [KK_HOSPITAL_ROUTE]: {
    characterDialogueYOffset: 0,
  },
  [NEGOTIATION_ROUTE]: {
    characterInitialXRatio: 0.08,
    characterMinXRatio: 0,
    characterMaxXRatio: 0.15,
  },
};
const CS_SCENE_CONFIG_OVERRIDES: Partial<Record<string, Partial<BaseSceneConfig>>> = {
  [ALEXANDRA_ROAD_ROUTE]: {
    characterFixedScale: 0.825,
    characterInitialYRatio: 0.79,
  },
};
const FIRST_SCENE_INTRO_GUIDE: NonNullable<BaseSceneConfig["introGuide"]> = {
  title: "Pro Tip",
  description:
    "Walk around each scene, listen to different people, and move on when you are ready.",
  tips: [
    "Move with the Left and Right arrow keys, or click on the ground to walk.",
    "Talk to people with chat bubbles and inspect objects when they appear.",
    "Use MAP when you are ready to go to the next place.",
  ],
  dismissLabel: "Start Exploring",
};

const appendClassName = (existingClassName: string | undefined, nextClassName: string) => {
  if (!existingClassName) return nextClassName;
  if (existingClassName.split(/\s+/).includes(nextClassName)) return existingClassName;
  return `${existingClassName} ${nextClassName}`;
};

const applyNpcOverrides = (
  npcFigures: SceneNpcFigure[] | undefined,
  overrides: Record<string, Partial<SceneNpcFigure>>
) =>
  npcFigures?.map((npcFigure) => {
    const override = overrides[npcFigure.id];
    return override ? { ...npcFigure, ...override } : npcFigure;
  });

const getRoleSpecificSceneContent = (
  baseConfig: BaseSceneConfig,
  role: CharacterCode,
  pathname: string
) => {
  let npcFigures = baseConfig.npcFigures;
  let artifacts = baseConfig.artifacts;
  let introGuide = baseConfig.introGuide;
  let configOverrides: Partial<BaseSceneConfig> = {};

  if (pathname === CITY_HALL_ROUTE) {
    if (role === "BW") {
      npcFigures = applyNpcOverrides(npcFigures, CITY_HALL_BW_NPC_OVERRIDES);
      artifacts = CITY_HALL_BW_ARTIFACTS;
      introGuide = CITY_HALL_BW_INTRO_GUIDE;
      configOverrides = {
        ...configOverrides,
        onboarding: CITY_HALL_FIRST_STEP_ONBOARDING,
      };
    } else if (role === "CIV") {
      introGuide = CITY_HALL_CIV_INTRO_GUIDE;
      configOverrides = {
        ...configOverrides,
        onboarding: CITY_HALL_FIRST_STEP_ONBOARDING,
      };
    } else if (role === "CS") {
      npcFigures = applyNpcOverrides(npcFigures, CITY_HALL_CS_NPC_OVERRIDES);
      configOverrides = {
        ...configOverrides,
        characterEntryChat: CITY_HALL_CS_ENTRY_CHAT,
        onboarding: CITY_HALL_FIRST_STEP_ONBOARDING,
      };
    }
  }

  if (pathname === NEGOTIATION_ROUTE && role === "BW") {
    npcFigures = applyNpcOverrides(
      [
        ...((npcFigures ?? []).filter(
          (npcFigure) => !NEGOTIATION_BW_HIDDEN_NPC_IDS.has(npcFigure.id)
        )),
      ],
      NEGOTIATION_BW_NPC_OVERRIDES
    );
  }

  if (pathname === MARKET_ROUTE && role === "CS") {
    npcFigures = applyNpcOverrides(npcFigures, MARKET_CS_NPC_OVERRIDES);
    configOverrides = {
      ...configOverrides,
      characterEntryChat: MARKET_CS_ENTRY_CHAT,
      characterInitialYRatio: MARKET_CHARACTER_INITIAL_Y_RATIO,
    };
  }

  if (
    pathname === GOVERNMENT_OFFICE_ROUTE &&
    (role === "CIV" || role === "BW")
  ) {
    artifacts = [
      ...artifacts,
      GOVERNMENT_OFFICE_CIV_TYPEWRITER_ARTIFACT,
    ] as [SceneArtifact, ...SceneArtifact[]];
    npcFigures = [...(npcFigures ?? []), GOVERNMENT_OFFICE_CIV_TYPEWRITER_NPC];
  }

  if (pathname === SCHOOL_LAKE_ROUTE && role === "CS") {
    const filteredNpcFigures = applyNpcOverrides(
      (npcFigures ?? []).filter(
        (npcFigure) => npcFigure.id !== SCHOOL_LAKE_REPLACED_NPC_ID
      ),
      SCHOOL_LAKE_CS_NPC_OVERRIDES
    ) ?? [];

    npcFigures = [
      {
        ...SCHOOL_LAKE_SIBLING_NPC,
        autoOpenChatOnLoad: false,
      },
      ...filteredNpcFigures,
    ];
    configOverrides = {
      ...configOverrides,
      sceneAnimatedElements: [
        ...(baseConfig.sceneAnimatedElements ?? []),
        SCHOOL_LAKE_SIBLING_WALK_IN,
      ],
    };
  }

  if (pathname === BUS_DEPOT_ROUTE && role === "BW") {
    npcFigures = prependBusDepotBwStudentSupport(npcFigures ?? []);
    configOverrides = {
      ...configOverrides,
      easterEggReference: BUS_DEPOT_BW_EASTER_EGG_REFERENCE,
      easterEggButtonAriaLabel: "Open the Hock Lee bus company merger Easter egg",
      easterEggIconSrc: "/icons/see-artefact-icon.png",
      npcTransitions: baseConfig.npcTransitions?.map((transition) => ({
        ...transition,
        nextNpcFigures: prependBusDepotBwStudentSupport(transition.nextNpcFigures),
      })),
    };
  }

  if (pathname === BUS_DEPOT_ROUTE && role === "CS") {
    const busDepotPoliceStageNpcFigures =
      baseConfig.npcTransitions?.find(
        (transition) => transition.triggerNpcId === BUS_DEPOT_CS_POLICE_STAGE_TRIGGER_NPC_ID
      )?.nextNpcFigures ??
      npcFigures ??
      [];

    npcFigures = withBusDepotStudentSideQuest(busDepotPoliceStageNpcFigures);
    configOverrides = {
      ...configOverrides,
      characterInitialXRatio: 0.26,
      sideQuests: [BUS_DEPOT_CS_HUNGRY_WORKER_SIDE_QUEST],
      npcTransitions: baseConfig.npcTransitions?.map((transition) =>
        transition.triggerNpcId === BUS_DEPOT_CS_POLICE_STAGE_TRIGGER_NPC_ID
          ? {
              ...transition,
              nextNpcFigures: withBusDepotStudentSideQuest(transition.nextNpcFigures),
            }
          : transition
      ),
    };
  }

  if (pathname === FUNERAL_ROUTE && role === "CS") {
    const filteredNpcFigures = (npcFigures ?? []).filter(
      (npcFigure) => !FUNERAL_CS_HIDDEN_NPC_IDS.has(npcFigure.id)
    );

    npcFigures = [...FUNERAL_CS_STUDENT_NPCS, ...filteredNpcFigures];
    configOverrides = {
      ...configOverrides,
      characterEntryChat: FUNERAL_CS_ENTRY_CHAT,
    };
  }

  if (role === "CIV" && pathname === COMMAND_CENTER_ROUTE && npcFigures) {
    npcFigures = npcFigures.map((npcFigure) =>
      npcFigure.id === COMMAND_CENTER_DAVID_ID
        ? {
          ...npcFigure,
          className: appendClassName(npcFigure.className, NPC_BEHIND_DESK_CLASS),
        }
        : npcFigure
    );
  }

  if (role === "CIV" && pathname === FUNERAL_ROUTE && npcFigures) {
    npcFigures = npcFigures.filter(
      (npcFigure) => !FUNERAL_CIV_HIDDEN_NPC_IDS.has(npcFigure.id)
    );
  }

  if (role === "CIV") {
    configOverrides = {
      ...configOverrides,
      ...(CIV_SCENE_POSITION_OVERRIDES[pathname] ?? {}),
    };
  }

  if (role === "BW") {
    configOverrides = {
      ...configOverrides,
      ...(BW_SCENE_CONFIG_OVERRIDES[pathname] ?? {}),
    };
  }

  if (role === "CS") {
    configOverrides = {
      ...configOverrides,
      ...(CS_SCENE_CONFIG_OVERRIDES[pathname] ?? {}),
    };
  }

  return { npcFigures, artifacts, introGuide, configOverrides };
};

const replaceRoleName = (value: string, playerName: string) =>
  value.replaceAll("Rajiv Menon", playerName).replaceAll("Rajiv", playerName);

export const getStoredCharacterCode = (searchRole?: string | null): CharacterCode => {
  return resolveCharacterCode(searchRole);
};

export const persistCharacterCode = (role: CharacterCode) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(SELECTED_CHARACTER_STORAGE_KEY, role);
};

export const resolveSceneConfigForRole = (
  baseConfig: BaseSceneConfig,
  role: CharacterCode,
  pathname: string
): BaseSceneConfig => {
  const presentation = CHARACTER_PRESENTATIONS[role];
  const step = getStoryStepByRoute(role, pathname);
  const stepIndex = getStoryStepIndexByRoute(role, pathname);
  const exitRoute =
    stepIndex >= 0
      ? getExitRouteForStepIndex(role, stepIndex)
      : HOCK_LEE_MAP_ROUTE;
  const roleSpecificExitRoute =
    role === "CS" && pathname === SCHOOL_LAKE_ROUTE
      ? STUDENT_SUPPORT_CUTSCENE_ROUTE
      : role === "CS" && pathname === BUS_DEPOT_ROUTE
        ? STUDENT_ESCALATION_CUTSCENE_ROUTE
        : exitRoute;
  const mapRoute =
    roleSpecificExitRoute === OUTRO_CUTSCENE_ROUTE
      ? HOCK_LEE_MAP_ROUTE
      : roleSpecificExitRoute;
  const roleSpecificSceneContent = getRoleSpecificSceneContent(baseConfig, role, pathname);
  const introGuideConfig =
    roleSpecificSceneContent.introGuide ??
    (stepIndex === 0 ? FIRST_SCENE_INTRO_GUIDE : undefined);
  const introGuide = introGuideConfig
    ? {
      ...introGuideConfig,
      title: introGuideConfig.title
        ? replaceRoleName(
          introGuideConfig.title,
          presentation.playerName
        )
        : undefined,
      description: replaceRoleName(
        introGuideConfig.description,
        presentation.playerName
      ),
      tips: introGuideConfig.tips?.map((tip) =>
        replaceRoleName(tip, presentation.playerName)
      ),
    }
    : undefined;

  return {
    ...baseConfig,
    ...roleSpecificSceneContent.configOverrides,
    artifacts: roleSpecificSceneContent.artifacts,
    npcFigures: roleSpecificSceneContent.npcFigures,
    sceneTitle: step?.sceneTitle ?? baseConfig.sceneTitle,
    sceneSubtitle: step?.sceneSubtitle ?? baseConfig.sceneSubtitle,
    characterName: presentation.playerName,
    characterAlt: presentation.playerAlt,
    characterDialoguePortraitSprite: presentation.dialoguePortraitSprite,
    characterSpriteBasePath:
      presentation.characterSpriteBasePath ?? baseConfig.characterSpriteBasePath,
    characterSprites: presentation.characterSprites ?? baseConfig.characterSprites,
    selectedCharacterCode: role,
    mapRoute: buildRoleAwareRoute(mapRoute, role),
    introGuide,
  };
};
