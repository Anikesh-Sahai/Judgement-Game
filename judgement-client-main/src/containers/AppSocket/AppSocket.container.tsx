import useAppSocketEventListeners from '@Hooks/useAppSocketEventListeners'
import { Box } from '@mui/material'

export function AppSocket({ children }: React.PropsWithChildren) {
  useAppSocketEventListeners()

  return <Box>{children}</Box>
}
