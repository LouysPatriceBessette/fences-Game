import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: false,
  compiler: {
    styledComponents: {
      minify: false,
    },
  },
};

export default nextConfig;
