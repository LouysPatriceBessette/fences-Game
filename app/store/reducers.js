import { combineReducers } from "redux";
import { ACTION_TYPES } from './types';


export const INITIAL_STATE = {
  chat: {
    messages: [],
  },
  game: {
    gameId: -1,
    size: 3,
    currentPlayer: 1,
    gameover: false,
    usedFences: [],
    fencedByP1: [],
    fencedByP2: [],
  },
  mouse: {
    origin: -1,
    canConnectWith: [],
  },
  socket: {
    instance: null,
    localId: '',
    remoteId: '',
  },
};

export const gameReducer = (state = INITIAL_STATE.game, action) => {
  const { type, payload } = action;

  if(type === ACTION_TYPES.REFRESH_REDUX_STORE){
    return {
      ...payload.game,
    }
  }
  
  switch (type) {
    case ACTION_TYPES.TOGGLE_CURRENT_PLAYER:
      let nextPlayer
      if(!payload){
        nextPlayer = state.currentPlayer === 1 ? 2 : 1
      } else{
        nextPlayer = payload
      }
      return {
        ...state,
        currentPlayer: nextPlayer,
      };
    case ACTION_TYPES.SET_SIZE:
      return {
        ...state,
        size: payload,
      };
    case ACTION_TYPES.SET_GAME_ID:
      return {
        ...state,
        gameId: payload,
    }
    case ACTION_TYPES.SET_GAMEOVER:
      return {
        ...state,
        gameover: payload,
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
    default:
      return state;
  }
};

export const mouseReducer = (state = INITIAL_STATE.mouse, action) => {
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
    default:
      return state;
  }
};

export const chatReducer = (state = INITIAL_STATE.chat, action) => {
  const { type, payload } = action;

  if(type === ACTION_TYPES.REFRESH_REDUX_STORE){
    return {
    ...payload.chat,
    }
  }

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
  chat: chatReducer,
  game: gameReducer,
  mouse: mouseReducer,
  socket: socketReducer,
});