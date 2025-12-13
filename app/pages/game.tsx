/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import {
  setLanguage,
  setNameOfPlayer1,
  setGameId,
  setGameover,
  setGameIdChanged,
} from "../store/actions";
import {
  useIsLoaded,
  useClientsCount,
  useLanguage,
  useSize,
  usePlayer1Name,
  usePlayer2Name,
  useGameId,
  useGameIdChanged,
  useGameover,
  useCurrentPlayer,
  useIamPlayer,
  useFencedByP1,
  useFencedByP2,
  useSocketRemoteIsOnline,
  useChatMessages,
  useSocketLocalId,
  useSocketInstance,
} from "../store/selectors";
import { SOCKET_ACTIONS } from "../basics/constants";

import { Tour } from "../tour";
import { LuSettings, LuMessagesSquare, LuLanguages, LuCopyright, LuInfo, LuDoorOpen } from 'react-icons/lu'
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
  LanguageDialogContainer,
  WelcomeDialogTitleStyled,
  WelcomeDialogBodyStyled,
  GameOver,
  Footer,
} from "./game.styled";
import Chakra from "../components/Chakra";
import { Chat } from "../components/chat";

// Translations
import t from "../translations";
import { SupportedLanguagesType } from "../translations/supportedLanguages";
import { languages } from "../translations/supportedLanguages";

export const Game = () => {
  const DEBUG_DISPLAY_MY_SOCKET_ID = Boolean(Number(process.env.DEBUG_DISPLAY_MY_SOCKET_ID));

  // TEMP
  const TOUR_AVAILABLE = false

  const dispatch = useDispatch()
  const isLoaded = useIsLoaded()

  const clientsCount = useClientsCount()
  const language: SupportedLanguagesType = useLanguage()
  const size = useSize()
  const gameId = useGameId()
  const gameIdChanged = useGameIdChanged()
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
  const languageItems = Object.entries(languages).map(([key, value]) => ({label: value, value: key}))

  // Dialogs open states
  const [languageDialogOpen, setLanguageDialogOpen] = useState(false)
  const [languageSelectionMade, setLanguageSelectionMade] = useState('')
  const [welcomeDialogOpen, setWelcomeDialogOpen] = useState(false)

  useEffect(() => {
    const storedGameId = localStorage.getItem('gameId')
    const player1Name = localStorage.getItem('player1Name')
    const storedLanguage = localStorage.getItem('language')

    if(!storedLanguage){
      setLanguageDialogOpen(true)
    }

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

  const [controlsDrawerOpen, setControlsDrawerOpen] = useState(false)

  const [createGameDialogOpen, setCreateGameDialogOpen] = useState(false)
  const [joinGameDialogOpen, setJoinGameDialogOpen] = useState(false)
  const [gameoverDialogOpen, setGameoverDialogOpen] = useState(false)

  // For chat Drawer auto open
  const [triggerChatDrawerOpen, setTriggerChatDrawerOpen] = useState(false)
  
  useEffect(() => {
    if(gameover || (!gameover && gameIdChanged)) {
      setTimeout(() => {
        setGameoverDialogOpen(true)
        dispatch(setGameIdChanged(false))
      }, 5000)
    }
  }, [gameIdChanged, gameover, setGameoverDialogOpen, dispatch])

  // On another game invitation denied by the other player.
  useEffect(() => {
    setGameoverDialogOpen(false)
  }, [otherPlayerName])

  useEffect(() => {
    // Reset on game left or destroyed
    if(messagesLength>0 && messages.length === 0) {
      setMessagesLength(0)
      return
    }

    if(messages.length > messagesLength) {
      setTriggerChatDrawerOpen(true)
      setMessagesLength(messagesLength)

      setTimeout(() => {
        setTriggerChatDrawerOpen(false)
      }, 1)
    }
  }, [messages, messagesLength])

  useEffect(() => {
    dispatch(setGameover(fencedByP1.length + fencedByP2.length === finalCount))
  }, [fencedByP1, fencedByP2, finalCount, dispatch])

  const mySocketId = useSocketLocalId()
  const gameIdString = gameId.toString().slice(0,3) + ' ' + gameId.toString().slice(3,6)

  const socket = useSocketInstance()
  const leaveGame = () => {
    setGameoverDialogOpen(false)
    localStorage.removeItem('gameId')
    dispatch(setGameId(-1))

    const request = {
        from: 'player',
        to: 'server',
        action: SOCKET_ACTIONS.LEAVE_GAME,
        socketId: mySocketId,
        gameId: gameId,
      }
      socket.emit('message', JSON.stringify(request))
  }

  return !isLoaded ? <></> : <>

    <PageContainer>
      <ConnectedPlayersContainer>
        <span>{clientsCount}</span> {`${clientsCount >  1 ? t[language]['players'] : t[language]['player']} ${t[language]['online']}`}
      </ConnectedPlayersContainer>

      <DrawerContainer>
        {/* Controls drawer */}
        <Chakra.Drawer
          open={controlsDrawerOpen}
          setOpen={setControlsDrawerOpen}
          placement="top"
          buttonId='ControlsButton'
          buttonText={<LuSettings/>}
          buttonCallback={() => {
            setControlsDrawerOpen(true)
          }}
          disableOverlayClick={false}
          onOpenChange={(state: {open:boolean}) => {
            // console.log('DRAWER IS OPEN', state)
            setControlsDrawerOpen(state.open)
          }}
        >
          <GameControls
            setWelcomeDialogOpen={setWelcomeDialogOpen}
            setCreateGameDialogOpen={setCreateGameDialogOpen}
            setJoinGameDialogOpen={setJoinGameDialogOpen}
            setControlsDrawerOpen={setControlsDrawerOpen}
          />
        </Chakra.Drawer>

        {DEBUG_DISPLAY_MY_SOCKET_ID && <>
          <div>
            My Socket Id: {mySocketId}
          </div>
        </>}

        {gameId !== -1 && <GameNumberStyled>
          <div>
            {gameIdString}
          </div>
          <div>
            {t[language]['Number to share']}
          </div>
        </GameNumberStyled>}

        {/* Chat drawer */}
        {gameId !== -1 &&<Chakra.Drawer
          triggerOpen={triggerChatDrawerOpen}
          placement="bottom"
          title={t[language]['Chat with the other player']}
          buttonText={<LuMessagesSquare/>}
          disableOverlayClick={false}
        >
          <Chat/>
        </Chakra.Drawer>}
      </DrawerContainer>

      <PlayersNameHeader>
        <Player>
          <PlayerNameContainer id='player1Name'>
            <PlayerOnlineIndicator $online={iamPlayer === 1 || remoteIsOnline} /> {player1Name}
          </PlayerNameContainer>
        </Player>

        <Player>
          <PlayerNameContainer id='player2Name'>
            <PlayerOnlineIndicator $online={iamPlayer === 2 || remoteIsOnline} /> {player2Name}
          </PlayerNameContainer>
        </Player>
      </PlayersNameHeader>

      <PlayersScoreHeader>
        <PlayerScore color='green' id='player1Score'>
          {fencedByP1.length}
        </PlayerScore>

        <CurrentTurn $hidden={!remoteIsOnline || gameover}>
          { currentPlayer === 1 ? <span>&larr;</span> : <span>&rarr;</span> }
        </CurrentTurn>

        <PlayerScore color='blue' id='player2Score'>
          {fencedByP2.length}
        </PlayerScore>
      </PlayersScoreHeader>

      <GameGridContainer >
        <GameGrid />
      </GameGridContainer>

      <LanguageDialogContainer>
        <Chakra.Dialog
          title={<LuLanguages/>}
          body={
            <Chakra.Combobox
              setSelectedComponent={(x: string) => {
                if(x){
                  const languageCode = Object.entries(languages).filter(([_, value]) => value === x)?.[0]?.[0]
                  if(languageCode){
                    localStorage.setItem('language', languageCode)
                    dispatch(setLanguage(languageCode))
                    setLanguageSelectionMade(languageCode)
                  } else{
                    localStorage.removeItem('language')
                    setLanguageDialogOpen(true)
                    setLanguageSelectionMade('')
                  }
                } else{
                  localStorage.removeItem('language')
                  setLanguageDialogOpen(true)
                  setLanguageSelectionMade('')
                }
              }}
              options={languageItems}
            />
          }

          open={languageDialogOpen}
          setOpen={setLanguageDialogOpen}
          closeButtonHidden={true}
          overlayCloseDisabled={true}
          
          saveButtonText={t[language]['Ok']}
          saveButtonDisabled={!languageSelectionMade}
          saveButtonCallback={() => {
            setLanguageDialogOpen(false)
            setWelcomeDialogOpen(true)
          }}

          cancelButtonHidden={true}
        />

        <Chakra.Dialog
          title={<WelcomeDialogTitleStyled>
            <LuDoorOpen/> <span>{t[language]['Tour Dialog title']}</span>
          </WelcomeDialogTitleStyled>}
          body={<WelcomeDialogBodyStyled>
            {t[language]['Tour Dialog P1']}
            {TOUR_AVAILABLE ? t[language]['Tour Dialog P2'] : ''}
            
            <Chakra.Button
              text={`${TOUR_AVAILABLE ? t[language]['Tour Dialog button'] : ''} ${TOUR_AVAILABLE ? '' : t[language]['Tour coming soon...']}`}
              onClick={() => {
                // console.log('Start Tour...')
              }}
              customVariant='orange'
              disabled
            />
          </WelcomeDialogBodyStyled>}

          open={welcomeDialogOpen}
          setOpen={setWelcomeDialogOpen}

          cancelButtonText={t[language]['Cancel']}
          cancelCallback={() => {
            setWelcomeDialogOpen(false)
            setControlsDrawerOpen(false)
          }}

          closeButtonHidden={true}
          overlayCloseDisabled={true}
          
          saveButtonHidden={true}
          // cancelButtonHidden={true}
        />
      </LanguageDialogContainer>

      <GameOver>
        {gameover && <div>{t[language]['Game Over']}</div>}
        <Chakra.Dialog
          title={t[language]['Game Over']}
          body={<p>{`${t[language]['Invite']} ${otherPlayerName} ${t[language]['to play another game with you?']}`}</p>}

          open={gameoverDialogOpen}
          setOpen={setGameoverDialogOpen}

          closeButtonHidden={true}
          overlayCloseDisabled={true}

          cancelButtonText={remoteIsOnline ? t[language]['Leave'] : t[language]['Ok']}
          cancelCallback={leaveGame}
          
          saveButtonText={t[language]['Create a new game']}
          saveButtonHidden={remoteIsOnline ? false : true}
          saveButtonCallback={() => {
            setGameoverDialogOpen(false)
            const request = {
              from: 'player',
              to: 'server',
              action: SOCKET_ACTIONS.REQUEST_ANOTHER_GAME,
              socketId: mySocketId,
              gameId: gameId,
            }
            socket.emit('message', JSON.stringify(request))
          }}
        />
      </GameOver>
    </PageContainer>

    <Footer>
      <div><LuCopyright/> <span>2025 - Louys Patrice Bessette</span></div>
      <div><Chakra.Dialog
          title={<LuInfo/>}
          body={<>
            <p>{t[language]['InfoDialogP1']}</p>
            <p>&nbsp;</p>
            <p>{t[language]['InfoDialogP2']}</p>
            <p>&nbsp;</p>
            <p>{t[language]['InfoDialogP3']}</p>
            <p>&nbsp;</p>
            <p>{t[language]['InfoDialogP4']}</p>
            <p>&nbsp;</p>
            <p>{t[language]['InfoDialogP5']}</p>
          </>}

          openButtonText={<LuInfo/>}
          openButtonColor='nav'
          
          saveButtonText={t[language]['Ok']}
          cancelButtonHidden={true}
        /></div>
    </Footer>

    <Tour
      $isActive={true}
      
      setControlsDrawerOpen={setControlsDrawerOpen}
      setCreateGameDialogOpen={setCreateGameDialogOpen}
      setJoinGameDialogOpen={setJoinGameDialogOpen}
      setGameoverDialogOpen={setGameoverDialogOpen}
      setTriggerChatDrawerOpen={setTriggerChatDrawerOpen}
      />
  </>
}

