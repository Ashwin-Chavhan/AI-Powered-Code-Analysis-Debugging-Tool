import { Rating } from "../types";

interface QualityMetricsProps {
  rating: Rating;
}

function ScoreRing({ value, label, color }: { value: number; label: string; color: string }) {
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const progress = (value / 10) * circumference;
  const offset = circumference - progress;

  return (
    <div className="score-ring-item">
      <div className="score-ring-svg-wrapper">
        <svg width="72" height="72" viewBox="0 0 72 72">
          <circle cx="36" cy="36" r={radius} fill="none" stroke="var(--border)" strokeWidth="5" />
          <circle
            cx="36"
            cy="36"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            transform="rotate(-90 36 36)"
            style={{ transition: "stroke-dashoffset 0.8s ease" }}
          />
        </svg>
        <div className="score-ring-value" style={{ color }}>
          {value.toFixed(1)}
        </div>
      </div>
      <div className="score-ring-label">{label}</div>
    </div>
  );
}

function ScoreBar({ value, label }: { value: number; label: string }) {
  const color =
    value >= 8 ? "var(--green)" : value >= 6 ? "var(--cyan)" : value >= 4 ? "var(--amber)" : "var(--red)";

  return (
    <div className="score-bar-item">
      <div className="score-bar-header">
        <span className="score-bar-label">{label}</span>
        <span className="score-bar-value" style={{ color }}>
          {value.toFixed(1)}/10
        </span>
      </div>
      <div className="score-bar-track">
        <div
          className="score-bar-fill"
          style={{
            width: `${value * 10}%`,
            background: color,
            transition: "width 0.8s ease",
          }}
        />
      </div>
    </div>
  );
}

export default function QualityMetrics({ rating }: QualityMetricsProps) {
  const overallColor =
    rating.overall >= 8
      ? "var(--green)"
      : rating.overall >= 6
      ? "var(--cyan)"
      : rating.overall >= 4
      ? "var(--amber)"
      : "var(--red)";

  const overallLabel =
    rating.overall >= 8 ? "Excellent" : rating.overall >= 6 ? "Good" : rating.overall >= 4 ? "Fair" : "Needs Work";

  return (
    <div className="metrics-panel">
      <div className="overall-score-block">
        <ScoreRing value={rating.overall} label="Overall" color={overallColor} />
        <div className="overall-score-info">
          <div className="overall-score-badge" style={{ color: overallColor, borderColor: overallColor }}>
            {overallLabel}
          </div>
          <p className="overall-score-desc">
            Comprehensive quality assessment across efficiency, security, maintainability, and readability.
          </p>
        </div>
      </div>

      <div className="score-bars">
        <ScoreBar value={rating.efficiency} label="Efficiency" />
        <ScoreBar value={rating.security} label="Security" />
        <ScoreBar value={rating.maintainability} label="Maintainability" />
        <ScoreBar value={rating.readability} label="Readability" />
      </div>
    </div>
  );
}
