import { Complexity } from "../types";
import { Clock, Database } from "lucide-react";

function getBadgeColor(notation: string): string {
  if (notation.includes("1")) return "var(--green)";
  if (notation.includes("log")) return "var(--cyan)";
  if (notation.match(/n\)$/)) return "var(--amber)";
  if (notation.includes("n²") || notation.includes("n^2")) return "var(--red)";
  if (notation.includes("2^n") || notation.includes("n!")) return "var(--red)";
  return "var(--text-muted)";
}

interface ComplexityCardProps {
  complexity: Complexity;
}

export default function ComplexityCard({ complexity }: ComplexityCardProps) {
  const timeColor = getBadgeColor(complexity.time);
  const spaceColor = getBadgeColor(complexity.space);

  return (
    <div className="complexity-card">
      <div className="complexity-metrics">
        <div className="complexity-metric">
          <div className="complexity-metric-icon">
            <Clock size={16} strokeWidth={2} />
          </div>
          <div className="complexity-metric-info">
            <span className="complexity-metric-label">Time Complexity</span>
            <span className="complexity-notation" style={{ color: timeColor, borderColor: `${timeColor}40`, background: `${timeColor}12` }}>
              {complexity.time}
            </span>
          </div>
        </div>

        <div className="complexity-divider" />

        <div className="complexity-metric">
          <div className="complexity-metric-icon">
            <Database size={16} strokeWidth={2} />
          </div>
          <div className="complexity-metric-info">
            <span className="complexity-metric-label">Space Complexity</span>
            <span className="complexity-notation" style={{ color: spaceColor, borderColor: `${spaceColor}40`, background: `${spaceColor}12` }}>
              {complexity.space}
            </span>
          </div>
        </div>
      </div>

      <p className="complexity-explanation">{complexity.explanation}</p>
    </div>
  );
}
