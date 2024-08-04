import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Box } from '@mui/material'
import { Loader } from '@Components/Loader'
import type { GameCreateRequestDataType } from '@Models/GameModels/Game'
import { useCreateGameMutation } from '@Stores/index'
import { useStyles } from './style'

export function Play() {
  const { classes } = useStyles()

  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [trigger, { isLoading }] = useCreateGameMutation()

  const group = searchParams.get('group')

  useEffect(() => {
    let args: GameCreateRequestDataType = {}
    if (group) args = { requestData: { group } }
    trigger(args)
      .unwrap()
      .then((data) => {
        const gameId = data?.data?.game?._id
        if (gameId) {
          navigate(`/games/${gameId}`, { replace: true })
        }
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [group, trigger])

  return isLoading ? (
    <Box className={classes.playContainer}>
      <Loader />
    </Box>
  ) : null
}
