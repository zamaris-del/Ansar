import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export default function MasjidPulsePage({ onBack }: any) {
  const [events, setEvents] = useState<any[]>([]);
  const [filter, setFilter] = useState('All');
  const [masjid, setMasjid] = useState(''); const [city, setCity] = useState(''); const [title, setTitle] = useState(''); const [date, setDate] = useState(''); const [type, setType] = useState('Khutbah'); const [lift, setLift] = useState(false); const [counselling, setCounselling] = useState(false); const [youth, setYouth] = useState(false); const [desc, setDesc] = useState('');
  const load = async () => { const { data } = await supabase.from('masjid_pulse').select('*').order('created_at', { ascending: false }); if (data) setEvents(data); };
  useEffect(() => { load(); }, []);
  const post = async () => {
    if (!masjid.trim() || !title.trim()) { alert('Put masjid + event title'); return; }
    await supabase.from('masjid_pulse').insert({ masjid_name: masjid, city, event_title: title, event_date: date, event_type: type, has_lift: lift, has_counselling: counselling, has_youth_program: youth, description: desc });
    setMasjid(''); setCity(''); setTitle(''); setDate(''); setDesc(''); setLift(false); setCounselling(false); setYouth(false); load();
  };
  const filtered = events.filter(e => {
    if (filter === 'Lift') return e.has_lift;
    if (filter === 'Counselling') return e.has_counselling;
    if (filter === 'Youth') return e.has_youth_program;
    return true;
  });
  return (
    <div className="min-h-screen bg-[#F9F7F4] pb-24">
      <header className="sticky top-0 bg-white p-4 border-b flex items-center gap-3 z-10"><button onClick={onBack} className="bg-black/10 px-4 py-2 rounded-full text-[11px] font-bold">← Back</button><span className="font-black text-[13px]">🕌 MASJID PULSE - Your Masjid Dey Alive?</span></header>
      <div className="p-4">
        <div className="flex gap-2 overflow-x-auto pb-1">{['All', 'Lift', 'Counselling', 'Youth'].map(f => <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2.5 rounded-full text-[11px] font-bold shrink-0 ${filter === f ? 'bg-black text-white' : 'bg-white border'}`}>{f === 'All' ? '🌍 All' : f === 'Lift' ? '♿ With Lift' : f === 'Counselling' ? '💬 Counselling' : '👦 Youth Program'}</button>)}</div>
        <div className="bg-white rounded-2xl border p-4 mt-4">
          <h3 className="font-black text-[13px]">+ Post Masjid Event</h3>
          <input value={masjid} onChange={e => setMasjid(e.target.value)} placeholder="Masjid name" className="w-full mt-3 p-3 rounded-xl border text-[13px]" />
          <input value={city} onChange={e => setCity(e.target.value)} placeholder="City" className="w-full mt-2 p-3 rounded-xl border text-[13px]" />
          <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Event title e.g. Friday Khutbah: How to handle doubt" className="w-full mt-2 p-3 rounded-xl border text-[13px]" />
          <input value={date} onChange={e => setDate(e.target.value)} placeholder="Date e.g. Friday 4pm" className="w-full mt-2 p-3 rounded-xl border text-[13px]" />
          <select value={type} onChange={e => setType(e.target.value)} className="w-full mt-2 p-3 rounded-xl border text-[13px]"><option>Khutbah</option><option>Sisters Class</option><option>Youth Program</option><option>Food Drive</option><option>Counselling</option><option>Quran Class</option></select>
          <div className="flex gap-2 mt-3 flex-wrap">
            <label className="flex items-center gap-1 text-[11px] font-bold bg-gray-100 px-3 py-2 rounded-full"><input type="checkbox" checked={lift} onChange={e => setLift(e.target.checked)} /> ♿ Has Lift</label>
            <label className="flex items-center gap-1 text-[11px] font-bold bg-gray-100 px-3 py-2 rounded-full"><input type="checkbox" checked={counselling} onChange={e => setCounselling(e.target.checked)} /> 💬 Counselling</label>
            <label className="flex items-center gap-1 text-[11px] font-bold bg-gray-100 px-3 py-2 rounded-full"><input type="checkbox" checked={youth} onChange={e => setYouth(e.target.checked)} /> 👦 Youth</label>
          </div>
          <textarea value={desc} onChange={e => setDesc(e.target.value)} rows={2} placeholder="Details..." className="w-full mt-2 p-3 rounded-xl border text-[13px]" />
          <button onClick={post} className="w-full mt-2 bg-[#0A1930] text-[#D4AF78] py-3.5 rounded-full text-[11px] font-black">POST EVENT →</button>
        </div>
        <div className="mt-4 space-y-3">{filtered.map(ev => (
          <div key={ev.id} className="bg-white rounded-2xl border p-4">
            <p className="font-black text-[13px]">🕌 {ev.masjid_name} • {ev.city}</p>
            <p className="text-[13px] font-bold mt-1">{ev.event_title}</p>
            <p className="text-[11px] text-gray-500">{ev.event_type} • {ev.event_date}</p>
            <p className="text-[12px] mt-1">{ev.description}</p>
            <div className="flex gap-2 mt-2 flex-wrap">{ev.has_lift && <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-bold">♿ Lift - No Stairs</span>}{ev.has_counselling && <span className="text-[10px] bg-green-100 text-green-700 px-2 py-1 rounded-full font-bold">💬 Counselling</span>}{ev.has_youth_program && <span className="text-[10px] bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full font-bold">👦 Youth Program</span>}</div>
          </div>
        ))}{filtered.length === 0 && <p className="text-center text-gray-400 text-[12px] py-6">No event for this filter yet.</p>}</div>
      </div>
    </div>
  );
        }
