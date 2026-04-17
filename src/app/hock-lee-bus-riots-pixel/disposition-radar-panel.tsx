"use client";

import type { KeyboardEventHandler, MouseEventHandler } from "react";
import type { CharacterCode } from "./scenes";
import type { MindsetKey } from "./disposition-state";
import { useDispositionProfile } from "./disposition-state";

const DISPOSITION_AXIS_STYLES = [
  { key: "empathy", label: "Empathy", bg: "#ffb4a2" },
  { key: "courage", label: "Courage", bg: "#ffe066" },
  { key: "curiosity", label: "Curiosity", bg: "#9ad0f5" },
  { key: "tenacity", label: "Tenacity", bg: "#a8e6a2" },
  { key: "optimism", label: "Optimism", bg: "#f7b267" },
] as const;

const CHART_SIZE = 300;
const CENTER = CHART_SIZE / 2;
const AXIS_RADIUS = 98;
const LABEL_RADIUS = 118;
const LABEL_CHIP_HEIGHT = 24;

const polarToCartesian = (index: number, radius: number) => {
  const angle = -Math.PI / 2 + (index * 2 * Math.PI) / DISPOSITION_AXIS_STYLES.length;
  return {
    x: CENTER + radius * Math.cos(angle),
    y: CENTER + radius * Math.sin(angle),
    sin: Math.sin(angle),
  };
};

const toSvgPoints = (points: Array<{ x: number; y: number }>) =>
  points.map(({ x, y }) => `${x.toFixed(2)},${y.toFixed(2)}`).join(" ");

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

  const axes = DISPOSITION_AXIS_STYLES.map((axisStyle) => ({
    ...axisStyle,
    bg: labelChipBgOverrides?.[axisStyle.key] ?? axisStyle.bg,
    value: profile[axisStyle.key],
  }));
  const axisPoints = axes.map((_, index) => polarToCartesian(index, AXIS_RADIUS));
  const valuePoints = axes.map((axis, index) =>
    polarToCartesian(index, (AXIS_RADIUS * axis.value) / 100)
  );
  const gridLevels = [0.25, 0.5, 0.75, 1];
  const ariaLabel = `Radar chart for ${selectedCharacterCode} showing ${interactionCount} unique interactions. ${axes
    .map((axis) => `${axis.label} ${axis.value}`)
    .join(", ")}.`;
  const ariaDescription =
    "This spider chart tracks how your interactions shape Empathy, Courage, Curiosity, Tenacity, and Optimism. Larger values mean that trait is showing up more strongly.";
  const titleId = `spider-chart-title-${selectedCharacterCode.toLowerCase()}`;
  const descriptionId = `spider-chart-description-${selectedCharacterCode.toLowerCase()}`;

  return (
    <div
      id="spider-chart"
      className={`inventory-panel disposition-radar-panel ${className}`.trim()}
      onClick={onClick}
      onKeyDown={onKeyDown}
      tabIndex={tabIndex}
      role={role}
    >
      <svg
        id="spider-chart-svg"
        className="disposition-radar-svg"
        viewBox={`0 0 ${CHART_SIZE} ${CHART_SIZE}`}
        role="img"
        aria-labelledby={`${titleId} ${descriptionId}`}
      >
        <title id={titleId}>{ariaLabel}</title>
        <desc id={descriptionId}>{ariaDescription}</desc>
        {gridLevels.map((level) => {
          const levelPoints = axes.map((_, index) =>
            polarToCartesian(index, AXIS_RADIUS * level)
          );
          return (
            <polygon
              key={`disposition-grid-level-${level}`}
              points={toSvgPoints(levelPoints)}
              className="disposition-radar-grid"
            />
          );
        })}
        {axisPoints.map((point, index) => (
          <line
            key={`disposition-axis-${axes[index].key}`}
            x1={CENTER}
            y1={CENTER}
            x2={point.x}
            y2={point.y}
            className="disposition-radar-axis"
          />
        ))}
        <polygon
          points={toSvgPoints(valuePoints)}
          className="disposition-radar-area"
        />
        {valuePoints.map((point, index) => (
          <circle
            key={`disposition-value-point-${axes[index].key}`}
            cx={point.x}
            cy={point.y}
            r="5.5"
            className="disposition-radar-point"
          />
        ))}
        {axes.map((axis, index) => {
          const labelPoint = polarToCartesian(index, LABEL_RADIUS);
          const dy = labelPoint.sin > 0.35 ? 12 : labelPoint.sin < -0.35 ? -8 : 4;
          const labelY = labelPoint.y + dy;
          const labelChipWidth = Math.max(74, axis.label.length * 10 + 14);

          return (
            <g key={`disposition-label-${axis.key}`}>
              <rect
                x={labelPoint.x - labelChipWidth / 2}
                y={labelY - LABEL_CHIP_HEIGHT / 2}
                width={labelChipWidth}
                height={LABEL_CHIP_HEIGHT}
                rx="3"
                ry="3"
                fill={axis.bg}
                className="disposition-radar-label-chip"
              />
              <text
                x={labelPoint.x}
                y={labelY}
                textAnchor="middle"
                dominantBaseline="middle"
                className="disposition-radar-text"
              >
                {axis.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
