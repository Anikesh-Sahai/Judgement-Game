import { type Socket, io } from 'socket.io-client'
import type { DefaultEventsMap } from '@socket.io/component-emitter'

let socket: Socket<DefaultEventsMap, DefaultEventsMap>
let currentToken: string

export function getAppSocket(token: string) {
  if (!socket?.connected || token !== currentToken) {
    currentToken = token
    socket = io(import.meta.env.VITE_BASE_URL, {
      extraHeaders: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    })
  }
  return socket
}
