export type SwiperConfigKeyType =
  | 'big'
  | 'large'
  | 'medium'
  | 'tablet'
  | 'small'
  | 'xSmall'
  | 'mobile'

/**
 * key types => correspond to the screen size set by us in config
 * @slideCount => number of slides to fully show in center on screen
 * @slideWidth => percentage of parent width that slide should take
 * @cutoutWidth => percentage of parent width occupied of cutout slides on both ends
 * @gap => percentage of parent width taken by the gap between slides
 * @offset => sum of cutoutWidth & gap
 * @scrollLengthFactor => percentage of parent width to scroll on each click. Calculated by slideCount * (slideWidth + gap)
 * @viewportWidth => viewport width corresponding to this config key type
 */

export type SwiperConfigType = {
  [key in SwiperConfigKeyType]: {
    slideCount: number
    slideWidth: string
    cutoutWidth: string
    gap: string
    offset: string
    scrollLengthFactor: number
    viewportWidth: number
  }
}

export interface SwiperPropsType {
  prev?: React.ReactNode
  next?: React.ReactNode
  children: React.ReactNode
  className?: string
  swiperConfig?: SwiperConfigType
}

export interface SwiperSlidePropsType {
  children: React.ReactNode
  swiperConfig?: SwiperConfigType
}
