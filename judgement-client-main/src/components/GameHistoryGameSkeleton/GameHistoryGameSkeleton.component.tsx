import { Table } from '@Components/Table'
import theme from '@Themes/theme'
import { Skeleton, useMediaQuery } from '@mui/material'
import type { SkeletonProps } from '@mui/material/Skeleton'

function SkeletonBase(props: SkeletonProps) {
  const { sx, animation = 'wave', ...skeletonProps } = props
  return <Skeleton sx={{ bgcolor: 'grey.600', ...sx }} animation={animation} {...skeletonProps} />
}

export function GameHistoryGameSkeleton() {
  const matchSm = useMediaQuery(theme.breakpoints.down('sm'))
  const matchLg = useMediaQuery(theme.breakpoints.down('lg'))

  return (
    <Table.Row columnPercentages='100%'>
      <div
        style={{
          overflow: 'hidden',
          backgroundColor: 'transparent',
          height: matchSm ? '25px' : matchLg ? '30px' : '35px',
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <SkeletonBase variant='rounded' width='100%' height='80%' />
      </div>
    </Table.Row>
  )
}
