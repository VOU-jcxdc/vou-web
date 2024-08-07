/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname:
          "vou.453294f7d0377a0acaec90d3a0ff135c.r2.cloudflarestorage.com",
        port: "", // Optional
        pathname: "**", // Optional, allows all paths
      },
    ],
  },
};

module.exports = nextConfig;
