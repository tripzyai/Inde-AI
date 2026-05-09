-- ============================================
-- INDE AI - SUPABASE DATABASE SCHEMA
-- ============================================
-- This schema handles:
-- - Audit requests from chatbot
-- - Lead management
-- - Conversation history
-- - AI analysis and recommendations
-- - Email notifications tracking
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- 1. AUDIT REQUESTS TABLE
-- Main table storing all workflow audit requests
-- ============================================
CREATE TABLE audit_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    -- Business Information
    industry TEXT NOT NULL,
    website_url TEXT NOT NULL,

    -- Contact Information
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    company_name TEXT,

    -- Audit Details
    automation_goal TEXT NOT NULL,
    current_process TEXT NOT NULL,
    biggest_problem TEXT NOT NULL,
    tools_used TEXT[] NOT NULL DEFAULT '{}',

    -- AI Analysis
    ai_summary TEXT,
    ai_recommendations JSONB,
    lead_score INTEGER CHECK (lead_score >= 0 AND lead_score <= 100),

    -- Status Tracking
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'contacted', 'qualified', 'converted', 'rejected')),
    priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),

    -- Metadata
    source TEXT DEFAULT 'website_chatbot',
    utm_source TEXT,
    utm_medium TEXT,
    utm_campaign TEXT,
    referrer TEXT,
    user_agent TEXT,
    ip_address INET,

    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    contacted_at TIMESTAMP WITH TIME ZONE,
    converted_at TIMESTAMP WITH TIME ZONE,

    -- Notes
    internal_notes TEXT,

    -- Soft delete
    deleted_at TIMESTAMP WITH TIME ZONE
);

-- Indexes for performance
CREATE INDEX idx_audit_requests_email ON audit_requests(email);
CREATE INDEX idx_audit_requests_created_at ON audit_requests(created_at DESC);
CREATE INDEX idx_audit_requests_status ON audit_requests(status);
CREATE INDEX idx_audit_requests_industry ON audit_requests(industry);
CREATE INDEX idx_audit_requests_lead_score ON audit_requests(lead_score DESC);
CREATE INDEX idx_audit_requests_deleted_at ON audit_requests(deleted_at) WHERE deleted_at IS NULL;

-- ============================================
-- 2. CONVERSATION MESSAGES TABLE
-- Stores full chatbot conversation history
-- ============================================
CREATE TABLE conversation_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    audit_request_id UUID REFERENCES audit_requests(id) ON DELETE CASCADE,

    -- Message Details
    message_text TEXT NOT NULL,
    is_ai_message BOOLEAN DEFAULT false,
    step_number INTEGER,

    -- Metadata
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for quick conversation retrieval
CREATE INDEX idx_conversation_audit_id ON conversation_messages(audit_request_id, created_at);

-- ============================================
-- 3. EMAIL NOTIFICATIONS TABLE
-- Tracks all emails sent
-- ============================================
CREATE TABLE email_notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    audit_request_id UUID REFERENCES audit_requests(id) ON DELETE SET NULL,

    -- Email Details
    recipient_email TEXT NOT NULL,
    email_type TEXT NOT NULL CHECK (email_type IN ('audit_confirmation', 'follow_up', 'reminder', 'proposal', 'other')),
    subject TEXT NOT NULL,

    -- Status
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'delivered', 'opened', 'clicked', 'bounced', 'failed')),
    provider_message_id TEXT,

    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    sent_at TIMESTAMP WITH TIME ZONE,
    delivered_at TIMESTAMP WITH TIME ZONE,
    opened_at TIMESTAMP WITH TIME ZONE,
    clicked_at TIMESTAMP WITH TIME ZONE
);

-- Indexes
CREATE INDEX idx_email_notifications_audit_id ON email_notifications(audit_request_id);
CREATE INDEX idx_email_notifications_status ON email_notifications(status);
CREATE INDEX idx_email_notifications_created_at ON email_notifications(created_at DESC);

-- ============================================
-- 4. AI ANALYSIS CACHE TABLE
-- Caches AI-generated insights to avoid redundant API calls
-- ============================================
CREATE TABLE ai_analysis_cache (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    -- Input Hash (for deduplication)
    input_hash TEXT UNIQUE NOT NULL,

    -- Input Data
    industry TEXT NOT NULL,
    automation_goal TEXT NOT NULL,
    current_process TEXT NOT NULL,
    biggest_problem TEXT NOT NULL,

    -- AI Response
    ai_model TEXT NOT NULL,
    ai_response TEXT NOT NULL,
    ai_recommendations JSONB,

    -- Token Usage
    prompt_tokens INTEGER,
    completion_tokens INTEGER,
    total_tokens INTEGER,

    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    accessed_count INTEGER DEFAULT 1,
    last_accessed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for cache lookups
CREATE INDEX idx_ai_cache_hash ON ai_analysis_cache(input_hash);

-- ============================================
-- 5. WEBSITE ANALYSIS TABLE
-- Stores automated website audit results
-- ============================================
CREATE TABLE website_analysis (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    audit_request_id UUID REFERENCES audit_requests(id) ON DELETE CASCADE,
    website_url TEXT NOT NULL,

    -- Technical Analysis
    has_contact_form BOOLEAN,
    has_live_chat BOOLEAN,
    has_booking_system BOOLEAN,
    page_load_time_ms INTEGER,
    mobile_friendly BOOLEAN,
    ssl_enabled BOOLEAN,

    -- Content Analysis
    has_faq BOOLEAN,
    has_pricing BOOLEAN,
    has_testimonials BOOLEAN,

    -- SEO
    meta_description TEXT,
    page_title TEXT,

    -- Screenshots
    screenshot_url TEXT,

    -- Raw Data
    analysis_data JSONB,

    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index
CREATE INDEX idx_website_analysis_audit_id ON website_analysis(audit_request_id);
CREATE INDEX idx_website_analysis_url ON website_analysis(website_url);

-- ============================================
-- 6. ACTIVITY LOG TABLE
-- Tracks all actions and changes
-- ============================================
CREATE TABLE activity_log (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    audit_request_id UUID REFERENCES audit_requests(id) ON DELETE SET NULL,

    -- Activity Details
    activity_type TEXT NOT NULL,
    description TEXT NOT NULL,
    actor TEXT, -- email or 'system'

    -- Data
    old_value JSONB,
    new_value JSONB,

    -- Timestamp
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_activity_log_audit_id ON activity_log(audit_request_id, created_at DESC);
CREATE INDEX idx_activity_log_created_at ON activity_log(created_at DESC);

-- ============================================
-- FUNCTIONS & TRIGGERS
-- ============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger for audit_requests
CREATE TRIGGER update_audit_requests_updated_at
    BEFORE UPDATE ON audit_requests
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Function to calculate lead score
CREATE OR REPLACE FUNCTION calculate_lead_score(
    p_industry TEXT,
    p_biggest_problem TEXT,
    p_tools_count INTEGER
)
RETURNS INTEGER AS $$
DECLARE
    score INTEGER := 50; -- Base score
BEGIN
    -- Industry bonus
    IF p_industry IN ('Law Firm', 'Dental / Healthcare Clinic', 'Accounting / Tax Firm') THEN
        score := score + 20;
    END IF;

    -- Problem urgency bonus
    IF p_biggest_problem IN ('We miss leads after hours', 'Response time is slow') THEN
        score := score + 15;
    END IF;

    -- Tools integration potential
    score := score + (p_tools_count * 3);

    -- Cap at 100
    IF score > 100 THEN
        score := 100;
    END IF;

    RETURN score;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- Enable RLS for data protection
-- ============================================

-- Enable RLS on all tables
ALTER TABLE audit_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversation_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_analysis_cache ENABLE ROW LEVEL SECURITY;
ALTER TABLE website_analysis ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_log ENABLE ROW LEVEL SECURITY;

-- Policy: Allow service role full access (for API)
CREATE POLICY "Service role has full access" ON audit_requests
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role has full access" ON conversation_messages
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role has full access" ON email_notifications
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role has full access" ON ai_analysis_cache
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role has full access" ON website_analysis
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role has full access" ON activity_log
    FOR ALL USING (auth.role() = 'service_role');

-- ============================================
-- VIEWS
-- Convenient views for common queries
-- ============================================

-- View: Recent high-priority leads
CREATE VIEW high_priority_leads AS
SELECT
    ar.*,
    COUNT(cm.id) as message_count,
    MAX(cm.created_at) as last_message_at
FROM audit_requests ar
LEFT JOIN conversation_messages cm ON ar.id = cm.audit_request_id
WHERE ar.deleted_at IS NULL
    AND ar.status IN ('pending', 'reviewed')
    AND (ar.priority IN ('high', 'urgent') OR ar.lead_score >= 70)
GROUP BY ar.id
ORDER BY ar.created_at DESC;

-- View: Daily metrics
CREATE VIEW daily_audit_metrics AS
SELECT
    DATE(created_at) as date,
    COUNT(*) as total_audits,
    COUNT(*) FILTER (WHERE status = 'qualified') as qualified_count,
    COUNT(*) FILTER (WHERE status = 'converted') as converted_count,
    AVG(lead_score) as avg_lead_score,
    COUNT(DISTINCT industry) as industries_count
FROM audit_requests
WHERE deleted_at IS NULL
GROUP BY DATE(created_at)
ORDER BY date DESC;

-- ============================================
-- SAMPLE QUERIES
-- Common queries you'll use
-- ============================================

-- Get all audit requests with conversation history
-- SELECT ar.*,
--        json_agg(cm ORDER BY cm.created_at) as messages
-- FROM audit_requests ar
-- LEFT JOIN conversation_messages cm ON ar.id = cm.audit_request_id
-- WHERE ar.deleted_at IS NULL
-- GROUP BY ar.id
-- ORDER BY ar.created_at DESC;

-- Get leads by industry
-- SELECT industry, COUNT(*) as count, AVG(lead_score) as avg_score
-- FROM audit_requests
-- WHERE deleted_at IS NULL
-- GROUP BY industry
-- ORDER BY count DESC;

-- Get conversion funnel
-- SELECT
--     COUNT(*) FILTER (WHERE status = 'pending') as pending,
--     COUNT(*) FILTER (WHERE status = 'reviewed') as reviewed,
--     COUNT(*) FILTER (WHERE status = 'qualified') as qualified,
--     COUNT(*) FILTER (WHERE status = 'converted') as converted
-- FROM audit_requests
-- WHERE deleted_at IS NULL;
