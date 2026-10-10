import { useWindowsStore } from "@/app/stores/useWindowsStore";
import { TaskBar } from "./TaskBar";
import { Window } from "@/ui/components/Window/Window";
import styles from "./Desktop.module.scss"
import { Button } from "@/ui/components/controls/Button/Button";
import { useAppsStore } from "@/app/stores/useAppsStore";
import { Text } from "@/ui/components/typography/Text/Text";

export default function DesktopScreen() {
  const { windows } = useWindowsStore()
  const { register } = useAppsStore()
   const i = Math.floor(Math.random() * 2)

  return (
    <>
      <div className={styles.windowsContainer}>
        {windows.map(w =>
          <Window windowId={w.id} />
        )}
      </div>

      <Button style={{ position: "fixed", top: "0", left: "0" }} onClick={() => (
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
      )}>Add app</Button>

      <TaskBar />
    </>
  )
}
