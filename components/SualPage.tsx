import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { notifyAll } from '../lib/notify';

export default function SualPage({ onBack }: { onBack: () => void }) {
  const [q, setQ] = useState('');
  const [triage, setTriage] = useState('Green - Fiqh');
  const [questions, setQuestions] = useState<any[]>([]);
  const load = async () => { const { data } = await supabase.from('sual_questions').select('*').order('created_at', { ascending: false }); setQuestions(data || []); };
  useEffect(() => { load(); }, []);
  const post = async () => {
    if (!q.trim()) return alert('Write your question first. No shame here.');
    const { error } = await supabase.from('sual_questions').insert([{ question: q, triage, status: 'Pending' }]);
    if (error) return alert(error.message);
    await notifyAll('sual', `New SU'AL: ${triage}`, q.slice(0, 80), 'sual');
    alert('Asked. Anonymous. A kind scholar go answer you soon.'); setQ(''); load();
  };
  const inputStyle: React.CSSProperties = { width: '100%', background: '#F7F3EC', border: '1px solid #E8DDC8', borderRadius: 14, padding: 14, fontSize: 14, outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit', minHeight: 100 };
  return (
    <div style={{ minHeight: '100vh', background: '#0F2439', maxWidth: 430, margin: '0 auto', paddingBottom: 110, boxSizing: 'border-box' }}>
      <div style={{ padding: '16px 16px 0', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={onBack} style={{ width: 40, height: 40, background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', color: '#fff', fontSize: 18 }}>←</button>
        <div><h1 style={{ color: '#fff', fontWeight: 800, margin: 0 }}>SU'AL</h1><p style={{ color: '#D4AF78', fontSize: 11, fontWeight: 700, margin: 0 }}>ASK WITHOUT SHAME • 100% ANONYMOUS</p></div>
      </div>
      <div style={{ margin: '16px 16px 0', background: '#fff', borderRadius: 22, padding: 16 }}>
        <p style={{ fontWeight: 800, fontSize: 16, margin: 0 }}>Ask Anything. No Name. No Photo. No Shame.</p>
        <p style={{ fontSize: 12, color: '#6b7280', lineHeight: 1.6, marginTop: 4 }}>Doubt? Fiqh? Family wahala? Ask. Only kind scholars answer. Harsh answer = ban.</p>
        <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>{['Green - Fiqh', 'Yellow - Doubt', 'Red - Crisis'].map(t => <button key={t} onClick={() => setTriage(t)} style={{ padding: '8px 10px', borderRadius: 999, border: 'none', fontSize: 11, fontWeight: 700, cursor: 'pointer', background: triage === t ? '#000' : '#f3f4f6', color: triage === t ? '#fff' : '#374151' }}>{t}</button>)}</div>
        <textarea value={q} onChange={e => setQ(e.target.value)} placeholder="e.g. I dey doubt my salah... I dey struggle with porn... My family no understand my Islam..." style={{ ...inputStyle, marginTop: 12 }} />
        <button onClick={post} style={{ width: '100%', marginTop: 12, background: '#0F2439', color: '#fff', fontWeight: 800, padding: 14, borderRadius: 999, border: 'none' }}>Ask Anonymously →</button>
      </div>
      <p style={{ color: '#fff', fontWeight: 700, padding: '0 20px', marginTop: 16 }}>Recent Questions ({questions.length})</p>
      {questions.map((item: any) => (
        <div key={item.id} style={{ margin: '12px 16px 0', background: '#fff', borderRadius: 18, padding: 16 }}>
          <span style={{ fontSize: 10, fontWeight: 700, background: item.triage?.includes('Red') ? '#FEE2E2' : item.triage?.includes('Yellow') ? '#FEF3C7' : '#DCFCE7', color: '#374151', padding: '4px 8px', borderRadius: 999 }}>{item.triage || 'Green - Fiqh'}</span>
          <p style={{ fontSize: 14, lineHeight: 1.6, marginTop: 8 }}>{item.question}</p>
          {item.answer ? <div style={{ background: '#F7F3EC', borderRadius: 12, padding: 12, marginTop: 10 }}><p style={{ fontSize: 12, fontWeight: 700, margin: 0 }}>Scholar Answer:</p><p style={{ fontSize: 13, lineHeight: 1.6, marginTop: 4 }}>{item.answer}</p></div> : <p style={{ fontSize: 12, color: '#9ca3af' }}>⏳ Waiting for kind answer...</p>}
        </div>
      ))}
    </div>
  );
                     }
