import { Bug, Severity } from "../types";
import { AlertTriangle, Zap, Shield, Code2, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

const SEVERITY_COLORS: Record<Severity, string> = {
  critical: "var(--red)",
  high: "var(--amber)",
  medium: "var(--yellow)",
  low: "var(--text-muted)",
};

const TYPE_ICONS = {
  logic: AlertTriangle,
  performance: Zap,
  security: Shield,
  style: Code2,
};

interface BugCardProps {
  bug: Bug;
  index: number;
}

export default function BugCard({ bug, index }: BugCardProps) {
  const [expanded, setExpanded] = useState(index === 0);
  const Icon = TYPE_ICONS[bug.type];
  const color = SEVERITY_COLORS[bug.severity];

  return (
    <div className="bug-card" style={{ borderLeftColor: color }}>
      <button className="bug-card-header" onClick={() => setExpanded(!expanded)}>
        <div className="bug-card-left">
          <div className="bug-icon" style={{ color, background: `${color}18` }}>
            <Icon size={14} strokeWidth={2} />
          </div>
          <div className="bug-meta">
            <span className="bug-title">{bug.title}</span>
            <div className="bug-tags">
              <span className="bug-tag" style={{ color, borderColor: `${color}40`, background: `${color}12` }}>
                {bug.severity}
              </span>
              <span className="bug-tag-type">{bug.type}</span>
              {bug.line && <span className="bug-tag-line">line {bug.line}</span>}
            </div>
          </div>
        </div>
        <div className="bug-expand-icon">
          {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </div>
      </button>

      {expanded && (
        <div className="bug-card-body">
          <p className="bug-description">{bug.description}</p>
          <div className="bug-suggestion">
            <span className="bug-suggestion-label">Suggestion</span>
            <p className="bug-suggestion-text">{bug.suggestion}</p>
          </div>
        </div>
      )}
    </div>
  );
}
