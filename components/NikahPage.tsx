import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { notifyAll } from '../lib/notify';

export default function NikahPage({ onBack }: { onBack: () => void }) {
  const [gender, setGender] = useState('Brother');
  const [age, setAge] = useState('');
  const [city, setCity] = useState('');
  const [lookingFor, setLookingFor] = useState('Practising Muslim');
  const [waliName, setWaliName] = useState('');
  const [waliContact, setWaliContact] = useState('');
  const [about, setAbout] = useState('');
  const [profiles, setProfiles] = useState<any[]>([]);

  const load = async () => {
    const { data } = await supabase.from('nikah_profiles').select('*').order('created_at', { ascending: false });
    setProfiles(data || []);
  };
  useEffect(() => { load(); }, []);

  const createProfile = async () => {
    if (!age || !city || !waliContact) return alert('Please enter your age, city, and your Wali contact. A Wali is required.');
    const { error } = await supabase.from('nikah_profiles').insert([{ gender, age: parseInt(age), city, looking_for: lookingFor, wali_name: waliName, wali_contact: waliContact, about }]);
    if (error) return alert(error.message);
    await notifyAll('nikah', `New Nikah Profile: ${gender} in ${city}`, `Looking for: ${lookingFor}`, 'nikah');
    alert('Your profile has been created. We will connect interested families to your Wali, not directly to you.');
    setAge(''); setCity(''); setWaliName(''); setWaliContact(''); setAbout(''); load();
  };

  const inputStyle: React.CSSProperties = { width: '100%', marginTop: 6, background: '#F7F3EC', border: '1px solid #E8DDC8', borderRadius: 14, padding: '12px 14px', fontSize: 14, outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit' };
  const labelStyle: React.CSSProperties = { display: 'block', fontSize: 11, fontWeight: 700, color: '#9ca3af', marginTop: 14, letterSpacing: 0.5 };
  const chip = (active: boolean): React.CSSProperties => ({ padding: '8px 12px', borderRadius: 999, border: 'none', fontSize: 12, fontWeight: 700, cursor: 'pointer', background: active ? '#000' : '#f3f4f6', color: active ? '#fff' : '#374151' });

  return (
    <div style={{ minHeight: '100vh', background: '#0F2439', width: '100%', maxWidth: 430, margin: '0 auto', paddingBottom: 120, overflowX: 'hidden', boxSizing: 'border-box' }}>
      <div style={{ padding: '24px 20px 0', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={onBack} style={{ width: 40, height: 40, flexShrink: 0, background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', color: '#fff', fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>←</button>
        <div><h1 style={{ color: '#fff', fontWeight: 800, fontSize: 18, margin: 0, lineHeight: 1.2 }}>NIKAH</h1><p style={{ color: '#D4AF78', fontSize: 11, fontWeight: 700, margin: 0, marginTop: 3 }}>MARRIAGE WITH A WALI • NO FITNAH</p></div>
      </div>

      <div style={{ margin: '16px 16px 0', background: '#FDF2E9', borderRadius: 18, padding: 16 }}>
        <p style={{ fontWeight: 800, fontSize: 14, margin: 0 }}>How Nikah Works Here</p>
        <p style={{ fontSize: 13, color: '#4b5563', lineHeight: 1.6, marginTop: 6, marginBottom: 0 }}>1. Create a profile with your Wali. 2. Someone shows interest. 3. We connect them to your Wali, not directly to you. 4. Families talk. No private chatting.</p>
      </div>

      <div style={{ margin: '12px 16px 0', background: '#fff', borderRadius: 22, padding: 16 }}>
        <p style={{ fontWeight: 800, fontSize: 16, margin: 0 }}>Create A Halal Profile</p>
        <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>{['Brother', 'Sister'].map(g => (<button key={g} onClick={() => setGender(g)} style={{ flex: 1, padding: 12, borderRadius: 999, border: 'none', fontWeight: 700, fontSize: 14, cursor: 'pointer', background: gender === g ? '#000' : '#f3f4f6', color: gender === g ? '#fff' : '#374151' }}>{g}</button>))}</div>
        <label style={labelStyle}>AGE</label><input value={age} onChange={e => setAge(e.target.value)} placeholder="e.g. 27" inputMode="numeric" style={inputStyle} />
        <label style={labelStyle}>CITY</label><input value={city} onChange={e => setCity(e.target.value)} placeholder="e.g. Lagos" style={inputStyle} />
        <label style={labelStyle}>WHAT ARE YOU LOOKING FOR?</label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 8 }}>{['Practising Muslim', 'Student of Knowledge', 'Working Professional', 'Ready Now', 'Ready Within 1 Year'].map(o => (<button key={o} onClick={() => setLookingFor(o)} style={chip(lookingFor === o)}>{o}</button>))}</div>
        <label style={labelStyle}>WALI NAME</label><input value={waliName} onChange={e => setWaliName(e.target.value)} placeholder="e.g. Father / Uncle" style={inputStyle} />
        <label style={labelStyle}>WALI CONTACT (REQUIRED)</label><input value={waliContact} onChange={e => setWaliContact(e.target.value)} placeholder="Phone / WhatsApp" style={inputStyle} />
        <label style={labelStyle}>ABOUT YOU</label><textarea value={about} onChange={e => setAbout(e.target.value)} placeholder="Briefly describe yourself, your work, and your deen..." style={{ ...inputStyle, minHeight: 80 }} />
        <button onClick={createProfile} style={{ width: '100%', marginTop: 16, background: '#0F2439', color: '#fff', fontWeight: 800, padding: 14, borderRadius: 999, border: 'none', fontSize: 14, cursor: 'pointer' }}>Create Profile →</button>
      </div>

      <p style={{ color: '#fff', fontWeight: 700, padding: '0 20px', marginTop: 16 }}>Profiles ({profiles.length})</p>
      {profiles.map((p: any) => (
        <div key={p.id} style={{ margin: '12px 16px 0', background: '#fff', borderRadius: 18, padding: 16 }}>
          <p style={{ fontWeight: 800, margin: 0 }}>{p.gender} • Age {p.age} • {p.city}</p>
          <p style={{ fontSize: 13, color: '#6b7280', marginTop: 6 }}>Looking for: {p.looking_for}</p>
          {p.about && <p style={{ fontSize: 13, lineHeight: 1.6, color: '#4b5563' }}>{p.about}</p>}
          <p style={{ fontSize: 12, fontWeight: 700, color: '#047857', marginTop: 8 }}>Contact via Wali: {p.wali_name || 'Wali'} • {p.wali_contact}</p>
        </div>
      ))}
    </div>
  );
}
