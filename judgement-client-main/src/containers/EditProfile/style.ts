import { makeStyles } from 'tss-react/mui'

const imageSize = 'clamp(80px, 60px + 2vw + 3vh, 120px)'

export const useStyles = makeStyles()((theme) => ({
  dialog: {
    color: theme.palette.primary.contrastText,
    '.MuiModal-backdrop': {
      backdropFilter: 'blur(6px)',
      backgroundColor: '#ffffff03',
    },
    '.MuiDialog-paper': {
      boxShadow: '0px 0px 20px 0px #00000035, 0px 0px 20px 0px #ffffff40',
      borderRadius: 'clamp(3px, 1px + 1vh, 8px)',
    },
  },
  editProfileDialog: {
    '.MuiDialog-paper': {
      width: '420px',
      padding: 'clamp(5px, 2px + 1vh, 10px) clamp(5px, 2px + 0.8vw, 12px)',
      [theme.breakpoints.down('md')]: {
        width: '360px',
      },
      [theme.breakpoints.down(500)]: {
        width: '70vw',
      },
      [theme.breakpoints.down(300)]: {
        width: '220px',
      },
      position: 'absolute',
    },
  },
  dialogTitle: {
    color: theme.palette.primary.contrastText,
    display: 'flex',
    justifyContent: 'center',
    fontSize: 'clamp(12px, 8px + 1.2vw + 0.5vh, 25px)',
    lineHeight: '100%',
    padding: '10px 20px 12px',
  },
  dialogContent: {
    width: '100%',
    color: theme.palette.primary.contrastText,
    [theme.breakpoints.down('sm')]: {
      padding: '10px 10px',
    },
  },
  editProfileForm: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 'clamp(6px, 2px + 1.2vh, 8px)',
  },
  closeBtn: {
    position: 'absolute',
    top: 'clamp(10px, 5px + 1vh, 15px)',
    right: 'clamp(10px, 5px + 0.7vw, 15px)',
    padding: '0',
  },
  closeIcon: {
    color: theme.palette.primary.contrastText,
    fontSize: '30px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '20px',
    },
  },
  absoluteFill: {
    position: 'absolute',
    top: '0',
    left: '0',
    bottom: '0',
    right: '0',
    borderRadius: '50%',
  },
  imageFieldBox: {
    gap: 'clamp(4px, 2px + 1vh, 10px)',
  },
  imageUploadBox: {
    position: 'relative',
    height: imageSize,
    width: imageSize,
  },
  imageUploadError: {
    fontSize: 'clamp(10px, 6px + 0.8vw, 13px)',
    color: theme.palette.primary.light,
    textAlign: 'center',
    minHeight: 'clamp(15px, 12px + 1vh, 20px)',
  },
  uploadArea: {
    cursor: 'pointer',
    '&:hover': {
      background: '#ffffff35',
    },
    '&:hover .image-file-upload-icon': {
      display: 'inline-block !important',
    },
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadAreaLoading: {
    background: '#ffffff35',
    cursor: 'default',
  },
  profileImage: {
    height: '100%',
    width: '100%',
    margin: '0',
    padding: '0',
    borderRadius: '50%',
    border: `3px solid ${theme.palette.primary.light}`,
  },
  iconArea: {
    position: 'absolute',
    background: 'transparent',
  },
  formActionBtns: {
    [theme.breakpoints.down(400)]: {
      flexDirection: 'column',
      gap: '10px',
    },
  },
  btnCancel: {
    backgroundColor: '#272727',
    '&:hover': {
      background: '#99999950',
    },
  },
}))
