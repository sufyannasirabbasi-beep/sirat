// @ts-ignore
import serverModule from "../dist/server.cjs";

// Handle both standard default export and esbuild's CJS default export wrapper
const app = (serverModule as any).default || serverModule;

export default app;
