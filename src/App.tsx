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
  { id: 'sual', icon: '❓', title: "SU'AL", desc: 'Ask Without Shame', count: '1.2k questions' },
  { id: 'suhba', icon: '🤝', title: 'SUHBA', desc: 'Your Circle, Your People', count: '340 circles' },
  { id: 'sos', icon: '🚨', title: 'SOS', desc: 'I Need Help Now', count: 'Available 24/7' },
  { id: 'dua', icon: '🤲', title: 'DUA', desc: 'Make Dua For Me', count: '890 duas' },
  { id: 'kasb', icon: '💼', title: 'KASB', desc: 'Halal Work and Hustle', count: '120 jobs' },
  { id: 'nikah', icon: '💍', title: 'NIKAH', desc: 'Marriage With a Wali', count: '68 profiles' },
  { id: 'tamkeen', icon: '🌱', title: 'TAMKEEN', desc: 'Empower and Grow', count: '45 grants' },
  { id: 'madrasah', icon: '📖', title: 'MADRASAH', desc: 'Learn Slowly and Surely', count: '12 courses' },
  { id: 'pulse', icon: '🕌', title: 'MASJID PULSE', desc: 'Is Your Masjid Active?', count: '86 masjids' },
  { id: 'waqf', icon: '💧', title: 'WAQF', desc: '₦100 Daily Sadaqah', count: '₦1.2M raised' },
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
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center gap-1 bg-[#1B2E42] border border-white/10 rounded-full p-[6px] shadow-[0_15px_40px_rgba(0,0,0,0.45)]">
        {items.map(n => {
          const active = page === n.id;
          return (
            <button key={n.id} onClick={() => setPage(n.id)} className={`flex items-center gap-1.5 rounded-full transition-all ${active ? 'bg-white text-black px-4 py-2.5' : 'text-white/50 px-3 py-2.5'}`}>
              <span className="text-[18px] leading-none">{n.icon}</span>
              {active && <span className="text-[12px] font-bold whitespace-nowrap">{n.label}</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState('home');
  const [notifs, setNotifs] = useState<any[]>([]);
  const [showNotif, setShowNotif] = useState(false);

  useEffect(() => {
    supabase.from('notifications').select('*').order('created_at', { ascending: false }).limit(20).then(({ data }) => setNotifs(data || []));
  }, []);

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
    <div className="min-h-screen bg-[#0F2439] pb-[120px] max-w-[430px] mx-auto">
      <div className="flex items-center justify-between px-5 pt-5">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 bg-[#D4AF78] rounded-[12px] flex items-center justify-center font-black text-black text-[19px]">A</div>
          <div>
            <p className="text-white font-extrabold tracking-[0.22em] text-[14px] leading-none">ANSAR</p>
            <p className="text-white/40 text-[10px] tracking-[0.15em] font-semibold mt-1">NO MUSLIM LEFT ALONE</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white">🔍</button>
          <button onClick={() => setShowNotif(!showNotif)} className="relative w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white">🔔{notifs.length > 0 && <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">{notifs.length}</span>}</button>
          <button onClick={() => setPage('waqf')} className="bg-[#D4AF78] text-black text-[12px] font-bold px-4 py-2.5 rounded-full">Open Waqf</button>
        </div>
      </div>

      {showNotif && (
        <div className="mx-4 mt-4 bg-white rounded-[20px] p-4 shadow-xl">
          <p className="font-extrabold">Notifications</p>
          {notifs.length === 0 ? <p className="text-gray-500 text-[13px] mt-2">No notifications yet. When there is an SOS, a new job, or a Janazah alert, you will see it here.</p> : notifs.map(n => (
            <div key={n.id} className="border-b py-3 last:border-0"><p className="font-bold text-[13px]">{n.title}</p><p className="text-[12px] text-gray-500">{n.message}</p></div>
          ))}
        </div>
      )}

      <div className="px-6 pt-9">
        <div className="inline-flex items-center gap-2 bg-white/[0.07] border border-white/10 px-3.5 py-1.5 rounded-full">
          <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
          <span className="text-[#D4AF78] text-[10px] font-bold tracking-[0.18em]">18 COUNTRIES • LIVE</span>
        </div>
        <h1 className="font-serif-lux text-[52px] leading-[0.95] font-black tracking-tight text-white mt-6">
          Find Your<br /><span className="text-[#D4AF78]">Ummah.</span><br />Find Your<br />Home.
        </h1>
        <p className="text-white/55 text-[14px] leading-[1.7] mt-4 max-w-[320px]">From doubt to marriage, from work to help to Jannah. One family. Ten pillars, one home.</p>
        <button onClick={() => setPage('sual')} className="w-full mt-7 bg-[#D4AF78] text-black font-extrabold text-[14px] py-[16px] rounded-full">Enter ANSAR — It Is Free →</button>
        <button onClick={() => setPage('sos')} className="w-full mt-3 bg-white/10 border border-white/10 text-white font-bold text-[14px] py-[16px] rounded-full">How It Works</button>
      </div>

      <div className="mx-4 mt-8 bg-white rounded-[24px] p-5">
        <div className="flex items-center justify-between">
          <p className="text-black/40 text-[10px] tracking-[0.2em] font-bold">ANSAR TODAY</p>
          <span className="flex items-center gap-1.5 text-emerald-600 text-[11px] font-bold"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" /> LIVE</span>
        </div>
        <div className="grid grid-cols-3 gap-3 mt-4">
          <div className="text-center"><p className="font-extrabold text-[20px]">2,418</p><p className="text-black/40 text-[9px] font-bold tracking-widest">HELPED</p></div>
          <div className="text-center border-x border-black/5"><p className="font-extrabold text-[20px]">₦1.2M</p><p className="text-black/40 text-[9px] font-bold tracking-widest">WAQF</p></div>
          <div className="text-center"><p className="font-extrabold text-[20px]">312</p><p className="text-black/40 text-[9px] font-bold tracking-widest">DUAS</p></div>
        </div>
      </div>

      <div className="px-4 mt-6">
        <div className="flex items-center justify-between px-1"><p className="text-white font-bold text-[16px]">Ten Pillars For You</p><p className="text-[#D4AF78] text-[12px] font-bold">View All →</p></div>
        <div className="grid grid-cols-2 gap-3 mt-3">
          {pillars.map(p => (
            <button key={p.id} onClick={() => setPage(p.id)} className="bg-white rounded-[22px] p-4 text-left active:scale-[0.97] transition">
              <div className="w-[46px] h-[46px] bg-[#FFF6E0] rounded-[14px] flex items-center justify-center text-[23px]">{p.icon}</div>
              <p className="font-extrabold text-[15px] mt-3">{p.title}</p><p className="text-[12px] text-gray-500">{p.desc}</p><p className="text-[10px] text-[#B9975B] font-bold mt-2">{p.count}</p>
            </button>
          ))}
        </div>
        <div className="bg-[#D4AF78] rounded-[24px] p-5 mt-4 flex items-center justify-between">
          <div><p className="text-black font-extrabold text-[16px]">Waqf — ₦100 Daily</p><p className="text-black/60 text-[12px] mt-0.5">A small amount daily, a great reward.</p></div>
          <button onClick={() => setPage('waqf')} className="bg-black text-white font-bold text-[12px] px-4 py-2.5 rounded-full whitespace-nowrap">Give Now →</button>
        </div>
      </div>
      <FloatingNav page={page} setPage={setPage} />
    </div>
  );
}
