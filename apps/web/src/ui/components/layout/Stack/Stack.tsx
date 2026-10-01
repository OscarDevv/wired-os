import clsx from "clsx"
import styles from "./Stack.module.scss"
import type { StackProps } from "./Stack.types.ts"

export function Stack({
  as = "div",
  direction = "row",
  gap = "md",
  align = "start",
  justify = "start",
  inline = false,
  reverse = false,
  wrapable = false,
  className,
  children,
  ...props
}: StackProps) {
  const Element = as

  return (
    <Element
      className={clsx(styles.stack, className)}
      data-direction={direction}
      data-gap={gap}
      data-align={align}
      data-justify={justify}
      data-inline={inline}
      data-reverse={reverse}
      data-wrapable={wrapable}
      {...props}
    >
      {children}
    </Element>
  )
}
