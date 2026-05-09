import { createClient } from '@supabase/supabase-js';

let _supabaseClient: any | null = null;
let _supabaseAdmin: any | null = null;

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`${name} is required.`);
  return value;
}

// Client-side Supabase client (uses anon key - safe for browser)
export function getSupabaseClient() {
  if (_supabaseClient) return _supabaseClient;
  const url = requireEnv('NEXT_PUBLIC_SUPABASE_URL');
  const anonKey = requireEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY');
  _supabaseClient = createClient(url, anonKey) as any;
  return _supabaseClient;
}

// Server-side Supabase client (uses service role key - server only)
export function getSupabaseAdmin() {
  if (_supabaseAdmin) return _supabaseAdmin;
  const url = requireEnv('NEXT_PUBLIC_SUPABASE_URL');
  const serviceRoleKey = requireEnv('SUPABASE_SERVICE_ROLE_KEY');
  _supabaseAdmin = createClient(url, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }) as any;
  return _supabaseAdmin;
}

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
