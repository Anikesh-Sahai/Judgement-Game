import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()((theme) => ({
  sizeOverride: {
    '&.MuiBadge-root': {
      height: '100%',
      width: '100%',
    },
  },
  avatar: {
    border: `3px solid ${theme.palette.primary.main}`,
    height: 'clamp(35px, 30px + 1.75vw, 65px)',
    width: 'clamp(35px, 30px + 1.75vw, 65px)',
  },
  btn: {
    borderRadius: '50%',
    overflow: 'hidden',
  },
}))
