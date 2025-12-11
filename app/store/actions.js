import { ACTION_TYPES } from '../basics/constants';
import { createAction } from '../basics/utils';

export const resetReduxInitialState = () =>
  createAction(ACTION_TYPES.RESET_REDUX_STORE, null);

export const refreshReduxStore = (data) =>
  createAction(ACTION_TYPES.REFRESH_REDUX_STORE, data);

export const setClientsCount = (clientsCount) =>
  createAction(ACTION_TYPES.SET_CLIENTS_COUNT, clientsCount);

export const setLanguage = (language) =>
  createAction(ACTION_TYPES.SET_LANGUAGE, language);

export const setLanguageIsDefault = () =>
  createAction(ACTION_TYPES.SET_LANGUAGE_IS_DEFAULT);

export const setGameSize = (size) =>
  createAction(ACTION_TYPES.SET_SIZE, size);

export const setNameOfPlayer1 = (name) =>
  createAction(ACTION_TYPES.SET_NAME_OF_PLAYER_1, name);

export const setNameOfPlayer2 = (name) =>
  createAction(ACTION_TYPES.SET_NAME_OF_PLAYER_2, name);

export const setGameId = (gameId) =>
  createAction(ACTION_TYPES.SET_GAME_ID, gameId);

export const setGameover = (gameover) =>
  createAction(ACTION_TYPES.SET_GAMEOVER, gameover);

export const toggleCurrentPlayer = (nextPlayer) =>
  createAction(ACTION_TYPES.TOGGLE_CURRENT_PLAYER, nextPlayer);

export const setPlayerLeftMyGame = () =>
  createAction(ACTION_TYPES.PLAYER_LEFT_MY_GAME);

export const setGameDestroyed = () =>
  createAction(ACTION_TYPES.GAME_DESTROYED);

export const setOrigin = (origin) =>
  createAction(ACTION_TYPES.SET_ORIGIN, origin);

export const setCanConnectWith = (canConnectWith) =>
  createAction(ACTION_TYPES.SET_CAN_CONNECT_WITH, canConnectWith);

export const setUsedFences = (usedFences) =>
  createAction(ACTION_TYPES.SET_USED_FENCES, usedFences);

export const setUsedFencesP1 = (usedFencesP1) =>
  createAction(ACTION_TYPES.SET_USED_FENCES_P1, usedFencesP1);

export const setUsedFencesP2 = (usedFencesP2) =>
  createAction(ACTION_TYPES.SET_USED_FENCES_P2, usedFencesP2);

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

export const setRemoteIsOnline = (isOnline) =>
  createAction(ACTION_TYPES.SET_REMOTE_IS_ONLINE, isOnline);

export const setRemoteHasLeft = (hasLeft) =>
  createAction(ACTION_TYPES.SET_REMOTE_HAS_LEFT, hasLeft);

export const setAnotherGameCreated = (gameId) =>
  createAction(ACTION_TYPES.SET_ANOTHER_GAME_CREATED, gameId);

export const setGameIdChanged = (bool) =>
  createAction(ACTION_TYPES.SET_GAME_ID_CHANGED, bool);

export const setChatMessage = (message) =>
  createAction(ACTION_TYPES.SET_CHAT_MESSAGE, message);
