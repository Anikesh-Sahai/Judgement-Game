import { UserList } from '@Containers/UserList'
import { useAppSelector } from '@Hooks/redux.hooks'
import useFetchError from '@Hooks/useFetchError'
import { useGetTopFriendsQuery } from '@Stores/index'

export function TopFriends() {
  const auth = useAppSelector((store) => store?.root?.auth)
  const { username } = auth.user

  const { data, isFetching, error, isError, isSuccess } = useGetTopFriendsQuery({ username })
  const friends = data?.data?.friends ?? []
  const { errorMsg } = useFetchError('Friends', error, isError, friends, isSuccess)

  return (
    <UserList
      key='top-friends'
      title='Friends'
      users={friends}
      isFetching={isFetching}
      isSuccess={isSuccess}
      errorMsg={errorMsg}
    />
  )
}
