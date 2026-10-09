import { useAppsStore } from "@/app/stores/useAppsStore";
import { useWindowsStore } from "@/app/stores/useWindowsStore";
import { App } from "@/ui/components/App/App";
import { Button } from "@/ui/components/controls/Button/Button";
import { Stack } from "@/ui/components/layout/Stack/Stack";
import { Text } from "@/ui/components/typography/Text/Text";
import { IconGridDots } from "@tabler/icons-react";

export function TaskBar() {
  const { apps, register } = useAppsStore()
  const { windows } = useWindowsStore()
  const i = Math.floor(Math.random() * 2)

  console.log(windows);
  console.log(apps);


  return (
    <Stack justify="between">
      <Button onClick={() => (
        register({
          name: crypto.randomUUID(),
          component: () => <Text>{crypto.randomUUID()}</Text>,
          type: "normal",
          description: "A",
          icon: i === 0 ?
            // Random apps images links for test
            "https://th.bing.com/th?q=App+Icon+BG+Transparent&w=120&h=120&c=1&rs=1&qlt=70&r=0&o=7&cb=1&dpr=1.3&pid=InlineBlock&rm=3&mkt=pt-BR&cc=BR&setlang=pt-br&adlt=moderate&t=1&mw=247"
            : i === 1 ?
              "https://th.bing.com/th?q=Apple+Store+App+Icon&w=120&h=120&c=1&rs=1&qlt=70&r=0&o=7&cb=1&dpr=1.3&pid=InlineBlock&rm=3&mkt=pt-BR&cc=BR&setlang=pt-br&adlt=moderate&t=1&mw=247"
              : i === 2 ? "https://th.bing.com/th?q=Google+Chrome+App+Icon&w=120&h=120&c=1&rs=1&qlt=70&r=0&o=7&cb=1&dpr=1.3&pid=InlineBlock&rm=3&mkt=pt-BR&cc=BR&setlang=pt-br&adlt=moderate&t=1&mw=247" : ""
        })
      )}>Add window</Button>

      <div>
        <IconGridDots />
        {apps.map(app =>
          <App id={app.id} key={app.id} />
        )}
      </div>

      <div>
        {windows.filter(w => w.state === "minimized").map(win =>
          <App id={win.appId} key={win.appId} />
        )}
      </div>
    </Stack>
  )
}
