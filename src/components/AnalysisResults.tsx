import { useState } from "react";
import { Analysis } from "../types";
import {
  FileSearch,
  Bug,
  Lightbulb,
  Shield,
  BarChart2,
  Clock,
  Cpu,
  CheckCircle2,
  ListTree,
  Package,
  FlaskConical,
} from "lucide-react";
import BugCard from "./BugCard";
import ImprovementCard from "./ImprovementCard";
import ComplexityCard from "./ComplexityCard";
import SecurityPanel from "./SecurityPanel";
import QualityMetrics from "./QualityMetrics";

type Tab = "overview" | "bugs" | "improvements" | "security" | "metrics";

interface AnalysisResultsProps {
  analysis: Analysis;
}

function TabButton({
  id,
  label,
  icon: Icon,
  active,
  count,
  onClick,
}: {
  id: Tab;
  label: string;
  icon: React.ElementType;
  active: boolean;
  count?: number;
  onClick: () => void;
}) {
  return (
    <button
      className={`results-tab ${active ? "results-tab--active" : ""}`}
      onClick={onClick}
    >
      <Icon size={14} strokeWidth={2} />
      <span>{label}</span>
      {count !== undefined && count > 0 && (
        <span className={`tab-count ${active ? "tab-count--active" : ""}`}>{count}</span>
      )}
    </button>
  );
}

export default function AnalysisResults({ analysis }: AnalysisResultsProps) {
  const [activeTab, setActiveTab] = useState<Tab>("overview");

  const criticalBugs = analysis.bugs.filter((b) => b.severity === "critical" || b.severity === "high").length;
  const criticalSecurity = analysis.security_issues.filter(
    (s) => s.severity === "critical" || s.severity === "high"
  ).length;

  return (
    <div className="results-panel">
      <div className="results-header">
        <div className="results-summary">
          <div className="results-summary-text">
            <h2 className="results-title">{analysis.summary}</h2>
            <div className="results-meta">
              <span className="results-lang-badge">{analysis.language}</span>
              <span className="results-meta-item">
                <Clock size={12} />
                {analysis.processing_time.toFixed(1)}s
              </span>
              <span className="results-meta-item">
                <Cpu size={12} />
                {analysis.code.split("\n").length} lines
              </span>
              {analysis.mock && (
                <span className="results-meta-item results-mock-badge">
                  <FlaskConical size={12} />
                  Demo Mode
                </span>
              )}
            </div>
          </div>
          <div className="results-overall-score">
            <div
              className="overall-score-number"
              style={{
                color:
                  analysis.rating.overall >= 8
                    ? "var(--green)"
                    : analysis.rating.overall >= 6
                    ? "var(--cyan)"
                    : analysis.rating.overall >= 4
                    ? "var(--amber)"
                    : "var(--red)",
              }}
            >
              {analysis.rating.overall.toFixed(1)}
            </div>
            <div className="overall-score-label">/ 10</div>
          </div>
        </div>

        <div className="results-tabs">
          <TabButton id="overview" label="Overview" icon={FileSearch} active={activeTab === "overview"} onClick={() => setActiveTab("overview")} />
          <TabButton id="bugs" label="Bugs" icon={Bug} active={activeTab === "bugs"} count={analysis.bugs.length} onClick={() => setActiveTab("bugs")} />
          <TabButton id="improvements" label="Improvements" icon={Lightbulb} active={activeTab === "improvements"} count={analysis.improvements.length} onClick={() => setActiveTab("improvements")} />
          <TabButton id="security" label="Security" icon={Shield} active={activeTab === "security"} count={criticalSecurity > 0 ? criticalSecurity : undefined} onClick={() => setActiveTab("security")} />
          <TabButton id="metrics" label="Metrics" icon={BarChart2} active={activeTab === "metrics"} onClick={() => setActiveTab("metrics")} />
        </div>
      </div>

      <div className="results-body">
        {activeTab === "overview" && (
          <div className="overview-panel">
            <div className="overview-section">
              <h3 className="overview-section-title">
                <FileSearch size={15} />
                Overview
              </h3>
              <p className="overview-text">{analysis.explanation.overview}</p>
            </div>

            <div className="overview-grid">
              <div className="overview-section">
                <h3 className="overview-section-title">
                  <ListTree size={15} />
                  Logic Breakdown
                </h3>
                <ul className="overview-list">
                  {analysis.explanation.logic_breakdown.map((item, i) => (
                    <li key={i} className="overview-list-item">
                      <span className="overview-list-num">{i + 1}</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="overview-section">
                <h3 className="overview-section-title">
                  <CheckCircle2 size={15} />
                  Key Operations
                </h3>
                <ul className="overview-ops-list">
                  {analysis.explanation.key_operations.map((op, i) => (
                    <li key={i} className="overview-ops-item">
                      <span className="overview-ops-dot" />
                      {op}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {analysis.explanation.dependencies.length > 0 && (
              <div className="overview-section">
                <h3 className="overview-section-title">
                  <Package size={15} />
                  Dependencies
                </h3>
                <div className="overview-deps">
                  {analysis.explanation.dependencies.map((dep, i) => (
                    <span key={i} className="overview-dep-tag">
                      {dep}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="overview-section">
              <h3 className="overview-section-title">
                <Clock size={15} />
                Complexity at a Glance
              </h3>
              <ComplexityCard complexity={analysis.complexity} />
            </div>

            <div className="overview-quick-stats">
              <div className={`quick-stat ${criticalBugs > 0 ? "quick-stat--warn" : "quick-stat--ok"}`}>
                <Bug size={14} />
                <span>{analysis.bugs.length} bug{analysis.bugs.length !== 1 ? "s" : ""} detected</span>
              </div>
              <div className={`quick-stat ${criticalSecurity > 0 ? "quick-stat--danger" : "quick-stat--ok"}`}>
                <Shield size={14} />
                <span>{analysis.security_issues.length} security issue{analysis.security_issues.length !== 1 ? "s" : ""}</span>
              </div>
              <div className="quick-stat quick-stat--info">
                <Lightbulb size={14} />
                <span>{analysis.improvements.length} improvement suggestion{analysis.improvements.length !== 1 ? "s" : ""}</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === "bugs" && (
          <div className="bugs-panel">
            {analysis.bugs.length === 0 ? (
              <div className="empty-state">
                <CheckCircle2 size={32} strokeWidth={1.5} className="empty-state-icon empty-state-icon--green" />
                <h3 className="empty-state-title">No Bugs Detected</h3>
                <p className="empty-state-desc">The code appears to be free of common bugs and logic errors.</p>
              </div>
            ) : (
              <div className="cards-list">
                {analysis.bugs.map((bug, i) => (
                  <BugCard key={bug.id} bug={bug} index={i} />
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "improvements" && (
          <div className="improvements-panel">
            {analysis.improvements.length === 0 ? (
              <div className="empty-state">
                <CheckCircle2 size={32} strokeWidth={1.5} className="empty-state-icon empty-state-icon--green" />
                <h3 className="empty-state-title">Code Looks Great</h3>
                <p className="empty-state-desc">No significant improvements were identified.</p>
              </div>
            ) : (
              <div className="cards-list">
                {analysis.improvements.map((imp, i) => (
                  <ImprovementCard key={imp.id} improvement={imp} index={i} />
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "security" && (
          <SecurityPanel issues={analysis.security_issues} />
        )}

        {activeTab === "metrics" && (
          <QualityMetrics rating={analysis.rating} />
        )}
      </div>
    </div>
  );
}
