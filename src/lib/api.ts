import { supabase } from "./supabase";
import { Analysis, Language } from "../types";
import { getSessionId, saveToHistory } from "./storage";

const FUNCTION_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/analyze-code`;

interface AnalyzeParams {
  code: string;
  language: Language;
  context?: string;
}

export async function analyzeCode(params: AnalyzeParams): Promise<Analysis> {
  const { data: sessionData } = await supabase.auth.getSession();
  const token = sessionData?.session?.access_token ?? import.meta.env.VITE_SUPABASE_ANON_KEY;

  const response = await fetch(FUNCTION_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Apikey: import.meta.env.VITE_SUPABASE_ANON_KEY as string,
    },
    body: JSON.stringify(params),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({ error: "Unknown error" }));
    throw new Error(err.error || `Request failed: ${response.status}`);
  }

  const raw = await response.json();

  const analysis: Analysis = {
    id: crypto.randomUUID(),
    timestamp: new Date().toISOString(),
    code: params.code,
    language: params.language,
    context: params.context,
    summary: raw.summary ?? "",
    explanation: raw.explanation ?? { overview: "", logic_breakdown: [], key_operations: [], dependencies: [] },
    bugs: raw.bugs ?? [],
    improvements: raw.improvements ?? [],
    complexity: raw.complexity ?? { time: "O(n)", space: "O(1)", explanation: "" },
    security_issues: raw.security_issues ?? [],
    rating: raw.rating ?? { overall: 7, efficiency: 7, security: 7, maintainability: 7, readability: 7 },
    processing_time: raw.processing_time ?? 0,
    mock: raw.mock ?? false,
  };

  const sessionId = getSessionId();
  saveToHistory(analysis);

  supabase
    .from("analyses")
    .insert({
      id: analysis.id,
      session_id: sessionId,
      code: analysis.code,
      language: analysis.language,
      context: analysis.context,
      summary: analysis.summary,
      explanation: analysis.explanation,
      bugs: analysis.bugs,
      improvements: analysis.improvements,
      complexity: analysis.complexity,
      security_issues: analysis.security_issues,
      rating: analysis.rating,
      processing_time: analysis.processing_time,
      created_at: analysis.timestamp,
    })
    .then(() => {});

  return analysis;
}
