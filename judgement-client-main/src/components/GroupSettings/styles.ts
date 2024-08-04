import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()((theme) => ({
  groupSettingsIcon: {
    fontSize: 'clamp(30px, 15px + 1.5vw + 0.5vh, 50px)',
  },
  itemIcon: {
    color: 'inherit',
    display: 'flex',
    alignItems: 'center',
    paddingBottom: '3px',
    minWidth: '30px !important',
    fontSize: '24px',
  },
  groupSettingsMenuBar: {
    [theme.breakpoints.down('sm')]: {
      width: '135px',
    },
  },
  groupSettingsMenuBarItem: {
    [theme.breakpoints.down('sm')]: {
      width: '120px',
    },
  },
  groupSettingsMenuBarBtnText: {
    fontSize: '16px',
  },
  groupDetailsEditIcon: {
    fontSize: '22px',
  },
}))
