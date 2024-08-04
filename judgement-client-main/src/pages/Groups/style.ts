import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()((theme) => ({
  mainContainer: {
    background: theme.palette.background.paper,
    color: theme.palette.primary.contrastText,
    width: '100%',
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: '0px clamp(5px, 2px + 1vw, 10px)',
    gap: '10px',
  },
  userSection: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '25px',
    gap: 'clamp(8px, 4px + 1px, 18px)',
    alignItems: 'center',
  },
  titleArea: {
    width: '100%',
    padding: '40px clamp(30px, 10px + 8vw, 120px)',
    [theme.breakpoints.down('sm')]: {
      padding: '40px clamp(10px, 5px + 7vw, 40px)',
    },
    display: 'flex',
  },
  groupsTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: 'clamp(4px, 2px + 2vw, 15px)',
    flexGrow: '1',
  },
  noGroupsText: {
    fontSize: 'clamp(14px, 10px + 1.5vw, 26px)',
    textAlign: 'center',
    alignSelf: 'center',
  },
  diamondIcon: {
    height: 'clamp(23px, 14px + 6vw, 55px)',
  },
  titleFont: {
    fontSize: 'clamp(16px, 12px + 2vw + 0.5vh, 55px)',
  },
  newGroup: {
    fontSize: 'clamp(35px, 20px + 2.5vw + 1vh, 70px)',
  },
  userGroupSection: {
    minHeight: '300px',
    display: 'flex',
    gap: 'clamp(8px, 4px + 5vw + 1vh, 50px)',
    width: '100%',
    justifyContent: 'center',
    flexWrap: 'wrap',
    overflowY: 'auto',
    'scrollbar-width': 'none',
  },
  buttonContainer: {
    justifyContent: 'center',
    marginTop: '50px',
    gap: 'clamp(18px, 14px + 3vw + 1vh, 50px)',
  },
  section: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '25px',
  },
  errorBox: {
    width: '100%',
    minHeight: '200px',
  },
}))
