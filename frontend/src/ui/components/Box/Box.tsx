import { Box as ChakraBox } from "@chakra-ui/react/box"
import type { BoxProps } from "./Box.types.ts"

export function Box(props: BoxProps) {
  return <ChakraBox {...props} />
}
