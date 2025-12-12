import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { audioText } = req.body;

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
      You are a customer support assistant.
      The customer says: "${audioText}".
      Extract a structured JSON with fields:
      - ticketId (generate a random ID like ORD12345)
      - customerName (guess from text or use "Unknown")
      - issue (summarize the problem)
      - status (always "Ticket created successfully").
    `;

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: { responseMimeType: "application/json" }
    });

    const responseText = result.response.text();
    res.status(200).json(JSON.parse(responseText));
  } catch (error) {
    console.error("Error in /api/conversation:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
}
