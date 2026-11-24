// Configura o Next.js para tratar a pasta atual como raiz do Turbopack.
const nextConfig = {
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
