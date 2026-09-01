import type { JSX } from "react/jsx-runtime";
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
}: HeadingProps) {
  const Element = `h${level}` as keyof JSX.IntrinsicElements;

  return (
    <Element
      className={clsx(styles.heading, className)}
      data-variant={variant}
      data-size={size}
      data-color={color}
    >
      {children}
    </Element>
  );
}
