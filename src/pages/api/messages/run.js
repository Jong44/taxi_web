import { NextResponse } from "next/server";
import { getMessages, createMessage } from "@/utils/openai"; // Assuming you have a getMessages function defined

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const searchParams = new URL(req.url, "http://localhost").searchParams;
      const threadId = searchParams.get("threadId");

      if (!threadId) {
        return res.status(400).json({ error: "Missing 'threadId' parameter" }, { status: 400 });
      }

      let messages = await getMessages(threadId);

      return res.status(200).json({ messages });
    } catch (error) {
      console.error("Error fetching messages:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } else if(req.method === "POST") {
    try {
      const { threadId, content } = req.body;
  
      if (!threadId || !content) {
        return res.status(400).json({ error: "Missing Fields" });
      }
  
      let newMessage = await createMessage({ threadId, content });
  
      return res.status(200).json({ message: newMessage });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}
