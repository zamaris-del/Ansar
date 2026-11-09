import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { notifyAll } from '../lib/notify';

export default function TamkeenPage({ onBack }: { onBack: () => void }) {
  const [type, setType] = useState('Small Business Grant'); const [amount, setAmount] = useState(''); const [story, setStory] = useState(''); const [contact, setContact] = useState(''); const [requests, setRequests] = useState<any[]>([]); const [supported, setSupported] = useState<string[]>([]);
  const load = async () => { const { data } = await supabase.from('tamkeen_requests').select('*').order('created_at', { ascending: false }); setRequests(data || []); };
  useEffect(() => { load(); }, []);
  const post = async () => {
    if (!story) return alert('Please tell your story.');
    const { error } = await supabase.from('tamkeen_requests').insert([{ need_type: type, amount, story, contact }]);
    if (error) return alert(error.message);
    await notifyAll('general', `Tamkeen Request: ${type} — ${amount}`, story.slice(0, 80), 'tamkeen');
    alert('Your request has been posted. The Ummah will see it.'); setStory(''); load();
  };
  const input = "w-full mt-2 bg-[#F7F3EC] border rounded-[16px] px-4 py-3.5 text-[14px] outline-none";
  return (
    <div className="min-h-screen bg-[#0F2439] max-w-[430px] mx-auto pb-[120px]">
      <div className="px-5 pt-4 flex items-center gap-3"><button onClick={onBack} className="w-10 h-10 bg-white/10 rounded-full text-white">←</button><div><h1 className="text-white font-extrabold">TAMKEEN</h1><p className="text-[#D4AF78] text-[11px] font-bold">EMPOWER AND GROW</p></div></div>
      <div className="mx-4 mt-4 bg-white rounded-[24px] p-5"><p className="font-extrabold">Our Impact So Far</p><div className="grid grid-cols-3 gap-3 mt-3 text-center"><div><p className="font-extrabold text-[18px]">45</p><p className="text-[10px] text-gray-500">People Empowered</p></div><div><p className="font-extrabold text-[18px]">₦2.1M</p><p className="text-[10px] text-gray-500">Given Out</p></div><div><p className="font-extrabold text-[18px]">18</p><p className="text-[10px] text-gray-500">Businesses Started</p></div></div></div>
      <div className="mx-4 mt-3 bg-white rounded-[24px] p-5">
        <p className="font-extrabold">Request Empowerment</p><p className="text-[12px] text-gray-500">We empower people. We do not pity them.</p>
        <div className="flex flex-wrap gap-2 mt-3">{['Small Business Grant', 'Skill Training', 'Mentorship', 'School Fees'].map(t => (<button key={t} onClick={() => setType(t)} className={`px-3 py-2 rounded-full text-[11px] font-bold ${type === t ? 'bg-black text-white' : 'bg-gray-100'}`}>{t}</button>))}</div>
        <label className="block text-[11px] font-bold text-gray-400 mt-4">AMOUNT NEEDED</label><input value={amount} onChange={e => setAmount(e.target.value)} placeholder="e.g. ₦50,000" className={input} />
        <label className="block text-[11px] font-bold text-gray-400 mt-3">YOUR STORY / PLAN</label><textarea value={story} onChange={e => setStory(e.target.value)} placeholder="What will you do with it? How will it help you become stable?" className={input} />
        <label className="block text-[11px] font-bold text-gray-400 mt-3">CONTACT</label><input value={contact} onChange={e => setContact(e.target.value)} placeholder="WhatsApp" className={input} />
        <button onClick={post} className="w-full mt-4 bg-emerald-600 text-white font-extrabold py-4 rounded-full">SUBMIT REQUEST →</button>
      </div>
      {requests.map(r => (
        <div key={r.id} className="mx-4 mt-3 bg-white rounded-[20px] p-4"><p className="font-extrabold">{r.need_type} — {r.amount}</p><p className="text-[13px] mt-1">{r.story}</p><div className="h-2 bg-gray-100 rounded-full mt-3"><div className="h-2 bg-emerald-500 rounded-full" style={{ width: '35%' }} /></div><p className="text-[11px] text-gray-500 mt-1">35% funded • 7 supporters</p><div className="flex gap-2 mt-3"><button onClick={() => setSupported(prev => prev.includes(r.id) ? prev.filter(id => id !== r.id) : [...prev, r.id])} className={`flex-1 py-3 rounded-full text-[13px] font-bold ${supported.includes(r.id) ? 'bg-emerald-600 text-white' : 'bg-black text-white'}`}>{supported.includes(r.id) ? '✓ You Are Supporting' : 'Support This Person →'}</button><button className="px-4 py-3 bg-gray-100 rounded-full text-[13px] font-bold">Mentor</button></div></div>
      ))}
    </div>
  );
}
