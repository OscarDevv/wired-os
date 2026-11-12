import type { ProgressCircleRootProps } from "@chakra-ui/react/progress-circle"

export interface ProgressCircleProps extends ProgressCircleRootProps {
  indeterminate?: boolean
  label?: string
}
