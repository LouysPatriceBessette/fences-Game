import React from "react";
import { GridStyled, SquareStyled, DotStyled, VlineStyled, HlineStyled } from "./grid-elements.styled";

export const Grid = GridStyled

export const Square = ({identifier, usedFences, rowSize}: {identifier: number, usedFences: string[], rowSize: number}) => {

  const isFenced = (
    usedFences.includes(`H-${identifier}`) &&
    usedFences.includes(`V-${identifier}`) &&
    usedFences.includes(`V-${identifier + 1}`) &&
    usedFences.includes(`H-${identifier + rowSize}`)
  )

  return (
    <div onMouseOver={() =>console.log(identifier)}>
      <SquareStyled isFenced={isFenced}/>
    </div>
  );
}

export const Dot = ({identifier, origin, setOrigin, setCanConnectWith, rowSize, canConnectWith, setUsedFences, usedFences}:
  {
    identifier: number,
    origin: number,
    setOrigin: React.Dispatch<React.SetStateAction<number>>,
    setCanConnectWith: React.Dispatch<React.SetStateAction<number[]>>,
    rowSize: number
    canConnectWith: number[]
    setUsedFences: React.Dispatch<React.SetStateAction<string[]>>
    usedFences: string[]
  }) => {


  const upId = identifier - rowSize
  const rightId = identifier + 1
  const downId = identifier + rowSize
  const leftId = identifier - 1

  let up = upId > 0 ? upId : null

  let right = rightId <= Math.pow(rowSize, 2) && rightId % rowSize !== 1 ? rightId : null

  let down = downId <= Math.pow(rowSize, 2) ? downId : null
  
  let left = leftId > 0 && leftId % rowSize !== 0 ? leftId : null
  


  // Check the usedFences
  if(up && usedFences.includes(`V-${up}`)) up = null
  if(right && usedFences.includes(`H-${identifier}`)) right = null
  if(down && usedFences.includes(`V-${identifier}`)) down = null
  if(left && usedFences.includes(`H-${left}`)) left = null

  const friends = [up, right, down, left]

  const dotClickHandler = () => {
    if(canConnectWith.length === 0 && origin === -1) {
      setOrigin(identifier)
      setCanConnectWith(friends.filter((friend) => friend !== null))
      return
    }

    if(origin === identifier) {
      setOrigin(-1)
      setCanConnectWith([])
      return
    }

    if(canConnectWith.includes(identifier)) {
      console.log(`Gotcha! ${identifier}`)

      // Left
      if(origin - 1 === identifier) {
        setUsedFences(prev => [...prev, `H-${identifier}`])
        setOrigin(-1)
        setCanConnectWith([])
        return
      }

      // Right
      if(origin + 1 === identifier) {
        setUsedFences(prev => [...prev, `H-${origin}`])
        setOrigin(-1)
        setCanConnectWith([])
        return
      }

      // Up
      if(origin - rowSize === identifier) {
        setUsedFences(prev => [...prev, `V-${identifier}`])
        setOrigin(-1)
        setCanConnectWith([])
        return
      }

      // Down
      if(origin + rowSize === identifier) {
        setUsedFences(prev => [...prev, `V-${origin}`])
        setOrigin(-1)
        setCanConnectWith([])
        return
      }

      
    }
  }

  return (
    <div onMouseOver={() =>console.log(identifier)}>
    <DotStyled
      onClick={dotClickHandler}
      isOrigin={origin === identifier}
      isFriend={canConnectWith.includes(identifier)}
    />
    </div>
  );
}

export const Vline = ({identifier, usedFences}: {identifier: number, usedFences: string[]}) => {
  const isUsed = usedFences.includes(`V-${identifier}`)
  
  return (
    <div onMouseOver={() =>console.log(`V-${identifier}`)}>
      <VlineStyled isUsed={isUsed} />
    </div>
  );
}

export const Hline = ({identifier, usedFences}: {identifier: number, usedFences: string[]}) => {
  const isUsed = usedFences.includes(`H-${identifier}`)
  
  return (
    <div onMouseOver={() =>console.log(`H-${identifier}`)}>
      <HlineStyled isUsed={isUsed} />
    </div>
  );
}