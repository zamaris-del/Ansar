import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { notifyAll } from '../../lib/notify';
import { openWhatsApp, IMAM_WHATSAPP, IMAM_NAME, IMAM_LABEL } from '../lib/whatsapp';

export default function MasjidPulsePage({ onBack }: { onBack: () => void }) {
  const [masjid, setMasjid] = useState('');
  const [city, setCity] = useState('');
  const [status, setStatus] = useState('Active');
  const [update, setUpdate] = useState('');
  const [pulses, setPulses] = useState<any[]>([]);

  const load = async () => { const { data } = await supabase.from('masjid_pulse').select('*').order('created_at', { ascending: false }); setPulses(data || []); };
  useEffect(() => { load(); }, []);

  const post = async () => {
    if (!masjid) return alert('Please enter the masjid name.');
    const { error } = await supabase.from('masjid_pulse').insert([{ masjid_name: masjid, city, status, update_text: update }]);
    if (error) return alert(error.message);
    await notifyAll('general', `Masjid Update: ${masjid} in ${city}`, `${status} — ${update.slice(0, 80)}`, 'pulse');
    alert('Your masjid update has been posted.');
    setMasjid(''); setUpdate(''); load();
  };

  const inputStyle: React.CSSProperties = { width: '100%', marginTop: 6, background: '#F7F3EC', border: '1px solid #E8DDC8', borderRadius: 14, padding: '12px 14px', fontSize: 14, outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit' };
  const labelStyle: React.CSSProperties = { display: 'block', fontSize: 11, fontWeight: 700, color: '#9ca3af', marginTop: 12, letterSpacing: 0.5 };
  const prayerTimes = [{ name: 'Fajr', time: '5:15 AM' }, { name: 'Dhuhr', time: '1:30 PM' }, { name: 'Asr', time: '4:15 PM' }, { name: 'Maghrib', time: '6:45 PM' }, { name: 'Isha', time: '8:00 PM' }];

  return (
    <div style={{ minHeight: '100vh', background: '#0F2439', width: '100%', maxWidth: 430, margin: '0 auto', paddingBottom: 110, overflowX: 'hidden', boxSizing: 'border-box' }}>
      <div style={{ padding: '24px 20px 0', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={onBack} style={{ width: 40, height: 40, flexShrink: 0, background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', color: '#fff', fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>←</button>
        <div><h1 style={{ color: '#fff', fontWeight: 800, fontSize: 18, margin: 0, lineHeight: 1.2 }}>MASJID PULSE</h1><p style={{ color: '#D4AF78', fontSize: 10, fontWeight: 700, margin: 0, marginTop: 3 }}>IS YOUR MASJID ACTIVE? LET US KEEP IT ALIVE</p></div>
      </div>

      <div style={{ margin: '16px 16px 0', background: '#fff', borderRadius: 18, padding: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
        <div><p style={{ fontWeight: 800, fontSize: 14, margin: 0 }}>Talk To Support On WhatsApp</p><p style={{ fontSize: 12, color: '#6b7280', marginTop: 4 }}>{IMAM_NAME}</p><p style={{ fontSize: 11, color: '#047857', fontWeight: 700, marginTop: 2 }}>● {IMAM_LABEL}</p></div>
        <button onClick={() => openWhatsApp(IMAM_WHATSAPP, 'Assalamu Alaikum, I have a question about my masjid on ANSAR.')} style={{ background: '#25D366', color: '#fff', border: 'none', padding: '10px 14px', borderRadius: 999, fontWeight: 700, fontSize: 12, whiteSpace: 'nowrap', cursor: 'pointer' }}>WhatsApp →</button>
      </div>

      <div style={{ margin: '12px 16px 0', background: '#fff', borderRadius: 22, padding: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><p style={{ fontWeight: 800, fontSize: 14, margin: 0 }}>Today&apos;s Prayer Times</p><span style={{ fontSize: 11, color: '#047857', fontWeight: 700 }}>● Lagos</span></div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8, marginTop: 12 }}>
          {prayerTimes.map(p => (<div key={p.name} style={{ textAlign: 'center', background: '#F7F3EC', borderRadius: 12, padding: '10px 4px' }}><p style={{ fontSize: 10, fontWeight: 700, color: '#6b7280', margin: 0 }}>{p.name}</p><p style={{ fontSize: 11, fontWeight: 800, marginTop: 2, marginBottom: 0 }}>{p.time}</p></div>))}
        </div>
        <p style={{ fontSize: 11, color: '#9ca3af', marginTop: 12, lineHeight: 1.5, marginBottom: 0 }}>Times are for Lagos. Your city times will be added soon. Next: Maghrib • Jumuah: 1:30 PM</p>
      </div>

      <div style={{ margin: '12px 16px 0', background: '#fff', borderRadius: 22, padding: 16 }}>
        <p style={{ fontWeight: 800, fontSize: 16, margin: 0 }}>Update Your Masjid</p>
        <p style={{ fontSize: 12, color: '#6b7280', lineHeight: 1.6, marginTop: 4, marginBottom: 0 }}>Share news, needs, or events so the community can help.</p>
        <label style={labelStyle}>MASJID NAME</label><input value={masjid} onChange={e => setMasjid(e.target.value)} placeholder="e.g. Central Mosque" style={inputStyle} />
        <label style={labelStyle}>CITY</label><input value={city} onChange={e => setCity(e.target.value)} placeholder="e.g. Lagos" style={inputStyle} />
        <label style={labelStyle}>STATUS</label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 8 }}>{['Active', 'Needs Help', 'Building', 'Jumuah Only'].map(s => (<button key={s} onClick={() => setStatus(s)} style={{ padding: '8px 12px', borderRadius: 999, border: 'none', fontSize: 12, fontWeight: 700, cursor: 'pointer', background: status === s ? '#000' : '#f3f4f6', color: status === s ? '#fff' : '#374151' }}>{s}</button>))}</div>
        <label style={labelStyle}>UPDATE / WHAT DOES YOUR MASJID NEED?</label><textarea value={update} onChange={e => setUpdate(e.target.value)} placeholder="e.g. We need Qurans, a fan for the sisters section, and volunteers for cleaning..." style={{ ...inputStyle, minHeight: 90 }} />
        <button onClick={post} style={{ width: '100%', marginTop: 16, background: '#0F2439', color: '#fff', fontWeight: 800, padding: '14px', borderRadius: 999, border: 'none', fontSize: 14, cursor: 'pointer' }}>Post Update →</button>
      </div>

      <p style={{ padding: '0 20px', marginTop: 16, color: '#fff', fontWeight: 700, fontSize: 14, marginBottom: 0 }}>Masjid Updates {pulses.length > 0 && `(${pulses.length})`}</p>
      {pulses.length === 0 && <div style={{ margin: '12px 16px 0', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 18, padding: 20, textAlign: 'center' }}><p style={{ fontSize: 28, margin: 0 }}>🕌</p><p style={{ color: '#fff', fontWeight: 700, fontSize: 14, marginTop: 8, marginBottom: 0 }}>No masjid updates yet</p><p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, marginTop: 4, marginBottom: 0 }}>Be the first to update your masjid.</p></div>}
      {pulses.map(p => (
        <div key={p.id} style={{ margin: '12px 16px 0', background: '#fff', borderRadius: 18, padding: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}><p style={{ fontWeight: 800, fontSize: 14, lineHeight: 1.3, margin: 0 }}>{p.masjid_name} • {p.city}</p><span style={{ fontSize: 10, fontWeight: 700, background: '#ECFDF5', color: '#047857', padding: '4px 8px', borderRadius: 999, flexShrink: 0 }}>{p.status}</span></div>
          <p style={{ fontSize: 13, lineHeight: 1.6, color: '#4b5563', marginTop: 8, marginBottom: 0 }}>{p.update_text}</p>
          <button onClick={() => openWhatsApp(IMAM_WHATSAPP, `Assalamu Alaikum, I want to help this masjid on ANSAR: ${p.masjid_name} in ${p.city} - ${p.update_text}`)} style={{ marginTop: 12, background: '#D4AF78', color: '#000', padding: '8px 16px', borderRadius: 999, border: 'none', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>Help This Masjid →</button>
        </div>
      ))}
    </div>
  );
}
