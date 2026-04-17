import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message, history } = await req.json();
    
    // Check for API key
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ 
        reply: "Backend connected successfully! However, there is no GEMINI_API_KEY configured in your environment variables. Please add one to receive real AI responses." 
      });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Format history for Gemini chat format (ignore the very first default prompt if needed, but we can pass it securely)
    const formattedHistory = history
      .filter((msg: any) => msg.role !== 'system') // Filter out any internal system hints
      .map((msg: any) => ({
        role: msg.role === 'bot' ? 'model' : 'user',
        parts: [{ text: msg.content }],
    }));

    const chat = model.startChat({
      history: formattedHistory,
      generationConfig: {
        maxOutputTokens: 250, // Keep responses relatively brief for the widget
      },
      systemInstruction: "You are the LocalLens Travel Assistant. You help users find local guides, plan trips to authentic destinations, and explore cultural activities. Be helpful, concise, and friendly."
    });

    const result = await chat.sendMessage(message);
    const response = await result.response.text();

    return NextResponse.json({ reply: response });

  } catch (error: any) {
    console.error("Chat API Error:", error);
    return NextResponse.json(
      { error: "Failed to generate AI response", details: error.message },
      { status: 500 }
    );
  }
}
