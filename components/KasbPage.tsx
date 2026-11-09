import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { notifyAll } from '../lib/notify';

type Mode = 'seek' | 'individual' | 'organization';

export default function KasbPage({ onBack }: { onBack: () => void }) {
  const [mode, setMode] = useState<Mode>('individual');
  const [hiring, setHiring] = useState<any[]>([]);
  const [seekers, setSeekers] = useState<any[]>([]);
  const [jobFilter, setJobFilter] = useState('All');
  const [saved, setSaved] = useState<string[]>([]);

  const [posterName, setPosterName] = useState('');
  const [orgName, setOrgName] = useState('');
  const [role, setRole] = useState('');
  const [jtype, setJtype] = useState('Full-time');
  const [loc, setLoc] = useState('');
  const [pay, setPay] = useState('');
  const [currency, setCurrency] = useState('NGN ₦');
  const [details, setDetails] = useState('');
  const [contact, setContact] = useState('');

  const [sName, setSName] = useState('');
  const [skill, setSkill] = useState('');
  const [exp, setExp] = useState('');
  const [sLoc, setSLoc] = useState('');
  const [sPay, setSPay] = useState('');
  const [sCurrency, setSCurrency] = useState('NGN ₦');
  const [sContact, setSContact] = useState('');

  const load = async () => {
    const h = await supabase.from('kasb_hiring').select('*').order('created_at', { ascending: false });
    const s = await supabase.from('kasb_seekers').select('*').order('created_at', { ascending: false });
    setHiring(h.data || []);
    setSeekers(s.data || []);
  };
  useEffect(() => { load(); }, []);

  const postHiring = async () => {
    const displayName = mode === 'organization' ? orgName : posterName;
    if (!role || !contact || !displayName) return alert(mode === 'organization' ? 'Please enter your organisation name, role and contact.' : 'Please enter your name, role and contact.');
    const { error } = await supabase.from('kasb_hiring').insert([{
      org_name: displayName,
      role_title: role,
      job_type: jtype,
      location: loc,
      pay: `${currency} ${pay || 'Negotiable'}`,
      details: `[Posted as: ${mode === 'organization' ? 'Organization' : 'Individual'}] ${details}`,
      contact
    }]);
    if (error) return alert(error.message);
    await notifyAll('job', `New Job: ${role} in ${loc}`, `${displayName} is hiring for ${role}.`, 'kasb');
    alert('Job posted successfully.');
    setRole(''); setDetails(''); setPay(''); load();
  };

  const postSeeker = async () => {
    if (!sName || !skill || !sContact) return alert('Please enter your name, skill and WhatsApp.');
    const { error } = await supabase.from('kasb_seekers').insert([{
      name: sName, skill, experience: exp, location: sLoc,
      expected_pay: `${sCurrency} ${sPay || 'Negotiable'}`,
      contact: sContact
    }]);
    if (error) return alert(error.message);
    await notifyAll('job', `${sName} is looking for work: ${skill}`, `${sName} is skilled in ${skill} and based in ${sLoc}.`, 'kasb');
    alert('Your profile has been posted.');
    setSName(''); setSkill(''); load();
  };

  const inputStyle: React.CSSProperties = { width: '100%', marginTop: 6, background: '#F7F3EC', border: '1px solid #E8DDC8', borderRadius: 14, padding: '12px 14px', fontSize: 14, outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit' };
  const labelStyle: React.CSSProperties = { display: 'block', fontSize: 11, fontWeight: 700, color: '#9ca3af', marginTop: 12, letterSpacing: 0.5 };
  const chip = (active: boolean): React.CSSProperties => ({ padding: '8px 12px', borderRadius: 999, border: 'none', fontSize: 11, fontWeight: 700, cursor: 'pointer', background: active ? '#000' : '#f3f4f6', color: active ? '#fff' : '#374151' });
  const filterChip = (active: boolean): React.CSSProperties => ({ padding: '8px 14px', borderRadius: 999, border: 'none', fontSize: 12, fontWeight: 700, cursor: 'pointer', background: active ? '#fff' : 'rgba(255,255,255,0.1)', color: active ? '#000' : '#fff' });
  const filteredJobs = jobFilter === 'All' ? hiring : hiring.filter(j => j.job_type === jobFilter);
  const currencies = ['NGN ₦', 'USD $', 'GBP £', 'EUR €', 'GHS GH₵', 'KES KSh', 'AED د.إ'];
  const selectStyle: React.CSSProperties = { background: '#F7F3EC', border: '1px solid #E8DDC8', borderRadius: 14, padding: '12px 8px', fontSize: 13, outline: 'none', flexShrink: 0 };

  return (
    <div style={{ minHeight: '100vh', background: '#0F2439', width: '100%', maxWidth: 430, margin: '0 auto', paddingBottom: 110, overflowX: 'hidden', boxSizing: 'border-box' }}>
      <div style={{ padding: '16px 16px 0', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={onBack} style={{ width: 40, height: 40, flexShrink: 0, background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', color: '#fff', fontSize: 18, cursor: 'pointer' }}>←</button>
        <div><h1 style={{ color: '#fff', fontWeight: 800, fontSize: 18, margin: 0 }}>KASB</h1><p style={{ color: '#D4AF78', fontSize: 10, fontWeight: 700, margin: 0, marginTop: 2 }}>NO CV WAHALA • IMAM VOUCH = CV • HALAL WORK ONLY</p></div>
      </div>

      <div style={{ margin: '16px 16px 0', display: 'flex', gap: 8 }}>
        <span style={{ background: 'rgba(16,185,129,0.2)', color: '#6EE7B7', fontSize: 10, fontWeight: 700, padding: '6px 12px', borderRadius: 999 }}>● LIVE</span>
        <span style={{ background: 'rgba(212,175,120,0.2)', color: '#D4AF78', fontSize: 10, fontWeight: 700, padding: '6px 12px', borderRadius: 999 }}>PRIVATE & SAFE</span>
      </div>

      <div style={{ margin: '16px 16px 0', background: '#fff', borderRadius: 20, padding: 8 }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: '#9ca3af', padding: '4px 8px 8px', margin: 0 }}>WHO ARE YOU?</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6 }}>
          <button onClick={() => setMode('seek')} style={{ padding: '12px 4px', borderRadius: 14, border: 'none', fontSize: 11, fontWeight: 700, lineHeight: 1.3, cursor: 'pointer', background: mode === 'seek' ? '#000' : '#f3f4f6', color: mode === 'seek' ? '#fff' : '#4b5563' }}>🙋<br />I Need<br />A Job</button>
          <button onClick={() => setMode('individual')} style={{ padding: '12px 4px', borderRadius: 14, border: 'none', fontSize: 11, fontWeight: 700, lineHeight: 1.3, cursor: 'pointer', background: mode === 'individual' ? '#000' : '#f3f4f6', color: mode === 'individual' ? '#fff' : '#4b5563' }}>👤<br />Individual<br />Hiring</button>
          <button onClick={() => setMode('organization')} style={{ padding: '12px 4px', borderRadius: 14, border: 'none', fontSize: 11, fontWeight: 700, lineHeight: 1.3, cursor: 'pointer', background: mode === 'organization' ? '#000' : '#f3f4f6', color: mode === 'organization' ? '#fff' : '#4b5563' }}>🏢<br />Organization<br />Hiring</button>
        </div>
        <p style={{ fontSize: 11, color: '#6b7280', padding: '8px 8px 4px', lineHeight: 1.5, margin: 0 }}>
          {mode === 'seek' && 'You are looking for work. Show your skill, people will hire you.'}
          {mode === 'individual' && 'You are one person hiring — e.g. I need a driver, tailor, house help.'}
          {mode === 'organization' && 'You are hiring for a company, masjid, school or shop.'}
        </p>
      </div>

      {mode === 'seek' ? (
        <>
          <div style={{ margin: '12px 16px 0', background: '#fff', borderRadius: 22, padding: 16 }}>
            <p style={{ fontWeight: 800, fontSize: 16, margin: 0 }}>Share With Ummah</p>
            <p style={{ fontSize: 12, color: '#6b7280', marginTop: 4, marginBottom: 0 }}>Only good intentions. Allah sees your heart.</p>
            <label style={labelStyle}>YOUR NAME</label>
            <input value={sName} onChange={e => setSName(e.target.value)} placeholder="e.g. Musa Ibrahim" style={inputStyle} />
            <label style={labelStyle}>YOUR SKILL</label>
            <input value={skill} onChange={e => setSkill(e.target.value)} placeholder="e.g. Driver, Tailor, Quran Teacher" style={inputStyle} />
            <label style={labelStyle}>EXPERIENCE</label>
            <input value={exp} onChange={e => setExp(e.target.value)} placeholder="e.g. 3 years" style={inputStyle} />
            <label style={labelStyle}>LOCATION / CITY</label>
            <input value={sLoc} onChange={e => setSLoc(e.target.value)} placeholder="e.g. Lagos" style={inputStyle} />
            <label style={labelStyle}>EXPECTED PAY & CURRENCY</label>
            <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
              <select value={sCurrency} onChange={e => setSCurrency(e.target.value)} style={selectStyle}>{currencies.map(c => <option key={c}>{c}</option>)}</select>
              <input value={sPay} onChange={e => setSPay(e.target.value)} placeholder="e.g. 80k/month or Negotiable" style={{ ...inputStyle, marginTop: 0, flex: 1, minWidth: 0 }} />
            </div>
            <label style={labelStyle}>WHATSAPP / CONTACT</label>
            <input value={sContact} onChange={e => setSContact(e.target.value)} placeholder="080..." style={inputStyle} />
            <button onClick={postSeeker} style={{ width: '100%', marginTop: 16, background: '#0F2439', color: '#fff', fontWeight: 800, padding: '14px', borderRadius: 999, border: 'none', fontSize: 14, cursor: 'pointer' }}>POST →</button>
          </div>
          <p style={{ color: '#fff', fontWeight: 700, padding: '0 20px', marginTop: 20, fontSize: 14, marginBottom: 0 }}>People Looking For Work ({seekers.length})</p>
          {seekers.length === 0 && <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.5)', fontSize: 13, marginTop: 12, padding: '0 24px' }}>No seekers yet. Be the first.</p>}
          {seekers.map(s => (
            <div key={s.id} style={{ margin: '12px 16px 0', background: '#fff', borderRadius: 18, padding: 16 }}>
              <p style={{ fontWeight: 800, fontSize: 14, margin: 0 }}>{s.name} — {s.skill}</p>
              <p style={{ fontSize: 12, color: '#6b7280', marginTop: 2, marginBottom: 0 }}>{s.location} • {s.experience} • Expects {s.expected_pay}</p>
              <a href={`https://wa.me/${s.contact}`} style={{ display: 'inline-block', marginTop: 12, background: '#000', color: '#fff', fontSize: 12, fontWeight: 700, padding: '8px 16px', borderRadius: 999, textDecoration: 'none' }}>Hire {s.name} →</a>
            </div>
          ))}
        </>
      ) : (
        <>
          <div style={{ margin: '12px 16px 0', background: '#fff', borderRadius: 22, padding: 16 }}>
            <p style={{ fontWeight: 800, fontSize: 16, margin: 0 }}>{mode === 'organization' ? 'Share With Ummah — As Organization' : 'Share With Ummah — As Individual'}</p>
            <p style={{ fontSize: 12, color: '#6b7280', marginTop: 4, marginBottom: 0 }}>Only good intentions. Allah sees your heart.</p>
            {mode === 'organization' ? (
              <>
                <label style={labelStyle}>ORGANIZATION NAME</label>
                <input value={orgName} onChange={e => setOrgName(e.target.value)} placeholder="e.g. Al-Noor Bakery, Central Mosque School" style={inputStyle} />
                <label style={labelStyle}>CONTACT PERSON NAME</label>
                <input value={posterName} onChange={e => setPosterName(e.target.value)} placeholder="e.g. Manager Musa" style={inputStyle} />
              </>
            ) : (
              <>
                <label style={labelStyle}>YOUR NAME</label>
                <input value={posterName} onChange={e => setPosterName(e.target.value)} placeholder="e.g. Musa — I need a driver" style={inputStyle} />
              </>
            )}
            <label style={labelStyle}>JOB TITLE</label>
            <input value={role} onChange={e => setRole(e.target.value)} placeholder="e.g. I need Driver – Lagos" style={inputStyle} />
            <label style={labelStyle}>JOB TYPE</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 8 }}>{['Full-time', 'Part-time', 'Remote', 'Contract'].map(t => (<button key={t} onClick={() => setJtype(t)} style={chip(jtype === t)}>{t}</button>))}</div>
            <label style={labelStyle}>LOCATION / CITY</label>
            <input value={loc} onChange={e => setLoc(e.target.value)} placeholder="e.g. Lagos" style={inputStyle} />
            <label style={labelStyle}>PAY & CURRENCY</label>
            <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
              <select value={currency} onChange={e => setCurrency(e.target.value)} style={selectStyle}>{currencies.map(c => <option key={c}>{c}</option>)}</select>
              <input value={pay} onChange={e => setPay(e.target.value)} placeholder="e.g. ₦80k/month or Negotiable" style={{ ...inputStyle, marginTop: 0, flex: 1, minWidth: 0 }} />
            </div>
            <label style={labelStyle}>WHATSAPP / CONTACT</label>
            <input value={contact} onChange={e => setContact(e.target.value)} placeholder="080..." style={inputStyle} />
            <label style={labelStyle}>WRITE HERE... ALLAH IS LISTENING</label>
            <textarea value={details} onChange={e => setDetails(e.target.value)} placeholder="What will the person do? Prayer break allowed?" style={{ ...inputStyle, minHeight: 90 }} />
            <button onClick={postHiring} style={{ width: '100%', marginTop: 16, background: '#0F2439', color: '#fff', fontWeight: 800, padding: '14px', borderRadius: 999, border: 'none', fontSize: 14, cursor: 'pointer' }}>POST →</button>
          </div>

          <div style={{ padding: '16px 16px 0', display: 'flex', flexWrap: 'wrap', gap: 8 }}>{['All', 'Full-time', 'Part-time', 'Remote', 'Contract'].map(f => (<button key={f} onClick={() => setJobFilter(f)} style={filterChip(jobFilter === f)}>{f}</button>))}</div>
          <p style={{ color: '#fff', fontWeight: 700, padding: '0 20px', marginTop: 16, fontSize: 14, marginBottom: 0 }}>Open Jobs ({filteredJobs.length})</p>
          {filteredJobs.length === 0 && <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.5)', fontSize: 13, marginTop: 12, padding: '0 24px' }}>No jobs yet. Post the first one.</p>}
          {filteredJobs.map(j => (
            <div key={j.id} style={{ margin: '12px 16px 0', background: '#fff', borderRadius: 18, padding: 16 }}>
              <p style={{ fontWeight: 800, fontSize: 14, margin: 0 }}>{j.role_title}</p>
              <p style={{ fontSize: 12, color: '#6b7280', marginTop: 2, marginBottom: 0 }}>{j.org_name} • {j.location} • {j.job_type} • {j.pay}</p>
              <p style={{ fontSize: 13, lineHeight: 1.6, marginTop: 8, marginBottom: 0 }}>{j.details}</p>
              <p style={{ fontSize: 11, color: '#047857', fontWeight: 700, marginTop: 8, marginBottom: 0 }}>✓ Prayer break allowed • Halal environment</p>
              <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                <a href={`https://wa.me/${j.contact}`} style={{ flex: 1, textAlign: 'center', background: '#059669', color: '#fff', fontSize: 12, fontWeight: 700, padding: '10px', borderRadius: 999, textDecoration: 'none' }}>Apply →</a>
                <button onClick={() => setSaved(prev => prev.includes(j.id) ? prev.filter(id => id !== j.id) : [...prev, j.id])} style={{ padding: '10px 12px', background: '#f3f4f6', border: 'none', borderRadius: 999, fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>{saved.includes(j.id) ? '✓ Saved' : '🔖 Save'}</button>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
