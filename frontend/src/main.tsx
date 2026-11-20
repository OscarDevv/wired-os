import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./ui/styles/main.scss"
import { Application } from "./app/Application"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Application />
  </StrictMode>,
)
