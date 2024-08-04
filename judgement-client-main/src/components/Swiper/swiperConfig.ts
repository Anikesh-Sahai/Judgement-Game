import type { SwiperConfigType } from '@Models/SwiperModels'
import theme from '@Themes/theme'

export const swiperConfigDefault: SwiperConfigType = {
  big: {
    slideCount: 4,
    slideWidth: '19%',
    cutoutWidth: '3.5%',
    gap: '3.4%',
    offset: '6.9%',
    scrollLengthFactor: 0.896,
    viewportWidth: 2100,
  },
  large: {
    slideCount: 3,
    slideWidth: '24%',
    cutoutWidth: '6%',
    gap: '4%',
    offset: '10%',
    scrollLengthFactor: 0.84,
    viewportWidth: 1600,
  },
  medium: {
    slideCount: 2,
    slideWidth: '35%',
    cutoutWidth: '8%',
    gap: '4.6666%',
    offset: '12.6666%',
    scrollLengthFactor: 0.79333,
    viewportWidth: 1250,
  },
  tablet: {
    slideCount: 2,
    slideWidth: '38%',
    cutoutWidth: '4.5%',
    gap: '5%',
    offset: '9.5%',
    scrollLengthFactor: 0.86,
    viewportWidth: 900,
  },
  small: {
    slideCount: 1,
    slideWidth: '54%',
    cutoutWidth: '15%',
    gap: '8%',
    offset: '22.5%',
    scrollLengthFactor: 0.62,
    viewportWidth: 800,
  },
  xSmall: {
    slideCount: 1,
    slideWidth: '62%',
    cutoutWidth: '12%',
    gap: '7%',
    offset: '19%',
    scrollLengthFactor: 0.69,
    viewportWidth: theme.breakpoints.values.sm,
  },
  mobile: {
    slideCount: 1,
    slideWidth: '78%',
    cutoutWidth: '6%',
    gap: '5%',
    offset: '11%',
    scrollLengthFactor: 0.83,
    viewportWidth: 400,
  },
}

export const getSwiperValues = (
  windowWidth: number,
  swiperConfig: SwiperConfigType = swiperConfigDefault,
) => {
  if (windowWidth < swiperConfig.mobile.viewportWidth) {
    return swiperConfig.mobile
  }
  if (windowWidth < swiperConfig.xSmall.viewportWidth) {
    return swiperConfig.xSmall
  }
  if (windowWidth < swiperConfig.small.viewportWidth) {
    return swiperConfig.small
  }
  if (windowWidth < swiperConfig.tablet.viewportWidth) {
    return swiperConfig.tablet
  }
  if (windowWidth < swiperConfig.medium.viewportWidth) {
    return swiperConfig.medium
  }
  if (windowWidth < swiperConfig.large.viewportWidth) {
    return swiperConfig.large
  }
  return swiperConfig.big
}

export const getSlideClassValue = (
  windowWidth: number,
  swiperConfig: SwiperConfigType = swiperConfigDefault,
) => {
  if (windowWidth < swiperConfig.mobile.viewportWidth) {
    return 'mobile'
  }
  if (windowWidth < swiperConfig.xSmall.viewportWidth) {
    return 'xSmall'
  }
  if (windowWidth < swiperConfig.small.viewportWidth) {
    return 'small'
  }
  if (windowWidth < swiperConfig.tablet.viewportWidth) {
    return 'tablet'
  }
  if (windowWidth < swiperConfig.medium.viewportWidth) {
    return 'medium'
  }
  if (windowWidth < swiperConfig.large.viewportWidth) {
    return 'large'
  }
  return 'big'
}
