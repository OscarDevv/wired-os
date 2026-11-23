import type { ElementType } from "react"
import type { BaseComponentProps } from "./BaseComponent.types.ts"
import clsx from "clsx"

export function BaseComponent<T extends ElementType = "div">({
  as,
  styles,
  className,
  children,
  ...props
}: BaseComponentProps<T>) {
  const Component = as ?? "div"

  return (
    <Component
      {...props}
      className={clsx(className, {
        [`text-${styles?.color}`]: styles?.color,
        [`bg-${styles?.background}`]: styles?.background,

        [`p-${styles?.p}`]: styles?.p,
        [`pt-${styles?.pt}`]: styles?.pt,
        [`pb-${styles?.pb}`]: styles?.pb,
        [`pr-${styles?.pr}`]: styles?.pr,
        [`pl-${styles?.pl}`]: styles?.pl,
        [`px-${styles?.px}`]: styles?.px,
        [`py-${styles?.py}`]: styles?.py,

        [`m-${styles?.m}`]: styles?.m,
        [`mt-${styles?.mt}`]: styles?.mt,
        [`mb-${styles?.mb}`]: styles?.mb,
        [`mr-${styles?.mr}`]: styles?.mr,
        [`ml-${styles?.ml}`]: styles?.ml,
        [`mx-${styles?.mx}`]: styles?.mx,
        [`my-${styles?.my}`]: styles?.my,

        [`gap-${styles?.gap}`]: styles?.gap,
        [`gap-x-${styles?.gapx}`]: styles?.gapx,
        [`gap-y-${styles?.gapy}`]: styles?.gapy
      })}
    >
      {children}
    </Component>
  )
}
