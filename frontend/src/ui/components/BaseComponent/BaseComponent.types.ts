import type { ComponentPropsWithRef, ElementType } from "react"

const colorsNames = ["red", "orange", "yellow", "green", "cyan", "blue", "violet", "pink", "gray", "primary", "secondary", "neutral", "warning", "success", "error", "info"]
const colorsSteps = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]

export type BaseComponentColors = `${typeof colorsNames[number]}-${typeof colorsSteps[number]}`;

export interface BaseComponentStyles {
  color?: BaseComponentColors;
  background?: BaseComponentColors;
}

export type BaseComponentProps<T extends ElementType> = {
  as?: T;
  styles?: BaseComponentStyles;
} & ComponentPropsWithRef<T>
