import { Socket } from "socket.io-client";

export type INITIAL_STATE_TYPE = {
  chat: {
    messages: string[],
  },
  game: {
    gameId: number,
    size: number,
    localPlayerName: string,
    remotePlayerName: string,
    iamPlayer: number,
    currentPlayer: number,
    gameover: false,
    usedFences: string[],
    fencedByP1: string[],
    fencedByP2: string[],
  },
  mouse: {
    origin: number,
    canConnectWith: string[],
  },
  socket: {
    instance: Socket | null,
    localId: string,
    remoteIsOnline: boolean,
  },
};