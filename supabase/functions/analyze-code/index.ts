import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface AnalysisRequest {
  code: string;
  language: string;
  context?: string;
}

function generateMockAnalysis(code: string, language: string) {
  const lines = code.split("\n").length;
  const hasFunctions = /function|def |fn |fun |void |public |private /.test(code);
  const hasLoops = /for |while |forEach|\.map\(|\.filter\(/.test(code);
  const hasAsync = /async|await|Promise|setTimeout|fetch/.test(code);
  const hasSql = /SELECT|INSERT|UPDATE|DELETE|FROM|WHERE/i.test(code);
  const hasHardcodedSecrets = /password\s*=\s*["'][^"']+["']|api_key\s*=\s*["'][^"']+["']|secret\s*=\s*["'][^"']+["']/i.test(code);
  const hasEval = /eval\(|exec\(/.test(code);
  const hasRecursion = /function\s+(\w+)[^{]*\{[^}]*\1\s*\(/.test(code) || code.split("\n").some((l, i, arr) => {
    const funcMatch = l.match(/(?:def|function)\s+(\w+)/);
    if (!funcMatch) return false;
    return arr.slice(i + 1).some(l2 => l2.includes(funcMatch[1] + "("));
  });

  const bugs = [];
  const security_issues = [];

  if (hasEval) {
    bugs.push({
      id: "bug-1",
      type: "security",
      severity: "critical",
      title: "Use of eval() detected",
      description: "eval() or exec() can execute arbitrary code and is a major security vulnerability.",
      suggestion: "Replace eval() with safer alternatives like JSON.parse() for data, or refactor logic to avoid dynamic code execution."
    });
    security_issues.push({
      id: "sec-1",
      severity: "critical",
      type: "Code Injection",
      description: "eval() allows arbitrary code execution which can be exploited by attackers.",
      recommendation: "Remove eval() and use safer parsing methods."
    });
  }

  if (hasHardcodedSecrets) {
    security_issues.push({
      id: "sec-2",
      severity: "high",
      type: "Hardcoded Credentials",
      description: "Hardcoded passwords or API keys found in source code. These will be exposed in version control.",
      recommendation: "Move sensitive values to environment variables or a secrets management service."
    });
    bugs.push({
      id: "bug-2",
      type: "security",
      severity: "high",
      title: "Hardcoded sensitive data",
      description: "Credentials or API keys are hardcoded directly in the source code.",
      suggestion: "Use environment variables: process.env.API_KEY or os.environ['API_KEY']"
    });
  }

  if (hasRecursion) {
    bugs.push({
      id: "bug-3",
      type: "performance",
      severity: "medium",
      title: "Recursive function without memoization",
      description: "Recursive calls may lead to exponential time complexity without caching.",
      suggestion: "Add memoization using a cache object or use an iterative approach for better performance."
    });
  }

  if (hasLoops && !hasAsync) {
    bugs.push({
      id: "bug-4",
      type: "performance",
      severity: "low",
      title: "Synchronous loop over potentially large dataset",
      description: "Blocking iteration may cause performance issues with large datasets.",
      suggestion: "Consider using async iteration, pagination, or lazy evaluation for large datasets."
    });
  }

  if (hasSql) {
    security_issues.push({
      id: "sec-3",
      severity: "high",
      type: "SQL Injection Risk",
      description: "Direct SQL query construction detected. If user input is concatenated, SQL injection is possible.",
      recommendation: "Use parameterized queries or prepared statements. Never concatenate user input into SQL strings."
    });
  }

  const improvements = [
    {
      id: "imp-1",
      category: "readability",
      title: "Add type annotations",
      description: `Adding explicit type annotations improves code documentation and enables static analysis tools to catch type-related bugs early.`,
      example: language === "python" ? "def process(data: list[str]) -> dict[str, int]:" : "function process(data: string[]): Record<string, number>",
      priority: "medium"
    },
    {
      id: "imp-2",
      category: "maintainability",
      title: "Extract magic numbers into named constants",
      description: "Unnamed numeric literals make code harder to understand and maintain. Named constants communicate intent clearly.",
      example: language === "python" ? "MAX_RETRIES = 3\nTIMEOUT_SECONDS = 30" : "const MAX_RETRIES = 3;\nconst TIMEOUT_MS = 30_000;",
      priority: "low"
    },
    {
      id: "imp-3",
      category: "performance",
      title: hasLoops ? "Optimize loop with early termination" : "Use lazy evaluation",
      description: hasLoops
        ? "Adding early return/break conditions can significantly reduce unnecessary iterations."
        : "Defer expensive computations until results are actually needed.",
      example: hasLoops ? "for item in collection:\n    if condition(item):\n        return item  # Early exit" : undefined,
      priority: "medium"
    },
    {
      id: "imp-4",
      category: "security",
      title: "Add input validation",
      description: "Validate and sanitize all external inputs before processing. This prevents injection attacks and unexpected behavior.",
      priority: "high"
    }
  ];

  const timeComplexity = hasRecursion ? "O(2^n)" : hasLoops ? "O(n)" : "O(1)";
  const spaceComplexity = hasRecursion ? "O(n)" : hasLoops ? "O(n)" : "O(1)";

  const overallScore = Math.max(4, Math.min(9, 7 - (bugs.length * 0.5) - (security_issues.length * 0.8)));

  return {
    summary: `${language.charAt(0).toUpperCase() + language.slice(1)} code with ${lines} lines${hasFunctions ? ", defining functions" : ""}${hasAsync ? ", using async patterns" : ""}${hasLoops ? ", containing iteration" : ""}.`,
    explanation: {
      overview: `This ${language} code contains ${lines} lines${hasFunctions ? " with function definitions" : ""}. ${hasAsync ? "It uses asynchronous patterns for non-blocking execution. " : ""}${hasSql ? "SQL database operations are present. " : ""}The code appears to handle ${hasLoops ? "data iteration and transformation" : "direct computation or configuration"}.`,
      logic_breakdown: [
        hasFunctions ? "Function definitions establish reusable logic blocks" : "Code executes sequentially at the module level",
        hasLoops ? "Iteration constructs process collections or repeat operations" : "Direct operations are performed without explicit loops",
        hasAsync ? "Async/await syntax manages asynchronous operations and I/O" : "Synchronous execution model — each step completes before the next begins",
        hasSql ? "Database queries interact with persistent storage" : "In-memory data structures are used for state management"
      ],
      key_operations: [
        hasFunctions ? "Function definition and invocation" : "Expression evaluation",
        hasLoops ? "Iterative data processing" : "Direct value computation",
        hasAsync ? "Asynchronous I/O handling" : "Synchronous execution flow",
        hasSql ? "Database read/write operations" : "In-memory data manipulation"
      ],
      dependencies: [
        hasAsync && language === "javascript" ? "Native Promise API / async-await" : null,
        hasSql ? "Database driver/ORM" : null,
        language === "python" ? "Python standard library" : "Browser/Node.js runtime",
      ].filter(Boolean) as string[]
    },
    bugs,
    improvements,
    complexity: {
      time: timeComplexity,
      space: spaceComplexity,
      explanation: hasRecursion
        ? `The recursive structure creates ${timeComplexity} time complexity due to repeated sub-problem computation without memoization. Each call branches into multiple recursive calls.`
        : hasLoops
        ? `Linear ${timeComplexity} time complexity from iterating through the data collection once. ${spaceComplexity} space is used for any accumulated results.`
        : `Constant ${timeComplexity} time complexity — the code performs a fixed number of operations regardless of input size.`
    },
    security_issues,
    rating: {
      overall: Math.round(overallScore * 10) / 10,
      efficiency: Math.round((hasRecursion ? 5 : hasLoops ? 7 : 8) * 10) / 10,
      security: Math.round((hasHardcodedSecrets || hasEval ? 3 : hasSql ? 6 : 8) * 10) / 10,
      maintainability: Math.round((lines > 100 ? 6 : 8) * 10) / 10,
      readability: Math.round(7.5 * 10) / 10
    },
    mock: true
  };
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const { code, language, context }: AnalysisRequest = await req.json();

    if (!code || code.trim().length === 0) {
      return new Response(
        JSON.stringify({ error: "Code is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const startTime = Date.now();
    const openaiKey = Deno.env.get("OPENAI_API_KEY");

    if (openaiKey) {
      const systemPrompt = `You are an expert code analysis engine. Analyze the provided code and return a JSON object with this exact structure:
{
  "summary": "one-sentence summary",
  "explanation": {
    "overview": "2-3 sentence overview",
    "logic_breakdown": ["step 1", "step 2", "step 3"],
    "key_operations": ["op 1", "op 2"],
    "dependencies": ["dep 1", "dep 2"]
  },
  "bugs": [
    {
      "id": "bug-1",
      "type": "logic|performance|security|style",
      "severity": "critical|high|medium|low",
      "line": optional_number,
      "title": "short title",
      "description": "detailed description",
      "suggestion": "specific fix"
    }
  ],
  "improvements": [
    {
      "id": "imp-1",
      "category": "performance|security|readability|maintainability",
      "title": "improvement title",
      "description": "why and what",
      "example": "optional code example",
      "priority": "high|medium|low"
    }
  ],
  "complexity": {
    "time": "O(n)",
    "space": "O(1)",
    "explanation": "brief explanation"
  },
  "security_issues": [
    {
      "id": "sec-1",
      "severity": "critical|high|medium|low",
      "type": "vulnerability type",
      "description": "description",
      "recommendation": "how to fix"
    }
  ],
  "rating": {
    "overall": 7.5,
    "efficiency": 7.0,
    "security": 8.0,
    "maintainability": 7.5,
    "readability": 8.0
  },
  "mock": false
}
Return ONLY valid JSON, no markdown, no explanation.`;

      const userPrompt = `Language: ${language}\n${context ? `Context: ${context}\n` : ""}Code:\n\`\`\`${language}\n${code}\n\`\`\``;

      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${openaiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: Deno.env.get("LLM_MODEL") || "gpt-4o-mini",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt }
          ],
          temperature: 0.3,
          response_format: { type: "json_object" }
        })
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status}`);
      }

      const aiData = await response.json();
      const analysisText = aiData.choices[0].message.content;
      const analysis = JSON.parse(analysisText);
      const processingTime = (Date.now() - startTime) / 1000;

      return new Response(
        JSON.stringify({ ...analysis, processing_time: processingTime }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    await new Promise(resolve => setTimeout(resolve, 1200));
    const analysis = generateMockAnalysis(code, language);
    const processingTime = (Date.now() - startTime) / 1000;

    return new Response(
      JSON.stringify({ ...analysis, processing_time: processingTime }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (err) {
    const error = err as Error;
    return new Response(
      JSON.stringify({ error: error.message || "Analysis failed" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
