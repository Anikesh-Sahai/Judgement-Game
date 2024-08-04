import { useState } from 'react'
import { Tooltip, type TooltipProps } from '@mui/material'

export function ControlledTooltip(props: TooltipProps) {
  const [tooltipOpen, setTooltipOpen] = useState(false)
  const { children, title, ...tooltipProps } = props
  return (
    <Tooltip
      open={tooltipOpen}
      onMouseEnter={() => setTooltipOpen(true)}
      onMouseLeave={() => setTooltipOpen(false)}
      onClick={() => setTooltipOpen(false)}
      title={title}
      PopperProps={{ disablePortal: true }}
      {...tooltipProps}
    >
      {children}
    </Tooltip>
  )
}
