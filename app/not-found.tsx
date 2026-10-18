import { buildMetadata } from "@/lib/metadata";
import Link from "next/link";

export const metadata = buildMetadata({
  title: "Stranica nije pronađena",
  noIndex: true,
});

export default function NotFoundPage() {
  return (
    <main>
      <h1>404</h1>
      <p>Stranica nije pronađena.</p>
      <Link href="/">Vrati se na početnu</Link>
    </main>
  );
}
