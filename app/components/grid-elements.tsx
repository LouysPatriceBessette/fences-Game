import { GridContainerStyled, GridOverlayStyled, GridStyled, SquareStyled, DotStyled, VlineStyled, HlineStyled, DotContainer, DotClickZone } from "./grid-elements.styled";

import { useDispatch } from 'react-redux';
import {
  toggleCurrentPlayer,
  setUsedFencesP1,
  setUsedFencesP2,
  setFencedByP1,
  setFencedByP2,
  setCanConnectWith,
  setOrigin,
  setUsedFences,
} from "../store/actions";
import {
  useChat,
  useGame,
  useIamPlayer,
  useCurrentPlayer,
  useFencedByP1,
  useFencedByP2,
  useCanConnectWith,
  useOrigin,
  useUsedFences,
  useUsedFencesP1,
  useSize,
  useSocketInstance,
  useSocketLocalId,
} from "../store/selectors";
import { SOCKET_ACTIONS } from "../basics/constants";

export const Grid = GridStyled
export const GridContainer = GridContainerStyled
export const GridOverlay = GridOverlayStyled

export const Square = ({identifier}: {identifier: number}) => {
  const fencedByP1 = useFencedByP1()
  const fencedByP2 = useFencedByP2()
  
  const wasFencedByP1 = fencedByP1.includes(identifier)
  const wasFencedByP2 = fencedByP2.includes(identifier)

  const wasFencedBy = wasFencedByP1 ? 1 : wasFencedByP2 ? 2 : 0

  return (
    <SquareStyled data-box={identifier} $wasFencedBy={wasFencedBy}/>
  );
}

export const Dot = ({identifier}:{identifier: number}) => {
  const dispatch = useDispatch()
  const socket = useSocketInstance()
  const iamPlayer = useIamPlayer()
  const currentPlayer = useCurrentPlayer()

  const chat = useChat()
  const game = useGame()
  const storeForBackend = {
    chat: {...chat},
    game: {...game},
  }

  const localSocketId = useSocketLocalId()

  const canConnectWith = useCanConnectWith()
  const origin = useOrigin()
  const usedFences = useUsedFences()
  const size = useSize()

  const upId = identifier - size.x
  const rightId = identifier + 1
  const downId = identifier + size.x
  const leftId = identifier - 1

  let up = upId > 0 ? upId : null
  let right = rightId <= (size.x * size.y) && rightId % size.x !== 1 ? rightId : null
  let down = downId <= (size.x * size.y) ? downId : null
  let left = leftId > 0 && leftId % size.x !== 0 ? leftId : null
  
  // Check the usedFences
  if(up && usedFences.includes(`V-${up}`)) up = null
  if(right && usedFences.includes(`H-${identifier}`)) right = null
  if(down && usedFences.includes(`V-${identifier}`)) down = null
  if(left && usedFences.includes(`H-${left}`)) left = null

  const friends = [up, right, down, left]

  const resetTurn = (payload: string, possibleFencedSquares: number[]) => {
    let nextPlayer = currentPlayer

    const areFenced = possibleFencedSquares.map((squareId, index) => {

      return [
        usedFences.includes(`H-${possibleFencedSquares[index]}`),
        usedFences.includes(`V-${possibleFencedSquares[index]}`),
        usedFences.includes(`V-${possibleFencedSquares[index] + 1}`),
        usedFences.includes(`H-${possibleFencedSquares[index] + size.x}`)
      ].filter((bool) => bool).length === 3
    })

    let fencedByP1ToAdd: number[] = []
    let fencedByP2ToAdd: number[] = []
    if(iamPlayer === 1) {
      if(areFenced[0]){
        fencedByP1ToAdd = [...fencedByP1ToAdd, possibleFencedSquares[0]] 
        dispatch(setFencedByP1(possibleFencedSquares[0]))
      }
      if(areFenced[1]){
        fencedByP1ToAdd = [...fencedByP1ToAdd, possibleFencedSquares[1]] 
        dispatch(setFencedByP1(possibleFencedSquares[1]))
      }
    }
    if(iamPlayer === 2) {
      if(areFenced[0]){
        fencedByP2ToAdd = [...fencedByP2ToAdd, possibleFencedSquares[0]] 
        dispatch(setFencedByP2(possibleFencedSquares[0]))
      }
      if(areFenced[1]){
        fencedByP2ToAdd = [...fencedByP2ToAdd, possibleFencedSquares[1]] 
        dispatch(setFencedByP2(possibleFencedSquares[1]))
      }
    }

    dispatch(setOrigin(-1))
    dispatch(setCanConnectWith([]))
    dispatch(setUsedFences(payload))
    dispatch(setUsedFencesP1(iamPlayer === 1 ? payload : ''))
    dispatch(setUsedFencesP2(iamPlayer === 2 ? payload : ''))

    if(areFenced.filter((bool) => bool).length === 0){
      dispatch(toggleCurrentPlayer())
      nextPlayer = currentPlayer === 1 ? 2 : 1
    }

    const storeToSend = {
      ...storeForBackend,
      game: {
        gameId: storeForBackend.game.gameId,
        size: storeForBackend.game.size,
        currentPlayer: nextPlayer,
        usedFences: [...storeForBackend.game.usedFences, payload],
        usedFencesP1: [...storeForBackend.game.usedFencesP1].concat(iamPlayer === 1 ? [payload] : []),
        usedFencesP2: [...storeForBackend.game.usedFencesP2].concat(iamPlayer === 2 ? [payload] : []),
        fencedByP1: [...storeForBackend.game.fencedByP1].concat(fencedByP1ToAdd),
        fencedByP2: [...storeForBackend.game.fencedByP2].concat(fencedByP2ToAdd),
      }
    }

    // Send a redux copy to to other player (and a copy will stay on the server)
    const command = {
      from: 'player',
      to: 'player',
      gameId: storeToSend.game.gameId,
      iamPlayerId: localSocketId,
      action: SOCKET_ACTIONS.UPDATE_OTHER_PLAYER_REDUX,
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
      let possibleFencedSquares = []

      // Left
      if(origin - 1 === identifier) {
        possibleFencedSquares = [
          identifier - size.x,
          identifier,
        ]
        resetTurn(`H-${identifier}`, possibleFencedSquares)
        return
      }

      // Right
      if(origin + 1 === identifier) {
        possibleFencedSquares = [
          origin - size.x,
          origin,
        ]
        resetTurn(`H-${origin}`, possibleFencedSquares)
        return
      }

      // Up
      if(origin - size.x === identifier) {
        possibleFencedSquares = [
          identifier,
          identifier - 1,
        ]
        resetTurn(`V-${identifier}`, possibleFencedSquares)
        return
      }

      // Down
      if(origin + size.x === identifier) {
        possibleFencedSquares = [
          origin,
          origin - 1,
        ]
        resetTurn(`V-${origin}`, possibleFencedSquares)
        return
      }
    }
  }

  return (<DotContainer id='dotGroup'>
    <DotClickZone
      id='clickZone'
      onClick={dotClickHandler}
      $isOrigin={origin === identifier}
      $isFriend={canConnectWith.includes(identifier)}
      $origin={origin}
    />
    <DotStyled
      data-dot={identifier}
      $isOrigin={origin === identifier}
      $isFriend={canConnectWith.includes(identifier)}
      $origin={origin}
    />
  </DotContainer>);
}

export const Vline = ({identifier}: {identifier: number}) => {
  const usedFences = useUsedFences()
  const usedFencesP1 = useUsedFencesP1()

  const isUsed = usedFences.includes(`V-${identifier}`)
  const isUsedBy = isUsed ? usedFencesP1.includes(`V-${identifier}`) ? 1 : 0 : 1

  return (
    <VlineStyled data-vline={identifier} $isUsed={isUsed} $isUsedBy={isUsedBy} />
  );
}

export const Hline = ({identifier}: {identifier: number,}) => {
  const usedFences = useUsedFences()
  const usedFencesP1 = useUsedFencesP1()

  const isUsed = usedFences.includes(`H-${identifier}`)
  const isUsedBy = isUsed ? usedFencesP1.includes(`H-${identifier}`) ? 1 : 0 : 1

  return (
    <HlineStyled data-hline={identifier} $isUsed={isUsed} $isUsedBy={isUsedBy} />
  );
}