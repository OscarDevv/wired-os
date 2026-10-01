import { createContext, useContext, type ReactNode } from "react"

interface WindowsContext {
  windows: Window[]
  openWindow: (appId: string) => void
  closeWindow: (appId: string) => void
  maximizeWindow: (appId: string) => void
  moveWindow: (appId: string, x: number, y: number) => void
  resizeWindow: (appId: string, width: number, height: number) => void
  setWindowState: (
    appId: string,
    state: "warn" | "normal" | "minimized",
  ) => void
}

export interface Window {
  appId: string
  x: number
  y: number
  width: number
  height: number
  state: "warn" | "normal" | "minimized" // Minimized state will be done soon
  zIndex: number
  children: ReactNode
}

export const windowsContext = createContext<WindowsContext>({
  windows: [],
  openWindow(appId) {},
  closeWindow(appId) {},
  maximizeWindow(appId) {},
  moveWindow(appId, x, y) {},
  resizeWindow(appId, width, height) {},
  setWindowState(appId, state) {},
})

export function useWindows() {
  return useContext(windowsContext) as WindowsContext
}
