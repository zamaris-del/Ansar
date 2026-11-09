import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { notifyAll } from '../lib/notify';
import { openWhatsApp, IMAM_WHATSAPP, IMAM_NAME, IMAM_LABEL } from '../lib/whatsapp';

export default function SOSPage({ onBack }: { onBack: () => void }) {
  const [category, setCategory] = useState('Stranded / No Food / No Shelter');
  const [what, setWhat] = useState('');
  const [where, setWhere] = useState('');
  const [safeToCall, setSafeToCall] = useState('Yes - Safe to call');
  const [contact, setContact] = useState('');
  const [gender, setGender] = useState('Brother');
  const [sent, setSent] = useState(false);

  const sendSOS = async () => {
    if (!what || !where) return alert('Please tell us what happened and where you are. We need this to reach you.');
    const { error } = await supabase.from('sos_alerts').insert([{ category, description: what, location_text: where, safe_to_call: safeToCall, contact, gender, status: 'ACTIVE' }]);
    if (error) return alert(error.message);

    await notifyAll('sos', `SOS: ${category} in ${where}`, `${what.slice(0, 80)} - Safe to call: ${safeToCall}`, 'sos');

    // WhatsApp to Imam immediately
    const msg = `SOS FROM ANSAR\n\nCategory: ${category}\nLocation: ${where}\nDetails: ${what}\nSafe to call: ${safeToCall}\nGender: ${gender}\nContact: ${contact || 'Not provided'}`;
    openWhatsApp(IMAM_WHATSAPP, msg);
    setSent(true);
  };

  const inputStyle: React.CSSProperties = { width: '100%', marginTop: 6, background: '#F7F3EC', border: '1px solid #E8DDC8', borderRadius: 14, padding: '12px 14px', fontSize: 14, outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit' };
  const labelStyle: React.CSSProperties = { display: 'block', fontSize: 11, fontWeight: 700, color: '#9ca3af', marginTop: 12, letterSpacing: 0.5 };
  const chip = (active: boolean): React.CSSProperties => ({ padding: '8px 12px', borderRadius: 999, border: 'none', fontSize: 12, fontWeight: 700, cursor: 'pointer', background: active ? '#DC2626' : '#f3f4f6', color: active ? '#fff' : '#374151' });

  if (sent) return (
    <div style={{ minHeight: '100vh', background: '#0F2439', maxWidth: 430, margin: '0 auto', padding: 20, textAlign: 'center', boxSizing: 'border-box' }}>
      <p style={{ fontSize: 60, marginTop: 60 }}>🚨</p>
      <p style={{ color: '#fff', fontWeight: 800, fontSize: 20 }}>Help Is On The Way.</p>
      <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14, lineHeight: 1.6 }}>We have alerted the Imam and verified volunteers. WhatsApp has opened so you can continue the conversation directly. Stay safe.</p>
      <button onClick={() => openWhatsApp(IMAM_WHATSAPP, 'Assalamu Alaikum, I just sent an SOS from ANSAR. Please help me.')} style={{ width: '100%', marginTop: 20, background: '#25D366', color: '#fff', border: 'none', padding: 14, borderRadius: 999, fontWeight: 800 }}>Open WhatsApp Again →</button>
      <button onClick={onBack} style={{ width: '100%', marginTop: 10, background: '#fff', padding: 14, borderRadius: 999, border: 'none', fontWeight: 800 }}>Back To Home →</button>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: '#0F2439', maxWidth: 430, margin: '0 auto', paddingBottom: 110, boxSizing: 'border-box' }}>
      <div style={{ padding: '24px 20px 0', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={onBack} style={{ width: 40, height: 40, background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', color: '#fff', fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>←</button>
        <div><h1 style={{ color: '#fff', fontWeight: 800, margin: 0, lineHeight: 1.2 }}>SOS - I NEED HELP NOW</h1><p style={{ color: '#FCA5A5', fontSize: 11, fontWeight: 700, margin: 0, marginTop: 3 }}>WE WILL REACH YOU AS SOON AS POSSIBLE</p></div>
      </div>

      <div style={{ margin: '16px 16px 0', background: '#fff', borderRadius: 18, padding: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
        <div><p style={{ fontWeight: 800, fontSize: 14, margin: 0 }}>Talk To Support On WhatsApp</p><p style={{ fontSize: 12, color: '#6b7280', marginTop: 4 }}>{IMAM_NAME}</p><p style={{ fontSize: 11, color: '#047857', fontWeight: 700, marginTop: 2 }}>● {IMAM_LABEL}</p></div>
        <button onClick={() => openWhatsApp(IMAM_WHATSAPP, 'Assalamu Alaikum, I need help from ANSAR.')} style={{ background: '#25D366', color: '#fff', border: 'none', padding: '10px 14px', borderRadius: 999, fontWeight: 700, fontSize: 12, whiteSpace: 'nowrap', cursor: 'pointer' }}>WhatsApp →</button>
      </div>

      <div style={{ margin: '12px 16px 0', background: '#FEF2F2', borderRadius: 18, padding: 14 }}><p style={{ fontSize: 13, fontWeight: 700, margin: 0 }}>Private And Safe</p><p style={{ fontSize: 12, color: '#6b7280', lineHeight: 1.6, marginTop: 4 }}>Your location is shared only with verified responders. It is automatically deleted after 24 hours. You can type, you do not need to talk.</p></div>

      <div style={{ margin: '12px 16px 0', background: '#fff', borderRadius: 22, padding: 16 }}>
        <p style={{ fontWeight: 800, margin: 0 }}>What Happened?</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 10 }}>{['Domestic Violence', 'Suicide Thought', 'Thrown Out Of House', 'Stranded / No Food / No Shelter', 'Medical Emergency'].map(c => <button key={c} onClick={() => setCategory(c)} style={chip(category === c)}>{c}</button>)}</div>
        <label style={labelStyle}>TELL US - TYPE IT, YOU DO NOT NEED TO TALK</label>
        <textarea value={what} onChange={e => setWhat(e.target.value)} placeholder="e.g. I am stranded in Lagos, I have no food and no place to sleep tonight..." style={{ ...inputStyle, minHeight: 90 }} />
        <label style={labelStyle}>WHERE ARE YOU? (AREA / LANDMARK)</label>
        <input value={where} onChange={e => setWhere(e.target.value)} placeholder="e.g. Ikeja, near Central Mosque" style={inputStyle} />
        <label style={labelStyle}>IS IT SAFE TO CALL YOU?</label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 8 }}>{['Yes - Safe to call', 'No - WhatsApp / Text Only', 'No - Do not contact, just send help'].map(s => <button key={s} onClick={() => setSafeToCall(s)} style={{ padding: '8px 10px', borderRadius: 999, border: 'none', fontSize: 11, fontWeight: 700, cursor: 'pointer', background: safeToCall === s ? '#000' : '#f3f4f6', color: safeToCall === s ? '#fff' : '#374151' }}>{s}</button>)}</div>
        <label style={labelStyle}>YOUR GENDER (SO WE SEND A SAME-GENDER VOLUNTEER)</label>
        <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>{['Brother', 'Sister'].map(g => <button key={g} onClick={() => setGender(g)} style={{ flex: 1, padding: 12, borderRadius: 999, border: 'none', fontWeight: 700, cursor: 'pointer', background: gender === g ? '#000' : '#f3f4f6', color: gender === g ? '#fff' : '#374151' }}>{g}</button>)}</div>
        <label style={labelStyle}>YOUR CONTACT (WHATSAPP / PHONE)</label>
        <input value={contact} onChange={e => setContact(e.target.value)} placeholder="0704..." style={inputStyle} />
        <button onClick={sendSOS} style={{ width: '100%', marginTop: 16, background: '#DC2626', color: '#fff', fontWeight: 800, padding: 16, borderRadius: 999, border: 'none', fontSize: 15, cursor: 'pointer' }}>SEND SOS NOW →</button>
        <p style={{ fontSize: 11, color: '#9ca3af', textAlign: 'center', marginTop: 10 }}>This will save your SOS and open WhatsApp to support immediately.</p>
      </div>
    </div>
  );
      }
