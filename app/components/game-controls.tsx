import Chackra from "./Chakra";

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
  usePlayer2Name,
  useGameId,
  useSocketRemoteIsOnline,
} from "../store/selectors";
import { useDispatch } from "react-redux";
import { SOCKET_ACTIONS } from "../basics/constants";


export const GameControls = () => {
  const socket = useSocketInstance()
  const socketId = useSocketLocalId()
  const player1Name = usePlayer1Name()
  const player2Name = usePlayer2Name()
  const gameId = useGameId()
  const remoteIsOnline = useSocketRemoteIsOnline()

  const mySocketId = useSocketLocalId()

  const dispatch = useDispatch()

  const createGame = () => {
    const myName = localStorage.getItem('myName')
    let nameToUse
    if(!myName) {
      let promptAnswer1
      if(player1Name === 'Player 1') {
        promptAnswer1 = prompt('Enter your name')
        if(!promptAnswer1) {
          alert('Name is required to create a game')
          return
        }
        nameToUse = promptAnswer1
        dispatch(setNameOfPlayer1(promptAnswer1))
        dispatch(setNameOfPlayer2('Player 2'))

        localStorage.setItem('myName', nameToUse)
        localStorage.setItem('player1Name', nameToUse)
        localStorage.removeItem('player2Name')
      }
    } else {
      nameToUse = myName
      dispatch(setNameOfPlayer1(myName))
    }

    const promptGridSizeX: string = prompt('Enter X') ?? ''
    const promptGridSizeY: string = prompt('Enter Y') ?? ''
    let gridSize = {x: 3, y: 3}

    if(!promptGridSizeX || isNaN(+promptGridSizeX) ||
      !promptGridSizeY || isNaN(+promptGridSizeY)) {
      alert('X and Y numbers are required to create a game')
      return
    } else {
      gridSize = {x: Number(promptGridSizeX), y: Number(promptGridSizeY)}
    }
    dispatch(setGameSize(gridSize))

    const request = {
      from: 'player',
      to: 'server',
      action: SOCKET_ACTIONS.CREATE_GAME,
      socketId: socketId,
      player1Name: nameToUse,
      size: gridSize,
    }
    socket.emit('message', JSON.stringify(request))
  }

  const joinGame = () => {
    const myName = localStorage.getItem('myName')
    let nameToUse
    if(!myName) {
      let promptAnswer1
      if(player2Name === 'Player 2') {
        promptAnswer1 = prompt('Enter your name')
        if(!promptAnswer1) {
          alert('Name is required to join a game')
          return
        }
        nameToUse = promptAnswer1
        dispatch(setNameOfPlayer1('Player 1'))
        dispatch(setNameOfPlayer2(promptAnswer1))

        localStorage.setItem('myName', nameToUse)
        localStorage.removeItem('player1Name')
        localStorage.setItem('player2Name', nameToUse)
      }
    } else {
      nameToUse = myName
      dispatch(setNameOfPlayer2(myName))
    }

    const promptAnswer2 = prompt('Enter game id')
    const newGameId = promptAnswer2 && parseInt(promptAnswer2)

    if(newGameId && !isNaN(newGameId) && newGameId > 0) {
      const request = {
        from: 'player',
        to: 'server',
        action: SOCKET_ACTIONS.JOIN_GAME,
        socketId: socketId,
        gameId: newGameId,
        player2Name: nameToUse,
      }
      dispatch(setGameId(newGameId))
      socket.emit('message', JSON.stringify(request))
    } else if(promptAnswer2 !== null) {
      alert('Invalid game id')
    }
  }

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

  const gameIdString = gameId.toString().slice(0,3) + ' ' + gameId.toString().slice(3,6)

  return (<>
    <div>
      <Chackra.Button
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
      <Chackra.Button
        onClick={createGame}
        text='Create Game'
      />}

      {gameId !== -1 && remoteIsOnline &&
      <Chackra.Button
        onClick={leaveGame}
        text='Leave Game'
      />}

      {gameId !== -1 && !remoteIsOnline &&
      <Chackra.Button
        onClick={destroyGame}
        text='Destroy Game'
      />}

      {gameId === -1 ? <Chackra.Button
        onClick={joinGame}
        text='Join Game'
      /> : <></>}
    </div>
    <div>
      My Socket Id: {mySocketId}
    </div>
    <div>
      Game ID: {gameIdString}
    </div>
  </>
  )
}
