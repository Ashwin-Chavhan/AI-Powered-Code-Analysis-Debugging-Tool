import { useState, useCallback } from "react";
import { Analysis, Language } from "./types";
import { analyzeCode } from "./lib/api";
import { getHistory, clearHistory } from "./lib/storage";
import Header from "./components/Header";
import CodeInput from "./components/CodeInput";
import AnalysisResults from "./components/AnalysisResults";
import HistoryPanel from "./components/HistoryPanel";
import EmptyState from "./components/EmptyState";

export default function App() {
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState<Analysis[]>(() => getHistory());

  const handleAnalyze = useCallback(async (code: string, language: Language, context: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await analyzeCode({ code, language, context: context || undefined });
      setAnalysis(result);
      setHistory(getHistory());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Analysis failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleClearHistory = useCallback(() => {
    clearHistory();
    setHistory([]);
  }, []);

  return (
    <div className="app">
      <Header
        onToggleHistory={() => setShowHistory((v) => !v)}
        historyCount={history.length}
      />

      <main className="main">
        <div className="workspace">
          <div className="workspace-left">
            <CodeInput onAnalyze={handleAnalyze} isLoading={isLoading} />
          </div>
          <div className="workspace-right">
            {error && (
              <div className="error-banner">
                <span className="error-dot" />
                {error}
              </div>
            )}
            {isLoading ? (
              <div className="loading-state">
                <div className="loading-inner">
                  <div className="loading-rings">
                    <div className="loading-ring loading-ring--1" />
                    <div className="loading-ring loading-ring--2" />
                    <div className="loading-ring loading-ring--3" />
                  </div>
                  <p className="loading-title">Analyzing your code</p>
                  <p className="loading-desc">Scanning for bugs, security issues, and improvements...</p>
                </div>
              </div>
            ) : analysis ? (
              <AnalysisResults analysis={analysis} />
            ) : (
              <EmptyState />
            )}
          </div>
        </div>
      </main>

      {showHistory && (
        <HistoryPanel
          history={history}
          onSelect={setAnalysis}
          onClear={handleClearHistory}
          onClose={() => setShowHistory(false)}
        />
      )}
    </div>
  );
}
