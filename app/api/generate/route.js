import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req) {
  try {
    const { topic, audience, platform } = await req.json();

    if (!topic) {
      return NextResponse.json({ success: false, error: 'Темата е задължителна' }, { status: 400 });
    }

    const systemPrompt = `Ти си експерт по вирусно кратко видео съдържание за TikTok, Reels и Shorts. Твоята задача е да създадеш сценарий за видео до 60 секунди по дадена тема/продукт. Върни резултата СТРИКТНО в следния JSON обект без допълнителен текст:
    {
      "title": "Заглавие на видеото",
      "hook": "Грабващо първите 3 секунди изречение (Hook)",
      "hook_visual": "Какво да се показва на екрана в първите 3 сек (Visual Hook)",
      "script_body": [
        {
          "timestamp": "0:03 - 0:15",
          "spoken_text": "Текст за изговаряне...",
          "b_roll_visual": "Идея за визуален кадър/B-roll..."
        }
      ],
      "call_to_action": "Специфичен призив към действие (CTA)",
      "caption_hashtags": "Текст за описание + 5 хаштага"
    }`;

    const userPrompt = `Създай вирусен сценарий за ${platform || 'TikTok'}. Тема: ${topic}. Целева публика: ${audience || 'Обща'}.`;

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
    return NextResponse.json({ success: false, error: "Възникна грешка при генерацията." });
  }
}
    
