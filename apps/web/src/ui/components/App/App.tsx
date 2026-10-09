import { useAppsStore } from "@/app/stores/useAppsStore.ts"
import { Stack } from "../layout/Stack/Stack.tsx"
import { Text } from "../typography/Text/Text.tsx"
import styles from "./App.module.scss"
import type { AppProps } from "./App.types.ts"
import { useWindowsStore } from "@/app/stores/useWindowsStore.ts"

export function App({ id, variant = "default" }: AppProps) {
  const app = useAppsStore().find(id)

  if (!app) return null

  const { open, findByAppId, restore } = useWindowsStore()

  function handleClick() {
    const window = findByAppId(id)

    if (window) {
      restore(window.id)
      return
    }

    open(id)
  }

  return (
    <Stack
      direction="column"
      align="center"
      justify="center"
      gap="xs"
      className={styles.app}
      onClick={handleClick}
      data-variant={variant}
    >
      <img
        className={styles.icon}
        src={app.icon}
        alt={`${app.name} app icon`}
      />

      {variant === "default" && (
        <Text size="sm" className={styles.name}>
          {app.name}
        </Text>
      )}
    </Stack>
  )
}
