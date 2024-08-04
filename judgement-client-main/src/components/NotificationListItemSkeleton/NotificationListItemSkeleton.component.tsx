import theme from '@Themes/theme'
import { Skeleton, useMediaQuery } from '@mui/material'
import type { SkeletonProps } from '@mui/material/Skeleton'

function SkeletonBase(props: SkeletonProps) {
  const { sx, animation = 'wave', ...skeletonProps } = props
  return <Skeleton sx={{ bgcolor: 'grey.600', ...sx }} animation={animation} {...skeletonProps} />
}

interface NotificationListItemSkeletonProps {
  height?: number
  className?: string
}

export function NotificationListItemSkeleton({
  height = 75,
  className = '',
}: NotificationListItemSkeletonProps) {
  const matchSm = useMediaQuery(theme.breakpoints.down('sm'))
  const matchLg = useMediaQuery(theme.breakpoints.down('lg'))

  return (
    <div
      style={{
        overflow: 'hidden',
        backgroundColor: 'transparent',
        height: matchSm ? height : matchLg ? height + 20 : height + 25,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '10px',
      }}
      className={className}
    >
      <div
        style={{
          width: '100%',
          height: '65%',
          display: 'flex',
          gap: '8px',
          justifyContent: 'space-around',
          alignItems: 'center',
          paddingRight: '5px',
        }}
      >
        <SkeletonBase variant='circular' height='110%' sx={{ aspectRatio: '1' }} />
        <SkeletonBase variant='rounded' width='76%' height='80%' />
      </div>
      <div
        style={{
          width: '100%',
          height: '32%',
          display: 'flex',
          gap: '10px',
          justifyContent: 'flex-end',
          alignItems: 'center',
          paddingRight: '10px',
        }}
      >
        <SkeletonBase variant='rounded' height='100%' width='30%' />
        <SkeletonBase variant='rounded' width='30%' height='100%' />
      </div>
    </div>
  )
}
