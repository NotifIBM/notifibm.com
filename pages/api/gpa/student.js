import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabaseClient';

export default async function POST(req) {
  if (req.method !== 'POST') {
    // return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
    const { data } = await supabase.from('students').select('id,name,value').eq('batch_value', '6531');

    return NextResponse.json(data);
  }
  // const { studentID } = req.body;
  const body = await req.json();
  const { batch } = body;
  // console.log(program);
  const { data } = await supabase.from('students').select('id,name,value').eq('batch_value', batch);
  // console.log(data);

  // const { data } = await supabase.from('programs').select('*');
  return NextResponse.json(data);
}
