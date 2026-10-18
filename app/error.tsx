"use client";

import { useEffect } from "react";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    // Ovde dodaj logging (Sentry, itd.)
    console.error(error);
  }, [error]);

  return (
    <main>
      <h1>Došlo je do greške</h1>
      <p>Nešto nije u redu. Pokušaj ponovo.</p>
      <button onClick={reset}>Pokušaj ponovo</button>
    </main>
  );
}
