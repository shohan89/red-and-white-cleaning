import NextLink, { type LinkProps } from "next/link"
import type { AnchorHTMLAttributes, ReactNode } from "react"

type Props = LinkProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> & {
    children?: ReactNode
  }

export default function Link({ children, ...props }: Props) {
  return (
    <NextLink {...props} target="_blank" rel="noopener noreferrer">
      {children}
    </NextLink>
  )
}
