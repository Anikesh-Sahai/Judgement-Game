export type UserListTitleType = 'Top Players' | 'Friends' | 'Suggested'

export interface UserListPropsType {
  title: UserListTitleType
  users: TopPlayersType[]
  isFetching?: boolean
  isSuccess?: boolean
  errorMsg?: string
}
