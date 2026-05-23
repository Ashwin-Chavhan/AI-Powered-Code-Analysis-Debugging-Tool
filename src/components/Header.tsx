import { Shield, History, Zap } from "lucide-react";

interface HeaderProps {
  onToggleHistory: () => void;
  historyCount: number;
}

export default function Header({ onToggleHistory, historyCount }: HeaderProps) {
  return (
    <header className="header">
      <div className="header-inner">
        <div className="brand">
          <div className="brand-icon">
            <Zap size={18} strokeWidth={2.5} />
          </div>
          <div className="brand-text">
            <span className="brand-name">CodeVault</span>
            <span className="brand-tagline">AI-Powered Code Analysis</span>
          </div>
        </div>

        <div className="header-actions">
          <div className="status-pill">
            <span className="status-dot" />
            <span>AI Ready</span>
          </div>
          <button className="btn-history" onClick={onToggleHistory}>
            <History size={15} />
            <span>History</span>
            {historyCount > 0 && (
              <span className="history-badge">{historyCount}</span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
