import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { notifyAll } from '../lib/notify';

export default function SuhbaPage({ onBack }: { onBack: () => void }) {
  const [track, setTrack] = useState('Revert Anchor');
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [gender, setGender] = useState('Brother');
  const [need, setNeed] = useState('');
  const [circles, setCircles] = useState<any[]>([]);
  const load = async () => { const { data } = await supabase.from('suhba_requests').select('*').order('created_at', { ascending: false }); setCircles(data || []); };
  useEffect(() => { load(); }, []);
  const join = async () => {
    if (!name || !city) return alert('Please enter your name and city.');
    const { error } = await supabase.from('suhba_requests').insert([{ track, name, city, gender, need_text: need }]);
    if (error) return alert(error.message);
    await notifyAll('suhba', `New SUHBA: ${track} - ${name} in ${city}`, need.slice(0, 80) || 'Someone wants a circle.', 'suhba');
    alert('Welcome to Suhba. We go match you with your Circle / Anchor / Guardian soon. You no dey alone again.'); setName(''); setNeed(''); load();
  };
  const inputStyle: React.CSSProperties = { width: '100%', marginTop: 6, background: '#F7F3EC', border: '1px solid #E8DDC8', borderRadius: 14, padding: '12px 14px', fontSize: 14, outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit' };
  const labelStyle: React.CSSProperties = { display: 'block', fontSize: 11, fontWeight: 700, color: '#9ca3af', marginTop: 12 };
  return (
    <div style={{ minHeight: '100vh', background: '#0F2439', maxWidth: 430, margin: '0 auto', paddingBottom: 110, boxSizing: 'border-box' }}>
      <div style={{ padding: '16px 16px 0', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={onBack} style={{ width: 40, height: 40, background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', color: '#fff', fontSize: 18 }}>←</button>
        <div><h1 style={{ color: '#fff', fontWeight: 800, margin: 0 }}>SUHBA</h1><p style={{ color: '#D4AF78', fontSize: 11, fontWeight: 700, margin: 0 }}>MY CIRCLE • NO ONE DISAPPEARS SILENTLY</p></div>
      </div>
      <div style={{ margin: '16px 16px 0', background: '#fff', borderRadius: 20, padding: 12 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6 }}>{['Revert Anchor', 'Lonely Circle', 'Elder Guardian'].map(t => <button key={t} onClick={() => setTrack(t)} style={{ padding: '12px 4px', borderRadius: 14, border: 'none', fontSize: 11, fontWeight: 700, cursor: 'pointer', background: track === t ? '#000' : '#f3f4f6', color: track === t ? '#fff' : '#4b5563' }}>{t}</button>)}</div>
        <p style={{ fontSize: 11, color: '#6b7280', lineHeight: 1.5, padding: '8px 4px 0' }}>{track === 'Revert Anchor' ? '1 new Muslim + 1 Anchor (same gender, same city) for 1 year. Weekly check. Must invite for Eid / Ramadan.' : track === 'Lonely Circle' ? 'Circle of 5 (same city, gender, age) meet weekly - coffee, walk, pray.' : '1 elder wey dey live alone + 1 young Guardian. Call 2x/week. If elder no pick 2 days, alert masjid.'}</p>
      </div>
      <div style={{ margin: '12px 16px 0', background: '#fff', borderRadius: 22, padding: 16 }}>
        <p style={{ fontWeight: 800, fontSize: 16, margin: 0 }}>Join {track}</p>
        <label style={labelStyle}>YOUR NAME</label><input value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Chidinma" style={inputStyle} />
        <label style={labelStyle}>CITY</label><input value={city} onChange={e => setCity(e.target.value)} placeholder="e.g. Enugu" style={inputStyle} />
        <label style={labelStyle}>GENDER</label><div style={{ display: 'flex', gap: 8, marginTop: 8 }}>{['Brother', 'Sister'].map(g => <button key={g} onClick={() => setGender(g)} style={{ flex: 1, padding: 12, borderRadius: 999, border: 'none', fontWeight: 700, background: gender === g ? '#000' : '#f3f4f6', color: gender === g ? '#fff' : '#374151' }}>{g}</button>)}</div>
        <label style={labelStyle}>WHAT DO YOU NEED?</label><textarea value={need} onChange={e => setNeed(e.target.value)} placeholder="e.g. I just took Shahada, I need someone to teach me..." style={{ ...inputStyle, minHeight: 80 }} />
        <button onClick={join} style={{ width: '100%', marginTop: 16, background: '#0F2439', color: '#fff', fontWeight: 800, padding: 14, borderRadius: 999, border: 'none' }}>Join My Circle →</button>
      </div>
      <p style={{ color: '#fff', fontWeight: 700, padding: '0 20px', marginTop: 16 }}>People Waiting For Circle ({circles.length})</p>
      {circles.map((c: any) => (
        <div key={c.id} style={{ margin: '12px 16px 0', background: '#fff', borderRadius: 18, padding: 16 }}>
          <p style={{ fontWeight: 800, margin: 0 }}>{c.name} • {c.city} • {c.track}</p>
          <p style={{ fontSize: 12, color: '#6b7280', marginTop: 4 }}>{c.need_text}</p>
          <span style={{ fontSize: 11, fontWeight: 700, color: '#047857', background: '#ECFDF5', padding: '4px 8px', borderRadius: 999 }}>🟢 Waiting for match</span>
        </div>
      ))}
    </div>
  );
                                                     }
