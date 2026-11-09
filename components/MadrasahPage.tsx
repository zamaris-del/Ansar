import { useState } from 'react';

export default function MadrasahPage({ onBack }: { onBack: () => void }) {
  const lessons = [
    { title: 'Quran — Al-Fatiha Tajweed', level: 'Beginner', topic: 'Quran', desc: 'Learn to recite Al-Fatiha correctly, letter by letter.', quiz: 'What is the first word of Al-Fatiha?', answer: 'Alhamdulillah' },
    { title: 'Arabic Alphabet in 7 Days', level: 'Beginner', topic: 'Arabic', desc: 'Learn all 28 letters with sound and shape.', quiz: 'What is the first letter of the Arabic alphabet?', answer: 'Alif' },
    { title: 'Fiqh of Salah — Step by Step', level: 'Beginner', topic: 'Fiqh', desc: 'From wudu to tasleem, pray with confidence.', quiz: 'How many Rakats is Dhuhr?', answer: '4' },
    { title: 'How To Perform Wudu Correctly', level: 'Beginner', topic: 'Fiqh', desc: 'The complete wudu, with common mistakes to avoid.', quiz: 'What do you start Wudu with?', answer: 'Bismillah' },
    { title: 'Seerah — Life of the Prophet ﷺ', level: 'All Levels', topic: 'Seerah', desc: 'His birth, his character, his mercy — in simple stories.', quiz: 'Where was the Prophet ﷺ born?', answer: 'Makkah' },
  ];
  const [progress, setProgress] = useState(0);
  const [streak, setStreak] = useState(1);
  const [showQuiz, setShowQuiz] = useState<number | null>(null);
  const [quizAnswer, setQuizAnswer] = useState('');
  const [completedQuizzes, setCompletedQuizzes] = useState<number[]>([]);

  return (
    <div style={{ minHeight: '100vh', background: '#0F2439', width: '100%', maxWidth: 430, margin: '0 auto', paddingBottom: 110, overflowX: 'hidden', boxSizing: 'border-box' }}>
      <div style={{ padding: '16px 16px 0', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={onBack} style={{ width: 40, height: 40, flexShrink: 0, background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', color: '#fff', fontSize: 18, cursor: 'pointer' }}>←</button>
        <div><h1 style={{ color: '#fff', fontWeight: 800, fontSize: 18, margin: 0 }}>MADRASAH</h1><p style={{ color: '#D4AF78', fontSize: 10, fontWeight: 700, margin: 0, marginTop: 2 }}>LEARN SLOWLY & SURELY • 5 MINUTES A DAY</p></div>
      </div>

      <div style={{ margin: '16px 16px 0', background: '#fff', borderRadius: 22, padding: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
        <div><p style={{ fontWeight: 800, fontSize: 16, margin: 0 }}>🔥 {streak} Day Streak</p><p style={{ fontSize: 12, color: '#6b7280', lineHeight: 1.5, marginTop: 2, marginBottom: 0 }}>Small steps every day build strong knowledge.</p></div>
        <div style={{ textAlign: 'center', flexShrink: 0 }}><p style={{ fontSize: 28, margin: 0 }}>🏆</p><p style={{ fontSize: 10, fontWeight: 700, color: '#9ca3af', margin: 0 }}>LEVEL 1</p></div>
      </div>

      <div style={{ margin: '12px 16px 0', background: '#fff', borderRadius: 22, padding: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><p style={{ fontWeight: 800, fontSize: 14, margin: 0 }}>Your Progress</p><p style={{ fontSize: 12, color: '#6b7280', margin: 0 }}>{progress} of {lessons.length} completed</p></div>
        <div style={{ height: 10, background: '#f3f4f6', borderRadius: 999, marginTop: 12, overflow: 'hidden' }}><div style={{ height: 10, background: '#10B981', borderRadius: 999, width: `${(progress / lessons.length) * 100}%` }} /></div>
        <p style={{ fontSize: 11, color: '#9ca3af', marginTop: 8, marginBottom: 0 }}>Complete all lessons to earn your Madrasah Certificate.</p>
      </div>

      {lessons.map((l, i) => (
        <div key={l.title} style={{ margin: '12px 16px 0', background: '#fff', borderRadius: 18, padding: 16 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
            <div style={{ minWidth: 0 }}>
              <span style={{ fontSize: 10, fontWeight: 700, background: '#FFF6E0', color: '#B9975B', padding: '4px 8px', borderRadius: 999 }}>{l.topic} • {l.level}</span>
              <p style={{ fontWeight: 800, fontSize: 14, lineHeight: 1.3, marginTop: 8, marginBottom: 0 }}>{l.title}</p>
              <p style={{ fontSize: 12, color: '#6b7280', lineHeight: 1.5, marginTop: 4, marginBottom: 0 }}>{l.desc}</p>
              <p style={{ fontSize: 11, color: '#9ca3af', marginTop: 4, marginBottom: 0 }}>⏱ 5 minutes • Quiz included</p>
            </div>
            <button onClick={() => { setProgress(Math.max(progress, i + 1)); setShowQuiz(i); setStreak(s => s + 1); }} style={{ padding: '10px 16px', borderRadius: 999, border: 'none', fontSize: 12, fontWeight: 700, flexShrink: 0, cursor: 'pointer', background: i < progress ? '#D1FAE5' : '#000', color: i < progress ? '#047857' : '#fff' }}>{i < progress ? '✓ Done' : 'Start →'}</button>
          </div>
          {showQuiz === i && (
            <div style={{ background: '#F7F3EC', borderRadius: 14, padding: 14, marginTop: 12 }}>
              <p style={{ fontWeight: 700, fontSize: 13, lineHeight: 1.5, margin: 0 }}>Quick Quiz: {l.quiz}</p>
              <input value={quizAnswer} onChange={e => setQuizAnswer(e.target.value)} placeholder="Type your answer..." style={{ width: '100%', marginTop: 8, background: '#fff', border: '1px solid #E8DDC8', borderRadius: 12, padding: '10px 12px', fontSize: 13, outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit' }} />
              <button onClick={() => { if (quizAnswer.toLowerCase().includes(l.answer.toLowerCase().slice(0, 3))) { alert('Correct! Well done. You earned 10 points.'); setCompletedQuizzes(prev => [...prev, i]); } else { alert(`Not quite. The answer is: ${l.answer}. Try again.`); } }} style={{ width: '100%', marginTop: 8, background: '#D4AF78', color: '#000', fontWeight: 700, padding: '10px', borderRadius: 999, border: 'none', fontSize: 13, cursor: 'pointer' }}>Check Answer</button>
              {completedQuizzes.includes(i) && <p style={{ fontSize: 12, color: '#047857', fontWeight: 700, marginTop: 8, marginBottom: 0 }}>✓ Quiz Passed — 10 Points Earned</p>}
            </div>
          )}
        </div>
      ))}
    </div>
  );
        }
