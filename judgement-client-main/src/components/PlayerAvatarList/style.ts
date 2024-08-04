import { makeStyles } from 'tss-react/mui-compat'

export const useStyles = makeStyles()((theme) => ({
  avatarList: {
    width: '346px',
    gap: '12px',
    padding: '5px 12px 5px',
    [theme.breakpoints.down('md')]: {
      width: '284px',
      gap: '10px',
    },
    [theme.breakpoints.down('sm')]: {
      width: '228px',
      gap: '8px',
    },
    [theme.breakpoints.down(360)]: {
      width: '160px',
      gap: '8px',
    },
    flexGrow: '1',
    alignContent: 'flex-start',
    flexWrap: 'wrap',
    overflow: 'auto',
    scrollbarGutter: 'stable both-edges',
  },
  avatar: {
    height: '50px',
    width: '50px',
    [theme.breakpoints.down('sm')]: {
      height: '45px',
      width: '45px',
    },
    [theme.breakpoints.down(360)]: {
      height: '40px',
      width: '40px',
    },
  },
  btn: {
    height: 'clamp(14px, 12px + 1.5vh, 22px)',
    padding: '0px',
    aspectRatio: '1',
    position: 'relative',
  },
  btnIcon: {
    height: '100%',
  },
}))
