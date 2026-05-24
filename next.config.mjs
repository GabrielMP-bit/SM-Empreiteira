/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Empty turbopack config silences the conflict warning
  turbopack: {},
  // Correct MIME headers for GLB files served from /public
  async headers() {
    return [
      {
        source: '/models/:path*',
        headers: [
          { key: 'Content-Type',               value: 'model/gltf-binary' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Cache-Control',               value: 'public, max-age=86400' },
        ],
      },
    ]
  },
}

export default nextConfig
