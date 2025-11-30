import { GridContainer, GridOverlay, Grid, Square, Dot, Vline, Hline } from "./grid-elements";
import {
  useSize,
  useCurrentPlayer,
  useIamPlayer,
} from "../store/selectors";

export const GameGrid = () => {
  const size = useSize()
  const gridSize = (size * 2)
  const currentPlayer = useCurrentPlayer()
  const iamPlayer = useIamPlayer()
  
  const dot = (key: number, id: number) => <Dot
    key={key}
    identifier={id}
  />

  const hline = (key: number, id: number) => <Hline
    key={key}
    identifier={id}
  />

  const vline = (key: number, id: number) => <Vline
    key={key}
    identifier={id}
  />

  const square = (key: number, id: number) => <Square
    key={key}
    identifier={id}
  />


  const fillGrid = (gridSize: number) => {

    const cells = Array(gridSize * gridSize - (gridSize * 2) + 1).fill(0)

    const oddRowwSeq = ['D', 'H']
    const evenRowSeq = ['S', 'V']
    const SEQ = [oddRowwSeq, evenRowSeq]
    
    let useSeq = SEQ[0]

    let dCount = 2
    let vCount = 1
    let hCount = 1
    let sCount = 0.5

    // Fill the grid
    cells[0] = dot(0, 1)
    for (let i = 1; i<cells.length; i++){

      // Toggle Pattern
      const Toggle = (i) % ((gridSize - 1) * 1) === 0
      if(Toggle){
        useSeq = useSeq === SEQ[0] ? SEQ[1] : SEQ[0]
        hCount += 0.5
        sCount += 0.5
      }

      let component
      if(i % 2 === 0){
        component = useSeq[0]
      } else {
        component = useSeq[1]
      }

      // Use the right component
      switch (component) {
        case 'D':
          cells[i] = dot(i, dCount)
          dCount++
          break;
        case 'H':
          cells[i] = hline(i, hCount)
          hCount++
          break;
        case 'V':
          cells[i] = vline(i, vCount)
          vCount++
          break;
        case 'S':
          cells[i] = square(i, sCount)
          sCount++
          break;
      }
    }

    return cells
  }

  const waitingForOpponent = currentPlayer !== iamPlayer
  return (
    <GridContainer $waitingForOpponent={waitingForOpponent}>
      <GridOverlay $waitingForOpponent={waitingForOpponent}>Awaiting opponent&apos;s move</GridOverlay>
    <Grid $size={gridSize - 1} $waitingForOpponent={waitingForOpponent}>
      {fillGrid(gridSize)}
    </Grid>
    </GridContainer>
  );
}