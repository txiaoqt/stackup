<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/d64df650-99aa-4756-b7c2-0d23f218595a

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Deploy To Vercel

1. Import the repo into Vercel.
2. Add `GEMINI_API_KEY` as an environment variable in the Vercel project settings.
3. Use the default build command from `vercel.json` or `npm run build`.
4. Deploy. The frontend is served from `dist`, and the AI endpoints live under `/api`.
