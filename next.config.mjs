/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'image.tmdb.org',
            },
        ],
    },
     // Add iframe domains for VidSrc
  async headers() {
    return [
      {
        source: '/watch/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors 'self' https://vidsrc.to"
          }
        ]
      }
    ];
  }
};

export default nextConfig;
