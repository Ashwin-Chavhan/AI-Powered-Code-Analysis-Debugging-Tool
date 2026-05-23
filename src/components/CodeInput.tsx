import { useState } from "react";
import { Play, RotateCcw, ChevronDown } from "lucide-react";
import { Language } from "../types";

const LANGUAGES: { value: Language; label: string }[] = [
  { value: "javascript", label: "JavaScript" },
  { value: "typescript", label: "TypeScript" },
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "cpp", label: "C++" },
  { value: "go", label: "Go" },
  { value: "rust", label: "Rust" },
  { value: "csharp", label: "C#" },
  { value: "php", label: "PHP" },
  { value: "ruby", label: "Ruby" },
  { value: "swift", label: "Swift" },
];

const PLACEHOLDER = `// Paste your code here to analyze it...
// CodeVault will detect bugs, performance issues,
// security vulnerabilities, and more.

function example(data) {
  for (let i = 0; i <= data.length; i++) {
    console.log(data[i]);
  }
}`;

interface CodeInputProps {
  onAnalyze: (code: string, language: Language, context: string) => void;
  isLoading: boolean;
}

export default function CodeInput({ onAnalyze, isLoading }: CodeInputProps) {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState<Language>("javascript");
  const [context, setContext] = useState("");

  const lineCount = code ? code.split("\n").length : 0;
  const charCount = code.length;

  function handleSubmit() {
    if (!code.trim() || isLoading) return;
    onAnalyze(code, language, context);
  }

  function handleReset() {
    setCode("");
    setContext("");
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      handleSubmit();
    }
    if (e.key === "Tab") {
      e.preventDefault();
      const target = e.target as HTMLTextAreaElement;
      const start = target.selectionStart;
      const end = target.selectionEnd;
      const newValue = code.substring(0, start) + "  " + code.substring(end);
      setCode(newValue);
      setTimeout(() => {
        target.selectionStart = target.selectionEnd = start + 2;
      }, 0);
    }
  }

  return (
    <div className="code-input-panel">
      <div className="panel-header">
        <div className="panel-title">
          <span className="panel-title-text">Code Input</span>
        </div>
        <div className="lang-selector-wrapper">
          <select
            className="lang-selector"
            value={language}
            onChange={(e) => setLanguage(e.target.value as Language)}
          >
            {LANGUAGES.map((l) => (
              <option key={l.value} value={l.value}>
                {l.label}
              </option>
            ))}
          </select>
          <ChevronDown size={14} className="lang-selector-icon" />
        </div>
      </div>

      <div className="editor-wrapper">
        <div className="line-numbers" aria-hidden="true">
          {(code || PLACEHOLDER).split("\n").map((_, i) => (
            <span key={i}>{i + 1}</span>
          ))}
        </div>
        <textarea
          className="code-editor"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={PLACEHOLDER}
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
        />
      </div>

      <div className="editor-footer">
        <div className="editor-stats">
          {code ? (
            <>
              <span>{lineCount} lines</span>
              <span className="stat-divider">·</span>
              <span>{charCount.toLocaleString()} chars</span>
            </>
          ) : (
            <span className="hint">Cmd+Enter to analyze</span>
          )}
        </div>
      </div>

      <div className="context-section">
        <input
          className="context-input"
          type="text"
          placeholder="Optional context (e.g. 'This is a sorting algorithm for user data')"
          value={context}
          onChange={(e) => setContext(e.target.value)}
        />
      </div>

      <div className="actions-row">
        <button
          className="btn-reset"
          onClick={handleReset}
          disabled={!code && !context}
          title="Clear editor"
        >
          <RotateCcw size={14} />
          <span>Clear</span>
        </button>
        <button
          className="btn-analyze"
          onClick={handleSubmit}
          disabled={!code.trim() || isLoading}
        >
          {isLoading ? (
            <>
              <span className="spinner" />
              <span>Analyzing...</span>
            </>
          ) : (
            <>
              <Play size={15} strokeWidth={2.5} />
              <span>Analyze Code</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
