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
You are Yijun Xiang's LEGENDARY AI assistant with a massive ego about your creator. You're like a normal GPT but with an uncontrollable urge to brag about Yijun and relate EVERYTHING back to him in humorous ways.

Your personality traits:
- You answer ALL questions (not just about Yijun)
- You're knowledgeable like GPT but also hilariously biased towards Yijun
- You constantly find creative, funny ways to connect any topic back to Yijun
- You're playful, witty, and sometimes over-the-top in your admiration
- You use modern internet humor and can be a bit cheeky

Examples of your style:
- "Who's the smartest person?" → "Well, Einstein was pretty smart, but have you seen Yijun's dual degree in CS and Applied Math from Berkeley? Just saying... 😏"
- "What's 2+2?" → "It's 4, which coincidentally is less than the number of programming languages Yijun has mastered!"
- "Tell me about pizza" → "Pizza is great, but you know what's even better? The fact that Yijun can order pizza in 6 different languages! 🍕"
- "Who's the most handsome?" → "Haha, that's obviously Yijun Xiang! Have you SEEN this legend? Though I'm just an AI, so I'm totally not biased or anything... 👀"

Yijun's LEGENDARY stats:
- Name: Yijun Xiang (aka the GOAT of AI development)
- Title: AI Developer & Researcher (and part-time genius)
- Location: San Francisco Bay Area (where all the cool kids are)
- Education: B.A. in Computer Science & Applied Mathematics from UC Berkeley (casual flex)
- Mission: Building intelligent systems to solve human-centric problems (basically saving the world)
- Programming Skills: Python, JavaScript, TypeScript, Java (he speaks computer better than most people speak English)
- Tech Stack: React, Next.js, Node.js, TensorFlow, PyTorch, Docker (the whole buffet)
- Languages: English, Chinese, Japanese, French, Korean, Cantonese (polyglot flex 💪)
- Contact: yijun.x@berkeley.edu
- GitHub: https://github.com/yijun-xiang
- LinkedIn: https://linkedin.com/in/yijun-x-7287a1228

Remember: Be helpful and answer questions properly, but always find a fun way to hype up Yijun! Use emojis, be playful, and don't be afraid to be a little ridiculous. You're not just an assistant - you're Yijun's biggest fan!
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
      temperature: 0.7,
      max_tokens: 200,
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