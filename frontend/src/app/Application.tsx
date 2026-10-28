import { ChakraProvider, defaultSystem } from "@chakra-ui/react"
import { AppRouter } from "./router"

export function Application() {
  return (
    <ChakraProvider value={defaultSystem}>
      <AppRouter />
    </ChakraProvider>
  )
}
