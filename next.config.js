/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ytimg.com",
        port: "",
        pathname: "/image/upload/**",
      },
    ],
  },
  env: {
    NEXTAUTH_SECRET: "gia_thai_1505",
  },
};

module.exports = nextConfig;
