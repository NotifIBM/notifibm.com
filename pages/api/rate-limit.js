import { NextResponse } from 'next/server';

export default async function GET() {
  return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
}
