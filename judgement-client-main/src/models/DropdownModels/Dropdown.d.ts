import type { TooltipProps } from '@mui/material'

export interface MenuTipProps extends TooltipProps {
  title?: React.ReactNode
  children: React.ReactNode
  onClick: (event: React.MouseEvent<HTMLElement>) => void
}
