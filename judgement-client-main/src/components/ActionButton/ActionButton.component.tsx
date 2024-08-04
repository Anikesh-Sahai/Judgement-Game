import addIcon from '@Assets/icons/addicon.ico'
import requestedIcon from '@Assets/icons/requested.ico'
import removeIcon from '@Assets/icons/removeicon.ico'
import { Typography } from '@mui/material'
import { Button } from '@Components/Button'
import type { ActionButtonConfigType, ActionButtonPropsType } from '@Models/ActionButtonModels'
import { useStyles } from './style'

const actionButtonConfig: ActionButtonConfigType = {
  addFriend: {
    icon: addIcon,
    text: 'Add Friend',
    alt: 'add friend button',
  },
  unfriend: {
    icon: removeIcon,
    text: 'Unfriend',
    alt: 'unfriend button',
  },
  requested: {
    icon: requestedIcon,
    text: 'Requested',
    alt: 'unsend invite button',
  },
  confirm: {
    icon: addIcon,
    text: 'Confirm',
    alt: 'confirm button',
  },
  reject: {
    icon: removeIcon,
    text: 'Reject',
    alt: 'reject button',
  },
}

export function ActionButton(props: ActionButtonPropsType) {
  const { classes } = useStyles()

  const {
    btnType = 'addFriend',
    iconClass,
    children,
    loading,
    onClick,
    className,
    ...btnProps
  } = props

  return (
    <Button
      className={className}
      variant='contained'
      loading={loading}
      onClick={onClick}
      {...btnProps}
    >
      {children || (
        <>
          <img
            src={actionButtonConfig[btnType].icon}
            alt={actionButtonConfig[btnType].alt}
            className={iconClass ?? classes.iconImg}
          />
          <Typography marginTop={0.6} marginLeft={1} fontSize='inherit' fontWeight='inherit'>
            {actionButtonConfig[btnType].text}
          </Typography>
        </>
      )}
    </Button>
  )
}
