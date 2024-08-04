import clsx from 'clsx'
import { useState } from 'react'
import type { CurrentRoundDataType, GamePlayerIdsType } from '@Models/GameModels/Game'
import { GameSlider } from '@Components/GameSlider'
import { Button } from '@Components/Button'
import { Box, Typography } from '@mui/material'
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined'
import { useSetBidMutation } from '@Stores/index'
import { Timer } from '@Components/Timer'
import { useStyles } from './styles'

interface BiddingProps {
  gameId: string
  currentRound: Partial<CurrentRoundDataType>
  playerIds: GamePlayerIdsType
  // eslint-disable-next-line react/require-default-props
  bid?: number
}

export function Bidding({ gameId, playerIds, currentRound, bid = 1 }: BiddingProps) {
  const { classes } = useStyles()

  const userId = playerIds.at(0)

  const [setBid, { isLoading: isBidding }] = useSetBidMutation()
  const [dialogOpen, setDialogOpen] = useState(true)
  const handleOpen = () => setDialogOpen(true)
  const handleClose = () => setDialogOpen(false)
  const handleBidUpdate = (value: number) => {
    setBid({ gameId, bid: value })
  }

  if (
    !userId ||
    currentRound?.state !== 'bidding' ||
    currentRound?.currentPlayerBiddingTime?.userId !== userId
  )
    return null

  return (
    <>
      <Box className={classes.bottomBtns}>
        <Timer
          type='bid'
          userId={userId}
          timestamp={currentRound?.currentPlayerBiddingTime?.timestamp}
        />
        <Button onClick={handleOpen} className={clsx(classes.bidDisplay, classes.roundBtn)}>
          <Typography fontSize='inherit'>{`Bid - ${bid}`}</Typography>
          <ModeEditOutlineOutlinedIcon className={classes.editIcon} />
        </Button>
      </Box>
      <GameSlider
        type='bid'
        value={1}
        open={dialogOpen}
        min={1}
        max={13}
        Timer={
          <Timer
            type='bid'
            userId={userId}
            timestamp={currentRound?.currentPlayerBiddingTime?.timestamp}
          />
        }
        loading={isBidding}
        handleUpdate={handleBidUpdate}
        handleClose={handleClose}
      />
    </>
  )
}
