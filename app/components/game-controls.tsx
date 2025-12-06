import { useState } from "react";
import {
  setGameSize,
  setGameId,
  setNameOfPlayer1,
  setNameOfPlayer2,
} from '../store/actions';
import {
  useSocketInstance,
  useSocketLocalId,
  usePlayer1Name,
  useGameId,
  useSocketRemoteIsOnline,
} from "../store/selectors";
import { useDispatch } from "react-redux";
import { SOCKET_ACTIONS } from "../basics/constants";
import Chakra from "./Chakra";
import { GridContainer, Grid } from './grid-elements'
import { fillGrid } from "./game-grid";
import { DialogGridStyled as DialogGrid, DialogLabelStyled } from "./game-controls.styled";

export const GameControls = () => {
  const socket = useSocketInstance()
  const socketId = useSocketLocalId()
  const player1Name = usePlayer1Name()
  const gameId = useGameId()
  const remoteIsOnline = useSocketRemoteIsOnline()
  const dispatch = useDispatch()

  const [playerName, setPlayerName] = useState(player1Name)
  const [x, setX] = useState(3)
  const [y, setY] = useState(3)

  const pinLength = 6
  const [pinString, setPinString] = useState('')

  const leaveGame = () => {
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
      label='Your name'
      placeholder='Your name'
      value={playerName}
      setValue={setPlayerName}
    />

    <DialogLabelStyled>Dimentions: {x} x {y}</DialogLabelStyled>

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
    const gridSize = {x, y}

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
      label='Your name'
      placeholder='Your name'
      value={playerName}
      setValue={setPlayerName}
    />

    <DialogLabelStyled>Game number</DialogLabelStyled>

    <Chakra.PinInput
      pinLength={pinLength}
      getPin={setPinString}
      lastPin={localStorage.getItem('LastGameNumberUsed') ?? ''}
    />
  </>

  // const myName = localStorage.getItem('myName')
  const joinGameCallback = () => {
    const gameNumber = Number(pinString)

    dispatch(setNameOfPlayer1('Player 1'))
    dispatch(setNameOfPlayer2(playerName))
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

  return (<>
    <div>
      <Chakra.Button
        onClick={() => {
          localStorage.clear()
          localStorage.removeItem('gameId')
          localStorage.removeItem('socketId')
          window.location.reload()
        }}
        text='Clear localStorage'
      />
    </div>
    
    <div>
      {gameId === -1  &&
        <Chakra.Dialog
          size='md'
          title='Create a game'
          openButtonText='Create game'
          openButtonColor='green'
          cancelButtonText='Cancel'
          saveButtonText='Save'
          saveCallback={createGameCallback}
          body={CreateForm}
        />
      }

      {gameId === -1 && <Chakra.Dialog
          size='md'
          title='Join a game'
          openButtonText='Join game'
          openButtonColor='orange'
          cancelButtonText='Cancel'
          saveButtonText='Save'
          saveCallback={joinGameCallback}
          body={JoinForm}
        />}

      {gameId !== -1 && remoteIsOnline &&
      <Chakra.Button
        onClick={leaveGame}
        text='Leave Game'
      />}

      {gameId !== -1 && !remoteIsOnline &&
      <Chakra.Button
        onClick={destroyGame}
        text='Destroy Game'
      />}
    </div>
  </>
  )
}
