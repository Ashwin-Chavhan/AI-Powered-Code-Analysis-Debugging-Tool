import { Zap, Bug, TrendingUp, Shield } from "lucide-react";

export default function EmptyState() {
  return (
    <div className="empty-results">
      <div className="empty-results-inner">
        <div className="empty-results-icon">
          <Zap size={32} strokeWidth={1.5} />
        </div>
        <h2 className="empty-results-title">Ready to Analyze</h2>
        <p className="empty-results-desc">
          Paste your code in the editor, select the language, and hit Analyze to get instant AI-powered insights.
        </p>

        <div className="feature-grid">
          <div className="feature-item">
            <div className="feature-icon feature-icon--cyan">
              <Bug size={16} strokeWidth={2} />
            </div>
            <div className="feature-text">
              <span className="feature-name">Bug Detection</span>
              <span className="feature-desc">Logic, performance & style issues</span>
            </div>
          </div>
          <div className="feature-item">
            <div className="feature-icon feature-icon--amber">
              <TrendingUp size={16} strokeWidth={2} />
            </div>
            <div className="feature-text">
              <span className="feature-name">Complexity Analysis</span>
              <span className="feature-desc">Time & space complexity with Big-O</span>
            </div>
          </div>
          <div className="feature-item">
            <div className="feature-icon feature-icon--red">
              <Shield size={16} strokeWidth={2} />
            </div>
            <div className="feature-text">
              <span className="feature-name">Security Scan</span>
              <span className="feature-desc">Vulnerabilities & best practices</span>
            </div>
          </div>
          <div className="feature-item">
            <div className="feature-icon feature-icon--green">
              <Zap size={16} strokeWidth={2} />
            </div>
            <div className="feature-text">
              <span className="feature-name">Quality Metrics</span>
              <span className="feature-desc">Scored across 4 dimensions</span>
            </div>
          </div>
        </div>

        <div className="supported-langs">
          <span className="supported-langs-label">Supports</span>
          {["Python", "JS", "TS", "Java", "Go", "Rust", "C++", "C#", "Ruby", "PHP"].map((lang) => (
            <span key={lang} className="lang-chip">{lang}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
