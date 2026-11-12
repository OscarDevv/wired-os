import type { MenuRootProps as ChakraMenuRootProps } from "@chakra-ui/react/menu"
import type { ReactNode } from "react"

export interface MenuRootProps extends ChakraMenuRootProps {
  rightClick?: boolean
  trigger?: ReactNode
}
