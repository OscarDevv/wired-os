import { ActionBar as ChakraActionBar } from "@chakra-ui/react/action-bar"
import type { ActionBarCloseTriggerProps, ActionBarRootProps, CornerPlacement } from "./ActionBar.types.ts"

const CORNER_OFFSET = "{spacing.4}"

interface CornerStyles {
  top?: string
  bottom?: string
  justifyContent?: string
  paddingInlineStart?: string
  paddingInlineEnd?: string
}

const PLACEMENT_STYLES: Record<CornerPlacement, CornerStyles> = {
  "top-start": {
    top: CORNER_OFFSET,
    justifyContent: "flex-start",
    paddingInlineStart: CORNER_OFFSET,
  },
  "top-end": {
    top: CORNER_OFFSET,
    justifyContent: "flex-end",
    paddingInlineEnd: CORNER_OFFSET,
  },
  "bottom-start": {
    bottom: CORNER_OFFSET,
    justifyContent: "flex-start",
    paddingInlineStart: CORNER_OFFSET,
  },
  "bottom-end": {
    bottom: CORNER_OFFSET,
    justifyContent: "flex-end",
    paddingInlineEnd: CORNER_OFFSET,
  },
}

export function ActionBarRoot({
  placement = "bottom-end",
  relativeTo = "viewport",
  open,
  defaultOpen,
  onOpenChange,
  children,
}: ActionBarRootProps) {
  return (
    <ChakraActionBar.Root open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
      <ChakraActionBar.Positioner
        css={{
          position: relativeTo === "parent" ? "absolute" : "fixed",
          ...PLACEMENT_STYLES[placement],
        }}
      >
        <ChakraActionBar.Content
          css={{
            translate: "0",
            ...(placement.startsWith("top")
              ? {
                  _open: { animationName: "slide-from-top, fade-in" },
                  _closed: { animationName: "slide-to-top, fade-out" },
                }
              : {}),
          }}
        >
          {children}
        </ChakraActionBar.Content>
      </ChakraActionBar.Positioner>
    </ChakraActionBar.Root>
  )
}

export function ActionBarCloseTrigger(props: ActionBarCloseTriggerProps) {
  return <ChakraActionBar.CloseTrigger {...props} />
}
