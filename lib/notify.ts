import { supabase } from './supabase';

// Call this after any important post - e go notify everybody
export async function notifyAll(type: string, title: string, message: string, link_page: string) {
  await supabase.from('notifications').insert([{ type, title, message, link_page }]);
}
