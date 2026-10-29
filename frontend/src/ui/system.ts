import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react"

const config = defineConfig({
  theme: {
    tokens: {
      fonts: {
        pSans: { value: "Ibm-plex-sans, sans-serif" },
        pMono: { value: "Ibm-plex-mono, monospace" },
      },
    },
  },

  globalCss: {
    body: {
      fontFamily: "pSans",
    },

    "pre, code": {
      fontFamily: "pMono",
    },
  },
})

export const system = createSystem(defaultConfig, config)
