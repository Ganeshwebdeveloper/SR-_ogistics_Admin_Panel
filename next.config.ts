import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    if (process.env.NODE_ENV === "development") {
      config.module.rules.push({
        test: /\.(jsx|tsx)$/,
        exclude: /node_modules/,
        enforce: "pre",
        use: "@dyad-sh/nextjs-webpack-component-tagger",
      });
    }
    return config;
  },
  async rewrites() {
    const rewrites = [];

    const externalApiUrlService1 = process.env.EXTERNAL_API_URL_SERVICE1;
    const externalApiUrlService2 = process.env.EXTERNAL_API_URL_SERVICE2;
    const weatherApiUrl = process.env.WEATHER_API_URL;
    const uploadChatFileEdgeFunctionUrl = process.env.UPLOAD_CHAT_FILE_EDGE_FUNCTION_URL;

    if (externalApiUrlService1) {
      rewrites.push({
        source: '/api/service1/:path*',
        destination: `${externalApiUrlService1}/:path*`,
      });
    }

    if (externalApiUrlService2) {
      rewrites.push({
        source: '/api/service2/:path*',
        destination: `${externalApiUrlService2}/:path*`,
      });
    }

    if (weatherApiUrl) {
      rewrites.push({
        source: '/api/weather/:path*',
        destination: `${weatherApiUrl}/:path*`,
      });
    }

    if (uploadChatFileEdgeFunctionUrl) {
      rewrites.push({
        source: '/api/upload-chat-file',
        destination: `${uploadChatFileEdgeFunctionUrl}`,
      });
    }

    return rewrites;
  },
};

export default nextConfig;