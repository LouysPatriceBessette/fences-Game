import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLanguage, useTourLoadedLanguage } from '../store/selectors';
import { setTour } from '../store/actions';

import { Tour } from 'nextstepjs';
import { H3, Div1, Divn, AppLoader } from './tour.styled';
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
  const loadedLanguage = useTourLoadedLanguage()
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
            content:  `${t[language]['Game grid body']}`,
            side: 'bottom',
          },
          // 1
          {
            ...baseProps,

            selector: "#tour__controls-drawer--button",
            title: `${t[language]['Controls button']}`,
            content:  `${t[language]['Controls button body']}`,
            side: 'right',

            ...appClick,
          },
          // 2
          {
            ...baseProps,

            selector: "#tour__create-button",
            title: `${t[language]['Create button']}`,
            content: <>
              <H3>{t[language]['Create button h3']}</H3>
              <Div1>{t[language]['Create button div']}</Div1>
            </>,
            side: 'bottom',

            ...appClick,
          },
          // 3
          {
            ...baseProps,

            selector: "#tour__playername-create-container",
            title: `${t[language]['Create player name']}`,
            content: <>
              <H3>{t[language]['Create player name h3']}</H3>
              {/* <Div1>{t[language]['Create player name div']}</Div1> */}
            </>,
            side: 'bottom',
          },
          // 5
          {
            ...baseProps,

            selector: "#tour__grid-create",
            title: `${t[language]['Set the grid']}`,
            content: <>
              <Div1>{t[language]['Set the grid div']}</Div1>
            </>,
            side: 'top',
          },
          // 5
          {
            ...baseProps,

            selector: "#tour__dialog-footer > div:nth-child(2)",
            title: `${t[language]['Save the grid']}`,
            content: <></>,
            side: 'top',
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
          //   side: 'top',
          // },




          // 1
          {
            ...baseProps,

            selector: "#tour__player-1-score",
            title: `${t[language]['Player 1 score']}`,
            content: <>
              <H3>{t[language]['Player 1 score h3']}</H3>
              <Div1>{t[language]['Player 1 score div']}</Div1>
            </>,
            side: 'right',
          },
          // 3
          {
            ...baseProps,

            selector: "#tour__player-2-score",
            title: `${t[language]['Player 2 score']}`,
            content: <>
              <H3>{t[language]['Player 2 score h3']}</H3>
              <Div1>{t[language]['Player 2 score div']}</Div1>
              <Divn>{t[language]['Player 2 score div2']}</Divn>
            </>,
            side: 'left',
          },

          // {
          //    ...baseProps,

          //   selector: "#tour__join-button",
          //   title: "Join",
          //   content: <>
          //     <H3>YEAH</H3>
          //     <div>Join a game here.</div>

          //   </>,
          //   side: 'bottom',
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
          //   side: 'bottom',
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
          //   side: 'bottom',
          // },



        ]
      }
    ]

    setTimeout(() => {
      dispatch(setTour({steps, language}))
    }, 8000)
  }, [dispatch, language])

  return loadedLanguage === '' ? 
    <AppLoader><div className="loader"></div></AppLoader>
    :
    <></>
}
