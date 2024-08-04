import { mainApi } from '@Apis/Api'
import { API } from '@Constants/api.constants'
import { RESPONSE } from '@Constants/response.constants'
import type { TopPlayersResponseType } from '@Models/PlayerModels'
import type { PaginatedRequestType } from '@Models/ResponseModels'
import { paginatedUrl } from '@Utils/helpers'

const extendedPlayerApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getTopPlayers: builder.query<TopPlayersResponseType, PaginatedRequestType>({
      providesTags: (result) =>
        result?.data.players
          ? [
              ...result.data.players.flatMap((player) => {
                const tags = []
                tags.push({ type: 'Player' as const, id: player.user._id })
                if (player.user.friend)
                  tags.push({ type: 'Friend' as const, id: player.user.friend._id })
                if (player.user.invite)
                  tags.push({ type: 'Invite' as const, id: player.user.invite._id })
                return tags
              }),
              'Player',
            ]
          : ['Player'],
      query: ({ page = 1, limit = RESPONSE.TOP_PLAYERS_LIMIT }) => ({
        url: paginatedUrl(API.PLAYERS, page, limit),
      }),
    }),
  }),
})

export { extendedPlayerApi }
