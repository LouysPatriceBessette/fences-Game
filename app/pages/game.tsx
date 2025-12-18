/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import {
  setIsLoading,
  setLanguage,
  setNameOfPlayer1,
  setGameId,
  setGameover,
  setGameIdChanged,
} from "../store/actions";
import {
  useIsLoading,
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

import { Loader } from '../_loading/Loader'
import { Tour } from "../tour";
import { TourOverlay } from "../tour/index.styled";
import { LuSettings, LuMessagesSquare, LuLanguages, LuCopyright, LuInfo, LuDoorOpen } from 'react-icons/lu'
import { GameControls } from "../components/game-controls";
import { GameGrid } from "../components/game-grid";
import {
  LoadingWrapper,
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

  const dispatch = useDispatch()
  const isLoading = useIsLoading()

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
  const [chatDrawerOpen, setChatDrawerOpen] = useState(false)

  const [createGameDialogOpen, setCreateGameDialogOpen] = useState(false)
  const [joinGameDialogOpen, setJoinGameDialogOpen] = useState(false)
  const [gameoverDialogOpen, setGameoverDialogOpen] = useState(false)
  const [more, setMore] = useState(false)

  // For chat Drawer auto open
  const [triggerChatDrawerOpen, setTriggerChatDrawerOpen] = useState(false)
  
  const [welcomeDialogOpen, setWelcomeDialogOpen] = useState(false)
  const [tourActive, setTourActive] = useState(false)
  const [tourNumber, setTourNumber] = useState(0)

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

    // Opens the chat drawer if there are more messages in the store than in the local state.
    // This is useful for missed incoming messages distributed real time via dispatch.
    // The "trigger" comes from a redux-refresh on page or device re-open.
    if(messages.length > messagesLength) {
      setTriggerChatDrawerOpen(true)
      setMessagesLength(messagesLength)

      // Reset local state for the next trigger
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

  return <>
    <LoadingWrapper $isLoading={isLoading}>
      <PageContainer>
        <ConnectedPlayersContainer id='connectedPlayers'>
          <span>{clientsCount}</span> {`${clientsCount >  1 ? t[language]['players'] : t[language]['player']} ${t[language]['online']}`}
        </ConnectedPlayersContainer>

        <DrawerContainer>
          {/* Controls drawer */}
          <Chakra.Drawer
            open={controlsDrawerOpen}
            setOpen={setControlsDrawerOpen}

            buttonId='controls-button'
            buttonText={<LuSettings/>}

            placement="top"
            disableOverlayClick={tourActive}
          >
            <GameControls
              setWelcomeDialogOpen={setWelcomeDialogOpen}

              createGameDialogOpen={createGameDialogOpen}
              setCreateGameDialogOpen={setCreateGameDialogOpen}

              joinGameDialogOpen={joinGameDialogOpen}
              setJoinGameDialogOpen={setJoinGameDialogOpen}

              setControlsDrawerOpen={setControlsDrawerOpen}

              more={more}
              setMore={setMore}

              tourActive={tourActive}
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
          {(gameId !== -1 || tourActive) && <div id='chat-drawer'>
            <Chakra.Drawer
              open={chatDrawerOpen}
              setOpen={setChatDrawerOpen}
              triggerOpen={triggerChatDrawerOpen}

              buttonId='chat-button'
              buttonText={<LuMessagesSquare/>}

              title={<div id='chat-drawer-title'>{t[language]['Chat with the other player']}</div>}
              placement="bottom"
              disableOverlayClick={tourActive}
            >
              <Chat/>
            </Chakra.Drawer>
          </div>}
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

          {gameId !== -1 && <CurrentTurn $hidden={!remoteIsOnline || gameover}>
            { currentPlayer === 1 ? <span>&larr;</span> : <span>&rarr;</span> }
          </CurrentTurn>}

          <PlayerScore color='blue' id='player2Score'>
            {fencedByP2.length}
          </PlayerScore>
        </PlayersScoreHeader>

        <GameGridContainer>
          <GameGrid id='playGrid' />
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
              {t[language]['Tour Dialog P2']}

              <Chakra.Button
                text={t[language]['Start play tour']}
                onClick={() => {
                  dispatch(setIsLoading(true))
                  setTourNumber(1)
                  setTourActive(true)
                  setWelcomeDialogOpen(false)
                }}
                customVariant='orange'
              />

              <Chakra.Button
                text={t[language]['Start interface tour']}
                onClick={() => {
                  dispatch(setIsLoading(true))
                  setTourNumber(0)
                  setTourActive(true)
                  setWelcomeDialogOpen(false)
                  setControlsDrawerOpen(false)
                }}
                customVariant='orange'
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
          />
        </LanguageDialogContainer>

        <GameOver>
          {gameover && <div>{t[language]['Game Over']}</div>}
          <Chakra.Dialog
            title={t[language]['Game Over']}
            body={<p id='gameover-body'>{`${t[language]['Invite']} ${otherPlayerName} ${t[language]['to play another game with you?']}`}</p>}

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
      
      <TourOverlay $tourActive={tourActive}>
        <Tour
          tourNumber={tourNumber}
          tourActive={tourActive}
          setTourActive={setTourActive}

          setControlsDrawerOpen={setControlsDrawerOpen}
          setMore={setMore}

          setCreateGameDialogOpen={setCreateGameDialogOpen}
          setJoinGameDialogOpen={setJoinGameDialogOpen}
          setGameoverDialogOpen={setGameoverDialogOpen}

          chatDrawerOpen={chatDrawerOpen}
          setChatDrawerOpen={setChatDrawerOpen}
        />
      </TourOverlay>
    </LoadingWrapper>

    <Loader
      tourNumber={tourNumber}
      setTourActive={setTourActive}

      setControlsDrawerOpen={setControlsDrawerOpen}
      setMore={setMore}

      setCreateGameDialogOpen={setCreateGameDialogOpen}
      setJoinGameDialogOpen={setJoinGameDialogOpen}
      setGameoverDialogOpen={setGameoverDialogOpen}

      setChatDrawerOpen={setChatDrawerOpen}
    />
  </>
}

