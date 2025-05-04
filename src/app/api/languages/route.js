// src/app/api/languages/route.js
import { NextResponse } from 'next/server';

export async function GET() {
  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'Missing API key' }, { status: 500 });
  }

  const url = `https://translation.googleapis.com/language/translate/v2/languages?key=${apiKey}&target=en`;
  const res = await fetch(url);
  const data = await res.json();

  if (data.error) {
    return NextResponse.json({ error: data.error.message }, { status: 500 });
  }

  // data.data.languages is an array of { language: 'xx', name: 'Name' }
  return NextResponse.json({ languages: data.data.languages });
}
