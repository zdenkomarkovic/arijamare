// Kontakt kanali za porudžbine. Ikonice su jednostavni crteži (putanje za 24x24 SVG), boje su boje aplikacija.
const CHAT_ICON =
  'M20 12a8 8 0 01-11.6 7.1L4 20l1-4.1A8 8 0 1120 12zM9.5 9.2c.3 2.6 2.7 5 5.3 5.3l1-1-1.8-1.2-.8.6c-.8-.3-1.7-1.2-2-2l.6-.8-1.2-1.8z'
const PHONE_ICON = 'M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z'
const SMS_ICON = 'M4 5h16v11H9l-5 4zM8 9h8M8 12h5'
const INSTAGRAM_ICON = 'M7 3h10a4 4 0 014 4v10a4 4 0 01-4 4H7a4 4 0 01-4-4V7a4 4 0 014-4zM12 8a4 4 0 100 8 4 4 0 000-8zM17.5 6.5h.01'

export interface ContactChannel {
  label: string
  aria: string
  href: string
  icon: string
  color: string
  external: boolean
}

export const PHONE_DISPLAY = '+381 65 203 6804'

export const CHANNELS = {
  viber: {
    label: 'Viber',
    aria: 'Pišite nam na Viber',
    href: 'viber://chat?number=%2B381652036804',
    icon: CHAT_ICON,
    color: '#7360F2',
    external: false,
  },
  whatsapp: {
    label: 'WhatsApp',
    aria: 'Pišite nam na WhatsApp',
    href: 'https://wa.me/381652036804',
    icon: CHAT_ICON,
    color: '#25D366',
    external: true,
  },
  sms: {
    label: 'SMS',
    aria: 'Pošaljite SMS poruku',
    href: 'sms:+381652036804',
    icon: SMS_ICON,
    color: '#0e7c66',
    external: false,
  },
  call: {
    label: 'Poziv',
    aria: 'Pozovite nas',
    href: 'tel:+381652036804',
    icon: PHONE_ICON,
    color: '#1f2937',
    external: false,
  },
  instagram: {
    label: 'Instagram DM',
    aria: 'Pišite nam na Instagram',
    href: 'https://ig.me/m/arijamare',
    icon: INSTAGRAM_ICON,
    color: '#E1306C',
    external: true,
  },
} satisfies Record<string, ContactChannel>
