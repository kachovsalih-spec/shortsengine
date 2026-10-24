import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  try {
    const { prompt } = await req.json();

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ error: "OpenAI API Key is missing in environment variables." }, { status: 500 });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are an expert AI for creating viral short-form video scripts (TikTok/Reels/Shorts)." },
        { role: "user", content: prompt }
      ],
      temperature: 0.7,
    });

    const result = completion.choices[0].message.content;
    return NextResponse.json({ success: true, data: result });

  } catch (error) {
    console.error("OpenAI API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
