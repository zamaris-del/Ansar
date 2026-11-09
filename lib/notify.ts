import { supabase } from './supabase';

export async function notifyAll(type: string, title: string, message: string, link_page: string) {
  await supabase.from('notifications').insert([{ type, title, message, link_page }]);
}
