import type {
  DialogCloseTriggerProps as ChakraDialogCloseTriggerProps,
  DialogContentProps as ChakraDialogContentProps,
  DialogRootProps as ChakraDialogRootProps,
} from "@chakra-ui/react/dialog"
import type { PortalProps } from "@chakra-ui/react/portal"

export type DialogSize = NonNullable<ChakraDialogRootProps["size"]>

export interface DialogProps extends ChakraDialogRootProps {
  size?: DialogSize
}

export interface DialogContentProps extends ChakraDialogContentProps {
  portalProps?: PortalProps
}

export type DialogCloseTriggerProps = ChakraDialogCloseTriggerProps
