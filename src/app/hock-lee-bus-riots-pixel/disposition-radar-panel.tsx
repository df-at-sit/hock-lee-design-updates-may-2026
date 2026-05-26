"use client";

import type { KeyboardEventHandler, MouseEventHandler } from "react";
import type { CharacterCode } from "./scenes";
import type { MindsetKey } from "./disposition-state";
import { useDispositionProfile } from "./disposition-state";

const DISPOSITION_BAR_STYLES = [
  { key: "awareness", label: "Awareness", bg: "#a8e6a2" },
  { key: "curiosity", label: "Curiosity", bg: "#f29bf0" },
  { key: "empathy", label: "Empathy", bg: "#ffd84f" },
] as const;

type DisplayQualityKey = (typeof DISPOSITION_BAR_STYLES)[number]["key"];

const getDisplayQualityValue = (
  key: DisplayQualityKey,
  profile: Record<MindsetKey, number>
) => {
  if (key === "awareness") {
    return Math.round((profile.courage + profile.tenacity + profile.optimism) / 3);
  }

  return profile[key];
};

type DispositionRadarPanelProps = {
  className?: string;
  selectedCharacterCode?: CharacterCode;
  onClick?: MouseEventHandler<HTMLDivElement>;
  onKeyDown?: KeyboardEventHandler<HTMLDivElement>;
  tabIndex?: number;
  role?: string;
  labelChipBgOverrides?: Partial<Record<MindsetKey, string>>;
};

export function DispositionRadarPanel({
  className = "",
  selectedCharacterCode = "BW",
  onClick,
  onKeyDown,
  tabIndex,
  role,
  labelChipBgOverrides,
}: DispositionRadarPanelProps) {
  const { profile, interactionCount } = useDispositionProfile(selectedCharacterCode);

  const qualities = DISPOSITION_BAR_STYLES.map((barStyle) => ({
    ...barStyle,
    bg:
      barStyle.key === "awareness"
        ? barStyle.bg
        : labelChipBgOverrides?.[barStyle.key] ?? barStyle.bg,
    value: getDisplayQualityValue(barStyle.key, profile),
  }));
  const ariaLabel = `Quality bars for ${selectedCharacterCode} showing ${interactionCount} unique interactions. ${qualities
    .map((quality) => `${quality.label} ${quality.value}`)
    .join(", ")}.`;
  const ariaDescription =
    "These bars track how your interactions shape Awareness, Curiosity, and Empathy. Longer bars mean that quality is showing up more strongly.";
  const titleId = `quality-bars-title-${selectedCharacterCode.toLowerCase()}`;
  const descriptionId = `quality-bars-description-${selectedCharacterCode.toLowerCase()}`;

  return (
    <div
      id="quality-bars"
      className={`inventory-panel disposition-radar-panel ${className}`.trim()}
      onClick={onClick}
      onKeyDown={onKeyDown}
      tabIndex={tabIndex}
      role={role}
      aria-label={ariaLabel}
      aria-describedby={descriptionId}
    >
      <h2 id={titleId} className="sr-only">
        {ariaLabel}
      </h2>
      <p id={descriptionId} className="sr-only">
        {ariaDescription}
      </p>
      <div className="disposition-bars" aria-hidden="true">
        {qualities.map((quality) => (
          <div className="disposition-bar-row" key={quality.key}>
            <div className="disposition-radar-text">{quality.label}</div>
            <div className="disposition-bar-track">
              <div
                className="disposition-bar-fill"
                style={{
                  backgroundColor: quality.bg,
                  width: `${quality.value}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
