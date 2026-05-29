/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@nmt-arena/shared", "@nmt-arena/supabase"],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**.supabase.co" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "cdn.discordapp.com" }
    ]
  }
};

export default nextConfig;
