import type { ComponentPropsWithRef, ElementType } from "react"

export type BaseComponentSizeSystem = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl"

export const colorsNames = [
  "red",
  "orange",
  "yellow",
  "green",
  "cyan",
  "blue",
  "violet",
  "pink",
  "gray",
  "primary",
  "secondary",
  "neutral",
  "warning",
  "success",
  "error",
  "info",
] as const
export const colorsSteps = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const

export type BaseComponentColors = `${(typeof colorsNames)[number]}-${(typeof colorsSteps)[number]}`
export type BaseComponentSpacings = BaseComponentSizeSystem

type BCS = BaseComponentSpacings

export type BaseComponentBorderSizes = BaseComponentSizeSystem
export type BaseComponentBorderRadius = BaseComponentSizeSystem
export type BaseComponentBorderStyles =
  | "dotted"
  | "dashed"
  | "solid"
  | "double"
  | "groove"
  | "ridge"
export type BaseComponentBorderColors = BaseComponentColors
export type BaseComponentBorder =
  `${BaseComponentBorderSizes} ${BaseComponentBorderStyles} ${BaseComponentBorderColors}`

export interface BaseComponentStyles {
  color?: BaseComponentColors
  background?: BaseComponentColors

  p?: BCS
  pt?: BCS
  pb?: BCS
  pr?: BCS
  pl?: BCS
  px?: BCS
  py?: BCS

  m?: BCS
  mt?: BCS
  mb?: BCS
  mr?: BCS
  ml?: BCS
  mx?: BCS
  my?: BCS

  gap?: BCS
  gapx?: BCS
  gapy?: BCS

  border?: BaseComponentBorder
  borderWidth?: BaseComponentBorderSizes
  borderStyle?: BaseComponentBorderStyles
  borderColor?: BaseComponentBorderColors
  borderRadius?: BaseComponentBorderRadius
}

export type BaseComponentProps<T extends ElementType> = {
  as?: T
  styles?: BaseComponentStyles
} & ComponentPropsWithRef<T>
