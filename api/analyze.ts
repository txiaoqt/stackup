import { analyzeIncident } from "./_shared";

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const result = await analyzeIncident(req.body || {});
  return res.status(200).json(result);
}
