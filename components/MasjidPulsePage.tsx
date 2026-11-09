import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { notifyAll } from '../lib/notify';

export default function MasjidPulsePage({ onBack }: { onBack: () => void }) {
  const [masjid, setMasjid] = useState(''); const [city, setCity] = useState(''); const [status, setStatus] = useState('Active'); const [update, setUpdate] = useState(''); const [pulses, setPulses] = useState<any[]>([]);
  const load = async () => { const { data } = await supabase.from('masjid_pulse').select('*').order('created_at', { ascending: false }); setPulses(data || []); };
  useEffect(() => { load(); }, []);
  const post = async () => {
    if (!masjid) return alert('Please enter the masjid name.');
    const { error } = await supabase.from('masjid_pulse').insert([{ masjid_name: masjid, city, status, update_text: update }]);
    if (error) return alert(error.message);
    await notifyAll('general', `Masjid Update: ${masjid} in ${city}`, `${status} — ${update.slice(0, 80)}`, 'pulse');
    alert('Your masjid update has been posted.'); setMasjid(''); setUpdate(''); load();
  };
  const input = "w-full mt-1.5 bg-[#F7F3EC] border border-[#E8DDC8] rounded-[14px] px-3.5 py-3 text-[14px] outline-none";
  const prayerTimes = [{ name: 'Fajr', time: '5:15 AM' }, { name: 'Dhuhr', time: '1:30 PM' }, { name: 'Asr', time: '4:15 PM' }, { name: 'Maghrib', time: '6:45 PM' }, { name: 'Isha', time: '8:00 PM' }];
  return (
    <div className="min-h-screen bg-[#0F2439] w-full max-w-[430px] mx-auto pb-[110px] overflow-x-hidden">
      <div className="px-4 pt-4 flex items-center gap-3"><button onClick={onBack} className="w-10 h-10 shrink-0 bg-white/10 rounded-full text-white">←</button><div><h1 className="text-white font-extrabold text-[18px]">MASJID PULSE</h1><p className="text-[#D4AF78] text-[10px] font-bold">IS YOUR MASJID ACTIVE? LET'S KEEP IT ALIVE</p></div></div>

      <div className="mx-4 mt-4 bg-white rounded-[22px] p-4"><div className="flex justify-between items-center"><p className="font-extrabold text-[14px]">Today's Prayer Times</p><span className="text-[11px] text-emerald-700 font-bold">● Lagos</span></div><div className="grid grid-cols-5 gap-2 mt-3">{prayerTimes.map(p => (<div key={p.name} className="text-center bg-[#F7F3EC] rounded-[12px] py-2.5 px-1"><p className="text-[10px] font-bold text-gray-500">{p.name}</p><p className="text-[11px] font-extrabold mt-0.5">{p.time}</p></div>))}</div><p className="text-[11px] text-gray-400 mt-3 leading-[1.5]">Times are for Lagos. Your city times will be added soon. Next: Maghrib • Jumuah: 1:30 PM</p></div>

      <div className="mx-4 mt-3 bg-white rounded-[22px] p-4">
        <p className="font-extrabold text-[16px]">Update Your Masjid</p><p className="text-[12px] text-gray-500 leading-[1.6] mt-1">Share news, needs, or events so the community can help.</p>
        <label className="block text-[11px] font-bold text-gray-400 mt-4">MASJID NAME</label><input value={masjid} onChange={e => setMasjid(e.target.value)} placeholder="e.g. Central Mosque" className={input} />
        <label className="block text-[11px] font-bold text-gray-400 mt-3">CITY</label><input value={city} onChange={e => setCity(e.target.value)} placeholder="e.g. Lagos" className={input} />
        <label className="block text-[11px] font-bold text-gray-400 mt-3">STATUS</label>
        <div className="flex flex-wrap gap-2 mt-2">{['Active', 'Needs Help', 'Building', 'Jumuah Only'].map(s => (<button key={s} onClick={() => setStatus(s)} className={`px-3 py-2 rounded-full text-[12px] font-bold ${status === s ? 'bg-black text-white' : 'bg-gray-100'}`}>{s}</button>))}</div>
        <label className="block text-[11px] font-bold text-gray-400 mt-3">UPDATE / WHAT DOES YOUR MASJID NEED?</label><textarea value={update} onChange={e => setUpdate(e.target.value)} placeholder="e.g. We need Qurans, a fan for the sisters section, and volunteers for cleaning..." className={input} />
        <button onClick={post} className="w-full mt-4 bg-[#0F2439] text-white font-extrabold py-3.5 rounded-full text-[14px]">Post Update →</button>
      </div>

      <p className="px-5 mt-4 text-white font-bold text-[14px]">Masjid Updates {pulses.length > 0 && `(${pulses.length})`}</p>
      {pulses.length === 0 && <div className="mx-4 mt-3 bg-white/5 border border-white/10 rounded-[18px] p-5 text-center"><p className="text-[28px]">🕌</p><p className="text-white font-bold text-[14px] mt-2">No masjid updates yet</p><p className="text-white/50 text-[12px] mt-1">Be the first to update your masjid.</p></div>}
      {pulses.map(p => (<div key={p.id} className="mx-4 mt-3 bg-white rounded-[18px] p-4"><div className="flex justify-between items-start gap-2"><p className="font-extrabold text-[14px] leading-tight">{p.masjid_name} • {p.city}</p><span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 px-2 py-1 rounded-full shrink-0">{p.status}</span></div><p className="text-[13px] leading-[1.6] text-gray-600 mt-2">{p.update_text}</p><button className="mt-3 bg-[#D4AF78] px-4 py-2 rounded-full text-[12px] font-bold">Help This Masjid →</button></div>))}
    </div>
  );
}
