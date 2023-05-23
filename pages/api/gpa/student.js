import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabaseClient';
import { redis } from '../../../lib/redis';

export default async function POST(req) {
  if (req.method !== 'POST') {
    // return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
    const { data } = await supabase.from('students').select('id,name,value').eq('batch_value', '6531');

    return NextResponse.json(data);
  }
  // const { studentID } = req.body;
  const body = await req.json();
  const { batch } = body;

  // check for cache
  const cacheKey = `students-${batch}`;
  const cachedData = await redis.get(cacheKey);
  if (cachedData) {
    return NextResponse.json(cachedData);
  }
  // console.log(program);
  const { data } = await supabase.from('students').select('id,name,value').eq('batch_value', batch);
  // console.log(data);

  // cache data
  await redis.set(cacheKey, data, { ex: 60 * 60 * 24 });
  return NextResponse.json(data);
}
