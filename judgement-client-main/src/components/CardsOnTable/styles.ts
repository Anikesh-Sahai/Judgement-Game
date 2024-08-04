import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  playedCard: {
    position: 'absolute',
  },
  cardPlayerZero: {
    height: '20%',
    top: '52%',
  },
  cardPlayerOne: {
    height: '20%',
    right: '56%',
  },
  cardPlayerTwo: {
    height: '20%',
    bottom: '52%',
  },
  cardPlayerThree: {
    height: '20%',
    left: '56%',
  },
}))
