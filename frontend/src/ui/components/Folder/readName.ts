import type { SubmitEvent } from "react"

export function readName(e: SubmitEvent<HTMLFormElement>) {
  e.preventDefault()
  return String(new FormData(e.currentTarget).get("name")).trim()
}
