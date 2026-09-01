import type { HTMLAttributes, ReactNode } from "react";

type HeadingVariants = "default" | "display" | "section" | "subtle";
type HeadingLevels = 1 | 2 | 3 | 4 | 5 | 6;
type HeadingSizes = "xs" | "sm" | "md" | "lg" | "xl";
type HeadingColors = "default" | "inherit" | "success" | "error" | "warning";

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  variant?: HeadingVariants;
  level?: HeadingLevels;
  size?: HeadingSizes;
  color?: HeadingColors;
  children: ReactNode;
}
