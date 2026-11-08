import { useAppsStore } from "@/app/stores/useAppsStore.ts"
import type { WindowProps } from "./Window.types"
import { useWindowsStore } from "@/app/stores/useWindowsStore.ts"
import { Rnd } from "react-rnd"
import { Box, Flex, Heading, HStack, IconButton, Image } from "@chakra-ui/react"
import { IconMinus, IconSquare, IconSquares, IconX } from "@tabler/icons-react"

export function Window({ windowId }: WindowProps) {
  const win = useWindowsStore((s) => s.windows.find((w) => w.id === windowId))
  const app = useAppsStore((s) => s.apps.find((a) => a.id === win?.appId))
  const { move, resize, minimize, maximize, restore, close } = useWindowsStore()

  if (!app || !win) return null

  const Component = app.component

  if (win.state === "minimized") return null

  return (
    <>
      <Rnd
        position={{
          x: win.position.x,
          y: win.position.y,
        }}
        size={{
          width: win.size.width,
          height: win.size.height,
        }}
        onDragStop={(_, data) => {
          move(win.id, { x: data.x, y: data.y })
        }}
        onResizeStop={(_e, _d, ref, _dt, position) => {
          resize(win.id, {
            width: ref.offsetWidth,
            height: ref.offsetHeight,
          })
          move(win.id, {
            x: position.x,
            y: position.y,
          })
        }}

        disableDragging={win.state !== "floating"}
        enableResizing={win.state === "floating"}
        bounds="parent"
        dragHandleClassName="window__header"
      >
        <Flex flexDir="column" h="100%" border="1px solid {colors.gray.800}" rounded="8px">
          <HStack
            bg="gray.800"
            className="window__header"
            justify="space-between"
            flexShrink="0"
            m="4px"
            p="10px 12px"
            rounded="4px"
            cursor="move"
          >
            <HStack gap="8px">
              <Image src={app.icon} alt={`${app.name} app icon`} w="50px" h="50px" />
              <Heading
                as="h6"
                w="100px"
                size="lg"
                truncate
                color="whiteAlpha.800"
                userSelect="none"
              >
                {app.name}
              </Heading>
            </HStack>
            <HStack gap="4px" alignSelf="center">
              <IconButton
                aria-label="Minimize"
                onClick={() => minimize(win.id)}
                bg="transparent"
                color="whiteAlpha.800"
                _hover={{ bg: "gray.700" }}
              >
                <IconMinus />
              </IconButton>

              {win.state === "maximized" ? (
                <IconButton
                  aria-label="Restore"
                  onClick={() => restore(win.id)}
                  bg="transparent"
                  color="whiteAlpha.800"
                  _hover={{ bg: "gray.700" }}
                >
                  <IconSquares />
                </IconButton>
              ) : (
                <IconButton
                  aria-label="Maximize"
                  onClick={() => maximize(win.id)}
                  bg="transparent"
                  color="whiteAlpha.800"
                  _hover={{ bg: "gray.700" }}
                >
                  <IconSquare />
                </IconButton>
              )}

              <IconButton
                aria-label="Close"
                onClick={() => close(win.id)}
                bg="transparent"
                color="whiteAlpha.800"
                _hover={{ bg: "gray.700" }}
              >
                <IconX />
              </IconButton>
            </HStack>
          </HStack>

          <Box as="main">
            <Component />
          </Box>
        </Flex>
      </Rnd>
    </>
  )
}
