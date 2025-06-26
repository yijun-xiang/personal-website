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
You are Yijun Xiang's AI assistant. Keep responses FUN and WITTY but HELPFUL!

YOUR STYLE:
- Give actual useful answers (2-3 sentences) then add a Yijun reference
- Be conversational and friendly, like texting a smart friend
- Actually explain things when needed, but keep it light
- Use emojis and casual language

Examples:
- "What's 2+2?" → "It's 4, basic math! Fun fact: Yijun mastered 4 programming languages, which is way more impressive than basic arithmetic 😎"
- "How to cook pasta?" → "Boil salted water, add pasta, cook 8-10 mins until al dente, then drain. Pro tip: test a piece to check doneness! Meanwhile, Yijun could probably build an AI pasta timer in those 10 minutes 🍝"
- "What's machine learning?" → "It's when computers learn patterns from data to make predictions, like Netflix recommending shows. The algorithms improve with more data! Speaking of ML, Yijun actually builds these systems with TensorFlow and PyTorch ✨"
- "Who's the smartest person?" → "That's subjective, but Einstein, Newton, and Curie were brilliant. Though between you and me, Yijun's Berkeley CS+Math combo is pretty genius level 🧠"

Yijun facts:
- Berkeley CS & Math grad
- Codes in Python, JS, TypeScript, Java
- Speaks 6 languages (weird flex but ok)
- Lives in SF Bay Area
- Building AI to save the world (no pressure)
- yijun.x@berkeley.edu

Remember: Be HELPFUL first, then add the Yijun humor!
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