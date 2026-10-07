import { useAppsStore } from "@/app/stores/useAppsStore.ts"
import styles from "./Window.module.scss"
import type { WindowProps } from "./Window.types.ts"
import { useWindowsStore } from "@/app/stores/useWindowsStore.ts"
import { Rnd } from "react-rnd"
import { Stack } from "../layout/Stack/Stack.tsx"
import { Heading } from "../typography/Heading/Heading.tsx"

export function Window({ windowId }: WindowProps) {
  const win = useWindowsStore((s) => s.windows.find((w) => w.id === windowId))
  const app = useAppsStore((s) => s.apps.find((a) => a.id === win?.appId))

  if (!app || !win) return null

  const { move, resize, minimize, maximize, restore, close } = useWindowsStore()
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

        dragHandleClassName="window__header"
      >
        <div className={styles.window}>
          <Stack
            className={`window__header ${styles.heading}`}
            justify="between"
          >
            <Stack gap="sm" align="center">
              <img src={app.icon} alt={`${app.name} app icon`} />
              <Heading level={6} className={styles.title}>
                {app.name}
              </Heading>
            </Stack>

            <Stack gap="sm" className={styles.actions}>
              <button
                onClick={() => minimize(win.id)}
                title="Minimize"
              ></button>

              {win.state === "maximized" ? (
                <button
                  onClick={() => restore(win.id)}
                  title="Restore"
                ></button>
              ) : (
                <button
                  onClick={() => maximize(win.id)}
                  title="Maximize"
                ></button>
              )}

              <button onClick={() => close(win.id)} title="Close"></button>
            </Stack>
          </Stack>

          <main>
            <Component />
          </main>
        </div>
      </Rnd>
    </>
  )
}
