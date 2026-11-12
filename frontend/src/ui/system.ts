import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react"
import { colors, semanticColors } from "./tokens/colors"
import { fontSizes, fontWeights, lineHeights } from "./tokens/typography"
import { spacing } from "./tokens/spacing"
import { borderWidths, radii } from "./tokens/borders"
import { shadows } from "./tokens/shadows"
import { durations, easings } from "./tokens/transitions"

const config = defineConfig({
  theme: {
    tokens: {
      colors,
      fonts: {
        pSans: { value: "Ibm-plex-sans, sans-serif" },
        pMono: { value: "Ibm-plex-mono, monospace" },
      },
      fontSizes,
      fontWeights,
      lineHeights,
      spacing,
      borderWidths,
      radii,
      shadows,
      durations,
      easings,
    },

    semanticTokens: {
      colors: semanticColors,
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
