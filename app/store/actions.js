import { ACTION_TYPES } from '../basics/constants';
import { createAction } from '../basics/utils';

export const refreshReduxStore = (data) =>
  createAction(ACTION_TYPES.REFRESH_REDUX_STORE, data);

export const setGameSize = (size) =>
  createAction(ACTION_TYPES.SET_SIZE, size);

export const setGameId = (gameId) =>
  createAction(ACTION_TYPES.SET_GAME_ID, gameId);

export const setGameover = (gameover) =>
  createAction(ACTION_TYPES.SET_GAMEOVER, gameover);

export const toggleCurrentPlayer = (nextPlayer) =>
  createAction(ACTION_TYPES.TOGGLE_CURRENT_PLAYER, nextPlayer);

export const setOrigin = (origin) =>
  createAction(ACTION_TYPES.SET_ORIGIN, origin);

export const setCanConnectWith = (canConnectWith) =>
  createAction(ACTION_TYPES.SET_CAN_CONNECT_WITH, canConnectWith);

export const setUsedFences = (usedFences) =>
  createAction(ACTION_TYPES.SET_USED_FENCES, usedFences);

export const setFencedByP1 = (fencedByP1) =>
  createAction(ACTION_TYPES.SET_FENCED_BY_P1, fencedByP1);

export const setFencedByP2 = (fencedByP2) =>
  createAction(ACTION_TYPES.SET_FENCED_BY_P2, fencedByP2);

export const setIamPlayer = (player) =>
  createAction(ACTION_TYPES.SET_IAM_PLAYER, player);

export const setSocketInstance = (socketInstance) =>
  createAction(ACTION_TYPES.SET_SOCKET_INSTANCE, socketInstance);

export const setSocketLocalId = (socketId) =>
  createAction(ACTION_TYPES.SET_SOCKET_LOCAL_ID, socketId);

export const setSocketRemoteId = (socketId) =>
  createAction(ACTION_TYPES.SET_SOCKET_REMOTE_ID, socketId);

export const setChatMessage = (message) =>
  createAction(ACTION_TYPES.SET_CHAT_MESSAGE, message);
