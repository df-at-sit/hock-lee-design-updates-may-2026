"use client";

import Image from "next/image";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { MindsetKey } from "./disposition-state";
import { DispositionRadarPanel } from "./disposition-radar-panel";
import { useDispositionProfile } from "./disposition-state";
import { CHARACTER_JOURNEY_CONTENT, CHARACTER_ROLE_LABELS } from "./character-content";
import {
  buildRoleAwareRoute,
  CHARACTER_PRESENTATIONS,
  getRoleSteps,
} from "./story-data";
import { HOCK_LEE_MAP_ROUTE, WHAT_REALLY_HAPPENED_ROUTE } from "./story-paths";
import { useSelectedCharacterCode } from "./use-selected-character-code";

const DISPOSITION_ORDER: MindsetKey[] = [
  "empathy",
  "courage",
  "curiosity",
  "tenacity",
  "optimism",
];

const MINDSET_LABELS: Record<MindsetKey, string> = {
  empathy: "Empathy",
  courage: "Courage",
  curiosity: "Curiosity",
  tenacity: "Tenacity",
  optimism: "Optimism",
};

const buildFocusSummary = (
  profile: Record<MindsetKey, number>,
  interactionCount: number
) => {
  if (interactionCount === 0) {
    return "Your chart is still at its starting baseline because this route has not recorded any unique interactions yet.";
  }

  const strongestMindsets = [...DISPOSITION_ORDER]
    .sort((left, right) => profile[right] - profile[left])
    .slice(0, 2)
    .map((mindsetKey) => MINDSET_LABELS[mindsetKey].toLowerCase());

  return `You showed the strongest focus on ${strongestMindsets[0]} and ${strongestMindsets[1]} in this route.`;
};

const lockFullscreenPage = () => {
  const { body, documentElement } = document;
  const previousHtmlOverflow = documentElement.style.overflow;
  const previousBodyOverflow = body.style.overflow;
  const previousHtmlHeight = documentElement.style.height;
  const previousBodyHeight = body.style.height;
  const previousBodyOverscroll = body.style.overscrollBehavior;

  documentElement.style.overflow = "hidden";
  body.style.overflow = "hidden";
  documentElement.style.height = "100%";
  body.style.height = "100%";
  body.style.overscrollBehavior = "none";

  return () => {
    documentElement.style.overflow = previousHtmlOverflow;
    body.style.overflow = previousBodyOverflow;
    documentElement.style.height = previousHtmlHeight;
    body.style.height = previousBodyHeight;
    body.style.overscrollBehavior = previousBodyOverscroll;
  };
};

export function EndingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedCharacter = useSelectedCharacterCode(searchParams.get("role"));
  const content = CHARACTER_JOURNEY_CONTENT[selectedCharacter];
  const presentation = CHARACTER_PRESENTATIONS[selectedCharacter];
  const roleSteps = getRoleSteps(selectedCharacter);
  const finalSceneRoute = roleSteps[roleSteps.length - 1]?.route ?? HOCK_LEE_MAP_ROUTE;
  const { interactionCount, profile } = useDispositionProfile(selectedCharacter);
  const focusSummary = buildFocusSummary(profile, interactionCount);
  const roleLabel = CHARACTER_ROLE_LABELS[selectedCharacter];

  useEffect(() => {
    router.prefetch(buildRoleAwareRoute(WHAT_REALLY_HAPPENED_ROUTE, selectedCharacter));
  }, [router, selectedCharacter]);

  useEffect(() => lockFullscreenPage(), []);

  const handleBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
      return;
    }

    router.push(buildRoleAwareRoute(finalSceneRoute, selectedCharacter));
  };

  const handleFinish = () => {
    router.push(buildRoleAwareRoute(WHAT_REALLY_HAPPENED_ROUTE, selectedCharacter));
  };

  return (
    <main className="hl-character-select-page hl-post-story-page">
      <div className="hl-character-select-stage hl-post-story-stage hl-ending-stage">
        <section className="hl-ending-board-shell">
          <article className="hl-ending-board">
            <header className="hl-ending-title-plaque">
              <span className="hl-ending-title-text">{`THE ${roleLabel.toUpperCase()}`}</span>
            </header>

            <div className="hl-ending-board-content">
              <section className="hl-ending-pane hl-ending-pane--mission">
                <div className="hl-ending-section-label">Your Mission</div>

                <div className="hl-ending-mission-layout">
                  <div
                    className="hl-ending-sprite-frame"
                    data-character={selectedCharacter}
                  >
                    <div className="hl-ending-sprite-role-tag">
                      {presentation.playerFullName}
                    </div>
                    <div className="hl-ending-sprite-viewport">
                      <Image
                        alt={presentation.playerAlt}
                        className="hl-ending-character-figure"
                        draggable={false}
                        src={presentation.markerSprite}
                        unoptimized
                        width={320}
                        height={320}
                      />
                    </div>
                  </div>

                  <ul className="hl-ending-mission-list">
                    {content.endingMission.map((item) => (
                      <li key={item} className="hl-ending-mission-item">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              <section className="hl-ending-pane hl-ending-pane--focus">
                <div className="hl-ending-section-label">Your Focus</div>

                <div className="hl-ending-focus-layout">
                  <DispositionRadarPanel
                    className="hl-ending-radar-panel"
                    labelChipBgOverrides={{ optimism: "#fff4dc" }}
                    selectedCharacterCode={selectedCharacter}
                  />
                  <p className="hl-ending-focus-summary">{focusSummary}</p>
                </div>
              </section>
            </div>
          </article>
        </section>

        <div className="hl-character-select-actions">
          <div className="pixel-corners--wrapper hl-character-select-action-shell hl-character-select-action-shell--back">
            <button
              className="pixel-corners hl-character-select-action hl-character-select-action--back"
              onClick={handleBack}
              type="button"
            >
              Back
            </button>
          </div>
          <div className="pixel-corners--wrapper hl-character-select-action-shell hl-character-select-action-shell--select">
            <button
              className="pixel-corners hl-character-select-action hl-character-select-action--select"
              onClick={handleFinish}
              type="button"
            >
              Finish
            </button>
          </div>
        </div>

        <div className="hl-character-select-floor" aria-hidden="true" />
      </div>
    </main>
  );
}
