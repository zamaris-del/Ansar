import { useState } from 'react';
import SOSPage from './components/SOSPage';
import SualPage from './components/SualPage';
import SuhbaPage from './components/SuhbaPage';
import KasbPage from './components/KasbPage';
import NikahPage from './components/NikahPage';
import DuaPage from './components/DuaPage';
import TamkeenPage from './components/TamkeenPage';
import MadrasahPage from './components/MadrasahPage';
import MasjidPulsePage from './components/MasjidPulsePage';
import WaqfPage from './components/WaqfPage';

export default function App() {
  const [page, setPage] = useState('home');
  return (
    <div className="pb-[70px]">
      {page === 'sos' && <SOSPage onBack={() => setPage('home')} />}
      {page === 'sual' && <SualPage onBack={() => setPage('home')} />}
      {page === 'suhba' && <SuhbaPage onBack={() => setPage('home')} />}
      {page === 'kasb' && <KasbPage onBack={() => setPage('home')} />}
      {page === 'nikah' && <NikahPage onBack={() => setPage('home')} />}
      {page === 'dua' && <DuaPage onBack={() => setPage('home')} />}
      {page === 'tamkeen' && <TamkeenPage onBack={() => setPage('home')} />}
      {page === 'madrasah' && <MadrasahPage onBack={() => setPage('home')} />}
      {page === 'pulse' && <MasjidPulsePage onBack={() => setPage('home')} />}
      {page === 'waqf' && <WaqfPage onBack={() => setPage('home')} />}
      {page === 'home' && (
        <div className="min-h-screen bg-[#F9F7F4]">
          <div className="bg-[#0A1930] p-6 pb-8 text-white rounded-b-[24px]">
            <div className="flex justify-between items-center"><span className="text-[10px] tracking-[0.3em] text-[#D4AF78] font-bold">ANSAR • الأنصار</span><span className="text-[10px] bg-white/10 px-3 py-1 rounded-full">🟢 18 Muslims Online</span></div>
            <h1 className="text-[28px] font-black leading-tight mt-6">No Muslim<br/><span className="text-[#D4AF78]">Left Alone.</span></h1>
            <p className="text-[12px] text-white/60 mt-2 leading-6">From doubt to marriage to job to help to Jannah. One family. 10 Pillars, 1 Home.</p>
            <button onClick={() => setPage('sos')} className="w-full mt-5 bg-red-600 text-white py-4 rounded-full text-[13px] font-black tracking-widest shadow-[0_0_20px_rgba(255,0,0,0.5)] animate-pulse">🔴 SOS - I NEED HELP NOW</button>
            <p className="text-[10px] text-center text-white/50 mt-2">Tap for emergency - Imam + volunteers go reach you</p>
          </div>
          <div className="p-4">
            <p className="text-[11px] font-black tracking-widest text-gray-500">TODAY FOR YOU • PHASE 1 - SAVE</p>
            <div className="grid grid-cols-2 gap-3 mt-3">
              <div onClick={() => setPage('sual')} className="bg-white rounded-2xl border p-4 cursor-pointer"><p className="text-[22px]">❓</p><p className="font-black text-[13px] mt-2">SU'AL</p><p className="text-[11px] text-gray-500">Ask Without Shame</p><span className="inline-block mt-2 bg-green-100 text-green-700 text-[9px] font-black px-2 py-1 rounded-full">● LIVE</span></div>
              <div onClick={() => setPage('suhba')} className="bg-white rounded-2xl border p-4 cursor-pointer"><p className="text-[22px]">🤝</p><p className="font-black text-[13px] mt-2">SUHBA</p><p className="text-[11px] text-gray-500">My Circle</p><span className="inline-block mt-2 bg-green-100 text-green-700 text-[9px] font-black px-2 py-1 rounded-full">● LIVE</span></div>
              <div onClick={() => setPage('sos')} className="bg-red-50 rounded-2xl border border-red-200 p-4 cursor-pointer"><p className="text-[22px]">🚨</p><p className="font-black text-[13px] mt-2">SOS</p><p className="text-[11px] text-gray-500">I Need Help Now</p><span className="inline-block mt-2 bg-red-600 text-white text-[9px] font-black px-2 py-1 rounded-full">● ALWAYS ON</span></div>
              <div onClick={() => setPage('dua')} className="bg-white rounded-2xl border p-4 cursor-pointer"><p className="text-[22px]">🤲</p><p className="font-black text-[13px] mt-2">DUA</p><p className="text-[11px] text-gray-500">Make Dua For Me</p><span className="inline-block mt-2 bg-green-100 text-green-700 text-[9px] font-black px-2 py-1 rounded-full">● LIVE</span></div>
            </div>
            <p className="text-[11px] font-black tracking-widest text-gray-500 mt-6">BUILD YOUR FUTURE • PHASE 2</p>
            <div className="grid grid-cols-2 gap-3 mt-3">
              <div onClick={() => setPage('kasb')} className="bg-white rounded-2xl border p-4 cursor-pointer"><p className="text-[22px]">💼</p><p className="font-black text-[13px] mt-2">KASB</p><p className="text-[11px] text-gray-500">Halal Work</p><span className="inline-block mt-2 bg-green-100 text-green-700 text-[9px] font-black px-2 py-1 rounded-full">● LIVE</span></div>
              <div onClick={() => setPage('nikah')} className="bg-white rounded-2xl border p-4 cursor-pointer"><p className="text-[22px]">💍</p><p className="font-black text-[13px] mt-2">NIKAH</p><p className="text-[11px] text-gray-500">Marriage With Wali</p><span className="inline-block mt-2 bg-green-100 text-green-700 text-[9px] font-black px-2 py-1 rounded-full">● LIVE</span></div>
            </div>
            <p className="text-[11px] font-black tracking-widest text-gray-500 mt-6">GROW • PHASE 3</p>
            <div className="grid grid-cols-2 gap-3 mt-3">
              <div onClick={() => setPage('tamkeen')} className="bg-white rounded-2xl border p-4 cursor-pointer"><p className="text-[22px]">🌱</p><p className="font-black text-[13px] mt-2">TAMKEEN</p><p className="text-[11px] text-gray-500">Empower</p><span className="inline-block mt-2 bg-green-100 text-green-700 text-[9px] font-black px-2 py-1 rounded-full">● LIVE</span></div>
              <div onClick={() => setPage('madrasah')} className="bg-white rounded-2xl border p-4 cursor-pointer"><p className="text-[22px]">📖</p><p className="font-black text-[13px] mt-2">MADRASAH</p><p className="text-[11px] text-gray-500">Learn Slowly</p><span className="inline-block mt-2 bg-green-100 text-green-700 text-[9px] font-black px-2 py-1 rounded-full">● LIVE</span></div>
              <div onClick={() => setPage('pulse')} className="bg-white rounded-2xl border p-4 cursor-pointer"><p className="text-[22px]">🕌</p><p className="font-black text-[13px] mt-2">MASJID PULSE</p><p className="text-[11px] text-gray-500">Your Masjid Alive?</p><span className="inline-block mt-2 bg-green-100 text-green-700 text-[9px] font-black px-2 py-1 rounded-full">● LIVE</span></div>
              <div onClick={() => setPage('waqf')} className="bg-white rounded-2xl border p-4 cursor-pointer"><p className="text-[22px]">💧</p><p className="font-black text-[13px] mt-2">WAQF</p><p className="text-[11px] text-gray-500">₦100 Daily Sadaqah</p><span className="inline-block mt-2 bg-green-100 text-green-700 text-[9px] font-black px-2 py-1 rounded-full">● LIVE</span></div>
            </div>
          </div>
          <footer className="bg-[#080F2A] text-white p-6 pb-28">
            <h3 className="font-black tracking-[0.3em] text-[13px]">ANSAR</h3>
            <p className="text-[10px] text-[#D4AF78] tracking-[0.3em] mt-1 font-bold">الأنصار • NO MUSLIM LEFT ALONE</p>
            <p className="text-[11px] text-gray-400 mt-4 leading-6">One app wey go hold Muslim for every stage of life. If you enter ANSAR, you no go need 10 other apps. From Shahada to Jannah.</p>
            <p className="text-[9px] text-gray-600 mt-6">© 2026 ANSAR. From Shahada to Jannah.</p>
          </footer>
        </div>
      )}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur border-t flex justify-around py-3.5 z-50 overflow-x-auto">
        <button onClick={() => setPage('home')} className="text-[11px] font-black shrink-0 px-2">🏠 Home</button>
        <button onClick={() => setPage('sual')} className="text-[11px] shrink-0 px-2">❓ SU'AL</button>
        <button onClick={() => setPage('sos')} className="text-[11px] font-black text-red-600 shrink-0 px-2">🔴 SOS</button>
        <button onClick={() => setPage('kasb')} className="text-[11px] shrink-0 px-2">💼 KASB</button>
        <button onClick={() => setPage('nikah')} className="text-[11px] shrink-0 px-2">💍 NIKAH</button>
        <button onClick={() => setPage('dua')} className="text-[11px] shrink-0 px-2">🤲 DUA</button>
        <button onClick={() => setPage('tamkeen')} className="text-[11px] shrink-0 px-2">🌱 TAMKEEN</button>
        <button onClick={() => setPage('waqf')} className="text-[11px] shrink-0 px-2">💧 WAQF</button>
      </div>
    </div>
  );
}
