import { useEffect, useState } from "react"
import styles from "./ContextMenu.module.scss"
import type { ContextMenuPos, ContextMenuProps } from "./ContextMenu.types.ts"
import { createPortal } from "react-dom"

export function ContextMenu({ items, children }: ContextMenuProps) {
  const [pos, setPos] = useState<ContextMenuPos | null>(null)

  useEffect(() => {
    if (!pos) return

    const close = () => setPos(null)
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close()

    window.addEventListener("pointerdown", close)
    window.addEventListener("scroll", close, true)
    window.addEventListener("keydown", onKey)

    return () => {
      window.removeEventListener("pointerdown", close)
      window.removeEventListener("scroll", close, true)
      window.removeEventListener("keydown", onKey)
    }
  }, [pos])

  return (
    <div
      onContextMenu={(e) => {
        e.preventDefault()
        e.stopPropagation()
        setPos({ x: e.clientX, y: e.clientY })
      }}
    >
      {children}

      {pos &&
        createPortal(
          <div
            className={styles.menu}
            style={{ top: pos.y, left: pos.x }}
            onPointerDown={(e) => e.stopPropagation()}
            onContextMenu={(e) => {
              e.preventDefault()
              e.stopPropagation()
            }}
          >
            {items.map((group, index) => (
              <ul key={index} className={styles.group}>
                {group.map((item) => (
                  <li
                    key={item.label}
                    onClick={() => {
                      item.onClick()
                      setPos(null)
                    }}
                    className={styles.item}
                  >
                    {item.label}
                  </li>
                ))}
              </ul>
            ))}
          </div>,
          document.body,
        )}
    </div>
  )
}
