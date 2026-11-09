import { useState } from 'react';

export default function MadrasahPage({ onBack }: { onBack: () => void }) {
  const lessons = [
    { title: 'Quran — Al-Fatiha Tajweed', level: 'Beginner', topic: 'Quran', desc: 'Learn to recite Al-Fatiha correctly, letter by letter.', quiz: 'What is the first word of Al-Fatiha?', answer: 'Alhamdulillah' },
    { title: 'Arabic Alphabet in 7 Days', level: 'Beginner', topic: 'Arabic', desc: 'Learn all 28 letters with sound and shape.', quiz: 'What is the first letter of the Arabic alphabet?', answer: 'Alif' },
    { title: 'Fiqh of Salah — Step by Step', level: 'Beginner', topic: 'Fiqh', desc: 'From wudu to tasleem, pray with confidence.', quiz: 'How many Rakats is Dhuhr?', answer: '4' },
    { title: 'How To Perform Wudu Correctly', level: 'Beginner', topic: 'Fiqh', desc: 'The complete wudu, with common mistakes to avoid.', quiz: 'What do you start Wudu with?', answer: 'Bismillah' },
    { title: 'Seerah — Life of the Prophet ﷺ', level: 'All Levels', topic: 'Seerah', desc: 'His birth, his character, his mercy — in simple stories.', quiz: 'Where was the Prophet ﷺ born?', answer: 'Makkah' },
  ];
  const [progress, setProgress] = useState(0); const [streak, setStreak] = useState(1); const [showQuiz, setShowQuiz] = useState<number | null>(null); const [quizAnswer, setQuizAnswer] = useState(''); const [completedQuizzes, setCompletedQuizzes] = useState<number[]>([]);
  return (
    <div className="min-h-screen bg-[#0F2439] w-full max-w-[430px] mx-auto pb-[110px] overflow-x-hidden">
      <div className="px-4 pt-4 flex items-center gap-3"><button onClick={onBack} className="w-10 h-10 shrink-0 bg-white/10 rounded-full text-white">←</button><div><h1 className="text-white font-extrabold text-[18px]">MADRASAH</h1><p className="text-[#D4AF78] text-[10px] font-bold">LEARN SLOWLY & SURELY • 5 MINUTES A DAY</p></div></div>

      <div className="mx-4 mt-4 bg-white rounded-[22px] p-4 flex items-center justify-between gap-3"><div><p className="font-extrabold text-[16px]">🔥 {streak} Day Streak</p><p className="text-[12px] text-gray-500 leading-[1.5] mt-0.5">Small steps every day build strong knowledge.</p></div><div className="text-center shrink-0"><p className="text-[28px]">🏆</p><p className="text-[10px] font-bold text-gray-400">LEVEL 1</p></div></div>

      <div className="mx-4 mt-3 bg-white rounded-[22px] p-4"><div className="flex justify-between"><p className="font-extrabold text-[14px]">Your Progress</p><p className="text-[12px] text-gray-500">{progress} of {lessons.length} completed</p></div><div className="h-2.5 bg-gray-100 rounded-full mt-3 overflow-hidden"><div className="h-2.5 bg-emerald-500 rounded-full transition-all" style={{ width: `${(progress / lessons.length) * 100}%` }} /></div><p className="text-[11px] text-gray-400 mt-2">Complete all lessons to earn your Madrasah Certificate.</p></div>

      {lessons.map((l, i) => (
        <div key={l.title} className="mx-4 mt-3 bg-white rounded-[18px] p-4">
          <div className="flex items-start justify-between gap-3"><div className="min-w-0"><span className="text-[10px] font-bold bg-[#FFF6E0] text-[#B9975B] px-2 py-1 rounded-full">{l.topic} • {l.level}</span><p className="font-extrabold text-[14px] leading-tight mt-2">{l.title}</p><p className="text-[12px] text-gray-500 leading-[1.5] mt-1">{l.desc}</p><p className="text-[11px] text-gray-400 mt-1">⏱ 5 minutes • Quiz included</p></div><button onClick={() => { setProgress(Math.max(progress, i + 1)); setShowQuiz(i); setStreak(s => s + 1); }} className={`px-4 py-2.5 rounded-full text-[12px] font-bold shrink-0 ${i < progress ? 'bg-emerald-100 text-emerald-700' : 'bg-black text-white'}`}>{i < progress ? '✓ Done' : 'Start →'}</button></div>
          {showQuiz === i && (
            <div className="bg-[#F7F3EC] rounded-[14px] p-3.5 mt-3"><p className="font-bold text-[13px] leading-[1.5]">Quick Quiz: {l.quiz}</p><input value={quizAnswer} onChange={e => setQuizAnswer(e.target.value)} placeholder="Type your answer..." className="w-full mt-2 bg-white border rounded-[12px] px-3 py-2.5 text-[13px] outline-none" /><button onClick={() => { if (quizAnswer.toLowerCase().includes(l.answer.toLowerCase().slice(0, 3))) { alert('Correct! Well done. You earned 10 points.'); setCompletedQuizzes(prev => [...prev, i]); } else { alert(`Not quite. The answer is: ${l.answer}. Try again.`); } }} className="w-full mt-2 bg-[#D4AF78] font-bold py-2.5 rounded-full text-[13px]">Check Answer</button>{completedQuizzes.includes(i) && <p className="text-[12px] text-emerald-700 font-bold mt-2">✓ Quiz Passed — 10 Points Earned</p>}</div>
          )}
        </div>
      ))}
    </div>
  );
}
