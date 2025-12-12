import { useSelector } from "react-redux";

export const useTour = () => useSelector((state) => state.nextStep.steps);
export const useTourLoadedLanguage = () => useSelector((state) => state.nextStep.loadedLanguage);

export const useChat = () => useSelector((state) => state.chat);
export const useGame = () => useSelector((state) => state.game);

export const useSize = () => useSelector((state) => state.game.size);
export const usePlayer1Name = () => useSelector((state) => state.game.nameOfPlayer1);
export const usePlayer2Name = () => useSelector((state) => state.game.nameOfPlayer2);
export const useGameId = () => useSelector((state) => state.game.gameId);
export const useGameIdChanged = () => useSelector((state) => state.game.gameIdChanged);
export const useGameover = () => useSelector((state) => state.game.gameover);

export const useCurrentPlayer = () => useSelector((state) => state.game.currentPlayer);
export const useUsedFences = () => useSelector((state) => state.game.usedFences);
export const useUsedFencesP1 = () => useSelector((state) => state.game.usedFencesP1);
export const useUsedFencesP2 = () => useSelector((state) => state.game.usedFencesP2);

export const useFencedByP1 = () => useSelector((state) => state.game.fencedByP1);
export const useFencedByP2 = () => useSelector((state) => state.game.fencedByP2);

export const useOrigin = () => useSelector((state) => state.mouse.origin);
export const useCanConnectWith = () => useSelector((state) => state.mouse.canConnectWith);

export const useIamPlayer = () => useSelector((state) => state.game.iamPlayer);
export const useSocketInstance = () => useSelector((state) => state.socket.instance);
export const useSocketLocalId = () => useSelector((state) => state.socket.localSocketId);
export const useSocketRemoteIsOnline = () => useSelector((state) => state.socket.remoteIsOnline);
export const useSocketRemoteHasLeft = () => useSelector((state) => state.socket.remoteHasLeft);

export const useLanguage = () => useSelector((state) => state.language.selected);
export const useLanguageIsDefault = () => useSelector((state) => state.language.isDefault);

export const useChatMessages = () => useSelector((state) => state.chat.messages);
export const useClientsCount = () => useSelector((state) => state.clients.count);
