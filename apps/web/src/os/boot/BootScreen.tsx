import { useEffect, useState } from "react";
import { Container } from "../../ui/components/layout/Container/Container";
import { Stack } from "../../ui/components/layout/Stack/Stack";
import { Heading } from "../../ui/components/typography/Heading/Heading";
import { Text } from "../../ui/components/typography/Text/Text";

const screenMessages: string[] = [
  "> Initializing kernel....... OK",
  "> Mounting filesystem....... OK",
  "> Loading configuration..... OK",
  "> Starting window maneger... OK",
  "> Connecting to the Wired... OK\n",
  "WiredOS ready.",
];

export default function BootScreen() {
  const [msgIndex, setMesgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMesgIndex((c) => c + 1);
    }, 500);

    return () => clearInterval(interval);
  });

  return (
    <Stack>
      <Container>
        <Heading>WiredOS</Heading>

        {screenMessages.slice(0, msgIndex + 1).map((msg, index) => (
          <Text key={index} variant="terminal">
            {msg}
          </Text>
        ))}
      </Container>
    </Stack>
  );
}
