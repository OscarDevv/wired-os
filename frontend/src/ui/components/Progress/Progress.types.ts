import type { ProgressRootProps } from "@chakra-ui/react/progress"

export interface ProgressProps extends ProgressRootProps {
  indeterminate?: boolean
  label?: string
  striped?: boolean
  animated?: boolean
}
