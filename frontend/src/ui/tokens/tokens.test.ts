import { describe, expect, it } from "vitest"

import { colors, semanticColors } from "./colors"
import { borderWidths, radii } from "./borders"
import { fontSizes, fontWeights, lineHeights } from "./typography"
import { shadows } from "./shadows"
import { durations, easings } from "./transitions"
import { spacing } from "./spacing"

const SCALE_STEPS = ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900", "950"]
const SCALE_NAMES = ["primary", "neutral", "success", "warning", "error", "info"] as const
const STATE_PREFIXES = ["text", "bg", "border"] as const
const STATES = ["success", "warning", "error", "info"] as const

const COLOR_SCALES = SCALE_NAMES.map((name) => ({
  name,
  scale: colors[name] as Record<string, { value: string }>,
}))

const SEMANTIC_TOKENS = STATES.flatMap((state) =>
  STATE_PREFIXES.map((prefix) => ({
    key: `${prefix}.${state}`,
    token: semanticColors[`${prefix}.${state}`],
  })),
)

describe("colors", () => {
  it.each(COLOR_SCALES)("defines a complete scale for $name", ({ scale }) => {
    for (const step of SCALE_STEPS) {
      const token = scale[step]
      expect(token).toBeDefined()
      expect(token.value).toMatch(/^#[0-9a-fA-F]{6}$/)
    }
  })

  it.each(SEMANTIC_TOKENS)("resolves $key in light and dark appearances", ({ token }) => {
    expect(token.value).toHaveProperty("base")
    expect(token.value).toHaveProperty("_dark")
  })
})

describe("spacing", () => {
  it("is strictly increasing", () => {
    const entries = Object.entries(spacing).map(([key, token]) => ({
      key: Number(key),
      px: Number(token.value.replace("px", "")),
    }))

    for (let i = 1; i < entries.length; i++) {
      expect(entries[i].px).toBeGreaterThan(entries[i - 1].px)
    }
  })

  it("uses a 4px base unit", () => {
    for (const [key, token] of Object.entries(spacing)) {
      if (key === "0") continue
      expect(token.value).toBe(`${Number(key) * 4}px`)
    }
  })
})

describe("typography", () => {
  it("defines the full font size scale", () => {
    expect(Object.keys(fontSizes)).toEqual([
      "2xs", "xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl", "5xl", "6xl",
    ])
  })

  it("defines font weights", () => {
    expect(Object.keys(fontWeights)).toEqual(["regular", "medium", "semibold", "bold"])
  })

  it("defines line heights", () => {
    expect(Object.keys(lineHeights)).toEqual(["none", "tight", "snug", "normal", "relaxed", "loose"])
  })
})

describe("borders", () => {
  it("defines border widths", () => {
    expect(Object.keys(borderWidths)).toEqual(["hairline", "thin", "thick"])
  })

  it("defines radii in increasing order", () => {
    const radiiInPx = Object.entries(radii)
      .filter(([name]) => name !== "none" && name !== "full")
      .map(([, token]) => Number(token.value.replace("px", "")))

    for (let i = 1; i < radiiInPx.length; i++) {
      expect(radiiInPx[i]).toBeGreaterThan(radiiInPx[i - 1])
    }
  })
})

describe("shadows", () => {
  it("defines elevation shadows plus glow", () => {
    expect(Object.keys(shadows)).toEqual(["xs", "sm", "md", "lg", "xl", "glow"])
  })
})

describe("transitions", () => {
  it("defines durations in increasing order", () => {
    const ms = Object.values(durations).map((token) => Number(token.value.replace("ms", "")))

    for (let i = 1; i < ms.length; i++) {
      expect(ms[i]).toBeGreaterThan(ms[i - 1])
    }
  })

  it("defines easings", () => {
    expect(Object.keys(easings)).toContain("ease-out")
  })
})
