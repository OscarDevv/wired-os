import { useState, type ReactNode } from "react"
import { windowsContext, type Window } from "."
import { useApps } from "../apps-provider"

export function WindowsProvider({ children }: { children: ReactNode }) {
  const [windows, setWindows] = useState<Window[]>([])
  const { getApp } = useApps()
  const { clientWidth, clientHeight } = document.documentElement

  function openWindow(appId: string) {
    if (!windows.find((window) => window.appId === appId)) {
      const app = getApp(appId)

      if (app) {
        const zIndex = windows.at(-1)?.zIndex

        setWindows((prev) => [
          ...prev,
          {
            appId,
            x: (clientWidth - 500) / 2,
            y: (clientHeight - 500) / 2,
            width: 500,
            height: 500,
            state: "normal",
            zIndex: zIndex ? zIndex + 1 : 1,
            children: app.children,
          },
        ])
      }
    }
  }

  function closeWindow(appId: string) {
    setWindows((prev) => prev.filter((window) => window.appId !== appId))
  }

  function maximizeWindow(appId: string) {
    setWindows((prev) =>
      prev.map((window) =>
        window.appId === appId
          ? {
              ...window,
              x: 0,
              y: 0,
              width: clientWidth,
              height: clientHeight - 100, // 100 is a temporary value, it's just a guess for the taskbar height
            }
          : window,
      ),
    )
  }

  function moveWindow(appId: string, x: number, y: number) {
    setWindows((prev) =>
      prev.map((window) =>
        window.appId === appId
          ? {
              ...window,
              x,
              y,
            }
          : window,
      ),
    )
  }

  function resizeWindow(appId: string, width: number, height: number) {
    setWindows((prev) =>
      prev.map((window) =>
        window.appId === appId
          ? {
              ...window,
              width,
              height,
            }
          : window,
      ),
    )
  }

  function setWindowState(
    appId: string,
    state: "warn" | "normal" | "minimized",
  ) {
    setWindows((prev) =>
      prev.map((window) =>
        window.appId === appId
          ? {
              ...window,
              state,
            }
          : window,
      ),
    )
  }

  return (
    <windowsContext.Provider
      value={{
        windows,
        openWindow,
        closeWindow,
        maximizeWindow,
        moveWindow,
        resizeWindow,
        setWindowState,
      }}
    >
      {children}
    </windowsContext.Provider>
  )
}
