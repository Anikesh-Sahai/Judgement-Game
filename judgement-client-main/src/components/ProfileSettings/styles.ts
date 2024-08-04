import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()((theme) => ({
  profileSettingsIcon: {
    fontSize: 'clamp(28px, 12px + 1.5vw + 0.4vh, 40px)',
  },
  itemIcon: {
    color: 'inherit',
    display: 'flex',
    alignItems: 'center',
    paddingBottom: '3px',
    fontSize: '24px',
  },
  profileSettingsMenuBar: {
    [theme.breakpoints.down('sm')]: {
      width: '135px',
    },
  },
  profileSettingsMenuBarItem: {
    [theme.breakpoints.down('sm')]: {
      width: '120px',
    },
  },
  profileSettingsMenuBarBtnText: {
    fontSize: '16px',
  },
  editIcon: {
    fontSize: '22px',
  },
}))
