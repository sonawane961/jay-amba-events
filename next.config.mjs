/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/dllijcdic/**", // Replace `dllijcdic` with your Cloudinary account name
      },
    ],
  },
};

export default nextConfig;
