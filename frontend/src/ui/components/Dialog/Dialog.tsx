import { CloseButton } from "@chakra-ui/react/button"
import { Dialog as ChakraDialog } from "@chakra-ui/react/dialog"
import { Portal } from "@chakra-ui/react/portal"
import type { DialogCloseTriggerProps, DialogContentProps, DialogProps } from "./Dialog.types.ts"

export function Dialog({ size = "md", ...rest }: DialogProps) {
  return <ChakraDialog.Root size={size} {...rest} />
}

export function DialogContent({ portalProps, ...rest }: DialogContentProps) {
  return (
    <Portal {...portalProps}>
      <ChakraDialog.Backdrop />
      <ChakraDialog.Positioner>
        <ChakraDialog.Content {...rest} />
      </ChakraDialog.Positioner>
    </Portal>
  )
}

export function DialogCloseTrigger({ children, ...rest }: DialogCloseTriggerProps) {
  return (
    <ChakraDialog.CloseTrigger {...rest} asChild>
      {children ? children : <CloseButton size="sm" />}
    </ChakraDialog.CloseTrigger>
  )
}
