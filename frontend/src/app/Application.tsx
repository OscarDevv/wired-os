import { ChakraProvider } from "@chakra-ui/react"
import { AppRouter } from "./router"
import { system } from "@/ui/system"

export function Application() {
  return (
    <ChakraProvider value={system}>
      <AppRouter />
    </ChakraProvider>
  )
}
