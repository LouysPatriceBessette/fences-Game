import { ACTION_TYPES } from './types';
import { createAction } from './utils';

export const setGameSize = (size) =>
  createAction(ACTION_TYPES.SET_SIZE, size);

export const setGameover = (gameover) =>
  createAction(ACTION_TYPES.SET_GAMEOVER, gameover);

export const toggleCurrentPlayer = () =>
  createAction(ACTION_TYPES.TOGGLE_CURRENT_PLAYER);

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

export const resetMoves = () =>
  createAction(ACTION_TYPES.RESET_MOVES);
