import { replyToChat } from "./_shared";

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { message, history } = req.body || {};

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  const reply = await replyToChat({ message, history });
  return res.status(200).json({ reply });
}
