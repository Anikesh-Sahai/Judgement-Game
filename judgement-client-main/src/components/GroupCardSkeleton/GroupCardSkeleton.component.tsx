import theme from '@Themes/theme'
import { Skeleton, useMediaQuery } from '@mui/material'
import type { SkeletonProps } from '@mui/material/Skeleton'

interface GroupCardSkeletonPropsType {
  showPlay?: boolean
}

function SkeletonBase(props: SkeletonProps) {
  const { sx, animation = 'wave', ...skeletonProps } = props
  return <Skeleton sx={{ bgcolor: 'grey.600', ...sx }} animation={animation} {...skeletonProps} />
}

export function GroupCardSkeleton({ showPlay }: GroupCardSkeletonPropsType) {
  const matchSm = useMediaQuery(theme.breakpoints.down('sm'))
  const minWidth = matchSm ? 160 : 300
  const imageHeight = matchSm ? 110 : 140
  const bottomHeight = matchSm ? 140 : 180
  const titleHeight = matchSm ? 25 : 36
  const descriptionLineHeight = matchSm ? 20 : 28
  const avatarsHeight = matchSm ? 40 : 50

  return (
    <div
      style={{
        minWidth,
        borderRadius: '20px',
        overflow: 'hidden',
        backgroundColor: '#0F1521',
        height: matchSm ? '250px' : '320px',
        width: '100%',
      }}
    >
      <SkeletonBase variant='rounded' height={imageHeight} />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
          alignItems: 'center',
          width: '100%',
          padding: '5px 10px',
          height: bottomHeight,
        }}
      >
        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}
        >
          <SkeletonBase width='60%' height={titleHeight} />
          <SkeletonBase height={descriptionLineHeight} width='100%' />
          <SkeletonBase height={descriptionLineHeight} width='100%' />
        </div>
        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
          <SkeletonBase height={avatarsHeight} width='40%' />
          {showPlay && <SkeletonBase height={avatarsHeight} width='40%' />}
        </div>
      </div>
    </div>
  )
}
