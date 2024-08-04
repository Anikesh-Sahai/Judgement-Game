/* eslint-disable react/require-default-props */
import clsx from 'clsx'
import { useMemo, useState } from 'react'
import { Grid, Dialog, DialogTitle, DialogContent, Slider, DialogActions, Box } from '@mui/material'
import { Button } from '@Components/Button'
import { Loader } from '@Components/Loader'
import { useStyles } from './style'

interface RoundModalPropsType {
  type: 'round' | 'bid'
  max?: number
  min?: number
  open: boolean
  value: number
  loading?: boolean
  Timer?: React.ReactNode
  handleUpdate: (value: number) => void
  handleClose: () => void
}

const sliderTypes = [
  {
    type: 'round',
    titleStart: '',
    titleEnd: 'Rounds',
  },
  {
    type: 'bid',
    titleStart: 'Bid - ',
    titleEnd: '',
  },
]

export function GameSlider(props: RoundModalPropsType) {
  const { classes } = useStyles()

  const {
    type = 'round',
    max = 10,
    min = 1,
    open,
    value,
    loading = false,
    Timer,
    handleUpdate,
    handleClose,
  } = props

  const [currentValue, setCurrentValue] = useState(value)

  const marks = useMemo(
    () =>
      [...Array(max - min + 1).keys()].map((key) => ({
        value: key + min,
        label: `${key + min}`,
      })),
    [min, max],
  )

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='dialog-dialog-title'
      aria-describedby='dialog-dialog-description'
      className={clsx(classes.dialog, classes.roundDialog)}
    >
      {sliderTypes.map((sliderType) =>
        sliderType.type === type ? (
          <DialogTitle
            key={`slider-${type}`}
            id='dialog-dialog-title'
            className={classes.dialogTitle}
          >
            {/* {timer && timeRemaining && (
              <Box>
                <CircularProgressWithLabel
                  size={match300 ? 30 : 45}
                  value={(100 * timeRemaining) / 30}
                  label={`${timeRemaining}`}
                />
              </Box>
            )} */}
            <Box>{Timer}</Box>
            <Box
              className={classes.titleBox}
            >{`${sliderType.titleStart} ${currentValue} ${sliderType.titleEnd}`}</Box>
          </DialogTitle>
        ) : null,
      )}
      <DialogContent className={classes.dialogContent}>
        <Slider
          aria-label='Custom marks'
          defaultValue={1}
          min={min}
          max={max}
          step={1}
          marks={marks}
          value={currentValue}
          onChange={(_, selectedValue) => setCurrentValue(selectedValue as number)}
          className={classes.roundSlider}
        />
      </DialogContent>
      <DialogActions>
        <Grid
          container
          gap='20px'
          justifyContent='center'
          alignItems='center'
          className={classes.modalBtns}
        >
          {loading ? (
            <Loader size='25px' />
          ) : (
            <>
              <Button
                className={clsx(classes.btnSecondary, classes.actionBtn)}
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button onClick={() => handleUpdate(currentValue)} className={classes.actionBtn}>
                Confirm
              </Button>
            </>
          )}
        </Grid>
      </DialogActions>
    </Dialog>
  )
}
