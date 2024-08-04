import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()((theme) => ({
  miniScorecardBtn: {
    position: 'absolute',
    top: '8px',
    left: '0px',
    fontSize: '10px',
    color: theme.palette.primary.contrastText,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '5px',
    paddingTop: '4px',
  },
  scorecardIcon: {
    height: 'clamp(20px, 15px + 1.5vw, 35px)',
    paddingLeft: '10px',
    paddingBottom: '3px',
  },
  miniScorecard: {
    width: '380px',
    padding: '10px 10px 12px',
    [theme.breakpoints.down('xl')]: {
      width: '340px',
      padding: '8px 8px 10px',
    },
    [theme.breakpoints.down('lg')]: {
      width: '300px',
      padding: '8px 8px 10px',
    },
    [theme.breakpoints.down('md')]: {
      width: '250px',
      padding: '6px 6px 8px',
    },
    [theme.breakpoints.down(750)]: {
      width: '200px',
      padding: '4px 4px 6px',
    },
    [theme.breakpoints.down('sm')]: {
      width: '180px',
      padding: '2px 2px 4px',
    },
    [theme.breakpoints.down(480)]: {
      width: '160px',
      padding: '3px 2px',
    },
    background: '#0c0d1b',
    position: 'absolute',
    top: 'clamp(6px, 2px + 2vh, 20px)',
    left: 'clamp(6px, 2px + 1.5vw, 20px)',
    borderRadius: 'clamp(4px, 2px + 0.5vw, 8px)',
    color: theme.palette.primary.contrastText,
    zIndex: '2',
  },
  closeBtn: {
    position: 'absolute',
    top: 'clamp(5px, 2px + 1vh, 10px)',
    left: 'clamp(5px, 2px + 0.7vw, 10px)',
    padding: '0',
  },
  closeIcon: {
    color: theme.palette.primary.contrastText,
    fontSize: '16px',
  },
  popOutBtn: {
    position: 'absolute',
    top: 'clamp(5px, 2px + 1vh, 10px)',
    right: 'clamp(5px, 2px + 0.7vw, 10px)',
    padding: '0',
  },
  popOutIcon: {
    height: 'clamp(18px, 12px + 1.25vw, 30px)',
    aspectRatio: '1',
  },
  miniScorecardTitle: {
    padding: '6px',
    fontSize: 'clamp(12px, 8px + 1vw, 22px)',
    textAlign: 'center',
    marginBottom: '5px',
    [theme.breakpoints.down('md')]: {
      marginBottom: '0px',
    },
    [theme.breakpoints.down('sm')]: {
      padding: '4px',
    },
  },
  scoreColumn: {
    gap: '6px',
    [theme.breakpoints.down('sm')]: {
      gap: '3px',
    },
  },
  playerScore: {
    color: theme.palette.primary.contrastText,
    fontSize: 'clamp(10px, 4px + 1vw, 20px)',
  },
  playerScoreName: {
    textAlign: 'center',
    overflow: 'hidden',
    width: '100%',
    textOverflow: 'ellipsis',
  },
  currentPlayerScore: {
    color: theme.palette.primary.main,
  },
  playerScoreArea: {
    position: 'relative',
    minWidth: 'clamp(16px, 10px + 1.1vw, 28px)',
    minHeight: 'clamp(20px, 8px + 1.45vw, 36px)',
  },
  score: {
    fontSize: 'clamp(10px, 4px + 1vw, 20px)',
    lineHeight: '100%',
  },
  madeScore: {
    position: 'absolute',
    top: '50%',
    left: '30%',
    transform: 'translate(-100%, -90%)',
  },
  bidScore: {
    position: 'absolute',
    bottom: '50%',
    right: '30%',
    transform: 'translate(100%, 90%)',
  },
  scoreSlashCurrent: {
    borderRight: `1px solid ${theme.palette.primary.main}`,
  },
  scoreSlashOther: {
    borderRight: `1px solid ${theme.palette.primary.contrastText}`,
  },
  scoreSlash: {
    height: 'clamp(15px, 8px + 1.3vw, 30px)',
    position: 'absolute',
    top: '50%',
    right: '50%',
    transform: 'translate(50%, -50%) rotate(30deg)',
  },
}))
