import { useState } from 'react';

export default function MadrasahPage({ onBack }: { onBack: () => void }) {
  const lessons = [
    { title: 'Quran — Al-Fatiha Tajweed', level: 'Beginner', topic: 'Quran', quiz: 'What is the first word of Al-Fatiha?', answer: 'Alhamdulillah' },
    { title: 'Arabic Alphabet in 7 Days', level: 'Beginner', topic: 'Arabic', quiz: 'What is the first letter of the Arabic alphabet?', answer: 'Alif' },
    { title: 'Fiqh of Salah — Step by Step', level: 'Beginner', topic: 'Fiqh', quiz: 'How many Rakats is Dhuhr?', answer: '4' },
    { title: 'How To Perform Wudu Correctly', level: 'Beginner', topic: 'Fiqh', quiz: 'What do you start Wudu with?', answer: 'Bismillah and intention' },
    { title: 'Seerah — Life of the Prophet ﷺ', level: 'All Levels', topic: 'Seerah', quiz: 'Where was the Prophet ﷺ born?', answer: 'Makkah' },
  ];
  const [progress, setProgress] = useState(2); const [streak, setStreak] = useState(7); const [showQuiz, setShowQuiz] = useState<number | null>(null); const [quizAnswer, setQuizAnswer] = useState(''); const [completedQuizzes, setCompletedQuizzes] = useState<number[]>([]);
  return (
    <div className="min-h-screen bg-[#0F2439] max-w-[430px] mx-auto pb-[120px]">
      <div className="px-5 pt-4 flex items-center gap-3"><button onClick={onBack} className="w-10 h-10 bg-white/10 rounded-full text-white">←</button><div><h1 className="text-white font-extrabold">MADRASAH</h1><p className="text-[#D4AF78] text-[11px] font-bold">LEARN SLOWLY AND SURELY</p></div></div>
      <div className="mx-4 mt-4 bg-white rounded-[24px] p-5 flex items-center justify-between"><div><p className="font-extrabold text-[16px]">🔥 {streak} Day Streak</p><p className="text-[12px] text-gray-500">You have learned for 7 days in a row. Keep it up.</p></div><div className="text-center"><p className="text-[28px]">🏆</p><p className="text-[10px] font-bold text-gray-400">LEVEL 2</p></div></div>
      <div className="mx-4 mt-3 bg-white rounded-[24px] p-5"><p className="font-extrabold">Your Progress</p><p className="text-[12px] text-gray-500">{progress} of {lessons.length} lessons completed.</p><div className="h-3 bg-gray-100 rounded-full mt-3"><div className="h-3 bg-emerald-500 rounded-full" style={{ width: `${(progress / lessons.length) * 100}%` }} /></div><p className="text-[11px] text-gray-400 mt-2">Complete all 5 to earn your Madrasah Certificate.</p></div>
      {lessons.map((l, i) => (
        <div key={l.title} className="mx-4 mt-3 bg-white rounded-[20px] p-4">
          <div className="flex items-center justify-between"><div><p className="font-extrabold text-[14px]">{l.title}</p><p className="text-[11px] text-gray-500">{l.topic} • {l.level} • 5 minutes</p></div><button onClick={() => { setProgress(Math.max(progress, i + 1)); setShowQuiz(i); }} className={`px-4 py-2 rounded-full text-[12px] font-bold shrink-0 ${i < progress ? 'bg-emerald-100 text-emerald-700' : 'bg-black text-white'}`}>{i < progress ? 'Review' : 'Start →'}</button></div>
          {showQuiz === i && (
            <div className="bg-[#F7F3EC] rounded-[16px] p-4 mt-3"><p className="font-bold text-[13px]">Quick Quiz: {l.quiz}</p><input value={quizAnswer} onChange={e => setQuizAnswer(e.target.value)} placeholder="Your answer..." className="w-full mt-2 bg-white border rounded-[12px] px-3 py-2.5 text-[13px] outline-none" /><button onClick={() => { if (quizAnswer.toLowerCase().includes(l.answer.toLowerCase().slice(0, 3))) { alert('Correct! Well done. You earned 10 points.'); setCompletedQuizzes(prev => [...prev, i]); } else { alert(`Not quite. The answer is: ${l.answer}. Try again.`); } }} className="w-full mt-2 bg-[#D4AF78] font-bold py-2.5 rounded-full text-[13px]">Check Answer</button>{completedQuizzes.includes(i) && <p className="text-[12px] text-emerald-700 font-bold mt-2">✓ Quiz Passed — 10 Points Earned</p>}</div>
          )}
        </div>
      ))}
    </div>
  );
}
