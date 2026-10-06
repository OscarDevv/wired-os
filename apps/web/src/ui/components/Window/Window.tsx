import { useAppsStore } from "@/app/stores/useAppsStore.ts"
import styles from "./Window.module.scss"
import type { WindowProps } from "./Window.types.ts"
import { useWindowsStore } from "@/app/stores/useWindowsStore.ts"
import { Rnd } from "react-rnd"

export function Window({ windowId }: WindowProps) {
  const win = useWindowsStore((s) => s.windows.find((w) => w.id === windowId))
  const app = useAppsStore((s) => s.apps.find((a) => a.id === win?.appId))

  if (!app || !win) return null

  const { move, resize, minimize, maximize, restore, close, focus } =
    useWindowsStore()
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

        style={{
          background: "red",
        }}

        onMouseDown={() => focus(win.id)}
      >
        <div>
          <header className="window__header">
            Header
            <button onClick={() => minimize(win.id)}>Minimize</button>
            <button onClick={() => restore(win.id)}>Restore</button>
            <button onClick={() => maximize(win.id)}>Maximize</button>
            <button onClick={() => close(win.id)}>Close</button>
          </header>

          <main>
            <Component />
          </main>
        </div>
      </Rnd>
    </>
  )
}
