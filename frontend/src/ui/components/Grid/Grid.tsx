import { Grid as ChakraGrid } from "@chakra-ui/react/grid"
import type { GridProps } from "./Grid.types.ts"

export function Grid(props: GridProps) {
  return <ChakraGrid {...props} />
}
