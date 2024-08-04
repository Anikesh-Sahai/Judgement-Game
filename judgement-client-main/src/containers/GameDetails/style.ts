import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()((theme) => ({
  appLayout: {
    height: 'auto',
    minHeight: '100vh',
    [theme.breakpoints.down(300)]: {
      width: 'auto',
    },
  },
  mainClassName: {
    height: '100%',
    minHeight: '100vh',
    overflowX: 'auto',
  },
  container: {
    width: '100%',
    height: '100%',
    color: theme.palette.primary.contrastText,
    minWidth: '300px',
  },
  contentArea: {
    width: '80%',
    maxWidth: '750px',
    padding: 'clamp(10px, 5px + 5vh, 30px) 25px',
    [theme.breakpoints.down('sm')]: {
      width: '90%',
      padding: 'clamp(5px, 5px + 2vh, 30px) clamp(5px, 2px + 2vw, 20px)',
    },
    [theme.breakpoints.down(400)]: {
      width: '100%',
      padding: 'clamp(5px, 5px + 2vh, 30px) 5px',
    },
  },
  headerSection: {
    width: '100%',
  },
  headerText: {
    fontSize: 'clamp(12px, 8px + 0.8vw, 16px)',
    color: theme.palette.primary.contrastText,
    padding: '0px 5px',
    borderBottom: '1px solid',
  },
  text: {
    width: '100%',
    color: theme.palette.primary.contrastText,
    textAlign: 'center',
  },
  rankText: {
    fontSize: 'clamp(14px, 8px + 1vw, 18px)',
  },
  nameText: {
    fontSize: 'clamp(12px, 7px + 0.8vw, 15px)',
  },
  avatarRankingSection: {
    width: '80%',
    minWidth: '400px',
    [theme.breakpoints.down('sm')]: {
      width: '95%',
      minWidth: '270px',
    },
    gap: 'clamp(5px, 2px + 1vw, 15px)',
  },
  medalBadge: {
    marginTop: '-8px',
    marginRight: '5px',
  },
  playerAvatarBox: {
    gap: 'clamp(8px, 5px + 1.2vh, 15px)',
  },
  avatarBox: {
    height: '120px',
    [theme.breakpoints.down('sm')]: {
      height: '90px',
    },
  },
  rankBox: {
    height: '100px',
    [theme.breakpoints.down('sm')]: {
      height: '80px',
    },
  },
  scorecardTableRow: {
    gridTemplateColumns: '20% 20% 20% 20% 20% !important',
    fontSize: 'clamp(10px, 4px + 0.9vw, 18px)',
  },
  currentPlayerText: {
    color: theme.palette.primary.main,
  },
  scorecardTable: {
    width: '90%',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
}))
