import { Progress as ChakraProgress } from "@chakra-ui/react/progress"

import styles from "./Progress.module.scss"
import type { ProgressProps } from "./Progress.types.ts"

export function Progress({ indeterminate, label, striped, animated, ...rest }: ProgressProps) {
  const isStriped = striped || animated
  const stripesClassName = animated ? styles.stripesAnimated : styles.stripes

  return (
    <ChakraProgress.Root {...rest} value={indeterminate ? null : rest.value}>
      {label && <ChakraProgress.Label>{label}</ChakraProgress.Label>}

      <ChakraProgress.Track>
        <ChakraProgress.Range className={isStriped ? stripesClassName : undefined} />
      </ChakraProgress.Track>
    </ChakraProgress.Root>
  )
}
