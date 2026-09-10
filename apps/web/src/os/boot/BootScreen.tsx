import { useEffect, useState } from "react";
import { Container } from "../../ui/components/layout/Container/Container";
import { Text } from "../../ui/components/typography/Text/Text";
import styles from "./BootScreen.module.scss";
import { useNavigate } from "react-router-dom";

const screenMessages: string[] = [
  "> Initializing kernel....... OK",
  "> Mounting filesystem....... OK",
  "> Loading configuration..... OK",
  "> Starting window maneger... OK",
  "> Connecting to the Wired... OK",
];

export default function BootScreen() {
  const [msgIndex, setMsgIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (msgIndex > screenMessages.length) {
      const timeout = setTimeout(() => {
        navigate("/home");
      }, 3000);

      return () => clearTimeout(timeout);
    }

    const timeout = setTimeout(
      () => {
        setMsgIndex((c) => c + 1);
      },
      Math.random() * (1500 - 250) + 250,
    );

    return () => clearTimeout(timeout);
  }, [msgIndex, navigate]);

  return (
    <Container size="lg" className={styles.container}>
      <Text
        size="xl"
        variant="terminal"
        color="success"
        className={styles.title}
      >
        WiredOS
      </Text>

      {screenMessages.slice(0, msgIndex + 1).map((msg, index) => (
        <Text
          key={index}
          className={styles.text}
          variant="terminal"
          color="success"
        >
          {msg}
        </Text>
      ))}

      {msgIndex > screenMessages.length && (
        <Text
          className={styles.lastText}
          variant="terminal-subtle"
          color="success"
        >
          WiredOS is ready. Going to homepage in 3 seconds...
        </Text>
      )}
    </Container>
  );
}
