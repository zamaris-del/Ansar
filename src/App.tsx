import { useState } from 'react';
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
  { id: 'sual', icon: '❓', title: "SU'AL", desc: 'Ask Without Shame', tag: 'LIVE' },
  { id: 'suhba', icon: '🤝', title: 'SUHBA', desc: 'My Circle, My People', tag: 'LIVE' },
  { id: 'sos', icon: '🚨', title: 'SOS', desc: 'I Need Help Now', tag: 'ALWAYS ON' },
  { id: 'dua', icon: '🤲', title: 'DUA', desc: 'Make Dua For Me', tag: 'LIVE' },
  { id: 'kasb', icon: '💼', title: 'KASB', desc: 'Halal Work & Hustle', tag: 'LIVE' },
  { id: 'nikah', icon: '💍', title: 'NIKAH', desc: 'Marriage With Wali', tag: 'LIVE' },
  { id: 'tamkeen', icon: '🌱', title: 'TAMKEEN', desc: 'Empower & Grow', tag: 'LIVE' },
  { id: 'madrasah', icon: '📖', title: 'MADRASAH', desc: 'Learn Slowly, Surely', tag: 'LIVE' },
  { id: 'pulse', icon: '🕌', title: 'MASJID PULSE', desc: 'Your Masjid Alive?', tag: 'LIVE' },
  { id: 'waqf', icon: '💧', title: 'WAQF', desc: '₦100 Daily Sadaqah', tag: 'LIVE' },
];

export default function App() {
  const [page, setPage] = useState('home');

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
    <div className="min-h-screen bg-[#FFFBF2] pb-[100px] max-w-[430px] mx-auto">
      {/* LUXURY HERO - Black + Gold */}
      <div className="relative bg-[#0B0B0B] px-6 pt-6 pb-8 rounded-b-[36px] overflow-hidden">
        {/* Gold Glow */}
        <div className="absolute -top-24 -right-16 w-[280px] h-[280px] bg-[#D4AF78]/25 rounded-full blur-[70px]" />
        <div className="absolute -bottom-24 -left-12 w-[220px] h-[220px] bg-[#D4AF78]/15 rounded-full blur-[60px]" />
        {/* Thin Gold Line Top */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF78] to-transparent" />
        {/* Pattern */}
        <div className="absolute inset-0 opacity-[0.04] text-[#D4AF78] text-[120px] font-arabic leading-none select-none pointer-events-none text-right pr-2 pt-2">الأنصار</div>

        <div className="relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-[13px] bg-gradient-to-br from-[#F5D9A8] via-[#D4AF78] to-[#8C6D2F] flex items-center justify-center shadow-[0_4px_20px_rgba(212,175,120,0.5)]">
                <span className="text-[20px] font-black text-black font-luxury">A</span>
              </div>
              <div>
                <p className="text-white font-extrabold tracking-[0.28em] text-[14px] leading-none">ANSAR</p>
                <p className="font-arabic text-[#D4AF78] text-[14px] leading-none mt-1">الأنصار • Est. 2026</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 bg-white/[0.08] backdrop-blur px-3 py-1.5 rounded-full gold-border">
              <span className="w-2 h-2 bg-[#D4AF78] rounded-full animate-pulse shadow-[0_0_8px_#D4AF78]" />
              <span className="text-[11px] font-semibold text-[#F5D9A8]">18 Online</span>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-8">
            <div className="h-[1px] w-8 bg-[#D4AF78]" />
            <p className="text-[#D4AF78] text-[10px] font-bold tracking-[0.3em]">ASSALAMU ALAIKUM • WELCOME HOME</p>
          </div>

          <h1 className="font-luxury text-[42px] leading-[1.02] font-black mt-3 tracking-tight text-white">No Muslim<br /><span className="gold-text">Left Alone.</span></h1>
          <p className="text-white/55 text-[13px] leading-[1.75] mt-3 max-w-[310px]">From doubt to marriage to job to help to Jannah. One family. <span className="text-[#D4AF78] font-bold">10 Pillars, 1 Home.</span></p>

          {/* SOS - Luxury Red + Gold Border */}
          <button onClick={() => setPage('sos')} className="w-full mt-6 bg-gradient-to-r from-[#7A1A1A] to-[#B91C1C] active:scale-[0.98] transition py-[17px] rounded-[20px] flex items-center justify-center gap-2.5 border border-[#D4AF78]/40 shadow-[0_15px_35px_rgba(185,28,28,0.35)]">
            <span className="relative flex h-3 w-3"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" /><span className="relative inline-flex rounded-full h-3 w-3 bg-white" /></span>
            <span className="text-white font-extrabold text-[13px] tracking-[0.15em]">SOS — I NEED HELP NOW</span>
          </button>
          <p className="text-center text-white/35 text-[11px] mt-2.5 tracking-wide">✦ Imam + volunteers go reach you in minutes ✦</p>

          {/* Luxury Stats - Gold Cards on Black */}
          <div className="grid grid-cols-3 gap-2.5 mt-6">
            <div className="bg-white/[0.05] gold-border rounded-[18px] p-3.5 text-center backdrop-blur"><p className="gold-text font-luxury font-black text-[19px] leading-none">2,418</p><p className="text-white/45 text-[9px] font-bold tracking-widest mt-1.5">MUSLIMS HELPED</p></div>
            <div className="bg-white/[0.05] gold-border rounded-[18px] p-3.5 text-center backdrop-blur"><p className="gold-text font-luxury font-black text-[19px] leading-none">₦1.2M</p><p className="text-white/45 text-[9px] font-bold tracking-widest mt-1.5">WAQF RAISED</p></div>
            <div className="bg-white/[0.05] gold-border rounded-[18px] p-3.5 text-center backdrop-blur"><p className="gold-text font-luxury font-black text-[19px] leading-none">312</p><p className="text-white/45 text-[9px] font-bold tracking-widest mt-1.5">DUAS ANSWERED</p></div>
          </div>
        </div>
      </div>

      {/* SECTION TITLE */}
      <div className="px-5 mt-6">
        <div className="flex items-center gap-2">
          <p className="text-[11px] font-extrabold tracking-[0.22em] text-black/70">TODAY FOR YOU</p>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-[#D4AF78]/60 to-transparent" />
          <span className="text-[10px] font-bold text-[#B9975B] bg-[#D4AF78]/10 px-2.5 py-1 rounded-full border border-[#D4AF78]/20">PHASE 1 • SAVE</span>
        </div>

        <div className="grid grid-cols-2 gap-3.5 mt-4">
          {pillars.slice(0, 4).map(p => (
            <button key={p.id} onClick={() => setPage(p.id)} className="gold-card rounded-[24px] p-[18px] text-left active:scale-[0.97] transition relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[70px] h-[70px] bg-gradient-to-br from-[#D4AF78]/15 to-transparent rounded-bl-[40px]" />
              <div className="w-[48px] h-[48px] bg-gradient-to-br from-[#FFF7E0] to-[#F5D9A8] border border-[#D4AF78]/30 rounded-[15px] flex items-center justify-center text-[24px] shadow-sm relative">{p.icon}</div>
              <p className="font-extrabold text-[15px] mt-3.5 text-black tracking-tight">{p.title}</p>
              <p className="text-[12px] text-black/45 leading-snug mt-0.5">{p.desc}</p>
              <span className={`inline-flex items-center gap-1.5 mt-3.5 px-2.5 py-[5px] rounded-full text-[9px] font-extrabold tracking-wider ${p.id === 'sos' ? 'bg-[#7A1A1A] text-white' : 'bg-black text-[#D4AF78]'}`}>
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF78]" /> {p.tag}
              </span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 mt-7">
          <p className="text-[11px] font-extrabold tracking-[0.22em] text-black/70">BUILD YOUR FUTURE</p>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-[#D4AF78]/60 to-transparent" />
          <span className="text-[10px] font-bold text-[#B9975B] bg-[#D4AF78]/10 px-2.5 py-1 rounded-full border border-[#D4AF78]/20">PHASE 2 • GROW</span>
        </div>

        <div className="grid grid-cols-2 gap-3.5 mt-4">
          {pillars.slice(4).map(p => (
            <button key={p.id} onClick={() => setPage(p.id)} className="gold-card rounded-[24px] p-[18px] text-left active:scale-[0.97] transition relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[70px] h-[70px] bg-gradient-to-br from-[#D4AF78]/15 to-transparent rounded-bl-[40px]" />
              <div className="w-[48px] h-[48px] bg-gradient-to-br from-[#FFF7E0] to-[#F5D9A8] border border-[#D4AF78]/30 rounded-[15px] flex items-center justify-center text-[24px] shadow-sm relative">{p.icon}</div>
              <p className="font-extrabold text-[15px] mt-3.5 text-black tracking-tight">{p.title}</p>
              <p className="text-[12px] text-black/45 leading-snug mt-0.5">{p.desc}</p>
              <span className="inline-flex items-center gap-1.5 mt-3.5 px-2.5 py-[5px] rounded-full text-[9px] font-extrabold tracking-wider bg-black text-[#D4AF78]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF78]" /> LIVE
              </span>
            </button>
          ))}
        </div>

        {/* Daily Ayah - Luxury */}
        <div className="mt-7 bg-[#0B0B0B] rounded-[26px] p-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF78] to-transparent" />
          <div className="absolute -right-4 -bottom-6 text-[110px] opacity-[0.06] font-arabic text-[#D4AF78] leading-none">ﷲ</div>
          <div className="flex items-center gap-2"><span className="text-[#D4AF78]">✦</span><p className="text-[#D4AF78] text-[10px] font-bold tracking-[0.3em]">AYAH OF THE DAY</p><span className="text-[#D4AF78]">✦</span></div>
          <p className="font-arabic text-white text-[24px] leading-[1.9] mt-4 text-right" dir="rtl">وَقُل رَّبِّ زِدْنِي عِلْمًا</p>
          <p className="text-white/70 text-[13px] leading-relaxed mt-2 font-luxury italic">"And say: My Lord, increase me in knowledge."</p>
          <p className="text-[#D4AF78]/70 text-[11px] mt-3 tracking-widest font-bold">— SURAH TAHA, 20:114</p>
        </div>
      </div>

      {/* LUXURY FOOTER */}
      <div className="mx-5 mt-7 bg-[#0B0B0B] rounded-[26px] p-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF78] to-transparent" />
        <p className="font-luxury font-black tracking-[0.35em] text-white text-[15px]">ANSAR</p>
        <p className="text-[10px] text-[#D4AF78] tracking-[0.25em] font-bold mt-1.5">الأنصار • NO MUSLIM LEFT ALONE</p>
        <div className="h-[1px] bg-white/10 my-4" />
        <p className="text-[12px] text-white/55 leading-[1.75]">One app wey go hold Muslim for every stage of life. If you enter ANSAR, you no go need 10 other apps.</p>
        <p className="text-[10px] text-white/25 mt-4 tracking-widest">© 2026 ANSAR • FROM SHAHADA TO JANNAH ✦</p>
      </div>

      {/* BOTTOM NAV - Luxury Black + Gold */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-[#0B0B0B]/95 backdrop-blur-xl border-t border-[#D4AF78]/20 px-3 pt-2.5 pb-6 z-50">
        <div className="flex justify-between overflow-x-auto no-scrollbar">
          {[
            { id: 'home', label: 'Home', icon: '🏠' },
            { id: 'sual', label: "SU'AL", icon: '❓' },
            { id: 'sos', label: 'SOS', icon: '🔴' },
            { id: 'kasb', label: 'KASB', icon: '💼' },
            { id: 'nikah', label: 'NIKAH', icon: '💍' },
            { id: 'dua', label: 'DUA', icon: '🤲' },
            { id: 'waqf', label: 'WAQF', icon: '💧' },
          ].map(n => (
            <button key={n.id} onClick={() => setPage(n.id)} className={`flex flex-col items-center gap-1 px-3.5 py-2 rounded-[16px] shrink-0 transition ${page === n.id ? 'bg-gradient-to-b from-[#D4AF78] to-[#B9975B] text-black shadow-[0_4px_15px_rgba(212,175,120,0.4)]' : 'text-white/50'}`}>
              <span className="text-[18px] leading-none">{n.icon}</span>
              <span className="text-[9px] font-extrabold tracking-wider">{n.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
          }
