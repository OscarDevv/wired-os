import { useEffect, useState } from "react"
import { Highlight, HStack, Kbd, Progress, Text } from "@chakra-ui/react"
import { Box, Heading } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"

const screenMessages: string[] = [
  "[INFO] Made by Oscar",
  "[INFO] GitHub Repository: https://github.com/OscarDevv/wired-os",
  "[OK] Initializing kernel",
  "[OK] Mounting filesystem",
  "[OK] Loading configuration",
  "[OK] Starting window manager",
  "[OK] Connecting to the Wired",
]

export default function BootScreen() {
  const [msgIndex, setMsgIndex] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    if (msgIndex > screenMessages.length) {
      const timeout = setTimeout(() => {
        navigate("/home")
      }, 3000)

      return () => clearTimeout(timeout)
    }

    const startsWithInfo = screenMessages[msgIndex]?.startsWith("[INFO]")

    const timeout = setTimeout(
      () => {
        setMsgIndex((c) => c + 1)
      },
      startsWithInfo ? 1 : Math.random() * (1500 - 250) + 250,
    )

    return () => clearTimeout(timeout)
  }, [msgIndex, navigate])

  const progress = Math.min((msgIndex / screenMessages.length) * 100, 100)

  return (
    <Box p={8} fontFamily="pMono">
      <Heading
        size="3xl"
        color="cyan.500"
        fontFamily="pMono"
        textShadow="0 0 0px {colors.cyan.800}"
        mb={8}
      >
        Wired OS
      </Heading>

      {screenMessages.slice(0, msgIndex + 1).map((msg, index) => {
        const isInfo = msg.startsWith("[INFO]")
        const prefix = isInfo ? "[INFO]" : "[OK]"

        return (
          <Text key={index} color="whiteAlpha.800">
            <Highlight
              query={prefix}
              styles={{
                color: isInfo ? "gray" : "green.600",
                fontWeight: "semibold",
              }}
            >
              {msg}
            </Highlight>
          </Text>
        )
      })}

      {msgIndex > screenMessages.length && (
        <Text color="whiteAlpha.800" mt={12}>
          Press
          <Kbd mx={2} bg="gray.800" color="gray.300" borderColor="gray.500">
            Space
          </Kbd>
          to start.
        </Text>
      )}

      <Progress.Root
        position="fixed"
        bottom={0}
        left={0}
        px={8}
        py={4}
        width="100%"
        value={progress}
        size="xl"
        bg="gray.950"
        borderTop="1px solid {colors.gray.700}"
        variant="outline"
        fontFamily="pSans"
      >
        <HStack gap={5}>
          <Progress.Label fontSize="md" color="whiteAlpha.800">
            {progress === 100 ? "Finished!" : "Loading..."}
          </Progress.Label>
          <Progress.Track flex="1" border="1px solid {colors.gray.700}" bg="gray.950">
            <Progress.Range
              transition="width 300ms ease"
              bg="gray.800"
              border="1px solid {colors.gray.700}"
            />
          </Progress.Track>
          <Progress.ValueText fontSize="md" color="whiteAlpha.800">
            {progress.toFixed(2)}%
          </Progress.ValueText>
        </HStack>
      </Progress.Root>
    </Box>
  )
}
