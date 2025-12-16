import { useState, useEffect, useRef } from "react";
import {
  setLanguage,
  setGameSize,
  setGameId,
  setNameOfPlayer1,
  setNameOfPlayer2,
} from '../store/actions';
import {
  useLanguage,
  useSocketInstance,
  useSocketLocalId,
  useGameId,
  useSocketRemoteHasLeft
} from "../store/selectors";
import { LuChevronLeft, LuChevronRight, LuLanguages } from 'react-icons/lu'

import { useDispatch } from "react-redux";
import { SOCKET_ACTIONS } from "../basics/constants";
import Chakra from "./Chakra";
import { GridContainer, Grid } from './grid-elements'
import { fillGrid } from "./game-grid";
import { DialogGridStyled as DialogGrid, DialogLabelStyled, ControlButtonsContainer } from "./game-controls.styled";

// Translations
import t from "../translations";
import { SupportedLanguagesType } from "../translations/supportedLanguages";
import { languages } from "../translations/supportedLanguages";

export const GameControls = ({
  setWelcomeDialogOpen,

  createGameDialogOpen,
  setCreateGameDialogOpen,

  joinGameDialogOpen,
  setJoinGameDialogOpen,
  setControlsDrawerOpen,
  tourActive,
  tourEnabledButton,

  more,
  setMore,
}: {
  setWelcomeDialogOpen: React.Dispatch<React.SetStateAction<boolean>>,

  createGameDialogOpen: boolean,
  setCreateGameDialogOpen: React.Dispatch<React.SetStateAction<boolean>>,

  joinGameDialogOpen: boolean,
  setJoinGameDialogOpen: React.Dispatch<React.SetStateAction<boolean>>,

  setControlsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>,
  tourActive: boolean,
  tourEnabledButton: string,

  more: boolean
  setMore: React.Dispatch<React.SetStateAction<boolean>>,
}) => {
  const DEBUG_LOCAL_STORAGE = Boolean(Number(process.env.DEBUG_LOCAL_STORAGE))

  const language: SupportedLanguagesType = useLanguage()

  const socket = useSocketInstance()
  const socketId = useSocketLocalId()
  const gameId = useGameId()
  const remoteHasLeft = useSocketRemoteHasLeft()
  const dispatch = useDispatch()

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [disabledInput, setDisabledInput] = useState(tourActive)
  const nameInput = useRef(null)

  const [playerName, setPlayerName] = useState(localStorage.getItem('myName') || '')
  const [x, setX] = useState(3)
  const [y, setY] = useState(3)

  const pinLength = 6
  const [pinString, setPinString] = useState('')

  const languageItems = Object.entries(languages).map((item) =>
    ({label: item[1], value: item[0], disabled: language === item[0]}))

  const changeLanguage = (selectedLangItem: {label: string, value: string, disabled: boolean}) => {
    localStorage.setItem('language', selectedLangItem.value)
    dispatch(setLanguage(selectedLangItem.value))
    setMore(false)
  }

  const leaveGame = () => {
    setControlsDrawerOpen(false)
    localStorage.removeItem('gameId')
    dispatch(setGameId(-1))

    const request = {
        from: 'player',
        to: 'server',
        action: SOCKET_ACTIONS.LEAVE_GAME,
        socketId: socketId,
        gameId: gameId,
      }
      socket.emit('message', JSON.stringify(request))
  }

  const destroyGame = () => {
    setControlsDrawerOpen(false)
    localStorage.removeItem('gameId')
    dispatch(setGameId(-1))
    
    const request = {
        from: 'player',
        to: 'server',
        action: SOCKET_ACTIONS.DESTROY_GAME,
        socketId: socketId,
        gameId: gameId,
      }
      socket.emit('message', JSON.stringify(request))
  }

  const horizontalSliderMarks = [
    {value: 2, label: '2'},
    {value: 3, label: '3'},
    {value: 4, label: '4'},
    {value: 5, label: '5'},
    {value: 6, label: '6'},
    {value: 7, label: '7'},
  ]

  const verticalSliderMarks = [
    {value: 2, label: '2'},
    {value: 3, label: '3'},
    {value: 4, label: '4'},
    {value: 5, label: '5'},
    {value: 6, label: '6'},
    {value: 7, label: '7'},
    {value: 8, label: '8'},
    {value: 9, label: '9'},
    {value: 10, label: '10'},
    {value: 11, label: '11'},
    {value: 12, label: '12'},
  ]

  const CreateForm = <>

    <Chakra.Input
      id='create-input'
      ref={nameInput}
      label={t[language]['Your name']}
      placeholder={t[language]['Your name']}
      value={playerName}
      setValue={setPlayerName}
      disabled={disabledInput}
    />

    <DialogLabelStyled>{t[language]['Dimensions']}: {x} x {y}</DialogLabelStyled>

    <DialogGrid>
      <div>
        <Chakra.Slider
          size='sm'
          orientation='horizontal'
          min={2}
          max={7}
          sliderValue={[x]}
          onValueChangeEnd={(sliderResult: {value: number[]}) => setX(sliderResult.value[0])}
          showSliderValue={false}
          marks={horizontalSliderMarks}
        />
      </div>

      <div>
        <Chakra.Slider
          size='sm'
          orientation='vertical'
          height='300px'
          min={2}
          max={12}
          sliderValue={[y]}
          onValueChangeEnd={(sliderResult: {value: number[]}) => setY(sliderResult.value[0])}
          showSliderValue={false}
          marks={verticalSliderMarks}
        />
      </div>

      <div>
        <GridContainer id='createGrid' $waitingForOpponent={true}>
          <Grid $size={((x + 1) * 2) - 1} $waitingForOpponent={true}>
            {fillGrid({x: (x + 1), y: (y + 1)})}
          </Grid>
        </GridContainer>
      </div>
    </DialogGrid>
  </>

  // This callback call is made in the create Dialog on save button click
  const createGameCallback = () => {
    setControlsDrawerOpen(false)
    setCreateGameDialogOpen(false)

    const gridSize = {x: x + 1, y: y + 1}

    dispatch(setNameOfPlayer1(playerName))
    dispatch(setNameOfPlayer2('Player 2'))
    dispatch(setGameSize(gridSize))

    localStorage.setItem('myName', playerName)
    localStorage.setItem('player1Name', playerName)
    localStorage.removeItem('player2Name')

    const request = {
      from: 'player',
      to: 'server',
      action: SOCKET_ACTIONS.CREATE_GAME,
      socketId: socketId,
      player1Name: playerName,
      size: gridSize,
    }
    socket.emit('message', JSON.stringify(request))
  }

  const JoinForm = <>
    <Chakra.Input
      id='joint-input'
      ref={nameInput}
      label={t[language]['Your name']}
      placeholder={t[language]['Your name']}
      minLength={1}
      value={playerName}
      setValue={setPlayerName}
      disabled={disabledInput}
    />

    <DialogLabelStyled>{t[language]['Game number']}</DialogLabelStyled>

    <Chakra.PinInput
      pinLength={pinLength}
      getPin={setPinString}
      lastPin={localStorage.getItem('LastGameNumberUsed') ?? ''}
    />
  </>

  // This callback call is made in the join Dialog on save button click
  const joinGameCallback = () => {
    setControlsDrawerOpen(false)
    setJoinGameDialogOpen(false)

    const gameNumber = Number(pinString)
    dispatch(setGameId(gameNumber))

    localStorage.setItem('myName', playerName)
    localStorage.removeItem('player1Name')
    localStorage.setItem('player2Name', playerName)
    localStorage.setItem('LastGameNumberUsed', gameNumber.toString())

    const request = {
      from: 'player',
      to: 'server',
      action: SOCKET_ACTIONS.JOIN_GAME,
      socketId: socketId,
      gameId: gameNumber,
      newPlayerName: playerName,
    }
    socket.emit('message', JSON.stringify(request))
  }

  const TIME_OUT_DELAY=500

  // ==== For the tour
  useEffect(() => {
    const names = ['John', 'Raoul']

    if((createGameDialogOpen || joinGameDialogOpen) && tourActive){
      const letters = createGameDialogOpen ? names[0].split('') : names[1].split('')
      letters.forEach((letter, loopIndex) => {
        setTimeout(() => {
          // @ts-expect-error Come on TS!
          nameInput.current.value += letter
        }, 2000 + (loopIndex * 600))
      })
    }
  }, [createGameDialogOpen, joinGameDialogOpen, tourActive, nameInput])

  return (<>
    {DEBUG_LOCAL_STORAGE && <div>
      <Chakra.Button
        onClick={() => {
          localStorage.clear()
          localStorage.removeItem('gameId')
          localStorage.removeItem('socketId')
          window.location.reload()
        }}
        text='Clear localStorage'
      />
    </div>}
    
    <ControlButtonsContainer>
      {!more && <>
        <Chakra.Dialog
          id='createGame'
          title={t[language]['Create a game']}
          body={CreateForm}

          open={createGameDialogOpen}
          setOpen={setCreateGameDialogOpen}

          onOpenChange={(state: {open:boolean}) => {
            setTimeout(() => {
              console.log('DIALOG IS OPEN', state)
              setCreateGameDialogOpen(state.open)
            }, TIME_OUT_DELAY)
          }}

          openButtonText={t[language]['Create']}
          openButtonColor='green'
          openButtonDisabled={gameId !== -1 || (tourActive && tourEnabledButton === '') || (tourActive && tourEnabledButton !== 'createGame')}

          saveButtonText={t[language]['Save']}
          saveButtonCallback={() => createGameCallback()}
          saveButtonDisabled={!playerName}

          cancelButtonText={t[language]['Cancel']}
          
          closeButtonHidden={true}
          overlayCloseDisabled={tourActive}
        />

        <Chakra.Dialog
          id='joinGame'
          title={t[language]['Join a game']}
          body={JoinForm}

          open={joinGameDialogOpen}
          setOpen={setJoinGameDialogOpen}

          onOpenChange={(state: {open:boolean}) => {
            setTimeout(() => {
              console.log('DIALOG IS OPEN', state)
              setJoinGameDialogOpen(state.open)
            }, TIME_OUT_DELAY)
          }}

          openButtonText={t[language]['Join']}
          openButtonColor='orange'
          openButtonDisabled={gameId !== -1 || (tourActive && tourEnabledButton === '') || (tourActive && tourEnabledButton !== 'joinGame')}

          saveButtonText={t[language]['Save']}
          saveButtonCallback={() => joinGameCallback()}
          saveButtonDisabled={!playerName || !pinString}
          
          cancelButtonText={t[language]['Cancel']}

          closeButtonHidden={true}
          overlayCloseDisabled={tourActive}
        />

        <Chakra.Button
          id='destroy-leaveGame'
          onClick={() => {
            if(remoteHasLeft){
              destroyGame()
            } else {
              leaveGame()
            }
          }}
          text={remoteHasLeft ? t[language]['Delete'] : t[language]['Leave']}
          customVariant='red'
          
          disabled={gameId === -1 || gameId === '' || (tourActive && tourEnabledButton === '') || (tourActive && tourEnabledButton !== 'destroy-leaveGame')}
        />

        <Chakra.Button
          id='more'
          onClick={() => setMore(!more)}
          text={<LuChevronRight/>}
          customVariant='grey'

          disabled={(tourActive && tourEnabledButton === '') || (tourActive && tourEnabledButton !== 'more')}
        />
      </>}

      {more && <>
      <Chakra.Button
          id='less'
          onClick={() => setMore(!more)}
          text={<LuChevronLeft/>}
          customVariant='grey'

          disabled={(tourActive && tourEnabledButton === '') || (tourActive && tourEnabledButton !== 'less')}
        />

        <Chakra.Button
          id='welcome'
          onClick={() => {
            setMore(false)
            setControlsDrawerOpen(false)
            setWelcomeDialogOpen(true)
          }}
          text={t[language]['Tour']}
          customVariant='orange'

          disabled={gameId !== -1 || gameId === '' || tourActive}
        />

        <Chakra.Menu
          id='language'
          buttonTitle={<LuLanguages/>}
          buttonDisabled={tourActive}

          items={languageItems}
          onSelect={
            (selectedLangItem: {label: string, value: string,
            disabled: boolean}) => {
              changeLanguage(selectedLangItem)
              setControlsDrawerOpen(false)
            }}
          buttonCustomVariant='green'
        />
      </>}
    </ControlButtonsContainer>
  </>
  )
}
