import type { SwiperConfigType } from '@Models/SwiperModels'
import { makeStyles } from 'tss-react/mui-compat'

export const useStyles = (swiperConfig: SwiperConfigType) =>
  makeStyles()((theme) => ({
    swiper: {
      width: '100%',
      margin: '0 auto',
      position: 'relative',
      filter: 'drop-shadow(4px 14px 50px #000)',
    },
    swiperBox: {
      background: 'none',
      padding: '20px 0px 20px',
      overflow: 'auto',
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      scrollBehavior: 'smooth',
      scrollbarWidth: 'none',
      gap: swiperConfig.big.gap,
      [theme.breakpoints.down(swiperConfig.large.viewportWidth)]: {
        gap: swiperConfig.large.gap,
      },
      [theme.breakpoints.down(swiperConfig.medium.viewportWidth)]: {
        gap: swiperConfig.medium.gap,
      },
      [theme.breakpoints.down(swiperConfig.tablet.viewportWidth)]: {
        gap: swiperConfig.tablet.gap,
      },
      [theme.breakpoints.down(swiperConfig.small.viewportWidth)]: {
        gap: swiperConfig.small.gap,
      },
      [theme.breakpoints.down(swiperConfig.xSmall.viewportWidth)]: {
        gap: swiperConfig.xSmall.gap,
      },
      [theme.breakpoints.down(swiperConfig.mobile.viewportWidth)]: {
        gap: swiperConfig.mobile.gap,
      },
      '&::-webkit-scrollbar': {
        height: '0',
        width: '0',
      },
    },
    swiperSlideAll: {
      flexShrink: '0',
      borderRadius: '20px',
    },
    swiperSlideMobile: {
      width: swiperConfig.mobile.slideWidth,
      '&:nth-of-type(1)': {
        marginLeft: swiperConfig.mobile.offset,
      },
      '&:nth-last-of-type(1)': {
        marginRight: swiperConfig.mobile.offset,
      },
    },
    swiperSlideXSmall: {
      width: swiperConfig.xSmall.slideWidth,
      '&:nth-of-type(1)': {
        marginLeft: swiperConfig.xSmall.offset,
      },
      '&:nth-last-of-type(1)': {
        marginRight: swiperConfig.xSmall.offset,
      },
    },
    swiperSlideSmall: {
      width: swiperConfig.small.slideWidth,
      '&:nth-of-type(1)': {
        marginLeft: swiperConfig.small.offset,
      },
      '&:nth-last-of-type(1)': {
        marginRight: swiperConfig.small.offset,
      },
    },
    swiperSlideTablet: {
      width: swiperConfig.tablet.slideWidth,
      '&:nth-of-type(1)': {
        marginLeft: swiperConfig.tablet.offset,
      },
      '&:nth-last-of-type(1)': {
        marginRight: swiperConfig.tablet.offset,
      },
    },
    swiperSlideMedium: {
      width: swiperConfig.medium.slideWidth,
      '&:nth-of-type(1)': {
        marginLeft: swiperConfig.medium.offset,
      },
      '&:nth-last-of-type(1)': {
        marginRight: swiperConfig.medium.offset,
      },
    },
    swiperSlideLarge: {
      width: swiperConfig.large.slideWidth,
      '&:nth-of-type(1)': {
        marginLeft: swiperConfig.large.offset,
      },
      '&:nth-last-of-type(1)': {
        marginRight: swiperConfig.large.offset,
      },
    },
    swiperSlideBig: {
      width: swiperConfig.big.slideWidth,
      '&:nth-of-type(1)': {
        marginLeft: swiperConfig.big.offset,
      },
      '&:nth-last-of-type(1)': {
        marginRight: swiperConfig.big.offset,
      },
    },
    navBtn: {
      position: 'absolute',
      bottom: '0px',
      width: '150px',
      borderRadius: '0px',
      height: '100%',
      zIndex: '20',
      fontSize: '65px',
      fontWeight: 'bold',
      color: theme.palette.primary.contrastText,

      '&:disabled': {
        display: 'visible',
        color: '#ffffff50',
      },

      [theme.breakpoints.down('lg')]: {
        width: '100px',
      },
      [theme.breakpoints.down('md')]: {
        width: '90px',
      },
      [theme.breakpoints.down('md')]: {
        width: '80px',
      },
      [theme.breakpoints.down('sm')]: {
        width: '50px',
        fontSize: '45px',
      },
      [theme.breakpoints.down(480)]: {
        display: 'none',
      },
    },
    prevBtn: {
      left: '0px',
      background: 'linear-gradient(to left, transparent, #000)',
    },
    nextBtn: {
      right: '0px',
      background: 'linear-gradient(to right, transparent, #000)',
    },
  }))
