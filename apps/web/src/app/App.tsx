import { AppsProvider } from "./providers/apps-provider/AppsProvider";
import { AppRouter } from "./router";

export function App() {
  return (
    <AppsProvider>
      <AppRouter />
    </AppsProvider>
  )
}
