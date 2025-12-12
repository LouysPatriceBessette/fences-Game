/* eslint-disable @typescript-eslint/no-explicit-any */
import { combineReducers } from "redux";
import { ACTION_TYPES } from '../basics/constants';
import { INITIAL_STATE_TYPE } from "../basics/types";

export const INITIAL_STATE: INITIAL_STATE_TYPE = {
  chat: {
    messages: [],
  },
  clients: {count: 1},
  game: {
    gameId: -1,
    gameIdChanged: false,
    size: {x: 3, y: 3},
    nameOfPlayer1: 'Player 1',
    nameOfPlayer2: 'Player 2',
    iamPlayer: 1,
    currentPlayer: 1,
    gameover: false,
    usedFences: [],
    usedFencesP1: [],
    usedFencesP2: [],
    fencedByP1: [],
    fencedByP2: [],
  },
  language: {
    isDefault: true,
    selected: 'EN'
  },
  mouse: {
    origin: -1,
    canConnectWith: [],
  },
  socket: {
    instance: null,
    localSocketId: '',
    remoteIsOnline: false,
    remoteHasLeft: false,
  },
  nextStep: {
    loadedLanguage: '',
    steps: [{
      tour: 'Empty tour',
      steps: []
    }],
  }
};

export const gameReducer = (state = INITIAL_STATE.game, action: {type: string, payload: any}) => {
  const { type, payload } = action

  if(type === ACTION_TYPES.REFRESH_REDUX_STORE){
    return {
      ...state,
      ...payload.chat,
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
    case ACTION_TYPES.SET_IAM_PLAYER:
      return {
        ...state,
        iamPlayer: payload,
    }
    case ACTION_TYPES.SET_NAME_OF_PLAYER_1:
      return {
        ...state,
        nameOfPlayer1: payload,
      };
    case ACTION_TYPES.SET_NAME_OF_PLAYER_2:
      return {
        ...state,
        nameOfPlayer2: payload,
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
    case ACTION_TYPES.SET_USED_FENCES_P1:
      if(payload === '') return state;

      return {
        ...state,
        usedFencesP1: [...state.usedFencesP1, payload],
      };
    case ACTION_TYPES.SET_USED_FENCES_P2:
      if(payload === '') return state;
      
      return {
        ...state,
        usedFencesP2: [...state.usedFencesP2, payload],
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
    case ACTION_TYPES.SET_ANOTHER_GAME_CREATED:
      return {
        ...state,
        gameId: payload,
        usedFences: [],
        usedFencesP1: [],
        usedFencesP2: [],
        fencedByP1: [],
        fencedByP2: [],
        gameover: false,
      }
    case ACTION_TYPES.SET_GAME_ID_CHANGED:
      return {
        ...state,
        gameIdChanged: payload,
      };
    default:
      return state;
  }
};

export const mouseReducer = (state = INITIAL_STATE.mouse, action: {type: string, payload: any}) => {
  const { type, payload } = action

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

export const chatReducer = (state = INITIAL_STATE.chat, action: {type: string, payload: any}) => {
  const { type, payload } = action

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

export const clientsReducer = (state = INITIAL_STATE.clients, action: {type: string, payload: any}) => {
  const { type, payload } = action

  switch (type) {
    case ACTION_TYPES.SET_CLIENTS_COUNT:
      return {
        ...state,
        count: payload,
      };
    default:
      return state;
  }
}

export const socketReducer = (state = INITIAL_STATE.socket, action: {type: string, payload: any}) => {
  const { type, payload } = action

  switch (type) {
    case ACTION_TYPES.SET_SOCKET_INSTANCE:
      return {
        ...state,
        instance: payload,
      };
    case ACTION_TYPES.SET_SOCKET_LOCAL_ID:
      return {
        ...state,
        localSocketId: payload,
      }
    case ACTION_TYPES.SET_REMOTE_IS_ONLINE:
      return {
        ...state,
        remoteIsOnline: payload,
      }
    case ACTION_TYPES.SET_REMOTE_HAS_LEFT:
      return {
        ...state,
        remoteHasLeft: payload,
      }
    default:
      return state;
  }
};

export const languageReducer = (state = INITIAL_STATE.language, action: {type: string, payload: any}) => {
  const { type, payload } = action

  switch (type) {
    case ACTION_TYPES.SET_LANGUAGE:
      return {
        ...state,
        isDefault: false,
        selected: payload,
      };
    case ACTION_TYPES.SET_LANGUAGE_IS_DEFAULT:
      return {
        ...state,
        isDefault: true,
        selected: 'EN',
      };
    default:
      return state;
  }
}

export const tourReducer = (state = INITIAL_STATE.nextStep, action: {type: string, payload: any}) => {
  const { type, payload } = action

  switch (type) {
    case ACTION_TYPES.SET_TOUR:
      return {
        ...state,
        loadedLanguage: payload.loadedLanguage,
        steps: payload.steps,
      };
    default:
      return state;
  }
}

export const combinedReducer = combineReducers({
  chat: chatReducer,
  clients: clientsReducer,
  game: gameReducer,
  language: languageReducer,
  mouse: mouseReducer,
  socket: socketReducer,
  nextStep: tourReducer,
});

export const rootReducer = (state: INITIAL_STATE_TYPE, action: {type: string, payload: any}) => {
  const { type } = action

  if(type === ACTION_TYPES.RESET_REDUX_STORE){
    return {
      ...INITIAL_STATE,
      socket: {
        ...state.socket,
        remoteIsOnline: false,
      },
      language: {
        ...state.language,
      },
      nextStep: {
        ...state.nextStep,
        loadedLanguage: state.nextStep.loadedLanguage,
        steps: [...state.nextStep.steps],
        
      }
    }
  }

  return combinedReducer(state, action);
};
