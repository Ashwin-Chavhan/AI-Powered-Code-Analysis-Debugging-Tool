import { Improvement } from "../types";
import { TrendingUp, Shield, BookOpen, Wrench, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

const CATEGORY_COLORS = {
  performance: "var(--cyan)",
  security: "var(--red)",
  readability: "var(--green)",
  maintainability: "var(--amber)",
};

const CATEGORY_ICONS = {
  performance: TrendingUp,
  security: Shield,
  readability: BookOpen,
  maintainability: Wrench,
};

const PRIORITY_LABELS = {
  high: { label: "High Priority", color: "var(--red)" },
  medium: { label: "Medium Priority", color: "var(--amber)" },
  low: { label: "Low Priority", color: "var(--text-muted)" },
};

interface ImprovementCardProps {
  improvement: Improvement;
  index: number;
}

export default function ImprovementCard({ improvement, index }: ImprovementCardProps) {
  const [expanded, setExpanded] = useState(index === 0);
  const Icon = CATEGORY_ICONS[improvement.category];
  const color = CATEGORY_COLORS[improvement.category];
  const priority = PRIORITY_LABELS[improvement.priority];

  return (
    <div className="improvement-card" style={{ borderLeftColor: color }}>
      <button className="improvement-header" onClick={() => setExpanded(!expanded)}>
        <div className="improvement-left">
          <div className="improvement-icon" style={{ color, background: `${color}18` }}>
            <Icon size={14} strokeWidth={2} />
          </div>
          <div className="improvement-meta">
            <span className="improvement-title">{improvement.title}</span>
            <div className="improvement-tags">
              <span className="improvement-category" style={{ color, borderColor: `${color}40`, background: `${color}12` }}>
                {improvement.category}
              </span>
              <span className="improvement-priority" style={{ color: priority.color }}>
                {priority.label}
              </span>
            </div>
          </div>
        </div>
        <div className="improvement-expand-icon">
          {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </div>
      </button>

      {expanded && (
        <div className="improvement-body">
          <p className="improvement-description">{improvement.description}</p>
          {improvement.example && (
            <div className="improvement-example">
              <span className="improvement-example-label">Example</span>
              <pre className="improvement-code"><code>{improvement.example}</code></pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
