import { afterEach, describe, expect, it, test } from "vitest"
import { cleanup, render, screen } from "@testing-library/react"
import { BaseComponent } from "."
import {
  colorsNames,
  colorsSteps,
  type BaseComponentBorder,
  type BaseComponentBorderStyles,
  type BaseComponentColors,
  type BaseComponentSizeSystem,
} from "./BaseComponent.types"

describe("BaseComponent", () => {
  afterEach(() => {
    cleanup()
  })

  const baseSizes: BaseComponentSizeSystem[] = ["xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl"]

  it("should be a div for default", () => {
    render(<BaseComponent>Element</BaseComponent>)
    const element = screen.getByText("Element")

    expect(element.tagName).toBe("DIV")
  })

  it("should be a button", () => {
    render(<BaseComponent as="button">Element</BaseComponent>)
    const element = screen.getByText("Element")

    expect(element.tagName).toBe("BUTTON")
  })

  it("should have class text-primary-500", () => {
    render(<BaseComponent styles={{ color: "primary-500" }}>Element</BaseComponent>)
    const element = screen.getByText("Element")

    expect(element).toHaveClass("text-primary-500")
  })

  it("should have class bg-primary-500", () => {
    render(<BaseComponent styles={{ background: "primary-500" }}>Element</BaseComponent>)
    const element = screen.getByText("Element")

    expect(element).toHaveClass("bg-primary-500")
  })

  it("should have both classes text-primary-500 and bg-primary-500", () => {
    render(
      <BaseComponent styles={{ color: "primary-500", background: "primary-500" }}>
        Element
      </BaseComponent>,
    )
    const element = screen.getByText("Element")

    expect(element).toHaveClass("text-primary-500 bg-primary-500")
  })

  it("should accept an extra class", () => {
    render(<BaseComponent className="extra-class">Element</BaseComponent>)
    const element = screen.getByText("Element")

    expect(element).toHaveClass("extra-class")
  })

  test.for([
    {
      spacing: "paddings",
      classes: ["p", "pt", "pb", "pr", "pl", "px", "py"],
    },
    {
      spacing: "margins",
      classes: ["m", "mt", "mb", "mr", "ml", "mx", "my"],
    },
    {
      spacing: "gaps",
      classes: ["gap", "gap-x", "gap-y"],
    },
  ])("should apply $spacing classes for the available directions", ({ classes }) => {
    const spacingSize = Math.floor(Math.random() * baseSizes.length)

    render(
      <>
        {classes.map((c) => (
          <BaseComponent key={c} styles={{ [c.replace("-", "")]: baseSizes[spacingSize] }}>
            {c}
          </BaseComponent>
        ))}
      </>,
    )

    classes.forEach((c) =>
      expect(screen.getByText(c)).toHaveClass(`${c}-${baseSizes[spacingSize]}`),
    )
  })

  it("should contain border classes", () => {
    const size = Math.floor(Math.random() * baseSizes.length)
    const radius = Math.floor(Math.random() * baseSizes.length)

    const styles: BaseComponentBorderStyles[] = [
      "dotted",
      "dashed",
      "solid",
      "double",
      "groove",
      "ridge",
    ]
    const style = Math.floor(Math.random() * styles.length)

    const colorName = Math.floor(Math.random() * colorsNames.length)
    const colorStep = Math.floor(Math.random() * colorsSteps.length)
    const color: BaseComponentColors = `${colorsNames[colorName]}-${colorsSteps[colorStep]}`

    const border: BaseComponentBorder = `${baseSizes[size]} ${styles[style]} ${color}`

    render(
      <>
        <BaseComponent styles={{ border: border, borderRadius: baseSizes[radius] }}>
          Element
        </BaseComponent>
      </>,
    )

    const element = screen.getByText("Element")

    expect(element).toHaveClass(
      `border-${baseSizes[size]} border-r-${baseSizes[radius]} border-${styles[style]} border-${color}`,
    )
  })
})
