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
  chat: {
    messages: [],
  },
  socket: {
    instance: null,
    localId: '',
    remoteId: '',
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
  const { type, payload } = action;

  let nextPlayer
  if(!payload){
    nextPlayer = state.currentPlayer === 1 ? 2 : 1
  } else{
    nextPlayer = payload
  }
  switch (type) {
    case ACTION_TYPES.TOGGLE_CURRENT_PLAYER:
      return {
        ...state,
        currentPlayer: nextPlayer,
      };
    default:
      return state;
  }
};

export const moveReducer = (state = INITIAL_STATE.moves, action) => {
  const { type, payload } = action;

  console.log('moveReducer', type, payload)

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

export const chatReducer = (state = INITIAL_STATE.chat, action) => {
  const { type, payload } = action;

  switch (type) {
    case ACTION_TYPES.SET_CHAT_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, payload],
      };
    default:
      return state;
  }
};

export const socketReducer = (state = INITIAL_STATE.socket, action) => {
  const { type, payload } = action;

  console.log('socketReducer', type, payload)

  switch (type) {
    case ACTION_TYPES.SET_SOCKET_INSTANCE:
      return {
        ...state,
        instance: payload,
      };
    case ACTION_TYPES.SET_SOCKET_LOCAL_ID:
      return {
        ...state,
        localId: payload,
      }
    case ACTION_TYPES.SET_SOCKET_REMOTE_ID:
      return {
        ...state,
        remoteId: payload,
      }
    default:
      return state;
  }
};

export const rootReducer = combineReducers({
  game: gameReducer,
  player: playerReducer,
  moves: moveReducer,
  chat: chatReducer,
  socket: socketReducer,
});