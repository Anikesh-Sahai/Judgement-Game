import { debounce } from '@mui/material'
import { useCallback, useLayoutEffect, useState } from 'react'

export function useWindowSize() {
  const [size, setSize] = useState([0, 0])

  const handleSizeChange = useCallback(() => {
    setSize([window.innerWidth, window.innerHeight])
  }, [])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const updateSize = useCallback(debounce(handleSizeChange, 400), [])

  useLayoutEffect(() => {
    window.addEventListener('resize', updateSize)
    handleSizeChange()
    return () => window.removeEventListener('resize', updateSize)
  }, [updateSize, handleSizeChange])
  return size
}
