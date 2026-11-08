import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export default function DuaPage({ onBack }: any) {
  const [duas, setDuas] = useState<any[]>([]);
  const [janazahs, setJanazahs] = useState<any[]>([]);
  const [name, setName] = useState(''); const [req, setReq] = useState(''); const [tab, setTab] = useState('DUA');
  const [jName, setJName] = useState(''); const [jCity, setJCity] = useState(''); const [jTime, setJTime] = useState(''); const [jMasjid, setJMasjid] = useState('');
  const load = async () => {
    const { data } = await supabase.from('dua_requests').select('*').order('created_at', { ascending: false }); if (data) setDuas(data);
    const { data: j } = await supabase.from('janazah_alerts').select('*').order('created_at', { ascending: false }); if (j) setJanazahs(j);
  };
  useEffect(() => { load(); }, []);
  const postDua = async () => { if (!req.trim()) return; await supabase.from('dua_requests').insert({ name: name || 'Anonymous', request: req, category: 'Dua' }); setReq(''); load(); };
  const ameen = async (id: string, count: number) => { await supabase.from('dua_requests').update({ ameen_count: count + 1 }).eq('id', id); load(); };
  const postJanazah = async () => { if (!jName.trim()) return; await supabase.from('janazah_alerts').insert({ name: jName, city: jCity, janazah_time: jTime, masjid: jMasjid }); setJName(''); setJCity(''); setJTime(''); setJMasjid(''); load(); };
  return (
    <div className="min-h-screen bg-[#F9F7F4] pb-24">
      <header className="sticky top-0 bg-white p-4 border-b flex items-center gap-3 z-10"><button onClick={onBack} className="bg-black/10 px-4 py-2 rounded-full text-[11px] font-bold">← Back</button><span className="font-black text-[13px]">🤲 DUA & GRIEF - Make Dua For Me</span></header>
      <div className="p-4">
        <div className="flex gap-2"><button onClick={() => setTab('DUA')} className={`flex-1 py-3 rounded-full text-[12px] font-black ${tab === 'DUA' ? 'bg-black text-white' : 'bg-white border'}`}>🤲 Dua</button><button onClick={() => setTab('JANAZAH')} className={`flex-1 py-3 rounded-full text-[12px] font-black ${tab === 'JANAZAH' ? 'bg-black text-white' : 'bg-white border'}`}>🕌 Janazah Alert</button></div>
        {tab === 'DUA' && (<>
          <div className="bg-white rounded-2xl border p-4 mt-4">
            <input value={name} onChange={e => setName(e.target.value)} placeholder="Your name (or Anonymous)" className="w-full p-3 rounded-xl border text-[13px]" />
            <textarea value={req} onChange={e => setReq(e.target.value)} rows={2} placeholder="Make dua for me - my mama dey hospital..." className="w-full mt-2 p-3 rounded-xl border text-[13px]" />
            <button onClick={postDua} className="w-full mt-2 bg-[#0A1930] text-[#D4AF78] py-3.5 rounded-full text-[11px] font-black">POST DUA REQUEST →</button>
          </div>
          <div className="mt-4 space-y-3">{duas.map(d => (
            <div key={d.id} className="bg-white rounded-2xl border p-4">
              <p className="font-bold text-[13px]">{d.request}</p><p className="text-[11px] text-gray-500 mt-1">By {d.name} • {new Date(d.created_at).toLocaleDateString()}</p>
              <button onClick={() => ameen(d.id, d.ameen_count)} className="mt-3 bg-green-600 text-white px-5 py-2.5 rounded-full text-[12px] font-black">🤲 Ameen ({d.ameen_count})</button>
              <p className="text-[11px] text-gray-500 mt-2">{d.ameen_count} people don make dua for you today</p>
            </div>
          ))}{duas.length === 0 && <p className="text-center text-gray-400 text-[12px] py-6">No dua yet.</p>}</div>
        </>)}
        {tab === 'JANAZAH' && (<>
          <div className="bg-white rounded-2xl border p-4 mt-4">
            <h3 className="font-black text-[13px]">+ Post Janazah Alert</h3>
            <input value={jName} onChange={e => setJName(e.target.value)} placeholder="Name of deceased e.g. Brother Ahmed" className="w-full mt-3 p-3 rounded-xl border text-[13px]" />
            <input value={jCity} onChange={e => setJCity(e.target.value)} placeholder="City" className="w-full mt-2 p-3 rounded-xl border text-[13px]" />
            <input value={jTime} onChange={e => setJTime(e.target.value)} placeholder="Janazah time e.g. 4pm Today" className="w-full mt-2 p-3 rounded-xl border text-[13px]" />
            <input value={jMasjid} onChange={e => setJMasjid(e.target.value)} placeholder="Masjid e.g. Central Mosque" className="w-full mt-2 p-3 rounded-xl border text-[13px]" />
            <button onClick={postJanazah} className="w-full mt-2 bg-black text-white py-3.5 rounded-full text-[11px] font-black">POST ALERT →</button>
          </div>
          <div className="mt-4 space-y-3">{janazahs.map(j => (
            <div key={j.id} className="bg-white rounded-2xl border p-4 border-l-4 border-l-black"><p className="font-black text-[13px]">🕌 Janazah - {j.name}</p><p className="text-[12px] mt-1">{j.janazah_time} • {j.masjid} • {j.city}</p><p className="text-[11px] text-gray-500 mt-1">Community go show up, no body go bury alone. Inna lillahi wa inna ilayhi raji'un.</p></div>
          ))}</div>
        </>)}
      </div>
    </div>
  );
              }
