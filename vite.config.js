import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

// `npm run build` → production build + SEO HTML prerender for each route.
// `SINGLE=1 npm run build` inlines everything into one index.html (preview only).
const single = !!process.env.SINGLE

function enquiryApiPlugin() {
  return {
    name: 'enquiry-api',
    configureServer(server) {
      server.middlewares.use('/api/enquiry', async (req, res, next) => {
        if (req.method === 'OPTIONS') {
          res.statusCode = 204
          res.end()
          return
        }
        if (req.method !== 'POST') {
          next()
          return
        }

        const chunks = []
        for await (const chunk of req) chunks.push(chunk)
        let body = {}
        try {
          body = JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}')
        } catch {
          res.statusCode = 400
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ ok: false, error: 'Invalid JSON body.' }))
          return
        }

        const { sendEnquiryEmail } = await server.ssrLoadModule('/api/enquiry.js')
        const result = await sendEnquiryEmail(body)
        res.statusCode = result.status
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({ ok: result.ok, error: result.error }))
      })
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  for (const key of ['SMTP_USER', 'SMTP_PASS', 'MAIL_TO', 'MAIL_CC']) {
    if (env[key]) process.env[key] = env[key]
  }

  return {
    // Absolute base so deep routes like /destinations/.../ load /assets correctly.
    base: single ? './' : '/',
    plugins: [react(), enquiryApiPlugin(), ...(single ? [viteSingleFile()] : [])],
    build: {
      target: 'es2019',
      cssCodeSplit: !single,
      assetsInlineLimit: 4096,
      rollupOptions: single
        ? {}
        : {
            output: {
              manualChunks: {
                react: ['react', 'react-dom', 'react-router-dom'],
                motion: ['framer-motion'],
              },
            },
          },
    },
  }
})
