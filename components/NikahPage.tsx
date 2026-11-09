import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { notifyAll } from '../lib/notify';

export default function NikahPage({ onBack }: { onBack: () => void }) {
  const [gender, setGender] = useState('Brother');
  const [age, setAge] = useState('');
  const [city, setCity] = useState('');
  const [about, setAbout] = useState('');
  const [wali, setWali] = useState('');
  const [waliContact, setWaliContact] = useState('');
  const [lookingFor, setLookingFor] = useState('Practising Muslim');
  const [profiles, setProfiles] = useState<any[]>([]);
  const [interested, setInterested] = useState<string[]>([]);

  const load = async () => {
    const { data } = await supabase.from('nikah_profiles').select('*').order('created_at', { ascending: false });
    setProfiles(data || []);
  };
  useEffect(() => { load(); }, []);

  const post = async () => {
    if (!age || !wali) return alert('A Wali is compulsory for Nikah.');
    const { error } = await supabase.from('nikah_profiles').insert([{ gender, age: parseInt(age), city, about: `${about} | Looking for: ${lookingFor}`, wali_name: wali, wali_contact: waliContact }]);
    if (error) return alert(error.message);
    await notifyAll('nikah', `New Nikah Profile — ${gender}, ${age}, ${city}`, 'A new halal profile has been posted. A Wali has confirmed it.', 'nikah');
    alert('Your profile has been posted with your Wali. May Allah bless your search.');
    load();
  };

  const inputStyle: React.CSSProperties = { width: '100%', marginTop: 8, background: '#F7F3EC', border: '1px solid #E8DDC8', borderRadius: 16, padding: '14px 16px', fontSize: 14, outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit' };
  const labelStyle: React.CSSProperties = { display: 'block', fontSize: 11, fontWeight: 700, color: '#9ca3af', marginTop: 12, letterSpacing: 0.5 };

  return (
    <div style={{ minHeight: '100vh', background: '#0F2439', width: '100%', maxWidth: 430, margin: '0 auto', paddingBottom: 120, overflowX: 'hidden', boxSizing: 'border-box' }}>
      <div style={{ padding: '16px 20px 0', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={onBack} style={{ width: 40, height: 40, flexShrink: 0, background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', color: '#fff', fontSize: 18, cursor: 'pointer' }}>←</button>
        <div><h1 style={{ color: '#fff', fontWeight: 800, fontSize: 18, margin: 0 }}>NIKAH</h1><p style={{ color: '#D4AF78', fontSize: 11, fontWeight: 700, margin: 0, marginTop: 2 }}>MARRIAGE WITH A WALI • NO FITNAH</p></div>
      </div>

      <div style={{ margin: '16px 16px 0', background: '#FDF2F8', borderRadius: 24, padding: 16 }}>
        <p style={{ fontWeight: 800, fontSize: 13, margin: 0 }}>How Nikah Works Here</p>
        <p style={{ fontSize: 12, color: '#4b5563', marginTop: 4, marginBottom: 0, lineHeight: 1.6 }}>1. Create profile with your Wali. 2. Someone shows interest. 3. We connect them to your Wali, not to you directly. 4. Families talk. No private chatting.</p>
      </div>

      <div style={{ margin: '12px 16px 0', background: '#fff', borderRadius: 24, padding: 20 }}>
        <p style={{ fontWeight: 800, fontSize: 16, margin: 0 }}>Create A Halal Profile</p>
        <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
          {['Brother', 'Sister'].map(g => (<button key={g} onClick={() => setGender(g)} style={{ flex: 1, padding: '12px', borderRadius: 999, border: 'none', fontWeight: 700, fontSize: 14, cursor: 'pointer', background: gender === g ? '#000' : '#f3f4f6', color: gender === g ? '#fff' : '#374151' }}>{g}</button>))}
        </div>
        <label style={labelStyle}>AGE</label>
        <input value={age} onChange={e => setAge(e.target.value)} placeholder="e.g. 27" style={inputStyle} />
        <label style={labelStyle}>CITY</label>
        <input value={city} onChange={e => setCity(e.target.value)} placeholder="Lagos" style={inputStyle} />
        <label style={labelStyle}>WHAT ARE YOU LOOKING FOR?</label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 8 }}>
          {['Practising Muslim', 'Student of Knowledge', 'Working Professional', 'Ready Now', 'Ready Within 1 Year'].map(l => (<button key={l} onClick={() => setLookingFor(l)} style={{ padding: '8px 12px', borderRadius: 999, border: 'none', fontSize: 12, fontWeight: 700, cursor: 'pointer', background: lookingFor === l ? '#000' : '#f3f4f6', color: lookingFor === l ? '#fff' : '#374151' }}>{l}</button>))}
        </div>
        <label style={labelStyle}>ABOUT YOU (HALAL ONLY)</label>
        <textarea value={about} onChange={e => setAbout(e.target.value)} placeholder="I am... I pray... I work as..." style={{ ...inputStyle, minHeight: 90 }} />
        <label style={{ ...labelStyle, color: '#EF4444' }}>WALI NAME — COMPULSORY</label>
        <input value={wali} onChange={e => setWali(e.target.value)} placeholder="e.g. My Father — Alhaji Musa" style={inputStyle} />
        <label style={labelStyle}>WALI CONTACT</label>
        <input value={waliContact} onChange={e => setWaliContact(e.target.value)} placeholder="Wali WhatsApp" style={inputStyle} />
        <button onClick={post} style={{ width: '100%', marginTop: 16, background: '#D4AF78', color: '#000', fontWeight: 800, padding: '16px', borderRadius: 999, border: 'none', fontSize: 14, cursor: 'pointer' }}>POST PROFILE →</button>
      </div>

      {profiles.map(p => (
        <div key={p.id} style={{ margin: '12px 16px 0', background: '#fff', borderRadius: 20, padding: 16 }}>
          <p style={{ fontWeight: 800, fontSize: 15, margin: 0 }}>{p.gender} • {p.age} • {p.city}</p>
          <p style={{ fontSize: 13, marginTop: 4, marginBottom: 0, lineHeight: 1.6 }}>{p.about}</p>
          <p style={{ fontSize: 11, color: '#047857', fontWeight: 700, marginTop: 8, marginBottom: 0 }}>✓ Verified Wali: {p.wali_name}</p>
          <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
            <button onClick={() => setInterested(prev => prev.includes(p.id) ? prev.filter(id => id !== p.id) : [...prev, p.id])} style={{ flex: 1, padding: '12px', borderRadius: 999, border: 'none', fontSize: 13, fontWeight: 700, cursor: 'pointer', background: interested.includes(p.id) ? '#059669' : '#000', color: '#fff' }}>{interested.includes(p.id) ? '✓ Interest Sent To Wali' : 'Show Interest Via Wali →'}</button>
            <button style={{ padding: '12px 16px', background: '#f3f4f6', border: 'none', borderRadius: 999, fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>Report</button>
          </div>
        </div>
      ))}
    </div>
  );
                 }
