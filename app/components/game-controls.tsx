import { Button } from "./game-controls.styled";
import {
  setGameId,
  setLocalPlayerName,
} from '../store/actions';
import {
  useSocketInstance,
  useSocketLocalId,
  usePlayer1Name,
  usePlayer2Name,
  useGameId,
} from "../store/selectors";
import { useDispatch } from "react-redux";
import { SOCKET_ACTIONS } from "../basics/constants";


export const GameControls = () => {
  const socket = useSocketInstance()
  const socketId = useSocketLocalId()
  const player1Name = usePlayer1Name()
  const player2Name = usePlayer2Name()
  const gameId = useGameId()

  const dispatch = useDispatch()

  const createGame = () => {
    let promptAnswer
    if(player1Name === 'Player 1') {
      promptAnswer = prompt('Enter your name')
      if(!promptAnswer) {
        alert('Name is required to create a game')
        return
      }
      dispatch(setLocalPlayerName(promptAnswer))
      localStorage.setItem('player1Name', promptAnswer)
    }
    const request = {
      from: 'player',
      to: 'server',
      action: SOCKET_ACTIONS.CREATE_GAME,
      socketId: socketId,
      player1Name: promptAnswer,
    }
    socket.emit('message', JSON.stringify(request))
  }

  const joinGame = () => {
    let promptAnswerName
    if(player2Name === 'Player 2') {
      promptAnswerName = prompt('Enter your name')
      if(!promptAnswerName) {
        alert('Name is required to join a game')
        return
      }
      dispatch(setLocalPlayerName(promptAnswerName))
      localStorage.setItem('player2Name', promptAnswerName)
    }
    const promptAnswerGameId = prompt('Enter game id')
    const newGameId = promptAnswerGameId && parseInt(promptAnswerGameId)

    if(newGameId && !isNaN(newGameId) && newGameId > 0) {
      const request = {
        from: 'player',
        to: 'server',
        action: SOCKET_ACTIONS.JOIN_GAME,
        socketId: socketId,
        gameId: newGameId,
        player2Name: promptAnswerName,
      }
      dispatch(setGameId(newGameId))
      socket.emit('message', JSON.stringify(request))
    } else if(promptAnswerGameId !== null) {
      alert('Invalid game id')
    }
  }

  const gameIdString = gameId.toString().slice(0,3) + ' ' + gameId.toString().slice(3,6)

  return (<>
    <div>
      <Button onClick={() => {
        localStorage.clear()
        window.location.reload()
      }}>
        Clear localStorage
      </Button>

      {gameId === -1 ?<Button
        onClick={createGame}
      >
        Create Game
      </Button> : <span>End Game? </span>}

      {gameId === -1 ? <Button
        onClick={joinGame}
      >
        Join Game
      </Button> : <span>Game ID: {gameIdString}</span>}
    </div>
  </>
  )
}
