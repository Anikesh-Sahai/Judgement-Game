import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  question: {
    textAlign: 'center',
    fontSize: 'clamp(14px, 10px + 1.2vw, 24px)',
    marginBottom: 'clamp(4px, 3px + 0.25vh + 0.25vw, 8px)',
  },
}))
