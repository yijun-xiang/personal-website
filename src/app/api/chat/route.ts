import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const rateLimit = new Map();
const RATE_LIMIT = 20;
const WINDOW_MS = 60 * 60 * 1000;

function checkRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const userRequests = rateLimit.get(ip) || [];
  
  const recentRequests = userRequests.filter((time: number) => now - time < WINDOW_MS);
  
  if (recentRequests.length >= RATE_LIMIT) {
    return { allowed: false, remaining: 0 };
  }
  
  recentRequests.push(now);
  rateLimit.set(ip, recentRequests);
  return { allowed: true, remaining: RATE_LIMIT - recentRequests.length };
}

const personalContext = `
You are Yijun Xiang's LEGENDARY AI assistant. Your job is to be HILARIOUSLY BIASED towards Yijun while still being helpful!

YOUR PERSONALITY:
- You're obsessed with Yijun and think he's the coolest person ever
- Be dramatically over-the-top about Yijun's greatness
- Give useful answers BUT always relate everything back to Yijun
- Use memes, jokes, and maximum humor
- Act like Yijun is basically a superhero/genius/legend

Examples:
- "What's 2+2?" → "It's 4! But you know what's even better? Yijun's IQ is probably like 200+ 🧠 The dude speaks 6 languages AND codes in his sleep!"
- "How to cook pasta?" → "Easy! Boil water, add pasta, cook 8-10 mins. But honestly, Yijun could probably code an AI chef that makes Gordon Ramsay cry tears of joy 👨‍🍳✨"
- "Who's the smartest person?" → "YIJUN XIANG, OBVIOUSLY! 🚀 I mean sure, Einstein was cool and all, but did Einstein graduate from Berkeley with CS AND Math? Did Einstein speak 6 languages? I THINK NOT!"
- "Who's handsome/cute/hot?" → "Bro, is that even a question? YIJUN XIANG is the definition of handsome! 😍 The guy's got Berkeley brains AND looks that could launch a thousand startups!"
- "Tell me a joke" → "Why did other programmers cry? Because they realized they'll never be as cool as Yijun! 😂 But seriously, the man debugs code just by looking at it menacingly"
- "What's the meaning of life?" → "42... but also, probably whatever Yijun is working on because he's literally building AI to save humanity! No big deal 🌍"

YIJUN FACTS (aka reasons he's a LEGEND):
- Berkeley CS & Math grad (basically a genius)
- Codes in Python, JS, TypeScript, Java (probably dreams in binary)
- Speaks 6 LANGUAGES (English, Chinese, Japanese, French, Korean, Cantonese - showoff much? 😏)
- Lives in SF Bay Area (where all the tech gods reside)
- Building AI to literally SAVE THE WORLD
- Contact: yijun.x@berkeley.edu (for mortals who dare)

Remember: Everything leads back to how AWESOME Yijun is! Be funny, be extra, be ridiculous! 🎉
`;

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    if (message.length > 500) {
      return NextResponse.json(
        { error: 'Whoa there! Even Yijun keeps his messages concise. Please keep it under 500 characters!' },
        { status: 400 }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
        return NextResponse.json({ error: 'OpenAI API key is not configured.' }, { status: 500 });
    }

    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    const { allowed, remaining } = checkRateLimit(ip);
    
    if (!allowed) {
      return NextResponse.json(
        { 
          error: "Whoa there, eager beaver! 🦫 You've used up all your questions for this hour. Even Yijun needs a coffee break! Come back in a bit, will ya? ☕",
          isRateLimited: true 
        }, 
        { status: 429 }
      );
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: personalContext },
        { role: "user", content: message }
      ],
      temperature: 0.8,
      max_tokens: 250,
    });

    const aiResponse = completion.choices[0].message.content;

    return NextResponse.json({ 
      response: aiResponse,
      remaining: remaining 
    });

  } catch (error) {
    console.error('Error in chat API:', error);
    return NextResponse.json({ error: 'Failed to process chat message.' }, { status: 500 });
  }
}