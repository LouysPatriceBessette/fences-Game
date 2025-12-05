import { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import {
  // setGameSize,
  setNameOfPlayer1,
  setGameId,
  setGameover,
} from "../store/actions";
import {
  useSize,
  usePlayer1Name,
  usePlayer2Name,
  useGameId,
  useGameover,
  useCurrentPlayer,
  useIamPlayer,
  useFencedByP1,
  useFencedByP2,
  useSocketRemoteIsOnline,
  useSocketInstance,
  useChatMessages,
  useSocketLocalId,
} from "../store/selectors";

import { GameControls } from "../components/game-controls";
import { GameGrid } from "../components/game-grid";
import {
  PageContainer,
  DrawerContainer,
  PlayersNameHeader,
  PlayersScoreHeader,
  Player,
  PlayerNameContainer,
  PlayerOnlineIndicator,
  PlayerScore,
  CurrentTurn,
  GameGridContainer,
  GameOver,
} from "./game.styled";
import { SOCKET_ACTIONS } from "../basics/constants";
import Chakra from "../components/Chakra";
import { Chat } from "../components/chat";

export const Game = () => {

  const socket = useSocketInstance()
  const dispatch = useDispatch()

  const currentPlayer = useCurrentPlayer()
  const remoteIsOnline = useSocketRemoteIsOnline()
  const iamPlayer = useIamPlayer()
  const gameId = useGameId()

  useEffect(() => {
    let interval: NodeJS.Timeout
    if(socket){
      interval = setInterval(() => {
        if(gameId !== -1) {
          socket.emit('message', JSON.stringify({
            from: 'player',
            to: 'server',
            action: SOCKET_ACTIONS.PING,
            gameId: gameId,
            iamPlayerId: socket.id,
          }))
        }
      }, 10000)
    } else {
      // @ts-expect-error No error here!
      clearInterval(interval)
    }

    return () => clearInterval(interval)
   
  }, [gameId, socket])

  useEffect(() => {
    const storedGameId = localStorage.getItem('gameId')
    const player1Name = localStorage.getItem('player1Name')

    if(player1Name) {
      dispatch(setNameOfPlayer1(player1Name))
    }
    if(storedGameId) {
      dispatch(setGameId(storedGameId))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // This will come from a user selection
  const size = useSize()
  const player1Name = usePlayer1Name()
  const player2Name = usePlayer2Name()
  const finalCount = (size.x - 1) * (size.y - 1)

  const fencedByP1 = useFencedByP1()
  const fencedByP2 = useFencedByP2()
  const gameover = useGameover()

  const messages = useChatMessages()
  const [messagesLength, setMessagesLength] = useState(messages.length)
  const [triggerOpen, setTriggerOpen] = useState(false)

  useEffect(() => {
    if(messages.length > messagesLength) {
      setTriggerOpen(true)
      setMessagesLength((prev: number) => prev + 1)

      setTimeout(() => {
        setTriggerOpen(false)
      }, 1)
    }
  }, [messages, messagesLength])

  if(fencedByP1.length + fencedByP2.length === finalCount) {
    setTimeout(() => dispatch(setGameover(true)), 100)
  }

  const mySocketId = useSocketLocalId()
  const gameIdString = gameId.toString().slice(0,3) + ' ' + gameId.toString().slice(3,6)

  return (
    <PageContainer>
      <DrawerContainer>
        {/* Controls drawer */}
        <Chakra.Drawer
          placement="top"
          title='Controls'
          buttonText='Controls'
        >
          <GameControls/>
        </Chakra.Drawer>

        <div>
          <div>
            My Socket Id: {mySocketId}
          </div>
          <div>
            Game ID: {gameIdString}
          </div>
        </div>

        {/* Chat drawer */}
        {gameId !== -1 &&<Chakra.Drawer
          triggerOpen={triggerOpen}
          placement="bottom"
          title='Chat with the other player'
          buttonText='Chat'
        >
          <Chat/>
        </Chakra.Drawer>}
      </DrawerContainer>

      <PlayersNameHeader>
        <Player>
          <PlayerNameContainer>
            <PlayerOnlineIndicator $online={iamPlayer === 1 || remoteIsOnline} /> {player1Name}
          </PlayerNameContainer>
        </Player>

        <Player>
          <PlayerNameContainer>
            <PlayerOnlineIndicator $online={iamPlayer === 2 || remoteIsOnline} /> {player2Name}
          </PlayerNameContainer>
        </Player>
      </PlayersNameHeader>

      <PlayersScoreHeader>
        <PlayerScore color='green'>
          {fencedByP1.length}
        </PlayerScore>

        <CurrentTurn $hidden={!remoteIsOnline || gameover}>
          { currentPlayer === 1 ? <span>&larr;</span> : <span>&rarr;</span> }
        </CurrentTurn>

        <PlayerScore color='blue'>
          {fencedByP2.length}
        </PlayerScore>
      </PlayersScoreHeader>

      <GameGridContainer >
        <GameGrid />
      </GameGridContainer>

      

      

      {gameover && <GameOver>Game Over</GameOver>}
    </PageContainer>
  );
}
