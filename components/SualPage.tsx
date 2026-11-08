import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export default function SualPage({ onBack }: any) {
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
