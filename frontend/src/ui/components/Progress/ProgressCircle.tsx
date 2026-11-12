import { ProgressCircle as ChakraProgressCircle } from "@chakra-ui/react/progress-circle"

import type { ProgressCircleProps } from "./ProgressCircle.types.ts"

export function ProgressCircle({ indeterminate, label, ...rest }: ProgressCircleProps) {
  return (
    <ChakraProgressCircle.Root {...rest} value={indeterminate ? null : rest.value}>
      <ChakraProgressCircle.Circle>
        <ChakraProgressCircle.Track />
        <ChakraProgressCircle.Range />
      </ChakraProgressCircle.Circle>

      {label && <ChakraProgressCircle.Label>{label}</ChakraProgressCircle.Label>}
    </ChakraProgressCircle.Root>
  )
}
