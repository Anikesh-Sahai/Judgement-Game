import clsx from 'clsx'
import { useRef } from 'react'
import { Box, IconButton } from '@mui/material'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { useWindowSize } from '@Hooks/useWindowSize'
import { useSwiperScroll } from '@Hooks/useSwiperScroll'
import type { SwiperPropsType, SwiperSlidePropsType } from '@Models/SwiperModels'
import { getSlideClassValue, swiperConfigDefault } from './swiperConfig'
import { useStyles } from './style'

export function Swiper(props: SwiperPropsType) {
  const {
    prev = null,
    next = null,
    className = '',
    swiperConfig = swiperConfigDefault,
    children,
  } = props
  const { classes } = useStyles(swiperConfig)()

  const boxRef = useRef<HTMLDivElement>(null)
  const { handleNext, handlePrev, disabledNext, disabledPrev } = useSwiperScroll(boxRef)

  return (
    <Box className={clsx(classes.swiper, className)}>
      <IconButton
        disabled={disabledPrev}
        onClick={handlePrev}
        className={clsx(classes.navBtn, classes.prevBtn)}
      >
        {prev || <ArrowBackIosNewIcon fontSize='inherit' />}
      </IconButton>
      <Box ref={boxRef} className={classes.swiperBox}>
        {children}
      </Box>
      <IconButton
        disabled={disabledNext}
        onClick={handleNext}
        className={clsx(classes.navBtn, classes.nextBtn)}
      >
        {next || <ArrowForwardIosIcon fontSize='inherit' />}
      </IconButton>
    </Box>
  )
}

function Slide({ children, swiperConfig = swiperConfigDefault }: SwiperSlidePropsType) {
  const { classes } = useStyles(swiperConfig)()

  const [windowWidth] = useWindowSize()
  const classValue = getSlideClassValue(windowWidth)

  return (
    <Box
      className={clsx(classes.swiperSlideAll, {
        [classes.swiperSlideBig]: classValue === 'big',
        [classes.swiperSlideLarge]: classValue === 'large',
        [classes.swiperSlideMedium]: classValue === 'medium',
        [classes.swiperSlideTablet]: classValue === 'tablet',
        [classes.swiperSlideSmall]: classValue === 'small',
        [classes.swiperSlideXSmall]: classValue === 'xSmall',
        [classes.swiperSlideMobile]: classValue === 'mobile',
      })}
    >
      {children}
    </Box>
  )
}

Swiper.Slide = Slide
