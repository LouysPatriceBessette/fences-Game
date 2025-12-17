import { useEffect } from 'react'
import { useIsLoaded } from '../store/selectors';
import { AppLoaderStyled as AppLoader } from './AppLoader.styled';
import { TourStepsProps } from '../tour/index.types';

// interface Loader extends TourStepsProps{
//   setTourActive: (React.Dispatch<React.SetStateAction<boolean>> | ((arg: number) => void)),
// }
export const Loader = (props: TourStepsProps) => {

  const EDITING_STEPS = false
  const isLoaded = useIsLoaded()

  const {
    setTourActive,

    setControlsDrawerOpen,
    setMore,

    setCreateGameDialogOpen,
    setJoinGameDialogOpen,
    setGameoverDialogOpen,

    setChatDrawerOpen,
  } = props

  useEffect(() => {
    if(window){
      if(!isLoaded){

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
  },[isLoaded])

  useEffect(() => {
    const loadTime_start = performance.now();

    if(!!!isLoaded){
      // This is a bit hacky.
      // We are using existing game states to gather the tour elements rendered positions (used by the arrow).
      // This loop runs only once, on page load, while showing the nice animated loader.

      // Setter execution order
      const setters = [
        {f: setTourActive, s: true},

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

        {f: setTourActive, s: false},

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        {f: (loadTime_start: any) => {
          const loadTime_end = performance.now()
          console.log(`Loaded in ${(Math.round((loadTime_end - loadTime_start)) / 1000)} seconds`)
        }, s: loadTime_start}
      ]

      // Setters names for console.log
      const names = [
        'setTourActive',

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

        'setTourActive',

        'loadtime',
      ]

      if(EDITING_STEPS){
        console.clear()
      }

      // Setters execution loop
      setters.forEach((S,I) => {
        const delay = parseInt(I.toString()) * 800

        setTimeout(() => {

          if(EDITING_STEPS){
            console.log( '==============================================================', S.s ? "Open" : "close", names[parseInt(I.toString())])
          }

          // @ts-expect-error No error here!
          S.f(S.s)

        }, delay)
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return isLoaded ? <></> : <AppLoader><div className="loader"></div></AppLoader>
}