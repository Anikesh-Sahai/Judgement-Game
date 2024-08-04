import { useState, useCallback, useEffect } from 'react'
import { swiperConfigDefault, getSwiperValues } from '@Components/Swiper'
import type { SwiperConfigType } from '@Models/SwiperModels'
import { useWindowSize } from '@Hooks/useWindowSize'

/**
 *
 * @param elementRef -> ref of SwiperBox element
 * @param swiperConfig ->  swiper config object
 * @returns object containing next & prev button handlers with their disabled state
 */
export function useSwiperScroll(
  elementRef: React.RefObject<HTMLElement>,
  swiperConfig: SwiperConfigType = swiperConfigDefault,
) {
  const [windowWidth] = useWindowSize()
  const [curScrollValue, setCurScrollValue] = useState(elementRef.current?.scrollLeft ?? 0)
  const [curScrollWidth, setCurScrollWidth] = useState(elementRef.current?.scrollWidth ?? 0)

  const { scrollLengthFactor } = getSwiperValues(windowWidth, swiperConfig)

  // scrolling to the current scroll value after re-render
  elementRef.current?.scrollTo(curScrollValue, 0)

  // childrenCount will be the number of different slides to load
  const childrenCount = elementRef.current?.children.length
  const swiperWidth = elementRef.current?.clientWidth ?? 0

  // button handler for moving back
  const handlePrev = useCallback(() => {
    setCurScrollValue((cur) => Math.max(0, cur - scrollLengthFactor * swiperWidth))
  }, [swiperWidth, scrollLengthFactor])

  // button handler for moving forward
  const handleNext = useCallback(() => {
    setCurScrollValue((cur) => cur + scrollLengthFactor * swiperWidth)
  }, [swiperWidth, scrollLengthFactor])

  // conditions for disabling buttons
  const disabledPrev = curScrollValue === 0
  const disabledNext = curScrollWidth - swiperWidth - curScrollValue <= 6

  // this listens to changes in scrollwidth of swiper
  useEffect(() => {
    const interval = setInterval(() => setCurScrollWidth(elementRef.current?.scrollWidth ?? 0), 300)

    return () => clearInterval(interval)
  }, [elementRef, childrenCount])

  // listens to a scrollend event when a user manually drags the swiper
  useEffect(() => {
    const listnerFunc = () => {
      setCurScrollValue(elementRef.current?.scrollLeft ?? 0)
    }

    const refObj = elementRef.current
    refObj?.addEventListener('scrollend', listnerFunc)

    return () => refObj?.removeEventListener('scrollend', listnerFunc)
  }, [elementRef])

  return { handleNext, handlePrev, disabledNext, disabledPrev }
}
