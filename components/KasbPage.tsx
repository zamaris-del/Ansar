import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { notifyAll } from '../lib/notify';

export default function KasbPage({ onBack }: { onBack: () => void }) {
  const [mode, setMode] = useState<'hire' | 'seek'>('hire');
  const [hiring, setHiring] = useState<any[]>([]); const [seekers, setSeekers] = useState<any[]>([]);
  const [jobFilter, setJobFilter] = useState('All'); const [saved, setSaved] = useState<string[]>([]);
  const [org, setOrg] = useState(''); const [role, setRole] = useState(''); const [jtype, setJtype] = useState('Full-time');
  const [loc, setLoc] = useState(''); const [pay, setPay] = useState(''); const [details, setDetails] = useState(''); const [contact, setContact] = useState('');
  const [sName, setSName] = useState(''); const [skill, setSkill] = useState(''); const [exp, setExp] = useState(''); const [sLoc, setSLoc] = useState(''); const [sPay, setSPay] = useState(''); const [sContact, setSContact] = useState('');
  const load = async () => {
    const h = await supabase.from('kasb_hiring').select('*').order('created_at', { ascending: false });
    const s = await supabase.from('kasb_seekers').select('*').order('created_at', { ascending: false });
    setHiring(h.data || []); setSeekers(s.data || []);
  };
  useEffect(() => { load(); }, []);
  const postHiring = async () => {
    if (!role || !contact) return alert('Please enter the role and contact details.');
    const { error } = await supabase.from('kasb_hiring').insert([{ org_name: org, role_title: role, job_type: jtype, location: loc, pay, details, contact }]);
    if (error) return alert(error.message);
    await notifyAll('job', `New Job: ${role} in ${loc}`, `${org || 'Someone'} is hiring for ${role} - ${pay}. Tap to apply.`, 'kasb');
    alert('Job posted successfully. All users have been notified.'); load(); setRole(''); setDetails('');
  };
  const postSeeker = async () => {
    if (!sName || !skill) return alert('Please enter your name and skill.');
    const { error } = await supabase.from('kasb_seekers').insert([{ name: sName, skill, experience: exp, location: sLoc, expected_pay: sPay, contact: sContact }]);
    if (error) return alert(error.message);
    await notifyAll('job', `${sName} is looking for work: ${skill}`, `${sName} is skilled in ${skill} and is based in ${sLoc}.`, 'kasb');
    alert('Your profile has been posted. Employers can now find you.'); load();
  };
  const input = "w-full mt-2 bg-[#F7F3EC] border border-[#E8DDC8] rounded-[16px] px-4 py-3.5 text-[14px] outline-none focus:border-[#D4AF78]";
  const filteredJobs = jobFilter === 'All' ? hiring : hiring.filter(j => j.job_type === jobFilter);
  return (
    <div className="min-h-screen bg-[#0F2439] max-w-[430px] mx-auto pb-[120px]">
      <div className="px-5 pt-4 flex items-center gap-3"><button onClick={onBack} className="w-10 h-10 bg-white/10 rounded-full text-white">←</button><div><h1 className="text-white font-extrabold">KASB — Halal Work</h1><p className="text-[#D4AF78] text-[11px] font-bold">HIRE OR FIND WORK</p></div></div>
      <div className="mx-5 mt-5 bg-white/10 rounded-full p-1 flex">
        <button onClick={() => setMode('hire')} className={`flex-1 py-3 rounded-full text-[13px] font-bold ${mode === 'hire' ? 'bg-white text-black' : 'text-white'}`}>I Want To Hire</button>
        <button onClick={() => setMode('seek')} className={`flex-1 py-3 rounded-full text-[13px] font-bold ${mode === 'seek' ? 'bg-white text-black' : 'text-white'}`}>I Need A Job</button>
      </div>
      {mode === 'hire' ? (
        <>
          <div className="mx-4 mt-4 bg-white rounded-[24px] p-5">
            <p className="font-extrabold">Post A Job — For Individuals and Organisations</p>
            <p className="text-gray-500 text-[12px] mt-1">An Imam's recommendation is your CV. Prayer breaks are allowed.</p>
            <label className="block text-[11px] font-bold text-gray-400 mt-4">YOUR NAME / ORGANISATION NAME</label><input value={org} onChange={e => setOrg(e.target.value)} placeholder="e.g. Al-Noor Bakery / Musa" className={input} />
            <label className="block text-[11px] font-bold text-gray-400 mt-3">ROLE TITLE</label><input value={role} onChange={e => setRole(e.target.value)} placeholder="e.g. Driver, Tailor, Teacher" className={input} />
            <div className="flex gap-2 mt-3">{['Full-time', 'Part-time', 'Remote', 'Contract'].map(t => (<button key={t} onClick={() => setJtype(t)} className={`px-3 py-2 rounded-full text-[11px] font-bold ${jtype === t ? 'bg-black text-white' : 'bg-gray-100'}`}>{t}</button>))}</div>
            <label className="block text-[11px] font-bold text-gray-400 mt-3">LOCATION</label><input value={loc} onChange={e => setLoc(e.target.value)} placeholder="Lagos" className={input} />
            <label className="block text-[11px] font-bold text-gray-400 mt-3">PAY</label><input value={pay} onChange={e => setPay(e.target.value)} placeholder="₦80,000 per month" className={input} />
            <label className="block text-[11px] font-bold text-gray-400 mt-3">DETAILS</label><textarea value={details} onChange={e => setDetails(e.target.value)} placeholder="What will the person do?" className={input} />
            <label className="block text-[11px] font-bold text-gray-400 mt-3">WHATSAPP / CONTACT</label><input value={contact} onChange={e => setContact(e.target.value)} placeholder="080..." className={input} />
            <button onClick={postHiring} className="w-full mt-4 bg-[#D4AF78] font-extrabold py-4 rounded-full">POST JOB → NOTIFY EVERYONE</button>
          </div>
          <div className="px-5 mt-5 flex gap-2 overflow-x-auto no-scrollbar">{['All', 'Full-time', 'Part-time', 'Remote', 'Contract'].map(f => (<button key={f} onClick={() => setJobFilter(f)} className={`px-4 py-2 rounded-full text-[12px] font-bold whitespace-nowrap ${jobFilter === f ? 'bg-white text-black' : 'bg-white/10 text-white'}`}>{f}</button>))}</div>
          <p className="text-white font-bold px-5 mt-4">Open Jobs ({filteredJobs.length})</p>
          {filteredJobs.map(j => (
            <div key={j.id} className="mx-4 mt-3 bg-white rounded-[20px] p-4">
              <p className="font-extrabold">{j.role_title}</p><p className="text-[12px] text-gray-500">{j.org_name} • {j.location} • {j.job_type} • {j.pay}</p><p className="text-[13px] mt-2">{j.details}</p>
              <p className="text-[11px] text-emerald-700 font-bold mt-2">✓ Verified — Prayer break allowed • Halal environment</p>
              <div className="flex gap-2 mt-3"><a href={`https://wa.me/${j.contact}`} className="flex-1 text-center bg-emerald-600 text-white text-[12px] font-bold py-2.5 rounded-full">Apply →</a><button onClick={() => setSaved(prev => prev.includes(j.id) ? prev.filter(id => id !== j.id) : [...prev, j.id])} className="px-3 py-2.5 bg-gray-100 rounded-full text-[12px] font-bold">{saved.includes(j.id) ? '✓ Saved' : '🔖 Save'}</button></div>
            </div>
          ))}
        </>
      ) : (
        <>
          <div className="mx-4 mt-4 bg-white rounded-[24px] p-5">
            <p className="font-extrabold">I Need A Job — Show Your Skill</p>
            <label className="block text-[11px] font-bold text-gray-400 mt-4">YOUR NAME</label><input value={sName} onChange={e => setSName(e.target.value)} placeholder="Your name" className={input} />
            <label className="block text-[11px] font-bold text-gray-400 mt-3">YOUR SKILL</label><input value={skill} onChange={e => setSkill(e.target.value)} placeholder="e.g. Driving, Tailoring, Teaching Quran" className={input} />
            <label className="block text-[11px] font-bold text-gray-400 mt-3">EXPERIENCE</label><input value={exp} onChange={e => setExp(e.target.value)} placeholder="e.g. 3 years" className={input} />
            <label className="block text-[11px] font-bold text-gray-400 mt-3">LOCATION</label><input value={sLoc} onChange={e => setSLoc(e.target.value)} placeholder="Lagos" className={input} />
            <label className="block text-[11px] font-bold text-gray-400 mt-3">EXPECTED PAY</label><input value={sPay} onChange={e => setSPay(e.target.value)} placeholder="₦60,000 per month" className={input} />
            <label className="block text-[11px] font-bold text-gray-400 mt-3">WHATSAPP</label><input value={sContact} onChange={e => setSContact(e.target.value)} placeholder="080..." className={input} />
            <button onClick={postSeeker} className="w-full mt-4 bg-black text-white font-extrabold py-4 rounded-full">POST MY PROFILE →</button>
          </div>
          <p className="text-white font-bold px-5 mt-5">People Looking For Work ({seekers.length})</p>
          {seekers.map(s => (
            <div key={s.id} className="mx-4 mt-3 bg-white rounded-[20px] p-4"><p className="font-extrabold">{s.name} — {s.skill}</p><p className="text-[12px] text-gray-500">{s.location} • {s.experience} • Expects {s.expected_pay}</p><a href={`https://wa.me/${s.contact}`} className="inline-block mt-3 bg-black text-white text-[12px] font-bold px-4 py-2 rounded-full">Hire {s.name} →</a></div>
          ))}
        </>
      )}
    </div>
  );
          }
