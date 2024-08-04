import { UserList } from '@Containers/UserList'
import { useGetTopPlayersQuery } from '@Stores/index'
import useFetchError from '@Hooks/useFetchError'

export function TopPlayers() {
  const { data, isFetching, error, isError, isSuccess } = useGetTopPlayersQuery({})
  const players = data?.data?.players ?? []

  const { errorMsg } = useFetchError('Players', error, isError, players, isSuccess)

  return (
    <UserList
      key='top-players'
      title='Top Players'
      users={players}
      isFetching={isFetching}
      isSuccess={isSuccess}
      errorMsg={errorMsg}
    />
  )
}
