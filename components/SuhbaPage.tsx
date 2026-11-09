import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { notifyAll } from '../lib/notify';

export default function SuhbaPage({ onBack }: { onBack: () => void }) {
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [focus, setFocus] = useState('Quran Study');
  const [contact, setContact] = useState('');
  const [circles, setCircles] = useState<any[]>([]);
  const [filter, setFilter] = useState('All');
  const [joined, setJoined] = useState<string[]>([]);

  const load = async () => {
    const { data } = await supabase.from('suhba_circles').select('*').order('created_at', { ascending: false });
    setCircles(data || []);
  };
  useEffect(() => { load(); }, []);

  const post = async () => {
    if (!name || !city) return alert('Please enter the circle name and city.');
    const { error } = await supabase.from('suhba_circles').insert([{ name, city, focus, contact }]);
    if (error) return alert(error.message);
    await notifyAll('general', `New Circle in ${city}: ${name}`, `Focus: ${focus}. Join your righteous companions.`, 'suhba');
    alert('Your circle has been created.');
    setName(''); load();
  };

  const inputStyle: React.CSSProperties = { width: '100%', marginTop: 8, background: '#F7F3EC', border: '1px solid #E8DDC8', borderRadius: 16, padding: '14px 16px', fontSize: 14, outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit' };
  const labelStyle: React.CSSProperties = { display: 'block', fontSize: 11, fontWeight: 700, color: '#9ca3af', marginTop: 12, letterSpacing: 0.5 };
  const focuses = ['Quran Study', 'Fitness', 'Business', 'Sisters Only', 'Brothers Only', 'Youth'];
  const filters = ['All', 'Quran Study', 'Sisters Only', 'Brothers Only', 'Youth', 'Business'];
  const filtered = filter === 'All' ? circles : circles.filter(c => c.focus === filter);

  return (
    <div style={{ minHeight: '100vh', background: '#0F2439', width: '100%', maxWidth: 430, margin: '0 auto', paddingBottom: 120, overflowX: 'hidden', boxSizing: 'border-box' }}>
      <div style={{ padding: '16px 20px 0', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={onBack} style={{ width: 40, height: 40, flexShrink: 0, background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', color: '#fff', fontSize: 18, cursor: 'pointer' }}>←</button>
        <div><h1 style={{ color: '#fff', fontWeight: 800, fontSize: 17, margin: 0 }}>SUHBA — Your Circle</h1><p style={{ color: '#D4AF78', fontSize: 11, fontWeight: 700, margin: 0, marginTop: 2 }}>FIND RIGHTEOUS FRIENDS NEAR YOU</p></div>
      </div>

      <div style={{ margin: '16px 16px 0', background: '#fff', borderRadius: 24, padding: 20 }}>
        <p style={{ fontWeight: 800, fontSize: 16, margin: 0 }}>Create A Circle</p>
        <label style={labelStyle}>CIRCLE NAME</label>
        <input value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Lagos Quran Brothers" style={inputStyle} />
        <label style={labelStyle}>CITY</label>
        <input value={city} onChange={e => setCity(e.target.value)} placeholder="Lagos" style={inputStyle} />
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 12 }}>
          {focuses.map(f => (<button key={f} onClick={() => setFocus(f)} style={{ padding: '8px 12px', borderRadius: 999, border: 'none', fontSize: 12, fontWeight: 700, cursor: 'pointer', background: focus === f ? '#000' : '#f3f4f6', color: focus === f ? '#fff' : '#374151' }}>{f}</button>))}
        </div>
        <label style={labelStyle}>WHATSAPP GROUP LINK</label>
        <input value={contact} onChange={e => setContact(e.target.value)} placeholder="WhatsApp link or number" style={inputStyle} />
        <button onClick={post} style={{ width: '100%', marginTop: 16, background: '#0F2439', color: '#fff', fontWeight: 800, padding: '16px', borderRadius: 999, border: 'none', fontSize: 14, cursor: 'pointer' }}>CREATE CIRCLE →</button>
      </div>

      <div style={{ padding: '20px 20px 0', display: 'flex', gap: 8, overflowX: 'auto', scrollbarWidth: 'none' }}>
        {filters.map(f => (<button key={f} onClick={() => setFilter(f)} style={{ padding: '8px 16px', borderRadius: 999, border: 'none', fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap', cursor: 'pointer', flexShrink: 0, background: filter === f ? '#fff' : 'rgba(255,255,255,0.1)', color: filter === f ? '#000' : '#fff' }}>{f}</button>))}
      </div>

      {filtered.map(c => (
        <div key={c.id} style={{ margin: '12px 16px 0', background: '#fff', borderRadius: 20, padding: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
            <p style={{ fontWeight: 800, fontSize: 15, margin: 0 }}>{c.name}</p>
            <span style={{ fontSize: 11, background: '#ECFDF5', color: '#047857', padding: '4px 8px', borderRadius: 999, fontWeight: 700, flexShrink: 0 }}>● Active</span>
          </div>
          <p style={{ fontSize: 12, color: '#6b7280', marginTop: 4, marginBottom: 0 }}>{c.city} • {c.focus} • 12 Members</p>
          <button onClick={() => setJoined(prev => prev.includes(c.id) ? prev.filter(id => id !== c.id) : [...prev, c.id])} style={{ width: '100%', marginTop: 12, padding: '12px', borderRadius: 999, border: 'none', fontSize: 13, fontWeight: 700, cursor: 'pointer', background: joined.includes(c.id) ? '#059669' : '#000', color: '#fff' }}>{joined.includes(c.id) ? '✓ Joined — See You There' : 'Join Circle →'}</button>
        </div>
      ))}
    </div>
  );
  }
