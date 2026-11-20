import type { ElementType } from "react"
import type { BaseComponentProps } from "./BaseComponent.types.ts"
import clsx from "clsx"

export function BaseComponent<T extends ElementType = "div">({
  as,
  styles,
  className,
  children,
  ...props
}: BaseComponentProps<T>) {
  const Component = as ?? "div"

  return (
    <Component
      {...props}
      className={clsx(className, {
        [`text-${styles?.color}`]: styles?.color,
        [`bg-${styles?.background}`]: styles?.background,
      })}
    >
      {children}
    </Component>
  )
}
