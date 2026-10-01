import clsx from "clsx"
import styles from "./Button.module.scss"
import type { ButtonProps } from "./Button.types.ts"

export function Button({
  variant = "default",
  size = "md",
  color = "default",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      data-variant={variant}
      data-size={size}
      data-color={color}
      className={clsx(styles.button, className)}
      {...props}
    >
      {children}
    </button>
  )
}
