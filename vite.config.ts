import { defineConfig, loadEnv, type Plugin, type ViteDevServer } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * Local AI chat: during `npm run dev`, serve POST /api/chat with the same code Vercel runs (api/chat.ts),
 * using OPENAI_API_KEY from the local .env file. The key stays on your computer (.env is git-ignored).
 */
function localChatApi(): Plugin {
  return {
    name: 'local-chat-api',
    configureServer(server: ViteDevServer) {
      const env = loadEnv(server.config.mode, process.cwd(), '')
      if (env.OPENAI_API_KEY) process.env.OPENAI_API_KEY = env.OPENAI_API_KEY
      if (env.OPENAI_MODEL) process.env.OPENAI_MODEL = env.OPENAI_MODEL
      server.middlewares.use('/api/chat', async (req, res) => {
        let raw = ''
        for await (const chunk of req) raw += chunk
        const { default: handler } = await server.ssrLoadModule('/api/chat.ts')
        let code = 200
        const vres = {
          status(c: number) { code = c; return vres },
          json(b: unknown) { res.statusCode = code; res.setHeader('Content-Type', 'application/json'); res.end(JSON.stringify(b)); return vres },
        }
        await handler({ method: req.method, body: raw ? JSON.parse(raw) : {} }, vres)
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), localChatApi()],
  server: { host: true, port: 5173, open: true },
  preview: { host: true, port: 4173 },
})
