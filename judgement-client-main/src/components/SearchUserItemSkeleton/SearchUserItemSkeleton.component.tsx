import { Skeleton } from '@mui/material'
import type { SkeletonProps } from '@mui/material/Skeleton'

function SkeletonBase(props: SkeletonProps) {
  const { sx, animation = 'wave', ...skeletonProps } = props
  return <Skeleton sx={{ bgcolor: 'grey.600', ...sx }} animation={animation} {...skeletonProps} />
}

interface SearchUserItemSkeletonProps {
  height?: number
  className?: string
}

export function SearchUserItemSkeleton({
  height = 42,
  className = '',
}: SearchUserItemSkeletonProps) {
  return (
    <div
      className={className}
      style={{
        overflow: 'hidden',
        backgroundColor: 'transparent',
        height: `clamp(${height}px, ${height - 10}px + 3vw, ${height + 30}px)`,
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '2px 4% 2px 5%',
      }}
    >
      <div
        style={{
          width: '100%',
          height: '80%',
          display: 'flex',
          gap: 'clamp(5px, 3px + 0.8vw, 10px)',
          alignItems: 'center',
        }}
      >
        <SkeletonBase variant='circular' sx={{ aspectRatio: '1' }} height='100%' />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            width: '70%',
            height: '100%',
            gap: '5px',
          }}
        >
          <SkeletonBase variant='rounded' width='80%' height='35%' />
          <SkeletonBase variant='rounded' width='100%' height='35%' />
        </div>
      </div>
    </div>
  )
}
