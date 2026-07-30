/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  // lolikar.com is the canonical address; send www there so the site isn't
  // reachable under two addresses. Kept here rather than in the Vercel
  // dashboard so it lives with the code and survives project reconfiguration.
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.lolikar.com" }],
        destination: "https://lolikar.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
