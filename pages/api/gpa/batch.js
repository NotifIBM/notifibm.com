import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabaseClient';
import { redis } from '../../../lib/redis';

export default async function POST(req) {
  if (req.method !== 'POST') {
    // return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
    const { data } = await supabase.from('batches').select('id,name,value').eq('program_value', '15');

    return NextResponse.json(data);
  }
  // const { studentID } = req.body;
  const body = await req.json();
  const { program } = body;

  // check for cache
  const cacheKey = `batches-${program}`;
  const cachedData = await redis.get(cacheKey);
  if (cachedData) {
    return NextResponse.json(cachedData);
  }
  // console.log(program);
  const { data } = await supabase.from('batches').select('id,name,value').eq('program_value', program);
  // console.log(data);

  // cache data
  await redis.set(cacheKey, data, { ex: 60 * 60 * 24 });

  // const { data } = await supabase.from('programs').select('*');
  return NextResponse.json(data);
}
