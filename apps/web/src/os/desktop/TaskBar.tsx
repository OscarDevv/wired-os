import { useAppsStore } from "@/app/stores/useAppsStore";
import { useWindowsStore } from "@/app/stores/useWindowsStore";
import { App } from "@/ui/components/App/App";
import { Button } from "@/ui/components/controls/Button/Button";
import { Stack } from "@/ui/components/layout/Stack/Stack";
import { IconGridDots } from "@tabler/icons-react";
import styles from "./Desktop.module.scss"
import { useState } from "react";
import { Text } from "@/ui/components/typography/Text/Text";

interface DateObject {
  year: number
  month: number
  day: number
  hours: number
  minutes: number
}

export function TaskBar() {
  const { apps } = useAppsStore()
  const { windows } = useWindowsStore()
  const [ menuOpen, setMenuOpen ] = useState(false)

  const d = new Date()
  const date: DateObject = {
    year: d.getFullYear(),
    month: d.getMonth() + 1,
    day: d.getDate(),
    hours: d.getHours(),
    minutes: d.getMinutes()
  }

  return (
    <Stack className={styles.taskbar} justify="between" align="center" gap="lg">
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


      <Stack direction="column" gap="xs" align="end">
        <Text size="sm">{date.hours}:{date.minutes}</Text>
        <Text size="sm">{date.month}/{date.day}/{date.year}</Text>
      </Stack>
    </Stack>
  )
}
