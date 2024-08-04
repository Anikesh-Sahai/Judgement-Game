import { useCallback, useState } from 'react'

export default function useModalState(handleClose: () => void) {
  const [dialogOpen, setDialogOpen] = useState(false)
  const handleDialogOpen = useCallback(() => {
    setDialogOpen(true)
  }, [])
  const handleDialogClose = useCallback(() => {
    setDialogOpen(false)
    handleClose()
  }, [handleClose])

  return { dialogOpen, handleDialogOpen, handleDialogClose }
}
