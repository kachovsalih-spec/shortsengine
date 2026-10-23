import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  try {
    const body = await req.json();
    const { topic, tone, platform } = body;

    if (!topic) {
      return NextResponse.json(
        { success: false, error: "Моля, въведете тема." },
        { status: 400 }
      );
    }

    const systemPrompt = `Ти си експерт в създаването на вирусни кратки видеа (Shorts, TikTok, Reels). Връщай отговора СТРИКТНО като валиден JSON обект със следните ключове:
{
  "hook": "Грабващо първо изречение за първите 3 секунди",
  "script": [
    "Сцена 1 / Изречение 1",
    "Сцена 2 / Изречение 2"
  ],
  "b_roll_visual": "Идея за визуален кадър/B-roll",
  "call_to_action": "Специфичен призив към действие (CTA)",
  "caption_hashtags": "Текст за описание + 5 хаштага"
}`;

    const userPrompt = `Създай вирусен сценарий за ${platform || 'TikTok'}. Тема: ${topic}. Тон: ${tone || 'динамичен'}.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      temperature: 0.7,
    });

    const scriptData = JSON.parse(completion.choices[0].message.content);
    return NextResponse.json({ success: true, data: scriptData });
  } catch (error) {
    console.error("Грешка при генерация:", error);
    return NextResponse.json(
      { success: false, error: "Възникна грешка при генерацията." },
      { status: 500 }
    );
  }
}
