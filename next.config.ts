import type { NextConfig } from "next";
import { env } from "process";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    ...(env.REPLIT_DOMAINS ? env.REPLIT_DOMAINS.split(",") : []),
    ...(env.REPLIT_DEV_DOMAIN ? [env.REPLIT_DEV_DOMAIN] : []),
    "127.0.0.1",
    "localhost",
  ],
};

export default nextConfig;
