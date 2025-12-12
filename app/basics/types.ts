import { Socket } from "socket.io-client";
import { SupportedLanguagesType } from "../translations/supportedLanguages";
import { Tour } from 'nextstepjs';

export type INITIAL_STATE_TYPE = {
  chat: {
    messages: string[],
  },
  clients: {count: number},
  game: {
    gameId: number,
    gameIdChanged: boolean
    size: {x: number, y: number},
    nameOfPlayer1: string,
    nameOfPlayer2: string,
    iamPlayer: number,
    currentPlayer: number,
    gameover: false,
    usedFences: string[],
    usedFencesP1: string[],
    usedFencesP2: string[],
    fencedByP1: string[],
    fencedByP2: string[],
  },
  language: {
    isDefault: boolean,
    selected: SupportedLanguagesType
  },
  mouse: {
    origin: number,
    canConnectWith: string[],
  },
  socket: {
    instance: Socket | null,
    localSocketId: string,
    remoteIsOnline: boolean,
    remoteHasLeft: boolean,
  },
  nextStep: {
    loadedLanguage: string,
    steps: Tour[],
  }
};