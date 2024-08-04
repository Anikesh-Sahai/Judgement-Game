import clsx from 'clsx'
import { useEffect, useMemo, useState } from 'react'
import { Avatar, Box, Grid, IconButton, TextField, Typography, debounce } from '@mui/material'
import { INPUT_LENGTH } from '@Constants/input.constants'
import type { UserType, UsernameType } from '@Models/UserModels/User'
import inviteIcon from '@Assets/icons/invite.png'
import { useAppSelector } from '@Hooks/redux.hooks'
import { RESPONSE } from '@Constants/response.constants'
import { useLazyLoading } from '@Hooks/useLazyLoading'
import profilePhotoDefault from '@Assets/images/profile-default.png'
import type {
  FriendDataType,
  FriendsResponseType,
  GetFriendsRequestDataType,
} from '@Models/FriendModels'
import {
  useLazyGetFriendsQuery,
  useLazyGetGroupMembersQuery,
  useSendGameInviteMutation,
} from '@Stores/index'
import useFetchError from '@Hooks/useFetchError'
import { Error } from '@Components/Error'
import { getName } from '@Utils/helpers'
import { FriendSkeleton } from '@Components/FriendSkeleton'
import type {
  GameInviteStateDataType,
  GamePlayersType,
  SendGameInviteRequestDataType,
  SendGameInviteResponseType,
} from '@Models/GameModels/Game'
import { GAME } from '@Constants/game.constants'
import { Loader } from '@Components/Loader'
import { useMutationRequest } from '@Hooks/useMutationRequest'
import type {
  GetGroupMembersRequestType,
  GetGroupMembersResponseType,
  GroupMemberType,
} from '@Models/GroupModels'
import { useStyles } from './style'

interface GameInviteButtonProps {
  userId: string
  gameId: string
  invites: GameInviteStateDataType
}

const isInviteSent = (timestamp: number) => Date.now() - timestamp < GAME.INVITE_TIME

const getRemainingValue = (timestamp: number) => {
  if (isInviteSent(timestamp)) {
    const timeElapsed = Date.now() - timestamp
    return (timeElapsed * 100) / GAME.INVITE_TIME
  }
  return 0
}

export function GameInviteButton({ userId, gameId, invites }: GameInviteButtonProps) {
  const { classes } = useStyles()

  const { handleMutationRequest, results } = useMutationRequest<
    SendGameInviteRequestDataType,
    SendGameInviteResponseType
  >('game invite', useSendGameInviteMutation, true, { successMsg: 'Invite sent' })
  const { isLoading } = results

  const inviteTimestamp = invites?.[userId] ?? 0
  const inviteSent = isInviteSent(inviteTimestamp)
  const showInviteBtn = !isLoading && !inviteSent
  const showWaitingSpinner = !isLoading && inviteSent
  const [remainingValue, setRemainingValue] = useState(() => getRemainingValue(inviteTimestamp))

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingValue(() => getRemainingValue(inviteTimestamp))
    }, 1000)
    return () => {
      clearInterval(interval)
    }
  }, [inviteTimestamp])

  return (
    <>
      {showInviteBtn && (
        <IconButton
          onClick={() => handleMutationRequest({ gameId, userId })}
          className={classes.inviteBtn}
        >
          <img src={inviteIcon} alt='invite' className={classes.btnIcon} />
        </IconButton>
      )}
      {showWaitingSpinner && (
        <Loader
          sx={{
            border: '2px solid',
            borderColor: 'primary.main',
            borderRadius: '50%',
            marginRight: '6px',
          }}
          variant='determinate'
          value={remainingValue}
          thickness={22}
          size='clamp(20px, 10px + 1.5vw, 30px)'
        />
      )}
    </>
  )
}

interface InviteListPropsType {
  gameId: string
  invites: GameInviteStateDataType
  players: GamePlayersType
  currentUser: UserType
  searchQuery: UsernameType
}

interface GroupInviteListPropsType extends InviteListPropsType {
  groupId: string
}

function FriendInviteList({
  gameId,
  invites,
  players,
  currentUser,
  searchQuery,
}: InviteListPropsType) {
  const { classes } = useStyles()

  const requestArgs = useMemo(
    () => ({ username: currentUser.username, searchQuery }),
    [currentUser.username, searchQuery],
  )
  const documentsLimit = RESPONSE.FRIENDS_LIMIT

  const { friends: friendsKey } = useAppSelector((store) => store.refetch)

  const { trackedRef, showDetector, results, state } = useLazyLoading<
    GetFriendsRequestDataType,
    FriendsResponseType
  >(useLazyGetFriendsQuery, requestArgs, 1, documentsLimit, friendsKey)

  const { pages, isFetching, isSuccess, loadErrorMsg } = state
  const { isError, error } = results

  const friends: FriendDataType[] = []
  pages.forEach((page) => {
    friends.push(...page.data.friends)
  })

  const { errorMsg } = useFetchError('Friends', error, isError, friends, isSuccess)

  const errorMessage = errorMsg || loadErrorMsg

  if (isError) {
    return <Error errorMsg={errorMessage} />
  }

  return (
    <Box className={classes.listWrapper}>
      {isSuccess && friends.length === 0 ? (
        <Typography variant='h6' className={classes.defaultText}>
          No friends found
        </Typography>
      ) : (
        <Grid container flexDirection='column' alignItems='center' className={classes.playerList}>
          {isSuccess &&
            friends &&
            friends.map(({ user }) => (
              <Grid
                container
                direction='row'
                justifyContent='space-between'
                alignItems='center'
                key={`search-friend-${user._id}`}
                className={classes.playerListItem}
              >
                <Box className={classes.userInfo}>
                  <Grid item>
                    <Avatar
                      src={user.displayImg?.smallUrl ?? profilePhotoDefault}
                      className={classes.avatars}
                    />
                  </Grid>
                  <Grid
                    container
                    direction='column'
                    justifyContent='center'
                    className={classes.userTextSection}
                  >
                    <Typography className={clsx(classes.infoText, classes.username)}>
                      {user.username}
                    </Typography>
                    <Typography className={clsx(classes.infoText, classes.name)}>
                      {getName(user)}
                    </Typography>
                  </Grid>
                </Box>

                {players?.[user._id] ? null : (
                  <Box>
                    <GameInviteButton userId={user._id} gameId={gameId} invites={invites} />
                  </Box>
                )}
              </Grid>
            ))}
          {isFetching &&
            [...Array(documentsLimit).keys()].map((key) => (
              <FriendSkeleton height={30} key={`friend-search-skeleton-${key}`} />
            ))}
          {showDetector && (
            <Box ref={trackedRef} sx={{ width: '100%' }}>
              <FriendSkeleton height={30} key='friend-search-skeleton-track' />
            </Box>
          )}
        </Grid>
      )}
    </Box>
  )
}

function GroupInviteList({
  gameId,
  invites,
  players,
  groupId,
  currentUser,
  searchQuery,
}: GroupInviteListPropsType) {
  const { classes } = useStyles()

  const requestArgs = useMemo(() => ({ id: groupId, searchQuery }), [groupId, searchQuery])
  const documentsLimit = RESPONSE.FRIENDS_LIMIT

  const { members: membersKey } = useAppSelector((store) => store.refetch)

  const { trackedRef, showDetector, results, state } = useLazyLoading<
    GetGroupMembersRequestType,
    GetGroupMembersResponseType
  >(useLazyGetGroupMembersQuery, requestArgs, 1, documentsLimit, membersKey)

  const { pages, isFetching, isSuccess, loadErrorMsg } = state
  const { isError, error } = results

  const members: GroupMemberType[] = []
  pages.forEach((page) => {
    members.push(...page.data.members)
  })

  const { errorMsg } = useFetchError('Friends', error, isError, members, isSuccess)

  const errorMessage = errorMsg || loadErrorMsg

  if (isError) {
    return <Error errorMsg={errorMessage} />
  }

  return (
    <Box className={classes.listWrapper}>
      {isSuccess && members.length === 0 ? (
        <Typography variant='h6' className={classes.defaultText}>
          No members found
        </Typography>
      ) : (
        <Grid container flexDirection='column' alignItems='center' className={classes.playerList}>
          {isSuccess &&
            members &&
            members.map(({ user }) =>
              user._id !== currentUser._id ? (
                <Grid
                  container
                  direction='row'
                  justifyContent='space-between'
                  alignItems='center'
                  key={`search-friend-${user._id}`}
                  className={classes.playerListItem}
                >
                  <Box className={classes.userInfo}>
                    <Grid item>
                      <Avatar
                        src={user.displayImg?.smallUrl ?? profilePhotoDefault}
                        className={classes.avatars}
                      />
                    </Grid>
                    <Grid
                      container
                      direction='column'
                      justifyContent='center'
                      className={classes.userTextSection}
                    >
                      <Typography className={clsx(classes.infoText, classes.username)}>
                        {user.username}
                      </Typography>
                      <Typography className={clsx(classes.infoText, classes.name)}>
                        {getName(user)}
                      </Typography>
                    </Grid>
                  </Box>

                  {players?.[user._id] ? null : (
                    <Box>
                      <GameInviteButton userId={user._id} gameId={gameId} invites={invites} />
                    </Box>
                  )}
                </Grid>
              ) : null,
            )}
          {isFetching &&
            [...Array(documentsLimit).keys()].map((key) => (
              <FriendSkeleton height={30} key={`friend-search-skeleton-${key}`} />
            ))}
          {showDetector && (
            <Box ref={trackedRef} sx={{ width: '100%' }}>
              <FriendSkeleton height={30} key='friend-search-skeleton-track' />
            </Box>
          )}
        </Grid>
      )}
    </Box>
  )
}

export interface SendGameInviteProps {
  groupId?: string
  gameId: string
  invites: GameInviteStateDataType
  players: GamePlayersType
}

export function SendGameInvite({ groupId, gameId, invites, players }: SendGameInviteProps) {
  const { classes } = useStyles()

  const [searchQuery, setSearchQuery] = useState<UsernameType>('')
  const currentUser = useAppSelector((store) => store.root.auth.user)

  const func = debounce((val) => setSearchQuery(val), 500)

  return (
    <Grid
      container
      alignItems='center'
      justifyContent='space-between'
      flexDirection='column'
      className={classes.inviteContainer}
    >
      <TextField
        variant='outlined'
        size='small'
        name='username'
        placeholder='username'
        onChange={(e) => func(e.target.value)}
        type='search'
        autoComplete='off'
        inputProps={{ maxLength: INPUT_LENGTH.USERNAME.MAX }}
        autoFocus
        className={classes.searchBox}
      />
      {groupId ? (
        <GroupInviteList
          gameId={gameId}
          invites={invites}
          players={players}
          groupId={groupId}
          currentUser={currentUser}
          searchQuery={searchQuery}
        />
      ) : (
        <FriendInviteList
          gameId={gameId}
          invites={invites}
          players={players}
          currentUser={currentUser}
          searchQuery={searchQuery}
        />
      )}
    </Grid>
  )
}
