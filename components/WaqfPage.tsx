import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { notifyAll } from '../lib/notify';

export default function WaqfPage({ onBack }: { onBack: () => void }) {
  const [name, setName] = useState('');
  const [cause, setCause] = useState('SOS Fund');
  const [recurring, setRecurring] = useState(false);
  const [frequency, setFrequency] = useState('Daily');

  const give = async () => {
    const { error } = await supabase.from('waqf_donations').insert([{ donor_name: name || 'Anonymous', cause, recurring, frequency }]);
    if (error) return alert(error.message);
    await notifyAll('waqf', `${name || 'Someone'} gave to ${cause}${recurring ? ` (${frequency})` : ''}`, 'JazakAllah Khair! A small amount consistently given is a great reward in Jannah.', 'waqf');
    alert(`JazakAllah Khair! Your gift to ${cause}${recurring ? ` — ${frequency} giving activated.` : '.'} May Allah reward you.`);
  };

  const givers = [{ name: 'Aisha B.', badge: '🥇' }, { name: 'Musa K.', badge: '🥈' }, { name: 'Fatima A.', badge: '🥉' }];

  return (
    <div style={{ minHeight: '100vh', background: '#0F2439', width: '100%', maxWidth: 430, margin: '0 auto', paddingBottom: 120, overflowX: 'hidden', boxSizing: 'border-box' }}>
      <div style={{ padding: '24px 20px 0', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={onBack} style={{ width: 40, height: 40, flexShrink: 0, background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', color: '#fff', fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>←</button>
        <div style={{ minWidth: 0 }}>
          <h1 style={{ color: '#fff', fontWeight: 800, fontSize: 18, margin: 0, lineHeight: 1.2 }}>WAQF</h1>
          <p style={{ color: '#D4AF78', fontSize: 11, fontWeight: 700, margin: 0, marginTop: 3, lineHeight: 1.3 }}>DAILY SADAQAH</p>
        </div>
      </div>

      <div style={{ margin: '16px 16px 0', background: '#fff', borderRadius: 24, padding: 20, textAlign: 'center' }}>
        <p style={{ fontWeight: 800, fontSize: 20, margin: 0 }}>Give Consistently. Give Sincerely.</p>
        <p style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.6, marginTop: 8, marginBottom: 0 }}>Support the causes that matter to the Ummah. Every gift, large or small, counts as Sadaqah Jariyah.</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginTop: 16, textAlign: 'left' }}>
          <div style={{ background: '#f9fafb', borderRadius: 12, padding: 12 }}><p style={{ fontSize: 10, color: '#6b7280', fontWeight: 700, margin: 0 }}>SOS FUND</p><p style={{ fontWeight: 800, fontSize: 13, marginTop: 4, marginBottom: 0 }}>Urgent Help</p></div>
          <div style={{ background: '#f9fafb', borderRadius: 12, padding: 12 }}><p style={{ fontSize: 10, color: '#6b7280', fontWeight: 700, margin: 0 }}>ORPHANS</p><p style={{ fontWeight: 800, fontSize: 13, marginTop: 4, marginBottom: 0 }}>Care & Support</p></div>
          <div style={{ background: '#f9fafb', borderRadius: 12, padding: 12 }}><p style={{ fontSize: 10, color: '#6b7280', fontWeight: 700, margin: 0 }}>EDUCATION</p><p style={{ fontWeight: 800, fontSize: 13, marginTop: 4, marginBottom: 0 }}>Knowledge</p></div>
        </div>
        <p style={{ fontSize: 11, color: '#9ca3af', marginTop: 12, marginBottom: 0 }}>100% transparent. See exactly where your giving goes.</p>
      </div>

      <div style={{ margin: '12px 16px 0', background: '#fff', borderRadius: 24, padding: 20 }}>
        <p style={{ fontWeight: 800, fontSize: 15, margin: 0 }}>Top Givers This Month 🏆</p>
        {givers.map((l, idx) => (<div key={l.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: idx === givers.length - 1 ? 'none' : '1px solid #f3f4f6' }}><p style={{ fontSize: 13, fontWeight: 700, margin: 0 }}>{l.badge} {l.name}</p><p style={{ fontSize: 12, color: '#6b7280', margin: 0 }}>Consistent Giver</p></div>))}
      </div>

      <div style={{ margin: '12px 16px 0', background: '#fff', borderRadius: 24, padding: 20 }}>
        <p style={{ fontWeight: 800, fontSize: 15, margin: 0 }}>Choose A Cause</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 12 }}>{['SOS Fund', 'Orphans', 'Masjid Building', 'Education'].map(c => (<button key={c} onClick={() => setCause(c)} style={{ padding: '8px 12px', borderRadius: 999, border: 'none', fontSize: 12, fontWeight: 700, cursor: 'pointer', background: cause === c ? '#000' : '#f3f4f6', color: cause === c ? '#fff' : '#374151' }}>{c}</button>))}</div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#FFF6E0', borderRadius: 16, padding: 16, marginTop: 16, gap: 12 }}>
          <div><p style={{ fontWeight: 700, fontSize: 13, margin: 0 }}>Make It Recurring? 🔁</p><p style={{ fontSize: 11, color: '#6b7280', marginTop: 2, marginBottom: 0 }}>Give consistently, automatically.</p></div>
          <button onClick={() => setRecurring(!recurring)} style={{ width: 48, height: 28, borderRadius: 999, padding: 4, border: 'none', cursor: 'pointer', background: recurring ? '#10B981' : '#d1d5db', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: recurring ? 'flex-end' : 'flex-start' }}><div style={{ width: 20, height: 20, background: '#fff', borderRadius: '50%' }} /></button>
        </div>

        {recurring && (
          <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
            {['Daily', 'Weekly', 'Monthly'].map(f => (
              <button key={f} onClick={() => setFrequency(f)} style={{ flex: 1, padding: '10px 4px', borderRadius: 12, border: 'none', fontSize: 12, fontWeight: 700, cursor: 'pointer', background: frequency === f ? '#D4AF78' : '#f3f4f6', color: '#000' }}>{f}</button>
            ))}
          </div>
        )}

        <input value={name} onChange={e => setName(e.target.value)} placeholder="Your name (or Anonymous)" style={{ width: '100%', marginTop: 16, background: '#F7F3EC', border: '1px solid #E8DDC8', borderRadius: 16, padding: '14px 16px', fontSize: 14, outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit' }} />
        <button onClick={give} style={{ width: '100%', marginTop: 16, background: '#D4AF78', color: '#000', fontWeight: 800, padding: '16px', borderRadius: 999, border: 'none', fontSize: 14, cursor: 'pointer' }}>GIVE TO {cause.toUpperCase()} {recurring ? `${frequency.toUpperCase()} →` : '→'}</button>
        <p style={{ fontSize: 11, color: '#9ca3af', textAlign: 'center', marginTop: 12, marginBottom: 0 }}>Consistent giving becomes Sadaqah Jariyah that never stops.</p>
      </div>
    </div>
  );
          }
