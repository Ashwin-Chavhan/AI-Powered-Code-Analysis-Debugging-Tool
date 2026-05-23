export type Language =
  | "javascript"
  | "typescript"
  | "python"
  | "java"
  | "cpp"
  | "go"
  | "rust"
  | "csharp"
  | "php"
  | "ruby"
  | "swift";

export type Severity = "critical" | "high" | "medium" | "low";
export type BugType = "logic" | "performance" | "security" | "style";
export type ImprovementCategory = "performance" | "security" | "readability" | "maintainability";
export type Priority = "high" | "medium" | "low";

export interface Bug {
  id: string;
  type: BugType;
  severity: Severity;
  line?: number;
  title: string;
  description: string;
  suggestion: string;
}

export interface Improvement {
  id: string;
  category: ImprovementCategory;
  title: string;
  description: string;
  example?: string;
  priority: Priority;
}

export interface Complexity {
  time: string;
  space: string;
  explanation: string;
}

export interface SecurityIssue {
  id: string;
  severity: Severity;
  type: string;
  description: string;
  recommendation: string;
}

export interface Rating {
  overall: number;
  efficiency: number;
  security: number;
  maintainability: number;
  readability: number;
}

export interface Explanation {
  overview: string;
  logic_breakdown: string[];
  key_operations: string[];
  dependencies: string[];
}

export interface Analysis {
  id: string;
  timestamp: string;
  code: string;
  language: Language;
  context?: string;
  summary: string;
  explanation: Explanation;
  bugs: Bug[];
  improvements: Improvement[];
  complexity: Complexity;
  security_issues: SecurityIssue[];
  rating: Rating;
  processing_time: number;
  mock?: boolean;
}
