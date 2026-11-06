import { lazy } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"

const BootScreen = lazy(() => import("../os/boot/BootScreen"))
const DesktopScreen = lazy(() => import("../os/desktop/DesktopScreen"))

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BootScreen />} />
        <Route path="/home" element={<DesktopScreen />} />
      </Routes>
    </BrowserRouter>
  )
}
