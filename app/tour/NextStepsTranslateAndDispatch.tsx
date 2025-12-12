import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLanguage } from '../store/selectors';
import { setTour } from '../store/actions';

import { Tour } from 'nextstepjs';
import { H3, AppLoader } from './tour.styled';
import t from '../translations';

const baseProps = {
  icon: "🚀",
  showControls: true,
  showSkip: true,
  pointerPadding: 8,
  pointerRadius: 5,
}

const appClick = {
  showControls: false,
  showSkip: false,
}

export const NextStepsTranslateAndDispatch = () =>{

  const language = useLanguage()
  const dispatch = useDispatch()

  useEffect(()=> {

    const steps : Tour[] = [
      {
        tour: "INSTRUCTIONS_START",
        steps: [

          // 0
          {
            ...baseProps,

            selector: "#tour__gameg-grid",
            title: `${t[language]['Game grid']}`,
            content: "Here is the game grid!",
            side:'top',

            // ...appClick
          },
          // 1
          {
            ...baseProps,

            selector: "#tour__player-1-score",
            title: "Score",
            content: "Your points will be displayed here",
            side:'right',
          },
          // 3
          {
            ...baseProps,

            selector: "#tour__player-2-score",
            title: "Score",
            content: "Your opponent's points will be displayed here",
            side:'left',
          },
          // 4
          {
            ...baseProps,

            selector: "#tour__controls-drawer--button",
            title: "Controls",
            content: "Click here please...",
            side:'right',

            ...appClick,
          },
          // 5
          {
            ...baseProps,

            selector: "#tour__create-button",
            title: "Create",
            content: <>
              <H3>YEAH - CREATE BTN</H3>
              <div>Create a game here.</div>
            </>,
            side:'bottom',

            ...appClick,
          },
          // 6
          {
            ...baseProps,

            selector: "#tour__playername-create-container",
            title: "Your fuckin name",
            content: <>
              <H3>YEAH</H3>
              <div>DESTROY!!!.</div>

            </>,
            side:'bottom',
          },





          // 0
          // {
          //   ...baseProps,

          //   selector: "#tour__online-players",
          //   title: "Welcome",
          //   content: <>
          //     <H3>I will show you how to play.</H3>
          //     <div>This is the number of persons currently on the site.</div>
          //     <div>They are not connected to your game...</div>
          //   </>,
          //   side:'top',
          // },


          // {
          //    ...baseProps,

          //   selector: "#tour__join-button",
          //   title: "Join",
          //   content: <>
          //     <H3>YEAH</H3>
          //     <div>Join a game here.</div>

          //   </>,
          //   side:'bottom',
          // },
          // {
          //    ...baseProps,

          //   selector: "#tour__leave-delete-button",
          //   icon: "🚀",
          //   title: "Leave",
          //   content: <>
          //     <H3>YEAH</H3>
          //     <div>Leave a game here.</div>

          //   </>,
          //   side:'bottom',
          // },
          // {
          //    ...baseProps,

          //   selector: "#tour__more-controls-button",
          //   icon: "🚀",
          //   title: "More",
          //   content: <>
          //     <H3>YEAH</H3>
          //     <div>More controls here.</div>

          //   </>,
          //   side:'bottom',
          // },



        ]
      }
    ]

    setTimeout(() => {
      dispatch(setTour(steps))
    }, 8000)
  }, [dispatch, language])

  return <AppLoader>
    <div className="loader"></div>
  </AppLoader>
}
