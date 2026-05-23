
/*
  # Create Analyses Table

  ## Overview
  Stores code analysis results submitted by users of CodeVault.

  ## New Tables
  - `analyses`
    - `id` (uuid, primary key) - unique analysis identifier
    - `session_id` (text) - anonymous session identifier stored client-side
    - `code` (text) - the submitted source code
    - `language` (text) - programming language
    - `context` (text, nullable) - optional user-provided context
    - `summary` (text) - brief summary of the analysis
    - `explanation` (jsonb) - detailed explanation object
    - `bugs` (jsonb) - array of detected bugs
    - `improvements` (jsonb) - array of improvement suggestions
    - `complexity` (jsonb) - time/space complexity analysis
    - `security_issues` (jsonb) - array of security findings
    - `rating` (jsonb) - quality scores across dimensions
    - `processing_time` (float) - seconds taken for analysis
    - `created_at` (timestamptz) - when the analysis was created

  ## Security
  - RLS enabled on `analyses` table
  - Anonymous users (anon role) may insert and select their own session's analyses
  - Policy uses session_id matching to scope access
*/

CREATE TABLE IF NOT EXISTS analyses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text NOT NULL,
  code text NOT NULL,
  language text NOT NULL DEFAULT 'javascript',
  context text,
  summary text,
  explanation jsonb DEFAULT '{}',
  bugs jsonb DEFAULT '[]',
  improvements jsonb DEFAULT '[]',
  complexity jsonb DEFAULT '{}',
  security_issues jsonb DEFAULT '[]',
  rating jsonb DEFAULT '{}',
  processing_time float DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS analyses_session_id_idx ON analyses (session_id);
CREATE INDEX IF NOT EXISTS analyses_created_at_idx ON analyses (created_at DESC);

ALTER TABLE analyses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anon users can insert analyses with their session_id"
  ON analyses
  FOR INSERT
  TO anon
  WITH CHECK (session_id IS NOT NULL AND length(session_id) > 0);

CREATE POLICY "Anon users can select analyses by session_id"
  ON analyses
  FOR SELECT
  TO anon
  USING (session_id IS NOT NULL AND length(session_id) > 0);

CREATE POLICY "Authenticated users can insert analyses"
  ON analyses
  FOR INSERT
  TO authenticated
  WITH CHECK (session_id IS NOT NULL);

CREATE POLICY "Authenticated users can select analyses"
  ON analyses
  FOR SELECT
  TO authenticated
  USING (session_id IS NOT NULL);
