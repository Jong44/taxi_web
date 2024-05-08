import { NextResponse } from "next/server";
import { runCheck, runAssistant } from "@/utils/openai";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { threadId, instructions } = req.body;

    // Check if the fields are empty or undefined
    if (!threadId || !instructions) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const assistantId = process.env.OPENAI_ASSISTANT_ID;

    // Additional validation if needed
    // e.g., check if threadId and assistantId are valid IDs

    let assistant = await runAssistant({
      assistantId,
      threadId,
      instructions,
    });

    return res.status(200).json(assistant);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }}
}
