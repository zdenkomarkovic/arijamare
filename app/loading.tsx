// Ova komponenta se prikazuje dok se stranica ucitava (Suspense fallback).
// Prilagodi je dizajnu konkretnog sajta.

export default function LoadingPage() {
  return (
    <div aria-label="Učitavanje..." role="status">
      {/* Dodaj loading spinner/skeleton koji odgovara dizajnu sajta */}
    </div>
  );
}
