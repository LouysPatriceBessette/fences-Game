/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from "react";
import { useNextStep } from 'nextstepjs';
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
  const [triggerChatDrawerOpen, setTriggerDrawerOpen] = useState(false)
  
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

  // =============================== Guided tour
  const CURRENT_STEP_DELAY = 800
  const TIME_OUT_DELAY = 500
  const tours = useTour()

  const {
    startNextStep,
    closeNextStep,
    currentTour,
    currentStep,
    setCurrentStep,
    isNextStepVisible,
  } = useNextStep();

  const [tourStarted, setTourStarted] = useState(false)

  const handleStartTour = () => {
    setTourStarted(true)
    setControlsDrawerOpen(false)
    setWelcomeDialogOpen(false)
    startNextStep("INSTRUCTIONS_START");
  };


  //
  //
  //  NEXTSTEP USEEFFECT
  //
  //
  useEffect(() => {

    console.log({
      tourStarted,
      currentStep,
      controlsDrawerOpen,
      createGameDialodOpen: createGameDialogOpen,
      joinGameDialodOpen: joinGameDialogOpen,
      isNextStepVisible,
    })

    if(tourStarted && !isNextStepVisible){
      console.log('setTourStarted')
      setTourStarted(false)
      setControlsDrawerOpen(false)
      setCreateGameDialogOpen(false)
      setJoinGameDialogOpen(false)
      return
    } else if(!tourStarted){
      return
    }

    switch(currentTour){
      case 'INSTRUCTIONS_START':

        // Position out of viewport fix
        const pointer = document.querySelector("[data-name='nextstep-pointer']")
        // let pointerRect
        // let prevStyle
        console.log('pointer', pointer)

        // if(pointer){
        //   pointerRect = pointer.getBoundingClientRect()
        //   prevStyle = window.getComputedStyle(pointer)?.transform
        //   console.log('pointerRect', pointerRect)
        //   console.log('prevStyle: ', prevStyle)
        // }

        // Fix NextStep position
        if(currentStep === 1 && !controlsDrawerOpen){
          if(pointer){

            pointer.querySelector("[data-name='nextstep-card']")?.classList.add('nextstep-card-fix-1')
          }

        }

        if(currentStep === 1 && controlsDrawerOpen){
          setCurrentStep(2, CURRENT_STEP_DELAY)

          if(pointer){
            setTimeout(() => {
              pointer.querySelector("[data-name='nextstep-card']")?.classList.remove('nextstep-card-fix-1')
            }, CURRENT_STEP_DELAY - 0)
          }
        }

        if(currentStep === 2 && !createGameDialogOpen){
          if(pointer){

            pointer.querySelector("[data-name='nextstep-card']")?.classList.add('nextstep-card-fix-2')
          }
        }

        if(currentStep === 2 && createGameDialogOpen){
          setCurrentStep(3, CURRENT_STEP_DELAY)
          setTimeout(() => {
            const el = document.querySelectorAll("[data-scope='dialog']")
            for (let i = 0; i < el.length; i++) {
              if(el[i].scrollTop > 0){
                el[i].scrollTo({top: 0, behavior: 'smooth'})
              }
            }
          }, CURRENT_STEP_DELAY + TIME_OUT_DELAY)
        }

        if(currentStep === 3){
          if(pointer){

            pointer.querySelector("[data-name='nextstep-card']")?.classList.remove('nextstep-card-fix-2')
          }
        }

        // Create game sliders
        if(currentStep === 4){
          if(pointer){

            // pointer.querySelector("[data-name='nextstep-card']")?.classList.remove('nextstep-card-fix-2')
          }
        }

        if(currentStep === 5){
          if(pointer){

            // pointer.querySelector("[data-name='nextstep-card']")?.classList.remove('nextstep-card-fix-2')
          }
        }



        
        break

      default:
        break
    }
  }, [
    tourStarted,
    setTourStarted,
    currentTour,
    currentStep,
    controlsDrawerOpen,
    createGameDialogOpen,
    joinGameDialogOpen,
    closeNextStep,
    startNextStep,
    setCurrentStep,
    isNextStepVisible,
  ])

  return (<>
    <PageContainer>
      <ConnectedPlayersContainer id='tour__online-players'>
        <span>{clientsCount}</span> {`${clientsCount >  1 ? t[language]['players'] : t[language]['player']} ${t[language]['online']}`}
      </ConnectedPlayersContainer>

      <DrawerContainer>
        {/* Controls drawer */}
        <Chakra.Drawer
          open={controlsDrawerOpen}
          setOpen={setControlsDrawerOpen}
          id='tour__controls-drawer--button'
          placement="top"
          buttonText={<LuSettings/>}
          buttonCallback={() => {
            setTimeout(() => {
              setControlsDrawerOpen(true)
            }, tourStarted ? TIME_OUT_DELAY : 0)
          }}
          disableOverlayClick={tourStarted}
          onOpenChange={(state: {open:boolean}) => {
            setTimeout(() => {
              console.log('DRAWER IS OPEN', state)
              setControlsDrawerOpen(state.open)
            }, tourStarted ? TIME_OUT_DELAY : 0)
          }}
        >
          <GameControls
            buttonIds={[
              'tour__create-button',
              'tour__join-button',
              'tour__leave-delete-button',
              'tour__more-controls-button'
            ]}

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
          triggerOpen={triggerChatDrawerOpen} // TODO: trigger open was removed
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

    <NextStepsTranslateAndDispatch/>
  </>);
}
