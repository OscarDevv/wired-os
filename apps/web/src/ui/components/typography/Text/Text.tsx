import clsx from "clsx"
import styles from "./Text.module.scss"
import type { TextProps } from "./Text.types.ts"

export function Text({
  as = "p",
  variant = "default",
  color = "default",
  size = "md",
  className,
  children,
  ...props
}: TextProps) {
  const Element = as

  return (
    <Element
      className={clsx(styles.text, className)}
      data-variant={variant}
      data-color={color}
      data-size={size}
      {...props}
    >
      {children}
    </Element>
  )
}
