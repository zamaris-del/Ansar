import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { notifyAll } from '../lib/notify';

export default function WaqfPage({ onBack }: { onBack: () => void }) {
  const [amount, setAmount] = useState(100);
  const [name, setName] = useState('');
  const [cause, setCause] = useState('SOS Fund');
  const [recurring, setRecurring] = useState(false);

  const give = async () => {
    const { error } = await supabase.from('waqf_donations').insert([{ amount, donor_name: name || 'Anonymous', cause }]);
    if (error) return alert(error.message);
    await notifyAll('waqf', `${name || 'Someone'} gave ₦${amount} to ${cause}${recurring ? ' (Daily)' : ''}`, 'JazakAllah Khair! A small amount daily, a great reward in Jannah.', 'waqf');
    alert(`JazakAllah Khair! ₦${amount} to ${cause}${recurring ? ' — Daily recurring activated.' : '.'} May Allah reward you.`);
  };

  const leaders = [{ name: 'Aisha B.', amount: '₦48,200', badge: '🥇' }, { name: 'Musa K.', amount: '₦32,500', badge: '🥈' }, { name: 'Fatima A.', amount: '₦27,000', badge: '🥉' }];

  return (
    <div style={{ minHeight: '100vh', background: '#0F2439', width: '100%', maxWidth: 430, margin: '0 auto', paddingBottom: 120, overflowX: 'hidden', boxSizing: 'border-box' }}>
      <div style={{ padding: '16px 20px 0', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={onBack} style={{ width: 40, height: 40, flexShrink: 0, background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', color: '#fff', fontSize: 18, cursor: 'pointer' }}>←</button>
        <div><h1 style={{ color: '#fff', fontWeight: 800, fontSize: 18, margin: 0 }}>WAQF</h1><p style={{ color: '#D4AF78', fontSize: 11, fontWeight: 700, margin: 0, marginTop: 2 }}>₦100 DAILY SADAQAH</p></div>
      </div>

      <div style={{ margin: '16px 16px 0', background: '#fff', borderRadius: 24, padding: 20, textAlign: 'center' }}>
        <p style={{ fontWeight: 800, fontSize: 22, margin: 0 }}>₦1,248,500 Raised</p>
        <p style={{ fontSize: 12, color: '#6b7280', marginTop: 4, marginBottom: 0 }}>From 2,418 Muslims • Goal ₦5,000,000</p>
        <div style={{ height: 12, background: '#f3f4f6', borderRadius: 999, marginTop: 12, overflow: 'hidden' }}><div style={{ height: 12, background: '#D4AF78', borderRadius: 999, width: '25%' }} /></div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginTop: 16, textAlign: 'left' }}>
          <div style={{ background: '#f9fafb', borderRadius: 12, padding: 12 }}><p style={{ fontSize: 10, color: '#6b7280', fontWeight: 700, margin: 0 }}>SOS FUND</p><p style={{ fontWeight: 800, fontSize: 13, marginTop: 2, marginBottom: 0 }}>₦620k</p></div>
          <div style={{ background: '#f9fafb', borderRadius: 12, padding: 12 }}><p style={{ fontSize: 10, color: '#6b7280', fontWeight: 700, margin: 0 }}>ORPHANS</p><p style={{ fontWeight: 800, fontSize: 13, marginTop: 2, marginBottom: 0 }}>₦380k</p></div>
          <div style={{ background: '#f9fafb', borderRadius: 12, padding: 12 }}><p style={{ fontSize: 10, color: '#6b7280', fontWeight: 700, margin: 0 }}>EDUCATION</p><p style={{ fontWeight: 800, fontSize: 13, marginTop: 2, marginBottom: 0 }}>₦248k</p></div>
        </div>
        <p style={{ fontSize: 11, color: '#9ca3af', marginTop: 12, marginBottom: 0 }}>100% transparent. See exactly where your money goes.</p>
      </div>

      <div style={{ margin: '12px 16px 0', background: '#fff', borderRadius: 24, padding: 20 }}>
        <p style={{ fontWeight: 800, fontSize: 15, margin: 0 }}>Top Givers This Month 🏆</p>
        {leaders.map((l, idx) => (<div key={l.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: idx === leaders.length - 1 ? 'none' : '1px solid #f3f4f6' }}><p style={{ fontSize: 13, fontWeight: 700, margin: 0 }}>{l.badge} {l.name}</p><p style={{ fontWeight: 800, fontSize: 13, margin: 0 }}>{l.amount}</p></div>))}
      </div>

      <div style={{ margin: '12px 16px 0', background: '#fff', borderRadius: 24, padding: 20 }}>
        <p style={{ fontWeight: 800, fontSize: 15, margin: 0 }}>Choose A Cause</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 12 }}>{['SOS Fund', 'Orphans', 'Masjid Building', 'Education'].map(c => (<button key={c} onClick={() => setCause(c)} style={{ padding: '8px 12px', borderRadius: 999, border: 'none', fontSize: 12, fontWeight: 700, cursor: 'pointer', background: cause === c ? '#000' : '#f3f4f6', color: cause === c ? '#fff' : '#374151' }}>{c}</button>))}</div>

        <p style={{ fontWeight: 800, fontSize: 15, marginTop: 20, marginBottom: 0 }}>Choose An Amount</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 8, marginTop: 12 }}>{[100, 500, 1000, 5000].map(a => (<button key={a} onClick={() => setAmount(a)} style={{ padding: '12px 4px', borderRadius: 16, border: 'none', fontWeight: 800, fontSize: 14, cursor: 'pointer', background: amount === a ? '#D4AF78' : '#f3f4f6', color: '#000' }}>₦{a}</button>))}</div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#FFF6E0', borderRadius: 16, padding: 16, marginTop: 16, gap: 12 }}>
          <div><p style={{ fontWeight: 700, fontSize: 13, margin: 0 }}>Make It Daily? 🔁</p><p style={{ fontSize: 11, color: '#6b7280', marginTop: 2, marginBottom: 0 }}>Give ₦{amount} every day automatically.</p></div>
          <button onClick={() => setRecurring(!recurring)} style={{ width: 48, height: 28, borderRadius: 999, padding: 4, border: 'none', cursor: 'pointer', background: recurring ? '#10B981' : '#d1d5db', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: recurring ? 'flex-end' : 'flex-start' }}><div style={{ width: 20, height: 20, background: '#fff', borderRadius: '50%' }} /></button>
        </div>

        <input value={name} onChange={e => setName(e.target.value)} placeholder="Your name (or Anonymous)" style={{ width: '100%', marginTop: 16, background: '#F7F3EC', border: '1px solid #E8DDC8', borderRadius: 16, padding: '14px 16px', fontSize: 14, outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit' }} />
        <button onClick={give} style={{ width: '100%', marginTop: 16, background: '#D4AF78', color: '#000', fontWeight: 800, padding: '16px', borderRadius: 999, border: 'none', fontSize: 14, cursor: 'pointer' }}>GIVE ₦{amount} TO {cause.toUpperCase()} {recurring ? 'DAILY →' : '→'}</button>
        <p style={{ fontSize: 11, color: '#9ca3af', textAlign: 'center', marginTop: 12, marginBottom: 0 }}>Even ₦100 a day becomes Sadaqah Jariyah that never stops.</p>
      </div>
    </div>
  );
      }
