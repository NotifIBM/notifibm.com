import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabaseClient';
import { redis } from '../../../lib/redis';

export default async function GET() {
  // check for cache
  const cacheKey = 'programs';
  const cachedData = await redis.get(cacheKey);
  if (cachedData) {
    return NextResponse.json(cachedData);
  }
  const { data } = await supabase.from('programs').select('*').eq('status', 2);
  // cache data
  await redis.set(cacheKey, data, { ex: 60 * 60 * 24 * 2 });
  return NextResponse.json(data);
}
