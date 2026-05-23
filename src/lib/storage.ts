import { Analysis } from "../types";

const HISTORY_KEY = "codevault_history";
const SESSION_KEY = "codevault_session";
const MAX_HISTORY = 20;

export function getSessionId(): string {
  let sessionId = localStorage.getItem(SESSION_KEY);
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    localStorage.setItem(SESSION_KEY, sessionId);
  }
  return sessionId;
}

export function getHistory(): Analysis[] {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Analysis[];
  } catch {
    return [];
  }
}

export function saveToHistory(analysis: Analysis): void {
  const history = getHistory();
  const updated = [analysis, ...history].slice(0, MAX_HISTORY);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
}

export function clearHistory(): void {
  localStorage.removeItem(HISTORY_KEY);
}

export function removeFromHistory(id: string): void {
  const history = getHistory();
  const updated = history.filter((a) => a.id !== id);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
}
