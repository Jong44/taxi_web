import { NextResponse } from "next/server";
import { createThread } from "@/utils/openai";

//create new thread
export default async function handler(req, res) {
    if (req.method === "POST") {
        try {
            let newThread = await createThread();
            return res.status(200).json(newThread);
          } catch (error) {
            return res.status(400).json({ error: error.message });
          }
    } 
}