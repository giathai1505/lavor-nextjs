/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    "antd",
    "@ant-design",
    "rc-util",
    "rc-pagination",
    "rc-picker",
    "rc-notification",
    "rc-tooltip",
    "rc-tree",
    "rc-table",
  ],
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
  output: "standalone",
};

module.exports = nextConfig;
