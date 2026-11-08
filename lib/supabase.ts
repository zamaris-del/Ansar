import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://evlkibuyaiefdjgwjalz.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_yUU17GM6vIKIGEnlkqHKZA_bC_iYc2w';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
