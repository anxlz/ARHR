const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
export default { output: 'export', trailingSlash: true, images: { unoptimized: true }, basePath, assetPrefix: basePath || undefined };
