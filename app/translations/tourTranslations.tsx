 
import { Apos, Bold, Italic, Quot, Hr, Anchor } from "./translations.components.styled"

// Édouard Lucas Wikipedia links
const wikilinks = {
  EN: 'https://en.wikipedia.org/wiki/%C3%89douard_Lucas',
  FR: 'https://fr.wikipedia.org/wiki/%C3%89douard_Lucas',
  ES: {},
  DE: {},
  IT: {},
  NL: {},
  RU: {},
  ZH: {},
  JA: {},
  KO: {},
  PT: {},
  HT: {},
}

export const tourTranslations = {
  EN: {

    // Welcome Dialog
    'Tour Dialog title': `Welcome to Dots and Boxes!`,
    'Tour Dialog P1': <>
      <p>
        This game was described created by <Anchor href={wikilinks['EN']}><Bold>Édouard Lucas</Bold></Anchor>, a renowned French mathematician, in his book <Quot/><Italic>Jeux scientifiques pour servir à l<Apos/>histoire</Italic><Quot/>. He died two years later, on October 3, 1991, at the age of 49.
      </p>
      <Hr/>
    </>,
    'Tour Dialog P2': <p>
      Make the tour to learn about the user interface of this web version of the game and about the game rules.
    </p>,
    'Tour Dialog button': 'Start the tour',

    // Steps
    // No JSX allowed here... Sadly.
    //
    'Game grid': 'Game grid',
    'Game grid body': 'This is where you wil play.',


    'Controls button': 'Controls',
    'Controls button body': 'Please click here now.',

    'Create button': 'Create game',
    'Create button h3': 'A game begins here.',
    'Create button div': 'Click again here.',
            
    'Create player name': 'Your name',
    'Create player name h3': 'Enter it here',
    'Create player name div': 'It is important.',

    'Set the grid': 'Set the grid',
    'Set the grid div': 'Set the desired grid using the sliders.',

    'Save the grid': 'Save the grid',


    'Player 1 score': 'Score',
    'Player 1 score h3': 'Player 1',
    'Player 1 score div': 'This will be your\'s if you created the game.',

    'Player 2 score': 'Score',
    'Player 2 score h3': 'Player 2',
    'Player 2 score div': 'This will be your opponent\'s if you created the game.',
    'Player 2 score div2': 'But your\'s if you joined the game.',




  },
  FR: {
    'Game grid': 'Grille de jeu',
  },
  ES: {},
  DE: {},
  IT: {},
  NL: {},
  RU: {},
  ZH: {},
  JA: {},
  KO: {},
  PT: {},
  HT: {},
}


