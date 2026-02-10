-- ==============================================
-- TECHNICAL INTERVIEW PRACTICE ENGINE (TIPE)
-- Database Schema for Supabase
-- ==============================================

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==============================================
-- 1. USER TECHNICAL PROGRESS TABLE
-- Tracks overall progress per domain per user
-- ==============================================

CREATE TABLE IF NOT EXISTS user_technical_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  domain VARCHAR(50) NOT NULL,
  total_sessions INT DEFAULT 0,
  average_score DECIMAL(5,2) DEFAULT 0,
  last_session_at TIMESTAMP WITH TIME ZONE,
  weak_topics TEXT[] DEFAULT '{}',
  strong_topics TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Ensure one record per user per domain
  CONSTRAINT unique_user_domain UNIQUE(user_id, domain)
);

-- Index for faster lookups
CREATE INDEX IF NOT EXISTS idx_user_technical_progress_user_id 
ON user_technical_progress(user_id);

CREATE INDEX IF NOT EXISTS idx_user_technical_progress_domain 
ON user_technical_progress(domain);

-- ==============================================
-- 2. TIPE SESSIONS TABLE
-- Records individual practice sessions
-- ==============================================

CREATE TABLE IF NOT EXISTS tipe_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  domain VARCHAR(50) NOT NULL,
  mode VARCHAR(50) NOT NULL CHECK (mode IN ('concept', 'coding', 'followup', 'debugging')),
  difficulty VARCHAR(20) DEFAULT 'medium' CHECK (difficulty IN ('easy', 'medium', 'hard')),
  score DECIMAL(5,2) DEFAULT 0,
  questions_attempted INT DEFAULT 0,
  time_spent_seconds INT DEFAULT 0,
  feedback JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for session lookups
CREATE INDEX IF NOT EXISTS idx_tipe_sessions_user_id 
ON tipe_sessions(user_id);

CREATE INDEX IF NOT EXISTS idx_tipe_sessions_domain 
ON tipe_sessions(domain);

CREATE INDEX IF NOT EXISTS idx_tipe_sessions_created_at 
ON tipe_sessions(created_at DESC);

-- ==============================================
-- 3. QUESTION ATTEMPTS TABLE
-- Tracks individual question responses
-- ==============================================

CREATE TABLE IF NOT EXISTS tipe_question_attempts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id UUID NOT NULL REFERENCES tipe_sessions(id) ON DELETE CASCADE,
  question_id VARCHAR(100) NOT NULL,
  question_type VARCHAR(50) NOT NULL,
  user_answer TEXT,
  user_code TEXT, -- For coding questions
  score DECIMAL(5,2) DEFAULT 0,
  time_spent_seconds INT DEFAULT 0,
  hints_used INT DEFAULT 0,
  is_correct BOOLEAN DEFAULT FALSE,
  ai_feedback JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for session lookups
CREATE INDEX IF NOT EXISTS idx_tipe_question_attempts_session_id 
ON tipe_question_attempts(session_id);

-- ==============================================
-- 4. WEAK TOPICS TRACKING TABLE
-- Dedicated table for tracking weak areas
-- ==============================================

CREATE TABLE IF NOT EXISTS tipe_weak_topics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  domain VARCHAR(50) NOT NULL,
  topic VARCHAR(100) NOT NULL,
  failure_count INT DEFAULT 1,
  last_attempted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_resolved BOOLEAN DEFAULT FALSE,
  resolved_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- One record per user per topic
  CONSTRAINT unique_user_topic UNIQUE(user_id, domain, topic)
);

-- Index for weak topic lookups
CREATE INDEX IF NOT EXISTS idx_tipe_weak_topics_user_id 
ON tipe_weak_topics(user_id);

-- ==============================================
-- 5. ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================

-- Enable RLS on all tables
ALTER TABLE user_technical_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE tipe_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE tipe_question_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE tipe_weak_topics ENABLE ROW LEVEL SECURITY;

-- Policies for user_technical_progress
CREATE POLICY "Users can view own technical progress"
ON user_technical_progress FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own technical progress"
ON user_technical_progress FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own technical progress"
ON user_technical_progress FOR UPDATE
USING (auth.uid() = user_id);

-- Policies for tipe_sessions
CREATE POLICY "Users can view own sessions"
ON tipe_sessions FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own sessions"
ON tipe_sessions FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Policies for tipe_question_attempts
CREATE POLICY "Users can view own question attempts"
ON tipe_question_attempts FOR SELECT
USING (session_id IN (
  SELECT id FROM tipe_sessions WHERE user_id = auth.uid()
));

CREATE POLICY "Users can insert own question attempts"
ON tipe_question_attempts FOR INSERT
WITH CHECK (session_id IN (
  SELECT id FROM tipe_sessions WHERE user_id = auth.uid()
));

-- Policies for tipe_weak_topics
CREATE POLICY "Users can view own weak topics"
ON tipe_weak_topics FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own weak topics"
ON tipe_weak_topics FOR ALL
USING (auth.uid() = user_id);

-- ==============================================
-- 6. HELPER FUNCTIONS
-- ==============================================

-- Function to get user's overall technical readiness
CREATE OR REPLACE FUNCTION get_technical_readiness(p_user_id UUID)
RETURNS TABLE (
  domain VARCHAR(50),
  average_score DECIMAL(5,2),
  total_sessions INT,
  weak_count INT,
  strong_count INT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    utp.domain,
    utp.average_score,
    utp.total_sessions,
    COALESCE(array_length(utp.weak_topics, 1), 0) as weak_count,
    COALESCE(array_length(utp.strong_topics, 1), 0) as strong_count
  FROM user_technical_progress utp
  WHERE utp.user_id = p_user_id
  ORDER BY utp.average_score DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to update weak topics after a session
CREATE OR REPLACE FUNCTION update_weak_topics(
  p_user_id UUID,
  p_domain VARCHAR(50),
  p_topic VARCHAR(100),
  p_is_correct BOOLEAN
)
RETURNS VOID AS $$
BEGIN
  IF p_is_correct THEN
    -- Mark as resolved if correct
    UPDATE tipe_weak_topics
    SET is_resolved = TRUE, resolved_at = NOW()
    WHERE user_id = p_user_id 
      AND domain = p_domain 
      AND topic = p_topic;
  ELSE
    -- Insert or increment failure count
    INSERT INTO tipe_weak_topics (user_id, domain, topic, failure_count, last_attempted_at)
    VALUES (p_user_id, p_domain, p_topic, 1, NOW())
    ON CONFLICT (user_id, domain, topic)
    DO UPDATE SET 
      failure_count = tipe_weak_topics.failure_count + 1,
      last_attempted_at = NOW(),
      is_resolved = FALSE;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ==============================================
-- 7. TRIGGERS FOR AUTO-UPDATE
-- ==============================================

-- Trigger to auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_user_technical_progress_updated_at
BEFORE UPDATE ON user_technical_progress
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- ==============================================
-- 8. SAMPLE DATA DOMAINS (for reference)
-- ==============================================

-- Domain values:
-- 'dsa'        - Data Structures & Algorithms
-- 'dbms'       - Database Management Systems
-- 'os'         - Operating Systems
-- 'oops'       - Object Oriented Programming
-- 'networks'   - Computer Networks
-- 'c'          - C Programming
-- 'cpp'        - C++ Programming
-- 'java'       - Java Programming
-- 'python'     - Python Programming
-- 'javascript' - JavaScript

-- Mode values:
-- 'concept'   - Concept Explanation Mode
-- 'coding'    - Coding Practice Mode
-- 'followup'  - Follow-Up Question Mode
-- 'debugging' - Debugging Mode

-- Difficulty values:
-- 'easy'
-- 'medium'
-- 'hard'

-- ==============================================
-- END OF SCHEMA
-- ==============================================
