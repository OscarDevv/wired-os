import { useApps } from "../../../app/providers/apps-provider/index.ts"
import { Stack } from "../layout/Stack/Stack.tsx"
import { Text } from "../typography/Text/Text.tsx"
import styles from "./App.module.scss"
import type { AppProps } from "./App.types.ts"

export function App({ id }: AppProps) {
  const app = useApps().getApp(id)

  if (!app) return

  return (
    <Stack direction="column" align="center" justify="between" gap="xs" className={styles.app}>
      <img className={styles.icon} src={app.icon} alt={`${app.name} icon`} />

      <Text size="sm" className={styles.name}>{app.name}</Text>
    </Stack>
  )
}
