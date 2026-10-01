import { AppsProvider } from "./providers/apps-provider/AppsProvider"
import { WindowsProvider } from "./providers/windows-provider/WindowsProvider"
import { AppRouter } from "./router"

export function Application() {
  return (
    <AppsProvider>
      <WindowsProvider>
        <AppRouter />
      </WindowsProvider>
    </AppsProvider>
  )
}
