export const SOCKET_ACTIONS = {
  // to server
  CREATE_GAME: 'create-game',
  JOIN_GAME: 'join-game',
  UPDATE_OTHER_PLAYER_REDUX: 'update-other-player-redux',
  REFRESH_ID: 'refresh-id',

  // to player
  HELLO: 'hello',
  CREATED_GAME: 'created-game',
  CONNECTED_TO_A_GAME: 'connected-to-a-game',
  PLAYER_JOINED_MY_GAME: 'player-joined-my-game',
  JOIN_FAILED: 'join-failed',
  LOCAL_SOCKET_ID_REFRESHED: 'local-socket-id-refreshed',
  REMOTE_SOCKET_ID_REFRESHED: 'remote-socket-id-refreshed',
  PREVIOUS_GAME_DELETED: 'previous-game-deleted',
}

export const LOG_COLORS = {
  ERROR: '\x1b[31m',
  SUCCESS: '\x1b[32m',
  WARNING: '\x1b[33m',
  INFO: '\x1b[36m',
  WHITE: '\x1b[97m',
  GREY: '\x1b[90m',
  YELLOW: '\x1b[93m',
  ORANGE: '\x1b[38;5;208m',
  RESET: '\x1b[0m',
}

export const headerWrap = (text, ...rest) => {
  return `\n\n${LOG_COLORS.WHITE}=====\n${LOG_COLORS.ORANGE}${text}\n${LOG_COLORS.GREY}${rest}\n${LOG_COLORS.WHITE}=====${LOG_COLORS.RESET}\n\n`;
}

export const ACTION_TYPES = {

  REFRESH_REDUX_STORE: 'REFRESH_REDUX_STORE',

  SET_SIZE: 'SET_SIZE',
  SET_GAME_ID: 'SET_GAME_ID',
  SET_GAMEOVER: 'SET_GAMEOVER',
  TOGGLE_CURRENT_PLAYER: 'TOGGLE_CURRENT_PLAYER',
  SET_ORIGIN: 'SET_ORIGIN',
  SET_CAN_CONNECT_WITH: 'SET_CAN_CONNECT_WITH',
  SET_USED_FENCES: 'SET_USED_FENCES',
  SET_FENCED_BY_P1: 'SET_FENCED_BY_P1',
  SET_FENCED_BY_P2: 'SET_FENCED_BY_P2',

  SET_IAM_PLAYER: 'SET_IAM_PLAYER',
  SET_SOCKET_INSTANCE: 'SET_SOCKET_INSTANCE',
  SET_SOCKET_LOCAL_ID: 'SET_SOCKET_LOCAL_ID',
  SET_SOCKET_REMOTE_ID: 'SET_SOCKET_REMOTE_ID',
  
  SET_CHAT_MESSAGE: 'SET_CHAT_MESSAGE',
}