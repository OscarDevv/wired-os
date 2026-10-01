import clsx from "clsx"
import styles from "./Container.module.scss"
import type { ContainerProps } from "./Container.types.ts"

export function Container({
  as = "div",
  size = "md",
  className,
  children,
  ...props
}: ContainerProps) {
  const Element = as

  return (
    <Element
      className={clsx(styles.container, className)}
      data-size={size}
      {...props}
    >
      {children}
    </Element>
  )
}
