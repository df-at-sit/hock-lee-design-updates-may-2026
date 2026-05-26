import { CHARACTER_ROLE_LABELS } from "./character-content";
import type { CharacterCode } from "./scenes";
import type { MapNodeKey, StoryStep } from "./story-data";

export const MERLION_IDLE_HELP_MESSAGE =
  "Are you stuck? I'm here to help, ask me anything!";

export const MERLION_MAP_ONBOARDING_MESSAGE =
  "Welcome to the Hock Lee Bus Riot historical event timeline. Explore every node to enter important scenes and become part of the storyline. Keep an eye on your Stats Indicator for Empathy, Curiosity, and Awareness, and use the Timeline to track where you are in the story.";

export const MERLION_CITY_HALL_TUTORIAL_MESSAGE =
  "Welcome to City Hall. Try the core interactions here: talk to NPCs, inspect NPCs with artefacts attached, use artefact chat to ask questions, and press the Camera icon to view real photos of the scene.";

export const MERLION_RIOT_MAP_CONTEXT_MESSAGE =
  "Look out for the atmosphere change during the riot and how students and bus workers are acting.";

export const MERLION_POST_RIOT_MAP_CONTEXT_MESSAGE =
  "Although the riot has ended, look out for the consequences of using violence.";

export const MERLION_MAP_DEFAULT_MESSAGE =
  "Use the map and Timeline to choose the next unlocked stop in the Hock Lee Bus Riot story.";

export const MERLION_STUDENT_HUNGRY_BUS_WORKERS_INCOMPLETE_MESSAGE =
  "Oh no! We forgot to feed the bus workers at the bus depot, I bet they are still hungry!";

type NpcNudgeCopy = {
  subject: string;
  verb: "is" | "are";
};

const MERLION_NPC_NUDGE_BY_NODE_KEY: Partial<Record<MapNodeKey, NpcNudgeCopy>> = {
  "alexandra-road": {
    subject: "students, bus workers, and police",
    verb: "are",
  },
  airport: {
    subject: "David Marshall",
    verb: "is",
  },
  "bus-depot": {
    subject: "bus workers",
    verb: "are",
  },
  "city-hall": {
    subject: "David Marshall and the City Hall crowd",
    verb: "are",
  },
  classroom: {
    subject: "students",
    verb: "are",
  },
  "command-center": {
    subject: "police and officials",
    verb: "are",
  },
  funeral: {
    subject: "students and mourners",
    verb: "are",
  },
  "government-office": {
    subject: "David Marshall",
    verb: "is",
  },
  home: {
    subject: "your family",
    verb: "is",
  },
  hospital: {
    subject: "injured bus workers",
    verb: "are",
  },
  market: {
    subject: "stallholders and workers",
    verb: "are",
  },
  "negotiation-hall": {
    subject: "David Marshall and the bus company representatives",
    verb: "are",
  },
  "school-gates": {
    subject: "students and teachers",
    verb: "are",
  },
  "school-lake": {
    subject: "students",
    verb: "are",
  },
};

export const getCleanMerlionLocationLabel = (label: string) =>
  label
    .replace(/^(Pre-Riot|Riot|Post-Riot):\s*/i, "")
    .replace(/\s*\(Return\)\s*/i, "")
    .trim();

export const getMerlionArtifactNudgeMessage = (locationLabel: string) =>
  `Learn more about the artefacts used at ${getCleanMerlionLocationLabel(
    locationLabel
  )} during the 1950s.`;

export const getMerlionNpcNudgeMessage = (
  nodeKey: MapNodeKey | null | undefined
) => {
  const copy = nodeKey ? MERLION_NPC_NUDGE_BY_NODE_KEY[nodeKey] : undefined;
  const subject = copy?.subject ?? "the people here";
  const verb = copy?.verb ?? "are";

  return `Hear about what ${subject} ${verb} thinking about the situation.`;
};

export const getMerlionSideQuestNpcNudgeMessage = (npcCategory: string) =>
  `Seems like ${npcCategory} is trying to tell you something!`;

export const getMerlionSceneDefaultMessage = (locationLabel: string) =>
  `Explore ${getCleanMerlionLocationLabel(
    locationLabel
  )}. Talk to people, inspect artefacts, and use the Camera icon when it is available.`;

export const getMerlionMapCheckpointMessage = ({
  hasReachedFinalScene,
  routeSteps,
  selectedCharacter,
  unlockedThroughIndex,
  visitedProgress,
}: {
  hasReachedFinalScene: boolean;
  routeSteps: StoryStep[];
  selectedCharacter: CharacterCode;
  unlockedThroughIndex: number;
  visitedProgress: number;
}) => {
  if (hasReachedFinalScene) {
    return getMerlionCompletionMessage(selectedCharacter);
  }

  if (visitedProgress < 0) {
    return MERLION_MAP_ONBOARDING_MESSAGE;
  }

  const previousPhase = routeSteps[visitedProgress]?.phase ?? null;
  const nextPhase = routeSteps[unlockedThroughIndex]?.phase ?? null;

  if (previousPhase === "Pre-Riot" && nextPhase === "Riot") {
    return MERLION_RIOT_MAP_CONTEXT_MESSAGE;
  }

  if (previousPhase === "Riot" && nextPhase === "Post-Riot") {
    return MERLION_POST_RIOT_MAP_CONTEXT_MESSAGE;
  }

  return MERLION_MAP_DEFAULT_MESSAGE;
};

export const getMerlionCompletionMessage = (characterCode: CharacterCode) =>
  `Congrats! You have made it to the end. You've learnt the full story about the Hock Lee Bus Riot as ${CHARACTER_ROLE_LABELS[characterCode]}. You might want to check out other characters' perspectives!`;

export const getMerlionForgotSideQuestMessage = (sceneTitle: string) =>
  `We totally forgot about the side quest we took from ${sceneTitle} - let's go back to complete it!`;
