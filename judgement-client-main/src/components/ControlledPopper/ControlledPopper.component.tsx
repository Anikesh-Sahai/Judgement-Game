import clsx from 'clsx'
import { useState } from 'react'
import Popper from '@mui/material/Popper'
import Fade from '@mui/material/Fade'
import { ClickAwayListener } from '@mui/base'
import { Box } from '@mui/material'
import { useStyles } from './style'

interface ControlledPopperProps extends React.HTMLAttributes<HTMLDivElement> {
  ClickElement: React.ReactNode
  PopElement: React.ReactNode
  onClick?: () => void
  // eslint-disable-next-line react/require-default-props
  className?: string
  sizeOverride?: boolean
}

export function ControlledPopper(props: ControlledPopperProps) {
  const { classes } = useStyles()

  const [open, setOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
    setOpen((prev) => !prev)
  }

  const canBeOpen = open && Boolean(anchorEl)
  const id = canBeOpen ? 'transition-popper' : undefined

  const { ClickElement, PopElement, onClick, className = '', sizeOverride = false } = props

  return (
    <ClickAwayListener
      onClickAway={() => {
        setOpen(false)
      }}
    >
      <Box className={clsx({ [classes.sizeOverride]: sizeOverride })}>
        <button
          className={clsx(classes.button, { [classes.sizeOverride]: sizeOverride }, className)}
          aria-describedby={id}
          type='button'
          onClick={(e) => {
            e.preventDefault()
            handleClick(e)
            onClick?.()
          }}
        >
          {ClickElement}
        </button>
        <Popper
          placement='bottom-start'
          modifiers={[
            {
              enabled: true,
            },
          ]}
          style={{ zIndex: 9999 }}
          id={id}
          open={open}
          anchorEl={anchorEl}
          transition
        >
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={200}>
              <div>{PopElement}</div>
            </Fade>
          )}
        </Popper>
      </Box>
    </ClickAwayListener>
  )
}
