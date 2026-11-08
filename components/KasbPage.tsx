import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export default function KasbPage({ onBack }: any) {
  const [jobs, setJobs] = useState<any[]>([]);
  const [tab, setTab] = useState('JOBS');
  const [title, setTitle] = useState(''); const [desc, setDesc] = useState(''); const [loc, setLoc] = useState(''); const [pay, setPay] = useState(''); const [contact, setContact] = useState(''); const [vouch, setVouch] = useState('');
  const load = async () => { const { data } = await supabase.from('kasb_jobs').select('*').order('created_at', { ascending: false }); if (data) setJobs(data); };
  useEffect(() => { load(); }, []);
  const post = async () => {
    if (!title.trim()) { alert('Put title'); return; }
    await supabase.from('kasb_jobs').insert({ type: tab === 'JOBS' ? 'JOB' : 'SKILL', title, description: desc, location: loc, pay, contact, vouch_by: vouch, poster_name: 'ANSAR Member' });
    setTitle(''); setDesc(''); setLoc(''); setPay(''); setContact(''); setVouch(''); load();
  };
  const filtered = jobs.filter(j => tab === 'JOBS' ? j.type === 'JOB' : j.type === 'SKILL');
  return (
    <div className="min-h-screen bg-[#F9F7F4] pb-24">
      <header className="sticky top-0 bg-white p-4 border-b flex items-center gap-3 z-10"><button onClick={onBack} className="bg-black/10 px-4 py-2 rounded-full text-[11px] font-bold">← Back</button><span className="font-black text-[13px]">💼 KASB - Halal Work</span></header>
      <div className="p-4">
        <div className="bg-[#0A1930] rounded-2xl p-4 text-white"><p className="text-[11px] text-[#D4AF78] font-bold">NO CV WAHALA • IMAM VOUCH = CV</p><p className="text-[12px] text-white/70 mt-2 leading-6">Job go lead to marriage, marriage go lead to stability. Prayer break allowed. Halal environment only.</p></div>
        <div className="flex gap-2 mt-4">
          <button onClick={() => setTab('JOBS')} className={`flex-1 py-3 rounded-full text-[12px] font-black ${tab === 'JOBS' ? 'bg-black text-white' : 'bg-white border'}`}>💼 Jobs ({jobs.filter(j => j.type === 'JOB').length})</button>
          <button onClick={() => setTab('SKILLS')} className={`flex-1 py-3 rounded-full text-[12px] font-black ${tab === 'SKILLS' ? 'bg-black text-white' : 'bg-white border'}`}>🛠️ Skills ({jobs.filter(j => j.type === 'SKILL').length})</button>
        </div>
        <div className="bg-white rounded-2xl border p-4 mt-4">
          <h3 className="font-black text-[13px]">{tab === 'JOBS' ? '+ Post Job' : '+ Post Your Skill'}</h3>
          <input value={title} onChange={e => setTitle(e.target.value)} placeholder={tab === 'JOBS' ? 'e.g. I need Driver - Lagos' : 'e.g. I sabi Design / Sew / Teach Quran'} className="w-full mt-3 p-3 rounded-xl border text-[13px]" />
          <textarea value={desc} onChange={e => setDesc(e.target.value)} rows={2} placeholder="Details..." className="w-full mt-2 p-3 rounded-xl border text-[13px]" />
          <input value={loc} onChange={e => setLoc(e.target.value)} placeholder="Location / City" className="w-full mt-2 p-3 rounded-xl border text-[13px]" />
          <input value={pay} onChange={e => setPay(e.target.value)} placeholder="Pay e.g. ₦80k/month or Negotiable" className="w-full mt-2 p-3 rounded-xl border text-[13px]" />
          <input value={contact} onChange={e => setContact(e.target.value)} placeholder="WhatsApp / Contact" className="w-full mt-2 p-3 rounded-xl border text-[13px]" />
          <input value={vouch} onChange={e => setVouch(e.target.value)} placeholder="Who fit vouch for you? e.g. Imam Musa, Central Mosque" className="w-full mt-2 p-3 rounded-xl border text-[13px]" />
          <button onClick={post} className="w-full mt-2 bg-[#0A1930] text-[#D4AF78] py-3.5 rounded-full text-[11px] font-black">POST →</button>
        </div>
        <div className="mt-4 space-y-3">{filtered.map(j => (
          <div key={j.id} className="bg-white rounded-2xl border p-4">
            <div className="flex justify-between"><span className="text-[10px] font-black px-2 py-1 rounded-full bg-blue-100 text-blue-700">{j.type}</span><span className="text-[10px] text-gray-400">{new Date(j.created_at).toLocaleDateString()}</span></div>
            <p className="font-black text-[14px] mt-2">{j.title}</p>
            <p className="text-[12px] text-gray-600 mt-1">{j.description}</p>
            <p className="text-[11px] mt-2">📍 {j.location} • 💰 {j.pay}</p>
            <p className="text-[11px] text-green-700 font-bold mt-1">✅ Vouched by: {j.vouch_by || 'Pending'} • 🕌 Prayer break allowed • Halal environment</p>
            <a href={`https://wa.me/${j.contact?.replace(/[^0-9]/g, '')}`} target="_blank" className="inline-block mt-3 bg-green-600 text-white px-4 py-2 rounded-full text-[11px] font-bold">💬 WhatsApp → {j.contact}</a>
          </div>
        ))}{filtered.length === 0 && <p className="text-center text-gray-400 text-[12px] py-8">No {tab.toLowerCase()} yet. Be first.</p>}</div>
      </div>
    </div>
  );
          }
