import { Analysis } from "../types";
import { X, Trash2, Clock, Code2 } from "lucide-react";
import { formatDistanceToNow } from "../lib/time";

interface HistoryPanelProps {
  history: Analysis[];
  onSelect: (analysis: Analysis) => void;
  onClear: () => void;
  onClose: () => void;
}

export default function HistoryPanel({ history, onSelect, onClear, onClose }: HistoryPanelProps) {
  return (
    <div className="history-overlay" onClick={onClose}>
      <div className="history-panel" onClick={(e) => e.stopPropagation()}>
        <div className="history-header">
          <div className="history-title">
            <Clock size={16} />
            <span>Analysis History</span>
            {history.length > 0 && (
              <span className="history-count">{history.length}</span>
            )}
          </div>
          <div className="history-header-actions">
            {history.length > 0 && (
              <button className="btn-clear-history" onClick={onClear} title="Clear all history">
                <Trash2 size={14} />
              </button>
            )}
            <button className="btn-close-history" onClick={onClose}>
              <X size={16} />
            </button>
          </div>
        </div>

        <div className="history-body">
          {history.length === 0 ? (
            <div className="history-empty">
              <Code2 size={28} strokeWidth={1.5} />
              <p>No analyses yet. Submit some code to get started.</p>
            </div>
          ) : (
            <div className="history-list">
              {history.map((item) => (
                <button
                  key={item.id}
                  className="history-item"
                  onClick={() => {
                    onSelect(item);
                    onClose();
                  }}
                >
                  <div className="history-item-header">
                    <span className="history-item-lang">{item.language}</span>
                    <span className="history-item-time">
                      {formatDistanceToNow(new Date(item.timestamp))}
                    </span>
                  </div>
                  <p className="history-item-summary">{item.summary}</p>
                  <div className="history-item-stats">
                    <span>{item.bugs.length} bugs</span>
                    <span className="history-stat-dot">·</span>
                    <span>{item.security_issues.length} security</span>
                    <span className="history-stat-dot">·</span>
                    <span>{item.rating.overall.toFixed(1)}/10</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
