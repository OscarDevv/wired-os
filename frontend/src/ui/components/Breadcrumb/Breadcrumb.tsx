import { Breadcrumb as ChakraBreadcrumb } from "@chakra-ui/react/breadcrumb"
import type {
  BreadcrumbCurrentLinkProps,
  BreadcrumbEllipsisProps,
  BreadcrumbItemProps,
  BreadcrumbLinkProps,
  BreadcrumbListProps,
  BreadcrumbProps,
  BreadcrumbSeparatorProps,
} from "./Breadcrumb.types.ts"

export function Breadcrumb(props: BreadcrumbProps) {
  return <ChakraBreadcrumb.Root {...props} />
}

export function BreadcrumbList(props: BreadcrumbListProps) {
  return <ChakraBreadcrumb.List {...props} />
}

export function BreadcrumbItem(props: BreadcrumbItemProps) {
  return <ChakraBreadcrumb.Item {...props} />
}

export function BreadcrumbLink(props: BreadcrumbLinkProps) {
  return <ChakraBreadcrumb.Link {...props} />
}

export function BreadcrumbCurrentLink(props: BreadcrumbCurrentLinkProps) {
  return <ChakraBreadcrumb.CurrentLink {...props} />
}

export function BreadcrumbSeparator(props: BreadcrumbSeparatorProps) {
  return <ChakraBreadcrumb.Separator {...props} />
}

export function BreadcrumbEllipsis(props: BreadcrumbEllipsisProps) {
  return <ChakraBreadcrumb.Ellipsis {...props} />
}
