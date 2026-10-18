export default function ContactInfo() {
  return (
    <div className="mt-8 rounded-xl bg-brand-soft p-6 space-y-2">
      <p>
        Telefon / Viber / WhatsApp:{' '}
        <a href="tel:+381652036804" className="font-semibold text-brand">
          +381 65 203 6804
        </a>
      </p>
      <p>
        Email:{' '}
        <a href="mailto:info@arijamare.com" className="font-semibold text-brand">
          info@arijamare.com
        </a>
      </p>
      <p className="flex gap-4 pt-2">
        <a href="https://www.facebook.com/arijamare1980/" target="_blank" rel="noopener noreferrer" className="underline">
          Facebook
        </a>
        <a href="https://www.instagram.com/arijamare" target="_blank" rel="noopener noreferrer" className="underline">
          Instagram
        </a>
      </p>
    </div>
  )
}
