/** @type {import('next').NextConfig} */

// Static export (GitHub Pages) is opt-in via STATIC_EXPORT=true so that normal
// `next dev` / Vercel builds keep full server features (API routes, middleware,
// Supabase SSR). The Pages workflow sets this flag and strips server-only code.
const isStaticExport = process.env.STATIC_EXPORT === 'true'

// GitHub Pages serves a project site under /<repo>/, so assets need this prefix.
const repoBasePath = '/UltraFitForDevlopers'

const nextConfig = isStaticExport
  ? {
      output: 'export',
      basePath: repoBasePath,
      assetPrefix: `${repoBasePath}/`,
      trailingSlash: true,
      images: { unoptimized: true },
    }
  : {}

export default nextConfig
