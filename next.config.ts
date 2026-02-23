import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable Turbopack and configure it for GLB files
  turbopack: {
    rules: {
      '*.glb': {
        loaders: ['file-loader'],
        as: '*.glb',
      },
      '*.gltf': {
        loaders: ['file-loader'],
        as: '*.gltf',
      },
    },
  },
};

export default nextConfig;