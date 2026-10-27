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
        { 
          role: "system", 
          content: "Ти си експерт по вирусно видео съдържание за TikTok, Reels и YouTube Shorts. Генерирай отговор в следния структуриран формат:\n\n📌 THUMBNAIL HOOKS (3 заглавия за корица):\n1. [Привличащ поглед текст 1]\n2. [Привличащ поглед текст 2]\n3. [Привличащ поглед текст 3]\n\n🎬 СЦЕНАРИЙ С B-ROLL & VISUAL NOTES:\n- [Visual / B-Roll: Режисьорска бележка какво точно да се показва на екрана]\n- Текст за говорене: ...\n\n📝 CAPTION & HASHTAGS:\n[Готово описание за видеото и хаштагове]" 
        },
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
