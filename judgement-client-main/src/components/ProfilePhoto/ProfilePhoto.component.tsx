import clsx from 'clsx'
import profilePhotoDefault from '@Assets/images/profile-default.png'
import { useStyles } from './style'

export function ProfilePhoto(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  const { classes } = useStyles()

  const { className, alt, src, ...imgProps } = props

  return (
    <img
      alt={alt}
      src={src ?? profilePhotoDefault}
      className={clsx(classes.profile, className)}
      {...imgProps}
    />
  )
}
