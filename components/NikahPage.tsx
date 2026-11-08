import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export default function NikahPage({ onBack }: any) {
  const [profiles, setProfiles] = useState<any[]>([]);
  const [funds, setFunds] = useState<any[]>([]);
  const [tab, setTab] = useState('PROFILES');
  const [gender, setGender] = useState('Brother'); const [age, setAge] = useState(''); const [city, setCity] = useState(''); const [work, setWork] = useState(''); const [deen, setDeen] = useState('Practicing'); const [looking, setLooking] = useState(''); const [waliName, setWaliName] = useState(''); const [waliPhone, setWaliPhone] = useState('');
  const [couple, setCouple] = useState(''); const [story, setStory] = useState('');
  const load = async () => {
    const { data } = await supabase.from('nikah_profiles').select('*').order('created_at', { ascending: false }); if (data) setProfiles(data);
    const { data: f } = await supabase.from('nikah_wedding_fund').select('*').order('created_at', { ascending: false }); if (f) setFunds(f);
  };
  useEffect(() => { load(); }, []);
  const createProfile = async () => {
    if (!waliName.trim() || !waliPhone.trim()) { alert('Wali name + phone COMPULSORY. No Wali = No profile.'); return; }
    if (!age || !city) { alert('Put age + city'); return; }
    await supabase.from('nikah_profiles').insert({ gender, age: parseInt(age), city, work, deen_level: deen, looking_for: looking, wali_name: waliName, wali_phone: waliPhone, status: 'PENDING WALI' });
    setAge(''); setCity(''); setWork(''); setLooking(''); setWaliName(''); setWaliPhone(''); load(); alert('Profile created. We go contact your Wali to confirm. No private chat until both Walis agree.');
  };
  const createFund = async () => {
    if (!couple.trim()) return;
    await supabase.from('nikah_wedding_fund').insert({ couple_names: couple, story, amount_needed: 150000, amount_raised: 0 });
    setCouple(''); setStory(''); load();
  };
  return (
    <div className="min-h-screen bg-[#F9F7F4] pb-24">
      <header className="sticky top-0 bg-white p-4 border-b flex items-center gap-3 z-10"><button onClick={onBack} className="bg-black/10 px-4 py-2 rounded-full text-[11px] font-bold">← Back</button><span className="font-black text-[13px]">💍 NIKAH - Marriage With Wali</span></header>
      <div className="p-4">
        <div className="bg-pink-50 border border-pink-200 rounded-2xl p-4"><p className="text-[12px] font-black">NO DATING APP. NO SWIPE.</p><p className="text-[12px] text-gray-600 mt-1 leading-6">Wali must dey. No private chat until both Walis agree. Then supervised chat. Make halal easy, make haram hard.</p></div>
        <div className="flex gap-2 mt-4">
          <button onClick={() => setTab('PROFILES')} className={`flex-1 py-3 rounded-full text-[12px] font-black ${tab === 'PROFILES' ? 'bg-black text-white' : 'bg-white border'}`}>Profiles</button>
          <button onClick={() => setTab('FUND')} className={`flex-1 py-3 rounded-full text-[12px] font-black ${tab === 'FUND' ? 'bg-black text-white' : 'bg-white border'}`}>Wedding Fund</button>
          <button onClick={() => setTab('COURSE')} className={`flex-1 py-3 rounded-full text-[12px] font-black ${tab === 'COURSE' ? 'bg-black text-white' : 'bg-white border'}`}>Course</button>
        </div>
        {tab === 'PROFILES' && (<>
          <div className="bg-white rounded-2xl border p-4 mt-4">
            <h3 className="font-black text-[13px]">+ Create Profile - Wali Compulsory</h3>
            <div className="flex gap-2 mt-3"><button onClick={() => setGender('Brother')} className={`flex-1 py-3 rounded-full text-[12px] font-bold ${gender === 'Brother' ? 'bg-black text-white' : 'bg-gray-100'}`}>Brother</button><button onClick={() => setGender('Sister')} className={`flex-1 py-3 rounded-full text-[12px] font-bold ${gender === 'Sister' ? 'bg-black text-white' : 'bg-gray-100'}`}>Sister (Wali go manage)</button></div>
            <input value={age} onChange={e => setAge(e.target.value)} placeholder="Age" type="number" className="w-full mt-2 p-3 rounded-xl border text-[13px]" />
            <input value={city} onChange={e => setCity(e.target.value)} placeholder="City" className="w-full mt-2 p-3 rounded-xl border text-[13px]" />
            <input value={work} onChange={e => setWork(e.target.value)} placeholder="Work e.g. Teacher, Driver, Designer" className="w-full mt-2 p-3 rounded-xl border text-[13px]" />
            <select value={deen} onChange={e => setDeen(e.target.value)} className="w-full mt-2 p-3 rounded-xl border text-[13px]"><option>Practicing</option><option>Learning</option><option>Revert - New</option><option>Very Practicing</option></select>
            <textarea value={looking} onChange={e => setLooking(e.target.value)} rows={2} placeholder="Wetin you dey look for?" className="w-full mt-2 p-3 rounded-xl border text-[13px]" />
            <p className="text-[11px] font-black text-red-600 mt-3">WALI - COMPULSORY</p>
            <input value={waliName} onChange={e => setWaliName(e.target.value)} placeholder="Wali Full Name" className="w-full mt-1 p-3 rounded-xl border border-red-200 text-[13px]" />
            <input value={waliPhone} onChange={e => setWaliPhone(e.target.value)} placeholder="Wali Phone / WhatsApp" className="w-full mt-2 p-3 rounded-xl border border-red-200 text-[13px]" />
            <button onClick={createProfile} className="w-full mt-2 bg-black text-white py-3.5 rounded-full text-[11px] font-black">CREATE PROFILE →</button>
          </div>
          <div className="mt-4 space-y-3">{profiles.map(p => (
            <div key={p.id} className="bg-white rounded-2xl border p-4">
              <p className="font-black text-[13px]">{p.gender} • {p.age} • {p.city}</p>
              <p className="text-[12px] text-gray-600 mt-1">Work: {p.work} • Deen: {p.deen_level}</p>
              <p className="text-[12px] mt-1">Looking for: {p.looking_for}</p>
              <p className="text-[11px] mt-2">Wali: {p.wali_name} • Status: <span className="font-bold text-orange-600">{p.status}</span></p>
              <p className="text-[10px] text-gray-400 mt-1">No private chat until both Walis agree. Contact via Wali only.</p>
            </div>
          ))}{profiles.length === 0 && <p className="text-center text-gray-400 text-[12px] py-6">No profile yet.</p>}</div>
        </>)}
        {tab === 'FUND' && (<>
          <div className="bg-white rounded-2xl border p-4 mt-4">
            <h3 className="font-black text-[13px]">+ Apply For Community Wedding Fund</h3>
            <p className="text-[11px] text-gray-500 mt-1">No more "wedding cost ₦2M so we go do haram." Community sponsor simple Nikah.</p>
            <input value={couple} onChange={e => setCouple(e.target.value)} placeholder="Couple names e.g. Ahmed & Fatima" className="w-full mt-3 p-3 rounded-xl border text-[13px]" />
            <textarea value={story} onChange={e => setStory(e.target.value)} rows={2} placeholder="Your story..." className="w-full mt-2 p-3 rounded-xl border text-[13px]" />
            <button onClick={createFund} className="w-full mt-2 bg-pink-600 text-white py-3.5 rounded-full text-[11px] font-black">APPLY FOR FUND →</button>
          </div>
          <div className="mt-4 space-y-3">{funds.map(f => (
            <div key={f.id} className="bg-white rounded-2xl border p-4">
              <p className="font-black text-[13px]">{f.couple_names}</p><p className="text-[12px] text-gray-600 mt-1">{f.story}</p>
              <div className="mt-3 bg-gray-100 rounded-full h-2 overflow-hidden"><div className="h-full bg-pink-600" style={{ width: Math.min(100, (f.amount_raised / f.amount_needed) * 100) + '%' }}></div></div>
              <p className="text-[11px] mt-1 font-bold">₦{f.amount_raised?.toLocaleString()} / ₦{f.amount_needed?.toLocaleString()} • {f.status}</p>
            </div>
          ))}</div>
        </>)}
        {tab === 'COURSE' && (
          <div className="mt-4 space-y-3">
            {['1. Rights - Husband & Wife Rights in Islam', '2. Communication - How to talk without fight', '3. Money - Halal money, budget, no debt', '4. Intimacy in Islam - Modesty + Mercy'].map(l => (
              <div key={l} className="bg-white rounded-2xl border p-4"><p className="font-bold text-[13px]">{l}</p><p className="text-[11px] text-gray-500 mt-1">3-min lesson • Must finish before chat</p><button className="mt-2 bg-black text-white px-4 py-2 rounded-full text-[11px] font-bold">Start Lesson →</button></div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
      }
