import { Link } from 'react-router-dom'
import { Grid, Typography, useMediaQuery } from '@mui/material'
import { NavButton } from '@Components/NavButton'
import messageIcon from '@Assets/icons/message.ico'
import facebookIcon from '@Assets/icons/facebook-icon.ico'
import githubIcon from '@Assets/icons/github-icon.ico'
import linkedinIcon from '@Assets/icons/linkedin-icon.ico'
import whatsappIcon from '@Assets/icons/whatsapp-icon.ico'
import clsx from 'clsx'
import { ROUTES } from '@Constants/router.constants'
import theme from '@Themes/theme'
import { SOCIAL } from '@Constants/social.constants'
import { useStyles } from './style'

const judgementBtns = [
  {
    to: ROUTES.PLAY,
    text: 'play now',
  },
  {
    to: ROUTES.PLAYERS,
    text: 'make friends',
  },
  {
    to: ROUTES.GROUPS,
    text: 'create groups',
  },
]

const iconBtns = [
  {
    src: messageIcon,
    alt: 'message',
    href: SOCIAL.MESSAGE,
  },
  {
    src: facebookIcon,
    alt: 'facebook',
    href: SOCIAL.FACEBOOK,
  },
  {
    src: whatsappIcon,
    alt: 'whatsapp',
    href: SOCIAL.WHATSAPP,
  },
  {
    src: linkedinIcon,
    alt: 'linkedIn',
    href: SOCIAL.LINKEDIN,
  },
  {
    src: githubIcon,
    alt: 'github',
    href: SOCIAL.GITHUB,
  },
]

function JudgementBtns() {
  return (
    <>
      {judgementBtns.map((btn) => (
        <NavButton key={btn.text} to={btn.to} type='primary'>
          {btn.text}
        </NavButton>
      ))}
    </>
  )
}

function DeviesIcons() {
  const { classes } = useStyles()

  return (
    <>
      {iconBtns.map((icon) => (
        <Link
          key={icon.alt}
          to={icon.href}
          className={classes.iconLink}
          target='_blank'
          rel='noreferrer'
        >
          <img alt={icon.alt} src={icon.src} className={classes.icons} />
        </Link>
      ))}
    </>
  )
}

const footerContent = [
  {
    title: 'judgement',
    text: (
      <>
        <b>Judgement</b> is a fun and easy online multiplayer classic card game that is played among
        four player. A player can make friends, groups to stay connected for fun and play with them
        in a single click.
      </>
    ),
    btns: JudgementBtns,
  },
  {
    title: 'devies',
    text: (
      <>
        We are geeks who have developed Judgement and are on our journey to create many more
        professional, scalable, and modern web applications. We can also be your technical team.
        Whether it&apos;s your well-established business or a startup idea you want to take online,
        we are the perfect choice to make it realize. Just <b>contact us</b> at
      </>
    ),
    btns: DeviesIcons,
  },
]

export function HomepageFooter() {
  const smSizeUp = useMediaQuery(theme.breakpoints.up('sm'))
  const smSizeDown = useMediaQuery(theme.breakpoints.down('sm'))

  const { classes } = useStyles()

  return (
    <Grid className={classes.footer} bgcolor='#0F1521'>
      <Grid container justifyContent='space-around'>
        {footerContent.map((footerItem) => (
          <Grid key={footerItem.title} container direction='column' className={classes.container}>
            <Grid item className={classes.gridItem}>
              <Typography className={classes.heading}>{footerItem.title}</Typography>
            </Grid>
            <Grid item className={classes.gridItem}>
              <Typography className={classes.content}>{footerItem.text}</Typography>
            </Grid>
            {smSizeDown && (
              <Grid
                item
                container
                justifyContent='center'
                className={clsx(classes.gridItem, classes.bottomContainer)}
                alignItems='center'
                gap={2}
              >
                <footerItem.btns />
              </Grid>
            )}
          </Grid>
        ))}
      </Grid>
      {smSizeUp && (
        <Grid container direction='row' alignItems='center' className={classes.bottomGrid}>
          {footerContent.map((footerItem) => (
            <Grid
              key={footerItem.title}
              item
              container
              justifyContent='center'
              className={clsx(classes.container)}
              alignItems='center'
              xs={6}
              gap={3}
            >
              <footerItem.btns />
            </Grid>
          ))}
        </Grid>
      )}
    </Grid>
  )
}
