import { makeStyles } from 'tss-react/mui'

export const useStyles = (columnPercentages = '15% 15% 15% 15% 40%') =>
  makeStyles()(() => ({
    table: {
      minWidth: '280px',
      display: 'grid',
      width: '100%',
    },
    tableRows: {
      display: 'grid',
      width: '100%',
      gridTemplateColumns: columnPercentages,
      textAlign: 'center',
      fontSize: 'clamp(12px, 8px + 0.8vw, 20px)',
    },
    tableHeading: {
      borderTop: '1px solid white',
      borderBottom: '1px solid white',
      padding: '5px 0px',
    },
    tableRow: {
      alignItems: 'center',
      borderBottom: '1px solid white',
      padding: '8px 0px',
    },
  }))
