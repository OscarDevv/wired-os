import { useWindowsStore } from "@/app/stores/useWindowsStore";
import { TaskBar } from "./TaskBar";
import { Window } from "@/ui/components/Window/Window";

export default function DesktopScreen() {
  const { windows } = useWindowsStore()

  return (
    <>
      {windows.map(w =>
        <Window windowId={w.id} />
      )}
      <TaskBar />
    </>
  )
}
