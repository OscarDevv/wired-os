import { useApps } from "@app/providers/apps-provider/index.ts";
import { useWindows } from "@app/providers/windows-provider/index.ts";
import { Stack } from "../layout/Stack/Stack.tsx";
import { Text } from "../typography/Text/Text.tsx";
import styles from "./App.module.scss";
import type { AppProps } from "./App.types.ts";

export function App({ id }: AppProps) {
  const app = useApps().getApp(id);

  if (!app) return null;

  const openWindow = useWindows().openWindow

  function handleClick() {
    openWindow(id)
  }

  return (
    <Stack
      direction="column"
      align="center"
      justify="between"
      gap="xs"
      className={styles.app}
      onClick={handleClick}
    >
      <img className={styles.icon} src={app.icon} alt={`${app.name} icon`} />

      <Text size="sm" className={styles.name}>
        {app.name}
      </Text>
    </Stack>
  );
}
