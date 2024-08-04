import theme from '@Themes/theme'
import { Skeleton, useMediaQuery } from '@mui/material'
import type { SkeletonProps } from '@mui/material/Skeleton'

function SkeletonBase(props: SkeletonProps) {
  const { sx, animation = 'wave', ...skeletonProps } = props
  return <Skeleton sx={{ bgcolor: 'grey.600', ...sx }} animation={animation} {...skeletonProps} />
}

interface FriendSkeletonProps {
  height?: number
}

export function FriendSkeleton({ height = 45 }: FriendSkeletonProps) {
  const matchSm = useMediaQuery(theme.breakpoints.down('sm'))
  const matchLg = useMediaQuery(theme.breakpoints.down('lg'))

  return (
    <div
      style={{
        overflow: 'hidden',
        backgroundColor: 'transparent',
        height: matchSm ? height : matchLg ? height + 18 : height + 24,
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <div
        style={{ width: '70%', height: '100%', display: 'flex', gap: '10px', alignItems: 'center' }}
      >
        <SkeletonBase variant='circular' sx={{ aspectRatio: '1' }} height='100%' />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            width: '50%',
            height: '100%',
            gap: '5px',
          }}
        >
          <SkeletonBase variant='rounded' width='80%' height='30%' />
          <SkeletonBase variant='rounded' width='100%' height='30%' />
        </div>
      </div>
      <SkeletonBase variant='rounded' height='50%' width='25%' />
    </div>
  )
}
