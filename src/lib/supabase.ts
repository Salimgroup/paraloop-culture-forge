import { createClient } from '@supabase/supabase-js';

// Accessing existing environment variables or providing fallbacks
// It uses `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
