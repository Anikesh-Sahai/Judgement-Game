import type { NavbarVariantType } from '@Models/NavbarModels'

export interface AppLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  navbar: boolean
  auth: boolean
  navbarVariant?: NavbarVariantType
  mainClassName?: string
}
