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
    <div style={{ minHeight: '100vh', background: '#0F2439', width: '100%', maxWidth: 430, margin: '0 auto', paddingBottom: 130, overflowX: 'hidden', boxSizing: 'border-box' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 16px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 40, height: 40, background: '#D4AF78', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 19 }}>A</div>
          <div><div style={{ color: '#fff', fontWeight: 800, letterSpacing: 2, fontSize: 14 }}>ANSAR</div><div style={{ color: 'rgba(255,255,255,0.4)', fontSize: 9, letterSpacing: 1, marginTop: 2 }}>NO MUSLIM LEFT ALONE</div></div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => setShowNotif(!showNotif)} style={{ width: 40, height: 40, background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', fontSize: 16, cursor: 'pointer', position: 'relative' }}>🔔{notifs.length > 0 && <span style={{ position: 'absolute', top: 8, right: 9, width: 8, height: 8, background: '#DC2626', borderRadius: '50%' }} />}</button>
          <button onClick={() => setPage('waqf')} style={{ background: '#D4AF78', border: 'none', borderRadius: 999, padding: '10px 14px', fontWeight: 700, fontSize: 12, cursor: 'pointer' }}>Give</button>
        </div>
      </div>

      {showNotif && <div style={{ margin: '16px 16px 0', background: '#fff', borderRadius: 20, padding: 16 }}><div style={{ fontWeight: 800 }}>Notifications</div>{notifs.length === 0 ? <div style={{ color: '#6b7280', fontSize: 13, marginTop: 8 }}>No notifications yet.</div> : notifs.map(n => (<div key={n.id} style={{ borderBottom: '1px solid #eee', padding: '10px 0' }}><div style={{ fontWeight: 700, fontSize: 13 }}>{n.title}</div><div style={{ fontSize: 12, color: '#6b7280' }}>{n.message}</div></div>))}</div>}

      {/* SOS - ALWAYS VISIBLE, ALWAYS RED */}
      <button onClick={() => setPage('sos')} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, width: 'calc(100% - 32px)', margin: '16px 16px 0', background: '#DC2626', color: '#fff', border: 'none', padding: 16, borderRadius: 18, fontWeight: 800, fontSize: 15, cursor: 'pointer', boxShadow: '0 8px 20px rgba(220,38,38,0.4)' }}>
        🚨 I NEED HELP NOW — SOS
      </button>

      <div style={{ padding: '24px 20px 0' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', padding: '6px 12px', borderRadius: 999 }}><span style={{ width: 8, height: 8, background: '#34d399', borderRadius: '50%' }} /><span style={{ color: '#D4AF78', fontSize: 10, fontWeight: 700, letterSpacing: 1 }}>A COMMUNITY FOR EVERY MUSLIM</span></div>
        <h1 style={{ color: '#fff', fontSize: 42, lineHeight: 1.05, fontWeight: 900, margin: '20px 0 0', fontFamily: 'Georgia, serif' }}>Find Your<br /><span style={{ color: '#D4AF78' }}>Ummah.</span><br />Find Your<br />Home.</h1>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14, lineHeight: 1.7, marginTop: 12 }}>From questions to marriage, from work to help — one family, one app.</p>
        <button onClick={() => setPage('sual')} style={{ width: '100%', marginTop: 22, background: '#D4AF78', border: 'none', padding: 16, borderRadius: 999, fontWeight: 800, fontSize: 14, cursor: 'pointer' }}>Enter ANSAR — It Is Free →</button>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 11, textAlign: 'center', marginTop: 8 }}>SOS button above is always here — even if you never login.</p>
      </div>

      <div style={{ padding: '24px 16px 0' }}>
        <div style={{ color: '#fff', fontWeight: 700, fontSize: 16, paddingLeft: 4 }}>What do you need today?</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 12 }}>
          {pillars.map(p => (
            <button key={p.id} onClick={() => setPage(p.id)} style={{ background: p.id === 'sos' ? '#FEF2F2' : '#fff', border: p.id === 'sos' ? '2px solid #DC2626' : 'none', borderRadius: 20, padding: 16, textAlign: 'left', cursor: 'pointer' }}>
              <div style={{ width: 44, height: 44, background: p.id === 'sos' ? '#FEE2E2' : '#FFF6E0', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>{p.icon}</div>
              <div style={{ fontWeight: 800, fontSize: 15, marginTop: 12, color: p.id === 'sos' ? '#DC2626' : '#000' }}>{p.title}</div>
              <div style={{ fontSize: 12, color: '#6b7280', lineHeight: 1.5, marginTop: 4 }}>{p.desc}</div>
            </button>
          ))}
        </div>
        <div style={{ background: '#D4AF78', borderRadius: 20, padding: 20, marginTop: 16 }}>
          <div style={{ fontWeight: 800, fontSize: 16 }}>Waqf — Give In Your Currency</div>
          <div style={{ fontSize: 12, color: 'rgba(0,0,0,0.6)', marginTop: 4 }}>Choose Naira, Dollars, Pounds, or any currency you use.</div>
          <button onClick={() => setPage('waqf')} style={{ marginTop: 12, background: '#000', color: '#fff', border: 'none', padding: '10px 16px', borderRadius: 999, fontWeight: 700, fontSize: 12, cursor: 'pointer' }}>Give Sadaqah →</button>
        </div>
      </div>

      <div style={{ position: 'fixed', bottom: 16, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: 430, padding: '0 16px', boxSizing: 'border-box', zIndex: 50 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', background: '#1B2E42', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 999, padding: 6 }}>
          {[{ id: 'home', label: 'Home', icon: '🏠' }, { id: 'sual', label: "SU'AL", icon: '❓' }, { id: 'sos', label: 'SOS', icon: '🚨' }, { id: 'kasb', label: 'KASB', icon: '💼' }, { id: 'dua', label: 'DUA', icon: '🤲' }, { id: 'waqf', label: 'WAQF', icon: '💧' }].map(n => (
            <button key={n.id} onClick={() => setPage(n.id)} style={{ display: 'flex', alignItems: 'center', gap: 4, border: 'none', borderRadius: 999, padding: '10px 10px', background: (page === n.id || (n.id === 'home' && page === 'home')) ? '#fff' : n.id === 'sos' ? '#DC2626' : 'transparent', color: page === n.id || n.id === 'home' && page === 'home' ? '#000' : n.id === 'sos' ? '#fff' : 'rgba(255,255,255,0.6)', fontWeight: 700, fontSize: 11, cursor: 'pointer' }}><span>{n.icon}</span>{(page === n.id || (n.id === 'home' && page === 'home')) && <span>{n.label}</span>}</button>
          ))}
        </div>
      </div>
    </div>
  );
                                                                                                                                                                                                                                                                                                                                                                                                                                                               }
