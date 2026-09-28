import { AppsProvider } from "./providers/apps-provider/AppsProvider";
import { AppRouter } from "./router";

export function Application() {
  return (
    <AppsProvider>
      <AppRouter />
    </AppsProvider>
  )
}
