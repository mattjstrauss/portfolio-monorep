/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Add packages here https://nextjs.org/docs/advanced-features/compiler#module-transpilation
  transpilePackages: ['@strauss/components'],
};

module.exports = nextConfig;
