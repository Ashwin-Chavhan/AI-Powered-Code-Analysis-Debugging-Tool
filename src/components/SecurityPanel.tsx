import { SecurityIssue, Severity } from "../types";
import { ShieldAlert, ShieldCheck } from "lucide-react";

const SEVERITY_COLORS: Record<Severity, string> = {
  critical: "var(--red)",
  high: "var(--amber)",
  medium: "var(--yellow)",
  low: "var(--text-muted)",
};

interface SecurityPanelProps {
  issues: SecurityIssue[];
}

export default function SecurityPanel({ issues }: SecurityPanelProps) {
  if (issues.length === 0) {
    return (
      <div className="security-empty">
        <div className="security-empty-icon">
          <ShieldCheck size={32} strokeWidth={1.5} />
        </div>
        <h3 className="security-empty-title">No Security Issues Detected</h3>
        <p className="security-empty-desc">
          The code analysis found no obvious security vulnerabilities. Always perform a manual review for critical applications.
        </p>
      </div>
    );
  }

  return (
    <div className="security-list">
      {issues.map((issue) => {
        const color = SEVERITY_COLORS[issue.severity];
        return (
          <div key={issue.id} className="security-card" style={{ borderLeftColor: color }}>
            <div className="security-card-header">
              <div className="security-card-icon" style={{ color, background: `${color}18` }}>
                <ShieldAlert size={14} strokeWidth={2} />
              </div>
              <div className="security-card-meta">
                <span className="security-type">{issue.type}</span>
                <span className="security-severity" style={{ color, borderColor: `${color}40`, background: `${color}12` }}>
                  {issue.severity}
                </span>
              </div>
            </div>
            <p className="security-description">{issue.description}</p>
            <div className="security-recommendation">
              <span className="security-recommendation-label">Recommendation</span>
              <p className="security-recommendation-text">{issue.recommendation}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
