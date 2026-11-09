import { useAppsStore } from "@/app/stores/useAppsStore"
import { useWindowsStore } from "@/app/stores/useWindowsStore"
import { App } from "@/ui/components/App/App"

import { Box } from "@chakra-ui/react/box"
import { Grid } from "@chakra-ui/react/grid"
import { IconButton } from "@chakra-ui/react/button"
import { Popover } from "@chakra-ui/react/popover"
import { Portal } from "@chakra-ui/react/portal"
import { Stack, HStack } from "@chakra-ui/react/stack"
import { Text } from "@chakra-ui/react/text"
import { Tooltip } from "@chakra-ui/react/tooltip"

import { IconGridDots } from "@tabler/icons-react"
import { useEffect, useState } from "react"

interface DateObject {
  year: string
  month: string
  day: string
  hours: string
  minutes: string
}

export function TaskBar() {
  const { apps } = useAppsStore()
  const { windows } = useWindowsStore()

  const [d, setD] = useState(() => new Date())

  useEffect(() => {
    const interval = setInterval(() => {
      setD(new Date())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  function time(t: number): string {
    return String(t).padStart(2, "0")
  }

  const date: DateObject = {
    year: String(d.getFullYear()),
    month: time(d.getMonth() + 1),
    day: time(d.getDate()),
    hours: time(d.getHours()),
    minutes: time(d.getMinutes()),
  }

  return (
    <HStack
      position="fixed"
      bottom={0}
      left={0}
      w="100%"
      justify="space-between"
      px={8}
      h="60px"
      bg="gray.900"
      borderTop="1px solid {colors.gray.700}"
    >
      <HStack gap="16px" align="center">
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <Box display="inline-flex">
              <Popover.Root lazyMount size="lg">
                <Popover.Trigger asChild>
                  <IconButton
                    variant="outline"
                    color="gray.200"
                    borderColor="gray.700"
                    bg="transparent"
                    _hover={{
                      bg: "gray.800",
                    }}
                    aria-label="Open menu"
                  >
                    <IconGridDots />
                  </IconButton>
                </Popover.Trigger>

                <Portal>
                  <Popover.Positioner>
                    <Popover.Content
                      bg="gray.900"
                      border="1px solid {colors.gray.700}"
                      css={{
                        "--popover-bg": "colors.gray.900",
                        "&::-webkit-scrollbar": {
                          w: "6px",
                        },
                        "&::-webkit-scrollbar-track": {
                          bg: "transparent",
                        },
                        "&::-webkit-scrollbar-thumb": {
                          bg: "gray.600",
                          borderRadius: "full",
                        },
                        "&::-webkit-scrollbar-thumb:hover": {
                          bg: "gray.600",
                        },
                      }}
                      maxH="350px"
                      overflowY="auto"
                    >
                      <Popover.Body>
                        <Popover.Title color="whiteAlpha.800" mb={4}>
                          Apps Menu
                        </Popover.Title>

                        <Grid templateColumns="repeat(3, 1fr)" gap="8px">
                          {apps.map((app) => (
                            <App id={app.id} key={app.id} />
                          ))}
                        </Grid>
                      </Popover.Body>
                    </Popover.Content>
                  </Popover.Positioner>
                </Portal>
              </Popover.Root>
            </Box>
          </Tooltip.Trigger>

          <Portal>
            <Tooltip.Positioner>
              <Tooltip.Content>
                <Tooltip.Arrow>
                  <Tooltip.ArrowTip />
                </Tooltip.Arrow>
                Apps menu
              </Tooltip.Content>
            </Tooltip.Positioner>
          </Portal>
        </Tooltip.Root>

        <HStack gap="8px">
          {apps
            .filter((app) => app.fixed)
            .map((app) => (
              <App variant="simplified" id={app.id} key={app.id} />
            ))}
        </HStack>

        {windows.filter((w) => w.state === "minimized").length > 0 && (
          <>
            <Box borderLeft="1px solid {colors.gray.700}" h="35px"></Box>

            <HStack gap="8px">
              {windows
                .filter((w) => w.state === "minimized")
                .map((w) => (
                  <App variant="simplified" id={w.appId} key={w.appId} />
                ))}
            </HStack>
          </>
        )}
      </HStack>

      <Stack gap="xs" align="flex-end" color="whiteAlpha.800">
        <Text fontSize="sm">
          {date.hours}:{date.minutes}
        </Text>
        <Text fontSize="sm">
          {date.month}/{date.day}/{date.year}
        </Text>
      </Stack>
    </HStack>
  )
}
