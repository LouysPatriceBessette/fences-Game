import { TourSteps } from "../index.types"
import { useLanguage } from '../../store/selectors'
import {
  setOrigin,
  setUsedFences,
  setUsedFencesP1,
  setUsedFencesP2,
  setCanConnectWith,
  setFencedByP2,
  toggleCurrentPlayer,
} from '../../store/actions'
import { useDispatch } from 'react-redux'

import { TourStepsDataType } from '../../tour/index.types'

import t from '../../translations'

export const TourStepsData = (props: TourStepsDataType) => {
  const language = useLanguage()
  const dispatch = useDispatch()

  const {
    setIsVLine,
    setIsHLine,
    setControlsDrawerOpen,
    setMore,

    setCreateGameDialogOpen,
    setJoinGameDialogOpen,
    setGameoverDialogOpen,

    setChatDrawerOpen,
  } = props
  

  // Grid element selector
  const dot_s = (n :number) => `[data-dot="${n}"]`
  const box_s = (n :number) => `[data-box="${n}"]`
  const vl_s = (n :number) => `[data-vline="${n}"]`
  const hl_s = (n :number) => `[data-hline="${n}"]`

  //
  // Interface tour
  //
  const interfaceSteps: TourSteps[] = [
    // ================================================== Intro 1
    {
      dialog: {
        $visible: true,
        $title: t[language]['Intro 1 title'],
        $description: t[language]['Intro 1 description'],
        $prevCallback: () => {},
        $nextCallback: () => {},
      },
  
      arrow: {
        $visible: true,
        $selector: '#connectedPlayers',
        $direction: 'up',
        $length: 40,
        $distance: 0,
        $scale: 1,
      }
    },

    // ================================================== Intro 2
    {
      dialog: {
        $visible: true,
        $title: t[language]['Intro 2 title'],
        $description: t[language]['Intro 2 description'],
        $prevCallback: () => {},
        $nextCallback: () => {},
      },
  
      arrow: {
        $visible: false,
        $selector: '#connectedPlayers',
        $direction: 'up',
        $length: 40,
        $distance: 0,
        $scale: 1,
      }
    },

    // ================================================== Intro 3
    {
      dialog: {
        $visible: true,
        $title: t[language]['Intro 3 title'],
        $description: t[language]['Intro 3 description'],
        $prevCallback: () => {},
        $nextCallback: () => {},
      },
  
      arrow: {
        $visible: false,
        $selector: '#connectedPlayers',
        $direction: 'up',
        $length: 40,
        $distance: 0,
        $scale: 1,
      }
    },

    // ================================================== Player 1 name
    {
      dialog: {
        $visible: true,
        $title: t[language]['Player 1 name title'],
        $description: t[language]['Player 1 name description'],
        $prevCallback: () => {},
        $nextCallback: () => {},
      },
  
      arrow: {
        $visible: true,
        $selector: '#player1Name',
        $direction: 'left',
        $length: 40,
        $distance: 10,
        $scale: 1,
      }
    },

    // ================================================== Player 1 score
    {
      dialog: {
        $visible: true,
        $title: t[language]['Player 1 score title'],
        $description: t[language]['Player 1 score description'],
        $prevCallback: () => {},
        $nextCallback: () => {},
      },
  
      arrow: {
        $visible: true,
        $selector: '#player1Score',
        $direction: 'left',
        $length: 40,
        $distance: 0,
        $scale: 1,
      }
    },

    // ================================================== Player 2 name
    {
      dialog: {
        $visible: true,
        $title: t[language]['Player 2 name title'],
        $description: t[language]['Player 2 name description'],
        $prevCallback: () => {},
        $nextCallback: () => {},
      },
  
      arrow: {
        $visible: true,
        $selector: '#player2Name',
        $direction: 'right',
        $length: 40,
        $distance: 10,
        $scale: 1,
      }
    },

    // ================================================== Player 2 score
    {
      dialog: {
        $visible: true,
        $title: t[language]['Player 2 score title'],
        $description: t[language]['Player 2 score description'],
        $prevCallback: () => {},
        $nextCallback: () => {},
      },
  
      arrow: {
        $visible: true,
        $selector: '#player2Score',
        $direction: 'right',
        $length: 40,
        $distance: 0,
        $scale: 1,
      }
    },

    // ================================================== Play Grid
    {
      dialog: {
        $visible: true,
        $title: t[language]['Play grid title'],
        $description: t[language]['Play grid description'],
        $definedPosition: 'A2',
        $prevCallback: () => {},
        $nextCallback: () => {},
      },
  
      arrow: {
        $visible: true,
        $selector: '#playGrid',
        $direction: 'up',
        $length: 40,
        $distance: 0,
        $scale: 1,
      }
    },

    // ================================================== Controls drawer button
    {
      dialog: {
        $visible: true,
        $title: t[language]['Controls drawer button title'],
        $description: t[language]['Controls drawer button description'],
        $prevCallback: () => {},
        $nextCallback: () => { setControlsDrawerOpen(true) },
      },
  
      arrow: {
        $visible: true,
        $selector: '#controls-button',
        $direction: 'left',
        $length: 40,
        $distance: 0,
        $scale: 1,
      }
    },

    // ================================================== Create game button (Controls drawer is opened)
    {
      dialog: {
        $visible: true,
        $title: t[language]['Create game title'],
        $description: t[language]['Create game description'],
        $prevCallback: () => { setControlsDrawerOpen(false) },
        $nextCallback: () => { setCreateGameDialogOpen(true) },
      },
  
      arrow: {
        $visible: true,
        $selector: '#createGame',
        $direction: 'up',
        $length: 40,
        $distance: 12,
        $scale: 1,
      }
    },

    // ================================================== Create input
    {
      dialog: {
        $visible: true,
        $title: t[language]['Create name input title'],
        $description: t[language]['Create name input description'],
        $prevCallback: () => { setCreateGameDialogOpen (false) },
        $nextCallback: () => {},
      },
  
      arrow: {
        $visible: true,
        $selector: '#create-input',
        $direction: 'down',
        $length: 40,
        $distance: 0,
        $scale: 1,
      }
    },

    // ================================================== Create game grid
    {
      dialog: {
        $visible: true,
        $title: t[language]['Create game grid title'],
        $description: t[language]['Create game grid description'],
        $definedPosition: 'C2',
        $prevCallback: () => {},
        $nextCallback: () => { setCreateGameDialogOpen(false) },
      },
  
      arrow: {
        $visible: true,
        $selector: '#create-game-grid',
        $direction: 'down',
        $length: 40,
        $distance: 0,
        $scale: 1,
      }
    },

    // ================================================== Join game button
    {
      dialog: {
        $visible: true,
        $title: t[language]['Join game title'],
        $description: t[language]['Join game description'],
        $prevCallback: () => { setCreateGameDialogOpen(true) },
        $nextCallback: () => { setJoinGameDialogOpen(true) },
      },
  
      arrow: {
        $visible: true,
        $selector: '#joinGame',
        $direction: 'up',
        $length: 40,
        $distance: 12,
        $scale: 1,
      }
    },

    // ================================================== Join input
    {
      dialog: {
        $visible: true,
        $title: t[language]['Join game input title'],
        $description: t[language]['Join game input description'],
        $prevCallback: () => { setJoinGameDialogOpen(false) },
        $nextCallback: () => {},
      },
  
      arrow: {
        $visible: true,
        $selector: '#join-input',
        $direction: 'down',
        $length: 40,
        $distance: 0,
        $scale: 1,
      }
    },

    // ================================================== Join Pin (game number)
    {
      dialog: {
        $visible: true,
        $title: t[language]['Join game pin title'],
        $description: t[language]['Join game pin description'],
        $definedPosition: 'C2',
        $prevCallback: () => {},
        $nextCallback: () => { setJoinGameDialogOpen(false)},
      },
  
      arrow: {
        $visible: true,
        $selector: '#join-pin',
        $direction: 'down',
        $length: 40,
        $distance: 0,
        $scale: 1,
      }
    },

    // ================================================== Leave/Delete
    {
      dialog: {
        $visible: true,
        $title: t[language]['Leave/Delete game title'],
        $description: t[language]['Leave/Delete game description'],
        $prevCallback: () => { setJoinGameDialogOpen(true) },
        $nextCallback: () => {},
      },
  
      arrow: {
        $visible: true,
        $selector: '#leaveDeleteGame',
        $direction: 'up',
        $length: 40,
        $distance: 12,
        $scale: 1,
      }
    },

    // ================================================== More
    {
      dialog: {
        $visible: true,
        $title: t[language]['More title'],
        $description: t[language]['More description'],
        $prevCallback: () => {},
        $nextCallback: () => { setMore(true) },
      },
  
      arrow: {
        $visible: true,
        $selector: '#more',
        $direction: 'up',
        $length: 40,
        $distance: 12,
        $scale: 1,
      }
    },

    // ================================================== Less
    {
      dialog: {
        $visible: true,
        $title: t[language]['Less title'],
        $description:t[language]['Less description'],
        $prevCallback: () => { setMore(false) },
        $nextCallback: () => {},
      },
  
      arrow: {
        $visible: true,
        $selector: '#less',
        $direction: 'up',
        $length: 40,
        $distance: 12,
        $scale: 1,
      }
    },

    // ================================================== Tour button in controls
    {
      dialog: {
        $visible: true,
        $title: t[language]['Tour title'],
        $description: t[language]['Tour description'],
        $prevCallback: () => {},
        $nextCallback: () => {},
      },
  
      arrow: {
        $visible: true,
        $selector: '#welcome',
        $direction: 'up',
        $length: 40,
        $distance: 12,
        $scale: 1,
      }
    },

    // ================================================== Language
    {
      dialog: {
        $visible: true,
        $title: t[language]['Language title'],
        $description: t[language]['Language description'],
        $prevCallback: () => {},
        $nextCallback: () => { setMore(false); setControlsDrawerOpen(false) },
      },

      arrow: {
        $visible: true,
        $selector: '#language',
        $direction: 'up',
        $length: 40,
        $distance: 12,
        $scale: 1,
      }
    },

    // ================================================== Chat button
    {
      dialog: {
        $visible: true,
        $title: t[language]['Chat title'],
        $description: t[language]['Chat description'],
        $prevCallback: () => { setMore(true); setControlsDrawerOpen(true) },
        $nextCallback: () => { setChatDrawerOpen(true) },
      },
  
      arrow: {
        $visible: true,
        $selector: '#chat-button',
        $direction: 'right',
        $length: 40,
        $distance: 0,
        $scale: 1,
      }
    },

    // ================================================== Chat drawer
    {
      dialog: {
        $visible: true,
        $title: t[language]['Chat drawer title'],
        $description: t[language]['Chat drawer description'],
        $definedPosition: 'A2',
        $prevCallback: () => { setChatDrawerOpen(false) },
        $nextCallback: () => {},
      },
  
      arrow: {
        $visible: true,
        $selector: '#chat-drawer-title',
        $direction: 'down',
        $length: 40,
        $distance: 30,
        $scale: 1,
      }
    },

    // ================================================== Chat messages
    {
      dialog: {
        $visible: true,
        $title: t[language]['Chat messages title'],
        $description: t[language]['Chat messages description'],
        $prevCallback: () => {},
        $nextCallback: () => {},
      },
  
      arrow: {
        $visible: true,
        $selector: '#chat-messages',
        $direction: 'down',
        $length: 40,
        $distance: 0,
        $scale: 1,
      }
    },

    // ================================================== Chat input
    {
      dialog: {
        $visible: true,
        $title: t[language]['Chat input title'],
        $description: t[language]['Chat input description'],
        $prevCallback: () => {},
        $nextCallback: () => { setChatDrawerOpen(false); setGameoverDialogOpen(true) },
      },
  
      arrow: {
        $visible: true,
        $selector: '#chat-input',
        $direction: 'down',
        $length: 40,
        $distance: 0,
        $scale: 1,
      }
    },

    // ================================================== Game over
    {
      dialog: {
        $visible: true,
        $title: t[language]['Game over title'],
        $description: t[language]['Game over description'],
        $definedPosition: 'C2',
        $prevCallback: () => { setChatDrawerOpen(true); setGameoverDialogOpen(false) },
        $nextCallback: () => {},
      },
  
      arrow: {
        $visible: true,
        $selector: '#gameover-body',
        $direction: 'up',
        $length: 40,
        $distance: 110,
        $scale: 1,
      }
    },
  ]

  //
  // How to play tour
  //
  const playSteps: TourSteps[] = [
    // ================================================== Intro 1
    {
      dialog: {
        $visible: true,
        $title: t[language]['Start play tour title'],
        $description: t[language]['Start play tour description'],
        $prevCallback: () => {},
        $nextCallback: () => {
          dispatch(toggleCurrentPlayer(1))
        },
      },
  
      arrow: {
        $visible: false,
        $selector: '#gameId',
        $direction: 'down',
        $length: 40,
        $distance: 0,
        $scale: 1,
      }
    },
    {
      dialog: {
        $visible: true,
        $title: t[language]['Simulated game start title'],
        $description: t[language]['Simulated game start description'],
        $prevCallback: () => {},
        $nextCallback: () => {},
      },
  
      arrow: {
        $visible: true,
        $selector: '#gameId',
        $direction: 'up',
        $length: 40,
        $distance: 0,
        $scale: 1,
      }
    },
    {
      dialog: {
        $visible: true,
        $title: t[language]['Simulated game move #1 title'],
        $description: t[language]['Simulated game move #1 description'],
        $prevCallback: () => {},
        $nextCallback: () => {},
      },
  
      arrow: {
        $visible: true,
        $selector: '#player1Name',
        $direction: 'left',
        $length: 40,
        $distance: 0,
        $scale: 1,
      }
    },
    {
      dialog: {
        $visible: true,
        $title: t[language]['Simulated game move #2 title'],
        $description: t[language]['Simulated game move #2 description'],
        $prevCallback: () => {},
        $nextCallback: () => {},
      },
  
      arrow: {
        $visible: true,
        $selector: '#player2Name',
        $direction: 'right',
        $length: 40,
        $distance: 0,
        $scale: 1,
      }
    },
    {
      dialog: {
        $visible: true,
        $title: t[language]['Simulated game move #3 title'],
        $description: t[language]['Simulated game move #3 description'],
        $prevCallback: () => {},
        $nextCallback: () => {},
      },
  
      arrow: {
        $visible: true,
        $selector: '#currentTurn',
        $direction: 'down',
        $length: 40,
        $distance: -60,
        $scale: 1,
      }
    },

    // Player 1 turn Start 
    {
      dialog: {
        $visible: true,
        $title: t[language]['Simulated game move #4 title'],
        $description: t[language]['Simulated game move #4 description'],
        $definedPosition: 'C2',
        $prevCallback: () => {},
        $nextCallback: () => {
          dispatch(setCanConnectWith([2,4]))
          dispatch(setOrigin(1))
        },
      },
  
      arrow: {
        $visible: true,
        $selector: '#playGrid',
        $direction: 'down',
        $length: 40,
        $distance: 0,
        $scale: 1,
      }
    },

    // Player 1 turn 1 First click
    {
      dialog: {
        $visible: true,
        $title: t[language]['Simulated game move #5 title'],
        $description: t[language]['Simulated game move #5 description'],
        $definedPosition: 'C2',
        $prevCallback: () => {},
        $nextCallback: () => {},
      },
  
      arrow: {
        $visible: true,
        $selector: dot_s(1),
        $direction: 'diag',
        $length: 40,
        $distance: 0,
        $scale: 1,
      }
    },

    // Player 1 turn 1 Second click
    {
      dialog: {
        $visible: true,
        $title: t[language]['Simulated game move #6 title'],
        $description: t[language]['Simulated game move #6 description'],
        $definedPosition: 'C2',
        $prevCallback: () => {},
        $nextCallback: () => {
          dispatch(toggleCurrentPlayer(2))
          dispatch(setUsedFences('H-1'))
          dispatch(setUsedFencesP1('H-1'))
          dispatch(setOrigin(-1))
          setIsHLine(true)
        },
      },
  
      arrow: {
        $visible: true,
        $selector: dot_s(2),
        $direction: 'diag',
        $length: 40,
        $distance: 0,
        $scale: 1,
      }
    },

    // Player 1 turn 1 DONE (showing line)
    {
      dialog: {
        $visible: true,
        $title: t[language]['Simulated game move #7 title'],
        $description: t[language]['Simulated game move #7 description'],
        $definedPosition: 'C2',
        $prevCallback: () => {
          setIsHLine(false)
        },
        $nextCallback: () => {
          setIsHLine(false)
          setIsVLine(true)
          dispatch(setUsedFences('V-2'))
          dispatch(setUsedFencesP2('V-2'))
          dispatch(toggleCurrentPlayer(1))
        },
      },
  
      arrow: {
        $visible: true,
        $selector: hl_s(1),
        $direction: 'diag',
        $length: 40,
        $distance: 0,
        $scale: 1,
      }
    },

    // Player 2 turn 2 DONE (showing line)
    {
      dialog: {
        $visible: true,
        $title: t[language]['Simulated game move #8 title'],
        $description: t[language]['Simulated game move #8 description'],
        $definedPosition: 'C2',
        $prevCallback: () => {
          setIsVLine(false)
        },
        $nextCallback: () => {
          dispatch(toggleCurrentPlayer(1))
          dispatch(setCanConnectWith([1,5,7]))
          dispatch(setOrigin(4))
          setIsVLine(false)
        },
      },
  
      arrow: {
        $visible: true,
        $selector: vl_s(2),
        $direction: 'diag',
        $length: 40,
        $distance: 0,
        $scale: 1,
      }
    },

    // Player 1 turn 3 First click
    {
      dialog: {
        $visible: true,
        $title: t[language]['Simulated game move #9 title'],
        $description: t[language]['Simulated game move #9 description'],
        $definedPosition: 'C2',
        $prevCallback: () => {},
        $nextCallback: () => {},
      },
  
      arrow: {
        $visible: true,
        $selector: dot_s(4),
        $direction: 'diag',
        $length: 40,
        $distance: 0,
        $scale: 1,
      }
    },
    
    // Player 1 turn 3 Second click
    {
      dialog: {
        $visible: true,
        $title: t[language]['Simulated game move #10 title'],
        $description: t[language]['Simulated game move #10 description'],
        $definedPosition: 'C2',
        $prevCallback: () => {},
        $nextCallback: () => {
          dispatch(setUsedFences('V-1'))
          dispatch(setUsedFencesP1('V-1'))
          
          setIsVLine(true)
          dispatch(setOrigin(-1))
          dispatch(toggleCurrentPlayer(2))
        },
      },
  
      arrow: {
        $visible: true,
        $selector: dot_s(1),
        $direction: 'diag',
        $length: 40,
        $distance: 0,
        $scale: 1,
      }
    },

    // Player 1 turn 3 done (showing line)
    {
      dialog: {
        $visible: true,
        $title: t[language]['Simulated game move #11 title'],
        $description: t[language]['Simulated game move #11 description'],
        $definedPosition: 'C2',
        $prevCallback: () => {
          setIsVLine(false)
        },
        $nextCallback: () => {
          setIsVLine(false)
          setIsHLine(true)
          dispatch(setUsedFences('H-4'))
          dispatch(setUsedFencesP2('H-4'))
          dispatch(setFencedByP2(1))
        },
      },
  
      arrow: {
        $visible: true,
        $selector: vl_s(1),
        $direction: 'diag',
        $length: 40,
        $distance: 0,
        $scale: 1,
      }
    },

    // Player 2 turn 4 done (showing line)
    {
      dialog: {
        $visible: true,
        $title: t[language]['Simulated game move #12 title'],
        $description: t[language]['Simulated game move #12 description'],
        $definedPosition: 'C2',
        $prevCallback: () => {
          setIsHLine(false)
        },
        $nextCallback: () => {},
      },
  
      arrow: {
        $visible: true,
        $selector: hl_s(4),
        $direction: 'diag',
        $length: 40,
        $distance: 0,
        $scale: 1,
      }
    },

    // EXPLANATIONS
    {
      dialog: {
        $visible: true,
        $title: t[language]['Simulated game move #13 title'],
        $description: t[language]['Simulated game move #13 description'],
        $definedPosition: 'C2',
        $prevCallback: () => {},
        $nextCallback: () => {},
      },
  
      arrow: {
        $visible: true,
        $selector: box_s(1),
        $direction: 'right',
        $length: 40,
        $distance: 0,
        $scale: 1,
      }
    },
    {
      dialog: {
        $visible: true,
        $title: t[language]['Simulated game move #14 title'],
        $description: t[language]['Simulated game move #14 description'],
        $definedPosition: 'C2',
        $prevCallback: () => {},
        $nextCallback: () => {},
      },
  
      arrow: {
        $visible: true,
        $selector: '#currentTurn',
        $direction: 'down',
        $length: 40,
        $distance: -60,
        $scale: 1,
      }
    },
    {
      dialog: {
        $visible: true,
        $title: t[language]['Simulated game move #15 title'],
        $description: t[language]['Simulated game move #15 description'],
        $definedPosition: 'C2',
        $prevCallback: () => {},
        $nextCallback: () => {

        },
      },
  
      arrow: {
        $visible: false,
        $selector: '',
        $direction: 'diag',
        $length: 40,
        $distance: 0,
        $scale: 1,
      }
    },
  ]

  return [interfaceSteps, playSteps]
}