import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { notifyAll } from '../lib/notify';

export default function SuhbaPage({ onBack }: { onBack: () => void }) {
  const [name, setName] = useState(''); const [city, setCity] = useState(''); const [focus, setFocus] = useState('Quran Study'); const [contact, setContact] = useState(''); const [circles, setCircles] = useState<any[]>([]); const [filter, setFilter] = useState('All'); const [joined, setJoined] = useState<string[]>([]);
  const load = async () => { const { data } = await supabase.from('suhba_circles').select('*').order('created_at', { ascending: false }); setCircles(data || []); };
  useEffect(() => { load(); }, []);
  const post = async () => {
    if (!name || !city) return alert('Please enter the circle name and city.');
    const { error } = await supabase.from('suhba_circles').insert([{ name, city, focus, contact }]);
    if (error) return alert(error.message);
    await notifyAll('general', `New Circle in ${city}: ${name}`, `Focus: ${focus}. Join your righteous companions.`, 'suhba');
    alert('Your circle has been created.'); setName(''); load();
  };
  const input = "w-full mt-2 bg-[#F7F3EC] border rounded-[16px] px-4 py-3.5 text-[14px] outline-none";
  const filtered = filter === 'All' ? circles : circles.filter(c => c.focus === filter);
  return (
    <div className="min-h-screen bg-[#0F2439] max-w-[430px] mx-auto pb-[120px]">
      <div className="px-5 pt-4 flex items-center gap-3"><button onClick={onBack} className="w-10 h-10 bg-white/10 rounded-full text-white">←</button><div><h1 className="text-white font-extrabold">SUHBA — Your Circle</h1><p className="text-[#D4AF78] text-[11px] font-bold">FIND RIGHTEOUS FRIENDS NEAR YOU</p></div></div>
      <div className="mx-4 mt-4 bg-white rounded-[24px] p-5">
        <p className="font-extrabold">Create A Circle</p>
        <label className="block text-[11px] font-bold text-gray-400 mt-3">CIRCLE NAME</label><input value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Lagos Quran Brothers" className={input} />
        <label className="block text-[11px] font-bold text-gray-400 mt-3">CITY</label><input value={city} onChange={e => setCity(e.target.value)} placeholder="Lagos" className={input} />
        <div className="flex flex-wrap gap-2 mt-3">{['Quran Study', 'Fitness', 'Business', 'Sisters Only', 'Brothers Only', 'Youth'].map(f => (<button key={f} onClick={() => setFocus(f)} className={`px-3 py-2 rounded-full text-[12px] font-bold ${focus === f ? 'bg-black text-white' : 'bg-gray-100'}`}>{f}</button>))}</div>
        <label className="block text-[11px] font-bold text-gray-400 mt-3">WHATSAPP GROUP LINK</label><input value={contact} onChange={e => setContact(e.target.value)} placeholder="WhatsApp link or number" className={input} />
        <button onClick={post} className="w-full mt-4 bg-[#0F2439] text-white font-extrabold py-4 rounded-full">CREATE CIRCLE →</button>
      </div>
      <div className="px-5 mt-5 flex gap-2 overflow-x-auto no-scrollbar">{['All', 'Quran Study', 'Sisters Only', 'Brothers Only', 'Youth', 'Business'].map(f => (<button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-full text-[12px] font-bold whitespace-nowrap ${filter === f ? 'bg-white text-black' : 'bg-white/10 text-white'}`}>{f}</button>))}</div>
      {filtered.map(c => (
        <div key={c.id} className="mx-4 mt-3 bg-white rounded-[20px] p-4">
          <div className="flex justify-between"><p className="font-extrabold">{c.name}</p><span className="text-[11px] bg-emerald-50 text-emerald-700 px-2 py-1 rounded-full font-bold">● Active</span></div>
          <p className="text-[12px] text-gray-500">{c.city} • {c.focus} • 12 Members</p>
          <button onClick={() => setJoined(prev => prev.includes(c.id) ? prev.filter(id => id !== c.id) : [...prev, c.id])} className={`w-full mt-3 py-3 rounded-full text-[13px] font-bold ${joined.includes(c.id) ? 'bg-emerald-600 text-white' : 'bg-black text-white'}`}>{joined.includes(c.id) ? '✓ Joined — See You There' : 'Join Circle →'}</button>
        </div>
      ))}
    </div>
  );
                    }
