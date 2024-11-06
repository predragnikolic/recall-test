import { reactRouter } from "@react-router/dev/vite"
import tsconfigPaths from "vite-tsconfig-paths"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [
    // @ts-expect-error TODO look at this later
    reactRouter({
      // Server-side render by default, to enable SPA mode set this to `false`
      ssr: true,
    }),
    tsconfigPaths(),
  ],
})
