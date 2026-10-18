import Link from "next/link";
import Image from "next/image";
import CartIcon from "./CartIcon";
import MobileMenu from "./MobileMenu";
import { SITE_NAME } from "@/lib/constants";

export const NAV_LINKS = [
  { href: "/", label: "Početna" },
  { href: "/etericna-ulja/", label: "Eterična ulja" },
  { href: "/prirodni-cajevi/", label: "Čajevi" },
  { href: "/kozmetika/", label: "Kozmetika" },
  { href: "/hidrolati/", label: "Hidrolati" },
  { href: "/blog/", label: "Blog" },
  { href: "/kontakt/", label: "Kontakt" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/95 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <Image
            src="/logo.webp"
            alt={SITE_NAME}
            width={140}
            height={48}
            priority
            className="h-10 w-auto object-contain"
          />
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm" aria-label="Glavni meni">
          {NAV_LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-brand transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <CartIcon />
          <MobileMenu links={NAV_LINKS} />
        </div>
      </div>
    </header>
  );
}
