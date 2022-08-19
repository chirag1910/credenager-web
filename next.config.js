/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    env: {
        API_BASE_URL: process.env.API_BASE_URL,
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    },
};

module.exports = nextConfig;
