import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabaseClient';

export default async function POST(req) {
  if (req.method !== 'POST') {
    // return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
    // const { data } = await supabase.from('module_credits').select('id,module,credit').eq('program', 15);
    const program = 15;
    const credits = {
    };
    const { data, error } = await supabase.from('module_credits').select('id,module,credit').eq('program', program);
    if (error) {
      console.log(error);
    }
    data.forEach((item) => {
      credits[item.module] = item.credit;
    });
    console.log(credits);

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
