import { useState } from 'react';
import { supabase } from '../lib/supabase';

export default function SOSPage({ onBack }: any) {
  const [step, setStep] = useState(1);
  const [category, setCategory] = useState('');
  const [gender, setGender] = useState('Brother');
  const [location, setLocation] = useState('');
  const [safeToCall, setSafeToCall] = useState('Yes call me');
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const cats = [
    { label: 'Domestic Violence', emoji: '🆘', desc: 'Husband / family dey hurt you' },
    { label: 'Suicide Thought', emoji: '💔', desc: 'You dey think to harm yourself' },
    { label: 'Thrown Out of House', emoji: '🏠', desc: 'Family don throway you' },
    { label: 'Stranded / No Food / No Shelter', emoji: '🍲', desc: 'No food, no place to sleep' },
    { label: 'Medical Emergency', emoji: '🏥', desc: 'Sick, need hospital now' },
    { label: 'Other Emergency', emoji: '🚨', desc: 'Other wahala' },
  ];

  const sendSOS = async () => {
    if (!category || !message.trim()) { alert('Pick category + type wetin happen'); return; }
    setSending(true);
    const { error } = await supabase.from('sos_alerts').insert({ name: name || 'Anonymous', phone, category, location, safe_to_call: safeToCall, message, gender, status: 'OPEN' });
    if (error) { alert('Failed: ' + error.message); setSending(false); return; }
    setSending(false); setSent(true);
  };

  if (sent) return (
    <div className="min-h-screen bg-[#FFF1F2] p-6 flex flex-col items-center justify-center text-center">
      <div className="text-[60px]">✅</div>
      <h1 className="text-[22px] font-black mt-4">SOS Don Send. We Dey Come.</h1>
      <p className="text-[13px] text-gray-600 mt-3 leading-6">Imam + 3 nearest verified volunteers (same gender) don get your alert.<br/>Stay on this screen. Keep your phone on.<br/>If e be life or death, call 112 / 199 now.</p>
      <div className="mt-5 bg-white rounded-2xl p-4 w-full text-left border">
        <p className="text-[11px] font-bold">Your SOS:</p>
        <p className="text-[12px] mt-1">{category} • {gender}</p>
        <p className="text-[12px] text-gray-500">{location || 'Location not shared'}</p>
        <p className="text-[12px] mt-1">{message}</p>
        <p className="text-[11px] text-green-600 font-bold mt-2">Status: OPEN • Responders go update you</p>
      </div>
      <button onClick={onBack} className="mt-6 bg-black text-white px-8 py-3 rounded-full text-[12px] font-black">BACK TO HOME</button>
      <a href="tel:112" className="mt-3 bg-red-600 text-white px-8 py-3 rounded-full text-[12px] font-black">📞 CALL EMERGENCY 112</a>
    </div>
  );

  return (
    <div className="min-h-screen bg-white pb-24">
      <header className="sticky top-0 bg-red-600 text-white p-4 flex items-center gap-3 z-10">
        <button onClick={onBack} className="bg-white/20 px-4 py-2 rounded-full text-[11px] font-bold">← Back</button>
        <span className="font-black text-[14px]">🔴 SOS - I NEED HELP NOW</span>
      </header>
      <div className="p-5">
        <p className="text-[12px] text-gray-500">No shame. No judgment. We go reach you. Step {step} of 3</p>
        {step === 1 && (
          <div>
            <h2 className="font-black text-[18px] mt-3">What happen?</h2>
            <div className="mt-3 space-y-2">{cats.map(c => (
              <button key={c.label} onClick={() => { setCategory(c.label); setStep(2); }} className={`w-full text-left p-4 rounded-2xl border ${category === c.label ? 'border-red-600 bg-red-50' : 'border-gray-200 bg-white'}`}>
                <p className="font-bold text-[13px]">{c.emoji} {c.label}</p><p className="text-[11px] text-gray-500">{c.desc}</p>
              </button>
            ))}</div>
          </div>
        )}
        {step === 2 && (
          <div>
            <h2 className="font-black text-[18px] mt-3">Where you dey? Safe to call?</h2>
            <div className="mt-4 space-y-3">
              <div>
                <p className="text-[11px] font-bold">You be Brother or Sister?</p>
                <div className="flex gap-2 mt-1">
                  <button onClick={() => setGender('Brother')} className={`flex-1 py-3 rounded-full text-[12px] font-bold ${gender === 'Brother' ? 'bg-black text-white' : 'bg-gray-100'}`}>Brother</button>
                  <button onClick={() => setGender('Sister')} className={`flex-1 py-3 rounded-full text-[12px] font-bold ${gender === 'Sister' ? 'bg-black text-white' : 'bg-gray-100'}`}>Sister</button>
                </div>
              </div>
              <input value={location} onChange={e => setLocation(e.target.value)} placeholder="Area / City / Landmark e.g. Enugu, Holy Ghost" className="w-full p-3.5 rounded-xl border text-[13px]" />
              <div>
                <p className="text-[11px] font-bold">Safe to call you?</p>
                <div className="flex gap-2 mt-1 flex-wrap">
                  {['Yes call me', 'No, only chat', 'No, send someone'].map(s => (
                    <button key={s} onClick={() => setSafeToCall(s)} className={`px-4 py-2.5 rounded-full text-[11px] font-bold ${safeToCall === s ? 'bg-red-600 text-white' : 'bg-gray-100'}`}>{s}</button>
                  ))}
                </div>
              </div>
              <input value={name} onChange={e => setName(e.target.value)} placeholder="Your name (or leave anonymous)" className="w-full p-3.5 rounded-xl border text-[13px]" />
              <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="Phone / WhatsApp (if safe)" className="w-full p-3.5 rounded-xl border text-[13px]" />
              <button onClick={() => setStep(3)} className="w-full bg-black text-white py-4 rounded-full text-[12px] font-black">NEXT →</button>
            </div>
          </div>
        )}
        {step === 3 && (
          <div>
            <h2 className="font-black text-[18px] mt-3">Tell us wetin happen</h2>
            <p className="text-[11px] text-gray-500 mt-1">You fit type, no need talk. Only verified responders go see am.</p>
            <textarea value={message} onChange={e => setMessage(e.target.value)} rows={5} placeholder="Type wetin happen... e.g. My husband dey beat me, I dey hide for bathroom, I need help now..." className="w-full mt-3 p-3.5 rounded-xl border text-[13px]" />
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 mt-3">
              <p className="text-[11px] font-bold">🔒 Privacy:</p>
              <p className="text-[11px] text-gray-600 leading-5">Location only share with verified Imam + responders. Auto-delete after 24 hours. No screenshot, no gossip.</p>
            </div>
            <button onClick={sendSOS} disabled={sending} className="w-full mt-4 bg-red-600 text-white py-4 rounded-full text-[12px] font-black tracking-widest">🚨 SEND SOS NOW</button>
            <button onClick={() => setStep(2)} className="w-full mt-2 py-3 text-[11px] font-bold text-gray-500">← Back</button>
          </div>
        )}
      </div>
    </div>
  );
                       }
