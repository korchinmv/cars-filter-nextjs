/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    BASE_URL: process.env.BASE_URL,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "test.taxivoshod.ru",
        port: "",
        pathname: "/images/cars/**",
      },
    ],
  },
};

module.exports = nextConfig;
