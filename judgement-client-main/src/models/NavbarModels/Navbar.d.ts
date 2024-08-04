export type NavbarVariantType = 'sticky' | 'normal' | 'flexible'

export interface NavbarProps {
  auth: boolean
  variant?: NavbarVariantType
}
