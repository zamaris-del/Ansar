import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { notifyAll } from '../lib/notify';

export default function SOSPage({ onBack }: { onBack: () => void }) {
  const [category, setCategory] = useState('Stranded / No food / No shelter');
  const [what, setWhat] = useState('');
  const [where, setWhere] = useState('');
  const [safeToCall, setSafeToCall] = useState('Yes - Safe to call');
  const [contact, setContact] = useState('');
  const [gender, setGender] = useState('Brother');
  const [sent, setSent] = useState(false);

  const sendSOS = async () => {
    if (!what || !where) return alert('Please tell us what happened and where you dey. We need am to reach you.');
    const { error } = await supabase.from('sos_alerts').insert([{ category, description: what, location_text: where, safe_to_call: safeToCall, contact, gender, status: 'ACTIVE' }]);
    if (error) return alert(error.message);
    await notifyAll('sos', `🚨 SOS: ${category} in ${where}`, `${what.slice(0, 80)} - Safe to call: ${safeToCall}`, 'sos');
    setSent(true);
  };

  const inputStyle: React.CSSProperties = { width: '100%', marginTop: 6, background: '#F7F3EC', border: '1px solid #E8DDC8', borderRadius: 14, padding: '12px 14px', fontSize: 14, outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit' };
  const labelStyle: React.CSSProperties = { display: 'block', fontSize: 11, fontWeight: 700, color: '#9ca3af', marginTop: 12, letterSpacing: 0.5 };
  const chip = (active: boolean): React.CSSProperties => ({ padding: '8px 12px', borderRadius: 999, border: 'none', fontSize: 12, fontWeight: 700, cursor: 'pointer', background: active ? '#DC2626' : '#f3f4f6', color: active ? '#fff' : '#374151' });

  if (sent) return (
    <div style={{ minHeight: '100vh', background: '#0F2439', maxWidth: 430, margin: '0 auto', padding: 20, textAlign: 'center', boxSizing: 'border-box' }}>
      <p style={{ fontSize: 60, marginTop: 60 }}>🚨</p>
      <p style={{ color: '#fff', fontWeight: 800, fontSize: 20 }}>Help Is Coming.</p>
      <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14, lineHeight: 1.6 }}>We don alert nearest Imam + 3 verified volunteers (same gender). Dem go reach you soon. Stay safe. Make dua.</p>
      <div style={{ background: '#fff', borderRadius: 18, padding: 16, marginTop: 20, textAlign: 'left' }}><p style={{ fontWeight: 800, fontSize: 13 }}>While you wait:</p><p style={{ fontSize: 13, lineHeight: 1.6, color: '#4b5563' }}>1. Go near masjid / public place if you fit.<br />2. Keep your phone on.<br />3. If danger increase, call police / emergency number for your city.</p></div>
      <button onClick={onBack} style={{ width: '100%', marginTop: 20, background: '#fff', padding: 14, borderRadius: 999, border: 'none', fontWeight: 800 }}>Back To Home →</button>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: '#0F2439', maxWidth: 430, margin: '0 auto', paddingBottom: 110, boxSizing: 'border-box' }}>
      <div style={{ padding: '16px 16px 0', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={onBack} style={{ width: 40, height: 40, background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', color: '#fff', fontSize: 18 }}>←</button>
        <div><h1 style={{ color: '#fff', fontWeight: 800, margin: 0 }}>SOS - I NEED HELP NOW</h1><p style={{ color: '#FCA5A5', fontSize: 11, fontWeight: 700, margin: 0 }}>WE GO REACH YOU BEFORE MORNING</p></div>
      </div>
      <div style={{ margin: '16px 16px 0', background: '#FEF2F2', borderRadius: 18, padding: 14 }}><p style={{ fontSize: 13, fontWeight: 700, margin: 0 }}>🔒 Private & Safe</p><p style={{ fontSize: 12, color: '#6b7280', lineHeight: 1.6, marginTop: 4 }}>Your location only goes to verified responders. Auto-delete after 24 hours. You fit type, no need talk.</p></div>
      <div style={{ margin: '12px 16px 0', background: '#fff', borderRadius: 22, padding: 16 }}>
        <p style={{ fontWeight: 800, margin: 0 }}>What Happened?</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 10 }}>{['Domestic Violence', 'Suicide Thought', 'Thrown Out Of House', 'Stranded / No food / No shelter', 'Medical Emergency'].map(c => <button key={c} onClick={() => setCategory(c)} style={chip(category === c)}>{c}</button>)}</div>
        <label style={labelStyle}>TELL US - TYPE AM, NO NEED TALK</label>
        <textarea value={what} onChange={e => setWhat(e.target.value)} placeholder="e.g. I dey stranded for Lagos, no food, no place to sleep tonight..." style={{ ...inputStyle, minHeight: 90 }} />
        <label style={labelStyle}>WHERE YOU DEY? (Area / Landmark)</label>
        <input value={where} onChange={e => setWhere(e.target.value)} placeholder="e.g. Ikeja, near Central Mosque" style={inputStyle} />
        <label style={labelStyle}>SAFE TO CALL YOU?</label>
        <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>{['Yes - Safe to call', 'No - Only WhatsApp / Text', 'No - Don\'t contact, just send help'].map(s => <button key={s} onClick={() => setSafeToCall(s)} style={{ padding: '8px 10px', borderRadius: 999, border: 'none', fontSize: 11, fontWeight: 700, cursor: 'pointer', background: safeToCall === s ? '#000' : '#f3f4f6', color: safeToCall === s ? '#fff' : '#374151' }}>{s}</button>)}</div>
        <label style={labelStyle}>YOUR GENDER (So we send same gender volunteer)</label>
        <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>{['Brother', 'Sister'].map(g => <button key={g} onClick={() => setGender(g)} style={{ flex: 1, padding: 12, borderRadius: 999, border: 'none', fontWeight: 700, background: gender === g ? '#000' : '#f3f4f6', color: gender === g ? '#fff' : '#374151' }}>{g}</button>)}</div>
        <label style={labelStyle}>YOUR CONTACT (WhatsApp / Phone)</label>
        <input value={contact} onChange={e => setContact(e.target.value)} placeholder="080..." style={inputStyle} />
        <button onClick={sendSOS} style={{ width: '100%', marginTop: 16, background: '#DC2626', color: '#fff', fontWeight: 800, padding: 16, borderRadius: 999, border: 'none', fontSize: 15 }}>🚨 SEND SOS NOW →</button>
        <p style={{ fontSize: 11, color: '#9ca3af', textAlign: 'center', marginTop: 10 }}>Nearest Imam + 3 verified volunteers go be alerted immediately.</p>
      </div>
    </div>
  );
}
