import { Button } from "./game-controls.styled";
import {
  setGameId,
  setPlayer1Name,
} from '../store/actions';
import {
  useSocketInstance,
  useSocketLocalId,
  usePlayer1Name,
  useGameId,
} from "../store/selectors";
import { useDispatch } from "react-redux";


export const GameControls = () => {
  const socket = useSocketInstance()
  const socketId = useSocketLocalId()
  const player1Name = usePlayer1Name()
  const gameId = useGameId()

  const dispatch = useDispatch()

  const createGame = () => {
    let promptAnswer
    if(!(player1Name === 'Player 1' ? '' : player1Name)) {
      promptAnswer = prompt('Enter your name')
    }

    if(!promptAnswer) {
      alert('Name is required to create a game')
      return
    }
    dispatch(setPlayer1Name(promptAnswer))
    localStorage.setItem('player1Name', promptAnswer)
    const request = {
      from: 'player',
      to: 'server',
      action: 'create-game',
      socketId: socketId,
    }
    socket.emit('message', JSON.stringify(request))
  }

  const joinGame = () => {
    const promptAnswer = prompt('Enter game id')
    const newGameId = promptAnswer && parseInt(promptAnswer)

    if(newGameId && !isNaN(newGameId) && newGameId > 0) {
      const request = {
        from: 'player',
        to: 'server',
        action: 'join-game',
        socketId: socketId,
        gameId: newGameId
      }
      dispatch(setGameId(newGameId))
      socket.emit('message', JSON.stringify(request))
    } else if(promptAnswer !== null) {
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
