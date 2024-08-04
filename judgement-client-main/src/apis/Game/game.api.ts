/* eslint-disable no-param-reassign */
import { mainApi } from '@Apis/Api'
import { API } from '@Constants/api.constants'
import type {
  GameCreateRequestDataType,
  GameStateResponseType,
  GameSocketBiddingTurnEventDataType,
  GameSocketThrowCardEventDataType,
  GameSocketChanceChangeEventDataType,
  GameSocketChanceTurnEventDataType,
  GameSocketGameEndEventDataType,
  GameSocketRoundChangedEventDataType,
  GameSocketSendInviteEventDataType,
  GameSocketSetBidEventDataType,
  GameSocketSetReadyEventDataType,
  GameSocketSetRoundsEventDataType,
  GameSocketStartGameEventDataType,
  GameSocketUserJoinedEventDataType,
  SendGameInviteRequestDataType,
  SendGameInviteResponseType,
  SetBidRequestDataType,
  SetReadyRequestDataType,
  SetRoundsRequestDataType,
  StartGameRequestDataType,
  ThrowCardRequestDataType,
  GameSocketCardsOnTableEventDataType,
  GameSocketUserLeftEventDataType,
  GameSocketBiddingDoneEventDataType,
  GameSocketAdminChangedEventDataType,
  GameSocketUserDisconnectedEventDataType,
  GameHistoryResponseType,
  GameHistoryRequestDataType,
  GameDetailsResponseType,
  GameStatusResponseType,
  GameStatsResponseType,
  GameStatsRequestType,
} from '@Models/GameModels/Game'
import type { RootState } from '@Stores/index'
import { logDevError } from '@Utils/helpers'
import type { ErrorDataType } from '@Models/ErrorModels'
import type { PaginatedRequestType, ResponseType } from '@Models/ResponseModels'
import { RESPONSE } from '@Constants/response.constants'
import { getGameSocket } from '@Sockets/gameSocket'

const extendedGameApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    createGame: builder.mutation<GameStateResponseType, GameCreateRequestDataType>({
      query: ({ requestData }) => ({
        url: API.GAMES,
        method: 'POST',
        body: requestData,
      }),
    }),
    getGameHistory: builder.query<
      GameHistoryResponseType,
      GameHistoryRequestDataType & PaginatedRequestType
    >({
      query: ({ id, page = 1, limit = RESPONSE.DOCUMENTS_LIMIT }) => ({
        url: `${API.GAME_HISTORY}?id=${id}&page=${page}&limit=${limit}`,
      }),
      providesTags: (_, error, { id }) =>
        error?.data ? [{ type: 'Game' as const, id }, 'Game'] : [],
    }),
    getGameStats: builder.query<GameStatsResponseType, GameStatsRequestType>({
      query: ({ username, period }) => ({
        url: `${API.GAME_STATS}?username=${username}&period=${period}`,
      }),
    }),
    sendGameInvite: builder.mutation<SendGameInviteResponseType, SendGameInviteRequestDataType>({
      queryFn: ({ gameId, userId }, { getState }) => {
        const { token } = (getState() as RootState).root.auth
        const socket = getGameSocket(gameId, token)
        return new Promise((resolve, reject) => {
          socket.emit(
            'sendInvite',
            { userId },
            (err: ErrorDataType, response: SendGameInviteResponseType) => {
              if (err) {
                reject(err)
              }
              resolve({ data: response })
            },
          )
        })
      },
    }),
    setRounds: builder.mutation<ResponseType, SetRoundsRequestDataType>({
      queryFn: ({ gameId, numberOfRounds }, { getState }) => {
        const { token } = (getState() as RootState).root.auth
        const socket = getGameSocket(gameId, token)

        return new Promise((resolve, reject) => {
          socket.emit(
            'setRounds',
            { numberOfRounds },
            (err: ErrorDataType, response: ResponseType) => {
              if (err) {
                reject(err)
              }
              resolve({ data: response })
            },
          )
        })
      },
    }),
    setReady: builder.mutation<ResponseType, SetReadyRequestDataType>({
      queryFn: ({ gameId, ready }, { getState }) => {
        const { token } = (getState() as RootState).root.auth
        const socket = getGameSocket(gameId, token)

        return new Promise((resolve, reject) => {
          socket.emit('setReady', { ready }, (err: ErrorDataType, response: ResponseType) => {
            if (err) {
              reject(err)
            }
            resolve({ data: response })
          })
        })
      },
    }),
    startGame: builder.mutation<ResponseType, StartGameRequestDataType>({
      queryFn: ({ gameId }, { getState }) => {
        const { token } = (getState() as RootState).root.auth
        const socket = getGameSocket(gameId, token)

        return new Promise((resolve, reject) => {
          socket.emit('startGame', {}, (err: ErrorDataType, response: ResponseType) => {
            if (err) {
              reject(err)
            }
            resolve({ data: response })
          })
        })
      },
    }),
    setBid: builder.mutation<ResponseType, SetBidRequestDataType>({
      queryFn: ({ gameId, bid }, { getState }) => {
        const { token } = (getState() as RootState).root.auth
        const socket = getGameSocket(gameId, token)

        return new Promise((resolve, reject) => {
          socket.emit('setBid', { bid }, (err: ErrorDataType, response: ResponseType) => {
            if (err) {
              reject(err)
            }
            resolve({ data: response })
          })
        })
      },
    }),
    throwCard: builder.mutation<ResponseType, ThrowCardRequestDataType>({
      queryFn: ({ gameId, card }, { getState }) => {
        const { token } = (getState() as RootState).root.auth
        const socket = getGameSocket(gameId, token)

        return new Promise((resolve, reject) => {
          socket.emit('throwCard', { card }, (err: ErrorDataType, response: ResponseType) => {
            if (err) {
              reject(err)
            }
            resolve({ data: response })
          })
        })
      },
    }),
    getGameStatus: builder.query<GameStatusResponseType, string>({
      query: (gameId) => ({
        url: `${API.GAMES}/${gameId}/status`,
      }),
    }),
    getGameDetails: builder.query<GameDetailsResponseType, string>({
      query: (gameId) => ({
        url: `${API.GAMES}/${gameId}/details`,
      }),
    }),
    getGameState: builder.query<GameStateResponseType, string>({
      query: (gameId) => ({
        url: `${API.GAMES}/${gameId}/playState`,
      }),
      keepUnusedDataFor: 0.5,
      async onCacheEntryAdded(
        gameId,
        { cacheDataLoaded, cacheEntryRemoved, getState, updateCachedData },
      ) {
        const { token } = (getState() as RootState).root.auth

        try {
          await cacheDataLoaded

          const socket = getGameSocket(gameId, token)

          socket.on('connect_error', (err: Error) => {
            logDevError(err)
          })

          socket.on('userJoined', ({ player }: GameSocketUserJoinedEventDataType) => {
            const newUserId = player.user._id
            updateCachedData((cachedData) => {
              cachedData.data.game.players[newUserId] = { ...player }
              cachedData.data.game.playerIds[player.tablePosition] = player.user._id
              if (cachedData.data.game.invites?.[player.user._id])
                delete cachedData.data.game.invites[player.user._id]
            })
          })

          socket.on('sendInvite', ({ userId, timestamp }: GameSocketSendInviteEventDataType) => {
            updateCachedData((cachedData) => {
              cachedData.data.game.invites[userId] = timestamp
            })
          })

          socket.on('setRounds', ({ numberOfRounds }: GameSocketSetRoundsEventDataType) => {
            updateCachedData((cachedData) => {
              cachedData.data.game.numberOfRounds = numberOfRounds
            })
          })

          socket.on('setReady', ({ userId, ready }: GameSocketSetReadyEventDataType) => {
            updateCachedData((cachedData) => {
              cachedData.data.game.players[userId].ready = ready
            })
          })

          socket.on('startGame', ({ status, trump }: GameSocketStartGameEventDataType) => {
            updateCachedData((cachedData) => {
              cachedData.data.game.status = status
              cachedData.data.game.trump = trump
              try {
                mainApi.util.invalidateTags(
                  cachedData.data.game.playerIds.map((userId) => {
                    if (userId)
                      return {
                        type: 'User',
                        id: cachedData.data.game.players[userId].user.username,
                      }
                    return { type: 'User' }
                  }),
                )
              } catch (err) {
                logDevError(err)
              }
            })
          })

          socket.on('roundChanged', ({ currentRound }: GameSocketRoundChangedEventDataType) => {
            updateCachedData((cachedData) => {
              cachedData.data.game.currentRound = { ...currentRound }
            })
          })

          socket.on(
            'biddingTurn',
            ({ currentPlayerBiddingTime }: GameSocketBiddingTurnEventDataType) => {
              updateCachedData((cachedData) => {
                cachedData.data.game.currentRound.currentPlayerBiddingTime = {
                  ...currentPlayerBiddingTime,
                }
              })
            },
          )

          socket.on('setBid', ({ bid, userId }: GameSocketSetBidEventDataType) => {
            updateCachedData((cachedData) => {
              const currentRoundNumber = cachedData.data.game.currentRound.roundNumber

              const currentRoundScorecard = cachedData.data.game.scorecard[currentRoundNumber - 1]
              cachedData.data.game.scorecard[currentRoundNumber - 1] = {
                ...currentRoundScorecard,
                [userId]: bid,
              }
            })
          })

          socket.on(
            'biddingDone',
            ({ currentPlayerBiddingTime, state }: GameSocketBiddingDoneEventDataType) => {
              updateCachedData((cachedData) => {
                cachedData.data.game.currentRound.currentPlayerBiddingTime = {
                  ...currentPlayerBiddingTime,
                }
                cachedData.data.game.currentRound.state = state
              })
            },
          )

          socket.on(
            'chanceTurn',
            ({ currentPlayerChanceTime, currentChance }: GameSocketChanceTurnEventDataType) => {
              updateCachedData((cachedData) => {
                cachedData.data.game.currentRound = {
                  ...cachedData.data.game.currentRound,
                  currentPlayerChanceTime,
                  currentChance,
                }
              })
            },
          )

          socket.on('throwCard', ({ cardsRemaining }: GameSocketThrowCardEventDataType) => {
            updateCachedData((cachedData) => {
              cachedData.data.game.currentRound.cardsRemaining = { ...cardsRemaining }
            })
          })

          socket.on('cardsOnTable', ({ cardsOnTable }: GameSocketCardsOnTableEventDataType) => {
            updateCachedData((cachedData) => {
              cachedData.data.game.currentRound.cardsOnTable = { ...cardsOnTable }
            })
          })

          socket.on(
            'chanceChange',
            ({ currentRoundData, scorecard }: GameSocketChanceChangeEventDataType) => {
              updateCachedData((cachedData) => {
                cachedData.data.game.currentRound = {
                  ...cachedData.data.game.currentRound,
                  ...currentRoundData,
                }
                cachedData.data.game.scorecard = [...scorecard]
              })
            },
          )

          socket.on('gameEnd', ({ winner, scorecard, status }: GameSocketGameEndEventDataType) => {
            updateCachedData((cachedData) => {
              cachedData.data.game = {
                ...cachedData.data.game,
                winner,
                scorecard: scorecard ?? cachedData.data.game.scorecard,
                status,
              }
            })
          })

          socket.on('userLeft', ({ player }: GameSocketUserLeftEventDataType) => {
            const leftUserId = player.user._id
            updateCachedData((cachedData) => {
              cachedData.data.game.playerIds[player.tablePosition] = null
              delete cachedData.data.game.players[leftUserId]
            })
          })

          socket.on('userDisconnected', ({ player }: GameSocketUserDisconnectedEventDataType) => {
            const leftUserId = player.user._id
            updateCachedData((cachedData) => {
              cachedData.data.game.players[leftUserId].disconnected = true
            })
          })

          socket.on('adminChanged', ({ admin }: GameSocketAdminChangedEventDataType) => {
            updateCachedData((cachedData) => {
              cachedData.data.game.admin = admin
            })
          })

          await cacheEntryRemoved

          socket.close()
        } catch (err) {
          logDevError(err)
        }
      },
    }),
  }),
})

export { extendedGameApi }
