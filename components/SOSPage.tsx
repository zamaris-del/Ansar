import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { notifyAll } from '../lib/notify';

export default function SOSPage({ onBack }: { onBack: () => void }) {
  const [needType, setNeedType] = useState('Financial Help');
  const [details, setDetails] = useState('');
  const [city, setCity] = useState('');
  const [contact, setContact] = useState('');
  const [requests, setRequests] = useState<any[]>([]);

  const load = async () => {
    const { data } = await supabase.from('sos_requests').select('*').order('created_at', { ascending: false }).limit(20);
    setRequests(data || []);
  };
  useEffect(() => { load(); }, []);

  const post = async () => {
    if (!details || !contact) return alert('Please describe your situation and add your contact.');
    const { error } = await supabase.from('sos_requests').insert([{ need_type: needType, details, city, contact }]);
    if (error) return alert(error.message);
    await notifyAll('sos', `SOS in ${city} — ${needType}`, details.slice(0, 100), 'sos');
    alert('Your SOS has been sent. Everyone has been notified. Help is on the way.');
    setDetails(''); load();
  };

  const input = "w-full mt-2 bg-[#F7F3EC] border border-[#E8DDC8] rounded-[16px] px-4 py-3.5 text-[14px] outline-none focus:border-[#D4AF78]";

  return (
    <div className="min-h-screen bg-[#0F2439] max-w-[430px] mx-auto pb-[120px]">
      <div className="px-5 pt-4 flex items-center gap-3">
        <button onClick={onBack} className="w-10 h-10 bg-white/10 rounded-full text-white">←</button>
        <div><h1 className="text-white font-extrabold text-[18px]">SOS — I Need Help Now</h1><p className="text-[#D4AF78] text-[11px] font-bold tracking-widest">IMAMS AND VOLUNTEERS WILL RESPOND</p></div>
      </div>
      <div className="mx-4 mt-4 bg-red-600 rounded-[24px] p-5 text-white">
        <p className="font-extrabold text-[16px]">Are You In Urgent Need?</p>
        <p className="text-[13px] text-white/80 mt-1">Do not be ashamed. The Ummah is here for you. Your request will notify everyone immediately.</p>
      </div>
      <div className="mx-4 mt-3 bg-white rounded-[24px] p-5">
        <p className="font-extrabold">Request Help</p>
        <label className="block text-[11px] font-bold text-gray-400 mt-4">WHAT DO YOU NEED HELP WITH?</label>
        <div className="flex flex-wrap gap-2 mt-2">{['Financial Help', 'Food', 'Accommodation', 'Medical', 'Counselling', 'Other'].map(t => (<button key={t} onClick={() => setNeedType(t)} className={`px-3 py-2 rounded-full text-[12px] font-bold ${needType === t ? 'bg-black text-white' : 'bg-gray-100'}`}>{t}</button>))}</div>
        <label className="block text-[11px] font-bold text-gray-400 mt-4">DESCRIBE YOUR SITUATION</label>
        <textarea value={details} onChange={e => setDetails(e.target.value)} placeholder="Please explain what happened and what you need..." className={input} />
        <label className="block text-[11px] font-bold text-gray-400 mt-3">CITY</label>
        <input value={city} onChange={e => setCity(e.target.value)} placeholder="e.g. Lagos" className={input} />
        <label className="block text-[11px] font-bold text-gray-400 mt-3">CONTACT / WHATSAPP</label>
        <input value={contact} onChange={e => setContact(e.target.value)} placeholder="080..." className={input} />
        <button onClick={post} className="w-full mt-4 bg-red-600 text-white font-extrabold py-4 rounded-full">SEND SOS ALERT → NOTIFY EVERYONE</button>
      </div>
      <p className="text-white font-bold px-5 mt-5">Recent SOS Requests ({requests.length})</p>
      {requests.map(r => (
        <div key={r.id} className="mx-4 mt-3 bg-white rounded-[20px] p-4">
          <p className="font-extrabold">{r.need_type} • {r.city}</p>
          <p className="text-[13px] text-gray-600 mt-1">{r.details}</p>
          <a href={`https://wa.me/${r.contact}`} className="inline-block mt-3 bg-emerald-600 text-white text-[12px] font-bold px-4 py-2 rounded-full">Help This Person →</a>
        </div>
      ))}
    </div>
  );
}
