import { useEffect, useRef } from "react"

export function useKeyboard(callback: (event: KeyboardEvent) => void) {
  const callbackRef = useRef(callback)

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      callbackRef.current(event)
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [])
}
