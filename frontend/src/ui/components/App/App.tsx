import { useAppsStore } from "@/app/stores/useAppsStore.ts"
import type { AppProps } from "./App.types.js"
import { useWindowsStore } from "@/app/stores/useWindowsStore.ts"

import { Image } from "@chakra-ui/react/image"
import { Text } from "@chakra-ui/react/text"
import { Tooltip } from "@chakra-ui/react/tooltip"
import { Portal } from "@chakra-ui/react/portal"
import { Center } from "@chakra-ui/react/center"

export function App({ id, variant = "default" }: AppProps) {
  const app = useAppsStore().find(id)
  const { open, findByAppId, restore } = useWindowsStore()

  if (!app) return null

  function handleClick() {
    const window = findByAppId(id)

    if (window) {
      restore(window.id)
      return
    }

    open(id)
  }

  return (
    <>
      {variant === "default" ? (
        <Center
          flexDir="column"
          gap="8px"
          p="8px"
          rounded="md"
          w="90px"
          h="90px"
          border="1px solid transparent"
          cursor="pointer"
          onClick={handleClick}
          transition="0.2s"
          _hover={{ bg: "gray.800", borderColor: "gray.700" }}
        >
          <Image src={app.icon} alt={`${app.name} app icon`} w="30px" h="30px" rounded="full" />

          {variant === "default" && (
            <Text truncate w="100%" color="whiteAlpha.900" textAlign="center" userSelect="none">
              {app.name}
            </Text>
          )}
        </Center>
      ) : (
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <Center
              w="40px"
              h="40px"
              rounded="sm"
              border="1px solid transparent"
              onClick={handleClick}
              cursor="pointer"
              transition="all 0.2s"
              _hover={{ borderColor: "gray.700", bg: "gray.800" }}
            >
              <Image src={app.icon} alt={`${app.name} app icon`} w="25px" h="25px" rounded="full" />
            </Center>
          </Tooltip.Trigger>
          <Portal>
            <Tooltip.Positioner>
              <Tooltip.Content>
                <Tooltip.Arrow>
                  <Tooltip.ArrowTip />
                </Tooltip.Arrow>

                {app.name}
              </Tooltip.Content>
            </Tooltip.Positioner>
          </Portal>
        </Tooltip.Root>
      )}
    </>
  )
}
