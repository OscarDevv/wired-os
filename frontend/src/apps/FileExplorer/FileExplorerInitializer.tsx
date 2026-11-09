import { useAppsStore } from "@/app/stores/useAppsStore"
import { lazy, useEffect } from "react"

const FileExplorer = lazy(() => import("./FileExplorer"))

export function FileExplorerInitializer() {
  const register = useAppsStore((s) => s.register)

  useEffect(() => {
    register({
      name: "File Explorer",
      component: FileExplorer,
      fixed: true,
      icon: "", // Temporary iconless
      type: "system",
      description: "Browse your files",
    })
  }, [register])

  return null
}
