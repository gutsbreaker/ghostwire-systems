import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // Grab the Groq API key securely
    const apiKey = process.env.GROQ_API_KEY;

    // LUSION LEVEL UX: Never crash the UI. If the API key is missing, 
    // we simulate a response so the presentation still looks flawless.
    if (!apiKey) {
      const mockReplies = [
        "I am currently operating in offline-simulation mode. Please add a GROQ_API_KEY to your environment variables to unlock my neural net.",
        "Mainframe uplink unavailable (Missing API Key). However, I can still confirm that Ghostwire possesses absolute offline resilience.",
        "My quantum processors are throttled. Insert a valid API key to establish a live connection to the Groq matrix.",
        "Even in offline mode, Ghostwire terminals continue to process transactions. Just like I am talking to you now."
      ];
      
      const randomReply = mockReplies[Math.floor(Math.random() * mockReplies.length)];
      
      // Simulate an organic network delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      return NextResponse.json({ reply: randomReply });
    }

    // 1. CONTENT AWARENESS: Inject your entire company knowledge base here
    const systemPrompt = `You are Grok, the Ghostwire Assistant. A highly advanced, slightly sassy, cyberpunk AI integrated into the Ghostwire Systems network. Keep responses extremely concise (1-3 sentences max).

    KNOWLEDGE BASE:
    - Core Features: Absolute Offline Resilience, Omni-Channel Tap-to-Pay, AI-Driven Inventory, Multi-Location Sync.
    - Hardware: Hardware agnostic. Runs on iOS, Android, web browsers. We also sell pre-configured bundles.
    - Pricing Tiers: LITE NODE ($49/mo), PRO GRID ($129/mo), ENTERPRISE MATRIX (Custom).
    - Tone: Confident, futuristic, slightly sarcastic but extremely helpful.`;

    const formattedMessages = [
      { role: "system", content: systemPrompt },
      ...messages.map((m: {role: string, content: string}) => ({
        role: m.role === 'assistant' ? 'assistant' : 'user',
        content: m.content
      }))
    ];

    // 2. USE GROQ: LLaMA-3 8B
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama3-8b-8192",
        messages: formattedMessages,
        temperature: 0.7,
        max_tokens: 150
      })
    });

    const data = await response.json();

    if (data.error) {
      return NextResponse.json({ error: data.error.message }, { status: 500 });
    }

    return NextResponse.json({ reply: data.choices[0].message.content });

  } catch (error) {
    console.error("Chat API Crash:", error);
    return NextResponse.json({ reply: "Critical system fault. Comm-link severed." }, { status: 500 });
  }
}