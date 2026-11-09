import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import SOSPage from '../components/SOSPage';
import SualPage from '../components/SualPage';
import SuhbaPage from '../components/SuhbaPage';
import KasbPage from '../components/KasbPage';
import NikahPage from '../components/NikahPage';
import DuaPage from '../components/DuaPage';
import TamkeenPage from '../components/TamkeenPage';
import MadrasahPage from '../components/MadrasahPage';
import MasjidPulsePage from '../components/MasjidPulsePage';
import WaqfPage from '../components/WaqfPage';

const pillars = [
  { id: 'sual', icon: '❓', title: "SU'AL", desc: 'Ask questions anonymously and get answers from scholars.' },
  { id: 'suhba', icon: '🤝', title: 'SUHBA', desc: 'Find righteous friends and circles near you.' },
  { id: 'sos', icon: '🚨', title: 'SOS', desc: 'Need urgent help? Reach Imams and volunteers.' },
  { id: 'dua', icon: '🤲', title: 'DUA', desc: 'Ask the Ummah to make dua for you.' },
  { id: 'kasb', icon: '💼', title: 'KASB', desc: 'Find halal work or hire trustworthy Muslims.' },
  { id: 'nikah', icon: '💍', title: 'NIKAH', desc: 'Halal marriage process, always with a Wali.' },
  { id: 'tamkeen', icon: '🌱', title: 'TAMKEEN', desc: 'Grants, mentorship and skills to grow.' },
  { id: 'madrasah', icon: '📖', title: 'MADRASAH', desc: 'Learn Quran, Arabic and Fiqh at your pace.' },
  { id: 'pulse', icon: '🕌', title: 'MASJID PULSE', desc: 'See what your masjid needs and help.' },
  { id: 'waqf', icon: '💧', title: 'WAQF', desc: 'Give Sadaqah in your own currency.' },
];

function FloatingNav({ page, setPage }: { page: string, setPage: (p: string) => void }) {
  const items = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'sual', label: "SU'AL", icon: '❓' },
    { id: 'sos', label: 'SOS', icon: '🚨' },
    { id: 'kasb', label: 'KASB', icon: '💼' },
    { id: 'dua', label: 'DUA', icon: '🤲' },
    { id: 'waqf', label: 'WAQF', icon: '💧' },
  ];
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-[430px] px-4">
      <div className="flex items-center justify-between bg-[#1B2E42] border border-white/10 rounded-full p-1.5 shadow-xl">
        {items.map(n => {
          const active = page === n.id;
          return <button key={n.id} onClick={() => setPage(n.id)} className={`flex items-center gap-1.5 rounded-full ${active ? 'bg-white text-black px-3 py-2.5' : 'text-white/60 px-2.5 py-2.5'}`}><span className="text-[16px]">{n.icon}</span>{active && <span className="text-[11px] font-bold">{n.label}</span>}</button>;
        })}
      </div>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState('home');
  const [notifs, setNotifs] = useState<any[]>([]);
  const [showNotif, setShowNotif] = useState(false);
  useEffect(() => { supabase.from('notifications').select('*').order('created_at', { ascending: false }).limit(20).then(({ data }) => setNotifs(data || [])); }, []);
  if (page === 'sos') return <SOSPage onBack={() => setPage('home')} />;
  if (page === 'sual') return <SualPage onBack={() => setPage('home')} />;
  if (page === 'suhba') return <SuhbaPage onBack={() => setPage('home')} />;
  if (page === 'kasb') return <KasbPage onBack={() => setPage('home')} />;
  if (page === 'nikah') return <NikahPage onBack={() => setPage('home')} />;
  if (page === 'dua') return <DuaPage onBack={() => setPage('home')} />;
  if (page === 'tamkeen') return <TamkeenPage onBack={() => setPage('home')} />;
  if (page === 'madrasah') return <MadrasahPage onBack={() => setPage('home')} />;
  if (page === 'pulse') return <MasjidPulsePage onBack={() => setPage('home')} />;
  if (page === 'waqf') return <WaqfPage onBack={() => setPage('home')} />;
  return (
    <div className="min-h-screen bg-[#0F2439] pb-[110px] w-full max-w-[430px] mx-auto overflow-x-hidden">
      <div className="flex items-center justify-between px-4 pt-5">
        <div className="flex items-center gap-2.5"><div className="w-10 h-10 shrink-0 bg-[#D4AF78] rounded-[12px] flex items-center justify-center font-black text-black text-[19px]">A</div><div><p className="text-white font-extrabold tracking-[0.2em] text-[14px] leading-none">ANSAR</p><p className="text-white/40 text-[9px] tracking-[0.12em] font-semibold mt-1">NO MUSLIM LEFT ALONE</p></div></div>
        <div className="flex items-center gap-2"><button onClick={() => setShowNotif(!showNotif)} className="relative w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">🔔{notifs.length > 0 && <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">{notifs.length}</span>}</button><button onClick={() => setPage('waqf')} className="bg-[#D4AF78] text-black text-[12px] font-bold px-3 py-2.5 rounded-full">Give</button></div>
      </div>
      {showNotif && <div className="mx-4 mt-4 bg-white rounded-[20px] p-4"><p className="font-extrabold">Notifications</p>{notifs.length === 0 ? <p className="text-gray-500 text-[13px] mt-2">No notifications yet. New SOS, jobs and Janazah alerts will appear here.</p> : notifs.map(n => (<div key={n.id} className="border-b py-3 last:border-0"><p className="font-bold text-[13px]">{n.title}</p><p className="text-[12px] text-gray-500">{n.message}</p></div>))}</div>}
      <div className="px-5 pt-8">
        <div className="inline-flex items-center gap-2 bg-white/[0.07] border border-white/10 px-3 py-1.5 rounded-full"><span className="w-2 h-2 bg-emerald-400 rounded-full" /><span className="text-[#D4AF78] text-[10px] font-bold tracking-[0.15em]">A COMMUNITY FOR EVERY MUSLIM</span></div>
        <h1 className="font-serif-lux text-[44px] leading-[1.02] font-black text-white mt-5">Find Your<br /><span className="text-[#D4AF78]">Ummah.</span><br />Find Your<br />Home.</h1>
        <p className="text-white/60 text-[14px] leading-[1.7] mt-4">From questions to marriage, from work to help — one family, one app.</p>
        <button onClick={() => setPage('sual')} className="w-full mt-6 bg-[#D4AF78] text-black font-extrabold text-[14px] py-4 rounded-full">Enter ANSAR — It Is Free →</button>
        <button onClick={() => setPage('sos')} className="w-full mt-3 bg-white/10 border border-white/10 text-white font-bold text-[14px] py-4 rounded-full">I Need Help Now</button>
      </div>
      <div className="px-4 mt-6">
        <p className="text-white font-bold text-[16px] px-1">What do you need today?</p>
        <div className="grid grid-cols-2 gap-3 mt-3">{pillars.map(p => (<button key={p.id} onClick={() => setPage(p.id)} className="bg-white rounded-[20px] p-4 text-left"><div className="w-[44px] h-[44px] bg-[#FFF6E0] rounded-[12px] flex items-center justify-center text-[22px]">{p.icon}</div><p className="font-extrabold text-[15px] mt-3">{p.title}</p><p className="text-[12px] text-gray-500 leading-[1.5] mt-1">{p.desc}</p></button>))}</div>
        <div className="bg-[#D4AF78] rounded-[22px] p-5 mt-4"><p className="text-black font-extrabold text-[16px]">Waqf — Give In Your Currency</p><p className="text-black/60 text-[12px] mt-1">Choose Naira, Dollars, Pounds, or any currency you use.</p><button onClick={() => setPage('waqf')} className="mt-3 bg-black text-white font-bold text-[12px] px-4 py-2.5 rounded-full">Give Sadaqah →</button></div>
      </div>
      <FloatingNav page={page} setPage={setPage} />
    </div>
  );
      }
