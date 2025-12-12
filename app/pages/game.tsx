/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from "react";
import { useNextStep, Tour } from 'nextstepjs';
import { NextStepsTranslateAndDispatch } from '../tour/NextStepsTranslateAndDispatch';

import { WelcomeDialogTitleStyled, WelcomeDialogBodyStyled } from '../tour/tour.styled';

import { useDispatch } from 'react-redux';
import {
  setLanguage,
  setLanguageIsDefault,
  setNameOfPlayer1,
  setGameId,
  setGameover,
  setGameIdChanged,
} from "../store/actions";
import {
  useTour,
  useClientsCount,
  useLanguage,
  useLanguageIsDefault,
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

  const clientsCount = useClientsCount()
  const language: SupportedLanguagesType = useLanguage()
  const languageIsDefault = useLanguageIsDefault()
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
  const [welcomeDialogOpen, setWelcomeDialogOpen] = useState(false)
  
  // TEMP
  useEffect(() => {

    localStorage.clear()

  }, [])

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

  const [createGameDialodOpen, setCreateGameDialodOpen] = useState(false)
  const [joinGameDialodOpen, setJoinGameDialodOpen] = useState(false)
  const [gameoverDialogOpen, setGameoverDialogOpen] = useState(false)

  // For chat Drawer auto open
  const [triggerChatDrawerOpen, setTriggerDrawerOpen] = useState(false)
  
  useEffect(() => {
    if(gameover || (!gameover && gameIdChanged)) {
      setGameoverDialogOpen(true)
      dispatch(setGameIdChanged(false))
    }
  }, [gameIdChanged, language, gameover, otherPlayerName, setGameoverDialogOpen, dispatch])

  useEffect(() => {
    // Reset on game left or destroyed
    if(messagesLength>0 && messages.length === 0) {
      setMessagesLength(0)
      return
    }

    if(messages.length > messagesLength) {
      setTriggerDrawerOpen(true)
      setMessagesLength(messagesLength)

      setTimeout(() => {
        setTriggerDrawerOpen(false)
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

  // =============================== Guided tour
  const CURRENT_STEP_DELAY = 300
  const TIME_OUT_DELAY = 100
  const tours = useTour()

  const {
    startNextStep,
    closeNextStep,
    currentTour,
    currentStep,
    setCurrentStep,
    // isNextStepVisible,
  } = useNextStep();

  const [tourStarted, setTourStarted] = useState(false)

  const handleStartTour = () => {
    setTourStarted(true)
    setWelcomeDialogOpen(false)
    startNextStep("INSTRUCTIONS_START");
  };

  useEffect(() => {

    console.log({
      currentStep,
      controlsDrawerOpen,
      createGameDialodOpen,
      joinGameDialodOpen,
    })

    switch(currentTour){
      case 'INSTRUCTIONS_START':

        if(currentStep === 4 && controlsDrawerOpen){
           setCurrentStep(5)
        }

        if(currentStep === 5 && createGameDialodOpen){
           setCurrentStep(6)
        }

        break

      case 'CONTROLS_DRAWER':
        if(currentStep === 1) {
          closeNextStep()
        }
        break

      default:
        break
    }
  }, [
    currentTour,
    currentStep,
    controlsDrawerOpen,
    createGameDialodOpen,
    joinGameDialodOpen,
    closeNextStep,
    startNextStep,
    setCurrentStep,
  ])

  return (<>
    <PageContainer>
      <ConnectedPlayersContainer id='tour__online-players'>
        <span>{clientsCount}</span> {`${clientsCount >  1 ? t[language]['players'] : t[language]['player']} ${t[language]['online']}`}
      </ConnectedPlayersContainer>

      <DrawerContainer>
        {/* Controls drawer */}
        <Chakra.Drawer
          id='tour__controls-drawer--button'
          placement="top"
          buttonText={<LuSettings/>}
          buttonCallback={() => {
            setTimeout(() => {
              setControlsDrawerOpen(true)
            }, TIME_OUT_DELAY)
          }}
          disableOverlayClick={tourStarted}
        >
          <GameControls
            buttonIds={[
              'tour__create-button',
              'tour__join-button',
              'tour__leave-delete-button',
              'tour__more-controls-button'
            ]}

            // Dialogs open buttons callbacks
            openButtonCallbacks={[
              // create button
              () => {
                console.log('openbutton callback - in Game')
                setTimeout(() => {
                  setCreateGameDialodOpen(true)
                }, TIME_OUT_DELAY)
              },
              
              // join button
              () => {
                setJoinGameDialodOpen(true)
              },
            ]}
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
          disableOverlayClick={tourStarted}
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
        <PlayerScore color='green' id='tour__player-1-score'>
          {fencedByP1.length}
        </PlayerScore>

        <CurrentTurn $hidden={!remoteIsOnline || gameover}>
          { currentPlayer === 1 ? <span>&larr;</span> : <span>&rarr;</span> }
        </CurrentTurn>

        <PlayerScore color='blue' id='tour__player-2-score'>
          {fencedByP2.length}
        </PlayerScore>
      </PlayersScoreHeader>

      <GameGridContainer >
        <GameGrid id='tour__gameg-grid' />
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
                  } else{
                    localStorage.removeItem('language')
                    dispatch(setLanguageIsDefault())
                    setLanguageDialogOpen(true)
                  }
                } else{
                  localStorage.removeItem('language')
                  dispatch(setLanguageIsDefault())
                  setLanguageDialogOpen(true)
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
          saveButtonDisabled={languageIsDefault}
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
              text={t[language]['Tour Dialog button']}
              onClick={handleStartTour}
              customVariant='orange'
            />
          </WelcomeDialogBodyStyled>}

          open={welcomeDialogOpen}
          setOpen={setWelcomeDialogOpen}

          closeButtonHidden={true}
          overlayCloseDisabled={true}
          
          saveButtonHidden={true}
          cancelButtonHidden={true}
        />
      </LanguageDialogContainer>

      <GameOver>
        {gameover && <div>{t[language]['Game Over']}</div>}
        <Chakra.Dialog
          title={t[language]['Game Over']}
          body={<p>{`${t[language]['Invite']} ${otherPlayerName} ${t[language]['to play another game with you?']}`}</p>}


          // ref={gameOverDialogButton}
          open={gameoverDialogOpen}
          setOpen={setGameoverDialogOpen}


          cancelButtonText={remoteIsOnline ? t[language]['Leave'] : t[language]['Ok']}
          cancelCallback={leaveGame}
          
          saveButtonText={t[language]['Create a new game']}
          saveButtonHidden={remoteIsOnline ? false : true}
          saveCallback={() => {
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
          ref={null}
          title={<LuInfo/>}
          openButtonText={<LuInfo/>}
          openButtonColor='nav'
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
          saveButtonText={t[language]['Ok']}
          cancelButtonHidden={true}
        /></div>
    </Footer>

    <NextStepsTranslateAndDispatch/>
  </>);
}
