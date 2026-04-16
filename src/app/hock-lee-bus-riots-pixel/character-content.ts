import type { CharacterCode } from "./scenes";

export const CHARACTER_ORDER: CharacterCode[] = ["BW", "CIV", "CS"];

export const CHARACTER_ROLE_LABELS: Record<CharacterCode, string> = {
  BW: "Bus Worker",
  CIV: "Civil Servant",
  CS: "Chinese Student",
};

export const CHARACTER_JOURNEY_CONTENT: Record<
  CharacterCode,
  {
    quote: string;
    mission: string[];
    endingMission: string[];
  }
> = {
  BW: {
    quote: "I need to make sure the bus workers are heard.",
    mission: [
      "See how low pay, long hours, and company decisions push workers towards a strike.",
      "Explore the depot, the union dispute, and the growing tension on the ground.",
      "Find out what workers and families risk when the conflict turns public.",
    ],
    endingMission: [
      "Saw how low pay, long hours, and company decisions pushed workers towards a strike.",
      "Explored the depot, the union dispute, and the growing tension on the ground.",
      "Found out what workers and families risked when the conflict turned public.",
    ],
  },
  CIV: {
    quote: "I need to find out what is happening before things get worse.",
    mission: [
      "See how the colonial government and new local leaders respond to rising tension.",
      "Follow reports, meetings, and the pressure to keep public order.",
      "Understand how politics, worker demands, and public fear collide.",
    ],
    endingMission: [
      "Saw how the colonial government and new local leaders responded to rising tension.",
      "Followed reports, meetings, and the pressure to keep public order.",
      "Understood how politics, worker demands, and public fear collided.",
    ],
  },
  CS: {
    quote: "What happens outside school is starting to shape life inside it too.",
    mission: [
      "See the Hock Lee dispute through school life and student networks.",
      "Follow how concern, anger, and support move from classrooms to the streets.",
      "Understand why students become part of a bigger fight over Singapore's future.",
    ],
    endingMission: [
      "Saw the Hock Lee dispute through school life and student networks.",
      "Followed how concern, anger, and support moved from classrooms to the streets.",
      "Understood why students became part of a bigger fight over Singapore's future.",
    ],
  },
};
