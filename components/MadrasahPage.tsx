import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const LESSONS = [
  { week: 1, title: 'Wudu', desc: 'How to do wudu step-by-step' },
  { week: 2, title: 'Fatiha', desc: 'Learn Surah Al-Fatiha slowly' },
  { week: 3, title: 'Salah', desc: 'How to pray 5 daily prayers' },
  { week: 4, title: 'Tawheed', desc: 'What is Tawheed? One God' },
  { week: 5, title: 'Fasting', desc: 'Why we fast in Ramadan' },
  { week: 6, title: 'How To Make Dua', desc: 'Talk to Allah, He listens' },
];

export default function MadrasahPage({ onBack }: any) {
  const [students, setStudents] = useState<any[]>([]);
  const [name, setName] = useState(''); const [anchor, setAnchor] = useState(''); const [lang, setLang] = useState('English');
  const load = async () => { const { data } = await supabase.from('madrasah_progress').select('*').order('created_at', { ascending: false }); if (data) setStudents(data); };
  useEffect(() => { load(); }, []);
  const enroll = async () => {
    if (!name.trim()) { alert('Put student name'); return; }
    await supabase.from('madrasah_progress').insert({ student_name: name, anchor_name: anchor, current_week: 1, completed_lessons: '', language: lang });
    setName(''); setAnchor(''); load();
  };
  const nextWeek = async (s: any) => {
    const next = Math.min(6, s.current_week + 1);
    await supabase.from('madrasah_progress').update({ current_week: next, completed_lessons: (s.completed_lessons || '') + ' Week ' + s.current_week + ' done. ' }).eq('id', s.id); load();
  };
  return (
    <div className="min-h-screen bg-[#F9F7F4] pb-24">
      <header className="sticky top-0 bg-white p-4 border-b flex items-center gap-3 z-10"><button onClick={onBack} className="bg-black/10 px-4 py-2 rounded-full text-[11px] font-bold">← Back</button><span className="font-black text-[13px]">📖 MADRASAH - Learn Islam Slowly</span></header>
      <div className="p-4">
        <div className="bg-[#0A1930] rounded-2xl p-4 text-white"><p className="text-[11px] text-[#D4AF78] font-bold">NO 500-PAGE BOOK • NO EXAM • NO SHAME</p><p className="text-[12px] text-white/70 mt-2 leading-6">Small small. One step per week. 3-min video. Your Anchor go encourage you: "MashaAllah, you don learn Fatiha!"</p></div>
        <div className="mt-4 space-y-2">{LESSONS.map(l => (
          <div key={l.week} className="bg-white rounded-2xl border p-4 flex justify-between items-center"><div><p className="font-black text-[13px]">Week {l.week}: {l.title}</p><p className="text-[11px] text-gray-500">{l.desc}</p></div><button className="bg-black text-white px-4 py-2 rounded-full text-[11px] font-bold">▶ Watch 3min</button></div>
        ))}</div>
        <div className="bg-white rounded-2xl border p-4 mt-4">
          <h3 className="font-black text-[13px]">+ Enroll Student</h3>
          <input value={name} onChange={e => setName(e.target.value)} placeholder="Student name e.g. Chidinma" className="w-full mt-3 p-3 rounded-xl border text-[13px]" />
          <input value={anchor} onChange={e => setAnchor(e.target.value)} placeholder="Anchor name e.g. Maryam" className="w-full mt-2 p-3 rounded-xl border text-[13px]" />
          <select value={lang} onChange={e => setLang(e.target.value)} className="w-full mt-2 p-3 rounded-xl border text-[13px]"><option>English</option><option>Pidgin</option><option>Hausa</option><option>Yoruba</option><option>French</option><option>Arabic</option></select>
          <button onClick={enroll} className="w-full mt-2 bg-[#0A1930] text-[#D4AF78] py-3.5 rounded-full text-[11px] font-black">ENROLL →</button>
        </div>
        <div className="mt-4 space-y-3">{students.map(s => (
          <div key={s.id} className="bg-white rounded-2xl border p-4">
            <p className="font-black text-[13px]">{s.student_name} • {s.language}</p>
            <p className="text-[11px] text-gray-500">Anchor: {s.anchor_name || 'Not assigned'} • Current: Week {s.current_week} - {LESSONS[s.current_week - 1]?.title}</p>
            <div className="mt-2 bg-gray-100 rounded-full h-2 overflow-hidden"><div className="h-full bg-green-600" style={{ width: (s.current_week / 6) * 100 + '%' }}></div></div>
            <p className="text-[10px] text-gray-500 mt-1">{s.completed_lessons || 'Just started - Alhamdulillah'}</p>
            <button onClick={() => nextWeek(s)} className="mt-2 bg-green-600 text-white px-4 py-2 rounded-full text-[11px] font-bold">✅ Complete This Week → Next Week</button>
          </div>
        ))}</div>
      </div>
    </div>
  );
            }
