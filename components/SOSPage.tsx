import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { notifyAll } from '../lib/notify';

type Mode = 'need' | 'help-individual' | 'help-organization' | 'imam';

export default function SOSPage({ onBack }: { onBack: () => void }) {
  const [mode, setMode] = useState<Mode>('need');
  const [requests, setRequests] = useState<any[]>([]);
  const [helpers, setHelpers] = useState<any[]>([]);
  const [filter, setFilter] = useState('All');
  const [helped, setHelped] = useState<string[]>([]);

  const [needType, setNeedType] = useState('Financial Help');
  const [urgency, setUrgency] = useState('High — Today');
  const [details, setDetails] = useState('');
  const [city, setCity] = useState('');
  const [contact, setContact] = useState('');

  const [helperName, setHelperName] = useState('');
  const [orgName, setOrgName] = useState('');
  const [masjidName, setMasjidName] = useState('');
  const [helpTypes, setHelpTypes] = useState('Financial Help');
  const [helperCity, setHelperCity] = useState('');
  const [helperContact, setHelperContact] = useState('');
  const [helperMessage, setHelperMessage] = useState('');

  const load = async () => {
    const { data } = await supabase.from('sos_requests').select('*').order('created_at', { ascending: false }).limit(30);
    setRequests(data || []);
  };
  useEffect(() => { load(); }, []);

  const postNeed = async () => {
    if (!details || !contact) return alert('Please describe your situation and add your contact.');
    const { error } = await supabase.from('sos_requests').insert([{
      need_type: needType,
      details: `[I NEED HELP] ${details} [Urgency: ${urgency}]`,
      city, contact
    }]);
    if (error) return alert(error.message);
    await notifyAll('sos', `SOS in ${city} — ${needType} (${urgency})`, details.slice(0, 100), 'sos');
    alert('Your SOS has been sent. Imams and volunteers will contact you.');
    setDetails(''); load();
  };

  const postHelper = async () => {
    const displayName = mode === 'help-organization' ? orgName : helperName;
    const label = mode === 'imam' ? 'IMAM / VOLUNTEER' : mode === 'help-organization' ? 'ORGANIZATION WANTS TO HELP' : 'INDIVIDUAL WANTS TO HELP';
    if (!displayName || !helperContact) return alert('Please enter your name and WhatsApp.');
    const { error } = await supabase.from('sos_requests').insert([{
      need_type: `WANTS TO HELP: ${helpTypes}`,
      details: `[${label}] ${displayName} ${mode === 'imam' ? `— Imam at ${masjidName}` : ''} can help with ${helpTypes} in ${helperCity}. ${helperMessage}`,
      city: helperCity,
      contact: helperContact
    }]);
    if (error) return alert(error.message);
    await notifyAll('sos', `${displayName} wants to help — ${helpTypes} in ${helperCity}`, helperMessage.slice(0, 80) || `Someone wants to help with ${helpTypes}`, 'sos');
    alert('JazakAllah Khair! You have been added as a helper. People in need will contact you.');
    setHelperMessage(''); load();
  };

  const inputStyle: React.CSSProperties = { width: '100%', marginTop: 6, background: '#F7F3EC', border: '1px solid #E8DDC8', borderRadius: 14, padding: '12px 14px', fontSize: 14, outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit' };
  const labelStyle: React.CSSProperties = { display: 'block', fontSize: 11, fontWeight: 700, color: '#9ca3af', marginTop: 16, letterSpacing: 0.5 };
  const chip = (active: boolean, activeBg = '#000'): React.CSSProperties => ({ padding: '8px 12px', borderRadius: 999, border: 'none', fontSize: 12, fontWeight: 700, cursor: 'pointer', background: active ? activeBg : '#f3f4f6', color: active ? '#fff' : '#374151' });

  const filtered = filter === 'All' ? requests : requests.filter(r => r.need_type === filter || r.need_type.includes(filter));
  const needTypes = ['Financial Help', 'Food', 'Accommodation', 'Medical', 'Counselling', 'Legal', 'Other'];
  const urgencies = ['High — Today', 'Medium — This Week', 'Low — Anytime'];

  return (
    <div style={{ minHeight: '100vh', background: '#0F2439', width: '100%', maxWidth: 430, margin: '0 auto', paddingBottom: 110, overflowX: 'hidden', boxSizing: 'border-box' }}>
      <div style={{ padding: '16px 16px 0', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={onBack} style={{ width: 40, height: 40, flexShrink: 0, background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', color: '#fff', fontSize: 18, cursor: 'pointer' }}>←</button>
        <div><h1 style={{ color: '#fff', fontWeight: 800, fontSize: 18, margin: 0 }}>SOS</h1><p style={{ color: '#D4AF78', fontSize: 10, fontWeight: 700, margin: 0, marginTop: 2 }}>IMAMS & VOLUNTEERS RESPOND QUICKLY</p></div>
      </div>

      <div style={{ margin: '16px 16px 0', background: '#fff', borderRadius: 22, padding: 16 }}>
        <p style={{ fontWeight: 800, fontSize: 13, margin: 0 }}>Emergency Contacts</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginTop: 12 }}>
          <a href="tel:112" style={{ background: '#FEF2F2', color: '#B91C1C', textAlign: 'center', padding: '12px 0', borderRadius: 14, textDecoration: 'none', display: 'block' }}><p style={{ fontSize: 18, margin: 0 }}>🚑</p><p style={{ fontSize: 10, fontWeight: 700, marginTop: 4, marginBottom: 0, lineHeight: 1.3 }}>Ambulance<br />112</p></a>
          <a href="tel:199" style={{ background: '#FFF7ED', color: '#9A3412', textAlign: 'center', padding: '12px 0', borderRadius: 14, textDecoration: 'none', display: 'block' }}><p style={{ fontSize: 18, margin: 0 }}>🚓</p><p style={{ fontSize: 10, fontWeight: 700, marginTop: 4, marginBottom: 0, lineHeight: 1.3 }}>Police<br />199</p></a>
          <a href="https://wa.me/2348000000000" style={{ background: '#ECFDF5', color: '#047857', textAlign: 'center', padding: '12px 0', borderRadius: 14, textDecoration: 'none', display: 'block' }}><p style={{ fontSize: 18, margin: 0 }}>🕌</p><p style={{ fontSize: 10, fontWeight: 700, marginTop: 4, marginBottom: 0, lineHeight: 1.3 }}>ANSAR Imam<br />WhatsApp</p></a>
        </div>
      </div>

      <div style={{ margin: '12px 16px 0', background: '#fff', borderRadius: 20, padding: 8 }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: '#9ca3af', padding: '4px 8px 8px', margin: 0 }}>WHO ARE YOU?</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
          <button onClick={() => setMode('need')} style={{ padding: '12px 8px', borderRadius: 14, border: 'none', fontSize: 12, fontWeight: 700, lineHeight: 1.3, cursor: 'pointer', background: mode === 'need' ? '#DC2626' : '#f3f4f6', color: mode === 'need' ? '#fff' : '#4b5563' }}>🚨<br />I Need<br />Help</button>
          <button onClick={() => setMode('help-individual')} style={{ padding: '12px 8px', borderRadius: 14, border: 'none', fontSize: 12, fontWeight: 700, lineHeight: 1.3, cursor: 'pointer', background: mode === 'help-individual' ? '#000' : '#f3f4f6', color: mode === 'help-individual' ? '#fff' : '#4b5563' }}>👤<br />I Want To Help<br />Individual</button>
          <button onClick={() => setMode('help-organization')} style={{ padding: '12px 8px', borderRadius: 14, border: 'none', fontSize: 12, fontWeight: 700, lineHeight: 1.3, cursor: 'pointer', background: mode === 'help-organization' ? '#000' : '#f3f4f6', color: mode === 'help-organization' ? '#fff' : '#4b5563' }}>🏢<br />I Want To Help<br />Organization</button>
          <button onClick={() => setMode('imam')} style={{ padding: '12px 8px', borderRadius: 14, border: 'none', fontSize: 12, fontWeight: 700, lineHeight: 1.3, cursor: 'pointer', background: mode === 'imam' ? '#059669' : '#f3f4f6', color: mode === 'imam' ? '#fff' : '#4b5563' }}>🕌<br />Imam /<br />Volunteer</button>
        </div>
        <p style={{ fontSize: 11, color: '#6b7280', padding: '8px 8px 4px', lineHeight: 1.5, margin: 0 }}>
          {mode === 'need' && 'You need urgent help. Be honest, your contact is only shared with verified helpers.'}
          {mode === 'help-individual' && 'You are one person who wants to help — with money, food, or time.'}
          {mode === 'help-organization' && 'You are a company, masjid, school or NGO that wants to help people in crisis.'}
          {mode === 'imam' && 'You are an Imam or trusted volunteer. People will reach out to you first.'}
        </p>
      </div>

      {mode === 'need' ? (
        <div style={{ margin: '12px 16px 0', background: '#fff', borderRadius: 22, padding: 16 }}>
          <p style={{ fontWeight: 800, fontSize: 16, margin: 0 }}>Request Help</p>
          <label style={labelStyle}>WHAT DO YOU NEED?</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 8 }}>{needTypes.map(t => (<button key={t} onClick={() => setNeedType(t)} style={chip(needType === t)}>{t}</button>))}</div>
          <label style={labelStyle}>HOW URGENT?</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 8 }}>{urgencies.map(u => (<button key={u} onClick={() => setUrgency(u)} style={{ ...chip(urgency === u, '#DC2626'), fontSize: 11 }}>{u}</button>))}</div>
          <label style={labelStyle}>DESCRIBE YOUR SITUATION</label>
          <textarea value={details} onChange={e => setDetails(e.target.value)} placeholder="Please explain what happened..." style={{ ...inputStyle, minHeight: 90 }} />
          <label style={labelStyle}>CITY</label>
          <input value={city} onChange={e => setCity(e.target.value)} placeholder="e.g. Lagos" style={inputStyle} />
          <label style={labelStyle}>CONTACT / WHATSAPP</label>
          <input value={contact} onChange={e => setContact(e.target.value)} placeholder="080..." style={inputStyle} />
          <button onClick={postNeed} style={{ width: '100%', marginTop: 16, background: '#DC2626', color: '#fff', fontWeight: 800, padding: '14px', borderRadius: 999, border: 'none', fontSize: 14, cursor: 'pointer' }}>Send SOS Alert →</button>
        </div>
      ) : (
        <div style={{ margin: '12px 16px 0', background: '#fff', borderRadius: 22, padding: 16 }}>
          <p style={{ fontWeight: 800, fontSize: 16, margin: 0 }}>{mode === 'imam' ? 'Register As Imam / Volunteer' : mode === 'help-organization' ? 'Offer Help — As Organization' : 'Offer Help — As Individual'}</p>
          <p style={{ fontSize: 12, color: '#6b7280', lineHeight: 1.6, marginTop: 4, marginBottom: 0 }}>JazakAllah Khair. Tell us how you can help so people in crisis can find you.</p>
          {mode === 'help-organization' ? (
            <>
              <label style={labelStyle}>ORGANIZATION NAME</label>
              <input value={orgName} onChange={e => setOrgName(e.target.value)} placeholder="e.g. Al-Noor Foundation" style={inputStyle} />
              <label style={labelStyle}>CONTACT PERSON NAME</label>
              <input value={helperName} onChange={e => setHelperName(e.target.value)} placeholder="e.g. Manager Musa" style={inputStyle} />
            </>
          ) : mode === 'imam' ? (
            <>
              <label style={labelStyle}>YOUR NAME — IMAM / VOLUNTEER</label>
              <input value={helperName} onChange={e => setHelperName(e.target.value)} placeholder="e.g. Imam Abdullahi" style={inputStyle} />
              <label style={labelStyle}>MASJID NAME</label>
              <input value={masjidName} onChange={e => setMasjidName(e.target.value)} placeholder="e.g. Central Mosque, Lagos" style={inputStyle} />
            </>
          ) : (
            <>
              <label style={labelStyle}>YOUR NAME</label>
              <input value={helperName} onChange={e => setHelperName(e.target.value)} placeholder="e.g. Musa Ibrahim" style={inputStyle} />
            </>
          )}
          <label style={labelStyle}>WHAT CAN YOU HELP WITH?</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 8 }}>{needTypes.map(t => (<button key={t} onClick={() => setHelpTypes(t)} style={chip(helpTypes === t)}>{t}</button>))}</div>
          <label style={labelStyle}>YOUR CITY</label>
          <input value={helperCity} onChange={e => setHelperCity(e.target.value)} placeholder="e.g. Lagos — where can you help?" style={inputStyle} />
          <label style={labelStyle}>YOUR MESSAGE</label>
          <textarea value={helperMessage} onChange={e => setHelperMessage(e.target.value)} placeholder={mode === 'imam' ? "e.g. I am available for counselling, Janazah, and family issues..." : "e.g. I can give food, or pay small bills, or give a ride..."} style={{ ...inputStyle, minHeight: 90 }} />
          <label style={labelStyle}>WHATSAPP / CONTACT</label>
          <input value={helperContact} onChange={e => setHelperContact(e.target.value)} placeholder="080..." style={inputStyle} />
          <button onClick={postHelper} style={{ width: '100%', marginTop: 16, fontWeight: 800, padding: '14px', borderRadius: 999, border: 'none', fontSize: 14, cursor: 'pointer', background: mode === 'imam' ? '#059669' : '#000', color: '#fff' }}>{mode === 'imam' ? 'Register As Imam / Volunteer →' : 'Offer My Help →'}</button>
        </div>
      )}

      <div style={{ padding: '16px 16px 0', display: 'flex', flexWrap: 'wrap', gap: 8 }}>{['All', 'Financial Help', 'Food', 'Medical', 'Counselling'].map(f => (<button key={f} onClick={() => setFilter(f)} style={{ padding: '8px 14px', borderRadius: 999, border: 'none', fontSize: 12, fontWeight: 700, cursor: 'pointer', background: filter === f ? '#fff' : 'rgba(255,255,255,0.1)', color: filter === f ? '#000' : '#fff' }}>{f}</button>))}</div>
      <p style={{ color: '#fff', fontWeight: 700, padding: '0 20px', marginTop: 16, fontSize: 14, marginBottom: 0 }}>SOS Board {requests.length > 0 && `(${requests.length})`}</p>
      {requests.length === 0 && <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.5)', fontSize: 13, marginTop: 12, padding: '0 24px' }}>No SOS posts yet.</p>}
      {requests.map(r => {
        const isHelper = r.need_type?.includes('WANTS TO HELP');
        return (
          <div key={r.id} style={{ margin: '12px 16px 0', background: '#fff', borderRadius: 18, padding: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
              <p style={{ fontWeight: 800, fontSize: 14, lineHeight: 1.3, margin: 0 }}>{r.need_type} • {r.city}</p>
              <span style={{ fontSize: 10, fontWeight: 700, padding: '4px 8px', borderRadius: 999, flexShrink: 0, height: 'fit-content', background: isHelper ? '#D1FAE5' : '#FEF3C7', color: isHelper ? '#047857' : '#92400E' }}>{isHelper ? '● Helper Available' : '● Awaiting Help'}</span>
            </div>
            <p style={{ fontSize: 13, color: '#4b5563', lineHeight: 1.6, marginTop: 4, marginBottom: 0 }}>{r.details}</p>
            <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
              <a href={`https://wa.me/${r.contact}`} style={{ flex: 1, textAlign: 'center', color: '#fff', fontSize: 12, fontWeight: 700, padding: '10px', borderRadius: 999, textDecoration: 'none', background: isHelper ? '#000' : '#059669' }}>{isHelper ? 'Contact Helper →' : 'Help This Person →'}</a>
              <a href={`tel:${r.contact}`} style={{ padding: '10px 16px', background: '#f3f4f6', borderRadius: 999, fontSize: 12, fontWeight: 700, textDecoration: 'none', color: '#000' }}>📞 Call</a>
            </div>
          </div>
        );
      })}
    </div>
  );
}
