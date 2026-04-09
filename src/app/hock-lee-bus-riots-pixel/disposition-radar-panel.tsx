"use client";

const DISPOSITION_AXES = [
  { label: "EMP", value: 72, bg: "#ffb4a2" },
  { label: "CUR", value: 66, bg: "#ffe066" },
  { label: "COL", value: 81, bg: "#9ad0f5" },
  { label: "EXP", value: 58, bg: "#a8e6a2" },
  { label: "REF", value: 74, bg: "#f7b267" },
] as const;

const CHART_SIZE = 280;
const CENTER = CHART_SIZE / 2;
const AXIS_RADIUS = 98;
const LABEL_RADIUS = 110;
const LABEL_CHIP_WIDTH = 45;
const LABEL_CHIP_HEIGHT = 22;

const polarToCartesian = (index: number, radius: number) => {
  const angle = -Math.PI / 2 + (index * 2 * Math.PI) / DISPOSITION_AXES.length;
  return {
    x: CENTER + radius * Math.cos(angle),
    y: CENTER + radius * Math.sin(angle),
    cos: Math.cos(angle),
    sin: Math.sin(angle),
  };
};

const toSvgPoints = (points: Array<{ x: number; y: number }>) =>
  points.map(({ x, y }) => `${x.toFixed(2)},${y.toFixed(2)}`).join(" ");

type DispositionRadarPanelProps = {
  className?: string;
};

export function DispositionRadarPanel({ className = "" }: DispositionRadarPanelProps) {
  const axisPoints = DISPOSITION_AXES.map((_, index) =>
    polarToCartesian(index, AXIS_RADIUS)
  );
  const valuePoints = DISPOSITION_AXES.map((axis, index) =>
    polarToCartesian(index, (AXIS_RADIUS * axis.value) / 100)
  );
  const gridLevels = [0.25, 0.5, 0.75, 1];

  return (
    <div
      id="spider-chart"
      className={`inventory-panel disposition-radar-panel ${className}`.trim()}
    >
      <svg
        id="spider-chart-svg"
        className="disposition-radar-svg"
        viewBox={`0 0 ${CHART_SIZE} ${CHART_SIZE}`}
        role="img"
        aria-label="Radar chart showing placeholder values for the five Singapore Design Dispositions"
      >
        {gridLevels.map((level) => {
          const levelPoints = DISPOSITION_AXES.map((_, index) =>
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
            key={`disposition-axis-${DISPOSITION_AXES[index].label}`}
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
            key={`disposition-value-point-${DISPOSITION_AXES[index].label}`}
            cx={point.x}
            cy={point.y}
            r="5.5"
            className="disposition-radar-point"
          />
        ))}
        {DISPOSITION_AXES.map((axis, index) => {
          const labelPoint = polarToCartesian(index, LABEL_RADIUS);
          const dy = labelPoint.sin > 0.35 ? 12 : labelPoint.sin < -0.35 ? -8 : 4;
          const labelY = labelPoint.y + dy;
          return (
            <g key={`disposition-label-${axis.label}`}>
              <rect
                x={labelPoint.x - LABEL_CHIP_WIDTH / 2}
                y={labelY - LABEL_CHIP_HEIGHT / 2}
                width={LABEL_CHIP_WIDTH}
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
