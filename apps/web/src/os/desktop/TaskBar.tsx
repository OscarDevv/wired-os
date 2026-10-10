import { useAppsStore } from "@/app/stores/useAppsStore";
import { useWindowsStore } from "@/app/stores/useWindowsStore";
import { App } from "@/ui/components/App/App";
import { Button } from "@/ui/components/controls/Button/Button";
import { Stack } from "@/ui/components/layout/Stack/Stack";
import { IconGridDots } from "@tabler/icons-react";
import styles from "./Desktop.module.scss"
import { useState } from "react";

export function TaskBar() {
  const { apps } = useAppsStore()
  const { windows } = useWindowsStore()
  const [ menuOpen, setMenuOpen ] = useState(false)

  return (
    <Stack className={styles.taskbar} justify="center" align="center" gap="lg">
      <Stack gap="sm" align="center" className={styles.taskbarSide1}>
        <Button variant="outline" size="sm" onClick={() => setMenuOpen(prev => !prev)}>
          <IconGridDots />
        </Button>

        {menuOpen && (
          <div className={styles.menu}>
            {apps.map(app =>
              <App id={app.id} key={app.id} />
            )}
          </div>
        )}

        <Stack gap="xs">
          {apps.filter(app => app.fixed).map(app =>
            <App variant="simplified" id={app.id} key={app.id} />
          )}
        </Stack>
      </Stack>

      {windows.filter(w => w.state === "minimized").length > 0 && (
        <>
        <div className={styles.horizontalDivider}></div>

        <Stack gap="xs">
          {windows.filter(w => w.state === "minimized").map(w =>
            <App variant="simplified" id={w.appId} key={w.appId} />
          )}
        </Stack>
        </>
      )}
    </Stack>
  )
}
