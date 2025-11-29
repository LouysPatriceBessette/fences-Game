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
  useCurrentPlayer,
  useFencedByP1,
  useFencedByP2,
  useCanConnectWith,
  useOrigin,
  useUsedFences,
  useSize,
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
    if(currentPlayer === 2) { // runs after render... So players are reversed
      setTimeout(() => dispatch(setFencedByP1(identifier)), 50)
    } else {
      setTimeout(() => dispatch(setFencedByP2(identifier)), 50)
    }
  }

  return (
    <SquareStyled $wasFencedBy={wasFencedBy}/>
  );
}

export const Dot = ({identifier}:{identifier: number}) => {
  const dispatch = useDispatch()
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

  const resetTurn = () => {
    dispatch(setOrigin(-1))
    dispatch(setCanConnectWith([]))
    dispatch(toggleCurrentPlayer())
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
        resetTurn()
        return
      }

      // Right
      if(origin + 1 === identifier) {
        dispatch(setUsedFences(`H-${origin}`))
        resetTurn()
        return
      }

      // Up
      if(origin - size === identifier) {
        dispatch(setUsedFences(`V-${identifier}`))
        resetTurn()
        return
      }

      // Down
      if(origin + size === identifier) {
        dispatch(setUsedFences(`V-${origin}`))
        resetTurn()
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