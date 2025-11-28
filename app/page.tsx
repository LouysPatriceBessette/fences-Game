'use client'
import { useState, useEffect } from "react";

import Socket from "./socket";


import { GameGrid } from "./components/game-grid";
import {
  PageContainer,
  PlayersHeader,
  Player,
  PlayerScore,
  CurrentTurn,
  GameGridContainer,
  GameOver,
} from "./components/page-elements.styled";

export default function Home() {

  // This will com from a user selection
  const size = 3
  const finalCount = Math.pow(size -1, 2)

  const [currentPlayer, setCurrentPlayer] = useState(1);

  const [fencedByP1, setFencedByP1] = useState<number[]>([])
  const [fencedByP2, setFencedByP2] = useState<number[]>([])
  const [gameover, setGameover] = useState(false)

  if(fencedByP1.length + fencedByP2.length === finalCount) {
    setTimeout(() => setGameover(true), 50)
  }

  useEffect(() => {
    if(currentPlayer === 1) {
      setCurrentPlayer(2)
    } else{
      setCurrentPlayer(1)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fencedByP1, fencedByP2])

  return (
    <PageContainer>
      <PlayersHeader>
        <Player>
          Player 1
          <PlayerScore color='green'>
            {fencedByP1.length}
          </PlayerScore>
        </Player>

        <CurrentTurn player={1}>
          Current Turn
          <div>
            { currentPlayer === 1 ? <span>&larr;</span> : <span>&rarr;</span> }
          </div>
        </CurrentTurn>

        <Player>
          Player 2
          <PlayerScore color='blue'>
            {fencedByP2.length}
          </PlayerScore>
        </Player>
      </PlayersHeader>

      <GameGridContainer >
        <GameGrid
          size={size}
          currentPlayer={currentPlayer}
          setCurrentPlayer={setCurrentPlayer}
          fencedByP1={fencedByP1}
          fencedByP2={fencedByP2}
          setFencedByP1={setFencedByP1}
          setFencedByP2={setFencedByP2}
        />
      </GameGridContainer>

      {gameover && <GameOver>Game Over</GameOver>}

      <Socket/>

    </PageContainer>
  );
}
