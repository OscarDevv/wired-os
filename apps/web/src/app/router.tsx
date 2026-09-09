import { lazy, Suspense } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Container } from "../ui/components/layout/Container/Container";
import { Heading } from "../ui/components/typography/Heading/Heading";

const BootScreen = lazy(() => import("../os/boot/BootScreen"));

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
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
