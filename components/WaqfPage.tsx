import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export default function WaqfPage({ onBack }: any) {
  const [projects, setProjects] = useState<any[]>([]);
  const [title, setTitle] = useState(''); const [loc, setLoc] = useState(''); const [target, setTarget] = useState(''); const [cat, setCat] = useState('Water Well'); const [desc, setDesc] = useState('');
  const [donor, setDonor] = useState(''); const [donateAmt, setDonateAmt] = useState('100');
  const load = async () => { const { data } = await supabase.from('waqf_projects').select('*').order('created_at', { ascending: false }); if (data) setProjects(data); };
  useEffect(() => { load(); }, []);
  const createProject = async () => {
    if (!title.trim()) return;
    await supabase.from('waqf_projects').insert({ title, location: loc, target_amount: parseInt(target) || 100000, raised_amount: 0, category: cat, description: desc });
    setTitle(''); setLoc(''); setTarget(''); setDesc(''); load();
  };
  const donate = async (p: any) => {
    const amt = parseInt(donateAmt) || 100;
    await supabase.from('waqf_donations').insert({ donor_name: donor || 'Anonymous', project_id: p.id, amount: amt });
    await supabase.from('waqf_projects').update({ raised_amount: (p.raised_amount || 0) + amt }).eq('id', p.id);
    load(); alert(`JazakAllah! Your ₦${amt} don join. Sadaqah Jariyah go continue even after you die.`);
  };
  const totalRaised = projects.reduce((s, p) => s + (p.raised_amount || 0), 0);
  return (
    <div className="min-h-screen bg-[#F9F7F4] pb-24">
      <header className="sticky top-0 bg-white p-4 border-b flex items-center gap-3 z-10"><button onClick={onBack} className="bg-black/10 px-4 py-2 rounded-full text-[11px] font-bold">← Back</button><span className="font-black text-[13px]">💧 WAQF - Small Small Sadaqah Jariyah</span></header>
      <div className="p-4">
        <div className="bg-[#0A1930] rounded-2xl p-4 text-white"><p className="text-[11px] text-[#D4AF78] font-bold">EVEN POOR PERSON FIT DO SADAQAH JARIYAH EVERY DAY</p><p className="text-[12px] text-white/70 mt-2 leading-6">Your ₦100 + 10,000 people = 1 borehole for Borno. Total raised on ANSAR: ₦{totalRaised.toLocaleString()}</p></div>
        <div className="bg-white rounded-2xl border p-4 mt-4">
          <h3 className="font-black text-[13px]">+ Create Waqf Project</h3>
          <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Project e.g. Borehole for Borno" className="w-full mt-3 p-3 rounded-xl border text-[13px]" />
          <input value={loc} onChange={e => setLoc(e.target.value)} placeholder="Location e.g. Borno" className="w-full mt-2 p-3 rounded-xl border text-[13px]" />
          <select value={cat} onChange={e => setCat(e.target.value)} className="w-full mt-2 p-3 rounded-xl border text-[13px]"><option>Water Well</option><option>Quran School</option><option>Masjid Building</option><option>Orphan School Fees</option></select>
          <input value={target} onChange={e => setTarget(e.target.value)} placeholder="Target e.g. 500000" type="number" className="w-full mt-2 p-3 rounded-xl border text-[13px]" />
          <textarea value={desc} onChange={e => setDesc(e.target.value)} rows={2} placeholder="Description..." className="w-full mt-2 p-3 rounded-xl border text-[13px]" />
          <button onClick={createProject} className="w-full mt-2 bg-[#0A1930] text-[#D4AF78] py-3.5 rounded-full text-[11px] font-black">CREATE PROJECT →</button>
        </div>
        <div className="bg-white rounded-2xl border p-4 mt-4">
          <h3 className="font-black text-[13px]">💧 Give ₦100 Daily</h3>
          <input value={donor} onChange={e => setDonor(e.target.value)} placeholder="Your name" className="w-full mt-3 p-3 rounded-xl border text-[13px]" />
          <div className="flex gap-2 mt-2">{['100', '500', '1000', '5000'].map(a => <button key={a} onClick={() => setDonateAmt(a)} className={`flex-1 py-3 rounded-full text-[12px] font-black ${donateAmt === a ? 'bg-black text-white' : 'bg-gray-100'}`}>₦{a}</button>)}</div>
          <p className="text-[11px] text-gray-500 mt-2">Selected: ₦{donateAmt} - Pick project below to give</p>
        </div>
        <div className="mt-4 space-y-3">{projects.map(p => {
          const pct = p.target_amount ? Math.min(100, (p.raised_amount / p.target_amount) * 100) : 0;
          return (
            <div key={p.id} className="bg-white rounded-2xl border p-4">
              <div className="flex justify-between"><span className="text-[10px] font-black px-2 py-1 rounded-full bg-blue-100 text-blue-700">{p.category}</span><span className="text-[10px] font-bold">{pct.toFixed(0)}% done</span></div>
              <p className="font-black text-[14px] mt-2">{p.title}</p>
              <p className="text-[12px] text-gray-600">📍 {p.location} • {p.description}</p>
              <div className="mt-3 bg-gray-100 rounded-full h-2.5 overflow-hidden"><div className="h-full bg-blue-600" style={{ width: pct + '%' }}></div></div>
              <p className="text-[11px] mt-1 font-bold">₦{p.raised_amount?.toLocaleString()} / ₦{p.target_amount?.toLocaleString()}</p>
              <button onClick={() => donate(p)} className="mt-3 w-full bg-blue-600 text-white py-3 rounded-full text-[11px] font-black">💧 GIVE ₦{donateAmt} TO THIS PROJECT</button>
            </div>
          );
        })}{projects.length === 0 && <p className="text-center text-gray-400 text-[12px] py-6">No Waqf project yet. Create borehole for Borno first.</p>}</div>
      </div>
    </div>
  );
            }
