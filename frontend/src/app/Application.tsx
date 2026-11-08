import { ChakraProvider, Theme } from "@chakra-ui/react"
import { AppRouter } from "./router"
import { system } from "@/ui/system"

export function Application() {
  return (
    <ChakraProvider value={system}>
      <Theme appearance="dark">
        <AppRouter />
      </Theme>
    </ChakraProvider>
  )
}
