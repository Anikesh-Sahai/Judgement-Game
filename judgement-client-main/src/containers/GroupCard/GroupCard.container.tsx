import {
  Avatar,
  AvatarGroup,
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import profilePhotoDefault from '@Assets/images/profile-default.png'
import groupPhotoDefault from '@Assets/images/group-default.jpg'
import type { GroupInfoType } from '@Models/GroupModels'
import { ROUTES } from '@Constants/router.constants'
import { Button } from '@Components/Button'
import { useStyles } from './style'

interface GroupCardPropsType {
  group: GroupInfoType
  showPlay?: boolean
}

export function GroupCard({ group, showPlay = true }: GroupCardPropsType) {
  const { classes } = useStyles()

  const navigate = useNavigate()

  return (
    <Box className={classes.cardContainer}>
      <Link to={`${ROUTES.GROUPS}/${group?.slug}`} className={classes.cardLink} />
      <Card elevation={8} className={classes.card}>
        <CardMedia component='img' image={group?.displayImg?.mediumUrl ?? groupPhotoDefault} />

        <Grid
          container
          direction='column'
          justifyContent='space-between'
          className={classes.afterImageArea}
        >
          <CardContent className={classes.textContent}>
            <Typography className={classes.heading} gutterBottom>
              {group?.groupName}
            </Typography>

            <Typography className={classes.content}>{group?.description}</Typography>
          </CardContent>

          <Grid
            display='flex'
            flexDirection='row'
            justifyContent='space-between'
            className={classes.memberActions}
          >
            <AvatarGroup total={group?.memberCount} spacing={23} className={classes.avatarGroup}>
              {group.members.map((player, index) => (
                <Avatar
                  key={player?.user?._id}
                  alt={player?.user?.username}
                  src={player?.user?.displayImg?.smallUrl ?? profilePhotoDefault}
                  style={{ zIndex: index }}
                />
              ))}
            </AvatarGroup>

            {showPlay && (
              <Button
                onClick={(e) => {
                  e.preventDefault()
                  navigate(`${ROUTES.PLAY}?group=${group._id}`)
                }}
                onMouseOver={(e) => e.preventDefault()}
                className={classes.play}
              >
                Play Now
              </Button>
            )}
          </Grid>
        </Grid>
      </Card>
    </Box>
  )
}
