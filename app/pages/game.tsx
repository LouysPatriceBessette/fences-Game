import { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import {
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
  // useSocketLocalId,
} from "../store/selectors";

import { GameControls } from "../components/game-controls";
import { GameGrid } from "../components/game-grid";
import {
  PageContainer,
  GameNumberStyled,
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
  const GameOverDialogDisabled = true

  const socket = useSocketInstance()
  const dispatch = useDispatch()

  const size = useSize()
  const gameId = useGameId()
  const finalCount = (size.x - 1) * (size.y - 1)
  const gameover = useGameover()
  const player1Name = usePlayer1Name()
  const player2Name = usePlayer2Name()

  const currentPlayer = useCurrentPlayer()
  const remoteIsOnline = useSocketRemoteIsOnline()
  const iamPlayer = useIamPlayer()
  const otherPlayerName = iamPlayer === 1 ? player2Name : player1Name
  
  useEffect(() => {
    let interval: NodeJS.Timeout
    if(socket && gameId && gameId !== -1){
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
      }, 500)
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

  const fencedByP1 = useFencedByP1()
  const fencedByP2 = useFencedByP2()

  const messages = useChatMessages()
  const [messagesLength, setMessagesLength] = useState(messages.length)
  const [triggerChatDrawerOpen, setTriggerOpen] = useState(false)

  const gameOverDialogButton = useRef<HTMLButtonElement>(null)
  const gameOverDialogBody = useRef(<></>)
  
  useEffect(() => {
    gameOverDialogBody.current = <p>{`Invite ${otherPlayerName} to start another the game with you?`}</p>

    if(gameover && gameOverDialogButton.current) {
      gameOverDialogButton.current.click()
    }

  }, [gameover, otherPlayerName, gameOverDialogButton, gameOverDialogBody])

  useEffect(() => {
    // Reset on game left or destroyed
    if(messagesLength>0 && messages.length === 0) {
      setMessagesLength(0)
      return
    }

    if(messages.length > messagesLength) {
      setTriggerOpen(true)
      setMessagesLength((prev: number) => prev + 1)

      setTimeout(() => {
        setTriggerOpen(false)
      }, 1)
    }
  }, [messages, messagesLength])

  useEffect(() => {
    dispatch(setGameover(fencedByP1.length + fencedByP2.length === finalCount))
  }, [fencedByP1, fencedByP2, finalCount, dispatch])

  // const mySocketId = useSocketLocalId()
  const gameIdString = gameId.toString().slice(0,3) + ' ' + gameId.toString().slice(3,6)

  return (
    <PageContainer>
      <DrawerContainer>
        {/* Controls drawer */}
        <Chakra.Drawer
          placement="top"
          buttonText='Controls'
        >
          <GameControls/>
        </Chakra.Drawer>

        {gameId !== -1 && <GameNumberStyled>
          <div>
            {/* My Socket Id: {mySocketId} */}
            Number to share
          </div>
          <div>
            {gameIdString}
          </div>
        </GameNumberStyled>}

        {/* Chat drawer */}
        {gameId !== -1 &&<Chakra.Drawer
          triggerOpen={triggerChatDrawerOpen}
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

      <GameOver>
        {gameover && <div>Game Over</div>}
        {!GameOverDialogDisabled && <Chakra.Dialog
          ref={gameOverDialogButton}
          title='Game Over'
          body={gameOverDialogBody.current}

          cancelButtonText={remoteIsOnline ? 'Leave' : 'Ok'}
          cancelCallback={() => {
            // LEAVE!
            alert('LEAVE!')
          }}
          
          saveButtonText='Create a new game'
          saveButtonHidden={remoteIsOnline ? false : true}
          saveCallback={() => {
            alert('Sending a request...')
            // Make a request to play???

              // emit #1 == request a new game with same player


                // SIZE????




                // Can be determined on server:
                  // Players id, names, ==> copy

                  // Winner ==> FencedByP1.length > fencedByP2.length
                  // Draw ==> reverse last known currentPlayer







              // Server will create a new game
              // Respond with the new game redux to both players
              // + a dialog trigger for the player who did not request
              // !!! current turn should be the winner!

            // On the other side,
              // use the new game redux
              // display dialog with an 'Ok' or a 'Leave'

              // If Leave: emit leave game.

          }}
        />}
        </GameOver>
    </PageContainer>
  );
}
