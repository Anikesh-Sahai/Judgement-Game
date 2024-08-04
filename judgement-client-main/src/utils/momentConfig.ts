import moment from 'moment'

moment.updateLocale('en', {
  relativeTime: {
    s: '1s',
    ss: '%ds',
    m: '1m',
    mm: '%dm',
    h: '1h',
    hh: '%dh',
    d: '1d',
    dd: '%dd',
    w: '1w',
    ww: '%dw',
    M: '1M',
    MM: '%dM',
    y: '1y',
    yy: '%dy',
  },
})
