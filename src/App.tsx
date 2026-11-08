import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_ANON_KEY!
);

// ===== SOS =====
function SOSPage({ onBack }: any) {
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
    const { error } = await supabase.from('sos_alerts').insert({
      name: name || 'Anonymous', phone, category, location, safe_to_call: safeToCall, message, gender, status: 'OPEN'
    });
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
            ))}
            </div>
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

// ===== SU'AL =====
function SualPage({ onBack }: any) {
  const [qs, setQs] = useState<any[]>([]);
  const [question, setQuestion] = useState('');
  const [category, setCategory] = useState('Fiqh');
  const [isAnon, setIsAnon] = useState(true);
  const [name, setName] = useState('');
  const load = async () => {
    const { data } = await supabase.from('sual_questions').select('*').order('created_at', { ascending: false });
    if (data) setQs(data);
  };
  useEffect(() => { load(); }, []);
  const send = async () => {
    if (!question.trim()) return;
    await supabase.from('sual_questions').insert({ question: question.trim(), category, is_anonymous: isAnon, asker_name: isAnon ? 'Anonymous' : name || 'Anonymous' });
    setQuestion(''); load();
  };
  return (
    <div className="min-h-screen bg-[#F9F7F4] pb-24">
      <header className="sticky top-0 bg-white p-4 border-b flex items-center gap-3 z-10"><button onClick={onBack} className="bg-black/10 px-4 py-2 rounded-full text-[11px] font-bold">← Back</button><span className="font-black text-[13px]">❓ SU'AL - Ask Without Shame</span></header>
      <div className="p-4">
        <div className="bg-[#0A1930] rounded-2xl p-4 text-white">
          <p className="text-[11px] text-[#D4AF78] font-bold tracking-widest">NO SHAME • NO NAME • NO JUDGMENT</p>
          <p className="text-[12px] text-white/70 mt-2 leading-6">Ask anything. Doubt, Fiqh, family wahala. Only kind scholars go answer. Harsh answer = ban.</p>
        </div>
        <div className="bg-white rounded-2xl border p-4 mt-4">
          <div className="flex gap-2">
            {['Fiqh', 'Doubt', 'Crisis'].map(c => <button key={c} onClick={() => setCategory(c)} className={`px-4 py-2 rounded-full text-[11px] font-bold ${category === c ? (c === 'Fiqh' ? 'bg-green-600 text-white' : c === 'Doubt' ? 'bg-yellow-500 text-black' : 'bg-red-600 text-white') : 'bg-gray-100'}`}>{c === 'Fiqh' ? '🟢 Fiqh' : c === 'Doubt' ? '🟡 Doubt' : '🔴 Crisis'}</button>)}
          </div>
          <label className="flex items-center gap-2 mt-3 text-[12px] font-bold"><input type="checkbox" checked={isAnon} onChange={e => setIsAnon(e.target.checked)} className="w-4 h-4" /> Ask Anonymous</label>
          {!isAnon && <input value={name} onChange={e => setName(e.target.value)} placeholder="Your name" className="w-full mt-2 p-3 rounded-xl border text-[13px]" />}
          <textarea value={question} onChange={e => setQuestion(e.target.value)} rows={3} placeholder="Ask your question... e.g. I dey doubt my Iman, wetin I go do?" className="w-full mt-3 p-3 rounded-xl border text-[13px]" />
          <button onClick={send} className="w-full mt-2 bg-[#0A1930] text-[#D4AF78] py-3.5 rounded-full text-[11px] font-black">ASK NOW →</button>
        </div>
        <div className="mt-4 space-y-3">
          {qs.map(q => (
            <div key={q.id} className="bg-white rounded-2xl border p-4">
              <div className="flex justify-between"><span className={`text-[10px] font-black px-2 py-1 rounded-full ${q.category === 'Fiqh' ? 'bg-green-100 text-green-700' : q.category === 'Doubt' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>{q.category}</span><span className="text-[10px] text-gray-400">{new Date(q.created_at).toLocaleDateString()}</span></div>
              <p className="font-bold text-[13px] mt-2">Q: {q.question}</p>
              <p className="text-[11px] text-gray-500">By: {q.is_anonymous ? 'Anonymous' : q.asker_name}</p>
              {q.answer ? <div className="mt-3 bg-green-50 border-l-4 border-green-600 p-3 rounded-r-xl"><p className="text-[11px] font-black text-green-700">Answer by {q.scholar_name || 'Scholar'}:</p><p className="text-[13px] mt-1">{q.answer}</p></div> : <p className="text-[11px] text-orange-600 mt-3 font-bold">⏳ Waiting for kind scholar to answer...</p>}
            </div>
          ))}
          {qs.length === 0 && <p className="text-center text-gray-400 text-[12px] py-8">No question yet. Be first to ask.</p>}
        </div>
      </div>
    </div>
  );
}

// ===== SUHBA =====
function SuhbaPage({ onBack }: any) {
  const [pairs, setPairs] = useState<any[]>([]);
  const [type, setType] = useState('Revert Anchor');
  const [a, setA] = useState(''); const [b, setB] = useState(''); const [city, setCity] = useState('');
  const load = async () => { const { data } = await supabase.from('suhba_pairs').select('*').order('created_at', { ascending: false }); if (data) setPairs(data); };
  useEffect(() => { load(); }, []);
  const add = async () => {
    if (!a.trim() || !b.trim()) { alert('Put both names'); return; }
    await supabase.from('suhba_pairs').insert({ type, person_a: a, person_b: b, city, status: 'GREEN' });
    setA(''); setB(''); setCity(''); load();
  };
  const markCheck = async (id: string) => {
    await supabase.from('suhba_pairs').update({ last_check: new Date().toISOString(), status: 'GREEN' }).eq('id', id); load();
  };
  const getStatus = (p: any) => {
    const days = (Date.now() - new Date(p.last_check).getTime()) / (1000 * 60 * 60 * 24);
    if (days >= 14) return { label: '🔴 RED - ACTION NOW', cls: 'bg-red-100 text-red-700' };
    if (days >= 7) return { label: '🟡 YELLOW - 7 days no show', cls: 'bg-yellow-100 text-yellow-700' };
    return { label: '🟢 GREEN - Okay', cls: 'bg-green-100 text-green-700' };
  };
  return (
    <div className="min-h-screen bg-[#F9F7F4] pb-24">
      <header className="sticky top-0 bg-white p-4 border-b flex items-center gap-3 z-10"><button onClick={onBack} className="bg-black/10 px-4 py-2 rounded-full text-[11px] font-bold">← Back</button><span className="font-black text-[13px]">🤝 SUHBA - My Circle</span></header>
      <div className="p-4">
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="bg-white rounded-xl border p-3"><p className="text-[18px]">🌱</p><p className="text-[10px] font-bold mt-1">Revert Anchor</p><p className="text-[9px] text-gray-500">1 new Muslim + 1 Anchor</p></div>
          <div className="bg-white rounded-xl border p-3"><p className="text-[18px]">👥</p><p className="text-[10px] font-bold mt-1">Lonely Circle</p><p className="text-[9px] text-gray-500">Circle of 5</p></div>
          <div className="bg-white rounded-xl border p-3"><p className="text-[18px]">👴</p><p className="text-[10px] font-bold mt-1">Elder Guardian</p><p className="text-[9px] text-gray-500">1 elder + 1 Guardian</p></div>
        </div>
        <div className="bg-white rounded-2xl border p-4 mt-4">
          <h3 className="font-black text-[13px]">+ Add New Pair / Circle</h3>
          <div className="flex gap-2 mt-3 flex-wrap">{['Revert Anchor', 'Lonely Circle', 'Elder Guardian'].map(t => <button key={t} onClick={() => setType(t)} className={`px-3 py-2 rounded-full text-[11px] font-bold ${type === t ? 'bg-black text-white' : 'bg-gray-100'}`}>{t}</button>)}</div>
          <input value={a} onChange={e => setA(e.target.value)} placeholder="Person A e.g. Chidinma (Revert)" className="w-full mt-3 p-3 rounded-xl border text-[13px]" />
          <input value={b} onChange={e => setB(e.target.value)} placeholder="Person B e.g. Maryam (Anchor)" className="w-full mt-2 p-3 rounded-xl border text-[13px]" />
          <input value={city} onChange={e => setCity(e.target.value)} placeholder="City e.g. Enugu" className="w-full mt-2 p-3 rounded-xl border text-[13px]" />
          <button onClick={add} className="w-full mt-2 bg-[#0A1930] text-[#D4AF78] py-3.5 rounded-full text-[11px] font-black">ADD PAIR →</button>
        </div>
        <h3 className="font-black text-[13px] mt-5">Coordinator Dashboard - {pairs.length} pairs</h3>
        <div className="mt-3 space-y-3">
          {pairs.map(p => { const s = getStatus(p); return (
            <div key={p.id} className="bg-white rounded-2xl border p-4">
              <div className="flex justify-between"><span className="text-[11px] font-bold">{p.type}</span><span className={`text-[10px] font-black px-2 py-1 rounded-full ${s.cls}`}>{s.label}</span></div>
              <p className="text-[13px] mt-2 font-bold">{p.person_a} + {p.person_b}</p>
              <p className="text-[11px] text-gray-500">{p.city} • Last check: {new Date(p.last_check).toLocaleDateString()}</p>
              <button onClick={() => markCheck(p.id)} className="mt-2 bg-green-600 text-white px-4 py-2 rounded-full text-[11px] font-bold">✅ Mark Checked Today</button>
            </div>
          ); })}
          {pairs.length === 0 && <p className="text-center text-gray-400 text-[12px] py-6">No pair yet. Add your first revert + anchor.</p>}
        </div>
      </div>
    </div>
  );
}

// ===== HOME =====
export default function App() {
  const [page, setPage] = useState('home');
  return (
    <div className="pb-[70px]">
      {page === 'sos' && <SOSPage onBack={() => setPage('home')} />}
      {page === 'sual' && <SualPage onBack={() => setPage('home')} />}
      {page === 'suhba' && <SuhbaPage onBack={() => setPage('home')} />}
      {page === 'home' && (
        <div className="min-h-screen bg-[#F9F7F4]">
          <div className="bg-[#0A1930] p-6 pb-8 text-white rounded-b-[24px]">
            <div className="flex justify-between items-center"><span className="text-[10px] tracking-[0.3em] text-[#D4AF78] font-bold">ANSAR • الأنصار</span><span className="text-[10px] bg-white/10 px-3 py-1 rounded-full">🟢 18 Muslims Online</span></div>
            <h1 className="text-[28px] font-black leading-tight mt-6">No Muslim<br/><span className="text-[#D4AF78]">Left Alone.</span></h1>
            <p className="text-[12px] text-white/60 mt-2 leading-6">From doubt to marriage to job to help to Jannah. One family.</p>
            <button onClick={() => setPage('sos')} className="w-full mt-5 bg-red-600 text-white py-4 rounded-full text-[13px] font-black tracking-widest shadow-[0_0_20px_rgba(255,0,0,0.5)] animate-pulse">🔴 SOS - I NEED HELP NOW</button>
            <p className="text-[10px] text-center text-white/50 mt-2">Tap for emergency - Imam + volunteers go reach you</p>
          </div>
          <div className="p-4">
            <p className="text-[11px] font-black tracking-widest text-gray-500">TODAY FOR YOU • PHASE 1 - SAVE</p>
            <div className="grid grid-cols-2 gap-3 mt-3">
              <div onClick={() => setPage('sual')} className="bg-white rounded-2xl border p-4 cursor-pointer"><p className="text-[22px]">❓</p><p className="font-black text-[13px] mt-2">SU'AL</p><p className="text-[11px] text-gray-500">Ask Without Shame</p><span className="inline-block mt-2 bg-green-100 text-green-700 text-[9px] font-black px-2 py-1 rounded-full">● LIVE</span></div>
              <div onClick={() => setPage('suhba')} className="bg-white rounded-2xl border p-4 cursor-pointer"><p className="text-[22px]">🤝</p><p className="font-black text-[13px] mt-2">SUHBA</p><p className="text-[11px] text-gray-500">My Circle</p><span className="inline-block mt-2 bg-green-100 text-green-700 text-[9px] font-black px-2 py-1 rounded-full">● LIVE</span></div>
              <div onClick={() => setPage('sos')} className="bg-red-50 rounded-2xl border border-red-200 p-4 cursor-pointer"><p className="text-[22px]">🚨</p><p className="font-black text-[13px] mt-2">SOS</p><p className="text-[11px] text-gray-500">I Need Help Now</p><span className="inline-block mt-2 bg-red-600 text-white text-[9px] font-black px-2 py-1 rounded-full">● ALWAYS ON</span></div>
              <div className="bg-white rounded-2xl border p-4 opacity-60"><p className="text-[22px]">🤲</p><p className="font-black text-[13px] mt-2">DUA</p><p className="text-[11px] text-gray-500">Make Dua For Me</p><span className="inline-block mt-2 bg-gray-100 text-gray-500 text-[9px] font-black px-2 py-1 rounded-full">COMING - PHASE 2</span></div>
            </div>
            <p className="text-[11px] font-black tracking-widest text-gray-500 mt-6">BUILD YOUR FUTURE • PHASE 2</p>
            <div className="grid grid-cols-2 gap-3 mt-3">
              <div className="bg-white rounded-2xl border p-4 opacity-60"><p className="text-[22px]">💼</p><p className="font-black text-[13px] mt-2">KASB</p><p className="text-[11px] text-gray-500">Halal Work</p><span className="inline-block mt-2 bg-gray-100 text-gray-500 text-[9px] font-black px-2 py-1 rounded-full">COMING - PHASE 2</span></div>
              <div className="bg-white rounded-2xl border p-4 opacity-60"><p className="text-[22px]">💍</p><p className="font-black text-[13px] mt-2">NIKAH</p><p className="text-[11px] text-gray-500">Marriage With Wali</p><span className="inline-block mt-2 bg-gray-100 text-gray-500 text-[9px] font-black px-2 py-1 rounded-full">COMING - PHASE 2</span></div>
            </div>
            <p className="text-[11px] font-black tracking-widest text-gray-500 mt-6">GROW • PHASE 3</p>
            <div className="grid grid-cols-2 gap-3 mt-3">
              <div className="bg-white rounded-2xl border p-4 opacity-60"><p className="text-[22px]">🌱</p><p className="font-black text-[13px] mt-2">TAMKEEN</p><p className="text-[11px] text-gray-500">Empower</p><span className="inline-block mt-2 bg-gray-100 text-gray-500 text-[9px] font-black px-2 py-1 rounded-full">COMING - PHASE 3</span></div>
              <div className="bg-white rounded-2xl border p-4 opacity-60"><p className="text-[22px]">📖</p><p className="font-black text-[13px] mt-2">MADRASAH</p><p className="text-[11px] text-gray-500">Learn Slowly</p><span className="inline-block mt-2 bg-gray-100 text-gray-500 text-[9px] font-black px-2 py-1 rounded-full">COMING - PHASE 3</span></div>
              <div className="bg-white rounded-2xl border p-4 opacity-60"><p className="text-[22px]">🕌</p><p className="font-black text-[13px] mt-2">MASJID PULSE</p><p className="text-[11px] text-gray-500">Your Masjid Alive?</p><span className="inline-block mt-2 bg-gray-100 text-gray-500 text-[9px] font-black px-2 py-1 rounded-full">COMING - PHASE 3</span></div>
              <div className="bg-white rounded-2xl border p-4 opacity-60"><p className="text-[22px]">💧</p><p className="font-black text-[13px] mt-2">WAQF</p><p className="text-[11px] text-gray-500">₦100 Daily Sadaqah</p><span className="inline-block mt-2 bg-gray-100 text-gray-500 text-[9px] font-black px-2 py-1 rounded-full">COMING - PHASE 3</span></div>
            </div>
          </div>
          <footer className="bg-[#080F2A] text-white p-6 pb-28">
            <h3 className="font-black tracking-[0.3em] text-[13px]">ANSAR</h3>
            <p className="text-[10px] text-[#D4AF78] tracking-[0.3em] mt-1 font-bold">الأنصار • NO MUSLIM LEFT ALONE</p>
            <p className="text-[11px] text-gray-400 mt-4 leading-6">One app wey go hold Muslim for every stage of life. If you enter ANSAR, you no go need 10 other apps.</p>
            <p className="text-[9px] text-gray-600 mt-6">© 2026 ANSAR. From Shahada to Jannah.</p>
          </footer>
        </div>
      )}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur border-t flex justify-around py-3.5 z-50">
        <button onClick={() => setPage('home')} className="text-[11px] font-black">🏠 Home</button>
        <button onClick={() => setPage('sual')} className="text-[11px]">❓ SU'AL</button>
        <button onClick={() => setPage('sos')} className="text-[11px] font-black text-red-600">🔴 SOS</button>
        <button onClick={() => setPage('suhba')} className="text-[11px]">🤝 SUHBA</button>
      </div>
    </div>
  );
     }
