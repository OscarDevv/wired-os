import type { ComponentPropsWithRef, ElementType } from "react"

const colorsNames = ["red", "orange", "yellow", "green", "cyan", "blue", "violet", "pink", "gray", "primary", "secondary", "neutral", "warning", "success", "error", "info"] as const
const colorsSteps = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const

export type BaseComponentColors = `${typeof colorsNames[number]}-${typeof colorsSteps[number]}`;
export type BaseComponentSpacings = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl"

type BCS = BaseComponentSpacings;

export interface BaseComponentStyles {
  color?: BaseComponentColors;
  background?: BaseComponentColors;

  p?: BCS;
  pt?: BCS;
  pb?: BCS;
  pr?: BCS;
  pl?: BCS;
  px?: BCS;
  py?: BCS;

  m?: BCS;
  mt?: BCS;
  mb?: BCS;
  mr?: BCS;
  ml?: BCS;
  mx?: BCS;
  my?: BCS;

  gap?: BCS;
  gapx?: BCS;
  gapy?: BCS;
}

export type BaseComponentProps<T extends ElementType> = {
  as?: T;
  styles?: BaseComponentStyles;
} & ComponentPropsWithRef<T>
