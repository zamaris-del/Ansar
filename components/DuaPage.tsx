import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { notifyAll } from '../lib/notify';

export default function DuaPage({ onBack }: { onBack: () => void }) {
  const [tab, setTab] = useState<'dua' | 'janazah'>('dua');
  const [text, setText] = useState(''); const [name, setName] = useState('');
  const [dName, setDName] = useState(''); const [city, setCity] = useState(''); const [time, setTime] = useState(''); const [masjid, setMasjid] = useState('');
  const [duas, setDuas] = useState<any[]>([]); const [ameens, setAmeens] = useState<Record<string, number>>({});
  const load = async () => { const { data } = await supabase.from('duas').select('*').order('created_at', { ascending: false }).limit(20); setDuas(data || []); };
  useEffect(() => { load(); }, []);
  const postDua = async () => {
    if (!text.trim()) return alert('Please write your dua first.');
    const { error } = await supabase.from('duas').insert([{ content: text, name: name || 'Anonymous' }]);
    if (error) return alert(error.message);
    await notifyAll('dua', `New Dua Request from ${name || 'Anonymous'}`, text.slice(0, 80), 'dua');
    alert('Your dua has been posted. The Ummah will pray for you.'); setText(''); load();
  };
  const postJanazah = async () => {
    if (!dName) return alert('Please enter the name of the deceased.');
    const { error } = await supabase.from('janazah_alerts').insert([{ name: dName, city, janazah_time: time, masjid }]);
    if (error) return alert(error.message);
    await notifyAll('janazah', `Janazah Alert: ${dName} in ${city}`, `Janazah at ${time} in ${masjid}. Please attend and pray.`, 'dua');
    alert('Janazah alert has been posted. May Allah forgive them.'); setDName(''); load();
  };
  const input = "w-full mt-1.5 bg-[#F7F3EC] border border-[#E8DDC8] rounded-[14px] px-3.5 py-3 text-[14px] outline-none";
  return (
    <div className="min-h-screen bg-[#0F2439] w-full max-w-[430px] mx-auto pb-[110px] overflow-x-hidden">
      <div className="px-4 pt-4 flex items-center gap-3"><button onClick={onBack} className="w-10 h-10 shrink-0 bg-white/10 rounded-full text-white">←</button><div><h1 className="text-white font-extrabold text-[18px]">DUA & GRIEF</h1><p className="text-[#D4AF78] text-[10px] font-bold">THE UMMAH WILL SAY AMEEN FOR YOU</p></div></div>

      <div className="mx-4 mt-4 bg-[#D4AF78] rounded-[22px] p-4">
        <p className="text-[10px] font-bold tracking-widest text-black/60">DUA OF THE DAY</p>
        <p className="font-bold text-[14px] leading-[1.65] mt-1.5 text-black">"O Allah, ease my affairs and do not leave me to myself even for the blink of an eye."</p>
        <p className="text-[11px] text-black/60 mt-2">Say Ameen and share it with someone who needs it.</p>
      </div>

      <div className="mx-4 mt-4 bg-white/10 rounded-full p-1 flex"><button onClick={() => setTab('dua')} className={`flex-1 py-3 rounded-full text-[13px] font-bold ${tab === 'dua' ? 'bg-white text-black' : 'text-white'}`}>Make Dua For Me</button><button onClick={() => setTab('janazah')} className={`flex-1 py-3 rounded-full text-[13px] font-bold ${tab === 'janazah' ? 'bg-white text-black' : 'text-white'}`}>Janazah Alert</button></div>

      {tab === 'dua' ? (
        <>
          <div className="mx-4 mt-4 bg-white rounded-[22px] p-4">
            <p className="font-extrabold text-[16px]">Make Dua For Me</p>
            <p className="text-[12px] text-gray-500 leading-[1.6] mt-1">Write what you need. Hundreds of Muslims will say Ameen for you.</p>
            <textarea value={text} onChange={e => setText(e.target.value)} placeholder="e.g. Please make dua that Allah eases my affairs, grants me a good job, and blesses my family..." className="w-full mt-3 bg-[#F7F3EC] border rounded-[14px] p-3.5 min-h-[110px] outline-none text-[14px] leading-[1.6]" />
            <input value={name} onChange={e => setName(e.target.value)} placeholder="Your name (or leave as Anonymous)" className={input} />
            <button onClick={postDua} className="w-full mt-3 bg-[#0F2439] text-white font-extrabold py-3.5 rounded-full text-[14px]">Post Dua →</button>
          </div>
          {duas.length === 0 && <div className="mx-4 mt-3 bg-white/5 border border-white/10 rounded-[18px] p-5 text-center"><p className="text-[28px]">🤲</p><p className="text-white font-bold text-[14px] mt-2">No dua requests yet</p><p className="text-white/50 text-[12px] mt-1">Be the first. The Ummah is waiting to pray for you.</p></div>}
          {duas.map(d => (
            <div key={d.id} className="mx-4 mt-3 bg-white rounded-[18px] p-4"><p className="text-[14px] leading-[1.65] text-gray-800">{d.content}</p><p className="text-[11px] text-gray-400 mt-2">— {d.name}</p><div className="flex gap-2 mt-3 pt-3 border-t border-gray-100"><button onClick={() => setAmeens(prev => ({ ...prev, [d.id]: (prev[d.id] || 0) + 1 }))} className="flex-1 bg-emerald-600 text-white py-2.5 rounded-full text-[13px] font-bold">🤲 Ameen • {ameens[d.id] || 0}</button><button onClick={() => navigator.clipboard.writeText(d.content)} className="px-4 py-2.5 bg-gray-100 rounded-full text-[13px] font-bold">Share</button></div></div>
          ))}
        </>
      ) : (
        <div className="mx-4 mt-4 bg-white rounded-[22px] p-4">
          <p className="font-extrabold text-[16px]">Post Janazah Alert</p>
          <p className="text-[12px] text-gray-500 leading-[1.6] mt-1">Let the Ummah know so they can attend, pray, and support the family.</p>
          <label className="block text-[11px] font-bold text-gray-400 mt-4">NAME OF THE DECEASED</label><input value={dName} onChange={e => setDName(e.target.value)} placeholder="e.g. Brother Ahmed" className={input} />
          <label className="block text-[11px] font-bold text-gray-400 mt-3">CITY</label><input value={city} onChange={e => setCity(e.target.value)} placeholder="e.g. Lagos" className={input} />
          <label className="block text-[11px] font-bold text-gray-400 mt-3">JANAZAH TIME</label><input value={time} onChange={e => setTime(e.target.value)} placeholder="e.g. 4pm Today" className={input} />
          <label className="block text-[11px] font-bold text-gray-400 mt-3">MASJID</label><input value={masjid} onChange={e => setMasjid(e.target.value)} placeholder="e.g. Central Mosque" className={input} />
          <button onClick={postJanazah} className="w-full mt-4 bg-black text-white font-extrabold py-3.5 rounded-full text-[14px]">Post Alert → Notify Everyone</button>
          <div className="bg-gray-50 rounded-[14px] p-3.5 mt-4"><p className="text-[12px] font-bold">What To Do When Someone Passes?</p><p className="text-[12px] text-gray-500 leading-[1.6] mt-1">1. Make dua for them. 2. Attend Janazah if you can. 3. Support the family with food and kindness. 4. Give Sadaqah Jariyah on their behalf.</p></div>
        </div>
      )}
    </div>
  );
                                                                                                                                                                                                                                                                                                                                              }
