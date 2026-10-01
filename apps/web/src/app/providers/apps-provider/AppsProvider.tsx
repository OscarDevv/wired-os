import { useState, type ReactNode } from "react"
import { type App, appsContext } from "."

export function AppsProvider({ children }: { children: ReactNode }) {
  const [apps, setApps] = useState<App[]>([])

  function getApp(id: string): App | undefined {
    return apps.find((app) => app.id === id)
  }

  function addApp({ name, icon, type, children }: Omit<App, "id">) {
    setApps((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        name,
        icon,
        type,
        children,
      },
    ])
  }

  function removeApp(id: string) {
    setApps((prev) => [...prev.filter((app) => app.id !== id)])
  }

  function updateApp(id: string, data: Omit<App, "id" | "type" | "children">) {
    setApps((prev) => [
      ...prev.map((app) => (app.id === id ? { ...app, ...data } : app)),
    ])
  }

  return (
    <appsContext.Provider
      value={{
        apps,
        getApp,
        addApp,
        removeApp,
        updateApp,
      }}
    >
      {children}
    </appsContext.Provider>
  )
}
