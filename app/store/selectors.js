import { useSelector } from "react-redux";

export const useSize = () => useSelector((state) => state.game.size);
export const useGameover = () => useSelector((state) => state.game.gameover);

export const useCurrentPlayer = () => useSelector((state) => state.player.currentPlayer);

export const useOrigin = () => useSelector((state) => state.moves.origin);
export const useCanConnectWith = () => useSelector((state) => state.moves.canConnectWith);
export const useUsedFences = () => useSelector((state) => state.moves.usedFences);
export const useFencedByP1 = () => useSelector((state) => state.moves.fencedByP1);
export const useFencedByP2 = () => useSelector((state) => state.moves.fencedByP2);
