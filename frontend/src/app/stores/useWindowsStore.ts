import { create } from "zustand"

interface WindowsStore {
  windows: Window[]

  open: (appId: string) => void
  close: (id: string) => void

  find: (id: string) => Window | undefined
  findByAppId: (appId: string) => Window | undefined

  minimize: (id: string) => void
  maximize: (id: string) => void
  restore: (id: string) => void

  move: (id: string, pos: WindowBounds["position"]) => void
  resize: (id: string, size: WindowBounds["size"]) => void
}

interface Window extends WindowBounds {
  id: string
  appId: string
  restoreBounds: WindowBounds
  state: "minimized" | "maximized" | "floating"
}

interface WindowBounds {
  position: {
    x: number
    y: number
  }

  size: {
    width: number
    height: number
  }
}

export const useWindowsStore = create<WindowsStore>((set, get) => ({
  windows: [],

  open(appId) {
    const { clientWidth, clientHeight } = document.documentElement
    const id = crypto.randomUUID()
    const bounds: WindowBounds = {
      position: {
        x: 100,
        y: 100,
      },

      size: {
        width: clientWidth - 200,
        height: clientHeight - 200,
      },
    }

    set((state) => ({
      windows: [
        ...state.windows,
        {
          id,
          appId,
          position: bounds.position,
          size: bounds.size,
          restoreBounds: bounds,
          state: "floating",
        },
      ],
    }))
  },
  close(id) {
    set((state) => ({
      windows: state.windows.filter((window) => window.id !== id),
    }))
  },

  find(id) {
    return get().windows.find((window) => window.id === id)
  },
  findByAppId(appId) {
    return get().windows.find((window) => window.appId === appId)
  },

  minimize(id) {
    set((state) => ({
      windows: state.windows.map((window) =>
        window.id === id
          ? {
              ...window,
              state: "minimized",
            }
          : window,
      ),
    }))
  },
  maximize(id) {
    const { clientWidth, clientHeight } = document.documentElement

    set((state) => ({
      windows: state.windows.map((window) =>
        window.id === id
          ? {
              ...window,
              state: "maximized",
              restoreBounds: {
                position: window.position,
                size: window.size,
              },
              position: { x: 0, y: 0 },
              size: { width: clientWidth, height: clientHeight - 60 },
            }
          : window,
      ),
    }))
  },
  restore(id) {
    set((state) => ({
      windows: state.windows.map((window) =>
        window.id === id
          ? {
              ...window,
              state: "floating",
              position: window.restoreBounds.position,
              size: window.restoreBounds.size,
            }
          : window,
      ),
    }))
  },

  move(id, pos) {
    set((state) => ({
      windows: state.windows.map((window) =>
        window.id === id && window.state === "floating"
          ? {
              ...window,
              position: pos,
              restoreBounds: {
                position: pos,
                size: window.size,
              },
              state: "floating",
            }
          : window,
      ),
    }))
  },
  resize(id, size) {
    set((state) => ({
      windows: state.windows.map((window) =>
        window.id === id && window.state === "floating"
          ? {
              ...window,
              size,
              restoreBounds: {
                position: window.position,
                size: size,
              },
            }
          : window,
      ),
    }))
  },
}))
