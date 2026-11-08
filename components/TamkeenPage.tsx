import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export default function TamkeenPage({ onBack }: any) {
  const [cases, setCases] = useState<any[]>([]);
  const [name, setName] = useState(''); const [need, setNeed] = useState('Business'); const [amount, setAmount] = useState(''); const [story, setStory] = useState(''); const [masjid, setMasjid] = useState('');
  const load = async () => { const { data } = await supabase.from('tamkeen_cases').select('*').order('created_at', { ascending: false }); if (data) setCases(data); };
  useEffect(() => { load(); }, []);
  const post = async () => {
    if (!name.trim() || !story.trim()) { alert('Put name + story'); return; }
    await supabase.from('tamkeen_cases').insert({ name, need_type: need, amount_needed: parseInt(amount) || 0, amount_raised: 0, story, masjid_verified: masjid, status: 'OPEN' });
    setName(''); setAmount(''); setStory(''); setMasjid(''); load();
  };
  const graduate = async (id: string) => {
    await supabase.from('tamkeen_cases').update({ status: 'GRADUATED - Now Giver' }).eq('id', id); load();
  };
  return (
    <div className="min-h-screen bg-[#F9F7F4] pb-24">
      <header className="sticky top-0 bg-white p-4 border-b flex items-center gap-3 z-10"><button onClick={onBack} className="bg-black/10 px-4 py-2 rounded-full text-[11px] font-bold">← Back</button><span className="font-black text-[13px]">🌱 TAMKEEN - Empower</span></header>
      <div className="p-4">
        <div className="bg-[#0A1930] rounded-2xl p-4 text-white"><p className="text-[11px] text-[#D4AF78] font-bold">DIGNITY, NOT PITY • ZAKAT TO EMPOWERMENT</p><p className="text-[12px] text-white/70 mt-2 leading-6">No be rice. Na business: Sewing machine, Keke, Laptop, Shop capital. Month 12: Receiver become Giver.</p></div>
        <div className="bg-white rounded-2xl border p-4 mt-4">
          <h3 className="font-black text-[13px]">+ Request Empowerment - Verified By Masjid</h3>
          <input value={name} onChange={e => setName(e.target.value)} placeholder="Your name" className="w-full mt-3 p-3 rounded-xl border text-[13px]" />
          <select value={need} onChange={e => setNeed(e.target.value)} className="w-full mt-2 p-3 rounded-xl border text-[13px]"><option>Business</option><option>Sewing Machine</option><option>Keke</option><option>Laptop</option><option>Shop Capital</option><option>School Fees</option><option>Surgery - To Work Again</option></select>
          <input value={amount} onChange={e => setAmount(e.target.value)} placeholder="Amount needed e.g. 150000" type="number" className="w-full mt-2 p-3 rounded-xl border text-[13px]" />
          <textarea value={story} onChange={e => setStory(e.target.value)} rows={2} placeholder="Your story - wetin you go use am do?" className="w-full mt-2 p-3 rounded-xl border text-[13px]" />
          <input value={masjid} onChange={e => setMasjid(e.target.value)} placeholder="Masjid wey verify you e.g. Central Mosque, Enugu" className="w-full mt-2 p-3 rounded-xl border text-[13px]" />
          <button onClick={post} className="w-full mt-2 bg-[#0A1930] text-[#D4AF78] py-3.5 rounded-full text-[11px] font-black">SUBMIT FOR VERIFICATION →</button>
        </div>
        <div className="mt-4 space-y-3">{cases.map(c => (
          <div key={c.id} className="bg-white rounded-2xl border p-4">
            <div className="flex justify-between"><span className="text-[10px] font-black px-2 py-1 rounded-full bg-green-100 text-green-700">{c.need_type}</span><span className="text-[10px] font-bold text-gray-500">{c.status}</span></div>
            <p className="font-black text-[14px] mt-2">{c.name}</p>
            <p className="text-[12px] text-gray-600 mt-1">{c.story}</p>
            <p className="text-[11px] mt-2">🕌 Verified by: {c.masjid_verified || 'Pending'}</p>
            <div className="mt-3 bg-gray-100 rounded-full h-2 overflow-hidden"><div className="h-full bg-green-600" style={{ width: c.amount_needed ? Math.min(100, (c.amount_raised / c.amount_needed) * 100) + '%' : '0%' }}></div></div>
            <p className="text-[11px] mt-1 font-bold">₦{c.amount_raised?.toLocaleString()} / ₦{c.amount_needed?.toLocaleString()}</p>
            <p className="text-[10px] text-gray-500 mt-1">Updates: Month 1 • Month 3 • Month 6 - Donor go see photo update</p>
            {c.status === 'OPEN' && <button onClick={() => graduate(c.id)} className="mt-3 bg-[#D4AF78] text-black px-4 py-2 rounded-full text-[11px] font-black">🎓 Mark Graduated - Now Giver</button>}
          </div>
        ))}{cases.length === 0 && <p className="text-center text-gray-400 text-[12px] py-6">No case yet.</p>}</div>
      </div>
    </div>
  );
                                                                                 }
