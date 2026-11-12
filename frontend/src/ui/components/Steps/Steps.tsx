import { Steps as ChakraSteps } from "@chakra-ui/react/steps"
import type { StepsProps } from "./Steps.types.ts"

export function Steps({
  steps,
  step,
  defaultStep,
  onStepChange,
  variant = "solid",
  size = "md",
  colorPalette,
}: StepsProps) {
  return (
    <ChakraSteps.Root
      count={steps.length}
      step={step}
      defaultStep={defaultStep}
      onStepChange={(details) => onStepChange?.(details.step)}
      variant={variant}
      size={size}
      colorPalette={colorPalette}
    >
      <ChakraSteps.List>
        {steps.map((title, index) => (
          <ChakraSteps.Item key={title} index={index}>
            <ChakraSteps.Indicator />
            <ChakraSteps.Title>{title}</ChakraSteps.Title>
            <ChakraSteps.Separator />
          </ChakraSteps.Item>
        ))}
      </ChakraSteps.List>
    </ChakraSteps.Root>
  )
}
