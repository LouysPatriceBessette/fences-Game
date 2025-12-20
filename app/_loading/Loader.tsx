import { useState, useEffect } from 'react'
import { useIsLoading, useLoadedTour, useLanguage } from '../store/selectors';
import { AppLoaderStyled as AppLoader } from './AppLoader.styled';
import { TourStepsProps } from '../tour/index.types';
import t from '../translations/index'

export const Loader = (props: TourStepsProps) => {

  const DEBUG_EDITING_STEPS = Boolean(Number(process.env.NEXT_PUBLIC_DEBUG_EDITING_STEPS));
  const isLoading = useIsLoading()
  const language = useLanguage()

  const {
    tourNumber,

    setControlsDrawerOpen,
    setMore,

    setCreateGameDialogOpen,
    setJoinGameDialogOpen,
    setGameoverDialogOpen,

    setChatDrawerOpen,
  } = props

  const loadedTour = useLoadedTour()
  const [timeouts, setTimeouts] = useState<NodeJS.Timeout[]>([])
  const [loadTime_start, setloadTime_start] = useState<number>(-1)

  if(DEBUG_EDITING_STEPS){
    console.log('in loader', {
      isLoading,
      loadedTour,
      tourNumber,
    })
  }

  // To apply injected style (dur to Chakrs library)
  useEffect(() => {
    if(window){
      if(isLoading && loadedTour === -1){

        const addedStyle = window.document.createElement('style');
        addedStyle.innerHTML = `
          [data-scope="dialog"]{
            opacity: 0;
          }
        `;
        
        window.document.head.appendChild(addedStyle);
      } else {

        const removedStyle = window.document.createElement('style');
        removedStyle.innerHTML = `
          [data-scope="dialog"]{
            opacity: 1;
          }
        `;

        window.document.head.appendChild(removedStyle);
      }
    }
  },[isLoading, loadedTour])

  // Elements position "scan"
  useEffect(() => {

    // Setters execution order
    const setters = [
      {f: setControlsDrawerOpen, s: true},
      
      {f: setCreateGameDialogOpen, s: true},
      {f: setCreateGameDialogOpen, s: false},

      {f: setJoinGameDialogOpen, s: true},
      {f: setJoinGameDialogOpen, s: false}, 

      {f: setMore, s: true},
      {f: setMore, s: false},
      {f: setControlsDrawerOpen, s: false},

      {f: setGameoverDialogOpen, s: true},
      {f: setGameoverDialogOpen, s: false},
      
      {f: setChatDrawerOpen, s: true},
      {f: setChatDrawerOpen, s: false},
    ]

    // Setters names for console.log
    const names = [
      'setControlsDrawerOpen',

      'setCreateGameDialogOpen',
      'setCreateGameDialogOpen',

      'setJoinGameDialogOpen',
      'setJoinGameDialogOpen',

      'setMore',
      'setMore',
      'setControlsDrawerOpen',

      'setGameoverDialogOpen',
      'setGameoverDialogOpen',

      'setChatDrawerOpen',
      'setChatDrawerOpen',
    ]

    if(!timeouts.length && isLoading){

      // Loading a tour.
      // We are using existing game states to gather the tour elements rendered positions (used by the arrow).
      // This loop runs behing the scene, while showing the nice animated loader.
      // It creates a bunch of setTimeout promises, which are store in a state.
      //
      // As soon as we got all positions (based on isLoading), the timeouts are cleared.
      const newTimeouts: NodeJS.Timeout[] = setters.map((S,I) => {

        // To calculate tour load time
        if(I===0){
          setloadTime_start(performance.now());
        }

        const delay = parseInt(I.toString()) * 800

        return setTimeout(() => {
          if(DEBUG_EDITING_STEPS){
            console.log( '==============================================================', S.s ? "Open" : "close", names[parseInt(I.toString())])
          }
          S.f(S.s)
        }, delay)
      })

      // keeping setTimeouts refs in local state.
      setTimeouts(newTimeouts)
    }

    // If not loading (or loading complete)
    if(!isLoading){

      // To show "loaded in x seconds", clear
      const loadTime_end = performance.now()
      console.log(`Loaded in ${(Math.round((loadTime_end - loadTime_start)) / 1000)} seconds`)

      if(DEBUG_EDITING_STEPS){
        console.log('Clearing timeouts')
      }
      timeouts.forEach((t) => clearTimeout(t))
      setTimeouts([])
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading])

  return !isLoading ? <></> : <AppLoader>
    <div>{t[language]['Loading the tour...']}</div>
    <div className="loader"></div>
  </AppLoader>
}