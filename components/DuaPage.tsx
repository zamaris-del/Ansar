import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { notifyAll } from '../lib/notify';

export default function DuaPage({ onBack }: { onBack: () => void }) {
  const [tab, setTab] = useState<'dua' | 'janazah'>('dua');
  const [text, setText] = useState('');
  const [name, setName] = useState('');
  const [dName, setDName] = useState('');
  const [city, setCity] = useState('');
  const [time, setTime] = useState('');
  const [masjid, setMasjid] = useState('');
  const [duas, setDuas] = useState<any[]>([]);
  const [ameens, setAmeens] = useState<Record<string, number>>({});

  const load = async () => {
    const { data } = await supabase.from('duas').select('*').order('created_at', { ascending: false }).limit(20);
    setDuas(data || []);
  };
  useEffect(() => { load(); }, []);

  const postDua = async () => {
    if (!text.trim()) return alert('Please write your dua first.');
    const { error } = await supabase.from('duas').insert([{ content: text, name: name || 'Anonymous' }]);
    if (error) return alert(error.message);
    await notifyAll('dua', `New Dua Request from ${name || 'Anonymous'}`, text.slice(0, 80), 'dua');
    alert('Your dua has been posted. The Ummah will pray for you.');
    setText(''); load();
  };

  const postJanazah = async () => {
    if (!dName) return alert('Please enter the name of the deceased.');
    const { error } = await supabase.from('janazah_alerts').insert([{ name: dName, city, janazah_time: time, masjid }]);
    if (error) return alert(error.message);
    await notifyAll('janazah', `Janazah Alert: ${dName} in ${city}`, `Janazah at ${time} in ${masjid}. Please attend and pray.`, 'dua');
    alert('Janazah alert has been posted. May Allah forgive them.');
    setDName(''); load();
  };

  const inputStyle: React.CSSProperties = { width: '100%', marginTop: 6, background: '#F7F3EC', border: '1px solid #E8DDC8', borderRadius: 14, padding: '12px 14px', fontSize: 14, outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit' };
  const labelStyle: React.CSSProperties = { display: 'block', fontSize: 11, fontWeight: 700, color: '#9ca3af', marginTop: 12, letterSpacing: 0.5 };

  return (
    <div style={{ minHeight: '100vh', background: '#0F2439', width: '100%', maxWidth: 430, margin: '0 auto', paddingBottom: 110, overflowX: 'hidden', boxSizing: 'border-box' }}>
      <div style={{ padding: '16px 16px 0', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={onBack} style={{ width: 40, height: 40, flexShrink: 0, background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', color: '#fff', fontSize: 18, cursor: 'pointer' }}>←</button>
        <div><h1 style={{ color: '#fff', fontWeight: 800, fontSize: 18, margin: 0 }}>DUA & GRIEF</h1><p style={{ color: '#D4AF78', fontSize: 10, fontWeight: 700, margin: 0, marginTop: 2 }}>THE UMMAH WILL SAY AMEEN FOR YOU</p></div>
      </div>

      <div style={{ margin: '16px 16px 0', background: '#D4AF78', borderRadius: 22, padding: 16 }}>
        <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: 2, color: 'rgba(0,0,0,0.6)', margin: 0 }}>DUA OF THE DAY</p>
        <p style={{ fontWeight: 700, fontSize: 14, lineHeight: 1.65, marginTop: 6, color: '#000', marginBottom: 0 }}>"O Allah, ease my affairs and do not leave me to myself even for the blink of an eye."</p>
        <p style={{ fontSize: 11, color: 'rgba(0,0,0,0.6)', marginTop: 8, marginBottom: 0 }}>Say Ameen and share it with someone who needs it.</p>
      </div>

      <div style={{ margin: '16px 16px 0', background: 'rgba(255,255,255,0.1)', borderRadius: 999, padding: 4, display: 'flex' }}>
        <button onClick={() => setTab('dua')} style={{ flex: 1, padding: '12px', borderRadius: 999, border: 'none', fontSize: 13, fontWeight: 700, cursor: 'pointer', background: tab === 'dua' ? '#fff' : 'transparent', color: tab === 'dua' ? '#000' : '#fff' }}>Make Dua For Me</button>
        <button onClick={() => setTab('janazah')} style={{ flex: 1, padding: '12px', borderRadius: 999, border: 'none', fontSize: 13, fontWeight: 700, cursor: 'pointer', background: tab === 'janazah' ? '#fff' : 'transparent', color: tab === 'janazah' ? '#000' : '#fff' }}>Janazah Alert</button>
      </div>

      {tab === 'dua' ? (
        <>
          <div style={{ margin: '16px 16px 0', background: '#fff', borderRadius: 22, padding: 16 }}>
            <p style={{ fontWeight: 800, fontSize: 16, margin: 0 }}>Make Dua For Me</p>
            <p style={{ fontSize: 12, color: '#6b7280', lineHeight: 1.6, marginTop: 4, marginBottom: 0 }}>Write what you need. Hundreds of Muslims will say Ameen for you.</p>
            <textarea value={text} onChange={e => setText(e.target.value)} placeholder="e.g. Please make dua that Allah eases my affairs, grants me a good job, and blesses my family..." style={{ width: '100%', marginTop: 12, background: '#F7F3EC', border: '1px solid #E8DDC8', borderRadius: 14, padding: 14, minHeight: 110, outline: 'none', fontSize: 14, lineHeight: 1.6, boxSizing: 'border-box', fontFamily: 'inherit' }} />
            <input value={name} onChange={e => setName(e.target.value)} placeholder="Your name (or leave as Anonymous)" style={inputStyle} />
            <button onClick={postDua} style={{ width: '100%', marginTop: 12, background: '#0F2439', color: '#fff', fontWeight: 800, padding: '14px', borderRadius: 999, border: 'none', fontSize: 14, cursor: 'pointer' }}>Post Dua →</button>
          </div>
          {duas.length === 0 && <div style={{ margin: '12px 16px 0', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 18, padding: 20, textAlign: 'center' }}><p style={{ fontSize: 28, margin: 0 }}>🤲</p><p style={{ color: '#fff', fontWeight: 700, fontSize: 14, marginTop: 8, marginBottom: 0 }}>No dua requests yet</p><p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, marginTop: 4, marginBottom: 0 }}>Be the first. The Ummah is waiting to pray for you.</p></div>}
          {duas.map(d => (
            <div key={d.id} style={{ margin: '12px 16px 0', background: '#fff', borderRadius: 18, padding: 16 }}>
              <p style={{ fontSize: 14, lineHeight: 1.65, color: '#1f2937', margin: 0 }}>{d.content}</p>
              <p style={{ fontSize: 11, color: '#9ca3af', marginTop: 8, marginBottom: 0 }}>— {d.name}</p>
              <div style={{ display: 'flex', gap: 8, marginTop: 12, paddingTop: 12, borderTop: '1px solid #f3f4f6' }}>
                <button onClick={() => setAmeens(prev => ({ ...prev, [d.id]: (prev[d.id] || 0) + 1 }))} style={{ flex: 1, background: '#059669', color: '#fff', padding: '10px', borderRadius: 999, border: 'none', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>🤲 Ameen • {ameens[d.id] || 0}</button>
                <button onClick={() => navigator.clipboard.writeText(d.content)} style={{ padding: '10px 16px', background: '#f3f4f6', border: 'none', borderRadius: 999, fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>Share</button>
              </div>
            </div>
          ))}
        </>
      ) : (
        <div style={{ margin: '16px 16px 0', background: '#fff', borderRadius: 22, padding: 16 }}>
          <p style={{ fontWeight: 800, fontSize: 16, margin: 0 }}>Post Janazah Alert</p>
          <p style={{ fontSize: 12, color: '#6b7280', lineHeight: 1.6, marginTop: 4, marginBottom: 0 }}>Let the Ummah know so they can attend, pray, and support the family.</p>
          <label style={{ ...labelStyle, marginTop: 16 }}>NAME OF THE DECEASED</label>
          <input value={dName} onChange={e => setDName(e.target.value)} placeholder="e.g. Brother Ahmed" style={inputStyle} />
          <label style={labelStyle}>CITY</label>
          <input value={city} onChange={e => setCity(e.target.value)} placeholder="e.g. Lagos" style={inputStyle} />
          <label style={labelStyle}>JANAZAH TIME</label>
          <input value={time} onChange={e => setTime(e.target.value)} placeholder="e.g. 4pm Today" style={inputStyle} />
          <label style={labelStyle}>MASJID</label>
          <input value={masjid} onChange={e => setMasjid(e.target.value)} placeholder="e.g. Central Mosque" style={inputStyle} />
          <button onClick={postJanazah} style={{ width: '100%', marginTop: 16, background: '#000', color: '#fff', fontWeight: 800, padding: '14px', borderRadius: 999, border: 'none', fontSize: 14, cursor: 'pointer' }}>Post Alert → Notify Everyone</button>
          <div style={{ background: '#f9fafb', borderRadius: 14, padding: 14, marginTop: 16 }}>
            <p style={{ fontSize: 12, fontWeight: 700, margin: 0 }}>What To Do When Someone Passes?</p>
            <p style={{ fontSize: 12, color: '#6b7280', lineHeight: 1.6, marginTop: 4, marginBottom: 0 }}>1. Make dua for them. 2. Attend Janazah if you can. 3. Support the family with food and kindness. 4. Give Sadaqah Jariyah on their behalf.</p>
          </div>
        </div>
      )}
    </div>
  );
    }
