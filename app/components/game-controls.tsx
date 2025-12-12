import { useState } from "react";
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
  buttonIds,
  setWelcomeDialogOpen,
  setCreateGameDialogOpen,
  setJoinGameDialogOpen,
  setControlsDrawerOpen,
}: {
  buttonIds: string[],
  setWelcomeDialogOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setCreateGameDialogOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setJoinGameDialogOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setControlsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const DEBUG_LOCAL_STORAGE = Boolean(Number(process.env.DEBUG_LOCAL_STORAGE))

  const language: SupportedLanguagesType = useLanguage()

  const socket = useSocketInstance()
  const socketId = useSocketLocalId()
  const gameId = useGameId()
  const remoteHasLeft = useSocketRemoteHasLeft()
  const dispatch = useDispatch()

  const [playerName, setPlayerName] = useState(localStorage.getItem('myName') || '')
  const [x, setX] = useState(3)
  const [y, setY] = useState(3)

  const pinLength = 6
  const [pinString, setPinString] = useState('')

  const [more, setMore] = useState(false)

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
      id='tour__playername-create'
      label={t[language]['Your name']}
      placeholder={t[language]['Your name']}
      value={playerName}
      setValue={setPlayerName}
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
        <GridContainer $waitingForOpponent={true} id='tour__grid-create'>
          <Grid $size={((x + 1) * 2) - 1} $waitingForOpponent={true}>
            {fillGrid({x: (x + 1), y: (y + 1)})}
          </Grid>
        </GridContainer>
      </div>
    </DialogGrid>
  </>

  // const myName = localStorage.getItem('myName')

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
      label={t[language]['Your name']}
      placeholder={t[language]['Your name']}
      minLength={1}
      value={playerName}
      setValue={setPlayerName}
    />

    <DialogLabelStyled>{t[language]['Game number']}</DialogLabelStyled>

    <Chakra.PinInput
      pinLength={pinLength}
      getPin={setPinString}
      lastPin={localStorage.getItem('LastGameNumberUsed') ?? ''}
    />
  </>

  // const myName = localStorage.getItem('myName')

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
          id={buttonIds[0]}

          title={t[language]['Create a game']}
          body={CreateForm}

          onOpenChange={(state: {open:boolean}) => {
            setTimeout(() => {
              console.log('DIALOG IS OPEN', state)
              setCreateGameDialogOpen(state.open)
            }, TIME_OUT_DELAY)
          }}

          openButtonText={t[language]['Create']}
          openButtonColor='green'
          openButtonDisabled={gameId !== -1}

          saveButtonText={t[language]['Save']}
          saveButtonCallback={() => createGameCallback()}
          saveButtonDisabled={!playerName}

          cancelButtonText={t[language]['Cancel']}
          
          closeButtonHidden={true}
          overlayCloseDisabled={true}
        />

        <Chakra.Dialog
          id={buttonIds[1]}

          title={t[language]['Join a game']}
          body={JoinForm}

          onOpenChange={(state: {open:boolean}) => {
            setTimeout(() => {
              console.log('DIALOG IS OPEN', state)
              setCreateGameDialogOpen(state.open)
            }, TIME_OUT_DELAY)
          }}

          openButtonText={t[language]['Join']}
          openButtonColor='orange'
          openButtonDisabled={gameId !== -1}

          saveButtonText={t[language]['Save']}
          saveButtonCallback={() => joinGameCallback()}
          saveButtonDisabled={!playerName || !pinString}
          
          cancelButtonText={t[language]['Cancel']}

          closeButtonHidden={true}
          overlayCloseDisabled={true}
        />

        <Chakra.Button
          id={buttonIds[2]}
          onClick={() => {
            if(remoteHasLeft){
              destroyGame()
            } else {
              leaveGame()
            }
          }}
          text={remoteHasLeft ? t[language]['Delete'] : t[language]['Leave']}
          customVariant='red'
          disabled={gameId === -1 || gameId === ''}
        />

        <Chakra.Button
          id={buttonIds[3]}
          onClick={() => setMore(!more)}
          text={<LuChevronRight/>}
          customVariant='grey'
        />
      </>}

      {more && <>
      <Chakra.Button
          onClick={() => setMore(!more)}
          text={<LuChevronLeft/>}
          customVariant='grey'
        />

        <Chakra.Button
          onClick={() => setWelcomeDialogOpen(true)}
          text={t[language]['Tour']}
          customVariant='orange'
          disabled={gameId !== -1 || gameId === ''}
        />

        <Chakra.Menu
          buttonTitle={<LuLanguages/>}
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
