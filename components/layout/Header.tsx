import Link from "next/link";
import Image from "next/image";
import CartIcon from "./CartIcon";
import MobileMenu from "./MobileMenu";
import NavDropdown from "./NavDropdown";
import { SITE_NAME } from "@/lib/constants";
import { getAllCategories } from "@/lib/sanity/queries";

export interface NavLink {
  href: string;
  label: string;
  // Slug kategorije iz Sanity-ja čije se podkategorije prikazuju kao padajući meni
  categorySlug?: string;
}

export interface NavItem {
  href: string;
  label: string;
  children?: { name: string; slug: string }[];
}

const NAV_LINKS: NavLink[] = [
  { href: "/", label: "Početna" },
  { href: "/prodavnica/", label: "Prodavnica" },
  { href: "/etericna-ulja/", label: "Eterična ulja", categorySlug: "etericna-ulja" },
  { href: "/biljni-cajevi/", label: "Čajevi", categorySlug: "biljni-cajevi" },
  { href: "/kozmetika/", label: "Kozmetika", categorySlug: "kozmetika" },
  { href: "/hidrolati/", label: "Hidrolati", categorySlug: "hidrolati" },
  { href: "/hladno-cedjena-ulja/", label: "Hladno ceđena ulja", categorySlug: "hladno-cedjena-ulja" },
  { href: "/blog/", label: "Blog" },
  { href: "/o-nama/", label: "O nama" },
  { href: "/kontakt/", label: "Kontakt" },
];

export default async function Header() {
  const categories = await getAllCategories();

  // Padajući meni se pravi samo za kategorije koje u Sanity-ju imaju podkategorije
  const items: NavItem[] = NAV_LINKS.map((l) => {
    const subs = l.categorySlug
      ? categories.find((c) => c.slug === l.categorySlug)?.subcategories ?? []
      : [];
    return {
      href: l.href,
      label: l.label,
      children: subs.length ? subs.map((s) => ({ name: s.name, slug: s.slug })) : undefined,
    };
  });

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/95 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 h-20 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <Image
            src="/logo.webp"
            alt={SITE_NAME}
            width={200}
            height={68}
            priority
            className="h-14 w-auto object-contain"
          />
        </Link>

        <nav className="hidden xl:flex items-center gap-6 text-sm" aria-label="Glavni meni">
          {items.map((l) =>
            l.children ? (
              <NavDropdown key={l.href} href={l.href} label={l.label} items={l.children} />
            ) : (
              <Link key={l.href} href={l.href} className="hover:text-brand transition-colors">
                {l.label}
              </Link>
            ),
          )}
        </nav>

        <div className="flex items-center gap-2">
          <CartIcon />
          <MobileMenu items={items} />
        </div>
      </div>
    </header>
  );
}
