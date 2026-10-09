import process from 'node:process'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { SITE, FAQ, SIGNS, SERVICES, PAGES, buildJsonLd } from './src/data/site.js'

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

// SEO no build: injeta JSON-LD, URLs absolutas e um HTML estático dentro de #root
// (o React substitui ao carregar; crawlers e leitores sem JS enxergam o conteúdo real).
function seo(siteUrl) {
  const base = siteUrl.replace(/\/$/, '')
  const today = new Date().toISOString().slice(0, 10)

  const staticHtml = `
      <header><h1>${esc(SITE.name)}: médica em saúde mental em ${SITE.city} e online</h1>
      <p>${esc(SITE.description)}</p>
      <p><a href="https://wa.me/${SITE.phone.replace('+', '')}">Agendar consulta pelo WhatsApp</a> · ${esc(SITE.phoneDisplay)} · ${esc(SITE.crm)}</p></header>
      <main>
        <h2>Áreas de cuidado</h2>
        <ul>${SERVICES.map((s) => `<li><strong>${esc(s.name)}</strong>: ${esc(s.description)}</li>`).join('')}</ul>
        <h2>Sinais de que pode ser hora de buscar ajuda</h2>
        <ul>${SIGNS.map((s) => `<li>${esc(s)}</li>`).join('')}</ul>
        <h2>Perguntas frequentes</h2>
        ${FAQ.map((f) => `<h3>${esc(f.q)}</h3><p>${esc(f.a)}</p>`).join('')}
      </main>
      <footer><p>${esc(SITE.name)} · ${esc(SITE.crm)} · ${SITE.city}, ${SITE.region}</p></footer>`

  return {
    name: 'seo',
    transformIndexHtml(html) {
      return html
        .replaceAll('%SITE_URL%', base)
        .replace('<!--JSON-LD-->', `<script type="application/ld+json">${JSON.stringify(buildJsonLd(base))}</script>`)
        .replace('<!--STATIC-CONTENT-->', staticHtml)
    },
    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `User-agent: *\nAllow: /\n\nSitemap: ${base}/sitemap.xml\n`,
      })
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source:
          `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
          PAGES.map(
            (p) =>
              `  <url><loc>${base}${p.path}</loc><lastmod>${today}</lastmod><changefreq>${p.changefreq}</changefreq><priority>${p.priority}</priority></url>`,
          ).join('\n') +
          `\n</urlset>\n`,
      })
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const siteUrl = env.VITE_SITE_URL || 'https://www.draanaflavia.com.br'
  return {
    plugins: [react(), tailwindcss(), seo(siteUrl)],
    build: {
      rollupOptions: {
        output: {
          manualChunks: { motion: ['framer-motion'] },
        },
      },
    },
  }
})
