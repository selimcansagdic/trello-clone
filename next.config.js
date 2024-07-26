// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     remotePatterns : [
//       {
//         protocol: 'https',
//         hostname: "img.clerk.com"
//       },
//       {
//         protocol: 'https',
//         hostname: "image.unsplash.com",
//       }
//     ]
//   }
// }

// module.exports = nextConfig


/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.clerk.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

module.exports = nextConfig;