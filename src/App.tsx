import { useState } from 'react';

// ---------- DATA ----------
const PILLARS = [
  { id: 'sual', icon: '◐', emoji: '❓', title: "SU'AL", arabic: 'سؤال', desc: 'Ask Without Shame', detail: 'Doubt? Sin? Confused? Ask Imam privately. No judgement.' },
  { id: 'suhba', icon: '◑', emoji: '🤝', title: 'SUHBA', arabic: 'صحبة', desc: 'My Circle, My People', detail: 'Find your 3-5 righteous brothers/sisters wey go check on you.' },
  { id: 'sos', icon: '⬢', emoji: '🚨', title: 'SOS', arabic: 'نجدة', desc: 'I Need Help Now', detail: 'Hungry? Homeless? In danger? Imam + volunteers go reach you.' },
  { id: 'dua', icon: '⬣', emoji: '🤲', title: 'DUA', arabic: 'دعاء', desc: 'Make Dua For Me', detail: 'Ummah go say Ameen for you. Grief shared na grief halved.' },
  { id: 'kasb', icon: '◆', emoji: '💼', title: 'KASB', arabic: 'كسب', desc: 'Halal Work & Hustle', detail: 'No CV wahala. Imam vouch = CV. Halal work only.' },
  { id: 'nikah', icon: '◇', emoji: '💍', title: 'NIKAH', arabic: 'نكاح', desc: 'Marriage With Wali', detail: 'Halal marriage, Wali involved, no fitnah, no games.' },
  { id: 'tamkeen', icon: '⬔', emoji: '🌱', title: 'TAMKEEN', arabic: 'تمكين', desc: 'Empower & Grow', detail: 'Small business, skills, mentorship. From survival to stability.' },
  { id: 'madrasah', icon: '⬕', emoji: '📖', title: 'MADRASAH', arabic: 'مدرسة', desc: 'Learn Slowly, Surely', detail: 'Quran, Arabic, Fiqh - small daily, no pressure.' },
  { id: 'pulse', icon: '⬖', emoji: '🕌', title: 'MASJID PULSE', arabic: 'مسجد', desc: 'Your Masjid Alive?', detail: 'Is your masjid alive? Prayer times, events, community.' },
  { id: 'waqf', icon: '⬗', emoji: '💧', title: 'WAQF', arabic: 'وقف', desc: '₦100 Daily Sadaqah', detail: '₦100 daily. Small for you, Jannah for you.' },
];

// ---------- FLOATING NAV - HAQQ STYLE ----------
function FloatingNav({ page, go }: { page: string, go: (p: string) => void }) {
  const items = [
    { id: 'home', label: 'Home', icon: '⌂' },
    { id: 'sual', label: "SU'AL", icon: '?' },
    { id: 'sos', label: 'SOS', icon: '!' },
    { id: 'kasb', label: 'KASB', icon: '◈' },
    { id: 'dua', label: 'DUA', icon: '☪' },
    { id: 'waqf', label: 'WAQF', icon: '✦' },
  ];
  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 w-full max-w-[430px] px-4 pointer-events-none">
      <div className="pointer-events-auto mx-auto w-fit flex items-center gap-1 bg-[#132A3E]/95 backdrop-blur-xl border border-white/10 rounded-full p-[6px] shadow-[0_18px_45px_rgba(0,0,0,0.55)]">
        {items.map(n => {
          const active = page === n.id;
          return (
            <button key={n.id} onClick={() => go(n.id)} className={`flex items-center gap-1.5 rounded-full transition-all ${active ? 'bg-white text-black px-4 py-2.5 shadow-lg' : 'text-white/50 hover:text-white px-3 py-2.5'}`}>
              <span className="text-[16px] leading-none font-bold">{n.icon}</span>
              {active && <span className="text-[12px] font-extrabold">{n.label}</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ---------- GENERIC PILLAR PAGE - Beautiful for ALL pages ----------
function PillarPage({ pillar, go }: { pillar: any, go: (p: string) => void }) {
  const [val, setVal] = useState('');
  const [posted, setPosted] = useState(false);
  return (
    <div className="min-h-screen islamic-bg islamic-pattern max-w-[430px] mx-auto pb-[130px] relative">
      <div className="px-5 pt-5 flex items-center gap-3">
        <button onClick={() => go('home')} className="w-10 h-10 glass rounded-full flex items-center justify-center text-white text-[18px]">←</button>
        <div>
          <p className="text-white font-extrabold tracking-[0.15em] text-[15px]">{pillar.title} <span className="font-arabic text-[#D4AF78] text-[16px]">{pillar.arabic}</span></p>
          <p className="text-[#D4AF78] text-[10px] tracking-[0.22em] font-bold mt-0.5">{pillar.desc.toUpperCase()}</p>
        </div>
      </div>

      <div className="mx-5 mt-6 bg-[#0F2439]/80 border border-[#D4AF78]/20 rounded-[28px] p-6 relative overflow-hidden">
        <div className="absolute -right-4 -top-6 font-arabic text-[90px] text-[#D4AF78]/10 leading-none">{pillar.arabic}</div>
        <p className="font-serif-lux text-white text-[28px] leading-[1.1]">{pillar.title}</p>
        <p className="text-white/60 text-[13px] leading-relaxed mt-2">{pillar.detail}</p>
        <div className="flex gap-2 mt-4">
          <span className="bg-emerald-500/15 text-emerald-300 border border-emerald-500/20 text-[10px] font-bold px-2.5 py-1 rounded-full">● LIVE</span>
          <span className="bg-[#D4AF78]/15 text-[#D4AF78] border border-[#D4AF78]/20 text-[10px] font-bold px-2.5 py-1 rounded-full">PRIVATE & SAFE</span>
        </div>
      </div>

      <div className="mx-4 mt-4 glass-white rounded-[26px] p-5 shadow-[0_15px_40px_rgba(0,0,0,0.25)]">
        <p className="font-extrabold text-[16px] text-black">Share With Ummah</p>
        <p className="text-gray-500 text-[12px] mt-1">Only good intentions. Allah sees your heart.</p>

        {pillar.id === 'kasb' && (
          <div className="mt-4 space-y-3">
            <input className="input-lux" placeholder="Job title e.g. I need Driver - Lagos" />
            <input className="input-lux" placeholder="Location / City" />
            <input className="input-lux" placeholder="Pay e.g. ₦80k/month or Negotiable" />
            <input className="input-lux" placeholder="WhatsApp / Contact" />
          </div>
        )}
        {pillar.id === 'dua' && (
          <div className="mt-4 space-y-3">
            <input className="input-lux" placeholder="Name of deceased / Your name" />
            <input className="input-lux" placeholder="City / Masjid" />
          </div>
        )}
        <textarea value={val} onChange={e => setVal(e.target.value)} placeholder={pillar.id === 'sual' ? 'Ask your question privately... No shame here.' : pillar.id === 'sos' ? 'What do you need right now? Food, shelter, money, someone to talk to?' : 'Write here... Allah is listening.'} className="input-lux mt-3 min-h-[110px] resize-none" />
        <button onClick={() => { if (!val.trim()) return alert('Write something first'); setPosted(true); setVal(''); }} className="w-full mt-4 bg-[#0F2439] text-white font-extrabold text-[13px] py-4 rounded-full">POST →</button>
        {posted && <p className="text-center text-emerald-600 text-[12px] font-bold mt-3">✓ Posted. Ummah go see am. May Allah accept it.</p>}
        <p className="text-center text-gray-400 text-[11px] mt-3">Be kind. No judgement. We are family.</p>
      </div>

      <div className="mx-4 mt-4 bg-white/[0.04] border border-white/[0.07] rounded-[22px] p-5 text-center">
        <p className="font-arabic text-white/80 text-[20px] leading-relaxed">وَقُل رَّبِّ زِدْنِي عِلْمًا</p>
        <p className="text-white/40 text-[11px] mt-1">"My Lord, increase me in knowledge." — Taha 20:114</p>
      </div>
      <FloatingNav page={pillar.id} go={go} />
    </div>
  );
}

// ---------- HOME ----------
export default function App() {
  const [page, setPage] = useState('home');
  const go = (p: string) => { setPage(p); window.scrollTo(0, 0); };

  const current = PILLARS.find(p => p.id === page);
  if (current) return <PillarPage pillar={current} go={go} />;

  return (
    <div className="min-h-screen islamic-bg islamic-pattern max-w-[430px] mx-auto pb-[130px] relative overflow-x-hidden">
      {/* TOP */}
      <div className="flex items-center justify-between px-5 pt-5">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-[12px] gold-btn flex items-center justify-center font-serif-lux font-black text-black text-[20px]">A</div>
          <div>
            <p className="text-white font-extrabold tracking-[0.28em] text-[14px] leading-none">ANSAR</p>
            <p className="font-arabic text-[#D4AF78] text-[13px] leading-none mt-1">الأنصار</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="w-9 h-9 glass rounded-full text-white text-[14px]">⌕</button>
          <button className="w-9 h-9 glass rounded-full text-white text-[14px]">◐</button>
          <button onClick={() => go('waqf')} className="gold-btn text-black text-[12px] font-extrabold px-4 py-2.5 rounded-full">Open Waqf</button>
        </div>
      </div>

      {/* HERO - ZAMARI FADE */}
      <div className="px-6 pt-8 text-center relative">
        <div className="absolute left-1/2 -translate-x-1/2 top-2 font-arabic text-[110px] text-[#D4AF78]/[0.06] leading-none select-none pointer-events-none whitespace-nowrap">الأنصار</div>
        <div className="relative inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full">
          <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
          <span className="text-[#D4AF78] text-[10px] font-bold tracking-[0.22em]">18 COUNTRIES • LIVE • UMMah ONLINE</span>
        </div>
        <h1 className="relative font-serif-lux text-[52px] leading-[0.92] font-black text-white mt-6 tracking-tight">
          Never Leave<br />
          <span className="gold-text">A Muslim</span><br />
          Alone<span className="text-[#D4AF78]">.</span>
        </h1>
        <p className="relative text-white/55 text-[14px] leading-[1.75] mt-4 max-w-[320px] mx-auto">From doubt to marriage to job to help to Jannah. One family. One home. Built for Amanah.</p>

        <button onClick={() => go('sual')} className="relative w-full mt-6 gold-btn text-black font-extrabold text-[14px] py-[17px] rounded-full active:scale-[0.98] transition">Enter ANSAR — It's Free →</button>
        <button onClick={() => go('sos')} className="relative w-full mt-3 glass text-white font-bold text-[14px] py-[16px] rounded-full active:scale-[0.98] transition">I Need Help Now — SOS 🚨</button>

        <div className="relative flex justify-center gap-2 mt-5 flex-wrap">
          {['🇳🇬 Lagos', '🇬🇧 London', '🇦🇪 Dubai', '🇸🇦 Makkah', '🇺🇸 New York'].map(c => (
            <span key={c} className="glass text-white/80 text-[11px] px-3 py-1.5 rounded-full">{c}</span>
          ))}
        </div>
      </div>

      {/* VAULT PREVIEW */}
      <div className="mx-4 mt-8 bg-[#122A3F]/80 border border-white/[0.08] rounded-[26px] p-5 backdrop-blur">
        <div className="flex justify-between items-center">
          <p className="text-white/50 text-[10px] tracking-[0.28em] font-bold">ANSAR VAULT • PREVIEW</p>
          <span className="text-emerald-400 text-[11px] font-bold">● LIVE</span>
        </div>
        <div className="grid grid-cols-3 gap-3 mt-4">
          <div className="bg-white/[0.04] border border-white/[0.06] rounded-[18px] py-4 text-center"><p className="text-white font-extrabold text-[19px]">2,418</p><p className="text-white/40 text-[9px] font-bold tracking-widest mt-1">HELPED</p></div>
          <div className="bg-white/[0.04] border border-white/[0.06] rounded-[18px] py-4 text-center"><p className="gold-text font-extrabold text-[19px]">₦1.2M</p><p className="text-white/40 text-[9px] font-bold tracking-widest mt-1">WAQF</p></div>
          <div className="bg-white/[0.04] border border-white/[0.06] rounded-[18px] py-4 text-center"><p className="text-white font-extrabold text-[19px]">312</p><p className="text-white/40 text-[9px] font-bold tracking-widest mt-1">DUAS</p></div>
        </div>
      </div>

      {/* PILLARS - Mature Cards */}
      <div className="px-4 mt-6">
        <div className="flex items-center justify-between px-1">
          <p className="text-white font-bold text-[15px]">10 Pillars — One Home</p>
          <p className="text-[#D4AF78] text-[11px] font-bold">All Pillars →</p>
        </div>
        <div className="grid grid-cols-2 gap-3 mt-3">
          {PILLARS.map(p => (
            <button key={p.id} onClick={() => go(p.id)} className="glass-white rounded-[24px] p-4 text-left active:scale-[0.97] transition shadow-[0_8px_25px_rgba(0,0,0,0.25)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[60px] h-[60px] bg-gradient-to-br from-[#D4AF78]/20 to-transparent rounded-bl-[30px]" />
              <div className="w-[46px] h-[46px] bg-[#FFF8E6] border border-[#D4AF78]/30 rounded-[14px] flex items-center justify-center text-[22px]">{p.emoji}</div>
              <div className="flex items-baseline gap-1.5 mt-3">
                <p className="font-extrabold text-[14px] text-black tracking-tight">{p.title}</p>
                <span className="font-arabic text-[#B9975B] text-[12px]">{p.arabic}</span>
              </div>
              <p className="text-[11px] text-gray-500 leading-snug">{p.desc}</p>
              <span className={`inline-flex items-center gap-1 mt-3 px-2 py-1 rounded-full text-[9px] font-extrabold ${p.id === 'sos' ? 'bg-red-600 text-white' : 'bg-[#0F2439] text-[#D4AF78]'}`}>● {p.id === 'sos' ? 'ALWAYS ON' : 'LIVE'}</span>
            </button>
          ))}
        </div>

        <div className="mt-5 bg-gradient-to-r from-[#D4AF78] to-[#F5D9A8] rounded-[24px] p-5 flex items-center justify-between shadow-[0_12px_30px_rgba(212,175,120,0.3)]">
          <div><p className="text-black font-extrabold text-[16px]">Waqf — ₦100 Daily</p><p className="text-black/60 text-[12px]">Small daily, big Jannah reward.</p></div>
          <button onClick={() => go('waqf')} className="bg-black text-[#D4AF78] font-bold text-[12px] px-4 py-2.5 rounded-full shrink-0">Give →</button>
        </div>

        <div className="mt-5 bg-[#0B1A29] border border-[#D4AF78]/20 rounded-[26px] p-6 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF78] to-transparent" />
          <p className="text-[#D4AF78] text-[10px] font-bold tracking-[0.3em]">AYAH OF THE DAY</p>
          <p className="font-arabic text-white text-[24px] leading-[1.9] mt-3">وَقُل رَّبِّ زِدْنِي عِلْمًا</p>
          <p className="text-white/60 text-[13px] font-serif-lux italic">"And say: My Lord, increase me in knowledge."</p>
          <p className="text-[#D4AF78]/60 text-[10px] tracking-widest font-bold mt-2">— SURAH TAHA 20:114</p>
        </div>
      </div>

      <FloatingNav page={page} go={go} />
    </div>
  );
              }
