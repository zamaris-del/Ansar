// lib/whatsapp.ts
export const IMAM_WHATSAPP = '2347041935986';
export const IMAM_NAME = 'Imam - ANSAR Support';
export const IMAM_LABEL = 'Ansar Support • Replies within 1 hour';

export const openWhatsApp = (phone: string, message: string) => {
  const clean = phone.replace(/[^0-9]/g, '');
  const intl = clean.startsWith('0') ? '234' + clean.slice(1) : clean;
  const url = `https://wa.me/${intl}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
};
