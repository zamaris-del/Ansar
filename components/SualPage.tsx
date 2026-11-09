import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { notifyAll } from '../lib/notify';

export default function SualPage({ onBack }: { onBack: () => void }) {
  const [question, setQuestion] = useState('');
  const [category, setCategory] = useState('General');
  const [search, setSearch] = useState('');
  const [questions, setQuestions] = useState<any[]>([]);
  const [upvoted, setUpvoted] = useState<string[]>([]);

  const load = async () => {
    const { data } = await supabase.from('sual_questions').select('*').order('created_at', { ascending: false }).limit(30);
    setQuestions(data || []);
  };
  useEffect(() => { load(); }, []);

  const post = async () => {
    if (!question.trim()) return alert('Please write your question first.');
    const { error } = await supabase.from('sual_questions').insert([{ question, category, anonymous: true }]);
    if (error) return alert(error.message);
    await notifyAll('general', `New Question: ${category}`, question.slice(0, 80), 'sual');
    alert('Your question has been posted anonymously.');
    setQuestion(''); load();
  };

  const filtered = questions.filter(q => q.question.toLowerCase().includes(search.toLowerCase()));
  const cats = ['General', 'Fiqh', 'Marriage', 'Work', 'Mental Health', 'Quran'];

  return (
    <div style={{ minHeight: '100vh', background: '#0F2439', width: '100%', maxWidth: 430, margin: '0 auto', paddingBottom: 110, overflowX: 'hidden', boxSizing: 'border-box' }}>
      {/* Header */}
      <div style={{ padding: '16px 16px 0', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={onBack} style={{ width: 40, height: 40, flexShrink: 0, background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', color: '#fff', fontSize: 18, cursor: 'pointer' }}>←</button>
        <div style={{ minWidth: 0 }}>
          <h1 style={{ color: '#fff', fontWeight: 800, fontSize: 18, lineHeight: 1.2, margin: 0 }}>SU'AL</h1>
          <p style={{ color: '#D4AF78', fontSize: 10, fontWeight: 700, letterSpacing: 1, marginTop: 2, margin: 0 }}>ASK WITHOUT SHAME • ANSWERED WITH EVIDENCE</p>
        </div>
      </div>

      {/* Hadith */}
      <div style={{ margin: '16px 16px 0', background: 'linear-gradient(135deg, #D4AF78, #B9975B)', borderRadius: 22, padding: 16 }}>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, color: 'rgba(0,0,0,0.6)', margin: 0 }}>HADITH OF THE DAY</p>
        <p style={{ color: '#000', fontWeight: 700, fontSize: 14, lineHeight: 1.6, marginTop: 6, marginBottom: 0 }}>"The best of you are those who learn the Qur'an and teach it." — Bukhari</p>
      </div>

      {/* Ask Box */}
      <div style={{ margin: '12px 16px 0', background: '#fff', borderRadius: 22, padding: 16 }}>
        <p style={{ fontWeight: 800, fontSize: 16, margin: 0 }}>Ask Your Question</p>
        <p style={{ fontSize: 12, color: '#6b7280', lineHeight: 1.6, marginTop: 4, marginBottom: 0 }}>Your name will never show. Ask about Islam, life, marriage, work, or anything you are struggling with.</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 12 }}>
          {cats.map(c => (
            <button key={c} onClick={() => setCategory(c)} style={{ padding: '8px 14px', borderRadius: 999, border: 'none', fontSize: 12, fontWeight: 700, cursor: 'pointer', background: category === c ? '#000' : '#f3f4f6', color: category === c ? '#fff' : '#374151' }}>{c}</button>
          ))}
        </div>
        <textarea value={question} onChange={e => setQuestion(e.target.value)} placeholder="e.g. Is it allowed to...? How do I...?" style={{ width: '100%', marginTop: 12, background: '#F7F3EC', border: '1px solid #E8DDC8', borderRadius: 14, padding: 14, minHeight: 110, outline: 'none', fontSize: 14, lineHeight: 1.6, boxSizing: 'border-box', fontFamily: 'inherit' }} />
        <button onClick={post} style={{ width: '100%', marginTop: 12, background: '#0F2439', color: '#fff', fontWeight: 800, padding: '14px', borderRadius: 999, border: 'none', fontSize: 14, cursor: 'pointer' }}>Ask Question →</button>
        <p style={{ fontSize: 11, color: '#9ca3af', textAlign: 'center', marginTop: 8, marginBottom: 0 }}>Anonymous by default • No judgement • Scholars answer</p>
      </div>

      {/* Search */}
      <div style={{ padding: '16px 16px 0' }}>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="🔍 Search questions..." style={{ width: '100%', background: '#fff', borderRadius: 999, padding: '12px 16px', fontSize: 14, outline: 'none', border: 'none', boxSizing: 'border-box' }} />
      </div>

      <p style={{ padding: '0 20px', marginTop: 16, color: '#fff', fontWeight: 700, fontSize: 14, marginBottom: 0 }}>Recent Questions {filtered.length > 0 && `(${filtered.length})`}</p>

      {filtered.length === 0 && (
        <div style={{ margin: '12px 16px 0', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 18, padding: 20, textAlign: 'center' }}>
          <p style={{ fontSize: 28, margin: 0 }}>❓</p>
          <p style={{ color: '#fff', fontWeight: 700, fontSize: 14, marginTop: 8, marginBottom: 0 }}>No questions yet</p>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, lineHeight: 1.6, marginTop: 4, marginBottom: 0 }}>Be the first to ask. Someone else is probably wondering the same thing.</p>
        </div>
      )}

      {filtered.map(q => (
        <div key={q.id} style={{ margin: '12px 16px 0', background: '#fff', borderRadius: 18, padding: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 10, fontWeight: 700, background: '#FFF6E0', color: '#B9975B', padding: '4px 10px', borderRadius: 999 }}>{q.category}</span>
            <span style={{ fontSize: 10, color: '#9ca3af' }}>Anonymous • Just now</span>
          </div>
          <p style={{ fontSize: 14, lineHeight: 1.65, marginTop: 10, color: '#1f2937', marginBottom: 0 }}>{q.question}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 12, paddingTop: 12, borderTop: '1px solid #f3f4f6' }}>
            <button onClick={() => setUpvoted(prev => prev.includes(q.id) ? prev.filter(id => id !== q.id) : [...prev, q.id])} style={{ padding: '8px 12px', borderRadius: 999, border: 'none', fontSize: 12, fontWeight: 700, cursor: 'pointer', background: upvoted.includes(q.id) ? '#D4AF78' : '#f3f4f6', color: upvoted.includes(q.id) ? '#000' : '#000' }}>👍 {upvoted.includes(q.id) ? 'Upvoted' : 'Upvote'}</button>
            <button style={{ padding: '8px 12px', background: '#f3f4f6', border: 'none', borderRadius: 999, fontSize: 12, fontWeight: 700 }}>💬 Answer</button>
            <button style={{ padding: '8px 12px', background: '#f3f4f6', border: 'none', borderRadius: 999, fontSize: 12, fontWeight: 700 }}>🔖 Save</button>
          </div>
        </div>
      ))}
    </div>
  );
      }
