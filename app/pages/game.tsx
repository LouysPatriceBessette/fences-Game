import { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import {
  setLanguage,
  setNameOfPlayer1,
  setGameId,
  setGameover,
} from "../store/actions";
import {
  useClientsCount,
  useLanguage,
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
  useChatMessages,
  useSocketLocalId,
} from "../store/selectors";

import { GameControls } from "../components/game-controls";
import { GameGrid } from "../components/game-grid";
import {
  PageContainer,
  ConnectedPlayersContainer,
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
import Chakra from "../components/Chakra";
import { Chat } from "../components/chat";

// Translations
import t from "../translations";
import { SupportedLanguagesType } from "../translations/supportedLanguages";

export const Game = () => {
  const DEBUG_DISPLAY_MY_SOCKET_ID = false
  const WIP_GAME_OVER_DIALOG_DISABLED = true

  const dispatch = useDispatch()

  const clientsCount = useClientsCount()
  const language: SupportedLanguagesType = useLanguage()
  const size = useSize()
  const gameId = useGameId()
  const finalCount = (size.x - 1) * (size.y - 1)
  const gameover = useGameover()
  let player1Name = usePlayer1Name()
  let player2Name = usePlayer2Name()

  if(player1Name === 'Player 1'){
    player1Name = `${t[language]['Player']} 1`}
  if(player2Name === 'Player 2'){
    player2Name = `${t[language]['Player']} 2`
  }

  const currentPlayer = useCurrentPlayer()
  const remoteIsOnline = useSocketRemoteIsOnline()
  const iamPlayer = useIamPlayer()
  const otherPlayerName = iamPlayer === 1 ? player2Name : player1Name

  useEffect(() => {
    const storedGameId = localStorage.getItem('gameId')
    const player1Name = localStorage.getItem('player1Name')
    const storedLanguage =localStorage.getItem('language')

    if(player1Name) {
      dispatch(setNameOfPlayer1(player1Name))
    }
    if(storedGameId) {
      dispatch(setGameId(storedGameId))
    }
    if(storedLanguage && language !== storedLanguage) {
      dispatch(setLanguage(storedLanguage))
    }
  }, [language, dispatch])

  const fencedByP1 = useFencedByP1()
  const fencedByP2 = useFencedByP2()

  const messages = useChatMessages()
  const [messagesLength, setMessagesLength] = useState(messages.length)
  const [triggerChatDrawerOpen, setTriggerOpen] = useState(false)

  const gameOverDialogButton = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    if(gameover && gameOverDialogButton.current) {
      gameOverDialogButton.current.click()
    }
  }, [language, gameover, otherPlayerName, gameOverDialogButton])

  useEffect(() => {
    // Reset on game left or destroyed
    if(messagesLength>0 && messages.length === 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setMessagesLength(0)
      return
    }

    if(messages.length > messagesLength) {
      setTriggerOpen(true)
      setMessagesLength(messagesLength)

      setTimeout(() => {
        setTriggerOpen(false)
      }, 1)
    }
  }, [messages, messagesLength])

  useEffect(() => {
    dispatch(setGameover(fencedByP1.length + fencedByP2.length === finalCount))
  }, [fencedByP1, fencedByP2, finalCount, dispatch])

  const mySocketId = useSocketLocalId()
  const gameIdString = gameId.toString().slice(0,3) + ' ' + gameId.toString().slice(3,6)

  return (
    <PageContainer>
      <ConnectedPlayersContainer>
        <span>{clientsCount}</span> {`${clientsCount >  1 ? t[language]['players'] : t[language]['player']} ${t[language]['online']}`}
      </ConnectedPlayersContainer>

      <DrawerContainer>
        {/* Controls drawer */}
        <Chakra.Drawer
          placement="top"
          buttonText={t[language]['Controls']}
        >
          <GameControls/>
        </Chakra.Drawer>

        {DEBUG_DISPLAY_MY_SOCKET_ID && <>
          <div>
            My Socket Id: {mySocketId}
          </div>
        </>}

        {gameId !== -1 && <GameNumberStyled>
          <div>
            {t[language]['Number to share']}
          </div>
          <div>
            {gameIdString}
          </div>
        </GameNumberStyled>}

        {/* Chat drawer */}
        {gameId !== -1 &&<Chakra.Drawer
          triggerOpen={triggerChatDrawerOpen}
          placement="bottom"
          title={t[language]['Chat with the other player']}
          buttonText={t[language]['Chat']}
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
        {gameover && <div>{t[language]['Game Over']}</div>}
        {!WIP_GAME_OVER_DIALOG_DISABLED && <Chakra.Dialog
          ref={gameOverDialogButton}
          title={t[language]['Game Over']}
          body={<p>{`${t[language]['Invite']} ${otherPlayerName} ${t[language]['to play another game with you?']}`}</p>}

          cancelButtonText={remoteIsOnline ? t[language]['Leave'] : t[language]['Ok']}
          cancelCallback={() => {
            // LEAVE!
            alert('DEBUG - LEAVE!')
          }}
          
          saveButtonText={t[language]['Create a new game']}
          saveButtonHidden={remoteIsOnline ? false : true}
          saveCallback={() => {
            alert('DEBUG - Sending a request...')
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
