import { HStack as ChakraHStack } from "@chakra-ui/react/stack"
import { Stack as ChakraStack } from "@chakra-ui/react/stack"
import { VStack as ChakraVStack } from "@chakra-ui/react/stack"
import type { HStackProps, StackProps, VStackProps } from "./Stack.types.ts"

export function Stack(props: StackProps) {
  return <ChakraStack {...props} />
}

export function HStack(props: HStackProps) {
  return <ChakraHStack {...props} />
}

export function VStack(props: VStackProps) {
  return <ChakraVStack {...props} />
}
