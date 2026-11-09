import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { notifyAll } from '../lib/notify';

export default function WaqfPage({ onBack }: { onBack: () => void }) {
  const [amount, setAmount] = useState(100); const [name, setName] = useState(''); const [cause, setCause] = useState('SOS Fund'); const [recurring, setRecurring] = useState(false);
  const give = async () => {
    const { error } = await supabase.from('waqf_donations').insert([{ amount, donor_name: name || 'Anonymous', cause }]);
    if (error) return alert(error.message);
    await notifyAll('waqf', `${name || 'Someone'} gave ₦${amount} to ${cause}${recurring ? ' (Daily)' : ''}`, 'JazakAllah Khair! A small amount daily, a great reward in Jannah.', 'waqf');
    alert(`JazakAllah Khair! ₦${amount} to ${cause}${recurring ? ' — Daily recurring activated.' : '.'} May Allah reward you.`);
  };
  const leaders = [{ name: 'Aisha B.', amount: '₦48,200', badge: '🥇' }, { name: 'Musa K.', amount: '₦32,500', badge: '🥈' }, { name: 'Fatima A.', amount: '₦27,000', badge: '🥉' }];
  return (
    <div className="min-h-screen bg-[#0F2439] max-w-[430px] mx-auto pb-[120px]">
      <div className="px-5 pt-4 flex items-center gap-3"><button onClick={onBack} className="w-10 h-10 bg-white/10 rounded-full text-white">←</button><div><h1 className="text-white font-extrabold">WAQF</h1><p className="text-[#D4AF78] text-[11px] font-bold">₦100 DAILY SADAQAH</p></div></div>
      <div className="mx-4 mt-4 bg-white rounded-[24px] p-5 text-center"><p className="font-extrabold text-[22px]">₦1,248,500 Raised</p><p className="text-[12px] text-gray-500">From 2,418 Muslims • Goal ₦5,000,000</p><div className="h-3 bg-gray-100 rounded-full mt-3"><div className="h-3 bg-[#D4AF78] rounded-full" style={{ width: '25%' }} /></div><div className="grid grid-cols-3 gap-2 mt-4 text-left"><div className="bg-gray-50 rounded-[12px] p-3"><p className="text-[10px] text-gray-500 font-bold">SOS FUND</p><p className="font-extrabold text-[13px]">₦620k</p></div><div className="bg-gray-50 rounded-[12px] p-3"><p className="text-[10px] text-gray-500 font-bold">ORPHANS</p><p className="font-extrabold text-[13px]">₦380k</p></div><div className="bg-gray-50 rounded-[12px] p-3"><p className="text-[10px] text-gray-500 font-bold">EDUCATION</p><p className="font-extrabold text-[13px]">₦248k</p></div></div><p className="text-[11px] text-gray-400 mt-3">100% transparent. See exactly where your money goes.</p></div>
      <div className="mx-4 mt-3 bg-white rounded-[24px] p-5"><p className="font-extrabold">Top Givers This Month 🏆</p>{leaders.map(l => (<div key={l.name} className="flex items-center justify-between py-2.5 border-b last:border-0"><p className="text-[13px] font-bold">{l.badge} {l.name}</p><p className="font-extrabold text-[13px]">{l.amount}</p></div>))}</div>
      <div className="mx-4 mt-3 bg-white rounded-[24px] p-5">
        <p className="font-extrabold">Choose A Cause</p>
        <div className="flex flex-wrap gap-2 mt-3">{['SOS Fund', 'Orphans', 'Masjid Building', 'Education'].map(c => (<button key={c} onClick={() => setCause(c)} className={`px-3 py-2 rounded-full text-[12px] font-bold ${cause === c ? 'bg-black text-white' : 'bg-gray-100'}`}>{c}</button>))}</div>
        <p className="font-extrabold mt-5">Choose An Amount</p>
        <div className="grid grid-cols-4 gap-2 mt-3">{[100, 500, 1000, 5000].map(a => (<button key={a} onClick={() => setAmount(a)} className={`py-3 rounded-[16px] font-extrabold ${amount === a ? 'bg-[#D4AF78] text-black' : 'bg-gray-100'}`}>₦{a}</button>))}</div>
        <div className="flex items-center justify-between bg-[#FFF6E0] rounded-[16px] p-4 mt-4"><div><p className="font-bold text-[13px]">Make It Daily? 🔁</p><p className="text-[11px] text-gray-500">Give ₦{amount} every day automatically.</p></div><button onClick={() => setRecurring(!recurring)} className={`w-12 h-7 rounded-full p-1 transition ${recurring ? 'bg-emerald-500' : 'bg-gray-300'}`}><div className={`w-5 h-5 bg-white rounded-full transition ${recurring ? 'translate-x-5' : ''}`} /></button></div>
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Your name (or Anonymous)" className="w-full mt-4 bg-[#F7F3EC] border rounded-[16px] px-4 py-3.5 outline-none" />
        <button onClick={give} className="w-full mt-4 bg-[#D4AF78] font-extrabold py-4 rounded-full">GIVE ₦{amount} TO {cause.toUpperCase()} {recurring ? 'DAILY →' : '→'}</button>
        <p className="text-[11px] text-gray-400 text-center mt-3">Even ₦100 a day becomes Sadaqah Jariyah that never stops.</p>
      </div>
    </div>
  );
}
