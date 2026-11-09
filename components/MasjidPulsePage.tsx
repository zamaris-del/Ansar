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
    alert('Your masjid update has been posted.'); setMasjid(''); load();
  };
  const input = "w-full mt-2 bg-[#F7F3EC] border rounded-[16px] px-4 py-3.5 text-[14px] outline-none";
  const prayerTimes = [{ name: 'Fajr', time: '5:15 AM' }, { name: 'Dhuhr', time: '1:30 PM' }, { name: 'Asr', time: '4:15 PM' }, { name: 'Maghrib', time: '6:45 PM' }, { name: 'Isha', time: '8:00 PM' }];
  return (
    <div className="min-h-screen bg-[#0F2439] max-w-[430px] mx-auto pb-[120px]">
      <div className="px-5 pt-4 flex items-center gap-3"><button onClick={onBack} className="w-10 h-10 bg-white/10 rounded-full text-white">←</button><div><h1 className="text-white font-extrabold">MASJID PULSE</h1><p className="text-[#D4AF78] text-[11px] font-bold">IS YOUR MASJID ACTIVE?</p></div></div>
      <div className="mx-4 mt-4 bg-white rounded-[24px] p-5"><div className="flex justify-between"><p className="font-extrabold">Today's Prayer Times — Lagos</p><span className="text-[11px] text-emerald-700 font-bold">● Live</span></div><div className="grid grid-cols-5 gap-2 mt-3">{prayerTimes.map(p => (<div key={p.name} className="text-center bg-[#F7F3EC] rounded-[14px] py-2.5"><p className="text-[10px] font-bold text-gray-500">{p.name}</p><p className="text-[11px] font-extrabold mt-0.5">{p.time}</p></div>))}</div><p className="text-[11px] text-gray-400 mt-3">Next Prayer: Maghrib in 1 hour 12 minutes • Jumuah: 1:30 PM</p></div>
      <div className="mx-4 mt-3 bg-white rounded-[24px] p-5">
        <p className="font-extrabold">Update Your Masjid</p>
        <label className="block text-[11px] font-bold text-gray-400 mt-3">MASJID NAME</label><input value={masjid} onChange={e => setMasjid(e.target.value)} placeholder="e.g. Central Mosque" className={input} />
        <label className="block text-[11px] font-bold text-gray-400 mt-3">CITY</label><input value={city} onChange={e => setCity(e.target.value)} placeholder="Lagos" className={input} />
        <div className="flex flex-wrap gap-2 mt-3">{['Active', 'Needs Help', 'Building', 'Jumuah Only'].map(s => (<button key={s} onClick={() => setStatus(s)} className={`px-3 py-2 rounded-full text-[12px] font-bold ${status === s ? 'bg-black text-white' : 'bg-gray-100'}`}>{s}</button>))}</div>
        <label className="block text-[11px] font-bold text-gray-400 mt-3">UPDATE / WHAT DOES YOUR MASJID NEED?</label><textarea value={update} onChange={e => setUpdate(e.target.value)} placeholder="e.g. We need 20 Qurans, a fan for the sisters section, and volunteers for cleaning..." className={input} />
        <button onClick={post} className="w-full mt-4 bg-[#0F2439] text-white font-extrabold py-4 rounded-full">POST UPDATE →</button>
      </div>
      {pulses.map(p => (<div key={p.id} className="mx-4 mt-3 bg-white rounded-[20px] p-4"><p className="font-extrabold">{p.masjid_name} • {p.city}</p><span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 px-2 py-1 rounded-full">{p.status}</span><p className="text-[13px] mt-2">{p.update_text}</p><button className="mt-3 bg-[#D4AF78] px-4 py-2 rounded-full text-[12px] font-bold">Help This Masjid →</button></div>))}
    </div>
  );
}
