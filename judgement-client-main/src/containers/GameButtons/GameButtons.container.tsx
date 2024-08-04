import clsx from 'clsx'
import React, { useCallback, useEffect, useState } from 'react'
import {
  type ButtonProps,
  IconButton,
  Dialog,
  DialogContent,
  Typography,
  DialogActions,
  Grid,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import speakerIcon from '@Assets/icons/speaker.ico'
import addPlayerIcon from '@Assets/icons/addPlayer.ico'
import micIcon from '@Assets/icons/mic.ico'
import exitIcon from '@Assets/icons/exit.ico'
import { ControlledPopper } from '@Components/ControlledPopper'
import { ControlledTooltip } from '@Components/ControlledTooltip'
import { SendGameInvite, type SendGameInviteProps } from '@Containers/SendGameInvite'
import { Button } from '@Components/Button'
import { useStyles } from './style'

const gameButtons = [
  {
    name: 'speaker',
    src: speakerIcon,
    alt: 'speaker',
    crossable: true,
  },
  {
    name: 'addPlayer',
    src: addPlayerIcon,
    alt: 'add player',
    crossable: false,
  },
  {
    name: 'mic',
    src: micIcon,
    alt: 'microphone',
    crossable: true,
  },
  {
    name: 'exit',
    src: exitIcon,
    alt: 'exit',
    crossable: false,
  },
]

type GameButtonType = 'speaker' | 'addPlayer' | 'mic' | 'exit'

interface GameButtonPropsType extends ButtonProps {
  name: GameButtonType
}

export function GameButton(props: GameButtonPropsType) {
  const { classes } = useStyles()

  const { name, onClick, className = '', ...btnProps } = props
  const [crossed, setCrossed] = useState(false)

  return (
    <IconButton
      {...btnProps}
      onClick={(e) => {
        setCrossed((cur) => !cur)
        onClick?.(e)
        e.stopPropagation()
      }}
      className={clsx(classes.btn, className)}
    >
      {gameButtons.map((btn) =>
        btn.name === name ? (
          <React.Fragment key={name}>
            <img src={btn.src} alt={btn.alt} className={classes.btnIcon} />
            {btn.crossable && crossed && <div className={classes.offBtnLine} />}
          </React.Fragment>
        ) : null,
      )}
    </IconButton>
  )
}

export function SpeakerButton(props: ButtonProps) {
  return <GameButton {...props} name='speaker' />
}

export function MicButton(props: ButtonProps) {
  return <GameButton {...props} name='mic' />
}

export function AddPlayerButton(props: SendGameInviteProps) {
  const { classes } = useStyles()

  return (
    <ControlledPopper
      ClickElement={
        <ControlledTooltip title='Add Player'>
          <div className={classes.btn}>
            <img src={addPlayerIcon} alt='add player' className={classes.btnIcon} />
          </div>
        </ControlledTooltip>
      }
      PopElement={<SendGameInvite {...props} />}
    />
  )
}

export function ExitButton(props: ButtonProps) {
  const { classes } = useStyles()
  const { onClick, ...btnProps } = props
  const navigate = useNavigate()

  const [dialogOpen, setDialogOpen] = useState(false)
  const handleOpen = () => setDialogOpen(true)
  const handleClose = () => setDialogOpen(false)

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    handleOpen()
    onClick?.(e)
  }

  const handleLeaveGame = () => {
    handleClose()
    navigate('/home', { replace: true })
  }

  const handleBackButton = useCallback((e: PopStateEvent) => {
    e.preventDefault()
    handleOpen()
    navigate(1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    window.history.pushState(null, '', window.location.pathname)
    window.addEventListener('popstate', handleBackButton)
    return () => {
      window.removeEventListener('popstate', handleBackButton)
    }
  }, [handleBackButton])

  return (
    <>
      <GameButton {...btnProps} name='exit' onClick={handleClick} />
      <Dialog
        open={dialogOpen}
        onClose={handleClose}
        aria-labelledby='game-exit-modal'
        className={clsx(classes.dialog)}
      >
        <DialogContent className={classes.dialogContent}>
          <Typography variant='h3' className={classes.dialogHeading}>
            Do you want to leave the game?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Grid
            container
            gap='20px'
            justifyContent='center'
            alignItems='center'
            className={classes.modalBtns}
          >
            <Button
              className={clsx(classes.btnSecondary, classes.actionBtn)}
              onClick={handleLeaveGame}
            >
              Yes
            </Button>
            <Button onClick={handleClose} className={classes.actionBtn}>
              No
            </Button>
          </Grid>
        </DialogActions>
      </Dialog>
    </>
  )
}
