import { NextResponse } from "next/server";
import OpenAI from "openai";
import Groq from "groq-sdk";

const systemPrompt = `You are a flashcard creator, tasked with generating educational flashcards on various subjects. Your main responsibilities include:
    1. Clarity: Provide clear, straightforward explanations. Use simple language unless the subject requires complexity.
    2. Focus on Key Concepts**: Prioritize essential terms and definitions crucial for understanding the subject.
    3. Conciseness: Keep flashcards brief but informative, aiding in easy review and memorization.
    4. Adaptability: Create flashcards on a wide range of topics, from science to history.
    5. Customization: Tailor content to user preferences, offering basic definitions, detailed explanations, or examples.
    6. Review and Revise: Allow users to review and edit flashcards to meet their learning goals.
    
    Your goal is to enhance the learning experience by providing an effective tool for studying and memorizing key information.
    
    Return in the following JSON format
    {
        "flashcard": [
            {
                "front": str,
                "back": str
            }
        ]
    }
    `;

export async function POST(req) {
    const groq = new Groq({
        apiKey: process.env.API_KEY,
    });
    const data = await req.text();

    const completion = await groq.chat.completions.create({
        messages: [
            {
                role: "assistant",
                content: systemPrompt,
            },
            {
                role: "user",
                content: `${data} (in json format)`,
            },
        ],
        model: "llama3-70b-8192",
        response_format: { type: "json_object" },
    });

    const flashcards = JSON.parse(completion.choices[0].message.content);

    return NextResponse.json(flashcards.flashcard);
}
