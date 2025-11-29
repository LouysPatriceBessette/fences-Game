import { combineReducers } from "redux";
import { ACTION_TYPES } from './types';

export const INITIAL_STATE = {
  game: {
    size: 3,
    gameover: false,
  },
  player: {
    currentPlayer: 1,
  },
  moves: {
    origin: -1,
    canConnectWith: [],
    usedFences: [],
    fencedByP1: [],
    fencedByP2: [],
  },
};



export const gameReducer = (state = INITIAL_STATE.game, action) => {
  const { type, payload } = action;

  switch (type) {
    case ACTION_TYPES.SET_SIZE:
      return {
        ...state,
        size: payload,
      };
    case ACTION_TYPES.SET_GAMEOVER:
      return {
        ...state,
        gameover: payload,
      };
    default:
      return state;
  }
};

export const playerReducer = (state = INITIAL_STATE.player, action) => {
  const { type } = action;

  switch (type) {
    case ACTION_TYPES.TOGGLE_CURRENT_PLAYER:
      return {
        ...state,
        currentPlayer: state.currentPlayer === 1 ? 2 : 1,
      };
    default:
      return state;
  }
};

export const moveReducer = (state = INITIAL_STATE.moves, action) => {
  const { type, payload } = action;

  switch (type) {
    case ACTION_TYPES.SET_ORIGIN:
      return {
        ...state,
        origin: payload,
      };
    case ACTION_TYPES.SET_CAN_CONNECT_WITH:
      return {
        ...state,
        canConnectWith: payload,
      };
    case ACTION_TYPES.SET_USED_FENCES:
      return {
        ...state,
        usedFences: [...state.usedFences, payload],
      };
    case ACTION_TYPES.SET_FENCED_BY_P1:
      return {
        ...state,
        fencedByP1: Array.from(new Set([...state.fencedByP1, payload])),
      };
    case ACTION_TYPES.SET_FENCED_BY_P2:
      return {
        ...state,
        fencedByP2: Array.from(new Set([...state.fencedByP2, payload])),
      };
    case ACTION_TYPES.RESET_MOVES:
      return {
        ...state,
        origin: -1,
        canConnectWith: [],
        usedFences: [],
        fencedByP1: [],
        fencedByP2: [],
      };
    default:
      return state;
  }
};

export const rootReducer = combineReducers({
  game: gameReducer,
  player: playerReducer,
  moves: moveReducer,
});