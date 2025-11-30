import { GridStyled, SquareStyled, DotStyled, VlineStyled, HlineStyled } from "./grid-elements.styled";

import { useDispatch } from 'react-redux';
import {
  toggleCurrentPlayer,
  setFencedByP1,
  setFencedByP2,
  setCanConnectWith,
  setOrigin,
  setUsedFences,
} from "../store/actions";
import {
  useChat,
  useGame,
  useCurrentPlayer,
  useFencedByP1,
  useFencedByP2,
  useCanConnectWith,
  useOrigin,
  useUsedFences,
  useSize,
  useSocketInstance,
  useSocketLocalId,
  useSocketRemoteId,
} from "../store/selectors";

export const Grid = GridStyled

export const Square = ({identifier}: {identifier: number}) => {
  const dispatch = useDispatch()
  const currentPlayer = useCurrentPlayer()
  const fencedByP1 = useFencedByP1()
  const fencedByP2 = useFencedByP2()
  const usedFences = useUsedFences()
  const size = useSize()

  const isFenced = (
    usedFences.includes(`H-${identifier}`) &&
    usedFences.includes(`V-${identifier}`) &&
    usedFences.includes(`V-${identifier + 1}`) &&
    usedFences.includes(`H-${identifier + size}`)
  )
  
  const wasFencedByP1 = fencedByP1.includes(identifier)
  const wasFencedByP2 = fencedByP2.includes(identifier)

  const wasFencedBy = wasFencedByP1 ? 1 : wasFencedByP2 ? 2 : 0
  if(isFenced && !wasFencedByP1 && !wasFencedByP2) {
    if(currentPlayer === 1) {
      dispatch(setFencedByP2(identifier))
      dispatch(toggleCurrentPlayer(2))
    } else {
      dispatch(setFencedByP1(identifier))
      dispatch(toggleCurrentPlayer(1))
    }
  }

  return (
    <SquareStyled $wasFencedBy={wasFencedBy}/>
  );
}

export const Dot = ({identifier}:{identifier: number}) => {
  const dispatch = useDispatch()
  const socket = useSocketInstance()
  const currentPlayer = useCurrentPlayer()

  const chat = useChat()
  const game = useGame()
  const storeForBackend = {
    chat: {...chat},
    game: {...game},
  }

  const localPlayerId = useSocketLocalId()
  const remotePlayerId = useSocketRemoteId()

  const canConnectWith = useCanConnectWith()
  const origin = useOrigin()
  const usedFences = useUsedFences()
  const size = useSize()

  const upId = identifier - size
  const rightId = identifier + 1
  const downId = identifier + size
  const leftId = identifier - 1

  let up = upId > 0 ? upId : null
  let right = rightId <= Math.pow(size, 2) && rightId % size !== 1 ? rightId : null
  let down = downId <= Math.pow(size, 2) ? downId : null
  let left = leftId > 0 && leftId % size !== 0 ? leftId : null
  
  // Check the usedFences
  if(up && usedFences.includes(`V-${up}`)) up = null
  if(right && usedFences.includes(`H-${identifier}`)) right = null
  if(down && usedFences.includes(`V-${identifier}`)) down = null
  if(left && usedFences.includes(`H-${left}`)) left = null

  const friends = [up, right, down, left]

  const resetTurn = (payload: string) => {
    const nextPlayer = currentPlayer === 1 ? 2 : 1

    dispatch(setOrigin(-1))
    dispatch(setCanConnectWith([]))
    dispatch(toggleCurrentPlayer(nextPlayer))

    const storeToSend = {
      ...storeForBackend,
      game: {
        ...storeForBackend.game,
        currentPlayer: nextPlayer,
        usedFences: [...storeForBackend.game.usedFences, payload],
      }
    }

    // Send a redux copy to to other player (and a copy will stay on the server)
    const command = {
      to: 'player',
      gameId: storeToSend.game.gameId,
      localPlayerId: localPlayerId,
      remotePlayerId: remotePlayerId,
      action: 'update-other-player-redux',
      redux: storeToSend,
    }
    socket.emit('message', JSON.stringify(command));
  }
  const dotClickHandler = () => {
    if(canConnectWith.length === 0 && origin === -1) {
      dispatch(setOrigin(identifier))
      dispatch(setCanConnectWith(friends.filter((friend) => friend !== null)))
      return
    }

    if(origin === identifier) {
      dispatch(setOrigin(-1))
      dispatch(setCanConnectWith([]))
      return
    }

    if(canConnectWith.includes(identifier)) {

      // Left
      if(origin - 1 === identifier) {
        dispatch(setUsedFences(`H-${identifier}`))
        resetTurn(`H-${identifier}`)
        return
      }

      // Right
      if(origin + 1 === identifier) {
        dispatch(setUsedFences(`H-${origin}`))
        resetTurn(`H-${origin}`)
        return
      }

      // Up
      if(origin - size === identifier) {
        dispatch(setUsedFences(`V-${identifier}`))
        resetTurn(`V-${identifier}`)
        return
      }

      // Down
      if(origin + size === identifier) {
        dispatch(setUsedFences(`V-${origin}`))
        resetTurn(`V-${origin}`)
        return
      }
    }
  }

  return (
    <DotStyled
      onClick={dotClickHandler}
      $isOrigin={origin === identifier}
      $isFriend={canConnectWith.includes(identifier)}
      $origin={origin}
    />
  );
}

export const Vline = ({identifier}: {identifier: number}) => {
  const usedFences = useUsedFences()
  const isUsed = usedFences.includes(`V-${identifier}`)
  
  return (
    <VlineStyled $isUsed={isUsed} />
  );
}

export const Hline = ({identifier}: {identifier: number,}) => {
  const usedFences = useUsedFences()
  const isUsed = usedFences.includes(`H-${identifier}`)
  
  return (
    <HlineStyled $isUsed={isUsed} />
  );
}