import { useParams } from 'react-router-dom'
import { useCallback, useMemo, useState } from 'react'
import {
  Avatar,
  Box,
  ClickAwayListener,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Tab,
  Tabs,
  TextField,
  Typography,
  debounce,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import clsx from 'clsx'
import {
  useDeleteGroupMemberMutation,
  useGetGroupInvitesQuery,
  useGetGroupMembersQuery,
  useGetGroupQuery,
  useSendGroupInvitesMutation,
  useUnsendInviteMutation,
} from '@Stores/index'
import useFetchError from '@Hooks/useFetchError'
import { Loader } from '@Components/Loader'
import { Error } from '@Components/Error'
import profilePhotoDefault from '@Assets/images/profile-default.png'
import { useAppSelector } from '@Hooks/redux.hooks'
import type { GroupInfoType, GroupMemberType } from '@Models/GroupModels'
import { RESPONSE } from '@Constants/response.constants'
import { PlayerAvatarList } from '@Components/PlayerAvatarList'
import inviteIcon from '@Assets/icons/invite.png'
import invitedIcon from '@Assets/icons/invited.png'
import deselectIcon from '@Assets/icons/deselect.png'
import type { UserType } from '@Models/UserModels'
import type { UsernameType } from '@Models/UserModels/User'
import { getName } from '@Utils/helpers'
import { FriendSkeleton } from '@Components/FriendSkeleton'
import { INPUT_LENGTH } from '@Constants/input.constants'
import { Button } from '@Components/Button'
import type { SentGroupInviteDataType } from '@Models/InviteModels'
import { useFriends } from '@Hooks/useFriends'
import { useMutationRequest } from '@Hooks/useMutationRequest'
import { useStyles } from './style'

interface GroupInvitePropsType {
  open: boolean
  handleClose: () => void
}

interface TabPanelProps {
  children?: React.ReactNode
  value: string
  currentValue: string
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, currentValue } = props

  return value === currentValue ? (
    <Grid
      container
      direction='column'
      justifyContent='center'
      alignItems='center'
      role='tabpanel'
      style={{ overflow: 'hidden', flexGrow: '1' }}
      id={`simple-tabpanel-${value}`}
      aria-labelledby={`simple-tab-${value}`}
    >
      {children}
    </Grid>
  ) : null
}

function GroupMembersList({ group }: { group: GroupInfoType }) {
  const { user: currentUser } = useAppSelector((store) => store.root.auth)
  const { slug } = useParams() as { slug: string }
  const documentsLimit = RESPONSE.GROUP_MEMBERS_LIMIT
  const [isDeletingMember, setIsDeletingMember] = useState(false)

  const { handleMutationRequest } = useMutationRequest(
    'remove member',
    useDeleteGroupMemberMutation,
    true,
    { successMsg: 'User removed from group', errorMsg: `Can't remove user at the moment` },
    undefined,
    undefined,
    () => setIsDeletingMember(false),
  )

  const { data, isSuccess, isFetching, isError, error } = useGetGroupMembersQuery({ slug })
  const { members = [] } = data?.data || {}
  const { errorMsg } = useFetchError('Group Members', error, isError, members, isSuccess)

  const userMembershipIdMap: { [key: string]: string } = {}

  const onRemoveUser = (user: UserType) => {
    const membershipId = userMembershipIdMap[user._id]
    setIsDeletingMember(true)
    handleMutationRequest({ slug: group.slug, membershipId, username: user.username })
  }

  let users: (UserType | null)[] = []

  if (errorMsg) {
    return <Error errorMsg={errorMsg} />
  }

  if (isSuccess && members) {
    users = [
      ...members.map(({ _id, user }) => {
        if (user) userMembershipIdMap[user._id] = _id
        return user
      }),
    ]
  }

  if (isFetching || isDeletingMember) {
    users = [...Array(documentsLimit).keys()].map(() => null)
  }

  return (
    <PlayerAvatarList
      users={users}
      onRemoveUser={currentUser._id === group.admin?._id ? onRemoveUser : undefined}
      badgeHiddenUsers={[group.admin?._id]}
    />
  )
}

interface InviteListPropsType {
  searchQuery: UsernameType
  selectedUsers: UserType[]
  setSelectedUsers: React.Dispatch<React.SetStateAction<UserType[]>>
  members: GroupMemberType[]
  invites: SentGroupInviteDataType[]
}

function InvitedUsersList({ group }: { group: GroupInfoType }) {
  const documentsLimit = RESPONSE.GROUP_INVITES_LIMIT

  const [isDeletingInvite, setIsDeletingInvite] = useState(false)
  const { data, isError, isFetching, isSuccess, error } = useGetGroupInvitesQuery({
    group: group?._id,
  })
  const { invites = [] } = data?.data || {}
  const userInviteMap: { [key: string]: string } = {}
  let users: (UserType | null)[] = []
  const badgeHiddenUsers: string[] = []

  const { handleMutationRequest } = useMutationRequest(
    'delete invite',
    useUnsendInviteMutation,
    true,
    { successMsg: 'Invite deleted', errorMsg: `Can't delete invite at the moment` },
    undefined,
    undefined,
    () => setIsDeletingInvite(false),
  )

  const { errorMsg } = useFetchError('Invites', error, isError, invites, isSuccess)

  if (isError) {
    return <Error errorMsg={errorMsg} />
  }

  if (isSuccess && invites) {
    users = [
      ...invites.map(({ receiver, sender, _id }) => {
        if (receiver) userInviteMap[receiver._id] = _id
        if (!sender) {
          badgeHiddenUsers.push(receiver._id)
        }
        return receiver
      }),
    ]
  }

  if (isFetching || isDeletingInvite) {
    users = [...Array(documentsLimit).keys()].map(() => null)
  }

  if (!users.length) {
    return <Error errorMsg='No invites sent' />
  }

  const onRemoveUser = (user: UserType) => {
    const inviteId = userInviteMap[user._id]
    setIsDeletingInvite(true)
    handleMutationRequest({ inviteId })
  }

  return (
    <PlayerAvatarList
      users={users}
      badgeHiddenUsers={badgeHiddenUsers}
      onRemoveUser={onRemoveUser}
    />
  )
}

function FriendInviteList({
  searchQuery,
  selectedUsers,
  setSelectedUsers,
  members,
  invites,
}: InviteListPropsType) {
  const { classes } = useStyles()

  const { user: currentUser } = useAppSelector((store) => store.root.auth)
  const documentsLimit = RESPONSE.FRIENDS_LIMIT

  const {
    friends,
    errorMessage,
    state: { isError, isFetching, isSuccess },
    trackedRef,
    showDetector,
  } = useFriends(currentUser.username, searchQuery, 1, RESPONSE.FRIENDS_LIMIT)

  const selectedIds = useMemo(() => {
    const isSelected: { [key: string]: boolean } = {}
    selectedUsers.forEach((user) => {
      isSelected[user._id] = true
    })
    return isSelected
  }, [selectedUsers])

  const memberIds = useMemo(() => {
    const isMember: { [key: string]: boolean } = {}
    members.forEach(({ user }) => {
      isMember[user._id] = true
    })
    return isMember
  }, [members])

  const invitedIds = useMemo(() => {
    const isInvited: { [key: string]: boolean } = {}
    invites.forEach(({ receiver }) => {
      isInvited[receiver._id] = true
    })
    return isInvited
  }, [invites])

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

                <Box>
                  {memberIds[user._id] ? null : invitedIds[user._id] ? (
                    <Box className={classes.inviteBtn}>
                      <img src={invitedIcon} alt='invite' className={classes.btnIcon} />
                    </Box>
                  ) : selectedIds[user._id] ? (
                    <IconButton
                      onClick={() =>
                        setSelectedUsers((selUsers) =>
                          selUsers.filter((curUser) => curUser._id !== user._id),
                        )
                      }
                      className={classes.inviteBtn}
                    >
                      <img src={deselectIcon} alt='invite' className={classes.btnIcon} />
                    </IconButton>
                  ) : (
                    <IconButton
                      onClick={() => setSelectedUsers((selUsers) => [...selUsers, user])}
                      className={classes.inviteBtn}
                    >
                      <img src={inviteIcon} alt='invite' className={classes.btnIcon} />
                    </IconButton>
                  )}
                </Box>
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

interface InviteAreaPropsType {
  group: GroupInfoType
  selectedUsers: UserType[]
  setSelectedUsers: React.Dispatch<React.SetStateAction<UserType[]>>
  members: GroupMemberType[]
  invites: SentGroupInviteDataType[]
  onRemoveUser: (user: UserType) => void
}

function InviteArea({
  group,
  selectedUsers,
  setSelectedUsers,
  onRemoveUser,
  members,
  invites,
}: InviteAreaPropsType) {
  const { classes } = useStyles()

  const [searchQuery, setSearchQuery] = useState<UsernameType>('')
  const [isListVisible, setIsListVisible] = useState(false)
  const {
    handleMutationRequest,
    results: { isLoading },
  } = useMutationRequest(
    'send invite',
    useSendGroupInvitesMutation,
    true,
    {
      successMsg: 'Invites sent',
      errorMsg: `Can't send invites at the moment`,
    },
    () => setSelectedUsers([]),
  )

  const handleSendGroupInvites = () => {
    handleMutationRequest({ receivers: selectedUsers.map(({ _id }) => _id), group: group._id })
  }

  const func = debounce((val) => setSearchQuery(val), 500)

  return (
    <>
      <ClickAwayListener onClickAway={() => setIsListVisible(false)}>
        <Box className={classes.inviteArea}>
          <TextField
            variant='outlined'
            size='small'
            name='username'
            placeholder='username'
            onChange={(e) => func(e.target.value)}
            type='search'
            onFocusCapture={() => setIsListVisible(true)}
            autoComplete='off'
            inputProps={{ maxLength: INPUT_LENGTH.USERNAME.MAX }}
            className={classes.searchBox}
          />
          {isListVisible && (
            <FriendInviteList
              searchQuery={searchQuery}
              selectedUsers={selectedUsers}
              setSelectedUsers={setSelectedUsers}
              members={members}
              invites={invites}
            />
          )}
        </Box>
      </ClickAwayListener>
      <PlayerAvatarList componentHeight='0' users={selectedUsers} onRemoveUser={onRemoveUser} />
      <Grid
        container
        flexDirection='row-reverse'
        justifyContent='space-evenly'
        alignItems='center'
        className={classes.formActionBtns}
      >
        <Button type='submit' loading={isLoading} onClick={handleSendGroupInvites}>
          Invite
        </Button>
        <Button
          type='reset'
          disabled={isLoading}
          onClick={() => setSelectedUsers([])}
          className={classes.btnReset}
        >
          Reset
        </Button>
      </Grid>
    </>
  )
}

const tabs = [
  { value: 'members', label: 'Members' },
  { value: 'invite', label: 'Invite' },
  { value: 'invited', label: 'Invited' },
]

function GroupInviteMenu({ group }: { group: GroupInfoType }) {
  const { classes } = useStyles()
  const { slug } = useParams() as { slug: string }

  const [value, setValue] = useState('invite')

  const [selectedUsers, setSelectedUsers] = useState<UserType[]>([])

  const groupMembersResult = useGetGroupMembersQuery({ slug })
  const { members = [] } = groupMembersResult.data?.data || {}

  const groupInvitesResult = useGetGroupInvitesQuery({ group: group?._id })
  const { invites = [] } = groupInvitesResult.data?.data || {}

  const onRemoveUser = useCallback(
    (user: UserType) => {
      setSelectedUsers((selUsers) => selUsers.filter((curUser) => curUser._id !== user._id))
    },
    [setSelectedUsers],
  )

  const handleChange = (_: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  return (
    <>
      <Tabs value={value} onChange={handleChange} textColor='inherit' className={classes.tabs}>
        {tabs.map(({ value: tabValue, label }) => (
          <Tab
            key={`group-invite-tab-${tabValue}`}
            label={label}
            value={tabValue}
            className={classes.tab}
            disableRipple
          />
        ))}
      </Tabs>
      <CustomTabPanel value='members' currentValue={value}>
        <GroupMembersList group={group} />
      </CustomTabPanel>
      <CustomTabPanel value='invite' currentValue={value}>
        <InviteArea
          group={group}
          selectedUsers={selectedUsers}
          members={members}
          invites={invites}
          setSelectedUsers={setSelectedUsers}
          onRemoveUser={onRemoveUser}
        />
      </CustomTabPanel>
      <CustomTabPanel value='invited' currentValue={value}>
        <InvitedUsersList group={group} />
      </CustomTabPanel>
    </>
  )
}

export function GroupInvite({ open, handleClose }: GroupInvitePropsType) {
  const { classes } = useStyles()

  const { user } = useAppSelector((store) => store.root.auth)
  const { slug } = useParams() as { slug: string }
  const { data: groupData, isFetching, isError, error, isSuccess } = useGetGroupQuery({ slug })
  const group = groupData?.data?.group
  const isUserGroupAdmin = group?.admin?._id && group?.admin?._id === user?._id

  const { errorMsg } = useFetchError('Group', error, isError, group, isSuccess)

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='group-invite-dialog'
      className={clsx(classes.dialog, classes.inviteDialog)}
    >
      <IconButton onClick={handleClose} className={classes.closeBtn}>
        <CloseIcon className={classes.closeIcon} />
      </IconButton>
      <DialogTitle id='group-invite-dialog-title' className={classes.dialogTitle}>
        <Typography fontSize='inherit' textAlign='center'>
          {isUserGroupAdmin ? 'Manage Members' : 'Invite Friends'}
        </Typography>
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        {isFetching ? (
          <Loader size={40} />
        ) : isError || !group ? (
          <Error errorMsg={errorMsg} />
        ) : (
          <GroupInviteMenu group={group} />
        )}
      </DialogContent>
    </Dialog>
  )
}
