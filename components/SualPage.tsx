import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { notifyAll } from '../lib/notify';

export default function SualPage({ onBack }: { onBack: () => void }) {
  const [question, setQuestion] = useState(''); const [category, setCategory] = useState('General'); const [search, setSearch] = useState('');
  const [questions, setQuestions] = useState<any[]>([]); const [upvoted, setUpvoted] = useState<string[]>([]);
  const load = async () => { const { data } = await supabase.from('sual_questions').select('*').order('created_at', { ascending: false }).limit(30); setQuestions(data || []); };
  useEffect(() => { load(); }, []);
  const post = async () => {
    if (!question.trim()) return alert('Please write your question first.');
    const { error } = await supabase.from('sual_questions').insert([{ question, category, anonymous: true }]);
    if (error) return alert(error.message);
    await notifyAll('general', `New Question: ${category}`, question.slice(0, 80), 'sual');
    alert('Your question has been posted anonymously.'); setQuestion(''); load();
  };
  const filtered = questions.filter(q => q.question.toLowerCase().includes(search.toLowerCase()));
  return (
    <div className="min-h-screen bg-[#0F2439] w-full max-w-[430px] mx-auto pb-[110px] overflow-x-hidden">
      <div className="px-4 pt-4 flex items-center gap-3"><button onClick={onBack} className="w-10 h-10 shrink-0 bg-white/10 rounded-full text-white">←</button><div className="min-w-0"><h1 className="text-white font-extrabold text-[18px] leading-tight">SU'AL</h1><p className="text-[#D4AF78] text-[10px] font-bold tracking-wide mt-0.5">ASK WITHOUT SHAME • ANSWERED WITH EVIDENCE</p></div></div>

      <div className="mx-4 mt-4 bg-gradient-to-br from-[#D4AF78] to-[#B9975B] rounded-[22px] p-4">
        <p className="text-[11px] font-bold tracking-widest text-black/60">HADITH OF THE DAY</p>
        <p className="text-black font-bold text-[14px] leading-[1.6] mt-1.5">"The best of you are those who learn the Qur'an and teach it." — Bukhari</p>
      </div>

      <div className="mx-4 mt-3 bg-white rounded-[22px] p-4">
        <p className="font-extrabold text-[16px]">Ask Your Question</p>
        <p className="text-[12px] text-gray-500 leading-[1.6] mt-1">Your name will never show. Ask about Islam, life, marriage, work, or anything you are struggling with.</p>
        <div className="flex flex-wrap gap-2 mt-3">{['General', 'Fiqh', 'Marriage', 'Work', 'Mental Health', 'Quran'].map(c => (<button key={c} onClick={() => setCategory(c)} className={`px-3.5 py-2 rounded-full text-[12px] font-bold ${category === c ? 'bg-black text-white' : 'bg-gray-100 text-gray-700'}`}>{c}</button>))}</div>
        <textarea value={question} onChange={e => setQuestion(e.target.value)} placeholder="e.g. Is it allowed to...? How do I...?" className="w-full mt-3 bg-[#F7F3EC] border border-[#E8DDC8] rounded-[14px] p-3.5 min-h-[110px] outline-none text-[14px] leading-[1.6]" />
        <button onClick={post} className="w-full mt-3 bg-[#0F2439] text-white font-extrabold py-3.5 rounded-full text-[14px]">Ask Question →</button>
        <p className="text-[11px] text-gray-400 text-center mt-2">Anonymous by default • No judgement • Scholars answer</p>
      </div>

      <div className="px-4 mt-4"><input value={search} onChange={e => setSearch(e.target.value)} placeholder="🔍 Search questions..." className="w-full bg-white rounded-full px-4 py-3 text-[14px] outline-none" /></div>

      <p className="px-5 mt-4 text-white font-bold text-[14px]">Recent Questions {filtered.length > 0 && `(${filtered.length})`}</p>
      {filtered.length === 0 && <div className="mx-4 mt-3 bg-white/5 border border-white/10 rounded-[18px] p-5 text-center"><p className="text-[28px]">❓</p><p className="text-white font-bold text-[14px] mt-2">No questions yet</p><p className="text-white/50 text-[12px] leading-[1.6] mt-1">Be the first to ask. Someone else is probably wondering the same thing.</p></div>}
      {filtered.map(q => (
        <div key={q.id} className="mx-4 mt-3 bg-white rounded-[18px] p-4">
          <div className="flex justify-between items-center gap-2"><span className="text-[10px] font-bold bg-[#FFF6E0] text-[#B9975B] px-2.5 py-1 rounded-full">{q.category}</span><span className="text-[10px] text-gray-400">Anonymous • Just now</span></div>
          <p className="text-[14px] leading-[1.65] mt-2.5 text-gray-800">{q.question}</p>
          <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-gray-100"><button onClick={() => setUpvoted(prev => prev.includes(q.id) ? prev.filter(id => id !== q.id) : [...prev, q.id])} className={`px-3 py-2 rounded-full text-[12px] font-bold ${upvoted.includes(q.id) ? 'bg-[#D4AF78] text-black' : 'bg-gray-100'}`}>👍 {upvoted.includes(q.id) ? 'Upvoted' : 'Upvote'}</button><button className="px-3 py-2 bg-gray-100 rounded-full text-[12px] font-bold">💬 Answer</button><button className="px-3 py-2 bg-gray-100 rounded-full text-[12px] font-bold">🔖 Save</button></div>
        </div>
      ))}
    </div>
  );
}
