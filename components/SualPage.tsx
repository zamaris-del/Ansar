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
    <div className="min-h-screen bg-[#0F2439] max-w-[430px] mx-auto pb-[120px]">
      <div className="px-5 pt-4 flex items-center gap-3"><button onClick={onBack} className="w-10 h-10 bg-white/10 rounded-full text-white">←</button><div><h1 className="text-white font-extrabold">SU'AL — Ask Without Shame</h1><p className="text-[#D4AF78] text-[11px] font-bold">SCHOLARS AND KNOWLEDGEABLE MEMBERS ANSWER</p></div></div>
      <div className="mx-4 mt-4 bg-white rounded-[24px] p-5">
        <p className="font-extrabold">Ask Your Question</p>
        <div className="flex flex-wrap gap-2 mt-3">{['General', 'Fiqh', 'Marriage', 'Work', 'Mental Health', 'Quran'].map(c => (<button key={c} onClick={() => setCategory(c)} className={`px-3 py-2 rounded-full text-[12px] font-bold ${category === c ? 'bg-black text-white' : 'bg-gray-100'}`}>{c}</button>))}</div>
        <textarea value={question} onChange={e => setQuestion(e.target.value)} placeholder="Ask about Islam, life, marriage, work, or anything you are struggling with..." className="w-full mt-4 bg-[#F7F3EC] border rounded-[16px] p-4 min-h-[110px] outline-none" />
        <button onClick={post} className="w-full mt-3 bg-[#0F2439] text-white font-extrabold py-4 rounded-full">ASK QUESTION →</button>
        <p className="text-[11px] text-gray-400 text-center mt-2">Anonymous by default. No judgement.</p>
      </div>
      <input value={search} onChange={e => setSearch(e.target.value)} placeholder="🔍 Search questions..." className="mx-4 mt-4 w-[calc(100%-32px)] bg-white rounded-full px-4 py-3.5 text-[14px] outline-none" />
      {filtered.map(q => (
        <div key={q.id} className="mx-4 mt-3 bg-white rounded-[20px] p-4">
          <div className="flex justify-between"><span className="text-[10px] font-bold bg-[#FFF6E0] text-[#B9975B] px-2 py-1 rounded-full">{q.category}</span><span className="text-[10px] text-gray-400">Anonymous</span></div>
          <p className="text-[14px] mt-2">{q.question}</p>
          <div className="flex gap-2 mt-3">
            <button onClick={() => setUpvoted(prev => prev.includes(q.id) ? prev.filter(id => id !== q.id) : [...prev, q.id])} className={`px-3 py-1.5 rounded-full text-[12px] font-bold ${upvoted.includes(q.id) ? 'bg-[#D4AF78] text-black' : 'bg-gray-100'}`}>👍 {upvoted.includes(q.id) ? 'Upvoted' : 'Upvote'} • {upvoted.includes(q.id) ? 1 : 0}</button>
            <button className="px-3 py-1.5 bg-gray-100 rounded-full text-[12px] font-bold">💬 Answer</button>
            <button className="px-3 py-1.5 bg-gray-100 rounded-full text-[12px] font-bold">🔖 Save</button>
          </div>
          <p className="text-[11px] text-emerald-700 bg-emerald-50 p-2.5 rounded-[12px] mt-3">✓ Scholar Answer (Coming Soon): Our Imams will answer verified questions with evidence from Quran and Sunnah.</p>
        </div>
      ))}
    </div>
  );
}
