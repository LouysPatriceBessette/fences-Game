import { useState, useEffect, useRef } from "react";
import {
  setGameSize,
  setGameId,
  setNameOfPlayer1,
  setNameOfPlayer2,
} from '../store/actions';
import {
  useLanguage,
  useSocketInstance,
  useSocketLocalId,
  useIamPlayer,
  usePlayer1Name,
  usePlayer2Name,
  useGameId,
  // useSocketRemoteIsOnline,
  useSocketRemoteHasLeft
} from "../store/selectors";
import { useDispatch } from "react-redux";
import { SOCKET_ACTIONS } from "../basics/constants";
import Chakra from "./Chakra";
import { GridContainer, Grid } from './grid-elements'
import { fillGrid } from "./game-grid";
import { DialogGridStyled as DialogGrid, DialogLabelStyled, ControlButtonsContainer } from "./game-controls.styled";

// Translations
import t from "../translations";
import { SupportedLanguagesType } from "../translations/supportedLanguages";

export const GameControls = () => {
  const debugStorage = false

  const fakeRef = useRef(null)

  const language: SupportedLanguagesType = useLanguage()

  const socket = useSocketInstance()
  const socketId = useSocketLocalId()
  const iamPlayer = useIamPlayer()
  const player1Name = usePlayer1Name()
  const player2Name = usePlayer2Name()
  const gameId = useGameId()
  // const remoteIsOnline = useSocketRemoteIsOnline()
  const remoteHasLeft = useSocketRemoteHasLeft()
  const dispatch = useDispatch()

  const [playerName, setPlayerName] = useState('')
  const [x, setX] = useState(3)
  const [y, setY] = useState(3)

  const pinLength = 6
  const [pinString, setPinString] = useState('')

  useEffect(() => {
    (() => setPlayerName(iamPlayer === 1 ? player1Name : player2Name))()

  }, [iamPlayer, player1Name, player2Name])

  const leaveGame = () => {
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
        <GridContainer $waitingForOpponent={true}>
          <Grid $size={((x + 1) * 2) - 1} $waitingForOpponent={true}>
            {fillGrid({x: (x + 1), y: (y + 1)})}
          </Grid>
        </GridContainer>
      </div>
    </DialogGrid>
  </>

  // const myName = localStorage.getItem('myName')
  const createGameCallback = () => {
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
  const joinGameCallback = () => {
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

  console.log('remoteHasLeft', remoteHasLeft)

  return (<>
    {debugStorage && <div>
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
      <Chakra.Dialog
        ref={fakeRef}
        title={t[language]['Create a game']}
        openButtonText={t[language]['Create']}
        openButtonColor='green'
        cancelButtonText={t[language]['Cancel']}
        saveButtonText={t[language]['Save']}
        saveCallback={createGameCallback}
        body={CreateForm}
        disabled={gameId !== -1}
      />

      <Chakra.Dialog
        ref={fakeRef}
        title={t[language]['Join a game']}
        openButtonText={t[language]['Join']}
        openButtonColor='orange'
        cancelButtonText={t[language]['Cancel']}
        saveButtonText={t[language]['Save']}
        saveCallback={joinGameCallback}
        body={JoinForm}
        disabled={gameId !== -1}
      />

      <Chakra.Button
        onClick={remoteHasLeft ? destroyGame : leaveGame}
        text={remoteHasLeft ? t[language]['Delete'] : t[language]['Leave']}
        customVariant='red'
        disabled={gameId === -1 || gameId === ''}
      />
    </ControlButtonsContainer>
  </>
  )
}
