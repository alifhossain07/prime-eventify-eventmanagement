/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'i.ibb.co.com', // Correct domain for ibb.co
        },
      ],
    },
  };
  
  export default nextConfig;
  