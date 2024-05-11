/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `http://${process.env.NEXT_PUBLIC_BASE_API_URL}/:path*`,
      },
    ];
  },
};

export default nextConfig;
