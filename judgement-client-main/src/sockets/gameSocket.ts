import { type Socket, io } from 'socket.io-client'
import type { DefaultEventsMap } from '@socket.io/component-emitter'

let gameSocket: Socket<DefaultEventsMap, DefaultEventsMap>
let currentGameId: string
let currentToken: string

export function getGameSocket(gameId: string, token: string) {
  if (!gameSocket?.connected || gameId !== currentGameId || token !== currentToken) {
    currentGameId = gameId
    currentToken = token
    gameSocket = io(`${import.meta.env.VITE_BASE_URL}/game/${currentGameId}`, {
      extraHeaders: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    })
  }
  return gameSocket
}
