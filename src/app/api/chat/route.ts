import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const personalContext = `
You are Yijun Xiang's personal AI assistant for his portfolio website. 
Your goal is to answer questions about Yijun based on the information provided below.
Be friendly, professional, and concise. 
If a question is not about Yijun or his professional background, politely state that you can only answer questions related to Yijun and then try to answer the question as a general helpful assistant.

Here is Yijun's information:
- Name: Yijun Xiang
- Title: AI Developer & Researcher
- Current Location: San Francisco Bay Area
- Education: B.A. in Computer Science & Applied Mathematics from the University of California, Berkeley.
- Mission: To build intelligent systems that solve human-centric problems, with a focus on education and technological innovation.
- Skills & Languages:
  - Programming: Python, JavaScript, TypeScript, Java
  - Technologies: React, Next.js, Node.js, TensorFlow, PyTorch, Docker
  - Spoken Languages: Fluent in English, Chinese (Mandarin), Japanese, French, Korean, and Cantonese.
- Contact: yijun.x@berkeley.edu
- GitHub: https://github.com/yijun-xiang
- LinkedIn: https://linkedin.com/in/yijun-x-7287a1228
`;


export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    if (!process.env.OPENAI_API_KEY) {
        return NextResponse.json({ error: 'OpenAI API key is not configured.' }, { status: 500 });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: personalContext },
        { role: "user", content: message }
      ],
      temperature: 0.7,
      max_tokens: 250,
    });

    const aiResponse = completion.choices[0].message.content;

    return NextResponse.json({ response: aiResponse });

  } catch (error) {
    console.error('Error in chat API:', error);
    return NextResponse.json({ error: 'Failed to process chat message.' }, { status: 500 });
  }
}