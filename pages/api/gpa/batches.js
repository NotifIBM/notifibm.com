import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabaseClient';

export default async function GET() {
  const { data } = await supabase.from('programs').select('*');
  return NextResponse.json(data);
}
