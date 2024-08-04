import { Skeleton, type SkeletonProps } from '@mui/material'

export function GroupMemberAvatarSkeleton({ className }: SkeletonProps) {
  return <Skeleton sx={{ bgcolor: 'grey.600' }} variant='circular' className={className} />
}
