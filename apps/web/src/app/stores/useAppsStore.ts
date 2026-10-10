import type { ComponentType } from "react"
import { create } from "zustand"

interface AppsStore {
  apps: App[]
  find: (id: string) => App | undefined
  register: (app: Omit<App, "id">) => void
  unregister: (id: string) => void
  has: (id: string) => boolean
}

interface App {
  id: string
  name: string
  icon: string
  type: "system" | "normal"
  description?: string
  fixed: boolean;
  component: ComponentType
}

export const useAppsStore = create<AppsStore>((set, get) => ({
  apps: [],
  find(id) {
    return get().apps.find((app) => app.id === id)
  },
  register(app) {
    set((state) => ({
      apps: [
        ...state.apps,
        {
          id: crypto.randomUUID(),
          ...app,
        },
      ],
    }))
  },
  unregister(id) {
    set((state) => ({
      apps: state.apps.filter((app) => app.id !== id),
    }))
  },
  has(id) {
    return Boolean(get().find(id))
  },
}))
