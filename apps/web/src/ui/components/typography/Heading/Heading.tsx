import styles from "./Heading.module.scss";
import type { HeadingProps } from "./Heading.types.ts";
import clsx from "clsx";

export function Heading({
  variant = "default",
  level = 1,
  size = "md",
  color = "default",
  className,
  children,
  ...props
}: HeadingProps) {
  const Element = `h${level}` as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

  return (
    <Element
      className={clsx(styles.heading, className)}
      data-variant={variant}
      data-size={size}
      data-color={color}
      {...props}
    >
      {children}
    </Element>
  );
}
