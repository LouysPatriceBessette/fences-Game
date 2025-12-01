import { Button } from "./game-controls.styled";
import {
  setGameId,
} from '../store/actions';
import {
  useSocketInstance,
  useSocketLocalId,
  useGameId,
} from "../store/selectors";
import { useDispatch } from "react-redux";


export const GameControls = () => {
  const socket = useSocketInstance()
  const socketId = useSocketLocalId()
  const gameId = useGameId()

  const dispatch = useDispatch()

  const createGame = () => {
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
      </Button> : <span>Game ID: {gameId}</span>}
    </div>
  </>
  )
}
