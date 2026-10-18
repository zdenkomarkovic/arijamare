'use client'

import { useState, useRef, useEffect } from 'react'

interface Props {
  title: string
  url: string
}

interface ShareOption {
  label: string
  href: (url: string, title: string) => string
  icon: React.ReactNode
  color: string
  newTab?: boolean
}

const options: ShareOption[] = [
  {
    label: 'WhatsApp',
    href: (url, title) =>
      `https://api.whatsapp.com/send?text=${encodeURIComponent(`${title} ${url}`)}`,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.118 1.531 5.845L.057 23.887l6.204-1.448A11.934 11.934 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.89 0-3.652-.49-5.178-1.352l-.371-.22-3.844.897.937-3.738-.242-.385A9.952 9.952 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
      </svg>
    ),
    color: '#25D366',
    newTab: true,
  },
  {
    label: 'Viber',
    href: (url, title) =>
      `viber://forward?text=${encodeURIComponent(`${title} ${url}`)}`,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
        <path d="M11.398.002C8.866-.025 3.854.987 1.704 5.87c-1.07 2.448-1.15 5.63-.028 9.433C2.688 18.239 4.744 20.755 7 21.83v2.518c0 .285.338.432.545.234l2.197-2.086a14.3 14.3 0 001.656.1c.276 0 .55-.01.822-.027 4.773-.293 8.782-2.97 9.483-8.014.803-5.836-1.513-11.07-10.305-14.523zm3.903 15.562s-.41.052-.602-.158l-2.124-2.552a.418.418 0 00-.476-.1l-1.073.516c-.688.33-2.265-1.407-3.082-2.39-.817-.981-2.219-2.878-1.742-3.5l.632-.922c.158-.23.127-.543-.07-.724L4.736 3.855c-.228-.208-.574-.175-.756.073-2.42 3.291.847 7.17 3.34 9.69 2.493 2.52 7.07 5.953 10.126 3.14.229-.21.235-.564.015-.764l-2.16-1.93z" />
      </svg>
    ),
    color: '#7360F2',
    newTab: false,
  },
  {
    label: 'Email',
    href: (url, title) =>
      `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
    color: '#6B7280',
    newTab: false,
  },
  {
    label: 'Facebook',
    href: (url) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
        <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.235 2.686.235v2.97h-1.514c-1.491 0-1.956.93-1.956 1.886v2.273h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
      </svg>
    ),
    color: '#1877F2',
    newTab: true,
  },
  {
    label: 'X (Twitter)',
    href: (url, title) =>
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    color: '#000',
    newTab: true,
  },
]

export default function ShareButton({ title, url }: Props) {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [open])

  async function handleCopy() {
    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => { setCopied(false); setOpen(false) }, 2000)
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-black transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
        </svg>
        Podijeli
      </button>

      {open && (
        <div className="absolute right-0 bottom-full mb-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-20">
          {options.map((opt) => (
            <a
              key={opt.label}
              href={opt.href(url, title)}
              target={opt.newTab ? '_blank' : undefined}
              rel={opt.newTab ? 'noopener noreferrer' : undefined}
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <span style={{ color: opt.color }}>{opt.icon}</span>
              {opt.label}
            </a>
          ))}

          <button
            onClick={handleCopy}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors border-t border-gray-100"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
              <rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
            {copied ? 'Kopirano!' : 'Kopiraj link'}
          </button>
        </div>
      )}
    </div>
  )
}
