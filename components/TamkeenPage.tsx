import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { notifyAll } from '../lib/notify';

type Mode = 'need' | 'help-individual' | 'help-organization';

export default function TamkeenPage({ onBack }: { onBack: () => void }) {
  const [mode, setMode] = useState<Mode>('need');
  const [requests, setRequests] = useState<any[]>([]);
  const [supported, setSupported] = useState<string[]>([]);

  // NEED HELP FIELDS
  const [type, setType] = useState('Small Business Grant');
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('NGN ₦');
  const [story, setStory] = useState('');
  const [contact, setContact] = useState('');

  // WANT TO HELP FIELDS
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

  const input = "w-full mt-1.5 bg-[#F7F3EC] border rounded-[14px] px-3.5 py-3 text-[14px] outline-none";

  return (
    <div className="min-h-screen bg-[#0F2439] w-full max-w-[430px] mx-auto pb-[110px] overflow-x-hidden">
      <div className="px-4 pt-4 flex items-center gap-3">
        <button onClick={onBack} className="w-10 h-10 shrink-0 bg-white/10 rounded-full text-white">←</button>
        <div><h1 className="text-white font-extrabold text-[18px]">TAMKEEN</h1><p className="text-[#D4AF78] text-[10px] font-bold">EMPOWER, DON'T PITY • GROW WITH DIGNITY</p></div>
      </div>

      <div className="mx-4 mt-4 bg-white rounded-[22px] p-4">
        <p className="font-extrabold text-[15px]">How Tamkeen Works</p>
        <p className="text-[12px] text-gray-500 leading-[1.65] mt-1">You share your plan — a business, a skill, school fees. The Ummah supports you with money, mentorship, or training. You grow and later help someone else.</p>
      </div>

      {/* === THE 3-WAY CHOICE === */}
      <div className="mx-4 mt-3 bg-white rounded-[20px] p-2">
        <p className="text-[11px] font-bold text-gray-400 px-2 pt-1 pb-2">WHO ARE YOU?</p>
        <div className="grid grid-cols-3 gap-1.5">
          <button onClick={() => setMode('need')} className={`py-3 px-1 rounded-[14px] text-[11px] font-bold leading-tight ${mode === 'need' ? 'bg-black text-white' : 'bg-gray-100 text-gray-600'}`}>🙋<br />I Need<br />Help</button>
          <button onClick={() => setMode('help-individual')} className={`py-3 px-1 rounded-[14px] text-[11px] font-bold leading-tight ${mode === 'help-individual' ? 'bg-black text-white' : 'bg-gray-100 text-gray-600'}`}>👤<br />I Want To Help<br />Individual</button>
          <button onClick={() => setMode('help-organization')} className={`py-3 px-1 rounded-[14px] text-[11px] font-bold leading-tight ${mode === 'help-organization' ? 'bg-black text-white' : 'bg-gray-100 text-gray-600'}`}>🏢<br />I Want To Help<br />Organization</button>
        </div>
        <p className="text-[11px] text-gray-500 px-2 pt-2 pb-1 leading-[1.5]">
          {mode === 'need' && 'You need support. Tell your story and plan, the Ummah will empower you.'}
          {mode === 'help-individual' && 'You are one person who wants to help — with money, mentorship or skill.'}
          {mode === 'help-organization' && 'You are a company, masjid, school or NGO that wants to empower people.'}
        </p>
      </div>

      {/* === I NEED HELP FORM === */}
      {mode === 'need' ? (
        <div className="mx-4 mt-3 bg-white rounded-[22px] p-4">
          <p className="font-extrabold text-[16px]">Request Empowerment</p>
          <label className="block text-[11px] font-bold text-gray-400 mt-4">WHAT DO YOU NEED?</label>
          <div className="flex flex-wrap gap-2 mt-2">{['Small Business Grant', 'Skill Training', 'Mentorship', 'School Fees'].map(t => (<button key={t} onClick={() => setType(t)} className={`px-3 py-2 rounded-full text-[11px] font-bold ${type === t ? 'bg-black text-white' : 'bg-gray-100'}`}>{t}</button>))}</div>
          <label className="block text-[11px] font-bold text-gray-400 mt-4">AMOUNT NEEDED & CURRENCY</label>
          <div className="flex gap-2 mt-1.5">
            <select value={currency} onChange={e => setCurrency(e.target.value)} className="bg-[#F7F3EC] border rounded-[14px] px-2 py-3 text-[13px] outline-none shrink-0"><option>NGN ₦</option><option>USD $</option><option>GBP £</option><option>EUR €</option><option>GHS GH₵</option><option>KES KSh</option><option>AED د.إ</option></select>
            <input value={amount} onChange={e => setAmount(e.target.value)} placeholder="e.g. 50,000" className="flex-1 bg-[#F7F3EC] border rounded-[14px] px-3.5 py-3 text-[14px] outline-none min-w-0" />
          </div>
          <label className="block text-[11px] font-bold text-gray-400 mt-3">YOUR STORY / PLAN</label>
          <textarea value={story} onChange={e => setStory(e.target.value)} placeholder="What will you do with it? How will it help you become stable? Be specific — people support clear plans." className={input} />
          <label className="block text-[11px] font-bold text-gray-400 mt-3">CONTACT (WHATSAPP)</label>
          <input value={contact} onChange={e => setContact(e.target.value)} placeholder="WhatsApp number" className={input} />
          <button onClick={postNeed} className="w-full mt-4 bg-emerald-600 text-white font-extrabold py-3.5 rounded-full text-[14px]">Submit Request →</button>
        </div>
      ) : (
        /* === I WANT TO HELP FORM — INDIVIDUAL OR ORGANIZATION === */
        <div className="mx-4 mt-3 bg-white rounded-[22px] p-4">
          <p className="font-extrabold text-[16px]">{mode === 'help-organization' ? 'Offer Help — As Organization' : 'Offer Help — As Individual'}</p>
          <p className="text-[12px] text-gray-500 leading-[1.6] mt-1">JazakAllah Khair for wanting to help. Tell us how you want to empower someone.</p>

          {mode === 'help-organization' ? (
            <>
              <label className="block text-[11px] font-bold text-gray-400 mt-4">ORGANIZATION NAME</label>
              <input value={orgName} onChange={e => setOrgName(e.target.value)} placeholder="e.g. Al-Noor Foundation, Central Mosque" className={input} />
              <label className="block text-[11px] font-bold text-gray-400 mt-3">CONTACT PERSON NAME</label>
              <input value={helperName} onChange={e => setHelperName(e.target.value)} placeholder="e.g. Manager Musa" className={input} />
            </>
          ) : (
            <>
              <label className="block text-[11px] font-bold text-gray-400 mt-4">YOUR NAME</label>
              <input value={helperName} onChange={e => setHelperName(e.target.value)} placeholder="e.g. Musa Ibrahim" className={input} />
            </>
          )}

          <label className="block text-[11px] font-bold text-gray-400 mt-3">HOW DO YOU WANT TO HELP?</label>
          <div className="flex flex-wrap gap-2 mt-2">{['Money', 'Mentorship', 'Skill Training', 'Job / Work', 'School Fees'].map(t => (<button key={t} onClick={() => setHelpType(t)} className={`px-3 py-2 rounded-full text-[11px] font-bold ${helpType === t ? 'bg-black text-white' : 'bg-gray-100'}`}>{t}</button>))}</div>

          {helpType === 'Money' && (
            <>
              <label className="block text-[11px] font-bold text-gray-400 mt-3">HOW MUCH CAN YOU GIVE? & CURRENCY</label>
              <div className="flex gap-2 mt-1.5">
                <select value={helpCurrency} onChange={e => setHelpCurrency(e.target.value)} className="bg-[#F7F3EC] border rounded-[14px] px-2 py-3 text-[13px] outline-none shrink-0"><option>NGN ₦</option><option>USD $</option><option>GBP £</option><option>EUR €</option><option>GHS GH₵</option><option>KES KSh</option><option>AED د.إ</option></select>
                <input value={helpAmount} onChange={e => setHelpAmount(e.target.value)} placeholder="e.g. 50,000 or Any Amount" className="flex-1 bg-[#F7F3EC] border rounded-[14px] px-3.5 py-3 text-[14px] outline-none min-w-0" />
              </div>
            </>
          )}

          <label className="block text-[11px] font-bold text-gray-400 mt-3">YOUR MESSAGE / WHAT YOU CAN OFFER</label>
          <textarea value={helpMessage} onChange={e => setHelpMessage(e.target.value)} placeholder={mode === 'help-organization' ? "e.g. We can sponsor 5 students, or train 10 youths in tailoring..." : "e.g. I can mentor someone in business, or give small support..."} className={input} />
          <label className="block text-[11px] font-bold text-gray-400 mt-3">CONTACT (WHATSAPP)</label>
          <input value={helperContact} onChange={e => setHelperContact(e.target.value)} placeholder="WhatsApp number" className={input} />
          <button onClick={postHelp} className="w-full mt-4 bg-emerald-600 text-white font-extrabold py-3.5 rounded-full text-[14px]">Offer My Help →</button>
        </div>
      )}

      <p className="px-5 mt-4 text-white font-bold text-[14px]">Tamkeen Board {requests.length > 0 && `(${requests.length})`}</p>
      {requests.length === 0 && <div className="mx-4 mt-3 bg-white/5 border border-white/10 rounded-[18px] p-5 text-center"><p className="text-[28px]">🌱</p><p className="text-white font-bold text-[14px] mt-2">No posts yet</p><p className="text-white/50 text-[12px] mt-1">Be the first — either ask for help or offer help.</p></div>}
      {requests.map(r => (
        <div key={r.id} className="mx-4 mt-3 bg-white rounded-[18px] p-4">
          <div className="flex justify-between gap-2"><p className="font-extrabold text-[14px] leading-tight">{r.need_type}</p><span className="text-[12px] font-bold shrink-0">{r.amount}</span></div>
          <p className="text-[13px] leading-[1.6] text-gray-600 mt-2">{r.story}</p>
          <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-gray-100">
            <button onClick={() => setSupported(prev => prev.includes(r.id) ? prev.filter(id => id !== r.id) : [...prev, r.id])} className={`flex-1 py-3 rounded-full text-[13px] font-bold min-w-[140px] ${supported.includes(r.id) ? 'bg-emerald-600 text-white' : 'bg-black text-white'}`}>{supported.includes(r.id) ? '✓ You Are Supporting' : r.need_type.includes('WANTS TO HELP') ? 'Contact Helper →' : 'Support This Person →'}</button>
            <button className="px-4 py-3 bg-gray-100 rounded-full text-[13px] font-bold">Mentor</button>
          </div>
        </div>
      ))}
    </div>
  );
                                                                      }
