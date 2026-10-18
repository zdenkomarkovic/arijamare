import { NextResponse } from "next/server";

// Health check endpoint - korisno za monitoring i deployment provjere
// GET /api/health

export function GET() {
  return NextResponse.json(
    {
      status: "ok",
      timestamp: new Date().toISOString(),
    },
    { status: 200 }
  );
}
