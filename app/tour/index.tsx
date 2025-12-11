import { Tour } from 'nextstepjs';
import { H3 } from './tour.styled';

const baseProps = {
  icon: "🚀",
  showControls: true,
  showSkip: true,
  pointerPadding: 8,
  pointerRadius: 5,
}

export const steps : Tour[] = [
  {
    tour: "INSTRUCTIONS_START",
    steps: [
      {
        ...baseProps,

        selector: "#tour__online-players",
        title: "Welcome",
        content: <>
          <H3>I will show you how to play.</H3>
          <div>This is the number of persons currently on the site.</div>
          <div>They are not connected to your game...</div>
        </>,
        side:'top',
      },
      {
        ...baseProps,

        selector: "#tour__gameg-grid",
        title: "Game grid",
        content: "Here is the game grid!",
        side:'top',
      },
      {
        ...baseProps,

        selector: "#tour__player-1-score",
        title: "Score",
        content: "Your points will be displayed here",
        side:'right',
      },
      {
        ...baseProps,

        selector: "#tour__player-2-score",
        title: "Score",
        content: "Your opponent's points will be displayed here",
        side:'left',
      },
      {
        ...baseProps,

        selector: "#tour__controls-drawer--button",
        title: "Controls",
        content: "Click here please...",
        side:'right',

        // BaseProps over-ride
        showControls: false,
        showSkip: false,
      },
      {
        ...baseProps,

        selector: "#tour__create-button",
        title: "Create",
        content: <>
          <H3>YEAH</H3>
          <div>Create a game here.</div>
        </>,
        side:'bottom',

        // BaseProps over-ride
        showControls: false,
        showSkip: false,
      },
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
    ]
  }
]





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
