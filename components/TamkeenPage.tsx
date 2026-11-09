import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { notifyAll } from '../lib/notify';

export default function TamkeenPage({ onBack }: { onBack: () => void }) {
  const [type, setType] = useState('Small Business Grant'); const [amount, setAmount] = useState(''); const [currency, setCurrency] = useState('NGN ₦'); const [story, setStory] = useState(''); const [contact, setContact] = useState(''); const [requests, setRequests] = useState<any[]>([]); const [supported, setSupported] = useState<string[]>([]);
  const load = async () => { const { data } = await supabase.from('tamkeen_requests').select('*').order('created_at', { ascending: false }); setRequests(data || []); };
  useEffect(() => { load(); }, []);
  const post = async () => {
    if (!story) return alert('Please tell your story.');
    const { error } = await supabase.from('tamkeen_requests').insert([{ need_type: type, amount: `${currency} ${amount}`, story, contact }]);
    if (error) return alert(error.message);
    await notifyAll('general', `Tamkeen Request: ${type} — ${currency} ${amount}`, story.slice(0, 80), 'tamkeen');
    alert('Your request has been posted. The Ummah will see it.'); setStory(''); load();
  };
  const input = "w-full mt-1.5 bg-[#F7F3EC] border border-[#E8DDC8] rounded-[14px] px-3.5 py-3 text-[14px] outline-none";
  return (
    <div className="min-h-screen bg-[#0F2439] w-full max-w-[430px] mx-auto pb-[110px] overflow-x-hidden">
      <div className="px-4 pt-4 flex items-center gap-3"><button onClick={onBack} className="w-10 h-10 shrink-0 bg-white/10 rounded-full text-white">←</button><div><h1 className="text-white font-extrabold text-[18px]">TAMKEEN</h1><p className="text-[#D4AF78] text-[10px] font-bold">EMPOWER, DON'T PITY • GROW WITH DIGNITY</p></div></div>

      <div className="mx-4 mt-4 bg-white rounded-[22px] p-4"><p className="font-extrabold text-[15px]">How Tamkeen Works</p><p className="text-[12px] text-gray-500 leading-[1.65] mt-1">You share your plan — a business, a skill, school fees. The Ummah supports you with money, mentorship, or training. You grow and later help someone else.</p></div>

      <div className="mx-4 mt-3 bg-white rounded-[22px] p-4">
        <p className="font-extrabold text-[16px]">Request Empowerment</p>
        <label className="block text-[11px] font-bold text-gray-400 mt-4">WHAT DO YOU NEED?</label>
        <div className="flex flex-wrap gap-2 mt-2">{['Small Business Grant', 'Skill Training', 'Mentorship', 'School Fees'].map(t => (<button key={t} onClick={() => setType(t)} className={`px-3 py-2 rounded-full text-[11px] font-bold ${type === t ? 'bg-black text-white' : 'bg-gray-100'}`}>{t}</button>))}</div>
        <label className="block text-[11px] font-bold text-gray-400 mt-4">AMOUNT NEEDED & CURRENCY</label>
        <div className="flex gap-2 mt-1.5"><select value={currency} onChange={e => setCurrency(e.target.value)} className="bg-[#F7F3EC] border rounded-[14px] px-2 py-3 text-[13px] outline-none shrink-0"><option>NGN ₦</option><option>USD $</option><option>GBP £</option><option>EUR €</option><option>GHS GH₵</option><option>KES KSh</option><option>AED د.إ</option></select><input value={amount} onChange={e => setAmount(e.target.value)} placeholder="e.g. 50,000" className="flex-1 bg-[#F7F3EC] border rounded-[14px] px-3.5 py-3 text-[14px] outline-none min-w-0" /></div>
        <label className="block text-[11px] font-bold text-gray-400 mt-3">YOUR STORY / PLAN</label><textarea value={story} onChange={e => setStory(e.target.value)} placeholder="What will you do with it? How will it help you become stable? Be specific — people support clear plans." className={input} />
        <label className="block text-[11px] font-bold text-gray-400 mt-3">CONTACT (WHATSAPP)</label><input value={contact} onChange={e => setContact(e.target.value)} placeholder="WhatsApp number" className={input} />
        <button onClick={post} className="w-full mt-4 bg-emerald-600 text-white font-extrabold py-3.5 rounded-full text-[14px]">Submit Request →</button>
      </div>

      <p className="px-5 mt-4 text-white font-bold text-[14px]">People To Empower {requests.length > 0 && `(${requests.length})`}</p>
      {requests.length === 0 && <div className="mx-4 mt-3 bg-white/5 border border-white/10 rounded-[18px] p-5 text-center"><p className="text-[28px]">🌱</p><p className="text-white font-bold text-[14px] mt-2">No requests yet</p><p className="text-white/50 text-[12px] mt-1">Be the first to share your plan and get empowered.</p></div>}
      {requests.map(r => (
        <div key={r.id} className="mx-4 mt-3 bg-white rounded-[18px] p-4"><div className="flex justify-between gap-2"><p className="font-extrabold text-[14px] leading-tight">{r.need_type}</p><span className="text-[12px] font-bold shrink-0">{r.amount}</span></div><p className="text-[13px] leading-[1.6] text-gray-600 mt-2">{r.story}</p><div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-gray-100"><button onClick={() => setSupported(prev => prev.includes(r.id) ? prev.filter(id => id !== r.id) : [...prev, r.id])} className={`flex-1 py-3 rounded-full text-[13px] font-bold min-w-[140px] ${supported.includes(r.id) ? 'bg-emerald-600 text-white' : 'bg-black text-white'}`}>{supported.includes(r.id) ? '✓ You Are Supporting' : 'Support This Person →'}</button><button className="px-4 py-3 bg-gray-100 rounded-full text-[13px] font-bold">Mentor</button></div></div>
      ))}
    </div>
  );
      }
