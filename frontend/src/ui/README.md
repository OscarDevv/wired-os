# UI Design System

The design system lives under `frontend/src/ui` and is built on Chakra UI v3
(`createSystem`). It is provided to the app through `ChakraProvider` in
`src/app/Application.tsx`.

## Architecture

```
ui/
  system.ts                 composes tokens + global css into the Chakra system
  tokens/                   design token foundation
    colors.ts               color scales (primary, neutral, success, warning, error, info)
                            and semantic state colors (text./bg./border.*)
    typography.ts           fontSizes, fontWeights, lineHeights
    spacing.ts              spacing scale (1 = 4px)
    borders.ts              borderWidths, radii
    shadows.ts              elevation shadows + glow
    transitions.ts          durations, easings
    index.ts                barrel export
  components/               shared components
  styles/                   global scss (fonts, reset)
```

## Naming conventions

- Component folders and files are PascalCase:
  `ui/components/Name/Name.tsx`, `Name.types.ts`, `Name.module.scss`.
  Scaffold new components with `pnpm script:component`.
- Token files are lowercase plural by category (`colors.ts`, `shadows.ts`).
- Tokens use Chakra v3 naming: numbered scales (`primary.500`), named scale
  steps (`sm`, `md`, `lg`), and kebab-case semantic tokens (`text.error`,
  `bg.warning`, `border.info`).
- State colors are `success`, `warning`, `error`, `info` - always consume them
  through the semantic tokens, not raw scales, so light/dark appearances
  resolve automatically.
- Colors, spacing and shadows in components reference tokens with the
  `{colors.primary.500}` syntax instead of raw hex values.

## Tests

Run with `pnpm test` from the repo root (Vitest).
