const path = require("path");

const isProd = process.env.NODE_ENV === "production";
const needPrefix = process.env.NEXT_PUBLIC_APP_ENV === "production" || process.env.NEXT_PUBLIC_APP_ENV === "development";

/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true,
  },
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  generateEtags: true,
  reactStrictMode: false,
  sassOptions: {
    additionalData: `
    @import "@Styles/_tools.scss";
    @import "@Styles/_utils.scss";
      `,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: {
        loader: "@svgr/webpack",
        options: {
          svgoConfig: {
            plugins: [
              {
                name: "preset-default",
                params: {
                  overrides: {
                    removeViewBox: false,
                  },
                },
              },
              "prefixIds",
            ],
          },
        },
      },
    });
    return config;
  },
  images: {
    domains: [process.env.NEXT_PUBLIC_API_HOSTING || "localhost:3000"],
  },
};

module.exports = (phase) => {
  if (phase === process.env.NEXT_PUBLIC_APP_ENV || phase === process.env.NEXT_PUBLIC_APP_ENV) {
    const withPWA = require("@ducanh2912/next-pwa").default({
      dest: "public",
    });
    return withPWA(nextConfig);
  }

  return nextConfig;
};
