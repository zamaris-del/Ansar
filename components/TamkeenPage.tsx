import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { notifyAll } from '../lib/notify';

type Mode = 'need' | 'help-individual' | 'help-organization';

export default function TamkeenPage({ onBack }: { onBack: () => void }) {
  const [mode, setMode] = useState<Mode>('need');
  const [requests, setRequests] = useState<any[]>([]);
  const [supported, setSupported] = useState<string[]>([]);

  const [type, setType] = useState('Small Business Grant');
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('NGN ₦');
  const [story, setStory] = useState('');
  const [contact, setContact] = useState('');

  const [helperName, setHelperName] = useState('');
  const [orgName, setOrgName] = useState('');
  const [helpType, setHelpType] = useState('Money');
  const [helpAmount, setHelpAmount] = useState('');
  const [helpCurrency, setHelpCurrency] = useState('NGN ₦');
  const [helpMessage, setHelpMessage] = useState('');
  const [helperContact, setHelperContact] = useState('');

  const load = async () => {
    const { data } = await supabase.from('tamkeen_requests').select('*').order('created_at', { ascending: false });
    setRequests(data || []);
  };
  useEffect(() => { load(); }, []);

  const postNeed = async () => {
    if (!story || !contact) return alert('Please tell your story and add your WhatsApp.');
    const { error } = await supabase.from('tamkeen_requests').insert([{
      need_type: type,
      amount: `${currency} ${amount || 'Negotiable'}`,
      story: `[I NEED HELP] ${story}`,
      contact
    }]);
    if (error) return alert(error.message);
    await notifyAll('general', `Tamkeen Request: ${type} — ${currency} ${amount}`, story.slice(0, 80), 'tamkeen');
    alert('Your request has been posted. The Ummah will see it.');
    setStory(''); setAmount(''); load();
  };

  const postHelp = async () => {
    const displayName = mode === 'help-organization' ? orgName : helperName;
    if (!displayName || !helperContact) return alert(mode === 'help-organization' ? 'Please enter your organisation name and contact.' : 'Please enter your name and contact.');
    const { error } = await supabase.from('tamkeen_requests').insert([{
      need_type: `WANTS TO HELP: ${helpType}`,
      amount: helpType === 'Money' ? `${helpCurrency} ${helpAmount || 'Negotiable'}` : helpType,
      story: `[${mode === 'help-organization' ? 'ORGANIZATION WANTS TO HELP' : 'INDIVIDUAL WANTS TO HELP'}] ${displayName} wants to help with ${helpType}. ${helpMessage}`,
      contact: helperContact
    }]);
    if (error) return alert(error.message);
    await notifyAll('general', `${displayName} wants to help — ${helpType}`, helpMessage.slice(0, 80) || `Someone wants to help with ${helpType}`, 'tamkeen');
    alert('JazakAllah Khair! Your offer to help has been posted. People who need help will contact you.');
    setHelpMessage(''); setHelpAmount(''); load();
  };

  const inputStyle: React.CSSProperties = { width: '100%', marginTop: 6, background: '#F7F3EC', border: '1px solid #E8DDC8', borderRadius: 14, padding: '12px 14px', fontSize: 14, outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit' };
  const labelStyle: React.CSSProperties = { display: 'block', fontSize: 11, fontWeight: 700, color: '#9ca3af', marginTop: 12, letterSpacing: 0.5 };
  const chip = (active: boolean): React.CSSProperties => ({ padding: '8px 12px', borderRadius: 999, border: 'none', fontSize: 11, fontWeight: 700, cursor: 'pointer', background: active ? '#000' : '#f3f4f6', color: active ? '#fff' : '#374151' });
  const currencies = ['NGN ₦', 'USD $', 'GBP £', 'EUR €', 'GHS GH₵', 'KES KSh', 'AED د.إ'];
  const selectStyle: React.CSSProperties = { background: '#F7F3EC', border: '1px solid #E8DDC8', borderRadius: 14, padding: '12px 8px', fontSize: 13, outline: 'none', flexShrink: 0 };

  return (
    <div style={{ minHeight: '100vh', background: '#0F2439', width: '100%', maxWidth: 430, margin: '0 auto', paddingBottom: 110, overflowX: 'hidden', boxSizing: 'border-box' }}>
      <div style={{ padding: '16px 16px 0', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={onBack} style={{ width: 40, height: 40, flexShrink: 0, background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', color: '#fff', fontSize: 18, cursor: 'pointer' }}>←</button>
        <div><h1 style={{ color: '#fff', fontWeight: 800, fontSize: 18, margin: 0 }}>TAMKEEN</h1><p style={{ color: '#D4AF78', fontSize: 10, fontWeight: 700, margin: 0, marginTop: 2 }}>EMPOWER, DON'T PITY • GROW WITH DIGNITY</p></div>
      </div>

      <div style={{ margin: '16px 16px 0', background: '#fff', borderRadius: 22, padding: 16 }}>
        <p style={{ fontWeight: 800, fontSize: 15, margin: 0 }}>How Tamkeen Works</p>
        <p style={{ fontSize: 12, color: '#6b7280', lineHeight: 1.65, marginTop: 4, marginBottom: 0 }}>You share your plan — a business, a skill, school fees. The Ummah supports you with money, mentorship, or training. You grow and later help someone else.</p>
      </div>

      <div style={{ margin: '12px 16px 0', background: '#fff', borderRadius: 20, padding: 8 }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: '#9ca3af', padding: '4px 8px 8px', margin: 0 }}>WHO ARE YOU?</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6 }}>
          <button onClick={() => setMode('need')} style={{ padding: '12px 4px', borderRadius: 14, border: 'none', fontSize: 11, fontWeight: 700, lineHeight: 1.3, cursor: 'pointer', background: mode === 'need' ? '#000' : '#f3f4f6', color: mode === 'need' ? '#fff' : '#4b5563' }}>🙋<br />I Need<br />Help</button>
          <button onClick={() => setMode('help-individual')} style={{ padding: '12px 4px', borderRadius: 14, border: 'none', fontSize: 11, fontWeight: 700, lineHeight: 1.3, cursor: 'pointer', background: mode === 'help-individual' ? '#000' : '#f3f4f6', color: mode === 'help-individual' ? '#fff' : '#4b5563' }}>👤<br />I Want To Help<br />Individual</button>
          <button onClick={() => setMode('help-organization')} style={{ padding: '12px 4px', borderRadius: 14, border: 'none', fontSize: 11, fontWeight: 700, lineHeight: 1.3, cursor: 'pointer', background: mode === 'help-organization' ? '#000' : '#f3f4f6', color: mode === 'help-organization' ? '#fff' : '#4b5563' }}>🏢<br />I Want To Help<br />Organization</button>
        </div>
        <p style={{ fontSize: 11, color: '#6b7280', padding: '8px 8px 4px', lineHeight: 1.5, margin: 0 }}>
          {mode === 'need' && 'You need support. Tell your story and plan, the Ummah will empower you.'}
          {mode === 'help-individual' && 'You are one person who wants to help — with money, mentorship or skill.'}
          {mode === 'help-organization' && 'You are a company, masjid, school or NGO that wants to empower people.'}
        </p>
      </div>

      {mode === 'need' ? (
        <div style={{ margin: '12px 16px 0', background: '#fff', borderRadius: 22, padding: 16 }}>
          <p style={{ fontWeight: 800, fontSize: 16, margin: 0 }}>Request Empowerment</p>
          <label style={{ ...labelStyle, marginTop: 16 }}>WHAT DO YOU NEED?</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 8 }}>{['Small Business Grant', 'Skill Training', 'Mentorship', 'School Fees'].map(t => (<button key={t} onClick={() => setType(t)} style={chip(type === t)}>{t}</button>))}</div>
          <label style={labelStyle}>AMOUNT NEEDED & CURRENCY</label>
          <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
            <select value={currency} onChange={e => setCurrency(e.target.value)} style={selectStyle}>{currencies.map(c => <option key={c}>{c}</option>)}</select>
            <input value={amount} onChange={e => setAmount(e.target.value)} placeholder="e.g. 50,000" style={{ ...inputStyle, marginTop: 0, flex: 1, minWidth: 0 }} />
          </div>
          <label style={labelStyle}>YOUR STORY / PLAN</label>
          <textarea value={story} onChange={e => setStory(e.target.value)} placeholder="What will you do with it? How will it help you become stable? Be specific — people support clear plans." style={{ ...inputStyle, minHeight: 100 }} />
          <label style={labelStyle}>CONTACT (WHATSAPP)</label>
          <input value={contact} onChange={e => setContact(e.target.value)} placeholder="WhatsApp number" style={inputStyle} />
          <button onClick={postNeed} style={{ width: '100%', marginTop: 16, background: '#059669', color: '#fff', fontWeight: 800, padding: '14px', borderRadius: 999, border: 'none', fontSize: 14, cursor: 'pointer' }}>Submit Request →</button>
        </div>
      ) : (
        <div style={{ margin: '12px 16px 0', background: '#fff', borderRadius: 22, padding: 16 }}>
          <p style={{ fontWeight: 800, fontSize: 16, margin: 0 }}>{mode === 'help-organization' ? 'Offer Help — As Organization' : 'Offer Help — As Individual'}</p>
          <p style={{ fontSize: 12, color: '#6b7280', lineHeight: 1.6, marginTop: 4, marginBottom: 0 }}>JazakAllah Khair for wanting to help. Tell us how you want to empower someone.</p>
          {mode === 'help-organization' ? (
            <>
              <label style={{ ...labelStyle, marginTop: 16 }}>ORGANIZATION NAME</label>
              <input value={orgName} onChange={e => setOrgName(e.target.value)} placeholder="e.g. Al-Noor Foundation, Central Mosque" style={inputStyle} />
              <label style={labelStyle}>CONTACT PERSON NAME</label>
              <input value={helperName} onChange={e => setHelperName(e.target.value)} placeholder="e.g. Manager Musa" style={inputStyle} />
            </>
          ) : (
            <>
              <label style={{ ...labelStyle, marginTop: 16 }}>YOUR NAME</label>
              <input value={helperName} onChange={e => setHelperName(e.target.value)} placeholder="e.g. Musa Ibrahim" style={inputStyle} />
            </>
          )}
          <label style={labelStyle}>HOW DO YOU WANT TO HELP?</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 8 }}>{['Money', 'Mentorship', 'Skill Training', 'Job / Work', 'School Fees'].map(t => (<button key={t} onClick={() => setHelpType(t)} style={chip(helpType === t)}>{t}</button>))}</div>
          {helpType === 'Money' && (
            <>
              <label style={labelStyle}>HOW MUCH CAN YOU GIVE? & CURRENCY</label>
              <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
                <select value={helpCurrency} onChange={e => setHelpCurrency(e.target.value)} style={selectStyle}>{currencies.map(c => <option key={c}>{c}</option>)}</select>
                <input value={helpAmount} onChange={e => setHelpAmount(e.target.value)} placeholder="e.g. 50,000 or Any Amount" style={{ ...inputStyle, marginTop: 0, flex: 1, minWidth: 0 }} />
              </div>
            </>
          )}
          <label style={labelStyle}>YOUR MESSAGE / WHAT YOU CAN OFFER</label>
          <textarea value={helpMessage} onChange={e => setHelpMessage(e.target.value)} placeholder={mode === 'help-organization' ? "e.g. We can sponsor 5 students, or train 10 youths in tailoring..." : "e.g. I can mentor someone in business, or give small support..."} style={{ ...inputStyle, minHeight: 90 }} />
          <label style={labelStyle}>CONTACT (WHATSAPP)</label>
          <input value={helperContact} onChange={e => setHelperContact(e.target.value)} placeholder="WhatsApp number" style={inputStyle} />
          <button onClick={postHelp} style={{ width: '100%', marginTop: 16, background: '#059669', color: '#fff', fontWeight: 800, padding: '14px', borderRadius: 999, border: 'none', fontSize: 14, cursor: 'pointer' }}>Offer My Help →</button>
        </div>
      )}

      <p style={{ padding: '0 20px', marginTop: 16, color: '#fff', fontWeight: 700, fontSize: 14, marginBottom: 0 }}>Tamkeen Board {requests.length > 0 && `(${requests.length})`}</p>
      {requests.length === 0 && <div style={{ margin: '12px 16px 0', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 18, padding: 20, textAlign: 'center' }}><p style={{ fontSize: 28, margin: 0 }}>🌱</p><p style={{ color: '#fff', fontWeight: 700, fontSize: 14, marginTop: 8, marginBottom: 0 }}>No posts yet</p><p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, marginTop: 4, marginBottom: 0 }}>Be the first — either ask for help or offer help.</p></div>}
      {requests.map(r => (
        <div key={r.id} style={{ margin: '12px 16px 0', background: '#fff', borderRadius: 18, padding: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}><p style={{ fontWeight: 800, fontSize: 14, lineHeight: 1.3, margin: 0 }}>{r.need_type}</p><span style={{ fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{r.amount}</span></div>
          <p style={{ fontSize: 13, lineHeight: 1.6, color: '#4b5563', marginTop: 8, marginBottom: 0 }}>{r.story}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 12, paddingTop: 12, borderTop: '1px solid #f3f4f6' }}>
            <button onClick={() => setSupported(prev => prev.includes(r.id) ? prev.filter(id => id !== r.id) : [...prev, r.id])} style={{ flex: 1, padding: '12px', borderRadius: 999, border: 'none', fontSize: 13, fontWeight: 700, cursor: 'pointer', minWidth: 140, background: supported.includes(r.id) ? '#059669' : '#000', color: '#fff' }}>{supported.includes(r.id) ? '✓ You Are Supporting' : r.need_type.includes('WANTS TO HELP') ? 'Contact Helper →' : 'Support This Person →'}</button>
            <button style={{ padding: '12px 16px', background: '#f3f4f6', border: 'none', borderRadius: 999, fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>Mentor</button>
          </div>
        </div>
      ))}
    </div>
  );
}
