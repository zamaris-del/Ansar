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

  // HIRING FIELDS
  const [posterName, setPosterName] = useState('');
  const [orgName, setOrgName] = useState('');
  const [role, setRole] = useState('');
  const [jtype, setJtype] = useState('Full-time');
  const [loc, setLoc] = useState('');
  const [pay, setPay] = useState('');
  const [currency, setCurrency] = useState('NGN ₦');
  const [details, setDetails] = useState('');
  const [contact, setContact] = useState('');

  // SEEKER FIELDS
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

  const input = "w-full mt-1.5 bg-[#F7F3EC] border rounded-[14px] px-3.5 py-3 text-[14px] outline-none";
  const filteredJobs = jobFilter === 'All' ? hiring : hiring.filter(j => j.job_type === jobFilter);

  return (
    <div className="min-h-screen bg-[#0F2439] w-full max-w-[430px] mx-auto pb-[110px] overflow-x-hidden">
      <div className="px-4 pt-4 flex items-center gap-3">
        <button onClick={onBack} className="w-10 h-10 shrink-0 bg-white/10 rounded-full text-white">←</button>
        <div><h1 className="text-white font-extrabold text-[18px]">KASB</h1><p className="text-[#D4AF78] text-[10px] font-bold">NO CV WAHALA • IMAM VOUCH = CV • HALAL WORK ONLY</p></div>
      </div>

      <div className="mx-4 mt-4 flex gap-2">
        <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-3 py-1.5 rounded-full">● LIVE</span>
        <span className="bg-[#D4AF78]/20 text-[#D4AF78] text-[10px] font-bold px-3 py-1.5 rounded-full">PRIVATE & SAFE</span>
      </div>

      {/* === THE 3-WAY CHOICE YOU ASKED FOR === */}
      <div className="mx-4 mt-4 bg-white rounded-[20px] p-2">
        <p className="text-[11px] font-bold text-gray-400 px-2 pt-1 pb-2">WHO ARE YOU?</p>
        <div className="grid grid-cols-3 gap-1.5">
          <button onClick={() => setMode('seek')} className={`py-3 px-1 rounded-[14px] text-[11px] font-bold leading-tight ${mode === 'seek' ? 'bg-black text-white' : 'bg-gray-100 text-gray-600'}`}>🙋<br />I Need<br />A Job</button>
          <button onClick={() => setMode('individual')} className={`py-3 px-1 rounded-[14px] text-[11px] font-bold leading-tight ${mode === 'individual' ? 'bg-black text-white' : 'bg-gray-100 text-gray-600'}`}>👤<br />Individual<br />Hiring</button>
          <button onClick={() => setMode('organization')} className={`py-3 px-1 rounded-[14px] text-[11px] font-bold leading-tight ${mode === 'organization' ? 'bg-black text-white' : 'bg-gray-100 text-gray-600'}`}>🏢<br />Organization<br />Hiring</button>
        </div>
        <p className="text-[11px] text-gray-500 px-2 pt-2 pb-1 leading-[1.5]">
          {mode === 'seek' && 'You are looking for work. Show your skill, people will hire you.'}
          {mode === 'individual' && 'You are one person hiring — e.g. I need a driver, tailor, house help.'}
          {mode === 'organization' && 'You are hiring for a company, masjid, school or shop.'}
        </p>
      </div>

      {/* === SEEKER FORM === */}
      {mode === 'seek' ? (
        <>
          <div className="mx-4 mt-3 bg-white rounded-[22px] p-4">
            <p className="font-extrabold text-[16px]">Share With Ummah</p>
            <p className="text-[12px] text-gray-500 mt-1">Only good intentions. Allah sees your heart.</p>
            <label className="block text-[11px] font-bold text-gray-400 mt-4">YOUR NAME</label>
            <input value={sName} onChange={e => setSName(e.target.value)} placeholder="e.g. Musa Ibrahim" className={input} />
            <label className="block text-[11px] font-bold text-gray-400 mt-3">YOUR SKILL</label>
            <input value={skill} onChange={e => setSkill(e.target.value)} placeholder="e.g. Driver, Tailor, Quran Teacher" className={input} />
            <label className="block text-[11px] font-bold text-gray-400 mt-3">EXPERIENCE</label>
            <input value={exp} onChange={e => setExp(e.target.value)} placeholder="e.g. 3 years" className={input} />
            <label className="block text-[11px] font-bold text-gray-400 mt-3">LOCATION / CITY</label>
            <input value={sLoc} onChange={e => setSLoc(e.target.value)} placeholder="e.g. Lagos" className={input} />
            <label className="block text-[11px] font-bold text-gray-400 mt-3">EXPECTED PAY & CURRENCY</label>
            <div className="flex gap-2 mt-1.5">
              <select value={sCurrency} onChange={e => setSCurrency(e.target.value)} className="bg-[#F7F3EC] border rounded-[14px] px-2 py-3 text-[13px] outline-none shrink-0"><option>NGN ₦</option><option>USD $</option><option>GBP £</option><option>EUR €</option><option>GHS GH₵</option><option>KES KSh</option><option>AED د.إ</option></select>
              <input value={sPay} onChange={e => setSPay(e.target.value)} placeholder="e.g. 80k/month or Negotiable" className="flex-1 bg-[#F7F3EC] border rounded-[14px] px-3.5 py-3 text-[14px] outline-none min-w-0" />
            </div>
            <label className="block text-[11px] font-bold text-gray-400 mt-3">WHATSAPP / CONTACT</label>
            <input value={sContact} onChange={e => setSContact(e.target.value)} placeholder="080..." className={input} />
            <button onClick={postSeeker} className="w-full mt-4 bg-[#0F2439] text-white font-extrabold py-3.5 rounded-full text-[14px]">POST →</button>
          </div>
          <p className="text-white font-bold px-5 mt-5 text-[14px]">People Looking For Work ({seekers.length})</p>
          {seekers.length === 0 && <p className="text-center text-white/50 text-[13px] mt-3 px-6">No seekers yet. Be the first.</p>}
          {seekers.map(s => (
            <div key={s.id} className="mx-4 mt-3 bg-white rounded-[18px] p-4">
              <p className="font-extrabold text-[14px]">{s.name} — {s.skill}</p>
              <p className="text-[12px] text-gray-500 mt-0.5">{s.location} • {s.experience} • Expects {s.expected_pay}</p>
              <a href={`https://wa.me/${s.contact}`} className="inline-block mt-3 bg-black text-white text-[12px] font-bold px-4 py-2 rounded-full">Hire {s.name} →</a>
            </div>
          ))}
        </>
      ) : (
        /* === HIRING FORM — INDIVIDUAL OR ORGANIZATION === */
        <>
          <div className="mx-4 mt-3 bg-white rounded-[22px] p-4">
            <p className="font-extrabold text-[16px]">{mode === 'organization' ? 'Share With Ummah — As Organization' : 'Share With Ummah — As Individual'}</p>
            <p className="text-[12px] text-gray-500 mt-1">Only good intentions. Allah sees your heart.</p>

            {mode === 'organization' ? (
              <>
                <label className="block text-[11px] font-bold text-gray-400 mt-4">ORGANIZATION NAME</label>
                <input value={orgName} onChange={e => setOrgName(e.target.value)} placeholder="e.g. Al-Noor Bakery, Central Mosque School" className={input} />
                <label className="block text-[11px] font-bold text-gray-400 mt-3">CONTACT PERSON NAME</label>
                <input value={posterName} onChange={e => setPosterName(e.target.value)} placeholder="e.g. Manager Musa" className={input} />
              </>
            ) : (
              <>
                <label className="block text-[11px] font-bold text-gray-400 mt-4">YOUR NAME</label>
                <input value={posterName} onChange={e => setPosterName(e.target.value)} placeholder="e.g. Musa — I need a driver" className={input} />
              </>
            )}

            <label className="block text-[11px] font-bold text-gray-400 mt-3">JOB TITLE</label>
            <input value={role} onChange={e => setRole(e.target.value)} placeholder="e.g. I need Driver – Lagos" className={input} />
            <label className="block text-[11px] font-bold text-gray-400 mt-3">JOB TYPE</label>
            <div className="flex flex-wrap gap-2 mt-2">{['Full-time', 'Part-time', 'Remote', 'Contract'].map(t => (<button key={t} onClick={() => setJtype(t)} className={`px-3 py-2 rounded-full text-[11px] font-bold ${jtype === t ? 'bg-black text-white' : 'bg-gray-100'}`}>{t}</button>))}</div>
            <label className="block text-[11px] font-bold text-gray-400 mt-3">LOCATION / CITY</label>
            <input value={loc} onChange={e => setLoc(e.target.value)} placeholder="e.g. Lagos" className={input} />
            <label className="block text-[11px] font-bold text-gray-400 mt-3">PAY & CURRENCY</label>
            <div className="flex gap-2 mt-1.5">
              <select value={currency} onChange={e => setCurrency(e.target.value)} className="bg-[#F7F3EC] border rounded-[14px] px-2 py-3 text-[13px] outline-none shrink-0"><option>NGN ₦</option><option>USD $</option><option>GBP £</option><option>EUR €</option><option>GHS GH₵</option><option>KES KSh</option><option>AED د.إ</option></select>
              <input value={pay} onChange={e => setPay(e.target.value)} placeholder="e.g. ₦80k/month or Negotiable" className="flex-1 bg-[#F7F3EC] border rounded-[14px] px-3.5 py-3 text-[14px] outline-none min-w-0" />
            </div>
            <label className="block text-[11px] font-bold text-gray-400 mt-3">WHATSAPP / CONTACT</label>
            <input value={contact} onChange={e => setContact(e.target.value)} placeholder="080..." className={input} />
            <label className="block text-[11px] font-bold text-gray-400 mt-3">WRITE HERE... ALLAH IS LISTENING</label>
            <textarea value={details} onChange={e => setDetails(e.target.value)} placeholder="What will the person do? Prayer break allowed?" className={input} />
            <button onClick={postHiring} className="w-full mt-4 bg-[#0F2439] text-white font-extrabold py-3.5 rounded-full text-[14px]">POST →</button>
          </div>

          <div className="px-4 mt-4 flex flex-wrap gap-2">{['All', 'Full-time', 'Part-time', 'Remote', 'Contract'].map(f => (<button key={f} onClick={() => setJobFilter(f)} className={`px-3.5 py-2 rounded-full text-[12px] font-bold ${jobFilter === f ? 'bg-white text-black' : 'bg-white/10 text-white'}`}>{f}</button>))}</div>
          <p className="text-white font-bold px-5 mt-4 text-[14px]">Open Jobs ({filteredJobs.length})</p>
          {filteredJobs.length === 0 && <p className="text-center text-white/50 text-[13px] mt-3 px-6">No jobs yet. Post the first one.</p>}
          {filteredJobs.map(j => (
            <div key={j.id} className="mx-4 mt-3 bg-white rounded-[18px] p-4">
              <p className="font-extrabold text-[14px]">{j.role_title}</p>
              <p className="text-[12px] text-gray-500 mt-0.5">{j.org_name} • {j.location} • {j.job_type} • {j.pay}</p>
              <p className="text-[13px] leading-[1.6] mt-2">{j.details}</p>
              <p className="text-[11px] text-emerald-700 font-bold mt-2">✓ Prayer break allowed • Halal environment</p>
              <div className="flex gap-2 mt-3">
                <a href={`https://wa.me/${j.contact}`} className="flex-1 text-center bg-emerald-600 text-white text-[12px] font-bold py-2.5 rounded-full">Apply →</a>
                <button onClick={() => setSaved(prev => prev.includes(j.id) ? prev.filter(id => id !== j.id) : [...prev, j.id])} className="px-3 py-2.5 bg-gray-100 rounded-full text-[12px] font-bold">{saved.includes(j.id) ? '✓ Saved' : '🔖 Save'}</button>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
      }
