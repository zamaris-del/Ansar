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

  // NEED HELP FIELDS
  const [needType, setNeedType] = useState('Financial Help');
  const [urgency, setUrgency] = useState('High — Today');
  const [details, setDetails] = useState('');
  const [city, setCity] = useState('');
  const [contact, setContact] = useState('');

  // HELP / IMAM FIELDS
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

  const input = "w-full mt-1.5 bg-[#F7F3EC] border rounded-[14px] px-3.5 py-3 text-[14px] outline-none";
  const filtered = filter === 'All' ? requests : requests.filter(r => r.need_type === filter || r.need_type.includes(filter));

  return (
    <div className="min-h-screen bg-[#0F2439] w-full max-w-[430px] mx-auto pb-[110px] overflow-x-hidden">
      <div className="px-4 pt-4 flex items-center gap-3">
        <button onClick={onBack} className="w-10 h-10 shrink-0 bg-white/10 rounded-full text-white">←</button>
        <div><h1 className="text-white font-extrabold text-[18px]">SOS</h1><p className="text-[#D4AF78] text-[10px] font-bold">IMAMS & VOLUNTEERS RESPOND QUICKLY</p></div>
      </div>

      <div className="mx-4 mt-4 bg-white rounded-[22px] p-4">
        <p className="font-extrabold text-[13px]">Emergency Contacts</p>
        <div className="grid grid-cols-3 gap-2 mt-3">
          <a href="tel:112" className="bg-red-50 text-red-700 text-center py-3 rounded-[14px]"><p className="text-[18px]">🚑</p><p className="text-[10px] font-bold mt-1 leading-tight">Ambulance<br />112</p></a>
          <a href="tel:199" className="bg-orange-50 text-orange-700 text-center py-3 rounded-[14px]"><p className="text-[18px]">🚓</p><p className="text-[10px] font-bold mt-1 leading-tight">Police<br />199</p></a>
          <a href="https://wa.me/2348000000000" className="bg-emerald-50 text-emerald-700 text-center py-3 rounded-[14px]"><p className="text-[18px]">🕌</p><p className="text-[10px] font-bold mt-1 leading-tight">ANSAR Imam<br />WhatsApp</p></a>
        </div>
      </div>

      {/* === THE 4-WAY CHOICE === */}
      <div className="mx-4 mt-3 bg-white rounded-[20px] p-2">
        <p className="text-[11px] font-bold text-gray-400 px-2 pt-1 pb-2">WHO ARE YOU?</p>
        <div className="grid grid-cols-2 gap-1.5">
          <button onClick={() => setMode('need')} className={`py-3 px-2 rounded-[14px] text-[12px] font-bold leading-tight ${mode === 'need' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-600'}`}>🚨<br />I Need<br />Help</button>
          <button onClick={() => setMode('help-individual')} className={`py-3 px-2 rounded-[14px] text-[12px] font-bold leading-tight ${mode === 'help-individual' ? 'bg-black text-white' : 'bg-gray-100 text-gray-600'}`}>👤<br />I Want To Help<br />Individual</button>
          <button onClick={() => setMode('help-organization')} className={`py-3 px-2 rounded-[14px] text-[12px] font-bold leading-tight ${mode === 'help-organization' ? 'bg-black text-white' : 'bg-gray-100 text-gray-600'}`}>🏢<br />I Want To Help<br />Organization</button>
          <button onClick={() => setMode('imam')} className={`py-3 px-2 rounded-[14px] text-[12px] font-bold leading-tight ${mode === 'imam' ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-600'}`}>🕌<br />Imam /<br />Volunteer</button>
        </div>
        <p className="text-[11px] text-gray-500 px-2 pt-2 pb-1 leading-[1.5]">
          {mode === 'need' && 'You need urgent help. Be honest, your contact is only shared with verified helpers.'}
          {mode === 'help-individual' && 'You are one person who wants to help — with money, food, or time.'}
          {mode === 'help-organization' && 'You are a company, masjid, school or NGO that wants to help people in crisis.'}
          {mode === 'imam' && 'You are an Imam or trusted volunteer. People will reach out to you first.'}
        </p>
      </div>

      {/* === I NEED HELP FORM === */}
      {mode === 'need' ? (
        <div className="mx-4 mt-3 bg-white rounded-[22px] p-4">
          <p className="font-extrabold text-[16px]">Request Help</p>
          <label className="block text-[11px] font-bold text-gray-400 mt-4">WHAT DO YOU NEED?</label>
          <div className="flex flex-wrap gap-2 mt-2">{['Financial Help', 'Food', 'Accommodation', 'Medical', 'Counselling', 'Legal', 'Other'].map(t => (<button key={t} onClick={() => setNeedType(t)} className={`px-3 py-2 rounded-full text-[12px] font-bold ${needType === t ? 'bg-black text-white' : 'bg-gray-100'}`}>{t}</button>))}</div>
          <label className="block text-[11px] font-bold text-gray-400 mt-4">HOW URGENT?</label>
          <div className="flex flex-wrap gap-2 mt-2">{['High — Today', 'Medium — This Week', 'Low — Anytime'].map(u => (<button key={u} onClick={() => setUrgency(u)} className={`px-3 py-2 rounded-full text-[11px] font-bold ${urgency === u ? 'bg-red-600 text-white' : 'bg-gray-100'}`}>{u}</button>))}</div>
          <label className="block text-[11px] font-bold text-gray-400 mt-4">DESCRIBE YOUR SITUATION</label>
          <textarea value={details} onChange={e => setDetails(e.target.value)} placeholder="Please explain what happened..." className={input} />
          <label className="block text-[11px] font-bold text-gray-400 mt-3">CITY</label>
          <input value={city} onChange={e => setCity(e.target.value)} placeholder="e.g. Lagos" className={input} />
          <label className="block text-[11px] font-bold text-gray-400 mt-3">CONTACT / WHATSAPP</label>
          <input value={contact} onChange={e => setContact(e.target.value)} placeholder="080..." className={input} />
          <button onClick={postNeed} className="w-full mt-4 bg-red-600 text-white font-extrabold py-3.5 rounded-full text-[14px]">Send SOS Alert →</button>
        </div>
      ) : (
        /* === HELP / IMAM FORM === */
        <div className="mx-4 mt-3 bg-white rounded-[22px] p-4">
          <p className="font-extrabold text-[16px]">{mode === 'imam' ? 'Register As Imam / Volunteer' : mode === 'help-organization' ? 'Offer Help — As Organization' : 'Offer Help — As Individual'}</p>
          <p className="text-[12px] text-gray-500 leading-[1.6] mt-1">JazakAllah Khair. Tell us how you can help so people in crisis can find you.</p>

          {mode === 'help-organization' ? (
            <>
              <label className="block text-[11px] font-bold text-gray-400 mt-4">ORGANIZATION NAME</label>
              <input value={orgName} onChange={e => setOrgName(e.target.value)} placeholder="e.g. Al-Noor Foundation" className={input} />
              <label className="block text-[11px] font-bold text-gray-400 mt-3">CONTACT PERSON NAME</label>
              <input value={helperName} onChange={e => setHelperName(e.target.value)} placeholder="e.g. Manager Musa" className={input} />
            </>
          ) : mode === 'imam' ? (
            <>
              <label className="block text-[11px] font-bold text-gray-400 mt-4">YOUR NAME — IMAM / VOLUNTEER</label>
              <input value={helperName} onChange={e => setHelperName(e.target.value)} placeholder="e.g. Imam Abdullahi" className={input} />
              <label className="block text-[11px] font-bold text-gray-400 mt-3">MASJID NAME</label>
              <input value={masjidName} onChange={e => setMasjidName(e.target.value)} placeholder="e.g. Central Mosque, Lagos" className={input} />
            </>
          ) : (
            <>
              <label className="block text-[11px] font-bold text-gray-400 mt-4">YOUR NAME</label>
              <input value={helperName} onChange={e => setHelperName(e.target.value)} placeholder="e.g. Musa Ibrahim" className={input} />
            </>
          )}

          <label className="block text-[11px] font-bold text-gray-400 mt-3">WHAT CAN YOU HELP WITH?</label>
          <div className="flex flex-wrap gap-2 mt-2">{['Financial Help', 'Food', 'Accommodation', 'Medical', 'Counselling', 'Legal', 'Other'].map(t => (<button key={t} onClick={() => setHelpTypes(t)} className={`px-3 py-2 rounded-full text-[12px] font-bold ${helpTypes === t ? 'bg-black text-white' : 'bg-gray-100'}`}>{t}</button>))}</div>
          <label className="block text-[11px] font-bold text-gray-400 mt-3">YOUR CITY</label>
          <input value={helperCity} onChange={e => setHelperCity(e.target.value)} placeholder="e.g. Lagos — where can you help?" className={input} />
          <label className="block text-[11px] font-bold text-gray-400 mt-3">YOUR MESSAGE</label>
          <textarea value={helperMessage} onChange={e => setHelperMessage(e.target.value)} placeholder={mode === 'imam' ? "e.g. I am available for counselling, Janazah, and family issues..." : "e.g. I can give food, or pay small bills, or give a ride..."} className={input} />
          <label className="block text-[11px] font-bold text-gray-400 mt-3">WHATSAPP / CONTACT</label>
          <input value={helperContact} onChange={e => setHelperContact(e.target.value)} placeholder="080..." className={input} />
          <button onClick={postHelper} className={`w-full mt-4 font-extrabold py-3.5 rounded-full text-[14px] ${mode === 'imam' ? 'bg-emerald-600 text-white' : 'bg-black text-white'}`}>{mode === 'imam' ? 'Register As Imam / Volunteer →' : 'Offer My Help →'}</button>
        </div>
      )}

      <div className="px-4 mt-4 flex flex-wrap gap-2">{['All', 'Financial Help', 'Food', 'Medical', 'Counselling'].map(f => (<button key={f} onClick={() => setFilter(f)} className={`px-3.5 py-2 rounded-full text-[12px] font-bold ${filter === f ? 'bg-white text-black' : 'bg-white/10 text-white'}`}>{f}</button>))}</div>
      <p className="text-white font-bold px-5 mt-4 text-[14px]">SOS Board {requests.length > 0 && `(${requests.length})`}</p>
      {requests.length === 0 && <p className="text-center text-white/50 text-[13px] mt-3 px-6">No SOS posts yet.</p>}
      {requests.map(r => {
        const isHelper = r.need_type?.includes('WANTS TO HELP');
        return (
          <div key={r.id} className="mx-4 mt-3 bg-white rounded-[18px] p-4">
            <div className="flex justify-between gap-2">
              <p className="font-extrabold text-[14px] leading-tight">{r.need_type} • {r.city}</p>
              <span className={`text-[10px] font-bold px-2 py-1 rounded-full shrink-0 ${isHelper ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>{isHelper ? '● Helper Available' : '● Awaiting Help'}</span>
            </div>
            <p className="text-[13px] text-gray-600 leading-[1.6] mt-1">{r.details}</p>
            <div className="flex gap-2 mt-3">
              <a href={`https://wa.me/${r.contact}`} className={`flex-1 text-center text-white text-[12px] font-bold py-2.5 rounded-full ${isHelper ? 'bg-black' : 'bg-emerald-600'}`}>{isHelper ? 'Contact Helper →' : 'Help This Person →'}</a>
              <a href={`tel:${r.contact}`} className="px-4 py-2.5 bg-gray-100 rounded-full text-[12px] font-bold">📞 Call</a>
            </div>
          </div>
        );
      })}
    </div>
  );
        }
