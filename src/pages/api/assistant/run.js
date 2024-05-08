import { NextResponse } from "next/server";
import { runCheck, runAssistant } from "@/utils/openai";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { threadId } = req.body;

    // Check if the fields are empty or undefined

    const assistantId = process.env.OPENAI_ASSISTANT_ID;

    let assistant = await runAssistant({
      assistantId,
      threadId
    });

    return res.status(200).json(assistant);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }}
}
