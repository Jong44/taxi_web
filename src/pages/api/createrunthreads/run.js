import { createAndRunThread } from "@/utils/openai";

export default async function handler(req, res) {
    if (req.method === "POST") {
        try {
        const newThread = await createAndRunThread();
        return res.status(200).json(newThread);
        } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
        }
    }
}