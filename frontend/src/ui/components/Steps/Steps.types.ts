export type StepsVariant = "solid" | "subtle"

export type StepsSize = "xs" | "sm" | "md" | "lg"

export interface StepsProps {
  steps: string[]
  step?: number
  defaultStep?: number
  onStepChange?: (step: number) => void
  variant?: StepsVariant
  size?: StepsSize
  colorPalette?: string
}
