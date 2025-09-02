/** @type {import('next').NextConfig} */
const nextConfig = {
images: {
// allow remote images if you’ll pull from a CDN later
remotePatterns: [
// { protocol: 'https', hostname: 'images.example.com' }
],
},
};
export default nextConfig;