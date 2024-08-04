import { useAppSelector } from '@Hooks/redux.hooks'
import {
  useAcceptInviteMutation,
  useRejectInviteMutation,
  useSendInviteMutation,
  useUnfriendMutation,
  useUnsendInviteMutation,
} from '@Stores/index'
import { ActionButton } from '@Components/ActionButton'
import type {
  PlayerSocialButtonProps,
  PlayerSocialOperationButtonProps,
} from '@Models/ActionButtonModels'
import { useMutationRequest } from '@Hooks/useMutationRequest'
import type {
  ConfirmInviteActionDataType,
  InviteActionDataType,
  InviteCreateResponseType,
  InviteRequestDataType,
} from '@Models/InviteModels'
import type { UnfriendRequestDataType } from '@Models/FriendModels'
import { getName } from '@Utils/helpers'

export function SendInviteButton(props: PlayerSocialOperationButtonProps) {
  const { children, user, handleCacheMutation, group, ...btnProps } = props

  const { handleMutationRequest, results } = useMutationRequest<
    InviteRequestDataType,
    InviteCreateResponseType
  >('send invite', useSendInviteMutation, true, { successMsg: 'Invite Sent' })

  const requestData = { receiver: user._id, group: group?._id }

  return (
    <ActionButton
      btnType='addFriend'
      loading={results.isLoading}
      onClick={() => handleMutationRequest(requestData)}
      {...btnProps}
    >
      {children}
    </ActionButton>
  )
}

export function AcceptInviteButton(props: PlayerSocialOperationButtonProps) {
  const { children, user, handleCacheMutation, group, ...btnProps } = props

  const currentUser = useAppSelector((store) => store.root.auth.user)

  const { handleMutationRequest, results } = useMutationRequest<ConfirmInviteActionDataType, void>(
    'accept invite',
    useAcceptInviteMutation,
    true,
    {
      successMsg: group
        ? `You are now a member of the group ${group?.groupName}.`
        : `You and ${getName(user)} are now friends`,
    },
    handleCacheMutation,
  )

  if (!user.invite?._id) return null

  const requestData = { inviteId: user.invite?._id, username: currentUser.username }

  return (
    <ActionButton
      btnType='confirm'
      loading={results.isLoading}
      onClick={() => handleMutationRequest(requestData)}
      {...btnProps}
    >
      {children}
    </ActionButton>
  )
}

export function RejectInviteButton(props: PlayerSocialButtonProps) {
  const { children, user, handleCacheMutation, ...btnProps } = props

  const { handleMutationRequest, results } = useMutationRequest<InviteActionDataType, void>(
    'reject invite',
    useRejectInviteMutation,
    true,
    { successMsg: 'Invite declined' },
    handleCacheMutation,
  )

  if (!user.invite?._id) return null

  const requestData = { inviteId: user.invite?._id }

  return (
    <ActionButton
      btnType='reject'
      loading={results.isLoading}
      onClick={() => handleMutationRequest(requestData)}
      {...btnProps}
    >
      {children}
    </ActionButton>
  )
}

export function UnsendInviteButton(props: PlayerSocialButtonProps) {
  const { children, user, ...btnProps } = props

  const { handleMutationRequest, results } = useMutationRequest<InviteActionDataType, void>(
    'delete invite',
    useUnsendInviteMutation,
    true,
    { successMsg: 'Invite deleted' },
  )

  if (!user.invite?._id) return null

  const requestData = { inviteId: user.invite?._id }

  return (
    <ActionButton
      btnType='requested'
      loading={results.isLoading}
      onClick={() => {
        handleMutationRequest(requestData)
      }}
      {...btnProps}
    >
      {children}
    </ActionButton>
  )
}

export function UnfriendButton(props: PlayerSocialButtonProps) {
  const { children, user, ...btnProps } = props

  const auth = useAppSelector((store) => store?.root?.auth)

  const { handleMutationRequest, results } = useMutationRequest<UnfriendRequestDataType, void>(
    'unfriend',
    useUnfriendMutation,
    true,
    { successMsg: `You and ${getName(user)} are no longer friends` },
  )

  if (!user.friend?._id) return null

  const requestData = { friendshipId: user.friend?._id, username: auth.user.username }

  return (
    <ActionButton
      btnType='unfriend'
      loading={results.isLoading}
      onClick={() => handleMutationRequest(requestData)}
      {...btnProps}
    >
      {children}
    </ActionButton>
  )
}

export const userRelations = [
  {
    status: null,
    btnType: SendInviteButton,
    text: 'Add Friend',
  },
  {
    status: 'friend',
    btnType: UnfriendButton,
    text: 'Unfriend',
  },
  {
    status: 'requested',
    btnType: UnsendInviteButton,
    text: 'Requested',
  },
  {
    status: 'received',
    btnType: AcceptInviteButton,
    text: 'Confirm',
  },
]
