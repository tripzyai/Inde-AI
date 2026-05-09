import { createClient } from '@supabase/supabase-js';

// Client-side Supabase client (uses anon key - safe for browser)
export const supabaseClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Server-side Supabase client (uses service role key - server only)
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

// Database types for TypeScript
export interface AuditRequest {
  id?: string;
  industry: string;
  website_url: string;
  name: string;
  email: string;
  phone?: string;
  company_name?: string;
  automation_goal: string;
  current_process: string;
  biggest_problem: string;
  tools_used: string[];
  ai_summary?: string;
  ai_recommendations?: any;
  lead_score?: number;
  status?: string;
  priority?: string;
  source?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ConversationMessage {
  id?: string;
  audit_request_id: string;
  message_text: string;
  is_ai_message: boolean;
  step_number?: number;
  created_at?: string;
}
