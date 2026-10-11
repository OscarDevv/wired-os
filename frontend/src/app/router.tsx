import { lazy, Suspense } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Container } from "../ui/components/layout/Container/Container"
import { Heading } from "../ui/components/typography/Heading/Heading"

const BootScreen = lazy(() => import("../os/boot/BootScreen"))
const DesktopScreen = lazy(() => import("../os/desktop/DesktopScreen"))

function LoadingFallback() {
  return (
    <Container>
      <Heading>Loading the wired...</Heading>
    </Container>
  )
}

export function AppRouter() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<BootScreen />} />
          <Route path="/home" element={<DesktopScreen />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
