'use client'
import { useEffect } from "react";
import { useDispatch } from 'react-redux';
import {
  // setGameSize,
  setGameover,
  toggleCurrentPlayer,

} from "../store/actions";
import {
  useSize,
  useGameover,
  useCurrentPlayer,
  useFencedByP1,
  useFencedByP2,
} from "../store/selectors";

import { GameGrid } from "../components/game-grid";
import {
  PageContainer,
  PlayersHeader,
  Player,
  PlayerScore,
  CurrentTurn,
  GameGridContainer,
  GameOver,
} from "../components/page-elements.styled";

export const Game = () => {

  const dispatch = useDispatch()

  const currentPlayer = useCurrentPlayer()

  // This will com from a user selection
  const size = useSize()
  const finalCount = Math.pow(size -1, 2)

  const fencedByP1 = useFencedByP1()
  const fencedByP2 = useFencedByP2()
  const gameover = useGameover()

  if(fencedByP1.length + fencedByP2.length === finalCount) {
    setTimeout(() => dispatch(setGameover(true)), 50)
  }

  useEffect(() => {
    dispatch(toggleCurrentPlayer())
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

        <CurrentTurn>
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
        <GameGrid />
      </GameGridContainer>

      {gameover && <GameOver>Game Over</GameOver>}
    </PageContainer>
  );
}
