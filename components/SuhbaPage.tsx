import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export default function SuhbaPage({ onBack }: any) {
  const [pairs, setPairs] = useState<any[]>([]);
  const [type, setType] = useState('Revert Anchor');
  const [a, setA] = useState(''); const [b, setB] = useState(''); const [city, setCity] = useState('');
  const load = async () => { const { data } = await supabase.from('suhba_pairs').select('*').order('created_at', { ascending: false }); if (data) setPairs(data); };
  useEffect(() => { load(); }, []);
  const add = async () => {
    if (!a.trim() || !b.trim()) { alert('Put both names'); return; }
    await supabase.from('suhba_pairs').insert({ type, person_a: a, person_b: b, city, status: 'GREEN' });
    setA(''); setB(''); setCity(''); load();
  };
  const markCheck = async (id: string) => {
    await supabase.from('suhba_pairs').update({ last_check: new Date().toISOString(), status: 'GREEN' }).eq('id', id); load();
  };
  const getStatus = (p: any) => {
    const days = (Date.now() - new Date(p.last_check).getTime()) / (1000 * 60 * 60 * 24);
    if (days >= 14) return { label: '🔴 RED - ACTION NOW', cls: 'bg-red-100 text-red-700' };
    if (days >= 7) return { label: '🟡 YELLOW - 7 days no show', cls: 'bg-yellow-100 text-yellow-700' };
    return { label: '🟢 GREEN - Okay', cls: 'bg-green-100 text-green-700' };
  };
  return (
    <div className="min-h-screen bg-[#F9F7F4] pb-24">
      <header className="sticky top-0 bg-white p-4 border-b flex items-center gap-3 z-10"><button onClick={onBack} className="bg-black/10 px-4 py-2 rounded-full text-[11px] font-bold">← Back</button><span className="font-black text-[13px]">🤝 SUHBA - My Circle</span></header>
      <div className="p-4">
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="bg-white rounded-xl border p-3"><p className="text-[18px]">🌱</p><p className="text-[10px] font-bold mt-1">Revert Anchor</p><p className="text-[9px] text-gray-500">1 new Muslim + 1 Anchor</p></div>
          <div className="bg-white rounded-xl border p-3"><p className="text-[18px]">👥</p><p className="text-[10px] font-bold mt-1">Lonely Circle</p><p className="text-[9px] text-gray-500">Circle of 5</p></div>
          <div className="bg-white rounded-xl border p-3"><p className="text-[18px]">👴</p><p className="text-[10px] font-bold mt-1">Elder Guardian</p><p className="text-[9px] text-gray-500">1 elder + 1 Guardian</p></div>
        </div>
        <div className="bg-white rounded-2xl border p-4 mt-4">
          <h3 className="font-black text-[13px]">+ Add New Pair / Circle</h3>
          <div className="flex gap-2 mt-3 flex-wrap">{['Revert Anchor', 'Lonely Circle', 'Elder Guardian'].map(t => <button key={t} onClick={() => setType(t)} className={`px-3 py-2 rounded-full text-[11px] font-bold ${type === t ? 'bg-black text-white' : 'bg-gray-100'}`}>{t}</button>)}</div>
          <input value={a} onChange={e => setA(e.target.value)} placeholder="Person A e.g. Chidinma (Revert)" className="w-full mt-3 p-3 rounded-xl border text-[13px]" />
          <input value={b} onChange={e => setB(e.target.value)} placeholder="Person B e.g. Maryam (Anchor)" className="w-full mt-2 p-3 rounded-xl border text-[13px]" />
          <input value={city} onChange={e => setCity(e.target.value)} placeholder="City e.g. Enugu" className="w-full mt-2 p-3 rounded-xl border text-[13px]" />
          <button onClick={add} className="w-full mt-2 bg-[#0A1930] text-[#D4AF78] py-3.5 rounded-full text-[11px] font-black">ADD PAIR →</button>
        </div>
        <h3 className="font-black text-[13px] mt-5">Coordinator Dashboard - {pairs.length} pairs</h3>
        <div className="mt-3 space-y-3">
          {pairs.map(p => { const s = getStatus(p); return (
            <div key={p.id} className="bg-white rounded-2xl border p-4">
              <div className="flex justify-between"><span className="text-[11px] font-bold">{p.type}</span><span className={`text-[10px] font-black px-2 py-1 rounded-full ${s.cls}`}>{s.label}</span></div>
              <p className="text-[13px] mt-2 font-bold">{p.person_a} + {p.person_b}</p>
              <p className="text-[11px] text-gray-500">{p.city} • Last check: {new Date(p.last_check).toLocaleDateString()}</p>
              <button onClick={() => markCheck(p.id)} className="mt-2 bg-green-600 text-white px-4 py-2 rounded-full text-[11px] font-bold">✅ Mark Checked Today</button>
            </div>
          ); })}
          {pairs.length === 0 && <p className="text-center text-gray-400 text-[12px] py-6">No pair yet. Add your first revert + anchor.</p>}
        </div>
      </div>
    </div>
  );
      }
