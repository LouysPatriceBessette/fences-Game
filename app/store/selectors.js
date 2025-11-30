import { useSelector } from "react-redux";

export const useChat = () => useSelector((state) => state.chat);
export const useGame = () => useSelector((state) => state.game);

export const useSize = () => useSelector((state) => state.game.size);
export const useGameId = () => useSelector((state) => state.game.gameId);
export const useGameover = () => useSelector((state) => state.game.gameover);

export const useCurrentPlayer = () => useSelector((state) => state.game.currentPlayer);
export const useUsedFences = () => useSelector((state) => state.game.usedFences);
export const useFencedByP1 = () => useSelector((state) => state.game.fencedByP1);
export const useFencedByP2 = () => useSelector((state) => state.game.fencedByP2);

export const useOrigin = () => useSelector((state) => state.mouse.origin);
export const useCanConnectWith = () => useSelector((state) => state.mouse.canConnectWith);

export const useIamPlayer = () => useSelector((state) => state.socket.iamPlayer);
export const useSocketInstance = () => useSelector((state) => state.socket.instance);
export const useSocketLocalId = () => useSelector((state) => state.socket.localId);
export const useSocketRemoteId = () => useSelector((state) => state.socket.remoteId);

export const useChatMessages = () => useSelector((state) => state.chat.messages);
