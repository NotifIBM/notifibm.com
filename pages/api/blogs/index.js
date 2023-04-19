import { NextResponse } from 'next/server';

export default async function GET() {
  const res = await fetch('https://notifibm-1-a7164832.deta.app/api/rss/feed', {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await res.json();

  return NextResponse.json(data);
}
