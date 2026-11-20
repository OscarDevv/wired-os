import { afterEach, describe, expect, it } from "vitest"
import { cleanup, render, screen } from "@testing-library/react"
import { BaseComponent } from "."

describe("BaseComponent", () => {
  afterEach(() => {
    cleanup()
  })

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
    render(<BaseComponent styles={{ color: "primary-500", background: "primary-500" }}>Element</BaseComponent>)
    const element = screen.getByText("Element")

    expect(element).toHaveClass("text-primary-500 bg-primary-500")
  })

  it("should accept an extra class", () => {
    render(<BaseComponent className="extra-class">Element</BaseComponent>)
    const element = screen.getByText("Element")

    expect(element).toHaveClass("extra-class")
  })
})
