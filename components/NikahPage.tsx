import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { notifyAll } from '../lib/notify';

export default function NikahPage({ onBack }: { onBack: () => void }) {
  const [gender, setGender] = useState('Brother'); const [age, setAge] = useState(''); const [city, setCity] = useState(''); const [about, setAbout] = useState(''); const [wali, setWali] = useState(''); const [waliContact, setWaliContact] = useState(''); const [lookingFor, setLookingFor] = useState('Practising Muslim'); const [profiles, setProfiles] = useState<any[]>([]); const [interested, setInterested] = useState<string[]>([]);
  const load = async () => { const { data } = await supabase.from('nikah_profiles').select('*').order('created_at', { ascending: false }); setProfiles(data || []); };
  useEffect(() => { load(); }, []);
  const post = async () => {
    if (!age || !wali) return alert('A Wali is compulsory for Nikah.');
    const { error } = await supabase.from('nikah_profiles').insert([{ gender, age: parseInt(age), city, about: `${about} | Looking for: ${lookingFor}`, wali_name: wali, wali_contact: waliContact }]);
    if (error) return alert(error.message);
    await notifyAll('nikah', `New Nikah Profile — ${gender}, ${age}, ${city}`, 'A new halal profile has been posted. A Wali has confirmed it.', 'nikah');
    alert('Your profile has been posted with your Wali. May Allah bless your search.'); load();
  };
  const input = "w-full mt-2 bg-[#F7F3EC] border rounded-[16px] px-4 py-3.5 text-[14px] outline-none";
  return (
    <div className="min-h-screen bg-[#0F2439] max-w-[430px] mx-auto pb-[120px]">
      <div className="px-5 pt-4 flex items-center gap-3"><button onClick={onBack} className="w-10 h-10 bg-white/10 rounded-full text-white">←</button><div><h1 className="text-white font-extrabold">NIKAH</h1><p className="text-[#D4AF78] text-[11px] font-bold">MARRIAGE WITH A WALI • NO FITNAH</p></div></div>
      <div className="mx-4 mt-4 bg-pink-50 rounded-[24px] p-4"><p className="font-extrabold text-[13px]">How Nikah Works Here</p><p className="text-[12px] text-gray-600 mt-1">1. Create profile with your Wali. 2. Someone shows interest. 3. We connect them to your Wali, not to you directly. 4. Families talk. No private chatting.</p></div>
      <div className="mx-4 mt-3 bg-white rounded-[24px] p-5">
        <p className="font-extrabold">Create A Halal Profile</p>
        <div className="flex gap-2 mt-3">{['Brother', 'Sister'].map(g => (<button key={g} onClick={() => setGender(g)} className={`flex-1 py-3 rounded-full font-bold ${gender === g ? 'bg-black text-white' : 'bg-gray-100'}`}>{g}</button>))}</div>
        <label className="block text-[11px] font-bold text-gray-400 mt-3">AGE</label><input value={age} onChange={e => setAge(e.target.value)} placeholder="e.g. 27" className={input} />
        <label className="block text-[11px] font-bold text-gray-400 mt-3">CITY</label><input value={city} onChange={e => setCity(e.target.value)} placeholder="Lagos" className={input} />
        <label className="block text-[11px] font-bold text-gray-400 mt-3">WHAT ARE YOU LOOKING FOR?</label>
        <div className="flex flex-wrap gap-2 mt-2">{['Practising Muslim', 'Student of Knowledge', 'Working Professional', 'Ready Now', 'Ready Within 1 Year'].map(l => (<button key={l} onClick={() => setLookingFor(l)} className={`px-3 py-2 rounded-full text-[12px] font-bold ${lookingFor === l ? 'bg-black text-white' : 'bg-gray-100'}`}>{l}</button>))}</div>
        <label className="block text-[11px] font-bold text-gray-400 mt-3">ABOUT YOU (HALAL ONLY)</label><textarea value={about} onChange={e => setAbout(e.target.value)} placeholder="I am... I pray... I work as..." className={input} />
        <label className="block text-[11px] font-bold text-red-500 mt-3">WALI NAME — COMPULSORY</label><input value={wali} onChange={e => setWali(e.target.value)} placeholder="e.g. My Father — Alhaji Musa" className={input} />
        <label className="block text-[11px] font-bold text-gray-400 mt-3">WALI CONTACT</label><input value={waliContact} onChange={e => setWaliContact(e.target.value)} placeholder="Wali WhatsApp" className={input} />
        <button onClick={post} className="w-full mt-4 bg-[#D4AF78] font-extrabold py-4 rounded-full">POST PROFILE →</button>
      </div>
      {profiles.map(p => (
        <div key={p.id} className="mx-4 mt-3 bg-white rounded-[20px] p-4"><p className="font-extrabold">{p.gender} • {p.age} • {p.city}</p><p className="text-[13px] mt-1">{p.about}</p><p className="text-[11px] text-emerald-700 font-bold mt-2">✓ Verified Wali: {p.wali_name}</p><div className="flex gap-2 mt-3"><button onClick={() => setInterested(prev => prev.includes(p.id) ? prev.filter(id => id !== p.id) : [...prev, p.id])} className={`flex-1 py-3 rounded-full text-[13px] font-bold ${interested.includes(p.id) ? 'bg-emerald-600 text-white' : 'bg-black text-white'}`}>{interested.includes(p.id) ? '✓ Interest Sent To Wali' : 'Show Interest Via Wali →'}</button><button className="px-4 py-3 bg-gray-100 rounded-full text-[13px] font-bold">Report</button></div></div>
      ))}
    </div>
  );
}
