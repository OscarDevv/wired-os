import { Menu as ChakraMenu } from "@chakra-ui/react/menu"

import type { MenuRootProps } from "./Menu.types.ts"

export const Menu = ChakraMenu

export function MenuRoot({ rightClick, trigger, children, ...rest }: MenuRootProps) {
  if (!rightClick) {
    return <ChakraMenu.Root {...rest}>{children}</ChakraMenu.Root>
  }

  return (
    <ChakraMenu.Root {...rest}>
      <ChakraMenu.ContextTrigger>{trigger}</ChakraMenu.ContextTrigger>
      {children}
    </ChakraMenu.Root>
  )
}
