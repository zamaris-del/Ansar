import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { notifyAll } from '../lib/notify';
import { openWhatsApp, IMAM_WHATSAPP } from '../lib/whatsapp';

// YOUR BANK DETAILS - FOR DONATIONS
const BANK_NAME = 'Wema Bank';
const ACCOUNT_NUMBER = '0253559865';
const ACCOUNT_NAME = 'Liasu Habeeblah Olalekan';

export default function WaqfPage({ onBack }: { onBack: () => void }) {
  const [name, setName] = useState('');
  const [cause, setCause] = useState('SOS Fund');
  const [currency, setCurrency] = useState('NGN');
  const [amount, setAmount] = useState<number | null>(1000);
  const [customAmount, setCustomAmount] = useState('');
  const [recurring, setRecurring] = useState(false);
  const [frequency, setFrequency] = useState('Daily');
  const [showBank, setShowBank] = useState(false);
  const [copied, setCopied] = useState('');

  const symbols: Record<string, string> = { NGN: '₦', USD: '$', GBP: '£', EUR: '€' };
  const symbol = symbols[currency] || '₦';

  const quickAmounts: Record<string, number[]> = {
    NGN: [500, 1000, 5000, 10000, 20000, 50000],
    USD: [5, 10, 25, 50, 100, 200],
    GBP: [5, 10, 25, 50, 100, 200],
    EUR: [5, 10, 25, 50, 100, 200],
  };

  const finalAmount = customAmount ? parseFloat(customAmount) : amount;

  const copyText = async (text: string, label: string) => {
    try { await navigator.clipboard.writeText(text); } catch { const ta = document.createElement('textarea'); ta.value = text; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); document.body.removeChild(ta); }
    setCopied(label);
    setTimeout(() => setCopied(''), 2000);
  };

  const give = async () => {
    if (!finalAmount || finalAmount <= 0) return alert('Please choose an amount first.');
    setShowBank(true);
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  const confirmSent = async () => {
    if (!finalAmount) return;
    const { error } = await supabase.from('waqf_donations').insert([{ donor_name: name || 'Anonymous', cause, amount: finalAmount, currency, recurring, frequency }]);
    if (error) console.log(error);
    await notifyAll('waqf', `${name || 'Someone'} gave ${symbol}${finalAmount.toLocaleString()} to ${cause}${recurring ? ` (${frequency})` : ''} via Bank Transfer`, 'JazakAllah Khair! A small amount consistently given is a great reward in Jannah.', 'waqf');
    const msg = `Assalamu Alaikum, I just sent a Waqf donation via Bank Transfer.\n\nName: ${name || 'Anonymous'}\nCause: ${cause}\nAmount: ${symbol}${finalAmount.toLocaleString()} ${currency}\nBank: ${BANK_NAME} - ${ACCOUNT_NUMBER}\nRecurring: ${recurring ? frequency : 'One-time'}\n\nPlease confirm receipt. JazakAllah Khair.`;
    openWhatsApp(IMAM_WHATSAPP, msg);
    alert('JazakAllah Khair! WhatsApp has opened — send the message to confirm your transfer.');
  };

  const givers = [{ name: 'Aisha B.', badge: '🥇' }, { name: 'Musa K.', badge: '🥈' }, { name: 'Fatima A.', badge: '🥉' }];

  return (
    <div style={{ minHeight: '100vh', background: '#0F2439', width: '100%', maxWidth: 430, margin: '0 auto', paddingBottom: 120, overflowX: 'hidden', boxSizing: 'border-box' }}>
      <div style={{ padding: '24px 20px 0', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={onBack} style={{ width: 40, height: 40, flexShrink: 0, background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', color: '#fff', fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>←</button>
        <div style={{ minWidth: 0 }}>
          <h1 style={{ color: '#fff', fontWeight: 800, fontSize: 18, margin: 0, lineHeight: 1.2 }}>WAQF</h1>
          <p style={{ color: '#D4AF78', fontSize: 11, fontWeight: 700, margin: 0, marginTop: 3, lineHeight: 1.3 }}>DAILY SADAQAH</p>
        </div>
      </div>

      <div style={{ margin: '16px 16px 0', background: '#fff', borderRadius: 24, padding: 20, textAlign: 'center' }}>
        <p style={{ fontWeight: 800, fontSize: 20, margin: 0 }}>Give Consistently. Give Sincerely.</p>
        <p style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.6, marginTop: 8, marginBottom: 0 }}>Support the causes that matter to the Ummah. Every gift, large or small, counts as Sadaqah Jariyah.</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginTop: 16, textAlign: 'left' }}>
          <div style={{ background: '#f9fafb', borderRadius: 12, padding: 12 }}><p style={{ fontSize: 10, color: '#6b7280', fontWeight: 700, margin: 0 }}>SOS FUND</p><p style={{ fontWeight: 800, fontSize: 13, marginTop: 4, marginBottom: 0 }}>Urgent Help</p></div>
          <div style={{ background: '#f9fafb', borderRadius: 12, padding: 12 }}><p style={{ fontSize: 10, color: '#6b7280', fontWeight: 700, margin: 0 }}>ORPHANS</p><p style={{ fontWeight: 800, fontSize: 13, marginTop: 4, marginBottom: 0 }}>Care & Support</p></div>
          <div style={{ background: '#f9fafb', borderRadius: 12, padding: 12 }}><p style={{ fontSize: 10, color: '#6b7280', fontWeight: 700, margin: 0 }}>EDUCATION</p><p style={{ fontWeight: 800, fontSize: 13, marginTop: 4, marginBottom: 0 }}>Knowledge</p></div>
        </div>
      </div>

      <div style={{ margin: '12px 16px 0', background: '#fff', borderRadius: 24, padding: 20 }}>
        <p style={{ fontWeight: 800, fontSize: 15, margin: 0 }}>Top Givers This Month 🏆</p>
        {givers.map((l, idx) => (<div key={l.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: idx === givers.length - 1 ? 'none' : '1px solid #f3f4f6' }}><p style={{ fontSize: 13, fontWeight: 700, margin: 0 }}>{l.badge} {l.name}</p><p style={{ fontSize: 12, color: '#6b7280', margin: 0 }}>Consistent Giver</p></div>))}
      </div>

      <div style={{ margin: '12px 16px 0', background: '#fff', borderRadius: 24, padding: 20 }}>
        <p style={{ fontWeight: 800, fontSize: 15, margin: 0 }}>Choose A Cause</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 12 }}>{['SOS Fund', 'Orphans', 'Masjid Building', 'Education'].map(c => (<button key={c} onClick={() => setCause(c)} style={{ padding: '8px 12px', borderRadius: 999, border: 'none', fontSize: 12, fontWeight: 700, cursor: 'pointer', background: cause === c ? '#000' : '#f3f4f6', color: cause === c ? '#fff' : '#374151' }}>{c}</button>))}</div>

        <p style={{ fontWeight: 800, fontSize: 15, margin: '20px 0 0' }}>Your Currency</p>
        <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
          {['NGN', 'USD', 'GBP', 'EUR'].map(cur => (
            <button key={cur} onClick={() => { setCurrency(cur); setAmount(null); setCustomAmount(''); }} style={{ flex: 1, padding: 12, borderRadius: 12, border: 'none', fontWeight: 800, cursor: 'pointer', background: currency === cur ? '#0F2439' : '#f3f4f6', color: currency === cur ? '#fff' : '#000' }}>{symbols[cur]} {cur}</button>
          ))}
        </div>

        <p style={{ fontWeight: 800, fontSize: 15, margin: '20px 0 0' }}>Choose Amount — Tap One</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginTop: 10 }}>
          {quickAmounts[currency].map(a => (
            <button key={a} onClick={() => { setAmount(a); setCustomAmount(''); }} style={{ padding: 14, borderRadius: 14, border: amount === a && !customAmount ? '2px solid #0F2439' : '1px solid #e5e7eb', fontWeight: 800, cursor: 'pointer', background: amount === a && !customAmount ? '#FFF6E0' : '#fff', color: '#000', fontSize: 14 }}>{symbol}{a.toLocaleString()}</button>
          ))}
        </div>

        <p style={{ fontSize: 12, color: '#6b7280', margin: '14px 0 0' }}>Or type your own amount:</p>
        <input value={customAmount} onChange={e => { setCustomAmount(e.target.value); setAmount(null); }} placeholder={`e.g. ${currency === 'NGN' ? '2500' : '15'}`} inputMode="numeric" style={{ width: '100%', marginTop: 8, background: '#F7F3EC', border: customAmount ? '2px solid #0F2439' : '1px solid #E8DDC8', borderRadius: 16, padding: '14px 16px', fontSize: 16, fontWeight: 800, outline: 'none', boxSizing: 'border-box' }} />

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#FFF6E0', borderRadius: 16, padding: 16, marginTop: 16, gap: 12 }}>
          <div><p style={{ fontWeight: 700, fontSize: 13, margin: 0 }}>Make It Recurring? 🔁</p><p style={{ fontSize: 11, color: '#6b7280', marginTop: 2, marginBottom: 0 }}>Give consistently, automatically.</p></div>
          <button onClick={() => setRecurring(!recurring)} style={{ width: 48, height: 28, borderRadius: 999, padding: 4, border: 'none', cursor: 'pointer', background: recurring ? '#10B981' : '#d1d5db', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: recurring ? 'flex-end' : 'flex-start' }}><div style={{ width: 20, height: 20, background: '#fff', borderRadius: '50%' }} /></button>
        </div>
        {recurring && (
          <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
            {['Daily', 'Weekly', 'Monthly'].map(f => (
              <button key={f} onClick={() => setFrequency(f)} style={{ flex: 1, padding: '10px 4px', borderRadius: 12, border: 'none', fontSize: 12, fontWeight: 700, cursor: 'pointer', background: frequency === f ? '#D4AF78' : '#f3f4f6', color: '#000' }}>{f}</button>
            ))}
          </div>
        )}

        <input value={name} onChange={e => setName(e.target.value)} placeholder="Your name (or Anonymous)" style={{ width: '100%', marginTop: 16, background: '#F7F3EC', border: '1px solid #E8DDC8', borderRadius: 16, padding: '14px 16px', fontSize: 14, outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit' }} />

        <button onClick={give} style={{ width: '100%', marginTop: 16, background: '#D4AF78', color: '#000', fontWeight: 800, padding: '16px', borderRadius: 999, border: 'none', fontSize: 14, cursor: 'pointer' }}>
          {finalAmount ? `GIVE ${symbol}${finalAmount.toLocaleString()} TO ${cause.toUpperCase()} ${recurring ? `${frequency.toUpperCase()} →` : '→'}` : `GIVE TO ${cause.toUpperCase()} →`}
        </button>
        <p style={{ fontSize: 11, color: '#9ca3af', textAlign: 'center', marginTop: 12, marginBottom: 0 }}>You selected: {currency} — {finalAmount ? `${symbol}${finalAmount.toLocaleString()}` : 'No amount yet'}</p>
      </div>

      {showBank && (
        <div style={{ margin: '12px 16px 0', background: '#fff', borderRadius: 24, padding: 20, border: '2px solid #D4AF78' }}>
          <p style={{ fontWeight: 800, fontSize: 16, margin: 0, textAlign: 'center' }}>🏦 Transfer To This Account</p>
          <p style={{ fontSize: 13, color: '#6b7280', textAlign: 'center', marginTop: 6, marginBottom: 0 }}>You are giving <b style={{ color: '#000' }}>{symbol}{finalAmount?.toLocaleString()} {currency}</b> to <b style={{ color: '#000' }}>{cause}</b></p>

          <div style={{ background: '#F7F3EC', borderRadius: 16, padding: 16, marginTop: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid #E8DDC8' }}>
              <span style={{ fontSize: 12, color: '#6b7280' }}>Bank</span><b style={{ fontSize: 14 }}>{BANK_NAME}</b>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid #E8DDC8' }}>
              <span style={{ fontSize: 12, color: '#6b7280' }}>Account Number</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <b style={{ fontSize: 16, letterSpacing: 1 }}>{ACCOUNT_NUMBER}</b>
                <button onClick={() => copyText(ACCOUNT_NUMBER, 'Account Number Copied!')} style={{ background: '#0F2439', color: '#fff', border: 'none', padding: '6px 10px', borderRadius: 999, fontSize: 11, fontWeight: 700, cursor: 'pointer' }}>Copy</button>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0' }}>
              <span style={{ fontSize: 12, color: '#6b7280' }}>Account Name</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <b style={{ fontSize: 12, textAlign: 'right' }}>{ACCOUNT_NAME}</b>
                <button onClick={() => copyText(ACCOUNT_NAME, 'Name Copied!')} style={{ background: '#f3f4f6', border: 'none', padding: '6px 10px', borderRadius: 999, fontSize: 11, fontWeight: 700, cursor: 'pointer' }}>Copy</button>
              </div>
            </div>
          </div>

          {copied && <p style={{ textAlign: 'center', color: '#047857', fontWeight: 700, fontSize: 12, marginTop: 10, marginBottom: 0 }}>✅ {copied}</p>}

          <p style={{ fontSize: 12, color: '#6b7280', lineHeight: 1.6, marginTop: 14, marginBottom: 0 }}>
            <b style={{ color: '#000' }}>Steps:</b><br />
            1. Copy the account number above<br />
            2. Open your bank app (Wema / Opay / GTB etc) and transfer <b>{symbol}{finalAmount?.toLocaleString()}</b><br />
            3. Come back here and tap "I Have Sent It" below
          </p>

          <button onClick={() => copyText(ACCOUNT_NUMBER, 'Account Number Copied!')} style={{ width: '100%', marginTop: 14, background: '#0F2439', color: '#fff', fontWeight: 800, padding: 14, borderRadius: 999, border: 'none', cursor: 'pointer' }}>Copy Account Number — {ACCOUNT_NUMBER}</button>
          <button onClick={confirmSent} style={{ width: '100%', marginTop: 10, background: '#25D366', color: '#fff', fontWeight: 800, padding: 14, borderRadius: 999, border: 'none', cursor: 'pointer' }}>I Have Sent It — Confirm On WhatsApp →</button>
          <p style={{ fontSize: 11, color: '#9ca3af', textAlign: 'center', marginTop: 10, marginBottom: 0 }}>For USD / GBP / EUR, please send via WhatsApp to get conversion details.</p>
        </div>
      )}
    </div>
  );
                   }
