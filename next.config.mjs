/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // static site: deploy the /out folder anywhere
  images: { unoptimized: true }, // required for static export
  trailingSlash: false,
  reactStrictMode: true,
};
export default nextConfig;
