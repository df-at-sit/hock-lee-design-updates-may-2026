import { useEffect, useState } from "react";
import type { SceneSideQuest } from "./base-scene-shell";

export const SIDEQUEST_ACCEPTED_STORAGE_KEY = "hockLeeAcceptedSideQuests";
export const SIDEQUEST_COMPLETED_ACTIONS_STORAGE_KEY =
  "hockLeeCompletedSideQuestActions";
export const SIDEQUEST_PROGRESS_UPDATED_EVENT = "hockLeeSideQuestProgressUpdated";
export const STUDENT_HUNGRY_BUS_WORKERS_SIDE_QUEST_ID =
  "student-hungry-bus-workers";
export const STUDENT_HUNGRY_BUS_WORKERS_ACTIONS = {
  findTingkat: "find-tingkat",
  getFood: "get-food",
  deliverFood: "deliver-food",
} as const;

export const GLOBAL_SIDE_QUESTS: SceneSideQuest[] = [
  {
    id: STUDENT_HUNGRY_BUS_WORKERS_SIDE_QUEST_ID,
    title: "Hungry Bus Workers!",
    typeLabel: "Side Quest",
    iconSrc: "/icons/quest.png",
    iconAlt: "Quest scroll",
    previewImage: "/sidequestbanners/student_hungrybusworkers.png",
    previewAlt: "Bus depot standoff",
    previewNpcImage: "/npcfigures/busdepotworker2/Bus Worker02_South.webp",
    previewNpcAlt: "Hungry bus worker",
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
  },
];

export const readAcceptedSideQuestIds = () => {
  if (typeof window === "undefined") return [];

  try {
    const parsed = JSON.parse(
      window.localStorage.getItem(SIDEQUEST_ACCEPTED_STORAGE_KEY) ?? "[]"
    );
    return Array.isArray(parsed)
      ? parsed.filter((value): value is string => typeof value === "string")
      : [];
  } catch {
    return [];
  }
};

export const readCompletedSideQuestActions = () => {
  if (typeof window === "undefined") return {};

  try {
    const parsed = JSON.parse(
      window.localStorage.getItem(SIDEQUEST_COMPLETED_ACTIONS_STORAGE_KEY) ?? "{}"
    );
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return {};

    return Object.fromEntries(
      Object.entries(parsed).map(([sideQuestId, actionIds]) => [
        sideQuestId,
        Array.isArray(actionIds)
          ? actionIds.filter((value): value is string => typeof value === "string")
          : [],
      ])
    ) as Record<string, string[]>;
  } catch {
    return {};
  }
};

export const writeAcceptedSideQuestIds = (sideQuestIds: string[]) => {
  if (typeof window === "undefined") return;

  window.localStorage.setItem(
    SIDEQUEST_ACCEPTED_STORAGE_KEY,
    JSON.stringify(Array.from(new Set(sideQuestIds)))
  );
  window.dispatchEvent(new CustomEvent(SIDEQUEST_PROGRESS_UPDATED_EVENT));
};

export const writeCompletedSideQuestActions = (
  completedSideQuestActions: Record<string, string[]>
) => {
  if (typeof window === "undefined") return;

  window.localStorage.setItem(
    SIDEQUEST_COMPLETED_ACTIONS_STORAGE_KEY,
    JSON.stringify(
      Object.fromEntries(
        Object.entries(completedSideQuestActions).map(([sideQuestId, actionIds]) => [
          sideQuestId,
          Array.from(new Set(actionIds)),
        ])
      )
    )
  );
  window.dispatchEvent(new CustomEvent(SIDEQUEST_PROGRESS_UPDATED_EVENT));
};

export const acceptSideQuest = (sideQuestId: string) => {
  const acceptedSideQuestIds = readAcceptedSideQuestIds();
  if (acceptedSideQuestIds.includes(sideQuestId)) return;
  writeAcceptedSideQuestIds([...acceptedSideQuestIds, sideQuestId]);
};

export const completeSideQuestAction = (sideQuestId: string, actionId: string) => {
  const acceptedSideQuestIds = readAcceptedSideQuestIds();
  if (!acceptedSideQuestIds.includes(sideQuestId)) return;

  const completedSideQuestActions = readCompletedSideQuestActions();
  const completedActionIds = completedSideQuestActions[sideQuestId] ?? [];
  if (completedActionIds.includes(actionId)) return;

  writeCompletedSideQuestActions({
    ...completedSideQuestActions,
    [sideQuestId]: [...completedActionIds, actionId],
  });
};

export const useAcceptedSideQuestIds = () => {
  const [acceptedSideQuestIds, setAcceptedSideQuestIds] = useState<string[]>([]);

  useEffect(() => {
    const syncAcceptedSideQuestIds = () => {
      setAcceptedSideQuestIds(readAcceptedSideQuestIds());
    };

    syncAcceptedSideQuestIds();
    window.addEventListener("storage", syncAcceptedSideQuestIds);
    window.addEventListener(
      SIDEQUEST_PROGRESS_UPDATED_EVENT,
      syncAcceptedSideQuestIds
    );

    return () => {
      window.removeEventListener("storage", syncAcceptedSideQuestIds);
      window.removeEventListener(
        SIDEQUEST_PROGRESS_UPDATED_EVENT,
        syncAcceptedSideQuestIds
      );
    };
  }, []);

  return acceptedSideQuestIds;
};

export const useCompletedSideQuestActions = () => {
  const [completedSideQuestActions, setCompletedSideQuestActions] = useState<
    Record<string, string[]>
  >({});

  useEffect(() => {
    const syncCompletedSideQuestActions = () => {
      setCompletedSideQuestActions(readCompletedSideQuestActions());
    };

    syncCompletedSideQuestActions();
    window.addEventListener("storage", syncCompletedSideQuestActions);
    window.addEventListener(
      SIDEQUEST_PROGRESS_UPDATED_EVENT,
      syncCompletedSideQuestActions
    );

    return () => {
      window.removeEventListener("storage", syncCompletedSideQuestActions);
      window.removeEventListener(
        SIDEQUEST_PROGRESS_UPDATED_EVENT,
        syncCompletedSideQuestActions
      );
    };
  }, []);

  return completedSideQuestActions;
};
